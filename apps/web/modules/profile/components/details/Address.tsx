import React from 'react';

export const Address = (props: AddressProps) => {
  const {address} = props;
  
  console.log(address);

  return <div>Address</div>;
};

type AddressProps = {
  address: {
    id: string;
    addressType: string;
    streetAddress: string;
    country: string;
    city: string;
    region: string;
    postalCode: string;
    contactAddress: boolean;
  };
};
