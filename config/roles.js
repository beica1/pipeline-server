/**
 * roles.js of pipeline-server
 * Created by beica on 2020/1/10
 */
module.exports = [
  {
    name: '组内管理员',
    key: 'ADMIN',
    type: 1,
    description: '可管理组内其他成员'
  },
  {
    name: '运营',
    key: 'OPERATION',
    type: 2,
    description: '运营'
  },
  {
    name: '产品',
    key: 'PRODUCT',
    type: 3,
    description: '产品'
  },
  {
    name: '设计',
    key: 'DESIGN',
    type: 4,
    description: '设计'
  },
  {
    name: '前端',
    key: 'FRONT-END',
    type: 5,
    description: '前端'
  },
  {
    name: '测试',
    key: 'TEST',
    type: 6,
    description: '测试'
  },
  {
    name: '后端',
    key: 'BACK-END',
    type: 7,
    description: '后端'
  }
]

