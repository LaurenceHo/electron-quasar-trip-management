import { OpenedForm, Option } from 'src/types/models';
import { ActionContext, CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex';

export interface StoreState {
  miniDrawer: boolean;
  timezone: Option[];
  openedForm: OpenedForm;
}

export enum ActionType {
  setMiniDrawer = 'setMiniDrawer',
  initialTimezone = 'initialTimezone',
  setOpenedForm = 'setOpenedForm',
  closeForm = 'closeForm',
}

export type Actions = {
  [ActionType.setMiniDrawer](context: ActionAugments, miniDrawer: boolean): void;
  [ActionType.initialTimezone](context: ActionAugments): void;
  [ActionType.setOpenedForm](context: ActionAugments, payload: OpenedForm): void;
  [ActionType.closeForm](context: ActionAugments): void;
};

export enum MutationType {
  setMiniDrawer = 'setMiniDrawer',
  setTimezone = 'setTimezone',
  setOpenedForm = 'setOpenedForm',
  closeForm = 'closeForm',
}

export type Mutations = {
  [MutationType.setMiniDrawer](state: StoreState, miniDrawer: boolean): void;
  [MutationType.setTimezone](state: StoreState, timezone: Option[]): void;
  [MutationType.setOpenedForm](state: StoreState, payload: OpenedForm): void;
  [MutationType.closeForm](state: StoreState): void;
};

export type ActionAugments = Omit<ActionContext<StoreState, StoreState>, 'commit'> & {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
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
