<script>
import { mapStores } from 'pinia'
import { useProductionStore } from '@/stores/production';
import AddProductionForm from '@/components/dialog/forms/production/AddProductionForm.vue';

export default {
  name: 'ProductionListView',
  data() {
    return {
      isLoading: false,
      searchQuery: '',

      isAddProductionFormVisible: false
    };
  },
  components: {
    AddProductionForm
  },
  setup() {
    const productionStore = useProductionStore();
    return { productionStore };
  },
  computed: {
    ...mapStores(useProductionStore),
    formatedDateProductions() {
      return this.productionStore.productions.map((station) => {
        return {
          ...station,
          updatedAt: new Date(station.updatedAt).toLocaleDateString('ru-RU')
        }
      });
    },
    totalStations() {
      return this.productionStore.productions.length;
    },
  },
  async mounted() {
    await this.fetchStations();
  },
  methods: {
    async fetchStations() {
      this.isLoading = true;
      try {
        await this.productionStore.fetchAllStations();
      } catch (error) {
        console.error('Ошибка загрузки станций:', error);
        // Здесь можно добавить уведомление об ошибке
      } finally {
        this.isLoading = false;
      }
    },
    navigateToStation(stationId) {
      this.$router.push(`/production/${stationId}`);
    },
    async createProduction(production) {
      const response = await this.productionStore.createProduction(production);
      this.productionStore.addProduction(response);
    }
  }
};
</script>

<template>
  <div class="production-list">
    <!-- Заголовок -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Производственные станции</h1>
        <p class="page-subtitle">Управление и мониторинг всех станций</p>
      </div>
      <div class="header-actions">
        <UIButton buttonType="primary" @click="isAddProductionFormVisible = true">
          Добавить станцию
        </UIButton>
      </div>
    </div>

    <AddProductionForm
      v-if="isAddProductionFormVisible"

      @add="createProduction"
      @close="isAddProductionFormVisible = false"
    />

    <!-- Статистика -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🏭</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalStations }}</div>
          <div class="stat-label">Всего станций</div>
        </div>
      </div>
    </div>

    <!-- Список станций -->
    <div v-if="isLoading" class="loading-state">
      <div class="loader"></div>
      <p>Загрузка станций...</p>
    </div>

    <div v-else-if="formatedDateProductions.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" fill="#999"/>
      </svg>
      <h3>Станции не найдены</h3>
      <p>Попробуйте изменить параметры поиска или добавьте новую станцию</p>
      <UIButton buttonType="primary" @click="isAddProductionFormVisible = true">
        Добавить станцию
      </UIButton>
    </div>

    <div v-else class="stations-grid">
      <div
        v-for="station in formatedDateProductions"
        :key="station.id"
        class="station-card"
        @click="navigateToStation(station.id)"
      >
        <div class="station-header">
          <div class="station-id">ID: {{ station?.id ? station.id.slice(0, 8) : '' }}...</div>
        </div>

        <div class="station-content">
          <h3 class="station-name">{{ station.name }}</h3>
          <p v-if="station.location" class="station-location">
            📍 {{ station.location }}
          </p>

          <div class="station-footer">
            <div class="last-update">
              Обновлено: {{ station.updatedAt || 'сегодня' }}
            </div>
          </div>
        </div>

        <div class="card-arrow">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.production-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 500;
  color: #000;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: #666;
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-icon {
  opacity: 0.7;
  margin-right: 0.5rem;
}

/* Статистика */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

/* Поиск и фильтры */
.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  z-index: 1;
}

.search-input :deep(input) {
  padding-left: 40px;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  background: #f5f5f5;
  padding: 0.25rem;
  border-radius: 8px;
}

.filter-tab {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab.active {
  background: white;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Сетка станций */
.stations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.station-card {
  position: relative;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.station-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.station-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
}

.station-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-text {
  font-size: 0.85rem;
  color: #666;
}

.station-id {
  font-size: 0.8rem;
  color: #999;
  font-family: monospace;
}

.station-content {
  padding: 1rem;
}

.station-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #000;
  margin-bottom: 0.25rem;
}

.station-location {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.station-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  border-top: 1px dashed #eaeaea;
  border-bottom: 1px dashed #eaeaea;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1rem;
  font-weight: 600;
  color: #000;
}

.station-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #999;
}

.cabinets-count {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.card-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
  opacity: 0;
  transition: all 0.2s;
}

/* Состояния */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #666;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
  color: #666;
}

.empty-state h3 {
  margin: 1rem 0 0.5rem;
  font-weight: 500;
  color: #000;
}

.empty-state p {
  margin-bottom: 1.5rem;
}
</style>