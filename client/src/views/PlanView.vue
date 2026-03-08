<!-- views/PlanView.vue -->
<template>
  <div class="plan">
    <div class="page-header">
      <h1 class="page-title">План производства</h1>
      <p class="page-subtitle">Синергия 37.1 • Февраль 2026</p>
    </div>

    <!-- Мини-дашборд -->
    <div class="plan-metrics">
      <div class="metric">
        <span class="metric-label">Всего по плану</span>
        <span class="metric-value">1,234 шт</span>
      </div>
      <div class="metric">
        <span class="metric-label">Дней в плане</span>
        <span class="metric-value">24</span>
      </div>
      <div class="metric">
        <span class="metric-label">Средний план/день</span>
        <span class="metric-value">51.4 шт</span>
      </div>
    </div>

    <!-- Таблица плана -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Тип шкафа</th>
            <th>Норма</th>
            <th v-for="week in 4" :key="week" colspan="7" class="week-header">
              Неделя {{ week }}
            </th>
            <th>Итого</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <template v-for="day in 28" :key="day">
              <th class="day-header">{{ day }}</th>
            </template>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cabinet in cabinets" :key="cabinet.name">
            <td class="cabinet-name">{{ cabinet.name }}</td>
            <td class="norm">{{ cabinet.norm }}</td>
            <td v-for="day in 28" :key="day" class="plan-value">
              {{ cabinet.plan[day-1] || '-' }}
            </td>
            <td class="total">{{ cabinet.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const cabinets = [
  { name: 'Модуль агрегации', norm: 1, plan: Array(28).fill(0).map(() => Math.floor(Math.random() * 3)), total: 18 },
  { name: 'Т1 (СОТ)', norm: 1, plan: Array(28).fill(0).map(() => Math.floor(Math.random() * 5)), total: 42 },
  { name: 'Т2И1 (СКУД)', norm: 1, plan: Array(28).fill(0).map(() => Math.floor(Math.random() * 4)), total: 38 },
  { name: 'Т2И2 (СКУД)', norm: 3, plan: Array(28).fill(0).map(() => Math.floor(Math.random() * 8)), total: 96 },
  { name: 'Т2И3 (СКУД)', norm: 1, plan: Array(28).fill(0).map(() => Math.floor(Math.random() * 4)), total: 41 },
  { name: 'Модуль конвертации', norm: 5, plan: Array(28).fill(0).map(() => Math.floor(Math.random() * 12)), total: 156 },
];
</script>

<style scoped>
.plan {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
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

.plan-metrics {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
}

.metric {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 500;
  color: #000;
}

.table-container {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.table th {
  padding: 0.5rem;
  border-bottom: 1px solid #eaeaea;
  font-weight: 500;
  color: #666;
}

.week-header {
  text-align: center;
  background: #f9f9f9;
  font-size: 0.8rem;
}

.day-header {
  font-size: 0.75rem;
  color: #999;
  font-weight: normal;
  padding: 0.25rem;
}

.table td {
  padding: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
}

.cabinet-name {
  text-align: left;
  font-weight: 500;
  white-space: nowrap;
}

.norm {
  color: #666;
  font-size: 0.8rem;
}

.plan-value {
  color: #333;
}

.total {
  font-weight: 500;
  background: #fafafa;
}
</style>