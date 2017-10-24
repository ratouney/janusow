import React from 'react';
import DashboardLayout from '../../modules/DashboardLayout';
import AccountDisplay from '../../modules/AccountPage/';

const AccountPage = (props) => {
  const {
    match,
    location,
  } = props;

  console.log('Props in page : ', props);

  return (
    <DashboardLayout>
      <AccountDisplay id={`${match.params.id}${location.hash}`} />
    </DashboardLayout>
  );
};

export default AccountPage;
