import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PreloadedState } from "redux";
import { AppStore, RootState, setupStore, store } from "../../store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export const customRender = (
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) => {

    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions;
    const Wrapper = ({ children }: PropsWithChildren<{}>) => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    {children}
                </Provider>
            </BrowserRouter>
        );
    };

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
};

type Props = {
    children?: ReactNode;
};

export const wrapper = ({ children }: Props) => (
    <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
    </Provider>
);

export * from '@testing-library/react';
export { store as customStore, customRender as render };

