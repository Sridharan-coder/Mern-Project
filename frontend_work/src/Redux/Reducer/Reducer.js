// import { DELETE, SAVE } from "../Action_Type/ActionType";
// const userData = {
//     authentication: {
//         email: "",
//         first_name: "",
//         last_name: "",
//         loginTime: "",
//         imageurl: "",
//         token: ""
//     }
// }
// export const Reducer = (state = userData, action) => {
//     switch (action.type) {
//         case SAVE:
//             return {
//                 ...state, authentication: {
//                     email: btoa(action.payload.email),
//                     first_name: btoa(action.payload.first_name),
//                     last_name: btoa(action.payload.last_name),
//                     loginTime: action.payload.loginTime,
//                     imageurl: btoa(action.payload.imageurl),
//                     token: btoa((btoa(action.payload.token)))
//                 }
//             }
//         case DELETE:
//             return {
//                 ...state, authentication: {
//                     email: "",
//                     first_name: "",
//                     last_name: "",
//                     token: ""
//                 }
//             };
//         default:
//             return state;
//     }
// };

import { LOGINDATA, LOGOUTDATA } from "../Action_Type/ActionType";



const intialData = {
    authentication: {
        credentialData: "",
        accessToken: "",
        loggedIn: false
    }
}

export const Reducer = (state = intialData, action) => {

    switch (action.type) {
        case LOGINDATA:
            return { ...state, authentication: { ...state.authentication, credentialData: action.payload, accessToken: action.payload2, loggedIn: true } };
        case LOGOUTDATA:
            return { ...state, authentication: { ...state.authentication, credentialData: "", accessToken: "", loggedIn: false } };
        default:
            return state;
    }

}
