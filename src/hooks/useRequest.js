import React from "react";
import reducerRequest from "../reducers/requestReduser";
import axios from "axios";

const useRequest = url => {
    const [state, dispatch] = React.useReducer(reducerRequest, {
        url,
        defaultUrl: url,
        responseData: [],
        isFetching: true,
        error: null,
        page: 1
    });

    if (url !== state.defaultUrl) {
        dispatch({ type: "update url", payload: url });
    }

    React.useEffect(() => {
        console.log(`PAGE ${state.page}`);
        console.log(`URL ${state.url}`);
        const source = axios.CancelToken.source();
        axios
            .get(state.url, {
                cancelToken: source.token
            })
            .then(response => {
                dispatch({ type: "fetched", payload: state.responseData.concat(response.data) });
            })
            .catch(error => {
                dispatch({ type: "error", payload: error });
            });
        return source.cancel;
    }, [state.url]);

    const update = React.useCallback(
        url => {
            dispatch({ type: "update url manually", payload: url });
            dispatch({ type: "next page", payload: ++state.page});
        },
        [dispatch]
    );

    return [state, update];
};

export default useRequest;