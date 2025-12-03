import{r as l,j as o}from"./iframe-C7JOSz35.js";import{B as I}from"./Button-CP8ZJhZu.js";import{D as b}from"./DialogBody-CGBajXkX.js";import{D as x}from"./DialogFooter-DFBAVnhE.js";import{I as A}from"./IconIcon-DvAMutgc.js";import{D as B}from"./Dialog-BPgKeDxM.js";import{M as r}from"./dialog-D9O7a7Fm.js";import"./preload-helper-1L8wWKLL.js";import"./useButton-CgUc2oI0.js";import"./useFocusable-Dwt4J9wN.js";import"./useFocusRing-K7RGIjkv.js";import"./useEffectEvent-BKOTEyw3.js";import"./chain-Hhaz5iun.js";import"./index-BIm_f9L2.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-ClDUo7hq.js";import"./borderStyle-D9jrV09G.js";import"./input-Etqtp1pP.js";import"./Divider-VnrqbJet.js";import"./Dropdown-Cd4BCPzM.js";import"./FocusScope-e9N67m-1.js";import"./useOverlayTriggerState-D9S1TF3G.js";import"./useControlledState-Dm6dsicG.js";import"./useMenuTrigger-CWxHef3f.js";import"./useLabels-DNxyzFSf.js";import"./useLocalizedStringFormatter-G41whQA5.js";import"./context-BRO6MuBG.js";import"./VisuallyHidden-ZhLtFnJ1.js";import"./helper-BS8ZS_-V.js";import"./keyboard-Bjf4lIPo.js";import"./SelectionManager-B4jpUwKf.js";import"./useField-DnXidplQ.js";import"./useFormValidationState-BObGN0xN.js";import"./usePopper-C7dET8l6.js";import"./index-DdDF_rEU.js";import"./MenuItem-uY8r57uf.js";import"./IconCaretRight-BK3hTeUD.js";import"./IconCheckMark-DcX0E_d_.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CEf8j1r3.js";import"./Trigger-BUVOjXfY.js";import"./IconCaretDown-1ItWNo4o.js";import"./IconCaretDown16-DHXciLtK.js";import"./IconCross-Lrr-nknY.js";import"./IconExclamationMarkTriangle-YzrmnrTp.js";import"./IconExclamationMarkTriangle24-BQgDJRgV.js";import"./IconTrashBin16-ALv36KUi.js";import"./IconTrashBin24-BOAt-_fa.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BfvMlMf5.js";import"./Portal-BBaw5-ag.js";import"./useMemoizedId-J2vchGxH.js";import"./FormControl-QVbL00q_.js";import"./InputLabel-Qg5VNGmD.js";import"./TooltipIcon-a0nnUUPG.js";import"./LegacyTooltip-DXLyha72.js";import"./useLink-BHEqG8hr.js";import"./IconExclamationMarkCircle24-BuUIJ3it.js";import"./IconQuestionMarkCircle-D1fGw7N0.js";import"./Switch-Bf3FzBYG.js";import"./TabItem-0_s6xpXk.js";import"./TextInput-4jL9UWTk.js";import"./Tooltip-BcrqjYrR.js";import"./useClickOutside-BwVLQGPR.js";import"./Tree-B-q5Lc_A.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Bu_9AXae.js";import"./IconIcon16-Lc6n0URU.js";import"./IconIcon24-Bv14HURv.js";const zo={title:"Experimental/Dialog",component:B,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=O=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(I,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(B,{...O,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(b,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(x,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const Po=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,Po as __namedExportsOrder,zo as default};
