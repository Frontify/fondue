import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r}from"./index-BwDkhjyp.js";import{B as a}from"./Button-BDfP30S5.js";import{e as qe}from"./fondue-icons311-o6oMneN6.js";import{R as je,T as Ce,P as Te,O as ye,C as we,a as pe,b as Be,D as Ne}from"./index-DCiFP9nt.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-C-w4CMuR.js";import"./focusStyle-IgMhxCMT.js";import"./index-CtQTvCEI.js";import"./index-bQ6N_mn_.js";import"./index-B8XB3FuZ.js";import"./index-BWD2N0gV.js";import"./index-KKNPlsPu.js";import"./index-DqZMU0In.js";import"./index-Dmzo-8pR.js";import"./index-CXfIVGy4.js";const Re="_content_1tu78_5",Se="_header_1tu78_48",He="_footer_1tu78_49",Oe="_body_1tu78_52",_e="_underlay_1tu78_63",Fe="_sideContent_1tu78_74",s={content:Re,header:Se,footer:He,body:Oe,underlay:_e,sideContent:Fe},q=({children:i,...n})=>e.jsx(je,{...n,children:i});q.displayName="Dialog.Root";const j=({children:i,"data-test-id":n="fondue-dialog-trigger"},o)=>e.jsx(Ce,{"data-test-id":n,asChild:!0,ref:o,children:i});j.displayName="Dialog.Trigger";const C=({maxWidth:i="800px",minWidth:n="400px",minHeight:o="200px",padding:l="compact",verticalAlign:ge="center","data-test-id":he="fondue-dialog-content",showUnderlay:De=!1,children:fe,rounded:ve=!0,...xe},be)=>e.jsxs(Te,{children:[e.jsx(ye,{"data-visible":De,className:s.underlay}),e.jsx(we,{style:{"--dialog-max-width":i,"--dialog-min-width":n,"--dialog-min-height":o},ref:be,className:s.content,"data-dialog-rounded":ve,"data-dialog-spacing":l,"data-test-id":he,"data-dialog-vertical-align":ge,...xe,children:fe})]});C.displayName="Dialog.Content";const T=({children:i,showCloseButton:n=!0,"data-test-id":o="fondue-dialog-header"},l)=>e.jsxs("div",{"data-test-id":o,ref:l,className:s.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:i}),n&&e.jsx(pe,{role:"button","data-test-id":`${o}-close`,className:"tw-cursor-pointer",children:e.jsx(qe,{size:20})})]});T.displayName="Dialog.Header";const S=({children:i,"data-test-id":n="fondue-dialog-footer"},o)=>e.jsx("div",{"data-test-id":n,ref:o,className:s.footer,"data-dialog-layout-component":!0,children:i});S.displayName="Dialog.Footer";const y=({children:i,"data-test-id":n="fondue-dialog-body"},o)=>e.jsx("div",{"data-test-id":n,ref:o,className:s.body,"data-dialog-layout-component":!0,children:i});y.displayName="Dialog.Body";const w=({children:i,"data-test-id":n="fondue-dialog-side-content"},o)=>e.jsx("div",{"data-test-id":n,ref:o,className:s.sideContent,"data-dialog-layout-component":!0,children:i});w.displayName="Dialog.SideContent";const B=({children:i})=>e.jsx(pe,{asChild:!0,children:i});B.displayName="Dialog.Close";const N=({children:i,asChild:n})=>e.jsx(Be,{asChild:n,children:i});N.displayName="Dialog.Title";const R=({children:i,asChild:n})=>e.jsx(Ne,{asChild:n,children:i});R.displayName="Dialog.Description";const t={Root:q,Title:N,Description:R,Close:B,Trigger:r.forwardRef(j),Content:r.forwardRef(C),Header:r.forwardRef(T),Footer:r.forwardRef(S),Body:r.forwardRef(y),SideContent:r.forwardRef(w)};q.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};j.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};C.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a maximum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};T.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};S.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};y.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};w.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};B.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};N.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};R.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Xe={component:C,subcomponents:{"Dialog.Root":q,"Dialog.Trigger":j,"Dialog.SideContent":w,"Dialog.Header":T,"Dialog.Body":y,"Dialog.Title":N,"Dialog.Description":R,"Dialog.Close":B},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},u={args:{children:"I am a dialog content"}},d={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i})]})]})},c={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.Header,{showCloseButton:!0,children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i})]})]})},m={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},p={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Body,{...i})]})]})},g={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},h={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{...i}),e.jsxs(t.Footer,{children:[e.jsx(t.Close,{children:e.jsx(a,{emphasis:"default",children:"Cancel"})}),e.jsx(a,{children:"Submit"})]})]})]})},D={args:{children:"I am a dialog content"},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Dialog Header"})}),e.jsx(t.Body,{children:e.jsx(t.Description,{children:i.children})}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},f={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...i})=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{children:e.jsx(t.Description,{asChild:!0,children:e.jsx("p",{children:i.children})})}),e.jsxs(t.Footer,{children:[e.jsx(a,{emphasis:"default",children:"Cancel"}),e.jsx(a,{children:"Submit"})]})]})]})},v={args:{verticalAlign:"top"}},x={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},b={args:{children:"I am a dialog content"},render:({...i})=>{const[n,o]=r.useState(!1);return e.jsxs(t.Root,{open:n,onOpenChange:l=>{o(l)},children:[e.jsx(t.Trigger,{children:e.jsx(a,{children:"Open dialog"})}),e.jsxs(t.Content,{...i,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...i})]})]})}};var H,O,_;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(_=(O=u.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var F,I,E;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(E=(I=d.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};var A,V,W;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
                    <Dialog.Header showCloseButton>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(W=(V=c.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var M,P,L;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(k=(J=p.parameters)==null?void 0:J.docs)==null?void 0:k.source}}};var z,$,G;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(G=($=g.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var K,Q,X;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(X=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;D.parameters={...D.parameters,docs:{...(Y=D.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(ee=(Z=D.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ie,ae;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(ae=(ie=f.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var ne,oe,re;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(re=(oe=v.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var se,le,ue;x.parameters={...x.parameters,docs:{...(se=x.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(ue=(le=x.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var de,ce,me;b.parameters={...b.parameters,docs:{...(de=b.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return <Dialog.Root open={isDialogOpen} onOpenChange={state => {
      setIsDialogOpen(state);
    }}>
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
}`,...(me=(ce=b.parameters)==null?void 0:ce.docs)==null?void 0:me.source}}};const Ye=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","TopAligned","MobileView","ControlledComponent"];export{b as ControlledComponent,x as MobileView,v as TopAligned,D as WithAnnouncedDescription,c as WithCloseButton,f as WithCustomElementAnnouncements,h as WithCustomElementForClose,m as WithFooter,u as WithFullLayout,d as WithHeader,g as WithLongText,p as WithSideContent,Ye as __namedExportsOrder,Xe as default};
