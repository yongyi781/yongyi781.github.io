import{s as Ht,p as He,f as c,a as M,l as B,D as Ot,g as h,u as he,d as p,c as A,h as x,m as V,j as o,E as Rt,w as s,i as Z,F as kt,G as k,H as z,I as N,J as at,n as Ft,K as je,L as Dt,y as Kt,x as Bt,M as Vt,N as Wt,e as St,O as xt,P as jt}from"../chunks/scheduler.668a7a52.js";import{S as qt,i as Gt,f as st,b as it,d as ot,m as ut,a as ft,t as ct,e as ht}from"../chunks/index.040105a2.js";import{e as ge}from"../chunks/each.e59479a4.js";import{S as Et,C as Qt}from"../chunks/index.27d4979e.js";import{s as We}from"../chunks/stores.d42eba0e.js";import{m as xe}from"../chunks/modularForms.28abc55f.js";const Jt=!0,on=Object.freeze(Object.defineProperty({__proto__:null,prerender:Jt},Symbol.toStringTag,{value:"Module"}));function Ct(e,l,n){const r=e.slice();return r[38]=l[n],r[39]=l,r[40]=n,r}function It(e,l,n){const r=e.slice();return r[38]=l[n],r[41]=l,r[42]=n,r}function Lt(e,l,n){const r=e.slice();return r[43]=l[n],r[44]=l,r[40]=n,r}function Xt(e,l,n){const r=e.slice();return r[45]=l[n],r[40]=n,r}function Yt(e){let l,n=e[45].name+"",r;return{c(){l=c("option"),r=B(n),this.h()},l(i){l=h(i,"OPTION",{});var a=x(l);r=V(a,n),a.forEach(p),this.h()},h(){l.__value=e[40],k(l,l.__value)},m(i,a){Z(i,l,a),s(l,r)},p:Bt,d(i){i&&p(l)}}}function Pt(e){let l,n,r=e[43].name+"",i,a,u,y,m,S,W;function w(){e[23].call(a,e[40])}return{c(){l=c("label"),n=new Vt(!1),i=B(`:\r
        `),a=c("input"),this.h()},l(g){l=h(g,"LABEL",{});var v=x(l);n=Wt(v,!1),i=V(v,`:\r
        `),a=h(v,"INPUT",{type:!0,class:!0,min:!0,max:!0,step:!0}),v.forEach(p),this.h()},h(){n.a=i,o(a,"type","number"),o(a,"class","w-14"),o(a,"min",u=e[43].min??-100),o(a,"max",y=e[43].max??100),o(a,"step",m=e[43].step??1)},m(g,v){Z(g,l,v),n.m(r,l),s(l,i),s(l,a),k(a,e[15][e[40]]),S||(W=[z(a,"input",w),z(a,"change",e[24])],S=!0)},p(g,v){e=g,v[0]&1024&&r!==(r=e[43].name+"")&&n.p(r),v[0]&1024&&u!==(u=e[43].min??-100)&&o(a,"min",u),v[0]&1024&&y!==(y=e[43].max??100)&&o(a,"max",y),v[0]&1024&&m!==(m=e[43].step??1)&&o(a,"step",m),v[0]&32768&&N(a.value)!==e[15][e[40]]&&k(a,e[15][e[40]])},d(g){g&&p(l),S=!1,Dt(W)}}}function Mt(e){let l,n,r;function i(){e[29].call(l,e[40],e[42])}return{c(){l=c("input"),this.h()},l(a){l=h(a,"INPUT",{type:!0,class:!0}),this.h()},h(){o(l,"type","number"),o(l,"class","w-[60px]")},m(a,u){Z(a,l,u),k(l,e[8][e[40]][e[42]]),n||(r=z(l,"input",i),n=!0)},p(a,u){e=a,u[0]&256&&N(l.value)!==e[8][e[40]][e[42]]&&k(l,e[8][e[40]][e[42]])},d(a){a&&p(l),n=!1,r()}}}function At(e){let l,n=ge(Array(2)),r=[];for(let i=0;i<n.length;i+=1)r[i]=Mt(It(e,n,i));return{c(){for(let i=0;i<r.length;i+=1)r[i].c();l=St()},l(i){for(let a=0;a<r.length;a+=1)r[a].l(i);l=St()},m(i,a){for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(i,a);Z(i,l,a)},p(i,a){if(a[0]&256){n=ge(Array(2));let u;for(u=0;u<n.length;u+=1){const y=It(i,n,u);r[u]?r[u].p(y,a):(r[u]=Mt(y),r[u].c(),r[u].m(l.parentNode,l))}for(;u<r.length;u+=1)r[u].d(1);r.length=n.length}},d(i){i&&p(l),je(r,i)}}}function Zt(e){let l,n=`hslToRgb(h, s, l) := (\r
      regional(hh,c,x,m);\r
      l = min(0.999,max(0,l));\r
      hh = min(360,max(0,h * 180 / pi));\r
      c = (1 - |2*l - 1|) * s;\r
      x = c * (1 - abs(mod(hh / 60, 2) - 1));\r
      m = l - c / 2;\r
      (m, m, m) + if(hh < 60, (c, x, 0), if(hh < 120, (x, c, 0), if(hh<180, (0, c, x), if (hh<240, (0, x, c), if(hh < 300, (x, 0, c), (c, 0, x))))));\r
    );\r
    eta(tau) := (regional(res); res = 0; repeat(numTerms, (\r
      regional(a,b);\r
      a = floor(# / 2);\r
      b = -1 + 3*mod(#,4) - mod(#,2) + 12*floor(# / 4);\r
      res = res + (-1)^(floor(#/2)) * exp(b^2*pi*i*tau/12);\r
    )); res);\r
    theta1(tau) := 0;\r
    theta2(tau) := (regional(res); res = 0; repeat(numTerms, res = res + 2*exp((#-1/2)^2*pi*i*tau)); res);\r
    theta3(tau) := (regional(res); res = 1; repeat(numTerms - 1, res = res + 2*exp(#^2*pi*i*tau)); res);\r
    theta4(tau) := (regional(res); res = 1; repeat(numTerms - 1, res = res + (-1)^#*2*exp(#^2*pi*i*tau)); res);\r
    theta(tau) := theta3(tau);\r
    E2(tau) := (regional(res); res = -1/24; repeat(numTerms - 1, res = res + #*exp(2*#*pi*i*tau)/(1-exp(2*#*pi*i*tau))); res);\r
    E2nonhol(tau) := E2(tau) + 1/(8*pi*im(tau));\r
    E4(tau) := 1/480*(theta2(tau)^8 + theta3(tau)^8 + theta4(tau)^8);\r
    E6(tau) := -1/504 * (((theta2(2*tau))^4)^3-33*(((theta2(2*tau))^4)+((theta3(2*tau))^4))*((theta2(2*tau))^4)*((theta3(2*tau))^4)+((theta3(2*tau))^4)^3);\r
    E8(tau) := 1/960*(theta2(tau)^16 + theta3(tau)^16 + theta4(tau)^16);\r
    fromCoeffs(tau) := (regional(res); res = 0; repeat(min(numTerms,length(coeffs)), res = res + coeffs_(#) * exp(2*(#-1)*pi*i*tau)); res);\r
    fromScreen(z) := if(upperHalfPlane, z + halfPlaneOffset*i, i * (1 + z/diskScale) / (1 - z/diskScale));\r
    // Works for larger numbers than abs(...).\r
    realAbs(x) := if(x<0,-x,x);\r
    realToTex(r) := (\r
      regional(s, ie, iplus);\r
      s = guess(r);\r
      ie = indexof(s, "e");\r
      iplus = if(s_(ie+1)=="+",ie+1,ie);\r
      if(isundefined(s),"\\tilde{\\infty}",\r
      if(ie>0,substring(s,0,ie-1)+"\\cdot 10^{"+substring(s,iplus,length(s))+"}",s))\r
    );\r
    complexToTex(z) := (\r
      regional(realStr,imStr,imPlus);\r
      realStr = realToTex(re(z));\r
      imStr = realToTex(realAbs(im(z)));\r
      imPlus = if(or(realStr=="0",realStr=="-0"),"","+");\r
      if(and(and(or(realStr=="0",realStr=="-0"),imStr!="0"),imStr!="-0"),"",realStr) + if(or(imStr=="0",imStr=="-0"),"",if(im(z)>0,imPlus,"-") + if(imStr=="1","",imStr + " ") + "i")\r
    );\r
\r
    f(tau) := tau;\r
    f2(tau) := if(transform, (\r
      regional(a,b,c,d,det);\r
      a = mat_1_1;\r
      b = mat_1_2;\r
      c = mat_2_1;\r
      d = mat_2_2;\r
      det = a*d - b*c;\r
      (det)^(weight/2) * exp(-weight*log(c*tau+d)) * i^(rot*weight) * f((a*tau + b) / (c*tau + d));\r
    ), f(tau));\r
    resetclock();\r
    scale = 15;\r
    transform = false;\r
    upperHalfPlane = false;\r
    halfPlaneOffset = 2;\r
    brightnessScale = 7;\r
    diskScale = 2.8;\r
    weight = 0;\r
    level = 1;\r
    mat = [[0,-1],[1,0]];\r
    rot = 1;\r
    numTerms = 20;\r
    coeffs = [1];\r
  `,r,i=`colorplot((\r
      regional(tau);\r
      tau = fromScreen(z);\r
      if(im(tau)<0,grey(0.1),\r
        result = f2(tau);\r
        h = mod(im(log(result)) + 2 * pi, 2 * pi);\r
        l = 1 / (1 + exp(-re(log(result)) / brightnessScale));\r
        hslToRgb(h, 0.8, l);\r
      ))\r
    );\r
    if(upperHalfPlane, (\r
      apply(-5..5, drawText((#,-halfPlaneOffset - 0.2), #, color->grey(0.9), size->12, align->"mid", family->"Segoe UI"));\r
      ), (\r
      apply(-5..5, (\r
        drawText((diskScale + 0.1) * (re((# - i) / (# + i)), im((# - i) / (# + i))), #, color->grey(0.9), size->12, align->"mid", family->"Segoe UI")\r
      ));\r
      drawText((diskScale + 0.1) * (1,0), "$\\infty$", color->grey(0.9), size->12, align->"mid", family->"Segoe UI");\r
    ));\r
    tauMouse = fromScreen(complex(mouse()));\r
    textLoc = screenbounds()_4_[1,2];\r
    textLoc2 = screenbounds()_3_[1,2];\r
    if(im(tauMouse)>=0,(\r
      drawText(textLoc + (0.1,0.4), "$\\tau="+complexToTex(tauMouse),color->grey(0.7), size->18);\r
      drawText(textLoc + (0.1,0.1), "$f(\\tau)=" + complexToTex(f2(tauMouse)), color->grey(0.7), size->18)\r
    ));\r
    drawText(textLoc2 + (-0.1,0.1), "$f(\\infty i)=" + complexToTex(f2(100*i)), color->grey(0.7), size->18, align->"right");`,a,u,y,m,S,W,w,g,v,$,E,ee,H,b,D,ae,se,Ee,U,Ce,be,j,F,C,Ie,q,Le,Pe,G,Me,Ae,ie,Oe="Rotation",K,De,oe,f="Brightness scale",P,Q,ue,pe,qe,Ue=e[8][0][0]*e[8][1][1]-e[8][0][1]*e[8][1][0]+"",Re,Ge,fe,me,pt="Default",Qe,_e,mt="Id",Je,J,Xe,Fe,O,de,Ye,te,Ze,ne,$e,ve,_t="Legend",et,ye,dt="<li>H: toggle upper half plane</li> <li>Space: toggle transform</li> <li>T: τ ↦ τ + 1 (Shift+T to perform inverse)</li> <li>R: τ ↦ τ/(1 - τ) (Shift+R to perform inverse)</li> <li>S: τ ↦ −1/τ</li> <li>W: τ ↦ τ + 1 left action</li> <li>Q: τ ↦ τ/(τ + 1) left action</li> <li>F: Fricke involution</li> <li>I: Reset to identity</li>",ze,tt,gt,bt=ge(xe),re=[];for(let t=0;t<bt.length;t+=1)re[t]=Yt(Xt(e,bt,t));let Te=ge(xe[e[10]].params??[]),I=[];for(let t=0;t<Te.length;t+=1)I[t]=Pt(Lt(e,Te,t));function Ut(t){e[25](t)}let vt={};e[2]!==void 0&&(vt.checked=e[2]),q=new Et({props:vt}),He.push(()=>st(q,"checked",Ut));function zt(t){e[26](t)}let yt={};e[3]!==void 0&&(yt.checked=e[3]),G=new Et({props:yt}),He.push(()=>st(G,"checked",zt));let we=ge(Array(2)),L=[];for(let t=0;t<we.length;t+=1)L[t]=At(Ct(e,we,t));function Nt(t){e[32](t)}let Tt={class:"w-full h-[600px] self-center",visibleRect:[-5.3,-5,5.3,5],use:["katex","CindyGL"]};return e[11]!==void 0&&(Tt.cindy=e[11]),J=new Qt({props:Tt}),He.push(()=>st(J,"cindy",Nt)),e[33](J),J.$on("load",e[34]),{c(){l=c("script"),l.textContent=n,r=c("script"),r.textContent=i,a=M(),u=M(),y=c("div"),m=c("div"),S=c("label"),W=B(`Modular form:\r
      `),w=c("select");for(let t=0;t<re.length;t+=1)re[t].c();g=M(),v=c("label"),$=B("Terms: "),E=c("input"),ee=M(),H=c("label"),b=B("Level: "),D=c("input"),ae=M(),se=c("label"),Ee=B("Weight: "),U=c("input"),Ce=M();for(let t=0;t<I.length;t+=1)I[t].c();be=M(),j=c("div"),F=c("div"),C=c("div"),Ie=B("Upper half plane "),it(q.$$.fragment),Pe=B(`\r
      Transform `),it(G.$$.fragment),Ae=M(),ie=c("span"),ie.textContent=Oe,K=c("input"),De=M(),oe=c("span"),oe.textContent=f,P=c("input"),Q=B(`\r
    Matrix\r
    `),ue=c("div"),pe=c("div");for(let t=0;t<L.length;t+=1)L[t].c();qe=B(`\r
      det = `),Re=B(Ue),Ge=M(),fe=c("div"),me=c("button"),me.textContent=pt,Qe=M(),_e=c("button"),_e.textContent=mt,Je=M(),it(J.$$.fragment),Fe=M(),O=c("div"),de=c("label"),Ye=B("CindyScript: "),te=c("input"),Ze=M(),ne=c("textarea"),$e=M(),ve=c("h2"),ve.textContent=_t,et=M(),ye=c("ul"),ye.innerHTML=dt,this.h()},l(t){const _=Ot("svelte-x2wlf",document.head);l=h(_,"SCRIPT",{id:!0,type:!0,"data-svelte-h":!0}),he(l)!=="svelte-996c16"&&(l.textContent=n),r=h(_,"SCRIPT",{id:!0,type:!0,"data-svelte-h":!0}),he(r)!=="svelte-1crwtgr"&&(r.textContent=i),_.forEach(p),a=A(t),u=A(t),y=h(t,"DIV",{});var T=x(y);m=h(T,"DIV",{class:!0});var R=x(m);S=h(R,"LABEL",{});var ke=x(S);W=V(ke,`Modular form:\r
      `),w=h(ke,"SELECT",{});var d=x(w);for(let Y=0;Y<re.length;Y+=1)re[Y].l(d);d.forEach(p),ke.forEach(p),g=A(R),v=h(R,"LABEL",{});var le=x(v);$=V(le,"Terms: "),E=h(le,"INPUT",{type:!0,min:!0,max:!0,class:!0}),le.forEach(p),ee=A(R),H=h(R,"LABEL",{});var nt=x(H);b=V(nt,"Level: "),D=h(nt,"INPUT",{type:!0,min:!0,max:!0,class:!0}),nt.forEach(p),ae=A(R),se=h(R,"LABEL",{});var rt=x(se);Ee=V(rt,"Weight: "),U=h(rt,"INPUT",{type:!0,min:!0,max:!0,step:!0,class:!0}),rt.forEach(p),Ce=A(R);for(let Y=0;Y<I.length;Y+=1)I[Y].l(R);R.forEach(p),T.forEach(p),be=A(t),j=h(t,"DIV",{class:!0});var Ke=x(j);F=h(Ke,"DIV",{class:!0});var Se=x(F);C=h(Se,"DIV",{class:!0});var X=x(C);Ie=V(X,"Upper half plane "),ot(q.$$.fragment,X),Pe=V(X,`\r
      Transform `),ot(G.$$.fragment,X),Ae=A(X),ie=h(X,"SPAN",{"data-svelte-h":!0}),he(ie)!=="svelte-8thac"&&(ie.textContent=Oe),K=h(X,"INPUT",{type:!0,min:!0,max:!0}),De=A(X),oe=h(X,"SPAN",{"data-svelte-h":!0}),he(oe)!=="svelte-9ym2i3"&&(oe.textContent=f),P=h(X,"INPUT",{type:!0,min:!0,max:!0}),X.forEach(p),Q=V(Se,`\r
    Matrix\r
    `),ue=h(Se,"DIV",{class:!0});var Be=x(ue);pe=h(Be,"DIV",{class:!0});var wt=x(pe);for(let Y=0;Y<L.length;Y+=1)L[Y].l(wt);wt.forEach(p),qe=V(Be,`\r
      det = `),Re=V(Be,Ue),Be.forEach(p),Ge=A(Se),fe=h(Se,"DIV",{class:!0});var Ve=x(fe);me=h(Ve,"BUTTON",{"data-svelte-h":!0}),he(me)!=="svelte-1xyrr1k"&&(me.textContent=pt),Qe=A(Ve),_e=h(Ve,"BUTTON",{"data-svelte-h":!0}),he(_e)!=="svelte-iafpft"&&(_e.textContent=mt),Ve.forEach(p),Se.forEach(p),Je=A(Ke),ot(J.$$.fragment,Ke),Ke.forEach(p),Fe=A(t),O=h(t,"DIV",{class:!0});var ce=x(O);de=h(ce,"LABEL",{class:!0});var lt=x(de);Ye=V(lt,"CindyScript: "),te=h(lt,"INPUT",{class:!0,autocomplete:!0}),lt.forEach(p),Ze=A(ce),ne=h(ce,"TEXTAREA",{class:!0}),x(ne).forEach(p),$e=A(ce),ve=h(ce,"H2",{"data-svelte-h":!0}),he(ve)!=="svelte-18fx0gf"&&(ve.textContent=_t),et=A(ce),ye=h(ce,"UL",{"data-svelte-h":!0}),he(ye)!=="svelte-7xqlrp"&&(ye.innerHTML=dt),ce.forEach(p),this.h()},h(){document.title="Modular Forms",o(l,"id","csinit"),o(l,"type","text/x-cindyscript"),o(r,"id","csdraw"),o(r,"type","text/x-cindyscript"),e[10]===void 0&&Rt(()=>e[18].call(w)),o(E,"type","number"),o(E,"min","1"),o(E,"max","100"),o(E,"class","w-20"),o(D,"type","number"),o(D,"min","1"),o(D,"max","100"),o(D,"class","w-20"),o(U,"type","number"),o(U,"min","-100"),o(U,"max","100"),o(U,"step","0.5"),o(U,"class","w-20"),o(m,"class","bg-indigo-300/20 p-2 shadow-md flex flex-wrap gap-2"),o(K,"type","number"),o(K,"min","0"),o(K,"max","12"),o(P,"type","number"),o(P,"min","1"),o(P,"max","20"),o(C,"class","grid grid-cols-[1fr_60px]"),o(pe,"class","grid grid-cols-2 w-auto"),o(ue,"class","border border-indigo-300 bg-red-500/20 px-2 py-1 my-1 text-center self-center"),o(fe,"class","text-center"),o(F,"class","flex flex-col bg-indigo-300/20 p-2 my-2 shadow-md w-[250px]"),o(j,"class","flex gap-2"),o(te,"class","w-full font-mono text-sm"),o(te,"autocomplete","off"),o(de,"class","flex gap-2 items-center"),o(ne,"class","w-full h-32 font-mono text-sm"),ne.readOnly=!0,o(O,"class","flex flex-col gap-2 bg-indigo-300/20 p-2 my-1 shadow-md")},m(t,_){s(document.head,l),s(document.head,r),Z(t,a,_),Z(t,u,_),Z(t,y,_),s(y,m),s(m,S),s(S,W),s(S,w);for(let T=0;T<re.length;T+=1)re[T]&&re[T].m(w,null);kt(w,e[10],!0),e[19](w),s(m,g),s(m,v),s(v,$),s(v,E),k(E,e[1]),s(m,ee),s(m,H),s(H,b),s(H,D),k(D,e[5]),s(m,ae),s(m,se),s(se,Ee),s(se,U),k(U,e[6]),s(m,Ce);for(let T=0;T<I.length;T+=1)I[T]&&I[T].m(m,null);Z(t,be,_),Z(t,j,_),s(j,F),s(F,C),s(C,Ie),ut(q,C,null),s(C,Pe),ut(G,C,null),s(C,Ae),s(C,ie),s(C,K),k(K,e[7]),s(C,De),s(C,oe),s(C,P),k(P,e[4]),s(F,Q),s(F,ue),s(ue,pe);for(let T=0;T<L.length;T+=1)L[T]&&L[T].m(pe,null);s(ue,qe),s(ue,Re),s(F,Ge),s(F,fe),s(fe,me),s(fe,Qe),s(fe,_e),s(j,Je),ut(J,j,null),Z(t,Fe,_),Z(t,O,_),s(O,de),s(de,Ye),s(de,te),k(te,e[0]),s(O,Ze),s(O,ne),k(ne,e[14]),s(O,$e),s(O,ve),s(O,et),s(O,ye),ze=!0,tt||(gt=[z(document,"keydown",e[17]),z(w,"change",e[18]),z(E,"input",e[20]),z(D,"input",e[21]),z(U,"input",e[22]),z(K,"input",e[27]),z(P,"input",e[28]),z(me,"click",e[30]),z(_e,"click",e[31]),z(te,"input",e[35]),z(ne,"input",e[36])],tt=!0)},p(t,_){if(_[0]&1024&&kt(w,t[10]),_[0]&2&&N(E.value)!==t[1]&&k(E,t[1]),_[0]&32&&N(D.value)!==t[5]&&k(D,t[5]),_[0]&64&&N(U.value)!==t[6]&&k(U,t[6]),_[0]&99328){Te=ge(xe[t[10]].params??[]);let d;for(d=0;d<Te.length;d+=1){const le=Lt(t,Te,d);I[d]?I[d].p(le,_):(I[d]=Pt(le),I[d].c(),I[d].m(m,null))}for(;d<I.length;d+=1)I[d].d(1);I.length=Te.length}const T={};!Le&&_[0]&4&&(Le=!0,T.checked=t[2],at(()=>Le=!1)),q.$set(T);const R={};if(!Me&&_[0]&8&&(Me=!0,R.checked=t[3],at(()=>Me=!1)),G.$set(R),_[0]&128&&N(K.value)!==t[7]&&k(K,t[7]),_[0]&16&&N(P.value)!==t[4]&&k(P,t[4]),_[0]&256){we=ge(Array(2));let d;for(d=0;d<we.length;d+=1){const le=Ct(t,we,d);L[d]?L[d].p(le,_):(L[d]=At(le),L[d].c(),L[d].m(pe,null))}for(;d<L.length;d+=1)L[d].d(1);L.length=we.length}(!ze||_[0]&256)&&Ue!==(Ue=t[8][0][0]*t[8][1][1]-t[8][0][1]*t[8][1][0]+"")&&Ft(Re,Ue);const ke={};!Xe&&_[0]&2048&&(Xe=!0,ke.cindy=t[11],at(()=>Xe=!1)),J.$set(ke),_[0]&1&&te.value!==t[0]&&k(te,t[0]),_[0]&16384&&k(ne,t[14])},i(t){ze||(ft(q.$$.fragment,t),ft(G.$$.fragment,t),ft(J.$$.fragment,t),ze=!0)},o(t){ct(q.$$.fragment,t),ct(G.$$.fragment,t),ct(J.$$.fragment,t),ze=!1},d(t){t&&(p(a),p(u),p(y),p(be),p(j),p(Fe),p(O)),p(l),p(r),je(re,t),e[19](null),je(I,t),ht(q),ht(G),je(L,t),e[33](null),ht(J),tt=!1,Dt(gt)}}}function $t(e){if(e){let[[l,n],[r,i]]=e;return[[l,n],[r,i]]}}function Ne(e,l){let[[n,r],[i,a]]=e,[[u,y],[m,S]]=l;return[[n*u+r*m,n*y+r*S],[i*u+a*m,i*y+a*S]]}function en(e,l,n){let r,i;Kt(e,We,f=>n(10,i=f));let a,u,y,m="",S="",W=15,w=!1,g=!1,v=7,$=1,E=0,ee=1,H=Array(50).fill(0),b=[[0,-1],[1,0]];function D(f,P=!1){let Q=u==null?void 0:u.csEval(f);P&&Q&&n(14,S=Q)}function ae(f=!1,P=!1){if(f){if(r.params)for(let Q=0;Q<r.params.length;Q++)n(15,H[Q]=r.params[Q].default??0,H);n(3,g=!1),n(5,$=r.level),n(6,E=r.weight),n(7,ee=r.rot??1)}r.getFunction&&(P&&n(0,m=""),n(0,m=`f(tau) := ${r.getFunction(H)}`))}function se(f){if(!(f.target instanceof HTMLInputElement&&f.target.type==="text"))switch(f.key){case"h":n(2,w=!w),f.preventDefault();break;case" ":n(3,g=!g),f.preventDefault();break;case"t":case"T":n(8,b=Ne(b,[[1,f.shiftKey?-1:1],[0,1]])),n(3,g=!0);break;case"r":case"R":n(8,b=Ne(b,[[1,0],[f.shiftKey?1:-1,1]])),n(3,g=!0);break;case"s":case"S":n(8,b=Ne(b,[[0,f.shiftKey?1:-1],[f.shiftKey?-1:1,0]])),n(3,g=!0);break;case"w":case"W":n(8,b=Ne([[1,f.shiftKey?-1:1],[0,1]],b)),n(3,g=!0);break;case"q":case"Q":n(8,b=Ne([[1,0],[f.shiftKey?1:-1,1]],b)),n(3,g=!0);break;case"f":n(8,b=[[0,-1],[$,0]]),n(3,g=!0);break;case"i":n(8,b=[[1,0],[0,1]]),n(3,g=!0);break;case"ArrowUp":f.ctrlKey&&(xt(We,i=Math.max(0,Math.min(xe.length-1,i-1)),i),f.preventDefault());break;case"ArrowDown":f.ctrlKey&&(xt(We,i=Math.max(0,Math.min(xe.length-1,i+1)),i),f.preventDefault());break}}function Ee(){i=jt(this),We.set(i)}function U(f){He[f?"unshift":"push"](()=>{y=f,n(13,y)})}function Ce(){W=N(this.value),n(1,W)}function be(){$=N(this.value),n(5,$)}function j(){E=N(this.value),n(6,E)}function F(f){H[f]=N(this.value),n(15,H)}const C=()=>{ae()};function Ie(f){w=f,n(2,w)}function q(f){g=f,n(3,g)}function Le(){ee=N(this.value),n(7,ee)}function Pe(){v=N(this.value),n(4,v)}function G(f,P){b[f][P]=N(this.value),n(8,b)}const Me=()=>n(8,b=$t(r.mat)??[[0,-1],[1,0]]),Ae=()=>n(8,b=[[1,0],[0,1]]);function ie(f){a=f,n(11,a)}function Oe(f){He[f?"unshift":"push"](()=>{u=f,n(12,u)})}const K=()=>ae(!1,!0);function De(){m=this.value,n(0,m)}function oe(){S=this.value,n(14,S)}return e.$$.update=()=>{e.$$.dirty[0]&1024&&n(9,r=xe[i]),e.$$.dirty[0]&512&&r&&ae(!0),e.$$.dirty[0]&1&&D(m,!0),e.$$.dirty[0]&510&&D(`upperHalfPlane = ${w}; transform = ${g}; level = ${$}; weight = ${E}; rot = ${ee}; brightnessScale = ${v}; numTerms = ${W}; mat = [[${b[0][0]},${b[0][1]}],[${b[1][0]},${b[1][1]}]]`)},[m,W,w,g,v,$,E,ee,b,r,i,a,u,y,S,H,ae,se,Ee,U,Ce,be,j,F,C,Ie,q,Le,Pe,G,Me,Ae,ie,Oe,K,De,oe]}class un extends qt{constructor(l){super(),Gt(this,l,en,Zt,Ht,{},null,[-1,-1])}}export{un as component,on as universal};
