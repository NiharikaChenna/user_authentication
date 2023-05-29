import React from 'react';
import { Link } from 'react-router-dom';

export default function LogOut() {
  return (
    <div>
      <h1>successfully logged out</h1>
      <Link to="/" className="text-decoration-none">
        Go back to Sign-In
      </Link>
    </div>
  );
}
