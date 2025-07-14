import{j as n}from"./jsx-runtime-BYYWji4R.js";import{L as m,R as f}from"./Link-DbzKY0aU.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./styleUtilities-Byf6Fdv2.js";const k={title:"Typography/Link",component:m,tags:["autodocs"],parameters:{status:{type:"beta"}},decorators:[o=>n.jsx(f,{navigate:a=>alert(`Navigate to: ${a}`),useHref:a=>`/resolved${a}`,children:n.jsx(o,{})})],argTypes:{href:{type:"string",control:"text"},weight:{type:"string",control:"select",options:[void 0,"light","regular","medium","bold","default","strong","x-strong"]},size:{type:"string",control:"select",options:[void 0,"x-small","small","medium","large"]},color:{type:"string",control:"select",options:[void 0,"default","weak","x-weak","disabled","negative","positive","warning","interactive"]},boxColor:{type:"string",control:"select",options:[void 0,"neutral","selected","disabled","positive","negative","warning"]},wrap:{type:"string",control:"select",options:[void 0,"wrap","nowrap"]},underline:{type:"string",control:"select",options:[void 0,"auto","always","hover","none"]},truncate:{type:"boolean",control:"boolean"},target:{type:"string",control:"text"},rel:{type:"string",control:"text"},className:{type:"string",control:"text"}}},e={args:{children:"Hello Link",href:"/hello"}},r={args:{children:"All Variants Link",href:"/variants",size:"large",weight:"strong",color:"positive",boxColor:"neutral",wrap:"wrap",underline:"always",truncate:!1,target:"_blank",rel:"noopener noreferrer"}},t={args:{children:"This is a very long link text that should be truncated if it overflows the container.",href:"/truncate",truncate:!0,size:"medium",weight:"default",color:"default"},render:o=>n.jsx("div",{style:{display:"flex",width:180,border:"1px dashed #ccc",padding:8},children:n.jsx(m,{...o})})};var s,i,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    children: 'Hello Link',
    href: '/hello'
  }
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,d,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'All Variants Link',
    href: '/variants',
    size: 'large',
    weight: 'strong',
    color: 'positive',
    boxColor: 'neutral',
    wrap: 'wrap',
    underline: 'always',
    truncate: false,
    target: '_blank',
    rel: 'noopener noreferrer'
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,u,h;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'This is a very long link text that should be truncated if it overflows the container.',
    href: '/truncate',
    truncate: true,
    size: 'medium',
    weight: 'default',
    color: 'default'
  },
  render: args => <div style={{
    display: 'flex',
    width: 180,
    border: '1px dashed #ccc',
    padding: 8
  }}>
            <Link {...args} />
        </div>
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const L=["Default","AllVariants","Truncated"];export{r as AllVariants,e as Default,t as Truncated,L as __namedExportsOrder,k as default};
