import{r as l,j as o}from"./iframe-O_XuH54Q.js";import{B as b}from"./Button-B58Ioqyx.js";import{D as x}from"./DialogBody-_jN4uiOy.js";import{D as I}from"./DialogFooter-D1YsHMTr.js";import{I as A}from"./IconJohanna-ClzdPHoK.js";import{D as B}from"./Dialog-C8aWkD2S.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OKB6Z3Tn.js";import"./useButton-C8BySKAQ.js";import"./useFocusable-C0fuhW15.js";import"./useFocusRing-Bqot2-Rk.js";import"./useEffectEvent-DACClfwZ.js";import"./chain-C6q0R5T-.js";import"./index-BVb_rcK3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-p9n4chOp.js";import"./borderStyle-D9jrV09G.js";import"./input-hHIqtYHh.js";import"./Divider-yYtBfNCG.js";import"./Dropdown-CisXlk34.js";import"./FocusScope-3do7GGAS.js";import"./useOverlayTriggerState-kzEfGejS.js";import"./useControlledState-B6qV4UF7.js";import"./useMenuTrigger-BkxjOV5I.js";import"./useLabels-vi5D6r2t.js";import"./useLocalizedStringFormatter-Xd96at2a.js";import"./context-CYxI3e2S.js";import"./VisuallyHidden-TL1dlXLg.js";import"./helper-B92HrXNX.js";import"./keyboard-Bkql7voq.js";import"./SelectionManager-BnFpMhKG.js";import"./useField-B-7APjb3.js";import"./useFormValidationState-C1mqDRzs.js";import"./usePopper-CVWvsVB1.js";import"./index-BLmxJglX.js";import"./MenuItem-BvAIyVQb.js";import"./IconCaretRight-7Y9Pbj0u.js";import"./IconCheckMark-BeCL8EEQ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B4E3yWjH.js";import"./Trigger-Bdyc308T.js";import"./IconCaretDown-CeAN14oY.js";import"./IconCaretDown16-CXHhXr84.js";import"./IconCross-iTiFWRH5.js";import"./IconExclamationMarkTriangle-B1eeTH9v.js";import"./IconExclamationMarkTriangle24-ClNbD2R3.js";import"./IconTrashBin16-BE79xRak.js";import"./IconTrashBin24-BjrrNMTQ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNQxf1Z5.js";import"./Portal-C3Khk6dG.js";import"./useMemoizedId-BWUvvHPY.js";import"./FormControl-BzAndHoF.js";import"./InputLabel-J904gGNu.js";import"./TooltipIcon-BBkgYmHu.js";import"./LegacyTooltip-DF0yijww.js";import"./useLink-DIfoGhG2.js";import"./IconExclamationMarkCircle24-BJXQgdBn.js";import"./IconQuestionMarkCircle-D3VJ3tCq.js";import"./Switch-CZzOpnJT.js";import"./TabItem-DGj8BxC4.js";import"./TextInput-D-u9u7p0.js";import"./Tooltip-Ck3jaqE5.js";import"./useClickOutside-BlXnLcs9.js";import"./Tree-DTx26U4T.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DFK2GEYF.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
