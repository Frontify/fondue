import{r as b,j as a}from"./iframe-_YkFcI3W.js";import{L as J}from"./Label-DR8ZCn81.js";import{T as K}from"./TextInput-CfCaHVQW.js";import{S as f}from"./Slider-CFqS9WFl.js";import"./preload-helper-DavUUsB2.js";import"./index-DMsgvdWI.js";import"./styleUtilities-A7Ia-tuh.js";import"./fondue-icons366-4pScxy_k.js";import"./LoadingCircle-C3qD6Z4a.js";import"./index-BdQq_4o_.js";import"./index-x1vjQ7fQ.js";import"./index-DIqOx88l.js";import"./index-LkNYj0Gj.js";import"./index-CLfYOqAp.js";import"./index-D0XxMa5L.js";import"./index-DPt4QJqP.js";const ce={title:"Components/Slider",component:f,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider, used for uncontrolled components.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},value:{control:"object",description:"The controlled value of the slider.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},min:{control:"number",description:"Minimum value of the slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:"number",description:"Maximum value of the slider.",defaultValue:100,table:{type:{summary:"number"},defaultValue:{summary:"100"}}},step:{control:"number",description:"The granularity with which the slider can step through values.",defaultValue:1,table:{type:{summary:"number"},defaultValue:{summary:"1"}}},minStepsBetweenThumbs:{control:"number",description:"The minimum steps between thumbs in a range slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},disabled:{control:"boolean",description:"Disable the slider.",defaultValue:!1,table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"onChange",description:"Function called when the value changes.",table:{type:{summary:"(value: number[]) => void"}}},onCommit:{action:"onCommit",description:"Function called when the value change is committed.",table:{type:{summary:"(value: number[]) => void"}}}},args:{min:0,max:100}},o={args:{name:"Simple slider"}},u={args:{disabled:!0,defaultValue:[50]}},i={args:{min:50,max:1e3}},m={args:{minStepsBetweenThumbs:25}},d={args:{step:25}},c={args:{defaultValue:[33,67]}},p={render:n=>{const[t,l]=b.useState([50]),e=b.useRef(!1);return a.jsx(f,{onChange:r=>{r[0]&&(r[0]>80&&!e.current&&(e.current=!0,alert("You're going a bit high there")),l(r))},value:t,...n})}},g={render:n=>{const[t,l]=b.useState([33,67]);return a.jsx(f,{onChange:e=>{if(!(!e[0]||!e[1])){if(e[1]-e[0]>80){alert("The range is too large");return}l(e)}},value:t,...n})}},h={decorators:n=>a.jsx("div",{style:{display:"flex",gap:16},children:a.jsx(n,{})}),render:()=>{const[n,t]=b.useState([250,450]),l=r=>{t(r)},e=r=>s=>{const y=parseInt(s.target.value,10);y>=200&&y<=500&&t(q=>{const S=[...q];return S[r]=y,S})};return a.jsxs(a.Fragment,{children:[a.jsx(J,{id:"new-slider-label",htmlFor:"new-slider",children:"Price range"}),a.jsx(f,{id:"new-slider","aria-labelledby":"new-slider-label",value:n,min:200,max:500,onChange:l}),n.map((r,s)=>a.jsx(K,{id:`new-slider-input-${s}`,value:r,type:"number","aria-label":`Price range ${s===0?"from":"to"}`,onChange:e(s)},s))]})}};var v,x,w;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    name: 'Simple slider'
  }
}`,...(w=(x=o.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var R,C,V;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: [50]
  }
}`,...(V=(C=u.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var T,I,M;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    min: 50,
    max: 1000
  }
}`,...(M=(I=i.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var j,E,W;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    minStepsBetweenThumbs: 25
  }
}`,...(W=(E=m.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var F,L,P;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    step: 25
  }
}`,...(P=(L=d.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var $,B,D;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(D=(B=c.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var z,A,G;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => {
    const [sliderRange, setSliderRange] = useState([50]);
    const userIsWarned = useRef(false);
    return <Slider onChange={value => {
      if (!value[0]) {
        return;
      }
      if (value[0] > 80 && !userIsWarned.current) {
        userIsWarned.current = true;
        alert("You're going a bit high there");
      }
      setSliderRange(value);
    }} value={sliderRange} {...args} />;
  }
}`,...(G=(A=p.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var U,Y,_;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => {
    const [sliderRange, setSliderRange] = useState([33, 67]);
    return <Slider onChange={value => {
      if (!value[0] || !value[1]) {
        return;
      }
      if (value[1] - value[0] > 80) {
        alert('The range is too large');
        return;
      }
      setSliderRange(value);
    }} value={sliderRange} {...args} />;
  }
}`,...(_=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};var k,H,O;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  decorators: Story => {
    return <div style={{
      display: 'flex',
      gap: 16
    }}>
                <Story />
            </div>;
  },
  render: () => {
    const [range, setRange] = useState([250, 450]);
    const onRangeChange = (value: number[]) => {
      setRange(value);
    };
    const onInputChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (newValue >= 200 && newValue <= 500) {
        setRange(prev => {
          const newRange = [...prev];
          newRange[index] = newValue;
          return newRange;
        });
      }
    };
    return <>
                <Label id="new-slider-label" htmlFor="new-slider">
                    Price range
                </Label>

                <Slider id="new-slider" aria-labelledby="new-slider-label" value={range} min={200} max={500} onChange={onRangeChange} />

                {range.map((value, index) => <TextInput key={index} id={\`new-slider-input-\${index}\`} value={value} type="number" aria-label={\`Price range \${index === 0 ? 'from' : 'to'}\`} onChange={onInputChange(index)} />)}
            </>;
  }
}`,...(O=(H=h.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};const pe=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled","WithInputs"];export{u as Disabled,p as ExternallyControlled,i as MinimumAndMaximum,m as MinimumGap,g as MultipleThumbsExternallyControlled,c as MultipleThumbsUncontrolled,o as SimpleSlider,d as StepSize,h as WithInputs,pe as __namedExportsOrder,ce as default};
