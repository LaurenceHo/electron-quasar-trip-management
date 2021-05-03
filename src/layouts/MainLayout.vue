<template>
  <q-layout style="background: #fff" view="hHh lpR fFf">
    <q-drawer
      :breakpoint="500"
      :mini="miniState"
      :width="250"
      bordered
      class="bg-grey-3"
      show-if-above
      @click.capture="drawerClick"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <template v-for="menu in menus">
            <template v-if="!menu.children">
              <q-item
                :key="menu.keyWord"
                :active="menu.keyWord === selectedMenu"
                clickable
                @click="selectedMenu = menu.keyWord"
              >
                <q-item-section v-if="menu.icon" avatar>
                  <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>{{ menu.title }}</q-item-section>
              </q-item>
            </template>
            <template v-else>
              <q-expansion-item
                :key="menu.keyWord"
                :icon="menu.icon"
                :label="menu.title"
                default-opened
                expand-separator
              >
                <q-list padding>
                  <q-item
                    v-for="childMenu in menu.children"
                    :key="childMenu.keyWord"
                    :active="childMenu.keyWord === selectedMenu"
                    class="q-pl-md"
                    clickable
                    @click="selectedMenu = childMenu.keyWord"
                  >
                    <q-item-section v-if="childMenu.icon" avatar>
                      <q-icon :name="childMenu.icon" />
                    </q-item-section>
                    <q-item-section>{{ childMenu.title }}</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </template>
          </template>
        </q-list>
      </q-scroll-area>

      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn color="secondary" dense icon="mdi-chevron-left" round unelevated @click="miniState = true" />
      </div>
    </q-drawer>

    <q-page-container>
      <trips />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Trips from 'pages/Trips.vue';
import { defineComponent, ref } from 'vue';

interface Menus {
  title: string;
  icon?: string;
  keyWord: string;
  children?: Menus[];
}

export default defineComponent({
  name: 'MainLayout',
  components: { Trips },
  setup() {
    const selectedMenu = ref('all');
    const miniState = ref(false);
    const menus: Menus[] = [
      {
        title: 'New trip',
        icon: 'mdi-plus',
        keyWord: 'new',
      },
      {
        title: 'All trips',
        icon: 'mdi-format-list-bulleted',
        keyWord: 'all',
      },
      {
        title: 'Starred',
        icon: 'mdi-star-outline',
        keyWord: 'starred',
      },
      {
        title: 'Filter by date',
        icon: 'mdi-filter-variant',
        keyWord: 'date',
        children: [
          {
            title: 'Upcoming',
            keyWord: 'future',
          },
          {
            title: 'Currently Traveling',
            keyWord: 'current',
          },
          {
            title: 'Past',
            keyWord: 'past',
          },
        ],
      },
      {
        title: 'Archived',
        icon: 'mdi-archive-arrow-down',
        keyWord: 'archived',
      },
    ];
    return {
      menus,
      selectedMenu,
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
