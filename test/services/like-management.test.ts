import app from '../../src/app';

describe('\'like-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('like-management');
    expect(service).toBeTruthy();
  });
});
