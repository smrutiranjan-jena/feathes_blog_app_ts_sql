import { Application } from '../declarations';
import userManagementService from './user-management/user-management.service';
import postManagementService from './post-management/post-management.service';
import likeManagementService from './like-management/like-management.service';


export default function (app: Application): void {
  app.configure(userManagementService);
  app.configure(postManagementService);
  app.configure(likeManagementService);
}
