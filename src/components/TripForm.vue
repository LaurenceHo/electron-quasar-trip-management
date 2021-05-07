<template>
  <q-dialog v-model="isDialogOpen">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ openedForm.mode === 'create' ? 'Create' : 'Update' }} trip</div>
        <q-space />
        <q-btn v-close-popup dense flat icon="mdi-close" round @click="isDialogOpen = false" />
      </q-card-section>
      <q-card-section>
        <div>
          <q-input v-model="tripModel.name" autofocus class="q-pb-lg" dense label="Trip name" outlined />
          <div class="row q-col-gutter-md q-pb-lg">
            <q-input v-model="tripModel.destination" class="col" dense label="Destination" outlined />
            <q-select
              v-model="tripModel.timezoneId"
              :options="timezoneList"
              class="col"
              dense
              emit-value
              label="Timezone"
              map-options
              outlined
            />
          </div>
          <q-input v-model="dateRangeDisplay" class="q-pb-lg" dense label="Trip date" outlined readonly>
            <template v-slot:append>
              <q-icon class="cursor-pointer" name="mdi-calendar-month-outline">
                <q-popup-proxy ref="qDateProxy" transition-hide="scale" transition-show="scale">
                  <q-date v-model="dateRange" mask="YYYY-MM-DD" range>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="Cancel" />
        <q-btn v-close-popup :label="openedForm.mode === 'create' ? 'Create' : 'Update'" flat @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import isEmpty from 'lodash/isEmpty';
import { Notify } from 'quasar';
import { Messages } from 'src/constants/messages';
import { ActionType } from 'src/store/types';
import { OpenedForm, TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { defineComponent } from 'vue';
import { localDateTimeFormat } from '../helper';

export default defineComponent({
  name: 'TripForm',

  data() {
    const tripService: TripService = (window as any).TripService;
    const tripModel: TripModel = {
      timezoneId: '',
      name: '',
      startDate: '',
      endDate: '',
      destination: '',
    };
    const isDialogOpen = false;
    const dateRange = { from: '', to: '' };
    const messages = Messages;

    return {
      tripService,
      isDialogOpen,
      dateRange,
      tripModel,
      messages,
    };
  },

  computed: {
    openedForm(): OpenedForm {
      return this.$store.state.openedForm;
    },

    dateRangeDisplay(): string {
      if (!isEmpty(this.dateRange) && !isEmpty(this.dateRange.from) && !isEmpty(this.dateRange.to)) {
        return `${localDateTimeFormat(this.dateRange.from)} ~ ${localDateTimeFormat(this.dateRange.to)}`;
      }
      return '';
    },

    timezoneList() {
      return this.$store.state.timezone;
    },
  },

  watch: {
    async isDialogOpen(value: boolean) {
      if (!value) {
        this.tripModel = {
          timezoneId: '',
          name: '',
          startDate: '',
          endDate: '',
          destination: '',
        };
        this.dateRange = { from: '', to: '' };
        await this.$store.dispatch(ActionType.setOpenedForm, { type: null, mode: null, selectedId: null });
      }
    },

    async openedForm(openedForm: OpenedForm) {
      try {
        if (openedForm.type === 'trip') {
          this.isDialogOpen = true;
        }
        if (openedForm.mode === 'edit') {
          if (openedForm.selectedId) {
            this.tripModel = await this.tripService.findOneById(openedForm.selectedId);
            this.dateRange = {
              from: this.tripModel.startDate,
              to: this.tripModel.endDate,
            };
          } else {
            Notify.create({
              message: this.messages.incorrectTripId,
              color: 'negative',
            });
          }
        }
      } catch (error) {
        Notify.create({
          message: this.messages.dataStoreError,
          color: 'negative',
        });
      }
    },

    dateRange(value: { from: string; to: string }) {
      if (!isEmpty(value)) {
        this.tripModel.startDate = value.from;
        this.tripModel.endDate = value.to;
      }
    },
  },

  methods: {
    async submit(e: Event) {
      e.preventDefault();
      try {
        if (this.openedForm.mode === 'edit' && this.tripModel._id) {
          await this.tripService.update(this.tripModel._id, JSON.parse(JSON.stringify(this.tripModel)));
        } else if (this.openedForm.mode === 'create') {
          await this.tripService.create(JSON.parse(JSON.stringify(this.tripModel)));
        }
      } catch (error) {
        Notify.create({
          message: `${error}`,
          color: 'negative',
        });
      }
    },
  },
});
</script>
