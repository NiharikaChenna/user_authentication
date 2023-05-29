import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../redux/actions/Action';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DashBoard() {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/logout');
  };

  const onSubmit = () => {
    handleLogout();
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1>Succesfully logged in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit" className="btn btn-primary mt-4">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
