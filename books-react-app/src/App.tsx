import './assets/scss/globalStyles.module.scss';
import { AppRoutes } from './components/AppRoutes';
import DeleteModal from './components/DeleteModal';
import Loader from './components/Loader';
import { useAppSelector } from './hooks/redux-hooks';

const App = () => {

    const { loading } = useAppSelector((state) => state.ui);

    return (
        <>
            <Loader />
            <DeleteModal />
            <AppRoutes />
        </>
    );
};

export default App;
