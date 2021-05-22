<template>
  <q-dialog v-model="isDialogOpen">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ openedForm.mode === 'create' ? 'Create' : 'Update' }} trip day</div>
        <q-space />
        <q-btn v-close-popup dense flat icon="mdi-close" round @click="isDialogOpen = false" />
      </q-card-section>
      <q-form @submit="submit">
        <q-card-section>
          <q-input v-model="tripDayModel.name" autofocus class="q-pb-lg" dense label="Trip name" outlined />
          <q-input
            v-model="selectedTripDay"
            :rules="[(val) => (val && val.length > 0) || 'This field is required']"
            dense
            label="Trip date"
            outlined
            readonly
          >
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="mdi-calendar-month-outline">
                <q-popup-proxy ref="qDateProxy" transition-hide="scale" transition-show="scale">
                  <q-date v-model="tripDayModel.tripDate" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat label="Cancel" />
          <q-btn :label="openedForm.mode === 'create' ? 'Create' : 'Update'" flat type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import isEmpty from 'lodash/isEmpty';
import { Notify } from 'quasar';
import { Messages } from 'src/constants/messages';
import { localDateTimeFormat } from 'src/helper';
import { ActionType } from 'src/store/types';
import { TripDayService } from 'src/types/type';
import { defineComponent } from 'vue';
import { OpenedForm, TripDayModel } from '../types/models';

export default defineComponent({
  name: 'TripDayForm',

  props: {
    selectedTrip: {
      type: Object,
      required: true,
    },
  },

  data() {
    const tripDayService: TripDayService = (window as any).TripDayService;
    const tripDayModel: TripDayModel = {
      tripId: '',
      name: '',
      tripDate: '',
    };

    return {
      tripDayService,
      tripDayModel,
      isDialogOpen: false,
      messages: Messages,
    };
  },

  computed: {
    openedForm(): OpenedForm {
      return this.$store.state.openedForm;
    },

    // Only for display, do nothing else
    selectedTripDay(): string {
      if (!isEmpty(this.tripDayModel.tripDate)) {
        return localDateTimeFormat(this.tripDayModel.tripDate);
      }
      return '';
    },
  },

  watch: {
    async isDialogOpen(value: boolean) {
      if (!value) {
        this.resetForm();
        await this.$store.dispatch(ActionType.closeForm);
      }
    },

    async openedForm(openedForm: OpenedForm) {
      try {
        if (openedForm.type === 'tripDay') {
          this.isDialogOpen = true;
          if (openedForm.mode === 'create') {
            this.tripDayModel.tripId = this.selectedTrip._id;
          } else if (openedForm.mode === 'edit') {
            //TODO
          }
        }
      } catch (error) {
        Notify.create({
          message: this.messages.dataStoreError,
          color: 'negative',
        });
      }
    },
  },

  methods: {
    async submit() {
      try {
        if (this.openedForm.mode === 'create') {
          await this.tripDayService.create(JSON.parse(JSON.stringify(this.tripDayModel)));
        } else if (this.openedForm.mode === 'edit' && this.tripDayModel._id) {
          //TODO
        }
        this.isDialogOpen = false;
      } catch (error) {
        Notify.create({
          message: `${error}`,
          color: 'negative',
        });
      }
    },

    resetForm() {
      this.tripDayModel = {
        tripId: '',
        name: '',
        tripDate: '',
      };
    },
  },
});
</script>
