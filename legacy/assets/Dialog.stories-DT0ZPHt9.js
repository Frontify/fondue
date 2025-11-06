import{r as l,j as o}from"./iframe-SquABeg9.js";import{B as I}from"./Button-bhuDGfA_.js";import{D as b}from"./DialogBody-BboDpkLJ.js";import{D as x}from"./DialogFooter-DzExcYDH.js";import{I as A}from"./IconIcon-C6KdYx6G.js";import{D as B}from"./Dialog-Dq0a9jrH.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-CIEkMiEW.js";import"./useFocusable-DSYH9RGK.js";import"./useFocusRing-BNK5FnXw.js";import"./useEffectEvent-I7gaBWEc.js";import"./chain-DWdr7d2C.js";import"./index-B6kSvp4Y.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DUDHtOFb.js";import"./borderStyle-D9jrV09G.js";import"./input-IHYNAO0Y.js";import"./Divider-BZjJAXxX.js";import"./Dropdown-loYZguqP.js";import"./FocusScope-BNpOWlK1.js";import"./useOverlayTriggerState-TQABtVAH.js";import"./useControlledState-CKOYWGYS.js";import"./useMenuTrigger-DnkaOMKE.js";import"./useLabels-C2pOqwIg.js";import"./useLocalizedStringFormatter-9I6FMkHq.js";import"./context-DonO3nJ8.js";import"./VisuallyHidden-B0vXfdTD.js";import"./helper-CeKBxdXa.js";import"./keyboard-DlKDWBwh.js";import"./SelectionManager-CyzKPpQE.js";import"./useField-IHSvhna4.js";import"./useFormValidationState-DSSo4usY.js";import"./usePopper-D1AGYINs.js";import"./index-DDB6fytH.js";import"./MenuItem-BwhCH_fz.js";import"./IconCaretRight-BUVD6u9U.js";import"./IconCheckMark-66M7SP9V.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DJUiJZHt.js";import"./Trigger-CeaegHCh.js";import"./IconCaretDown-0LGKf1hU.js";import"./IconCaretDown16-i3yW0a_h.js";import"./IconCross-Cti5Whzf.js";import"./IconExclamationMarkTriangle-CsYvi7vh.js";import"./IconExclamationMarkTriangle24-B0l4j4Hn.js";import"./IconTrashBin16-D4ch4T_K.js";import"./IconTrashBin24-DvkTTty9.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DB6ILfFA.js";import"./Portal-jeo8LuUZ.js";import"./useMemoizedId-ClOqGxXF.js";import"./FormControl-CHlMP_eN.js";import"./InputLabel-f3Z9IsXu.js";import"./TooltipIcon-BeNX6opp.js";import"./LegacyTooltip-kSW3trmM.js";import"./useLink-BZ12yVmf.js";import"./IconExclamationMarkCircle24-DFTnLpMP.js";import"./IconQuestionMarkCircle-BlPUz1KK.js";import"./Switch-BlNXVOTN.js";import"./TabItem-DRZ9YnlT.js";import"./TextInput-D54uz858.js";import"./Tooltip-B0voCar7.js";import"./useClickOutside-C9lEFXjz.js";import"./Tree-CIOoVjhp.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Db0bV6Ww.js";import"./IconIcon16-Cl1UB5lb.js";import"./IconIcon24-lzPlbpt9.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
