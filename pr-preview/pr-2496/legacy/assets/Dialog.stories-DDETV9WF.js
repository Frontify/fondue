import{r as l,j as o}from"./iframe-DI3FmvMg.js";import{B as b}from"./Button-81HPhAZq.js";import{D as x}from"./DialogBody-RgxVECr_.js";import{D as I}from"./DialogFooter-DvzQOVAq.js";import{I as A}from"./IconJohanna-BMVk4L5a.js";import{D as B}from"./Dialog-BRgBH4ns.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D2dEV7R8.js";import"./useButton-BbxjUP_K.js";import"./useFocusable-CDu369YP.js";import"./useFocusRing-DYIZffxr.js";import"./useEffectEvent-BH88ISlG.js";import"./chain-BslaglIs.js";import"./index-BM8UhHH_.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BzvOCXyp.js";import"./borderStyle-D9jrV09G.js";import"./input-CCyWXpuB.js";import"./Checkbox-D44al-eW.js";import"./useFormValidationState-Cld0AnK4.js";import"./useControlledState-BiOOwxHx.js";import"./InputLabel-Cg4r-In2.js";import"./TooltipIcon-xRvsiuV-.js";import"./LegacyTooltip-_ICJCfzv.js";import"./useLink-UjFHOFNi.js";import"./usePopper--KY0_hMj.js";import"./index-CXZaHicV.js";import"./Portal-BFDMwOGS.js";import"./useMemoizedId-CkMIAu3W.js";import"./IconCheckMark-B7kLsSyY.js";import"./IconExclamationMarkCircle24-D4tF03zx.js";import"./IconExclamationMarkTriangle-DIy9MoLo.js";import"./IconExclamationMarkTriangle24-CEjgCUBS.js";import"./IconQuestionMarkCircle-DSdNDavw.js";import"./IconMinus-BVHXyRcm.js";import"./Dropdown-Dvj_d9Nt.js";import"./FocusScope-C1m5l3e0.js";import"./useOverlayTriggerState-DODiVQDU.js";import"./useMenuTrigger-ffLGp00v.js";import"./useLabels-BxWS0UcL.js";import"./useLocalizedStringFormatter--MnVfld8.js";import"./context-BqltTJBl.js";import"./VisuallyHidden-DIGLDGTy.js";import"./helper-Dmt6oJnd.js";import"./keyboard-DKrOuDO8.js";import"./SelectionManager-C4qB5YQ6.js";import"./useField-CXlZh9cC.js";import"./MenuItem-B3oQ8NBJ.js";import"./IconCaretRight-Cnjf463B.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-mnpTZaSB.js";import"./Trigger-DxWASr5H.js";import"./IconCaretDown-D8Q90axM.js";import"./IconCaretDown16-DnKeo0fq.js";import"./IconCross-zXwZw5XO.js";import"./IconTrashBin16-k6iK24Cb.js";import"./IconTrashBin24-CT3rUXQo.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CJRjb42v.js";import"./FormControl-5EUEioxo.js";import"./Switch-zWc6Snnf.js";import"./TabItem-CImVNYIL.js";import"./TextInput-CbSujYQZ.js";import"./Tooltip-D8RjORwC.js";import"./useClickOutside-B67-0z1Q.js";import"./Tree-4JOtMfCe.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D43PR0Qh.js";const No={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const wo=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,wo as __namedExportsOrder,No as default};
