<template>
  <q-list>
    <q-item
      v-for="trip in trips"
      :key="trip._id"
      :active="trip._id === selectedTrip"
      active-class="bg-teal-1 text-grey-8"
      clickable
    >
      <q-item-section side>
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
      <q-item-section @click="selectTrip(trip._id)">
        <q-item-label>
          {{ localDateTimeFormat(trip.startDate) }} ~ {{ localDateTimeFormat(trip.endDate) }}
        </q-item-label>
        <q-item-label caption>{{ trip.name }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>{{ trip.destination }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn flat icon="mdi-pencil" round @click="editTrip(trip._id)" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { Notify } from 'quasar';
import { Messages } from 'src/constants/messages';
import { localDateTimeFormat } from 'src/helper';
import { ActionType } from 'src/store/types';
import { OpenedForm, TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TripList',

  props: {
    trips: {
      type: Array,
      required: true,
    },
  },

  data() {
    const tripService: TripService = (window as any).TripService;
    const selectedTrip = '';
    const messages = Messages;

    return {
      selectedTrip,
      tripService,
      messages,
    };
  },

  computed: {
    localDateTimeFormat() {
      return localDateTimeFormat;
    },

    openedForm(): OpenedForm {
      return this.$store.state.openedForm;
    },
  },

  methods: {
    selectTrip(tripId: string) {
      this.selectedTrip = tripId;
      this.$emit('selectTrip', tripId);
    },

    async editTrip(tripId: string) {
      await this.$store.dispatch(ActionType.setOpenedForm, { type: 'trip', mode: 'edit', selectedId: tripId });
    },

    async updateStarred(tripModel: TripModel) {
      tripModel.starred = !tripModel.starred;
      try {
        await this.tripService.update(tripModel._id as string, JSON.parse(JSON.stringify(tripModel)));
      } catch (error) {
        Notify.create({
          message: this.messages.dataStoreError,
          color: 'negative',
        });
      }
    },

    async updateArchived(tripModel: TripModel) {
      tripModel.archived = !tripModel.archived;
      try {
        await this.tripService.update(tripModel._id as string, JSON.parse(JSON.stringify(tripModel)));
      } catch (error) {
        Notify.create({
          message: this.messages.dataStoreError,
          color: 'negative',
        });
      }
    },
  },
});
</script>
