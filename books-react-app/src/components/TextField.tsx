import React, { ChangeEvent } from "react";

type Props = {
    id: string;
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    icon: React.ReactNode;
    error?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
};

const TextField: React.FC<Props> = ({
    id,
    name,
    type = "text",
    value,
    placeholder,
    icon,
    error,
    onChange,
    autoComplete
}) => {
    return (
        <div className="space-y-1">
            <div
                className={`flex items-center gap-2 rounded-md px-3 py-2 bg-white ${error ? "ring-2 ring-danger-500" : ""
                    }`}
            >
                <span className="text-brand-600 flex-shrink-0">{icon}</span>
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    className="w-full bg-transparent outline-none border-none text-sm placeholder:text-brand-500 appearance-none focus:outline-none focus:ring-0 focus:border-transparent focus:ring-transparent"
                />
            </div>
            {error && <p className="text-[11px] text-danger-500">{error}</p>}
        </div>
    );
};

export default TextField;