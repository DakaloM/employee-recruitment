import { createEmailClient } from '@erecruitment/emailkit';

import { config } from '~/config';

export const mailer = createEmailClient(config.mail);
