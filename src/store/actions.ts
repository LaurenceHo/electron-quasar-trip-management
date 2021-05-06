import { Option } from 'src/types/models';
import { ActionTree } from 'vuex';
import { Actions, ActionType, MutationType, StoreState } from './types';
import timezone from 'src/constants/timezone.json';

export const actions: ActionTree<StoreState, StoreState> & Actions = {
  [ActionType.setMiniDrawer]({ commit }, payload) {
    commit(MutationType.setMiniDrawer, payload);
  },

  [ActionType.initialTimezone]({ commit }) {
    const timezoneOptions: Option[] = timezone.map((tz) => ({ label: tz.text, value: tz.utc[0] }));
    commit(MutationType.setTimezone, timezoneOptions);
  },
};
