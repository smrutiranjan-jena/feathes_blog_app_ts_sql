import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import setPropUser from '../../hooks/setPropUser';
import checkPostOwnerIdentity from '../../hooks/checkPostOwnerIdentity';
import { disallow, discard } from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [setPropUser()],
    update: [],
    patch: [checkPostOwnerIdentity(), discard('likeCount', 'user')],
    remove: [checkPostOwnerIdentity()]
  },

  after: {
    all: [],
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
