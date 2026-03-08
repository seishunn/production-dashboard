<script>
export default {
  name: 'PlanFactMetricCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      validator: (value) => ['totalPlan', 'totalFact'].includes(value),
      default: 'totalPlan'
    },
    cabinets: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    cardVariant() {
      return this.field === 'totalPlan' ? 'plan' : 'fact'
    }
  }
};
</script>

<template>
  <div class="metric-card" :class="`metric-card--${cardVariant}`">
    <div class="metric-card__header">
      <h3 class="metric-card__title">{{ title }}</h3>
      <span class="metric-card__badge">{{ field === 'totalPlan' ? 'План' : 'Факт' }}</span>
    </div>
    
    <div class="metric-items">
      <div 
        v-for="cabinet in cabinets" 
        :key="cabinet.name" 
        class="metric-item"
      >
        <div class="metric-item__info">
          <span class="metric-item__name">{{ cabinet.name }}</span>
        </div>
        <div class="metric-item__value-wrapper">
          <span class="metric-item__value">{{ cabinet[field] }}</span>
          <span class="metric-item__unit">шт</span>
        </div>
      </div>
    </div>
    
    <div v-if="cabinets.length > 0" class="metric-card__footer">
      <span class="metric-card__total">Всего шкафов: {{ cabinets.length }}</span>
    </div>
  </div>
</template>

<style scoped>
.metric-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: 1px solid #f0f0f0;
}

.metric-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.metric-card__title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.metric-card__badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: #f5f5f5;
  color: #666;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.metric-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #f0f0f0;
}

.metric-item:last-child {
  border-bottom: none;
}

.metric-item__info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.metric-item__name {
  font-size: 0.9rem;
  color: #4a4a4a;
  font-weight: 500;
}

.metric-item__value-wrapper {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.metric-item__value {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.metric-item__unit {
  font-size: 0.75rem;
  color: #999;
}

.metric-card__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  text-align: right;
}

.metric-card__total {
  font-size: 0.8rem;
  color: #999;
}
</style>