import{j as r}from"./jsx-runtime-DBEcOq3S.js";import{S as E}from"./index-Dhc4yksV.js";import{r as s}from"./index-DtJulBIN.js";import{C as G}from"./index-GpQCGCAv.js";import{f as F,g as H,h as A}from"./fondue-icons324-Bw2AQYl8.js";import{e as b}from"./Select-Cbt2_HtK.js";import{T as l}from"./TextInput-Cfm3EY7U.js";const P="_root_xxcbn_4",X="_inputs_xxcbn_11",S="_colorFormatInput_xxcbn_22",$="_colorAlphaInput_xxcbn_23",B="_colorChannelInputGroup_xxcbn_27",D="_inputDecorator_xxcbn_38",O="_gradientInput_xxcbn_42",L="_reactColorful_xxcbn_45",z="_valueInput_xxcbn_49",t={root:P,inputs:X,colorFormatInput:S,colorAlphaInput:$,colorChannelInputGroup:B,inputDecorator:D,gradientInput:O,reactColorful:L,valueInput:z},y={red:255,green:255,blue:255,alpha:1,name:""},w="HEX",M=e=>{if(e)return`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha||1})`},C=e=>{const a=/^([\dA-Fa-f]{3}){1,2}$/;return e.length>2&&a.test(e)},U=e=>{const a=/^([\dA-Fa-f]{3}){1,2}$/,u=e.match(a);if(!u)return{red:0,green:0,blue:0,alpha:0};const n=u[0];return n.length===3?{red:parseInt(`${n[0]}${n[0]}`,16),green:parseInt(`${n[1]}${n[1]}`,16),blue:parseInt(`${n[2]}${n[2]}`,16),alpha:1}:{red:parseInt(n.slice(0,2),16),green:parseInt(n.slice(2,4),16),blue:parseInt(n.slice(4,6),16),alpha:1}},v=e=>{const{red:a,green:u,blue:n}=e;return`${a.toString(16).padStart(2,"0")}${u.toString(16).padStart(2,"0")}${n.toString(16).padStart(2,"0")}`},I=(e,a)=>a==="HEX"?{...e,name:`#${v(e)}`}:{...e,name:`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha||1})`},h=(e,a=0,u=255)=>e.length===0||parseInt(e)<a?a:parseInt(e)>u?u:parseInt(e),k=({currentColor:e=y,onColorChange:a=()=>{},"data-test-id":u="color-picker-input"},n)=>r.jsx("div",{className:t.gradientInput,"data-test-id":u,ref:n,children:r.jsx(G,{className:t.reactColorful,color:{r:e.red,g:e.green,b:e.blue,a:e.alpha===void 0?1:e.alpha},onChange:i=>a({red:i.r,green:i.g,blue:i.b,alpha:i.a})})});k.displayName="ColorPicker.Gradient";const _=s.forwardRef(k);k.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Gradient",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker gradient input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};_.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorGradientInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker gradient input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};const W="_input_ocee9_5",J="_colorName_ocee9_53",K="_colorIndicator_ocee9_57",Q="_caret_ocee9_63",p={input:W,colorName:J,colorIndicator:K,caret:Q},q=({currentColor:e,onClear:a,"data-test-id":u="color-picker-input",...n},i)=>{const d=s.useId();return r.jsxs("div",{className:p.input,...n,ref:i,"data-test-id":u,children:[(e==null?void 0:e.red)!==void 0?r.jsx("div",{"aria-describedby":d,className:p.colorIndicator,style:{backgroundColor:M(e)}}):r.jsxs(r.Fragment,{children:[r.jsx(F,{size:16}),r.jsx("span",{children:"Select Color"})]}),r.jsx("span",{id:d,className:p.colorName,children:e==null?void 0:e.name}),a&&r.jsx("button",{type:"button","aria-label":"Clear color",onClick:a,className:p.clear,children:r.jsx(H,{size:16})}),r.jsx("div",{children:r.jsx(A,{size:16,className:p.caret})})]})};q.displayName="ColorPicker.Input";const j=s.forwardRef(q);q.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Input",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};j.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPickerInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};const x=({currentColor:e=y,onColorChange:a=()=>{},currentFormat:u=w,setCurrentFormat:n=()=>{},"data-test-id":i="color-picker-value-input"},d)=>{const[c,m]=s.useState(v(e));return s.useEffect(()=>{m(v(e))},[e]),r.jsxs("div",{className:t.inputs,"data-test-id":i,ref:d,children:[r.jsx("div",{className:t.colorFormatInput,children:r.jsxs(b,{"data-test-id":"color-picker-select-format","aria-label":"Select a color format",onSelect:o=>{n(o)},value:u,children:[r.jsx(b.Item,{value:"HEX",children:"HEX"}),r.jsx(b.Item,{value:"RGBA",children:"RGBA"})]})}),u==="HEX"?r.jsx(l.Root,{"data-test-id":"color-picker-value-input-hex",className:t.valueInput,type:"text",value:c,status:C(c)?"neutral":"error",onBlur:o=>{C(o.target.value)&&a(U(o.target.value))},onChange:o=>{m(o.target.value)},"aria-label":"Hex color value",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"#"})})}):r.jsxs("div",{className:t.colorChannelInputGroup,children:[r.jsx(l.Root,{"data-test-id":"color-picker-value-input-red",className:t.valueInput,value:e.red,type:"number",onChange:o=>{a({...e,red:h(o.target.value)})},"aria-label":"Red Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"R"})})}),r.jsx(l.Root,{"data-test-id":"color-picker-value-input-green",className:t.valueInput,value:e.green,type:"number",onChange:o=>{a({...e,green:h(o.target.value)})},"aria-label":"Green Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"G"})})}),r.jsx(l.Root,{"data-test-id":"color-picker-value-input-blue",className:t.valueInput,value:e.blue,type:"number",onChange:o=>{a({...e,blue:h(o.target.value)})},"aria-label":"Blue Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"B"})})})]}),r.jsx("div",{className:t.colorAlphaInput,children:r.jsxs(l.Root,{"data-test-id":"color-picker-value-input-alpha",className:t.valueInput,value:e.alpha===void 0?100:Math.trunc(e.alpha*100),type:"number",onChange:o=>{a({...e,alpha:h(o.target.value,0,100)/100})},"aria-label":"Color Opacity",children:[r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"A"})}),r.jsx(l.Slot,{name:"right",children:r.jsx("span",{className:t.inputDecorator,children:"%"})})]})})]})};x.displayName="ColorPicker.Values";const R=s.forwardRef(x);x.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Values",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
The format to use for the color input, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker value input",defaultValue:{value:"'color-picker-value-input'",computed:!1}}}};R.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorValueInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
The format to use for the color input, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker value input",defaultValue:{value:"'color-picker-value-input'",computed:!1}}}};const T=({children:e,currentColor:a=y,onColorChange:u=()=>{},defaultFormat:n=w,"data-test-id":i="color-picker-input",...d},c)=>{const[m,o]=s.useState(n);return r.jsx("div",{className:t.root,"data-picker-type":"custom-color","data-test-id":i,ref:c,children:s.Children.map(e,V=>r.jsx(Y,{...d,onColorChange:f=>{u(I(f,m))},currentColor:a,currentFormat:m,setCurrentFormat:f=>{o(f),u(I(a,f))},children:V}))})};T.displayName="ColorPicker";const Y=({children:e,...a})=>r.jsx(E,{...a,children:e}),N=s.forwardRef(T),g={Root:N,Values:R,Gradient:_,Input:j};g.Root.displayName="ColorPicker.Root";g.Values.displayName="ColorPicker.Values";g.Gradient.displayName="ColorPicker.Gradient";g.Input.displayName="ColorPicker.Input";T.__docgenInfo={description:"",methods:[],displayName:"ColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
@default "HEX"`,defaultValue:{value:"'HEX'",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker",defaultValue:{value:"'color-picker-input'",computed:!1}}}};N.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
@default "HEX"`,defaultValue:{value:"'HEX'",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker",defaultValue:{value:"'color-picker-input'",computed:!1}}}};export{T as C,x as a,k as b,g as c,q as d};
