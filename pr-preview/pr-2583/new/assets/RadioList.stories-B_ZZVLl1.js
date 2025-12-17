import{r as g,j as o,F as L}from"./iframe-Db5hQ5sg.js";import{a as Oo}from"./fondue-icons369-BNKPvuq7.js";import{L as R}from"./Label-CQZ8HzQy.js";import{T as h}from"./Tooltip-CwLtZ3Lt.js";import{R as Ro,a as i}from"./RadioList-Bycx0deY.js";import"./preload-helper-D1UmWqwl.js";import"./index-49jLUIKR.js";import"./styleUtilities-2BeOq_wU.js";import"./index-CztkM85V.js";import"./index-Dts1fSo2.js";import"./index-CBMRdpNW.js";import"./index-B2f6QIz9.js";import"./index-PzDCz0sV.js";import"./index-C8VbmMqW.js";import"./index-vI7GY8sR.js";import"./index-BK_7qxtb.js";import"./index-DUrgTXVU.js";const zo={title:"Components/RadioList",component:Ro,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,readOnly:!1,required:!1,value:void 0,orientation:void 0,emphasis:void 0},argTypes:{value:{type:"string"},orientation:{type:"string",options:[void 0,"horizontal","vertical"],control:{type:"select"}},emphasis:{type:"string",options:[void 0,"default","highlight"],control:{type:"select"}}},render:n=>{const t=g.useId(),c=`${t}-option-1`,m=`${t}-option-2`,O=`${t}-option-3`;return o.jsxs(i.Root,{...n,children:[o.jsx(i.RadioButton,{id:c,value:"1"}),o.jsx(R,{htmlFor:c,required:n.required,children:"Option 1"}),o.jsx(i.RadioButton,{id:m,value:"2"}),o.jsx(R,{htmlFor:m,required:n.required,children:"Option 2"}),o.jsx(i.RadioButton,{id:O,value:"3"}),o.jsxs(R,{htmlFor:O,required:n.required,children:["Option 3",o.jsxs(h.Root,{children:[o.jsx(h.Trigger,{children:o.jsx(Oo,{size:"16"})}),o.jsx(h.Content,{children:"I'm a tooltip!"})]})]})]})}},e={},a={args:{disabled:!0}},d={args:{readOnly:!0}},r={args:{required:!0}},s={args:{orientation:"vertical"}},l={args:{emphasis:"highlight"}},p={render:n=>{const t=g.useId(),c=`${t}-option-1`,m=`${t}-option-2`,O=`${t}-option-3`;return o.jsxs(i.Root,{...n,children:[o.jsx(i.RadioButton,{id:c,value:"1"}),o.jsx(i.RadioButton,{id:m,value:"2"}),o.jsx(i.RadioButton,{id:O,value:"3"})]})}},u={render:n=>{const t=g.useId(),c=`${t}-option-1`,m=`${t}-option-2`,O=`${t}-option-3`;return o.jsx(i.Root,{disabled:n.disabled,required:n.required,value:n.value,asChild:!0,children:o.jsxs(L,{gap:4,children:[o.jsxs(L,{gap:2,align:"center",children:[o.jsx(i.RadioButton,{id:c,value:"1"}),o.jsx(R,{htmlFor:c,required:n.required,children:"Option 1"})]}),o.jsxs(L,{gap:2,align:"center",children:[o.jsx(i.RadioButton,{id:m,value:"2"}),o.jsx(R,{htmlFor:m,required:n.required,children:"Option 2"})]}),o.jsxs(L,{gap:2,align:"center",children:[o.jsx(i.RadioButton,{id:O,value:"3"}),o.jsx(R,{htmlFor:O,required:n.required,children:"Option 3"})]})]})})}};var f,b,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{code:`const Required = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root
      disabled={false}
      readOnly={false}
      required
      value={undefined}
      orientation={undefined}
      emphasis={undefined}
    >
      <RadioList.RadioButton id={idOption1} value="1" />
      <Label htmlFor={idOption1} required>
        Option 1
      </Label>
      <RadioList.RadioButton id={idOption2} value="2" />
      <Label htmlFor={idOption2} required>
        Option 2
      </Label>
      <RadioList.RadioButton id={idOption3} value="3" />
      <Label htmlFor={idOption3} required>
        Option 3
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size="16" />
          </Tooltip.Trigger>
          <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Label>
    </RadioList.Root>
  );
};
`,...(v=(b=r.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var q,T,x;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{code:`const Vertical = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root
      disabled={false}
      readOnly={false}
      required={false}
      value={undefined}
      orientation="vertical"
      emphasis={undefined}
    >
      <RadioList.RadioButton id={idOption1} value="1" />
      <Label htmlFor={idOption1} required={false}>
        Option 1
      </Label>
      <RadioList.RadioButton id={idOption2} value="2" />
      <Label htmlFor={idOption2} required={false}>
        Option 2
      </Label>
      <RadioList.RadioButton id={idOption3} value="3" />
      <Label htmlFor={idOption3} required={false}>
        Option 3
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size="16" />
          </Tooltip.Trigger>
          <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Label>
    </RadioList.Root>
  );
};
`,...(x=(T=s.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var F,B,$;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{code:`const WithEmphasisHighlight = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root
      disabled={false}
      readOnly={false}
      required={false}
      value={undefined}
      orientation={undefined}
      emphasis="highlight"
    >
      <RadioList.RadioButton id={idOption1} value="1" />
      <Label htmlFor={idOption1} required={false}>
        Option 1
      </Label>
      <RadioList.RadioButton id={idOption2} value="2" />
      <Label htmlFor={idOption2} required={false}>
        Option 2
      </Label>
      <RadioList.RadioButton id={idOption3} value="3" />
      <Label htmlFor={idOption3} required={false}>
        Option 3
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size="16" />
          </Tooltip.Trigger>
          <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Label>
    </RadioList.Root>
  );
};
`,...($=(B=l.parameters)==null?void 0:B.docs)==null?void 0:$.source}}};var j,C,I;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{code:`const WithoutLabels = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root
      disabled={false}
      readOnly={false}
      required={false}
      value={undefined}
      orientation={undefined}
      emphasis={undefined}
    >
      <RadioList.RadioButton id={idOption1} value="1" />
      <RadioList.RadioButton id={idOption2} value="2" />
      <RadioList.RadioButton id={idOption3} value="3" />
    </RadioList.Root>
  );
};
`,...(I=(C=p.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var y,W,z;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{code:`const WithCustomLayout = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root disabled={false} required={false} value={undefined} asChild>
      <Flex gap={4}>
        <Flex gap={2} align="center">
          <RadioList.RadioButton id={idOption1} value="1" />
          <Label htmlFor={idOption1} required={false}>
            Option 1
          </Label>
        </Flex>
        <Flex gap={2} align="center">
          <RadioList.RadioButton id={idOption2} value="2" />
          <Label htmlFor={idOption2} required={false}>
            Option 2
          </Label>
        </Flex>
        <Flex gap={2} align="center">
          <RadioList.RadioButton id={idOption3} value="3" />
          <Label htmlFor={idOption3} required={false}>
            Option 3
          </Label>
        </Flex>
      </Flex>
    </RadioList.Root>
  );
};
`,...(z=(W=u.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var S,k,D;e.parameters={...e.parameters,docs:{...(S=e.parameters)==null?void 0:S.docs,source:{code:`const Default = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root
      disabled={false}
      readOnly={false}
      required={false}
      value={undefined}
      orientation={undefined}
      emphasis={undefined}
    >
      <RadioList.RadioButton id={idOption1} value="1" />
      <Label htmlFor={idOption1} required={false}>
        Option 1
      </Label>
      <RadioList.RadioButton id={idOption2} value="2" />
      <Label htmlFor={idOption2} required={false}>
        Option 2
      </Label>
      <RadioList.RadioButton id={idOption3} value="3" />
      <Label htmlFor={idOption3} required={false}>
        Option 3
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size="16" />
          </Tooltip.Trigger>
          <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Label>
    </RadioList.Root>
  );
};
`,...(D=(k=e.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var E,M,Q;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{code:`const Disabled = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root
      disabled
      readOnly={false}
      required={false}
      value={undefined}
      orientation={undefined}
      emphasis={undefined}
    >
      <RadioList.RadioButton id={idOption1} value="1" />
      <Label htmlFor={idOption1} required={false}>
        Option 1
      </Label>
      <RadioList.RadioButton id={idOption2} value="2" />
      <Label htmlFor={idOption2} required={false}>
        Option 2
      </Label>
      <RadioList.RadioButton id={idOption3} value="3" />
      <Label htmlFor={idOption3} required={false}>
        Option 3
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size="16" />
          </Tooltip.Trigger>
          <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Label>
    </RadioList.Root>
  );
};
`,...(Q=(M=a.parameters)==null?void 0:M.docs)==null?void 0:Q.source}}};var H,V,_;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{code:`const ReadOnly = () => {
  const id = useId();

  const idOption1 = \`\${id}-option-1\`;
  const idOption2 = \`\${id}-option-2\`;
  const idOption3 = \`\${id}-option-3\`;

  return (
    <RadioList.Root
      disabled={false}
      readOnly
      required={false}
      value={undefined}
      orientation={undefined}
      emphasis={undefined}
    >
      <RadioList.RadioButton id={idOption1} value="1" />
      <Label htmlFor={idOption1} required={false}>
        Option 1
      </Label>
      <RadioList.RadioButton id={idOption2} value="2" />
      <Label htmlFor={idOption2} required={false}>
        Option 2
      </Label>
      <RadioList.RadioButton id={idOption3} value="3" />
      <Label htmlFor={idOption3} required={false}>
        Option 3
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size="16" />
          </Tooltip.Trigger>
          <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Label>
    </RadioList.Root>
  );
};
`,...(_=(V=d.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var w,A,G;e.parameters={...e.parameters,docs:{...(w=e.parameters)==null?void 0:w.docs,source:{originalSource:"{}",...(G=(A=e.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var J,K,N;a.parameters={...a.parameters,docs:{...(J=a.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(N=(K=a.parameters)==null?void 0:K.docs)==null?void 0:N.source}}};var P,U,X;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(X=(U=d.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,oo;r.parameters={...r.parameters,docs:{...(Y=r.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(oo=(Z=r.parameters)==null?void 0:Z.docs)==null?void 0:oo.source}}};var no,io,to;s.parameters={...s.parameters,docs:{...(no=s.parameters)==null?void 0:no.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  }
}`,...(to=(io=s.parameters)==null?void 0:io.docs)==null?void 0:to.source}}};var eo,ao,ro;l.parameters={...l.parameters,docs:{...(eo=l.parameters)==null?void 0:eo.docs,source:{originalSource:`{
  args: {
    emphasis: 'highlight'
  }
}`,...(ro=(ao=l.parameters)==null?void 0:ao.docs)==null?void 0:ro.source}}};var so,lo,po;p.parameters={...p.parameters,docs:{...(so=p.parameters)==null?void 0:so.docs,source:{originalSource:`{
  render: args => {
    const id = useId();
    const idOption1 = \`\${id}-option-1\`;
    const idOption2 = \`\${id}-option-2\`;
    const idOption3 = \`\${id}-option-3\`;
    return <RadioList.Root {...args}>
                <RadioList.RadioButton id={idOption1} value="1" />
                <RadioList.RadioButton id={idOption2} value="2" />
                <RadioList.RadioButton id={idOption3} value="3" />
            </RadioList.Root>;
  }
}`,...(po=(lo=p.parameters)==null?void 0:lo.docs)==null?void 0:po.source}}};var uo,co,mo;u.parameters={...u.parameters,docs:{...(uo=u.parameters)==null?void 0:uo.docs,source:{originalSource:`{
  render: args => {
    const id = useId();
    const idOption1 = \`\${id}-option-1\`;
    const idOption2 = \`\${id}-option-2\`;
    const idOption3 = \`\${id}-option-3\`;
    return <RadioList.Root disabled={args.disabled} required={args.required} value={args.value} asChild>
                <Flex gap={4}>
                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption1} value="1" />
                        <Label htmlFor={idOption1} required={args.required}>
                            Option 1
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption2} value="2" />
                        <Label htmlFor={idOption2} required={args.required}>
                            Option 2
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption3} value="3" />
                        <Label htmlFor={idOption3} required={args.required}>
                            Option 3
                        </Label>
                    </Flex>
                </Flex>
            </RadioList.Root>;
  }
}`,...(mo=(co=u.parameters)==null?void 0:co.docs)==null?void 0:mo.source}}};const So=["Default","Disabled","ReadOnly","Required","Vertical","WithEmphasisHighlight","WithoutLabels","WithCustomLayout"];export{e as Default,a as Disabled,d as ReadOnly,r as Required,s as Vertical,u as WithCustomLayout,l as WithEmphasisHighlight,p as WithoutLabels,So as __namedExportsOrder,zo as default};
