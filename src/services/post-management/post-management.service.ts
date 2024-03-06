// Initializes the `post-management` service on path `/post-management`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { PostManagement } from './post-management.class';
import hooks from './post-management.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'post-management': PostManagement & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/post-management', new PostManagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('post-management');

  service.hooks(hooks);
}
