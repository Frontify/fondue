import{j as s}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{f as xe,o as r}from"./fondue-icons349-izFEZ7jD.js";import{a as o}from"./index-B-lxVbXh.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";const fe="_root_1sqdc_1",he={root:fe},Te=e=>{if(e)return`rgba(${e.red}, ${e.green}, ${e.blue}, ${e.alpha??1})`},Be=["default","positive","highlight","warning","negative"],ve=e=>typeof e=="string"&&Be.includes(e),le=({status:e})=>{const t=ve(e)?{"data-status":e}:{style:{backgroundColor:typeof e=="string"?e:Te(e)||"transparent"}};return s.jsx("div",{"data-test-id":"badge-status",className:he.root,...t})};le.__docgenInfo={description:"",methods:[],displayName:"BadgeStatus"};const Ce="_root_bgze9_3",je="_dismiss_bgze9_161",ce={root:Ce,dismiss:je},a=({"aria-label":e,"data-test-id":t="badge",children:i,disabled:n=!1,dismissable:d=!1,emphasis:l="strong",onClick:b,onDismiss:ue,size:me="default",status:ge,title:j,variant:pe})=>{const w={"aria-label":e||j,"data-disabled":n,"data-dismissable":d,"data-emphasis":l,"data-size":me,"data-test-id":t,"data-variant":pe,className:ce.root,title:j},y={"aria-label":e||j,disabled:n,dismissable:d,onDismiss:ue,status:ge};return b?s.jsx("button",{disabled:n,...w,onClick:b,children:s.jsx(S,{...y,children:i})}):s.jsx("div",{...w,children:s.jsx(S,{...y,children:i})})},S=({"aria-label":e,children:t,disabled:i=!1,dismissable:n=!1,onDismiss:d,status:l})=>s.jsxs(s.Fragment,{children:[l&&s.jsx(le,{status:l}),t,n&&s.jsx("button",{"aria-label":`Dismiss ${e}`,className:ce.dismiss,disabled:i,onClick:d,children:s.jsx(xe,{size:"12"})})]});a.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{emphasis:{required:!1,tsType:{name:"union",raw:"'strong' | 'weak'",elements:[{name:"literal",value:"'strong'"},{name:"literal",value:"'weak'"}]},description:"@default 'strong'",defaultValue:{value:"'strong'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'positive' | 'highlight' | 'warning' | 'negative'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'highlight'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'negative'"}]},description:"@default 'default'"},size:{required:!1,tsType:{name:"union",raw:"'default' | 'small'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'small'"}]},description:"@default 'default'",defaultValue:{value:"'default'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"@default false",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:"Click handler"},dismissable:{required:!1,tsType:{name:"boolean"},description:"@default false",defaultValue:{value:"false",computed:!1}},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:"Click handler on dismiss"},status:{required:!1,tsType:{name:"union['status']",raw:"BadgeStatusProps['status']"},description:"The color of the status dot"},title:{required:!1,tsType:{name:"string"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'badge'",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const Ie={title:"Components/Badge",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},args:{emphasis:"strong",variant:"default",size:"default",dismissable:!1,disabled:!1,status:void 0}},c={render:e=>s.jsx(a,{...e,children:"Text"})},u={args:{onClick:o("onClick")},render:e=>s.jsx(a,{...e,children:"Text"})},m={args:{dismissable:!0,onDismiss:o("onDismiss")},render:e=>s.jsx(a,{...e,children:"Text"})},g={args:{onClick:o("onClick"),dismissable:!0,onDismiss:o("onDismiss")},render:e=>s.jsx(a,{...e,children:"Text"})},p={args:{status:"positive"},render:e=>s.jsx(a,{...e,children:"Text"})},x={args:{status:{red:40,green:200,blue:100,alpha:1}},render:e=>s.jsx(a,{...e,children:"Text"})},f={args:{status:"#f14394"},render:e=>s.jsx(a,{...e,children:"Text"})},h={render:e=>s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]})},T={args:{onClick:o("onClick")},render:e=>s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]})},B={args:{status:"positive"},render:e=>s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]})},v={args:{status:"positive"},render:e=>s.jsxs(s.Fragment,{children:["before"," ",s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]})," ","after"]})},C={args:{status:"positive"},render:e=>s.jsxs("div",{className:"tw-flex tw-flex-nowrap tw-border tw-border-line tw-rounded tw-p-2 tw-gap-2",children:[s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]}),s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]}),s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]}),s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]}),s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]}),s.jsxs(a,{...e,children:[s.jsx(r,{size:"16"})," Text"]})]})};var z,k,I;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <Badge {...args}>Text</Badge>
}`,...(I=(k=c.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var W,E,M;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(M=(E=u.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var _,D,q;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    dismissable: true,
    onDismiss: action('onDismiss')
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(q=(D=m.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};var F,O,N;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick'),
    dismissable: true,
    onDismiss: action('onDismiss')
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(N=(O=g.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var L,$,A;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(A=($=p.parameters)==null?void 0:$.docs)==null?void 0:A.source}}};var H,V,P;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    status: {
      red: 40,
      green: 200,
      blue: 100,
      alpha: 1
    }
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(P=(V=x.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};var R,G,J;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    status: '#f14394'
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(J=(G=f.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,U;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(U=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;T.parameters={...T.parameters,docs:{...(X=T.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(Z=(Y=T.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,se,ae;B.parameters={...B.parameters,docs:{...(ee=B.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(ae=(se=B.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var re,te,ne;v.parameters={...v.parameters,docs:{...(re=v.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <>
            before{' '}
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>{' '}
            after
        </>
}`,...(ne=(te=v.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,ie,de;C.parameters={...C.parameters,docs:{...(oe=C.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <div className="tw-flex tw-flex-nowrap tw-border tw-border-line tw-rounded tw-p-2 tw-gap-2">
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
        </div>
}`,...(de=(ie=C.parameters)==null?void 0:ie.docs)==null?void 0:de.source}}};const We=["LabelOnly","WithOnClick","WithDismiss","WithOnClickAndDismiss","WithStatus","WithCustomStatusColor","WithCustomStatusString","WithIcon","WithOnClickAndIcon","WithStatusAndIcon","BetweenElements","MultipleBadgesInRow"];export{v as BetweenElements,c as LabelOnly,C as MultipleBadgesInRow,x as WithCustomStatusColor,f as WithCustomStatusString,m as WithDismiss,h as WithIcon,u as WithOnClick,g as WithOnClickAndDismiss,T as WithOnClickAndIcon,p as WithStatus,B as WithStatusAndIcon,We as __namedExportsOrder,Ie as default};
