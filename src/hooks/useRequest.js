import React from "react";
import reducerRequest from "../reducers/requestReduser";
import axios from "axios";

const useRequest = url => {
    const [state, dispatch] = React.useReducer(reducerRequest, {
        url,
        defaultUrl: url,
        responseData: null,
        isFetching: true,
        error: null
    });

    if (url !== state.defaultUrl) {
        dispatch({ type: "update url", payload: url });
    }

    React.useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(url, {
                cancelToken: source.token
            })
            .then(response => {
                dispatch({ type: "fetched", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "error", payload: error });
            });
        return source.cancel;
    }, [state.url]);

    const update = React.useCallback(
        url => {
            dispatch({ type: "update url manually", payload: url });
        },
        [dispatch]
    );

    return [state, update];
};

export default useRequest;