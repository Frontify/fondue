import{j as t}from"./iframe-BFXen_90.js";import{L as T,R as j}from"./Link-D3H6tSyi.js";import"./preload-helper-zta_rV5C.js";const V={title:"Typography/Link",component:T,tags:["autodocs"],parameters:{status:{type:"beta"},docs:{description:{component:["An anchor element for navigating to another page or URL. Integrates with RouterProvider for client-side routing.","","**When to use:** For navigation — going to a new page or URL. For triggering actions, use `<Button>` instead."].join(`
`)}}},decorators:[a=>t.jsx(j,{navigate:o=>alert(`Navigate to: ${o}`),useHref:o=>`/resolved${o}`,children:t.jsx(a,{})})],argTypes:{href:{type:"string",control:"text"},weight:{type:"string",control:"select",options:[void 0,"regular","medium","bold"]},size:{type:"string",control:"select",options:[void 0,"xx-small","x-small","small","medium","large","x-large","xx-large"]},color:{type:"string",control:"select",options:[void 0,"primary","secondary","error","success","warning","highlight"]},onContainer:{type:"string",control:"select",options:[void 0,"secondary","disabled","error","success","warning","highlight"]},wrap:{type:"string",control:"select",options:[void 0,"wrap","nowrap"]},underline:{type:"string",control:"select",options:[void 0,"auto","always","hover","none"]},truncate:{type:"boolean",control:"boolean"},target:{type:"string",control:"text"},rel:{type:"string",control:"text"},className:{type:"string",control:"text"}}},e={args:{children:"Hello Link",href:"/hello"}},r={args:{children:"All Variants Link",href:"/variants",size:"large",weight:"bold",color:"success",onContainer:"secondary",wrap:"wrap",underline:"always",truncate:!1,target:"_blank",rel:"noopener noreferrer"}},n={args:{children:"This is a very long link text that should be truncated if it overflows the container.",href:"/truncate",truncate:!0,size:"medium",weight:"regular",color:"primary"},render:a=>t.jsx("div",{style:{display:"flex",width:180,border:"1px dashed #ccc",padding:8},children:t.jsx(T,{...a})})};var s,i,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{code:`const Default = () => <Link href="/hello">Hello Link</Link>;
`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,d,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{code:`const AllVariants = () => (
  <Link
    href="/variants"
    size="large"
    weight="bold"
    color="success"
    onContainer="secondary"
    wrap="wrap"
    underline="always"
    truncate={false}
    target="_blank"
    rel="noopener noreferrer"
  >
    All Variants Link
  </Link>
);
`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,u,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{code:`const Truncated = () => (
  <div
    style={{
      display: "flex",
      width: 180,
      border: "1px dashed #ccc",
      padding: 8,
    }}
  >
    <Link
      href="/truncate"
      truncate
      size="medium"
      weight="regular"
      color="primary"
    >
      This is a very long link text that should be truncated if it overflows the
      container.
    </Link>
  </div>
);
`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var m,y,f;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'Hello Link',
    href: '/hello'
  }
}`,...(f=(y=e.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var w,v,x;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'All Variants Link',
    href: '/variants',
    size: 'large',
    weight: 'bold',
    color: 'success',
    onContainer: 'secondary',
    wrap: 'wrap',
    underline: 'always',
    truncate: false,
    target: '_blank',
    rel: 'noopener noreferrer'
  }
}`,...(x=(v=r.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var k,L,b;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'This is a very long link text that should be truncated if it overflows the container.',
    href: '/truncate',
    truncate: true,
    size: 'medium',
    weight: 'regular',
    color: 'primary'
  },
  render: args => <div style={{
    display: 'flex',
    width: 180,
    border: '1px dashed #ccc',
    padding: 8
  }}>
            <Link {...args} />
        </div>
}`,...(b=(L=n.parameters)==null?void 0:L.docs)==null?void 0:b.source}}};const _=["Default","AllVariants","Truncated"];export{r as AllVariants,e as Default,n as Truncated,_ as __namedExportsOrder,V as default};
