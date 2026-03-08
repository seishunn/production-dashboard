<script>
import DialogBlock from '../../DialogBlock.vue';
import DialogSection from '../../items/DialogSection.vue';
import DialogRow from '../../items/DialogRow.vue';

export default {
  name: 'AddProductionForm',
  emits: ['close', 'add'],
  data() {
    return {
      production: {
        name: '',
      },
    }
  },
  components: {
    DialogBlock,
    DialogSection,
    DialogRow
  },
  methods: {
    addProduction() {
      this.$emit('add', this.production);
      this.$emit('close');
    },
  }
}
</script>

<template>
  <DialogBlock title="Создать завод" @close="$emit('close')">
    <form @submit.prevent="addProduction">
      <DialogSection title="Основная информация">
        <UIInput
          v-model="production.name"
          title="Название"
          type="text"
          isRequired
          placeholder="Название производства"
        />
      </DialogSection>
      <DialogRow>
        <UIButton buttonType="secondary" @click="$emit('close')">Отмена</UIButton>
        <UIButton type="submit" buttonType="primary">Сохранить</UIButton>
      </DialogRow>
    </form>
  </DialogBlock>
</template>

<style scoped>
.cabinets-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cabinet-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.75rem;
  background: #f8f9fa;
  border: 1px solid #edf2f7;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.cabinet-item:hover {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.cabinet-name {
  font-size: 0.9rem;
  color: #2d3748;
  font-weight: 450;
  line-height: 1.4;
}

.cabinet-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: #a0aec0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cabinet-remove:hover {
  background: #fed7d7;
  color: #e53e3e;
}

.cabinet-remove:active {
  transform: scale(0.95);
}

.cabinet-remove svg {
  display: block;
}

.cabinet-add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: #a0aec0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cabinet-add:hover {
  background: #c6f6d5;  /* Светло-зелёный фон */
  color: #38a169;        /* Зелёный цвет иконки */
}

.cabinet-add:active {
  transform: scale(0.95);
}

.cabinet-add svg {
  display: block;
}
</style>