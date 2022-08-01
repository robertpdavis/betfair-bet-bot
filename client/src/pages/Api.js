import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth";
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_API } from '../utils/queries';

const SingleAPI = () => {

  const [formState, setFormState] = useState('');

  let userId = '';

  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }



  const { loading, data } = useQuery(QUERY_SINGLE_API, {
    // pass URL parameter
    variables: { userId },
  });

  const api = data?.apisetting || {};

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

  };

  const handleBtnClick = async (event) => {
    const action = event.targetname;

  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Betfair API
        </div>
        <div className="row">
          <div className="col-6">
            <div className="sub-header">
              General Settings
            </div>
            <form>
              <div className="col-auto mb-3">
                <label className="form-label" id="apiform_username-lbl" htmlFor="apiform_username" title="Username">Username</label>
                <input className="form-control w-75" type="text" id="apiform_username" name="apiUsername" value={api.apiUsername} size="30" onChange={handleChange} />
              </div>
              <div className="col-auto mb-3">
                <label className="form-label" id="apiform_password-lbl" htmlFor="apiform_password" title="Password">Password</label>
                <input className="form-control w-75" type="password" id="apiform_password" name="apiPassword" value={api.apiPassword} size="30" onChange={handleChange} />
              </div>
              <div className="col-auto mb-3">
                <label className="form-label" id="apiform_certfile-lbl" htmlFor="apiform_certfile" title="Certificate file">SSL Certificate</label>
                <textarea className="form-control w-75" name="certfile" id="apiform_certfile" cols="50" rows="4" resize="none" value={api.certfile} onChange={handleChange} />
              </div>
              <div className="col-auto mb-3">
                <label className="form-label" id="apiform_keyfile-lbl" htmlFor="apiform_keyfile" title="Key file">Key Certificate</label>
                <textarea className="form-control w-75" name="keyfile" id="apiform_keyfile" cols="50" rows="4" value={api.keyfile} onChange={handleChange} />
              </div>
              <div className="col-auto mb-3">
                <label className="form-label" id="sysform_betType-lbl" htmlFor="sysform_betType" title="Back or Lay betting">API Mode</label>
                <select className="form-control w-75" id="sysform_betType" name="betType" value={api.apiMode} onChange={handleChange}>
                  <option value="test">Test</option>
                  <option value="live" disabled>Live</option>
                </select>
              </div>
            </form>
          </div>
          <div className="col-6">
            <div className="sub-header">
              Live API Settings
            </div>
            <form>
              <div className="card w-75 mb-3">
                <div class="card-header">
                  <h5 className="d-inline">API STATUS:
                    {api.liveApiEnabled ?
                      api.liveApiStatus ?
                        <span className="badge bg-success ms-2">UP</span>
                        :
                        <span className="badge bg-danger ms-2">DOWN</span>
                      :
                      <span className="badge bg-secondary ms-2">DISABLED</span>
                    }
                  </h5>
                  <div className='d-inline ms-2'>
                    Last Update: {api.lastLiveStatus ? new Date(api.lastLiveStatus).toLocaleString() : ""}
                  </div>
                </div>
                <div className="card-body row">
                  <div className="col-4 text-end">
                    <label className="form-label-sm mb-2" id="keytest-label" htmlFor="apiKeyLive">API Key:</label>
                    <label className="form-label-sm" id="apienabled-label" htmlFor="liveApiEnabled">API Enabled:</label>
                    <label className="form-label-sm" id="apikeepalive-label" htmlFor="lastLiveKeepAlive">Last Keepalive:</label>
                    <label className="form-label-sm" id="apilastlogin-label" htmlFor="lastLiveLogin">Last Login:</label>
                    <label className="form-label-sm" id="apilastlogout-label" htmlFor="lastLiveLogout">Last Logout:</label>
                    <label className="form-label-sm" id="apilastmessage-label" htmlFor="lastLiveMessage">Last Message:</label>
                  </div>
                  <div className="col-8 text-start">
                    <input className="form-control-sm d-block" type="text" name="apiKeyLive" id="apiKeyLive" value={api.apiKeyLive} />
                    {api.liveApiEnabled ?
                      <input className="form-check-input ms-3 d-block" type="checkbox" name="liveApiEnabled" id="liveApiEnabled" checked />
                      :
                      <input className="form-check-input ms-3 d-block" type="checkbox" name="liveApiEnabled" id="liveApiEnabled" />
                    }
                    {api.lastLiveKeepAlive ? new Date(api.lastLiveKeepAlive).toLocaleString() : ""}
                    <br></br>
                    {api.lastLiveLogin ? new Date(api.lastLiveLogin).toLocaleString() : ""}
                    <br></br>
                    {api.lastLiveLogout ? new Date(api.lastLiveLogout).toLocaleString() : ""}
                    <br></br>
                    {api.lastLiveMessage}
                  </div>
                </div>
                <div class="card-footer">
                  {api.liveApiEnabled ?
                    !api.liveApiStatus ?
                      <>
                        <button className="btn btn-sm btn-secondary" name='livelogin' onClick={handleBtnClick}>Login</button>
                        <button className="btn btn-sm btn-warning ms-3" name='livedisable'>Disable API</button>
                      </>
                      :
                      <>
                        <button className="btn btn-sm btn-warning" name='livelogout' onClick={handleBtnClick}>Logout</button>
                        <button className="btn btn-sm btn-warning ms-3" name='livedisable'>Disable API</button>
                      </>
                    :
                    <>
                      <button className="btn btn-sm btn-secondary" name='livelogin' disabled>Login</button>
                      <button className="btn btn-sm btn-success ms-3" name='liveenable'>Enable API</button>
                    </>
                  }
                </div>
              </div>
            </form>
            <div className="sub-header">
              Test API Settings
            </div>
            <form>
              <div className="card w-75 mb-3">
                <div class="card-header">
                  <h5 className="d-inline">API STATUS:
                    {api.testApiEnabled ?
                      api.testApiStatus ?
                        <span className="badge bg-success ms-2">UP</span>
                        :
                        <span className="badge bg-danger ms-2">DOWN</span>
                      :
                      <span className="badge bg-secondary ms-2">DISABLED</span>
                    }
                  </h5>
                  <div className='d-inline ms-2'>
                    Last Update: {new Date(api.lastTestStatus).toLocaleString()}
                  </div>
                </div>
                <div className="card-body row">
                  <div className="col-4 text-end">
                    <label className="form-label-sm mb-2" id="keytest-label" htmlFor="apiKeyTest">API Key:</label>
                    <label className="form-label-sm" id="apienabled-label" htmlFor="testApiEnabled">API Enabled:</label>
                    <label className="form-label-sm" id="apikeepalive-label" htmlFor="lastTestKeepAlive">Last Keepalive:</label>
                    <label className="form-label-sm" id="apilastlogin-label" htmlFor="lastTestLogin">Last Login:</label>
                    <label className="form-label-sm" id="apilastlogout-label" htmlFor="lastTestLogout">Last Logout:</label>
                    <label className="form-label-sm" id="apilastmessage-label" htmlFor="lastTestMessage">Last Message:</label>
                  </div>
                  <div className="col-8 text-start">
                    <input className="form-control-sm d-block" type="text" name="apiKeyTest" id="apiKeyTest" value={api.apiKeyTest} />
                    {api.testApiEnabled ?
                      <input className="form-check-input ms-3 d-block" type="checkbox" name="testApiEnabled" id="testApiEnabled" checked />
                      :
                      <input className="form-check-input ms-3 d-block" type="checkbox" name="testApiEnabled" id="testApiEnabled" />
                    }
                    {api.lastTestKeepAlive ? new Date(api.lastTestKeepAlive).toLocaleString() : ""}
                    <br></br>
                    {api.lastTestLogin ? new Date(api.lastTestLogin).toLocaleString() : ""}
                    <br></br>
                    {api.lastTestLogout ? new Date(api.lastTestLogout).toLocaleString() : ""}
                    <br></br>
                    {api.lastTestMessage}
                  </div>
                </div>
                <div class="card-footer">
                  {api.testApiEnabled ?
                    !api.testApiStatus ?
                      <>
                        <button className="btn btn-sm btn-secondary" name='testlogin' onClick={handleBtnClick}>Login</button>
                        <button className="btn btn-sm btn-warning ms-3" name='testdisable'>Disable API</button>
                      </>
                      :
                      <>
                        <button className="btn btn-sm btn-warning" name='testlogout' onClick={handleBtnClick}>Logout</button>
                        <button className="btn btn-sm btn-warning ms-3" name='testdisable'>Disable API</button>
                      </>
                    :
                    <>
                      <button className="btn btn-sm btn-secondary" name='testlogin' disabled>Login</button>
                      <button className="btn btn-sm btn-success ms-3" name='testenable'>Enable API</button>
                    </>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </section >
    </main >
  );
};

export default SingleAPI;
