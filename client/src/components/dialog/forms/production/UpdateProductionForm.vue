<script>
import DialogBlock from '../../DialogBlock.vue';
import DialogSection from '../../items/DialogSection.vue';
import DialogRow from '../../items/DialogRow.vue';

export default {
  name: 'UpdateProductionForm',
  emits: ['close', 'update', 'remove', 'show', 'search'],
  data() {
    return {
      production: {
        name: '',
      },
      cabinet: {
        name: ''
      }
    }
  },
  props: {
    cabinets: {
      type: Array,
      default: () => ([])
    },
    searchedCabinets: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    DialogBlock,
    DialogSection,
    DialogRow
  },
  methods: {
    update() {},
    removeCabinet(cabinetId) {
      this.$emit('remove', cabinetId);
    },
    addCabinet(cabinet) {
      this.$emit('add', cabinet);
    },
    showCabinetDialog() {
      this.$emit('show');
    },
    searchCabinetsByName() {
      this.$emit('search', this.cabinet.name);
    }
  }
}
</script>

<template>
  <DialogBlock :title="`Настроить производство`" @close="$emit('close')">
    <form @submit.prevent="update">
      <DialogSection title="Основная информация">
        <UIInput
          v-model="production.name"
          title="Название"
          type="text"
          isRequired
          placeholder="Название производства"
        />
      </DialogSection>
      <DialogSection v-if="cabinets.length" title="Шкафы на производстве">
        <div class="cabinets-list">
          <div
            v-for="cabinet in cabinets"
            :key="cabinet.id"
            class="cabinet-item"
          >
            <span class="cabinet-name">{{ cabinet.name }}</span>
            <button 
              type="button"
              class="cabinet-remove"
              @click="removeCabinet(cabinet.id)"
              title="Удалить шкаф"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </DialogSection>
      <DialogSection title="Добавить существующий шкаф">
        <UIInput
          v-model="cabinet.name"
          title="Поиск"
          type="text"
          isRequired
          placeholder="Название шкафа"
        />
        <UIButton type="button" buttonType="secondary" @click="searchCabinetsByName">Поиск</UIButton>
        <div class="cabinets-list">
          <div
            v-for="cabinet in searchedCabinets"
            :key="cabinet.id"
            class="cabinet-item"
          >
            <span class="cabinet-name">{{ cabinet.name }}</span>
            <button 
              type="button"
              class="cabinet-add"
              @click="addCabinet(cabinet)"
              title="Добавить"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </DialogSection>
      <DialogSection title="Создать новый шкаф">
        <UIButton type="button" buttonType="secondary" @click="showCabinetDialog">Создать шкаф</UIButton>
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