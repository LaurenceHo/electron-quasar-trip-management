<template>
  <q-page :class="['column', 'items-center', isLoading ? 'justify-center' : '']">
    <div v-if="isLoading">
      <q-spinner-facebook color="primary" size="2em" />
    </div>
    <div v-else class="q-pt-md">
      <q-list>
        <q-item v-for="trip in trips" :key="trip._id">
          <q-item-section>
            <q-item-label>{{ trip.startDate }} ~ {{ trip.endDate }}</q-item-label>
            <q-item-label caption lines="2">{{ trip.name }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ trip.destination }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Trips',

  props: {
    filter: {
      type: String,
      required: true,
    },
  },

  data() {
    const tripService: TripService = (window as any).TripService;
    const trips: TripModel[] = [];
    return {
      isLoading: false,
      tripService,
      trips,
    };
  },

  async mounted() {
    await this.findTrips(this.filter);
  },

  watch: {
    async filter(keyWord: string) {
      await this.findTrips(keyWord);
    },
  },

  methods: {
    async findTrips(keyWord: string): Promise<void> {
      this.isLoading = true;
      if (keyWord === 'all') {
        this.trips = await this.tripService.findAllTrips();
      } else if (keyWord === 'starred') {
        this.trips = await this.tripService.findTripsByStarred();
      } else if (keyWord === 'archived') {
        this.trips = await this.tripService.findTripsByArchived();
      } else if (keyWord === 'future' || keyWord === 'current' || keyWord === 'past') {
        this.trips = await this.tripService.findTripsByTime(keyWord);
      }
      this.isLoading = false;
    },
  },
});
</script>
