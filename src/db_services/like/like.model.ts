// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { Like_Status } from './interfaces/likeInterfaces';

class Like extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName(): string {
    return 'like';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['post','user'],

      properties: {
        post: {
          type: 'number'
        },
        user: {
          type: 'number'
        },
        status: {
          type: 'string',
          enum: [Like_Status.ACTIVE, Like_Status.DELETED],
          default: Like_Status.ACTIVE
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

export default function (app: Application): typeof Like {
  const db: Knex = app.get('knex');

  db.schema.hasTable('like').then(exists => {
    if (!exists) {
      db.schema.createTable('like', table => {
        table.increments('id');
        table.integer('post');
        table.integer('user');
        table.enum('status', [Like_Status.ACTIVE, Like_Status.DELETED]).defaultTo(Like_Status.ACTIVE)
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        table.foreign('post').references('post.id');
        table.foreign('user').references('user.id');
      })
        .then(() => console.log('Created like table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating like table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating like table', e)); // eslint-disable-line no-console

  return Like;
}
