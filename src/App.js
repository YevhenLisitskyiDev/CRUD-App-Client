import Router from "./Routes/index";
import UserProvider from "./Contexts/UserContext";
import ProfilesProvider from "./Contexts/ProfilesContext";
import AuthProvider from "./Contexts/AuthContext";

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

function Providers({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ProfilesProvider>{children}</ProfilesProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
