import{j as e}from"./iframe-CEbMwow_.js";import{o as y,c as z}from"./fondue-icons369-Cuu54FOx.js";import{B as c}from"./Button-5wFDC_XE.js";import"./preload-helper-BF13SaVy.js";import"./styleUtilities-A7Ia-tuh.js";const{action:L}=__STORYBOOK_MODULE_ACTIONS__,q={title:"Components/Button",component:c,tags:["autodocs"],parameters:{status:{type:"released"}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:L("onPress")}},n={name:"Icon and Text Label",render:a=>e.jsxs(c,{...a,children:[e.jsx(y,{size:16}),"Button Text"]})},r={},o={name:"Icon Only",args:{aspect:"square",children:e.jsx(z,{size:16})}},s={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:e.jsx(z,{size:16}),aspect:"square"}},t={name:"Icon and Text Label",render:a=>e.jsxs(c,{...a,children:[e.jsx(y,{size:16}),"Button Text"]})};var d,u,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(i=(u=n.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var I,x,g;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(B=(O=s.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var T,f,b;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(b=(f=t.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const C=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel"];export{n as Default,r as TextLabelOnly,o as WithIcon,t as WithIconAndLabel,s as WithRoundedIcon,C as __namedExportsOrder,q as default};
