var St=Object.defineProperty;var Kt=(t,e,i)=>e in t?St(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var yt=(t,e,i)=>(Kt(t,typeof e!="symbol"?e+"":e,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=i(r);fetch(r.href,l)}})();function Z(){}const Vt=t=>t;function jt(t,e){for(const i in e)t[i]=e[i];return t}function Tt(t){return t()}function zt(){return Object.create(null)}function tt(t){t.forEach(Tt)}function Qt(t){return typeof t=="function"}function lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let ot;function ct(t,e){return t===e?!0:(ot||(ot=document.createElement("a")),ot.href=e,t===ot.href)}function Wt(t){return Object.keys(t).length===0}function Jt(t,...e){if(t==null){for(const s of e)s(void 0);return Z}const i=t.subscribe(...e);return i.unsubscribe?()=>i.unsubscribe():i}function wt(t,e,i){t.$$.on_destroy.push(Jt(e,i))}function it(t,e,i){return t.set(i),e}const It=typeof window<"u";let Gt=It?()=>window.performance.now():()=>Date.now(),Rt=It?t=>requestAnimationFrame(t):Z;const L=new Set;function $t(t){L.forEach(e=>{e.c(t)||(L.delete(e),e.f())}),L.size!==0&&Rt($t)}function Bt(t){let e;return L.size===0&&Rt($t),{promise:new Promise(i=>{L.add(e={c:t,f:i})}),abort(){L.delete(e)}}}function p(t,e){t.appendChild(e)}function I(t,e,i){t.insertBefore(e,i||null)}function Y(t){t.parentNode&&t.parentNode.removeChild(t)}function Pt(t,e){for(let i=0;i<t.length;i+=1)t[i]&&t[i].d(e)}function d(t){return document.createElement(t)}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function O(t){return document.createTextNode(t)}function D(){return O(" ")}function st(t,e,i,s){return t.addEventListener(e,i,s),()=>t.removeEventListener(e,i,s)}function o(t,e,i){i==null?t.removeAttribute(e):t.getAttribute(e)!==i&&t.setAttribute(e,i)}function Lt(t){return Array.from(t.childNodes)}function P(t,e){e=""+e,t.data!==e&&(t.data=e)}function Mt(t,e){t.value=e??""}function bt(t,e,i,s){i==null?t.style.removeProperty(e):t.style.setProperty(e,i,s?"important":"")}let vt;function rt(t){vt=t}const B=[],qt=[];let X=[];const Nt=[],Xt=Promise.resolve();let gt=!1;function Ht(){gt||(gt=!0,Xt.then(Ut))}function kt(t){X.push(t)}const mt=new Set;let J=0;function Ut(){if(J!==0)return;const t=vt;do{try{for(;J<B.length;){const e=B[J];J++,rt(e),te(e.$$)}}catch(e){throw B.length=0,J=0,e}for(rt(null),B.length=0,J=0;qt.length;)qt.pop()();for(let e=0;e<X.length;e+=1){const i=X[e];mt.has(i)||(mt.add(i),i())}X.length=0}while(B.length);for(;Nt.length;)Nt.pop()();gt=!1,mt.clear(),rt(t)}function te(t){if(t.fragment!==null){t.update(),tt(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(kt)}}function ee(t){const e=[],i=[];X.forEach(s=>t.indexOf(s)===-1?e.push(s):i.push(s)),i.forEach(s=>s()),X=e}const nt=new Set;let V;function Ft(){V={r:0,c:[],p:V}}function Et(){V.r||tt(V.c),V=V.p}function S(t,e){t&&t.i&&(nt.delete(t),t.i(e))}function W(t,e,i,s){if(t&&t.o){if(nt.has(t))return;nt.add(t),V.c.push(()=>{nt.delete(t),s&&(i&&t.d(1),s())}),t.o(e)}else s&&s()}function Dt(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function xt(t){t&&t.c()}function ft(t,e,i){const{fragment:s,after_update:r}=t.$$;s&&s.m(e,i),kt(()=>{const l=t.$$.on_mount.map(Tt).filter(Qt);t.$$.on_destroy?t.$$.on_destroy.push(...l):tt(l),t.$$.on_mount=[]}),r.forEach(kt)}function ut(t,e){const i=t.$$;i.fragment!==null&&(ee(i.after_update),tt(i.on_destroy),i.fragment&&i.fragment.d(e),i.on_destroy=i.fragment=null,i.ctx=[])}function ie(t,e){t.$$.dirty[0]===-1&&(B.push(t),Ht(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function dt(t,e,i,s,r,l,n=null,f=[-1]){const c=vt;rt(t);const a=t.$$={fragment:null,ctx:[],props:l,update:Z,not_equal:r,bound:zt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:zt(),dirty:f,skip_bound:!1,root:e.target||c.$$.root};n&&n(a.root);let y=!1;if(a.ctx=i?i(t,e.props||{},(h,g,...u)=>{const _=u.length?u[0]:g;return a.ctx&&r(a.ctx[h],a.ctx[h]=_)&&(!a.skip_bound&&a.bound[h]&&a.bound[h](_),y&&ie(t,h)),g}):[],a.update(),y=!0,tt(a.before_update),a.fragment=s?s(a.ctx):!1,e.target){if(e.hydrate){const h=Lt(e.target);a.fragment&&a.fragment.l(h),h.forEach(Y)}else a.fragment&&a.fragment.c();e.intro&&S(t.$$.fragment),ft(t,e.target,e.anchor),Ut()}rt(c)}class ht{constructor(){yt(this,"$$");yt(this,"$$set")}$destroy(){ut(this,1),this.$destroy=Z}$on(e,i){if(!Qt(i))return Z;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(i),()=>{const r=s.indexOf(i);r!==-1&&s.splice(r,1)}}$set(e){this.$$set&&!Wt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const se="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(se);function re(t){let e,i,s,r,l,n,f,c,a,y,h,g,u,_;return{c(){e=d("div"),i=d("p"),i.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>
    fill-in to continue`,s=D(),r=d("div"),l=d("div"),n=d("input"),f=D(),c=d("button"),c.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline rounded-full"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"></path></svg>',a=D(),y=d("p"),y.textContent="copy your profile link from your spotify account page",h=D(),g=d("button"),g.textContent="continue",o(i,"class","text-2xl"),o(n,"type","text"),o(n,"class","w-full"),o(n,"placeholder","spotify profile link"),o(c,"class","bg-zinc-500"),o(l,"class","w-full flex flex-row items-center justify-center space-x-2"),o(y,"class","text-sm"),o(r,"class","flex flex-col items-center justify-center"),o(g,"class","hover:scale-110"),o(e,"class","flex flex-col items-center text-center justify-center bg-aodFg ring-2 ring-zinc-500 rounded-md w-11/12 py-5 space-y-7 px-5")},m(j,w){I(j,e,w),p(e,i),p(e,s),p(e,r),p(r,l),p(l,n),Mt(n,t[0]),p(l,f),p(l,c),p(r,a),p(r,y),p(e,h),p(e,g),u||(_=[st(n,"input",t[4]),st(c,"click",t[1]),st(g,"click",t[2])],u=!0)},p(j,[w]){w&1&&n.value!==j[0]&&Mt(n,j[0])},i:Z,o:Z,d(j){j&&Y(e),u=!1,tt(_)}}}function le(t,e,i){let{handleUsername:s}=e,r="";const l=async()=>{navigator.clipboard.readText&&i(0,r=await navigator.clipboard.readText())},n=()=>{let c;try{c=new URL(r)}catch{i(0,r="");return}const a=c.pathname.split("/")[2];s(a)};function f(){r=this.value,i(0,r)}return t.$$set=c=>{"handleUsername"in c&&i(3,s=c.handleUsername)},[r,l,n,s,f]}class oe extends ht{constructor(e){super(),dt(this,e,le,re,lt,{handleUsername:3})}}const G=[];function Ct(t,e=Z){let i;const s=new Set;function r(f){if(lt(t,f)&&(t=f,i)){const c=!G.length;for(const a of s)a[1](),G.push(a,t);if(c){for(let a=0;a<G.length;a+=2)G[a][0](G[a+1]);G.length=0}}}function l(f){r(f(t))}function n(f,c=Z){const a=[f,c];return s.add(a),s.size===1&&(i=e(r,l)||Z),f(t),()=>{s.delete(a),s.size===0&&i&&(i(),i=null)}}return{set:r,update:l,subscribe:n}}function Zt(t){return Object.prototype.toString.call(t)==="[object Date]"}function ne(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function _t(t,e){if(t===e||t!==t)return()=>t;const i=typeof t;if(i!==typeof e||Array.isArray(t)!==Array.isArray(e))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const s=e.map((r,l)=>_t(t[l],r));return r=>s.map(l=>l(r))}if(i==="object"){if(!t||!e)throw new Error("Object cannot be null");if(Zt(t)&&Zt(e)){t=t.getTime(),e=e.getTime();const l=e-t;return n=>new Date(t+n*l)}const s=Object.keys(e),r={};return s.forEach(l=>{r[l]=_t(t[l],e[l])}),l=>{const n={};return s.forEach(f=>{n[f]=r[f](l)}),n}}if(i==="number"){const s=e-t;return r=>t+r*s}throw new Error(`Cannot interpolate ${i} values`)}function ae(t,e={}){const i=Ct(t);let s,r=t;function l(n,f){if(t==null)return i.set(t=n),Promise.resolve();r=n;let c=s,a=!1,{delay:y=0,duration:h=400,easing:g=Vt,interpolate:u=_t}=jt(jt({},e),f);if(h===0)return c&&(c.abort(),c=null),i.set(t=r),Promise.resolve();const _=Gt()+y;let j;return s=Bt(w=>{if(w<_)return!0;a||(j=u(t,n),typeof h=="function"&&(h=h(t,n)),a=!0),c&&(c.abort(),c=null);const q=w-_;return q>h?(i.set(t=n),!1):(i.set(t=j(g(q/h))),!0)}),s.promise}return{set:l,update:(n,f)=>l(n(r,t),f),subscribe:i.subscribe}}let et;et="https://reold-cartier.glitch.me";const at={getUserInfo:async t=>await(await fetch(`${et}/user?username=${t}`)).json(),getPlaylistInfo:async t=>await(await fetch(`${et}/playlist?id=${t}`)).json(),getDownloadPlaylist:async t=>await(await fetch(`${et}/download?link=${t}`)).json(),getStreamPlaylist:async t=>{let e=await fetch(`${et}/stream?unique_code=${t}`);return[await e.ok,await e.blob()]}};function pe(t){let e,i;return{c(){e=H("svg"),i=H("path"),o(i,"stroke-linecap","round"),o(i,"stroke-linejoin","round"),o(i,"d","M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"),o(e,"xmlns","http://www.w3.org/2000/svg"),o(e,"fill","none"),o(e,"viewBox","0 0 24 24"),o(e,"stroke-width","1.5"),o(e,"stroke","currentColor"),o(e,"class","w-[10vh] h-[10vh]")},m(s,r){I(s,e,r),p(e,i)},p:Z,d(s){s&&Y(e)}}}function ce(t){let e,i;return{c(){e=d("img"),ct(e.src,i=t[0].images[0].url)||o(e,"src",i),o(e,"class","rounded-full max-h-[10vh]"),o(e,"alt","playlist's cover")},m(s,r){I(s,e,r)},p(s,r){r&1&&!ct(e.src,i=s[0].images[0].url)&&o(e,"src",i)},d(s){s&&Y(e)}}}function fe(t){let e;return{c(){e=O("download")},m(i,s){I(i,e,s)},d(i){i&&Y(e)}}}function ue(t){let e;return{c(){e=O("downloaded")},m(i,s){I(i,e,s)},d(i){i&&Y(e)}}}function de(t){let e,i,s;return{c(){e=H("svg"),i=H("path"),s=O(`
            downloading`),o(i,"stroke-linecap","round"),o(i,"stroke-linejoin","round"),o(i,"d","M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"),o(e,"xmlns","http://www.w3.org/2000/svg"),o(e,"fill","none"),o(e,"viewBox","0 0 24 24"),o(e,"stroke-width","1.5"),o(e,"stroke","currentColor"),o(e,"class","w-4 h-4 inline animate-spin")},m(r,l){I(r,e,l),p(e,i),I(r,s,l)},d(r){r&&(Y(e),Y(s))}}}function Ot(t){let e,i,s;return{c(){e=d("button"),e.textContent="save",o(e,"class","text-xs")},m(r,l){I(r,e,l),i||(s=st(e,"click",t[5]),i=!0)},p:Z,d(r){r&&Y(e),i=!1,s()}}}function he(t){let e,i,s,r,l,n,f,c,a,y=t[0].name+"",h,g,u,_,j,w,q,R=t[0].description+"",E,$,v,M,U,K,C,A;function F(x,Q){return x[0].images.length>0?ce:pe}let k=F(t),T=k(t);function m(x,Q){return x[2]?de:x[1].length>0?ue:fe}let z=m(t),b=z(t),N=t[1].length>0&&!t[2]&&Ot(t);return{c(){e=d("div"),i=d("div"),r=D(),l=d("div"),n=d("div"),T.c(),f=D(),c=d("div"),a=d("a"),h=O(y),g=D(),u=H("svg"),_=H("path"),w=D(),q=d("p"),E=O(R),$=D(),v=d("div"),M=d("button"),b.c(),K=D(),N&&N.c(),o(i,"class","h-full absolute backdrop-invert brightness-50 left-0 top-0 rounded-md"),bt(i,"width",t[3]/100*90+"vw"),i.hidden=s=!t[2],o(n,"class","col-span-1"),o(_,"stroke-linecap","round"),o(_,"stroke-linejoin","round"),o(_,"d","M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"),o(u,"xmlns","http://www.w3.org/2000/svg"),o(u,"fill","none"),o(u,"viewBox","0 0 24 24"),o(u,"stroke-width","1.5"),o(u,"stroke","currentColor"),o(u,"class","w-4 h-4 inline"),o(a,"class","hover:scale-110 duration-75 text-left line-clamp-1"),o(a,"href",j=t[0].external_urls.spotify),o(a,"target","_blank"),o(q,"class","text-xs line-clamp-1"),o(M,"class","text-xs bg-aodPurple"),M.disabled=U=t[2]||t[1].length>0,o(c,"class","col-span-2 flex flex-col justify-center items-start"),o(l,"class","grid grid-cols-3 w-full gap-2 p-2"),o(e,"class","bg-gray-950 ring-2 ring-zinc-500 p-2 rounded-md w-[90vw] text-center relative")},m(x,Q){I(x,e,Q),p(e,i),p(e,r),p(e,l),p(l,n),T.m(n,null),p(l,f),p(l,c),p(c,a),p(a,h),p(a,g),p(a,u),p(u,_),p(c,w),p(c,q),p(q,E),p(c,$),p(c,v),p(v,M),b.m(M,null),p(v,K),N&&N.m(v,null),C||(A=st(M,"click",t[6]),C=!0)},p(x,[Q]){Q&8&&bt(i,"width",x[3]/100*90+"vw"),Q&4&&s!==(s=!x[2])&&(i.hidden=s),k===(k=F(x))&&T?T.p(x,Q):(T.d(1),T=k(x),T&&(T.c(),T.m(n,null))),Q&1&&y!==(y=x[0].name+"")&&P(h,y),Q&1&&j!==(j=x[0].external_urls.spotify)&&o(a,"href",j),Q&1&&R!==(R=x[0].description+"")&&P(E,R),z!==(z=m(x))&&(b.d(1),b=z(x),b&&(b.c(),b.m(M,null))),Q&6&&U!==(U=x[2]||x[1].length>0)&&(M.disabled=U),x[1].length>0&&!x[2]?N?N.p(x,Q):(N=Ot(x),N.c(),N.m(v,null)):N&&(N.d(1),N=null)},i:Z,o:Z,d(x){x&&Y(e),T.d(),b.d(),N&&N.d(),C=!1,A()}}}function ye(t,e,i){let s,r=[],{track:l}=e,n=!1,f=ae(0,{duration:100,easing:ne});wt(t,f,y=>i(3,s=y));const c=()=>{r.forEach((y,h)=>{const g=URL.createObjectURL(y),u=document.createElement("a");u.href=g,u.download=`${l.name}-${h+1}.mp3`,u.click()})},a=()=>{i(2,n=!0);const y=l.external_urls.spotify,g=new URL(y).pathname.split("/")[2];let u=0;f.set(25,{duration:1e4}),at.getPlaylistInfo(g).then(_=>{u=_.tracks.total,it(f,s=25,s);const j=u*20+.001;u>20&&alert(`There are ${u} tracks in the playlist. It will take about ${j/60} minutes`),f.set(50,{duration:j*1e3}),at.getDownloadPlaylist(y).then(async w=>{it(f,s=50,s),f.set(75,{duration:1e4});for(let q=0;q<u;q++){let[R,E]=await at.getStreamPlaylist(w.data.unique_code);if(it(f,s=75+q/u*25,s),!R){alert("something went wrong");return}i(1,r=[...r,E])}i(2,n=!1)})})};return t.$$set=y=>{"track"in y&&i(0,l=y.track)},[l,r,n,s,f,c,a]}class me extends ht{constructor(e){super(),dt(this,e,ye,he,lt,{track:0})}}const pt=Ct({user:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",images:[{url:"https://i.scdn.co/image/ab67757000003b822d7900830e4a0481ce70fb26",height:64,width:64},{url:"https://i.scdn.co/image/ab6775700000ee852d7900830e4a0481ce70fb26",height:300,width:300}],type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8",followers:{href:null,total:2}},playlists:{href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8/playlists?offset=0&limit=50",items:[{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/4DU3CC6QCnI6OOiPJFcRN8"},href:"https://api.spotify.com/v1/playlists/4DU3CC6QCnI6OOiPJFcRN8",id:"4DU3CC6QCnI6OOiPJFcRN8",images:[],name:"Download",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"NSw2OWMzNjA1MjA1MWJiNjYyYWNjNGQ3ZDU4Y2ZiYjUwYWZhYTBhOGM4",tracks:{href:"https://api.spotify.com/v1/playlists/4DU3CC6QCnI6OOiPJFcRN8/tracks",total:0},type:"playlist",uri:"spotify:playlist:4DU3CC6QCnI6OOiPJFcRN8"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/1qnxK0KItEJGZLA2xaFxl6"},href:"https://api.spotify.com/v1/playlists/1qnxK0KItEJGZLA2xaFxl6",id:"1qnxK0KItEJGZLA2xaFxl6",images:[{height:640,url:"https://i.scdn.co/image/ab67616d0000b273a65d5101e0de4902bb49a821",width:640}],name:"Feels good to be alive.",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"Myw1ZmNlZWE0YTU5NThmNzQ0MGYxMmJlNDBmNzg2MjI4YjlkNjA5NTA4",tracks:{href:"https://api.spotify.com/v1/playlists/1qnxK0KItEJGZLA2xaFxl6/tracks",total:2},type:"playlist",uri:"spotify:playlist:1qnxK0KItEJGZLA2xaFxl6"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/59OOem6SoudC5hginqutgf"},href:"https://api.spotify.com/v1/playlists/59OOem6SoudC5hginqutgf",id:"59OOem6SoudC5hginqutgf",images:[{height:640,url:"https://i.scdn.co/image/ab67616d0000b273324ec8c0ec39521ec28a2aa5",width:640}],name:"Drops",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"NSwxZjE0OTRlNTVhN2Q3MGFjYTUxY2IxZTM1YmE0YThlYmM0MTk3ODky",tracks:{href:"https://api.spotify.com/v1/playlists/59OOem6SoudC5hginqutgf/tracks",total:2},type:"playlist",uri:"spotify:playlist:59OOem6SoudC5hginqutgf"},{collaborative:!1,description:`Best of 90s from Mollywood.
Cover: Shobana`,external_urls:{spotify:"https://open.spotify.com/playlist/37i9dQZF1DX54H77RAFJQ9"},href:"https://api.spotify.com/v1/playlists/37i9dQZF1DX54H77RAFJQ9",id:"37i9dQZF1DX54H77RAFJQ9",images:[{height:null,url:"https://i.scdn.co/image/ab67706f00000003c5531deb072c05bf47d1b652",width:null}],name:"All out 90s Malayalam",owner:{display_name:"Spotify",external_urls:{spotify:"https://open.spotify.com/user/spotify"},href:"https://api.spotify.com/v1/users/spotify",id:"spotify",type:"user",uri:"spotify:user:spotify"},primary_color:null,public:!0,snapshot_id:"MTY5NjQ4NzA2MCwwMDAwMDAwMDNmNzljMGU2ZGUxYWZmMmVkYmZhMjQ3MGYxM2FjODIw",tracks:{href:"https://api.spotify.com/v1/playlists/37i9dQZF1DX54H77RAFJQ9/tracks",total:100},type:"playlist",uri:"spotify:playlist:37i9dQZF1DX54H77RAFJQ9"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/0Kklyw1IKm9bsctYnUpDlf"},href:"https://api.spotify.com/v1/playlists/0Kklyw1IKm9bsctYnUpDlf",id:"0Kklyw1IKm9bsctYnUpDlf",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb2006b029c8bae0700df3e1f6",width:null}],name:"Mohanlal old hits",owner:{display_name:"Malavika",external_urls:{spotify:"https://open.spotify.com/user/1knj6nfm5h6prahvvprla9ci6"},href:"https://api.spotify.com/v1/users/1knj6nfm5h6prahvvprla9ci6",id:"1knj6nfm5h6prahvvprla9ci6",type:"user",uri:"spotify:user:1knj6nfm5h6prahvvprla9ci6"},primary_color:null,public:!0,snapshot_id:"NDcsNjQxYWM5NDE3ZmVkODFjYjFjZDBmODhjYzFjNzBiNGFiYzA3YTljMQ==",tracks:{href:"https://api.spotify.com/v1/playlists/0Kklyw1IKm9bsctYnUpDlf/tracks",total:40},type:"playlist",uri:"spotify:playlist:0Kklyw1IKm9bsctYnUpDlf"},{collaborative:!1,description:`Best love songs of 1980s from Mollywood.
Cover: Chithram`,external_urls:{spotify:"https://open.spotify.com/playlist/37i9dQZF1DX24Nux3gigVe"},href:"https://api.spotify.com/v1/playlists/37i9dQZF1DX24Nux3gigVe",id:"37i9dQZF1DX24Nux3gigVe",images:[{height:null,url:"https://i.scdn.co/image/ab67706f00000003aa419219a4594ff17aebbfbd",width:null}],name:"80s Love Malayalam",owner:{display_name:"Spotify",external_urls:{spotify:"https://open.spotify.com/user/spotify"},href:"https://api.spotify.com/v1/users/spotify",id:"spotify",type:"user",uri:"spotify:user:spotify"},primary_color:null,public:!0,snapshot_id:"MTcwMDgyMTUzMSwwMDAwMDAwMDlkMmYzYWQ5Njk2OTAyMGM0OGMwZWQ3YjRhZGYxMjEw",tracks:{href:"https://api.spotify.com/v1/playlists/37i9dQZF1DX24Nux3gigVe/tracks",total:50},type:"playlist",uri:"spotify:playlist:37i9dQZF1DX24Nux3gigVe"},{collaborative:!1,description:"different vibe? hopefully 🤞",external_urls:{spotify:"https://open.spotify.com/playlist/3n6lIykbh0n2OlwZWKQaWT"},href:"https://api.spotify.com/v1/playlists/3n6lIykbh0n2OlwZWKQaWT",id:"3n6lIykbh0n2OlwZWKQaWT",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb021171825f4d28d1756556aa",width:null}],name:"Differential lock",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"OCxhYmRiMDJkOWE3ZmRjZGFlNTM0NWIwMThmNWM2N2M0ZjQ2OTkxNzU2",tracks:{href:"https://api.spotify.com/v1/playlists/3n6lIykbh0n2OlwZWKQaWT/tracks",total:3},type:"playlist",uri:"spotify:playlist:3n6lIykbh0n2OlwZWKQaWT"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/2HKQbtCTJWoMKlZIVOKpBn"},href:"https://api.spotify.com/v1/playlists/2HKQbtCTJWoMKlZIVOKpBn",id:"2HKQbtCTJWoMKlZIVOKpBn",images:[{height:640,url:"https://mosaic.scdn.co/640/ab67616d0000b273046cf5d6d31d4b796c075d2bab67616d0000b2739451e80ff0ec76b0b0e5f982ab67616d0000b2739969316c454fb52e20050598ab67616d0000b273b0a8dcfcdccf429541e50acf",width:640},{height:300,url:"https://mosaic.scdn.co/300/ab67616d0000b273046cf5d6d31d4b796c075d2bab67616d0000b2739451e80ff0ec76b0b0e5f982ab67616d0000b2739969316c454fb52e20050598ab67616d0000b273b0a8dcfcdccf429541e50acf",width:300},{height:60,url:"https://mosaic.scdn.co/60/ab67616d0000b273046cf5d6d31d4b796c075d2bab67616d0000b2739451e80ff0ec76b0b0e5f982ab67616d0000b2739969316c454fb52e20050598ab67616d0000b273b0a8dcfcdccf429541e50acf",width:60}],name:"Sleep",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"OSwxNWI5YTdkYzExNmE3NWFjMGUyMWVmNWQ3YjJiNDAwNDdiMDA3OGRk",tracks:{href:"https://api.spotify.com/v1/playlists/2HKQbtCTJWoMKlZIVOKpBn/tracks",total:5},type:"playlist",uri:"spotify:playlist:2HKQbtCTJWoMKlZIVOKpBn"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/5OSCmxV0KNtwqYyhrEFsqv"},href:"https://api.spotify.com/v1/playlists/5OSCmxV0KNtwqYyhrEFsqv",id:"5OSCmxV0KNtwqYyhrEFsqv",images:[{height:640,url:"https://i.scdn.co/image/ab67616d0000b2736a2e7f7613210a6397e854f5",width:640}],name:"Bodyguards",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"Myw2OTE0ZTlhZGE4YmZkZTY5MDI4MDk3Yzc5ZGJkMjY1ZmRkZTQ1MWEw",tracks:{href:"https://api.spotify.com/v1/playlists/5OSCmxV0KNtwqYyhrEFsqv/tracks",total:2},type:"playlist",uri:"spotify:playlist:5OSCmxV0KNtwqYyhrEFsqv"},{collaborative:!1,description:"25% extra delicious",external_urls:{spotify:"https://open.spotify.com/playlist/2SoJmrkzUQXm5SakZlQi2q"},href:"https://api.spotify.com/v1/playlists/2SoJmrkzUQXm5SakZlQi2q",id:"2SoJmrkzUQXm5SakZlQi2q",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbb024ffdb78ee6d97b783904f",width:null}],name:"Gems —hindi",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"MTAsNjI2Nzk0ZGY3OWQ4NmIyOTk2MzFiZTVkOTk4MmZiM2JmMWRhNzJmMw==",tracks:{href:"https://api.spotify.com/v1/playlists/2SoJmrkzUQXm5SakZlQi2q/tracks",total:5},type:"playlist",uri:"spotify:playlist:2SoJmrkzUQXm5SakZlQi2q"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/4WTuDCd1XnnlRvA5T3nzY3"},href:"https://api.spotify.com/v1/playlists/4WTuDCd1XnnlRvA5T3nzY3",id:"4WTuDCd1XnnlRvA5T3nzY3",images:[{height:640,url:"https://i.scdn.co/image/ab67616d0000b273b6b1519a496272ce0557efdf",width:640}],name:"Only legends understand.",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"MixmZDVlYWRkNDE0ZmQ2ODQzNDU1ZjM1OWQ4Y2UwM2M4ZmNiMDQwMjg3",tracks:{href:"https://api.spotify.com/v1/playlists/4WTuDCd1XnnlRvA5T3nzY3/tracks",total:1},type:"playlist",uri:"spotify:playlist:4WTuDCd1XnnlRvA5T3nzY3"},{collaborative:!1,description:"wanna journey in my dad&#x27;s suzuki?",external_urls:{spotify:"https://open.spotify.com/playlist/4sFsoEVDzg3UPb7OVqkeSa"},href:"https://api.spotify.com/v1/playlists/4sFsoEVDzg3UPb7OVqkeSa",id:"4sFsoEVDzg3UPb7OVqkeSa",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbaa30d8e54b760a2d5a4f195c",width:null}],name:"Dad's Radio",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"MTEsNzNlZDEyOTg2NDU1ZGU2OGJiMDRiZjA5ODgxYzAwYjgyZmU5Y2EwMg==",tracks:{href:"https://api.spotify.com/v1/playlists/4sFsoEVDzg3UPb7OVqkeSa/tracks",total:5},type:"playlist",uri:"spotify:playlist:4sFsoEVDzg3UPb7OVqkeSa"},{collaborative:!1,description:"works all the time, I promise",external_urls:{spotify:"https://open.spotify.com/playlist/4f3fKAfVgRFMqFBYV6TDcf"},href:"https://api.spotify.com/v1/playlists/4f3fKAfVgRFMqFBYV6TDcf",id:"4f3fKAfVgRFMqFBYV6TDcf",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbb69f90c663917889a7ca2f79",width:null}],name:"Free Refills",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"MTIsZWJlMTZiZDFhYzcwZDNjMTNlZTEyZDc5YmEyNjM0NjhlMDU0Y2VhNQ==",tracks:{href:"https://api.spotify.com/v1/playlists/4f3fKAfVgRFMqFBYV6TDcf/tracks",total:5},type:"playlist",uri:"spotify:playlist:4f3fKAfVgRFMqFBYV6TDcf"},{collaborative:!1,description:"relatable hits of my occasional genres",external_urls:{spotify:"https://open.spotify.com/playlist/1deMqexkz4JI2AAQM8qi0Q"},href:"https://api.spotify.com/v1/playlists/1deMqexkz4JI2AAQM8qi0Q",id:"1deMqexkz4JI2AAQM8qi0Q",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb3a2f6e502c0dcd328c5525a8",width:null}],name:"Around you!",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"MTcsZGE4OTk2ZmIzYzZhODI5NDUzZjg1ZWUyZDQyOWIxY2U0NDkzZDc0YQ==",tracks:{href:"https://api.spotify.com/v1/playlists/1deMqexkz4JI2AAQM8qi0Q/tracks",total:5},type:"playlist",uri:"spotify:playlist:1deMqexkz4JI2AAQM8qi0Q"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/3DhoYtbVYRvGSgfhLDXylK"},href:"https://api.spotify.com/v1/playlists/3DhoYtbVYRvGSgfhLDXylK",id:"3DhoYtbVYRvGSgfhLDXylK",images:[{height:640,url:"https://i.scdn.co/image/ab67616d0000b2737295936765da92b757315645",width:640}],name:"July Solstice",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"NCwxOGQ1OTcyYzdlZGUwNDgyYmZlY2NmZGJiNWNjYzA3YTdhYzRmOTFi",tracks:{href:"https://api.spotify.com/v1/playlists/3DhoYtbVYRvGSgfhLDXylK/tracks",total:3},type:"playlist",uri:"spotify:playlist:3DhoYtbVYRvGSgfhLDXylK"},{collaborative:!1,description:"Listen to short underrated songs which will play with your emotions",external_urls:{spotify:"https://open.spotify.com/playlist/13gMwZ8em4Na1sof5EIPoZ"},href:"https://api.spotify.com/v1/playlists/13gMwZ8em4Na1sof5EIPoZ",id:"13gMwZ8em4Na1sof5EIPoZ",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbfb812c070d5223d60f8ed1a8",width:null}],name:"Dramatic Emotions",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"MTUsNTcwMDYzYTY0MTFjNWQ1YTIxYzI1ZmJlNGRkYjY3NzA1NGI3ODE3OQ==",tracks:{href:"https://api.spotify.com/v1/playlists/13gMwZ8em4Na1sof5EIPoZ/tracks",total:6},type:"playlist",uri:"spotify:playlist:13gMwZ8em4Na1sof5EIPoZ"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/3kn7bPZDd8obw2U2utcCai"},href:"https://api.spotify.com/v1/playlists/3kn7bPZDd8obw2U2utcCai",id:"3kn7bPZDd8obw2U2utcCai",images:[{height:640,url:"https://mosaic.scdn.co/640/ab67616d0000b2731590775ddd9a0a2b9a87dc6aab67616d0000b273b5dafe1c123b8f12f078fb29ab67616d0000b273e1ae9327732ecdfed4d1e9e8ab67616d0000b273e2a75e65f41e9a62078d583e",width:640},{height:300,url:"https://mosaic.scdn.co/300/ab67616d0000b2731590775ddd9a0a2b9a87dc6aab67616d0000b273b5dafe1c123b8f12f078fb29ab67616d0000b273e1ae9327732ecdfed4d1e9e8ab67616d0000b273e2a75e65f41e9a62078d583e",width:300},{height:60,url:"https://mosaic.scdn.co/60/ab67616d0000b2731590775ddd9a0a2b9a87dc6aab67616d0000b273b5dafe1c123b8f12f078fb29ab67616d0000b273e1ae9327732ecdfed4d1e9e8ab67616d0000b273e2a75e65f41e9a62078d583e",width:60}],name:"Malayalam melody hits 💚💚",owner:{display_name:"Siva",external_urls:{spotify:"https://open.spotify.com/user/31vyyzi3vedzyhdvj6v3graqqccm"},href:"https://api.spotify.com/v1/users/31vyyzi3vedzyhdvj6v3graqqccm",id:"31vyyzi3vedzyhdvj6v3graqqccm",type:"user",uri:"spotify:user:31vyyzi3vedzyhdvj6v3graqqccm"},primary_color:null,public:!0,snapshot_id:"NTUsMTljYmRmM2JjZWVlOGZmMzEyZGRhYjM0NTc3YWE4ZWVhYmU0ZDAxNw==",tracks:{href:"https://api.spotify.com/v1/playlists/3kn7bPZDd8obw2U2utcCai/tracks",total:51},type:"playlist",uri:"spotify:playlist:3kn7bPZDd8obw2U2utcCai"},{collaborative:!1,description:"",external_urls:{spotify:"https://open.spotify.com/playlist/5cNp1xS22nNOwVtLMIm8og"},href:"https://api.spotify.com/v1/playlists/5cNp1xS22nNOwVtLMIm8og",id:"5cNp1xS22nNOwVtLMIm8og",images:[{height:null,url:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebbc4730d71ff76c5bc9268c082",width:null}],name:"DATA WING Soundtrack",owner:{display_name:"Dan Vogt",external_urls:{spotify:"https://open.spotify.com/user/12173541933"},href:"https://api.spotify.com/v1/users/12173541933",id:"12173541933",type:"user",uri:"spotify:user:12173541933"},primary_color:null,public:!0,snapshot_id:"ODMsODA0NGRlNTNkOWFhNmJjMWUzOGE5ZDgzNjY0NGUwN2U4OGY0ZmEyNw==",tracks:{href:"https://api.spotify.com/v1/playlists/5cNp1xS22nNOwVtLMIm8og/tracks",total:38},type:"playlist",uri:"spotify:playlist:5cNp1xS22nNOwVtLMIm8og"},{collaborative:!1,description:"=) and =( ",external_urls:{spotify:"https://open.spotify.com/playlist/3GFzRbM1yBzBRf9KrAJd7l"},href:"https://api.spotify.com/v1/playlists/3GFzRbM1yBzBRf9KrAJd7l",id:"3GFzRbM1yBzBRf9KrAJd7l",images:[{height:640,url:"https://mosaic.scdn.co/640/ab67616d0000b27341e31d6ea1d493dd77933ee5ab67616d0000b2736ee651e65c3766d80e7fcab7ab67616d0000b27382a18aa0d3374049c6b78f6aab67616d0000b273e1d47c00ddecbfb810c807ed",width:640},{height:300,url:"https://mosaic.scdn.co/300/ab67616d0000b27341e31d6ea1d493dd77933ee5ab67616d0000b2736ee651e65c3766d80e7fcab7ab67616d0000b27382a18aa0d3374049c6b78f6aab67616d0000b273e1d47c00ddecbfb810c807ed",width:300},{height:60,url:"https://mosaic.scdn.co/60/ab67616d0000b27341e31d6ea1d493dd77933ee5ab67616d0000b2736ee651e65c3766d80e7fcab7ab67616d0000b27382a18aa0d3374049c6b78f6aab67616d0000b273e1d47c00ddecbfb810c807ed",width:60}],name:"My Favs",owner:{display_name:"Aadhi + Reold",external_urls:{spotify:"https://open.spotify.com/user/krr5eq9z17bjfoidb38r5uik8"},href:"https://api.spotify.com/v1/users/krr5eq9z17bjfoidb38r5uik8",id:"krr5eq9z17bjfoidb38r5uik8",type:"user",uri:"spotify:user:krr5eq9z17bjfoidb38r5uik8"},primary_color:null,public:!0,snapshot_id:"NSxiOTJiZjg5ZTIxNTBjZTNkNTA4OWQyZWMxZGJhMjQ2OTJlNWE5NzI3",tracks:{href:"https://api.spotify.com/v1/playlists/3GFzRbM1yBzBRf9KrAJd7l/tracks",total:43},type:"playlist",uri:"spotify:playlist:3GFzRbM1yBzBRf9KrAJd7l"}],limit:50,next:null,offset:0,previous:null,total:19},loggedIn:!0});function At(t,e,i){const s=t.slice();return s[1]=e[i],s}function Yt(t){let e,i;return e=new me({props:{track:t[1]}}),{c(){xt(e.$$.fragment)},m(s,r){ft(e,s,r),i=!0},p(s,r){const l={};r&1&&(l.track=s[1]),e.$set(l)},i(s){i||(S(e.$$.fragment,s),i=!0)},o(s){W(e.$$.fragment,s),i=!1},d(s){ut(e,s)}}}function be(t){let e,i,s,r,l,n,f,c,a=t[0].user.display_name+"",y,h,g,u=t[0].user.followers.total+"",_,j,w=t[0].playlists.total+"",q,R,E,$,v=t[0].user.id+"",M,U,K,C,A,F=Dt(t[0].playlists.items),k=[];for(let m=0;m<F.length;m+=1)k[m]=Yt(At(t,F,m));const T=m=>W(k[m],1,1,()=>{k[m]=null});return{c(){e=d("div"),i=d("div"),s=d("img"),n=D(),f=d("div"),c=d("p"),y=O(a),h=D(),g=d("p"),_=O(u),j=O(" followers, "),q=O(w),R=O(" playlists"),E=D(),$=d("p"),M=O(v),U=D(),K=d("div"),C=d("div");for(let m=0;m<k.length;m+=1)k[m].c();ct(s.src,r=t[0].user.images[1].url)||o(s,"src",r),o(s,"alt",l=`${t[0].user.display_name}'s profile picture`),o(s,"class","rounded-full h-[10vh] ring-aodBg ring-4"),o(c,"class","font-semibold"),bt(c,"text-shadow","4px 3px 8px rgba(0,0,0,1)"),o(g,"class","text-xs"),o($,"class","text-xs"),o(f,"class","flex flex-col justify-center items-start"),o(i,"class","flex flex-row justify-center items-center h-[15vh] space-x-4 bg-gray-500 w-[90vw] rounded-t-xl ring-2 ring-zinc-500 py-5"),o(C,"class","flex flex-col justify-center items-center w-full space-y-2 pb-1"),o(K,"class","h-[65vh] overflow-y-scroll w-[100vw]"),o(e,"class","flex flex-col items-center space-y--2")},m(m,z){I(m,e,z),p(e,i),p(i,s),p(i,n),p(i,f),p(f,c),p(c,y),p(f,h),p(f,g),p(g,_),p(g,j),p(g,q),p(g,R),p(f,E),p(f,$),p($,M),p(e,U),p(e,K),p(K,C);for(let b=0;b<k.length;b+=1)k[b]&&k[b].m(C,null);A=!0},p(m,[z]){if((!A||z&1&&!ct(s.src,r=m[0].user.images[1].url))&&o(s,"src",r),(!A||z&1&&l!==(l=`${m[0].user.display_name}'s profile picture`))&&o(s,"alt",l),(!A||z&1)&&a!==(a=m[0].user.display_name+"")&&P(y,a),(!A||z&1)&&u!==(u=m[0].user.followers.total+"")&&P(_,u),(!A||z&1)&&w!==(w=m[0].playlists.total+"")&&P(q,w),(!A||z&1)&&v!==(v=m[0].user.id+"")&&P(M,v),z&1){F=Dt(m[0].playlists.items);let b;for(b=0;b<F.length;b+=1){const N=At(m,F,b);k[b]?(k[b].p(N,z),S(k[b],1)):(k[b]=Yt(N),k[b].c(),S(k[b],1),k[b].m(C,null))}for(Ft(),b=F.length;b<k.length;b+=1)T(b);Et()}},i(m){if(!A){for(let z=0;z<F.length;z+=1)S(k[z]);A=!0}},o(m){k=k.filter(Boolean);for(let z=0;z<k.length;z+=1)W(k[z]);A=!1},d(m){m&&Y(e),Pt(k,m)}}}function ge(t,e,i){let s;return wt(t,pt,r=>i(0,s=r)),console.log(s),[s]}class ke extends ht{constructor(e){super(),dt(this,e,ge,be,lt,{})}}function _e(t){let e,i;return e=new ke({}),{c(){xt(e.$$.fragment)},m(s,r){ft(e,s,r),i=!0},p:Z,i(s){i||(S(e.$$.fragment,s),i=!0)},o(s){W(e.$$.fragment,s),i=!1},d(s){ut(e,s)}}}function we(t){let e,i;return e=new oe({props:{handleUsername:t[1]}}),{c(){xt(e.$$.fragment)},m(s,r){ft(e,s,r),i=!0},p:Z,i(s){i||(S(e.$$.fragment,s),i=!0)},o(s){W(e.$$.fragment,s),i=!1},d(s){ut(e,s)}}}function ve(t){let e;return{c(){e=d("span"),e.textContent="PROD",o(e,"class","rounded-sm p-0.5 bg-blue-600")},m(i,s){I(i,e,s)},d(i){i&&Y(e)}}}function xe(t){let e,i,s,r,l,n,f,c,a,y,h,g,u,_;const j=[we,_e],w=[];function q(v,M){return v[0].loggedIn==!1?0:1}l=q(t),n=w[l]=j[l](t);function R(v,M){return ve}let $=R()(t);return{c(){e=d("main"),i=d("div"),i.innerHTML='<div class="bg-aodPurple shadow-sm shadow-gray-950 rounded-b-md p-2 ml-2 h-full flex flex-col items-center justify-center"><span>reold&#39;s</span></div> <p class="text-3xl">Cartier Manager</p>',s=D(),r=d("div"),n.c(),f=D(),c=d("div"),a=d("p"),$.c(),y=O(`
      Built with ❤️ by
      `),h=d("a"),h.textContent="reold",g=O(`.
      `),u=d("a"),u.textContent="Report an error",o(i,"class","flex flex-row items-center justify-evenly font-bold h-[10vh] pb-2 bg-gray-950 ring-2 ring-zinc-500 shadow-xl"),o(r,"class","w-full flex flex-col items-center justify-center h-[85vh] bg-gradient-to-t from-gray-950 via-aodBg to-aodBg"),o(h,"href","https://github.com/reold"),o(h,"target","_blank"),o(h,"class","text-blue-600"),o(u,"href","https://x.com/redicrafty"),o(u,"target","_blank"),o(u,"class","text-blue-600"),o(c,"class","w-full h-[5vh] bg-gray-950 text-sm flex flex-col items-center justify-center"),o(e,"class","w-screen h-screen text-white text-xl")},m(v,M){I(v,e,M),p(e,i),p(e,s),p(e,r),w[l].m(r,null),p(e,f),p(e,c),p(c,a),$.m(a,null),p(a,y),p(a,h),p(a,g),p(a,u),_=!0},p(v,[M]){let U=l;l=q(v),l===U?w[l].p(v,M):(Ft(),W(w[U],1,1,()=>{w[U]=null}),Et(),n=w[l],n?n.p(v,M):(n=w[l]=j[l](v),n.c()),S(n,1),n.m(r,null))},i(v){_||(S(n),_=!0)},o(v){W(n),_=!1},d(v){v&&Y(e),w[l].d(),$.d()}}}function je(t,e,i){let s;return wt(t,pt,l=>i(0,s=l)),[s,l=>{at.getUserInfo(l).then(n=>{if(n.success==!1){alert("something went wrong!");return}it(pt,s={...n.data},s),it(pt,s.loggedIn=!0,s),navigator.clipboard.writeText(JSON.stringify(s))})}]}class ze extends ht{constructor(e){super(),dt(this,e,je,xe,lt,{})}}new ze({target:document.getElementById("app")});