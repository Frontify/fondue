import{j as r}from"./jsx-runtime-DBEcOq3S.js";import{r as i}from"./index-DtJulBIN.js";import{C as H}from"./index-GpQCGCAv.js";import{S as B}from"./index-Dhc4yksV.js";import{e as C}from"./Select-C6pA7Y6O.js";import{T as s}from"./TextInput-B88fJ1NK.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-BqTDQIm7.js";import"./fondue-icons311-Cyz8yLVl.js";import"./index-fOb33GKb.js";import"./index-DYI_kRwo.js";import"./index-P-l_ls5c.js";import"./index-24aZOQX_.js";import"./Combination-DuhGN8JR.js";import"./index-DBH0Kh6a.js";import"./index-BYh9UA9V.js";import"./index-CMjj8zSi.js";import"./index-RzzeDlDa.js";import"./index-D3ylJrlI.js";import"./styleUtilities-T76WvCte.js";const D="_root_1ljju_4",A="_inputs_1ljju_11",X="_colorHexInput_1ljju_23",O="_inputDecorator_1ljju_32",W="_gradientInput_1ljju_36",M="_reactColorful_1ljju_39",z="_valueInput_1ljju_43",t={root:D,inputs:A,colorHexInput:X,inputDecorator:O,gradientInput:W,reactColorful:M,valueInput:z},g=({currentColor:e={red:150,green:150,blue:150,alpha:1},onColorChange:n=()=>{}})=>r.jsx("div",{className:t.gradientInput,"data-test-id":"custom-color-value-inputs",children:r.jsx(H,{className:t.reactColorful,color:{r:e.red,g:e.green,b:e.blue,a:e.alpha===void 0?1:e.alpha},onChange:a=>n({red:a.r,green:a.g,blue:a.b,alpha:a.a})})});g.displayName="ColorPicker.Gradient";const G=i.forwardRef(g);g.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Gradient",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 150, green: 150, blue: 150, alpha: 1 }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};G.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorGradientInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 150, green: 150, blue: 150, alpha: 1 }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};const y=e=>{const n=/^([\dA-Fa-f]{3}){1,2}$/;return e.length>2&&n.test(e)},J=e=>{const n=/^([\dA-Fa-f]{3}){1,2}$/,a=e.match(n);if(!a)return{red:0,green:0,blue:0};const u=a[0];return u.length===3?{red:parseInt(`${u[0]}${u[0]}`,16),green:parseInt(`${u[1]}${u[1]}`,16),blue:parseInt(`${u[2]}${u[2]}`,16)}:{red:parseInt(u.slice(0,2),16),green:parseInt(u.slice(2,4),16),blue:parseInt(u.slice(4,6),16)}},k=e=>{const{red:n,green:a,blue:u}=e;return`${n.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}${u.toString(16).padStart(2,"0")}`},b=({currentColor:e={red:150,green:150,blue:150,alpha:1},onColorChange:n=()=>{},defaultFormat:a="HEX"})=>{const[u,F]=i.useState(a),[f,v]=i.useState(k(e));return i.useEffect(()=>{v(k(e))},[e]),r.jsxs("div",{className:t.inputs,"data-test-id":"custom-color-value-inputs",children:[r.jsx("div",{className:t.colorFormatInput,children:r.jsxs(C,{"aria-label":"Select an item",placeholder:"Select an item",onSelect:o=>{F(o)},value:u,children:[r.jsx(C.Item,{value:"HEX",children:"HEX"}),r.jsx(C.Item,{value:"RGBA",children:"RGBA"})]})}),u==="HEX"?r.jsx(s.Root,{className:`${t.valueInput} ${t.colorHexInput}`,type:"text",value:f,status:y(f)?"neutral":"error",onBlur:o=>{y(o.target.value)&&n(J(o.target.value))},onChange:o=>{v(o.target.value)},"aria-label":"Red Color Channel",children:r.jsx(s.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"#"})})}):r.jsxs(r.Fragment,{children:[r.jsx(s.Root,{className:`${t.valueInput} ${t.colorChannelInput}`,value:e.red,type:"number",onBlur:o=>{o.target.value.length===0&&n({...e,red:0})},onChange:o=>{console.log(parseInt(o.target.value)),n({...e,red:parseInt(o.target.value)})},"aria-label":"Red Color Channel",children:r.jsx(s.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"R"})})}),r.jsx(s.Root,{className:`${t.valueInput} ${t.colorChannelInput}`,value:e.green,type:"number",onBlur:o=>{o.target.value.length===0&&n({...e,green:0})},onChange:o=>{n({...e,green:parseInt(o.target.value)})},"aria-label":"Green Color Channel",children:r.jsx(s.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"G"})})}),r.jsx(s.Root,{className:`${t.valueInput} ${t.colorChannelInput}`,value:e.blue,type:"number",onBlur:o=>{o.target.value.length===0&&n({...e,blue:0})},onChange:o=>{n({...e,blue:parseInt(o.target.value)})},"aria-label":"Blue Color Channel",children:r.jsx(s.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"B"})})})]}),r.jsxs(s.Root,{className:`${t.valueInput} ${t.colorAlphaInput}`,value:e===void 0?100:Math.trunc((e.alpha||1)*100),type:"number",onChange:o=>{n({...e,alpha:parseInt(o.target.value)/100})},"aria-label":"Color Opacity",children:[r.jsx(s.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"A"})}),r.jsx(s.Slot,{name:"right",children:r.jsx("span",{className:t.inputDecorator,children:"%"})})]})]})};b.displayName="ColorPicker.Values";const $=i.forwardRef(b);b.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Values",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 150, green: 150, blue: 150, alpha: 1 }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},defaultFormat:{required:!1,tsType:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},description:"The default format to use for the color input",defaultValue:{value:"'HEX'",computed:!1}}}};$.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorValueInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 150, green: 150, blue: 150, alpha: 1 }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},defaultFormat:{required:!1,tsType:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},description:"The default format to use for the color input",defaultValue:{value:"'HEX'",computed:!1}}}};const h=({children:e,...n})=>r.jsx("div",{className:t.root,"data-picker-type":"custom-color","data-test-id":"custom-color-picker",children:i.Children.map(e,a=>r.jsx(B,{...n,children:a}))});h.displayName="ColorPicker";const E=i.forwardRef(h),l={Root:E,Values:$,Gradient:G};l.Root.displayName="ColorPicker.Root";l.Values.displayName="ColorPicker.Values";l.Gradient.displayName="ColorPicker.Gradient";h.__docgenInfo={description:"",methods:[],displayName:"ColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},description:"The active color in the color picker"},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:"Event handler called when the color changes"}}};E.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},description:"The active color in the color picker"},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:"Event handler called when the color changes"}}};const ge={component:h,subcomponents:{"ColorPicker.Values":b,"ColorPicker.Gradient":g},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},c={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,a]=i.useState(e.currentColor);return r.jsxs(l.Root,{currentColor:n,onColorChange:a,children:[r.jsx(l.Values,{}),r.jsx(l.Gradient,{})]})}},d={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,a]=i.useState(e.currentColor);return r.jsxs(l.Root,{currentColor:n,onColorChange:a,children:[r.jsx(l.Values,{defaultFormat:"RGBA"}),r.jsx(l.Gradient,{})]})}},m={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,a]=i.useState(e.currentColor);return r.jsx(l.Root,{currentColor:n,onColorChange:a,children:r.jsx(l.Gradient,{})})}},p={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,a]=i.useState(e.currentColor);return r.jsx(l.Root,{currentColor:n,onColorChange:a,children:r.jsx(l.Values,{})})}};var j,q,x;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values />
                <ColorPicker.Gradient />
            </ColorPicker.Root>;
  }
}`,...(x=(q=c.parameters)==null?void 0:q.docs)==null?void 0:x.source}}};var R,I,w;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values defaultFormat="RGBA" />
                <ColorPicker.Gradient />
            </ColorPicker.Root>;
  }
}`,...(w=(I=d.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var _,P,S;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Gradient />
            </ColorPicker.Root>;
  }
}`,...(S=(P=m.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};var T,V,N;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values />
            </ColorPicker.Root>;
  }
}`,...(N=(V=p.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};const be=["Default","WithRgbaDefaultFormat","OnlyPicker","OnlyValues"];export{c as Default,m as OnlyPicker,p as OnlyValues,d as WithRgbaDefaultFormat,be as __namedExportsOrder,ge as default};
