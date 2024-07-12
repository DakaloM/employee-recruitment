import { faker } from '@erecruitment/testkit';
import { Address, AddressType } from '~/address/address';

import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';
import { TypeIdentifier } from '~/type';
import { createAddress } from '../createAddress';

describe('address/mutation/createAddress', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;

  beforeAll(async () => {
    env = await createEnv();
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
    const input = {

      userId : user.id,
      id : faker.string.uuid(),
      addressType : faker.helpers.enumValue(AddressType),
      streetAddress : faker.location.streetAddress(),
      country : faker.location.country(),
      city : faker.location.city(),
      region : faker.location.city(),
      postalCode : faker.location.zipCode(),
      contactAddress : true || false,
    }

    const response = await createAddress(input, ctx)

    const address = await Address.query(ctx.db).findById(response.id).withGraphFetched('user')
    expect(address).toBeDefined();
    expect(address?.userId).toEqual(user.id);
    expect(address?.user.id).toEqual(user.id);
    expect(address?.id).toEqual(input.id)
  });
});
