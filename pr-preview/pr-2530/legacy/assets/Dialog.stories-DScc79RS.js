import{r as l,j as o}from"./iframe-BYgk9eGi.js";import{B as I}from"./Button-BFRQ7uMU.js";import{D as b}from"./DialogBody-LuKc4CP-.js";import{D as x}from"./DialogFooter-DdQnCL6s.js";import{I as A}from"./IconIcon-Cxo3Py9G.js";import{D as B}from"./Dialog-D7S2a6Da.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C4wRLVzE.js";import"./useButton-aMrX7lQB.js";import"./useFocusable-DWkWAuuj.js";import"./useFocusRing-B9FX5t9d.js";import"./useEffectEvent-C0BQ6d8E.js";import"./chain-DewOEu23.js";import"./index-JL1iOob4.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CHcpe9rj.js";import"./borderStyle-D9jrV09G.js";import"./input-CHp1aGuG.js";import"./Divider-t83pYnJu.js";import"./Dropdown-55K6xzNt.js";import"./FocusScope-CLV--g8F.js";import"./useOverlayTriggerState-B1KvkfS4.js";import"./useControlledState-WuYbSOBR.js";import"./useMenuTrigger-DtAliMr4.js";import"./useLabels-DNjgnGlH.js";import"./useLocalizedStringFormatter-D3YJL1Sl.js";import"./context-DhZg-eiB.js";import"./VisuallyHidden-Cxyhrmyz.js";import"./helper-DwPYLC8Q.js";import"./keyboard-DUIElv65.js";import"./SelectionManager-ihQjKTL6.js";import"./useField-tEdRTGkN.js";import"./useFormValidationState-CCcBhnXp.js";import"./usePopper-Bjy0ueTZ.js";import"./index-DF7w3mCS.js";import"./MenuItem-DsRkCZfU.js";import"./IconCaretRight-ZPWSrGDF.js";import"./IconCheckMark-C86ecLPI.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DFHIC5me.js";import"./Trigger-CXI_k5eO.js";import"./IconCaretDown-DJft5W7d.js";import"./IconCaretDown16-DFWIPfbf.js";import"./IconCross-CHQ9kAFF.js";import"./IconExclamationMarkTriangle-BZIhdvAU.js";import"./IconExclamationMarkTriangle24-orZPE0b5.js";import"./IconTrashBin16-DKWtSmRV.js";import"./IconTrashBin24-C-V8KFup.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BnAgViow.js";import"./Portal-DSR4zoF2.js";import"./useMemoizedId-DTXcstyd.js";import"./FormControl-Rgqig6QS.js";import"./InputLabel-BzgpUWCY.js";import"./TooltipIcon-KrhHCJfq.js";import"./LegacyTooltip-DepAC3Bc.js";import"./useLink-YF0z-YX4.js";import"./IconExclamationMarkCircle24-vzChveiq.js";import"./IconQuestionMarkCircle-DNg9QlGt.js";import"./TabItem-Crjs_qi7.js";import"./TextInput-hOyDqsAD.js";import"./Tooltip-BymIuUo6.js";import"./useClickOutside-DqRgZ3e-.js";import"./Tree-l_6RWbbv.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D6OdUIvG.js";import"./IconIcon16-CEOPLr-r.js";import"./IconIcon24-DHbgf2rn.js";const wo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const zo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,zo as __namedExportsOrder,wo as default};
