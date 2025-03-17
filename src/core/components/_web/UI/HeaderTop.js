
import { FaGear } from "react-icons/fa6";
import { useContext } from "react";
import { userLogout } from "../../../HELPERS/firebase/queries/users";
import { AuthUserContext } from "../../_hooks/_Context/AuthUserContext";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";

import logo_app from "../../../assets/imgs/ecopybrite_logo.png";


export const HeaderTop = ({ onOpenModal }) => {


    const pathname = useLocation();

    const { useUserLoggedData } = useContext(AuthUserContext);

    return <Navbar expand="lg" className="bg-body-tertiary mb-5" style={{ borderBottom: "1px solid #cacaca" }}>
        <Container>
            <Navbar.Brand href="#home">
                <Image src={logo_app} width={150} />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {
                        localStorage.getItem("ACCESS_TOKEN") !== null ? <>
                            {
                                useUserLoggedData.isLoading ? null : <>
                                    <Nav.Link href="#" onClick={() => onOpenModal("FORM_CONFIG")}><FaGear style={{ transform: "scale(1.5)" }} /></Nav.Link>
                                </>
                            }

                            <Button className=" btn_logout" onClick={userLogout} onMouseDown={(e) => e.preventDefault()}>
                                Log out
                            </Button>

                        </> : <>
                            <NavLink to="/" exact="true" className={`nav_custom_item ${pathname === "/" ? "header_navbar_custom_li_item_active" : ""}`}>
                                Home
                            </NavLink>

                            <NavLink to="/events" exact="true" className={`nav_custom_item ${pathname === "/events" ? "header_navbar_custom_li_item_active" : ""}`}>
                                Events
                            </NavLink>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>;
}