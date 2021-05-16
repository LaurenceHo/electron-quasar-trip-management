<template>
  <q-dialog v-model="isDialogOpen">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ openedForm.mode === 'create' ? 'Create' : 'Update' }} trip day</div>
        <q-space />
        <q-btn v-close-popup dense flat icon="mdi-close" round @click="isDialogOpen = false" />
      </q-card-section>
      <q-card-section> blah </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="Cancel" />
        <q-btn v-close-popup :label="openedForm.mode === 'create' ? 'Create' : 'Update'" flat @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Notify } from 'quasar';
import { TripService } from 'src/types/type';
import { defineComponent } from 'vue';
import { OpenedForm } from '../types/models';
import { Messages } from 'src/constants/messages';

export default defineComponent({
  name: 'TripDayForm',
  data() {
    const tripService: TripService = (window as any).TripService;
    return {
      tripService,
      isDialogOpen: false,
      messages: Messages,
    };
  },

  computed: {
    openedForm(): OpenedForm {
      return this.$store.state.openedForm;
    },
  },

  watch: {
    async openedForm(openedForm: OpenedForm) {
      try {
        if (openedForm.type === 'tripDay') {
          this.isDialogOpen = true;
        }
        //TODO
      } catch (error) {
        Notify.create({
          message: this.messages.dataStoreError,
          color: 'negative',
        });
      }
    },
  },

  methods: {
    async submit(e: Event) {
      e.preventDefault();
      //TODO
    },
  },
});
</script>
