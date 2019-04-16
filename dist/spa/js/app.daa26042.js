(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,n,t){e.exports=t("2f39")},"1b68":function(e,n,t){},"2f39":function(e,n,t){"use strict";t.r(n);var a=t("a34a"),r=t.n(a),o=(t("96cf"),t("c973")),u=t.n(o),s=(t("7d6e"),t("e54f"),t("1b68"),t("7e6d"),t("2b0e")),c=t("b05d"),i=t("9c40"),l=t("6f48"),f=t("f09f"),p=t("a370"),m=t("f2cc"),d=t("9898"),h=t("0016"),v=t("068f"),b=t("ef35"),g=t("27f9"),k=t("6ab5"),w=t("e208"),Q=t("033f"),x=t("4d5a"),y=t("497d"),I=t("2ea3"),S=t("c7a0"),_=t("0d59"),P=t("65c6"),C=t("6ac5"),L=t("24e8"),T=t("4b7e"),q=t("d3ab"),B=t("714f"),D=t("7f67"),V=t("2a19"),A=t("436b"),E=t("18d6");s["a"].use(c["a"],{config:{},components:{QBtn:i["a"],QBtnToggle:l["a"],QCard:f["a"],QCardSection:p["a"],QDrawer:m["a"],QHeader:d["a"],QIcon:h["a"],QImg:v["a"],QInfiniteScroll:b["a"],QInput:g["a"],QItem:k["a"],QItemLabel:w["a"],QItemSection:Q["a"],QLayout:x["a"],QList:y["a"],QPage:I["a"],QPageContainer:S["a"],QSpinner:_["a"],QToolbar:P["a"],QToolbarTitle:C["a"],QDialog:L["a"],QCardActions:T["a"],QPageSticky:q["a"]},directives:{Ripple:B["a"],ClosePopup:D["a"]},plugins:{Notify:V["a"],Dialog:A["a"],LocalStorage:E["a"]}});var J=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"q-app"}},[t("router-view")],1)},$=[],j={name:"App"},H=j,N=t("2877"),O=Object(N["a"])(H,J,$,!1,null,null,null),R=O.exports,U=t("2f62"),z={state:{user:null},getters:{user:function(e){return e.user},username:function(e){return e.user?e.user.username:null},userId:function(e){return e.user?e.user.user_id:null},loggedIn:function(e){return null!==e.user}},mutations:{socket_verify:function(e,n){n.isSuccessful?e.user=n.value:(E["a"].remove("token"),e.user=null)},socket_login:function(e,n){n.isSuccessful?(E["a"].set("token",n.value),V["a"].create("Logged in successfully")):(V["a"].create(n.value),e.user=null)},socket_register:function(e,n){V["a"].create(n.value),n.isSuccessful||(E["a"].remove("token"),e.user=null)},socket_logout:function(e){V["a"].create("Logged out"),console.log("socket_logout"),e.user=null,E["a"].remove("token")},socket_updateUsername:function(e,n){n.isSuccessful?(e.user.username=n.value,V["a"].create({icon:"done",color:"positive",message:"Changed username to ".concat(n.value)})):V["a"].create({icon:"error",color:"negative",message:n.value})},socket_updateEmail:function(e,n){n.isSuccessful?V["a"].create({icon:"done",color:"positive",message:"Changed email to ".concat(n.value)}):V["a"].create({icon:"error",color:"negative",message:n.value})}}};s["a"].use(U["a"]);var F=new U["a"].Store({modules:{auth:z}}),G=(t("7f7f"),t("8c4f")),K=[{path:"/",component:function(){return t.e("2d22c0ff").then(t.bind(null,"f241"))},children:[{name:"main",path:"",component:function(){return Promise.all([t.e("ea1119d8"),t.e("8e76b85a")]).then(t.bind(null,"8b24"))}},{name:"register",path:"/sign-up",component:function(){return Promise.all([t.e("44a818d4"),t.e("2d0df7ae")]).then(t.bind(null,"89a8"))}},{name:"new",path:"/new",component:function(){return t.e("4a68e19b").then(t.bind(null,"fa49"))}},{name:"meme",path:"/m/:memeId/:slug?",component:function(){return Promise.all([t.e("ea1119d8"),t.e("2d3b468e")]).then(t.bind(null,"bb3c"))},props:function(e){return{memeId:parseInt(e.params.memeId,10)}}},{name:"user",path:"/u/:username",component:function(){return Promise.all([t.e("ea1119d8"),t.e("05f4050c")]).then(t.bind(null,"d843"))},props:!0},{name:"settings",path:"/settings",component:function(){return Promise.all([t.e("44a818d4"),t.e("51fd3dba")]).then(t.bind(null,"b41f"))}}]}];K.push({path:"*",component:function(){return t.e("2e45017e").then(t.bind(null,"e51e"))}});var M=K;s["a"].use(G["a"]);var W=function(){var e=new G["a"]({scrollBehavior:function(e,n,t){return!t||"/"!==e.path&&"user"!==e.name?e.hash?{selector:e.hash}:{x:0,y:0}:t},routes:M,mode:"history",base:"/"});return e},X=function(){var e="function"===typeof F?F():F,n="function"===typeof W?W({store:e}):W;e.$router=n;var t={el:"#q-app",router:n,store:e,render:function(e){return e(R)}};return{app:t,store:e,router:n}},Y=t("5132"),Z=t.n(Y),ee=function(){var e=u()(r.a.mark(function e(n){var t,a,o,u;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=n.Vue,a=n.store,o="",u={},E["a"].has("token")&&(u.query={token:E["a"].getItem("token")}),t.use(new Z.a({connection:o,vuex:{store:a,actionPrefix:"socket_",mutationPrefix:"socket_"},options:u}));case 5:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),ne=t("95ae"),te=function(){var e=u()(r.a.mark(function e(n){var t;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=n.Vue,t.use(ne["a"]);case 2:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),ae=X(),re=ae.app,oe=ae.store,ue=ae.router;function se(){return ce.apply(this,arguments)}function ce(){return ce=u()(r.a.mark(function e(){var n,t;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=[ee,te],t=0;case 2:if(!(t<n.length)){e.next=18;break}return e.prev=3,e.next=6,n[t]({app:re,router:ue,store:oe,Vue:s["a"],ssrContext:null});case 6:e.next=15;break;case 8:if(e.prev=8,e.t0=e["catch"](3),!e.t0||!e.t0.url){e.next=13;break}return window.location.href=e.t0.url,e.abrupt("return");case 13:return console.error("[Quasar] boot error:",e.t0),e.abrupt("return");case 15:t++,e.next=2;break;case 18:new s["a"](re);case 19:case"end":return e.stop()}},e,null,[[3,8]])})),ce.apply(this,arguments)}se()},"7e6d":function(e,n,t){}},[[0,"runtime","vendor"]]]);