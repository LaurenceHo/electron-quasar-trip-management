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

<script lang="ts" setup>
import isEmpty from 'lodash/isEmpty';
import { Notify } from 'quasar';
import { localDateTimeFormat } from 'src/components/helper';
import { Messages } from 'src/constants/messages';
import { TripDayService } from 'src/types/type';
import { appStore } from 'stores/app-store';
import { computed, ref, toRefs, watch } from 'vue';
import { TripDayModel } from '../types/models';

const props = defineProps({
  selectedTrip: {
    type: Object,
    required: true,
  },
});

const { selectedTrip } = toRefs(props);
const messages = Messages;
const tripDayService: TripDayService = (window as any).TripDayService;

const tripDayModel = ref({
  tripId: '',
  name: '',
  tripDate: '',
} as TripDayModel);

const isDialogOpen = ref(false);
const store = appStore();

const openedForm = computed(() => store.openedForm);
const selectedTripDay = computed(() => {
  if (!isEmpty(tripDayModel.value.tripDate)) {
    return localDateTimeFormat(tripDayModel.value.tripDate);
  }
  return '';
});

const submit = async () => {
  try {
    if (openedForm.value.mode === 'create') {
      await tripDayService.create(JSON.parse(JSON.stringify(tripDayModel.value)));
    } else if (openedForm.value.mode === 'edit' && tripDayModel.value._id) {
      //TODO, edit trip day
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
  tripDayModel.value = {
    tripId: '',
    name: '',
    tripDate: '',
  };
};

watch(isDialogOpen, (newValue) => {
  if (!newValue) {
    resetForm();
    store.closeForm();
  }
});

watch(openedForm, (newValue) => {
  try {
    if (newValue.type === 'tripDay') {
      isDialogOpen.value = true;
      if (newValue.mode === 'create') {
        tripDayModel.value.tripId = selectedTrip.value._id;
      } else if (newValue.mode === 'edit') {
        //TODO, edit trip day
      }
    }
  } catch (error) {
    Notify.create({
      message: messages.dataStoreError,
      color: 'negative',
    });
  }
});
</script>
