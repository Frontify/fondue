import{r as d,j as e}from"./iframe-e0U6nGdg.js";import{a as x}from"./Box-CcTnB5oC.js";import{B as f}from"./Button-Ctisb_6d.js";import{D as P}from"./DialogBody-Dx17wxf9.js";import{P as v}from"./constantStories-DEfmjXOT.js";import{I as z}from"./IconIcon-DYkysxgB.js";import{I as _}from"./InlineDialog-BSNjkb70.js";import{M as l}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CdSZxFhx.js";import"./Checkbox-D4Z7gexS.js";import"./useFocusable-C6iyQpXI.js";import"./useFocusRing-DSof9HDA.js";import"./useEffectEvent-Dhi-9t88.js";import"./chain-DPcgUXMv.js";import"./index-D5FaRCKO.js";import"./useFormValidationState-C2mn5rNF.js";import"./useControlledState-BpQJraUT.js";import"./InputLabel-CFiujHKp.js";import"./TooltipIcon-CNBwvO0d.js";import"./LegacyTooltip-DKPRkd1X.js";import"./useLink-CL9Z2HKk.js";import"./usePopper-Cpih_rft.js";import"./index-98LXcvpt.js";import"./Portal-VBGCNkL3.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CqqrNheS.js";import"./IconCheckMark-CfVKgjOK.js";import"./IconExclamationMarkCircle24-B6aWDheE.js";import"./IconExclamationMarkTriangle-U04woIfm.js";import"./IconExclamationMarkTriangle24-CAomuIhH.js";import"./IconQuestionMarkCircle-DyI4ZTBV.js";import"./IconMinus-EZG3KcaU.js";import"./Divider-CdfwzZMT.js";import"./Dropdown-lFxzrlsx.js";import"./useButton-Bcy8TYTN.js";import"./FocusScope-BSeNmLNv.js";import"./useOverlayTriggerState-BQIEtMUz.js";import"./useMenuTrigger-CORkgcEy.js";import"./useLabels-Bh4FvyUH.js";import"./useLocalizedStringFormatter-CR04K9do.js";import"./context-CWMRxbca.js";import"./VisuallyHidden-CLSFgs5F.js";import"./helper-C2pKKaKh.js";import"./keyboard-CE97L4wN.js";import"./SelectionManager-BKU4lwyk.js";import"./useField-59HGCYzs.js";import"./MenuItem-B4scu5yA.js";import"./IconCaretRight-yWjutZzx.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Cs7quV73.js";import"./Trigger-Cxb9EGeR.js";import"./IconCaretDown-OtaJb8ue.js";import"./IconCaretDown16-LpGbVMin.js";import"./IconCross-ug7GD-W-.js";import"./IconTrashBin16-CWZYWSrk.js";import"./IconTrashBin24-CQrz4dri.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DoN8BKVL.js";import"./FormControl-BlwtdXQF.js";import"./Switch-CfCV9d5U.js";import"./TabItem-C65zp8VY.js";import"./TextInput-BnQ0OsaS.js";import"./Tooltip-DjWQa5nG.js";import"./useClickOutside-DuZ-KBg9.js";import"./Tree-Cnd7JCjb.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconIcon16--szuSDKW.js";import"./IconIcon24-yvVAivXL.js";const at={title:"Experimental/InlineDialog",component:_,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:l.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...v,modality:{options:Object.values(l),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}},unsafe_zIndex:{type:"number"}}},g=()=>e.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),t=q=>{const[m,c]=d.useState(!1),u=d.useRef(null);return e.jsxs(x,{className:"tw-w-fit",children:[e.jsx(f,{icon:e.jsx(z,{}),onClick:()=>c(!m),ref:u,children:"Trigger"}),e.jsx(_,{...q,anchor:u,open:m,handleClose:()=>c(!1),children:e.jsx(P,{padding:"comfortable",children:e.jsxs(x,{className:"tw-text-text",children:[e.jsx(g,{}),e.jsx(g,{}),e.jsx(g,{}),e.jsx(f,{onClick:()=>c(!m),children:"Close"})]})})})]})},p=t.bind({}),n=t.bind({});n.args={modality:l.NonModal};const o=t.bind({});o.args={modality:l.Modal};const s=t.bind({});s.args={modality:l.BlockingModal};const r=t.bind({});r.args={maxHeight:300};const i=t.bind({});i.args={autoHeight:!0};const a=t.bind({});a.args={roundedCorners:!1};var B,I,O;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(O=(I=p.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var h,T,D;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(k=(M=r.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var H,S,A;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(A=(S=i.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var j,L,W;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Box className="tw-w-fit">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(W=(L=a.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const lt=["Default","AsANonModal","AsAModal","AsABlockingModal","WithMaxHeight","WithAutoHeight","WithNoRoundedCorners"];export{s as AsABlockingModal,o as AsAModal,n as AsANonModal,p as Default,i as WithAutoHeight,r as WithMaxHeight,a as WithNoRoundedCorners,lt as __namedExportsOrder,at as default};
