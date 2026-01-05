import{r as l,j as o}from"./iframe-DHhHn_Xd.js";import{B as I}from"./Button-twCtatvA.js";import{D as b}from"./DialogBody-D38T9vnY.js";import{D as x}from"./DialogFooter-cABrOQQF.js";import{I as A}from"./IconIcon-RSB4Bo_6.js";import{D as B}from"./Dialog-A9L31tJ7.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DI9Pv0v-.js";import"./useButton-Ba6bJoqp.js";import"./useFocusable-CXMGbqTn.js";import"./useFocusRing-DmIFv9Ke.js";import"./useEffectEvent-C_rtojrN.js";import"./chain-BYrUscth.js";import"./index-JgQzKZqR.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-MgqszGR_.js";import"./borderStyle-D9jrV09G.js";import"./input-DTjDp1yX.js";import"./Divider-CWxjOnot.js";import"./Dropdown-D-MqyGOZ.js";import"./FocusScope-jD0jHaDs.js";import"./useOverlayTriggerState--lHa6GRX.js";import"./useControlledState-C5QBV-5N.js";import"./useMenuTrigger-Ba2LFcNw.js";import"./useLabels-DZu6LvK2.js";import"./useLocalizedStringFormatter-CnwYXU_D.js";import"./context-D98oYbyU.js";import"./VisuallyHidden-ChNuZUmx.js";import"./helper-96siw9_E.js";import"./keyboard-DN0A5UFX.js";import"./SelectionManager-BmeslHph.js";import"./useField-C1Hy9AZ6.js";import"./useFormValidationState-DFbP1eAN.js";import"./usePopper-k8-xH0Mb.js";import"./index-Dxw9FBAV.js";import"./MenuItem-DNXPOJNM.js";import"./IconCaretRight-CLwpUh1P.js";import"./IconCheckMark-BVSctc7O.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CfwzJ-WV.js";import"./Trigger-CBI5WoJV.js";import"./IconCaretDown-ibszVH90.js";import"./IconCaretDown16-CrKcLaqR.js";import"./IconCross-BNiwUk40.js";import"./IconExclamationMarkTriangle-BOUPVeYb.js";import"./IconExclamationMarkTriangle24-BgB_bcU3.js";import"./IconTrashBin16-onKoxhQU.js";import"./IconTrashBin24-CyaeCWRk.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CASadrCE.js";import"./Portal-B16H0Alf.js";import"./useMemoizedId-BUaa68Zx.js";import"./FormControl-B0f2ybAX.js";import"./InputLabel-ChSoeug1.js";import"./TooltipIcon-CTskAz0a.js";import"./LegacyTooltip-B5e2tBdw.js";import"./useLink-B5wz_Dbi.js";import"./IconExclamationMarkCircle24-SHVZolFQ.js";import"./IconQuestionMarkCircle-CuCpXsjy.js";import"./Switch-b4QCHyCj.js";import"./TabItem-B1-ZGQ2E.js";import"./TextInput-DsDId-ew.js";import"./Tooltip-CYknrnEg.js";import"./useClickOutside-BMR6voSv.js";import"./Tree-B-qAXyrm.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-C505uEvj.js";import"./IconIcon16-CYLT6J1w.js";import"./IconIcon24-Amavt8cU.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
