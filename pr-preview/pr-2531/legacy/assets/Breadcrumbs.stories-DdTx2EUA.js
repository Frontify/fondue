import{r as S,j as a}from"./iframe-DkUKKt5y.js";import{b as Je,a as L,c as se}from"./Badge-0gywfIwL.js";import{I as A}from"./IconIcon-C5JEEbm3.js";import{a as Ue,$ as Ke}from"./useFocusable-BnodLyil.js";import{$ as Ye}from"./useLocalizedStringFormatter-D1L5mxy8.js";import{m as j}from"./merge-DI-veSMP.js";import{$ as Ze,B as G,O as Qe}from"./OverflowMenu-E-pGSb7f.js";import{$ as Xe}from"./useFocusRing-BLxiuku7.js";import{g as ea}from"./elements-BOYmskOL.js";import{F as aa}from"./focusStyle-Ch_WJ4aJ.js";import"./preload-helper-CG1F6kIz.js";import"./IconCross-C8gM1v-C.js";import"./IconSize-BcCrF_mi.js";import"./colors-cqDZVL9s.js";import"./IconIcon16-PeN8zDcl.js";import"./IconIcon24-BczRtnsJ.js";import"./chain-CndHG7ua.js";import"./useEffectEvent-Cx-ijvAI.js";import"./index-5vGpRYJt.js";import"./context-BBch30MT.js";import"./useLink-BIFW9FB1.js";import"./Menu-DHm2pcal.js";import"./usePopper-D77eUAEW.js";import"./index-CBYJFN7O.js";import"./useClickOutside-COZiIny8.js";import"./borderStyle-D9jrV09G.js";import"./MenuItem-DxMmsMGs.js";import"./IconCaretRight-Ct0yegJq.js";import"./IconCheckMark-B0sjDw5i.js";import"./IconDotsHorizontal-C-YuKf6N.js";var ie={};ie={breadcrumbs:"عناصر الواجهة"};var oe={};oe={breadcrumbs:"Трохи хляб"};var ue={};ue={breadcrumbs:"Popis cesty"};var le={};le={breadcrumbs:"Brødkrummer"};var de={};de={breadcrumbs:"Breadcrumbs"};var ce={};ce={breadcrumbs:"Πλοηγήσεις breadcrumb"};var me={};me={breadcrumbs:"Breadcrumbs"};var pe={};pe={breadcrumbs:"Migas de pan"};var be={};be={breadcrumbs:"Lingiread"};var fe={};fe={breadcrumbs:"Navigointilinkit"};var ve={};ve={breadcrumbs:"Chemin de navigation"};var ge={};ge={breadcrumbs:"שבילי ניווט"};var ye={};ye={breadcrumbs:"Navigacijski putovi"};var ke={};ke={breadcrumbs:"Morzsamenü"};var we={};we={breadcrumbs:"Breadcrumb"};var Be={};Be={breadcrumbs:"パンくずリスト"};var he={};he={breadcrumbs:"탐색 표시"};var Ie={};Ie={breadcrumbs:"Naršymo kelias"};var $e={};$e={breadcrumbs:"Atpakaļceļi"};var qe={};qe={breadcrumbs:"Navigasjonsstier"};var xe={};xe={breadcrumbs:"Broodkruimels"};var Ee={};Ee={breadcrumbs:"Struktura nawigacyjna"};var Te={};Te={breadcrumbs:"Caminho detalhado"};var Pe={};Pe={breadcrumbs:"Categorias"};var Se={};Se={breadcrumbs:"Miez de pâine"};var Ae={};Ae={breadcrumbs:"Навигация"};var Re={};Re={breadcrumbs:"Navigačné prvky Breadcrumbs"};var Me={};Me={breadcrumbs:"Drobtine"};var Ce={};Ce={breadcrumbs:"Putanje navigacije"};var je={};je={breadcrumbs:"Sökvägar"};var De={};De={breadcrumbs:"İçerik haritaları"};var ze={};ze={breadcrumbs:"Навігаційна стежка"};var Ne={};Ne={breadcrumbs:"导航栏"};var Le={};Le={breadcrumbs:"導覽列"};var Ge={};Ge={"ar-AE":ie,"bg-BG":oe,"cs-CZ":ue,"da-DK":le,"de-DE":de,"el-GR":ce,"en-US":me,"es-ES":pe,"et-EE":be,"fi-FI":fe,"fr-FR":ve,"he-IL":ge,"hr-HR":ye,"hu-HU":ke,"it-IT":we,"ja-JP":Be,"ko-KR":he,"lt-LT":Ie,"lv-LV":$e,"nb-NO":qe,"nl-NL":xe,"pl-PL":Ee,"pt-BR":Te,"pt-PT":Pe,"ro-RO":Se,"ru-RU":Ae,"sk-SK":Re,"sl-SI":Me,"sr-SP":Ce,"sv-SE":je,"tr-TR":De,"uk-UA":ze,"zh-CN":Ne,"zh-TW":Le};function ra(e){return e&&e.__esModule?e.default:e}function ta(e){let{"aria-label":r,...n}=e,s=Ye(ra(Ge),"@react-aria/breadcrumbs");return{navProps:{...Ue(n,{labelable:!0}),"aria-label":r||s.format("breadcrumbs")}}}const D=({label:e,badges:r,bold:n,decorator:s,link:t,onClick:u,activeInline:v,"data-test-id":c="breadcrumb"})=>{const q=S.useRef(null),l=ea(t,u),m=l!=="span",{itemProps:x}=Ze({isCurrent:!0,children:e,elementType:l},q),g={a:{href:t},button:{onClick:u,type:"button"},span:{tabIndex:-1}},{isFocusVisible:d,focusProps:p}=Xe(),E=m?Ke(x,p,g[l]):g[l],R=j(["tw-flex tw-gap-x-1 tw-items-center tw-leading-4 tw-h-6 tw-whitespace-pre-wrap tw-font-medium tw-rounded",n&&"tw-font-bold",v&&"tw-text-xs",m&&d&&aa]);return a.jsxs("li",{className:j(["tw-align-middle tw-gap-x-1 tw-text-m tw-text-text tw-items-center",v?"tw-flex tw-items-center":"tw-w-full tw-inline-flex"]),"data-test-id":`${c}-item`,children:[a.jsxs(l,{ref:q,...E,className:R,children:[s,e]}),r==null?void 0:r.map(({children:M,...T},P)=>S.createElement(Je,{...T,key:`breadcrumb-badge-${P}`},M))]})};D.displayName="FondueCurrentBreadcrumbItem";D.__docgenInfo={description:"",methods:[],displayName:"FondueCurrentBreadcrumbItem",props:{label:{required:!0,tsType:{name:"string"},description:""},link:{required:!1,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}}},description:""},decorator:{required:!1,tsType:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
    icon: IconEnum;
}`,elements:[{name:"signature",type:"object",raw:`{
    size?: IconSize;
    filled?: boolean;
}`,signature:{properties:[{key:"size",value:{name:"IconSize",required:!1}},{key:"filled",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    icon: IconEnum;
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>"},description:""},bold:{required:!1,tsType:{name:"boolean"},description:""},badges:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"status",value:{name:"union",raw:"BadgeStatusIconProps['status']",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onDismiss",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"emphasis",value:{name:"BadgeEmphasis",required:!1}},{key:"size",value:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"withTitleAttribute",value:{name:"boolean",required:!1},description:"@description withTitle could be disabled only in the case another overlay is present, ex Tooltip"}]}}],raw:"BadgeProps[]"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'breadcrumb'",computed:!1}}}};const Oe=({items:e,keepRoot:r,activeInline:n=!1,truncate:s=!1,"data-test-id":t})=>{const u=S.useRef(!0);return[...e.map(({label:c,badges:q,bold:l,decorator:m,link:x,onClick:g},d)=>{const p=`breadcrumb-${d}`,E=r&&d===0,R=d===e.length-1,M=r?2:3,T=e.length-M,P=d>=T,Fe=s&&!E&&!P,z=d<e.length-1,N=[];let C=-1;switch(!0){case R:return a.jsx(D,{label:c,badges:q,bold:l,decorator:m,link:x,onClick:g,activeInline:n,"data-test-id":t},p);case!s:case E:case P:return a.jsx(G,{label:c,decorator:m,link:x,onClick:g,showSeparator:z,"data-test-id":t},p);case(Fe&&u.current):u.current=!1;for(const _e of e){if(C++,C>=T)break;if(r&&C===0)continue;{const{label:He,link:We,onClick:Ve}=_e;N.push({label:He,link:We,onClick:Ve})}}return a.jsx(G,{label:"",decorator:m,showSeparator:z,"data-test-id":`${t}-truncation`,children:a.jsx(Qe,{items:N,"data-test-id":`${t}-overflow-menu`})},p);default:return a.jsx("li",{},p)}})]};Oe.displayname="FondueFormattedBreadcrumbs";const na=e=>({children:e.map(({label:r},n)=>a.jsx("li",{"aria-label":r,children:r},`breadcrumb-${n}`))});var o=(e=>(e.None="None",e.Small="Small",e.Medium="Medium",e))(o||{});const sa={None:"tw-gap-y-0",Small:"tw-gap-y-0.5",Medium:"tw-gap-y-1"},I=({items:e,keepRoot:r=!0,truncate:n=!1,activeInline:s=!1,"data-test-id":t="breadcrumb",verticalGap:u="Medium"})=>{const v=na(e),{navProps:c}=ta(v);return a.jsx("nav",{...c,className:"tw-font-sans","aria-label":"Breadcrumb","data-test-id":t,children:a.jsx("ol",{className:j(["tw-list-none tw-flex tw-flex-wrap",sa[u]]),children:a.jsx(Oe,{items:e,keepRoot:r,truncate:n,activeInline:s,"data-test-id":t})})})};I.displayName="FondueBreadcrumbs";I.__docgenInfo={description:"",methods:[],displayName:"FondueBreadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`{
    label: string;
    link?: string;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    decorator?: ReactElement<IconProps>;
    bold?: boolean;
    badges?: BadgeProps[];
    'data-test-id'?: string;
} & Pick<BreadcrumbsProps, 'activeInline'>`,elements:[{name:"signature",type:"object",raw:`{
    label: string;
    link?: string;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    decorator?: ReactElement<IconProps>;
    bold?: boolean;
    badges?: BadgeProps[];
    'data-test-id'?: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"link",value:{name:"string",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"decorator",value:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
    icon: IconEnum;
}`,elements:[{name:"signature",type:"object",raw:`{
    size?: IconSize;
    filled?: boolean;
}`,signature:{properties:[{key:"size",value:{name:"IconSize",required:!1}},{key:"filled",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    icon: IconEnum;
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"bold",value:{name:"boolean",required:!1}},{key:"badges",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"status",value:{name:"union",raw:"BadgeStatusIconProps['status']",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onDismiss",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"emphasis",value:{name:"BadgeEmphasis",required:!1}},{key:"size",value:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"withTitleAttribute",value:{name:"boolean",required:!1},description:"@description withTitle could be disabled only in the case another overlay is present, ex Tooltip"}]}}],raw:"BadgeProps[]",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
    items: Breadcrumb[];
    keepRoot?: boolean;
    activeInline?: boolean;
    truncate?: boolean;
    'data-test-id'?: string;
    verticalGap?: BreadcrumbGap;
}`,signature:{properties:[{key:"items",value:{name:"Array",elements:[{name:"Breadcrumb"}],raw:"Breadcrumb[]",required:!0}},{key:"keepRoot",value:{name:"boolean",required:!1}},{key:"activeInline",value:{name:"boolean",required:!1}},{key:"truncate",value:{name:"boolean",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"verticalGap",value:{name:"BreadcrumbGap",required:!1}}]}},{name:"literal",value:"'activeInline'"}],raw:"Pick<BreadcrumbsProps, 'activeInline'>"}]}],raw:"Breadcrumb[]"},description:""},keepRoot:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},activeInline:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},truncate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'breadcrumb'",computed:!1}},verticalGap:{required:!1,tsType:{name:"BreadcrumbGap"},description:"",defaultValue:{value:"BreadcrumbGap.Medium",computed:!0}}}};const{action:ia}=__STORYBOOK_MODULE_ACTIONS__,i=document.referrer,f=[{label:"Item 1",link:i},{label:"Item 2",link:i},{label:"Item 3",link:i},{label:"Item 4",link:i},{label:"Item 5",link:i}],za={title:"Components/Breadcrumbs",component:I,tags:["autodocs"],args:{keepRoot:!0},argTypes:{verticalGap:{options:Object.values(o),control:{type:"radio"}},truncate:{description:"If true, truncation will be applied to the trail.",defaultValue:!1,control:{type:"boolean"}},keepRoot:{description:"If true, the first item in the list will remain, else it is will truncated.",defaultValue:!0,control:{type:"boolean"}},activeInline:{description:"If true, the current item wil be appended to the trail.",defaultValue:!1,control:{type:"boolean"}},onBlur:{action:"onBlur"}}},$=e=>S.createElement(I,{...e,key:JSON.stringify(e)}),y=$.bind({});y.args={verticalGap:o.Medium,items:[...f,{bold:!0,label:"Active Item"}]};const k=$.bind({});k.args={verticalGap:o.Medium,keepRoot:!1,truncate:!0,items:[...f,{onClick:ia("click"),bold:!0,decorator:a.jsx(A,{}),label:"Active"}]};const w=$.bind({});w.args={verticalGap:o.Medium,items:f.map(({label:e})=>({label:e}))};const B=$.bind({});B.args={verticalGap:o.Medium,activeInline:!0,truncate:!0,items:[...f,{link:i,bold:!0,decorator:a.jsx(A,{}),label:"Active"}]};const h=$.bind({});h.args={verticalGap:o.Medium,items:[...f,{link:i,bold:!0,label:"Active",badges:[{style:L.Positive,children:"Badge 1"},{status:se.Danger,children:"Badge 2"},{style:L.Danger,icon:a.jsx(A,{}),children:"Badge 3"}]}]};const b=e=>a.jsx(I,{...e});b.args={verticalGap:o.Medium,items:[...f,{link:i,bold:!0,decorator:a.jsx(A,{}),label:"Active",badges:[{status:se.Positive,children:"Badge"}]}]};b.__docgenInfo={description:"",methods:[],displayName:"WithDecoratorAndBadge",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`{
    label: string;
    link?: string;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    decorator?: ReactElement<IconProps>;
    bold?: boolean;
    badges?: BadgeProps[];
    'data-test-id'?: string;
} & Pick<BreadcrumbsProps, 'activeInline'>`,elements:[{name:"signature",type:"object",raw:`{
    label: string;
    link?: string;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    decorator?: ReactElement<IconProps>;
    bold?: boolean;
    badges?: BadgeProps[];
    'data-test-id'?: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"link",value:{name:"string",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"decorator",value:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
    icon: IconEnum;
}`,elements:[{name:"signature",type:"object",raw:`{
    size?: IconSize;
    filled?: boolean;
}`,signature:{properties:[{key:"size",value:{name:"IconSize",required:!1}},{key:"filled",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    icon: IconEnum;
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"bold",value:{name:"boolean",required:!1}},{key:"badges",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"status",value:{name:"union",raw:"BadgeStatusIconProps['status']",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onDismiss",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"emphasis",value:{name:"BadgeEmphasis",required:!1}},{key:"size",value:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"withTitleAttribute",value:{name:"boolean",required:!1},description:"@description withTitle could be disabled only in the case another overlay is present, ex Tooltip"}]}}],raw:"BadgeProps[]",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
    items: Breadcrumb[];
    keepRoot?: boolean;
    activeInline?: boolean;
    truncate?: boolean;
    'data-test-id'?: string;
    verticalGap?: BreadcrumbGap;
}`,signature:{properties:[{key:"items",value:{name:"Array",elements:[{name:"Breadcrumb"}],raw:"Breadcrumb[]",required:!0}},{key:"keepRoot",value:{name:"boolean",required:!1}},{key:"activeInline",value:{name:"boolean",required:!1}},{key:"truncate",value:{name:"boolean",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"verticalGap",value:{name:"BreadcrumbGap",required:!1}}]}},{name:"literal",value:"'activeInline'"}],raw:"Pick<BreadcrumbsProps, 'activeInline'>"}]}],raw:"Breadcrumb[]"},description:""},keepRoot:{required:!1,tsType:{name:"boolean"},description:""},activeInline:{required:!1,tsType:{name:"boolean"},description:""},truncate:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},verticalGap:{required:!1,tsType:{name:"BreadcrumbGap"},description:""}}};var O,F,_;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(_=(F=y.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var H,W,V;k.parameters={...k.parameters,docs:{...(H=k.parameters)==null?void 0:H.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(V=(W=k.parameters)==null?void 0:W.docs)==null?void 0:V.source}}};var J,U,K;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(K=(U=w.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var Y,Z,Q;B.parameters={...B.parameters,docs:{...(Y=B.parameters)==null?void 0:Y.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(Q=(Z=B.parameters)==null?void 0:Z.docs)==null?void 0:Q.source}}};var X,ee,ae;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(ae=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var re,te,ne;b.parameters={...b.parameters,docs:{...(re=b.parameters)==null?void 0:re.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} />",...(ne=(te=b.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};const Na=["WithoutLinkOrAction","WithDecoratorAndActionAndRootTruncation","WithoutAnyLinksOrActions","WithDecoratorAndLinkAndCurrentInline","WithBadges","WithDecoratorAndBadge"];export{h as WithBadges,k as WithDecoratorAndActionAndRootTruncation,b as WithDecoratorAndBadge,B as WithDecoratorAndLinkAndCurrentInline,w as WithoutAnyLinksOrActions,y as WithoutLinkOrAction,Na as __namedExportsOrder,za as default};
