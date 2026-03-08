<!-- views/ImportView.vue -->
<template>
  <div class="import">
    <div class="page-header">
      <h1 class="page-title">Импорт данных</h1>
      <p class="page-subtitle">Загрузите Excel файл с данными производства</p>
    </div>

    <div class="import-container">
      <div 
        class="dropzone"
        :class="{ 'is-dragover': isDragover }"
        @dragover.prevent="isDragover = true"
        @dragleave.prevent="isDragover = false"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <input 
          type="file" 
          ref="fileInput" 
          class="file-input" 
          accept=".xlsx, .xls"
          @change="handleFileSelect"
        />
        <div class="dropzone-content">
          <svg class="upload-icon" viewBox="0 0 24 24" width="48" height="48">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
          </svg>
          <p class="dropzone-text">
            <span class="primary">Нажмите для выбора</span> или перетащите файл
          </p>
          <p class="dropzone-hint">Поддерживаются файлы .xlsx, .xls</p>
        </div>
      </div>

      <div class="imports-list">
        <h2 class="section-title">История импортов</h2>
        
        <div class="import-item" v-for="(item, index) in importHistory" :key="index">
          <div class="import-info">
            <div class="import-name">{{ item.name }}</div>
            <div class="import-meta">
              <span class="import-date">{{ item.date }}</span>
              <span class="import-status" :class="item.status">{{ item.statusText }}</span>
            </div>
          </div>
          <div class="import-stats">
            <span class="stat">+{{ item.records }} записей</span>
            <span class="stat">план: {{ item.plan }}</span>
            <span class="stat">факт: {{ item.fact }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImportView',
  data() {
    return {
      isDragover: false,
      importHistory: [
        { name: 'production_data_23.02.2026.xlsx', date: '23.02.2026 14:35', status: 'success', statusText: 'Завершен', records: 245, plan: 124, fact: 121 },
        { name: 'production_data_22.02.2026.xlsx', date: '22.02.2026 11:20', status: 'success', statusText: 'Завершен', records: 238, plan: 118, fact: 120 },
        { name: 'production_data_21.02.2026.xlsx', date: '21.02.2026 16:45', status: 'success', statusText: 'Завершен', records: 252, plan: 130, fact: 122 },
        { name: 'production_data_20.02.2026.xlsx', date: '20.02.2026 09:15', status: 'success', statusText: 'Завершен', records: 241, plan: 121, fact: 120 },
        { name: 'production_data_19.02.2026.xlsx', date: '19.02.2026 13:30', status: 'success', statusText: 'Завершен', records: 236, plan: 115, fact: 121 }
      ]
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        console.log('Выбран файл:', file.name);
        // Здесь будет логика загрузки
      }
    },
    handleDrop(event) {
      this.isDragover = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        console.log('Перетащен файл:', file.name);
        // Здесь будет логика загрузки
      }
    }
  }
};
</script>

<style scoped>
.import {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
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

.import-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dropzone {
  background: white;
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.dropzone:hover,
.dropzone.is-dragover {
  border-color: #000;
  background: #fafafa;
}

.file-input {
  display: none;
}

.upload-icon {
  color: #999;
  margin-bottom: 1rem;
}

.dropzone-text {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.primary {
  color: #000;
  font-weight: 500;
}

.dropzone-hint {
  color: #999;
  font-size: 0.9rem;
}

.imports-list {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1.5rem;
}

.import-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.import-item:last-child {
  border-bottom: none;
}

.import-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.import-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
}

.import-date {
  color: #999;
}

.import-status {
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.import-status.success {
  background: #f0f0f0;
  color: #333;
}

.import-stats {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.stat {
  white-space: nowrap;
}
</style>