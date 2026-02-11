import{j as a}from"./iframe-Daulk9LM.js";import{o as _,c as D}from"./fondue-icons372-BWvkyUkX.js";import{B as i}from"./Button-D1dvcQ-R.js";import"./preload-helper-DI-8CSFo.js";const{action:F}=__STORYBOOK_MODULE_ACTIONS__,K={title:"Components/Button",component:i,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["Buttons are interactive elements that let users get things done — from submitting a form to triggering a specific action.","","You'll find them everywhere in a UI. Buttons are small but mighty tools for turning intention into action.","","A button is made up of key parts that work together to create a clear, actionable element. At least one content element must be included — either a label, an icon, or both. The trailing icon is optional and used when the button triggers a dropdown.","",'**Variant:** Variants help convey the context or meaning behind a button at a glance. Choose the variant based on the action you want to communicate — `default` for actions that do not require special attention, `negative` for actions that might have negative consequences such as "Cancel", `danger` for severe or irreversible actions such as "Delete", `positive` for actions that confirm or complete tasks like "Approve", and `highlight` (loud) for buttons that require extra visibility — use this very sparingly.',"","**Emphasis:** Use emphasis to control visual hierarchy and guide attention. Buttons can have `weak`, `default`, or `strong` emphasis. Use `strong` for primary, high-priority actions; `default` for common or neutral actions; and `weak` for secondary or less prominent options.","","**Size:** Buttons come in three sizes to support different layout needs. Use `small` when space is tight or the button has a lower visual priority. `medium` is the default and works well in most layouts. Choose `large` when you need to give the button more presence.","","**Icon:** Use a leading icon to add visual context or reinforce meaning. Add this when the button needs an extra visual cue.","","**Caret:** The caret signals to users that clicking the button will reveal additional options. It's usually used in combination with the dropdown component.","","**Action vs. navigation:** Buttons should be used for actions or commands only. Use links for navigation purposes. This distinction helps users understand what will happen — buttons trigger an immediate result, while links offer navigation to a new location.","","**Full-width usage:** Use full-width buttons sparingly and consistently. They work well on smaller screens like mobile layouts and at the bottom of forms. Avoid them on wider screens where they feel overwhelming, or on low-importance actions where the style implies undue importance.","",'**Accessible labeling:** Button labels should be straightforward and easy to understand. Use concise, descriptive language that clearly reflects the action being taken. Avoid vague terms like "Go" or "Click here" in favor of specific verbs such as "Submit," "Download," or "Continue." Clear labels not only improve accessibility — they make the entire experience feel more intuitive and trustworthy.'].join(`
`)}}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:F("onPress")}},e={name:"Icon and Text Label",render:r=>a.jsxs(i,{...r,children:[a.jsx(_,{size:16}),"Button Text"]})},n={},t={name:"Icon Only",args:{aspect:"square",children:a.jsx(D,{size:16})}},o={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:a.jsx(D,{size:16}),aspect:"square"}},s={name:"Icon and Text Label",render:r=>a.jsxs(i,{...r,children:[a.jsx(_,{size:16}),"Button Text"]})};var c,u,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{code:`const Default = () => (
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
`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var l,m,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{code:`const TextLabelOnly = () => (
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
`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var b,y,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{code:`const WithRoundedIcon = () => (
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
`,...(v=(y=o.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var I,w,B;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{code:`const WithIconAndLabel = () => (
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
`,...(B=(w=s.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var x,T,z;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(z=(T=e.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var k,O,W;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:"{}",...(W=(O=n.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var C,A,P;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Icon Only',
  args: {
    aspect: 'square',
    children: <IconIcon size={16} />
  }
}`,...(P=(A=t.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var L,R,j;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'Icon Only Rounded',
  args: {
    rounding: 'full',
    title: 'Icon Only Rounded',
    children: <IconIcon size={16} />,
    aspect: 'square'
  }
}`,...(j=(R=o.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var q,S,U;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(U=(S=s.parameters)==null?void 0:S.docs)==null?void 0:U.source}}};const M=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel"];export{e as Default,n as TextLabelOnly,t as WithIcon,s as WithIconAndLabel,o as WithRoundedIcon,M as __namedExportsOrder,K as default};
