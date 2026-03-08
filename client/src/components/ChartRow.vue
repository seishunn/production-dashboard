<script>
import { Line as LineChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default {
  name: 'ChartRow',
  components: { LineChart },
  props: {
    title: {
      type: String,
      default: 'График'
    },
    chartData: {
      type: Array,
      required: true,
      validator: (value) => Array.isArray(value)
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 250
    }
  },
  computed: {
    processedData() {
      if (!this.chartData?.length) {
        return { labels: [], planData: [], factData: [] };
      }

      const labels = [];
      const planData = [];
      const factData = [];

      this.chartData.forEach((record) => {
        if (record?.date) {
          labels.push(record.date);
          planData.push(Number(record.plan) || 0);
          factData.push(Number(record.fact) || 0);
        }
      });

      return { labels, planData, factData };
    },
    
    lineChartData() {
      const { labels, planData, factData } = this.processedData;
      
      return {
        labels,
        datasets: [
          {
            label: 'План',
            data: planData,
            borderColor: '#000',
            backgroundColor: 'transparent',
            tension: 0.1,
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2
          },
          {
            label: 'Факт',
            data: factData,
            borderColor: '#999',
            backgroundColor: 'transparent',
            tension: 0.1,
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2
          }
        ]
      };
    },
    
    lineChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.showLegend,
            position: 'top',
            labels: {
              usePointStyle: true,
              pointStyle: 'line',
              boxWidth: 20
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f0f0f0',
              drawBorder: false
            },
            ticks: {
              stepSize: 1,
              callback: (value) => Math.floor(value)
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 10
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      };
    },
    
    hasData() {
      return this.processedData.labels.length > 0;
    }
  }
};
</script>

<template>
  <div class="chart-container">
    <div v-if="title" class="chart-header">
      <h2 class="section-title">{{ title }}</h2>
      <div v-if="!showLegend" class="chart-legend">
        <span class="legend-item plan">План</span>
        <span class="legend-item fact">Факт</span>
      </div>
    </div>
    
    <div 
      class="chart-wrapper" 
      :style="{ height: typeof height === 'number' ? height + 'px' : height }"
    >
      <LineChart
        v-if="hasData"
        :data="lineChartData"
        :options="lineChartOptions"
      />
      <div v-else class="no-data-message">
        <span>📊 Нет данных для отображения</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  font-size: 0.85rem;
  padding-left: 1rem;
  position: relative;
}

.legend-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 2px;
}

.legend-item.plan::before {
  background-color: #000;
}

.legend-item.fact::before {
  background-color: #999;
}

.chart-wrapper {
  width: 100%;
  min-height: 200px;
}

.no-data-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
  color: #999;
  font-size: 0.95rem;
  background: #fafafa;
  border-radius: 4px;
}
</style>