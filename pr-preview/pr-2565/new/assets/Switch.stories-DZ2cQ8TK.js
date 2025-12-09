import{j as e,r as G}from"./iframe-B7TMU-c3.js";import{a as H}from"./fondue-icons369-BL79IKcj.js";import{L as u}from"./Label-Lb85_AHt.js";import{T as p}from"./Tooltip-Brt_palO.js";import{S as a}from"./Switch-0UjYY1Fq.js";import"./preload-helper-BTxPOYeW.js";import"./index-DY7PRMTJ.js";import"./styleUtilities-A7Ia-tuh.js";import"./index-_yteU4hC.js";import"./index-CHDv_-b2.js";import"./index-D6mnQMeZ.js";import"./index-BHrt-C2A.js";import"./index-CZJuBro4.js";import"./index-CbMTlZuH.js";import"./useTranslation-CuQ9k2j9.js";const ne={title:"Components/Switch",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[r=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(r,{})})]},s={args:{defaultValue:!0}},t={args:{defaultValue:!1}},o={args:{defaultValue:!1,disabled:!0}},l={args:{defaultValue:!1,required:!0}},i={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(u,{id:"label",htmlFor:"switch",children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},n={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(u,{id:"label",htmlFor:"switch",required:!0,children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label",required:!0})]})},c={render:r=>e.jsxs(e.Fragment,{children:[e.jsxs(u,{id:"label",htmlFor:"switch",children:["Switch",e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(H,{size:"16"})}),e.jsx(p.Content,{children:"Tooltip"})]})]}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},d={render:r=>{const[N,O]=G.useState(!1),Q=B=>{O(B)};return e.jsx(a,{value:N,onChange:Q,...r})}},m={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{...r,size:"small"}),e.jsx(a,{...r,size:"medium"}),e.jsx(a,{...r,size:"large"})]})};var h,g,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(b=(g=s.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var w,S,x;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(x=(S=t.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var f,j,T;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(T=(j=o.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};var C,L,k;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(k=(L=l.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var y,z,q;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch">
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(q=(z=i.parameters)==null?void 0:z.docs)==null?void 0:q.source}}};var F,R,V;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch" required>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" required />
        </>
}`,...(V=(R=n.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var W,E,v;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(M=(I=m.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};const ce=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelRequired","WithLabelAndTooltip","ExternallyControlled","Size"];export{s as Checked,o as Disabled,d as ExternallyControlled,l as Required,m as Size,t as Unchecked,i as WithLabel,c as WithLabelAndTooltip,n as WithLabelRequired,ce as __namedExportsOrder,ne as default};
