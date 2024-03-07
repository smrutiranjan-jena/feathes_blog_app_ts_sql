import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import valiadateUser from '../../hooks/valiadate_user';
import checkUserOwnerIdentity from '../../hooks/checkUserOwnerIdentity';
import { discard, keep } from 'feathers-hooks-common';
const { hashPassword, protect } = local.hooks;
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [valiadateUser(), hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt'), checkUserOwnerIdentity(), keep('password')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [protect('password')],
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
