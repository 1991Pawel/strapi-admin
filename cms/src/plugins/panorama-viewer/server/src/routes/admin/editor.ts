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
  ],
});
