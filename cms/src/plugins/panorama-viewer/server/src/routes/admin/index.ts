export default () => ({
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/save-tour',
      handler: 'editor.save',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/tours',
      handler: 'editor.getTours',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
});
