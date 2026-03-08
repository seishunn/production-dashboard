<script>
import DialogBlock from '../../DialogBlock.vue';
import DialogSection from '../../items/DialogSection.vue';
import DialogRow from '../../items/DialogRow.vue';

export default {
  name: 'AddCabinetForm',
  emits: ['close', 'update', 'create'],
  data() {
    return {
      dateInfo: {
        date: this.selectedDate.date,
        plan: this.selectedDate.plan || 0,
        fact: this.selectedDate.fact || 0,
      }
    }
  },
  props: {
    selectedDate: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    DialogBlock,
    DialogSection,
    DialogRow
  },
  methods: {
    update() {
      const { cabinetId, recordId } = this.selectedDate;
      const { plan, fact, date } = this.dateInfo;

      const body = {
        cabinetId,
        recordId,
        date,
        plan,
        fact, 
      };

      if (body.recordId) {
        this.$emit('update', body);
        this.$emit('close');
      } else {
        this.$emit('create', body);
        this.$emit('close');
      }
    }
  }
}
</script>

<template>
  <DialogBlock :title="`Обновить запись: ${selectedDate.cabinetName}`" @close="$emit('close')">
    <form @submit.prevent="update">
      <DialogSection title="Основная информация">
        <UIInput
          title="Дата"
          v-model="dateInfo.date"
          placeholder="Дата"
          type="date"
          disabled
        />
        <DialogRow>
          <UIInput
            v-model="dateInfo.plan"
            title="План"
            type="number"
            isRequired
          />

          <UIInput
            v-model="dateInfo.fact"
            title="Факт"
            type="number"
            isRequired
          />
        </DialogRow>
        <DialogRow>
          <UIButton buttonType="secondary" @click="$emit('close')">Отмена</UIButton>
          <UIButton type="submit" buttonType="primary">{{ 
            selectedDate.recordId ? 'Обновить' : 'Записать'
          }}</UIButton>
        </DialogRow>
      </DialogSection>
    </form>
  </DialogBlock>
</template>