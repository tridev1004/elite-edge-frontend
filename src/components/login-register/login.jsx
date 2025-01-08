import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import jwtDecode from "jwt-decode";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// font awesome
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// component
import { getCart } from "./../../functions/cart";
import { loginUser } from "../../apis/userApi";
import { showToast } from "../../store/slices/toastSlice";

// style
import styles from "./login-register.module.css";
import { toast } from "sonner";

const Login = ({ closeModal, saveUserData }) => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleSubmit = (user, { resetForm }) => {
    loginUser(user)
      .then((response) => {
        console.log("Response:", response); // Log the response
        toast.success("Login Successful");
        localStorage.setItem("userToken", response.token);  // Store token if necessary
        getCart(response.token);  // Fetch the cart data
        saveUserData();  // Save user data
        resetForm();
        closeModal();
        
        // Use the role from the response directly
        const { role } = response.data;  // Extract role directly from response
  
        if (role === "admin") {
          navigate("/dashboard");  // Redirect to the admin dashboard
        }
      })
      .catch((error) => {
        console.error("Login Error:", error); // Log the error
        toast.error("Login Failed");
      });
  };
  
  
  return (
    <>
      <Formik
        initialValues={{ ...user }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Email is required")
            .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, "Email must be a valid email address"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.label}>
            <div className="mb-3">
              <label className="mb-1" htmlFor="email">
                Email <span>*</span>
              </label>
              <Field
                className={`form-control ${styles.input}`}
                name="email"
                type="email"
                placeholder="Please enter your email address"
              />
              {errors.email && touched.email ? (
                <span className="text-danger ms-2"> {errors.email}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="password">
                Password <span>*</span>
              </label>
              <div className={styles.passwordInputWrapper}>
                <Field
                  className={`form-control ${styles.input}`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Please enter a strong password"
                />
                <span
                  className={styles.togglePasswordVisibilityButton}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                    ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </span>
              </div>
              {errors.password && touched.password ? (
                <span className="text-danger ms-2">{errors.password}</span>
              ) : null}
            </div>
            <div
              className={`${styles["group-button"]} ${styles["button-submit"]}`}
            >
              <input
                type="submit"
                className={`btn-bg-dark ${styles.button}`}
                value="Login"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
