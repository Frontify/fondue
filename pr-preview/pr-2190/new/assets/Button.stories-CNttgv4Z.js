import{j as r}from"./jsx-runtime-BSxFkHFN.js";import{r as g}from"./index-i66itsuO.js";import{o as v,c as k}from"./fondue-icons348-BX42UtgK.js";import{a as H}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{B as a}from"./Button-CNT1KZLr.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./styleUtilities-rhQWLmVU.js";import"./focusStyle-IgMhxCMT.js";const Z={title:"Components/Button",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:H("onPress")}},o={name:"Icon and Text Label",render:e=>r.jsxs(a,{...e,children:[r.jsx(v,{size:16}),"Button Text"]})},t={},i={name:"Icon Only",args:{aspect:"square",children:r.jsx(k,{size:20})}},d={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:r.jsx(k,{size:20}),aspect:"square"}},c={name:"Icon and Text Label",render:e=>r.jsxs(a,{...e,children:[r.jsx(v,{size:16}),"Button Text"]})},u={name:"Loading",args:{"aria-label-loading":"Loading"},render:e=>{const[s,n]=g.useState(!1);return r.jsx(a,{...e,loading:s,onPress:()=>{n(!0),setTimeout(()=>{n(!1)},2e3)},children:"Submit"})}},l={name:"Error",args:{"aria-label-error":"Error"},render:e=>{const[s,n]=g.useState(!1);return r.jsx(a,{...e,error:s,onPress:()=>{n(!0)},children:"Submit"})}},m={name:"Loading and error",args:{"aria-label-loading":"Loading"},render:e=>{const[s,n]=g.useState(!1),[w,G]=g.useState(!1);return r.jsx(a,{...e,loading:s,onPress:()=>{n(!0),setTimeout(()=>{G(!0),n(!1)},2e3)},error:w,children:"Submit"})}};var p,L,I;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(I=(L=o.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};var f,h,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var b,S,B;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Icon Only',
  args: {
    aspect: 'square',
    children: <IconIcon size={20} />
  }
}`,...(B=(S=i.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var E,T,W;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Icon Only Rounded',
  args: {
    rounding: 'full',
    title: 'Icon Only Rounded',
    children: <IconIcon size={20} />,
    aspect: 'square'
  }
}`,...(W=(T=d.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var j,y,z;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(z=(y=c.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var O,P,R;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: 'Loading',
  args: {
    'aria-label-loading': 'Loading'
  },
  render: args => {
    const [isLoading, setIsLoading] = useState(false);
    return <Button {...args} loading={isLoading} onPress={() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }}>
                Submit
            </Button>;
  }
}`,...(R=(P=u.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var q,A,C;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Error',
  args: {
    'aria-label-error': 'Error'
  },
  render: args => {
    const [error, setError] = useState(false);
    return <Button {...args} error={error} onPress={() => {
      setError(true);
    }}>
                Submit
            </Button>;
  }
}`,...(C=(A=l.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var D,F,_;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Loading and error',
  args: {
    'aria-label-loading': 'Loading'
  },
  render: args => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    return <Button {...args} loading={isLoading} onPress={() => {
      setIsLoading(true);
      setTimeout(() => {
        setError(true);
        setIsLoading(false);
      }, 2000);
    }} error={error}>
                Submit
            </Button>;
  }
}`,...(_=(F=m.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};const $=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel","WithLoading","WithError","WithLoadingAndError"];export{o as Default,t as TextLabelOnly,l as WithError,i as WithIcon,c as WithIconAndLabel,u as WithLoading,m as WithLoadingAndError,d as WithRoundedIcon,$ as __namedExportsOrder,Z as default};
