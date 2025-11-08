import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

const Loans = () => {
    const { id } = useParams();
    const { loans } = useAppSelector((state) => state.loan);
    const { fetchLoansByUser, clearCurrentUser } = useAppDispatch();

    useEffect(() => {
        clearCurrentUser();
        if (id) {
            fetchLoansByUser(id);
        }
    }, []);

    console.log('User Loans:', loans);

    return (
        <div>
            <h1 className="text-2xl text-center m-3 font-bold">Loans Page</h1>
            <ul>
                {loans.map((loan) => (
                    <li key={loan.id}>{loan.dueDate}</li>
                ))}
            </ul>
        </div>
    );
}

export default Loans;