import { Option } from 'src/types/models';
import { ActionContext, CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex';

export interface StoreState {
  miniDrawer: boolean;
  timezone: Option[];
}

export enum ActionType {
  setMiniDrawer = 'setMiniDrawer',
  initialTimezone = 'initialTimezone',
}

export type Actions = {
  [ActionType.setMiniDrawer](context: ActionAugments, miniDrawer: boolean): void;
  [ActionType.initialTimezone](context: ActionAugments): void;
};

export enum MutationType {
  setMiniDrawer = 'setMiniDrawer',
  setTimezone = 'setTimezone',
}

export type Mutations = {
  [MutationType.setMiniDrawer](state: StoreState, miniDrawer: boolean): void;
  [MutationType.setTimezone](state: StoreState, timezone: Option[]): void;
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
