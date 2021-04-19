<template>
  <q-layout view="hHh lpR fFf" style="background: #fff">
    <q-drawer
      show-if-above
      :mini="miniState"
      @click.capture="drawerClick"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-plus" />
            </q-item-section>
            <q-item-section> New trip </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-format-list-bulleted" />
            </q-item-section>
            <q-item-section> All </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-star-outline" />
            </q-item-section>
            <q-item-section> Starred </q-item-section>
          </q-item>

          <q-expansion-item expand-separator icon="mdi-filter-variant" label="Filter">
            <q-list padding>
              <q-item clickable class="q-pl-md">
                <q-item-section> Upcoming </q-item-section>
              </q-item>
              <q-item clickable class="q-pl-md">
                <q-item-section> Currently Traveling </q-item-section>
              </q-item>
              <q-item clickable class="q-pl-md">
                <q-item-section> Past </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-inbox-arrow-down" />
            </q-item-section>
            <q-item-section> Archived </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn dense round unelevated color="secondary" icon="mdi-chevron-left" @click="miniState = true" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const miniState = ref(false);

    return {
      miniState,
      drawerClick(e: Event) {
        if (miniState.value) {
          miniState.value = false;
          e.stopPropagation();
        }
      },
    };
  },
});
</script>
