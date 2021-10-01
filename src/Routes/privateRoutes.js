import HomePage from "../Pages/HomePage/HomePage";
import { Routes } from "./routes";

const privateRoutes = [
  { path: Routes.homePage, exact: true, component: HomePage },
];

export default privateRoutes;
