require("dotenv").config();

const { nanoid } = require("nanoid");
const B2 = require("backblaze-b2");
const b2 = new B2({
  applicationKeyId: process.env.BACKBLAZE_KEY_ID,
  applicationKey: process.env.BACKBLAZE_KEY
});

const uploadImgAndReturnUrl = async (file) => {
  const authorizationReq = await b2.authorize();
  const hostname = authorizationReq.data.downloadUrl;
  const uploadUrlReq = await b2.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID
  });

  const { uploadUrl, authorizationToken: uploadAuthToken } = uploadUrlReq.data;

  const uploadReq = await b2.uploadFile({
    uploadUrl,
    uploadAuthToken,
    fileName: nanoid(),
    data: file.buffer,
    mime: file.mimetype
  });

  return `${hostname}/b2api/v1/b2_download_file_by_id?fileId=${uploadReq.data.fileId}`;
};

module.exports = uploadImgAndReturnUrl;
