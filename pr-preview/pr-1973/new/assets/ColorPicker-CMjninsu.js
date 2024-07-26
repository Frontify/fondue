import{j as r}from"./jsx-runtime-DBEcOq3S.js";import{S as N}from"./index-Dhc4yksV.js";import{r as i}from"./index-DtJulBIN.js";import{C as E}from"./index-GpQCGCAv.js";import{f as V,g as G,h as F}from"./fondue-icons311-BZCDKIoV.js";import{e as b}from"./Select-DQc9wKL_.js";import{T as l}from"./TextInput-_sF7mbua.js";const H="_root_uxpv0_4",A="_inputs_uxpv0_11",P="_colorFormatInput_uxpv0_22",X="_colorAlphaInput_uxpv0_23",S="_colorChannelInputGroup_uxpv0_27",$="_inputDecorator_uxpv0_38",B="_gradientInput_uxpv0_42",D="_reactColorful_uxpv0_45",z="_valueInput_uxpv0_49",u={root:H,inputs:A,colorFormatInput:P,colorAlphaInput:X,colorChannelInputGroup:S,inputDecorator:$,gradientInput:B,reactColorful:D,valueInput:z},h={red:255,green:255,blue:255,alpha:1,name:""},x="HEX",O=e=>{if(e)return`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha||1})`},I=e=>{const a=/^([\dA-Fa-f]{3}){1,2}$/;return e.length>2&&a.test(e)},L=e=>{const a=/^([\dA-Fa-f]{3}){1,2}$/,o=e.match(a);if(!o)return{red:0,green:0,blue:0};const n=o[0];return n.length===3?{red:parseInt(`${n[0]}${n[0]}`,16),green:parseInt(`${n[1]}${n[1]}`,16),blue:parseInt(`${n[2]}${n[2]}`,16)}:{red:parseInt(n.slice(0,2),16),green:parseInt(n.slice(2,4),16),blue:parseInt(n.slice(4,6),16)}},f=e=>{const{red:a,green:o,blue:n}=e;return`${a.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}${n.toString(16).padStart(2,"0")}`},v=({currentColor:e=h,onColorChange:a=()=>{}},o)=>r.jsx("div",{className:u.gradientInput,"data-test-id":"custom-color-value-inputs",ref:o,children:r.jsx(E,{className:u.reactColorful,color:{r:e.red,g:e.green,b:e.blue,a:e.alpha===void 0?1:e.alpha},onChange:n=>a({red:n.r,green:n.g,blue:n.b,alpha:n.a})})});v.displayName="ColorPicker.Gradient";const C=i.forwardRef(v);v.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Gradient",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};C.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorGradientInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};const M="_input_15zoo_5",U="_colorName_15zoo_49",W="_colorIndicator_15zoo_53",J="_caret_15zoo_59",p={input:M,colorName:U,colorIndicator:W,caret:J},y=({currentColor:e,onClear:a,isOpen:o,...n},m)=>{const s=i.useId();return console.log(e),r.jsxs("div",{className:p.input,"data-open-state":o,...n,ref:m,children:[(e==null?void 0:e.red)!==void 0?r.jsx("div",{"aria-describedby":s,className:p.colorIndicator,style:{backgroundColor:O(e)}}):r.jsx(V,{size:16}),r.jsx("span",{id:s,className:p.colorName,children:e==null?void 0:e.name}),a&&r.jsx("button",{type:"button","aria-label":"Clear color",className:p.clear,children:r.jsx(G,{size:16})}),r.jsx("div",{children:r.jsx(F,{size:16,className:p.caret})})]})};y.displayName="ColorPicker.Input";const _=i.forwardRef(y);y.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Input",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"}}};_.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPickerInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"}}};const k=({currentColor:e=h,onColorChange:a=()=>{},currentFormat:o=x,setCurrentFormat:n=()=>{}},m)=>{const[s,d]=i.useState(f(e));return i.useEffect(()=>{d(f(e))},[e]),r.jsxs("div",{className:u.inputs,"data-test-id":"custom-color-value-inputs",ref:m,children:[r.jsx("div",{className:u.colorFormatInput,children:r.jsxs(b,{"aria-label":"Select an item",placeholder:"Select an item",onSelect:t=>{n(t)},value:o,children:[r.jsx(b.Item,{value:"HEX",children:"HEX"}),r.jsx(b.Item,{value:"RGBA",children:"RGBA"})]})}),o==="HEX"?r.jsx(l.Root,{className:u.valueInput,type:"text",value:s,status:I(s)?"neutral":"error",onBlur:t=>{I(t.target.value)&&a(L(t.target.value))},onChange:t=>{d(t.target.value)},"aria-label":"Red Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"#"})})}):r.jsxs("div",{className:u.colorChannelInputGroup,children:[r.jsx(l.Root,{className:u.valueInput,value:e.red,type:"number",onBlur:t=>{t.target.value.length===0&&a({...e,red:0})},onChange:t=>{console.log(parseInt(t.target.value)),a({...e,red:parseInt(t.target.value)})},"aria-label":"Red Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"R"})})}),r.jsx(l.Root,{className:u.valueInput,value:e.green,type:"number",onBlur:t=>{t.target.value.length===0&&a({...e,green:0})},onChange:t=>{a({...e,green:parseInt(t.target.value)})},"aria-label":"Green Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"G"})})}),r.jsx(l.Root,{className:u.valueInput,value:e.blue,type:"number",onBlur:t=>{t.target.value.length===0&&a({...e,blue:0})},onChange:t=>{a({...e,blue:parseInt(t.target.value)})},"aria-label":"Blue Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"B"})})})]}),r.jsx("div",{className:u.colorAlphaInput,children:r.jsxs(l.Root,{className:u.valueInput,value:e.alpha===void 0?100:Math.trunc(e.alpha*100),type:"number",onChange:t=>{a({...e,alpha:parseInt(t.target.value)/100})},"aria-label":"Color Opacity",children:[r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"A"})}),r.jsx(l.Slot,{name:"right",children:r.jsx("span",{className:u.inputDecorator,children:"%"})})]})})]})};k.displayName="ColorPicker.Values";const T=i.forwardRef(k);k.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Values",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},currentFormat:{required:!1,tsType:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},description:`@ignore
The format to use for the color input, passed down from the root component`,defaultValue:{value:"'HEX'",computed:!1}},setCurrentFormat:{required:!1,tsType:{name:"signature",type:"function",raw:"(format: ColorFormat) => void",signature:{arguments:[{type:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},name:"format"}],return:{name:"void"}}},description:`@ignore
The format to use for the color input, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};T.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorValueInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:`@ignore
The active color in the color picker, passed down from the root component`,defaultValue:{value:"{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:`@ignore
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},currentFormat:{required:!1,tsType:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},description:`@ignore
The format to use for the color input, passed down from the root component`,defaultValue:{value:"'HEX'",computed:!1}},setCurrentFormat:{required:!1,tsType:{name:"signature",type:"function",raw:"(format: ColorFormat) => void",signature:{arguments:[{type:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},name:"format"}],return:{name:"void"}}},description:`@ignore
The format to use for the color input, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};const w=(e,a)=>a==="HEX"?{...e,name:`#${f(e)}`}:{...e,name:`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha||1})`},q=({children:e,currentColor:a=h,onColorChange:o=()=>{},defaultFormat:n=x,...m},s)=>{const[d,t]=i.useState(n);return r.jsx("div",{className:u.root,"data-picker-type":"custom-color","data-test-id":"custom-color-picker",ref:s,children:i.Children.map(e,R=>r.jsx(K,{...m,onColorChange:c=>{o(w(c,d))},currentColor:a,currentFormat:d,setCurrentFormat:c=>{t(c),o(w(a,c))},children:R}))})};q.displayName="ColorPicker";const K=({children:e,...a})=>r.jsx(N,{...a,children:e}),j=i.forwardRef(q),g={Root:j,Values:T,Gradient:C,Input:_};g.Root.displayName="ColorPicker.Root";g.Values.displayName="ColorPicker.Values";g.Gradient.displayName="ColorPicker.Gradient";g.Input.displayName="ColorPicker.Input";q.__docgenInfo={description:"",methods:[],displayName:"ColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker",defaultValue:{value:"{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:"Event handler called when the color changes",defaultValue:{value:"() => {}",computed:!1}},defaultFormat:{required:!1,tsType:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},description:`The default format to use for the color input
@default "HEX"`,defaultValue:{value:"'HEX'",computed:!1}}}};j.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker",defaultValue:{value:"{ red: 255, green: 255, blue: 255, alpha: 1, name: '' }",computed:!1}},onColorChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(color: RgbaColor) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},name:"color"}],return:{name:"void"}}},description:"Event handler called when the color changes",defaultValue:{value:"() => {}",computed:!1}},defaultFormat:{required:!1,tsType:{name:"union",raw:"'HEX' | 'RGBA'",elements:[{name:"literal",value:"'HEX'"},{name:"literal",value:"'RGBA'"}]},description:`The default format to use for the color input
@default "HEX"`,defaultValue:{value:"'HEX'",computed:!1}}}};export{q as C,k as a,v as b,g as c,y as d};
