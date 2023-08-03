import { useEffect, useState, useCallback } from "react";


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
};


export function useArray(arr = []) {

    const [array, setArray] = useState(arr)

    function set(param) {
        setArray(param)
    }
    function push(param) {
        setArray((current) => [...current, param])
    }
    function replace(index, element) {
        setArray(current => {
            const newArr = current.slice();
            newArr[index] = element;
            return newArr;
        })
    }
    function filter(callback) {
        setArray(current => current.filter(callback));
    }
    function remove(param) {
        setArray((current) => current.filter((item, index) => index !== param));
    }
    function clear() {
        setArray([])
    }
    const reset = useCallback(() => {
        setArray(arr)
    }, [arr])

    return {
        array, set, push, replace, filter, remove, clear, reset
    }
}
