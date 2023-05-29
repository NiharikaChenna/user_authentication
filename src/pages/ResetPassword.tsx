import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line
const ResetPassword = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get('oobCode');
    const newPassword = 'new-password'; // Replace with the actual new password from your form

    if (oobCode && newPassword) {
      dispatch({
        type: 'PASSWORD_RESET_CONFIRMATION_REQUEST',
        payload: { oobCode, newPassword },
      });
    }
  }, []);
  // eslint-disable-next-line
  return (
    <div></div>
  )
};
// eslint-disable-next-line
export default ResetPassword;