(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-626f345c"],{"04d1":function(t,e,r){var n=r("342f"),o=n.match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},"1c33":function(t,e,r){"use strict";r("e9c4"),r("caad"),r("2532"),r("a434");var n=r("cfb9");e["a"]={data:function(){return{myFavorite:this.getLocalStorage()||[]}},methods:{saveLocalStorage:function(t){var e=JSON.stringify(t);localStorage.setItem("customFavorite",e)},getLocalStorage:function(){return JSON.parse(localStorage.getItem("customFavorite"))},updateMyFavorite:function(t){this.myFavorite.includes(t)?(this.myFavorite.splice(this.myFavorite.indexOf(t),1),this.$swal({toast:!0,position:"bottom-end",icon:"success",title:"Item removed from your fav!",showConfirmButton:!1,showCloseButton:!0,iconColor:"#FFBCAA",timer:3e3})):(this.myFavorite.push(t),this.$swal({toast:!0,position:"bottom-end",icon:"success",title:"Item added to your fav!",showConfirmButton:!1,showCloseButton:!0,iconColor:"#e8584d",timer:3e3})),this.saveLocalStorage(this.myFavorite),n["a"].emit("update-favorite")}},mounted:function(){var t=this;n["a"].on("update-favorite",(function(){t.myFavorite=t.getLocalStorage()}))}}},2532:function(t,e,r){"use strict";var n=r("23e7"),o=r("e330"),i=r("5a34"),a=r("1d80"),c=r("577e"),s=r("ab13"),u=o("".indexOf);n({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~u(c(a(this)),c(i(t)),arguments.length>1?arguments[1]:void 0)}})},"497d":function(t,e,r){"use strict";r("c0fb")},"4e82":function(t,e,r){"use strict";var n=r("23e7"),o=r("e330"),i=r("59ed"),a=r("7b0b"),c=r("07fa"),s=r("577e"),u=r("d039"),d=r("addb"),l=r("a640"),f=r("04d1"),h=r("d998"),v=r("2d00"),p=r("512c"),b=[],g=o(b.sort),m=o(b.push),w=u((function(){b.sort(void 0)})),O=u((function(){b.sort(null)})),y=l("sort"),x=!u((function(){if(v)return v<70;if(!(f&&f>3)){if(h)return!0;if(p)return p<603;var t,e,r,n,o="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:r=3;break;case 68:case 71:r=4;break;default:r=2}for(n=0;n<47;n++)b.push({k:e+n,v:r})}for(b.sort((function(t,e){return e.v-t.v})),n=0;n<b.length;n++)e=b[n].k.charAt(0),o.charAt(o.length-1)!==e&&(o+=e);return"DGBEFHACIJK"!==o}})),j=w||!O||!y||!x,k=function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:s(e)>s(r)?1:-1}};n({target:"Array",proto:!0,forced:j},{sort:function(t){void 0!==t&&i(t);var e=a(this);if(x)return void 0===t?g(e):g(e,t);var r,n,o=[],s=c(e);for(n=0;n<s;n++)n in e&&m(o,e[n]);d(o,k(t)),r=o.length,n=0;while(n<r)e[n]=o[n++];while(n<s)delete e[n++];return e}})},"4fad":function(t,e,r){var n=r("d039"),o=r("861d"),i=r("c6b6"),a=r("d86b"),c=Object.isExtensible,s=n((function(){c(1)}));t.exports=s||a?function(t){return!!o(t)&&((!a||"ArrayBuffer"!=i(t))&&(!c||c(t)))}:c},"512c":function(t,e,r){var n=r("342f"),o=n.match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},"5a34":function(t,e,r){var n=r("da84"),o=r("44e7"),i=n.TypeError;t.exports=function(t){if(o(t))throw i("The method doesn't accept regular expressions");return t}},6062:function(t,e,r){"use strict";var n=r("6d61"),o=r("6566");n("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),o)},6566:function(t,e,r){"use strict";var n=r("9bf2").f,o=r("7c73"),i=r("e2cc"),a=r("0366"),c=r("19aa"),s=r("2266"),u=r("7dd0"),d=r("2626"),l=r("83ab"),f=r("f183").fastKey,h=r("69f3"),v=h.set,p=h.getterFor;t.exports={getConstructor:function(t,e,r,u){var d=t((function(t,n){c(t,h),v(t,{type:e,index:o(null),first:void 0,last:void 0,size:0}),l||(t.size=0),void 0!=n&&s(n,t[u],{that:t,AS_ENTRIES:r})})),h=d.prototype,b=p(e),g=function(t,e,r){var n,o,i=b(t),a=m(t,e);return a?a.value=r:(i.last=a={index:o=f(e,!0),key:e,value:r,previous:n=i.last,next:void 0,removed:!1},i.first||(i.first=a),n&&(n.next=a),l?i.size++:t.size++,"F"!==o&&(i.index[o]=a)),t},m=function(t,e){var r,n=b(t),o=f(e);if("F"!==o)return n.index[o];for(r=n.first;r;r=r.next)if(r.key==e)return r};return i(h,{clear:function(){var t=this,e=b(t),r=e.index,n=e.first;while(n)n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete r[n.index],n=n.next;e.first=e.last=void 0,l?e.size=0:t.size=0},delete:function(t){var e=this,r=b(e),n=m(e,t);if(n){var o=n.next,i=n.previous;delete r.index[n.index],n.removed=!0,i&&(i.next=o),o&&(o.previous=i),r.first==n&&(r.first=o),r.last==n&&(r.last=i),l?r.size--:e.size--}return!!n},forEach:function(t){var e,r=b(this),n=a(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:r.first){n(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!m(this,t)}}),i(h,r?{get:function(t){var e=m(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),l&&n(h,"size",{get:function(){return b(this).size}}),d},setStrong:function(t,e,r){var n=e+" Iterator",o=p(e),i=p(n);u(t,e,(function(t,e){v(this,{type:n,target:t,state:o(t),kind:e,last:void 0})}),(function(){var t=i(this),e=t.kind,r=t.last;while(r&&r.removed)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==e?{value:r.key,done:!1}:"values"==e?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),d(e)}}},"6d61":function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("e330"),a=r("94ca"),c=r("6eeb"),s=r("f183"),u=r("2266"),d=r("19aa"),l=r("1626"),f=r("861d"),h=r("d039"),v=r("1c7e"),p=r("d44e"),b=r("7156");t.exports=function(t,e,r){var g=-1!==t.indexOf("Map"),m=-1!==t.indexOf("Weak"),w=g?"set":"add",O=o[t],y=O&&O.prototype,x=O,j={},k=function(t){var e=i(y[t]);c(y,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(m&&!f(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return m&&!f(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(m&&!f(t))&&e(this,0===t?0:t)}:function(t,r){return e(this,0===t?0:t,r),this})},C=a(t,!l(O)||!(m||y.forEach&&!h((function(){(new O).entries().next()}))));if(C)x=r.getConstructor(e,t,g,w),s.enable();else if(a(t,!0)){var A=new x,F=A[w](m?{}:-0,1)!=A,S=h((function(){A.has(1)})),I=v((function(t){new O(t)})),B=!m&&h((function(){var t=new O,e=5;while(e--)t[w](e,e);return!t.has(-0)}));I||(x=e((function(t,e){d(t,y);var r=b(new O,t,x);return void 0!=e&&u(e,r[w],{that:r,AS_ENTRIES:g}),r})),x.prototype=y,y.constructor=x),(S||B)&&(k("delete"),k("has"),g&&k("get")),(B||F)&&k(w),m&&y.clear&&delete y.clear}return j[t]=x,n({global:!0,forced:x!=O},j),p(x,t),m||r.setStrong(x,t,g),x}},7156:function(t,e,r){var n=r("1626"),o=r("861d"),i=r("d2bb");t.exports=function(t,e,r){var a,c;return i&&n(a=e.constructor)&&a!==r&&o(c=a.prototype)&&c!==r.prototype&&i(t,c),t}},a434:function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("23cb"),a=r("5926"),c=r("07fa"),s=r("7b0b"),u=r("65f0"),d=r("8418"),l=r("1dde"),f=l("splice"),h=o.TypeError,v=Math.max,p=Math.min,b=9007199254740991,g="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var r,n,o,l,f,m,w=s(this),O=c(w),y=i(t,O),x=arguments.length;if(0===x?r=n=0:1===x?(r=0,n=O-y):(r=x-2,n=p(v(a(e),0),O-y)),O+r-n>b)throw h(g);for(o=u(w,n),l=0;l<n;l++)f=y+l,f in w&&d(o,l,w[f]);if(o.length=n,r<n){for(l=y;l<O-n;l++)f=l+n,m=l+r,f in w?w[m]=w[f]:delete w[m];for(l=O;l>O-n+r;l--)delete w[l-1]}else if(r>n)for(l=O-n;l>y;l--)f=l+n-1,m=l+r-1,f in w?w[m]=w[f]:delete w[m];for(l=0;l<r;l++)w[l+y]=arguments[l+2];return w.length=O-n+r,o}})},ab13:function(t,e,r){var n=r("b622"),o=n("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[o]=!1,"/./"[t](e)}catch(n){}}return!1}},addb:function(t,e,r){var n=r("4dae"),o=Math.floor,i=function(t,e){var r=t.length,s=o(r/2);return r<8?a(t,e):c(t,i(n(t,0,s),e),i(n(t,s),e),e)},a=function(t,e){var r,n,o=t.length,i=1;while(i<o){n=i,r=t[i];while(n&&e(t[n-1],r)>0)t[n]=t[--n];n!==i++&&(t[n]=r)}return t},c=function(t,e,r,n){var o=e.length,i=r.length,a=0,c=0;while(a<o||c<i)t[a+c]=a<o&&c<i?n(e[a],r[c])<=0?e[a++]:r[c++]:a<o?e[a++]:r[c++];return t};t.exports=i},bb2f:function(t,e,r){var n=r("d039");t.exports=!n((function(){return Object.isExtensible(Object.preventExtensions({}))}))},c0fb:function(t,e,r){},c995:function(t,e,r){"use strict";r("a4d3"),r("e01a");var n=r("7a23"),o=r("aba8"),i=r.n(o),a={class:"container-fluid px-5 px-lg-8",id:"cardList"},c={class:"mt-8 text-center text-gray-200 h1"},s=Object(n["j"])("Title"),u={class:"row row-cols-1 row-cols-lg-3 g-5 mt-3"},d=["src","alt"],l={class:"cardTitle fs-2"},f={class:"d-flex mt-3"},h=Object(n["h"])("img",{src:i.a,alt:"ethMark",class:"inline-block me-3"},null,-1),v={class:"text-primary fs-4 ff-mont"},p={class:"text-gray-400 fs-7 mt-3 fw-light"},b={class:"d-flex mt-3"},g=Object(n["h"])("span",{class:"material-icons-outlined mt-2"}," info ",-1),m=["onClick","disabled"],w=Object(n["h"])("span",{class:"material-icons-outlined mt-2"}," favorite_border ",-1),O=[w],y=["onClick","disabled"],x={key:0,class:"spinner-grow spinner-grow-sm"},j={key:1,class:"material-icons-outlined mt-2"};function k(t,e,r,o,i,w){var k=Object(n["K"])("Loading"),C=Object(n["K"])("NavbarProducts"),A=Object(n["K"])("router-link"),F=Object(n["K"])("Atropos");return Object(n["A"])(),Object(n["g"])("div",a,[Object(n["k"])(k,{active:i.loadingOverlay},null,8,["active"]),Object(n["h"])("h2",c,[Object(n["J"])(t.$slots,"title",{},(function(){return[s]}))]),i.showNavbarProducts?(Object(n["A"])(),Object(n["e"])(C,{key:0,categories:i.categories,onEmitAllView:w.getProducts,onEmitFilteredView:w.getFilteredProducts},null,8,["categories","onEmitAllView","onEmitFilteredView"])):Object(n["f"])("",!0),Object(n["h"])("div",u,[(Object(n["A"])(!0),Object(n["g"])(n["a"],null,Object(n["I"])(i.products,(function(e){return Object(n["A"])(),Object(n["g"])("div",{class:"col text-gray-200",key:e.id},[Object(n["k"])(F,{class:"my-atropos","active-offset":40,shadow:!1,highlight:!1,"shadow-scale":1.05,rotateXMax:20,rotateYMax:20},{default:Object(n["Y"])((function(){return[Object(n["k"])(A,{to:"/product/".concat(e.id)},{default:Object(n["Y"])((function(){return[Object(n["h"])("img",{src:e.imageUrl,"data-atropos-offset":"-5",class:"w-100",alt:e.title},null,8,d),Object(n["h"])("h3",l,Object(n["N"])(e.title),1)]})),_:2},1032,["to"])]})),_:2},1032,["shadow-scale"]),Object(n["h"])("p",f,[h,Object(n["h"])("span",v,Object(n["N"])(e.price)+" "+Object(n["N"])(e.unit),1)]),Object(n["h"])("p",p,Object(n["N"])(e.description),1),Object(n["h"])("div",b,[Object(n["k"])(A,{href:"#",class:"btn btn-outline-secondary me-3 rounded-pill px-4 fw-light",to:"/product/".concat(e.id)},{default:Object(n["Y"])((function(){return[g]})),_:2},1032,["to"]),Object(n["h"])("button",{class:"btn btn-outline-secondary rounded-pill px-4 fw-light me-3",type:"button",onClick:function(r){return t.updateMyFavorite(e.id)},disabled:i.isLoadingItem===e.id},O,8,m),Object(n["h"])("button",{class:"btn btn-outline-primary rounded-pill px-4 fw-light w-btn-sm",type:"button",onClick:function(t){return w.addToCart(e.id)},disabled:i.isLoadingItem===e.id},[i.isLoadingItem===e.id?(Object(n["A"])(),Object(n["g"])("span",x)):(Object(n["A"])(),Object(n["g"])("span",j," shopping_cart "))],8,y)])])})),128))])])}r("99af"),r("4e82"),r("d81d"),r("d3b7"),r("6062"),r("3ca3"),r("ddb0");var C=r("da76"),A=r("cfb9"),F=r("1c33"),S=(r("e9c4"),{class:"navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom mt-8"}),I={class:"navbar-nav flex-row overflow-auto navbar-custom-scroll"},B=["onClick"];function E(t,e,r,o,i,a){return Object(n["A"])(),Object(n["g"])("nav",S,[Object(n["h"])("div",I,[Object(n["h"])("a",{class:"nav-item nav-link text-nowrap px-4 link-white",href:"#",onClick:e[0]||(e[0]=Object(n["ab"])((function(){return a.emitAllView&&a.emitAllView.apply(a,arguments)}),["prevent"]))},"All"),(Object(n["A"])(!0),Object(n["g"])(n["a"],null,Object(n["I"])(i.tempCategories,(function(t,e){return Object(n["A"])(),Object(n["g"])("a",{class:"nav-item nav-link text-nowrap px-4 link-white",href:"#",key:JSON.stringify(t-e),onClick:Object(n["ab"])((function(e){return a.emitFilteredView(t)}),["prevent"])},Object(n["N"])(t),9,B)})),128))])])}var N={props:["categories"],data:function(){return{tempCategories:[]}},watch:{categories:function(){this.tempCategories=this.categories}},methods:{emitAllView:function(){this.$emit("emitAllView")},emitFilteredView:function(t){this.$emit("emitFilteredView",t)}}},P=r("6b0d"),L=r.n(P);const $=L()(N,[["render",E]]);var D=$,z={props:["product-query"],data:function(){return{allProducts:[],products:[],categories:[],showNavbarProducts:!1,isLoadingItem:"",loadingOverlay:!1}},components:{Atropos:C["a"],NavbarProducts:D},mixins:[F["a"]],methods:{getProducts:function(){var t=this;this.loadingOverlay=!0,this.$http.get("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("filter118","/products")).then((function(e){t.products=e.data.products.sort((function(t,e){return t.price-e.price})),t.getCategories(),t.loadingOverlay=!1})).catch((function(e){t.loadingOverlay=!1,t.$swal({toast:!0,position:"bottom-end",icon:"error",title:e.response.data.message,showConfirmButton:!1,showCloseButton:!0,iconColor:"#e8584d",timer:3e4})}))},getFilteredProducts:function(t){var e=this;this.loadingOverlay=!0,this.$http.get("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("filter118","/products?category=").concat(t)).then((function(r){e.products=r.data.products.sort((function(t,e){return t.price-e.price})),console.log("getFilteredProducts",t),e.loadingOverlay=!1})).catch((function(t){e.loadingOverlay=!1,e.$swal({toast:!0,position:"bottom-end",icon:"error",title:t.response.data.message,showConfirmButton:!1,showCloseButton:!0,iconColor:"#e8584d",timer:3e4})}))},getCategories:function(){var t=this.products.map((function(t){return t.category}));this.categories=new Set(t)},addToCart:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.isLoadingItem=t;var n={data:{product_id:t,qty:r}};this.$http.post("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("filter118","/cart"),n).then((function(t){e.$swal({toast:!0,position:"bottom-end",icon:"success",title:t.data.message,showConfirmButton:!1,showCloseButton:!0,iconColor:"#FFBCAA",timer:3e3}),A["a"].emit("get-cart"),e.isLoadingItem=""})).catch((function(t){e.$swal({toast:!0,position:"bottom-end",icon:"error",title:t.response.data.message,showConfirmButton:!1,showCloseButton:!0,iconColor:"#e8584d",timer:3e4}),e.isLoadingItem=""}))}},mounted:function(){"ALL"===this.productQuery?(this.getProducts(),this.showNavbarProducts=!0):(this.getFilteredProducts(this.productQuery),this.showNavbarProducts=!1)}};r("497d");const M=L()(z,[["render",k]]);e["a"]=M},caad:function(t,e,r){"use strict";var n=r("23e7"),o=r("4d64").includes,i=r("44d2");n({target:"Array",proto:!0},{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},d81d:function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").map,i=r("1dde"),a=i("map");n({target:"Array",proto:!0,forced:!a},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},d86b:function(t,e,r){var n=r("d039");t.exports=n((function(){if("function"==typeof ArrayBuffer){var t=new ArrayBuffer(8);Object.isExtensible(t)&&Object.defineProperty(t,"a",{value:8})}}))},d998:function(t,e,r){var n=r("342f");t.exports=/MSIE|Trident/.test(n)},e9c4:function(t,e,r){var n=r("23e7"),o=r("da84"),i=r("d066"),a=r("2ba4"),c=r("e330"),s=r("d039"),u=o.Array,d=i("JSON","stringify"),l=c(/./.exec),f=c("".charAt),h=c("".charCodeAt),v=c("".replace),p=c(1..toString),b=/[\uD800-\uDFFF]/g,g=/^[\uD800-\uDBFF]$/,m=/^[\uDC00-\uDFFF]$/,w=function(t,e,r){var n=f(r,e-1),o=f(r,e+1);return l(g,t)&&!l(m,o)||l(m,t)&&!l(g,n)?"\\u"+p(h(t,0),16):t},O=s((function(){return'"\\udf06\\ud834"'!==d("\udf06\ud834")||'"\\udead"'!==d("\udead")}));d&&n({target:"JSON",stat:!0,forced:O},{stringify:function(t,e,r){for(var n=0,o=arguments.length,i=u(o);n<o;n++)i[n]=arguments[n];var c=a(d,null,i);return"string"==typeof c?v(c,b,w):c}})},f183:function(t,e,r){var n=r("23e7"),o=r("e330"),i=r("d012"),a=r("861d"),c=r("1a2d"),s=r("9bf2").f,u=r("241c"),d=r("057f"),l=r("4fad"),f=r("90e3"),h=r("bb2f"),v=!1,p=f("meta"),b=0,g=function(t){s(t,p,{value:{objectID:"O"+b++,weakData:{}}})},m=function(t,e){if(!a(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!c(t,p)){if(!l(t))return"F";if(!e)return"E";g(t)}return t[p].objectID},w=function(t,e){if(!c(t,p)){if(!l(t))return!0;if(!e)return!1;g(t)}return t[p].weakData},O=function(t){return h&&v&&l(t)&&!c(t,p)&&g(t),t},y=function(){x.enable=function(){},v=!0;var t=u.f,e=o([].splice),r={};r[p]=1,t(r).length&&(u.f=function(r){for(var n=t(r),o=0,i=n.length;o<i;o++)if(n[o]===p){e(n,o,1);break}return n},n({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:d.f}))},x=t.exports={enable:y,fastKey:m,getWeakData:w,onFreeze:O};i[p]=!0}}]);
//# sourceMappingURL=chunk-626f345c.fff2504f.js.map