import{o as x,c as F,d as B,t as A,i as P,a as D,b as ie,e as O,G as le,M as ne,D as oe,C as N,f as V,r as m,V as W,w as ae,W as ce,s as ue,R as de,g as me,P as pe,h as he,j as X,k as ve,l as fe,m as ge,S as Q,n as ye,H as be,p as Se,q as Z,u as xe,v as we,x as k,F as I,y as ee,z as T,A as _e,B as te,E as Ce}from"./vendor.eb97a757.js";const Me=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}};Me();var M=(t,o)=>{const e=t.__vccOpts||t;for(const[s,a]of o)e[s]=a;return e};const Fe={},ke={class:"text-5xl font-bold py-5",id:"navbar"};function De(t,o){return x(),F("header",ke,"Smoothie Shop")}var Ee=M(Fe,[["render",De]]);const $e=B({props:{smoothie:{type:Object,required:!0},coord:{type:Object,required:!0},index:{type:Number,required:!1}},setup(t){const o=A(t,"smoothie"),e=A(t,"coord"),s=A(t,"index"),a=P("webGlScene"),n=P("css3dScene");function d(){new le().load("./Smoothie.glb",g=>{let c=g.scene;c.traverse(h=>{h instanceof ne&&(h.name=o.value.name,h.material.side=oe)}),c.name=s.value.toString(),c.scale.set(.2,.2,.2),c.position.copy(e.value),a.add(c);let v=`<h1 class="text-2xl font-bold text-white p-1">${o.value.name}</h1>`;const r=new DOMParser().parseFromString(v,"text/html");r.body.style.background=new N(47849).getStyle();let p=new V(r.body);p.name="smoothie_"+o.value.name,p.position.copy(e.value),p.position.y-=.2;const i=.007;p.scale.set(i,i,i),p.updateMatrix(),n.add(p)})}D(async()=>{console.log("CARD: mounting"),d()}),ie(()=>{console.log("CARD: updating: ",o.value.index),d()}),O(()=>{console.log("CARD: unmounting: ",o.value.name)})}});function Le(t,o,e,s,a,n){return null}var Re=M($e,[["render",Le]]);const Ae=[{name:"Blue Moo",ingredients:[{name:"Milk",type:"Dairy"},{name:"Blueberries",type:"Fruit"}]},{name:"Blue No Moo",ingredients:[{name:"Oat Milk",type:"Non-Dairy"},{name:"Blueberries",type:"Fruit"}]},{name:"Blue",ingredients:[{name:"Blueberries",type:"Fruit"}]},{name:"Red",ingredients:[{name:"Blueberries",type:"Fruit"}]},{name:"Green",ingredients:[{name:"Blueberries",type:"Fruit"}]},{name:"Orange",ingredients:[{name:"Blueberries",type:"Fruit"}]},{name:"Purple",ingredients:[{name:"Blueberries",type:"Fruit"}]},{name:"Raspberry",ingredients:[{name:"Blueberries",type:"Fruit"}]},{name:"Gold",ingredients:[{name:"Blueberries",type:"Fruit"}]},{name:"Silver",ingredients:[{name:"Blueberries",type:"Fruit"}]}],Ie=[{name:"Milk",type:"Dairy"},{name:"Yogurt",type:"Dairy"},{name:"Oat Milk",type:"Non-Dairy"},{name:"Almond Milk",type:"Non-Dairy"},{name:"Cashew Milk",type:"Non-Dairy"},{name:"Hemp Milk",type:"Non-Dairy"},{name:"Blueberries",type:"Fruit"},{name:"Strawberies",type:"Fruit"},{name:"Raspberries",type:"Fruit"},{name:"Banana",type:"Fruit"},{name:"Apple",type:"Fruit"},{name:"Mango",type:"Fruit"},{name:"Avocado",type:"Fruit"},{name:"Spinach",type:"Vegetable"},{name:"Kale",type:"Vegetable"},{name:"Chia Seeds",type:"Add-on"},{name:"Spirulina",type:"Add-on"},{name:"Cacao",type:"Add-on"}];async function Pe(){return Ae}async function Be(){return Ie}const Oe=B({emits:["addSmoothie"],setup(t,{emit:o}){const e=P("css3dScene"),s=m([]),a=m(""),n=m({}),d=-2.7,u=0,g=1;async function c(){s.value=await Be();let i=m("");for(let y of s.value){let w=String.raw`<div class="w-full px-3">
                        <input  id="${y.name}"
                                type="checkbox" 
                                class="form-checkbox h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                        >
                        <span for="${y.name}" class="form-label inline-block ml-2">${y.name}</span>
                    </div>`;i.value+=w}a.value=`<h1 class="text-2xl font-bold text-smoothie-blue">New Smoothie</h1>
                <div class="justify-center flex text-white">
                    <form class="max-w-xs" id="smoothie-form">
                        <label class="items-center my-2">
                            <span for="name" class="text-white font-semibold">Smoothie Name: </span>
                            <input type="text" class="mt-1 block w-md text-black text-center px-5" id="name">
                        </label>
                        <span class="text-smoothie-blue font-semibold">Ingredients:</span>
                        <label class="items-center">`+i.value+`</label>
                        <button type="button"
                                class="bg-gray-300 hover:bg-smoothie-blue text-gray-800 hover:text-white font-bold py-2 px-4 my-2 rounded-l"
                        >
                            Add New Smoothie
                        </button>
                    </form>
                </div>`;const h=new DOMParser().parseFromString(a.value,"text/html");h.body.style.background=new N(0).getStyle(),n.value=new V(h.body),n.value.name="addForm",n.value.position.copy(new W(d,u,g));const f=.007;n.value.scale.set(f,f,f),n.value.element.addEventListener("mousedown",v,!0),e.add(n.value)}D(async()=>{c()}),O(()=>{var i;(i=n.value.parent)==null||i.remove(n.value),n.value.element.removeEventListener("click",v)});function v(i){var h,f;i.preventDefault(),i.target.type==="checkbox"?(i.stopImmediatePropagation(),(h=document.getElementById(i.target.id))==null||h.toggleAttribute("checked")):i.target.type==="text"?(i.stopImmediatePropagation(),(f=document.getElementById(i.target.id))==null||f.focus()):i.target.type==="button"&&(i.stopImmediatePropagation(),r(),p())}let r=()=>{const i={name:"",ingredients:[]};if(i.name=document.getElementById("name").value,s.value)for(let f of s.value)document.getElementById(f.name).checked&&i.ingredients.push(f);m(document.getElementById("smoothie-form")).value.reset(),o("addSmoothie",i)},p=()=>{for(let i of s.value)document.getElementById(i.name).checked=!1};return{handleClick:v,addFormInit:c}}});function Ne(t,o,e,s,a,n){return null}var qe=M(Oe,[["render",Ne]]);const ze=B({props:{smoothie:{type:Object,required:!0}},emits:["closeSelectedSmoothie","deleteSmoothie"],setup(t,{emit:o}){const e=A(t,"smoothie"),s=P("css3dScene");m([]);const a=m(""),n=m({}),d=-2.7,u=0,g=1;async function c(r){console.log("7");let p=m("");for(let f of r.ingredients){let y=String.raw`<div class="w-full px-3">                        
                        <span class="form-label ml-2">${f.name}</span>
                    </div>`;p.value+=y}a.value=`<h1 class="text-2xl font-bold text-smoothie-blue">Name: <span class="text-white">${r.name}</span></h1>
                <div class="justify-center flex text-white">
                    <h2 class="text-lg font-semibold text-smoothie-blue block">Ingredients: </h2>`+p.value+`</div>
                <button type="button"
                        class="bg-gray-300 hover:bg-red-600 text-gray-800 hover:text-white font-bold py-2 px-4 my-2 rounded-l">
                    DELETE SMOOTHIE
                </button>`;const i=new DOMParser().parseFromString(a.value,"text/html");i.body.style.background=new N(0).getStyle(),n.value=new V(i.body),n.value.position.copy(new W(d,u,g));const h=.007;n.value.scale.set(h,h,h),n.value.element.addEventListener("mousedown",v,!0),s.add(n.value)}ae(()=>e.value,r=>{c(r)}),D(async()=>{c(e.value)}),O(()=>{var r;console.log("Details unmounting"),(r=n.value.parent)==null||r.remove(n.value),n.value.element.removeEventListener("click",v)});function v(r){console.log("handling click in details display: ",r.target),r.preventDefault(),r.target.type==="button"&&(r.stopImmediatePropagation(),o("deleteSmoothie",e.value))}return{handleClick:v,detailsFormInit:c}}});function Ge(t,o,e,s,a,n){return null}var He=M(ze,[["render",Ge]]);function je(t,o){const e=new ce({antialias:!0});return e.setSize(t,o),e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.physicallyCorrectLights=!0,e.outputEncoding=ue,e.toneMapping=de,e.toneMappingExposure=12,e}function Te(t,o,e){const s=new me;return s.setSize(t,o),s.domElement.style.position="absolute",s.domElement.style.top=e+"px",s}function Ve(t,o,e){const a=o/e,n=.1,d=1500,u=new pe(50,a,n,d),g=0,c=0,v=8;return u.position.set(g,c,v),u.lookAt(0,0,0),u.updateProjectionMatrix(),u.name="perspCamera",u}function We(t,o){const e=m(new he(t,o));return t.type==="PerspectiveCamera"&&(e.value.enableDamping=!0,e.value.dampingFactor=.05,e.value.screenSpacePanning=!1,e.value.minDistance=.1,e.value.maxDistance=1e3,e.value.enableRotate=!0,e.value.enablePan=!0,e.value.minPolarAngle=X.degToRad(0),e.value.maxPolarAngle=X.degToRad(89)),e}function Ue(){const t=m(new ve),o=m(new fe);return{raycasterRef:t,mouseRef:o}}function Ke(t,o,e,s,a,n){const d=document.documentElement.clientHeight-e.value;t.value=document.documentElement.clientWidth,o.value=d;const u=t.value/o.value;s.aspect=u,s.updateProjectionMatrix(),a.setSize(t.value,o.value),n.setSize(t.value,o.value),a.setPixelRatio(Math.min(window.devicePixelRatio,2))}function Ye(t,o){t.addEventListener("mousemove",e=>{o.x=e.offsetX/t.clientWidth*2-1,o.y=-(e.offsetY/t.clientHeight)*2+1})}function Je(t,o,e,s,a,n){var g,c,v,r,p;t.preventDefault();let d=o.value.intersectObjects(e.children,!0),u=!0;if(d.length>0)for(const i of d){let h=(r=(v=(c=(g=i.object.parent)==null?void 0:g.parent)==null?void 0:c.parent)==null?void 0:v.parent)==null?void 0:r.parent;if(h&&h instanceof ge){a.value.length&&n(!u),(p=a.value)==null||p.push(s.value[parseInt(h.name)]);break}else n(u);d=[]}else n(u)}const Xe=B({components:{SmoothieCard:Re,AddSmoothieForm:qe,SmoothieDetails:He},setup(){var Y;const t=m([]),o=m([]),e=m(0),s=m([]),a=m(),n=m(),d=m(),u=m(!0),g=l=>{t.value.push(l),console.log("adding smoothie!",t.value),$(),n.value.addFormInit()};function c(l){u.value=l,s.value.length=0}const v=l=>{u.value=!0,console.log("LIST: deleted Smoothie: ",l);let b=t.value.indexOf(l);console.log("LIST: smoothieList after delete: ",t.value),G(),t.value.splice(b,1),$()},r=new Q;r.background=new N(2236962);const p=new Q,i=new ye("#0033cc",5);r.add(i);const h=new be(794779,794779,1);r.add(h);const f=m(document.querySelector("#navbar")?(Y=document.querySelector("#navbar"))==null?void 0:Y.clientHeight:0),y=m(document.documentElement.clientWidth),w=m(document.documentElement.clientHeight-f.value),E=je(y.value,w.value),S=Te(y.value,w.value,f.value),_=Se(Ve(e.value,y.value,w.value)),re=We(_,S.domElement),{raycasterRef:q,mouseRef:z}=Ue();q.value.setFromCamera(z.value,_);function se(l){u.value=!1,Je(l,q,r,t,s,c)}S.domElement.addEventListener("click",se,!0);function G(){for(let l=r.children.length-1;l>=0;l--)(r.children[l].type==="Group"||r.children[l].name.includes("shopWall"))&&r.remove(r.children[l]);for(let l=p.children.length-1;l>=0;l--)p.children[l].name.includes("smoothie")&&p.remove(p.children[l])}function $(){for(let L of t.value)L.index=t.value.indexOf(L);e.value=Math.round(Math.sqrt(t.value.length));let l=new xe(e.value*2,e.value*2),b=new we({color:11574369,side:oe}),C=new ne(l,b);C.name="shopWall",C.position.z=-5,r.add(C),o.value.length=0,o.value=t.value.map(L=>{let R,H,J;R=H=J=0;const j=t.value.indexOf(L);return console.log("gridsize: ",e.value),e.value>1?(R=j%e.value-Math.ceil(e.value/2)/2,H=Math.floor(j/e.value)-e.value/2):e.value===1&&(R=(j+1)/e.value-e.value*1.5),new W(R,H,J)}),console.log("listInit points: ",o.value)}ae(()=>e.value,l=>{G(),$()});const U=()=>{re.value.update(),q.value.setFromCamera(z.value,_),E.render(r,_),S.render(p,_),window.requestAnimationFrame(U)};function K(){Ke(y,w,f,_,E,S)}return Z("webGlScene",r),Z("css3dScene",p),D(async()=>{var l,b,C;t.value=window.localStorage.getItem("smoothies")&&typeof window.localStorage.getItem("smoothies")=="string"?JSON.parse(window.localStorage.getItem("smoothies")):await Pe(),f.value=document.querySelector("#navbar")?(l=document.querySelector("#navbar"))==null?void 0:l.clientHeight:0,(b=document.querySelector("#app"))==null||b.append(E.domElement),S.domElement.id="css3DRenderer",(C=document.querySelector("#app"))==null||C.append(S.domElement),Ye(S.domElement,z.value),window.addEventListener("resize",K,!0),$(),U()}),O(()=>{var l,b;(l=document.querySelector("#app"))==null||l.removeChild(E.domElement),(b=document.querySelector("#app"))==null||b.removeChild(S.domElement),window.removeEventListener("resize",K,!0),G()}),{smoothieList:t,smoothiePoints:o,onAddSmoothie:g,onClearSelectedSmoothie:c,onDeleteSmoothie:v,selectedSmoothies:s,card:a,addForm:n,details:d,addMode:u,scene:r,css3dScene:p}}});function Qe(t,o,e,s,a,n){const d=k("SmoothieCard"),u=k("AddSmoothieForm"),g=k("SmoothieDetails");return x(),F(I,null,[(x(!0),F(I,null,ee(t.smoothieList,c=>(x(),T(d,{key:c.index,smoothie:c,index:c.index,coord:t.smoothiePoints[t.smoothieList.indexOf(c)],ref_for:!0,ref:"card"},null,8,["smoothie","index","coord"]))),128)),t.addMode?(x(),T(u,{key:0,onAddSmoothie:t.onAddSmoothie,ref:"addForm"},null,8,["onAddSmoothie"])):_e("",!0),(x(!0),F(I,null,ee(t.selectedSmoothies,(c,v)=>(x(),T(g,{key:c.name,smoothie:c,onCloseSelectedSmoothie:t.onClearSelectedSmoothie,onDeleteSmoothie:t.onDeleteSmoothie,ref_for:!0,ref:"details"},null,8,["smoothie","onCloseSelectedSmoothie","onDeleteSmoothie"]))),128))],64)}var Ze=M(Xe,[["render",Qe]]);const et={components:{Navbar:Ee,SmoothieList:Ze},setup(){D(()=>{console.log("smoothie shop is open!")})}};function tt(t,o,e,s,a,n){const d=k("Navbar"),u=k("SmoothieList");return x(),F(I,null,[te(d),te(u)],64)}var nt=M(et,[["render",tt]]);Ce(nt).mount("#app");
