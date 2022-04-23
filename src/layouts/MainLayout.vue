<template>
  <q-layout style="background: #fff" view="hHh lpR fFf">
    <q-drawer
      :breakpoint="500"
      :mini="miniDrawer"
      :width="250"
      bordered
      class="bg-grey-3 app-drawer"
      show-if-above
      @click.capture="drawerClick"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="menu in menus">
            <q-item
              v-if="!menu.children"
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
            <q-expansion-item
              v-else
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
      <dashboard :filter="selectedMenu" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import Dashboard from 'pages/Dashboard.vue';
import { OpenedForm } from 'src/types/models';
import { appStore } from 'stores/app-store';
import { computed, onMounted, ref, watch } from 'vue';

interface Menus {
  title: string;
  icon?: string;
  keyWord: string;
  children?: Menus[];
}

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

const store = appStore();

const selectedMenu = ref('all');

const miniDrawer = computed(() => store.miniDrawer);
const openedForm = computed(() => store.openedForm);

const closeDrawer = () => store.setMiniDrawer(true);

const drawerClick = (e: Event) => {
  if (store.miniDrawer) {
    store.setMiniDrawer(false);
    e.stopPropagation();
  }
};

onMounted(() => store.initialTimezone());

watch(selectedMenu, (selectedMenu) => {
  if (selectedMenu === 'new') {
    store.setOpenedForm({ type: 'trip', mode: 'create', selectedId: null });
  }
});

watch(openedForm, (openedForm: OpenedForm, previous: OpenedForm) => {
  if (previous.mode === 'create' && openedForm && !openedForm.type && !openedForm.mode) {
    selectedMenu.value = 'all';
  }
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
