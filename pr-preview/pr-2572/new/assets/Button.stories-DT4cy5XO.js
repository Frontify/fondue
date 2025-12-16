import{j as e}from"./iframe-BjyCcFQg.js";import{o as y,c as z}from"./fondue-icons369-By6x4jjQ.js";import{B as c}from"./Button-DOeql0tC.js";import"./preload-helper-5fg-36yc.js";const{action:L}=__STORYBOOK_MODULE_ACTIONS__,W={title:"Components/Button",component:c,tags:["autodocs"],parameters:{status:{type:"released"}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:L("onPress")}},n={name:"Icon and Text Label",render:t=>e.jsxs(c,{...t,children:[e.jsx(y,{size:16}),"Button Text"]})},r={},o={name:"Icon Only",args:{aspect:"square",children:e.jsx(z,{size:16})}},s={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:e.jsx(z,{size:16}),aspect:"square"}},a={name:"Icon and Text Label",render:t=>e.jsxs(c,{...t,children:[e.jsx(y,{size:16}),"Button Text"]})};var d,u,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(i=(u=n.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var l,m,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var I,x,g;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Icon Only',
  args: {
    aspect: 'square',
    children: <IconIcon size={16} />
  }
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var h,O,B;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Icon Only Rounded',
  args: {
    rounding: 'full',
    title: 'Icon Only Rounded',
    children: <IconIcon size={16} />,
    aspect: 'square'
  }
}`,...(B=(O=s.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var T,f,b;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(b=(f=a.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const q=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel"];export{n as Default,r as TextLabelOnly,o as WithIcon,a as WithIconAndLabel,s as WithRoundedIcon,q as __namedExportsOrder,W as default};
