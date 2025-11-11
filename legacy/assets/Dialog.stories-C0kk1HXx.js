import{r as l,j as e}from"./iframe-Dkg06RjX.js";import{B as I}from"./Button-Ck3U3EnT.js";import{D as b}from"./DialogBody-Bd11ATwV.js";import{D as x}from"./DialogFooter-CoVNVHGo.js";import{I as A}from"./IconIcon-CXGukDuZ.js";import{D as B}from"./Dialog-CR1hdS6z.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DUilcnPW.js";import"./useFocusable-Dxaa7OPm.js";import"./useFocusRing-CEtI7pDJ.js";import"./useEffectEvent-KNqAjB1f.js";import"./chain-CgS8Uj0H.js";import"./index-CBpye4dH.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DJ_QB4qy.js";import"./borderStyle-D9jrV09G.js";import"./input-C9VEbcfm.js";import"./Checkbox-CDButxBc.js";import"./useFormValidationState-nmuzmEoy.js";import"./useControlledState-CPPx_1ny.js";import"./InputLabel-BEJ9owXS.js";import"./TooltipIcon-ZSWAEMEr.js";import"./LegacyTooltip-CNBxqgOu.js";import"./useLink-BiIAuQPL.js";import"./usePopper-BAL_8qLj.js";import"./index-CFlcmsyM.js";import"./Portal-D1nUMvyP.js";import"./useMemoizedId-BAlQ1vfb.js";import"./IconCheckMark-i1BAgGgA.js";import"./IconExclamationMarkCircle24-BJC0lc_m.js";import"./IconExclamationMarkTriangle-DXcgw6u2.js";import"./IconExclamationMarkTriangle24-Dn4iwSTT.js";import"./IconQuestionMarkCircle-Bb7y1LEg.js";import"./IconMinus-C-ho5-_Q.js";import"./Divider-BjOepDpQ.js";import"./FormControl-BkAQXhRL.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B-i1jWHW.js";import"./Switch-DcE0cref.js";import"./TabItem-Dz7rWhGx.js";import"./elements-BOYmskOL.js";import"./TextInput-jYI9A8oV.js";import"./IconCross-DiOEwTiI.js";import"./Tooltip-B4AmaOSr.js";import"./useClickOutside-B3jYYgtq.js";import"./EnablePortalWrapper-kTZGOFtg.js";import"./Tree-CV7W9H3_.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DW_2JkVx.js";import"./IconCaretDown-DOg4ihB9.js";import"./IconCaretDown16-ClPYJULt.js";import"./IconTrashBin16-DASFbRcE.js";import"./IconTrashBin24-omzGfmal.js";import"./Flex-Nd9Yctc-.js";import"./IconIcon16-B2oVpvfD.js";import"./IconIcon24-CWei1RON.js";const ve={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
