const reducerRequest = (state, action) => {
    switch (action.type) {
        case "fetched":
            return {
                ...state,
                isFetching: false,
                responseData: action.payload
            };
        case "error":
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const defaultState = {
    responseData: null,
    isFetching: true,
    error: null
};

export default reducerRequest;

