import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignupPage({ onLoginClick }) {
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
      onLoginClick(); // Switch to Login form after successful signup
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
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
                  <button type="button" className="btn btn-link" onClick={onLoginClick}>Login</button>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
