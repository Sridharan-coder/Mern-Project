import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import vr46 from "../../Assets/vr46.jpg"
import PublicRoute from "../Rotings/PublicRoutes/PublicRoutes";

const PublicRouting = () => {

    return (
        <>
            <Routes>
                {
                    (PublicRoute.map((route, index) => {
                        let Component = route.component;
                        return (
                            <Route
                                key={`route-${index}`}
                                path={route.path}
                                element={
                                    <Suspense
                                        fallback={
                                            <>
                                                <img src={vr46} alt="vr46" width={"100%"} height={"100%"} />

                                            </>
                                        }
                                    >
                                        <Component />
                                    </Suspense>
                                }
                            />
                        );
                    }))
                }
            </Routes>
        </>
    )
}

export default PublicRouting;