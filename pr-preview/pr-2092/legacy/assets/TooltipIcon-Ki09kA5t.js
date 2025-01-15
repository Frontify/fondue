import{j as n}from"./jsx-runtime-Nms4Y4qS.js";import{r as l}from"./index-BwDkhjyp.js";import{L as s}from"./LegacyTooltip-DmnzjIEq.js";import{I as u}from"./IconQuestionMarkCircle-Buo6J1lY.js";import{I as d}from"./IconSize-BcCrF_mi.js";import{a as m}from"./focusStyle-CBFElZiz.js";import{m as c}from"./merge-DI-veSMP.js";var p=(e=>(e.Danger="Danger",e.Warning="Warning",e.Primary="Primary",e))(p||{});const g={Danger:"tw-text-box-negative-inverse",Warning:"tw-text-box-warning-inverse",Primary:"tw-text-text-weak"},y={Danger:"hover:tw-text-box-negative-inverse-hover hover:tw-bg-box-neutral",Warning:"hover:tw-text-box-warning-inverse-hover hover:tw-bg-box-neutral",Primary:"hover:tw-text-text hover:tw-bg-box-neutral"},r=({tooltip:e,iconSize:o=d.Size16,triggerIcon:i=n.jsx(u,{}),triggerStyle:t="Primary","data-test-id":a="tooltip-icon"})=>n.jsx("div",{"data-test-id":a,children:e&&n.jsx("div",{children:n.jsx(s,{triggerElement:n.jsx("button",{type:"button","aria-label":"More info","data-test-id":`${a}-trigger`,className:c(["tw-inline-flex tw-justify-center tw-items-center tw-cursor-default tw-outline-none tw-rounded-full",m,g[t],y[t]]),children:l.cloneElement(i,{size:o})}),withArrow:!0,...e})})});r.displayName="FondueTooltipIcon";r.__docgenInfo={description:"@deprecated Please use updated tooltip component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.",methods:[],displayName:"FondueTooltipIcon",props:{tooltip:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>"},description:"",defaultValue:{value:"<IconQuestionMarkCircle />",computed:!1}},triggerStyle:{required:!1,tsType:{name:"TooltipIconTriggerStyle"},description:"",defaultValue:{value:"TooltipIconTriggerStyle.Primary",computed:!0}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'tooltip-icon'",computed:!1}}}};export{p as T,r as a};
