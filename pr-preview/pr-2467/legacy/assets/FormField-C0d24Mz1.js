import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{$ as y}from"./VisuallyHidden-DtqDAt8u.js";import{r as x}from"./index-B2-qRKKC.js";import{T as h}from"./Tooltip-zb4ozB6j.js";import{g}from"./useMemoizedId-BB39KVn8.js";import{H as b}from"./input-BW8vp0R_.js";import{m as v}from"./merge-DI-veSMP.js";import{V as c}from"./validation-CJXPAjNB.js";const q=({tooltips:l})=>l.map(t=>e.jsx(h,{content:t.content,size:t.size,"data-test-id":t["data-test-id"],children:t.children},`form-field-tooltip-${g()}`)),k=({label:l,disabled:t,readOnly:u,dataTestId:d})=>{const{text:m,required:i,secondaryLabel:o,hugWidth:s,tooltips:a}=l,r=[],p="tw-w-full tw-flex tw-flex-nowrap tw-justify-between",n=!s&&o;let f=m;return i&&(f+=" *"),a!=null&&a.length?r.push(e.jsxs("span",{className:"tw-flex tw-gap-2",children:[f,e.jsx(q,{tooltips:a})]})):r.push(e.jsx("span",{children:f})),n&&r.push(e.jsx("span",{children:o})),e.jsxs("span",{className:v(["tw-whitespace-nowrap",s&&"tw-pt-2",n&&p,t||u?"tw-text-black-60":"tw-text-black-80"]),"data-test-id":`${d}-label-text`,children:[...r]})},w=({children:l,disabled:t=!1,error:u=!1,errorText:d,errorTextColor:m=c.Error,helperText:i,helperTextColor:o=c.Default,hiddenLabel:s=!1,label:a,readOnly:r=!1,status:p=c.Default,"data-test-id":n="fondue-form-field"})=>e.jsxs("label",{className:v(["tw-flex tw-text-text-weak tw-gap-2 tw-select-none tw-max-w-full",a.hugWidth?"tw-w-fit tw-items-start tw-justify-start":"tw-w-full tw-flex-col",t||r?"hover:tw-cursor-not-allowed tw-pointer-events-none":"hover:tw-cursor-pointer hover:tw-text-text group-hover:tw-text-text"]),"data-test-id":`${n}-label`,children:[s?e.jsx(y,{children:e.jsx("span",{children:a.text})}):e.jsx(k,{label:a,dataTestId:n,disabled:t,readOnly:r}),e.jsxs("div",{className:"tw-w-full tw-flex tw-flex-col tw-gap-2","data-test-id":`${n}-input`,children:[x.cloneElement(l,{hugWidth:a.hugWidth,required:a.required,status:p,disabled:t,readOnly:r}),u&&e.jsx(b,{text:d??"Something went wrong",validationStyle:m,disabled:t,"data-test-id":`${n}-error-text`}),i&&e.jsx(b,{text:i,validationStyle:o,disabled:t,"data-test-id":`${n}-helper-text`})]})]});w.displayname="FondueFormField";w.__docgenInfo={description:"",methods:[],displayName:"FormField",props:{children:{required:!0,tsType:{name:"ReactElement"},description:""},label:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    text: string;
    hugWidth?: boolean;
    required?: boolean;
    secondaryLabel?: string;
    tooltips?: TooltipProps[];
    toolTipSize?: IconSize;
}`,signature:{properties:[{key:"text",value:{name:"string",required:!0}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"required",value:{name:"boolean",required:!1}},{key:"secondaryLabel",value:{name:"string",required:!1}},{key:"tooltips",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id?: string;
    children: ReactElement;
    openOnMount?: boolean;
    placement?: PopperPlacement;
    offset?: [number, number];
    flip?: boolean;
    enablePortal?: boolean;
    content: string;
    withArrow?: boolean;
    size?: 'spacious' | 'compact';
    maxWidth?: string | number;
    maxHeight?: string | number;
    enterDelay?: number;
    leaveDelay?: number;
    'data-test-id'?: string;
    zIndex?: number;
    disabled?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!1}},{key:"children",value:{name:"ReactElement",required:!0}},{key:"openOnMount",value:{name:"boolean",required:!1}},{key:"placement",value:{name:"union",raw:`| 'top'
| 'bottom'
| 'top-start'
| 'bottom-start'
| 'top-end'
| 'bottom-end'
| 'right'
| 'left'
| 'right-start'
| 'right-end'
| 'left-start'
| 'left-end'`,elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'top-start'"},{name:"literal",value:"'bottom-start'"},{name:"literal",value:"'top-end'"},{name:"literal",value:"'bottom-end'"},{name:"literal",value:"'right'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right-start'"},{name:"literal",value:"'right-end'"},{name:"literal",value:"'left-start'"},{name:"literal",value:"'left-end'"}],required:!1}},{key:"offset",value:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}],required:!1}},{key:"flip",value:{name:"boolean",required:!1}},{key:"enablePortal",value:{name:"boolean",required:!1}},{key:"content",value:{name:"string",required:!0}},{key:"withArrow",value:{name:"boolean",required:!1}},{key:"size",value:{name:"union",raw:"'spacious' | 'compact'",elements:[{name:"literal",value:"'spacious'"},{name:"literal",value:"'compact'"}],required:!1}},{key:"maxWidth",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1}},{key:"maxHeight",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1}},{key:"enterDelay",value:{name:"number",required:!1}},{key:"leaveDelay",value:{name:"number",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"zIndex",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:"TooltipProps[]",required:!1}},{key:"toolTipSize",value:{name:"IconSize",required:!1}}]}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},errorText:{required:!1,tsType:{name:"string"},description:""},errorTextColor:{required:!1,tsType:{name:"Validation"},description:"",defaultValue:{value:"Validation.Error",computed:!0}},helperText:{required:!1,tsType:{name:"string"},description:""},helperTextColor:{required:!1,tsType:{name:"Validation"},description:"",defaultValue:{value:"Validation.Default",computed:!0}},hiddenLabel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},readOnly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},status:{required:!1,tsType:{name:"Validation"},description:"",defaultValue:{value:"Validation.Default",computed:!0}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-form-field'",computed:!1}}}};export{w as F};
