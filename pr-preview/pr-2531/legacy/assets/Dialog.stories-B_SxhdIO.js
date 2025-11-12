import{r as l,j as e}from"./iframe-Bi_jfSnd.js";import{B as I}from"./Button-B0gf8XMR.js";import{D as b}from"./DialogBody-CvSvJ_bb.js";import{D as x}from"./DialogFooter-D1hv2ltC.js";import{I as A}from"./IconIcon-CmUgOF70.js";import{D as B}from"./Dialog-D-V3mVPY.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-QBPONJkz.js";import"./useFocusable-BHWiTFLM.js";import"./useFocusRing-CQP_YSAQ.js";import"./useEffectEvent-zHRh56A3.js";import"./chain-CTs3wXrO.js";import"./index-Cl_29qdh.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-D8rPKBOz.js";import"./borderStyle-D9jrV09G.js";import"./input-BF1ntz6i.js";import"./Checkbox-CEAe9bvX.js";import"./useFormValidationState-BWEIozTf.js";import"./useControlledState-BgciVEFz.js";import"./InputLabel-DiFtr5lq.js";import"./TooltipIcon-BREcT8uO.js";import"./LegacyTooltip-CmBmbwCT.js";import"./useLink-BDIhzraw.js";import"./usePopper-hPvozz_f.js";import"./index-D7izUPt0.js";import"./Portal-BK2M_YVZ.js";import"./useMemoizedId-mCaU_17l.js";import"./IconCheckMark-BD9LKDAE.js";import"./IconExclamationMarkCircle24-DHU_uxqb.js";import"./IconExclamationMarkTriangle-BeXKyi0N.js";import"./IconExclamationMarkTriangle24-DbV4sldj.js";import"./IconQuestionMarkCircle-CuPjajkp.js";import"./IconMinus-BfcrP6eh.js";import"./Divider-JGezgy-W.js";import"./FormControl-CupTHtjN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DeLs2a81.js";import"./Switch-CuFp48yf.js";import"./TabItem-ChiUX7xJ.js";import"./elements-BOYmskOL.js";import"./TextInput-BYV0thMr.js";import"./IconCross-B6ER-0OV.js";import"./Tooltip-C2sQhq_x.js";import"./useClickOutside-CczPXN2W.js";import"./EnablePortalWrapper-DT0NwmAe.js";import"./Tree-CCGCuf6m.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DW2lxbKG.js";import"./IconIcon16-DWFc_9T8.js";import"./IconIcon24-DMrPVXpa.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
