// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("release_tab").doc(event._id).update({
      data: {
        eye: event.eye
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