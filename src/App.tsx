import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Account = lazy(() => import("./pages/Account"));
const Player = lazy(() => import("./pages/Player"));

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Suspense fallback=<LoadingSpinner></LoadingSpinner>>
                  <Login />
                </Suspense>
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Suspense fallback=<LoadingSpinner></LoadingSpinner>>
            
                  <Signup />
                </Suspense>
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Suspense fallback=<LoadingSpinner></LoadingSpinner>>
                <Account />

                </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/player/:id" element={ <Suspense><Player /></Suspense> } />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
