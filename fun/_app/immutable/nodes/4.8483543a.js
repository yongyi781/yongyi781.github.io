import{s as Ht,p as Me,f as p,a as P,l as j,D as Rt,g as m,u as de,d as _,c as L,h as M,m as G,j as u,E as Bt,w as i,i as H,F as xt,G as T,H as N,I as O,J as Ye,n as Vt,K as Ze,L as dt,y as qt,o as Wt,x as jt,M as Gt,N as Qt,e as It,O as Pt,P as Jt}from"../chunks/scheduler.668a7a52.js";import{S as Xt,i as Yt,f as $e,b as et,d as tt,m as nt,a as ke,t as Le,c as Zt,e as rt,g as $t}from"../chunks/index.040105a2.js";import{e as Te}from"../chunks/each.e59479a4.js";import{S as _t,C as en}from"../chunks/index.27d4979e.js";import{s as Xe}from"../chunks/stores.d42eba0e.js";import{m as Ae,f as tn}from"../chunks/modularForms.28abc55f.js";const nn=!0,_n=Object.freeze(Object.defineProperty({__proto__:null,prerender:nn},Symbol.toStringTag,{value:"Module"}));function Lt(e,l,t){const r=e.slice();return r[46]=l[t],r[47]=l,r[48]=t,r}function Mt(e,l,t){const r=e.slice();return r[46]=l[t],r[49]=l,r[50]=t,r}function At(e,l,t){const r=e.slice();return r[51]=l[t],r[52]=l,r[48]=t,r}function rn(e,l,t){const r=e.slice();return r[53]=l[t],r[48]=t,r}function ln(e){let l,t=e[53].name+"",r;return{c(){l=p("option"),r=j(t),this.h()},l(s){l=m(s,"OPTION",{});var a=M(l);r=G(a,t),a.forEach(_),this.h()},h(){l.__value=e[48],T(l,l.__value)},m(s,a){H(s,l,a),i(l,r)},p:jt,d(s){s&&_(l)}}}function Ut(e){let l,t,r=e[51].name+"",s,a,f,k,d,w,K;function c(){e[29].call(a,e[48])}return{c(){l=p("label"),t=new Gt(!1),s=j(`:\r
        `),a=p("input"),this.h()},l(h){l=m(h,"LABEL",{});var v=M(l);t=Qt(v,!1),s=G(v,`:\r
        `),a=m(v,"INPUT",{type:!0,class:!0,min:!0,max:!0,step:!0}),v.forEach(_),this.h()},h(){t.a=s,u(a,"type","number"),u(a,"class","w-14"),u(a,"min",f=e[51].min??-100),u(a,"max",k=e[51].max??100),u(a,"step",d=e[51].step??1)},m(h,v){H(h,l,v),t.m(r,l),i(l,s),i(l,a),T(a,e[16][e[48]]),w||(K=[N(a,"input",c),N(a,"change",e[30])],w=!0)},p(h,v){e=h,v[0]&2048&&r!==(r=e[51].name+"")&&t.p(r),v[0]&2048&&f!==(f=e[51].min??-100)&&u(a,"min",f),v[0]&2048&&k!==(k=e[51].max??100)&&u(a,"max",k),v[0]&2048&&d!==(d=e[51].step??1)&&u(a,"step",d),v[0]&65536&&O(a.value)!==e[16][e[48]]&&T(a,e[16][e[48]])},d(h){h&&_(l),w=!1,dt(K)}}}function Dt(e){let l,t,r,s,a,f,k,d;function w(c){e[35](c)}let K={};return e[17]!==void 0&&(K.checked=e[17]),t=new _t({props:K}),Me.push(()=>$e(t,"checked",w)),t.$on("change",e[20]),{c(){l=j("Listen "),et(t.$$.fragment),s=P(),a=p("input"),this.h()},l(c){l=G(c,"Listen "),tt(t.$$.fragment,c),s=L(c),a=m(c,"INPUT",{type:!0,class:!0,min:!0,max:!0,step:!0}),this.h()},h(){u(a,"type","range"),u(a,"class","col-span-2"),u(a,"min","20"),u(a,"max","2000"),u(a,"step","0.001")},m(c,h){H(c,l,h),nt(t,c,h),H(c,s,h),H(c,a,h),T(a,e[8]),f=!0,k||(d=[N(a,"change",e[36]),N(a,"input",e[36])],k=!0)},p(c,h){const v={};!r&&h[0]&131072&&(r=!0,v.checked=c[17],Ye(()=>r=!1)),t.$set(v),h[0]&256&&T(a,c[8])},i(c){f||(ke(t.$$.fragment,c),f=!0)},o(c){Le(t.$$.fragment,c),f=!1},d(c){c&&(_(l),_(s),_(a)),rt(t,c),k=!1,dt(d)}}}function zt(e){let l,t,r;function s(){e[37].call(l,e[48],e[50])}return{c(){l=p("input"),this.h()},l(a){l=m(a,"INPUT",{type:!0,class:!0}),this.h()},h(){u(l,"type","number"),u(l,"class","w-[60px]")},m(a,f){H(a,l,f),T(l,e[9][e[48]][e[50]]),t||(r=N(l,"input",s),t=!0)},p(a,f){e=a,f[0]&512&&O(l.value)!==e[9][e[48]][e[50]]&&T(l,e[9][e[48]][e[50]])},d(a){a&&_(l),t=!1,r()}}}function Nt(e){let l,t=Te(Array(2)),r=[];for(let s=0;s<t.length;s+=1)r[s]=zt(Mt(e,t,s));return{c(){for(let s=0;s<r.length;s+=1)r[s].c();l=It()},l(s){for(let a=0;a<r.length;a+=1)r[a].l(s);l=It()},m(s,a){for(let f=0;f<r.length;f+=1)r[f]&&r[f].m(s,a);H(s,l,a)},p(s,a){if(a[0]&512){t=Te(Array(2));let f;for(f=0;f<t.length;f+=1){const k=Mt(s,t,f);r[f]?r[f].p(k,a):(r[f]=zt(k),r[f].c(),r[f].m(l.parentNode,l))}for(;f<r.length;f+=1)r[f].d(1);r.length=t.length}},d(s){s&&_(l),Ze(r,s)}}}function an(e){let l,t=`hslToRgb(h, s, l) := (\r
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
    f3(g) := (\r
      regional(tau,a,b,c,d);\r
      a = g_1_1;\r
      b = g_1_2;\r
      c = g_2_1;\r
      d = g_2_2;\r
      tau = (a*i + b) / (c*i + d);\r
      det(g)^(weight/2) * (c*i+d)^(-weight) * i^(rot*weight*if(transform,1,0)) * f(tau);\r
    );\r
    f2(tau) := (\r
      regional(s, nn, aa, kk);\r
      s = re(sqrt(im(tau)));\r
      nn = [[1, re(tau)], [0, 1]];\r
      aa = [[s, 0], [0, 1/s]];\r
      kk = [[K.x, -K.y], [K.y, K.x]];\r
      if(transform,f3(mat*nn*aa*kk),f3(nn*aa*kk))\r
    );\r
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
    rot = 0;\r
    numTerms = 15;\r
    coeffs = [1];\r
  `,r,s=`colorplot((\r
      regional(tau, result);\r
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
    drawText(textLoc2 + (-0.1,0.1), "$f(\\infty i)=" + complexToTex(f2(100*i)/10^weight), color->grey(0.7), size->18, align->"right");`,a,f,k,d,w,K,c,h,v,ne,A,ae,R,re,U,he,F,x,g,we,se,X,B,S,Ue,Y,De,ze,Z,Ne,Oe,pe,qe="Rotation",Q,Ke,me,We="Brightness scale",J,Fe,He,le,ie,Re,ge=e[9][0][0]*e[9][1][1]-e[9][0][1]*e[9][1][0]+"",o,$,I,be,gt="Default",lt,ye,bt="Id",at,ee,st,je,V,ve,it,oe,ot,ue,ut,Se,yt="Legend",ft,Ce,vt="<li>H: toggle upper half plane</li> <li>Space: toggle transform</li> <li>T: τ ↦ τ + 1 (Shift+T to perform inverse)</li> <li>R: τ ↦ τ/(1 - τ) (Shift+R to perform inverse)</li> <li>S: τ ↦ −1/τ</li> <li>W: τ ↦ τ + 1 left action</li> <li>Q: τ ↦ τ/(τ + 1) left action</li> <li>F: Fricke involution</li> <li>I: Reset to identity</li>",Be,ct,kt,Tt=Te(Ae),fe=[];for(let n=0;n<Tt.length;n+=1)fe[n]=ln(rn(e,Tt,n));let Ee=Te(Ae[e[11]].params??[]),D=[];for(let n=0;n<Ee.length;n+=1)D[n]=Ut(At(e,Ee,n));function Ot(n){e[31](n)}let wt={};e[2]!==void 0&&(wt.checked=e[2]),Y=new _t({props:wt}),Me.push(()=>$e(Y,"checked",Ot));function Kt(n){e[32](n)}let St={};e[3]!==void 0&&(St.checked=e[3]),Z=new _t({props:St}),Me.push(()=>$e(Z,"checked",Kt));let C=e[10].coefficients&&Dt(e),xe=Te(Array(2)),z=[];for(let n=0;n<xe.length;n+=1)z[n]=Nt(Lt(e,xe,n));function Ft(n){e[40](n)}let Ct={class:"w-full h-[600px] self-center",geometry:[{name:"O",type:"Free",pos:[0,-0,4],color:[1,0,0],pinned:!0,visible:!1,labeled:!1},{name:"C0",type:"CircleByFixedRadius",color:[0,0,1],radius:2,args:["O"],printname:"$C_{0}$"},{name:"K",type:"PointOnCircle",pos:[4,-0,4],color:[1,0,0],args:["C0"],labeled:!0}],visibleRect:[-5.3,-5,5.3,5],use:["katex","CindyGL"]};return e[12]!==void 0&&(Ct.cindy=e[12]),ee=new en({props:Ct}),Me.push(()=>$e(ee,"cindy",Ft)),e[41](ee),ee.$on("load",e[42]),{c(){l=p("script"),l.textContent=t,r=p("script"),r.textContent=s,a=P(),f=P(),k=p("div"),d=p("div"),w=p("label"),K=j(`Modular form:\r
      `),c=p("select");for(let n=0;n<fe.length;n+=1)fe[n].c();h=P(),v=p("label"),ne=j("Terms: "),A=p("input"),ae=P(),R=p("label"),re=j("Level: "),U=p("input"),he=P(),F=p("label"),x=j("Weight: "),g=p("input"),we=P();for(let n=0;n<D.length;n+=1)D[n].c();se=P(),X=p("div"),B=p("div"),S=p("div"),Ue=j("Upper half plane "),et(Y.$$.fragment),ze=j(`\r
      Transform `),et(Z.$$.fragment),Oe=P(),pe=p("span"),pe.textContent=qe,Q=p("input"),Ke=P(),me=p("span"),me.textContent=We,J=p("input"),Fe=P(),C&&C.c(),He=j(`\r
    Matrix\r
    `),le=p("div"),ie=p("div");for(let n=0;n<z.length;n+=1)z[n].c();Re=j(`\r
      det = `),o=j(ge),$=P(),I=p("div"),be=p("button"),be.textContent=gt,lt=P(),ye=p("button"),ye.textContent=bt,at=P(),et(ee.$$.fragment),je=P(),V=p("div"),ve=p("label"),it=j("CindyScript: "),oe=p("input"),ot=P(),ue=p("textarea"),ut=P(),Se=p("h2"),Se.textContent=yt,ft=P(),Ce=p("ul"),Ce.innerHTML=vt,this.h()},l(n){const b=Rt("svelte-1nb3y7k",document.head);l=m(b,"SCRIPT",{id:!0,type:!0,"data-svelte-h":!0}),de(l)!=="svelte-l18off"&&(l.textContent=t),r=m(b,"SCRIPT",{id:!0,type:!0,"data-svelte-h":!0}),de(r)!=="svelte-x4x7hq"&&(r.textContent=s),b.forEach(_),a=L(n),f=L(n),k=m(n,"DIV",{});var E=M(k);d=m(E,"DIV",{class:!0});var q=M(d);w=m(q,"LABEL",{});var Ie=M(w);K=G(Ie,`Modular form:\r
      `),c=m(Ie,"SELECT",{});var y=M(c);for(let te=0;te<fe.length;te+=1)fe[te].l(y);y.forEach(_),Ie.forEach(_),h=L(q),v=m(q,"LABEL",{});var ce=M(v);ne=G(ce,"Terms: "),A=m(ce,"INPUT",{type:!0,min:!0,max:!0,class:!0}),ce.forEach(_),ae=L(q),R=m(q,"LABEL",{});var ht=M(R);re=G(ht,"Level: "),U=m(ht,"INPUT",{type:!0,min:!0,max:!0,class:!0}),ht.forEach(_),he=L(q),F=m(q,"LABEL",{});var pt=M(F);x=G(pt,"Weight: "),g=m(pt,"INPUT",{type:!0,min:!0,max:!0,step:!0,class:!0}),pt.forEach(_),we=L(q);for(let te=0;te<D.length;te+=1)D[te].l(q);q.forEach(_),E.forEach(_),se=L(n),X=m(n,"DIV",{class:!0});var Ge=M(X);B=m(Ge,"DIV",{class:!0});var Pe=M(B);S=m(Pe,"DIV",{class:!0});var W=M(S);Ue=G(W,"Upper half plane "),tt(Y.$$.fragment,W),ze=G(W,`\r
      Transform `),tt(Z.$$.fragment,W),Oe=L(W),pe=m(W,"SPAN",{"data-svelte-h":!0}),de(pe)!=="svelte-8thac"&&(pe.textContent=qe),Q=m(W,"INPUT",{type:!0,min:!0,max:!0}),Ke=L(W),me=m(W,"SPAN",{"data-svelte-h":!0}),de(me)!=="svelte-9ym2i3"&&(me.textContent=We),J=m(W,"INPUT",{type:!0,min:!0,max:!0}),Fe=L(W),C&&C.l(W),W.forEach(_),He=G(Pe,`\r
    Matrix\r
    `),le=m(Pe,"DIV",{class:!0});var Qe=M(le);ie=m(Qe,"DIV",{class:!0});var Et=M(ie);for(let te=0;te<z.length;te+=1)z[te].l(Et);Et.forEach(_),Re=G(Qe,`\r
      det = `),o=G(Qe,ge),Qe.forEach(_),$=L(Pe),I=m(Pe,"DIV",{class:!0});var Je=M(I);be=m(Je,"BUTTON",{"data-svelte-h":!0}),de(be)!=="svelte-1xyrr1k"&&(be.textContent=gt),lt=L(Je),ye=m(Je,"BUTTON",{"data-svelte-h":!0}),de(ye)!=="svelte-iafpft"&&(ye.textContent=bt),Je.forEach(_),Pe.forEach(_),at=L(Ge),tt(ee.$$.fragment,Ge),Ge.forEach(_),je=L(n),V=m(n,"DIV",{class:!0});var _e=M(V);ve=m(_e,"LABEL",{class:!0});var mt=M(ve);it=G(mt,"CindyScript: "),oe=m(mt,"INPUT",{class:!0,autocomplete:!0}),mt.forEach(_),ot=L(_e),ue=m(_e,"TEXTAREA",{class:!0}),M(ue).forEach(_),ut=L(_e),Se=m(_e,"H2",{"data-svelte-h":!0}),de(Se)!=="svelte-18fx0gf"&&(Se.textContent=yt),ft=L(_e),Ce=m(_e,"UL",{"data-svelte-h":!0}),de(Ce)!=="svelte-7xqlrp"&&(Ce.innerHTML=vt),_e.forEach(_),this.h()},h(){document.title="Automorphic Forms",u(l,"id","csinit"),u(l,"type","text/x-cindyscript"),u(r,"id","csdraw"),u(r,"type","text/x-cindyscript"),e[11]===void 0&&Bt(()=>e[24].call(c)),u(A,"type","number"),u(A,"min","1"),u(A,"max","100"),u(A,"class","w-20"),u(U,"type","number"),u(U,"min","1"),u(U,"max","100"),u(U,"class","w-20"),u(g,"type","number"),u(g,"min","-100"),u(g,"max","100"),u(g,"step","0.5"),u(g,"class","w-20"),u(d,"class","bg-indigo-300/20 p-2 shadow-md flex flex-wrap gap-2"),u(Q,"type","number"),u(Q,"min","0"),u(Q,"max","12"),u(J,"type","number"),u(J,"min","1"),u(J,"max","20"),u(S,"class","grid grid-cols-[1fr_60px]"),u(ie,"class","grid grid-cols-2 w-auto"),u(le,"class","border border-indigo-300 bg-red-500/20 px-2 py-1 my-1 text-center self-center"),u(I,"class","text-center"),u(B,"class","flex flex-col bg-indigo-300/20 p-2 my-2 shadow-md w-[250px]"),u(X,"class","flex gap-2"),u(oe,"class","w-full font-mono text-sm"),u(oe,"autocomplete","off"),u(ve,"class","flex gap-2 items-center"),u(ue,"class","w-full h-32 font-mono text-sm"),ue.readOnly=!0,u(V,"class","flex flex-col gap-2 bg-indigo-300/20 p-2 my-1 shadow-md")},m(n,b){i(document.head,l),i(document.head,r),H(n,a,b),H(n,f,b),H(n,k,b),i(k,d),i(d,w),i(w,K),i(w,c);for(let E=0;E<fe.length;E+=1)fe[E]&&fe[E].m(c,null);xt(c,e[11],!0),e[25](c),i(d,h),i(d,v),i(v,ne),i(v,A),T(A,e[1]),i(d,ae),i(d,R),i(R,re),i(R,U),T(U,e[5]),i(d,he),i(d,F),i(F,x),i(F,g),T(g,e[6]),i(d,we);for(let E=0;E<D.length;E+=1)D[E]&&D[E].m(d,null);H(n,se,b),H(n,X,b),i(X,B),i(B,S),i(S,Ue),nt(Y,S,null),i(S,ze),nt(Z,S,null),i(S,Oe),i(S,pe),i(S,Q),T(Q,e[7]),i(S,Ke),i(S,me),i(S,J),T(J,e[4]),i(S,Fe),C&&C.m(S,null),i(B,He),i(B,le),i(le,ie);for(let E=0;E<z.length;E+=1)z[E]&&z[E].m(ie,null);i(le,Re),i(le,o),i(B,$),i(B,I),i(I,be),i(I,lt),i(I,ye),i(X,at),nt(ee,X,null),H(n,je,b),H(n,V,b),i(V,ve),i(ve,it),i(ve,oe),T(oe,e[0]),i(V,ot),i(V,ue),T(ue,e[15]),i(V,ut),i(V,Se),i(V,ft),i(V,Ce),Be=!0,ct||(kt=[N(document,"keydown",e[19]),N(c,"change",e[24]),N(A,"input",e[26]),N(U,"input",e[27]),N(g,"input",e[28]),N(Q,"input",e[33]),N(J,"input",e[34]),N(be,"click",e[38]),N(ye,"click",e[39]),N(oe,"input",e[43]),N(ue,"input",e[44])],ct=!0)},p(n,b){if(b[0]&2048&&xt(c,n[11]),b[0]&2&&O(A.value)!==n[1]&&T(A,n[1]),b[0]&32&&O(U.value)!==n[5]&&T(U,n[5]),b[0]&64&&O(g.value)!==n[6]&&T(g,n[6]),b[0]&329728){Ee=Te(Ae[n[11]].params??[]);let y;for(y=0;y<Ee.length;y+=1){const ce=At(n,Ee,y);D[y]?D[y].p(ce,b):(D[y]=Ut(ce),D[y].c(),D[y].m(d,null))}for(;y<D.length;y+=1)D[y].d(1);D.length=Ee.length}const E={};!De&&b[0]&4&&(De=!0,E.checked=n[2],Ye(()=>De=!1)),Y.$set(E);const q={};if(!Ne&&b[0]&8&&(Ne=!0,q.checked=n[3],Ye(()=>Ne=!1)),Z.$set(q),b[0]&128&&O(Q.value)!==n[7]&&T(Q,n[7]),b[0]&16&&O(J.value)!==n[4]&&T(J,n[4]),n[10].coefficients?C?(C.p(n,b),b[0]&1024&&ke(C,1)):(C=Dt(n),C.c(),ke(C,1),C.m(S,null)):C&&($t(),Le(C,1,1,()=>{C=null}),Zt()),b[0]&512){xe=Te(Array(2));let y;for(y=0;y<xe.length;y+=1){const ce=Lt(n,xe,y);z[y]?z[y].p(ce,b):(z[y]=Nt(ce),z[y].c(),z[y].m(ie,null))}for(;y<z.length;y+=1)z[y].d(1);z.length=xe.length}(!Be||b[0]&512)&&ge!==(ge=n[9][0][0]*n[9][1][1]-n[9][0][1]*n[9][1][0]+"")&&Vt(o,ge);const Ie={};!st&&b[0]&4096&&(st=!0,Ie.cindy=n[12],Ye(()=>st=!1)),ee.$set(Ie),b[0]&1&&oe.value!==n[0]&&T(oe,n[0]),b[0]&32768&&T(ue,n[15])},i(n){Be||(ke(Y.$$.fragment,n),ke(Z.$$.fragment,n),ke(C),ke(ee.$$.fragment,n),Be=!0)},o(n){Le(Y.$$.fragment,n),Le(Z.$$.fragment,n),Le(C),Le(ee.$$.fragment,n),Be=!1},d(n){n&&(_(a),_(f),_(k),_(se),_(X),_(je),_(V)),_(l),_(r),Ze(fe,n),e[25](null),Ze(D,n),rt(Y),rt(Z),C&&C.d(),Ze(z,n),e[41](null),rt(ee),ct=!1,dt(kt)}}}function sn(e){if(e){let[[l,t],[r,s]]=e;return[[l,t],[r,s]]}}function Ve(e,l){let[[t,r],[s,a]]=e,[[f,k],[d,w]]=l;return[[t*f+r*d,t*k+r*w],[s*f+a*d,s*k+a*w]]}function on(e,l,t){let r,s;qt(e,Xe,o=>t(11,s=o));let a,f,k,d="",w="",K=15,c=!1,h=!1,v=7,ne=1,A=0,ae=1,R=Array(50).fill(0),re=!1,U=0,he=174,F,x,g=[[0,-1],[1,0]];function we(o,$=!1){let I=f==null?void 0:f.csEval(o);$&&I&&t(15,w=I)}function se(o=!1,$=!1){if(o){if(r.params)for(let I=0;I<r.params.length;I++)t(16,R[I]=r.params[I].default??0,R);t(3,h=!1),t(5,ne=r.level),t(6,A=r.weight),t(7,ae=r.rot??1),t(3,h=!0),t(3,h=!1)}$&&t(0,d=""),r.getFunction?t(0,d=`f(tau) := ${r.getFunction(R)}`):r.coefficients&&t(0,d=`f(tau) := ${tn(r.coefficients)}`),r.coefficients||(t(17,re=!1),B())}function X(o){if(!(o.target instanceof HTMLInputElement&&o.target.type==="text"))switch(o.key){case"h":t(2,c=!c),o.preventDefault();break;case" ":t(3,h=!h),o.preventDefault();break;case"t":case"T":t(9,g=Ve(g,[[1,o.shiftKey?-1:1],[0,1]])),t(3,h=!0);break;case"r":case"R":t(9,g=Ve(g,[[1,0],[o.shiftKey?1:-1,1]])),t(3,h=!0);break;case"s":case"S":t(9,g=Ve(g,[[0,o.shiftKey?1:-1],[o.shiftKey?-1:1,0]])),t(3,h=!0);break;case"w":case"W":t(9,g=Ve([[1,o.shiftKey?-1:1],[0,1]],g)),t(3,h=!0);break;case"q":case"Q":t(9,g=Ve([[1,0],[o.shiftKey?1:-1,1]],g)),t(3,h=!0);break;case"f":t(9,g=[[0,-1],[ne,0]]),t(3,h=!0);break;case"i":t(9,g=[[1,0],[0,1]]),t(3,h=!0);break;case"ArrowUp":o.ctrlKey&&(Pt(Xe,s=Math.max(0,Math.min(Ae.length-1,s-1)),s),o.preventDefault());break;case"ArrowDown":o.ctrlKey&&(Pt(Xe,s=Math.max(0,Math.min(Ae.length-1,s+1)),s),o.preventDefault());break}}function B(){if(re&&r.coefficients){F||t(22,F=new AudioContext),t(23,x=F.createOscillator());let o=F.createGain();o.gain.value=.05,o.connect(F.destination),x.connect(o),x.start()}else x&&(x.stop(),x.disconnect(),t(23,x=null))}Wt(()=>(setInterval(()=>{re&&(t(21,U+=.005),U>.5&&t(21,U=0))},17),()=>{x&&(x.stop(),x.disconnect())}));function S(){s=Jt(this),Xe.set(s)}function Ue(o){Me[o?"unshift":"push"](()=>{k=o,t(14,k)})}function Y(){K=O(this.value),t(1,K)}function De(){ne=O(this.value),t(5,ne)}function ze(){A=O(this.value),t(6,A)}function Z(o){R[o]=O(this.value),t(16,R)}const Ne=()=>{se()};function Oe(o){c=o,t(2,c)}function pe(o){h=o,t(3,h)}function qe(){ae=O(this.value),t(7,ae)}function Q(){v=O(this.value),t(4,v)}function Ke(o){re=o,t(17,re)}function me(){he=O(this.value),t(8,he)}function We(o,$){g[o][$]=O(this.value),t(9,g)}const J=()=>t(9,g=sn(r.mat)??[[0,-1],[1,0]]),Fe=()=>t(9,g=[[1,0],[0,1]]);function He(o){a=o,t(12,a)}function le(o){Me[o?"unshift":"push"](()=>{f=o,t(13,f)})}const ie=()=>se(!0,!0);function Re(){d=this.value,t(0,d)}function ge(){w=this.value,t(15,w)}return e.$$.update=()=>{if(e.$$.dirty[0]&2048&&t(10,r=Ae[s]),e.$$.dirty[0]&1024&&r&&se(!0),e.$$.dirty[0]&1&&we(d,!0),e.$$.dirty[0]&766&&we(`upperHalfPlane = ${c}; transform = ${h}; level = ${ne}; weight = ${A}; rot = ${ae}; brightnessScale = ${v}; numTerms = ${K}; mat = [[${g[0][0]},${g[0][1]}],[${g[1][0]},${g[1][1]}]]`),e.$$.dirty[0]&14681344&&x&&r.coefficients){let o=F.createPeriodicWave(r.coefficients.map(($,I)=>$*Math.exp(-2*Math.PI*I*U)),Array(r.coefficients.length).fill(0));t(23,x.frequency.value=he*(r.fourierScale??1),x),x.setPeriodicWave(o)}},[d,K,c,h,v,ne,A,ae,he,g,r,s,a,f,k,w,R,re,se,X,B,U,F,x,S,Ue,Y,De,ze,Z,Ne,Oe,pe,qe,Q,Ke,me,We,J,Fe,He,le,ie,Re,ge]}class dn extends Xt{constructor(l){super(),Yt(this,l,on,an,Ht,{},null,[-1,-1])}}export{dn as component,_n as universal};
