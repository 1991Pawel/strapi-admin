export default ({ strapi }) => ({
  async save(ctx) {
    console.log('==================== PAYLOAD START ====================');
    console.log('📦 FULL REQUEST BODY:');
    console.log(JSON.stringify(ctx.request.body, null, 2));
    ctx.body = { ok: true };
  },
});
