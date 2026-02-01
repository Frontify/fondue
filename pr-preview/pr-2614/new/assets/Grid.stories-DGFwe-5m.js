import{j as e}from"./iframe-CkAYM9zB.js";import{D as C}from"./DecorativeContent-D_vwsGTT.js";import{B as b}from"./Box-X1viRmGZ.js";import{G as t}from"./Grid-C9k2Ntsd.js";import"./preload-helper-BIPFcffi.js";const r=s=>e.jsx(b,{width:"100px",height:"100px",...s,children:e.jsx(C,{})});r.displayName="DecorativeBox";const E={title:"Layout/Grid",component:t,tags:["autodocs"],parameters:{status:{type:"released"}},args:{columns:"repeat(3, 1fr)",gap:4}},o={render:s=>e.jsxs(t,{...s,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]})},a={render:s=>e.jsxs(t,{...s,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]}),args:{columns:3}},n={render:s=>e.jsxs(t,{...s,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]}),args:{columns:{base:"repeat(1, 1fr)",xs:"repeat(4, 1fr)",sm:"repeat(5, 1fr)",md:"repeat(6, 1fr)","2xl":"repeat(8, 1fr)"}}};var c,x,i;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{code:`const Default = () => {
  return (
    <Grid columns="repeat(3, 1fr)" gap={4}>
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </Grid>
  );
};
`,...(i=(x=o.parameters)==null?void 0:x.docs)==null?void 0:i.source}}};var d,D,v;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{code:`const GridWithFixedColumnsAndRows = () => {
  return (
    <Grid columns={3} gap={4}>
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </Grid>
  );
};
`,...(v=(D=a.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var B,p,m;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{code:`const ResponsiveGrid = () => {
  return (
    <Grid
      columns={{
        base: "repeat(1, 1fr)",
        xs: "repeat(4, 1fr)",
        sm: "repeat(5, 1fr)",
        md: "repeat(6, 1fr)",
        "2xl": "repeat(8, 1fr)",
      }}
      gap={4}
    >
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </Grid>
  );
};
`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,j,l;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    return <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>;
  }
}`,...(l=(j=o.parameters)==null?void 0:j.docs)==null?void 0:l.source}}};var f,G,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => {
    return <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>;
  },
  args: {
    columns: 3
  }
}`,...(g=(G=a.parameters)==null?void 0:G.docs)==null?void 0:g.source}}};var h,R,w;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => {
    return <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>;
  },
  args: {
    columns: {
      base: 'repeat(1, 1fr)',
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(5, 1fr)',
      md: 'repeat(6, 1fr)',
      '2xl': 'repeat(8, 1fr)'
    }
  }
}`,...(w=(R=n.parameters)==null?void 0:R.docs)==null?void 0:w.source}}};const _=["Default","GridWithFixedColumnsAndRows","ResponsiveGrid"];export{o as Default,a as GridWithFixedColumnsAndRows,n as ResponsiveGrid,_ as __namedExportsOrder,E as default};
