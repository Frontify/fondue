import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{B as x}from"./Box-BnKr_wBm.js";import{B as f}from"./Button-CYWlMQhW.js";import{D as q}from"./DialogBody-Do0JJJbs.js";import{P}from"./constantStories-DEfmjXOT.js";import{I as v}from"./IconJohanna-bTcd8FnJ.js";import{I as W}from"./InlineDialog-Cbvg12Zg.js";import{M as l}from"./dialog-Dre1eVQK.js";import"./_commonjsHelpers-BosuxZz1.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-C-wRS-BS.js";import"./Divider-DCi-HcbY.js";import"./FormControl-D7P3KZv0.js";import"./InputLabel-Cb39M_3M.js";import"./TooltipIcon-DgUrnRFN.js";import"./LegacyTooltip-BoEBGEhI.js";import"./useLink-DorAuuFQ.js";import"./useFocusable-CAGu0lKI.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./usePopper-ByXn8U-3.js";import"./index-BxibOwXx.js";import"./index-CfyPTyT-.js";import"./Portal-By7XnO0v.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./IconQuestionMarkCircle-C_agVHg1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CZrma5le.js";import"./SegmentedControls-D3WaRgzO.js";import"./useFormValidationState-Vs0Uifwm.js";import"./FocusScope-DYM0gkGr.js";import"./useField-BhCfq6jD.js";import"./useLabels-DH9bA-v0.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-YFPGrsWM.js";import"./useControlledState-C0C-dzuH.js";import"./motion-C48bHxkn.js";import"./Switch-28jLeicn.js";import"./TabItem-DYJEWVSF.js";import"./elements-BOYmskOL.js";import"./TextInput-BJ6WSDaF.js";import"./IconEyeOff-Dzh4tjis.js";import"./IconCross-Bt-I3opn.js";import"./Tooltip-DYRhLsHJ.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-I0EzvwWK.js";import"./Tree-CVMTatqj.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-IS3l0vsO.js";import"./Trigger-BkAUJNF7.js";import"./IconCaretDown-Cxrx1sF_.js";import"./IconCaretDown16-BGp5IVAI.js";import"./IconTrashBin-Bl46mt1V.js";import"./IconTrashBin16-qlTE457i.js";import"./IconTrashBin24-CvdAkIgz.js";import"./useButton-DofEV6SJ.js";const tt={title:"Experimental/InlineDialog",component:W,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:l.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...P,modality:{options:Object.values(l),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}},unsafe_zIndex:{type:"number"}}},g=()=>e.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),t=_=>{const[m,c]=d.useState(!1),u=d.useRef(null);return e.jsxs(x,{className:"tw-w-fit",children:[e.jsx(f,{icon:e.jsx(v,{}),onClick:()=>c(!m),ref:u,children:"Trigger"}),e.jsx(W,{..._,anchor:u,open:m,handleClose:()=>c(!1),children:e.jsx(q,{padding:"comfortable",children:e.jsxs(x,{className:"tw-text-text",children:[e.jsx(g,{}),e.jsx(g,{}),e.jsx(g,{}),e.jsx(f,{onClick:()=>c(!m),children:"Close"})]})})})]})},p=t.bind({}),n=t.bind({});n.args={modality:l.NonModal};const o=t.bind({});o.args={modality:l.Modal};const s=t.bind({});s.args={modality:l.BlockingModal};const r=t.bind({});r.args={maxHeight:300};const a=t.bind({});a.args={autoHeight:!0};const i=t.bind({});i.args={roundedCorners:!1};var B,O,I;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>;
}`,...(I=(O=p.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var h,T,D;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>;
}`,...(D=(T=n.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var C,R,E;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>;
}`,...(E=(R=o.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var y,w,b;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>;
}`,...(b=(w=s.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var N,M,k;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>;
}`,...(k=(M=r.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var H,S,A;a.parameters={...a.parameters,docs:{...(H=a.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>;
}`,...(A=(S=a.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var j,J,L;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="comfortable">
                    <Box className="tw-text-text">
                        <TextExample />
                        <TextExample />
                        <TextExample />
                        <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
                    </Box>
                </DialogBody>
            </InlineDialog>
        </Box>;
}`,...(L=(J=i.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};const nt=["Default","AsANonModal","AsAModal","AsABlockingModal","WithMaxHeight","WithAutoHeight","WithNoRoundedCorners"];export{s as AsABlockingModal,o as AsAModal,n as AsANonModal,p as Default,a as WithAutoHeight,r as WithMaxHeight,i as WithNoRoundedCorners,nt as __namedExportsOrder,tt as default};