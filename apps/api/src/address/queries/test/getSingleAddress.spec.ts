import { User } from "~/account";
import { Address } from "~/address/address";
import { Context } from "~/context";
import { createContext, destroyContext } from "~/test/context";
import { Environment, createEnv, destroyEnv } from "~/test/environment";
import { Factory, createFactory } from "~/test/factory";
import { getAddressById } from "../getSingleAddress";

describe('address/queries/getSingleAddress', () => {
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

  it('should return address', async() => {
    const address = await factory.insert('address', {userId: user.id});
    const result = await getAddressById(address.id, ctx);
    expect(result.id).toEqual(address.id);
  })
})