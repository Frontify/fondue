import{j as o}from"./iframe-BFXen_90.js";import{D as B}from"./DecorativeContent-BiO7nFEm.js";import{B as n}from"./Box-Bc14IpWc.js";import"./preload-helper-zta_rV5C.js";const j={title:"Layout/Box",component:n,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A generic container with responsive spacing, sizing, and positioning props. The simplest layout primitive in Fondue.","","**When to use:** When you need margin, padding, or sizing control without Flex or Grid behavior. For directional layouts use `<Flex>`, for two-dimensional layouts use `<Grid>`."].join(`
`)}}},args:{width:25,height:25}},e={render:t=>o.jsx(n,{...t,children:o.jsx(B,{})})},r={args:{width:"100px",height:"100px"},render:t=>o.jsx(n,{...t,children:o.jsx(B,{})})};var s,a,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{code:`const Default = () => {
  return (
    <Box width={25} height={25}>
      <DecorativeContent />
    </Box>
  );
};
`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,p,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{code:`const PixelValues = () => {
  return (
    <Box width="100px" height="100px">
      <DecorativeContent />
    </Box>
  );
};
`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,m,x;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    return <Box {...args}>
                <DecorativeContent />
            </Box>;
  }
}`,...(x=(m=e.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var l,h,g;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    width: '100px',
    height: '100px'
  },
  render: args => {
    return <Box {...args}>
                <DecorativeContent />
            </Box>;
  }
}`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const y=["Default","PixelValues"];export{e as Default,r as PixelValues,y as __namedExportsOrder,j as default};
