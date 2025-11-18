import{r as l,j as e}from"./iframe-CaxuQ4qh.js";import{B as I}from"./Button-DoGxjyC-.js";import{D as b}from"./DialogBody-BVCohJCz.js";import{D as x}from"./DialogFooter-IyT7hUli.js";import{I as A}from"./IconIcon-CJlaDQKV.js";import{D as B}from"./Dialog-DBC8sAu1.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-264tqYC2.js";import"./useButton-BwcglY2L.js";import"./useFocusable-By9ALESo.js";import"./useFocusRing-CqF8kI1d.js";import"./useEffectEvent-BPzwECnN.js";import"./chain-cJ2GZaRk.js";import"./index-DTvIGFJL.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B7q0c-6b.js";import"./borderStyle-D9jrV09G.js";import"./input-Cp76Bj7X.js";import"./FormControl-DZDhDyKm.js";import"./InputLabel-eb9j-b-p.js";import"./TooltipIcon-wj8NzLxM.js";import"./LegacyTooltip-BnMK5RSa.js";import"./useLink-VP-M9sCi.js";import"./usePopper-CgU3XMf8.js";import"./index-BnX7kIwc.js";import"./Portal-B6FJfCm3.js";import"./useMemoizedId-ChmIg3ud.js";import"./IconCheckMark-D4o5Jrfj.js";import"./IconExclamationMarkCircle24-Bf6seDQ_.js";import"./IconExclamationMarkTriangle-BjK6wxVc.js";import"./IconExclamationMarkTriangle24-6Yrb1EYr.js";import"./IconQuestionMarkCircle-DdBH9cxt.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-OGoTfVco.js";import"./Switch-rdINVdFX.js";import"./TabItem-teBnpxFN.js";import"./elements-BOYmskOL.js";import"./TextInput-CPaVshVD.js";import"./IconCross-CwvMq-ne.js";import"./Tooltip-Cu8PLScD.js";import"./useClickOutside-DMVkVWhr.js";import"./EnablePortalWrapper-D5OZ7r8c.js";import"./Tree-BNrzop_z.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BUEp9VTW.js";import"./IconCaretDown-Dh1fgFoP.js";import"./IconCaretDown16-C7JmWk0f.js";import"./IconTrashBin16-BCPYOGCK.js";import"./IconTrashBin24-CUr4lQlf.js";import"./Flex-zirOKOKF.js";import"./IconIcon16-Czig_-kv.js";import"./IconIcon24-B4H_5Ld8.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Ce=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Ce as __namedExportsOrder,ke as default};
