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
      :active="tripDay._id === selectedTrip"
      active-class="bg-teal-1 text-grey-8"
      clickable
    >
      <q-item-section @click="selectTripDay(tripDay._id)">
        <q-item-label>
          {{ dateTimeFormat(tripDay.tripDate) }}
        </q-item-label>
        <q-item-label caption>{{ tripDay.name }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <q-btn flat icon="mdi-pencil" round @click="editTripDay(tripDay._id)" />
          <q-btn flat icon="mdi-delete" round @click="deleteTripDay(tripDay._id)" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
  <trip-day-form :selected-trip="selectedTrip" />
</template>

<script lang="ts" setup>
import TripDayForm from 'components/TripDayForm.vue';
import { localDateTimeFormat } from 'src/components/helper';
import { TripDayModel } from 'src/types/models';
import { TripDayService } from 'src/types/type';
import { appStore } from 'stores/app-store';
import { computed, onMounted, ref, toRefs, watch } from 'vue';

const props = defineProps({
  selectedTrip: {
    type: Object,
    required: true,
  },
});

const { selectedTrip } = toRefs(props);
const tripDayService: TripDayService = (window as any).TripDayService;
const store = appStore();

const tripDays = ref([] as TripDayModel[]);
const selectedTripDay = ref('');

const openedForm = computed(() => store.openedForm);

const dateTimeFormat = (dateTime: string) => localDateTimeFormat(dateTime);

const selectTripDay = (tripDayId: string) => (selectedTripDay.value = tripDayId);

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
  tripDays.value = await tripDayService.findTripDaysByTrip(selectedTrip.value._id);
  // TODO, should open confirm modal
};

onMounted(async () => {
  if (selectedTrip.value?._id) {
    tripDays.value = await tripDayService.findTripDaysByTrip(selectedTrip.value._id);
  }
});

watch(selectedTrip, async (trip) => {
  if (trip._id) {
    tripDays.value = await tripDayService.findTripDaysByTrip(trip._id);
  }
});

watch(openedForm, async (newValue, prevValue) => {
  if (prevValue.type === 'tripDay' && newValue.type === null && newValue.mode === null && selectedTrip.value?._id) {
    tripDays.value = await tripDayService.findTripDaysByTrip(selectedTrip.value._id);
  }
});
</script>
