import{j as e}from"./iframe-pojAo36N.js";import{D as R}from"./DecorativeContent-ZCzVGikb.js";import{B as F}from"./Box-CN1b9pCB.js";import{G as t}from"./Grid-DhMyjBRA.js";import"./preload-helper-zta_rV5C.js";const r=s=>e.jsx(F,{width:"100px",height:"100px",...s,children:e.jsx(R,{})});r.displayName="DecorativeBox";const E={title:"Layout/Grid",component:t,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A two-dimensional layout container using CSS Grid. Defines rows and columns for complex, responsive layouts.","","**When to use:** For two-dimensional layouts like card grids, dashboards, or form layouts. For single-axis layouts use `<Flex>`."].join(`
`)}}},args:{columns:"repeat(3, 1fr)",gap:4}},o={render:s=>e.jsxs(t,{...s,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]})},n={render:s=>e.jsxs(t,{...s,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]}),args:{columns:3}},a={render:s=>e.jsxs(t,{...s,children:[e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{}),e.jsx(r,{})]}),args:{columns:{base:"repeat(1, 1fr)",xs:"repeat(4, 1fr)",sm:"repeat(5, 1fr)",md:"repeat(6, 1fr)","2xl":"repeat(8, 1fr)"}}};var c,i,x;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{code:`const Default = () => {
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
`,...(x=(i=o.parameters)==null?void 0:i.docs)==null?void 0:x.source}}};var d,D,v;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{code:`const GridWithFixedColumnsAndRows = () => {
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
`,...(v=(D=n.parameters)==null?void 0:D.docs)==null?void 0:v.source}}};var p,B,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{code:`const ResponsiveGrid = () => {
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
`,...(m=(B=a.parameters)==null?void 0:B.docs)==null?void 0:m.source}}};var u,l,j;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(j=(l=o.parameters)==null?void 0:l.docs)==null?void 0:j.source}}};var f,g,G;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(G=(g=n.parameters)==null?void 0:g.docs)==null?void 0:G.source}}};var h,y,w;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(w=(y=a.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};const _=["Default","GridWithFixedColumnsAndRows","ResponsiveGrid"];export{o as Default,n as GridWithFixedColumnsAndRows,a as ResponsiveGrid,_ as __namedExportsOrder,E as default};
