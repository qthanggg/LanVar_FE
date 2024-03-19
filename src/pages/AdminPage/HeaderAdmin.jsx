// import React from "react";
// import { useDispatch } from "react-redux";
// import { navigate } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { logout } from "src/app/feature/account/AccountSlice";

// function HeaderAdmin() {
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/home");
//   };

//   return (
//     <>
//       <br />
//       <Navbar bg="primary" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="#home"></Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home"></Nav.Link>
//             <Nav.Link href="#features"></Nav.Link>
//             <Nav.Link href="#pricing"></Nav.Link>
//           </Nav>
//           <Nav>
//             <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       <br />
//     </>
//   );
// }

// export default HeaderAdmin;
