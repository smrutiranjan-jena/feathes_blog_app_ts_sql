// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { LikeTableDbOperations } from '../db_services/like/utils/likeTableDbOperation';
import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Like_Status } from '../db_services/like/interfaces/likeInterfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { params, data } = context
    const { user } = params
    const { post } = data
    if (!post) {
      throw new BadRequest('post is required')
    }
    // check the same user on the same post already liked or not
    if (user) {
      await LikeTableDbOperations.getDataWithPagination({
        dbQuery: {
          user: user.id,
          post: post,
          status: Like_Status.ACTIVE
        }
      }).then((res) => {
        if (res.total) {
          throw new BadRequest('you have already liked the post')
        }
      })
    } else {
      throw new NotAuthenticated()
    }

    return context;
  };
};
