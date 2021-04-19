import { Actions, ActionType, MutationType, StoreState } from './types';
import { ActionTree } from 'vuex';

export const actions: ActionTree<StoreState, StoreState> & Actions = {
  [ActionType.setFilter]({ commit }, payload) {
    commit(MutationType.setFilter, payload);
  },
};
