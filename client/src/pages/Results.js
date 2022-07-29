import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import ResultItem from '../components/ResultItem';
// import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_RESULTS } from '../utils/queries';

function Results() {

  return (
    <main>
      {Auth.loggedIn()}
      <div className="flex-row justify-center">
        Results
      </div>
    </main>
  )

}

export default Results;
