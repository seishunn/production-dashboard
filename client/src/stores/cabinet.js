import axios from "axios";
import { defineStore } from "pinia";

export const useCabinetStore = defineStore('cabinet', {
  state: () => ({
    cabinets: [],
    filledCabinets: [],
    selectedCabinet: null,
    dateFormat: {
      day: '2-digit',
      month: '2-digit'
    },
    searchedCabinets: [],
    allDays: []
  }),

  getters: {
    getCabinetById: (state) => (id) => {
      const cabinet = state.filledCabinets.find((cabinet) => cabinet.id === id);

      if (!cabinet) {
        return null;
      }

      return cabinet;
    },
    getRecordByDate: (state) => (date, cabinetId) => {
      const cabinet = state.filledCabinets.find((cabinet) => cabinet.id === cabinetId);

      const dateToFormat = new Date(date).toLocaleDateString('ru-RU', state.dateFormat);
      const record = cabinet.records.find((r) => r.date === dateToFormat);

      if (!record) {
        console.log('Запись не найдена');
      }

      return record;
    },
    getRecordById: (state) => (recordId, cabinetId) => {
      const cabinet = state.filledCabinets.find((cabinet) => cabinet.id === cabinetId);
      const record = cabinet.records.find((r) => r.id === recordId);

      if (!record) {
        console.log('Запись не найдена');
      }

      return record;
    },
  },

  actions: {
    async fetchCabinetsWithRecords(productionId, startDate, endDate, allDays) {
      try {
        const response = await axios.get(`http://178.72.185.179/api/cabinet-type/production/${productionId}`, {
          params: {
            startDate,
            endDate
          }
        });
        
        this.cabinets = response.data;
        this.allDays = allDays;

        if (allDays) {
          this.filledCabinets = this.fillMissingData(this.cabinets, allDays);
        }
      } catch (error) {
        console.error(`Ошибка при загрузке шкафов и их записей: ${error.message}`);
      }
    },
    async createCabinet(name) {
      try {
        const response = await axios.post(`http://178.72.185.179/api/cabinet-type`, {
          name
        });

        return response.data;
      } catch (error) {
        console.error(`Ошибка при создании шкафа: ${error.message}`);
      }
    },
    async searchCabinetsByName(name) {
      try {
        const response = await axios.get(`http://178.72.185.179/api/cabinet-type/search`, {
          params: {
            name
          }
        });

        this.searchedCabinets = response.data;
        return response.data;
      } catch (error) {
        console.error(`Ошибка при поиске шкафов по имени: ${error.message}`);
      }
    },
    async patchCabinetRecord(cabinetTypeId, record) {
      try {
        await axios.patch(`http://178.72.185.179/api/production-record/${cabinetTypeId}`, record);
      } catch (error) {
        console.error(`Ошибка при обновлении записи: ${error.message}`);
      }
    },
    async createCabinetRecord(cabinetTypeId, productionId, record) {
      try {
        const body = {
          cabinetTypeId,
          productionId,
          date: record.date,
          plan: +record.plan,
          fact: +record.fact,
        };

        const response = await axios.post(`http://178.72.185.179/api/production-record`, body);
        return response.data;
      } catch (error) {
        console.error(`Ошибка при обновлении записи: ${error.message}`);
      }
    },
    async linkToProduction(cabinetId, productionId) {
      try {
        const body = {
          cabinetId,
          productionId
        };

        await axios.post(`http://178.72.185.179/api/cabinet-type/link-to-production`, body);
      } catch (error) {
        console.error(`Ошибка при связи шкафа с проектом: ${error.message}`);
      }
    },
    async unlinkFromProduction(cabinetId, productionId) {
      try {
        const body = {
          cabinetId,
          productionId
        };

        await axios.post(`http://178.72.185.179/api/cabinet-type/unlink-from-production`, body);
      } catch (error) {
        console.error(`Ошибка при связи шкафа с проектом: ${error.message}`);
      }
    },
    updateCabinetRecord(recordField, cabinetTypeId, recordData) {
      const [ name, value ] = recordField;

      const cabinet = this.getCabinetById(cabinetTypeId);
      const record = cabinet.records.find((r) => r[name] === value);

      if (!record) {
        console.warn('Запись не найдена');
        return;
      }

      if (recordData.id) {
        record.id = recordData.id;
      }
      record.fact = recordData.fact;
      record.plan = recordData.plan;
    },
    fillMissingData(cabinetTypes, allDays) {
      return cabinetTypes.map((cabinet) => {
        const recordsMap = new Map(
          cabinet.records.map((record) => [
            new Date(record.date).toLocaleDateString('ru-RU', this.dateFormat),
            record
          ])
        );

        const filledRecords = allDays.map((date) => {
          const existingRecord = recordsMap.get(date.display);
          
          if (existingRecord) {
            return existingRecord;
          }

          return {
            date: date.fullDate,
            plan: 0,
            fact: 0,
          }
        })

        return {
          ...cabinet,
          records: filledRecords
        }
      })
    },
    addCabinet(cabinet) {
      const cabinetWithRecords = {
        ...cabinet,
        records: cabinet.records || [] 
      };
      this.cabinets.push(cabinetWithRecords);

      if (this.allDays) {
        const filledCabinet = this.fillMissingData([cabinetWithRecords], this.allDays);
        this.filledCabinets.push(filledCabinet[0]);
      }
    },
    addCabinetRecord(cabinetTypeId, recordData) {
      const cabinet = this.cabinets.find((cabinet) => cabinet.id === cabinetTypeId);
      cabinet.records.push(recordData);
      cabinet.records.sort((a, b) => new Date(a.date) - new Date(b.date))
    },
    removeCabinet(cabinetTypeId) {
      this.cabinets = this.cabinets.filter((cabinet) => cabinet.id !== cabinetTypeId);
      this.filledCabinets = this.filledCabinets.filter((cabinet) => cabinet.id !== cabinetTypeId);
    }
  }
});