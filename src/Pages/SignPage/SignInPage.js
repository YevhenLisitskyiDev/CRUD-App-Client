import React from "react";
import SignPage from "./SignPage";
import signMethods from "./signMethods";

const SignInPage = () => <SignPage method={signMethods.IN} />;
export default SignInPage;
