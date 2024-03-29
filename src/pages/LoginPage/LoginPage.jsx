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

    // Kiểm tra vai trò của người dùng và chuyển hướng nếu cần thiết
    // Đoạn mã kiểm tra vai trò của người dùng và điều hướng tới các trang tương ứng
    const checkUserRole = (user) => {
      switch (user.permission_id) {
        case 1: // Admin
          navigate("/admin");
          break;
        case 2: // Manager
          navigate("/home");
          break;
        case 3: // Staff
          navigate("/home");
          break;
        case 4: // Product Owner
          navigate("/home");
          break;
        case 5: // Customer
          navigate("/home");
          break;
        default:
          navigate("/home");
      }
    };

    // Sử dụng hàm kiểm tra vai trò trong mã của bạn
    if (user.permission_id) {
      checkUserRole(user);
    } else {
      navigate("/home");
    }

    toast.success("Login Success !");
  };

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
