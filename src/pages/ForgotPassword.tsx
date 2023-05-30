import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import { AuthState } from '../redux/reducer/Reducer';
import { passwordResetConfirmationRequest } from '../redux/actions/Action';

export const ForgotPassword = () => {
  const errorMessage = useSelector((state: AuthState) => state.errorMessage);
  const isLoading = useSelector((state: AuthState) => state.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get('oobCode');
    const newPassword = 'new-password'; // Replace with the actual new password from your form

    if (oobCode && newPassword) {
      dispatch(passwordResetConfirmationRequest(oobCode));
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordForget = () => {
    if (email.trim() === '') {
      // eslint-disable-next-line
      alert('Please enter your email');
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log('Error sending password reset email:', error);
      });
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="row my-5">
      <div className="col-md-6 shadow mx-auto p-5">
        <h1 className="mb-4">Forgot Password</h1>
        {isEmailSent ? (
          <p className="text-success">
            Reset password email sent successfully!
          </p>
        ) : (
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="row my-3">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePasswordForget}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Reset Password'}
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-link"
                  // eslint-disable-next-line
                  onClick={handleGoBack}>
                  Go back to Sign In
                </button>
              </div>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};
