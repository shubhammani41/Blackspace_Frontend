import { create, StoreApi, UseBoundStore } from "zustand";

export interface SideBarState {
    sideBarState: boolean
}

export interface SideBarStore {
    data: SideBarState,
    toggleSideBar: () => void,
    openSideBar: () => void,
    closeSideBar: () => void
}

const defaultState: SideBarState = { sideBarState: false };
const closedState: SideBarState = { sideBarState: false };
const openedState: SideBarState = { sideBarState: true };

const useSideBarStore: UseBoundStore<StoreApi<SideBarStore>> = create(set => ({
    data: defaultState,
    toggleSideBar: () => set((state: { data: SideBarState }) => (
        state.data.sideBarState === true ? { data: closedState } : { data: openedState }
    )),
    openSideBar: () => set(() => (
        { data: openedState }
    )),
    closeSideBar: () => set(() => (
        { data: closedState }
    ))
}));

export { defaultState, closedState, openedState };
export default useSideBarStore;