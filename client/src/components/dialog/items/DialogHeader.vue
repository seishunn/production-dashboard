<script>
export default {
  name: 'DialogHeader',
  emits: ['close'],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('close');
    }
  }
}
</script>

<template>
  <div class="modal-header">
    <h2 class="modal-title">{{ title }}</h2>
    <button class="modal-close" @click="$emit('close')">
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eaeaea;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #000;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f5f5f5;
  color: #000;
}
</style>