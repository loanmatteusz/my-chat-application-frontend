import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { AuthRequire } from "./contexts/auth/AuthRequire";

function App() {
  return (
    <div className="flex w-full items-center justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={
          <AuthRequire>
            <Home />
          </AuthRequire>
        } />
      </Routes>
    </div>
  )
}

export default App;
