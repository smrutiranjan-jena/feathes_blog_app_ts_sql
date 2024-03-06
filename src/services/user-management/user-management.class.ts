import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BadRequest, FeathersError } from '@feathersjs/errors';
import { UserTableDbOperations } from '../../db_services/users/utils/userTableDbOperation';
import {
  UserTable_GET,
  UserTable_FIND,
  UserTable_PATCH,
  UserTable_POST
} from '../../db_services/users/interfaces/userTableInterfaces'

interface Data { }

interface ServiceOptions { }

export class UserManagement implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Array<UserTable_GET> | UserTable_FIND> {
    if (params) {
      const { query = {} } = params;
      if (params.paginate === false) {
        return await UserTableDbOperations.getDataWithoutPagination({
          dbQuery: query,
          specifiedQuery: query,
        }).catch((e: FeathersError) => {
          throw e;
        });
      } else {
        return await UserTableDbOperations.getDataWithPagination({
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
  async get(id: Id, params?: Params): Promise<UserTable_GET> {
    if (params) {
      const { query = {} } = params;
      return await UserTableDbOperations.getDetails({
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
  async create(data: Data, params?: Params): Promise<UserTable_GET> {
    if (params) {
      const { query = {} } = params;
      return await UserTableDbOperations.createDatum({
        dbBody: data as UserTable_POST,
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
      return await UserTableDbOperations.modifyDatum({
        id: parseInt(id.toString()),
        dbBody: data as UserTable_PATCH,
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
  async remove(id: NullableId, params?: Params): Promise<UserTable_GET> {
    if (id) {
      return await UserTableDbOperations.deleteDatum({
        id: parseInt(id.toString()),
      });
    } else {
      throw new BadRequest('Invalid operation.');
    }
  }
}
