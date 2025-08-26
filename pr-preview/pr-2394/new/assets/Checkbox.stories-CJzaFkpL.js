import{j as e}from"./jsx-runtime-BYYWji4R.js";import{a as o}from"./index-B-lxVbXh.js";import{r as g}from"./index-ClcD9ViR.js";import{F as s}from"./Flex-CjzBXb8-.js";import{L as p}from"./Label-B9CXg2P0.js";import{C as _,a as t}from"./Checkbox-ClsU0ets.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-b08ZXYV2.js";import"./index-CBtKeiPJ.js";import"./index-BUMxx5F6.js";import"./styleUtilities-DuypqGtU.js";import"./index-EJIvojdF.js";import"./fondue-icons351-C23tm6Bo.js";import"./index-njbIkLCy.js";import"./index-CWz5EflU.js";import"./index-DulyF36n.js";import"./index-BZQsQlpo.js";import"./index-sY83p_TZ.js";import"./index-Bs6rH-UG.js";import"./focusStyle-IgMhxCMT.js";const ce={title:"Components/Checkbox",component:_,tags:["autodocs"],parameters:{status:{type:"released"}},args:{disabled:!1,required:!1,readOnly:!1,onChange:o("onChange"),onBlur:o("onBlur"),onFocus:o("onFocus")},render:r=>{const[h,x]=g.useState(r.value),n=g.useId(),l=`checkbox-${n}`,a=`label-${n}`,O=W=>{o("onChange")(W),x(C=>C==="indeterminate"?!0:!C)};return e.jsxs("div",{className:"tw-flex tw-gap-2 tw-items-center",children:[e.jsx(t,{...r,id:l,"aria-labelledby":a,value:h,onChange:O}),e.jsx(p,{id:a,htmlFor:l,required:r.required,children:"Checkbox"})]})}},c={},i={args:{value:"indeterminate"}},d={args:{disabled:!0}},m={args:{required:!0}},u={render:r=>{const[h,x]=g.useState(r.value),n=l=>{o("onChange")(l),x(a=>a==="indeterminate"?!0:!a)};return e.jsx("div",{className:"tw-flex tw-gap-2 tw-items-center",children:e.jsx(t,{...r,id:"checkbox","aria-labelledby":"label",value:h,onChange:n})})}},b={render:r=>e.jsxs(s,{gap:"1rem",direction:"column",children:[e.jsxs(s,{gap:"4px",direction:"row",children:[e.jsx(t,{...r,id:"checkbox-1","aria-labelledby":"label-1",value:!0,onChange:()=>{}}),e.jsx(p,{id:"label-1",htmlFor:"checkbox-1",children:"Checkbox 1"})]}),e.jsxs(s,{gap:"4px",direction:"row",children:[e.jsx(t,{...r,id:"checkbox-2","aria-labelledby":"label-2",value:!1,onChange:()=>{}}),e.jsx(p,{id:"label-2",htmlFor:"checkbox-2",children:"Checkbox 2"})]}),e.jsxs(s,{gap:"4px",direction:"row",children:[e.jsx(t,{...r,id:"checkbox-3","aria-labelledby":"label-3",value:"indeterminate",onChange:()=>{}}),e.jsx(p,{id:"label-3",htmlFor:"checkbox-3",children:"Checkbox 3"})]})]})};var k,v,f;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:"{}",...(f=(v=c.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var F,j,w;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    value: 'indeterminate'
  }
}`,...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var y,L,S;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(S=(L=d.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var q,I,D;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(D=(I=m.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var E,T,V;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(V=(T=u.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var N,R,B;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(B=(R=b.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};const ie=["Default","Indeterminate","Disabled","Required","WithoutLabel","Checklist"];export{b as Checklist,c as Default,d as Disabled,i as Indeterminate,m as Required,u as WithoutLabel,ie as __namedExportsOrder,ce as default};
