/**
 * @description file.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/25>
 */
const Busboy = require('busboy')
const { response, errors } = require('./format')
const { create } = require('../module/file')

module.exports = app => {
  app.post([
    '/upload',
    '/upload/:fileId'
  ], (req, res) => {
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        fileSize: 1024 * 1024 * 20 // 20MB
      }
    })
    busboy.on('file', async (fieldName, fileStream, fileName, encoding, mimeType) => {
      try {
        const fileId = await create(fileName, fileStream)
        return res.json(response(fileId))
      } catch (e) {
        return res.json(errors.FILE_SIZE_EXCEEDED)
      }
    })
    req.pipe(busboy)
  })
}
