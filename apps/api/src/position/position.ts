import { BaseModel } from "@erecruitment/datakit";
import { TypeIdentifier } from "~/type";
 

 export class Position extends BaseModel {

  static tableName = 'position';
  static typeIdentifier = TypeIdentifier.Position

  id: string;
  positionTitle: string;
  location: string;
  qualifications: string[];
  manager: JSON;
  
 }