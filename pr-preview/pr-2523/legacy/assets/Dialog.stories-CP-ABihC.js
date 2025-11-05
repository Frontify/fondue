import{r as l,j as e}from"./iframe-DPRBJ5Qg.js";import{B as I}from"./Button-IuUjxokW.js";import{D as b}from"./DialogBody-BUcVOAXW.js";import{D as x}from"./DialogFooter-Div2vewy.js";import{I as A}from"./IconIcon-Be8qJiWw.js";import{D as B}from"./Dialog-r0w94cfH.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DuVWtNEG.js";import"./useButton-CLoXWK9R.js";import"./useFocusable-DKvvMmRO.js";import"./useFocusRing-B6arhbyw.js";import"./useEffectEvent-BwxOOVcC.js";import"./chain-BgKcRe8x.js";import"./index-Bj6WzqIE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DsQ8GRqr.js";import"./borderStyle-D9jrV09G.js";import"./input-Dt18Tw5W.js";import"./Checkbox-BKmiJK_B.js";import"./useFormValidationState-D2KMc6vr.js";import"./useControlledState-CWoR01mQ.js";import"./InputLabel-Bdk_cdx2.js";import"./TooltipIcon-Cyyr7b5a.js";import"./LegacyTooltip-CRLNNlT6.js";import"./useLink-DZQQcpzx.js";import"./usePopper-BNoVGNL_.js";import"./index-LfTGALDi.js";import"./Portal-D5MJmr8l.js";import"./useMemoizedId-CijxVOQa.js";import"./IconCheckMark-BZ7o3ynj.js";import"./IconExclamationMarkCircle24-Bp1yl0E2.js";import"./IconExclamationMarkTriangle-BcdDPU1z.js";import"./IconExclamationMarkTriangle24-CjI5zqAF.js";import"./IconQuestionMarkCircle-C0GcLQTC.js";import"./IconMinus-CGzil4rt.js";import"./Divider-CwuaR7Ij.js";import"./FormControl-C70XPd0o.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BkptVitq.js";import"./Switch-DDNvQKpv.js";import"./TabItem-CojwcqMz.js";import"./elements-BOYmskOL.js";import"./TextInput-B46JoAHb.js";import"./IconCross-oUizg1TI.js";import"./Tooltip-CkEMlWgN.js";import"./useClickOutside-DjMq5qtV.js";import"./EnablePortalWrapper-BQdW5VMb.js";import"./Tree-7M4K1sUp.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BC5AK8iF.js";import"./IconCaretDown-C3VJjq6F.js";import"./IconCaretDown16-DUI6oM7I.js";import"./IconTrashBin16-BFeyR-yx.js";import"./IconTrashBin24-BntiU_ti.js";import"./Flex-Dk1zNQEi.js";import"./IconIcon16-Csx_5aDB.js";import"./IconIcon24-CztCPZlm.js";const ve={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const je=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,je as __namedExportsOrder,ve as default};
