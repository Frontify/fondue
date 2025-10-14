import{r as l,j as o}from"./iframe-8Aj-00-r.js";import{B as b}from"./Button-CG-0nyWt.js";import{D as x}from"./DialogBody-Ddxe0wtY.js";import{D as I}from"./DialogFooter-eHPQohMl.js";import{I as A}from"./IconJohanna-DFuBeViJ.js";import{D as B}from"./Dialog-DXscO1qY.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-ClJkntjM.js";import"./useButton-Dojg9qor.js";import"./useFocusable-BwZ_9y-T.js";import"./useFocusRing-qG24ebph.js";import"./useEffectEvent-Cq9opHnK.js";import"./chain-BjqAHd5L.js";import"./index-DCNbMVtB.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BnsoD87U.js";import"./borderStyle-D9jrV09G.js";import"./input-Cb-cDZ2G.js";import"./Divider-Cb8yJJpF.js";import"./Dropdown-C-O-Den-.js";import"./FocusScope-CTjdKyO5.js";import"./useOverlayTriggerState-ChNjsbrI.js";import"./useControlledState-D_xv8YeC.js";import"./useMenuTrigger-B56YI9sB.js";import"./useLabels-CzFGOsdE.js";import"./useLocalizedStringFormatter-B8RupXhl.js";import"./context-DJA_byga.js";import"./VisuallyHidden-pr9n8Eu6.js";import"./helper-CFr4oJ23.js";import"./keyboard-BqGaruCr.js";import"./SelectionManager-BrlFgUVk.js";import"./useField-BLaRcGJ8.js";import"./useFormValidationState-QoNIVx9j.js";import"./usePopper-CXS_WYpq.js";import"./index-Dnw8Dsyi.js";import"./MenuItem-DpQE8dX8.js";import"./IconCaretRight-Dx4qKvYw.js";import"./IconCheckMark-W08NCNhP.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CiFVWgYB.js";import"./Trigger-Bafp_Ri-.js";import"./IconCaretDown-ByO_B0hy.js";import"./IconCaretDown16-l4VSPtYz.js";import"./IconCross-BxAiCgtg.js";import"./IconExclamationMarkTriangle-CTaWxLT5.js";import"./IconExclamationMarkTriangle24-DBim1kUj.js";import"./IconTrashBin16-DiEpovv2.js";import"./IconTrashBin24-CL9xT_lP.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-doVjENwO.js";import"./Portal-Bz1ny3RM.js";import"./useMemoizedId-CGc7h3BS.js";import"./FormControl-DsARninL.js";import"./InputLabel-DPPpQodA.js";import"./TooltipIcon-Di_0n2EP.js";import"./LegacyTooltip-C9tle7yu.js";import"./useLink-BNAZ-U-L.js";import"./IconExclamationMarkCircle24-wOO7RqI2.js";import"./IconQuestionMarkCircle-DR6B91h_.js";import"./Switch-CG7Fwrxc.js";import"./TabItem-_H69nyMB.js";import"./TextInput-p2yGTJcX.js";import"./Tooltip-Bgz3MuCc.js";import"./useClickOutside-E2Pu4nAj.js";import"./Tree-LcjhZUHT.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-aA7zU9ix.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
