import{j as l}from"./jsx-runtime-BSxFkHFN.js";import{r as E}from"./index-i66itsuO.js";import{P as q}from"./index-C1IPneNV.js";import{s as R,c as D}from"./styleUtilities-rhQWLmVU.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CKhSlaqw.js";var I="Separator",p="horizontal",_=["horizontal","vertical"],P=E.forwardRef((e,d)=>{const{decorative:c,orientation:a=p,...m}=e,r=k(a)?a:p,V=c?{role:"none"}:{"aria-orientation":r==="vertical"?r:void 0,role:"separator"};return l.jsx(q.div,{"data-orientation":r,...V,...m,ref:d})});P.displayName=I;function k(e){return _.includes(e)}var A=P;const H=R({base:"tw-flex tw-self-stretch tw-justify-center ",variants:{direction:{horizontal:"tw-flex-col tw-h-0 tw-border-t tw-w-full",vertical:"tw-flex-row tw-w-0 tw-border-r tw-h-full "},color:{weak:"tw-border-line-weak",default:"tw-border-line",strong:"tw-border-line-strong","x-strong":"tw-border-x-line-strong"},variant:{solid:"tw-border-solid",dashed:"tw-border-dashed",noline:"tw-border-none"}},compoundVariants:[{direction:"horizontal",padding:"small",class:"tw-my-4"},{direction:"horizontal",padding:"medium",class:"tw-my-7"},{direction:"horizontal",padding:"large",class:"tw-my-12"},{direction:"vertical",padding:"small",class:"tw-mx-4"},{direction:"vertical",padding:"medium",class:"tw-mx-7"},{direction:"vertical",padding:"large",class:"tw-mx-12"}],defaultVariants:{padding:"medium",direction:"horizontal",color:"default",variant:"solid"}}),u=E.forwardRef(({"data-test-id":e="fondue-divider",direction:d="horizontal",className:c,variant:a,...m},r)=>l.jsx(A,{ref:r,className:D(H({direction:d,variant:a,...m}),c),"data-test-id":e}));u.displayName="Divider";u.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{variant:{required:!1,tsType:{name:"union",raw:"'noline' | 'dashed' | 'solid'",elements:[{name:"literal",value:"'noline'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'solid'"}]},description:`The style of the divider
@default "solid"`},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The padding of the divider
@default "medium"`},color:{required:!1,tsType:{name:"union",raw:"'weak' | 'default' | 'strong' | 'x-strong'",elements:[{name:"literal",value:"'weak'"},{name:"literal",value:"'default'"},{name:"literal",value:"'strong'"},{name:"literal",value:"'x-strong'"}]},description:`The color of the divider
@default "default"`},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:`The direction of the divider
@default "horizontal"`,defaultValue:{value:"'horizontal'",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-divider'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const K={title:"Components/Divider",component:u,tags:["autodocs"],args:{color:"default",variant:"solid",padding:"medium",direction:"horizontal"},parameters:{status:{type:"released"}}},t={args:{}},o={args:{color:"strong"}},i={args:{variant:"dashed"}},s={args:{padding:"large"}},n={args:{direction:"vertical"},decorators:[e=>l.jsx("div",{className:"tw-h-8",children:l.jsx(e,{})})]};var v,g,f;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {}
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var w,h,y;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    color: 'strong'
  }
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var x,T,z;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'dashed'
  }
}`,...(z=(T=i.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var S,N,b;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    padding: 'large'
  }
}`,...(b=(N=s.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var C,O,j;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    direction: 'vertical'
  },
  decorators: [Story => <div className="tw-h-8">
                <Story />
            </div>]
}`,...(j=(O=n.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};const Q=["Primary","CustomColor","CustomStyle","CustomHeight","Vertical"];export{o as CustomColor,s as CustomHeight,i as CustomStyle,t as Primary,n as Vertical,Q as __namedExportsOrder,K as default};
