import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Account = () => {

  let navigate = useNavigate();

  const [formState, setFormState] = useState('');
  const [updateUser, { error: error, data: dataM, loading: loadingM }] = useMutation(UPDATE_USER);

  let username = '';
  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    username = user.data.username;
    userId = user.data._id;
  }

  const { loading, data } = useQuery(QUERY_USER,
    {
      variables: { username },
    });

  const user = data?.user || {};


  if (!Auth.loggedIn()) { navigate("login") };

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleBtnClick = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          My Account
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="sub-header">
              My Details
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" htmlFor="firstName" title="Fist Name">Fist Name</label>
              <input className="form-control w-75" type="text" id="firstName" name="firstName" value={formState.firstName} defaultValue={user.firstName} size="30" onChange={handleChange} />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" htmlFor="lastName" title="Last Name">Last Name</label>
              <input className="form-control w-75" type="text" id="lastName" name="lastName" value={formState.lastName} defaultValue={user.lastName} size="30" onChange={handleChange} />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" htmlFor="username" title="Username">Username</label>
              <input className="form-control w-75" type="text" id="username" name="username" value={formState.username} defaultValue={user.username} size="30" onChange={handleChange} />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" htmlFor="email" title="Email">Email</label>
              <input className="form-control w-75" type="email" id="email" name="email" value={formState.email} defaultValue={user.email} size="60" onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-sm btn-success toolbar-btn" name="save" onClick={handleBtnClick}>Save</button>
          </div>
          <div className="col-12 col-lg-6">
          </div>
        </div>
      </section>
    </main >
  );
};

export default Account;
