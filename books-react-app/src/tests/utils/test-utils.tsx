import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { PreloadedState } from "redux";
import { AppStore, RootState, setupStore } from "../../store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
    routerHistory?: string[]
}

export const customRender = (
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) => {

    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        routerHistory,
        ...renderOptions
    } = extendedRenderOptions;
    const Wrapper = ({ children }: PropsWithChildren<{}>) => {
        return (
            <Provider store={store}>
                <MemoryRouter initialEntries={routerHistory}>
                    {children}
                </MemoryRouter>
            </Provider>
        );
    };

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
};

export * from '@testing-library/react';

