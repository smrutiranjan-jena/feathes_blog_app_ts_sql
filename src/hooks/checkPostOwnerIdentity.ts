// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { PostTableDbOperations } from '../db_services/post/utils/postTableDbOperation';
import { Post_Status } from '../db_services/post/interfaces/postInterfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { id, params } = context
    const { user } = params
    const targetedPostId = Number(id)
    if (user) {
      await PostTableDbOperations.getDetails({
        id: targetedPostId,
        dbQuery: {
          status: Post_Status.ACTIVE
        }
      }).then((res) => {
        if (res.user != user.id) {
          throw new BadRequest("you don't have permisiion to access the perticular route")
        }
      })
    }

    return context;
  };
};
