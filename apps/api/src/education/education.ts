import { BaseModel } from '@erecruitment/datakit';

import { User } from '~/account';
import { TypeIdentifier } from '~/type';

export enum EducationLevel {
  HighSchool = 'HighSchool',
  UnderGraduate = 'UnderGraduate',
  PostGraduate = 'PostGraduate',
}

export enum FinalGrade {
  Diploma = 'Diploma',
  BachelorDegree = 'BachelorDegree',
  MastersDegree = 'MastersDegree',
  Doctorate = 'Doctorate',
  Certificate = 'Certificate',
}

export enum Region {
  EasternCape = 'EasternCape',
  Gauteng = 'Gauteng',
  Limpopo = 'Limpopo',
  FreeState = 'FreeState',
  KwaZuluNatal = 'KwaZuluNatal',
  Mpumalanga = 'Mpumalanga',
  NorthernCape = 'NorthernCape',
  NorthWes = 'NorthWes',
  WesternCape = 'WesternCape',
  International = 'International',
}

export class Education extends BaseModel {
  static tableName = 'education';
  static typeIdentifier = TypeIdentifier.Education;

  id: string;
  userId: string;
  institution: string;
  startDate: Date;
  endDate: Date;
  country: string;
  region: Region;
  location: string;
  educationLevel: EducationLevel;
  finalGrade: FinalGrade;
  createdAt: Date;
  user: User;

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: User,
        join: {
          from: 'education.userId',
          to: 'user.id',
        },
      },
    };
  }
}
