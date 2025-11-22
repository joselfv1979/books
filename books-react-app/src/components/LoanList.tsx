import React from "react";
import { Loan } from "../types/Loan";
import Card from "./ui/Card";

interface Props {
    loans: Loan[];
}

const LoanList: React.FC<Props> = ({ loans }) => {
    if (!loans || loans.length === 0) {
        return <p className="text-sm text-brand-700">No current loans.</p>;
    }

    return (
        <div className="space-y-3">
            {loans.map(l => (
                <Card key={l.id} className="flex items-center gap-4">
                    {/* <div className="w-14 h-20 bg-surface-muted rounded overflow-hidden flex items-center justify-center">
                        {l.copyId?.bookId?.imagePath ? (
                            <img
                                src={l.copyId.bookId.imagePath}
                                alt={l.copyId.bookId.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <span className="text-[10px] text-brand-700">No img</span>
                        )}
                    </div> */}
                    <div className="w-14 h-20 bg-surface-muted rounded overflow-hidden flex items-center justify-center">

                        <span className="text-[10px] text-brand-700">No img</span>

                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold">{"Untitled"}</h4>
                        <p className="text-[11px] mt-1">
                            Due: {l.dueDate ? new Date(l.dueDate).toLocaleDateString() : "-"}
                        </p>
                        <p className={`text-[11px] ${l.returned ? "text-success-500" : "text-danger-500"}`}>
                            {l.returned ? "Returned" : "Active"}
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default LoanList;