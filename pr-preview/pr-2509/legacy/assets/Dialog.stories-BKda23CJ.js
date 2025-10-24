import{r as l,j as e}from"./iframe-BUwuV1Yf.js";import{B as b}from"./Button-B1NN_lii.js";import{D as x}from"./DialogBody-DdcKyyFs.js";import{D as I}from"./DialogFooter-Al6XyEC-.js";import{I as A}from"./IconJohanna-DWRCM43G.js";import{D as B}from"./Dialog-BRMK24d2.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D5qcpbyD.js";import"./useButton-C805vYYB.js";import"./useFocusable-CuB4bBD4.js";import"./useFocusRing-nkcyuVCu.js";import"./useEffectEvent-C8ZkU_FO.js";import"./chain-Dr8tyQvf.js";import"./index-DegWOD3f.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-6cBA0_3i.js";import"./borderStyle-D9jrV09G.js";import"./input-D2F_PKsX.js";import"./Divider-DPzk32Sl.js";import"./FormControl-D-1j_mY6.js";import"./InputLabel-DALiNwSO.js";import"./TooltipIcon-DyuJgYqN.js";import"./LegacyTooltip-D4QAG0oL.js";import"./useLink-D1XjKdgA.js";import"./usePopper-z-jt1pka.js";import"./index-CkYX0QpS.js";import"./Portal-CAM_NOt5.js";import"./useMemoizedId-B9nxXXF7.js";import"./IconCheckMark-B2wISUKN.js";import"./IconExclamationMarkCircle24-BFFkaWMT.js";import"./IconExclamationMarkTriangle-Y0VcjXdq.js";import"./IconExclamationMarkTriangle24-BUDlRL3H.js";import"./IconQuestionMarkCircle-XjewWxwc.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-paK7r67e.js";import"./Switch-D05wI1x6.js";import"./TabItem-C4ZkRY4r.js";import"./elements-BOYmskOL.js";import"./TextInput-Rap6JbAf.js";import"./IconCross-D2tJJHQF.js";import"./Tooltip-DPOChrIp.js";import"./useClickOutside-CNVIeSzM.js";import"./EnablePortalWrapper-CsonBS2r.js";import"./Tree-De_gGTcz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CB9W3fi7.js";import"./IconCaretDown-BzmTZ2Y3.js";import"./IconCaretDown16-BqORmrlh.js";import"./IconTrashBin16-BoYFRjak.js";import"./IconTrashBin24-vaa6XK1C.js";import"./Flex-BM0SzYzd.js";const Ae={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var D,h,y;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const ke=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,ke as __namedExportsOrder,Ae as default};
