import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{B as t}from"./Box-hT4xwuW0.js";import{B as l,c,a as y}from"./Button-CYWlMQhW.js";import{F as f}from"./Flex-B3ODtdDp.js";import{I as v}from"./IconArrowLeft-BgBTiPGg.js";import{u as b}from"./Tooltip-CP_K22RC.js";import{m as u}from"./merge-DI-veSMP.js";import{d as g}from"./dialog-Dre1eVQK.js";const d=({actionButtons:n,children:r,backButton:i,padding:m="comfortable",separator:p=!0,"data-test-id":a="fondue-dialog-footer"})=>{const s=b();return e.jsxs(t,{"data-test-id":a,className:u(["tw-border-t tw-border-t-line",g[m],!p&&"tw-pt-0 tw-border-none"]),children:[s&&e.jsx(t,{className:u(["tw-w-full",i||n.length>0?"tw-pb-2":""]),"data-test-id":`${a}-content`,children:r}),e.jsxs(f,{justify:"between",alignItems:"center",spacingX:12,children:[i&&e.jsx(l,{"data-test-id":`${a}-back-button`,...i,emphasis:c.Default,icon:e.jsx(v,{})}),!s&&e.jsx(t,{className:"tw-grow","data-test-id":`${a}-content`,children:r}),n.length>0?e.jsx(t,{className:"tw-flex tw-gap-x-3","data-test-id":`${a}-action-buttons`,children:n.map(o=>e.jsx(l,{...o,size:y.Medium},`${a}-button-${o.children}`))}):null]})]})};d.displayName="FondueDialogFooter";d.__docgenInfo={description:"",methods:[],displayName:"FondueDialogFooter",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},actionButtons:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    type?: ButtonType;
    title?: string;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    formId?: string;
    /** @deprecated use emphasis with ButtonEmphasis.Weak */
    solid?: boolean;
    /** @deprecated inverted can be done by wrapping the component in a className="tw-dark" */
    inverted?: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}}],raw:"ButtonProps[]"},description:""},backButton:{required:!1,tsType:{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
    type?: ButtonType;
    title?: string;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    formId?: string;
    /** @deprecated use emphasis with ButtonEmphasis.Weak */
    solid?: boolean;
    /** @deprecated inverted can be done by wrapping the component in a className="tw-dark" */
    inverted?: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"union",raw:"'emphasis' | 'icon' | 'size'",elements:[{name:"literal",value:"'emphasis'"},{name:"literal",value:"'icon'"},{name:"literal",value:"'size'"}]}],raw:"Omit<ButtonProps, 'emphasis' | 'icon' | 'size'>"},description:""},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"",defaultValue:{value:"'comfortable'",computed:!1}},separator:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};export{d as D};
