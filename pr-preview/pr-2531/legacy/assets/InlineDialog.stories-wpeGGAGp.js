import{r as d,j as e}from"./iframe-ahMwwdsf.js";import{a as x}from"./Box-C8LnBuXA.js";import{B as f}from"./Button-w0YMQI20.js";import{D as P}from"./DialogBody-B2GvHwT1.js";import{P as v}from"./constantStories-DEfmjXOT.js";import{I as z}from"./IconIcon-BnybImGF.js";import{I as _}from"./InlineDialog-dmPr6wol.js";import{M as l}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input--7aMGOFq.js";import"./Divider-DpgHFPV1.js";import"./Dropdown-svNldc3Q.js";import"./useButton-DLhm0yas.js";import"./useFocusable-Ch_wBML2.js";import"./useFocusRing-DaQclxv6.js";import"./useEffectEvent-Bed0HKrm.js";import"./chain-C53qR8mF.js";import"./index-B6RK_iYZ.js";import"./FocusScope-Bzv2WeXp.js";import"./useOverlayTriggerState-Bu5TuFq8.js";import"./useControlledState-DNYTr6ro.js";import"./useMenuTrigger-B0mf0h1D.js";import"./useLabels-Dts9_kB5.js";import"./useLocalizedStringFormatter-B3uWwqsq.js";import"./context-Cwx5vL9r.js";import"./VisuallyHidden-DUEyq-Cs.js";import"./helper-DY0o5nBN.js";import"./keyboard-CXAxgyJA.js";import"./SelectionManager-Cf_3T95Q.js";import"./useField-B-F_ybfn.js";import"./useFormValidationState-9z_gHNgo.js";import"./usePopper-CDxDTjFc.js";import"./index-CVrNqSrl.js";import"./MenuItem-BeGq7gvA.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-YmhPr-ED.js";import"./IconCheckMark-CJeheIoj.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CpxXuuZu.js";import"./Trigger-Bg-sKnk_.js";import"./IconCaretDown-BWkY7x9m.js";import"./IconCaretDown16-BCuUFWC8.js";import"./IconCross-DtgV0uoe.js";import"./IconExclamationMarkTriangle-BZvUO_9Q.js";import"./IconExclamationMarkTriangle24-CrA51qy3.js";import"./IconTrashBin16-BvirWvL2.js";import"./IconTrashBin24-Dyp1RBtU.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BwU3w8We.js";import"./Portal-DKS8nUwW.js";import"./useMemoizedId-CZOTONQe.js";import"./FormControl-Cz8QE23N.js";import"./InputLabel-RKPNgSoW.js";import"./TooltipIcon-9SG9vwuW.js";import"./LegacyTooltip-8C24OgCi.js";import"./useLink-BQDoW3mf.js";import"./IconExclamationMarkCircle24-BSoLODou.js";import"./IconQuestionMarkCircle-DwcKSdMS.js";import"./Switch-wdnbPpFm.js";import"./TabItem-D5LwT7_5.js";import"./TextInput-Dz32-b9A.js";import"./Tooltip-BU8jlWYN.js";import"./useClickOutside-J1ExsWnc.js";import"./Tree-DHmt4Idc.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconIcon16-Bv3E9ZmX.js";import"./IconIcon24-CRCY95mk.js";const rt={title:"Experimental/InlineDialog",component:_,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:l.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...v,modality:{options:Object.values(l),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}},unsafe_zIndex:{type:"number"}}},g=()=>e.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),t=q=>{const[m,c]=d.useState(!1),u=d.useRef(null);return e.jsxs(x,{className:"tw-w-fit",children:[e.jsx(f,{icon:e.jsx(z,{}),onClick:()=>c(!m),ref:u,children:"Trigger"}),e.jsx(_,{...q,anchor:u,open:m,handleClose:()=>c(!1),children:e.jsx(P,{padding:"comfortable",children:e.jsxs(x,{className:"tw-text-text",children:[e.jsx(g,{}),e.jsx(g,{}),e.jsx(g,{}),e.jsx(f,{onClick:()=>c(!m),children:"Close"})]})})})]})},p=t.bind({}),n=t.bind({});n.args={modality:l.NonModal};const o=t.bind({});o.args={modality:l.Modal};const s=t.bind({});s.args={modality:l.BlockingModal};const r=t.bind({});r.args={maxHeight:300};const i=t.bind({});i.args={autoHeight:!0};const a=t.bind({});a.args={roundedCorners:!1};var B,I,O;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
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
}`,...(W=(L=a.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const it=["Default","AsANonModal","AsAModal","AsABlockingModal","WithMaxHeight","WithAutoHeight","WithNoRoundedCorners"];export{s as AsABlockingModal,o as AsAModal,n as AsANonModal,p as Default,i as WithAutoHeight,r as WithMaxHeight,a as WithNoRoundedCorners,it as __namedExportsOrder,rt as default};
