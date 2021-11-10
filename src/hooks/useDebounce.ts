import { useState, useEffect } from "react";

export type DebounceArgs = {
    value: string | number;
    delay: number;
};

export const useDebounce = ({ value, delay }: DebounceArgs): string | number => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};
