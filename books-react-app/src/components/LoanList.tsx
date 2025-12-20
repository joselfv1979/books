import React from "react";
import { LoanWithBookInfo } from "@/types/Loan";
import { useAppDispatch } from "@/hooks/redux-hooks";
import Card from "./ui/Card";
import Button from "./ui/Button";

const baseUrl = import.meta.env.VITE_API_URL;
interface Props {
    loans: LoanWithBookInfo[];
}

const LoanList: React.FC<Props> = ({ loans }) => {
    const { returnLoanThunk } = useAppDispatch();

    if (!loans || loans.length === 0) {
        return <p className="text-sm text-brand-700">No current loans.</p>;
    }

    const handleReturn = (loanId: string) => {
        returnLoanThunk(loanId);
    };

    return (
        <div className="space-y-3">
            {loans.map((l, index) => (
                <Card key={l.id || `loan-${index}`} className="flex items-center gap-4">
                    <div className="w-14 h-20 bg-surface-muted rounded overflow-hidden flex items-center justify-center">
                        {l.imagePath ? (
                            <img
                                src={`${baseUrl}/${l.imagePath}`}
                                alt={l.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <span className="text-[10px] text-brand-700">No img</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold">{l.title}</h4>
                        <p className="text-[11px] text-brand-700 mt-1">By {l.author}</p>
                        <p className="text-[11px] mt-1">
                            Due: {l.dueDate ? new Date(l.dueDate).toLocaleDateString() : "-"}
                        </p>
                        <p className={`text-[11px] ${l.returned ? "text-success-500" : "text-danger-500"}`}>
                            {l.returned ? "Returned" : "Active"}
                        </p>
                    </div>
                    {!l.returned && (
                        <Button
                            variant="primary"
                            onClick={() => handleReturn(l.id)}
                            className="text-xs px-3 py-1"
                        >
                            Return
                        </Button>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default LoanList;