import { StoreApi, UseBoundStore, create } from "zustand";

export enum LoaderState {
    open = "OPEN",
    closed = "CLOSED"
}

export interface LoaderStore {
    state: LoaderState,
    openLoader: () => void,
    closeLoader: () => void
}
const defaultState: LoaderState = LoaderState.closed;

const useLoaderStore: UseBoundStore<StoreApi<LoaderStore>> = create((set) => ({
    state: defaultState,
    openLoader: () => set(() => ({ state: LoaderState.open })),
    closeLoader: () => setTimeout(()=>{
        set(() => ({ state: LoaderState.closed }))
    },500)
}));

export { defaultState };
export default useLoaderStore;