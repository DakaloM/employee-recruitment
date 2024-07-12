import {
  ProfileDocument,
  ApplicantDocument,
  UserFragment,
  LoginDocument,
  MutationLoginArgs,
  TokensFragment,
  MutationForgotPasswordArgs,
  ForgotPasswordDocument,
  MutationRecoverPasswordArgs,
  RecoverPasswordDocument,
  QueryUsersArgs,
  UsersDocument,
  UsersPayloadFragment,
  QueryRequisitionArgs,
  RequisitionsDocument,
  RequisitionFilter,
  RequisitionDocument,
  QueryUserArgs,
  UserDocument,
  FullUserFragment,
  QueryApplicantArgs,
  FullApplicantFragment,
  QueryApplicantsArgs,
  ApplicantsDocument,
  QueryEducationArgs,
  EducationDocument,
  EducationFragment,
  CreateEducationInput,
  CreateEducationDocument,
  CreateRequisitionDocument,
  CreateRequisitionInput,
  UpdateRequisitionInput,
  UpdateRequisitionDocument,
  UpdateRequisitionStatusInput,
  UpdateRequisitionStatusDocument,
  UpdateEducationInput,
  UpdateEducationDocument,
  MutationDeleteEducationArgs,
  DeleteEducationDocument,
  CreateExperienceInput,
  CreateExperienceDocument,
  UpdateExperienceInput,
  UpdateExperienceDocument,
  CreateContactInput,
  CreateContactDocument,
  UpdateContactInput,
  UpdateContactDocument,
  ApplicationsDocument,
  ApplicationFilter,
  QueryApplicationArgs,
  ApplicationDocument,
  FullApplicationFragment,
  ApplicationFragment,
  UpdateApplicationStatusInput,
  UpdateApplicationStatusDocument,
  RequisitionFragment,
  AdvertFilter,
  AdvertsDocument,
  QueryAdvertArgs,
  AdvertDocument,
  FullAdvertFragment,
  UpdateAdvertStatusInput,
  UpdateAdvertStatusDocument,
  CreateUserInput,
  CreateUserDocument,
  ApplicantFragment,
  UserApplicantDocument,
  UpdateUserInput,
  UpdateUserDocument,
  CreateAddressInput,
  CreateAddressDocument,
  AddressFragment,
  UpdateAddressInput,
  UpdateAddressDocument,
  UploadAttachmentInput,
  UploadAttachmentDocument,
  UploadAttachmentFragment,
  DeleteAttachmentDocument,
  UpdateAttachmentInput,
  UpdateAttachmentDocument,
  FullAttachmentFragment,
  CreateApplicationInput,
  CreateApplicationDocument,
  CreateQuestionInput,
  CreateQuestionDocument,
  DeleteQuestionDocument,
  PositionsDocument,
  PositionFragment,
  PartialAdvertFragment,
  FullRequisitionFragment,
  AnswersQueryVariables,
  AnswersDocument,
  AnswerFragment,
  InterviewsDocument,
  InterviewFragment,
  InterviewDocument,
  CreateInterviewInput,
  CreateInterviewDocument,
  ShortlistsDocument,
  ShortlistFragment,
  ShortlistDocument,
  CreateShortlistInput,
  CreateShortlistDocument,
  ReScheduleInterviewInput,
  ReScheduleInterviewDocument,
  UpdateInterviewStatusInput,
  UpdateInterviewStatusDocument,
  NotificationFilter,
  NotificationsDocument,
  NotificationFragment,
  ReadAllNotificationsInput,
  ReadAllNotificationsDocument,
  DeleteAllNotificationsDocument,
  UpdateNotificationStatusDocument,
  UpdateNotificationStatusInput,
  UpdateQuestionInput,
  UpdateQuestionDocument,
  InterviewPackageDocument,
  FullInterViewPackageFragment,
  CreateInterviewPackageInput,
  CreateInterviewPackageDocument,
  UpdateInterviewPackageInput,
  UpdateInterviewPackageDocument,
  DeleteAdvertDocument,
  InterviewFilter,
  ShortlistFilter,
  AdvertFragment,
} from '@gen/graphql';

