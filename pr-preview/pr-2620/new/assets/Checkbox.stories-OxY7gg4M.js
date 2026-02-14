import{r as C,j as e,F as r}from"./iframe-DvdOIpuR.js";import{a as Le}from"./fondue-icons372-BHS9zo7M.js";import{L as F}from"./Label-B3-AIVtR.js";import{T as je}from"./Text-Cdg5wcpT.js";import{T}from"./Tooltip-k_XE4BO_.js";import{C as qe,a as k}from"./Checkbox-DdpGPMtG.js";import"./preload-helper-DI-8CSFo.js";import"./index-DjxjxZ84.js";import"./index-B6nhtUnq.js";import"./index-kon56UuI.js";import"./index-ZSY5AeMC.js";import"./index-CjOup1-W.js";import"./index-cBiI2IT4.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,Ne={title:"Components/Checkbox",component:qe,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["An input for selecting from predefined options. On its own, it captures a single selection — group a few together for multi-select scenarios.","","**When to use:** For binary choices or selecting multiple items from a list. Pair with a `Label` component for usability and a larger tap target.","",'**Selection state:** The `value` prop supports `true` (selected), `false` (unselected), and `"indeterminate"` (partial group selection). Indeterminate is a visual cue only and doesn\'t affect the underlying value.',"","**Label:** Whenever possible, include a visible label. In patterns like card or image selection where labels aren't practical, ensure the checkbox's meaning is clear from context.","","**Tooltip:** Use a Tooltip component alongside the label when additional context is needed. Keep content concise and avoid relying on it for critical information."].join(`
`)}}},args:{disabled:!1,required:!1,readOnly:!1,onChange:v("onChange"),onBlur:v("onBlur"),onFocus:v("onFocus")},render:n=>{const[x,g]=C.useState(n.value),a=C.useId(),l=`checkbox-${a}`,o=`label-${a}`,I=f=>{v("onChange")(f),g(m=>m==="indeterminate"?!0:!m)};return e.jsxs(r,{gap:2,align:"center",children:[e.jsx(k,{...n,id:l,"aria-labelledby":o,value:x,onChange:I}),e.jsx(F,{id:o,htmlFor:l,required:n.required,children:"Checkbox"})]})}},t={},s={args:{value:"indeterminate"}},c={args:{disabled:!0}},d={args:{required:!0}},i={args:{readOnly:!0,value:!0}},u={render:n=>{const[x,g]=C.useState(n.value),a=C.useId(),l=`checkbox-${a}`,o=`label-${a}`,I=f=>{v("onChange")(f),g(m=>m==="indeterminate"?!0:!m)};return e.jsxs(r,{gap:2,children:[e.jsx(k,{...n,id:l,"aria-labelledby":o,value:x,onChange:I}),e.jsxs(F,{id:o,htmlFor:l,required:n.required,children:["Checkbox",e.jsxs(T.Root,{children:[e.jsx(T.Trigger,{children:e.jsx(Le,{size:"16"})}),e.jsx(T.Content,{children:"I am a tooltip!"})]})]})]})}},b={render:n=>{const[x,g]=C.useState(n.value),a=l=>{v("onChange")(l),g(o=>o==="indeterminate"?!0:!o)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(k,{...n,id:"checkbox","aria-labelledby":"label",value:x,onChange:a})})}},h={render:n=>e.jsxs(r,{gap:"1rem",direction:"column",children:[e.jsxs(r,{gap:"4px",direction:"row",children:[e.jsx(k,{...n,id:"checkbox-1","aria-labelledby":"label-1",value:!0,onChange:()=>{}}),e.jsx(F,{id:"label-1",htmlFor:"checkbox-1",children:"Checkbox 1"})]}),e.jsxs(r,{gap:"4px",direction:"row",children:[e.jsx(k,{...n,id:"checkbox-2","aria-labelledby":"label-2",value:!1,onChange:()=>{}}),e.jsx(F,{id:"label-2",htmlFor:"checkbox-2",children:"Checkbox 2"})]}),e.jsxs(r,{gap:"4px",direction:"row",children:[e.jsx(k,{...n,id:"checkbox-3","aria-labelledby":"label-3",value:"indeterminate",onChange:()=>{}}),e.jsx(F,{id:"label-3",htmlFor:"checkbox-3",children:"Checkbox 3"})]})]})},p={render:n=>{const[x,g]=C.useState(n.value),a=C.useId(),l=`checkbox-${a}`,o=`label-${a}`,I=`helptext-${a}`,f=m=>{v("onChange")(m),g(y=>y==="indeterminate"?!0:!y)};return e.jsxs(r,{direction:"column",gap:2,children:[e.jsxs(r,{gap:2,align:"center",children:[e.jsx(k,{...n,id:l,"aria-labelledby":o,"aria-describedby":I,value:x,onChange:f,status:"error"}),e.jsx(F,{id:o,htmlFor:l,children:"I agree to the terms and conditions."})]}),e.jsx(je,{id:I,size:"small",color:"negative",children:"Please check this box to continue."})]})}};var L,j,q;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{code:`const Default = () => {
  const [value, setValue] = useState(args.value);
  const id = useId();
  const checkboxId = \`checkbox-\${id}\`;
  const labelId = \`label-\${id}\`;

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <Flex gap={2} align="center">
      <Checkbox
        disabled={false}
        required={false}
        readOnly={false}
        onBlur={action("onBlur")}
        onFocus={action("onFocus")}
        id={checkboxId}
        aria-labelledby={labelId}
        value={value}
        onChange={handleToggle}
      />
      <Label id={labelId} htmlFor={checkboxId} required={false}>
        Checkbox
      </Label>
    </Flex>
  );
};
`,...(q=(j=t.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var S,$,V;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{code:`const Indeterminate = () => {
  const [value, setValue] = useState(args.value);
  const id = useId();
  const checkboxId = \`checkbox-\${id}\`;
  const labelId = \`label-\${id}\`;

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <Flex gap={2} align="center">
      <Checkbox
        disabled={false}
        required={false}
        readOnly={false}
        onBlur={action("onBlur")}
        onFocus={action("onFocus")}
        id={checkboxId}
        aria-labelledby={labelId}
        value={value}
        onChange={handleToggle}
      />
      <Label id={labelId} htmlFor={checkboxId} required={false}>
        Checkbox
      </Label>
    </Flex>
  );
};
`,...(V=($=s.parameters)==null?void 0:$.docs)==null?void 0:V.source}}};var B,O,w;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{code:`const Disabled = () => {
  const [value, setValue] = useState(args.value);
  const id = useId();
  const checkboxId = \`checkbox-\${id}\`;
  const labelId = \`label-\${id}\`;

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <Flex gap={2} align="center">
      <Checkbox
        disabled
        required={false}
        readOnly={false}
        onBlur={action("onBlur")}
        onFocus={action("onFocus")}
        id={checkboxId}
        aria-labelledby={labelId}
        value={value}
        onChange={handleToggle}
      />
      <Label id={labelId} htmlFor={checkboxId} required={false}>
        Checkbox
      </Label>
    </Flex>
  );
};
`,...(w=(O=c.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};var E,R,W;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{code:`const Required = () => {
  const [value, setValue] = useState(args.value);
  const id = useId();
  const checkboxId = \`checkbox-\${id}\`;
  const labelId = \`label-\${id}\`;

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <Flex gap={2} align="center">
      <Checkbox
        disabled={false}
        required
        readOnly={false}
        onBlur={action("onBlur")}
        onFocus={action("onFocus")}
        id={checkboxId}
        aria-labelledby={labelId}
        value={value}
        onChange={handleToggle}
      />
      <Label id={labelId} htmlFor={checkboxId} required>
        Checkbox
      </Label>
    </Flex>
  );
};
`,...(W=(R=d.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var _,D,z;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{code:`const ReadOnly = () => {
  const [value, setValue] = useState(args.value);
  const id = useId();
  const checkboxId = \`checkbox-\${id}\`;
  const labelId = \`label-\${id}\`;

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <Flex gap={2} align="center">
      <Checkbox
        disabled={false}
        required={false}
        readOnly
        onBlur={action("onBlur")}
        onFocus={action("onFocus")}
        id={checkboxId}
        aria-labelledby={labelId}
        value={value}
        onChange={handleToggle}
      />
      <Label id={labelId} htmlFor={checkboxId} required={false}>
        Checkbox
      </Label>
    </Flex>
  );
};
`,...(z=(D=i.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var A,N,P;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{code:`const WithTooltip = () => {
  const [value, setValue] = useState(args.value);
  const id = useId();
  const checkboxId = \`checkbox-\${id}\`;
  const labelId = \`label-\${id}\`;

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <Flex gap={2}>
      <Checkbox
        disabled={false}
        required={false}
        readOnly={false}
        onBlur={action("onBlur")}
        onFocus={action("onFocus")}
        id={checkboxId}
        aria-labelledby={labelId}
        value={value}
        onChange={handleToggle}
      />
      <Label id={labelId} htmlFor={checkboxId} required={false}>
        Checkbox
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size="16" />
          </Tooltip.Trigger>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Root>
      </Label>
    </Flex>
  );
};
`,...(P=(N=u.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var H,M,K;b.parameters={...b.parameters,docs:{...(H=b.parameters)==null?void 0:H.docs,source:{code:`const WithoutLabel = () => {
  const [value, setValue] = useState(args.value);

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <div className="tw-flex tw-gap-2 tw-items-center">
      <Checkbox
        disabled={false}
        required={false}
        readOnly={false}
        onBlur={action("onBlur")}
        onFocus={action("onFocus")}
        id="checkbox"
        aria-labelledby="label"
        value={value}
        onChange={handleToggle}
      />
    </div>
  );
};
`,...(K=(M=b.parameters)==null?void 0:M.docs)==null?void 0:K.source}}};var Q,U,Y;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{code:`const Checklist = () => {
  return (
    <Flex gap="1rem" direction="column">
      <Flex gap="4px" direction="row">
        <Checkbox
          disabled={false}
          required={false}
          readOnly={false}
          onBlur={action("onBlur")}
          onFocus={action("onFocus")}
          id="checkbox-1"
          aria-labelledby="label-1"
          value
          onChange={() => undefined}
        />
        <Label id="label-1" htmlFor="checkbox-1">
          Checkbox 1
        </Label>
      </Flex>
      <Flex gap="4px" direction="row">
        <Checkbox
          disabled={false}
          required={false}
          readOnly={false}
          onBlur={action("onBlur")}
          onFocus={action("onFocus")}
          id="checkbox-2"
          aria-labelledby="label-2"
          value={false}
          onChange={() => undefined}
        />
        <Label id="label-2" htmlFor="checkbox-2">
          Checkbox 2
        </Label>
      </Flex>
      <Flex gap="4px" direction="row">
        <Checkbox
          disabled={false}
          required={false}
          readOnly={false}
          onBlur={action("onBlur")}
          onFocus={action("onFocus")}
          id="checkbox-3"
          aria-labelledby="label-3"
          value="indeterminate"
          onChange={() => undefined}
        />
        <Label id="label-3" htmlFor="checkbox-3">
          Checkbox 3
        </Label>
      </Flex>
    </Flex>
  );
};
`,...(Y=(U=h.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var G,J,X;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{code:`const WithErrorAndHelpText = () => {
  const [value, setValue] = useState(args.value);
  const id = useId();
  const checkboxId = \`checkbox-\${id}\`;
  const labelId = \`label-\${id}\`;
  const helpTextId = \`helptext-\${id}\`;

  const handleToggle = (event: FormEvent) => {
    action("onChange")(event);
    setValue((prevIsChecked) =>
      prevIsChecked === "indeterminate" ? true : !prevIsChecked,
    );
  };

  return (
    <Flex direction="column" gap={2}>
      <Flex gap={2} align="center">
        <Checkbox
          disabled={false}
          required={false}
          readOnly={false}
          onBlur={action("onBlur")}
          onFocus={action("onFocus")}
          id={checkboxId}
          aria-labelledby={labelId}
          aria-describedby={helpTextId}
          value={value}
          onChange={handleToggle}
          status="error"
        />
        <Label id={labelId} htmlFor={checkboxId}>
          I agree to the terms and conditions.
        </Label>
      </Flex>
      <Text id={helpTextId} size="small" color="negative">
        Please check this box to continue.
      </Text>
    </Flex>
  );
};
`,...(X=(J=p.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,ee,ne;t.parameters={...t.parameters,docs:{...(Z=t.parameters)==null?void 0:Z.docs,source:{originalSource:"{}",...(ne=(ee=t.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var ae,oe,le;s.parameters={...s.parameters,docs:{...(ae=s.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(le=(oe=s.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var re,te,se;c.parameters={...c.parameters,docs:{...(re=c.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(se=(te=c.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var ce,de,ie;d.parameters={...d.parameters,docs:{...(ce=d.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(ie=(de=d.parameters)==null?void 0:de.docs)==null?void 0:ie.source}}};var ue,be,he;i.parameters={...i.parameters,docs:{...(ue=i.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    value: true
  }
}`,...(he=(be=i.parameters)==null?void 0:be.docs)==null?void 0:he.source}}};var pe,xe,ge;u.parameters={...u.parameters,docs:{...(pe=u.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(args.value);
    const id = useId();
    const checkboxId = \`checkbox-\${id}\`;
    const labelId = \`label-\${id}\`;
    const handleToggle = (event: FormEvent) => {
      action('onChange')(event);
      setValue(prevIsChecked => prevIsChecked === 'indeterminate' ? true : !prevIsChecked);
    };
    return <Flex gap={2}>
                <Checkbox {...args} id={checkboxId} aria-labelledby={labelId} value={value} onChange={handleToggle} />
                <Label id={labelId} htmlFor={checkboxId} required={args.required}>
                    Checkbox
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconQuestionMarkCircle size="16" />
                        </Tooltip.Trigger>

                        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
            </Flex>;
  }
}`,...(ge=(xe=u.parameters)==null?void 0:xe.docs)==null?void 0:ge.source}}};var me,ve,ke;b.parameters={...b.parameters,docs:{...(me=b.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(args.value);
    const handleToggle = (event: FormEvent) => {
      action('onChange')(event);
      setValue(prevIsChecked => prevIsChecked === 'indeterminate' ? true : !prevIsChecked);
    };
    return <div className="tw-flex tw-gap-2 tw-items-center">
                <Checkbox {...args} id="checkbox" aria-labelledby="label" value={value} onChange={handleToggle} />
            </div>;
  }
}`,...(ke=(ve=b.parameters)==null?void 0:ve.docs)==null?void 0:ke.source}}};var Ce,Ie,Fe;h.parameters={...h.parameters,docs:{...(Ce=h.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: args => {
    return <Flex gap="1rem" direction="column">
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-1" aria-labelledby="label-1" value onChange={() => undefined} />
                    <Label id="label-1" htmlFor="checkbox-1">
                        Checkbox 1
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-2" aria-labelledby="label-2" value={false} onChange={() => undefined} />
                    <Label id="label-2" htmlFor="checkbox-2">
                        Checkbox 2
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-3" aria-labelledby="label-3" value="indeterminate" onChange={() => undefined} />
                    <Label id="label-3" htmlFor="checkbox-3">
                        Checkbox 3
                    </Label>
                </Flex>
            </Flex>;
  }
}`,...(Fe=(Ie=h.parameters)==null?void 0:Ie.docs)==null?void 0:Fe.source}}};var fe,Te,ye;p.parameters={...p.parameters,docs:{...(fe=p.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(args.value);
    const id = useId();
    const checkboxId = \`checkbox-\${id}\`;
    const labelId = \`label-\${id}\`;
    const helpTextId = \`helptext-\${id}\`;
    const handleToggle = (event: FormEvent) => {
      action('onChange')(event);
      setValue(prevIsChecked => prevIsChecked === 'indeterminate' ? true : !prevIsChecked);
    };
    return <Flex direction="column" gap={2}>
                <Flex gap={2} align="center">
                    <Checkbox {...args} id={checkboxId} aria-labelledby={labelId} aria-describedby={helpTextId} value={value} onChange={handleToggle} status="error" />
                    <Label id={labelId} htmlFor={checkboxId}>
                        I agree to the terms and conditions.
                    </Label>
                </Flex>
                <Text id={helpTextId} size="small" color="negative">
                    Please check this box to continue.
                </Text>
            </Flex>;
  }
}`,...(ye=(Te=p.parameters)==null?void 0:Te.docs)==null?void 0:ye.source}}};const Pe=["Default","Indeterminate","Disabled","Required","ReadOnly","WithTooltip","WithoutLabel","Checklist","WithErrorAndHelpText"];export{h as Checklist,t as Default,c as Disabled,s as Indeterminate,i as ReadOnly,d as Required,p as WithErrorAndHelpText,u as WithTooltip,b as WithoutLabel,Pe as __namedExportsOrder,Ne as default};
