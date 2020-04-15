'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  //返回数据给客户端
  //event为客户端上传的参数
  const collection = db.collection('index') // 获取表'unicloud-test'的集合对象
  const res = await collection // 获取表中的10条数据，结果为json格式
  return res // 返回json给客户端
};