import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import logo from "../assets/login.png";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [corporationName, setCorporationName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post("/auth/register", {
        fullName,
        email,
        password,
        corporationName: corporationName || null,
      });
      setMessage(
        "✅ Registration successful! Check your email for verification link."
      );
      setTimeout(() => navigate("/login"), 2500);
    } catch (err: any) {
      if (err.response?.status === 409) setError("E-mail already registered.");
      else setError("Registration failed. Please try again.");
    }
  };

  return (
    <section className="vh-100 bg-light">
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left side - form */}
          <div className="col-sm-6 text-black d-flex flex-column justify-content-center">
            <div className="px-5 ms-xl-4 mb-5">
              <i
                className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                style={{ color: "#709085" }}
              ></i>
              <span className="h1 fw-bold mb-0">MyApp</span>
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-4">
              <form onSubmit={handleSubmit} style={{ width: "23rem" }}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: 1 }}
                >
                  Sign up
                </h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="fullName"
                    className="form-control form-control-lg"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="fullName">
                    Full name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="new-email"
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="corporationName"
                    className="form-control form-control-lg"
                    value={corporationName}
                    onChange={(e) => setCorporationName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="corporationName">
                    Corporation name
                  </label>
                </div>

                {message && (
                  <div className="text-success small mb-2">{message}</div>
                )}
                {error && <div className="text-danger small mb-2">{error}</div>}

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block w-100"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>

                {/* <p className="small mb-5 pb-lg-2">
                  <a className="text-muted" href="#">
                    Forgot password?
                  </a>
                </p> */}
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="link-info">
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* Right side - image */}
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={logo}
              alt="Login illustration"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
