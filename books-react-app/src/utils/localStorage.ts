import { RootState } from "../store";

const saveToLocalStorage = (state: RootState) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state');
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export { saveToLocalStorage, loadFromLocalStorage };
