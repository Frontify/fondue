import{r as l,j as o}from"./iframe-BqDpTz8L.js";import{B as b}from"./Button-Bkb2ujAG.js";import{D as x}from"./DialogBody-jSfC3Pq3.js";import{D as I}from"./DialogFooter-ByX8UHX1.js";import{I as A}from"./IconJohanna-DwpaZlKX.js";import{D as B}from"./Dialog-JK3f180d.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-ByQXrLpA.js";import"./useButton-BGLu1zCr.js";import"./useFocusable-C1aQJPOg.js";import"./useFocusRing-Xgnq7-RG.js";import"./useEffectEvent-CfjbAp9f.js";import"./chain-BF0-ro9P.js";import"./index-D7I4QJ3V.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-yDJFD71A.js";import"./borderStyle-D9jrV09G.js";import"./input-CTkk_4sX.js";import"./Divider-BDkhKOpT.js";import"./Dropdown-DIeWOy5O.js";import"./FocusScope-CrwMUh0H.js";import"./useOverlayTriggerState-Dxar4kSR.js";import"./useControlledState-DRzZhX7e.js";import"./useMenuTrigger-B-xTmkst.js";import"./useLabels-CShK178M.js";import"./useLocalizedStringFormatter-CT_IKlGg.js";import"./context-Cuf97275.js";import"./VisuallyHidden-Z6NBypG9.js";import"./helper-CawoOU1g.js";import"./keyboard-D68Nodq9.js";import"./SelectionManager-ClMwx0j_.js";import"./useField-BAnoDg69.js";import"./useFormValidationState-BoxxuQfu.js";import"./usePopper-s4jp2qgP.js";import"./index-CY-jsk3T.js";import"./MenuItem-PZQtIurR.js";import"./IconCaretRight-PlITsN3f.js";import"./IconCheckMark-BbPCPrTa.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BxttBEHu.js";import"./Trigger-DSSj9pCU.js";import"./IconCaretDown-R6whlyjw.js";import"./IconCaretDown16-Bdm0zhQl.js";import"./IconCross-B8K-nVuA.js";import"./IconExclamationMarkTriangle-DRWrILNB.js";import"./IconExclamationMarkTriangle24-XYss3Qca.js";import"./IconTrashBin16-DR0ZRfF3.js";import"./IconTrashBin24-CciGS0Cs.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Dvj5TfsF.js";import"./Portal-B7rzZNWn.js";import"./useMemoizedId-Dw0wROnJ.js";import"./FormControl-DcBQh53j.js";import"./InputLabel-CF4ejW5R.js";import"./TooltipIcon-Dg_9MSCk.js";import"./LegacyTooltip-h-bi0B10.js";import"./useLink-_NQoLbRX.js";import"./IconExclamationMarkCircle24-BixhjAUI.js";import"./IconQuestionMarkCircle-gMiBNDjP.js";import"./Switch-DHEC4TsF.js";import"./TabItem-3JcYdrD1.js";import"./TextInput-CRHj7Htq.js";import"./Tooltip-CMa0Vima.js";import"./useClickOutside-BZvZNjns.js";import"./Tree-4CeaLJ8E.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BlHpiAPT.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
