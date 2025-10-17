import{r as l,j as o}from"./iframe-Dwin3FxO.js";import{B as b}from"./Button-CKXsKGD5.js";import{D as x}from"./DialogBody-CN62-oJm.js";import{D as I}from"./DialogFooter-BQBu-tuk.js";import{I as A}from"./IconJohanna-CXkHf4Hi.js";import{D as B}from"./Dialog-Cg3gakZq.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./useButton-BsJegSmH.js";import"./useFocusable-Bp8A_yXF.js";import"./useFocusRing-swznnzXG.js";import"./useEffectEvent-wdw4_BRC.js";import"./chain-E9lX77Gb.js";import"./index-DwYNVFcV.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-5evlgCsF.js";import"./borderStyle-D9jrV09G.js";import"./input-DhnSYn5V.js";import"./Divider-CnWbkUKS.js";import"./Dropdown-BLAewou2.js";import"./FocusScope-COYiORyc.js";import"./useOverlayTriggerState-j0_YX7gm.js";import"./useControlledState-DKB5d8dN.js";import"./useMenuTrigger-CD-zpV_a.js";import"./useLabels-CVQ6RD4-.js";import"./useLocalizedStringFormatter-BAPTT49-.js";import"./context-DhWXtlDh.js";import"./VisuallyHidden-cIiiicO7.js";import"./helper-U6xaHnL7.js";import"./keyboard-DPiKC0x7.js";import"./SelectionManager-CBp81lVo.js";import"./useField-CpSRl-SE.js";import"./useFormValidationState-O_fivc1L.js";import"./usePopper-CbLYfQYR.js";import"./index-34xpJy1M.js";import"./MenuItem-DIpMfICd.js";import"./IconCaretRight-CT3w72s4.js";import"./IconCheckMark-CXLrFdWg.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DQ0PFIKz.js";import"./Trigger-DmtSg97z.js";import"./IconCaretDown-c7zt4LK7.js";import"./IconCaretDown16-DAiMAZVx.js";import"./IconCross-FdRJPnO5.js";import"./IconExclamationMarkTriangle-CNcDSymw.js";import"./IconExclamationMarkTriangle24-CFbJhFlF.js";import"./IconTrashBin16-BaS-aF7j.js";import"./IconTrashBin24-BjzpaZgm.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CLgVQhB2.js";import"./Portal-D5DnNNiN.js";import"./useMemoizedId-FdiXK2xp.js";import"./FormControl-CEdaMpG2.js";import"./InputLabel-D8rWOiLZ.js";import"./TooltipIcon-CnJNzBIg.js";import"./LegacyTooltip-fg58BgYe.js";import"./useLink-CHtPM4PO.js";import"./IconExclamationMarkCircle24-u83y5adM.js";import"./IconQuestionMarkCircle-2K-v2_hs.js";import"./Switch-CfJBzjml.js";import"./TabItem-Bsqu01ha.js";import"./TextInput-BwMR_4UK.js";import"./Tooltip-DwJLBt2z.js";import"./useClickOutside-DykVKKPP.js";import"./Tree-DBkTkPOc.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BgwdmUgj.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const No=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,No as __namedExportsOrder,_o as default};
