// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {},): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { params, data } = context
    const { user } = params
    if (user) {
      data.user = user.id
    } else {
      throw new NotAuthenticated()
    }
    return context;
  };
};
