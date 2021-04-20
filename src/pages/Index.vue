<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="createTrip">Create trip</q-btn>
    <ul>
      <li v-for="trip in trips" :key="trip._id">{{ trip._id }} | {{ trip.startDate }} | {{ trip.endDate }}</li>
    </ul>
  </q-page>
</template>

<script lang="ts">
import { TripModel } from 'components/models';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',

  data() {
    const tripApi: any = (window as any).tripApi;
    const trips: TripModel[] = [];
    return {
      tripApi,
      trips,
    };
  },

  async mounted() {
    this.trips = await this.tripApi.findAllTrips();
  },

  methods: {
    async createTrip() {
      await this.tripApi.create({
        timezoneId: '123',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-01-28'),
        destination: 'somewhere',
      });
      this.trips = await this.tripApi.findAllTrips();
    },
    async updateTrip() {
      await this.tripApi.updateTrip('HqosslIa0LWvMeCC', {
        timezoneId: '23456',
        startDate: new Date('2020-03-01'),
        endDate: new Date('2020-03-28'),
        destination: 'somewhere',
      });
      this.trips = await this.tripApi.findAllTrips();
    },
  },
});
</script>
