(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/index"],{"153e":function(n,t,e){"use strict";var a=e("6eff"),o=e.n(a);o.a},5128:function(n,t,e){"use strict";(function(n){e("29ea"),e("921b");a(e("66fd"));var t=a(e("b14d"));function a(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"5e48":function(n,t,e){},"6eff":function(n,t,e){},"7b0a":function(n,t,e){"use strict";var a=e("5e48"),o=e.n(a);o.a},8947:function(n,t,e){"use strict";var a,o=function(){var n=this,t=n.$createElement;n._self._c},r=[];e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return a}))},ade2:function(n,t,e){"use strict";e.r(t);var a=e("ee03"),o=e.n(a);for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);t["default"]=o.a},b14d:function(n,t,e){"use strict";e.r(t);var a=e("8947"),o=e("ade2");for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);e("7b0a"),e("153e");var i,c=e("f0c5"),u=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=u.exports},ee03:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={components:{},data:function(){return{background:["color1","color2","color3"],indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,listArr:[{name:"推荐",url:"../../static/icon/shops.png",path:"/pages/navlist/shops"},{name:"拼车",url:"../../static/icon/car.png",path:"/pages/navlist/car"},{name:"租赁",url:"../../static/icon/Lease.png",path:"/pages/navlist/lease"},{name:"招聘",url:"../../static/icon/recruit.png",path:"/pages/navlist/recruit"},{name:"电话",url:"../../static/icon/telephone.png",path:"/pages/navlist/phone"}]}},mounted:function(){},methods:{wxGetUserInfo:function(){var t=this;n.getUserInfo({provider:"weixin",success:function(e){e.userInfo.nickName,e.userInfo.avatarUrl;try{n.setStorageSync("isCanUse",!1),t.updateUserInfo()}catch(a){}},fail:function(n){}})},navigateTo:function(t){n.navigateTo({url:t})},gotoDetail:function(t){n.navigateTo({url:"/pages/detail/banner?index=".concat(t)})}}};t.default=e}).call(this,e("543d")["default"])}},[["5128","common/runtime","common/vendor"]]]);