import { useState } from "react";
import { riderLogin } from "./api";
import "./RiderLogin.css";


function RiderLogin({
  onLoginSuccess,
  onRegister,
}) {

  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);


  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async () => {

    if (!/^[6-9]\d{9}$/.test(mobile)) {

      alert(
        "Please enter a valid 10 digit Indian mobile number."
      );

      return;
    }


    if (!/^\d{6}$/.test(pin)) {

      alert(
        "PIN must be exactly 6 digits."
      );

      return;
    }


    try {

      setLoading(true);

      const response = await riderLogin(
        mobile,
        pin
      );


      console.log(
        "Rider Login Response:",
        response
      );


      if (
        typeof onLoginSuccess ===
        "function"
      ) {

        onLoginSuccess(response);
      }


    } catch (error) {

      console.error(
        "Rider Login Error:",
        error
      );


      alert(
        error?.message ||
        "Login failed. Please check your mobile number and PIN."
      );


    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="rider-login-page">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="rider-login-header">

        <div className="rider-login-brand">

          {/* ONLY LOGO */}
          <div className="rider-login-logo">

            <img
              src="/maxigo-rider-logo.png"
              alt="MaxiGo Rider"
            />

          </div>

        </div>


        <div className="rider-login-help">
          Need Help?
        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="rider-login-container">


        {/* ===================================================
            LEFT
        =================================================== */}

        <section className="rider-login-left">

          <div className="rider-login-badge">
            🛵 RIDER PARTNER
          </div>


          <h1>

            Welcome back,

            <span>
              {" "}MaxiGo Rider
            </span>

          </h1>


          <p className="rider-login-description">

            Login to your MaxiGo rider
            account and start receiving
            nearby delivery orders.

          </p>


          <div className="rider-login-benefits">


            {/* BENEFIT 1 */}

            <div className="rider-login-benefit">

              <div className="rider-login-benefit-icon">
                📦
              </div>

              <div>

                <h3>
                  Receive Orders
                </h3>

                <p>
                  Get nearby delivery
                  orders directly in
                  your rider app.
                </p>

              </div>

            </div>


            {/* BENEFIT 2 */}

            <div className="rider-login-benefit">

              <div className="rider-login-benefit-icon">
                💰
              </div>

              <div>

                <h3>
                  Track Earnings
                </h3>

                <p>
                  Check your daily
                  earnings and completed
                  deliveries.
                </p>

              </div>

            </div>


            {/* BENEFIT 3 */}

            <div className="rider-login-benefit">

              <div className="rider-login-benefit-icon">
                🗺️
              </div>

              <div>

                <h3>
                  Easy Delivery
                </h3>

                <p>
                  Accept orders and
                  navigate to customer
                  locations.
                </p>

              </div>

            </div>


          </div>

        </section>


        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <section className="rider-login-card">


          <div className="rider-login-card-header">

            <div>

              <h2>
                Rider Login
              </h2>

              <p>
                Login to continue to your
                MaxiGo rider account.
              </p>

            </div>


            <div className="rider-login-icon">
              👤
            </div>

          </div>


          {/* =================================================
              MOBILE
          ================================================= */}

          <div className="rider-login-input-group">

            <label>

              Mobile Number

              <b>
                *
              </b>

            </label>


            <div className="rider-mobile-input">

              <span>
                +91
              </span>


              <input
                type="tel"
                maxLength="10"
                inputMode="numeric"
                placeholder="9876543210"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

            </div>

          </div>


          {/* =================================================
              PIN
          ================================================= */}

          <div className="rider-login-input-group">

            <label>

              Login PIN

              <b>
                *
              </b>

            </label>


            <div className="rider-pin-input">

              <input
                type={
                  showPin
                    ? "text"
                    : "password"
                }
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6 digit PIN"
                value={pin}
                onChange={(e) =>
                  setPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />


              <button
                type="button"
                onClick={() =>
                  setShowPin(
                    !showPin
                  )
                }
              >

                {showPin
                  ? "🙈"
                  : "👁️"}

              </button>

            </div>


            <small className="rider-login-help-text">

              Use the 6 digit PIN you
              created during registration.

            </small>

          </div>


          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="button"
            className="rider-login-button"
            onClick={handleLogin}
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}


            {!loading && (
              <span>
                →
              </span>
            )}

          </button>


          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="rider-login-security">

            🔒 Your login information is
            securely handled.

          </div>


          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="rider-register-link">

            Don't have a MaxiGo rider
            account?


            <button
              type="button"
              onClick={onRegister}
            >
              Register
            </button>

          </div>


        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="rider-login-footer">

        © 2026 MAXIGO

      </footer>


    </div>
  );
}


export default RiderLogin;