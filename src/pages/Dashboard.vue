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
          <TripList :trips="trips" @selectTrip="selectTrip" />
        </div>
        <div v-if="selectedTrip._id" class="col-4">
          <TripDayList :selected-trip="selectedTrip" />
        </div>
      </div>
    </div>
    <TripForm />
  </q-page>
</template>

<script lang="ts" setup>
import TripDayList from 'components/TripDayList.vue';
import TripForm from 'components/TripForm.vue';
import TripList from 'components/TripList.vue';
import { Notify } from 'quasar';
import { Messages } from 'src/constants/messages';
import { TripModel } from 'src/types/models';
import { TripService } from 'src/types/type';
import { appStore } from 'stores/app-store';
import { computed, onMounted, ref, toRefs, watch } from 'vue';

const props = defineProps({
  filter: {
    type: String,
    required: true,
  },
});

const { filter } = toRefs(props);
const store = appStore();
const tripService: TripService = (window as any).TripService;

const messages = Messages;
const isLoading = ref(false);
const trips = ref([] as TripModel[]);
const selectedTrip = ref({
  timezoneId: '',
  name: '',
  startDate: '',
  endDate: '',
  destination: '',
} as TripModel);
const selectedTripDayId = ref('');

const openedForm = computed(() => store.openedForm);

const findTrips = async (keyWord: string): Promise<void> => {
  isLoading.value = true;
  try {
    if (keyWord === 'all') {
      trips.value = await tripService.findAllTrips();
    } else if (keyWord === 'starred') {
      trips.value = await tripService.findTripsByStarred();
    } else if (keyWord === 'archived') {
      trips.value = await tripService.findTripsByArchived();
    } else if (keyWord === 'future' || keyWord === 'current' || keyWord === 'past') {
      trips.value = await tripService.findTripsByTime(keyWord);
    }
  } catch (error) {
    Notify.create({
      message: messages.dataStoreError,
      color: 'negative',
    });
  } finally {
    isLoading.value = false;
  }
};

const selectTrip = (trip: TripModel) => {
  if (trip._id) {
    selectedTrip.value = trip;
    store.setMiniDrawer(true);
  }
};

watch(openedForm, async (newValue, prevValue) => {
  if (prevValue.type === 'trip' && prevValue.mode === 'edit' && newValue.type === null && newValue.mode === null) {
    trips.value = await tripService.findAllTrips();
  }
});

watch(filter, async (newValue) => {
  await findTrips(newValue);
});

onMounted(() => findTrips(filter.value));
</script>
