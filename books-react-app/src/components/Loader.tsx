import globalStyles from "@/assets/scss/globalStyles.module.scss";
import { Spinner } from "react-bootstrap";

export const Loader = () => {
    return (
        <Spinner data-testid="loader" animation="border" className={globalStyles.spinner} />
    )
}
