import { faker } from '@erecruitment/testkit';

import { Address, AddressType } from '~/address/address';
import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';
import { gql, request } from '~/test/graphql';
import { CreateAddressInput } from '@erecruitment/client';

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

    mutation CreateAddress($input: CreateAddressInput!) {
      createAddress(input: $input) {
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

  it('should create address', async () => {

    const user = await factory.insert('user');
    const input: CreateAddressInput = {
      userId: user.id,
      addressType: faker.helpers.enumValue(AddressType),
      streetAddress: faker.location.streetAddress(),
      country: faker.location.country(),
      city: faker.location.city(),
      region: faker.location.city(),
      postalCode: faker.location.zipCode(),
      contactAddress: true || false,
    };

    const response = await request<Response>(env).withContext(ctx).query(query, {input});
  
    expect(response.errors).toBeUndefined();
    expect(response.data?.createAddress).toBeDefined();
    expect(response.data?.createAddress.userId).toEqual(user.id)

  });
});

type Response = {
  createAddress: Address;
};
