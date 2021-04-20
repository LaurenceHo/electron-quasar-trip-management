import { MutationTree } from 'vuex';
import { Mutations, MutationType, StoreState } from './types';

export const mutations: MutationTree<StoreState> & Mutations = {
  [MutationType.setFilter](state: StoreState, payload): void {
    state.filter = payload;
  },
};
