import{r as p,j as e}from"./iframe-Bu4L2X3M.js";import{B as b}from"./Button-CyFEToUK.js";import{D as x}from"./DialogBody-BxY_XNaP.js";import{D as I}from"./DialogFooter-Dh2pVdvc.js";import{I as A}from"./IconJohanna-oQphgxwH.js";import{D as B}from"./Dialog-DMmZsKjG.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-uCdTDTpK.js";import"./useFocusable-DJPYQSY0.js";import"./useFocusRing-aRsYH049.js";import"./useEffectEvent-C9QX9RtM.js";import"./chain-DLXw64Hn.js";import"./index-CuYoSRMf.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CSDxvMm9.js";import"./borderStyle-D9jrV09G.js";import"./input-1AavS4ZE.js";import"./FormControl-iAdgQXpo.js";import"./InputLabel-BLuVDc3f.js";import"./TooltipIcon-C1M-L0PR.js";import"./LegacyTooltip-924BhB3-.js";import"./useLink-Ci2dsncg.js";import"./usePopper-Bxnjv0x2.js";import"./index-ySyf93fl.js";import"./Portal-DY8zyLgs.js";import"./useMemoizedId-CDrFaSch.js";import"./IconCheckMark-CnJazdmc.js";import"./IconExclamationMarkCircle24-BToFQ0YX.js";import"./IconExclamationMarkTriangle-CxjqNEF_.js";import"./IconExclamationMarkTriangle24-0DeCRmP4.js";import"./IconQuestionMarkCircle-39pzYv0I.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-jiKMXLbT.js";import"./Switch-CP12zqzJ.js";import"./TabItem-CHtXGS_h.js";import"./elements-BOYmskOL.js";import"./TextInput-CpW1bEzb.js";import"./IconCross-PUc59xfq.js";import"./Tooltip-CLY_Kj2A.js";import"./useClickOutside-Bisz_apJ.js";import"./EnablePortalWrapper-DqVteU1y.js";import"./Tree-Bh5YYnBO.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D9F8JO4H.js";const ye={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=p.useState(!1),l=p.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:l,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:l,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const Be=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Be as __namedExportsOrder,ye as default};
