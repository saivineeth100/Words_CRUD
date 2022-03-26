import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { AuthModalContainer } from "./auth/Form";
import { UseMainDataContext } from "./State";

interface INavigationMenuProps {
}

const NavigationMenu: React.FC<INavigationMenuProps> = (props: INavigationMenuProps) => {
    const { ToggleAuthModal, Logout, State } = UseMainDataContext()
    const { Auth, IsLoggedin, User } = State

    return (<>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid className="container-lg">
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link >Home</Nav.Link>
                    </Nav>

                    <Nav className="justify-content-end">
                        {!IsLoggedin && <><Nav.Link onClick={() => ToggleAuthModal()} >Login/Signup</Nav.Link>
                            <AuthModalContainer
                                show={Auth.visible}
                                onHide={() => ToggleAuthModal()}></AuthModalContainer></>}
                        {IsLoggedin &&
                            <NavDropdown title={User?.username}>
                                <NavDropdown.Item onClick={() => { Logout() }}>Logout</NavDropdown.Item>
                            </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>);
};

export default NavigationMenu;