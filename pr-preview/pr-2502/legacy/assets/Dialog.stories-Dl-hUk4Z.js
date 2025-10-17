import{r as l,j as e}from"./iframe-DZsoqIQH.js";import{B as b}from"./Button-DjeFZAKL.js";import{D as x}from"./DialogBody-D78tLQZL.js";import{D as I}from"./DialogFooter-TVnVsNXy.js";import{I as A}from"./IconJohanna-B6FA6CsW.js";import{D as B}from"./Dialog-8w_A9PBM.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B933Jwna.js";import"./useButton-BxuZFr2v.js";import"./useFocusable-w9vBw5vf.js";import"./useFocusRing-DbKjnAj0.js";import"./useEffectEvent-D8w6sK6J.js";import"./chain-VSjaRpoC.js";import"./index-B1yy6L_0.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BhZbAWvx.js";import"./borderStyle-D9jrV09G.js";import"./input-Hg_Jq5aN.js";import"./FormControl-jeH6ufrc.js";import"./InputLabel-CkXbkHdM.js";import"./TooltipIcon-CjIWgR0R.js";import"./LegacyTooltip-ClEwPHV5.js";import"./useLink-xEXBuUvC.js";import"./usePopper-BgKvnTxb.js";import"./index-Bz3rgcYf.js";import"./Portal-CN1TagRk.js";import"./useMemoizedId-Bl8d1xLN.js";import"./IconCheckMark-BHBJzH8F.js";import"./IconExclamationMarkCircle24-DDwDRcD9.js";import"./IconExclamationMarkTriangle-BqNXwrRl.js";import"./IconExclamationMarkTriangle24-C0GN7WvG.js";import"./IconQuestionMarkCircle-CkUpDNDy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-fy3UZfJY.js";import"./Switch-D1rFuCfK.js";import"./TabItem-CC4j3WN4.js";import"./elements-BOYmskOL.js";import"./TextInput-BsRYT8lu.js";import"./IconCross-DPfWkxZJ.js";import"./Tooltip-C1plt_3w.js";import"./useClickOutside-D1vWzB1y.js";import"./EnablePortalWrapper-DBbHCB_v.js";import"./Tree-DDNvcnCv.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BC-kZGBQ.js";import"./IconCaretDown-DmwJmvvT.js";import"./IconCaretDown16-Dvjt7Ada.js";import"./IconTrashBin16-kjeqw6-L.js";import"./IconTrashBin24-DN5n-TpR.js";import"./Flex-BV3oYkak.js";const Ie={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(b,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(x,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
