import{j as e,r as N}from"./iframe-gW3wVz0z.js";import{a as O}from"./fondue-icons366-yQVp0btd.js";import{L as D}from"./Label-CbGJ1tby.js";import{T as m}from"./Tooltip-BsN5O68L.js";import{S as a}from"./Switch-C5XKxpfR.js";import"./preload-helper-n5gCVCPL.js";import"./index-BzElHgiz.js";import"./styleUtilities-Byf6Fdv2.js";import"./index-L52XnHF3.js";import"./index-Bod5pvFG.js";import"./index-CqPsuFUz.js";import"./index-1ud4PYa_.js";import"./index-FRbEN6Nb.js";import"./index-B3snPEiW.js";import"./useTranslation-Bik2iqBA.js";const te={component:a,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[r=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(r,{})})]},s={args:{defaultValue:!0}},t={args:{defaultValue:!1}},o={args:{defaultValue:!1,disabled:!0}},n={args:{defaultValue:!1,required:!0}},l={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(D,{id:"label",htmlFor:"switch",children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},i={render:r=>e.jsxs(e.Fragment,{children:[e.jsxs(D,{id:"label",htmlFor:"switch",children:["Switch",e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(O,{size:"16"})}),e.jsx(m.Content,{children:"Tooltip"})]})]}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},c={render:r=>{const[U,_]=N.useState(!1),I=M=>{_(M)};return e.jsx(a,{value:U,onChange:I,...r})}},d={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{...r,size:"small"}),e.jsx(a,{...r,size:"medium"}),e.jsx(a,{...r,size:"large"})]})};var p,u,h;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(C=(T=n.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var k,z,L;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch">
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(L=(z=l.parameters)==null?void 0:z.docs)==null?void 0:L.source}}};var y,V,F;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(F=(V=i.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var R,E,q;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(A=(v=d.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const oe=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelAndTooltip","ExternallyControlled","Size"];export{s as Checked,o as Disabled,c as ExternallyControlled,n as Required,d as Size,t as Unchecked,l as WithLabel,i as WithLabelAndTooltip,oe as __namedExportsOrder,te as default};
