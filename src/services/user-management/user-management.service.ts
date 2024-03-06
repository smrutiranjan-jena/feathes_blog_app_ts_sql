// Initializes the `user-management` service on path `/user-management`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UserManagement } from './user-management.class';
import hooks from './user-management.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'user-management': UserManagement & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-management', new UserManagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-management');

  service.hooks(hooks);
}
