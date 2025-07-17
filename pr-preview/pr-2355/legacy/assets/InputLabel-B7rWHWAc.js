import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as h}from"./index-ClcD9ViR.js";import{L as k}from"./LegacyTooltip-Bv43SLQZ.js";import{I as x}from"./IconQuestionMarkCircle-7EPrDyIp.js";import{I as m}from"./IconSize-BcCrF_mi.js";import{a as q}from"./focusStyle-BtNTXUM4.js";import{m as d}from"./merge-DI-veSMP.js";const T={Danger:"tw-text-box-negative-inverse",Warning:"tw-text-box-warning-inverse",Primary:"tw-text-text-weak"},I={Danger:"hover:tw-text-box-negative-inverse-hover hover:tw-bg-box-neutral",Warning:"hover:tw-text-box-warning-inverse-hover hover:tw-bg-box-neutral",Primary:"hover:tw-text-text hover:tw-bg-box-neutral"},p=({tooltip:a,iconSize:t=m.Size16,triggerIcon:r=e.jsx(x,{}),triggerStyle:o="Primary","data-test-id":n="tooltip-icon"})=>e.jsx("div",{"data-test-id":n,children:a&&e.jsx("div",{children:e.jsx(k,{triggerElement:e.jsx("button",{type:"button","aria-label":"More info","data-test-id":`${n}-trigger`,className:d(["tw-inline-flex tw-justify-center tw-items-center tw-cursor-default tw-outline-none tw-rounded-full",q,T[o],I[o]]),children:h.cloneElement(r,{size:t})}),withArrow:!0,...a})})});p.displayName="FondueTooltipIcon";p.__docgenInfo={description:"@deprecated Please use updated tooltip component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.",methods:[],displayName:"FondueTooltipIcon",props:{tooltip:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    triggerElement?: ReactElement;
    content: ReactNode;
    tooltipIcon?: ReactElement;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    linkUrl?: string;
    linkLabel?: string;
    brightHeader?: BrightHeaderStyle;
    buttons?: [TooltipButton, TooltipButton] | [TooltipButton];
    children?: ReactNode;
    position?: TooltipPosition;
    alignment?: TooltipAlignment;
    flip?: boolean;
    withArrow?: boolean;
    withStrongBorder?: boolean;
    hoverDelay?: number;
    enterDelay?: number;
    open?: boolean;
    disabled?: boolean;
    /** @deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore */
    hidden?: boolean;
    enablePortal?: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"triggerElement",value:{name:"ReactElement",required:!1}},{key:"content",value:{name:"ReactNode",required:!0}},{key:"tooltipIcon",value:{name:"ReactElement",required:!1}},{key:"heading",value:{name:"ReactNode",required:!1}},{key:"headingIcon",value:{name:"ReactElement",required:!1}},{key:"linkUrl",value:{name:"string",required:!1}},{key:"linkLabel",value:{name:"string",required:!1}},{key:"brightHeader",value:{name:"BrightHeaderStyle",required:!1}},{key:"buttons",value:{name:"union",raw:"[TooltipButton, TooltipButton] | [TooltipButton]",elements:[{name:"tuple",raw:"[TooltipButton, TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},{name:"tuple",raw:"[TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"position",value:{name:"TooltipPosition",required:!1}},{key:"alignment",value:{name:"TooltipAlignment",required:!1}},{key:"flip",value:{name:"boolean",required:!1}},{key:"withArrow",value:{name:"boolean",required:!1}},{key:"withStrongBorder",value:{name:"boolean",required:!1}},{key:"hoverDelay",value:{name:"number",required:!1}},{key:"enterDelay",value:{name:"number",required:!1}},{key:"open",value:{name:"boolean",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"hidden",value:{name:"boolean",required:!1},description:"@deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore"},{key:"enablePortal",value:{name:"boolean",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}}]}},description:""},iconSize:{required:!1,tsType:{name:"IconSize"},description:"",defaultValue:{value:"IconSize.Size16",computed:!0}},triggerIcon:{required:!1,tsType:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
    icon: IconEnum;
}`,elements:[{name:"signature",type:"object",raw:`{
    size?: IconSize;
    filled?: boolean;
}`,signature:{properties:[{key:"size",value:{name:"IconSize",required:!1}},{key:"filled",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    icon: IconEnum;
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>"},description:"",defaultValue:{value:"<IconQuestionMarkCircle />",computed:!1}},triggerStyle:{required:!1,tsType:{name:"TooltipIconTriggerStyle"},description:"",defaultValue:{value:"TooltipIconTriggerStyle.Primary",computed:!0}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'tooltip-icon'",computed:!1}}}};const c=({id:a,children:t,htmlFor:r,required:o=!1,disabled:n=!1,clickable:g=!1,tooltip:i=[],bold:f,"data-test-id":l="input-label"})=>{const y=(Array.isArray(i)?i:[i]).map((s,u)=>({key:u,...s}));return e.jsxs("div",{className:d(["tw-inline-flex tw-leading-4 tw-items-center tw-gap-1 tw-font-sans tw-text-s tw-max-w-full tw-min-w-0 tw-flex-initial",n?"tw-text-text-disabled":"tw-text-text-weak"]),"data-test-id":`${l}-container`,children:[e.jsx("div",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:e.jsx("label",{id:a,htmlFor:r,className:d(["tw-select-none tw-max-w-full",f&&"tw-font-medium",n||!g?"hover:tw-cursor-not-allowed tw-pointer-events-none":"hover:tw-cursor-pointer hover:tw-text-text group-hover:tw-text-text"]),"data-test-id":l,title:typeof t=="string"?t:"",children:t})}),o&&e.jsx("span",{"data-test-id":`${l}-required`,className:"tw-h-4 tw-text-m tw-text-text-negative",children:"*"}),y.map(({key:s,triggerIcon:u,triggerStyle:w,hoverDelay:b=100,...v})=>e.jsx("div",{className:"tw-leading-3",children:e.jsx(p,{tooltip:{...v,hoverDelay:b},iconSize:m.Size16,triggerIcon:u,triggerStyle:w})},s))]})};c.displayName="FondueInputLabel";c.__docgenInfo={description:"@deprecated Use `Label` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#label-old-inputlabel the migration guide}.",methods:[],displayName:"FondueInputLabel",props:{id:{required:!1,tsType:{name:"string"},description:""},htmlFor:{required:!0,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},clickable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},tooltip:{required:!1,tsType:{name:"union",raw:`| (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)
| (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)[]`,elements:[{name:"unknown"},{name:"Array",elements:[{name:"unknown"}],raw:"(LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)[]"}]},description:"",defaultValue:{value:"[]",computed:!1}},bold:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'input-label'",computed:!1}}}};export{c as I};
