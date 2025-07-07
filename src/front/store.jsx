export const initialStore = () => ({
    token: localStorage.getItem("token") || null,
    user: null
});

export default function storeReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };

        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null
            };

        case "SET_USER":
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}
