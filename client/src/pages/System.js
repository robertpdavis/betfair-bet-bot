import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_SYSTEM, QUERY_EVENT_TYPES } from '../utils/queries';
import { TOGGLE_SYSTEM, RESET_SYSTEM, UPDATE_SYSTEM, COPY_SYSTEM } from '../utils/mutations';
import SystemForm from '../components/SystemForm';
import ButtonToolbar from '../components/ButtonToolbar';
import Alert from '../components/Alert';
import '../App.css';

const SingleSystem = () => {

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
  const [toggleSystem, { error: errorT, data: dataT }] = useMutation(TOGGLE_SYSTEM);

  //Reset system stats mutation
  const [resetSystem, { error: errorR, data: dataR }] = useMutation(RESET_SYSTEM);

  //Update system from formState
  const [updateSystem, { error: errorU, data: dataU }] = useMutation(UPDATE_SYSTEM);

  //Update system from formState
  const [copySystem, { error: errorC, data: dataC }] = useMutation(COPY_SYSTEM);

  //Initial button toolbar settings
  const buttonSettings =
    [
      {
        name: 'new',
        title: 'Save',
        class: 'btn btn-sm btn-success me-3',
        state: 'disabled'
      },
      {
        name: 'archive',
        title: 'Archive',
        class: 'btn btn-sm btn-secondary me-3',
        state: 'disabled'
      },
      {
        name: 'reset',
        title: 'Reset Stats',
        class: 'btn btn-sm btn-warning me-3',
        state: 'disabled'
      },
      {
        name: 'copy',
        title: 'Copy System',
        class: 'btn btn-sm btn-secondary me-3',
        state: 'disabled'
      },
      {
        name: 'startstop',
        title: 'Stop System',
        class: 'btn btn-sm btn-success me3',
        state: 'enabled'
      }

    ]

  if (systemData.isActive) {
    buttonSettings[4].title = 'Stop System';
    buttonSettings[4].class = 'btn btn-sm btn-danger me3';
    buttonSettings[2].state = 'disabled';
  } else {
    buttonSettings[4].title = 'Start System';
    buttonSettings[4].class = 'btn btn-sm btn-success me3';
    buttonSettings[2].state = 'enabled';
  }

  // Set the 
  const [buttonState, setBtnState] = useState(buttonSettings);

  useEffect(() => {
    setBtnState(buttonSettings)
  }, [systemData])

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  const handleBtnClick = async (event) => {
    event.preventDefault();
    const { name } = event.target;

    try {

      switch (name) {
        case 'startstop':
          let toggle = '';
          (event.target.textContent === 'Start System') ? toggle = 'start' : toggle = 'stop'

          if (toggle === 'start') {
            setAlertState({ variant: 'success', message: 'Starting system...Updating system events...' });
          }

          const { toggleData } = await toggleSystem({
            variables: { systemId, toggle },
          });

          if (toggleData) {

            if (toggle === 'start') {
              buttonState[4].title = 'Stop System';
              buttonState[4].class = 'btn btn-sm btn-danger me3';
              buttonState[2].state = 'disabled';
            } else {
              buttonState[4].title = 'Start System';
              buttonState[4].class = 'btn btn-sm btn-success me3';
              buttonState[2].state = 'enabled';
            }
            setAlertState({ show: false });
            setBtnState(buttonState);

          }

          break;

        case 'reset':

          const { resetData } = await resetSystem({
            variables: { systemId },
          });

          if (dataR) {

            setAlertState({ variant: 'success', message: 'The stats have been reset for this system.' })

          }

          break;

        default:
          break;
      }


    } catch (e) {
      console.error(e);
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
          {'System: ' + systemData.systemId + " - " + systemState.title}
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
