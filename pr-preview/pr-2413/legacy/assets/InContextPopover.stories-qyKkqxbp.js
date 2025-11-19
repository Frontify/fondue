import{r as p,j as t}from"./iframe-Dtd24MxH.js";import{a as l}from"./Box-BojVmlVK.js";import{B as d}from"./Button-BmA2c-Ez.js";import{D as u}from"./DialogBody-CIeicB_v.js";import{D as g}from"./DialogFooter-DkrPpW9Y.js";import{D as f}from"./DialogHeader-Ix4N9Yh4.js";import{P as n}from"./Popover-C_4M1e9o.js";import{I as x}from"./IconIcon-D6z4OH0w.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CHxH5ccZ.js";import"./Dropdown-DlM-B9Sh.js";import"./useButton-Bd4xaui-.js";import"./useFocusable-BMUoJisz.js";import"./useFocusRing-CL2h4CZj.js";import"./useEffectEvent-DviX6QEk.js";import"./chain-IU3pdxS0.js";import"./index-rfpevG3F.js";import"./FocusScope-DMsSqXBe.js";import"./useOverlayTriggerState-CRWG4qdj.js";import"./useControlledState-c0Ko6UWb.js";import"./useMenuTrigger-Ba7VO8A8.js";import"./useLabels-CuMlQRR9.js";import"./useLocalizedStringFormatter-DwQuFwip.js";import"./context-389Zq0wA.js";import"./VisuallyHidden-CYR0IsLz.js";import"./helper-CdZciewc.js";import"./keyboard-CJhA8ta1.js";import"./SelectionManager-BdGAmMai.js";import"./useField-Ry6uqgzn.js";import"./useFormValidationState-BxRoQvn-.js";import"./usePopper-DabaB_ap.js";import"./index-C7HzEFMc.js";import"./MenuItem-77x5yKXI.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-3linth-Y.js";import"./IconCheckMark-C7ywmL8h.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Jreppdbq.js";import"./Trigger-5E1_yXNr.js";import"./IconCaretDown--7xAo5sy.js";import"./IconCaretDown16-BDaxg1xa.js";import"./IconCross-Dt54EG0U.js";import"./IconExclamationMarkTriangle-BxritIK-.js";import"./IconExclamationMarkTriangle24-D5inHBjm.js";import"./IconTrashBin16-DeOyP_ds.js";import"./IconTrashBin24-bX9idqUZ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Doy2CqR6.js";import"./Portal-y5hFKhRU.js";import"./useMemoizedId-BHL4PMrn.js";import"./FormControl-xL0h1wQs.js";import"./InputLabel-B2u6dO4K.js";import"./TooltipIcon-Dpg-viXv.js";import"./LegacyTooltip-RevLrkgj.js";import"./useLink-DXPeYuPX.js";import"./IconExclamationMarkCircle24-rywGLGWv.js";import"./IconQuestionMarkCircle-_l4CM1fs.js";import"./Switch-CaINkcUE.js";import"./TabItem-DY7SdcUI.js";import"./TextInput-BbF7tWPV.js";import"./Tooltip-B6xBH96n.js";import"./useClickOutside-BnODS62_.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D2-ze09V.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-qqW3MJLe.js";import"./IconIcon16-B19K3qks.js";import"./IconIcon24-7F9YOzHr.js";const kt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Box className="tw-w-[400px]">
                    <DialogHeader title="Title" padding="compact"></DialogHeader>
                    <DialogBody padding="compact">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae
                            quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod
                            ullam. Beatae deserunt eum quibusdam ratione.
                        </p>
                    </DialogBody>
                    <DialogFooter padding="compact" actionButtons={[{
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </Box>
            </Popover>
        </div>;
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Nt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Nt as __namedExportsOrder,kt as default};
