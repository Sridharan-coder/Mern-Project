import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageNotFound from "../../Assets/PageNotFound.jpg"


const NotFound = () => {

    const data = useSelector(detail => detail.authentication)

    const userAuthentication = data.loggedIn;

    const path = userAuthentication ? "/dashboard" : "/"

    return (
        <>
            {/* <Empty
                className='notFound'
                image={PageNotFound}
                imageStyle={{
                    height: 200,
                }}
                description={
                    <Typography.Text >
                        <p>No Data Found</p>
                    </Typography.Text>
                }
            >
                <NavLink to={path} className='naviagateText'>{userAuthentication ? <>Dashboard</> : <>Login</>}</NavLink>
            </Empty> */}

            bye
        </>
    )
}

export default NotFound;
