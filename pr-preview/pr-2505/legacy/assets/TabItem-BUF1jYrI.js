import{r as e,j as d}from"./iframe-CHTDhBOw.js";import{c as m}from"./elements-BOYmskOL.js";import{m as c}from"./merge-DI-veSMP.js";const i=({active:a,disabled:r,children:s,id:n})=>{const[t,o]=e.useState(null),[l,u]=e.useState(!1);return e.useEffect(()=>{u(m(t))},[t]),a?d.jsx("div",{role:"tabpanel",ref:o,id:`${n}-content`,"aria-labelledby":n,className:c([!a||r?"tw-hidden":"","focus:tw-ring-4 focus:tw-ring-blue"]),tabIndex:l?-1:0,children:s}):null};i.displayName="FondueTabItem";i.__docgenInfo={description:"",methods:[],displayName:"FondueTabItem",props:{id:{required:!0,tsType:{name:"string"},description:""},label:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},decorator:{required:!1,tsType:{name:"ReactElement"},description:""},badge:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"status",value:{name:"union",raw:"BadgeStatusIconProps['status']",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onDismiss",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"emphasis",value:{name:"BadgeEmphasis",required:!1}},{key:"size",value:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"withTitleAttribute",value:{name:"boolean",required:!1},description:"@description withTitle could be disabled only in the case another overlay is present, ex Tooltip"}]}},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},active:{required:!1,tsType:{name:"boolean"},description:""}}};export{i as T};
