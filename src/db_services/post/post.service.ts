// Initializes the `../db_services/post` service on path `/post`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Post } from './post.class';
import createModel from './post.model';
import hooks from './post.hooks';
import { PostTableDbOperations } from './utils/postTableDbOperation';
import  onPostCreated  from './events/onPostCreated';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'post': Post & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/post', new Post(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('post');
  PostTableDbOperations.initializeService(service);
  service.on('created',onPostCreated);
  service.on('removed',onPostCreated)
  service.hooks(hooks);
}
