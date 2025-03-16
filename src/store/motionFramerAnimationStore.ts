import { Variants } from "framer-motion";
import { create, StoreApi, UseBoundStore } from "zustand";

export interface MotionFramerState {
    framerConfig: Variants;
    mode: 'FORWARD' | 'BACKWARD';
}

const forwardAnimationConfig: MotionFramerState = {
    framerConfig: {
        initial: { y: "100%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "0%", opacity: 0 },
    },
    mode: 'FORWARD'
};
const backwardAnimationConfig: MotionFramerState = {
    framerConfig: {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "0%", opacity: 0 },
    },
    mode: 'BACKWARD'
};

export interface userMotionFramerStore {
    data: MotionFramerState;
    setGoBackAnimation: () => void;
    setGoForwardAnimation: () => void
}
const useMotionFramerStore: UseBoundStore<StoreApi<userMotionFramerStore>> = create((set) => ({
    data: forwardAnimationConfig,
    setGoBackAnimation: () => set(() => ({ data: backwardAnimationConfig })),
    setGoForwardAnimation: () => set(() => ({ data: forwardAnimationConfig })),
}))

export { useMotionFramerStore };