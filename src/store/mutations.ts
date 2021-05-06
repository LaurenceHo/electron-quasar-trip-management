import { MutationTree } from 'vuex';
import { Mutations, MutationType, StoreState } from './types';

export const mutations: MutationTree<StoreState> & Mutations = {
  [MutationType.setMiniDrawer](state: StoreState, payload): void {
    state.miniDrawer = payload;
  },

  [MutationType.setTimezone](state: StoreState, payload): void {
    state.timezone = payload;
  },
};
