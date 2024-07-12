import { Gender, Race, Title, UserRole, UserStatus } from "@erecruitment/client";
import { SelectData } from "@erecruitment/ui";

export const genderList: SelectData[] = [
  {
    id: 'b4a5f9e6-0810-5dd3-a8df-5b68bcb25313',
    title: 'Male',
    value: Gender.Male
  },
  {
    id: '955ca747-49d5-5184-88c1-aca149ced074',
    title: 'Female',
    value: Gender.Female
  },
  {
    id: '9d3b20a5-9470-5233-aead-20e1a5766ea2',
    title: 'NonBinary',
    value: Gender.NonBinary
  }
];

export const titleList: SelectData[] = [
  {
    id: 'c8d026df-23b3-5857-af55-c3f641c04ba1',
    title: 'Advocate',
    value: Title.Advocate
  },
  {
    id: '1a719bb5-e7c0-5cf0-a1f5-c87aa114b9d4',
    title: 'Dr',
    value: Title.Dr
  },
  {
    id: '58baea2d-6419-5966-b9e4-6d1e70c179a8',
    title: 'Miss',
    value: Title.Miss
  },
  {
    id: '32866ca9-85ae-50fa-bb4e-13f95bed78eb',
    title: 'Mrs',
    value: Title.Mrs
  },
  {
    id: '782f6657-e3ab-5092-91d1-a236ea444c21',
    title: 'Ms',
    value: Title.Ms
  },
  {
    id: '738997a6-4f73-5794-9386-d0e307974e27',
    title: 'Other',
    value: Title.Other
  },
  {
    id: 'd5b275f6-398a-5830-a3d8-7490f0559b24',
    title: 'Prof',
    value: Title.Prof
  },
  {
    id: '88eafdfd-25d4-5434-9d68-db39325e3d51',
    title: 'Rev',
    value: Title.Rev
  },
  
];

export const raceList: SelectData[] = [
  {
    id: '168599a7-5a37-5dba-82c6-f98db9c442d7',
    title: 'African',
    value: Race.African
  },
  {
    id: '1df2c797-dba0-5c4d-9d7d-b3df1f4a2ac6',
    title: 'Coloured',
    value: Race.Coloured
  },
  {
    id: '2c26e644-152a-520d-8e4d-e591e2a60edb',
    title: 'Indian',
    value: Race.Indian
  },
  {
    id: '0591f705-3697-5608-addd-aae3ecf961d0',
    title: 'Other',
    value: Race.Other
  },

  {
    id: 'aa102049-85b8-56e7-ad41-fa0d525672d6',
    title: 'White',
    value: Race.White
  },
]

export const statusList: SelectData[] = [
  {
    id: '29a010bf-1dcc-56ca-844e-cdb67b2dee6e',
    title: 'Active',
    value: UserStatus.Active
  },
  {
    id: '31433eee-2249-5aae-a442-763fde718403',
    title: 'Active',
    value: UserStatus.Active
  },
  {
    id: 'a083e541-3601-51b7-930c-faefd6a439a4',
    title: 'Deleted',
    value: UserStatus.Deleted
  },
  {
    id: '9527b2ed-011b-5c86-9c3e-ca788cc6b51e',
    title: 'Inactive',
    value: UserStatus.Inactive
  },
  {
    id: '05137965-2073-5862-b0cc-b6ffcb7fe362',
    title: 'NotConfirmed',
    value: UserStatus.NotConfirmed
  },
  {
    id: 'a1eda6cc-7e85-5ac6-b0bc-7cf5fd7ba834',
    title: 'Suspended',
    value: UserStatus.Suspended
  },
]