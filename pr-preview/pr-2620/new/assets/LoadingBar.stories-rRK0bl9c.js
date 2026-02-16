import{L as g}from"./LoadingBar-CqJDA5JR.js";import"./iframe-CQSKmblA.js";import"./preload-helper-DI-8CSFo.js";import"./index-BQLgj3I-.js";const b={title:"Components/Loading Bar",component:g,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A horizontal progress bar showing completion progress as a filled track. Supports determinate (known percentage) and indeterminate (unknown duration) modes.","","**When to use:** When progress can be measured — file uploads, multi-step processes, or quota usage. For unknown durations, consider `<LoadingCircle>` instead."].join(`
`)}}},args:{value:42,max:100,rounded:!0,"aria-label":"Fondue Loading Bar"}},e={},a={args:{value:null}};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{code:`const WithDefinedValue = () => (
  <LoadingBar value={42} max={100} rounded aria-label="Fondue Loading Bar" />
);
`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var n,t,d;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{code:`const Indeterminate = () => (
  <LoadingBar value={null} max={100} rounded aria-label="Fondue Loading Bar" />
);
`,...(d=(t=a.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var i,c,u;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    value: null
  }
}`,...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const v=["WithDefinedValue","Indeterminate"];export{a as Indeterminate,e as WithDefinedValue,v as __namedExportsOrder,b as default};
