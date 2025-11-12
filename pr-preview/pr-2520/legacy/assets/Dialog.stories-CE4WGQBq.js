import{r as l,j as e}from"./iframe-0VoCCvKQ.js";import{B as I}from"./Button-_I0pyUtf.js";import{D as b}from"./DialogBody-BQ3rE37G.js";import{D as x}from"./DialogFooter-_Iju70Sh.js";import{I as A}from"./IconIcon-COGBrWY5.js";import{D as B}from"./Dialog-DNKHs9b_.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OAyExbmo.js";import"./useButton---q5tw8Z.js";import"./useFocusable-BCe4IQTp.js";import"./useFocusRing-BwU7aKs1.js";import"./useEffectEvent-BHlnOQgH.js";import"./chain-OdKjUm2f.js";import"./index-Bgj71gTm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C3CPGAWj.js";import"./borderStyle-D9jrV09G.js";import"./input-Cn5dIzAi.js";import"./Divider-Bkort0to.js";import"./FormControl-DTJtLJ3I.js";import"./InputLabel-D-dYkOUU.js";import"./TooltipIcon-BqRz7wxw.js";import"./LegacyTooltip-DsCZbgEK.js";import"./useLink-BKN1ye4f.js";import"./usePopper-DD_o-Erv.js";import"./index-BpkhDvZR.js";import"./Portal-BUQ-jWX1.js";import"./useMemoizedId-CDuHpq3f.js";import"./IconCheckMark-CkwzVArU.js";import"./IconExclamationMarkCircle24-PCG54VBR.js";import"./IconExclamationMarkTriangle-C5ppu3zD.js";import"./IconExclamationMarkTriangle24-CwxIDAa1.js";import"./IconQuestionMarkCircle-BFRN5wh-.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CUUgsLEh.js";import"./Switch-DXHHRCmz.js";import"./TabItem-ClsKH_u9.js";import"./elements-BOYmskOL.js";import"./TextInput-BrmcdJT1.js";import"./IconCross-C4F8ia0X.js";import"./Tooltip-CVOw9Kzc.js";import"./useClickOutside-CIwQYdWe.js";import"./EnablePortalWrapper-CJrl3TYk.js";import"./Tree-2aUbMr9P.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DHqwjt4u.js";import"./IconCaretDown-Dz1LMzT8.js";import"./IconCaretDown16-BDdqNkBz.js";import"./IconTrashBin16-D8J8LqCP.js";import"./IconTrashBin24-Cruny8WG.js";import"./Flex-CfLzPj-l.js";import"./IconIcon16-UD1lNdTz.js";import"./IconIcon24-BxjJ7b1r.js";const Ce={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Me=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,Me as __namedExportsOrder,Ce as default};
