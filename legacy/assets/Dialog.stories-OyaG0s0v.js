import{r as l,j as o}from"./iframe-D5jKmvFy.js";import{B as I}from"./Button-DwCG1rzi.js";import{D as b}from"./DialogBody-B-Lhlj3n.js";import{D as x}from"./DialogFooter-BY0eo08i.js";import{I as A}from"./IconIcon-CEFqKicA.js";import{D as B}from"./Dialog-BLbE0I5n.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-BSs9oz24.js";import"./useFocusable-BgFDsCFo.js";import"./useFocusRing-CF_DgWy2.js";import"./useEffectEvent-COAqNv_C.js";import"./chain-VjPdPKMz.js";import"./index-DwAO_Mfr.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B-f6EHAA.js";import"./borderStyle-D9jrV09G.js";import"./input-Cuuz4wSk.js";import"./Divider-Bvj5EVjz.js";import"./Dropdown-DZN4seAd.js";import"./FocusScope-IhAlz2x1.js";import"./useOverlayTriggerState-LoBAR65Z.js";import"./useControlledState-CYZEwJbA.js";import"./useMenuTrigger-CRlHAnCk.js";import"./useLabels-DQCmoryD.js";import"./useLocalizedStringFormatter-BPxuIa14.js";import"./context-C5iXvv9h.js";import"./VisuallyHidden-B4JthJSH.js";import"./helper-DdJ95vwf.js";import"./keyboard-Csc3fxLT.js";import"./SelectionManager-gdH0maxf.js";import"./useField-DVkZvzOP.js";import"./useFormValidationState-ELDSdfTc.js";import"./usePopper-CXMbn7uu.js";import"./index-IIBlqUBL.js";import"./MenuItem-Brj3YH5_.js";import"./IconCaretRight-C-HjVwgN.js";import"./IconCheckMark-QrCV5fbd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-XxlqpNA4.js";import"./Trigger-CtdnUMm-.js";import"./IconCaretDown-sbJtFOOJ.js";import"./IconCaretDown16-DuiE5sVg.js";import"./IconCross-djj-Oyd4.js";import"./IconExclamationMarkTriangle-D8faLJTj.js";import"./IconExclamationMarkTriangle24-DA1-FB5D.js";import"./IconTrashBin16-B0HMjzoh.js";import"./IconTrashBin24-BVh-BotE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Czs5h7OA.js";import"./Portal-DWmcDSHy.js";import"./useMemoizedId-DeWUksGg.js";import"./FormControl-BAvj2x9i.js";import"./InputLabel-BSPFWPaA.js";import"./TooltipIcon-D3wuiUby.js";import"./LegacyTooltip-BhAlSmqQ.js";import"./useLink-xpLz3Lhk.js";import"./IconExclamationMarkCircle24-CStJ-czY.js";import"./IconQuestionMarkCircle-CIYpTH4-.js";import"./Switch-D3rvabZF.js";import"./TabItem-CdVFMx15.js";import"./TextInput-BlmxafZW.js";import"./Tooltip-CdBxvI3A.js";import"./useClickOutside-C8l2PBjA.js";import"./Tree-q0L28dFW.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-uUiU4TVX.js";import"./IconIcon16-De5hfWAZ.js";import"./IconIcon24-BUbyEJBH.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
