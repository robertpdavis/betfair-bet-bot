import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_SYSTEM, QUERY_EVENT_TYPES } from '../utils/queries';
import { TOGGLE_SYSTEM, RESET_SYSTEM, UPDATE_SYSTEM, COPY_SYSTEM } from '../utils/mutations';
import SystemForm from '../components/SystemForm';
import ButtonToolbar from '../components/ButtonToolbar';
import Alert from '../components/Alert';
import '../App.css';

const SingleSystem = () => {

  let navigate = useNavigate();

  //Elevated state for form changes
  const [formState, setFormState] = useState('');
  //State to control the alert banner
  const [alertState, setAlertState] = useState({ show: false });

  const { systemId } = useParams();

  let formType = 'edit';

  //Get system data for the systemId
  const { loading: loadingS, data: dataS } = useQuery(QUERY_SINGLE_SYSTEM, {
    variables: { systemId },
  });
  const systemData = dataS?.system || {};

  //Get the inital state of the system
  const [systemState, setSystemState] = useState({});

  //Get eventType data for form select
  const { loading: loadingE, data: dataE } = useQuery(QUERY_EVENT_TYPES);
  const eventTypes = dataE?.eventTypes || {};


  //System start/stop mutation
  const [toggleSystem, { error: errorT, data: dataT }] = useMutation(TOGGLE_SYSTEM,
    {
      refetchQueries: [
        'getSingleSystem'
      ],
    });
  //Reset system stats mutation
  const [resetSystem, { error: errorR, data: dataR }] = useMutation(RESET_SYSTEM,
    {
      refetchQueries: [
        'getSingleSystem'
      ],
    });
  //Update system from formState
  const [updateSystem, { error: errorU, data: dataU }] = useMutation(UPDATE_SYSTEM,
    {
      refetchQueries: [
        'getSingleSystem'
      ],
    });
  //Update system from formState
  const [copySystem, { error: errorC, data: dataC }] = useMutation(COPY_SYSTEM);
  //Initial button toolbar settings
  const buttonSettings =
    [
      {
        name: 'save',
        title: 'Save',
        class: 'btn btn-sm btn-success me-3',
        state: 'disabled'
      },
      {
        name: 'reset',
        title: 'Reset Stats',
        class: 'btn btn-sm btn-warning me-3',
        state: 'disabled'
      },
      {
        name: 'startstop',
        title: 'Stop System',
        class: 'btn btn-sm btn-success me-3',
        state: 'enabled'
      },
      {
        name: 'testfilter',
        title: 'Test Filter',
        class: 'btn btn-sm btn-secondary me-3',
        state: 'enabled'
      }
    ]

  if (systemData.isActive) {
    buttonSettings[2].title = 'Stop System';
    buttonSettings[2].class = 'btn btn-sm btn-danger me-3';
    buttonSettings[1].state = 'disabled';
  } else {
    buttonSettings[2].title = 'Start System';
    buttonSettings[2].class = 'btn btn-sm btn-success me-3';
    buttonSettings[1].state = 'enabled';
  }

  // Set the button status first and subsequent renders
  const [buttonState, setBtnState] = useState(buttonSettings);
  useEffect(() => {
    setBtnState(buttonSettings)
  }, [systemData])

  //Check if user should be here, if not send to login
  if (!Auth.loggedIn()) { navigate("login") };

  //Handle mutations
  const handleBtnClick = async (event) => {
    event.preventDefault();
    const action = event.target.name;

    try {
      let response = '';

      switch (action) {
        case 'startstop':
          let toggle = '';
          (event.target.textContent === 'Start System') ? toggle = 'start' : toggle = 'stop'

          if (toggle === 'start') {
            setAlertState({ variant: 'success', message: 'Starting system. Updating system events. May take a little while...' });
          }
          const apiType = systemData.apiMode;
          response = await toggleSystem({
            variables: { systemId, toggle, apiType },
          });

          if (response.data.toggleSystem.status === true) {
            setAlertState({ show: false });
            if (toggle === 'start') {
              buttonState[2].title = 'Stop System';
              buttonState[2].class = 'btn btn-sm btn-danger me-3';
              buttonState[1].state = 'disabled';
            } else {
              buttonState[2].title = 'Start System';
              buttonState[2].class = 'btn btn-sm btn-success me-3';
              buttonState[1].state = 'enabled';
            }
            setBtnState(buttonState);
          } else {
            setAlertState({ variant: 'danger', message: 'System ' + toggle + ' failed. ' + response.data.toggleSystem.msg })
          }
          break;

        case 'save':

          formState['_id'] = systemId;
          //To do presave checks and set data
          //TO DO

          response = await updateSystem({
            variables: { ...formState },
          });

          if (response.data.updateSystem.status === true) {
            setAlertState({ variant: 'success', message: 'The system was updated.' })
          } else {
            setAlertState({ variant: 'danger', message: 'System update failed. ' + response.data.updateSystem.msg })
          }
          break;

        case 'reset':

          response = await resetSystem({
            variables: { systemId },
          });

          if (response.data.resetSystem.status === true) {
            setAlertState({ variant: 'success', message: 'The system stats were reset.' })
          } else {
            setAlertState({ variant: 'danger', message: 'System stats reset failed. ' + response.data.resetSystem.msg })
          }

          break;

        case 'testfilter':

          //TO DO

          break;

        default:
          break;
      }

    } catch (e) {
      throw (e);
    }

  }
  const handleFormChange = async (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    if (buttonState[0].state === 'disabled') {
      buttonState[0].state = 'enabled';
      setBtnState(buttonState);
    }

  };

  const handleAlertClick = async (option) => {
    setAlertState({ show: false });
  };

  if (loadingS || loadingE) {
    return <div>Loading...</div>;
  }


  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          {'System: ' + systemData.systemId + " - " + systemData.title}
        </div>
        <div className="row">
          <Alert alertState={alertState} handleAlertClick={handleAlertClick} />
        </div>
        <div className="row">
          <div className="col-6">
            <ButtonToolbar buttonState={buttonState} handleBtnClick={handleBtnClick} />
          </div>
          <div className="col-6">
            <h6 className="d-inline">Last Start: {new Date(systemData.lastStarted).toLocaleString()}</h6>
            <h6 className="d-inline ms-3">Last Stop: {new Date(systemData.lastStopped).toLocaleString()}</h6>
            <div>
              Last System Message: {systemData.statusDesc}
            </div>
          </div>
        </div>
        <div className="row">
          <SystemForm systemData={systemData} evenTypes={eventTypes} formState={formState} handleFormChange={handleFormChange} formType={formType} />
        </div>
      </section>
    </main>
  );
};

export default SingleSystem;
