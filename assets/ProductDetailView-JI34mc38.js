import{_ as D,a as b,m as C,h as _,o as i,c as l,i as h,b as t,j as v,t as c,F as p,r as u,e as d,f as S,v as x,l as L,k as q,w as m,d as N,p as U,g as V}from"./index-E4fMwN8A.js";import{p as f}from"./productStore-I3Rsrbl8.js";import{c as I}from"./cartStore-xrlW9SI9.js";import{S as P}from"./SwiperComponent-wnFDdX1H.js";import{L as F}from"./LoadingComponent-Amubra46.js";import"./axios-G2rPRu76.js";import"./sweetalert-dGW7rouE.js";import"./sweetalert2.all-E70uNWBI.js";const j={components:{SwiperComponent:P,LoadingComponent:F},data(){return{qty:1,filterData:[]}},methods:{...b(f,["getProduct","getProducts"]),...b(I,["addCart"]),showImage(s){this.productDetail.imageUrl=this.productDetail.imagesUrl[s]},getFilterData(){this.filterData=this.products.filter(s=>s.category===this.productDetail.category)}},computed:{...C(f,["products","productDetail","isLoading"])},watch:{products:{handler(){this.getFilterData()}},productDetail:{handler(){this.getFilterData()}}},created(){this.getProducts(),this.getProduct(this.$route.params.id)}},r=s=>(U("data-v-2efe3240"),s=s(),V(),s),B={class:"py-72 py-lg-90"},T={class:"container"},$={"aria-label":"breadcrumb",class:"mb-24"},z={class:"breadcrumb mb-0"},M={class:"breadcrumb-item"},R={class:"breadcrumb-item"},A={class:"breadcrumb-item active","aria-current":"page"},E={class:"row flex-column flex-lg-row gy-48 gy-lg-0 mb-48"},G={class:"col-lg-6"},H=["src"],J={class:"d-flex"},K=["onClick"],O=["src"],Q={class:"col-lg-6"},W={class:"fw-bold mb-24"},X={class:"text-title d-inline-block position-relative z-1"},Y={class:"fs-6 mb-32"},Z={class:"text-gray mb-48 mb-lg-72"},tt={class:"text-gray"},st={key:0,class:"text-gray"},et={class:"fs-4"},ot={class:"fs-7"},it={class:"d-flex"},at={class:"input-group w-50 me-24"},lt=["disabled"],ct=r(()=>t("i",{class:"bi bi-dash"},null,-1)),nt=[ct],dt=r(()=>t("i",{class:"bi bi-plus"},null,-1)),rt=[dt],pt={class:"bg-wave py-24 mb-48"},_t={class:"container"},ht={class:"row gy-32 gy-lg-0"},ut={class:"col-lg-4"},mt=r(()=>t("h3",{class:"h5 fw-bold"},[t("i",{class:"bi bi-highlighter"}),d(" 注意事項")],-1)),gt={class:"ps-28"},bt={class:"mb-4"},vt=r(()=>t("li",{class:"mb-4"},"請注意是否會對餐點的食材過敏，謝謝",-1)),ft=q('<div class="col-lg-4" data-v-2efe3240><h3 class="h5 fw-bold" data-v-2efe3240><i class="bi bi-highlighter" data-v-2efe3240></i> 外送須知</h3><ul class="ps-28" data-v-2efe3240><li class="mb-4" data-v-2efe3240>截至2024/12/31止，每筆訂單皆免運費<br data-v-2efe3240>- 限制距離15km以內</li><li class="mb-4" data-v-2efe3240>最低消費滿 500 元，才享有外送服務</li><li class="mb-4" data-v-2efe3240>餐點現點現做，收到後請即時享用</li></ul></div><div class="col-lg-4" data-v-2efe3240><h3 class="h5 fw-bold" data-v-2efe3240><i class="bi bi-highlighter" data-v-2efe3240></i> 付款方式</h3><ul class="ps-28" data-v-2efe3240><li class="text-notoSans" data-v-2efe3240>線上訂餐僅接受信用卡信上付款</li></ul></div>',2),yt={class:"container"},kt=r(()=>t("h3",{class:"fw-bold mb-32 mb-lg-24"},[t("span",{class:"text-title d-inline-block position-relative z-1"},"還想要來點什麼嗎...")],-1)),wt={key:1,class:"col-9 col-md-11 mx-auto"},Dt={class:"row gy-48 gy-lg-0"},Ct={class:"card border-0"},St={class:"card-img-top card-img-overlay position-absolute top-0 w-100 d-flex justify-content-center align-items-center"},xt=["onClick"],Lt=r(()=>t("i",{class:"bi bi-search fs-1 text-light"},null,-1)),qt=[Lt],Nt=["src","alt"],Ut={class:"card-body"},Vt={class:"fs-5 text-center"},It={class:"text-center text-danger fw-bold fs-6 mb-20"},Pt={class:"text-notoSans"},Ft={class:"text-center"},jt=["onClick"];function Bt(s,o,Tt,$t,a,y){const k=_("LoadingComponent"),g=_("RouterLink"),w=_("SwiperComponent");return i(),l(p,null,[h(k,{active:s.isLoading,"onUpdate:active":o[0]||(o[0]=e=>s.isLoading=e)},null,8,["active"]),t("div",B,[t("div",T,[t("nav",$,[t("ol",z,[t("li",M,[h(g,{to:"/",class:"link-gold"},{default:v(()=>[d("首頁")]),_:1})]),t("li",R,[h(g,{to:"/products",class:"link-gold"},{default:v(()=>[d("線上訂餐")]),_:1})]),t("li",A,c(s.productDetail.category),1)])]),t("div",E,[t("div",G,[t("img",{src:s.productDetail.imageUrl,alt:"主圖",class:"w-100 main-img mb-24"},null,8,H),t("div",J,[(i(!0),l(p,null,u(s.productDetail.imagesUrl,(e,n)=>(i(),l("a",{key:n,href:"#",onClick:m(zt=>y.showImage(n),["prevent"])},[t("img",{src:e,alt:"副圖",class:"sub-img me-16"},null,8,O)],8,K))),128))])]),t("div",Q,[t("h2",W,[t("span",X,c(s.productDetail.title),1)]),t("p",Y,c(s.productDetail.description),1),t("p",Z,[d("食材： "),(i(!0),l(p,null,u(s.productDetail.ingredient,(e,n)=>(i(),l(p,{key:"食材"+n},[t("span",tt,c(e),1),n<s.productDetail.ingredient.length-1?(i(),l("span",st,"、")):N("",!0)],64))),128))]),t("p",et,[d("NT$ "+c(s.productDetail.price)+" ",1),t("span",ot,"/ "+c(s.productDetail.unit),1)]),t("div",it,[t("div",at,[t("button",{class:"btn btn-secondary text-light d-flex justify-content-center align-items-center w-25",type:"button",onClick:o[1]||(o[1]=e=>a.qty--),disabled:a.qty<=1},nt,8,lt),S(t("input",{type:"text",class:"form-control text-center",min:"1","onUpdate:modelValue":o[2]||(o[2]=e=>a.qty=e),readonly:""},null,512),[[x,a.qty,void 0,{number:!0}]]),t("button",{class:"btn btn-secondary text-light d-flex justify-content-center align-items-center w-25",type:"button",onClick:o[3]||(o[3]=e=>a.qty++)},rt)]),t("button",{class:"btn btn-outline-dark",onClick:o[4]||(o[4]=e=>s.addCart(s.productDetail.id,a.qty))},"加入購物車")])])])]),t("div",pt,[t("div",_t,[t("div",ht,[t("div",ut,[mt,t("ul",gt,[t("li",bt,c(s.productDetail.note),1),vt])]),ft])])]),t("div",yt,[kt,a.filterData.length>4?(i(),L(w,{key:0,products:a.filterData},null,8,["products"])):(i(),l("div",wt,[t("div",Dt,[(i(!0),l(p,null,u(a.filterData,e=>(i(),l("div",{class:"col-md-4 col-lg-3",key:e.id},[t("div",Ct,[t("div",St,[t("a",{href:"#",class:"stretched-link",onClick:m(n=>s.getProduct(e.id),["prevent"])},qt,8,xt)]),t("img",{src:e.imageUrl,class:"card-img-top card-img",alt:e.title},null,8,Nt),t("div",Ut,[t("h2",Vt,c(e.title),1),t("p",It,[d("NT$ "),t("span",Pt,c(e.price),1)]),t("div",Ft,[t("a",{href:"#",class:"btn btn-primary link-light",onClick:m(n=>s.addCart(e.id),["prevent"])},"加入購物車",8,jt)])])])]))),128))])]))])])],64)}const Ot=D(j,[["render",Bt],["__scopeId","data-v-2efe3240"]]);export{Ot as default};