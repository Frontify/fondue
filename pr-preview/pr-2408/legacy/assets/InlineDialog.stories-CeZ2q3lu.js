import{r as d,j as e}from"./iframe-BMoEVkia.js";import{a as x}from"./Box-Ck0wkAr4.js";import{B as f}from"./Button-CMxzLdN7.js";import{D as P}from"./DialogBody-BKUtSbj7.js";import{P as v}from"./constantStories-DEfmjXOT.js";import{I as z}from"./IconIcon-CSh3-jGx.js";import{I as _}from"./InlineDialog-XTmbiNQz.js";import{M as l}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DnJps9Th.js";import"./Divider-ogvYhdWC.js";import"./Dropdown-h-_P0JcJ.js";import"./useButton-xnxPy2XF.js";import"./useFocusable-Cp2GeeMz.js";import"./useFocusRing-C73RBflu.js";import"./useLayoutEffect-rRRXELWE.js";import"./chain-DdvpU25y.js";import"./index-FARF4T7D.js";import"./FocusScope-BWWCni5r.js";import"./useOverlayTriggerState-BscwV0_k.js";import"./useControlledState-DLOCLdQG.js";import"./useMenuTrigger-BjJQY40i.js";import"./useLabels-C6e4wMf2.js";import"./useLocalizedStringFormatter-BIB_5D2d.js";import"./context-M0dbH2oo.js";import"./VisuallyHidden-g2kmG1TR.js";import"./helper-C8VoCvyE.js";import"./keyboard-BKPY6eUK.js";import"./SelectionManager-CpptwNa1.js";import"./useField-CPaAlSWD.js";import"./useFormValidationState-DLDuLEaJ.js";import"./usePopper-C5V21KjV.js";import"./index-64kaxFay.js";import"./MenuItem-CwVw2b8z.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-D9ce8Ep2.js";import"./IconCheckMark-D7Vq66o9.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-3kSH1pYv.js";import"./Trigger-qElrFG2x.js";import"./IconCaretDown-CYC5SuWc.js";import"./IconCaretDown16-DYRPZHz8.js";import"./IconCross-r6CCOpp8.js";import"./IconExclamationMarkTriangle-BT5YClV6.js";import"./IconExclamationMarkTriangle24-8EVQOO01.js";import"./IconTrashBin16-BuG0O87O.js";import"./IconTrashBin24-Mt8xpYuL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CubsVp9j.js";import"./Portal-mlOdlOHj.js";import"./useMemoizedId-CMP0SDkl.js";import"./FormControl-Dldgd06i.js";import"./InputLabel-jBmbu52z.js";import"./TooltipIcon-CSWY0EL4.js";import"./LegacyTooltip-wjZJe6RC.js";import"./useLink-C7m8Sslo.js";import"./IconExclamationMarkCircle24-DwIlh9zC.js";import"./IconQuestionMarkCircle-CLss9Dli.js";import"./Switch-BxoXzsTj.js";import"./TabItem-DfMYK3dV.js";import"./TextInput-BNVRlzHU.js";import"./Tooltip-CDntw8rD.js";import"./useClickOutside-DvH66BFI.js";import"./Tree-Dua2iz_i.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconIcon16-CBFc7K1s.js";import"./IconIcon24-Bg5pNJ11.js";const rt={title:"Experimental/InlineDialog",component:_,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:l.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...v,modality:{options:Object.values(l),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}},unsafe_zIndex:{type:"number"}}},g=()=>e.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),t=q=>{const[m,c]=d.useState(!1),u=d.useRef(null);return e.jsxs(x,{className:"tw-w-fit",children:[e.jsx(f,{icon:e.jsx(z,{}),onClick:()=>c(!m),ref:u,children:"Trigger"}),e.jsx(_,{...q,anchor:u,open:m,handleClose:()=>c(!1),children:e.jsx(P,{padding:"comfortable",children:e.jsxs(x,{className:"tw-text-text",children:[e.jsx(g,{}),e.jsx(g,{}),e.jsx(g,{}),e.jsx(f,{onClick:()=>c(!m),children:"Close"})]})})})]})},p=t.bind({}),n=t.bind({});n.args={modality:l.NonModal};const o=t.bind({});o.args={modality:l.Modal};const s=t.bind({});s.args={modality:l.BlockingModal};const r=t.bind({});r.args={maxHeight:300};const i=t.bind({});i.args={autoHeight:!0};const a=t.bind({});a.args={roundedCorners:!1};var B,I,O;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
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
