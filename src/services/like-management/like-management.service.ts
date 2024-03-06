// Initializes the `like-management` service on path `/like-management`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { LikeManagement } from './like-management.class';
import hooks from './like-management.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'like-management': LikeManagement & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/like-management', new LikeManagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('like-management');
  
  service.hooks(hooks);
}
