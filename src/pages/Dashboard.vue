<template>
  <q-page :class="['column', 'items-center', isLoading ? 'justify-center' : '']">
    <div v-if="isLoading">
      <q-spinner-facebook color="primary" size="2em" />
    </div>
    <div v-else style="width: 100%">
      <div class="row">
        <div
          :class="[
            selectedTrip._id && selectedTripDayId.length === 0
              ? 'col-8'
              : selectedTrip._id > 0 && selectedTripDayId > 0
              ? 'col-4'
              : 'col',
          ]"
        >
          <trip-list :trips="trips" @selectTrip="selectTrip" />
        </div>
        <div v-if="selectedTrip._id" class="col-4">
          <trip-day-list :selected-trip="selectedTrip" />
        </div>
      </div>
    </div>
    <trip-form />
  </q-page>
</template>

<script lang="ts">
import TripDayList from 'components/TripDayList.vue';
import TripForm from 'components/TripForm.vue';
import TripList from 'components/TripList.vue';
import { Notify } from 'quasar';
import { Messages } from 'src/constants/messages';
import { ActionType } from 'src/store/types';
import { OpenedForm, TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
  components: { TripDayList, TripList, TripForm },
  props: {
    filter: {
      type: String,
      required: true,
    },
  },

  data() {
    const tripService: TripService = (window as any).TripService;
    const trips: TripModel[] = [];
    const selectedTrip: TripModel = {
      timezoneId: '',
      name: '',
      startDate: '',
      endDate: '',
      destination: '',
    };

    return {
      isLoading: false,
      tripService,
      trips,
      messages: Messages,
      selectedTrip,
      selectedTripDayId: '',
    };
  },

  async mounted() {
    await this.findTrips(this.filter);
  },

  computed: {
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

    selectTrip(trip: TripModel) {
      if (trip._id) {
        this.selectedTrip = trip;
        this.$store.dispatch(ActionType.setMiniDrawer, true);
      }
    },
  },
});
</script>
