import{r as l,j as e}from"./iframe-B6gvnC9G.js";import{B as I}from"./Button-U5VlevU2.js";import{D as b}from"./DialogBody-BAYo8gl7.js";import{D as x}from"./DialogFooter-Ciogpbp5.js";import{I as A}from"./IconIcon-xo_-0px2.js";import{D as B}from"./Dialog-DmfKTkMq.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-1L8wWKLL.js";import"./useButton-Csf4pE_W.js";import"./useFocusable-BFOTHm5b.js";import"./useFocusRing-lDQQmtVG.js";import"./useEffectEvent-Br9oWhz1.js";import"./chain-DkU4Parx.js";import"./index-Ca3jtKOM.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-D2ZqmUHl.js";import"./borderStyle-D9jrV09G.js";import"./input-g2tGremA.js";import"./Checkbox-D6vyio4z.js";import"./useFormValidationState-D8jGKcTw.js";import"./useControlledState-BGX5OVF3.js";import"./InputLabel-Piz3csh8.js";import"./TooltipIcon-u9szC1VU.js";import"./LegacyTooltip-CUQq3jNY.js";import"./useLink-DpQXp-4I.js";import"./usePopper-D6IpfkbE.js";import"./index-Bkk43B7y.js";import"./Portal-FN-7ZB7K.js";import"./useMemoizedId-CoFSyPjm.js";import"./IconCheckMark-CJRGY1pq.js";import"./IconExclamationMarkCircle24-dSHdz95B.js";import"./IconExclamationMarkTriangle-BIGUCjg0.js";import"./IconExclamationMarkTriangle24-BTWBP6oJ.js";import"./IconQuestionMarkCircle-Dl_P1dkt.js";import"./IconMinus-CFenzC2Z.js";import"./Divider-C1YILpIw.js";import"./FormControl-DYPrqQx1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CDo8ljLK.js";import"./Switch-BlEQeOTC.js";import"./TabItem-Db1inNG6.js";import"./elements-BOYmskOL.js";import"./TextInput-ByQEBCRv.js";import"./IconCross-v4Os9_kc.js";import"./Tooltip-lCQmm1Hl.js";import"./useClickOutside--V2jy9Qc.js";import"./EnablePortalWrapper-C9__I8yL.js";import"./Tree-q-pdklRr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CN1tEa_w.js";import"./IconCaretDown-CPNCjoYn.js";import"./IconCaretDown16-DnxqvEec.js";import"./IconTrashBin16-Cy7a5y_v.js";import"./IconTrashBin24-Cvl42CmC.js";import"./Flex-DLbMXdlT.js";import"./IconIcon16-o3EkPJXe.js";import"./IconIcon24-DCDjMDzQ.js";const ve={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconIcon />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
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
            <Button icon={<IconIcon />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
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
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var D,y,h;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconIcon />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const je=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,je as __namedExportsOrder,ve as default};
