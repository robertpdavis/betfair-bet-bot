import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = (props) => {

  const username = Auth.getProfile().data.username;

  const { loading, data } = useQuery(QUERY_USER,
    {
      variables: { username },
    });


  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };



  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // const { data } = await loginUser({
      //   variables: { ...formState },
      // });

    } catch (e) {
      console.error(e);
    }

  };

  return (
    <main>
      <section className="container">

        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3 w-25">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                className="form-control"
                name="firstName"
                type="text"
                defaultValue={data.user.firstName}
                readOnly
              />
            </div>
            <div className="mb-3 w-25">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                defaultValue={data.user.lastName}
                readOnly
              />
            </div>
            <button
              className="btn btn-block btn-primary"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Submit
            </button>
          </form>

        )}
      </section>
    </main>
  );
};

export default Profile;
