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
          {{ localDateTimeFormat(tripDay.tripDate) }}
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

<script lang="ts">
import TripDayForm from 'components/TripDayForm.vue';
import { Messages } from 'src/constants/messages';
import { localDateTimeFormat } from 'src/helper';
import { TripDayService } from 'src/types/type';
import { ActionType } from 'src/store/types';
import { OpenedForm, TripDayModel, TripModel } from 'src/types/models';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TripDayList',

  components: {
    TripDayForm,
  },

  props: {
    selectedTrip: {
      type: Object,
      required: true,
    },
  },

  data() {
    const tripDayService: TripDayService = (window as any).TripDayService;
    const tripDays: TripDayModel[] = [];
    const messages = Messages;
    const selectedTripDay = '';

    return {
      tripDayService,
      tripDays,
      messages,
      selectedTripDay,
    };
  },

  async mounted() {
    if (this.selectedTrip._id) {
      this.tripDays = await this.tripDayService.findTripDaysByTrip(this.selectedTrip._id);
    }
  },

  computed: {
    openedForm(): OpenedForm {
      return this.$store.state.openedForm;
    },
  },

  watch: {
    async selectedTrip(trip: TripModel) {
      if (trip._id) {
        this.tripDays = await this.tripDayService.findTripDaysByTrip(trip._id);
      }
    },

    async openedForm(openedForm: OpenedForm, prev: OpenedForm) {
      if (prev.type === 'tripDay' && openedForm.type === null && openedForm.mode === null && this.selectedTrip._id) {
        this.tripDays = await this.tripDayService.findTripDaysByTrip(this.selectedTrip._id);
      }
    },
  },

  methods: {
    localDateTimeFormat(dateTime: string) {
      return localDateTimeFormat(dateTime);
    },

    selectTripDay(tripDayId: string) {
      this.selectedTripDay = tripDayId;
    },

    async createTripDay() {
      await this.$store.dispatch(ActionType.setOpenedForm, {
        type: 'tripDay',
        mode: 'create',
        selectedId: null,
      });
    },

    async editTripDay(tripDayId: string) {
      //TODO
    },

    async deleteTripDay(tripDayId: string) {
      //TODO
    },
  },
});
</script>
