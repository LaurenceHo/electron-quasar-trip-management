import { ActionTree } from 'vuex';
import { Actions, ActionType, MutationType, StoreState } from './types';

export const actions: ActionTree<StoreState, StoreState> & Actions = {
  [ActionType.setFilter]({ commit }, payload) {
    commit(MutationType.setFilter, payload);
  },
};
