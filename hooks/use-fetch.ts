import { error } from "console";
import { useState } from "react";
import {toast} from 'sonner'

const useFetch = <ReturnType = any>(cb: (...args: any[]) => Promise<ReturnType>) => {
    const [data, setData] = useState<ReturnType | undefined>(undefined)
    const [loading, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const fn = async (...args: any[]) => {
        setLoading(true)
        setError(null)

        try {
            const response = await cb(...args);
            setData(response);  
            setError(null);
        } catch (error) {
            const err = error as Error;
            setError(err);
            toast.error(err.message || "An error occurred");
        } finally {
            setLoading(false);
        } 
    };
    return {data, loading, error, fn, setData}
}

export default useFetch;