import app from '../../src/app';

describe('\'user-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-management');
    expect(service).toBeTruthy();
  });
});
