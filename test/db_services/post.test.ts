import app from '../../../../src/app';

describe('\'../db_services/post\' service', () => {
  it('registered the service', () => {
    const service = app.service('post');
    expect(service).toBeTruthy();
  });
});
