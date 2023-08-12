import { useEffect, useState, useCallback, useReducer } from "react";


function reducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, isLoading: true, isError: false }

        case "FETCH_ERROR":
            return { ...state, isError: true, isLoading: false }

        case "FETCH_SUCCESS":

            return { ...state, data: action.payload.value, isLoading: false, isError: false }


        default:
            return state;
    }
}


export function useFetch(url, options = {}) {

    const [state, dispatch] = useReducer(reducer, { isError: false, isLoading: true })


    useEffect(() => {
        const controller = new AbortController();
        console.log(controller);
        dispatch({ type: "FETCH_START" });


        fetch(url, { signal: controller.signal, ...options })
            .then(res => {

                if (res.ok) {
                    return res.json()
                }
                else return Promise.reject(res)
            })
            .then(resdata => {
                dispatch({
                    type: "FETCH_SUCCESS", payload: {
                        value: resdata
                    }
                })
            })
            .catch((error) => {
                if (error.name === "AbortError") return;
                dispatch({ type: "FETCH.ERROR" })
            })

        return () => {
            controller.abort()
            console.log("Finished");
        }
    }, [url]);

    return { state }
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


export function useLocalStorage(key, initialValue) {
    const [value, setFirstName] = useState(setInitialName);

    function setInitialName() {
        if (localStorage.getItem(key)) {
            return localStorage.getItem(key);
        }
        if (typeof initialValue === "function") {
            return initialValue();
        }
        return initialValue
    }

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value])

    return [value, setFirstName]
}