<script>
export default {
  name: 'UIInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: 'text'
    },
    areaType: {
      type: String,
      validator: (value) => ['input', 'select', 'textarea'].includes(value),
      default: 'input'
    },
    type: {
      type: String,
      validator: (value) => ['text', 'number', 'email', 'password', 'tel', 'url', 'date'].includes(value),
      default: 'text'
    },
    defaultOption: {
      type: String,
      default: 'Выберите тип'
    },
    options: {
      type: Array,
      default: () => ([])
    },

    // Валидация
    placeholder: {
      type: String,
      default: ''
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    rows: {
      type: [String, Number],
      default: 3
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<template>
  <div>
    <label v-if="title" class="input-label">{{ title }}</label>
    <!-- Input -->
    <input
      v-if="areaType === 'input'"
      class="input"
      @input="updateInput"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="isRequired"
      :disabled="disabled"
      :readonly="readonly"
    />
    <!-- Select -->
    <select
      v-else-if="areaType === 'select'"
      class="select"
      :value="modelValue"
      @change="updateInput"
      :required="isRequired"
      :disabled="disabled"
    >
      <option value="" disabled="">{{ defaultOption }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >{{ option.name }}</option>
    </select>
    <!-- Textarea -->
    <textarea 
      v-if="areaType === 'textarea'"
      class="textarea"
      @input="updateInput"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<style scoped>
.input-label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.input, .select, .textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s;
  background: white;
}

.input:focus, .select:focus, .textarea:focus {
  outline: none;
  border-color: #000;
}

.input::placeholder, .textarea::placeholder {
  color: #aaa;
}
</style>