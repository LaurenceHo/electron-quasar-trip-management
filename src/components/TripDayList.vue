<template>
  <q-list>
    <q-item clickable @click="createTripDay">
      <q-item-section avatar>
        <q-icon name="mdi-plus" />
      </q-item-section>
      <q-item-section>Create trip day</q-item-section>
    </q-item>
    <q-item
      v-for="tripDay in tripDays"
      :key="tripDay._id"
      :active="tripDay._id === selectedTripDayId"
      active-class="bg-teal-1 text-grey-8"
      clickable
    >
      <q-item-section @click="selectTripDay(tripDay._id ?? '')">
        <q-item-label class="text-weight-medium">
          {{ dateTimeFormat(tripDay.tripDate) }}
        </q-item-label>
        <q-item-label caption>{{ tripDay.name }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <q-btn flat icon="mdi-pencil" round @click="editTripDay(tripDay._id ?? '')" />
          <q-btn flat icon="mdi-delete" round @click="openConfirmDialog(tripDay._id ?? '')" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
  <TripDayForm :selected-trip="selectedTrip" />
  <q-dialog v-model="confirmDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-icon color="primary" name="mdi-alert-circle" size="md" />
        <span class="q-ml-sm">Are you sure you want to delete trip day? It cannot be undone.</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="deleteTripDay(selectedTripDayId)" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import TripDayForm from 'components/TripDayForm.vue';
import { localDateTimeFormat } from 'src/components/helper';
import { TripDayModel } from 'src/types/models';
import { TripDayService } from 'src/types/type';
import { appStore } from 'stores/app-store';
import { computed, onMounted, ref, watch } from 'vue';

const tripDayService: TripDayService = window.TripDayService;
const store = appStore();

const tripDays = ref([] as TripDayModel[]);
const confirmDialog = ref(false);

const selectedTrip = computed(() => store.selectedTrip);
const selectedTripDayId = computed(() => store.selectedTripDayId);
const openedForm = computed(() => store.openedForm);

const dateTimeFormat = (dateTime: string) => localDateTimeFormat(dateTime);

const selectTripDay = (tripDayId: string) =>
  store.setSelectedTripDayId(selectedTripDayId.value === tripDayId ? '' : tripDayId);

const createTripDay = () =>
  store.setOpenedForm({
    type: 'tripDay',
    mode: 'create',
    selectedId: null,
  });

const editTripDay = (tripDayId: string) =>
  store.setOpenedForm({
    type: 'tripDay',
    mode: 'edit',
    selectedId: tripDayId,
  });

const deleteTripDay = async (tripDayId: string) => {
  await (tripDayService as any).delete(tripDayId);
  // Refresh trip day list
  tripDays.value = await tripDayService.findTripDaysByTrip(selectedTrip.value?._id ?? '');
};

const openConfirmDialog = (tripDayId: string) => {
  confirmDialog.value = true;
  store.setSelectedTripDayId(tripDayId);
};

onMounted(async () => {
  if (selectedTrip.value?._id) {
    tripDays.value = await tripDayService.findTripDaysByTrip(selectedTrip.value?._id ?? '');
  }
});

watch(selectedTrip, async (trip) => {
  if (trip?._id) {
    tripDays.value = await tripDayService.findTripDaysByTrip(trip._id);
  }
});

watch(openedForm, async (newValue, prevValue) => {
  if (prevValue.type === 'tripDay' && newValue.type === null && newValue.mode === null && selectedTrip.value?._id) {
    tripDays.value = await tripDayService.findTripDaysByTrip(selectedTrip.value._id);
  }
});
</script>
