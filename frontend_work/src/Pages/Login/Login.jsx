
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux";
import { logindetails, logoutdetails } from "../../Redux/Action_Create/ActionCreate"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [credentialData, setCredentialData] = useState()

    const loggedIn = (detail) => {
        // dispatch(logindetails(detail, ""));
        dispatch(logindetails(detail));
        navigate("/dashboard")

        // login()
    }

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log("<----------", tokenResponse);

            dispatch(logindetails("", tokenResponse))
            navigate("/dashboard")
        },
        onError: error => {
            console.log("Login Failed", "--->", error);
        }
    });

    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    console.log(jwtDecode(credentialResponse.credential));

                    // setCredentialData(credentialResponse)
                    loggedIn(credentialResponse)
                    // navigate("/home")

                }}
                onError={(err) => {
                    console.log("Login Failed");
                    console.log("---------");
                    console.log(err);


                }}
                auto_select={true}
                type="standard"

            />
            {/* <br /><br />
            <button >Login With Google</button> */}
        </>
    )
}

export default Login;