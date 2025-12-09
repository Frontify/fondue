import{j as e,r as G}from"./iframe-CMhlypOZ.js";import{a as H}from"./fondue-icons369-BTfT3vDq.js";import{L as p}from"./Label-C-oz6tC8.js";import{T as u}from"./Tooltip-B7fFOO3N.js";import{S as a}from"./Switch-9QN7-zfN.js";import"./preload-helper-BTxPOYeW.js";import"./index-DVHn8FlL.js";import"./styleUtilities-A7Ia-tuh.js";import"./index-aXCF4_mN.js";import"./index-C7bfCOLs.js";import"./index-cQZMNwmi.js";import"./index-DrHlHE-4.js";import"./index-BdlwieeU.js";import"./index-BFjMjUGq.js";import"./useTranslation-DZ75SMgi.js";const ne={title:"Components/Switch",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[r=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(r,{})})]},s={args:{defaultValue:!0}},t={args:{defaultValue:!1}},o={args:{defaultValue:!1,disabled:!0}},i={args:{defaultValue:!1,required:!0}},l={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(p,{id:"label",htmlFor:"switch",required:r.required,children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},n={args:{required:!0},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(p,{id:"label",htmlFor:"switch",required:r.required,children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},c={render:r=>e.jsxs(e.Fragment,{children:[e.jsxs(p,{id:"label",htmlFor:"switch",required:r.required,children:["Switch",e.jsxs(u.Root,{children:[e.jsx(u.Trigger,{children:e.jsx(H,{size:"16"})}),e.jsx(u.Content,{children:"Tooltip"})]})]}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},d={render:r=>{const[N,O]=G.useState(!1),Q=B=>{O(B)};return e.jsx(a,{value:N,onChange:Q,...r})}},m={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{...r,size:"small"}),e.jsx(a,{...r,size:"medium"}),e.jsx(a,{...r,size:"large"})]})};var h,g,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(b=(g=s.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var w,S,x;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(x=(S=t.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var f,j,q;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(q=(j=o.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var T,C,L;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(L=(C=i.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var k,y,z;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(z=(y=l.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var F,R,V;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(V=(R=n.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var W,E,v;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
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
}`,...(v=(E=c.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var A,D,U;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(U=(D=d.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var _,I,M;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
}`,...(M=(I=m.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};const ce=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelRequired","WithLabelAndTooltip","ExternallyControlled","Size"];export{s as Checked,o as Disabled,d as ExternallyControlled,i as Required,m as Size,t as Unchecked,l as WithLabel,c as WithLabelAndTooltip,n as WithLabelRequired,ce as __namedExportsOrder,ne as default};
