import{K as r,Q as i}from"./index-yW_oyohi.js";import{a as s}from"./axios-G2rPRu76.js";var c={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"taiwang",VITE_MAP:"AIzaSyB8xClOZxLQMzkbq6jjN2KlrBmFPPJkvEA",BASE_URL:"/taiwang-demo/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API:a,VITE_APIPATH:e}=c,p=r("productStore",{state:()=>({products:[],productDetail:{},sellProducts:[],isLoading:!1}),actions:{getProducts(){this.isLoading=!0,s.get(`${a}/api/${e}/products/all`).then(t=>{this.products=t.data.products,this.sellProducts=this.products.filter(o=>o.hot),this.isLoading=!1}).catch(t=>{console.log(t)})},getProduct(t){i.push(`/products/${t}`),this.isLoading=!0,s.get(`${a}/api/${e}/product/${t}`).then(o=>{this.productDetail=o.data.product,this.isLoading=!1}).catch(o=>{console.log(o)})}}});export{p};
