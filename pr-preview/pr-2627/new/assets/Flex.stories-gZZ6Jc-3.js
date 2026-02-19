import{F as n,j as e}from"./iframe-BFXen_90.js";import{D as E}from"./DecorativeContent-BiO7nFEm.js";import{B as _}from"./Box-Bc14IpWc.js";import"./preload-helper-zta_rV5C.js";const o=r=>e.jsx(_,{width:"100px",height:"100px",...r,children:e.jsx(E,{})});o.displayName="DecorativeBox";const H={title:"Layout/Flex",component:n,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A one-dimensional layout container using CSS Flexbox. Arranges children along a row or column with configurable alignment, spacing, and wrapping.","","**When to use:** For single-axis layouts — toolbars, button groups, stacked forms. For two-dimensional layouts use `<Grid>`, for plain spacing use `<Box>`."].join(`
`)}}},args:{gap:4,direction:"column"}},a={render:r=>e.jsxs(n,{...r,children:[e.jsxs(n,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(n,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})},x={render:r=>e.jsxs(n,{...r,children:[e.jsxs(n,{gapX:"12px",children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(n,{gapX:"12px",children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]}),args:{gap:"16px"}},s={render:r=>e.jsxs(n,{...r,children:[e.jsxs(n,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsxs(n,{children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]}),e.jsxs(n,{p:5,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsxs(n,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})]})},c={render:r=>e.jsxs(n,{...r,direction:{base:"row",sm:"column"},children:[e.jsxs(n,{gapX:{sm:"10px"},gapY:{base:"10px",sm:0},direction:{base:"column",sm:"row"},children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(n,{gapX:{sm:"10px"},gapY:{base:"10px",sm:0},direction:{base:"column",sm:"row"},children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})},t={render:r=>e.jsxs(n,{...r,children:[e.jsxs(n,{px:36,gapX:12,children:[e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(n,{p:5,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})};var i,p,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{code:`const Default = () => {
  return (
    <Flex gap={4} direction="column">
      <Flex gapX={3}>
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
      <Flex gapX={3}>
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
    </Flex>
  );
};
`,...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var D,v,B;x.parameters={...x.parameters,docs:{...(D=x.parameters)==null?void 0:D.docs,source:{code:`const PixelValues = () => {
  return (
    <Flex gap="16px" direction="column">
      <Flex gapX="12px">
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
      <Flex gapX="12px">
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
    </Flex>
  );
};
`,...(B=(v=x.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var d,m,j;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{code:`const Nested = () => {
  return (
    <Flex gap={4} direction="column">
      <Flex gapX={3}>
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <Flex>
          <DecorativeBox />
          <DecorativeBox />
          <DecorativeBox />
          <DecorativeBox />
          <DecorativeBox />
        </Flex>
      </Flex>
      <Flex p={5}>
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <Flex gapX={3}>
          <DecorativeBox />
          <DecorativeBox />
          <DecorativeBox />
          <DecorativeBox />
          <DecorativeBox />
        </Flex>
      </Flex>
    </Flex>
  );
};
`,...(j=(m=s.parameters)==null?void 0:m.docs)==null?void 0:j.source}}};var u,F,g;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{code:`const Responsive = () => {
  return (
    <Flex
      gap={4}
      direction={{
        base: "row",
        sm: "column",
      }}
    >
      <Flex
        gapX={{ sm: "10px" }}
        gapY={{ base: "10px", sm: 0 }}
        direction={{
          base: "column",
          sm: "row",
        }}
      >
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
      <Flex
        gapX={{ sm: "10px" }}
        gapY={{ base: "10px", sm: 0 }}
        direction={{
          base: "column",
          sm: "row",
        }}
      >
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
    </Flex>
  );
};
`,...(g=(F=c.parameters)==null?void 0:F.docs)==null?void 0:g.source}}};var h,X,b;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{code:`const WithSizeToken = () => {
  return (
    <Flex gap={4} direction="column">
      <Flex px={36} gapX={12}>
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
      <Flex p={5}>
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </Flex>
    </Flex>
  );
};
`,...(b=(X=t.parameters)==null?void 0:X.docs)==null?void 0:b.source}}};var w,f,S;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => {
    return <Flex {...args}>
                <Flex gapX={3}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
                <Flex gapX={3}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>;
  }
}`,...(S=(f=a.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var y,Y,k;x.parameters={...x.parameters,docs:{...(y=x.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => {
    return <Flex {...args}>
                <Flex gapX="12px">
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
                <Flex gapX="12px">
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>;
  },
  args: {
    gap: '16px'
  }
}`,...(k=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:k.source}}};var N,R,W;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => {
    return <Flex {...args}>
                <Flex gapX={3}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <Flex>
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                    </Flex>
                </Flex>
                <Flex p={5}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <Flex gapX={3}>
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                        <DecorativeBox />
                    </Flex>
                </Flex>
            </Flex>;
  }
}`,...(W=(R=s.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var z,P,T;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => {
    return <Flex {...args} direction={{
      base: 'row',
      sm: 'column'
    }}>
                <Flex gapX={{
        sm: '10px'
      }} gapY={{
        base: '10px',
        sm: 0
      }} direction={{
        base: 'column',
        sm: 'row'
      }}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>

                <Flex gapX={{
        sm: '10px'
      }} gapY={{
        base: '10px',
        sm: 0
      }} direction={{
        base: 'column',
        sm: 'row'
      }}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>;
  }
}`,...(T=(P=c.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var V,A,C;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => {
    return <Flex {...args}>
                <Flex px={36} gapX={12}>
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
                <Flex p={5}>
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                    <DecorativeBox />
                </Flex>
            </Flex>;
  }
}`,...(C=(A=t.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};const I=["Default","PixelValues","Nested","Responsive","WithSizeToken"];export{a as Default,s as Nested,x as PixelValues,c as Responsive,t as WithSizeToken,I as __namedExportsOrder,H as default};
