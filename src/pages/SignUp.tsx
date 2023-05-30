import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import { AuthState } from '../redux/reducer/Reducer';
import {
  signUpFailed,
  signUpRequest,
  signUpSuccess,
} from '../redux/actions/Action';
import { schema } from '../components/Schema';

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state: AuthState) => state.errorMessage);
  const isLoading = useSelector((state: AuthState) => state.isLoading);

  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      dispatch(signUpFailed('Passwords do not match'));
    } else {
      setIsProcessing(true);

      dispatch(signUpRequest({ email: data.email, password: data.password }));
      setTimeout(() => {
        handleSignUpSuccess('user123');
      }, 2000);
    }
  };

  const handleSignUpSuccess = (userId: string) => {
    dispatch(signUpSuccess(userId));
    navigate('/');
  };

  return (
    <div className="row my-5">
      <div className="col-md-6 shadow mx-auto p-5">
        <h1 className="mb-4">SIGN UP</h1>
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
          <div className="form-group mt-3">
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? 'is-invalid' : ''
              }`}
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true })}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">This field is required</div>
            )}
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading || isProcessing}
              >
                {isProcessing ? 'Loading...' : 'Sign Up'}
              </button>
            </div>
            <div className="col-md-6">
              {!errorMessage && (
                <p className="mt-3">
                  Already have an account? <Link to="/">Sign In</Link>
                </p>
              )}
            </div>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};
