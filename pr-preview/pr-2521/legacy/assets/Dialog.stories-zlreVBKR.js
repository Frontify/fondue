import{r as l,j as e}from"./iframe-BCnoYE3v.js";import{B as I}from"./Button-KRRI2ROt.js";import{D as b}from"./DialogBody-C7FRKsbm.js";import{D as x}from"./DialogFooter-BzEqLRlO.js";import{I as A}from"./IconIcon-CKLarbCy.js";import{D as B}from"./Dialog-x4ashzV_.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-Dc4hn-aq.js";import"./useFocusable-BBZX1YeC.js";import"./useFocusRing-Bt6TIjh0.js";import"./useEffectEvent-Cl2TEo8j.js";import"./chain-RHkf15pv.js";import"./index-B1Ba_Hxv.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CpZt1Cbh.js";import"./borderStyle-D9jrV09G.js";import"./input-DVAx1I1O.js";import"./Checkbox-BJPmY04E.js";import"./useFormValidationState-DeO7vRLY.js";import"./useControlledState-D-ye-mCq.js";import"./InputLabel-DZ0wBnnP.js";import"./TooltipIcon-BHPjB9_w.js";import"./LegacyTooltip-ywfbnU0Y.js";import"./useLink-AT_Qezkp.js";import"./usePopper-CSBCD_Iq.js";import"./index-DPhmVeXH.js";import"./Portal-BgzAls8n.js";import"./useMemoizedId-BkXgJuWW.js";import"./IconCheckMark-G4vdsaU_.js";import"./IconExclamationMarkCircle24-_8_MiX60.js";import"./IconExclamationMarkTriangle-CZrmTRcm.js";import"./IconExclamationMarkTriangle24-C26brak3.js";import"./IconQuestionMarkCircle-D1o3Q7kb.js";import"./IconMinus-EfteyY8R.js";import"./Divider-C5OnfpLt.js";import"./FormControl-yt0CRSo5.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DDJ9to7C.js";import"./Switch-BacF1OQD.js";import"./TabItem-DgZmaAfE.js";import"./elements-BOYmskOL.js";import"./TextInput-Cg55WOmg.js";import"./IconCross-DA4M5IUx.js";import"./Tooltip-DAW2sPOn.js";import"./useClickOutside-DzvhqzKg.js";import"./EnablePortalWrapper-Dbw9xd1X.js";import"./Tree-fyDDg268.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DFEvCooJ.js";import"./IconIcon16-BpnFrGHR.js";import"./IconIcon24-DaIXjrxh.js";const ke={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(I,{icon:e.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),e.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[e.jsx(b,{padding:"spacious",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),e.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},o=a.bind({});o.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
