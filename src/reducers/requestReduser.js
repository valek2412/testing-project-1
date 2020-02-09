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
        case "update url":
            return {
                ...state,
                isFetching: true,
                url: action.payload,
                defaultUrl: action.payload
            };
        case "update url manually":
            return {
                ...state,
                isFetching: true,
                url: action.payload,
                defaultUrl: state.defaultUrl
            };
        case "next page":
            return {
                ...state,
                page: action.payload,
            };
        default:
            return state;
    }
};

export default reducerRequest;

