// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { Post_Status } from './interfaces/postInterfaces';



class Post extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName(): string {
    return 'post';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['user', 'title', 'description'],

      properties: {
        user: {
          type: 'number'
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        likeCount:{
          type: 'number',
          default:0
        },
        commentCount:{
          type: 'number',
          default:0
        },
        status: {
          type: 'string',
          enum: [Post_Status.ACTIVE, Post_Status.DELETED],
          default: Post_Status.ACTIVE
        }
      }
    };
  }

  $beforeInsert(): void {
    this.createdAt = this.updatedAt = new Date();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date();
  }
}

export default function (app: Application): typeof Post {
  const db: Knex = app.get('knex');

  db.schema.hasTable('post').then(exists => {
    if (!exists) {
      db.schema.createTable('post', table => {
        table.increments('id');
        table.integer('user').unsigned();
        table.string('title');
        table.string('description');
        table.integer('likeCount').defaultTo(0);
        table.integer('commentCount').defaultTo(0);
        table.enum('status', [Post_Status.ACTIVE, Post_Status.DELETED]).defaultTo(Post_Status.ACTIVE);
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        table.foreign('user').references('user.id');
      })
        .then(() => console.log('Created post table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating post table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating post table', e)); // eslint-disable-line no-console

  return Post;
}
