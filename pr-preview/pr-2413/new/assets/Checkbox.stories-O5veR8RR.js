import{r as b,j as e,F as t}from"./iframe-DzpicDUz.js";import{a as G}from"./fondue-icons369-CitFqgcn.js";import{L as u}from"./Label-BoX4VcUP.js";import{T as I}from"./Tooltip-D3KovetT.js";import{C as H,a as s}from"./Checkbox-Chzvw42c.js";import"./preload-helper-ilPEkxuf.js";import"./index-CvSW8ywS.js";import"./styleUtilities-Byf6Fdv2.js";import"./index-D8ezHNS0.js";import"./index-DsWJfrev.js";import"./index-Cj3X8Kow.js";import"./index-DbMdz1FL.js";import"./index-DC-KiUpL.js";import"./index-DhYsRzyu.js";import"./focusStyle-IgMhxCMT.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,ue={title:"Components/Checkbox",component:H,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:l("onChange"),onBlur:l("onBlur"),onFocus:l("onFocus")},render:a=>{const[c,i]=b.useState(a.value),o=b.useId(),n=`checkbox-${o}`,r=`label-${o}`,F=j=>{l("onChange")(j),i(d=>d==="indeterminate"?!0:!d)};return e.jsxs(t,{gap:2,align:"center",children:[e.jsx(s,{...a,id:n,"aria-labelledby":r,value:c,onChange:F}),e.jsx(u,{id:r,htmlFor:n,required:a.required,children:"Checkbox"})]})}},h={},m={args:{value:"indeterminate"}},p={args:{disabled:!0}},x={args:{required:!0}},g={args:{readOnly:!0,value:!0}},C={render:a=>{const[c,i]=b.useState(a.value),o=b.useId(),n=`checkbox-${o}`,r=`label-${o}`,F=j=>{l("onChange")(j),i(d=>d==="indeterminate"?!0:!d)};return e.jsxs(t,{gap:2,children:[e.jsx(s,{...a,id:n,"aria-labelledby":r,value:c,onChange:F}),e.jsxs(u,{id:r,htmlFor:n,required:a.required,children:["Checkbox",e.jsxs(I.Root,{children:[e.jsx(I.Trigger,{children:e.jsx(G,{size:"16"})}),e.jsx(I.Content,{children:"I am a tooltip!"})]})]})]})}},k={render:a=>{const[c,i]=b.useState(a.value),o=n=>{l("onChange")(n),i(r=>r==="indeterminate"?!0:!r)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(s,{...a,id:"checkbox","aria-labelledby":"label",value:c,onChange:o})})}},v={render:a=>e.jsxs(t,{gap:"1rem",direction:"column",children:[e.jsxs(t,{gap:"4px",direction:"row",children:[e.jsx(s,{...a,id:"checkbox-1","aria-labelledby":"label-1",value:!0,onChange:()=>{}}),e.jsx(u,{id:"label-1",htmlFor:"checkbox-1",children:"Checkbox 1"})]}),e.jsxs(t,{gap:"4px",direction:"row",children:[e.jsx(s,{...a,id:"checkbox-2","aria-labelledby":"label-2",value:!1,onChange:()=>{}}),e.jsx(u,{id:"label-2",htmlFor:"checkbox-2",children:"Checkbox 2"})]}),e.jsxs(t,{gap:"4px",direction:"row",children:[e.jsx(s,{...a,id:"checkbox-3","aria-labelledby":"label-3",value:"indeterminate",onChange:()=>{}}),e.jsx(u,{id:"label-3",htmlFor:"checkbox-3",children:"Checkbox 3"})]})]})};var T,f,y;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:"{}",...(y=(f=h.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var S,L,w;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(w=(L=m.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var q,O,R;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(R=(O=p.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var _,V,E;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(E=(V=x.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var $,D,W;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    value: true
  }
}`,...(W=(D=g.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var B,N,z;C.parameters={...C.parameters,docs:{...(B=C.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(z=(N=C.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var M,A,K;k.parameters={...k.parameters,docs:{...(M=k.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(K=(A=k.parameters)==null?void 0:A.docs)==null?void 0:K.source}}};var Q,U,Y;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Y=(U=v.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};const be=["Default","Indeterminate","Disabled","Required","ReadOnly","WithTooltip","WithoutLabel","Checklist"];export{v as Checklist,h as Default,p as Disabled,m as Indeterminate,g as ReadOnly,x as Required,C as WithTooltip,k as WithoutLabel,be as __namedExportsOrder,ue as default};
