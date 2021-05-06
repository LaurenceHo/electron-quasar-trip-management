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
              />
              <q-icon
                :color="`${trip.archived ? 'primary' : ''}`"
                :name="`mdi-archive-arrow-down${trip.archived ? '' : '-outline'}`"
                size="sm"
              />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ trip.startDate }} ~ {{ trip.endDate }}</q-item-label>
            <q-item-label caption lines="2">{{ trip.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ trip.destination }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="mdi-pencil" size="sm" />
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi
            magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus
            ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <q-dialog v-model="isCreateTripDialogOpen">
      <q-card style="min-width: 600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create trip</div>
          <q-space />
          <q-btn v-close-popup dense flat icon="mdi-close" round @click="isCreateTripDialogOpen = false" />
        </q-card-section>
        <q-card-section>
          <div>
            <q-input v-model="tripModel.name" autofocus class="q-pb-lg" dense label="Trip name" outlined />
            <div class="row q-col-gutter-md q-pb-lg">
              <q-input v-model="tripModel.destination" class="col" dense label="Destination" outlined />
              <q-select
                v-model="tripModel.timezoneId"
                :options="store.state.timezone"
                class="col"
                dense
                label="Timezone"
                outlined
              />
            </div>
            <div class="row q-col-gutter-md">
              <q-input
                v-model="tripModel.startDate"
                :rules="['date']"
                class="col"
                dense
                label="Start date"
                mask="date"
                outlined
              >
                <template v-slot:append>
                  <q-icon class="cursor-pointer" name="mdi-calendar-month-outline">
                    <q-popup-proxy ref="qDateProxy" transition-hide="scale" transition-show="scale">
                      <q-date v-model="tripModel.startDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup color="primary" flat label="Close" />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                v-model="tripModel.endDate"
                :rules="['date']"
                class="col"
                dense
                label="End date"
                mask="date"
                outlined
              >
                <template v-slot:append>
                  <q-icon class="cursor-pointer" name="mdi-calendar-month-outline">
                    <q-popup-proxy ref="qDateProxy" transition-hide="scale" transition-show="scale">
                      <q-date v-model="tripModel.endDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup color="primary" flat label="Close" />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat label="Cancel" />
          <q-btn v-close-popup flat label="Create" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { useStore } from 'src/store';
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
    isCreateTrip: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    const store = useStore();
    const tripService: TripService = (window as any).TripService;
    const trips: TripModel[] = [];
    const tripModel: TripModel = {
      timezoneId: '',
      startDate: '',
      endDate: '',
      destination: '',
    };

    return {
      isLoading: false,
      isCreateTripDialogOpen: false,
      tripService,
      trips,
      tripModel,
      store,
    };
  },

  async mounted() {
    await this.findTrips(this.filter);
  },

  watch: {
    async filter(keyWord: string) {
      await this.findTrips(keyWord);
    },

    isCreateTrip(value: boolean) {
      this.isCreateTripDialogOpen = value;
    },

    isCreateTripDialogOpen(value: boolean) {
      if (!value) {
        this.$emit('closeDialog');
      }
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
