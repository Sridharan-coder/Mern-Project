import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { logoutdetails } from "../../Redux/Action_Create/ActionCreate";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap';

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const logoutFunctionality = () => {

        const check = googleLogout();
        console.log("check", check);

        dispatch(logoutdetails());
        navigate("/")
    }

    return (
        <>
            <Button variant="dark" onClick={() => logoutFunctionality()} style={{marginTop:4}}>
                Log out
            </Button>
            {/* <button >logout</button> */}
        </>
    )

}

export default Logout;