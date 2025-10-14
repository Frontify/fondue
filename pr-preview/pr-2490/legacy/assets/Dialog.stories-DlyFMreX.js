import{r as l,j as o}from"./iframe-l0QJhPg2.js";import{B as b}from"./Button-bwErzbwC.js";import{D as x}from"./DialogBody-2RTmlpGv.js";import{D as I}from"./DialogFooter-lWNogubm.js";import{I as A}from"./IconJohanna-UumLA4kA.js";import{D as B}from"./Dialog-BMWLh63-.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-ClJkntjM.js";import"./useButton-DY3u421-.js";import"./useFocusable-OCbG4bop.js";import"./useFocusRing-Cv6Nj6VU.js";import"./useEffectEvent-DMOUn1MU.js";import"./chain-CS3UA_VO.js";import"./index-CUNTRpeU.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-rArBOmaZ.js";import"./borderStyle-D9jrV09G.js";import"./input-C_t1bFpZ.js";import"./Divider-D2OinX-0.js";import"./Dropdown-BFRzZKjk.js";import"./FocusScope-DB4a0Ubn.js";import"./useOverlayTriggerState-BouXr8l_.js";import"./useControlledState-CFG4g-bA.js";import"./useMenuTrigger-j2cq4B_t.js";import"./useLabels-BzA1nbJ-.js";import"./useLocalizedStringFormatter-D02eeuhF.js";import"./context-B3YZuPJb.js";import"./VisuallyHidden-CJhS9cmL.js";import"./helper-Wu38vShE.js";import"./keyboard-ez5hRGkN.js";import"./SelectionManager-CDz5YniA.js";import"./useField-_Cuy7iFx.js";import"./useFormValidationState-CDJkVAlX.js";import"./usePopper-UT0i-yBc.js";import"./index-edjICtv5.js";import"./MenuItem-CAezuxY7.js";import"./IconCaretRight-Ba8KjB_6.js";import"./IconCheckMark-D4b_H2JN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DesUOSVB.js";import"./Trigger-02mmuDpd.js";import"./IconCaretDown-BMue8eiT.js";import"./IconCaretDown16-Bud0Jo04.js";import"./IconCross-BRRJjj88.js";import"./IconExclamationMarkTriangle-Nr6Rxbk7.js";import"./IconExclamationMarkTriangle24-BppZ2KTU.js";import"./IconTrashBin16-CeWPQHON.js";import"./IconTrashBin24-CD9xSS0e.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CHPePV9p.js";import"./Portal-DKISOlQg.js";import"./useMemoizedId-CyO3ygRy.js";import"./FormControl-D9Em5ido.js";import"./InputLabel-COep5cVX.js";import"./TooltipIcon-CX2TaqAO.js";import"./LegacyTooltip-pxPHnLbr.js";import"./useLink-DUbBK_PD.js";import"./IconExclamationMarkCircle24-B0QU41eT.js";import"./IconQuestionMarkCircle-BmOYm7Ho.js";import"./Switch-rQee5_3y.js";import"./TabItem-CQI1G430.js";import"./TextInput-C6EBdYM3.js";import"./Tooltip-D-je5WhZ.js";import"./useClickOutside-C-rSVhlD.js";import"./Tree-CXm-0_tJ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CyQD02XH.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
