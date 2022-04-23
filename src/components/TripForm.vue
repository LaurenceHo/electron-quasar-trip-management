<template>
  <q-dialog v-model="isDialogOpen">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ openedForm.mode === 'create' ? 'Create' : 'Update' }} trip</div>
        <q-space />
        <q-btn v-close-popup dense flat icon="mdi-close" round @click="isDialogOpen = false" />
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section>
          <q-input v-model="tripModel.name" autofocus class="q-pb-lg" dense label="Trip name" outlined />
          <div class="row q-col-gutter-md q-pb-lg">
            <q-input
              v-model="tripModel.destination"
              :rules="[(val) => (val && val.length > 0) || 'Destination is required']"
              class="col"
              dense
              hint="This field is required"
              label="Destination"
              outlined
            />
            <q-select
              v-model="tripModel.timezoneId"
              :options="timezoneList"
              :rules="[(val) => (val && val.length > 0) || 'Timezone is required']"
              class="col"
              dense
              emit-value
              hint="This field is required"
              label="Timezone"
              map-options
              outlined
            />
          </div>
          <q-input
            v-model="dateRangeDisplay"
            :rules="[(val) => (val && val.length > 0) || 'Date range is required']"
            class="q-pb-lg"
            dense
            hint="This field is required"
            label="Trip date"
            outlined
            readonly
          >
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
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat label="Cancel" />
          <q-btn :label="openedForm.mode === 'create' ? 'Create' : 'Update'" flat type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import isEmpty from 'lodash/isEmpty';
import { Notify } from 'quasar';
import { localDateTimeFormat } from 'src/components/helper';
import { Messages } from 'src/constants/messages';
import { TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { appStore } from 'stores/app-store';
import { computed, ref, watch } from 'vue';

const messages = Messages;
const tripService: TripService = (window as any).TripService;
const store = appStore();

const isDialogOpen = ref(false);
const dateRange = ref({ from: '', to: '' });
const tripModel = ref({
  timezoneId: '',
  name: '',
  startDate: '',
  endDate: '',
  destination: '',
} as TripModel);

const openedForm = computed(() => store.openedForm);
const timezoneList = computed(() => store.timezone);
const dateRangeDisplay = computed(() => {
  if (!isEmpty(dateRange.value) && !isEmpty(dateRange.value.from) && !isEmpty(dateRange.value.to)) {
    return `${localDateTimeFormat(dateRange.value.from)} ~ ${localDateTimeFormat(dateRange.value.to)}`;
  }
  return '';
});

const onSubmit = async () => {
  try {
    if (openedForm.value.mode === 'edit' && tripModel.value._id) {
      await tripService.update(tripModel.value._id, JSON.parse(JSON.stringify(tripModel.value)));
    } else if (openedForm.value.mode === 'create') {
      await tripService.create(JSON.parse(JSON.stringify(tripModel.value)));
    }
    isDialogOpen.value = false;
  } catch (error) {
    Notify.create({
      message: `${error}`,
      color: 'negative',
    });
  }
};
const resetForm = () => {
  tripModel.value = {
    timezoneId: '',
    name: '',
    startDate: '',
    endDate: '',
    destination: '',
  };

  dateRange.value = { from: '', to: '' };
};

watch(isDialogOpen, (newValue) => {
  if (!newValue) {
    resetForm();
    store.closeForm();
  }
});

watch(openedForm, async (newValue) => {
  try {
    if (newValue.type === 'trip') {
      isDialogOpen.value = true;
      if (newValue.mode === 'edit') {
        if (openedForm.value.selectedId) {
          tripModel.value = await tripService.findOneById(openedForm.value.selectedId);
          dateRange.value = {
            from: tripModel.value.startDate,
            to: tripModel.value.endDate,
          };
        } else {
          Notify.create({
            message: messages.incorrectTripId,
            color: 'negative',
          });
        }
      }
    }
  } catch (error) {
    Notify.create({
      message: messages.dataStoreError,
      color: 'negative',
    });
  }
});

watch(
  dateRange,
  (newValue) => {
    if (!isEmpty(newValue)) {
      tripModel.value.startDate = newValue.from;
      tripModel.value.endDate = newValue.to;
    }
  },
  { immediate: true, deep: true }
);
</script>
