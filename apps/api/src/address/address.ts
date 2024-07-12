import { BaseModel } from "@erecruitment/datakit";
import { User } from "~/account";
import { TypeIdentifier } from "~/type";

export enum AddressType {
  Temporal = 'Temporal',
  Permanent = 'Permanent'
}


export class Address extends BaseModel {
  static tableName = 'address';
  static typeIdentifier = TypeIdentifier.Address;

  id: string;
  userId: string;
  addressType: AddressType;
  streetAddress: string;
  country: string;
  city: string;
  region: string;
  postalCode: string;
  contactAddress: boolean;
  user: User;

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: User,
        join: {
          from: 'address.userId',
          to: 'user.id',
        },
      },
    }
  }
}