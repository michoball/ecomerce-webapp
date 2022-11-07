import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";
import { useDispatch } from "react-redux";
// import { signUpStart } from "../../store/user/user.action";

import { userSignUp } from "../../tookit/user/user.reducer";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formfield, setFormfield] = useState(defaultFormFields);
  const dispatch = useDispatch();
  const { displayName, email, password, confirmPassword } = formfield;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormfield({
      ...formfield,
      [name]: value,
    });
  };

  const resetFormField = () => {
    setFormfield(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      throw new Error("password do not matched!");
    }

    if (!email.trim().includes("@")) {
      throw new Error("Please fill out the entire form");
    }

    try {
      dispatch(userSignUp({ email, password, displayName }));
      // const userCredential = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );

      // const user = userCredential.user;

      // await createUserDocumentFromAuth(user, { displayName });

      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      alert("user Creation encountered an error", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account? </h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          value={displayName}
          name="displayName"
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          name="email"
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          name="password"
          onChange={handleChange}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
