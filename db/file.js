/**
 * @description file.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/25>
 */
const GridFS = require('mongodb').GridFSBucket
const { guid } = require('../util/common')
const { query } = require('./index')

module.exports.store = (fileName, rStream) => query(async (db, resolve, reject) => {
  const gridFS = new GridFS(db)
  const fileId = guid()
  const writable = gridFS.openUploadStreamWithId(fileId, fileName)
  writable.on('finish', () => {
    if (rStream.truncated) {
      gridFS.delete(fileId)
      reject('File is big than limit')
    } else {
      resolve(fileId)
    }
  })
  rStream.pipe(writable)
})

