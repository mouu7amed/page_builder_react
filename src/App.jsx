import { Routes, Route } from "react-router-dom";
import { ForgotPassword } from "./components/Authentication/ForgotPassword";
import { Login } from "./components/Authentication/Login";
import { Register } from "./components/Authentication/Register";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Profile } from "./components/Dashboard/Profile/Profile";
import { Settings } from "./components/Dashboard/settings/Settings";
import Editor from "./components/Editor/Editor";
import { Main } from "./components/Main";
import { NoMatch } from "./components/Utils/NoMatch";
import { Redirecting } from "./components/Utils/Redirecting";
import { RequireAuth } from "./context/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login title="Login" />} />
      <Route path="/register" element={<Register title="Register" />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword title="Forgot Password" />}
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard title="Dashboard" />
          </RequireAuth>
        }
      >
        <Route path="profile" element={<Profile title="Profile" />} />
        <Route path="settings" element={<Settings title="Settings" />} />
      </Route>
      <Route
        path="/redirecting"
        element={
          <RequireAuth>
            <Redirecting title="Redirecting" />
          </RequireAuth>
        }
      />
      <Route
        path="/editor/:pageId"
        element={
          <RequireAuth>
            <Editor title="Editor" />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NoMatch title="404" />} />
    </Routes>
  );
}

export default App;
