import { User } from "~/account";
import { Address } from "~/address/address";
import { Context } from "~/context";
import { createContext, destroyContext } from "~/test/context";
import { Environment, createEnv, destroyEnv } from "~/test/environment";
import { Factory, createFactory } from "~/test/factory";
import { getAddressById } from "../getSingleAddress";
import { getAddressByUserId } from "../getUserAddresses";

describe('address/queries/getUserAddresses', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;
  let address: Address;
  let user: User;

  beforeAll(async () => {
    env = await createEnv();
  });

  afterAll(async () => {
    await destroyEnv(env);
  });

  beforeEach(async () => {
    ctx = await createContext(env);
    factory = createFactory(ctx);
    user = await factory.insert('user');

  });

  afterEach(async () => {
    await destroyContext(ctx);
  });

  it('should return addresses', async() => {
    const permanentAddress = await factory.insert('address', {userId: user.id});
    const temporalAddress = await factory.insert('address', {userId: user.id})

    const result = await getAddressByUserId(user.id, ctx);
    expect(result[0].userId || result[1].userId).toEqual(user.id);
  })
})