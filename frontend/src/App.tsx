import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "@/layouts";
import Loading from "@/components/Loading";
import SignIn from "@/pages/login/SignIn"
import SignUp from "@/pages/login/SignUp"
import "./App.css";

const Dashboard = lazy(() => import("@/pages/dashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<Navigate replace to="sign-in" />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
