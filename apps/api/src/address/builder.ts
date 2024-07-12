
import { createBuilder } from '@erecruitment/datakit';
import { faker } from '@erecruitment/testkit';

import * as argon from 'argon2';
import { Gender, Race,UserRole, Title, User, UserStatus } from '~/account/user';
import { Context } from '~/context';
import { Address } from './address';
import { AddressType } from './address';




const getUserId = async (ctx: Context, attrs: Partial<Address>) => {
  const userId = attrs.userId;
  const name = faker.person.firstName();
  const surname = faker.person.lastName();
  const role = UserRole.Admin;
  const race = Race.African;
  const birthDate =  faker.date.past({
    refDate: new Date(),
    years: 20,
  });
  const email = faker.internet.email();
  const gender = Gender.Female;
  const idNumber = faker.string.numeric(13)
  const sortName = `${name}${surname}`.toLowerCase();
  const title = Title.Mrs;

  return (
    userId ||
    (
      await User.query(ctx.db).insert({
        name,
        surname,
        role,
        race,
        birthDate,
        email,
        gender,
        idNumber,
        sortName,
        title,
        
      })
    ).id
  );
};


export const addressBuilder = createBuilder(async ({...attrs}: Partial<Address>, _factory, ctx) => {
  const userId = await getUserId(ctx as Context, attrs) || attrs.userId;
  const id = faker.string.uuid();
  const addressType = faker.helpers.enumValue(AddressType);
  const streetAddress = faker.location.streetAddress();
  const country = faker.location.country();
  const city = faker.location.city();
  const region = faker.location.city();
  const postalCode = faker.location.zipCode();
  const contactAddress = true || false;

  return Address.fromJson({
    id,
    addressType,
    streetAddress,
    country,
    city,
    region,
    postalCode,
    contactAddress,
    userId,
    ...attrs
  })
})