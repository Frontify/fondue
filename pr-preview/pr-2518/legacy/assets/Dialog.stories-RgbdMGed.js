import{r as l,j as o}from"./iframe-D_BOSi7z.js";import{B as I}from"./Button-C4MmvNvx.js";import{D as b}from"./DialogBody-9rO_vFOY.js";import{D as x}from"./DialogFooter-BYVI3vue.js";import{I as A}from"./IconIcon-B0CrwNM1.js";import{D as B}from"./Dialog-DDuHhsxE.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./useButton-DYuGFIG_.js";import"./useFocusable-PX_TjPkN.js";import"./useFocusRing-3FNqU6ul.js";import"./useEffectEvent-CC_qXDJd.js";import"./chain-BCugQ9l9.js";import"./index-D-wBK1Ng.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BEOERL60.js";import"./borderStyle-D9jrV09G.js";import"./input-D8gYQp8j.js";import"./Divider-B8ud-vsx.js";import"./Dropdown-Br8fivGJ.js";import"./FocusScope-uWXJwkLD.js";import"./useOverlayTriggerState-BjgsoR16.js";import"./useControlledState-edCwLap7.js";import"./useMenuTrigger-kwJADy-_.js";import"./useLabels-5DLMGvEt.js";import"./useLocalizedStringFormatter-Dl3iXdBr.js";import"./context-OJGXQKbu.js";import"./VisuallyHidden-BRbrFR-P.js";import"./helper-Bp7JDzWt.js";import"./keyboard-BOx3Eis0.js";import"./SelectionManager-DzBiEzjS.js";import"./useField-CL0EjCjO.js";import"./useFormValidationState-CKHn6c8R.js";import"./usePopper-CWJKvBxE.js";import"./index-C8RUnOp5.js";import"./MenuItem-r3ehSA8w.js";import"./IconCaretRight-CfLspMN-.js";import"./IconCheckMark-DdBrvFtV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CyHsgIab.js";import"./Trigger-DA871_2-.js";import"./IconCaretDown-36ngw1UT.js";import"./IconCaretDown16-Co6QTjBw.js";import"./IconCross-ByijIFm9.js";import"./IconExclamationMarkTriangle-xQH9byf_.js";import"./IconExclamationMarkTriangle24-BJ7X_RsB.js";import"./IconTrashBin16-q9e-rIJ9.js";import"./IconTrashBin24-CFl-qnHA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cg-A3hzO.js";import"./Portal-CoV8HD0d.js";import"./useMemoizedId-C_W2q-Ms.js";import"./FormControl-Dtgtea_0.js";import"./InputLabel-CtdBwKXa.js";import"./TooltipIcon-C4hpdbpH.js";import"./LegacyTooltip-wq0qLjqe.js";import"./useLink-JLbnaYkl.js";import"./IconExclamationMarkCircle24-BuQiGPe5.js";import"./IconQuestionMarkCircle-BhtGQ5mm.js";import"./Switch-CQ93vPgz.js";import"./TabItem-l5qSmNdO.js";import"./TextInput-ywF1gWpG.js";import"./Tooltip-BW6m7Y-x.js";import"./useClickOutside-DWNA6lpA.js";import"./Tree-CKJD2kKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BsQyatxB.js";import"./IconIcon16-B0vWrUBW.js";import"./IconIcon24-ChE4rgOw.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Po=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,Po as __namedExportsOrder,zo as default};
