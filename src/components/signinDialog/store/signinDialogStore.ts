import { StoreApi, UseBoundStore, create } from "zustand";

export interface SigninDialogState {
    dialogState: boolean
}

export interface SigninDialogStore {
    data: SigninDialogState,
    toggleDialog: () => void,
    openDialog: () => void,
    closeDialog: () => void
}

const defaultState: SigninDialogState = {dialogState:false};
const openState: SigninDialogState = {dialogState:true};

const useSigninDialogStore: UseBoundStore<StoreApi<SigninDialogStore>> = create((set) => ({
    data: defaultState,
    toggleDialog: () => set((state: { data: SigninDialogState }) => (
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
export default useSigninDialogStore;