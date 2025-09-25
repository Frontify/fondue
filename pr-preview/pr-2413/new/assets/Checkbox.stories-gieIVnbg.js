import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as m}from"./index-ClcD9ViR.js";import{a as K}from"./fondue-icons352-Bz1-Z4MJ.js";import{a as t}from"./index-B-lxVbXh.js";import{F as l}from"./Flex-BQUHScux.js";import{L as u}from"./Label-1bHheCUK.js";import{T as f}from"./Tooltip-DtFtg8Ev.js";import{C as P,a as s}from"./Checkbox-BWDvTjgW.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-CMmqAaFT.js";import"./index-BUMxx5F6.js";import"./index-Q_VQqEV0.js";import"./styleUtilities-Byf6Fdv2.js";import"./index-DulyF36n.js";import"./index-CWz5EflU.js";import"./index-JHbJ-wYR.js";import"./index-BezEZHzC.js";import"./index-BZQsQlpo.js";import"./ThemeProvider-Dbar5Ost.js";import"./index-sY83p_TZ.js";import"./focusStyle-IgMhxCMT.js";const ke={title:"Components/Checkbox",component:P,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:t("onChange"),onBlur:t("onBlur"),onFocus:t("onFocus")},render:r=>{const[c,i]=m.useState(r.value),o=m.useId(),n=`checkbox-${o}`,a=`label-${o}`,F=j=>{t("onChange")(j),i(d=>d==="indeterminate"?!0:!d)};return e.jsxs(l,{gap:2,align:"center",children:[e.jsx(s,{...r,id:n,"aria-labelledby":a,value:c,onChange:F}),e.jsx(u,{id:a,htmlFor:n,required:r.required,children:"Checkbox"})]})}},b={},h={args:{value:"indeterminate"}},p={args:{disabled:!0}},x={args:{required:!0}},g={args:{readOnly:!0,value:!0}},C={render:r=>{const[c,i]=m.useState(r.value),o=m.useId(),n=`checkbox-${o}`,a=`label-${o}`,F=j=>{t("onChange")(j),i(d=>d==="indeterminate"?!0:!d)};return e.jsxs(l,{gap:2,children:[e.jsx(s,{...r,id:n,"aria-labelledby":a,value:c,onChange:F}),e.jsxs(u,{id:a,htmlFor:n,required:r.required,children:["Checkbox",e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(K,{size:"16"})}),e.jsx(f.Content,{children:"I am a tooltip!"})]})]})]})}},k={render:r=>{const[c,i]=m.useState(r.value),o=n=>{t("onChange")(n),i(a=>a==="indeterminate"?!0:!a)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(s,{...r,id:"checkbox","aria-labelledby":"label",value:c,onChange:o})})}},v={render:r=>e.jsxs(l,{gap:"1rem",direction:"column",children:[e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(s,{...r,id:"checkbox-1","aria-labelledby":"label-1",value:!0,onChange:()=>{}}),e.jsx(u,{id:"label-1",htmlFor:"checkbox-1",children:"Checkbox 1"})]}),e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(s,{...r,id:"checkbox-2","aria-labelledby":"label-2",value:!1,onChange:()=>{}}),e.jsx(u,{id:"label-2",htmlFor:"checkbox-2",children:"Checkbox 2"})]}),e.jsxs(l,{gap:"4px",direction:"row",children:[e.jsx(s,{...r,id:"checkbox-3","aria-labelledby":"label-3",value:"indeterminate",onChange:()=>{}}),e.jsx(u,{id:"label-3",htmlFor:"checkbox-3",children:"Checkbox 3"})]})]})};var I,T,y;b.parameters={...b.parameters,docs:{...(I=b.parameters)==null?void 0:I.docs,source:{originalSource:"{}",...(y=(T=b.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var S,w,L;h.parameters={...h.parameters,docs:{...(S=h.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(L=(w=h.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};var q,R,V;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(V=(R=p.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var O,$,E;x.parameters={...x.parameters,docs:{...(O=x.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(E=($=x.parameters)==null?void 0:$.docs)==null?void 0:E.source}}};var D,W,z;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    value: true
  }
}`,...(z=(W=g.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var B,N,_;C.parameters={...C.parameters,docs:{...(B=C.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(_=(N=C.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var M,Q,A;k.parameters={...k.parameters,docs:{...(M=k.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(A=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:A.source}}};var G,H,J;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(J=(H=v.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};const ve=["Default","Indeterminate","Disabled","Required","ReadOnly","WithTooltip","WithoutLabel","Checklist"];export{v as Checklist,b as Default,p as Disabled,h as Indeterminate,g as ReadOnly,x as Required,C as WithTooltip,k as WithoutLabel,ve as __namedExportsOrder,ke as default};
