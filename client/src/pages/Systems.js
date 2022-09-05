import React, { useState } from 'react';
import Auth from '../utils/auth';
import SystemTable from '../components/SystemTable';
import ButtonToolbar from '../components/ButtonToolbar';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';
import { CREATE_SYSTEM, COPY_SYSTEM, TOGGLE_ARCHIVE_SYSTEM } from '../utils/mutations';
import Alert from '../components/Alert';
import '../App.css';

const Systems = () => {

  let navigate = useNavigate();

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  //State to hold showarchived state
  const [showArchived, setShowArchived] = useState(false);

  const { loading, data } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId, showArchived },
      pollInterval: 5000,
    });

  const systemData = data?.systems || {};

  //Inital button toolbar settings
  const buttonSettings =
    [
      {
        name: 'new',
        title: 'New System',
        class: 'btn btn-sm btn-success'
      },
      {
        name: 'copy',
        title: 'Copy System',
        class: 'btn btn-sm btn-primary'
      },
      {
        name: 'archive',
        title: 'Archive System',
        class: 'btn btn-sm btn-secondary'
      }
    ]

  //State to control button toolbar
  const [buttonState, setBtnState] = useState(buttonSettings);
  //State to control the alert banner
  const [alertState, setAlertState] = useState({ show: false });
  //State to hold table component selected row
  const [systemSelection, setSelection] = useState('');

  //New system mutation
  const [createSystem, { error: errorN, data: dataN }] = useMutation(CREATE_SYSTEM,
    {
      refetchQueries: [
        'getSystems'
      ],
    });

  //Copy system mutation
  const [copySystem, { error: errorC, data: dataC }] = useMutation(COPY_SYSTEM,
    {
      refetchQueries: [
        'getSystems'
      ],
    });

  //Archive system mutation
  const [archiveSystem, { error: errorA, data: dataA }] = useMutation(TOGGLE_ARCHIVE_SYSTEM,
    {
      refetchQueries: [
        'getSystems'
      ],
    });

  if (!Auth.loggedIn()) { navigate("login") };

  //Handle mutations
  const handleBtnClick = async (event) => {
    event.preventDefault();
    const action = event.target.name;

    try {
      let systemId = '';
      let response = '';
      switch (action) {
        //Create new system mutation
        case 'new':
          response = await createSystem({
            variables: { userId },
          });

          if (response.data.createSystem.status === true) {
            setAlertState({ variant: 'success', message: 'System created.' });
          } else {
            setAlertState({ variant: 'danger', message: 'System create failed.' });
          }

          break;

        //Copy system mutation
        case 'copy':

          //Check if only 1 item has been selected
          if (systemSelection.length > 1) {
            setAlertState({ variant: 'danger', message: 'Select only 1 item from the list' });
            return
          }

          //Get the system Id to copy
          if (systemSelection.length > 0) {
            systemId = systemSelection[0].original._id;
          }

          if (systemId === '') {
            setAlertState({ variant: 'danger', message: 'Select a system to copy from.' });
            return
          }

          response = await copySystem({
            variables: { userId, systemId },
          });

          if (response.data.copySystem.status === true) {
            setAlertState({ variant: 'success', message: 'System copied.' });
          } else {
            setAlertState({ variant: 'danger', message: 'System copy failed.' });
          }

          break;

        //Archive system mutation
        case 'archive':

          //Check if only 1 item has been selected
          if (systemSelection.length > 1) {
            setAlertState({ variant: 'danger', message: 'Select only 1 item from the list' });
            return
          }

          //Get the system Id to copy
          let systemId = '';
          if (systemSelection.length > 0) {
            systemId = systemSelection[0].original._id;
          }

          if (systemId === '') {
            setAlertState({ variant: 'danger', message: 'Select a system to archive.' });
            return
          }

          const toggle = 'archive';

          response = await archiveSystem({
            variables: { userId, systemId, toggle },
          });

          if (response.data.archiveSystem.status === true) {
            setAlertState({ variant: 'success', message: response.data.archiveSystem.msg });
          } else {
            setAlertState({ variant: 'danger', message: response.data.archiveSystem.msg });
          }

          break;
        default:
          break;
      }

    } catch (e) {
      throw (e);
    }

  }

  const handleArchiveClick = async (event) => {
    event.preventDefault();
    let { checked } = event.target;
    setShowArchived(checked);
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
          Betting Systems
        </div>
        <div className="row">
          <Alert alertState={alertState} handleAlertClick={handleAlertClick} />
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <ButtonToolbar buttonState={buttonState} handleBtnClick={handleBtnClick} />
          </div>
          <div className="col-12 col-lg-6">
            <form>
              <label className="form-label" id="showarchive-lbl" htmlFor="showarchive" title="Show archived systems">Show archived systems</label>
              <input className="form-check-input ms-3" type="checkbox" name="showarchive" id="showarchive" defaultChecked={showArchived === true ? true : false} onChange={handleArchiveClick} />
            </form>
          </div>
        </div>
        <div className="row">
          {systemData.length > 0 ?
            <SystemTable systemData={systemData} setSelection={setSelection} />
            :
            <div>
              <h4>You currently have no betting systems set up.</h4>
            </div>
          }
        </div>
      </section>
    </main>
  );
};

export default Systems;
