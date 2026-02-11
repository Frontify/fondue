import{r as I,j as e,F as l}from"./iframe-Daulk9LM.js";import{a as Le}from"./fondue-icons372-BWvkyUkX.js";import{L as F}from"./Label-bO2WHW6U.js";import{T as qe}from"./Text-CAFYivgo.js";import{T}from"./Tooltip-BJgyUe6S.js";import{C as we,a as v}from"./Checkbox-kj5t7p2r.js";import"./preload-helper-DI-8CSFo.js";import"./index-B4GD-_KR.js";import"./index-EadzxjHi.js";import"./index-CY6qDDte.js";import"./index-DWUuHPSY.js";import"./index-VztRfUS7.js";import"./index-TekpYfNh.js";const{action:k}=__STORYBOOK_MODULE_ACTIONS__,De={title:"Components/Checkbox",component:we,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A checkbox is an input for selecting from predefined options.","","On its own, it's a quick yes-or-no choice — but group a few together, and it becomes a flexible way for users to pick multiple options from a list.","","Behind every checkbox is a label and a box — and sometimes a bit more. At minimum, a checkbox must include the checkbox element itself. Additional elements, such as a label, required indicator, or tooltip icon, are optional and can be included to provide extra context or guidance. The interactive area encompasses the checkbox and its associated label, ensuring a larger and more accessible tap target.","","**Emphasis:** Use emphasis to draw attention to checkboxes in high-priority contexts. The default style is subtle and fits well in standard forms or lists. Use the highlight style when you need to visually differentiate a checkbox — for example in key user decisions.","","**Size:** Choose a checkbox size based on the surrounding UI and interaction context. The default size works well in most layouts. Use the large size in touch-friendly environments or where increased visual weight is needed.","","**Selection state:** Checkboxes support three visual states: selected, unselected, and indeterminate. Selected shows an option has been chosen. Unselected shows the option is not currently chosen. Indeterminate is used when a parent checkbox represents a partially selected group — it's a visual cue only and doesn't affect the checkbox's actual value. Use these states to reflect user input accurately and provide clarity in complex selection patterns.","","**Label:** Whenever possible, checkboxes should include a visible label that clearly describes the associated option. Labels improve usability, accessibility, and support larger tap targets. In certain UI patterns — such as selecting cards, images, or other visually rich content — checkboxes may be used without direct labels. In these cases, ensure the checkbox's meaning is still clear from surrounding context or supporting elements.","","**Tooltip:** Use a tooltip icon when additional context is needed to explain the checkbox label or its consequences. Keep tooltip content concise, relevant, and avoid relying on it for critical information.","","**Required:** Use a required indicator when a checkbox must be selected to complete a task or submit a form. The indicator should appear next to the label."].join(`
`)}}},args:{disabled:!1,required:!1,readOnly:!1,onChange:k("onChange"),onBlur:k("onBlur"),onFocus:k("onFocus")},render:n=>{const[x,m]=I.useState(n.value),a=I.useId(),t=`checkbox-${a}`,o=`label-${a}`,C=f=>{k("onChange")(f),m(g=>g==="indeterminate"?!0:!g)};return e.jsxs(l,{gap:2,align:"center",children:[e.jsx(v,{...n,id:t,"aria-labelledby":o,value:x,onChange:C}),e.jsx(F,{id:o,htmlFor:t,required:n.required,children:"Checkbox"})]})}},r={},s={args:{value:"indeterminate"}},c={args:{disabled:!0}},d={args:{required:!0}},i={args:{readOnly:!0,value:!0}},u={render:n=>{const[x,m]=I.useState(n.value),a=I.useId(),t=`checkbox-${a}`,o=`label-${a}`,C=f=>{k("onChange")(f),m(g=>g==="indeterminate"?!0:!g)};return e.jsxs(l,{gap:2,children:[e.jsx(v,{...n,id:t,"aria-labelledby":o,value:x,onChange:C}),e.jsxs(F,{id:o,htmlFor:t,required:n.required,children:["Checkbox",e.jsxs(T.Root,{children:[e.jsx(T.Trigger,{children:e.jsx(Le,{size:"16"})}),e.jsx(T.Content,{children:"I am a tooltip!"})]})]})]})}},h={render:n=>{const[x,m]=I.useState(n.value),a=t=>{k("onChange")(t),m(o=>o==="indeterminate"?!0:!o)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(v,{...n,id:"checkbox","aria-labelledby":"label",value:x,onChange:a})})}},b={render:n=>e.jsxs(l,{gap:"1rem",direction:"column",children:[e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(v,{...n,id:"checkbox-1","aria-labelledby":"label-1",value:!0,onChange:()=>{}}),e.jsx(F,{id:"label-1",htmlFor:"checkbox-1",children:"Checkbox 1"})]}),e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(v,{...n,id:"checkbox-2","aria-labelledby":"label-2",value:!1,onChange:()=>{}}),e.jsx(F,{id:"label-2",htmlFor:"checkbox-2",children:"Checkbox 2"})]}),e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(v,{...n,id:"checkbox-3","aria-labelledby":"label-3",value:"indeterminate",onChange:()=>{}}),e.jsx(F,{id:"label-3",htmlFor:"checkbox-3",children:"Checkbox 3"})]})]})},p={render:n=>{const[x,m]=I.useState(n.value),a=I.useId(),t=`checkbox-${a}`,o=`label-${a}`,C=`helptext-${a}`,f=g=>{k("onChange")(g),m(y=>y==="indeterminate"?!0:!y)};return e.jsxs(l,{direction:"column",gap:2,children:[e.jsxs(l,{gap:2,align:"center",children:[e.jsx(v,{...n,id:t,"aria-labelledby":o,"aria-describedby":C,value:x,onChange:f,status:"error"}),e.jsx(F,{id:o,htmlFor:t,children:"I agree to the terms and conditions."})]}),e.jsx(qe,{id:C,size:"small",color:"negative",children:"Please check this box to continue."})]})}};var L,q,w;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{code:`const Default = () => {
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
`,...(w=(q=r.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var j,S,$;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{code:`const Indeterminate = () => {
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
`,...($=(S=s.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};var B,V,O;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{code:`const Disabled = () => {
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
`,...(O=(V=c.parameters)==null?void 0:V.docs)==null?void 0:O.source}}};var E,R,z;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{code:`const Required = () => {
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
`,...(z=(R=d.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var U,W,_;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{code:`const ReadOnly = () => {
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
`,...(_=(W=i.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var A,D,N;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{code:`const WithTooltip = () => {
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
`,...(N=(D=u.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var H,M,P;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{code:`const WithoutLabel = () => {
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
`,...(P=(M=h.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var K,Q,Y;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{code:`const Checklist = () => {
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
`,...(Y=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var G,J,X;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{code:`const WithErrorAndHelpText = () => {
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
`,...(X=(J=p.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,ee,ne;r.parameters={...r.parameters,docs:{...(Z=r.parameters)==null?void 0:Z.docs,source:{originalSource:"{}",...(ne=(ee=r.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var ae,oe,te;s.parameters={...s.parameters,docs:{...(ae=s.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(te=(oe=s.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var le,re,se;c.parameters={...c.parameters,docs:{...(le=c.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(se=(re=c.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ce,de,ie;d.parameters={...d.parameters,docs:{...(ce=d.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(ie=(de=d.parameters)==null?void 0:de.docs)==null?void 0:ie.source}}};var ue,he,be;i.parameters={...i.parameters,docs:{...(ue=i.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    value: true
  }
}`,...(be=(he=i.parameters)==null?void 0:he.docs)==null?void 0:be.source}}};var pe,xe,me;u.parameters={...u.parameters,docs:{...(pe=u.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(me=(xe=u.parameters)==null?void 0:xe.docs)==null?void 0:me.source}}};var ge,ke,ve;h.parameters={...h.parameters,docs:{...(ge=h.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(ve=(ke=h.parameters)==null?void 0:ke.docs)==null?void 0:ve.source}}};var Ie,Ce,Fe;b.parameters={...b.parameters,docs:{...(Ie=b.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(Fe=(Ce=b.parameters)==null?void 0:Ce.docs)==null?void 0:Fe.source}}};var fe,Te,ye;p.parameters={...p.parameters,docs:{...(fe=p.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(ye=(Te=p.parameters)==null?void 0:Te.docs)==null?void 0:ye.source}}};const Ne=["Default","Indeterminate","Disabled","Required","ReadOnly","WithTooltip","WithoutLabel","Checklist","WithErrorAndHelpText"];export{b as Checklist,r as Default,c as Disabled,s as Indeterminate,i as ReadOnly,d as Required,p as WithErrorAndHelpText,u as WithTooltip,h as WithoutLabel,Ne as __namedExportsOrder,De as default};
