/* eslint-disable no-restricted-imports */
import { FullApplicantFragment } from "@erecruitment/client";
import { CoverLetter, Personal } from "../components/details";
import { ContactDisplay } from "../../contact";
import { AddressDisplay } from "../../address";
import { EducationsDisplay } from "../../education";
import { ExperienceDisplay } from "../../experience";
import { DocumentsDisplay } from "../../document";

export enum ProfileTab {
  PersonalDetails = "PersonalDetails",
  ContactDetails = "ContactDetails",
  Education = "Education",
  Address = "Address",
  Experience = "Experience",
  Documents = "Documents",
  CoverLetter = "CoverLetter",
}

export const profileTabs: ProfileTabType[] = [
  {
    id: "fce2b33b-6e83-5214-a930-6517214beb9f",
    title: "Personal Details",
    value: ProfileTab.PersonalDetails,
    component: Personal,
  },
  {
    id: "262a428d-81b4-5977-9d5b-e9e09a0ecaa6",
    title: "Contact Details",
    value: ProfileTab.ContactDetails,
    component: ContactDisplay,
  },
  {
    id: "450209fc-7e57-53a6-8e23-847134936ac6",
    title: "Address",
    value: ProfileTab.Address,
    component: AddressDisplay,
  },
  {
    id: "2663c45e-5890-54a1-be09-f146cb59790b",
    title: "Education",
    value: ProfileTab.Education,
    component: EducationsDisplay,
  },
  {
    id: "e2fb5972-7fba-509a-93a5-75535f9f395f",
    title: "Experience",
    value: ProfileTab.Experience,
    component: ExperienceDisplay,
  },
  {
    id: '6c70ebcd-6b51-5671-88e4-723d76c96f83',
    title: 'Documents',
    value: ProfileTab.Documents,
    component: DocumentsDisplay
  },
  // {
  //   id: 'e5a0e0bd-0ff5-598a-b567-094ed020cc6a',
  //   title: 'Cover Letter',
  //   value: ProfileTab.CoverLetter,
  //   component: CoverLetter
  // },
];

export const profileItemCheckList = (profile: FullApplicantFragment) => {
  const genderPresent = profile.user.gender ? true : false;
  const racePresent = profile.user.race ? true : false;
  const titlePresent = profile.user.title ? true : false;
  const birthDatePresent = profile.user.birthDate ? true : false;
  const idNumberPresent = profile.user.idNumber ? true : false;

  const personalDetailsPresent =
    genderPresent && racePresent && titlePresent && birthDatePresent && idNumberPresent;
  const contactPresent = profile.contact? true : false;
  const addressPresent = profile.address[0]?.id ? true : false;
  const educationPresent = profile.education[0]?.id ? true : false;
  const experiencePresent = profile.experience[0]?.id ? true : false;
  const documentsPresent = profile.attachments.length > 0 ? true : false;

  const list: ProfileItemCheckListItemType[] = [
    {
      id: "c0bec8f2-a0b7-5429-ad62-22169f8f3acb",
      title: "Personal details",
      present: personalDetailsPresent,
    },
    {
      id: "30fdec19-a10c-5bed-bec8-25eee412344a",
      title: "Contact details",
      present: contactPresent,
    },
    {
      id: "96994f53-112b-50f7-ac1a-eaa0ea7e8fb7",
      title: "Address",
      present: addressPresent,
    },
    {
      id: "591db42e-389b-5311-b840-fa94cc5faf2c",
      title: "education",
      present: educationPresent,
    },
    {
      id: "cc222a80-9e08-5fec-8af6-534e240e4090",
      title: "Experience",
      present: experiencePresent,
    },
    {
      id: "cc212a80-9e08-5fec-8af6-534e240e4090",
      title: "Documents",
      present: documentsPresent,
    },
  ];

  return list;
};

const profileComplete = (profile: FullApplicantFragment) => {
  const genderPresent = profile.user.gender ? true : false;
  const racePresent = profile.user.gender ? true : false;
  const titlePresent = profile.user.title ? true : false;
  const birthDatePresent = profile.user.birthDate ? true : false;

  const personalDetailsPresent =
    genderPresent && racePresent && titlePresent && birthDatePresent;
  const contactPresent = profile.contact[0]?.id ? true : false;
  const addressPresent = profile.address[0]?.id ? true : false;
  const educationPresent = profile.education[0]?.id ? true : false;
  const experiencePresent = profile.experience[0]?.id ? true : false;

  const check =
    personalDetailsPresent &&
    contactPresent &&
    addressPresent &&
    educationPresent &&
    experiencePresent;

  return check as boolean;
};

export type ProfileItemCheckListItemType = {
  id: string;
  title: string;
  present: boolean;
};

export type ProfileTabType = {
  id: string;
  title: string;
  value: ProfileTab;
  component: React.ElementType;
};
