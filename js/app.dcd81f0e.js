(function(e){function t(t){for(var n,o,s=t[0],c=t[1],l=t[2],p=0,f=[];p<s.length;p++)o=s[p],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&f.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,s=1;s<a.length;s++){var c=a[s];0!==r[c]&&(n=!1)}n&&(i.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},r={app:0},i=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/timeflow-orchestrator-console/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},"3ed1":function(e,t,a){},"62a1":function(e,t,a){e.exports=a.p+"img/timeflow.0fd2a3a1.svg"},"6b97":function(e,t,a){"use strict";a("c4b2")},"6d66":function(e,t,a){},7704:function(e){e.exports=JSON.parse('{"head":{"title":{"404":"Оркестратор Timeflow","instances":"Инстансы • Оркестратор Timeflow","users":"Пользователи • Оркестратор Timeflow","licenses":"Лицензии • Оркестратор Timeflow","bills":"Счета • Оркестратор Timeflow","plans":"Планы • Оркестратор Timeflow"}},"common":{"owner":"ORBL","roles":{"orchestrator":"Оркестратор"},"labels":{"page_not_found":"Страница не найдена"},"table":{"list_empty":"Список пуст","items_per_page":"Элементов на странице","loading":"Получение списка элементов..","all":"Все","page":"Страница {0} из {1} (всего строк: {2})","search_input":"Поиск по вхождениям"},"actions":{"add":"Добавить","input_query":"Введите поисковой запрос","clear_filter":"Сбросить фильтры","return":"Вернуться"}},"login":{"title":"Авторизация","login":"Введите логин","password":"Введите пароль","actions":{"auth":"Войти"},"errors":{"email_format_invalid":"Неверный формат email","empty_field":"Поле не может быть пустым","no_spaces":"Поле не может содержать пробельные символы"}},"navigation":{"menu":{"instances":"Инстансы","users":"Пользователи","licenses":"Лицензии","bills":"Счета","plans":"Планы"},"actions":{"logout":"Выйти"}},"pages":{"instances":{"table":{"headers":{"0":"#","1":"Название","2":"Лимит сотрудников","3":"Cотрудников создано","4":"Дата создания","5":"Дата истечения лицензии","6":"Уведомления"},"need_update_lic":"Требуется повышение лицензии"},"actions":{"add":"Добавить инстанс"}}}}')},a554:function(e,t,a){e.exports=a.p+"img/timeflow.a7954569.png"},c4b2:function(e,t,a){},cd49:function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("9483");Object(n["a"])("".concat("/timeflow-orchestrator-console/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});a("3ed1");var r=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{staticClass:"fill-height"},[e.hasShowUi?a("v-navigation-drawer",{attrs:{app:"",temporary:""},model:{value:e.isNavigationDrawerShow,callback:function(t){e.isNavigationDrawerShow=t},expression:"isNavigationDrawerShow"}},[a("NavigationDrawerUserCard"),a("v-divider"),a("v-list",e._l(e.menu,(function(t,n){return a("v-list-item",{key:n,attrs:{color:"primary lighten-1",to:t.name}},[a("v-list-item-icon",[a("v-icon",[e._v(e._s(t.icon))])],1),a("v-list-item-content",[a("v-list-item-title",[e._v(e._s(e.$vuetify.lang.t("$vuetify.navigation.menu."+t.name)))])],1)],1)})),1)],1):e._e(),e.hasShowUi?a("v-app-bar",{staticClass:"toolbar-border-bottom user-select-none",attrs:{app:"",color:"grey lighten-5",flat:""}},[a("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.isNavigationDrawerShow=!e.isNavigationDrawerShow}}}),a("v-toolbar-title",[e._v(e._s(e.$vuetify.lang.t("$vuetify.navigation.menu."+e.$route.name)))]),a("v-spacer"),e.isAppbarMenuShow?[1==e.appbarMenu.length?e._l(e.appbarMenu,(function(t,n){return a("v-btn",{key:n,attrs:{text:e.$vuetify.breakpoint.mdAndUp,icon:!e.$vuetify.breakpoint.mdAndUp,disabled:!t.action,title:t.title},on:{click:t.action}},[e.$vuetify.breakpoint.mdAndUp?a("span",[e._v(e._s(t.title))]):a("v-icon",[e._v(e._s(t.icon))])],1)})):e.appbarMenu.length>1?[e._v(" ... ")]:e._e()]:e._e()],2):e._e(),a("v-main",{staticClass:"fill-height"},[a("router-view",{staticClass:"fill-height"})],1),e.hasShowUi?a("v-footer",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{app:""}}):e._e()],1)},o=[],s=(a("b0c0"),a("ac1f"),a("5319"),a("96cf"),a("1da1")),c=a("5530"),l=a("d4ec"),u=a("bee2"),p=a("262e"),f=a("2caf"),d=a("9ab4"),v=a("60a3"),m=a("8c4f"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"fill-height user-select-none"},[n("v-row",{attrs:{justify:"center",align:"start","no-gutters":""}},[n("v-col",{attrs:{cols:"9",sm:"4",md:"3",lg:"2"}},[n("img",{attrs:{src:a("a554"),width:"100%"}})])],1),n("v-row",{attrs:{justify:"center","no-gutters":""}},[n("v-col",{attrs:{cols:"12",sm:"8",md:"7",lg:"6"}},[n("LoginForm")],1)],1),n("v-row",{attrs:{justify:"center","no-gutters":"",hidden:""}},[n("v-col")],1)],1)},b=[],g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-form",{ref:"form",staticClass:"full-width",nativeOn:{keyup:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.isFormValid&&e.submit()}},model:{value:e.isFormValid,callback:function(t){e.isFormValid=t},expression:"isFormValid"}},[a("v-card",{staticClass:"rounded-lg",attrs:{width:"100%",color:"grey lighten-5"}},[a("v-card-title",[e._v(" "+e._s(e.$vuetify.lang.t("$vuetify.login.title"))+" ")]),a("v-card-text",[a("v-text-field",{attrs:{color:"primary lighten-1",label:e.$vuetify.lang.t("$vuetify.login.login"),rules:e.loginRules},model:{value:e.login,callback:function(t){e.login=t},expression:"login"}}),a("v-text-field",{staticClass:"mt-4",attrs:{color:"primary lighten-1",rules:e.passwordRules,label:e.$vuetify.lang.t("$vuetify.login.password"),type:e.isShowPass?"text":"password","append-icon":e.password.length>0?e.isShowPass?"mdi-eye-off":"mdi-eye":""},on:{"click:append":function(){return e.isShowPass=!e.isShowPass}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary lighten-1",disabled:!e.isFormValid,loading:e.loadingState},on:{click:e.submit}},[e._v(" "+e._s(e.$vuetify.lang.t("$vuetify.login.actions.auth"))+" ")])],1)],1)],1)},y=[],_=(a("4d63"),a("25f0"),a("466d"),a("6fc5")),O=a("2f62");r["a"].use(O["a"]);var w,j=new O["a"].Store({}),x=a("bc3a"),k=a.n(x),$=function(){function e(){Object(l["a"])(this,e),this.api=k.a.create({baseURL:"https://dev.voodoo.pub/wtt-orchestrator-backend"})}return Object(u["a"])(e,[{key:"signIn",value:function(e,t){return this.api.post("/app/account/sign-in",{email:e,password:t})}},{key:"instances",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15;return this.api.post("/app/instances/list",{access_token:"yBfJU2SNZ7a0j9nOKL7k2gWXfiA-5uau",filters:{query:e},offset:t,limit:a})}}],[{key:"getInstance",value:function(){return this._instance||(this._instance=new e),this._instance}}]),e}(),S=w=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e._profile=null,e._token=null,e}return Object(u["a"])(a,[{key:"load",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=localStorage.getItem(w.PROFILE_KEY),a=localStorage.getItem(w.TOKEN_KEY),e.abrupt("return",{_profile:t?JSON.parse(t):null,_token:a?JSON.parse(a):null});case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"logout",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return localStorage.removeItem(w.PROFILE_KEY),localStorage.removeItem(w.TOKEN_KEY),e.abrupt("return",{_profile:null,_token:null});case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"signIn",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var a,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.login,n=t.password,e.next=3,$.getInstance().signIn(a,n);case 3:return r=e.sent,localStorage.setItem(w.TOKEN_KEY,JSON.stringify(r.data.user.access_token)),localStorage.setItem(w.PROFILE_KEY,JSON.stringify(r.data.user)),e.abrupt("return",{_profile:r.data.user,_token:r.data.user.access_token});case 7:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isAuth",get:function(){return!!this._token}},{key:"token",get:function(){return this._token}},{key:"profile",get:function(){return this._profile}}]),a}(_["d"]);S.TOKEN_KEY="token",S.PROFILE_KEY="profile",Object(d["a"])([Object(_["c"])({mutate:["_profile","_token"],rawError:!0})],S.prototype,"load",null),Object(d["a"])([Object(_["c"])({mutate:["_profile","_token"],rawError:!0})],S.prototype,"logout",null),Object(d["a"])([Object(_["c"])({mutate:["_profile","_token"],rawError:!0})],S.prototype,"signIn",null),S=w=Object(d["a"])([Object(_["a"])({dynamic:!0,store:j,name:"AuthStore"})],S);var C=Object(_["e"])(S),I=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.login="",e.password="",e.isFormValid=!1,e.isShowPass=!1,e.loadingState=!1,e.loginRules=[function(t){return t.length>0||e.$vuetify.lang.t("$vuetify.login.errors.empty_field")},function(t){return!t.match(/\s/)||e.$vuetify.lang.t("$vuetify.login.errors.no_spaces")},function(t){return!!t.match(new RegExp("^\\S+@\\S+\\.\\S+"))||e.$vuetify.lang.t("$vuetify.login.errors.email_format_invalid")}],e.passwordRules=[function(t){return t.length>0||e.$vuetify.lang.t("$vuetify.login.errors.empty_field")},function(t){return!t.match(/\s/)||e.$vuetify.lang.t("$vuetify.login.errors.no_spaces")}],e}return Object(u["a"])(a,[{key:"submit",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingState=!0,e.next=4,C.signIn({login:this.login,password:this.password});case 4:this.$router.replace({name:Ae.name}),e.next=15;break;case 7:e.prev=7,e.t0=e["catch"](0),e.t1=null===e.t0||void 0===e.t0||null===(t=e.t0.response)||void 0===t||null===(a=t.data)||void 0===a||null===(n=a.exception)||void 0===n?void 0:n.message,e.next="Incorrect email or password passed"===e.t1?12:14;break;case 12:return alert("Неверный логин или пароль, повторите ввод"),e.abrupt("break",15);case 14:alert(e.t0.message);case 15:return e.prev=15,this.loadingState=!1,e.finish(15);case 18:case"end":return e.stop()}}),e,this,[[0,7,15,18]])})));function t(){return e.apply(this,arguments)}return t}()}]),a}(v["c"]);I=Object(d["a"])([v["a"]],I);var V=I,E=V,F=a("2877"),R=a("6544"),L=a.n(R),P=a("8336"),N=a("b0af"),A=a("99d9"),T=a("4bd4"),D=a("2fa4"),U=a("8654"),K=Object(F["a"])(E,g,y,!1,null,null,null),B=K.exports;L()(K,{VBtn:P["a"],VCard:N["a"],VCardActions:A["a"],VCardText:A["b"],VCardTitle:A["c"],VForm:T["a"],VSpacer:D["a"],VTextField:U["a"]});var M=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){return Object(l["a"])(this,a),t.apply(this,arguments)}return a}(v["c"]);M=Object(d["a"])([Object(v["a"])({components:{LoginForm:B}})],M);var q=M,Q=q,J=a("62ad"),Y=a("a523"),W=a("0fd9"),H=Object(F["a"])(Q,h,b,!1,null,null,null),X=H.exports;L()(H,{VCol:J["a"],VContainer:Y["a"],VRow:W["a"]});var Z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("DataTable",{ref:"table",attrs:{headers:e.tableHeaders,items:e.tableItems,"server-items-length":e.totalItems,search:e.filterQuery,loading:e.tableLoading},on:{options:e.onOptionsChanged},scopedSlots:e._u([{key:"item",fn:function(t){var n=t.item;return[a("tr",{staticClass:"cursor-pointer"},[a("td",{staticClass:"text-start user-select-none"},[a("span",[e._v(e._s(n.id))])]),a("td",{staticClass:"text-start user-select-none"},[a("span",[e._v(e._s(n.name))])]),a("td",{staticClass:"text-start user-select-none"},[a("span",[e._v(e._s(n.limit))])]),a("td",{staticClass:"text-start user-select-none"},[a("span",[e._v(e._s(n.count))])]),a("td",{staticClass:"text-start user-select-none"},[a("v-chip",{attrs:{color:"grey lighten-4"}},[e._v(e._s(n.created_at))])],1),a("td",{staticClass:"text-start user-select-none"},[a("v-chip",{attrs:{color:"grey lighten-4"}},[e._v(e._s(n.expires_at))])],1),a("td",{staticClass:"text-center user-select-none"},[n.state?a("v-chip",{attrs:{color:"error lighten-1"}},[e._v(e._s(e.$vuetify.lang.t("$vuetify.pages.instances.table.need_update_lic")))]):a("span",[e._v("—")])],1)])]}}])},[a("template",{slot:"top"},[a("FiltersContainer",{staticClass:"px-4"},[a("SearchField",{attrs:{"max-width":"450px",placeholder:e.$vuetify.lang.t("$vuetify.common.table.search_input")},model:{value:e.filterQuery,callback:function(t){e.filterQuery=t},expression:"filterQuery"}}),a("v-spacer",{staticClass:"mx-2"}),a("v-btn",{attrs:{text:e.$vuetify.breakpoint.mdAndUp,icon:!e.$vuetify.breakpoint.mdAndUp,disabled:!e.isClearFiltersButtonEnable,title:e.$vuetify.lang.t("$vuetify.common.actions.clear_filter")},on:{click:e.clearFilters}},[e.$vuetify.breakpoint.mdAndUp?a("span",[e._v(e._s(e.$vuetify.lang.t("$vuetify.common.actions.clear_filter")))]):a("v-icon",[e._v("mdi-filter-remove-outline")])],1)],1),a("v-divider",{staticClass:"mt-3"})],1)],2)],1)},z=[],G=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-text-field",{staticClass:"ma-0 pa-0 search-view",style:{"max-width":e.maxWidth},attrs:{"background-color":"grey lighten-4","prepend-inner-icon":"mdi-magnify",placeholder:e.placeholder,disabled:e.disabled,solo:"",flat:"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})},ee=[],te=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){return Object(l["a"])(this,a),t.apply(this,arguments)}return Object(u["a"])(a,[{key:"search",get:function(){return this.value},set:function(e){this.$emit("input",e)}}]),a}(v["c"]);Object(d["a"])([Object(v["b"])({required:!1})],te.prototype,"value",void 0),Object(d["a"])([Object(v["b"])({required:!1})],te.prototype,"placeholder",void 0),Object(d["a"])([Object(v["b"])({default:!1})],te.prototype,"disabled",void 0),Object(d["a"])([Object(v["b"])({default:"350px"})],te.prototype,"maxWidth",void 0),te=Object(d["a"])([v["a"]],te);var ae=te,ne=ae,re=(a("ffa9"),Object(F["a"])(ne,G,ee,!1,null,null,null)),ie=re.exports;L()(re,{VTextField:U["a"]});var oe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex align-center overflow-x-auto overflow-y-hidden",staticStyle:{"min-height":"48px"}},[e._t("default")],2)},se=[],ce={},le=Object(F["a"])(ce,oe,se,!1,null,null,null),ue=le.exports,pe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",e._b({staticClass:"flex column fill-height",attrs:{height:"100%","fixed-header":"",options:e.options,"mobile-breakpoint":0,"items-per-page":20,"no-data-text":e.$vuetify.lang.t("$vuetify.common.table.list_empty"),"loading-text":e.$vuetify.lang.t("$vuetify.common.table.loading"),"footer-props":{"items-per-page-options":[20,50,100,-1]}},on:{"update:options":function(t){e.options=t}}},"v-data-table",e.$props,!1),[e._l(e.$slots,(function(t,a){return e._t(a,null,{slot:a})}))],2)},fe=[],de=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.options={},e}return Object(u["a"])(a,[{key:"onOptionsChanged",value:function(e){this.$emit("options",e)}}]),a}(v["c"]);Object(d["a"])([Object(v["b"])({required:!0})],de.prototype,"headers",void 0),Object(d["a"])([Object(v["b"])({required:!0})],de.prototype,"items",void 0),Object(d["a"])([Object(v["b"])({required:!0})],de.prototype,"loading",void 0),Object(d["a"])([Object(v["b"])({required:!0})],de.prototype,"serverItemsLength",void 0),Object(d["a"])([Object(v["b"])({required:!0})],de.prototype,"search",void 0),Object(d["a"])([Object(v["d"])("options",{deep:!0})],de.prototype,"onOptionsChanged",null),de=Object(d["a"])([v["a"]],de);var ve=de,me=ve,he=a("8fea"),be=Object(F["a"])(me,pe,fe,!1,null,null,null),ge=be.exports;L()(be,{VDataTable:he["a"]});var ye=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e._items=[],e}return Object(u["a"])(a,[{key:"setItems",value:function(e){this._items=e}},{key:"clean",value:function(){this._items=[]}},{key:"isShow",get:function(){return this.items.length>0}},{key:"items",get:function(){return this._items}}]),a}(_["d"]);Object(d["a"])([_["b"]],ye.prototype,"setItems",null),Object(d["a"])([_["b"]],ye.prototype,"clean",null),ye=Object(d["a"])([Object(_["a"])({dynamic:!0,store:j,name:"AppbarMenuStore"})],ye);var _e=Object(_["e"])(ye),Oe=(a("d81d"),a("841c"),function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e._instances=[],e._totalInstances=0,e}return Object(u["a"])(a,[{key:"loadInstances",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var a,n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.search,n=t.offset,r=t.limit,e.next=3,$.getInstance().instances(a,n,r);case 3:return i=e.sent,e.abrupt("return",{_totalInstances:i.data.count,_instances:i.data.instances.map((function(e){var t=new Date(e.created_at),a=new Date(e.created_at);return a.setDate(a.getDate()+e.stats.license.duration),{id:e.id,name:e.name,limit:e.stats.employees.licensed,count:e.stats.employees.active,created_at:t.toLocaleDateString(),expires_at:a.toLocaleDateString(),state:e.requires_upgrade}}))});case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"instances",get:function(){return this._instances}},{key:"totalInstances",get:function(){return this._totalInstances}}]),a}(_["d"]));Object(d["a"])([Object(_["c"])({mutate:["_instances","_totalInstances"],rawError:!0})],Oe.prototype,"loadInstances",null),Oe=Object(d["a"])([Object(_["a"])({dynamic:!0,store:j,name:"InstancesPageStore"})],Oe);var we=Object(_["e"])(Oe),je=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.tableHeaders=[{value:"id",align:"start",sortable:!1,divider:!1,text:e.$vuetify.lang.t("$vuetify.pages.instances.table.headers.0"),width:"6%"},{value:"name",align:"start",sortable:!1,divider:!1,text:e.$vuetify.lang.t("$vuetify.pages.instances.table.headers.1"),width:"22%"},{value:"limit",align:"start",sortable:!1,divider:!1,text:e.$vuetify.lang.t("$vuetify.pages.instances.table.headers.2"),width:"15%"},{value:"count",align:"start",sortable:!1,divider:!1,text:e.$vuetify.lang.t("$vuetify.pages.instances.table.headers.3"),width:"15%"},{value:"created_at",align:"start",sortable:!1,divider:!1,text:e.$vuetify.lang.t("$vuetify.pages.instances.table.headers.4"),width:"15%"},{value:"expires_at",align:"start",sortable:!1,divider:!1,text:e.$vuetify.lang.t("$vuetify.pages.instances.table.headers.5"),width:"18%"},{value:"state",align:"center",sortable:!1,divider:!1,text:e.$vuetify.lang.t("$vuetify.pages.instances.table.headers.6"),width:"13%"}],e.tableLoading=!1,e.filterQuery="",e}return Object(u["a"])(a,[{key:"mounted",value:function(){_e.setItems([{title:this.$vuetify.lang.t("$vuetify.pages.instances.actions.add"),icon:"mdi-database-plus",action:function(){throw new Error("Not implemented")}}])}},{key:"beforeDestroy",value:function(){_e.clean()}},{key:"clearFilters",value:function(){this.filterQuery=""}},{key:"onOptionsChanged",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.tableOptions=t,this.tableLoading=!0,e.next=5,we.loadInstances({search:this.filterQuery,offset:(t.page-1)*t.itemsPerPage,limit:t.itemsPerPage});case 5:e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.error(e.t0);case 10:return e.prev=10,this.tableLoading=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onQueryChanged",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.tableLoading=!0,e.next=4,we.loadInstances({search:t,offset:0,limit:this.tableOptions.itemsPerPage});case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),console.error(e.t0);case 9:return e.prev=9,this.tableLoading=!1,e.finish(9);case 12:case"end":return e.stop()}}),e,this,[[0,6,9,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"tableItems",get:function(){return we.instances}},{key:"totalItems",get:function(){return we.totalInstances}},{key:"isClearFiltersButtonEnable",get:function(){return""!==this.filterQuery}}]),a}(v["c"]);Object(d["a"])([Object(v["d"])("filterQuery",{deep:!0})],je.prototype,"onQueryChanged",null),je=Object(d["a"])([Object(v["a"])({components:{SearchField:ie,FiltersContainer:ue,DataTable:ge}})],je);var xe=je,ke=xe,$e=a("cc20"),Se=a("ce7e"),Ce=a("132d"),Ie=Object(F["a"])(ke,Z,z,!1,null,null,null),Ve=Ie.exports;L()(Ie,{VBtn:P["a"],VChip:$e["a"],VContainer:Y["a"],VDivider:Se["a"],VIcon:Ce["a"],VSpacer:D["a"]});var Ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex flex-column align-center justify-space-around"},[e._m(0),a("div",{staticClass:"flex-grow-0 d-flex flex-column text-center"},[a("span",{staticClass:"text-h3 text-sm-h1 font-weight-light"},[e._v("404")]),a("span",{staticClass:"text-body-1 mt-2"},[e._v(e._s(e.$vuetify.lang.t("$vuetify.common.labels.page_not_found")))])]),a("div",{staticClass:"flex-grow-0"},[a("v-btn",{attrs:{color:"primary",to:"/"}},[a("v-icon",{staticClass:"mr-2"},[e._v("mdi-arrow-left")]),a("span",[e._v(e._s(e.$vuetify.lang.t("$vuetify.common.actions.return")))])],1)],1)])},Fe=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flex-grow-0"},[n("img",{attrs:{src:a("62a1"),width:"250px"}})])}],Re={},Le=Object(F["a"])(Re,Ee,Fe,!1,null,null,null),Pe=Le.exports;L()(Le,{VBtn:P["a"],VIcon:Ce["a"]}),r["a"].use(m["a"]);var Ne={name:"login",path:"/login",component:X},Ae={name:"instances",path:"/instances",alias:"/",component:Ve},Te={name:"users",path:"/users"},De={name:"licenses",path:"/licenses"},Ue={name:"bills",path:"/bills"},Ke={name:"plans",path:"/plans"},Be={name:"404",path:"*",component:Pe},Me=new m["a"]({mode:"history",base:"/timeflow-orchestrator-console/",routes:[Ne,Ae,Te,De,Ue,Ke,Be]});Me.beforeEach((function(e,t,a){return e.name===Ae.name&&e.path===Ae.alias?a({name:Ae.name}):a()}));var qe=Me,Qe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[e._v(e._s(e.profile?e.profile.full_name:"—"))]),a("v-list-item-subtitle",{staticClass:"mt-1"},[e._v(e._s(e.profile?e.$vuetify.lang.t("$vuetify.common.roles."+e.profile.role):"—"))]),a("v-btn",{staticClass:"mt-4",attrs:{color:"accent",text:"",rounded:""},on:{click:e.logout}},[e._v(e._s(e.$vuetify.lang.t("$vuetify.navigation.actions.logout")))])],1)],1)],1)},Je=[],Ye=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){return Object(l["a"])(this,a),t.apply(this,arguments)}return Object(u["a"])(a,[{key:"logout",value:function(){C.logout()}},{key:"profile",get:function(){return C.profile}}]),a}(v["c"]);Ye=Object(d["a"])([v["a"]],Ye);var We=Ye,He=We,Xe=a("da13"),Ze=a("5d23"),ze=Object(F["a"])(He,Qe,Je,!1,null,null,null),Ge=ze.exports;L()(ze,{VBtn:P["a"],VListItem:Xe["a"],VListItemContent:Ze["a"],VListItemSubtitle:Ze["b"],VListItemTitle:Ze["c"]});var et=function(e){Object(p["a"])(a,e);var t=Object(f["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.isNavigationDrawerShow=!1,e.menu=[Object(c["a"])(Object(c["a"])({},Ae),{},{icon:"mdi-database"}),Object(c["a"])(Object(c["a"])({},Te),{},{icon:"mdi-account-multiple"}),Object(c["a"])(Object(c["a"])({},De),{},{icon:"mdi-clipboard-text-outline"}),Object(c["a"])(Object(c["a"])({},Ue),{},{icon:"mdi-file-document-edit-outline"}),Object(c["a"])(Object(c["a"])({},Ke),{},{icon:"mdi-format-list-numbered"})],e}return Object(u["a"])(a,[{key:"created",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.load();case 3:C.isAuth||this.$route.name===Ne.name||this.$router.replace({name:Ne.name}),e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.$router.replace({name:Ne.name});case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"mounted",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:document.title=this.$vuetify.lang.t("$vuetify.head.title.".concat(this.$route.name)),this.$router.beforeEach((function(e,a,n){document.title=t.$vuetify.lang.t("$vuetify.head.title.".concat(e.name)),n()}));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onLoginStateChanged",value:function(e){e||(this.isNavigationDrawerShow=!1,this.$router.replace({name:Ne.name}))}},{key:"isAppbarProgress",get:function(){return!1}},{key:"hasShowUi",get:function(){switch(this.$route.name){case Ae.name:case Te.name:case De.name:case Ue.name:case Ke.name:return!0;default:return!1}}},{key:"appbarMenu",get:function(){return _e.items}},{key:"isAppbarMenuShow",get:function(){return _e.isShow}},{key:"isAuth",get:function(){return C.isAuth}}]),a}(v["c"]);Object(d["a"])([Object(v["d"])("isAuth")],et.prototype,"onLoginStateChanged",null),et=Object(d["a"])([Object(v["a"])({components:{NavigationDrawerUserCard:Ge}})],et);var tt=et,at=tt,nt=(a("6b97"),a("7496")),rt=a("40dc"),it=a("5bc1"),ot=a("553a"),st=a("8860"),ct=a("34c3"),lt=a("f6c4"),ut=a("f774"),pt=a("2a7f"),ft=Object(F["a"])(at,i,o,!1,null,null,null),dt=ft.exports;L()(ft,{VApp:nt["a"],VAppBar:rt["a"],VAppBarNavIcon:it["a"],VBtn:P["a"],VDivider:Se["a"],VFooter:ot["a"],VIcon:Ce["a"],VList:st["a"],VListItem:Xe["a"],VListItemContent:Ze["a"],VListItemIcon:ct["a"],VListItemTitle:Ze["c"],VMain:lt["a"],VNavigationDrawer:ut["a"],VSpacer:D["a"],VToolbarTitle:pt["a"]});a("5363");var vt=a("f309"),mt=a("fcf4"),ht=a("7704"),bt=a("0879"),gt=a("4b41");r["a"].use(vt["a"]);var yt=new vt["a"]({theme:{options:{customProperties:!0},themes:{light:{primary:"#2358a3",secondary:"#ed2527",accent:mt["a"].deepPurple.lighten2,error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",toolbar_border:mt["a"].grey.lighten2}}},lang:{locales:{ru:Object(c["a"])(Object(c["a"])({},ht),bt["a"]),en:Object(c["a"])({},gt["a"])},current:"ru"}});r["a"].config.productionTip=!1,new r["a"]({router:qe,store:j,vuetify:yt,render:function(e){return e(dt)}}).$mount("#app")},ffa9:function(e,t,a){"use strict";a("6d66")}});
//# sourceMappingURL=app.dcd81f0e.js.map