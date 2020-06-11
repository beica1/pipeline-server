/**
 * @description file.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/25>
 */
const R = require('ramda')
const Busboy = require('busboy')
const { response, errors } = require('./format')
const { create, read, remove } = require('../module/file')

module.exports = app => {
  app.post([
    '/file/upload',
    '/file/upload/:fileId'
  ], (req, res) => {
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        fileSize: 1024 * 1024 * 20 // 20MB
      }
    })
    
    busboy.on('file', async (field, stream, fileName) => {
      try {
        const fileId = await create(fileName, stream)
        return res.json(response({ fileId, fileName }))
      } catch (e) {
        return res.json(errors.FILE_SIZE_EXCEEDED)
      }
    })
    
    req.pipe(busboy)
  })
  
  app.get('/file/:fileId', (req, res) => {
    const fileId = R.path(['params', 'fileId'], req)
    read(fileId).pipe(res)
  })
  
  app.post('/file/remove/:fileId', async (req, res) => {
    const fileId = R.path(['params', 'fileId'], req)
    await remove(fileId)
    return res.json(response(fileId))
  })
}
