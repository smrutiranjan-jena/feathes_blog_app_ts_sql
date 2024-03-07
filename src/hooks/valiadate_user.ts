// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context
    const { username, email, password } = data
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!username) {
      throw new BadRequest('username required')
    }
    if (!email) {
      throw new BadRequest('email is required')
    }
    if (!password) {
      throw new BadRequest('password is required')
    }
    if(!emailRegex.test(email)){
      throw new BadRequest('invalid email')
    }
    return context;
  };
};
