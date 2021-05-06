<template>
  <q-layout style="background: #fff" view="hHh lpR fFf">
    <q-drawer
      :breakpoint="500"
      :mini="store.state.miniDrawer"
      :width="250"
      bordered
      class="bg-grey-3 app-drawer"
      show-if-above
      @click.capture="drawerClick"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="menu in menus">
            <template v-if="!menu.children">
              <q-item
                :key="menu.keyWord"
                :active="menu.keyWord === selectedMenu"
                active-class="bg-primary text-white"
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
                    active-class="bg-primary text-white"
                    class="q-pl-xl"
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

      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -12px">
        <q-btn
          class="app-drawer-button"
          color="accent"
          dense
          icon="mdi-chevron-left"
          round
          size="sm"
          unelevated
          @click="closeDrawer"
        />
      </div>
    </q-drawer>
    <q-page-container>
      <trips :filter="selectedMenu" :isCreateTrip="isCreateTrip" @closeDialog="closeDialog" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Trips from 'pages/Trips.vue';
import { useStore } from 'src/store';
import { ActionType } from 'src/store/types';
import { defineComponent, ref, watch, onMounted } from 'vue';

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
    const store = useStore();
    const selectedMenu = ref('all');
    const isCreateTrip = ref(false);
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
        icon: 'mdi-star',
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
    watch(selectedMenu, (selectedMenu) => {
      if (selectedMenu === 'new') {
        isCreateTrip.value = true;
      }
    });
    onMounted(() => store.dispatch(ActionType.initialTimezone));

    return {
      store,
      menus,
      selectedMenu,
      isCreateTrip,
      closeDrawer() {
        store.dispatch(ActionType.setMiniDrawer, true);
      },
      drawerClick(e: Event) {
        if (store.state.miniDrawer) {
          store.dispatch(ActionType.setMiniDrawer, false);
          e.stopPropagation();
        }
      },
      closeDialog() {
        isCreateTrip.value = false;
        selectedMenu.value = 'all';
      },
    };
  },
});
</script>
<style scoped lang="scss">
.app-drawer {
  .app-drawer-button {
    opacity: 0;
    transition: all 0.5s ease-out;
  }
  &:hover {
    .app-drawer-button {
      opacity: 100;
    }
  }
}
</style>
