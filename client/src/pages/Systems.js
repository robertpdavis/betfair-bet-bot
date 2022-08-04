import React, { useState } from 'react';
import Auth from '../utils/auth';
import SystemTable from '../components/SystemTable';
import ButtonToolbar from '../components/ButtonToolbar';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { QUERY_SYSTEMS } from '../utils/queries';
import { CREATE_SYSTEM } from '../utils/mutations';
import Alert from '../components/Alert';
import '../App.css';

const Systems = () => {

  let userId = '';
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
  }

  const { loading, data } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId },
    });

  const systemData = data?.systems || {};

  //Inital button toolbar settings
  const buttonSettings =
    [
      {
        name: 'new',
        title: 'New System',
        class: 'btn btn-sm btn-success me-3'
      }
    ]

  //State to control button toolbar
  const [buttonState, setBtnState] = useState(buttonSettings);
  //State to control the alert banner
  const [alertState, setAlertState] = useState({ show: false });

  //New system mutation
  const [createSystem, { error: errorC, data: dataC }] = useMutation(CREATE_SYSTEM);

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };

  //Button functions
  const handleBtnClick = async (event) => {

    const { name } = event.target;

    //Create new system mutation
    if (name === 'new') {

      setAlertState({ variant: 'success', message: 'Creating new system.....' });

      const { systemData } = await createSystem({
        variables: { userId, data },
      });

    }

    console.log(name)
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
