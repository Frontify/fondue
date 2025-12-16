import{r as l,j as e}from"./iframe-Q6jTPbLu.js";import{B as I}from"./Button-CK-0jm-C.js";import{D as b}from"./DialogBody-0sGXINtE.js";import{D as x}from"./DialogFooter-DMa4Oaea.js";import{I as A}from"./IconIcon-BSU2CbT8.js";import{D as B}from"./Dialog-Byv96Ey6.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DyHTrhc7.js";import"./useButton-CadPs_no.js";import"./useFocusable-Bv1KETgF.js";import"./useFocusRing-ChZ7shwC.js";import"./useLayoutEffect-CNGvG9Li.js";import"./chain-D9i0b07P.js";import"./index-C3qdTENE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BJSu5SV3.js";import"./borderStyle-D9jrV09G.js";import"./input-1raJZ-xI.js";import"./Divider-BwTOAMmu.js";import"./FormControl-PPjaZDSu.js";import"./InputLabel-Bqv2ZOBd.js";import"./TooltipIcon-D8XYh8tq.js";import"./LegacyTooltip-edHqjb7F.js";import"./useLink-C0jFhwJL.js";import"./usePopper-D0IvXwgq.js";import"./index-B_OV6jDq.js";import"./Portal-DGOkUD5q.js";import"./useMemoizedId-D9m5X-XB.js";import"./IconCheckMark-BQPA_Lho.js";import"./IconExclamationMarkCircle24-C6q9is1t.js";import"./IconExclamationMarkTriangle-CZfbuqKq.js";import"./IconExclamationMarkTriangle24-Cp-w0gDF.js";import"./IconQuestionMarkCircle-CJVcjX5Q.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C_EOa6kY.js";import"./Switch-k4f5W-NZ.js";import"./TabItem-BhlexmJ-.js";import"./elements-BOYmskOL.js";import"./TextInput-CwyY6sY7.js";import"./IconCross-BxuvMGBH.js";import"./Tooltip-B7-3W8SP.js";import"./useClickOutside-CZkbGKKq.js";import"./EnablePortalWrapper-BHV4bVIK.js";import"./Tree-IIyLPOat.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BbZOgNk9.js";import"./IconCaretDown-DsNf3Zor.js";import"./IconCaretDown16-D78HUM7o.js";import"./IconTrashBin16-BiIehmNq.js";import"./IconTrashBin24-BOIO6HBX.js";import"./Flex-CSpCxlr1.js";import"./IconIcon16-amPD6ViC.js";import"./IconIcon24-Cg8McK6Y.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Me=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Me as __namedExportsOrder,Ce as default};
