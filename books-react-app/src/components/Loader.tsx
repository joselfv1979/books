import globalStyles from "../assets/scss/globalStyles.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";

const Loader = () => {

    const loading = useAppSelector((state) => state.ui.loading);

    if (!loading) return null;

    return (
        // <div className={globalStyles.spinnerOverlay}>
        //     <Spinner data-testid="loader" animation="border" className={globalStyles.spinner} />
        // </div>
        <div className={globalStyles.spinnerOverlay}>
            <div className={globalStyles.spinner}></div>
        </div>
    );
}

export default Loader;
