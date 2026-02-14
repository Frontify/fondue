import{j as a}from"./iframe-DvdOIpuR.js";import{o as w,c as F}from"./fondue-icons372-BHS9zo7M.js";import{B as c}from"./Button-GQkbWRjN.js";import"./preload-helper-DI-8CSFo.js";const{action:U}=__STORYBOOK_MODULE_ACTIONS__,N={title:"Components/Button",component:c,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["An interactive element that triggers actions — from submitting a form to opening a menu. At least one content element must be included: a label, an icon, or both.","","**When to use:** For actions and commands only. Use links for navigation — buttons trigger an immediate result, links navigate to a new location.","",'**Icon:** Pass an icon as a child to add visual context. Use `aspect="square"` for icon-only buttons.',"","**Caret:** Signals that clicking will reveal additional options. Usually used with the Dropdown component.","",'**Accessible labeling:** Use concise, descriptive labels that reflect the action. Prefer specific verbs like "Submit" or "Download" over vague terms like "Go" or "Click here."'].join(`
`)}}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:U("onPress")}},e={name:"Icon and Text Label",render:r=>a.jsxs(c,{...r,children:[a.jsx(w,{size:16}),"Button Text"]})},n={},t={name:"Icon Only",args:{aspect:"square",children:a.jsx(F,{size:16})}},s={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:a.jsx(F,{size:16}),aspect:"square"}},o={name:"Icon and Text Label",render:r=>a.jsxs(c,{...r,children:[a.jsx(w,{size:16}),"Button Text"]})};var i,d,u;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{code:`const Default = () => (
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
`,...(u=(d=e.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var l,m,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{code:`const TextLabelOnly = () => (
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
`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var h,g,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{code:`const WithIcon = () => (
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
`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var I,b,x;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{code:`const WithRoundedIcon = () => (
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
`,...(x=(b=s.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var B,y,z;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{code:`const WithIconAndLabel = () => (
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
`,...(z=(y=o.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var T,O,W;e.parameters={...e.parameters,docs:{...(T=e.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(W=(O=e.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var v,P,L;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:"{}",...(L=(P=n.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var R,j,S;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: 'Icon Only',
  args: {
    aspect: 'square',
    children: <IconIcon size={16} />
  }
}`,...(S=(j=t.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var C,_,q;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Icon Only Rounded',
  args: {
    rounding: 'full',
    title: 'Icon Only Rounded',
    children: <IconIcon size={16} />,
    aspect: 'square'
  }
}`,...(q=(_=s.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var A,k,D;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(D=(k=o.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};const Y=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel"];export{e as Default,n as TextLabelOnly,t as WithIcon,o as WithIconAndLabel,s as WithRoundedIcon,Y as __namedExportsOrder,N as default};
