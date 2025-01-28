import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between Login and Signup
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupNameError, setSignupNameError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    let isLoginValid = true;

    if (!validateEmail(loginEmail)) {
      setLoginEmailError('Invalid email format');
      isLoginValid = false;
    } else {
      setLoginEmailError('');
    }

    if (!loginPassword) {
      setLoginPasswordError('Password is required');
      isLoginValid = false;
    } else {
      setLoginPasswordError('');
    }

    if (isLoginValid) {
      console.log('Login Form values:', { email: loginEmail, password: loginPassword });
      // Optionally, redirect or perform login action here
    }
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    let isSignupValid = true;

    if (!signupName) {
      setSignupNameError('Name is required');
      isSignupValid = false;
    } else {
      setSignupNameError('');
    }

    if (!validateEmail(signupEmail)) {
      setSignupEmailError('Invalid email format');
      isSignupValid = false;
    } else {
      setSignupEmailError('');
    }

    if (!signupPassword) {
      setSignupPasswordError('Password is required');
      isSignupValid = false;
    } else {
      setSignupPasswordError('');
    }


    if (isSignupValid) {
      console.log('Signup Form values:', { name: signupName, email: signupEmail, password: signupPassword });
      setIsLoginMode(true); // Switch to Login form after successful signup
    }
  };

  const toggleFormMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            {isLoginMode ? (
              <>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    {loginEmailError && <div className="text-danger">{loginEmailError}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    {loginPasswordError && <div className="text-danger">{loginPasswordError}</div>}
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                  <div className="mt-3 text-center">
                    <a href="#">Forgot Password?</a> | <button type="button" className="btn btn-link" onClick={toggleFormMode}>Sign Up</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                  <div className="mb-3">
                    <label htmlFor="signupName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="signupName"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                    />
                    {signupNameError && <div className="text-danger">{signupNameError}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="signupEmail"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                    />
                    {signupEmailError && <div className="text-danger">{signupEmailError}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="signupPassword"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    {signupPasswordError && <div className="text-danger">{signupPasswordError}</div>}
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">Sign Up</button>
                  </div>
                  <div className="mt-3 text-center">
                    <button type="button" className="btn btn-link" onClick={toggleFormMode}>Login</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 text-center"> {/* Added for better spacing */}
{isLoginMode ? (
          <button type="button" className="btn btn-link" onClick={toggleFormMode}>Don't have an account? Sign Up</button>
        ) : (
          <button type="button" className="btn btn-link" onClick={toggleFormMode}>Already have an account? Login</button>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
