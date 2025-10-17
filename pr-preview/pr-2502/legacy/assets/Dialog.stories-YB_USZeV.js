import{r as l,j as o}from"./iframe-C4oRDf00.js";import{B as b}from"./Button-PWCBVfYK.js";import{D as x}from"./DialogBody-DEk5hy8F.js";import{D as I}from"./DialogFooter-DowIprQc.js";import{I as A}from"./IconJohanna-DPZ_ljhi.js";import{D as B}from"./Dialog-B9zwiyL0.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./useButton-Y6cWZoe9.js";import"./useFocusable-DaMtZN9H.js";import"./useFocusRing-Cfoq8wro.js";import"./useEffectEvent-vTlljP4j.js";import"./chain-BFYyGSXr.js";import"./index-C2GFe8M8.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BWpIYFSE.js";import"./borderStyle-D9jrV09G.js";import"./input-Bc_G07yT.js";import"./Divider-C8cRfcZ6.js";import"./Dropdown-DUWRUVei.js";import"./FocusScope-DQFEHFLy.js";import"./useOverlayTriggerState-L7vIiDuI.js";import"./useControlledState-Dt4aAtWN.js";import"./useMenuTrigger-BVyRaPKJ.js";import"./useLabels-CbM2_Ixf.js";import"./useLocalizedStringFormatter-blnl1i68.js";import"./context-BcRBNBSY.js";import"./VisuallyHidden-Bj5e8_W7.js";import"./helper-IakdE2XA.js";import"./keyboard-CyR-BIXM.js";import"./SelectionManager-D4_ZQnS-.js";import"./useField-CY0QFutb.js";import"./useFormValidationState-BFKh7Upf.js";import"./usePopper-oEgZSIdK.js";import"./index-pkMoDo0F.js";import"./MenuItem-ICxexfNS.js";import"./IconCaretRight-Boy6Hij2.js";import"./IconCheckMark-CdXL73bS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D7ecF-OQ.js";import"./Trigger-wHjcz8EF.js";import"./IconCaretDown-B7rtaYOu.js";import"./IconCaretDown16-B36G00fo.js";import"./IconCross-CGngu9gm.js";import"./IconExclamationMarkTriangle-CyysmFxL.js";import"./IconExclamationMarkTriangle24-B9Jh6rAf.js";import"./IconTrashBin16-BH2hEHIY.js";import"./IconTrashBin24-DvFCY5K4.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BJveQmLF.js";import"./Portal-Ca2NGuOZ.js";import"./useMemoizedId-A1bQAbDX.js";import"./FormControl-qigTchXL.js";import"./InputLabel-BMNa0YCt.js";import"./TooltipIcon-DuZRyfzt.js";import"./LegacyTooltip-DIWZRn-L.js";import"./useLink-CAaZ-YI_.js";import"./IconExclamationMarkCircle24-BU0c1aoh.js";import"./IconQuestionMarkCircle-Dymvr5cg.js";import"./Switch-B_KgIiqf.js";import"./TabItem-DZAsVXzH.js";import"./TextInput-YBFtltCu.js";import"./Tooltip--tXYZ45_.js";import"./useClickOutside-DvXyCqyI.js";import"./Tree-CAPrKYGD.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DnNeuM86.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
