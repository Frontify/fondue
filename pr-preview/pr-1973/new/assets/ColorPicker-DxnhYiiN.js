import{j as r}from"./jsx-runtime-DBEcOq3S.js";import{S as R}from"./index-Dhc4yksV.js";import{r as s}from"./index-DtJulBIN.js";import{C as _}from"./index-GpQCGCAv.js";import{d as N,f as E,g as H}from"./fondue-icons311-cxtRWhAe.js";import{e as b}from"./Select-uZbANkcZ.js";import{T as o}from"./TextInput-C8X0wDo0.js";const V="_root_1ljju_4",$="_inputs_1ljju_11",G="_colorHexInput_1ljju_23",F="_inputDecorator_1ljju_32",X="_gradientInput_1ljju_36",P="_reactColorful_1ljju_39",A="_valueInput_1ljju_43",t={root:V,inputs:$,colorHexInput:G,inputDecorator:F,gradientInput:X,reactColorful:P,valueInput:A},f={red:255,green:255,blue:255,alpha:1,name:""},B="HEX",S=e=>{if(e)return`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha||1})`},w=e=>{const n=/^([\dA-Fa-f]{3}){1,2}$/;return e.length>2&&n.test(e)},D=e=>{const n=/^([\dA-Fa-f]{3}){1,2}$/,u=e.match(n);if(!u)return{red:0,green:0,blue:0};const l=u[0];return l.length===3?{red:parseInt(`${l[0]}${l[0]}`,16),green:parseInt(`${l[1]}${l[1]}`,16),blue:parseInt(`${l[2]}${l[2]}`,16)}:{red:parseInt(l.slice(0,2),16),green:parseInt(l.slice(2,4),16),blue:parseInt(l.slice(4,6),16)}},h=e=>{const{red:n,green:u,blue:l}=e;return`${n.toString(16).padStart(2,"0")}${u.toString(16).padStart(2,"0")}${l.toString(16).padStart(2,"0")}`},v=({currentColor:e=f,onColorChange:n=()=>{}})=>r.jsx("div",{className:t.gradientInput,"data-test-id":"custom-color-value-inputs",children:r.jsx(_,{className:t.reactColorful,color:{r:e.red,g:e.green,b:e.blue,a:e.alpha===void 0?1:e.alpha},onChange:u=>n({red:u.r,green:u.g,blue:u.b,alpha:u.a})})});v.displayName="ColorPicker.Gradient";const I=s.forwardRef(v);v.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Gradient",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};I.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorGradientInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
Event handler called when the color changes, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};const O="_input_1pkee_5",z="_colorName_1pkee_54",L="_colorIndicator_1pkee_58",M="_caret_1pkee_64",p={input:O,colorName:z,colorIndicator:L,caret:M},y=({currentColor:e,onClear:n,isOpen:u})=>r.jsxs("div",{className:p.input,"data-open-state":u,children:[e?r.jsx("div",{className:p.colorIndicator,style:{backgroundColor:S(e)}}):r.jsx(N,{size:16}),r.jsx("span",{className:p.colorName,children:e==null?void 0:e.name}),n&&r.jsx("button",{className:p.clear,children:r.jsx(E,{size:16})}),r.jsx("div",{children:r.jsx(H,{size:16,className:p.caret})})]});y.displayName="ColorPicker.Gradient";const C=s.forwardRef(y);y.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Gradient",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"}}};C.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPickerInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:"red",value:{name:"number",required:!0}},{key:"green",value:{name:"number",required:!0}},{key:"blue",value:{name:"number",required:!0}},{key:"alpha",value:{name:"number",required:!1}},{key:"name",value:{name:"string",required:!1}}]}},description:"The active color in the color picker"},isOpen:{required:!1,tsType:{name:"boolean"},description:"The open state of the color picker used to dermine arrow state"},onClear:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"callback for clearing the color"}}};const k=({currentColor:e=f,onColorChange:n=()=>{},currentFormat:u=B,setCurrentFormat:l=()=>{}})=>{const[c,d]=s.useState(h(e));return s.useEffect(()=>{d(h(e))},[e]),console.log(e.alpha,e.alpha===void 0?100:Math.trunc(e.alpha*100)),r.jsxs("div",{className:t.inputs,"data-test-id":"custom-color-value-inputs",children:[r.jsx("div",{className:t.colorFormatInput,children:r.jsxs(b,{"aria-label":"Select an item",placeholder:"Select an item",onSelect:a=>{l(a)},value:u,children:[r.jsx(b.Item,{value:"HEX",children:"HEX"}),r.jsx(b.Item,{value:"RGBA",children:"RGBA"})]})}),u==="HEX"?r.jsx(o.Root,{className:`${t.valueInput} ${t.colorHexInput}`,type:"text",value:c,status:w(c)?"neutral":"error",onBlur:a=>{w(a.target.value)&&n(D(a.target.value))},onChange:a=>{d(a.target.value)},"aria-label":"Red Color Channel",children:r.jsx(o.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"#"})})}):r.jsxs(r.Fragment,{children:[r.jsx(o.Root,{className:`${t.valueInput} ${t.colorChannelInput}`,value:e.red,type:"number",onBlur:a=>{a.target.value.length===0&&n({...e,red:0})},onChange:a=>{console.log(parseInt(a.target.value)),n({...e,red:parseInt(a.target.value)})},"aria-label":"Red Color Channel",children:r.jsx(o.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"R"})})}),r.jsx(o.Root,{className:`${t.valueInput} ${t.colorChannelInput}`,value:e.green,type:"number",onBlur:a=>{a.target.value.length===0&&n({...e,green:0})},onChange:a=>{n({...e,green:parseInt(a.target.value)})},"aria-label":"Green Color Channel",children:r.jsx(o.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"G"})})}),r.jsx(o.Root,{className:`${t.valueInput} ${t.colorChannelInput}`,value:e.blue,type:"number",onBlur:a=>{a.target.value.length===0&&n({...e,blue:0})},onChange:a=>{n({...e,blue:parseInt(a.target.value)})},"aria-label":"Blue Color Channel",children:r.jsx(o.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"B"})})})]}),r.jsxs(o.Root,{className:`${t.valueInput} ${t.colorAlphaInput}`,value:e.alpha===void 0?100:Math.trunc(e.alpha*100),type:"number",onChange:a=>{n({...e,alpha:parseInt(a.target.value)/100})},"aria-label":"Color Opacity",children:[r.jsx(o.Slot,{name:"left",children:r.jsx("span",{className:t.inputDecorator,children:"A"})}),r.jsx(o.Slot,{name:"right",children:r.jsx("span",{className:t.inputDecorator,children:"%"})})]})]})};k.displayName="ColorPicker.Values";const x=s.forwardRef(k);k.__docgenInfo={description:"",methods:[],displayName:"ColorPicker.Values",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
The format to use for the color input, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};x.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorValueInput",props:{currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
The format to use for the color input, passed down from the root component`,defaultValue:{value:"() => {}",computed:!1}}}};const q=({children:e,currentColor:n=f,onColorChange:u=()=>{},defaultFormat:l="HEX",...c})=>{const[d,a]=s.useState(l),j=s.useCallback((i,m)=>{u(m==="HEX"?{...i,name:`#${h(i)}`}:{...i,name:`rgba(${i.red}, ${i.green}, ${i.blue}, ${i.alpha||1})`})},[u]);return r.jsx("div",{className:t.root,"data-picker-type":"custom-color","data-test-id":"custom-color-picker",children:s.Children.map(e,i=>r.jsx(R,{...c,onColorChange:m=>{j(m,d)},currentColor:n,currentFormat:d,setCurrentFormat:m=>{a(m),j(n,m)},children:i}))})};q.displayName="ColorPicker";const T=s.forwardRef(q),g={Root:T,Values:x,Gradient:I,Input:C};g.Root.displayName="ColorPicker.Root";g.Values.displayName="ColorPicker.Values";g.Gradient.displayName="ColorPicker.Gradient";g.Input.displayName="ColorPicker.Input";q.__docgenInfo={description:"",methods:[],displayName:"ColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
@default "HEX"`,defaultValue:{value:"'HEX'",computed:!1}}}};T.__docgenInfo={description:"",methods:[],displayName:"ForwardedRefColorPicker",props:{children:{required:!1,tsType:{name:"ReactNode"},description:"The children of the color picker component. This can contain multiple `ColorPicker.Values` or `ColorPicker.Gradient` components."},currentColor:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
