// src/redux/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ModalPayload {
    type: "CONFIRM_DELETE";
    data: {
        entity: "user" | "book";
        id: string;
    };
}

interface UIState {
    loading: boolean;
    modal: {
        isOpen: boolean;
        type?: string;
        data?: any;
    };
}

const initialState: UIState = {
    loading: false,
    modal: {
        isOpen: false,
    },
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        openModal: (state, action: PayloadAction<ModalPayload>) => {
            state.modal.isOpen = true;
            state.modal.type = action.payload.type;
            state.modal.data = action.payload.data;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
            state.modal.type = undefined;
            state.modal.data = undefined;
        },
    },
});

export const { setLoading, openModal, closeModal } = uiSlice.actions;
export const getModal = (state: RootState) => state.ui.modal;
// export const isLoading = (state: RootState) => state.ui.loading;
export default uiSlice.reducer;