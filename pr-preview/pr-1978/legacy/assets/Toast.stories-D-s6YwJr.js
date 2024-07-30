import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{a as R,B as c,b as k}from"./Button-DL4HHSbC.js";import{B as L}from"./ButtonGroup-jraNs9QX.js";import{I as B}from"./IconExclamationMarkCircle24-ChDY1Cve.js";import{I as O}from"./IconExclamationMarkTriangle24-C3Ss9MHq.js";import{I as W}from"./IconTrashBin24-DrDNK9RT.js";import{I as V,M as q}from"./borderStyle-D9jrV09G.js";import{m as d}from"./merge-DI-veSMP.js";import{A as M}from"./index-hyK68Dd8.js";import{m as Y}from"./motion-C48bHxkn.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useButton-pp-RVGt-.js";import"./useFocusable-CsWTbG_a.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";var s=(e=>(e.BottomToTop="BottomToTop",e.TopToBottom="TopToBottom",e))(s||{}),o=(e=>(e.Loud="Loud",e.Danger="Danger",e.Success="Success",e.Warning="Warning",e))(o||{});const z={Loud:"tw-bg-box-selected-strong",Danger:"tw-bg-box-negative-strong-pressed",Success:"tw-bg-box-positive-strong-pressed",Warning:"tw-bg-box-warning-strong"},F="tw-min-h-[2rem] tw-rounded-lg tw-shadow-mid tw-z-[120000] before:!tw-rounded-lg",G=d([V,"tw-bg-base"]),H=d([q,"tw-bg-box-neutral-mighty"]),p=e=>e===s.BottomToTop?"150%":"-150%",P=e=>d([F,e==="dark"?H:G]),a=({isOpen:e,style:S,icon:C,animationDirection:m=s.BottomToTop,children:A,theme:E="light",enableExitAnimation:_=!1,"data-test-id":D="toast"})=>t.jsx(M,{children:e&&t.jsx(Y.div,{className:P(E),initial:{opacity:0,y:p(m)},transition:{opacity:{ease:[0,0,1,1]},y:{ease:[0,.55,.45,1]},delay:.3,duration:.2},animate:{opacity:1,y:0},..._?{exit:{opacity:0,y:p(m)}}:{},"data-test-id":D,"aria-live":"polite",role:"alert",children:t.jsxs("div",{className:"tw-flex",children:[t.jsx("div",{className:d(["tw-flex tw-items-center tw-justify-center tw-min-h-[2rem] tw-min-w-[3rem] tw-rounded-l-lg tw-text-white",z[S]]),children:C}),A]})})});a.displayName="FondueToast";a.__docgenInfo={description:"",methods:[],displayName:"FondueToast",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},style:{required:!0,tsType:{name:"ToastStyle"},description:""},icon:{required:!0,tsType:{name:"ReactNode"},description:""},animationDirection:{required:!1,tsType:{name:"ToastAnimationDirection"},description:"",defaultValue:{value:"ToastAnimationDirection.BottomToTop",computed:!0}},children:{required:!1,tsType:{name:"ReactNode"},description:""},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}},enableExitAnimation:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'toast'",computed:!1}}}};const wt={title:"Components/Toast",component:a,tags:["autodocs"],argTypes:{style:{options:Object.values(o),control:{type:"select"},defaultValue:o.Loud},animationDirection:{options:Object.values(s),control:{type:"select"},defaultValue:s.BottomToTop},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},enableExitAnimation:{control:{type:"boolean"},defaultValue:!1},icon:{table:{disable:!0}},children:{table:{disable:!0}}}},I=e=>t.jsx("div",{className:"tw-fixed tw-bottom-0 tw-left-0 tw-m-3",children:t.jsx(a,{...e})}),K=e=>t.jsx("div",{className:"tw-fixed tw-top-0 tw-right-0 tw-m-3",children:t.jsx(a,{...e})}),J=e=>t.jsx("div",{className:"tw-fixed tw-bottom-0 tw-right-0 tw-m-3",children:t.jsx(a,{...e})}),r=I.bind({});r.args={isOpen:!0,style:o.Loud,icon:t.jsx(B,{}),children:t.jsx("div",{className:"tw-p-4 tw-flex tw-items-center",children:"Item successfully added"})};const i=K.bind({});i.args={isOpen:!0,style:o.Warning,icon:t.jsx(O,{}),animationDirection:s.TopToBottom,children:t.jsx("div",{className:"tw-p-4 tw-flex tw-items-center",children:"Your password will expire in 7 days"})};const n=J.bind({});n.args={isOpen:!0,style:o.Danger,icon:t.jsx(W,{}),children:t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"tw-flex tw-p-4",children:t.jsxs("div",{className:"tw-border-r tw-border-black-20 tw-pr-4",children:[t.jsx("div",{className:"tw-font-bold",children:"Item Deletion Confirmation"}),t.jsx("span",{className:"tw-mt-1",children:"You are about to delete this item"})]})}),t.jsx("div",{className:"tw-flex tw-items-center tw-py-4 tw-pr-4",children:t.jsxs(L,{size:R.Medium,children:[t.jsx(c,{style:k.Secondary,children:"Yes, delete it"}),t.jsx(c,{children:"Cancel"})]})})]})};const l=I.bind({});l.args={isOpen:!0,style:o.Loud,theme:"dark",icon:t.jsx(B,{}),children:t.jsx("div",{className:"tw-p-4 tw-flex tw-items-center tw-text-box-neutral-mighty-inverse",children:"Item successfully added"})};var u,w,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => <div className="tw-fixed tw-bottom-0 tw-left-0 tw-m-3">
        <ToastComponent {...args} />
    </div>`,...(g=(w=r.parameters)==null?void 0:w.docs)==null?void 0:g.source}}};var h,x,T;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`args => <div className="tw-fixed tw-top-0 tw-right-0 tw-m-3">
        <ToastComponent {...args} />
    </div>`,...(T=(x=i.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var f,b,v;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`args => <div className="tw-fixed tw-bottom-0 tw-right-0 tw-m-3">
        <ToastComponent {...args} />
    </div>`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,j,N;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => <div className="tw-fixed tw-bottom-0 tw-left-0 tw-m-3">
        <ToastComponent {...args} />
    </div>`,...(N=(j=l.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};const gt=["InformativeToastAtTheBottom","WarningToastAtTheTop","WithInteractiveContent","DarkTheme"];export{l as DarkTheme,r as InformativeToastAtTheBottom,i as WarningToastAtTheTop,n as WithInteractiveContent,gt as __namedExportsOrder,wt as default};