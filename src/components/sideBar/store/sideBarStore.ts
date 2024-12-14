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
    toggleSideBar: () => set((state: { data: SideBarState }) => {
        if (state.data.sideBarState === true) {
            window.document.body.classList.remove('overFlowHidden');
            return { data: closedState }
        }
        else {
            window.document.body.classList.add('overFlowHidden');
            return { data: openedState };
        }
    }),
    openSideBar: () => set(() => {
        window.document.body.classList.add('overFlowHidden');
        return { data: openedState }
    }),
    closeSideBar: () => set(() => {
        window.document.body.classList.remove('overFlowHidden');
        return { data: closedState }
    })
}));

export { defaultState, closedState, openedState };
export default useSideBarStore;