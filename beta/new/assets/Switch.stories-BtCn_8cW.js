import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as N}from"./index-ClcD9ViR.js";import{a as O}from"./fondue-icons351-BQd7JGbV.js";import{L as D}from"./Label-B9CXg2P0.js";import{T as m}from"./Tooltip-C2QhV86n.js";import{S as a}from"./Switch-DJ7sVYCq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-b08ZXYV2.js";import"./index-CBtKeiPJ.js";import"./index-BUMxx5F6.js";import"./styleUtilities-DuypqGtU.js";import"./index-EJIvojdF.js";import"./index-Dep3Wf5h.js";import"./index-DulyF36n.js";import"./index-CWz5EflU.js";import"./index-CIy7yXJr.js";import"./index-kkVLZR_L.js";import"./index-BZQsQlpo.js";import"./index-Bs6rH-UG.js";import"./ThemeProvider-DcTs8Rid.js";import"./index-D2b4USwH.js";import"./index-sY83p_TZ.js";const me={title:"Components/Switch",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[r=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(r,{})})]},s={args:{defaultValue:!0}},t={args:{defaultValue:!1}},o={args:{defaultValue:!1,disabled:!0}},n={args:{defaultValue:!1,required:!0}},i={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(D,{id:"label",htmlFor:"switch",children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},l={render:r=>e.jsxs(e.Fragment,{children:[e.jsxs(D,{id:"label",htmlFor:"switch",children:["Switch",e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(O,{size:"16"})}),e.jsx(m.Content,{children:"Tooltip"})]})]}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},c={render:r=>{const[U,_]=N.useState(!1),I=M=>{_(M)};return e.jsx(a,{value:U,onChange:I,...r})}},d={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{...r,size:"small"}),e.jsx(a,{...r,size:"medium"}),e.jsx(a,{...r,size:"large"})]})};var p,u,h;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,b,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(x=(b=t.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var S,f,w;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(w=(f=o.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var j,T,C;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(C=(T=n.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var k,z,L;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch">
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(L=(z=i.parameters)==null?void 0:z.docs)==null?void 0:L.source}}};var y,V,F;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch">
                Switch
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconQuestionMarkCircle size="16" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>Tooltip</Tooltip.Content>
                </Tooltip.Root>
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(F=(V=l.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var R,E,q;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(q=(E=c.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};var W,v,A;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
}`,...(A=(v=d.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const pe=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelAndTooltip","ExternallyControlled","Size"];export{s as Checked,o as Disabled,c as ExternallyControlled,n as Required,d as Size,t as Unchecked,i as WithLabel,l as WithLabelAndTooltip,pe as __namedExportsOrder,me as default};
