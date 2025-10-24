import{r as d,j as e}from"./iframe-DWfSlb0i.js";import{a as x}from"./Box-B8vdQMYS.js";import{B as f}from"./Button-DfZJCDFK.js";import{D as P}from"./DialogBody-BQqzXCEu.js";import{P as v}from"./constantStories-DEfmjXOT.js";import{I as z}from"./IconIcon-CQsZulAl.js";import{I as _}from"./InlineDialog-Bcr1dQGC.js";import{M as l}from"./dialog-D9O7a7Fm.js";import"./preload-helper-sQDyWCwb.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DJgw3DOR.js";import"./Checkbox-3AnZEutj.js";import"./useFocusable-DOCSmQza.js";import"./useFocusRing-DXr4GaW4.js";import"./useEffectEvent-CI6MWEdz.js";import"./chain-BD6ckHh_.js";import"./index-RS2pu7zh.js";import"./useFormValidationState-A3yoOfI8.js";import"./useControlledState-DnAESSBa.js";import"./InputLabel-vAeK8DpM.js";import"./TooltipIcon-loeESxcb.js";import"./LegacyTooltip-8KnSS8qw.js";import"./useLink-DD_m4zw3.js";import"./usePopper-DE0FsvRn.js";import"./index-C2E5ku4L.js";import"./Portal--5uNvX5p.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D3p_iY0w.js";import"./IconCheckMark-CWf5DU7H.js";import"./IconExclamationMarkCircle24-CzamvZqc.js";import"./IconExclamationMarkTriangle-BTKn1CzC.js";import"./IconExclamationMarkTriangle24-BF-tkgi1.js";import"./IconQuestionMarkCircle-BhvUbj5E.js";import"./IconMinus-DuFXUXkh.js";import"./Divider-DnBABlP5.js";import"./Dropdown-BHsiTQV7.js";import"./useButton-kVvP6TUN.js";import"./FocusScope-BTNrxNkp.js";import"./useOverlayTriggerState-DWWP11B4.js";import"./useMenuTrigger-Du4Opddv.js";import"./useLabels-CvtAt0UP.js";import"./useLocalizedStringFormatter-C7DvXs9K.js";import"./context-hKhapaoN.js";import"./VisuallyHidden-DZNryNZ3.js";import"./helper-vBDadUUD.js";import"./keyboard-CWtqk4ZZ.js";import"./SelectionManager-zjrIR6Hq.js";import"./useField-Bh5nUEEB.js";import"./MenuItem-CVfzkKbS.js";import"./IconCaretRight-B8cJ3Bt3.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C5zj3N-A.js";import"./Trigger-BpYCVTVr.js";import"./IconCaretDown-CS4fl5qd.js";import"./IconCaretDown16-DXYTdGKY.js";import"./IconCross-BkSH3053.js";import"./IconTrashBin16-C5mIjvXn.js";import"./IconTrashBin24-B9qsB300.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-T0srCoF2.js";import"./FormControl-ny2reeax.js";import"./Switch-D2be-V_f.js";import"./TabItem-C-vbuzzy.js";import"./TextInput-_VQAd_TX.js";import"./Tooltip-jPx8IgnA.js";import"./useClickOutside-C0rCeFHZ.js";import"./Tree-ClX99oC1.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconIcon16-CxY4vcIz.js";import"./IconIcon24-CwAEmp0G.js";const at={title:"Experimental/InlineDialog",component:_,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:l.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...v,modality:{options:Object.values(l),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}},unsafe_zIndex:{type:"number"}}},g=()=>e.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),t=q=>{const[m,c]=d.useState(!1),u=d.useRef(null);return e.jsxs(x,{className:"tw-w-fit",children:[e.jsx(f,{icon:e.jsx(z,{}),onClick:()=>c(!m),ref:u,children:"Trigger"}),e.jsx(_,{...q,anchor:u,open:m,handleClose:()=>c(!1),children:e.jsx(P,{padding:"comfortable",children:e.jsxs(x,{className:"tw-text-text",children:[e.jsx(g,{}),e.jsx(g,{}),e.jsx(g,{}),e.jsx(f,{onClick:()=>c(!m),children:"Close"})]})})})]})},p=t.bind({}),n=t.bind({});n.args={modality:l.NonModal};const o=t.bind({});o.args={modality:l.Modal};const s=t.bind({});s.args={modality:l.BlockingModal};const r=t.bind({});r.args={maxHeight:300};const i=t.bind({});i.args={autoHeight:!0};const a=t.bind({});a.args={roundedCorners:!1};var B,I,O;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
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
