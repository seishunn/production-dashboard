<script>
import { mapStores } from 'pinia'
import { useCabinetStore } from '@/stores/cabinet';
import { useProductionStore } from '@/stores/production';

// ————————— Формы —————————
// —————————————————— Шкафы —————————————————————————
import AddCabinetForm from '@/components/dialog/forms/cabinet/AddCabinetForm.vue';
import ChangeDateInfoForm from '@/components/dialog/forms/cabinet/ChangeDateInfoForm.vue';
// —————————————————— Производство ——————————————————
import UpdateProductionForm from '@/components/dialog/forms/production/UpdateProductionForm.vue';

import ChartRow from '@/components/ChartRow.vue';
import PlanFactTable from '@/components/PlanFactTable.vue';
import PlanFactMetricCard from '@/components/PlanFactMetricCard.vue';

export default {
  name: 'DashboardView',
  components: {
    AddCabinetForm,
    ChangeDateInfoForm,
    UpdateProductionForm,

    ChartRow,
    PlanFactTable,
    PlanFactMetricCard
  },
  data() {
    return {
      productionId: this.$route.params.id,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      currentProduction: null,
      startDate: null,
      endDate: null,
      dateArray: [],
      selectedCabinet: 'all',
      lineChartInstance: null,
      pieChartInstance: null,

      isAddCabinetFormVisible: false,
      isUpdateProductionFormVisible: false,
      selectedDate: null
    };
  },
  setup() {
    const cabinetStore = useCabinetStore();
    const productionStore = useProductionStore();
    return { cabinetStore, productionStore };
  },
  computed: {
    ...mapStores(useCabinetStore),
    cabinetsWithTotals() {
      return this.cabinetStore.filledCabinets.map(cabinet => ({
        ...cabinet,
        totalPlan: this.getTotal(cabinet, 'plan'),
        totalFact: this.getTotal(cabinet, 'fact'),
        percent: this.getPercent(cabinet)
      }));
    },
    filteredCabinetsWithTotals() {
      if (this.selectedCabinet === 'all') {
        return this.cabinetsWithTotals;
      }

      return this.cabinetsWithTotals.filter((cabinet) => cabinet.name === this.selectedCabinet);
    },
    cabinetsOptions() {
      return this.cabinetStore.cabinets.map((cabinet) => {
        return {
          name: cabinet.name,
          value: cabinet.name
        }
      });
    }
  },
  async mounted() {
    const startDate = new Date(this.currentYear, this.currentMonth, 1);
    const endDate = new Date(this.currentYear, this.currentMonth + 1, 0);

    this.startDate = startDate.toLocaleDateString('en-CA');
    this.endDate = endDate.toLocaleDateString('en-CA');
    await this.productionStore.fetchAllStations();
    this.currentProduction = this.productionStore.getProductionById(this.productionId);
    await this.fetchCabinetsWithRecords();
  },
  beforeUnmount() {
    if (this.pieChartInstance) {
      this.pieChartInstance.destroy();
    }
  },
  methods: {
    selectDate(cabinet, record) {
      const { id, name } = cabinet;
      const { date, plan, fact } = record;

      this.selectedDate = {
        cabinetName: name,
        cabinetId: id,
        recordId: record?.id || null,
        date,
        plan,
        fact
      }
    },
    exportToPDF() {
      console.log('Экспорт в PDF');
      alert('Функция экспорта в PDF будет добавлена');
    },
    exportToExcel() {
      console.log('Экспорт в Excel');
      alert('Функция экспорта в Excel будет добавлена');
    },
    async fetchCabinetsWithRecords() {
      this.dateArray = this.generateDateArray(this.startDate, this.endDate);

      if (!this.dateArray.length) return; 
      await this.cabinetStore.fetchCabinetsWithRecords(this.productionId, this.startDate, this.endDate, this.dateArray);
    },
    generateDateArray(start, end) {      
      const dates = [];
      const currentDate = new Date(start);
      const endDate = new Date(end);

      if (start > end) return [];

      while (currentDate <= endDate) {
        dates.push({
          display: currentDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit'
          }),
          fullDate: currentDate.toLocaleDateString('en-CA')
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    },
    getTotal(cabinet, field) {
      return cabinet.records.reduce((sum, record) => sum + (+record[field] || 0), 0);
    },
    getPercent(cabinet) {
      const plan = this.getTotal(cabinet, 'plan');
      const fact = this.getTotal(cabinet, 'fact');

      return plan ? Math.round((fact / plan) * 100) : 0;
    },
    async updateDayInfo(dateInfo) {
      const { cabinetId, recordId, ...body } = dateInfo;

      await this.cabinetStore.patchCabinetRecord(recordId, body);
      this.cabinetStore.updateCabinetRecord(['id', recordId], cabinetId, body);
    },
    async createRecord(dateInfo) {
      const { cabinetId, ...body } = dateInfo;

      const response = await this.cabinetStore.createCabinetRecord(cabinetId, this.productionId, body);
      this.cabinetStore.updateCabinetRecord(['date', body.date], cabinetId, response);
      this.cabinetStore.addCabinetRecord(cabinetId, response);
    },
    async removeCabinet(cabinetId) {
      await this.cabinetStore.unlinkFromProduction(cabinetId, this.productionId);
      this.cabinetStore.removeCabinet(cabinetId);
    },
    async createCabinet(name) {
      await this.cabinetStore.createCabinet(name);
    },
    async searchCabinetsByName(name) {
      await this.cabinetStore.searchCabinetsByName(name);
    },
    async addCabinet(cabinet) {
      await this.cabinetStore.linkToProduction(cabinet.id, this.productionId);
      this.cabinetStore.addCabinet(cabinet);
    }
  }
};
</script>

<template>
  <div class="dashboard">
    <!-- Заголовок с кнопками экспорта -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Дашборд производства <span>{{ currentProduction?.name }}</span></h1>
        <p class="page-subtitle">Обновлено {{ new Date(currentProduction?.updatedAt).toLocaleDateString('ru-RU') }}</p>
      </div>
      <div class="export-buttons">
        <UIButton @click="exportToPDF">
          <svg class="btn-icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 4h2v4H8V4zm-2 0v4h2v2H4V4h2zm0 10H4v-2h2v2zm0 2v4H4v-2h2v-2zm8 4h-4v-2h4v2zm0-6h-4v-2h4v2zm6 6h-4v-2h4v2zm0-6h-4v-2h4v2zm0-4h-4V8h4v4z" fill="currentColor"/>
          </svg>
          PDF
        </UIButton>
        <UIButton @click="exportToExcel">
          <svg class="btn-icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm0 18H6v-2h8v2zm0-4H6v-2h8v2zm-3-4V4.5L16.5 12H11z" fill="currentColor"/>
          </svg>
          Excel
        </UIButton>
      </div>
    </div>
    <UpdateProductionForm
      v-if="isUpdateProductionFormVisible"
      :cabinets="cabinetStore.cabinets"
      :searchedCabinets="cabinetStore.searchedCabinets"

      @add="addCabinet"
      @search="searchCabinetsByName"
      @remove="removeCabinet"
      @show="isAddCabinetFormVisible = true"
      @close="isUpdateProductionFormVisible = false"
    />
    <AddCabinetForm
      v-if="isAddCabinetFormVisible"

      @create="createCabinet"
      @close="isAddCabinetFormVisible = false"
      @add="handleAddCabinet" 
    />
    <ChangeDateInfoForm
      v-if="selectedDate"
      :selectedDate="selectedDate"
      @close="selectedDate = null"
      @update="updateDayInfo"
      @create="createRecord"
    />
    <!-- Фильтры -->
    <div class="filters">
      <div class="filter-group">
        <label class="filter-label">Период</label>
        <div class="filter-controls">
          <UIInput
            title="Начало"
            v-model="startDate"
            type="date"
          />
          <UIInput
            title="Конец"
            v-model="endDate"
            type="date"
          />
          <UIButton buttonType="primary" @click="fetchCabinetsWithRecords">Загрузить</UIButton>
        </div>
      </div>
      <div class="filter-group">
        <UIInput
          v-model="selectedCabinet"
          title="Тип шкафа"
          :area-type="'select'"
          :options="[
            {value: 'all', name: 'Все типы'},
            ...cabinetsOptions
          ]"
          default-option="Выберите тип"
        />
      </div>
      <UIButton buttonType="secondary" @click="isUpdateProductionFormVisible = true">Настроить производство</UIButton>
    </div>

    <!-- Карточки с метриками -->
    <div v-if="filteredCabinetsWithTotals.length" class="metrics-grid">
      <PlanFactMetricCard title="План" field="totalPlan" :cabinets="filteredCabinetsWithTotals"/>
      <PlanFactMetricCard title="Факт" field="totalFact" :cabinets="filteredCabinetsWithTotals"/>
    </div>

    <!-- Таблица -->
    <PlanFactTable
      v-if="filteredCabinetsWithTotals.length"
      :dates="dateArray"
      :cabinets="filteredCabinetsWithTotals"
      @select="selectDate"  
    />
    
    <!-- Графики -->
    <div v-if="selectedCabinet === 'all' && filteredCabinetsWithTotals.length > 1" class="charts-grid">
      <ChartRow
        v-for="cabinet in filteredCabinetsWithTotals"
        :key="cabinet.id"
        :title="cabinet.name"
        :chartData="cabinet.records"
        :showLegend="false"
        :height="200"
      />
    </div>
    
    <!-- Для одного шкафа показываем большой график -->
    <ChartRow
      v-else-if="filteredCabinetsWithTotals.length"
      :title="`Динамика: ${filteredCabinetsWithTotals[0].name}`"
      :chartData="filteredCabinetsWithTotals[0].records"
      :showLegend="true"
      :height="300"
    />
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 500;
  color: #000;
  margin-bottom: 0.25rem;
}
.page-title span {
  color: blue;
}

.page-subtitle {
  color: #666;
  font-size: 0.9rem;
}

.export-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-icon {
  opacity: 0.7;
}

/* Фильтры */
.filters {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-size: 0.9rem;
  color: #666;
  min-width: 60px;
}

.filter-controls {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.filter-separator {
  color: #999;
}

/* Метрики */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 1.5rem;
}
</style>