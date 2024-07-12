import { faker } from '@erecruitment/testkit';

import { Address, AddressType } from '~/address/address';
import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';
import { gql, request } from '~/test/graphql';
import { UpdateAddressInput } from '@erecruitment/client';

describe('address/mutation/createAddress', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;

  const query = gql`

    fragment Address on Address {
      id
      userId
      addressType
      streetAddress
      country
      city
      region
      postalCode
      contactAddress
    }

    mutation UpdateAddress($input: UpdateAddressInput!) {
      updateAddress(input: $input) {
        ...Address
      }
    }
  `;

  beforeAll(async () => {
    env = await createEnv({ server: true, db: true, cache: true });
  });

  afterAll(async () => {
    await destroyEnv(env);
  });

  beforeEach(async () => {
    ctx = await createContext(env);
    factory = createFactory(ctx);
    await factory.seed('types');
    ctx.auth.update(await factory.insert('user'));
  });

  afterEach(async () => {
    await destroyContext(ctx);
  });

  it('should update an address', async () => {

    const user = await factory.insert('user');
    const address = await factory.insert('address', {userId: user.id});

    const input: UpdateAddressInput = {
      id: address.id,
      addressType: faker.helpers.enumValue(AddressType),
      streetAddress: faker.location.streetAddress(),
      country: faker.location.country(),
      city: faker.location.city(),
      region: faker.location.city(),
      postalCode: '0995',
      contactAddress: true || false,
    };

    const response = await request<Response>(env).withContext(ctx).query(query, {input});
    expect(response.errors).toBeUndefined();
    expect(response.data?.updateAddress).toBeDefined();
    expect(response.data?.updateAddress.postalCode).toEqual('0995')

  });

  it('should return error if address does not exist', async () => {

    const user = await factory.insert('user');
   

    const input: UpdateAddressInput = {
      id: faker.string.uuid(),
      addressType: faker.helpers.enumValue(AddressType),
      
    };

    const response = await request<Response>(env).withContext(ctx).query(query, {input});
    expect(response.errors).toBeDefined();
   

  });
});

type Response = {
  updateAddress: Address;
};
