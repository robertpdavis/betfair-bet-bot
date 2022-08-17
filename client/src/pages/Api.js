import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth";
import { useQuery, useMutation } from '@apollo/client';
import Alert from '../components/Alert';
import { QUERY_SINGLE_API } from '../utils/queries';
import { UPDATE_API, ENABLE_API, DISABLE_API, TEST_API, API_LOGIN, API_LOGOUT } from '../utils/mutations';

const SingleAPI = () => {

  //Set initial states for the update, alerts and buttons
  const [formState, setFormState] = useState('');
  const [alertState, setAlertState] = useState({ show: false });
  //Mutations for updating the API settings, login and logout as well as enabling/disabling.
  const [updateApi, { error: errorU, data: dataU, loading: loadingU }] = useMutation(UPDATE_API,
    {
      refetchQueries: [
        'getSingleApi'
      ],
    });

  const [enableApi, { error: errorE, data: dataE, loading: loadingE }] = useMutation(ENABLE_API);
  const [disableApi, { error: errorD, data: dataD, loading: loadingD }] = useMutation(DISABLE_API);
  const [apiLogin, { error: errorL, data: dataL, loading: loadingL }] = useMutation(API_LOGIN,
    {
      refetchQueries: [
        'getSingleApi'
      ],
    });;
  const [apiLogout, { error: errorO, data: dataO, loading: loadingO }] = useMutation(API_LOGOUT,
    {
      refetchQueries: [
        'getSingleApi'
      ],
    });;
  const [testApi, { error: errorT, data: dataT, loading: loadingT }] = useMutation(TEST_API,
    {
      refetchQueries: [
        'getSingleApi'
      ],
    });;

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  //Get the api data from the server
  const { loading, data } = useQuery(QUERY_SINGLE_API, {
    variables: { userId },
  });

  const api = data?.apisetting || {};


  const buttonSettings =
    [
      {
        state: 'disabled'
      },
      {
        title: `${api.liveApiEnabled ? 'Disable API' : 'Enabled API'}`,
        class: `${api.liveApiEnabled ? 'btn btn-sm btn-warning ms-3' : 'btn btn-sm btn-success ms-3'}`,
      },
      {
        title: `${api.testApiEnabled ? 'Disable API' : 'Enabled API'}`,
        class: `${api.testApiEnabled ? 'btn btn-sm btn-warning ms-3' : 'btn btn-sm btn-success ms-3'}`,
      },
    ]
  const [buttonState, setBtnState] = useState('buttonSettings');
  // useEffect(() => {
  //   setBtnState(buttonSettings)
  // }, [api])


  //Now we can check if user should be here. If not, route to login.
  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  //Updating our formState when changes made
  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //Handle mutations
  const handleBtnClick = async (event) => {
    const action = event.target.name;
    let response = "";
    let apiType = ''

    switch (action) {
      case 'savesettings':

        response = await updateApi({
          variables: { ...formState },
        });

        if (response.data.updateApi.status === true) {
          setAlertState({ variant: 'success', message: 'Update success.' })
        } else {
          setAlertState({ variant: 'danger', message: 'Update failed. ' + response.data.updateApi.msg })
        }


        if (errorU) { setAlertState({ variant: 'danger', message: 'Something happened with the request: ' + errorU.message }) };

        break;

      case 'livelogin':
      case 'testlogin':

        apiType = (action === 'livelogin') ? 'live' : '';
        apiType = (action === 'testlogin') ? 'test' : '';

        response = await apiLogin({
          variables: { userId, apiType },
        });

        if (response.data.apiLogin.status === true) {
          setAlertState({ variant: 'success', message: 'Login success.' })
        } else {
          setAlertState({ variant: 'danger', message: 'Login failed. ' + response.data.apiLogin.msg })
        }

        if (errorL) { setAlertState({ variant: 'danger', message: 'Something happened with the request: ' + errorL.message }) };

        break;

      case 'livelogout':
      case 'testlogout':

        apiType = (action === 'livelogout') ? 'live' : '';
        apiType = (action === 'testlogout') ? 'test' : '';

        response = await apiLogout({
          variables: { userId, apiType },
        });

        if (response.data.apiLogout.status === true) {
          setAlertState({ variant: 'success', message: 'Logout success.' })
        } else {
          setAlertState({ variant: 'danger', message: 'Logout failed. ' + response.data.apiLogout.msg })
        }

        if (errorO) { setAlertState({ variant: 'danger', message: 'Something happened with the request: ' + errorO.message }) };

        break;

      case 'livedisable':
      case 'testdisable':

        apiType = (action === 'livedisable') ? 'live' : '';
        apiType = (action === 'testdisable') ? 'test' : '';

        response = await disableApi({
          variables: { userId, apiType },
        });

        if (response.data.disableApi.status === true) {
          setAlertState({ variant: 'success', message: 'API Disabled.' })
        } else {
          setAlertState({ variant: 'danger', message: 'API disable failed. ' + response.data.disableApi.msg })
        }

        if (errorD) { setAlertState({ variant: 'danger', message: 'Something happened with the request: ' + errorD.message }) };

        break;
      case 'liveenable':
      case 'testenable':

        apiType = (action === 'liveenable') ? 'live' : '';
        apiType = (action === 'testenable') ? 'test' : '';

        response = await enableApi({
          variables: { userId, apiType },
        });

        if (response.data.enableApi.status === true) {
          setAlertState({ variant: 'success', message: 'API Enabled.' })
        } else {
          setAlertState({ variant: 'danger', message: 'API enable failed. ' + response.data.enableApi.msg })
        }

        if (errorE) { setAlertState({ variant: 'danger', message: 'Something happened with the request: ' + errorE.message }) };

        break;

      case 'livetest':
      case 'testtest':

        apiType = (action === 'livetest') ? 'live' : '';
        apiType = (action === 'testtest') ? 'test' : '';

        response = await testApi({
          variables: { userId, apiType }
        });

        if (response.data.testApi.status === true) {
          setAlertState({ variant: 'success', message: 'Keepalive sent.' })
        } else {
          setAlertState({ variant: 'danger', message: 'Keepalive failed. ' + response.data.testApi.msg })
        }

        if (errorT) { setAlertState({ variant: 'danger', message: 'Something happened with the request: ' + errorT.message }) };

        break;

      default:

        break;
    }

  };

  const handleAlertClick = async (option) => {
    setAlertState({ show: false });
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
          <Alert alertState={alertState} handleAlertClick={handleAlertClick} />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="sub-header">
              General Settings
            </div>

            <div className="col-auto mb-3">
              <label className="form-label" id="apiform_username-lbl" htmlFor="apiform_username" title="Username">Username</label>
              <input className="form-control w-75" type="text" id="apiform_username" name="apiUsername" value={formState.apiUsername} defaultValue={api.apiUsername} size="30" onChange={handleChange} />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="apiform_password-lbl" htmlFor="apiform_password" title="Password">Password</label>
              <input className="form-control w-75" type="password" id="apiform_password" name="apiPassword" value={formState.apiPassword} defaultValue={api.apiPassword} size="30" onChange={handleChange} />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="apiform_certfile-lbl" htmlFor="apiform_certfile" title="Certificate file">SSL Certificate</label>
              <textarea className="form-control w-75" name="certfile" id="apiform_certfile" cols="50" rows="4" resize="none" value={formState.certfile} defaultValue={api.certfile} onChange={handleChange} />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="apiform_keyfile-lbl" htmlFor="apiform_keyfile" title="Key file">Key Certificate</label>
              <textarea className="form-control w-75" name="keyfile" id="apiform_keyfile" cols="50" rows="4" value={formState.keyfile} defaultValue={api.keyfile} onChange={handleChange} />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="sysform_betType-lbl" htmlFor="sysform_betType" title="Back or Lay betting">API Mode</label>
              <select className="form-control w-75" id="sysform_betType" name="betType" value={formState.apiMode} defaultValue={api.apiMode} onChange={handleChange}>
                <option value="test">Test</option>
                <option value="live" disabled>Live</option>
              </select>
            </div>
            <button type="button" className="btn btn-sm btn-success" name="savesettings" onClick={handleBtnClick}>Save Settings</button>
          </div>
          <div className="col-6">
            <div className="sub-header">
              Live API Settings
            </div>

            <div className="card w-75 mb-3">
              <div className="card-header">
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
                  <input className="form-control-sm d-block" type="text" name="apiKeyLive" id="apiKeyLive" disabled value={formState.apiKeyLive} defaultValue={api.apiKeyLive} onChange={handleChange} />
                  {api.liveApiEnabled ?
                    <input className="form-check-input ms-3 d-block" type="checkbox" name="liveApiEnabled" id="liveApiEnabled" defaultChecked="true" />
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
              <div className="card-footer">
                <button className="btn btn-sm btn-success" name='livelogin' disabled onClick={handleBtnClick}>Login</button>
                <button className="btn btn-sm btn-warning ms-3" name='livelogout' disabled onClick={handleBtnClick}>Logout</button>
                <button className="btn btn-sm btn-warning ms-3" name='liveenable' disabled >Disable</button>
                <button className="btn btn-sm btn-secondary ms-3" name='livetest' disabled onClick={handleBtnClick}>Test API</button>
              </div>
            </div>

            <div className="sub-header">
              Test API Settings
            </div>

            <div className="card w-75 mb-3">
              <div className="card-header">
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
                  <input className="form-control-sm d-block" type="text" name="apiKeyTest" id="apiKeyTest" value={formState.apiKeyTest} defaultValue={api.apiKeyTest} onChange={handleChange} />
                  {api.testApiEnabled ?
                    <input className="form-check-input ms-3 d-block" type="checkbox" name="testApiEnabled" id="testApiEnabled" readOnly checked={true} />
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
              <div className="card-footer">
                <button className="btn btn-sm btn-success ms-3" name='testlogin' onClick={handleBtnClick}>Login</button>
                <button className="btn btn-sm btn-warning ms-3" name='testlogout' onClick={handleBtnClick}>Logout</button>
                <button className="btn btn-sm btn-warning ms-3" name='testenable' disabled >Disable</button>
                <button className="btn btn-sm btn-secondary ms-3" name='testtest' onClick={handleBtnClick}>Test API</button>
              </div>
            </div>
          </div>
        </div>
      </section >
    </main >
  );
};

export default SingleAPI;
