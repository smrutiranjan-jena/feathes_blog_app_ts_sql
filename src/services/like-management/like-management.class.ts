import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { LikeTableDbOperations } from '../../db_services/like/utils/likeTableDbOperation';
import { BadRequest,FeathersError } from '@feathersjs/errors';
import {
  LikeTable_FIND,
  LikeTable_PATCH,
  LikeTable_GET,
  LikeTable_POST
} from '../../db_services/like/interfaces/likeInterfaces'
interface Data { }

interface ServiceOptions { }

export class LikeManagement implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Array<LikeTable_GET> | LikeTable_FIND> {
    if (params) {
      const { query = {} } = params;
      if (params.paginate === false) {
        return await LikeTableDbOperations.getDataWithoutPagination({
          dbQuery: query,
          specifiedQuery: query,
        }).catch((e: FeathersError) => {
          throw e;
        });
      } else {
        return await LikeTableDbOperations.getDataWithPagination({
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
  async get(id: Id, params?: Params): Promise<LikeTable_GET> {
    if (params) {
      const { query = {} } = params;
      return await LikeTableDbOperations.getDetails({
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
  async create(data: Data, params?: Params): Promise<LikeTable_GET> {
    if (params) {
      const { query = {} } = params;
      return await LikeTableDbOperations.createDatum({
        dbBody: data as LikeTable_POST,
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
      return await LikeTableDbOperations.modifyDatum({
        id: parseInt(id.toString()),
        dbBody: data as LikeTable_PATCH,
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
  async remove(id: NullableId, params?: Params): Promise<LikeTable_GET> {
    if (id) {
      return await LikeTableDbOperations.deleteDatum({
        id: parseInt(id.toString()),
      });
    } else {
      throw new BadRequest('Invalid operation.');
    }
  }
}
