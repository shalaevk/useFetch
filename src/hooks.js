import { useEffect, useState } from "react";


export function useFetch(url, options = {}) {
    const [data, setData] = useState('');
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const controller = new AbortController();
    useEffect(() => {
        fetch(url, { signal: controller.signal, ...options })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else return Promise.reject(res)
            })
            .then(resdata => setData(resdata))
            .catch((error) => {
                if (error.name === "AbortError") return;
                setIsError(true);
                return error
            })
            .finally(() => {
                if (controller.signal.aborted) return
                setIsLoading(false);
            });
        return () => {
            setIsError(false);
            setIsLoading(true);
            setData("");
            controller.abort()
        }
    }, [url])
    return { data, isLoading, isError }
}