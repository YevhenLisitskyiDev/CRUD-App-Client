import SignInPage from "../Pages/SignPage/SignInPage";
import SignUpPage from "../Pages/SignPage/SignUpPage";
import { Routes } from "./routes";

const publicRoutes = [
  { path: Routes.signIn, exact: true, component: SignInPage },
  { path: Routes.signUP, exact: true, component: SignUpPage },
];

export default publicRoutes;