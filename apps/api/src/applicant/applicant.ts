import { TypeIdentifier } from "~/type";
import { BaseModel } from "@erecruitment/datakit";
import Objection from "objection";
import { Knex } from "knex";
import { Address } from "~/address";
import { Experience } from "~/experience";
import { Contact } from "~/contact";
import { Education } from "~/education";
import { Attachment } from "~/documents";
import { User } from "~/account";



export class Applicant extends BaseModel {
  static tableName = 'applicant';
  static typeIdentifier = TypeIdentifier.Applicant;

  id: string;
  userId: string;
  name: string;
  surname: string;
  user: User;
  applicantNumber: string;
  address: Address[];
  experience: Experience[];
  education: Education[];
  contact: Contact;
  attachments: Attachment[];



  static applySearch(query: Objection.QueryBuilder<Applicant, Applicant[]>, db: Knex, text?: string | null){
    if(text) {
      const rank = `ts_rank(search, websearch_to_tsquery('english', ?)) + ts_rank(search, websearch_to_tsquery('simple', ?))`;
      query
        .select(db.raw(`*, ${rank} as rank`, [text, text]))
        .whereRaw(`search @@ websearch_to_tsquery('english', ?)`, text)
        .orWhereRaw(`search @@ websearch_to_tsquery('simple', ?)`, text)
        .andWhereRaw(`${rank} > 0`, [text, text])
        .orderBy('applicant.id', 'desc')
        .orderBy('rank', 'desc');
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: User,
        join: {
          from: 'applicant.userId',
          to: 'user.id',
        },
      },
      contact: {
        relation: BaseModel.HasOneRelation,
        modelClass: Contact,
        join: {
          from: 'applicant.userId',
          to: 'contact.userId',
        },
      },
      address: {
        relation: BaseModel.HasManyRelation,
        modelClass: Address,
        join: {
          from: 'applicant.userId',
          to: 'address.userId',
        },
      },
      experience: {
        relation: BaseModel.HasManyRelation,
        modelClass: Experience,
        join: {
          from: 'applicant.userId',
          to: 'experience.userId',
        },
      },
      education: {
        relation: BaseModel.HasManyRelation,
        modelClass: Education,
        join: {
          from: 'applicant.userId',
          to: 'education.userId',
        },
      },
      attachments: {
        relation: BaseModel.HasManyRelation,
        modelClass: Attachment,
        join: {
          from: 'applicant.id',
          to: 'attachment.refId',
        },
      },

       
     
    };
  }

  
}