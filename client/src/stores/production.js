import axios from "axios";
import { defineStore } from "pinia";

export const useProductionStore = defineStore('production', {
  state: () => ({
    productions: [],
    searchedStations: [],
    isLoading: false
  }),
  
  getters: {
    getProductionById: (state) => (id) => {
      const production = state.productions.find((production) => production.id === id);

      if (!production) {
        return null;
      }

      return production;
    }
  },

  actions: {
    async fetchAllStations() {
      try {
        const response = await axios.get('http://178.72.185.179/api/production');
        this.productions = response.data;
      } catch (error) {
        console.error(`Ошибка при загрузке станций: ${error.message}`);
      }
    },
    async createProduction(production) {
      try {
        const response = await axios.post('http://178.72.185.179/api/production', production);
        return response.data;
      } catch (error) {
        console.error(`Ошибка при обновлении записи: ${error.message}`);
      }
    },
    addProduction(production) {
      const body = {
        updatedAt: new Date(),
        ...production,
      };
      this.productions.push(body);
    },
    async searchStations(query) {
      // Поиск станций
      this.isLoading = true;
      try {
        // API запрос
        this.searchedStations = this.stations.filter(s => 
          s.name.toLowerCase().includes(query.toLowerCase())
        );
      } finally {
        this.isLoading = false;
      }
    }
  }
});