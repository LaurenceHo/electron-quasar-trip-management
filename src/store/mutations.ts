import { Mutations, MutationType, StoreState } from './types';
import { MutationTree } from 'vuex';

export const mutations: MutationTree<StoreState> & Mutations = {
  [MutationType.setFilter](state: StoreState, payload): void {
    state.filter = payload;
  },
};
