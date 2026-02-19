import{r as b,j as r}from"./iframe-BFXen_90.js";import{L as ye}from"./Label-BlKKA5da.js";import{T as Re}from"./TextInput-CsBD-hF2.js";import{S as v}from"./Slider-qy9hWEFr.js";import"./preload-helper-zta_rV5C.js";import"./index-CwYAFCvv.js";import"./fondue-icons372-T7pat355.js";import"./LoadingCircle-CWqmmOP3.js";import"./index-BdQq_4o_.js";import"./index-Svl1cd0K.js";import"./index-qQ-IYaEI.js";import"./index-szdZ9lkd.js";import"./index-CqyUdOCB.js";import"./index-DUy1Y3_N.js";const Be={title:"Components/Slider",component:v,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A draggable range input for selecting a numeric value or range within a defined minimum and maximum. Supports single and multi-thumb configurations.","","**When to use:** For continuous numeric values where the exact number matters less than the relative position — volume, opacity, price ranges."].join(`
`)}}},argTypes:{defaultValue:{control:"object",description:"The default value of the slider, used for uncontrolled components.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},value:{control:"object",description:"The controlled value of the slider.",defaultValue:[0],table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},min:{control:"number",description:"Minimum value of the slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:"number",description:"Maximum value of the slider.",defaultValue:100,table:{type:{summary:"number"},defaultValue:{summary:"100"}}},step:{control:"number",description:"The granularity with which the slider can step through values.",defaultValue:1,table:{type:{summary:"number"},defaultValue:{summary:"1"}}},minStepsBetweenThumbs:{control:"number",description:"The minimum steps between thumbs in a range slider.",defaultValue:0,table:{type:{summary:"number"},defaultValue:{summary:"0"}}},disabled:{control:"boolean",description:"Disable the slider.",defaultValue:!1,table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onChange:{action:"onChange",description:"Function called when the value changes.",table:{type:{summary:"(value: number[]) => void"}}},onCommit:{action:"onCommit",description:"Function called when the value change is committed.",table:{type:{summary:"(value: number[]) => void"}}}},args:{min:0,max:100}},t={args:{name:"Simple slider"}},s={args:{disabled:!0,defaultValue:[50]}},o={args:{min:50,max:1e3}},l={args:{minStepsBetweenThumbs:25}},u={args:{step:25}},i={args:{defaultValue:[33,67]}},m={render:a=>{const[p,h]=b.useState([50]),e=b.useRef(!1);return r.jsx(v,{onChange:n=>{n[0]&&(n[0]>80&&!e.current&&(e.current=!0,alert("You're going a bit high there")),h(n))},value:p,...a})}},d={render:a=>{const[p,h]=b.useState([33,67]);return r.jsx(v,{onChange:e=>{if(!(!e[0]||!e[1])){if(e[1]-e[0]>80){alert("The range is too large");return}h(e)}},value:p,...a})}},c={decorators:a=>r.jsx("div",{style:{display:"flex",gap:16},children:r.jsx(a,{})}),render:()=>{const[a,p]=b.useState([250,450]),h=n=>{p(n)},e=n=>g=>{const S=parseInt(g.target.value,10);S>=200&&S<=500&&p(xe=>{const f=[...xe];return f[n]=S,f})};return r.jsxs(r.Fragment,{children:[r.jsx(ye,{id:"new-slider-label",htmlFor:"new-slider",children:"Price range"}),r.jsx(v,{id:"new-slider","aria-labelledby":"new-slider-label",value:a,min:200,max:500,onChange:h}),a.map((n,g)=>r.jsx(Re,{id:`new-slider-input-${g}`,value:n,type:"number","aria-label":`Price range ${g===0?"from":"to"}`,onChange:e(g)},g))]})}};var x,y,R;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{code:`const SimpleSlider = () => <Slider min={0} max={100} name="Simple slider" />;
`,...(R=(y=t.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};var w,C,V;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{code:`const Disabled = () => (
  <Slider min={0} max={100} disabled defaultValue={[50]} />
);
`,...(V=(C=s.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var T,I,M;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{code:`const MinimumAndMaximum = () => <Slider min={50} max={1000} />;
`,...(M=(I=o.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var j,E,W;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{code:`const MinimumGap = () => (
  <Slider min={0} max={100} minStepsBetweenThumbs={25} />
);
`,...(W=(E=l.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var L,F,P;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{code:`const StepSize = () => <Slider min={0} max={100} step={25} />;
`,...(P=(F=u.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var $,A,B;i.parameters={...i.parameters,docs:{...($=i.parameters)==null?void 0:$.docs,source:{code:`const MultipleThumbsUncontrolled = () => (
  <Slider min={0} max={100} defaultValue={[33, 67]} />
);
`,...(B=(A=i.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var D,z,G;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{code:`const ExternallyControlled = () => {
  const [sliderRange, setSliderRange] = useState([50]);
  const userIsWarned = useRef(false);

  return (
    <Slider
      onChange={(value) => {
        if (!value[0]) {
          return;
        }
        if (value[0] > 80 && !userIsWarned.current) {
          userIsWarned.current = true;
          alert("You're going a bit high there");
        }
        setSliderRange(value);
      }}
      value={sliderRange}
      min={0}
      max={100}
    />
  );
};
`,...(G=(z=m.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var U,Y,k;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{code:`const MultipleThumbsExternallyControlled = () => {
  const [sliderRange, setSliderRange] = useState([33, 67]);

  return (
    <Slider
      onChange={(value) => {
        if (!value[0] || !value[1]) {
          return;
        }
        if (value[1] - value[0] > 80) {
          alert("The range is too large");
          return;
        }
        setSliderRange(value);
      }}
      value={sliderRange}
      min={0}
      max={100}
    />
  );
};
`,...(k=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:k.source}}};var H,_,O;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{code:`const WithInputs = () => {
  const [range, setRange] = useState([250, 450]);

  const onRangeChange = (value: number[]) => {
    setRange(value);
  };

  const onInputChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (newValue >= 200 && newValue <= 500) {
        setRange((prev) => {
          const newRange = [...prev];
          newRange[index] = newValue;
          return newRange;
        });
      }
    };

  return (
    <>
      <Label id="new-slider-label" htmlFor="new-slider">
        Price range
      </Label>

      <Slider
        id="new-slider"
        aria-labelledby="new-slider-label"
        value={range}
        min={200}
        max={500}
        onChange={onRangeChange}
      />

      {range.map((value, index) => (
        <TextInput
          key={index}
          id={\`new-slider-input-\${index}\`}
          value={value}
          type="number"
          aria-label={\`Price range \${index === 0 ? "from" : "to"}\`}
          onChange={onInputChange(index)}
        />
      ))}
    </>
  );
};
`,...(O=(_=c.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var q,J,K;t.parameters={...t.parameters,docs:{...(q=t.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    name: 'Simple slider'
  }
}`,...(K=(J=t.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var N,Q,X;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: [50]
  }
}`,...(X=(Q=s.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,ne;o.parameters={...o.parameters,docs:{...(Z=o.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    min: 50,
    max: 1000
  }
}`,...(ne=(ee=o.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,ae,te;l.parameters={...l.parameters,docs:{...(re=l.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    minStepsBetweenThumbs: 25
  }
}`,...(te=(ae=l.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var se,oe,le;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    step: 25
  }
}`,...(le=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ue,ie,me;i.parameters={...i.parameters,docs:{...(ue=i.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    defaultValue: [33, 67]
  }
}`,...(me=(ie=i.parameters)==null?void 0:ie.docs)==null?void 0:me.source}}};var de,ce,pe;m.parameters={...m.parameters,docs:{...(de=m.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(pe=(ce=m.parameters)==null?void 0:ce.docs)==null?void 0:pe.source}}};var ge,he,be;d.parameters={...d.parameters,docs:{...(ge=d.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(be=(he=d.parameters)==null?void 0:he.docs)==null?void 0:be.source}}};var ve,Se,fe;c.parameters={...c.parameters,docs:{...(ve=c.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(fe=(Se=c.parameters)==null?void 0:Se.docs)==null?void 0:fe.source}}};const De=["SimpleSlider","Disabled","MinimumAndMaximum","MinimumGap","StepSize","MultipleThumbsUncontrolled","ExternallyControlled","MultipleThumbsExternallyControlled","WithInputs"];export{s as Disabled,m as ExternallyControlled,o as MinimumAndMaximum,l as MinimumGap,d as MultipleThumbsExternallyControlled,i as MultipleThumbsUncontrolled,t as SimpleSlider,u as StepSize,c as WithInputs,De as __namedExportsOrder,Be as default};
