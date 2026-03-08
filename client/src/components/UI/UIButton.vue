<script>
export default {
  name: 'UIButton',
  props: {
    buttonType: {
      type: String,
      validator: (value) => ['primary', 'secondary'].includes(value),
      defalut: ''
    }
  }
}
</script>

<template>
  <button
    class="btn"
    :class="{
      'btn-primary': buttonType === 'primary',
      'btn-secondary': buttonType === 'secondary',
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.5rem;
  background: white;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: #f5f5f5;
  border-color: #999;
}

.btn-primary {
  background: #000;
  color: white;
}

.btn-primary:hover {
  background: #333;
}

.btn-secondary {
  background: white;
  border: 1px solid #ddd;
  color: #333;
}

.btn-secondary:hover {
  background: #f5f5f5;
  border-color: #999;
}

@media (width <= 640px) {
  .btn-primary, .btn-secondary {
    width: 100%;
    text-align: center;
  }
}
</style>