import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{B as n}from"./Button-CdZo6GQP.js";import{r as s}from"./index-BwDkhjyp.js";import{e as xe}from"./fondue-icons311-o6oMneN6.js";import{R as Fe,T as be,P as je,C as Ce,a as ve}from"./index-aB6GAAOH.js";import{s as Be}from"./styleUtilities-T76WvCte.js";import"./focusStyle-bf47-NfQ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-CtQTvCEI.js";import"./index-bQ6N_mn_.js";import"./index-B8XB3FuZ.js";import"./index-BWD2N0gV.js";import"./index-DqZMU0In.js";import"./index-Dnvi1HwD.js";import"./index-KKNPlsPu.js";import"./index-BVRQrly-.js";import"./index-DvFXlkvt.js";import"./index-CXfIVGy4.js";const Te=Be({base:'tw-block tw-bg-base tw-shadow-mid tw-border tw-border-line tw-w-full sm:tw-w-fit sm:tw-max-w-[--flyout-max-width] tw-group tw-mt-4 sm:tw-mt-0 [body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:tw-p-2 [body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:tw-w-screen [body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:!tw-translate-x-0 [body>[data-radix-popper-content-wrapper]:has(&)]:max-sm:!tw-translate-y-0 before:tw-fixed tw-content-[""] before:tw-top-0 before:tw-left-0 before:tw-h-screen before:tw-w-screen before:tw-bg-black before:tw-opacity-30 before:tw-z-[-1] before:tw-pointer-events-none sm:before:tw-hidden',variants:{rounded:{true:"tw-rounded",false:""}},defaultVariants:{rounded:!0}}),Re="tw-flex tw-justify-between tw-items-center tw-border-b tw-border-line tw-font-medium group-data-[flyout-spacing=compact]:tw-p-4 group-data-[flyout-spacing=comfortable]:tw-p-6 group-data-[flyout-spacing=spacious]:tw-p-10 ",qe="tw-flex tw-justify-end tw-gap-2 tw-border-t tw-border-line tw-font-medium group-data-[flyout-spacing=compact]:tw-p-4 group-data-[flyout-spacing=comfortable]:tw-p-6 group-data-[flyout-spacing=spacious]:tw-p-10 ",He="tw-flex tw-flex-col tw-gap-4 group-data-[flyout-spacing=compact]:tw-px-4 group-data-[flyout-spacing=compact]:tw-py-2 group-data-[flyout-spacing=comfortable]:tw-px-6 group-data-[flyout-spacing=comfortable]:tw-py-4 group-data-[flyout-spacing=spacious]:tw-px-10 group-data-[flyout-spacing=spacious]:tw-py-6 ",b=({children:o,...r})=>e.jsx(Fe,{...r,children:o});b.displayName="Flyout.Root";const j=({children:o,"data-test-id":r="fondue-flyout-trigger"},a)=>e.jsx(be,{"data-test-id":r,asChild:!0,ref:a,children:o});j.displayName="Flyout.Trigger";const C=({align:o="start",maxWidth:r="360px",padding:a="compact","data-test-id":R="fondue-flyout-content",children:he,...q},we)=>e.jsx(je,{children:e.jsx(Ce,{style:{"--flyout-max-width":r},ref:we,align:o,collisionPadding:8,sideOffset:8,className:Te({...q}),"data-flyout-spacing":a,"data-test-id":R,...q,children:he})});C.displayName="Flyout.Content";const v=({showCloseButton:o,children:r,"data-test-id":a="fondue-flyout-header"},R)=>e.jsxs("div",{"data-test-id":a,ref:R,className:Re,children:[e.jsx("div",{children:r}),o&&e.jsx(ve,{role:"button","data-test-id":`${a}-close`,className:"tw-cursor-pointer",children:e.jsx(xe,{size:20})})]});v.displayName="Flyout.Header";const B=({children:o,"data-test-id":r="fondue-flyout-footer"},a)=>e.jsx("div",{"data-test-id":r,ref:a,className:qe,children:o});B.displayName="Flyout.Footer";const T=({children:o,"data-test-id":r="fondue-flyout-body"},a)=>e.jsx("div",{"data-test-id":r,ref:a,"data-flyout-spacing":"compact",className:He,children:o});T.displayName="Flyout.Body";const t={Root:b,Trigger:s.forwardRef(j),Content:s.forwardRef(C),Header:s.forwardRef(v),Footer:s.forwardRef(B),Body:s.forwardRef(T)};b.__docgenInfo={description:"",methods:[],displayName:"Flyout.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the flyout\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};j.__docgenInfo={description:"",methods:[],displayName:"Flyout.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-flyout-trigger'",computed:!1}}}};C.__docgenInfo={description:"",methods:[],displayName:"Flyout.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the flyout
@default true`},side:{required:!1,tsType:{name:"union",raw:"'top' | 'right' | 'bottom' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'right'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"}]},description:`Define the prefered side of the flyout. Can be overriden by viewport collisions viewport.
@default "bottom"`},align:{required:!1,tsType:{name:"union",raw:"'start' | 'center' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'center'"},{name:"literal",value:"'end'"}]},description:`Define the prefered alignment of the flyout. Can be overriden by viewport collisions viewport.
@default "start"`,defaultValue:{value:"'start'",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the flyout
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define the maximum width of the flyout
@default "360px"`,defaultValue:{value:"'360px'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-flyout-content'",computed:!1}}}};v.__docgenInfo={description:"",methods:[],displayName:"Flyout.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default false`},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-flyout-header'",computed:!1}}}};B.__docgenInfo={description:"",methods:[],displayName:"Flyout.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-flyout-footer'",computed:!1}}}};T.__docgenInfo={description:"",methods:[],displayName:"Flyout.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-flyout-body'",computed:!1}}}};const Je={component:C,subcomponents:{"Flyout.Root":b,"Flyout.Trigger":j,"Flyout.Header":v,"Flyout.Body":T,"Flyout.Footer":B},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{children:"Hello World"},render:({...o})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(n,{children:"Open flyout"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{showCloseButton:!0,children:"Header"}),e.jsx(t.Body,{...o}),e.jsx(t.Footer,{children:e.jsxs("div",{className:"tw-flex tw-justify-end tw-gap-2",children:[e.jsx(n,{emphasis:"default",children:"Cancel"}),e.jsx(n,{children:"Submit"})]})})]})]})},i={args:{children:"Hello World"},render:({...o})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(n,{children:"Open flyout"})}),e.jsx(t.Content,{...o,children:e.jsx(t.Body,{...o})})]})},d={render:({...o})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(n,{children:"Open flyout"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:"Header"}),e.jsx(t.Body,{children:"I am a flyout"})]})]})},l={render:({...o})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(n,{children:"Open flyout"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Body,{children:"I am a flyout"}),e.jsx(t.Footer,{children:e.jsx(n,{children:"Submit"})})]})]})},u={},c={render:({...o})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(n,{children:"Open flyout"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{showCloseButton:!0,children:"Header"}),e.jsx(t.Body,{children:"I am a flyout"})]})]})},p={args:{padding:"comfortable"}},m={args:{padding:"spacious"}},y={render:({...o})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(n,{children:"Open flyout"})}),e.jsx(t.Content,{...o,children:e.jsx("div",{className:"tw-bg-box-neutral tw-p-10",children:"This is FlyoutContent"})})]})},f={args:{side:"right"}},g={args:{side:"right",align:"center"}},h={args:{side:"right",align:"end"}},w={args:{side:"bottom",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}},x={args:{maxWidth:"200px",side:"bottom",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}},F={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},render:({...o})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(n,{children:"Open flyout"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{showCloseButton:!0,children:"Header"}),e.jsx(t.Body,{children:"I am a flyout"}),e.jsx(t.Footer,{children:e.jsx(n,{children:"Submit"})})]})]})};var H,S,N;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: ({
    ...args
  }) => {
    return <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Body {...args} />
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(N=(S=i.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var W,O,_;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    return <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(_=(O=d.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var I,V,D;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    return <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                    <Flyout.Footer>
                        <Button>Submit</Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(D=(V=l.parameters)==null?void 0:V.docs)==null?void 0:D.source}}};var A,P,E;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:"{}",...(E=(P=u.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var L,M,U;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    return <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header showCloseButton>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(U=(M=c.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};var k,z,$;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    padding: 'comfortable'
  }
}`,...($=(z=p.parameters)==null?void 0:z.docs)==null?void 0:$.source}}};var G,J,K;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    padding: 'spacious'
  }
}`,...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    return <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <div className="tw-bg-box-neutral tw-p-10">This is FlyoutContent</div>
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(Y=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,te;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    side: 'right'
  }
}`,...(te=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var oe,re,ne;g.parameters={...g.parameters,docs:{...(oe=g.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    side: 'right',
    align: 'center'
  }
}`,...(ne=(re=g.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ae,se,ie;h.parameters={...h.parameters,docs:{...(ae=h.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    side: 'right',
    align: 'end'
  }
}`,...(ie=(se=h.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,le,ue;w.parameters={...w.parameters,docs:{...(de=w.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    side: 'bottom',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
}`,...(ue=(le=w.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var ce,pe,me;x.parameters={...x.parameters,docs:{...(ce=x.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    maxWidth: '200px',
    side: 'bottom',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
}`,...(me=(pe=x.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ye,fe,ge;F.parameters={...F.parameters,docs:{...(ye=F.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => {
    return <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Open flyout</Button>
                </Flyout.Trigger>
                <Flyout.Content {...args}>
                    <Flyout.Header showCloseButton>Header</Flyout.Header>
                    <Flyout.Body>I am a flyout</Flyout.Body>
                    <Flyout.Footer>
                        <Button>Submit</Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(ge=(fe=F.parameters)==null?void 0:fe.docs)==null?void 0:ge.source}}};const Ke=["BasicContent","WithHeader","WithFooter","WithHeaderAndFooter","WithCloseButton","WithComfortablePadding","WithSpaciousPadding","WithCustomContent","RightSide","AlignCenter","AlignEnd","LongContent","WithCustomMaxWidth","MobileView"];export{g as AlignCenter,h as AlignEnd,i as BasicContent,w as LongContent,F as MobileView,f as RightSide,c as WithCloseButton,p as WithComfortablePadding,y as WithCustomContent,x as WithCustomMaxWidth,l as WithFooter,d as WithHeader,u as WithHeaderAndFooter,m as WithSpaciousPadding,Ke as __namedExportsOrder,Je as default};
