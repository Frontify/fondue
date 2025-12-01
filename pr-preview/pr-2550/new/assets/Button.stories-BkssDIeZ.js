import{j as e}from"./iframe-rOHEvLri.js";import{o as y,c as z}from"./fondue-icons366-BANlzlRJ.js";import{B as c}from"./Button-BIizTVLC.js";import"./preload-helper-a7wktsRf.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";const{action:L}=__STORYBOOK_MODULE_ACTIONS__,C={title:"Components/Button",component:c,tags:["autodocs"],parameters:{status:{type:"released"}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:L("onPress")}},n={name:"Icon and Text Label",render:a=>e.jsxs(c,{...a,children:[e.jsx(y,{size:16}),"Button Text"]})},r={},o={name:"Icon Only",args:{aspect:"square",children:e.jsx(z,{size:20})}},t={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:e.jsx(z,{size:20}),aspect:"square"}},s={name:"Icon and Text Label",render:a=>e.jsxs(c,{...a,children:[e.jsx(y,{size:16}),"Button Text"]})};var d,u,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(i=(u=n.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var I,x,g;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Icon Only',
  args: {
    aspect: 'square',
    children: <IconIcon size={20} />
  }
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var h,O,B;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Icon Only Rounded',
  args: {
    rounding: 'full',
    title: 'Icon Only Rounded',
    children: <IconIcon size={20} />,
    aspect: 'square'
  }
}`,...(B=(O=t.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var T,f,b;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const A=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel"];export{n as Default,r as TextLabelOnly,o as WithIcon,s as WithIconAndLabel,t as WithRoundedIcon,A as __namedExportsOrder,C as default};
