import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Onboarding1 from "./pages/Onboarding/Onboarding1/Onboarding1";
import Onboarding2 from "./pages/Onboarding/Onboarding2/Onboarding2";
import Onboarding3 from "./pages/Onboarding/Onboarding3/Onboarding3";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPass/ForgotPassword";
import ResetPassword from "./pages/ResetPass/ResetPassword";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProgramKesehatan from "./pages/Program/Kesehatan/ProgramKesehatan";
import ProgramDakwah from "./pages/Program/Dakwah/ProgramDakwah";
import ProgramEkonomi from "./pages/Program/Ekonomi/ProgramEkonomi";
import ProgramPendidikan from "./pages/Program/Pendidikan/ProgramPendidikan";
import ProgramKemanusiaan from "./pages/Program/Kemanusiaan/ProgramKemanusiaan";
import FormPengajuan from "./pages/FormPengajuan/FormPengajuan";
import Akun from "./pages/Akun/Akun";
import Profile from "./pages/Akun/Profil/Profil";
import EditProfile from "./pages/Akun/Profil/Edit/EditProfil";
import FAQ from "./pages/Akun/FAQ/FAQ";
import CekStatus from "./pages/Akun/CekStatus/CekStatus";
import Pengajuan from "./pages/Pengajuan/Pengajuan";
import './scss/style.scss'

function Layout() {
  const Location = useLocation();
  const hideNavbarRoutes = ["/", "/Onboarding1", "/Onboarding2", "/Onboarding3", "/Login", "/ForgotPass", "/ResetPass", "/Register"];

  return (
    <>
      {!hideNavbarRoutes.includes(Location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/Onboarding1" element={<Onboarding1 />} />
        <Route path="/Onboarding2" element={<Onboarding2 />} />
        <Route path="/Onboarding3" element={<Onboarding3 />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPass" element={<ForgotPassword />} />
        <Route path="/ResetPass" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Program/Kemanusiaan" element={<ProgramKemanusiaan />} />
        <Route path="/Program/Kesehatan" element={<ProgramKesehatan />} />
        <Route path="/Program/Ekonomi" element={<ProgramEkonomi />} />
        <Route path="/Program/Pendidikan" element={<ProgramPendidikan />} />
        <Route path="/Program/Dakwah" element={<ProgramDakwah />} />
        <Route path="/FormPengajuan" element={<FormPengajuan />} />
        <Route path="/Akun" element={<Akun />} />
        <Route path="/Akun/Profil" element={<Profile />} />
        <Route path="/Akun/Profil/Edit" element={<EditProfile />} />
        <Route path="/Akun/FAQ" element={<FAQ />} />
        <Route path="/Akun/CekStatus" element={<CekStatus />} />
        <Route path="/Pengajuan" element={<Pengajuan />} />
      </Routes>
    </Router>
  );
}

export default App;
