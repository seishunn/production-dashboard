<script>
import DialogHeader from './items/DialogHeader.vue';

export default {
  name: 'DialogBlock',
  emits: ['close'],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    DialogHeader
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <!-- Заголовок модального окна -->
      <DialogHeader :title="title" @close="$emit('close')"/>

      <div class="modal-form">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: white;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s ease;
}

.modal-form {
  padding: 1.5rem;
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 640px) {
  .modal {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
}

/* Стили для скролла */
.modal::-webkit-scrollbar {
  width: 6px;
}

.modal::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.modal::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}

.modal::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>