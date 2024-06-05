import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/index';
import { bindActionCreators } from 'redux';
import ActionCreators from '../store';

// Dispatching and getting data hooks used in react components
export const useAppDispatch = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(ActionCreators, dispatch);
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
