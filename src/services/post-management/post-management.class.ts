import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BadRequest, FeathersError } from '@feathersjs/errors';
import { PostTableDbOperations } from '../../db_services/post/utils/postTableDbOperation';
import {
  PostTable_FIND,
  PostTable_GET,
  PostTable_PATCH,
  PostTable_POST
} from '../../db_services/post/interfaces/postInterfaces'
interface Data {}

interface ServiceOptions {}

export class PostManagement implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Array<PostTable_GET> | PostTable_FIND> {
    if (params) {
      const { query = {} } = params;
      if (params.paginate === false) {
        return await PostTableDbOperations.getDataWithoutPagination({
          dbQuery: query,
          specifiedQuery: query,
        }).catch((e: FeathersError) => {
          throw e;
        });
      } else {
        return await PostTableDbOperations.getDataWithPagination({
          dbQuery: query,
          specifiedQuery: query,
        }).catch((e: FeathersError) => {
          throw e;
        });
      }
    } else {
      throw new BadRequest('Invalid service request operation.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<PostTable_GET> {
    if (params) {
      const { query = {} } = params;
      return await PostTableDbOperations.getDetails({
        id: parseInt(id.toString()),
        dbQuery: query,
        specifiedQuery: query,
      }).catch((e: FeathersError) => {
        throw e;
      });
    } else {
      throw new BadRequest('Invalid service request operation.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<PostTable_GET> {
    if (params) {
      const { query = {} } = params;
      return await PostTableDbOperations.createDatum({
        dbBody: data as PostTable_POST,
        dbQuery: query,
        specifiedQuery: query,
      }).catch((e: FeathersError) => {
        throw e;
      });
    } else {
      throw new BadRequest('Invalid service request operation.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    if (params) {
      const { query = {} } = params;
      if (!id) {
        throw new BadRequest('Invalid operation.');
      }
      return await PostTableDbOperations.modifyDatum({
        id: parseInt(id.toString()),
        dbBody: data as PostTable_PATCH,
        dbQuery: query,
        specifiedQuery: query,
      }).catch((e: FeathersError) => {
        throw e;
      });
    } else {
      throw new BadRequest('Invalid service request operation.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<PostTable_GET> {
    if (id) {
      return await PostTableDbOperations.deleteDatum({
        id: parseInt(id.toString()),
      });
    } else {
      throw new BadRequest('Invalid operation.');
    }
  }
}
