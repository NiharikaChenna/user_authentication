import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AuthState } from '../redux/reducer/Reducer';
import {
  signInRequest,
  signInFailed,
  signInSuccess,
  passwordForgetRequest,
} from '../redux/actions/Action';
import 'bootstrap/dist/css/bootstrap.min.css';

type SignInFormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state: AuthState) => state.errorMessage);
  const isLoading = useSelector((state: AuthState) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    try {
      const { email, password } = data;
      dispatch(signInRequest({ email, password }));
      setTimeout(() => {
        handleSignInSuccess('user123');
      }, 2000);
    } catch (error) {
      dispatch(signInFailed());
      // eslint-disable-next-line
      console.log(error); // Handle the error appropriately
    }
  };

  const handleSignInSuccess = (userId: string) => {
    dispatch(signInSuccess(userId));
    if (userId) {
      navigate('/dashboard');
    } else {
      dispatch(signInFailed());
    }
  };

  const handlePasswordForget = () => {
    dispatch(passwordForgetRequest('user-email@example.com'));
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="row my-5">
      <div className="col-md-6 shadow mx-auto p-5">
        <h1 className="mb-4">SIGN IN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <div className="invalid-feedback">This field is required</div>
            )}
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              {...register('password', { required: true })}
              autoComplete="new-password"
            />
            {errors.password && (
              <div className="invalid-feedback">This field is required</div>
            )}
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <button type="submit" className="btn btn-primary">
                {isLoading ? 'Loading...' : 'Sign In'}
              </button>
              {/* eslint-disable-next-line */}
              <Link to="/forgotpassword" className="text-decoration-none" onClick={handlePasswordForget}>
                Forgot Password
              </Link>
            </div>
            <div className="col-md-6">
              {!errorMessage && (
                <Link to="/signup">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                </Link>
              )}
            </div>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};
