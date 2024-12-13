import { StoreApi, UseBoundStore, create } from "zustand";

export interface AddBasicDetailsDialogState {
    dialogState: boolean
}

export interface AddBasicDetailsDialogStore {
    data: AddBasicDetailsDialogState,
    toggleDialog: () => void,
    openDialog: () => void,
    closeDialog: () => void
}

const defaultState: AddBasicDetailsDialogState = {dialogState:false};
const openState: AddBasicDetailsDialogState = {dialogState:true};

const useAddBasicDetailsDialogStore: UseBoundStore<StoreApi<AddBasicDetailsDialogStore>> = create((set) => ({
    data: defaultState,
    toggleDialog: () => set((state: { data: AddBasicDetailsDialogState }) => (
        state.data.dialogState === false ? { data: openState } : { data: defaultState }
    )),
    openDialog: () => set(() => (
        { data: openState }
    )),
    closeDialog: () => set(() => (
        { data: defaultState }
    )),
}));

export { defaultState, openState };
export default useAddBasicDetailsDialogStore;