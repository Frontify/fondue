import{F as r,j as e}from"./iframe-DPoP7z1C.js";import{D as C}from"./DecorativeContent-BewGonai.js";import{B as L}from"./Box-DMDGUJid.js";import"./preload-helper-D1UmWqwl.js";const o=n=>e.jsx(L,{width:"100px",height:"100px",...n,children:e.jsx(C,{})});o.displayName="DecorativeBox";const H={title:"Layout/Flex",component:r,tags:["autodocs"],parameters:{status:{type:"released"}},args:{gap:4,direction:"column"}},x={render:n=>e.jsxs(r,{...n,children:[e.jsxs(r,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(r,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})},a={render:n=>e.jsxs(r,{...n,children:[e.jsxs(r,{gapX:"12px",children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(r,{gapX:"12px",children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]}),args:{gap:"16px"}},s={render:n=>e.jsxs(r,{...n,children:[e.jsxs(r,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsxs(r,{children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]}),e.jsxs(r,{p:5,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsxs(r,{gapX:3,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})]})},c={render:n=>e.jsxs(r,{...n,direction:{base:"row",sm:"column"},children:[e.jsxs(r,{gapX:{sm:"10px"},gapY:{base:"10px",sm:0},direction:{base:"column",sm:"row"},children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(r,{gapX:{sm:"10px"},gapY:{base:"10px",sm:0},direction:{base:"column",sm:"row"},children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})},t={render:n=>e.jsxs(r,{...n,children:[e.jsxs(r,{px:36,gapX:12,children:[e.jsx(o,{}),e.jsx(o,{})]}),e.jsxs(r,{p:5,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})};var i,p,D;x.parameters={...x.parameters,docs:{...(i=x.parameters)==null?void 0:i.docs,source:{code:`const Default = () => {
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
`,...(D=(p=x.parameters)==null?void 0:p.docs)==null?void 0:D.source}}};var l,v,B;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{code:`const PixelValues = () => {
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
`,...(B=(v=a.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var m,d,j;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{code:`const Nested = () => {
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
`,...(j=(d=s.parameters)==null?void 0:d.docs)==null?void 0:j.source}}};var F,u,g;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{code:`const Responsive = () => {
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
`,...(g=(u=c.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var X,h,b;t.parameters={...t.parameters,docs:{...(X=t.parameters)==null?void 0:X.docs,source:{code:`const WithSizeToken = () => {
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
`,...(b=(h=t.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var w,S,f;x.parameters={...x.parameters,docs:{...(w=x.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(f=(S=x.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var Y,N,R;a.parameters={...a.parameters,docs:{...(Y=a.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(R=(N=a.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var k,y,z;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(z=(y=s.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var P,T,V;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(V=(T=c.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var W,E,_;t.parameters={...t.parameters,docs:{...(W=t.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(_=(E=t.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};const I=["Default","PixelValues","Nested","Responsive","WithSizeToken"];export{x as Default,s as Nested,a as PixelValues,c as Responsive,t as WithSizeToken,I as __namedExportsOrder,H as default};
