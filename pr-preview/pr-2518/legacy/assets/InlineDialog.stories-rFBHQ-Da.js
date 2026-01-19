import{r as d,j as e}from"./iframe-B-q0oBkh.js";import{a as x}from"./Box-B6ajFjst.js";import{B as f}from"./Button-CUXzs74B.js";import{D as P}from"./DialogBody-D7KGA2cQ.js";import{P as v}from"./constantStories-DEfmjXOT.js";import{I as z}from"./IconIcon-CrGAX0eB.js";import{I as _}from"./InlineDialog-CAdvcU2F.js";import{M as l}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DgPHAQnb.js";import"./Divider-BtOd8K_b.js";import"./Dropdown-BnI_HdVs.js";import"./useButton-BxNNoRoc.js";import"./useFocusable-BSpUZ_4G.js";import"./useFocusRing-5Z9WpVa3.js";import"./useEffectEvent-BzoPRF65.js";import"./chain-DMsQz2xd.js";import"./index-Dq2UqDDK.js";import"./FocusScope-N6yYRQs6.js";import"./useOverlayTriggerState-Cj-slszd.js";import"./useControlledState-oDvNyEHo.js";import"./useMenuTrigger-DJ9wrAQH.js";import"./useLabels-SPzgNaaN.js";import"./useLocalizedStringFormatter-CvzFr93-.js";import"./context-Cyo6w6Hx.js";import"./VisuallyHidden-DyaYdif_.js";import"./helper-BteyX24t.js";import"./keyboard-DEe2GdBR.js";import"./SelectionManager-w8TbAxAj.js";import"./useField-C7G_IfVM.js";import"./useFormValidationState-Drc9lQjx.js";import"./usePopper-B8sjEdfE.js";import"./index-DQ2RiE9g.js";import"./MenuItem-BMhUsSxl.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BctmRMa6.js";import"./IconCheckMark-DciqofqL.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DYERqMAJ.js";import"./Trigger-CRpyFe7s.js";import"./IconCaretDown-FBs0m0xB.js";import"./IconCaretDown16-bCd7KRJs.js";import"./IconCross-BiMLgWR5.js";import"./IconExclamationMarkTriangle-HKCYNKsD.js";import"./IconExclamationMarkTriangle24-B5pptuGe.js";import"./IconTrashBin16-Ben3ypPa.js";import"./IconTrashBin24-DxVvTmi_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-aXafSB7H.js";import"./Portal-Cv8KVjcJ.js";import"./useMemoizedId-CFv7aZ-I.js";import"./FormControl-EVd0GMXM.js";import"./InputLabel-Ds6m3OQf.js";import"./TooltipIcon-znRkNOWf.js";import"./LegacyTooltip-GsuFHRhK.js";import"./useLink-Bqpar8Vm.js";import"./IconExclamationMarkCircle24-C4zkAZtx.js";import"./IconQuestionMarkCircle-B2xB2obw.js";import"./Switch-qImyrjyA.js";import"./TabItem-B_l3Iv6U.js";import"./TextInput-N29rlDxa.js";import"./Tooltip-BT28b76C.js";import"./useClickOutside-B3144WjB.js";import"./Tree-IOl0-CIB.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconIcon16-17yS28NA.js";import"./IconIcon24-Cy9P4qh8.js";const rt={title:"Experimental/InlineDialog",component:_,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:l.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...v,modality:{options:Object.values(l),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}},unsafe_zIndex:{type:"number"}}},g=()=>e.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),t=q=>{const[m,c]=d.useState(!1),u=d.useRef(null);return e.jsxs(x,{className:"tw-w-fit",children:[e.jsx(f,{icon:e.jsx(z,{}),onClick:()=>c(!m),ref:u,children:"Trigger"}),e.jsx(_,{...q,anchor:u,open:m,handleClose:()=>c(!1),children:e.jsx(P,{padding:"comfortable",children:e.jsxs(x,{className:"tw-text-text",children:[e.jsx(g,{}),e.jsx(g,{}),e.jsx(g,{}),e.jsx(f,{onClick:()=>c(!m),children:"Close"})]})})})]})},p=t.bind({}),n=t.bind({});n.args={modality:l.NonModal};const o=t.bind({});o.args={modality:l.Modal};const s=t.bind({});s.args={modality:l.BlockingModal};const r=t.bind({});r.args={maxHeight:300};const i=t.bind({});i.args={autoHeight:!0};const a=t.bind({});a.args={roundedCorners:!1};var B,I,O;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
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
