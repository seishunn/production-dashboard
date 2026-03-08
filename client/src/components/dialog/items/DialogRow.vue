<script>
export default {
  name: 'DialogRow',
}
</script>

<template>
  <div class="form-row">
    <slot></slot>
  </div>
</template>

<style scoped>
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0;
}

@media (width <= 640px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>