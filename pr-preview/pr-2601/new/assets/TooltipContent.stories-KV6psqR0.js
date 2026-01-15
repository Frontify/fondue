import{j as o}from"./iframe-euguP-PF.js";import{B as l}from"./Button-CE-zcput.js";import{b as go,T as t}from"./Tooltip-C14WA5Q_.js";import"./preload-helper-352D8iK5.js";import"./index-DFAGPZKH.js";import"./index-Bwsy1Uhv.js";import"./index--iYAC0Rc.js";import"./index-c03yA22U.js";const Lo={component:go,title:"Components/Tooltip/Content",tags:["autodocs"],args:{padding:"spacious",side:"top",maxWidth:"200px",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},parameters:{status:{type:"released"}},render:({...m})=>o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(l,{children:"Hover over me!"})}),o.jsx(t.Content,{...m})]})},e={args:{}},r={args:{padding:"compact"}},n={args:{side:"top"}},s={args:{side:"top"},render:({...m})=>o.jsx("div",{className:"tw-mt-64",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(l,{children:"Hover over me!"})}),o.jsx(t.Content,{...m})]})})},i={args:{side:"left"}},a={args:{side:"left"},render:({...m})=>o.jsx("div",{className:"tw-ml-64",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(l,{children:"Hover over me!"})}),o.jsx(t.Content,{...m})]})})},p={args:{side:"bottom"}},d={args:{side:"right"}},c={args:{maxWidth:"400px"}};var u,g,T;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{code:`const LongText = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover over me!</Button>
      </Tooltip.Trigger>
      <Tooltip.Content padding="spacious" side="top" maxWidth="200px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(T=(g=e.parameters)==null?void 0:g.docs)==null?void 0:T.source}}};var h,x,C;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{code:`const Compact = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover over me!</Button>
      </Tooltip.Trigger>
      <Tooltip.Content padding="compact" side="top" maxWidth="200px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(C=(x=r.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var v,W,R;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{code:`const TopWithCollision = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover over me!</Button>
      </Tooltip.Trigger>
      <Tooltip.Content padding="spacious" side="top" maxWidth="200px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(R=(W=n.parameters)==null?void 0:W.docs)==null?void 0:R.source}}};var B,L,f;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{code:`const TopWithoutCollision = () => {
  return (
    <div className="tw-mt-64">
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button>Hover over me!</Button>
        </Tooltip.Trigger>
        <Tooltip.Content padding="spacious" side="top" maxWidth="200px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
};
`,...(f=(L=s.parameters)==null?void 0:L.docs)==null?void 0:f.source}}};var j,b,H;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{code:`const LeftWithCollision = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover over me!</Button>
      </Tooltip.Trigger>
      <Tooltip.Content padding="spacious" side="left" maxWidth="200px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(H=(b=i.parameters)==null?void 0:b.docs)==null?void 0:H.source}}};var q,S,w;a.parameters={...a.parameters,docs:{...(q=a.parameters)==null?void 0:q.docs,source:{code:`const LeftWithoutCollision = () => {
  return (
    <div className="tw-ml-64">
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Button>Hover over me!</Button>
        </Tooltip.Trigger>
        <Tooltip.Content padding="spacious" side="left" maxWidth="200px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
};
`,...(w=(S=a.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var N,M,E;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{code:`const Bottom = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover over me!</Button>
      </Tooltip.Trigger>
      <Tooltip.Content padding="spacious" side="bottom" maxWidth="200px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(E=(M=p.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};var _,y,O;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{code:`const Right = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover over me!</Button>
      </Tooltip.Trigger>
      <Tooltip.Content padding="spacious" side="right" maxWidth="200px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(O=(y=d.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var k,z,A;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{code:`const WithMaxWidth = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button>Hover over me!</Button>
      </Tooltip.Trigger>
      <Tooltip.Content padding="spacious" side="top" maxWidth="400px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(A=(z=c.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var D,F,G;e.parameters={...e.parameters,docs:{...(D=e.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {}
}`,...(G=(F=e.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var I,J,K;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    padding: 'compact'
  }
}`,...(K=(J=r.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var P,Q,U;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    side: 'top'
  }
}`,...(U=(Q=n.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var V,X,Y;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    side: 'top'
  },
  render: ({
    ...args
  }) => {
    return <div className="tw-mt-64">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content {...args} />
                </Tooltip.Root>
            </div>;
  }
}`,...(Y=(X=s.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,oo;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    side: 'left'
  }
}`,...(oo=($=i.parameters)==null?void 0:$.docs)==null?void 0:oo.source}}};var to,eo,ro;a.parameters={...a.parameters,docs:{...(to=a.parameters)==null?void 0:to.docs,source:{originalSource:`{
  args: {
    side: 'left'
  },
  render: ({
    ...args
  }) => {
    return <div className="tw-ml-64">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content {...args} />
                </Tooltip.Root>
            </div>;
  }
}`,...(ro=(eo=a.parameters)==null?void 0:eo.docs)==null?void 0:ro.source}}};var no,so,io;p.parameters={...p.parameters,docs:{...(no=p.parameters)==null?void 0:no.docs,source:{originalSource:`{
  args: {
    side: 'bottom'
  }
}`,...(io=(so=p.parameters)==null?void 0:so.docs)==null?void 0:io.source}}};var ao,po,co;d.parameters={...d.parameters,docs:{...(ao=d.parameters)==null?void 0:ao.docs,source:{originalSource:`{
  args: {
    side: 'right'
  }
}`,...(co=(po=d.parameters)==null?void 0:po.docs)==null?void 0:co.source}}};var mo,lo,uo;c.parameters={...c.parameters,docs:{...(mo=c.parameters)==null?void 0:mo.docs,source:{originalSource:`{
  args: {
    maxWidth: '400px'
  }
}`,...(uo=(lo=c.parameters)==null?void 0:lo.docs)==null?void 0:uo.source}}};const fo=["LongText","Compact","TopWithCollision","TopWithoutCollision","LeftWithCollision","LeftWithoutCollision","Bottom","Right","WithMaxWidth"];export{p as Bottom,r as Compact,i as LeftWithCollision,a as LeftWithoutCollision,e as LongText,d as Right,n as TopWithCollision,s as TopWithoutCollision,c as WithMaxWidth,fo as __namedExportsOrder,Lo as default};
