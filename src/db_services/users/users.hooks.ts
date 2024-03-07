import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow, iff, isProvider } from 'feathers-hooks-common';
import { HookContext } from '../../app';
import { authenticate } from '@feathersjs/authentication/lib/hooks';
export default {
  before: {
    all: [
      // iff(isProvider('server')).else(disallow()),
      // async (ctx: HookContext) => {
      //   console.log("context data provider", ctx.params.provider)
      // }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      // protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
