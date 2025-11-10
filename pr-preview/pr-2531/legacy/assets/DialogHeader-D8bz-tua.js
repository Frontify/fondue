import{j as e}from"./iframe-VP-rj3ss.js";import{a as t}from"./Box-C2g9G4fK.js";import{F as c}from"./Flex-MwjcJng8.js";import{I as p}from"./IconCross-I4nIknD6.js";import{c as f}from"./focusStyle-Ch_WJ4aJ.js";import{m as n}from"./merge-DI-veSMP.js";import{b as g,d as y}from"./dialog-D9O7a7Fm.js";const l=({title:d,separator:u=!0,padding:i="comfortable",onClose:r,icon:s,badge:o,children:m,"data-test-id":a="fondue-dialog-header"})=>e.jsxs(t,{"data-test-id":a,className:n(["tw-w-full tw-flex tw-items-center tw-border-b tw-border-b-line",y[i],!u&&"tw-pb-0 tw-border-none"]),children:[e.jsxs(c,{alignItems:"center","data-test-id":`${a}-title`,children:[e.jsxs(t,{className:"tw-flex tw-items-center tw-text-box-neutral-mighty",children:[s&&e.jsx("span",{"data-test-id":`${a}-icon`,className:"tw-mr-1.5",children:s}),e.jsx("p",{className:n([g[i],"tw-font-medium tw-whitespace-nowrap"]),children:d}),o&&e.jsx("div",{"data-test-id":`${a}-badge`,className:"tw-ml-1.5",children:o})]}),e.jsx(t,{className:"tw-flex-shrink tw-ml-1",children:m})]}),r&&e.jsx("button",{type:"button","data-test-id":`${a}-close`,"aria-label":`${a}-close`,onClick:r,className:n([f,"tw-rounded tw-absolute tw-right-5 tw-text-text"]),children:e.jsx(p,{})})]});l.displayName="FondueDialogHeader";l.__docgenInfo={description:"@deprecated Use `Dialog` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueDialogHeader",props:{title:{required:!0,tsType:{name:"string"},description:""},separator:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
    icon: IconEnum;
}`,elements:[{name:"signature",type:"object",raw:`{
    size?: IconSize;
    filled?: boolean;
}`,signature:{properties:[{key:"size",value:{name:"IconSize",required:!1}},{key:"filled",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    icon: IconEnum;
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>"},description:""},badge:{required:!1,tsType:{name:"ReactElement",elements:[{name:"signature",type:"object",raw:`{
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatusIconProps['status'];
    onClick?: () => void;
    onDismiss?: () => void;
    disabled?: boolean;
    emphasis?: BadgeEmphasis;
    size?: BadgeSize;
    children?: ReactNode;
    'data-test-id'?: string;
    /** @description withTitle could be disabled only in the case another overlay is present, ex Tooltip */
    withTitleAttribute?: boolean;
}`,signature:{properties:[{key:"style",value:{name:"BadgeStyle",required:!1}},{key:"icon",value:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
    icon: IconEnum;
}`,elements:[{name:"signature",type:"object",raw:`{
    size?: IconSize;
    filled?: boolean;
}`,signature:{properties:[{key:"size",value:{name:"IconSize",required:!1}},{key:"filled",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    icon: IconEnum;
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"status",value:{name:"union",raw:"BadgeStatusIconProps['status']",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onDismiss",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"emphasis",value:{name:"BadgeEmphasis",required:!1}},{key:"size",value:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"withTitleAttribute",value:{name:"boolean",required:!1},description:"@description withTitle could be disabled only in the case another overlay is present, ex Tooltip"}]}}],raw:"ReactElement<BadgeProps>"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"",defaultValue:{value:"'comfortable'",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};export{l as D};
