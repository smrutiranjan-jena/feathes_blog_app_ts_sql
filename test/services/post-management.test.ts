import app from '../../src/app';

describe('\'post-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('post-management');
    expect(service).toBeTruthy();
  });
});
