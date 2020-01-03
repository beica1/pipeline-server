/**
 * index.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const R = require('ramda')
const fs = require('fs')
const path = require('path')

// 包含所有的resolve
let resolvers = {}

// 同步读取当前目录下所有 .js 文件
const dirs = fs.readdirSync(__dirname)

dirs.forEach((dir) => {
  const filePath = path.join(__dirname, dir)
  if (
    fs.statSync(filePath).isFile &&
    filePath.endsWith('.js') &&
    !filePath.endsWith('index.js') // 不包含此文件
  ) {
    
    const resolver = require(filePath)
    
    resolvers = R.mergeDeepRight(resolvers, resolver) // 合并所有的resolver到reslovers中
  }
})

// 导出resolvers
module.exports = resolvers
