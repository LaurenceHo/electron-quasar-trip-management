<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="createTrip">Create trip</q-btn>
    <ul>
      <li v-for="trip in trips">{{ trip._id }} | {{ trip.start_date }} | {{ trip.end_date }}</li>
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
      const newTrip = await this.tripApi.createTrip({
        timezone_id: 1,
        start_date: new Date(),
        end_date: new Date(),
        destination: 'somewhere',
      });
      console.log(newTrip);
      this.trips = await this.tripApi.findAllTrips();
    },
  },
});
</script>
