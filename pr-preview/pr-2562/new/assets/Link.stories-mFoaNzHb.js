import{j as n}from"./iframe-CNHo6Kh4.js";import{L as m,R as y}from"./Link-CJsbyk34.js";import"./preload-helper-CjNnjfUj.js";import"./styleUtilities-A7Ia-tuh.js";const b={title:"Typography/Link",component:m,tags:["autodocs"],parameters:{status:{type:"beta"}},decorators:[a=>n.jsx(y,{navigate:o=>alert(`Navigate to: ${o}`),useHref:o=>`/resolved${o}`,children:n.jsx(a,{})})],argTypes:{href:{type:"string",control:"text"},weight:{type:"string",control:"select",options:[void 0,"regular","medium","bold"]},size:{type:"string",control:"select",options:[void 0,"xx-small","x-small","small","medium","large","x-large","xx-large"]},color:{type:"string",control:"select",options:[void 0,"primary","secondary","error","success","warning","highlight"]},onContainer:{type:"string",control:"select",options:[void 0,"secondary","disabled","error","success","warning","highlight"]},wrap:{type:"string",control:"select",options:[void 0,"wrap","nowrap"]},underline:{type:"string",control:"select",options:[void 0,"auto","always","hover","none"]},truncate:{type:"boolean",control:"boolean"},target:{type:"string",control:"text"},rel:{type:"string",control:"text"},className:{type:"string",control:"text"}}},e={args:{children:"Hello Link",href:"/hello"}},r={args:{children:"All Variants Link",href:"/variants",size:"large",weight:"bold",color:"success",onContainer:"secondary",wrap:"wrap",underline:"always",truncate:!1,target:"_blank",rel:"noopener noreferrer"}},t={args:{children:"This is a very long link text that should be truncated if it overflows the container.",href:"/truncate",truncate:!0,size:"medium",weight:"regular",color:"primary"},render:a=>n.jsx("div",{style:{display:"flex",width:180,border:"1px dashed #ccc",padding:8},children:n.jsx(m,{...a})})};var s,i,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    children: 'Hello Link',
    href: '/hello'
  }
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,d,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,u,h;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const k=["Default","AllVariants","Truncated"];export{r as AllVariants,e as Default,t as Truncated,k as __namedExportsOrder,b as default};
