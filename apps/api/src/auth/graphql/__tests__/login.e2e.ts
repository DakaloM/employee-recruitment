import { faker } from '@erecruitment/testkit';
import { Client } from '~/auth/client';
import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';
import { gql, request } from '~/test/graphql';

import { Tokens } from '../tokens';

describe('auth/graphql/login', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;
  let client: Client;

  const query = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
        refreshToken
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
    const secret = faker.string.alphanumeric(32);
    client = await factory.insert('client', { secret });

  });

  afterEach(async () => {
    await destroyContext(ctx);
  });

  it('should login user', async () => {
    const password = faker.internet.password();
    const user = await factory.insert('user', { password});

    console.log(ctx.auth)

    ctx.auth.update(user);

    console.log(ctx.auth);
    
    const { data } = await request<Response>(env)
      .withContext(ctx)
      .query(query, {
        email: user.email,
        password,
      })
      
    console.log(data)

    expect(data?.login).toBeDefined();
    expect(data?.login.accessToken).toBeDefined();
  });

  it('should throw error when user does not exist', async () => {
    const user = await factory.insert('user');

    ctx.auth.update(user);
    const { errors } = await request<Response>(env).withContext(ctx).query(query, {
      email: user.email,
      password: faker.internet.password(),
    });

    expect(errors).toMatchSnapshot();
  });
});

type Response = {
  login: Tokens;
};
