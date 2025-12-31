import{r as l,j as e}from"./iframe-Db2lMgIJ.js";import{B as I}from"./Button-DrV-oxb6.js";import{D as b}from"./DialogBody-CLGVsZLB.js";import{D as x}from"./DialogFooter-CabfAiyv.js";import{I as A}from"./IconIcon-CixNjnEF.js";import{D as B}from"./Dialog-BbJ2FNZW.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-MprHWY6w.js";import"./useButton-CLCKE_lb.js";import"./useFocusable-CTEFGZiK.js";import"./useFocusRing-B9RuWWoE.js";import"./useEffectEvent-B6yt_MbU.js";import"./chain-DNotTnBs.js";import"./index-DJB9gcJu.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-QKpCgCWO.js";import"./borderStyle-D9jrV09G.js";import"./input-Dxp6Hmi5.js";import"./FormControl-CzH52flP.js";import"./InputLabel-BuiyOa5e.js";import"./TooltipIcon-B2QKXg6s.js";import"./LegacyTooltip-9uaOguTu.js";import"./useLink-DRnxTn0l.js";import"./usePopper-aywqiBd9.js";import"./index-eahnjmcY.js";import"./Portal-D_ZcylIA.js";import"./useMemoizedId-B4gdAHT4.js";import"./IconCheckMark-DjEX-BrJ.js";import"./IconExclamationMarkCircle24-BOaIUvhj.js";import"./IconExclamationMarkTriangle-BVyt7aNf.js";import"./IconExclamationMarkTriangle24-BLFlkBha.js";import"./IconQuestionMarkCircle-DXfc1EwE.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BNtw18aK.js";import"./Switch-DpzcFjU4.js";import"./TabItem-Bgtxl6CT.js";import"./elements-BOYmskOL.js";import"./TextInput-JaqVfONk.js";import"./IconCross-CzRefrvN.js";import"./Tooltip-VGceQO3J.js";import"./useClickOutside-CXT4Q1eP.js";import"./EnablePortalWrapper-DKPHOS0M.js";import"./Tree-Bw4XPOUo.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-ng2O4uuE.js";import"./IconCaretDown-zENP2QKX.js";import"./IconCaretDown16-giTZ49XX.js";import"./IconTrashBin16-DqIm0Q2w.js";import"./IconTrashBin24-G7BNemIR.js";import"./Flex-Dqr0LrDe.js";import"./IconIcon16-B-4kG_kU.js";import"./IconIcon24-B-UGhnjV.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
