<script>
export default {
  name: 'PlanFactTable',
  emits: ['select'],
  props: {
    dates: {
      type: Array,
      default: () => ([])
    },
    cabinets: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    selectDate(cabinet, record) {
      this.$emit('select', cabinet, record);
    }
  }
};
</script>

<template>
  <div class="table-wrapper">
    <table class="simple-table">
      <thead>
        <tr>
          <th class="cabinet-col">Тип шкафа</th>
          <th v-for="date in dates" :key="date" class="date-col">
            {{ date.display }}
          </th>
          <th class="total-col">План</th>
          <th class="total-col">Факт</th>
          <th class="total-col">%</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cabinet in cabinets" :key="cabinet.id">
          <td class="cabinet-col">{{ cabinet.name }}</td>
          <td
            v-for="record in cabinet.records"
            :key="record.date"
            class="value-col"
            @click="selectDate(cabinet, record)"
          >
            <span class="plan">{{ record.id ? record.plan : '−' }}</span>
            <span class="fact">{{ record.id ? record.fact : '−' }}</span>
          </td>
          <td class="total-col">{{ cabinet.totalPlan }}</td>
          <td class="total-col">{{ cabinet.totalFact }}</td>
          <td class="total-col">{{ cabinet.percent }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Таблица - улучшенный визуал */
.table-wrapper {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 800px;
}

.simple-table th {
  background: #f8fafc;
  color: #1e293b;
  font-weight: 600;
  padding: 14px 8px;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.simple-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #edf2f7;
  color: #1e293b;
}

.simple-table tr:hover td {
  background: #f8fafc;
}

/* Колонка с названием шкафа */
.cabinet-col {
  text-align: left;
  font-weight: 600;
  position: sticky;
  left: 0;
  background: white;
  border-right: 2px solid #e2e8f0;
  color: #0f172a;
  font-size: 0.85rem;
}

.simple-table tr:hover .cabinet-col {
  background: #f8fafc;
}

/* Колонки с датами */
.date-col {
  text-align: center;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  background: #f8fafc;
  min-width: 70px;
}

/* Ячейки со значениями */
.value-col {
  text-align: center;
  min-width: 70px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 8px 4px;
}

.value-col:hover {
  background: #f1f5f9 !important;
}

/* План и факт внутри ячейки */
.plan {
  display: inline-block;
  color: #94a3b8;
  font-size: 0.8rem;
  margin-right: 8px;
  padding: 2px 4px;
  border-radius: 4px;
  background: #f1f5f9;
  min-width: 25px;
  text-align: center;
}

.fact {
  display: inline-block;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 2px 4px;
  border-radius: 4px;
  background: #e0f2fe;
  min-width: 25px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

/* Итоговые колонки */
.total-col {
  text-align: center;
  font-weight: 600;
  background: #f8fafc;
  border-left: 2px solid #e2e8f0;
  padding: 12px 8px;
  color: #0f172a;
  font-size: 0.9rem;
}

th.total-col {
  background: #f1f5f9;
  color: #1e293b;
  font-weight: 600;
  border-left: 2px solid #cbd5e1;
}

/* Специальные стили для колонки с процентами */
.total-col:last-child {
  color: #0891b2;
  font-weight: 700;
}

/* Разделители между шкафами */
.simple-table tr:not(:last-child) td {
  border-bottom: 1px solid #e2e8f0;
}

/* Чередование строк для лучшей читаемости */
.simple-table tbody tr:nth-child(even) {
  background: #fcfcfd;
}

.simple-table tbody tr:nth-child(even) .cabinet-col {
  background: #fcfcfd;
}

.simple-table tbody tr:nth-child(even):hover .cabinet-col {
  background: #f8fafc;
}

/* Индикатор наличия данных */
.value-col:has(.fact:not(:empty)) .plan {
  background: #f1f5f9;
}

/* Пустые значения */
.plan:empty::before,
.fact:empty::before {
  content: "−";
  color: #cbd5e1;
  font-weight: 300;
}
</style>