export default ({ strapi }) => ({
  async save(ctx) {
    const { data } = ctx.request.body;
    const files = ctx.request.files?.files;
    const thumbnailFile = ctx.request.files?.thumbnail;
    const payload = typeof data === 'string' ? JSON.parse(data) : data;
    const editorState = payload;

    // Upload panorama files
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

    // Upload thumbnail file
    let thumbnailUrl = null;
    if (thumbnailFile) {
      const uploaded = await strapi.plugin('upload').service('upload').upload({
        data: {},
        files: thumbnailFile,
      });
      thumbnailUrl = uploaded[0]?.url;
    }

    // Map panorama URLs
    if (uploadedFiles.length) {
      editorState.panoramas = editorState.panoramas.map((p, i) => ({
        ...p,
        url: uploadedFiles[i]?.url,
        file: undefined,
      }));
    }

    // Add thumbnail to editorState
    if (thumbnailUrl) {
      editorState.thumbnail = thumbnailUrl;
    }

    const created = await strapi.entityService.create('plugin::panorama-viewer.tour', {
      data: { editorState },
    });
    ctx.body = { ok: true, id: created.id, panoramas: editorState.panoramas };
  },

  async getTours(ctx) {
    try {
      const tours = await strapi.entityService.findMany('plugin::panorama-viewer.tour', {
        fields: ['id', 'documentId', 'editorState'],
      });
      ctx.body = { data: tours };
    } catch (error) {
      ctx.throw(500, 'Failed to fetch tours');
    }
  },
});
