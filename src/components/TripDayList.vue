<template>
  <q-list>
    <q-item clickable @click="createTripDay">
      <q-item-section avatar>
        <q-icon name="mdi-plus" />
      </q-item-section>
      <q-item-section>Create trip day</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { ActionType } from 'src/store/types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TripDayList',

  methods: {
    async createTripDay() {
      await this.$store.dispatch(ActionType.setOpenedForm, { type: 'tripDay', mode: 'create', selectedId: null });
    },
  },
});
</script>
