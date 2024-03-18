import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import "./LoginPage.css";
import { useState } from "react";
import { axiosClient } from "src/axios/AxiosClient";
import { useNavigate } from "react-router-dom";
import { BannerPath } from "src/components";
import { useDispatch } from "react-redux";
import { setLoggedInAccount } from "src/app/feature/account/AccountSlice";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isRemember: "",
  });
  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLogin = async () => {
    const { data, err } = await axiosClient.post("/User/Login", formData);
    if (err) {
      toast.error("Login fail!");

      return;
    }
    const { token, user } = data;
    localStorage.setItem("token", token);
    dispatch(setLoggedInAccount(user));
    navigate("/home");
    toast.success("Login Succes !");
    console.log("token", token);
    console.log("user", user);
  };

  //const handleLogin = async () => {
  //   try {
  //     const response = await axiosClient.post("/User/Login", formData);
  //     const { token, user } = response.data;

  //     // Lưu accessToken vào localStorage
  //     localStorage.setItem("accessToken", token);

  //     // Lưu thông tin người dùng vào Redux store hoặc localStorage nếu cần
  //     dispatch(setLoggedInAccount(user));

  //     // Điều hướng đến trang home
  //     navigate("/home");

  //     // Hiển thị thông báo thành công
  //     toast.success("Login Success !");
  //   } catch (error) {
  //     // Xử lý lỗi
  //     console.error("Login failed:", error);
  //     toast.error("Login failed!");
  //   }
  // };

  return (
    <>
      <main className="login-page">
        <BannerPath title="Login / Register" path="Home - Login / Register" />
        <Container className="login-box">
          <Row className="login-box__wrapper">
            <Col lg="6" className="login-page__left">
              <div className="login-page__create-account">
                <h3>New to our website?</h3>
                <div>
                  There are advances being made in science and technology
                  everyday, and a good example of this is the Create an Account
                </div>
                <Button
                  outline
                  color="#fff"
                  className="login-page__btn-create"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Create an Account
                </Button>
              </div>
            </Col>
            <Col lg="6" className="login-page__right">
              <h3>LOG IN TO ENTER</h3>
              <Form onSubmit={handleLogin} className="login-page__form">
                <FormGroup>
                  <Input
                    id="username"
                    placeholder="Username"
                    onChange={(e) => {
                      handleDataChange("username", e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                      handleDataChange("password", e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup check className="login-page__remember">
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        handleDataChange("isRemember", e.target.checked);
                      }}
                    />{" "}
                    Keep me logged in
                  </Label>
                </FormGroup>
                <Button
                  outline
                  color="primary"
                  className="login-page__btn-login"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
