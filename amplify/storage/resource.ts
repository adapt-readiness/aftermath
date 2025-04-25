import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  access: (allow) => ({
    'media/*': [allow.authenticated.to(['read', 'write', 'delete'])],
    'media/profile-pictures/*': [allow.guest.to(['read'])],
    'media/albums/*': [allow.authenticated.to(['read'])],
    'other/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write'])
    ]
  })
});