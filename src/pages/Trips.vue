<template>
  <q-page class="row items-center justify-evenly">
    <ul>
      <li v-for="trip in trips" :key="trip._id">{{ trip._id }} | {{ trip.startDate }} | {{ trip.endDate }}</li>
    </ul>
  </q-page>
</template>

<script lang="ts">
import { TripModel } from 'src/types/models';
import { TripApi } from 'src/types/type';
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
    const tripApi: TripApi = (window as any).tripApi;
    const trips: TripModel[] = [];
    return {
      tripApi,
      trips,
    };
  },

  async mounted() {
    this.trips = await this.tripApi.findAllTrips();
  },

  methods: {},
});
</script>
