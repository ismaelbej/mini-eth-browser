import React, { setState, useEffect, useState } from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import AccountComponent from '../components/Account';
import {
  getAccountInfo,
} from '../lib/api';


const AccountInfo = ({ account }) => (
  <AccountComponent
    address={account ? account.address : '0x'}
    balance={account ? account.balance : 0}
    transactionCount={account ? account.transactionCount : 0}
    isContract={account ? account.isContract : false}
  />
);


function Account() {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ account, setAccount ] = useState(null);

  const { address } = useParams();

  useEffect(() => {
    async function fetchData(address) {
      try {
        const { account } = await getAccountInfo(address);
        setAccount(account);
        setLoading(false);
      } catch (ex) {
        setLoading(false);
        setError(ex);
      }
    }

    fetchData(address);
  }, [ address ]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Account</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <AccountInfo account={account} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Account;