import { GraphQLClient } from 'graphql-request';
import { cookies as nextCookies } from 'next/headers';
import { redirect } from 'next/navigation';

export class ApiClient {
  public baseURL: string;
  private readonly clientId: string;
  private readonly secret: string;
  constructor(
    options: Options,
    private readonly cookies: typeof nextCookies,
  ) {
    Object.assign(this, options);
  }

  private getClient(token: string) {
    return new GraphQLClient(`${this.baseURL}/graphql`, {
      headers: {
        authorization: token,
      },
    });
  }

  private get basicClient() {
    const token = Buffer.from(`${this.clientId}:${this.secret}`).toString('base64');

    const header = `Basic ${token}`;

    return this.getClient(header);
  }

  private get authClient() {
    const token = this.cookies().get('token');

    if (!token) {
      redirect('/');
    }

    const header = `Bearer ${token.value}`;

    return this.getClient(header);
  }

  private setAuthCookies(tokens: TokensFragment) {
    const { accessToken, expiresAt, refreshToken } = tokens;

    this.cookies().set('token', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: parseInt(expiresAt, 10),
    });

    this.cookies().set('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  // async register(input: MutationUserRegisterArgs) {
  //   const data = await this.basicClient.request(UserRegisterDocument, input);

  //   return data.userRegister as UserFragment;
  // }

  async login(input: MutationLoginArgs) {
    const data = await this.basicClient.request(LoginDocument, input);

    this.setAuthCookies(data.login as TokensFragment);

    return data.login;
  }

  async profile() {
    const data = await this.authClient.request(ProfileDocument);

    return data.me as UserFragment;
  }

  async forgotPassword(input: MutationForgotPasswordArgs) {
    const data = await this.basicClient.request(ForgotPasswordDocument, input);

    return data.forgotPassword;
  }

  async recoverPassword(input: MutationRecoverPasswordArgs) {
    const data = await this.basicClient.request(RecoverPasswordDocument, input);

    this.setAuthCookies(data.recoverPassword);

    return data.recoverPassword;
  }

  async users(input: QueryUsersArgs) {
    const data = await this.authClient.request(UsersDocument, input);

    return data.users as UsersPayloadFragment;
  }

  async user(input: QueryUserArgs) {
    const data = await this.authClient.request(UserDocument, input);

    return data.user as FullUserFragment;
  }

  async createUser(input: CreateUserInput) {
    const data = await this.authClient.request(CreateUserDocument, { input });

    return data.createUser;
  }

  async updateUser(input: UpdateUserInput) {
    const data = await this.authClient.request(UpdateUserDocument, { input });

    return data.updateUser as UserFragment;
  }

  async applicant(input: QueryApplicantArgs) {
    const data = await this.authClient.request(ApplicantDocument, input);

    return data.applicant as FullApplicantFragment;
  }

  async userApplicant(userId: string) {
    const data = await this.authClient.request(UserApplicantDocument, {
      userId,
    });

    return data.applicantByUserId as FullApplicantFragment;
  }

  async applicants(input: QueryApplicantsArgs) {
    const data = await this.authClient.request(ApplicantsDocument, input);

    return data.applicants as ApplicantFragment[];
  }

  async requisitions(input: RequisitionFilter) {
    const data = await this.authClient.request(RequisitionsDocument, { input });

    return data.requisitions as RequisitionFragment[];
  }

  async requisition(input: QueryRequisitionArgs) {
    const data = await this.authClient.request(RequisitionDocument, input);

    return data.requisition as FullRequisitionFragment;
  }

  async createRequisition(input: CreateRequisitionInput) {
    const data = await this.authClient.request(CreateRequisitionDocument, {
      input,
    });

    return data.createRequisition;
  }

  async updateRequisition(input: UpdateRequisitionInput) {
    const data = await this.authClient.request(UpdateRequisitionDocument, {
      input,
    });

    return data.updateRequisition;
  }

  async updateRequisitionStatus(input: UpdateRequisitionStatusInput) {
    const data = await this.authClient.request(UpdateRequisitionStatusDocument, { input });

    return data.updateRequisitionStatus;
  }

  async education(input: QueryEducationArgs) {
    const data = await this.authClient.request(EducationDocument, input);

    return data.education as EducationFragment;
  }

  async createEducation(input: CreateEducationInput) {
    const data = await this.authClient.request(CreateEducationDocument, {
      input,
    });

    return data.createEducation;
  }

  async updateEducation(input: UpdateEducationInput) {
    const data = await this.authClient.request(UpdateEducationDocument, {
      input,
    });

    return data.updateEducation;
  }

  async deleteEducation(input: MutationDeleteEducationArgs) {
    const data = await this.authClient.request(DeleteEducationDocument, input);

    return data.deleteEducation;
  }

  async createExperience(input: CreateExperienceInput) {
    const data = await this.authClient.request(CreateExperienceDocument, {
      input,
    });

    return data.createExperience;
  }

  async updateExperience(input: UpdateExperienceInput) {
    const data = await this.authClient.request(UpdateExperienceDocument, {
      input,
    });

    return data.updateExperience;
  }

  async createContact(input: CreateContactInput) {
    const data = await this.authClient.request(CreateContactDocument, {
      input,
    });

    return data.createContact;
  }

  async updateContact(input: UpdateContactInput) {
    const data = await this.authClient.request(UpdateContactDocument, {
      input,
    });

    return data.updateContact;
  }

  async createApplication(input: CreateApplicationInput) {
    const data = await this.authClient.request(CreateApplicationDocument, {
      input,
    });

    return data.createApplication;
  }

  async applications(input: ApplicationFilter) {
    const data = await this.authClient.request(ApplicationsDocument, { input });

    return data.applications as ApplicationFragment[];
  }

  async application(input: QueryApplicationArgs) {
    const data = await this.authClient.request(ApplicationDocument, input);

    return data.application as FullApplicationFragment;
  }

  async updateApplicationStatus(input: UpdateApplicationStatusInput) {
    const data = await this.authClient.request(UpdateApplicationStatusDocument, { input });

    return data.updateApplicationStatus;
  }

  async adverts(input: AdvertFilter) {
    const data = await this.basicClient.request(AdvertsDocument, { input });

    return data.adverts as PartialAdvertFragment[];
  }

  async advert(input: QueryAdvertArgs) {
    const data = await this.authClient.request(AdvertDocument, input);

    return data.advert as FullAdvertFragment;
  }

  async deleteAdvert(id: string) {
    const data = await this.authClient.request(DeleteAdvertDocument, {id})

    return data.deleteAdvert;
  }

  async updateAdvertStatus(input: UpdateAdvertStatusInput) {
    const data = await this.authClient.request(UpdateAdvertStatusDocument, {
      input,
    });

    return data.updateAdvertStatus;
  }

  async createAddress(input: CreateAddressInput) {
    const data = await this.authClient.request(CreateAddressDocument, {
      input,
    });

    return data.createAddress as AddressFragment;
  }

  async updateAddress(input: UpdateAddressInput) {
    const data = await this.authClient.request(UpdateAddressDocument, {
      input,
    });

    return data.updateAddress;
  }

  async uploadAttachment(input: UploadAttachmentInput) {
    const data = await this.authClient.request(UploadAttachmentDocument, {
      input,
    });

    return data.uploadAttachment as UploadAttachmentFragment;
  }

  async deleteAttachment(id: string) {
    const data = await this.authClient.request(DeleteAttachmentDocument, {
      id,
    });

    return data.deleteAttachment;
  }

  async updateAttachment(input: UpdateAttachmentInput) {
    const data = await this.authClient.request(UpdateAttachmentDocument, {
      input,
    });

    return data.updateAttachment as FullAttachmentFragment;
  }

  async createQuestion(input: CreateQuestionInput) {
    const data = await this.authClient.request(CreateQuestionDocument, {
      input,
    });

    return data.createJobQuestion;
  }

  async updateJobQuestion(input: UpdateQuestionInput) {
    const data = await this.authClient.request(UpdateQuestionDocument, { input });

    return data.updateJobQuestion;
  }

  async deleteJobQuestion(id: string) {
    const data = await this.authClient.request(DeleteQuestionDocument, { id });

    return data.deleteQuestion;
  }

  async positions() {
    const data = await this.authClient.request(PositionsDocument);

    return data.positions as PositionFragment[];
  }

  async answers(input: AnswersQueryVariables) {
    const data = await this.basicClient.request(AnswersDocument, input);

    return data.answers as AnswerFragment[];
  }

  async interviews(input: InterviewFilter) {
    const data = await this.authClient.request(InterviewsDocument, { input });

    return data.interviews as InterviewFragment[];
  }

  async interview(id: string) {
    const data = await this.authClient.request(InterviewDocument, { id });

    return data.interview as InterviewFragment;
  }

  async reScheduleInterview(input: ReScheduleInterviewInput) {
    const data = await this.authClient.request(ReScheduleInterviewDocument, {
      input,
    });

    return data.reScheduleInterview;
  }

  async updateInterviewStatus(input: UpdateInterviewStatusInput) {
    const data = await this.authClient.request(UpdateInterviewStatusDocument, {
      input,
    });

    return data.updateInterviewStatus;
  }

  async createInterview(input: CreateInterviewInput) {
    const data = await this.authClient.request(CreateInterviewDocument, {
      input,
    });

    return data.createInterview;
  }

  async shortlists(input: ShortlistFilter) {
    const data = await this.authClient.request(ShortlistsDocument, { input });

    return data.shortlists as ShortlistFragment[];
  }

  async shortlist(id: string) {
    const data = await this.authClient.request(ShortlistDocument, { id });

    return data.shortlist as ShortlistFragment;
  }

  async createShortlist(input: CreateShortlistInput) {
    const data = await this.authClient.request(CreateShortlistDocument, {
      input,
    });

    return data.createShortlist;
  }

  async notifications(input: NotificationFilter) {
    const data = await this.authClient.request(NotificationsDocument, {
      input,
    });

    return data.notifications as NotificationFragment[];
  }

  async updateNotificationStatus(input: UpdateNotificationStatusInput) {
    const data = await this.authClient.request(UpdateNotificationStatusDocument, { input });

    return data.updateNotificationStatus;
  }

  async readAllNotifications(input: ReadAllNotificationsInput) {
    const data = await this.authClient.request(ReadAllNotificationsDocument, {
      input,
    });

    return data.readAllNotifications;
  }

  async deleteAllNotifications(input: ReadAllNotificationsInput) {
    const data = await this.authClient.request(DeleteAllNotificationsDocument, {
      input,
    });

    return data.deleteAllNotifications;
  }

  async interviewPackage(jobId: string) {
    const data = await this.authClient.request(InterviewPackageDocument, { jobId });

    return data.interviewPackage as FullInterViewPackageFragment;
  }

  async createInterviewPackage(input: CreateInterviewPackageInput) {
    const data = await this.authClient.request(CreateInterviewPackageDocument, {input});

    return data.createInterviewPackage;
  }

  async updateInterviewPackage(input: UpdateInterviewPackageInput) {
    const data = await this.authClient.request(UpdateInterviewPackageDocument, {input});

    return data.updateInterviewPackage;
  }
}

export interface Options {
  baseURL: string;
  clientId: string;
  secret: string;
}
