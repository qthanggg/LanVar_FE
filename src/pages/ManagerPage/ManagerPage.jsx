import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { axiosClient } from "src/axios/AxiosClient";

const ManagerPage = () => {
  const [staffAccounts, setStaffAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    gender: "",
    dob: "",
    identityCard: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchStaffAccounts = async () => {
      try {
        const response = await axiosClient.get(
          "/ManageStaffAccounts/GetAllStaff"
        );
        setStaffAccounts(response.data);
      } catch (error) {
        console.error("Error fetching staff accounts:", error);
      }
    };

    fetchStaffAccounts();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosClient.post("/ManageStaffAccounts/CreateStaff", newStaff);
      toggleModal();
      // Refresh staff list after adding new staff
      const response = await axiosClient.get(
        "/ManageStaffAccounts/GetAllStaff"
      );
      setStaffAccounts(response.data);
    } catch (error) {
      console.error("Error creating staff:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Staff Accounts</h2>
          <Button color="primary" onClick={toggleModal}>
            Create Staff
          </Button>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Register Day</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {staffAccounts.map((staff, index) => (
                <tr key={staff.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.username}</td>
                  <td>{staff.phone}</td>
                  <td>{new Date(staff.dob).toLocaleDateString()}</td>
                  <td>{staff.address}</td>
                  <td>{staff.gender}</td>
                  <td>{new Date(staff.registerDay).toLocaleDateString()}</td>
                  <td>{staff.status ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create New Staff</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={newStaff.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={newStaff.username}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={newStaff.password}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={newStaff.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Gender</Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                value={newStaff.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="dob">Date of Birth</Label>
              <Input
                type="date"
                name="dob"
                id="dob"
                value={newStaff.dob}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="identityCard">Identity Card</Label>
              <Input
                type="text"
                name="identityCard"
                id="identityCard"
                value={newStaff.identityCard}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={newStaff.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={newStaff.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default ManagerPage;
