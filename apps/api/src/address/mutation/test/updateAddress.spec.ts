import { faker } from '@erecruitment/testkit';
import { Address, AddressType } from '~/address/address';

import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';
import { TypeIdentifier } from '~/type';
import { createAddress } from '../createAddress';
import { updateAddress } from '../updateAddress';

describe('address/mutation/updateAddress', () => {
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

  it('should update an address', async () => {
    const user = await factory.insert('user');
    const address = await factory.insert('address', {userId: user.id});

    const update = {

      id : address.id,
      addressType : faker.helpers.enumValue(AddressType),
      streetAddress : faker.location.streetAddress(),
      country : faker.location.country(),
      city : faker.location.city(),
      region : faker.location.city(),
      postalCode : faker.location.zipCode(),
      contactAddress : true || false,
    }

    const response = await updateAddress(update, ctx)
    const updatedAddress = await Address.query(ctx.db).findById(response.id).withGraphFetched('user')

    expect(updatedAddress).toBeDefined();
    expect(updatedAddress?.userId).toEqual(user.id);
    expect(updatedAddress?.user.id).toEqual(user.id);
    expect(updatedAddress?.id).toEqual(update.id)
  });
});
