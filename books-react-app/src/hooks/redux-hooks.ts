import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../store';
import { AppDispatch, RootState } from '../store/index';

// Custom hooks for dispatching actions and selecting state in React components
export const useAppDispatch = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(ActionCreators, dispatch);
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
