import { Spinner } from "react-bootstrap";
import globalStyles from "../assets/scss/globalStyles.module.scss";

export const Loader = () => {
    return (
        <Spinner data-testid="loader" animation="border" className={globalStyles.spinner} />
    )
}
