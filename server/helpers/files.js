require('dotenv').config()
const Storage = require('@google-cloud/storage');
const Multer = require('multer');

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
});

const bucket = storage.bucket(CLOUD_BUCKET);

exports.multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

exports.sendUploadToGCS = (req, res, next) => {
  if (!req.file && !req.body.imageUrl) {
    return res.status(400).json({ message: 'Image is required' });
  } else if (!req.file && req.body.imageUrl) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
};