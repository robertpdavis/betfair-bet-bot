import React, { useState } from 'react';
import Auth from '../utils/auth';
import SystemTable from '../components/SystemTable';
import ButtonToolbar from '../components/ButtonToolbar';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';
import { CREATE_SYSTEM, COPY_SYSTEM, ARCHIVE_SYSTEM } from '../utils/mutations';
import Alert from '../components/Alert';
import '../App.css';

const Systems = () => {

  let navigate = useNavigate();

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  const { loading, data } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
      pollInterval: 5000,
    });

  const systemData = data?.systems || {};

  //Inital button toolbar settings
  const buttonSettings =
    [
      {
        name: 'new',
        title: 'New System',
        class: 'btn btn-sm btn-success me-3'
      },
      {
        name: 'copy',
        title: 'Copy System',
        class: 'btn btn-sm btn-primary me-3'
      },
      {
        name: 'archive',
        title: 'Archive System',
        class: 'btn btn-sm btn-secondary me-3'
      }
    ]

  //State to control button toolbar
  const [buttonState, setBtnState] = useState(buttonSettings);
  //State to control the alert banner
  const [alertState, setAlertState] = useState({ show: false });

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
  const [archiveSystem, { error: errorA, data: dataA }] = useMutation(ARCHIVE_SYSTEM,
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

          //Get the system Id to copy
          const systemId = "62eb347990124e7362af8001";

          console.log('here')

          response = await copySystem({
            variables: { userId, systemId },
          });

          if (response.data.copySystem.status === true) {
            setAlertState({ variant: 'success', message: 'System copied.' });
          } else {
            setAlertState({ variant: 'danger', message: 'System copy failed.' });
          }

          break;

        default:
          break;
      }

    } catch (e) {
      throw (e);
    }

  }


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
          <div className="col-6">
            <ButtonToolbar buttonState={buttonState} handleBtnClick={handleBtnClick} />
          </div>
        </div>
        <div className="row">
          {systemData.length > 0 ?
            <SystemTable systemData={systemData} />
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
