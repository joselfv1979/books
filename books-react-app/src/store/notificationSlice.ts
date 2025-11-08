import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type Notification = {
    type: "success" | "error" | "info";
    message: string;
};

interface NotificationsState {
    current: Notification | null;
}

const initialState: NotificationsState = {
    current: null,
};


const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<Notification>) => {
            state.current = action.payload;
        },
        clearNotification: (state) => {
            state.current = null;
        },
    },
});

export const { showNotification, clearNotification } = notificationsSlice.actions;
export const getNotification = (state: RootState) => state.notification.current;
export default notificationsSlice.reducer;