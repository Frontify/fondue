import{j as a}from"./jsx-runtime-Nms4Y4qS.js";import{r as E}from"./index-BwDkhjyp.js";import{a as Oe}from"./chunk-454WOBUV-CM0pFb8Z.js";import{B as _e,a as N,c as ae}from"./Badge-DCccyOuc.js";import{I as T}from"./IconIcon-BwqYlkW2.js";import{c as We,b as Ve}from"./useFocusable-CsWTbG_a.js";import{$ as Je}from"./useLocalizedStringFormatter-D7Kogc_3.js";import{m as j}from"./merge-DI-veSMP.js";import{$ as Ue,B as L,O as Ke}from"./OverflowMenu-D1kdN7GI.js";import{$ as Ye}from"./useFocusRing-4Vnvtzpc.js";import{g as Ze}from"./elements-BOYmskOL.js";import{c as Qe}from"./focusStyle-CBFElZiz.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./IconCross-BUeQrH0h.js";import"./IconSize-BcCrF_mi.js";import"./colors-cqDZVL9s.js";import"./IconIcon16-TK9s3MAx.js";import"./IconIcon24-DxzSV-8K.js";import"./chain-D5h1pgIF.js";import"./SSRProvider-CYXx33DY.js";import"./context-C2PaECDE.js";import"./useLink-3WgLA7Za.js";import"./Menu-DrrhIXZ4.js";import"./usePopper-DPXU-o95.js";import"./index-DxjWwZXO.js";import"./index-CfyPTyT-.js";import"./useClickOutside-CKV3CrvD.js";import"./borderStyle-D9jrV09G.js";import"./MenuItem-BEWw9_Ux.js";import"./IconCaretRight-BUEYSaCS.js";import"./IconCheckMark-BVQYjlwc.js";import"./IconDotsHorizontal-CPSyvqAX.js";var re={};re={breadcrumbs:"عناصر الواجهة"};var te={};te={breadcrumbs:"Трохи хляб"};var ne={};ne={breadcrumbs:"Popis cesty"};var se={};se={breadcrumbs:"Brødkrummer"};var ie={};ie={breadcrumbs:"Breadcrumbs"};var oe={};oe={breadcrumbs:"Πλοηγήσεις breadcrumb"};var ue={};ue={breadcrumbs:"Breadcrumbs"};var le={};le={breadcrumbs:"Migas de pan"};var de={};de={breadcrumbs:"Lingiread"};var ce={};ce={breadcrumbs:"Navigointilinkit"};var me={};me={breadcrumbs:"Chemin de navigation"};var pe={};pe={breadcrumbs:"שבילי ניווט"};var be={};be={breadcrumbs:"Navigacijski putovi"};var fe={};fe={breadcrumbs:"Morzsamenü"};var ve={};ve={breadcrumbs:"Breadcrumb"};var ge={};ge={breadcrumbs:"パンくずリスト"};var ye={};ye={breadcrumbs:"탐색 표시"};var ke={};ke={breadcrumbs:"Naršymo kelias"};var we={};we={breadcrumbs:"Atpakaļceļi"};var Be={};Be={breadcrumbs:"Navigasjonsstier"};var he={};he={breadcrumbs:"Broodkruimels"};var $e={};$e={breadcrumbs:"Struktura nawigacyjna"};var Ie={};Ie={breadcrumbs:"Caminho detalhado"};var qe={};qe={breadcrumbs:"Categorias"};var xe={};xe={breadcrumbs:"Miez de pâine"};var Ee={};Ee={breadcrumbs:"Навигация"};var Te={};Te={breadcrumbs:"Navigačné prvky Breadcrumbs"};var Pe={};Pe={breadcrumbs:"Drobtine"};var Se={};Se={breadcrumbs:"Putanje navigacije"};var Ae={};Ae={breadcrumbs:"Sökvägar"};var Re={};Re={breadcrumbs:"İçerik haritaları"};var je={};je={breadcrumbs:"Навігаційна стежка"};var Ce={};Ce={breadcrumbs:"导航栏"};var Me={};Me={breadcrumbs:"導覽列"};var ze={};ze={"ar-AE":re,"bg-BG":te,"cs-CZ":ne,"da-DK":se,"de-DE":ie,"el-GR":oe,"en-US":ue,"es-ES":le,"et-EE":de,"fi-FI":ce,"fr-FR":me,"he-IL":pe,"hr-HR":be,"hu-HU":fe,"it-IT":ve,"ja-JP":ge,"ko-KR":ye,"lt-LT":ke,"lv-LV":we,"nb-NO":Be,"nl-NL":he,"pl-PL":$e,"pt-BR":Ie,"pt-PT":qe,"ro-RO":xe,"ru-RU":Ee,"sk-SK":Te,"sl-SI":Pe,"sr-SP":Se,"sv-SE":Ae,"tr-TR":Re,"uk-UA":je,"zh-CN":Ce,"zh-TW":Me};function Xe(e){return e&&e.__esModule?e.default:e}function ea(e){let{"aria-label":r,...n}=e,s=Je(Xe(ze),"@react-aria/breadcrumbs");return{navProps:{...We(n,{labelable:!0}),"aria-label":r||s.format("breadcrumbs")}}}const C=({label:e,badges:r,bold:n,decorator:s,link:t,onClick:o,activeInline:p,"data-test-id":d="breadcrumb"})=>{const h=E.useRef(null),b=Ze(t,o),{itemProps:f}=Ue({isCurrent:!0,children:e,elementType:b},h),$={a:{href:t},button:{onClick:o,type:"button"},span:{}},{isFocusVisible:I,focusProps:u}=Ye(),c=Ve(f,u,$[b]),q=j(["tw-flex tw-gap-x-1 tw-items-center tw-leading-4 tw-h-6 tw-whitespace-pre-wrap tw-font-medium tw-rounded",n&&"tw-font-bold",p&&"tw-text-xs",I&&Qe]);return a.jsxs("li",{className:j(["tw-align-middle tw-gap-x-1 tw-text-m tw-text-text tw-items-center",p?"tw-flex tw-items-center":"tw-w-full tw-inline-flex"]),"data-test-id":`${d}-item`,children:[a.jsxs(b,{ref:h,...c,className:q,children:[s,e]}),r==null?void 0:r.map(({children:S,...A},x)=>E.createElement(_e,{...A,key:`breadcrumb-badge-${x}`},S))]})};C.displayName="FondueCurrentBreadcrumbItem";C.__docgenInfo={description:"",methods:[],displayName:"FondueCurrentBreadcrumbItem",props:{label:{required:!0,tsType:{name:"string"},description:""},link:{required:!1,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}}},description:""},decorator:{required:!1,tsType:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
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
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"status",value:{name:"union",raw:"BadgeStatusIconProps['status']",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onDismiss",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"emphasis",value:{name:"BadgeEmphasis",required:!1}},{key:"size",value:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"withTitleAttribute",value:{name:"boolean",required:!1},description:"@description withTitle could be disabled only in the case another overlay is present, ex Tooltip"}]}}],raw:"BadgeProps[]"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'breadcrumb'",computed:!1}}}};const De=({items:e,keepRoot:r,activeInline:n=!1,truncate:s=!1,"data-test-id":t})=>{const o=E.useRef(!0);return[...e.map(({label:d,badges:h,bold:b,decorator:f,link:$,onClick:I},u)=>{const c=`breadcrumb-${u}`,q=r&&u===0,S=u===e.length-1,A=r?2:3,x=e.length-A,M=u>=x,Ne=s&&!q&&!M,z=u<e.length-1,D=[];let R=-1;switch(!0){case S:return a.jsx(C,{label:d,badges:h,bold:b,decorator:f,link:$,onClick:I,activeInline:n,"data-test-id":t},c);case!s:case q:case M:return a.jsx(L,{label:d,decorator:f,link:$,onClick:I,showSeparator:z,"data-test-id":t},c);case(Ne&&o.current):o.current=!1;for(const Le of e){if(R++,R>=x)break;if(r&&R===0)continue;{const{label:Ge,link:Fe,onClick:He}=Le;D.push({label:Ge,link:Fe,onClick:He})}}return a.jsx(L,{label:"",decorator:f,showSeparator:z,"data-test-id":`${t}-truncation`,children:a.jsx(Ke,{items:D,"data-test-id":`${t}-overflow-menu`})},c);default:return a.jsx("li",{},c)}})]};De.displayname="FondueFormattedBreadcrumbs";const aa=e=>({children:e.map(({label:r},n)=>a.jsx("li",{"aria-label":r,children:r},`breadcrumb-${n}`))});var l=(e=>(e.None="None",e.Small="Small",e.Medium="Medium",e))(l||{});const ra={None:"tw-gap-y-0",Small:"tw-gap-y-0.5",Medium:"tw-gap-y-1"},w=({items:e,keepRoot:r=!0,truncate:n=!1,activeInline:s=!1,"data-test-id":t="breadcrumb",verticalGap:o="Medium"})=>{const p=aa(e),{navProps:d}=ea(p);return a.jsx("nav",{...d,className:"tw-font-sans","aria-label":"Breadcrumb","data-test-id":t,children:a.jsx("ol",{className:j(["tw-list-none tw-flex tw-flex-wrap",ra[o]]),children:a.jsx(De,{items:e,keepRoot:r,truncate:n,activeInline:s,"data-test-id":t})})})};w.displayName="FondueBreadcrumbs";w.__docgenInfo={description:"",methods:[],displayName:"FondueBreadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"items",value:{name:"Array",elements:[{name:"Breadcrumb"}],raw:"Breadcrumb[]",required:!0}},{key:"keepRoot",value:{name:"boolean",required:!1}},{key:"activeInline",value:{name:"boolean",required:!1}},{key:"truncate",value:{name:"boolean",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"verticalGap",value:{name:"BreadcrumbGap",required:!1}}]}},{name:"literal",value:"'activeInline'"}],raw:"Pick<BreadcrumbsProps, 'activeInline'>"}]}],raw:"Breadcrumb[]"},description:""},keepRoot:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},activeInline:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},truncate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'breadcrumb'",computed:!1}},verticalGap:{required:!1,tsType:{name:"BreadcrumbGap"},description:"",defaultValue:{value:"BreadcrumbGap.Medium",computed:!0}}}};const i=document.referrer,B=[{label:"Item 1",link:i},{label:"Item 2",link:i},{label:"Item 3",link:i},{label:"Item 4",link:i},{label:"Item 5",link:i}],za={title:"Components/Breadcrumbs",component:w,tags:["autodocs"],args:{keepRoot:!0},argTypes:{verticalGap:{options:Object.values(l),control:{type:"radio"}},truncate:{description:"If true, truncation will be applied to the trail.",defaultValue:!1,control:{type:"boolean"}},keepRoot:{description:"If true, the first item in the list will remain, else it is will truncated.",defaultValue:!0,control:{type:"boolean"}},activeInline:{description:"If true, the current item wil be appended to the trail.",defaultValue:!1,control:{type:"boolean"}},onBlur:{action:"onBlur"}}},P=e=>E.createElement(w,{...e,key:JSON.stringify(e)}),v=P.bind({});v.args={verticalGap:l.Medium,items:[...B,{bold:!0,label:"Active Item"}]};const g=P.bind({});g.args={verticalGap:l.Medium,keepRoot:!1,truncate:!0,items:[...B,{onClick:Oe("click"),bold:!0,decorator:a.jsx(T,{}),label:"Active"}]};const y=P.bind({});y.args={verticalGap:l.Medium,activeInline:!0,truncate:!0,items:[...B,{link:i,bold:!0,decorator:a.jsx(T,{}),label:"Active"}]};const k=P.bind({});k.args={verticalGap:l.Medium,items:[...B,{link:i,bold:!0,label:"Active",badges:[{style:N.Positive,children:"Badge 1"},{status:ae.Danger,children:"Badge 2"},{style:N.Danger,icon:a.jsx(T,{}),children:"Badge 3"}]}]};const m=e=>a.jsx(w,{...e});m.args={verticalGap:l.Medium,items:[...B,{link:i,bold:!0,decorator:a.jsx(T,{}),label:"Active",badges:[{status:ae.Positive,children:"Badge"}]}]};m.__docgenInfo={description:"",methods:[],displayName:"WithDecoratorAndBadge",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"items",value:{name:"Array",elements:[{name:"Breadcrumb"}],raw:"Breadcrumb[]",required:!0}},{key:"keepRoot",value:{name:"boolean",required:!1}},{key:"activeInline",value:{name:"boolean",required:!1}},{key:"truncate",value:{name:"boolean",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"verticalGap",value:{name:"BreadcrumbGap",required:!1}}]}},{name:"literal",value:"'activeInline'"}],raw:"Pick<BreadcrumbsProps, 'activeInline'>"}]}],raw:"Breadcrumb[]"},description:""},keepRoot:{required:!1,tsType:{name:"boolean"},description:""},activeInline:{required:!1,tsType:{name:"boolean"},description:""},truncate:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},verticalGap:{required:!1,tsType:{name:"BreadcrumbGap"},description:""}}};var G,F,H;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(H=(F=v.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var O,_,W;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(W=(_=g.parameters)==null?void 0:_.docs)==null?void 0:W.source}}};var V,J,U;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(U=(J=y.parameters)==null?void 0:J.docs)==null?void 0:U.source}}};var K,Y,Z;k.parameters={...k.parameters,docs:{...(K=k.parameters)==null?void 0:K.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} key={JSON.stringify(args)} />",...(Z=(Y=k.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var Q,X,ee;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:"(args: BreadcrumbsProps) => <Breadcrumbs {...args} />",...(ee=(X=m.parameters)==null?void 0:X.docs)==null?void 0:ee.source}}};const Da=["WithoutLinkOrAction","WithDecoratorAndActionAndRootTruncation","WithDecoratorAndLinkAndCurrentInline","WithBadges","WithDecoratorAndBadge"];export{k as WithBadges,g as WithDecoratorAndActionAndRootTruncation,m as WithDecoratorAndBadge,y as WithDecoratorAndLinkAndCurrentInline,v as WithoutLinkOrAction,Da as __namedExportsOrder,za as default};
