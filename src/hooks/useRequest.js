import React from "react";
import reducerRequest, {defaultState} from "../reducers/requestReduser";
import axios from "axios";

const useRequest = url => {
    const [state, dispatch] = React.useReducer(reducerRequest, defaultState);

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
    }, [url]);

    return [state];
};

export default useRequest;