import { ActionContext, CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex';

type Filter = 'all' | 'starred' | 'future' | 'current' | 'past' | 'archived';

export interface StoreState {
  filter: Filter;
}

export enum ActionType {
  setFilter = 'setFilter',
}

export type Actions = {
  [ActionType.setFilter](context: ActionAugments, filter: Filter): void;
};

export enum MutationType {
  setFilter = 'setFilter',
}

export type Mutations = {
  [MutationType.setFilter](state: StoreState, filter: Filter): void;
};

export type ActionAugments = Omit<ActionContext<StoreState, StoreState>, 'commit'> & {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
};

export type Store = Omit<VuexStore<StoreState>, 'commit' | 'dispatch' | 'getters'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
