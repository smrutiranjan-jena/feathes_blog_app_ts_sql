import app from '../../../src/app';

describe('\'..db_services/like\' service', () => {
  it('registered the service', () => {
    const service = app.service('like');
    expect(service).toBeTruthy();
  });
});
