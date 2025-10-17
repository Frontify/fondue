import{r as l,j as e}from"./iframe-C7qgvnLT.js";import{B as b}from"./Button-DIP-05BK.js";import{D as x}from"./DialogBody-B48JSZ9u.js";import{D as I}from"./DialogFooter-DSZH9ePe.js";import{I as A}from"./IconJohanna-C67aoeN8.js";import{D as B}from"./Dialog-D52hUT8W.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./useButton-D3Um7fi_.js";import"./useFocusable-CnN_ZxTp.js";import"./useFocusRing-ruVidjCk.js";import"./useEffectEvent-DrDM7H6C.js";import"./chain-T2cQnJ1g.js";import"./index-DctR5yPS.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C-gowCTp.js";import"./borderStyle-D9jrV09G.js";import"./input-D0abC8j7.js";import"./Checkbox-CWu2LneF.js";import"./useFormValidationState-DPXeRUoI.js";import"./useControlledState-7XsNrzHb.js";import"./InputLabel-CCwwbZtd.js";import"./TooltipIcon-BrZxZiQo.js";import"./LegacyTooltip-BAkmaqHw.js";import"./useLink-C0bVM8hx.js";import"./usePopper-ZfvWTzRi.js";import"./index-BDs77OgO.js";import"./Portal-CaYwSItc.js";import"./useMemoizedId-DEW6DLvp.js";import"./IconCheckMark-CgWGsbgX.js";import"./IconExclamationMarkCircle24-CkOatguF.js";import"./IconExclamationMarkTriangle-Bhhpa-fO.js";import"./IconExclamationMarkTriangle24-DIoh2jOr.js";import"./IconQuestionMarkCircle-Dh8clI19.js";import"./IconMinus-C1mJOu0u.js";import"./Divider-D9e93dBx.js";import"./FormControl-CHNKbetT.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BFXC5BKk.js";import"./Switch-7AoD3PlT.js";import"./TabItem-miXSmjfc.js";import"./elements-BOYmskOL.js";import"./TextInput-CGbZopza.js";import"./IconCross-Bh5k4Glw.js";import"./Tooltip-D5xtMJRc.js";import"./useClickOutside-fEpXeDHb.js";import"./EnablePortalWrapper-gKNJ-13l.js";import"./Tree-CgF_-bhG.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CYuaVuw_.js";const Ie={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const Ae=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Ae as __namedExportsOrder,Ie as default};
