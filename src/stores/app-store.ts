import { defineStore } from 'pinia';
import timezone from 'src/constants/timezone.json';
import { OpenedForm, Option } from 'src/types/models';

export interface AppStoreState {
  miniDrawer: boolean;
  timezone: Option[];
  openedForm: OpenedForm;
}

export const appStore = defineStore('app', {
  state: () =>
    ({
      miniDrawer: false,
      timezone: [],
      openedForm: {
        type: null,
        mode: null,
        selectedId: null,
      },
    } as AppStoreState),
  getters: {},
  actions: {
    setMiniDrawer(payload: boolean) {
      this.miniDrawer = payload;
    },

    setOpenedForm(payload: OpenedForm) {
      this.openedForm = payload;
    },

    closeForm() {
      this.openedForm = {
        mode: null,
        type: null,
        selectedId: null,
      };
    },

    initialTimezone() {
      this.timezone = timezone.map((tz) => ({ label: tz.text, value: tz.utc[0] }));
    },
  },
});
