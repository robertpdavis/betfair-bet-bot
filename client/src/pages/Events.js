import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import MarketItem from '../components/MarketItem';
// import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_SYSTEMS } from '../utils/queries';

function Events() {

  return (
    <main>
      {Auth.loggedIn()}
      <div className="flex-row justify-center">
        Events
      </div>
    </main>
  )

}

export default Events;
