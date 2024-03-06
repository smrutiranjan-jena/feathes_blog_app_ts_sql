import app from '../../src/app';

describe('\'post\' service', () => {
  it('registered the service', () => {
    const service = app.service('db_services/post');
    expect(service).toBeTruthy();
  });
});
