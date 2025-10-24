import{r as l,j as e}from"./iframe-Dsejfqf3.js";import{B as b}from"./Button-D3yCbMCu.js";import{D as x}from"./DialogBody-BD6B2_pR.js";import{D as I}from"./DialogFooter-ilOgcthS.js";import{I as A}from"./IconJohanna-CtbvlysO.js";import{D as B}from"./Dialog-C4vELgHY.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-sQDyWCwb.js";import"./useButton-DrDu0hN4.js";import"./useFocusable-kZrDkqc7.js";import"./useFocusRing-DWqOtJ-L.js";import"./useEffectEvent-C7jBvXkh.js";import"./chain-BFmjOoFO.js";import"./index-BbLRgUGO.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Cord8vlN.js";import"./borderStyle-D9jrV09G.js";import"./input--aYGB3iM.js";import"./Divider-CSA0glUk.js";import"./FormControl-B73r47xs.js";import"./InputLabel-DoHx15Zm.js";import"./TooltipIcon-_Xzg-Fhc.js";import"./LegacyTooltip-BJIfuung.js";import"./useLink-CdtBTF-A.js";import"./usePopper-DjOQrLf2.js";import"./index-MQ_sJc9e.js";import"./Portal-CXUvUdjm.js";import"./useMemoizedId-DeujXZR8.js";import"./IconCheckMark-C6DMESJP.js";import"./IconExclamationMarkCircle24-R5PjI8Kl.js";import"./IconExclamationMarkTriangle-ClnlLp-c.js";import"./IconExclamationMarkTriangle24-CZYrQjwB.js";import"./IconQuestionMarkCircle-BAuAtzUg.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-j6DPyhiU.js";import"./Switch-CQpRUTqU.js";import"./TabItem-D9LFcEE2.js";import"./elements-BOYmskOL.js";import"./TextInput-lWB17Ld3.js";import"./IconCross-DFUwyl11.js";import"./Tooltip-1AYg5Joy.js";import"./useClickOutside-TtSMHBKs.js";import"./EnablePortalWrapper-DjCaNXWL.js";import"./Tree-CHXkJzp-.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CmZ21mE1.js";import"./IconCaretDown--QkG6ADy.js";import"./IconCaretDown16-DqiiGdgJ.js";import"./IconTrashBin16-BkNVPgcX.js";import"./IconTrashBin24-Bj6htdPw.js";import"./Flex-MbgP56Ux.js";const Ae={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const ke=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,o as AsANonModal,ke as __namedExportsOrder,Ae as default};
