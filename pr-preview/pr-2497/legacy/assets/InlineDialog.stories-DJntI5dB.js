import{r as d,j as e}from"./iframe-BqDpTz8L.js";import{a as x}from"./Box-yDJFD71A.js";import{B as f}from"./Button-Bkb2ujAG.js";import{D as q}from"./DialogBody-jSfC3Pq3.js";import{P}from"./constantStories-DEfmjXOT.js";import{I as v}from"./IconJohanna-DwpaZlKX.js";import{I as W}from"./InlineDialog-Bnpq8vUX.js";import{M as l}from"./dialog-D9O7a7Fm.js";import"./preload-helper-ByQXrLpA.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CTkk_4sX.js";import"./Divider-BDkhKOpT.js";import"./Dropdown-DIeWOy5O.js";import"./useButton-BGLu1zCr.js";import"./useFocusable-C1aQJPOg.js";import"./useFocusRing-Xgnq7-RG.js";import"./useEffectEvent-CfjbAp9f.js";import"./chain-BF0-ro9P.js";import"./index-D7I4QJ3V.js";import"./FocusScope-CrwMUh0H.js";import"./useOverlayTriggerState-Dxar4kSR.js";import"./useControlledState-DRzZhX7e.js";import"./useMenuTrigger-B-xTmkst.js";import"./useLabels-CShK178M.js";import"./useLocalizedStringFormatter-CT_IKlGg.js";import"./context-Cuf97275.js";import"./VisuallyHidden-Z6NBypG9.js";import"./helper-CawoOU1g.js";import"./keyboard-D68Nodq9.js";import"./SelectionManager-ClMwx0j_.js";import"./useField-BAnoDg69.js";import"./useFormValidationState-BoxxuQfu.js";import"./usePopper-s4jp2qgP.js";import"./index-CY-jsk3T.js";import"./MenuItem-PZQtIurR.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-PlITsN3f.js";import"./IconCheckMark-BbPCPrTa.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BxttBEHu.js";import"./Trigger-DSSj9pCU.js";import"./IconCaretDown-R6whlyjw.js";import"./IconCaretDown16-Bdm0zhQl.js";import"./IconCross-B8K-nVuA.js";import"./IconExclamationMarkTriangle-DRWrILNB.js";import"./IconExclamationMarkTriangle24-XYss3Qca.js";import"./IconTrashBin16-DR0ZRfF3.js";import"./IconTrashBin24-CciGS0Cs.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Dvj5TfsF.js";import"./Portal-B7rzZNWn.js";import"./useMemoizedId-Dw0wROnJ.js";import"./FormControl-DcBQh53j.js";import"./InputLabel-CF4ejW5R.js";import"./TooltipIcon-Dg_9MSCk.js";import"./LegacyTooltip-h-bi0B10.js";import"./useLink-_NQoLbRX.js";import"./IconExclamationMarkCircle24-BixhjAUI.js";import"./IconQuestionMarkCircle-gMiBNDjP.js";import"./Switch-DHEC4TsF.js";import"./TabItem-3JcYdrD1.js";import"./TextInput-CRHj7Htq.js";import"./Tooltip-CMa0Vima.js";import"./useClickOutside-BZvZNjns.js";import"./Tree-4CeaLJ8E.js";import"./_Uint8Array-CwPxMkg2.js";const ot={title:"Experimental/InlineDialog",component:W,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:l.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...P,modality:{options:Object.values(l),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}},unsafe_zIndex:{type:"number"}}},g=()=>e.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),t=_=>{const[m,c]=d.useState(!1),u=d.useRef(null);return e.jsxs(x,{className:"tw-w-fit",children:[e.jsx(f,{icon:e.jsx(v,{}),onClick:()=>c(!m),ref:u,children:"Trigger"}),e.jsx(W,{..._,anchor:u,open:m,handleClose:()=>c(!1),children:e.jsx(q,{padding:"comfortable",children:e.jsxs(x,{className:"tw-text-text",children:[e.jsx(g,{}),e.jsx(g,{}),e.jsx(g,{}),e.jsx(f,{onClick:()=>c(!m),children:"Close"})]})})})]})},p=t.bind({}),n=t.bind({});n.args={modality:l.NonModal};const o=t.bind({});o.args={modality:l.Modal};const s=t.bind({});s.args={modality:l.BlockingModal};const r=t.bind({});r.args={maxHeight:300};const a=t.bind({});a.args={autoHeight:!0};const i=t.bind({});i.args={roundedCorners:!1};var B,O,I;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
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
}`,...(L=(J=i.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};const st=["Default","AsANonModal","AsAModal","AsABlockingModal","WithMaxHeight","WithAutoHeight","WithNoRoundedCorners"];export{s as AsABlockingModal,o as AsAModal,n as AsANonModal,p as Default,a as WithAutoHeight,r as WithMaxHeight,i as WithNoRoundedCorners,st as __namedExportsOrder,ot as default};
