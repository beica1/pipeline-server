/**
 * index.js of pipleline-server
 * Created by beica on 2019/12/31
 */
const fs = require('fs')
const path = require('path')
const { buildSchema } = require('graphql')


// 包含所有的类型定义
const typeDefs = []

// 同步读取当前目录下所有 .graphql 文件
const dirs = fs.readdirSync(__dirname)

dirs.forEach((dir) => {
    const filePath = path.join(__dirname, dir)
    if (
      fs.statSync(filePath).isFile &&
      filePath.endsWith('.graphql') // 读取.graphql文件
    ) {
        const content = fs.readFileSync(
          filePath,
          {
              encoding: 'utf-8'
          }
        )
        
        typeDefs.push(content) // gql字符串模板标签函数会解析schame定义语法
    }
    
})

module.exports = typeDefs
