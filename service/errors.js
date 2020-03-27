/**
 * @description errors.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/27>
 */
module.exports = {
  NO_ERROR: {
    message: '0000',
    code: '0000'
  },
  // common 0XXXX
  UN_RESOLVED: {
    message: 'un_resolved error',
    code: '0001'
  },
  UN_AUTHORIZED: {
    message: 'un_authorized error',
    code: '0401'
  },
  // file 1XXXX
  FILE_SIZE_EXCEEDED: {
    message: 'file is too big',
    code: '10000'
  }
}
