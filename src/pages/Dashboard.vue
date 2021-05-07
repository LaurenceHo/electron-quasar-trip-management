<template>
  <q-page :class="['column', 'items-center', isLoading ? 'justify-center' : '']">
    <div v-if="isLoading">
      <q-spinner-facebook color="primary" size="2em" />
    </div>
    <div v-else class="q-pt-md" style="width: 100%">
      <q-expansion-item v-for="trip in trips" :key="trip._id">
        <template v-slot:header>
          <q-item-section side>
            <div class="row items-center">
              <q-icon
                :color="`${trip.starred ? 'primary' : ''}`"
                :name="`mdi-star${trip.starred ? '' : '-outline'}`"
                size="sm"
                @click="updateStarred(trip)"
              />
              <q-icon
                :color="`${trip.archived ? 'primary' : ''}`"
                :name="`mdi-archive-arrow-down${trip.archived ? '' : '-outline'}`"
                size="sm"
                @click="updateArchived(trip)"
              />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ localDateTimeFormat(trip.startDate) }} ~ {{ localDateTimeFormat(trip.endDate) }}
            </q-item-label>
            <q-item-label caption lines="2">{{ trip.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ trip.destination }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="mdi-pencil" size="sm" @click="editTrip(trip._id)" />
          </q-item-section>
        </template>

        <q-card>
          <q-card-section> TODO</q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <trip-form />
  </q-page>
</template>

<script lang="ts">
import TripForm from 'components/TripForm.vue';
import { Notify } from 'quasar';
import { Messages } from 'src/constants/messages';
import { localDateTimeFormat } from 'src/helper';
import { ActionType } from 'src/store/types';
import { OpenedForm, TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
  components: { TripForm },
  props: {
    filter: {
      type: String,
      required: true,
    },
  },

  data() {
    const tripService: TripService = (window as any).TripService;
    const trips: TripModel[] = [];
    const messages = Messages;

    return {
      isLoading: false,
      tripService,
      trips,
      messages,
    };
  },

  async mounted() {
    await this.findTrips(this.filter);
  },

  computed: {
    localDateTimeFormat() {
      return localDateTimeFormat;
    },

    openedForm(): OpenedForm {
      return this.$store.state.openedForm;
    },
  },

  watch: {
    async filter(keyWord: string) {
      await this.findTrips(keyWord);
    },

    async openedForm(openedForm: OpenedForm, prev: OpenedForm) {
      if (prev.type === 'trip' && prev.mode === 'edit' && openedForm.type === null && openedForm.mode === null) {
        this.trips = await this.tripService.findAllTrips();
      }
    },
  },

  methods: {
    async findTrips(keyWord: string): Promise<void> {
      this.isLoading = true;
      try {
        if (keyWord === 'all') {
          this.trips = await this.tripService.findAllTrips();
        } else if (keyWord === 'starred') {
          this.trips = await this.tripService.findTripsByStarred();
        } else if (keyWord === 'archived') {
          this.trips = await this.tripService.findTripsByArchived();
        } else if (keyWord === 'future' || keyWord === 'current' || keyWord === 'past') {
          this.trips = await this.tripService.findTripsByTime(keyWord);
        }
      } catch (error) {
        Notify.create({
          message: this.messages.dataStoreError,
          color: 'negative',
        });
      } finally {
        this.isLoading = false;
      }
    },

    async editTrip(tripId: string) {
      await this.$store.dispatch(ActionType.setOpenedForm, { type: 'trip', mode: 'edit', selectedId: tripId });
    },

    async updateStarred(tripModel: TripModel) {
      //TODO
    },

    async updateArchived(tripModel: TripModel) {
      //TODO
    },
  },
});
</script>
