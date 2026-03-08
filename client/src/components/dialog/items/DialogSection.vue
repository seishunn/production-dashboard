<script>
export default {
  name: 'DialogSection',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div class="form-section">
    <h3 class="section-subtitle">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped>
.form-section {
  margin-bottom: 2rem;
}

.form-section:last-of-type {
  margin-bottom: 1.5rem;
}

.form-section > *:not(.section-subtitle) {
  margin-bottom: 1rem;
}

.form-section > *:not(.section-subtitle):last-child {
  margin-bottom: 0;
}

.section-subtitle {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
}
</style>