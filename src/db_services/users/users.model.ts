// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { UserTableStatus } from './interfaces/userTableInterfaces';

class Users extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName(): string {
    return 'users';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['password', 'username', 'email'],

      properties: {
        username: {
          type: 'string',
        },
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        blogCount: {
          type: ['number', 'null'],
          default: 0
        },
        followingCount: {
          type: ['number', 'null'],
          default: 0
        },
        invitationCount: {
          type: ['number', 'null'],
          default: 0
        },
        followersCount: {
          type: ['number', 'null'],
          default: 0
        },
        status: {
          type: 'string',
          enum: [UserTableStatus.ACTIVE, UserTableStatus.DELETED],
          default: UserTableStatus.ACTIVE
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

export default function (app: Application): typeof Users {
  const db: Knex = app.get('knex');

  db.schema.hasTable('users').then(exists => {
    if (!exists) {
      db.schema.createTable('users', table => {
        table.increments('id');
        table.string('username').unique()
        table.string('email').unique();
        table.string('password');
        table.integer('blogCount').defaultTo(0);
        table.integer('followingCount').defaultTo(0);
        table.integer('invitationCount').defaultTo(0);
        table.integer('followersCount').defaultTo(0);
        table.enum('status', [UserTableStatus.ACTIVE, UserTableStatus.DELETED]).defaultTo(UserTableStatus.ACTIVE)
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created users table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console

  return Users;
}
