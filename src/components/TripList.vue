<template>
  <q-list>
    <q-item
      v-for="trip in trips as TripModel[]"
      :key="trip._id"
      :active="trip._id === selectedTrip?._id"
      active-class="bg-teal-1 text-grey-8"
      clickable
    >
      <q-item-section side v-if="!selectedTripDayId">
        <div class="row items-center">
          <q-btn
            :color="`${trip.starred ? 'primary' : ''}`"
            :icon="`mdi-star${trip.starred ? '' : '-outline'}`"
            flat
            round
            size="sm"
            @click="updateStarred(trip)"
          />
          <q-btn
            :color="`${trip.archived ? 'primary' : ''}`"
            :icon="`mdi-archive-arrow-down${trip.archived ? '' : '-outline'}`"
            flat
            round
            size="sm"
            @click="updateArchived(trip)"
          />
        </div>
      </q-item-section>
      <q-item-section @click="selectTrip(trip)">
        <q-item-label class="text-weight-medium">
          {{ dateTimeFormat(trip.startDate) }} ~ {{ dateTimeFormat(trip.endDate) }}
        </q-item-label>
        <q-item-label caption>{{ trip.name }}</q-item-label>
      </q-item-section>
      <q-item-section side v-if="!selectedTripDayId">
        <q-item-label caption>{{ trip.destination }}</q-item-label>
      </q-item-section>
      <q-item-section side v-if="!selectedTripDayId">
        <q-btn flat icon="mdi-pencil" round @click="editTrip(trip._id ?? '')" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { localDateTimeFormat } from 'src/components/helper';
import { Messages } from 'src/constants/messages';
import { TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { appStore } from 'stores/app-store';
import { computed, ref } from 'vue';

defineProps({
  trips: {
    type: Array,
    required: true,
    default: () => [] as TripModel[],
  },
});

const messages = Messages;
const tripService: TripService = window.TripService;
const store = appStore();

const selectedTrip = computed(() => store.selectedTrip);
const selectedTripDayId = computed(() => store.selectedTripDayId);

const dateTimeFormat = (dateTime: string) => localDateTimeFormat(dateTime);

const selectTrip = (trip: TripModel) => {
  if (selectedTrip.value?._id === trip._id) {
    store.setSelectedTrip(null);
    store.setSelectedTripDayId('');
  } else {
    store.setSelectedTrip(trip);
    store.setSelectedTripDayId('');
  }
};

const editTrip = (tripId: string) => store.setOpenedForm({ type: 'trip', mode: 'edit', selectedId: tripId as any });

const updateStarred = async (tripModel: TripModel) => {
  tripModel.starred = !tripModel.starred;
  try {
    await tripService.update(tripModel._id as string, JSON.parse(JSON.stringify(tripModel)));
  } catch (error) {
    Notify.create({
      message: messages.dataStoreError,
      color: 'negative',
    });
  }
};

const updateArchived = async (tripModel: TripModel) => {
  tripModel.archived = !tripModel.archived;
  try {
    await tripService.update(tripModel._id as string, JSON.parse(JSON.stringify(tripModel)));
  } catch (error) {
    Notify.create({
      message: messages.dataStoreError,
      color: 'negative',
    });
  }
};
</script>
