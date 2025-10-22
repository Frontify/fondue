import{r as l,j as o}from"./iframe-CHTDhBOw.js";import{B as b}from"./Button-BGdoAku5.js";import{D as x}from"./DialogBody-CxArk14k.js";import{D as I}from"./DialogFooter-B9QNP724.js";import{I as A}from"./IconJohanna-CHc-af32.js";import{D as B}from"./Dialog-Y1ULrOn6.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DpV-BRze.js";import"./useButton-DQwwQNDs.js";import"./useFocusable-wUQP4iRG.js";import"./useFocusRing-B9ljnzvU.js";import"./useEffectEvent-C_zZUYtw.js";import"./chain-gGRwirEw.js";import"./index-NZpU9fsB.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CBPJusEs.js";import"./borderStyle-D9jrV09G.js";import"./input-djRa9qHK.js";import"./Divider-CIYdp59O.js";import"./Dropdown-jHV7NTSi.js";import"./FocusScope-CbrJ0X92.js";import"./useOverlayTriggerState-ChnurNZW.js";import"./useControlledState-Dyp77OM5.js";import"./useMenuTrigger-grTO5Qe1.js";import"./useLabels-IJBk5yiI.js";import"./useLocalizedStringFormatter-BQCdTs0l.js";import"./context-BiY5BK-o.js";import"./VisuallyHidden-BCHw-yIg.js";import"./helper-B9AmTkD4.js";import"./keyboard-Db7mZRua.js";import"./SelectionManager-CfehHhqG.js";import"./useField-yVlFEyW7.js";import"./useFormValidationState-B2zh8KVN.js";import"./usePopper-C5FqElHn.js";import"./index-B1BGL-gG.js";import"./MenuItem-Uj9s8-V9.js";import"./IconCaretRight-B_wMabco.js";import"./IconCheckMark-CQY-3-zS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CH8flQ6d.js";import"./Trigger-Bl0mFWY9.js";import"./IconCaretDown-B2SIJpLO.js";import"./IconCaretDown16-Cz4JQCqT.js";import"./IconCross-DWeuQ1JS.js";import"./IconExclamationMarkTriangle-mlvDeGrH.js";import"./IconExclamationMarkTriangle24-C2n0SPiZ.js";import"./IconTrashBin16-P9BnFBNa.js";import"./IconTrashBin24-BtqjXLr0.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BLiyXpiv.js";import"./Portal-nIPd8MLx.js";import"./useMemoizedId-BEUTTPGp.js";import"./FormControl-BzDjNNoV.js";import"./InputLabel-QcPAW579.js";import"./TooltipIcon-D1bgs6mY.js";import"./LegacyTooltip-uEHKcS05.js";import"./useLink-C1eg4OUw.js";import"./IconExclamationMarkCircle24-DIy9V4jm.js";import"./IconQuestionMarkCircle-DSmq-Pjo.js";import"./Switch-Bn7c7Gvc.js";import"./TabItem-BUF1jYrI.js";import"./TextInput-CWHjYK3t.js";import"./Tooltip-izQuXX3x.js";import"./useClickOutside-TKpqzDgM.js";import"./Tree-CQXnKAKI.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-C1Xn7-g7.js";const _o={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const No=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,No as __namedExportsOrder,_o as default};
