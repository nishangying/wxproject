'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	 console.log('------------');
	 console.log('云函数日志输出');
	 console.log('------------');
	 return {
		 action: 'log demo'
	 }
};
