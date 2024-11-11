import{j as r}from"./jsx-runtime-Nms4Y4qS.js";import{S as E}from"./index-BtCsUTRM.js";import{r as s}from"./index-BwDkhjyp.js";import{C as G}from"./index-YYnwjzoa.js";import{h as F,i as H,j as A}from"./fondue-icons332-CM-LLheB.js";import{e as b}from"./Select-RVzV-APc.js";import{T as l}from"./TextInput-C47czrW-.js";const P="_root_v784d_5",X="_inputs_v784d_12",$="_colorFormatInput_v784d_23",S="_colorAlphaInput_v784d_24",B="_colorChannelInputGroup_v784d_28",D="_inputDecorator_v784d_39",O="_gradientInput_v784d_43",L="_reactColorful_v784d_46",z="_valueInput_v784d_50",u={root:P,inputs:X,colorFormatInput:$,colorAlphaInput:S,colorChannelInputGroup:B,inputDecorator:D,gradientInput:O,reactColorful:L,valueInput:z},y={red:255,green:255,blue:255,alpha:1,name:""},_="HEX",M=e=>{if(e)return`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha||1})`},I=e=>{const a=/^([\dA-Fa-f]{3}){1,2}$/;return e.length>2&&a.test(e)},U=e=>{const a=/^([\dA-Fa-f]{3}){1,2}$/,t=e.match(a);if(!t)return{red:0,green:0,blue:0,alpha:0};const n=t[0];return n.length===3?{red:parseInt(`${n[0]}${n[0]}`,16),green:parseInt(`${n[1]}${n[1]}`,16),blue:parseInt(`${n[2]}${n[2]}`,16),alpha:1}:{red:parseInt(n.slice(0,2),16),green:parseInt(n.slice(2,4),16),blue:parseInt(n.slice(4,6),16),alpha:1}},v=e=>{const{red:a,green:t,blue:n}=e;return`${a.toString(16).padStart(2,"0")}${t.toString(16).padStart(2,"0")}${n.toString(16).padStart(2,"0")}`},w=(e,a)=>a==="HEX"?{...e,name:`#${v(e)}`}:{...e,name:`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha||1})`},h=(e,a=0,t=255)=>e.length===0||parseInt(e)<a?a:parseInt(e)>t?t:parseInt(e),k=({currentColor:e=y,onColorChange:a=()=>{},"data-test-id":t="color-picker-input"},n)=>r.jsx("div",{className:u.gradientInput,"data-test-id":t,ref:n,children:r.jsx(G,{className:u.reactColorful,color:{r:e.red,g:e.green,b:e.blue,a:e.alpha===void 0?1:e.alpha},onChange:i=>a({red:i.r,green:i.g,blue:i.b,alpha:i.a})})});k.displayName="ColorPicker.Gradient";const j=s.forwardRef(k);k.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Gradient",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker gradient input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};j.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorGradientInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker gradient input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};const W="_root_18q6l_5",J="_colorName_18q6l_60",K="_colorIndicator_18q6l_64",Q="_caret_18q6l_70",c={root:W,colorName:J,colorIndicator:K,caret:Q},q=({id:e,currentColor:a,onClear:t,"data-test-id":n="color-picker-input",...i},m)=>{const d=s.useId();return r.jsxs("div",{id:e,className:c.root,...i,ref:m,"data-test-id":n,children:[(a==null?void 0:a.red)!==void 0?r.jsx("div",{"aria-describedby":d,className:c.colorIndicator,style:{backgroundColor:M(a)}}):r.jsxs(r.Fragment,{children:[r.jsx(F,{size:16}),r.jsx("span",{children:"Select Color"})]}),r.jsx("span",{id:d,className:c.colorName,children:a==null?void 0:a.name}),t&&r.jsx("button",{type:"button","aria-label":"Clear color",onClick:t,className:c.clear,children:r.jsx(H,{size:16})}),r.jsx("div",{children:r.jsx(A,{size:16,className:c.caret})})]})};q.displayName="ColorPicker.Input";const x=s.forwardRef(q);q.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Input",props:{id:{required:!1,tsType:{name:"string"},description:""},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};x.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPickerInput",props:{id:{required:!1,tsType:{name:"string"},description:""},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker input",defaultValue:{value:"'color-picker-input'",computed:!1}}}};const T=({currentColor:e=y,onColorChange:a=()=>{},currentFormat:t=_,setCurrentFormat:n=()=>{},"data-test-id":i="color-picker-value-input"},m)=>{const[d,p]=s.useState(v(e));return s.useEffect(()=>{p(v(e))},[e]),r.jsxs("div",{className:u.inputs,"data-test-id":i,ref:m,children:[r.jsx("div",{className:u.colorFormatInput,children:r.jsxs(b,{"data-test-id":"color-picker-select-format","aria-label":"Select a color format",onSelect:o=>{n(o)},value:t,children:[r.jsx(b.Item,{value:"HEX",children:"HEX"}),r.jsx(b.Item,{value:"RGBA",children:"RGBA"})]})}),t==="HEX"?r.jsx(l.Root,{"data-test-id":"color-picker-value-input-hex",className:u.valueInput,type:"text",value:d,status:I(d)?"neutral":"error",onBlur:o=>{I(o.target.value)&&a(U(o.target.value))},onChange:o=>{p(o.target.value)},"aria-label":"Hex color value",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"#"})})}):r.jsxs("div",{className:u.colorChannelInputGroup,children:[r.jsx(l.Root,{"data-test-id":"color-picker-value-input-red",className:u.valueInput,value:e.red,type:"number",onChange:o=>{a({...e,red:h(o.target.value)})},"aria-label":"Red Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"R"})})}),r.jsx(l.Root,{"data-test-id":"color-picker-value-input-green",className:u.valueInput,value:e.green,type:"number",onChange:o=>{a({...e,green:h(o.target.value)})},"aria-label":"Green Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"G"})})}),r.jsx(l.Root,{"data-test-id":"color-picker-value-input-blue",className:u.valueInput,value:e.blue,type:"number",onChange:o=>{a({...e,blue:h(o.target.value)})},"aria-label":"Blue Color Channel",children:r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"B"})})})]}),r.jsx("div",{className:u.colorAlphaInput,children:r.jsxs(l.Root,{"data-test-id":"color-picker-value-input-alpha",className:u.valueInput,value:e.alpha===void 0?100:Math.trunc(e.alpha*100),type:"number",onChange:o=>{a({...e,alpha:h(o.target.value,0,100)/100})},"aria-label":"Color Opacity",children:[r.jsx(l.Slot,{name:"left",children:r.jsx("span",{className:u.inputDecorator,children:"A"})}),r.jsx(l.Slot,{name:"right",children:r.jsx("span",{className:u.inputDecorator,children:"%"})})]})})]})};T.displayName="ColorPicker.Values";const R=s.forwardRef(T);T.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Values",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
The format to use for the color input, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker value input",defaultValue:{value:"'color-picker-value-input'",computed:!1}}}};const C=({children:e,currentColor:a=y,onColorChange:t=()=>{},defaultFormat:n=_,"data-test-id":i="color-picker-input",...m},d)=>{const[p,o]=s.useState(n);return r.jsx("div",{className:u.root,"data-picker-type":"custom-color","data-test-id":i,ref:d,children:s.Children.map(e,V=>r.jsx(Y,{...m,onColorChange:f=>{t(w(f,p))},currentColor:a,currentFormat:p,setCurrentFormat:f=>{o(f),t(w(a,f))},children:V}))})};C.displayName="ColorPicker";const Y=({children:e,...a})=>r.jsx(E,{...a,children:e}),N=s.forwardRef(C),g={Root:N,Values:R,Gradient:j,Input:x};g.Root.displayName="ColorPicker.Root";g.Values.displayName="ColorPicker.Values";g.Gradient.displayName="ColorPicker.Gradient";g.Input.displayName="ColorPicker.Input";C.__docgenInfo={description:"",methods:[],displayName:"ColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
@default "HEX"`,defaultValue:{value:"'HEX'",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"The test id of the color picker",defaultValue:{value:"'color-picker-input'",computed:!1}}}};export{C,T as a,k as b,g as c,q as d};
