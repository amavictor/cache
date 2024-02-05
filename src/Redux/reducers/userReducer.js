import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    currentUser: null,
    isProfileComplete: false,
};

// Retrieve data from AsyncStorage and set the initial state
// AsyncStorage.getItem('persist:root').then((data) => {
// //     if (data) {
// //         try {
// //             const persistedState = JSON.parse(data);
// //             const parsedUserState = JSON.parse(persistedState.user);
// //             initialState.currentUser = parsedUserState.currentUser;
// //         } catch (error) {
// //             console.error('Error parsing AsyncStorage data:', error);
// //         }
// //     }
// // });

export const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...payload
                }
            };

        case "UPDATE_CURRENT_USER":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...payload
                }
            };
        case "COMPLETE_PROFILE":
            return {
                ...state,
                isProfileComplete: payload
            };
        case "SET_EMAIL_VERIFIED":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    isEmailVerified: payload
                }
            };
        case "REFRESH":
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...payload
                }
            };
        case "LOGOUT":
            return {
                isProfileComplete:false,
                currentUser: payload
            };
        default:
            return state;
    }
};