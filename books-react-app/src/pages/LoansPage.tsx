import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoanList from "../components/LoanList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

const LoansPage: React.FC = () => {

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
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Loans</h1>
            <LoanList loans={loans} />
        </div>
    );
};

export default LoansPage;