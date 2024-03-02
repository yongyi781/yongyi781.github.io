import{s as xt,p as je,f as b,a as $,l as d,M as E,D as Tt,g as v,u as ae,d as p,c as F,h as I,m as _,N as P,j as w,w as i,i as S,G as Z,H as Se,J as Ze,n as St,K as ft,L as kt,e as et,I as pt}from"../chunks/scheduler.668a7a52.js";import{S as Ct,i as Et,f as tt,b as at,d as rt,m as nt,a as lt,t as st,e as it}from"../chunks/index.040105a2.js";import{e as ke}from"../chunks/each.e59479a4.js";import{m as z,S as It,C as Pt}from"../chunks/index.27d4979e.js";const zt=!0,Ot=Object.freeze(Object.defineProperty({__proto__:null,prerender:zt},Symbol.toStringTag,{value:"Module"}));function ot(a,r,n){const t=a.slice();return t[14]=r[n],t[15]=r,t[16]=n,t}function ct(a,r,n){const t=a.slice();return t[14]=r[n],t[17]=r,t[18]=n,t}function ut(a){let r,n,t;function o(){a[8].call(r,a[16],a[18])}return{c(){r=b("input"),this.h()},l(c){r=v(c,"INPUT",{type:!0,class:!0}),this.h()},h(){w(r,"type","number"),w(r,"class","w-[60px]")},m(c,s){S(c,r,s),Z(r,a[2][a[16]][a[18]]),n||(t=Se(r,"input",o),n=!0)},p(c,s){a=c,s&4&&pt(r.value)!==a[2][a[16]][a[18]]&&Z(r,a[2][a[16]][a[18]])},d(c){c&&p(r),n=!1,t()}}}function ht(a){let r,n=ke(Array(2)),t=[];for(let o=0;o<n.length;o+=1)t[o]=ut(ct(a,n,o));return{c(){for(let o=0;o<t.length;o+=1)t[o].c();r=et()},l(o){for(let c=0;c<t.length;c+=1)t[c].l(o);r=et()},m(o,c){for(let s=0;s<t.length;s+=1)t[s]&&t[s].m(o,c);S(o,r,c)},p(o,c){if(c&4){n=ke(Array(2));let s;for(s=0;s<n.length;s+=1){const l=ct(o,n,s);t[s]?t[s].p(l,c):(t[s]=ut(l),t[s].c(),t[s].m(r.parentNode,r))}for(;s<t.length;s+=1)t[s].d(1);t.length=n.length}},d(o){o&&p(r),ft(t,o)}}}function Rt(a){let r,n=`hslToRgb(h, s, l) := (\r
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
      matrixToTex(g) := "\\begin{pmatrix}" + g_1_1 + "&" + g_1_2 + "\\\\" + g_2_1 + "&" + g_2_2 + "\\end{pmatrix}";\r
      getSL2Element(tau) := re(1/sqrt(im(tau))) * [[im(tau), re(tau)], [0, 1]] * [[K.y, -K.x], [K.x, K.y]];\r
      f(tau, testNum) := (\r
        regional(g, a, b, c, d, a', b', c', d', gh, e1, e2);\r
        g = getSL2Element(tau);\r
        a = g_1_1;\r
        b = g_1_2;\r
        c = g_2_1;\r
        d = g_2_2;\r
        a' = h_1_1;\r
        b' = h_1_2;\r
        c' = h_2_1;\r
        d' = h_2_2;\r
        gh = h * g;\r
        // e1 = sqrt(c*((a'*testNum+b')/(c'*testNum+d'))+d)*sqrt(c'*testNum+d');\r
        e1 = sqrt(c'*((a*testNum+b)/(c*testNum+d))+d')*sqrt(c*testNum+d);\r
        e2 = sqrt(gh_2_1*testNum+gh_2_2);\r
        (|e1 - e2|, |e1 + e2|)\r
      );\r
      \r
      resetclock();\r
      scale = 15;\r
      transform = false;\r
      upperHalfPlane = true;\r
      halfPlaneOffset = 2;\r
      diskScale = 2.8;\r
      h = [[1,0],[0,1]];\r
  `,t,o=`colorplot(\r
      regional(tau, res);\r
      tau = fromScreen(z);\r
      if(im(tau)<0,grey(0.1),(\r
        res = f(tau, i);\r
        if(res_1<res_2,grey(0),grey(1));\r
      ));\r
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
    g = getSL2Element(tauMouse);\r
    textLoc = screenbounds()_4_[1,2];\r
    if(im(tauMouse)>=0,(\r
      drawText(textLoc + (0.1,0.4), "$g=" + matrixToTex(g) + ",\\quad hg=" + matrixToTex(h*g) + "\\quad f(g)=" + f(tauMouse, i) + "$", color->grey(0.7), size->18)\r
    ));`,c,s,l,f,k,Ce=z("\\varepsilon(h,g)")+"",j,G,Ee=z("\\operatorname{Mp}_2(\\R)")+"",B,W,Ie=z("h\\in\\operatorname{SL}_2(\\R)")+"",h,M,ne=z("g\\in\\operatorname{SL}_2(\\R)")+"",le,se,mt=z("g=nak")+"",ie,Y,Ge="k",Pe,oe,dt=z("na")+"",ce,ue,_t=z("\\varepsilon(h,g)=1")+"",he,fe,gt=z("\\varepsilon(h,g)=-1")+"",pe,me,x,ze,de,yt=z("k(g)=k(h)")+"",_e,ge,bt=z("k(g)")+"",ye,J,Be="k",Re,Q,We="g = nak",Ke,be,R,O,D,Le,K,Ne,qe,A,H,Me,ee=a[2][0][0]*a[2][1][1]-a[2][0][1]*a[2][1][0]+"",ve,Oe,C,Ae,we,L,U,De,N,He,q,te,Ue,Ye;function vt(e){a[7](e)}let Je={};a[1]!==void 0&&(Je.checked=a[1]),K=new It({props:Je}),je.push(()=>tt(K,"checked",vt));let X=ke(Array(2)),g=[];for(let e=0;e<X.length;e+=1)g[e]=ht(ot(a,X,e));function wt(e){a[9](e)}let Qe={class:"w-full h-[600px] self-center",geometry:[{name:"O",type:"Free",pos:[0,-0,4],color:[1,0,0],pinned:!0,visible:!1,labeled:!1},{name:"C0",type:"CircleByFixedRadius",color:[0,0,1],radius:2,args:["O"],printname:"$C_{0}$"},{name:"K",type:"PointOnCircle",pos:[4,-0,4],color:[1,0,0],args:["C0"],labeled:!0}],visibleRect:[-5.3,-5,5.3,5],use:["katex","CindyGL"]};return a[3]!==void 0&&(Qe.cindy=a[3]),C=new Pt({props:Qe}),je.push(()=>tt(C,"cindy",wt)),a[10](C),{c(){r=b("script"),r.textContent=n,t=b("script"),t.textContent=o,c=$(),s=$(),l=b("p"),f=d("This webpage plots the Rao cocycle "),k=new E(!1),j=d("for the metaplectic group "),G=new E(!1),B=d(`. The matrix control on\r
  the left sidebar sets the element `),W=new E(!1),h=d(". The element "),M=new E(!1),le=d(` is set via its Iwasawa\r
  decomposition `),se=new E(!1),ie=d(". You control "),Y=b("i"),Y.textContent=Ge,Pe=d(" by moving the red dot around the circle. The product "),oe=new E(!1),ce=d(` is represented as a point in\r
  the upper-half plane. The corresponding point is colored black if `),ue=new E(!1),he=d(" and white if "),fe=new E(!1),pe=d("."),me=$(),x=b("p"),ze=d("Fun fact, when "),de=new E(!1),_e=d(" (where "),ge=new E(!1),ye=d(" denotes the "),J=b("i"),J.textContent=Be,Re=d(" factor in the Iwasawa decomposition "),Q=b("i"),Q.textContent=We,Ke=d(`), the boundary of\r
  the Rao cocycle is a straight line in both the upper half plane and the Poincaré disk models!`),be=$(),R=b("div"),O=b("div"),D=b("div"),Le=d("Upper half plane "),at(K.$$.fragment),qe=d(`\r
    Matrix\r
    `),A=b("div"),H=b("div");for(let e=0;e<g.length;e+=1)g[e].c();Me=d(`\r
      det = `),ve=d(ee),Oe=$(),at(C.$$.fragment),we=$(),L=b("div"),U=b("label"),De=d("CindyScript: "),N=b("input"),He=$(),q=b("textarea"),this.h()},l(e){const m=Tt("svelte-129xe4x",document.head);r=v(m,"SCRIPT",{id:!0,type:!0,"data-svelte-h":!0}),ae(r)!=="svelte-lvu4nl"&&(r.textContent=n),t=v(m,"SCRIPT",{id:!0,type:!0,"data-svelte-h":!0}),ae(t)!=="svelte-137lewl"&&(t.textContent=o),m.forEach(p),c=F(e),s=F(e),l=v(e,"P",{});var u=I(l);f=_(u,"This webpage plots the Rao cocycle "),k=P(u,!1),j=_(u,"for the metaplectic group "),G=P(u,!1),B=_(u,`. The matrix control on\r
  the left sidebar sets the element `),W=P(u,!1),h=_(u,". The element "),M=P(u,!1),le=_(u,` is set via its Iwasawa\r
  decomposition `),se=P(u,!1),ie=_(u,". You control "),Y=v(u,"I",{"data-svelte-h":!0}),ae(Y)!=="svelte-14l5wx3"&&(Y.textContent=Ge),Pe=_(u," by moving the red dot around the circle. The product "),oe=P(u,!1),ce=_(u,` is represented as a point in\r
  the upper-half plane. The corresponding point is colored black if `),ue=P(u,!1),he=_(u," and white if "),fe=P(u,!1),pe=_(u,"."),u.forEach(p),me=F(e),x=v(e,"P",{});var T=I(x);ze=_(T,"Fun fact, when "),de=P(T,!1),_e=_(T," (where "),ge=P(T,!1),ye=_(T," denotes the "),J=v(T,"I",{"data-svelte-h":!0}),ae(J)!=="svelte-14l5wx3"&&(J.textContent=Be),Re=_(T," factor in the Iwasawa decomposition "),Q=v(T,"I",{"data-svelte-h":!0}),ae(Q)!=="svelte-xviqgm"&&(Q.textContent=We),Ke=_(T,`), the boundary of\r
  the Rao cocycle is a straight line in both the upper half plane and the Poincaré disk models!`),T.forEach(p),be=F(e),R=v(e,"DIV",{class:!0});var y=I(R);O=v(y,"DIV",{class:!0});var V=I(O);D=v(V,"DIV",{class:!0});var Ve=I(D);Le=_(Ve,"Upper half plane "),rt(K.$$.fragment,Ve),Ve.forEach(p),qe=_(V,`\r
    Matrix\r
    `),A=v(V,"DIV",{class:!0});var xe=I(A);H=v(xe,"DIV",{class:!0});var Xe=I(H);for(let Fe=0;Fe<g.length;Fe+=1)g[Fe].l(Xe);Xe.forEach(p),Me=_(xe,`\r
      det = `),ve=_(xe,ee),xe.forEach(p),V.forEach(p),Oe=F(y),rt(C.$$.fragment,y),y.forEach(p),we=F(e),L=v(e,"DIV",{class:!0});var Te=I(L);U=v(Te,"LABEL",{class:!0});var $e=I(U);De=_($e,"CindyScript: "),N=v($e,"INPUT",{class:!0,autocomplete:!0}),$e.forEach(p),He=F(Te),q=v(Te,"TEXTAREA",{class:!0}),I(q).forEach(p),Te.forEach(p),this.h()},h(){document.title="Metaplectic Group",w(r,"id","csinit"),w(r,"type","text/x-cindyscript"),w(t,"id","csdraw"),w(t,"type","text/x-cindyscript"),k.a=j,G.a=B,W.a=h,M.a=le,se.a=ie,oe.a=ce,ue.a=he,fe.a=pe,de.a=_e,ge.a=ye,w(D,"class","grid grid-cols-[1fr_60px]"),w(H,"class","grid grid-cols-2 w-auto"),w(A,"class","border border-indigo-300 bg-red-500/20 px-2 py-1 my-1 text-center self-center"),w(O,"class","flex flex-col bg-indigo-300/20 p-2 my-2 shadow-md w-[250px]"),w(R,"class","flex gap-2"),w(N,"class","w-full font-mono text-sm"),w(N,"autocomplete","off"),w(U,"class","flex gap-2 items-center"),w(q,"class","w-full h-32 font-mono text-sm"),q.readOnly=!0,w(L,"class","flex flex-col gap-2 bg-indigo-300/20 p-2 my-1 shadow-md")},m(e,m){i(document.head,r),i(document.head,t),S(e,c,m),S(e,s,m),S(e,l,m),i(l,f),k.m(Ce,l),i(l,j),G.m(Ee,l),i(l,B),W.m(Ie,l),i(l,h),M.m(ne,l),i(l,le),se.m(mt,l),i(l,ie),i(l,Y),i(l,Pe),oe.m(dt,l),i(l,ce),ue.m(_t,l),i(l,he),fe.m(gt,l),i(l,pe),S(e,me,m),S(e,x,m),i(x,ze),de.m(yt,x),i(x,_e),ge.m(bt,x),i(x,ye),i(x,J),i(x,Re),i(x,Q),i(x,Ke),S(e,be,m),S(e,R,m),i(R,O),i(O,D),i(D,Le),nt(K,D,null),i(O,qe),i(O,A),i(A,H);for(let u=0;u<g.length;u+=1)g[u]&&g[u].m(H,null);i(A,Me),i(A,ve),i(R,Oe),nt(C,R,null),S(e,we,m),S(e,L,m),i(L,U),i(U,De),i(U,N),Z(N,a[0]),i(L,He),i(L,q),Z(q,a[5]),te=!0,Ue||(Ye=[Se(document,"keydown",a[6]),Se(N,"input",a[11]),Se(q,"input",a[12])],Ue=!0)},p(e,[m]){const u={};if(!Ne&&m&2&&(Ne=!0,u.checked=e[1],Ze(()=>Ne=!1)),K.$set(u),m&4){X=ke(Array(2));let y;for(y=0;y<X.length;y+=1){const V=ot(e,X,y);g[y]?g[y].p(V,m):(g[y]=ht(V),g[y].c(),g[y].m(H,null))}for(;y<g.length;y+=1)g[y].d(1);g.length=X.length}(!te||m&4)&&ee!==(ee=e[2][0][0]*e[2][1][1]-e[2][0][1]*e[2][1][0]+"")&&St(ve,ee);const T={};!Ae&&m&8&&(Ae=!0,T.cindy=e[3],Ze(()=>Ae=!1)),C.$set(T),m&1&&N.value!==e[0]&&Z(N,e[0]),m&32&&Z(q,e[5])},i(e){te||(lt(K.$$.fragment,e),lt(C.$$.fragment,e),te=!0)},o(e){st(K.$$.fragment,e),st(C.$$.fragment,e),te=!1},d(e){e&&(p(c),p(s),p(l),p(me),p(x),p(be),p(R),p(we),p(L)),p(r),p(t),it(K),ft(g,e),a[10](null),it(C),Ue=!1,kt(Ye)}}}function re(a,r){let[[n,t],[o,c]]=a,[[s,l],[f,k]]=r;return[[n*s+t*f,n*l+t*k],[o*s+c*f,o*l+c*k]]}function Kt(a,r,n){let t,o,c="",s="",l=!0,f=[[1,0],[0,1]];function k(h,M=!1){let ne=o==null?void 0:o.csEval(h);M&&ne&&n(5,s=ne)}function Ce(h){if(!(h.target instanceof HTMLInputElement&&h.target.type==="text"))switch(h.key){case"h":n(1,l=!l),h.preventDefault();break;case"t":case"T":n(2,f=re(f,[[1,h.shiftKey?-1:1],[0,1]]));break;case"r":case"R":n(2,f=re(f,[[1,0],[h.shiftKey?1:-1,1]]));break;case"s":case"S":n(2,f=re(f,[[0,h.shiftKey?1:-1],[h.shiftKey?-1:1,0]]));break;case"w":case"W":n(2,f=re([[1,h.shiftKey?-1:1],[0,1]],f));break;case"q":case"Q":n(2,f=re([[1,0],[h.shiftKey?1:-1,1]],f));break;case"i":n(2,f=[[1,0],[0,1]]);break}}function j(h){l=h,n(1,l)}function G(h,M){f[h][M]=pt(this.value),n(2,f)}function Ee(h){t=h,n(3,t)}function B(h){je[h?"unshift":"push"](()=>{o=h,n(4,o)})}function W(){c=this.value,n(0,c)}function Ie(){s=this.value,n(5,s)}return a.$$.update=()=>{a.$$.dirty&1&&k(c,!0),a.$$.dirty&6&&k(`upperHalfPlane = ${l}; h = [[${f[0][0]},${f[0][1]}],[${f[1][0]},${f[1][1]}]]`)},[c,l,f,t,o,s,Ce,j,G,Ee,B,W,Ie]}class At extends Ct{constructor(r){super(),Et(this,r,Kt,Rt,xt,{})}}export{At as component,Ot as universal};
