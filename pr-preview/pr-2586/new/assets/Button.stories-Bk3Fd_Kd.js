import{j as o}from"./iframe-DzDJq4pD.js";import{o as E,c as K}from"./fondue-icons369-Pws0Kohs.js";import{B as c}from"./Button-JjGwcMw5.js";import"./preload-helper-BDtrOIoV.js";const{action:M}=__STORYBOOK_MODULE_ACTIONS__,w={title:"Components/Button",component:c,tags:["autodocs"],parameters:{status:{type:"released"}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:M("onPress")}},e={name:"Icon and Text Label",render:r=>o.jsxs(c,{...r,children:[o.jsx(E,{size:16}),"Button Text"]})},n={},t={name:"Icon Only",args:{aspect:"square",children:o.jsx(K,{size:16})}},s={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:o.jsx(K,{size:16}),aspect:"square"}},a={name:"Icon and Text Label",render:r=>o.jsxs(c,{...r,children:[o.jsx(E,{size:16}),"Button Text"]})};var d,u,i;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{code:`const WithIcon = () => (
  <Button
    type="button"
    variant="default"
    emphasis="default"
    size="medium"
    rounding="medium"
    disabled={false}
    hugWidth
    aspect="square"
    onPress={action("onPress")}
  >
    <IconIcon size={16} />
  </Button>
);
`,...(i=(u=t.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var m,l,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{code:`const WithRoundedIcon = () => (
  <Button
    type="button"
    variant="default"
    emphasis="default"
    size="medium"
    rounding="full"
    disabled={false}
    hugWidth
    aspect="square"
    onPress={action("onPress")}
    title="Icon Only Rounded"
  >
    <IconIcon size={16} />
  </Button>
);
`,...(p=(l=s.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var h,I,f;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{code:`const WithIconAndLabel = () => (
  <Button
    type="button"
    variant="default"
    emphasis="default"
    size="medium"
    rounding="medium"
    disabled={false}
    hugWidth
    aspect="default"
    onPress={action("onPress")}
  >
    <IconColorFan size={16} />
    Button Text
  </Button>
);
`,...(f=(I=a.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};var g,B,x;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{code:`const Default = () => (
  <Button
    type="button"
    variant="default"
    emphasis="default"
    size="medium"
    rounding="medium"
    disabled={false}
    hugWidth
    aspect="default"
    onPress={action("onPress")}
  >
    <IconColorFan size={16} />
    Button Text
  </Button>
);
`,...(x=(B=e.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};var b,z,y;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{code:`const TextLabelOnly = () => (
  <Button
    type="button"
    variant="default"
    emphasis="default"
    size="medium"
    rounding="medium"
    disabled={false}
    hugWidth
    aspect="default"
    onPress={action("onPress")}
  >
    Button Text
  </Button>
);
`,...(y=(z=n.parameters)==null?void 0:z.docs)==null?void 0:y.source}}};var T,O,W;e.parameters={...e.parameters,docs:{...(T=e.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(W=(O=e.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var P,L,R;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:"{}",...(R=(L=n.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var j,_,S;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'Icon Only',
  args: {
    aspect: 'square',
    children: <IconIcon size={16} />
  }
}`,...(S=(_=t.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};var q,v,C;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Icon Only Rounded',
  args: {
    rounding: 'full',
    title: 'Icon Only Rounded',
    children: <IconIcon size={16} />,
    aspect: 'square'
  }
}`,...(C=(v=s.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var A,D,F;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(F=(D=a.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};const G=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel"];export{e as Default,n as TextLabelOnly,t as WithIcon,a as WithIconAndLabel,s as WithRoundedIcon,G as __namedExportsOrder,w as default};
