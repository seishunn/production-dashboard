<script>
import DialogBlock from '../../DialogBlock.vue';
import DialogSection from '../../items/DialogSection.vue';
import DialogRow from '../../items/DialogRow.vue';

export default {
  name: 'AddCabinetForm',
  emits: ['close', 'create'],
  data() {
    return {
      form: {
        name: '',
        type: '',
        serialNumber: '',
        voltage: '',
        power: '',
        modules: '',
        ip: '',
        productionDate: '',
        responsible: '',
        notes: ''
      }
    }
  },
  components: {
    DialogBlock,
    DialogSection,
    DialogRow
  },
  methods: {
    createCabinet() {
      this.$emit('create', this.form.name);
      this.$emit('close', this.form.name);
    }
  }
}
</script>

<template>
  <DialogBlock title="Новый шкаф" @close="$emit('close')">
    <form @submit.prevent="createCabinet">
      <DialogSection title="Основная информация">
        <UIInput
          title="Название шкафа"
          v-model="form.name"
          placeholder="Например: Шкаф управления ШУ-1"
          isRequired
        />
        <DialogRow>
          <UIInput
            v-model="form.type"
            title="Тип"
            :area-type="'select'"
            :options="[
              {value: 'shchrn', name: 'ЩРН'},
              {value: 'shchru', name: 'ЩРУ'},
              {value: 'shcho', name: 'ЩРО'},
            ]"
            default-option="Выберите тип"
          />

          <UIInput
            v-model="form.serialNumber"
            title="Серийный номер"
            placeholder="SN-2024-001"
          />
        </DialogRow>
      </DialogSection>
      <DialogSection title="Технические характеристики">
        <DialogRow>
          <UIInput
            title="Напряжение (В)"
            v-model="form.voltage"
            type="number"
            placeholder="380"
          />

          <UIInput
            title="Мощность (кВт)"
            v-model="form.power"
            type="number"
            placeholder="15"
          />
        </DialogRow>
        <DialogRow>
          <UIInput
            v-model="form.modules"
            title="Количество модулей"
            type="number"
            placeholder="24"
          />

          <UIInput
            v-model="form.ip"
            title="Степень защиты"
            :area-type="'select'"
            :options="[
              {value: 'IP20', name: 'IP20'},
              {value: 'IP54', name: 'IP54'},
              {value: 'IP65', name: 'IP65'},
              {value: 'IP66', name: 'IP66'},
            ]"
            default-option="Выберите IP"
          />
        </DialogRow>
      </DialogSection>
      <DialogSection title="Дополнительно">
        <DialogRow>
          <UIInput
            v-model="form.productionDate"
            title="Дата производства"
            type="date"
          />

          <UIInput
            v-model="form.responsible"
            title="Ответственный"
            placeholder="ФИО"
          />
        </DialogRow>
        <UIInput
          v-model="form.notes"
          title="Примечания"
          area-type="textarea"
          :rows="3"
          placeholder="Дополнительная информация о шкафе..."
        />
      </DialogSection>

      <!-- Кнопки -->
      <DialogRow>
        <UIButton buttonType="secondary" @click="$emit('close')">Отмена</UIButton>
        <UIButton type="submit" buttonType="primary">Добавить шкаф</UIButton>
      </DialogRow>
    </form>
  </DialogBlock>
</template>