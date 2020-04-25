// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("re_comment").add({
      data: {
        "release_id": event.release_id,
        "comment": event.comment,
        "author": event.author,
        "authorImg": event.authorImg,
        "data": event.data
      },
      success: res => {
        return res;
      },
      fail: e => {
        console.error(e)
        return e;
      }
    })
  } catch (e) {
    console.error(e)
    return e;
  }
}