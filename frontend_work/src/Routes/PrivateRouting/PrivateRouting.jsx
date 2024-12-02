import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import privateRoute from "../Rotings/PrivateRoutes/PrivateRoutes";
import vr46 from "../../Assets/vr46.jpg";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Button,
  Tab,
  Tabs,
  Col,
  Row,
} from "react-bootstrap";
import Logout from "../../Pages/Logout/Logout";
// import  from 'react-bootstrap/Button';

const PrivateRouting = () => {
  const [navigatePage, setNavigatepage] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(navigatePage);

    //// eslint-disable-next-line
  }, [navigatePage]);
  return (
    <>
      <Row>
        <Col xs={11}>
          <Tabs
            defaultActiveKey="/dashboard"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(k) => setNavigatepage(k)}
          >
            <Tab eventKey="/dashboard" title="Dashboard"></Tab>
            <Tab eventKey="/generator" title="Generator"></Tab>
            <Tab eventKey="/corasalImage" title="Image"></Tab>
            <Tab eventKey="/visualize" title="Visualize"></Tab>
          </Tabs>
        </Col>
        <Col xs={1}>
          <Logout />
        </Col>
      </Row>
      <Routes>
        {privateRoute.map((route, index) => {
          let Component = route.component;
          return (
            <Route
              key={`route-${index}`}
              path={route.path}
              element={
                <Suspense
                  fallback={
                    <>
                      <img
                        src={vr46}
                        alt="vr46"
                        width={"100%"}
                        height={"100%"}
                      />
                    </>
                  }
                >
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </>
  );
};

export default PrivateRouting;
