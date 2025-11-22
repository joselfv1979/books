import React from "react";

interface InfoProps {
    label: string;
    value: React.ReactNode;
}

const Info: React.FC<InfoProps> = ({ label, value }) => (
    <div>
        <p className="text-[10px] uppercase tracking-wide text-brand-700">{label}</p>
        <p className="text-sm font-medium">
            {value === undefined || value === null || (Array.isArray(value) && value.length === 0) ? "-" : value}
        </p>
    </div>
);

export default Info;