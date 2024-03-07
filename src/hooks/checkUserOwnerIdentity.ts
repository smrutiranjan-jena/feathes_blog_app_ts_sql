// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { UserTableDbOperations } from '../db_services/users/utils/userTableDbOperation';
import { UserTableStatus } from '../db_services/users/interfaces/userTableInterfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { id, params } = context
    const { user } = params
    const targetedUserId = Number(id)
    if (user) {
      await UserTableDbOperations.getDetails({
        id: targetedUserId,
        dbQuery: {
          status: UserTableStatus.ACTIVE
        }
      }).then((res) => {
        if (res.id != user.id) {
          throw new BadRequest("you don't have permisiion to access the perticular route")
        }
      })
    }

    return context;
  };
};
