<template>
  <q-page :class="['column', 'items-center', isLoading ? 'justify-center' : '']">
    <div v-if="isLoading">
      <q-spinner-facebook color="primary" size="2em" />
    </div>
    <div v-else style="width: 100%">
      <div class="row">
        <div class="col">
          <trip-list :trips="trips" @selectTrip="selectTrip" />
        </div>
        <div v-if="selectedTrip" class="col">
          <q-list>
            <q-item clickable>
              <q-item-section>Single line item</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
    <trip-form />
  </q-page>
</template>

<script lang="ts">
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
  components: { TripList, TripForm },
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
      selectedTrip: '',
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

    selectTrip(tripId: string) {
      if (tripId) {
        console.log(tripId);
        this.selectedTrip = tripId;
        this.$store.dispatch(ActionType.setMiniDrawer, true);
      }
    },
  },
});
</script>
