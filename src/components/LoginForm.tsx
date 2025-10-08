import { useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/login.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.accessToken);
      setAuth(true);
      navigate("/admin");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials or account blocked.");
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
                  Log in
                </h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                {error && <div className="text-danger small mb-2">{error}</div>}

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block w-100"
                    type="submit"
                  >
                    Login
                  </button>
                </div>

                <p className="small mb-5 pb-lg-2">
                  <a className="text-muted" href="#">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Don't have an account?{" "}
                  <a href="/theapp/register" className="link-info">
                    Register here
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

export default LoginForm;
