import { Link, useNavigate } from "react-router-dom";
import logoBaznas from "../../assets/LOGO_BAZNAS_PADANG.png"
import "../../styles.css";

const Register = () => {
  const Navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-box">
      <img src={logoBaznas} alt="Logo Baznas"/>
        <h2>Welcome to</h2>
        <p>Create your new account</p>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <div className="terms">
          Dengan melanjutkan, Anda menyetujui persyaratan <a href="#Login">Ketentuan Layanan</a> dan mengakui bahwa Anda telah membaca <a href="#Login">Kebijakan Privasi</a>.
        </div>
        <button onClick={() => Navigate("/Home")}>Register</button>

        <p>
          Already have an account? <Link to="/Login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
