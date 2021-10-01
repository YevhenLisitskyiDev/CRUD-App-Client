import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import ProfilesPage from "../Pages/ProfilesPage/ProfilesPage";
import SingleUserPage from "../Pages/SingleUserPage/SingleUserPage";
import UsersPage from "../Pages/UsersPage/UsersPage";
import { Routes } from "./routes";

const adminRoutes = [
  { path: Routes.profiles, exact: true, component: ProfilesPage },
  { path: Routes.users, exact: true, component: UsersPage },
  { path: Routes.dashboard, exact: true, component: DashboardPage },
  { path: Routes.singleUser + "/:id", exact: true, component: SingleUserPage },
];

export default adminRoutes;
