import{r as C,j as e,F as h}from"./iframe-BxhwzE3V.js";import{a as ke}from"./fondue-icons369-BObKBCRc.js";import{L as v}from"./Label-BfYxzd3B.js";import{T as f}from"./Tooltip-CV3-HsSm.js";import{C as ve,a as x}from"./Checkbox-Bf8IyBPq.js";import"./preload-helper-mNEUNaaY.js";import"./index-C-utw5jm.js";import"./index-BhZpd4YR.js";import"./index-2_YSeu5Y.js";import"./index-Cnyf2lUn.js";import"./index-Vg3YS3uy.js";import"./index-Bp_I19rh.js";import"./index-BKzHAa7s.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,we={title:"Components/Checkbox",component:ve,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:p("onChange"),onBlur:p("onBlur"),onFocus:p("onFocus")},render:n=>{const[m,g]=C.useState(n.value),u=C.useId(),b=`checkbox-${u}`,a=`label-${u}`,I=F=>{p("onChange")(F),g(k=>k==="indeterminate"?!0:!k)};return e.jsxs(h,{gap:2,align:"center",children:[e.jsx(x,{...n,id:b,"aria-labelledby":a,value:m,onChange:I}),e.jsx(v,{id:a,htmlFor:b,required:n.required,children:"Checkbox"})]})}},o={},r={args:{value:"indeterminate"}},l={args:{disabled:!0}},t={args:{required:!0}},s={args:{readOnly:!0,value:!0}},c={render:n=>{const[m,g]=C.useState(n.value),u=C.useId(),b=`checkbox-${u}`,a=`label-${u}`,I=F=>{p("onChange")(F),g(k=>k==="indeterminate"?!0:!k)};return e.jsxs(h,{gap:2,children:[e.jsx(x,{...n,id:b,"aria-labelledby":a,value:m,onChange:I}),e.jsxs(v,{id:a,htmlFor:b,required:n.required,children:["Checkbox",e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(ke,{size:"16"})}),e.jsx(f.Content,{children:"I am a tooltip!"})]})]})]})}},d={render:n=>{const[m,g]=C.useState(n.value),u=b=>{p("onChange")(b),g(a=>a==="indeterminate"?!0:!a)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(x,{...n,id:"checkbox","aria-labelledby":"label",value:m,onChange:u})})}},i={render:n=>e.jsxs(h,{gap:"1rem",direction:"column",children:[e.jsxs(h,{gap:"4px",direction:"row",children:[e.jsx(x,{...n,id:"checkbox-1","aria-labelledby":"label-1",value:!0,onChange:()=>{}}),e.jsx(v,{id:"label-1",htmlFor:"checkbox-1",children:"Checkbox 1"})]}),e.jsxs(h,{gap:"4px",direction:"row",children:[e.jsx(x,{...n,id:"checkbox-2","aria-labelledby":"label-2",value:!1,onChange:()=>{}}),e.jsx(v,{id:"label-2",htmlFor:"checkbox-2",children:"Checkbox 2"})]}),e.jsxs(h,{gap:"4px",direction:"row",children:[e.jsx(x,{...n,id:"checkbox-3","aria-labelledby":"label-3",value:"indeterminate",onChange:()=>{}}),e.jsx(v,{id:"label-3",htmlFor:"checkbox-3",children:"Checkbox 3"})]})]})};var T,y,L;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{code:`const Default = () => {
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
`,...(L=(y=o.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var q,j,B;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{code:`const Indeterminate = () => {
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
`,...(B=(j=r.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var O,S,V;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{code:`const Disabled = () => {
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
`,...(V=(S=l.parameters)==null?void 0:S.docs)==null?void 0:V.source}}};var w,$,E;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{code:`const Required = () => {
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
`,...(E=($=t.parameters)==null?void 0:$.docs)==null?void 0:E.source}}};var R,_,D;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{code:`const ReadOnly = () => {
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
`,...(D=(_=s.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var W,N,z;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{code:`const WithTooltip = () => {
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
`,...(z=(N=c.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var M,Q,A;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{code:`const WithoutLabel = () => {
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
`,...(A=(Q=d.parameters)==null?void 0:Q.docs)==null?void 0:A.source}}};var K,U,Y;i.parameters={...i.parameters,docs:{...(K=i.parameters)==null?void 0:K.docs,source:{code:`const Checklist = () => {
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
`,...(Y=(U=i.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var G,H,J;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:"{}",...(J=(H=o.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var P,X,Z;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(Z=(X=r.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,ne,ae;l.parameters={...l.parameters,docs:{...(ee=l.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(ae=(ne=l.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var oe,re,le;t.parameters={...t.parameters,docs:{...(oe=t.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(le=(re=t.parameters)==null?void 0:re.docs)==null?void 0:le.source}}};var te,se,ce;s.parameters={...s.parameters,docs:{...(te=s.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    value: true
  }
}`,...(ce=(se=s.parameters)==null?void 0:se.docs)==null?void 0:ce.source}}};var de,ie,ue;c.parameters={...c.parameters,docs:{...(de=c.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ue=(ie=c.parameters)==null?void 0:ie.docs)==null?void 0:ue.source}}};var be,he,pe;d.parameters={...d.parameters,docs:{...(be=d.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(pe=(he=d.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};var xe,me,ge;i.parameters={...i.parameters,docs:{...(xe=i.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(ge=(me=i.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};const $e=["Default","Indeterminate","Disabled","Required","ReadOnly","WithTooltip","WithoutLabel","Checklist"];export{i as Checklist,o as Default,l as Disabled,r as Indeterminate,s as ReadOnly,t as Required,c as WithTooltip,d as WithoutLabel,$e as __namedExportsOrder,we as default};
