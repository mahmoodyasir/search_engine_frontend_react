export const initialstate = {
    user_profile:null,
    admin_profile:null,
    all_data:null,
    data:null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_PROFILE":
            return {
                ...state,
                user_profile: action.user_profile
            }

        case "ADMIN_PROFILE":
            return {
                ...state,
                admin_profile: action.admin_profile
            }

        case "ALL_DATA":
            return {
                ...state,
                all_data: action.all_data
            }

        case "FILTER_DATA":
            return {
                ...state,
                data: action.data
            }


        default:
            return this.state;
    }
}

export default reducer;