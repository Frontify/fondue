import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{B as a}from"./Button-Bo6Vtvpg.js";import{r as s}from"./index-DtJulBIN.js";import{e as pe}from"./fondue-icons311-Cyz8yLVl.js";import{R as ge,T as he,P as fe,O as ve,C as De,a as ne,b as xe,D as be}from"./index-BUCNDy4D.js";import"./styleUtilities-C-w4CMuR.js";import"./focusStyle-bf47-NfQ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DYI_kRwo.js";import"./index-BXb1vBm7.js";import"./index-CPetyYMB.js";import"./index-P-l_ls5c.js";import"./index-DBH0Kh6a.js";import"./index-JE4YMgsZ.js";import"./index-7-GaE7yE.js";import"./index-BdiAIZ0C.js";const qe="_content_1tu78_5",je="_header_1tu78_48",Ce="_footer_1tu78_49",ye="_body_1tu78_52",Te="_underlay_1tu78_63",we="_sideContent_1tu78_74",r={content:qe,header:je,footer:Ce,body:ye,underlay:Te,sideContent:we},D=({children:i,...n})=>e.jsx(ge,{...n,children:i});D.displayName="Dialog.Root";const x=({children:i,"data-test-id":n="fondue-dialog-trigger"},o)=>e.jsx(he,{"data-test-id":n,asChild:!0,ref:o,children:i});x.displayName="Dialog.Trigger";const b=({maxWidth:i="800px",minWidth:n="400px",minHeight:o="200px",padding:oe="compact",verticalAlign:se="center","data-test-id":re="fondue-dialog-content",showUnderlay:le=!1,children:ue,rounded:de=!0,...ce},me)=>e.jsxs(fe,{children:[e.jsx(ve,{"data-visible":le,className:r.underlay}),e.jsx(De,{style:{"--dialog-max-width":i,"--dialog-min-width":n,"--dialog-min-height":o},ref:me,className:r.content,"data-dialog-rounded":de,"data-dialog-spacing":oe,"data-test-id":re,"data-dialog-vertical-align":se,...ce,children:ue})]});b.displayName="Dialog.Content";const q=({children:i,"data-test-id":n="fondue-dialog-header"},o)=>e.jsxs("div",{"data-test-id":n,ref:o,className:r.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:i}),e.jsx(ne,{role:"button","data-test-id":`${n}-close`,className:"tw-cursor-pointer",children:e.jsx(pe,{size:20})})]});q.displayName="Dialog.Header";const B=({children:i,"data-test-id":n="fondue-dialog-footer"},o)=>e.jsx("div",{"data-test-id":n,ref:o,className:r.footer,"data-dialog-layout-component":!0,children:i});B.displayName="Dialog.Footer";const j=({children:i,"data-test-id":n="fondue-dialog-body"},o)=>e.jsx("div",{"data-test-id":n,ref:o,className:r.body,"data-dialog-layout-component":!0,children:i});j.displayName="Dialog.Body";const C=({children:i,"data-test-id":n="fondue-dialog-side-content"},o)=>e.jsx("div",{"data-test-id":n,ref:o,className:r.sideContent,"data-dialog-layout-component":!0,children:i});C.displayName="Dialog.SideContent";const y=({children:i})=>e.jsx(ne,{asChild:!0,children:i});y.displayName="Dialog.Close";const T=({children:i,asChild:n})=>e.jsx(xe,{asChild:n,children:i});T.displayName="Dialog.Title";const w=({children:i,asChild:n})=>e.jsx(be,{asChild:n,children:i});w.displayName="Dialog.Description";const t={Root:D,Title:T,Description:w,Close:y,Trigger:s.forwardRef(x),Content:s.forwardRef(b),Header:s.forwardRef(q),Footer:s.forwardRef(B),Body:s.forwardRef(j),SideContent:s.forwardRef(C)};D.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};b.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a maximum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};q.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};B.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};j.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};C.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};y.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};T.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Ue={component:b,subcomponents:{"Dialog.Root":D,"Dialog.Trigger":x,"Dialog.SideContent":C,"Dialog.Header":q,"Dialog.Body":j,"Dialog.Title":T,"Dialog.Description":w,"Dialog.Close":y},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},l={args:{children:"I am a dialog content"}},u={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i})]})]})},d={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},c={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Body,{...i})]})]})},m={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},p={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(t.Close,{children:e.jsx(a,{emphasis:"default",children:"Cancel"})}),e.jsx(a,{children:"Submit"})]})]})]})},g={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Dialog Header"})}),e.jsx(t.Body,{children:e.jsx(t.Description,{children:i.children})}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},h={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{children:e.jsx(t.Description,{asChild:!0,children:e.jsx("p",{children:i.children})})}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},f={args:{verticalAlign:"top"}},v={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}};var N,R,S;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(S=(R=l.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var _,F,H;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(H=(F=u.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var O,I,E;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(E=(I=d.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};var A,V,M;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(M=(V=c.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var W,P,L;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(L=(P=m.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var U,J,k;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title asChild>
                            <h2>Dialog Header</h2>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Dialog.Close>
                            <Button emphasis="default">Cancel</Button>
                        </Dialog.Close>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(k=(J=p.parameters)==null?void 0:J.docs)==null?void 0:k.source}}};var z,$,G;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title>Dialog Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Dialog.Description>{args.children}</Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(G=($=g.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var K,Q,X;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title asChild>
                            <h2>Dialog Header</h2>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Dialog.Description asChild>
                            <p>{args.children}</p>
                        </Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(X=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(ee=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ie,ae;v.parameters={...v.parameters,docs:{...(te=v.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
  args: {
    children: 'Hello World'
  }
}`,...(ae=(ie=v.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};const Je=["WithFullLayout","WithHeader","WithFooter","WithSideContent","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","TopAligned","MobileView"];export{v as MobileView,f as TopAligned,g as WithAnnouncedDescription,h as WithCustomElementAnnouncements,p as WithCustomElementForClose,d as WithFooter,l as WithFullLayout,u as WithHeader,m as WithLongText,c as WithSideContent,Je as __namedExportsOrder,Ue as default};
