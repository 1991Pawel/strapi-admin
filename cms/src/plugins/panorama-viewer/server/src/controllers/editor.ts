export default ({ strapi }) => ({
  async save(ctx) {
    const { data } = ctx.request.body;
    const files = ctx.request.files?.files;
    const payload = typeof data === 'string' ? JSON.parse(data) : data;
    const editorState = payload;

    let uploadedFiles = [];
    if (files) {
      const filesArray = Array.isArray(files) ? files : [files];
      for (const file of filesArray) {
        const uploaded = await strapi.plugin('upload').service('upload').upload({
          data: {},
          files: file,
        });
        uploadedFiles.push(uploaded[0]);
      }
    }
    if (uploadedFiles.length) {
      editorState.panoramas = editorState.panoramas.map((p, i) => ({
        ...p,
        url: uploadedFiles[i]?.url,
        file: undefined,
      }));
    }
    const created = await strapi.entityService.create('plugin::panorama-viewer.tour', {
      data: { editorState },
    });
    ctx.body = { ok: true, id: created.id, panoramas: editorState.panoramas };
  },
});
