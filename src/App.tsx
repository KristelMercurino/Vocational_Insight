import { ThemeProvider, CssBaseline } from "@mui/material"; // Agregamos CssBaseline
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa las rutas
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Survey from "./components/Survey"; // Asegúrate de importar tu componente Survey
import theme from "./theme/theme";
import Charts from "./components/Charts";
import Results from "./components/Results";
import Feedback from "./components/Feedback";
import Footer from "./components/footer";
import Login from "./components/Login";
import Register from "./components/Registro";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica estilos globales básicos */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Survey" element={<Survey />} />
          <Route path="/Charts" element={<Charts />} />
          <Route path="/Results" element={<Results />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}