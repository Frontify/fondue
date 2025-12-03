import{r as p,j as t}from"./iframe-BAs66q-y.js";import{a as l}from"./Box-Czuxq3f_.js";import{B as d}from"./Button-DiFEGYOd.js";import{D as u}from"./DialogBody-QEtHFz8-.js";import{D as g}from"./DialogFooter-C5pGbMXh.js";import{D as f}from"./DialogHeader-BFwr_Hop.js";import{P as n}from"./Popover-C5_o3-Qy.js";import{I as x}from"./IconIcon-BfBLbMWD.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Df4HuyWW.js";import"./Divider-BHk6ADaB.js";import"./Dropdown-CyVeFiwv.js";import"./useButton-CYVFW046.js";import"./useFocusable-sCR6hlmP.js";import"./useFocusRing-DtTNLt6b.js";import"./useEffectEvent-DUywcjoj.js";import"./chain-DnRJsLVr.js";import"./index-Bh1fiD1s.js";import"./FocusScope-D9HFzMt2.js";import"./useOverlayTriggerState-D6F0qxv5.js";import"./useControlledState-DJ95kXMR.js";import"./useMenuTrigger-DjMW7zZh.js";import"./useLabels-Dg7dxfz3.js";import"./useLocalizedStringFormatter-CwIUowm7.js";import"./context-BqDYnsXe.js";import"./VisuallyHidden-BsEKTHRO.js";import"./helper-BgMr6a0O.js";import"./keyboard-PIaYjKXa.js";import"./SelectionManager-B__P9tjp.js";import"./useField-CzlnO5I0.js";import"./useFormValidationState-C3ThlA5x.js";import"./usePopper-DnwQV-I2.js";import"./index-DAF0bHRr.js";import"./MenuItem-CvekQis2.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B83ypG7N.js";import"./IconCheckMark-ClJoYzcd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-stetqMeh.js";import"./Trigger-BmWuE7Ap.js";import"./IconCaretDown-BgNMmECk.js";import"./IconCaretDown16-C3ruKkfy.js";import"./IconCross-DQtaiSeo.js";import"./IconExclamationMarkTriangle-CUgf1hN4.js";import"./IconExclamationMarkTriangle24-fIc-6H-A.js";import"./IconTrashBin16-OauIEEpQ.js";import"./IconTrashBin24-CQB4zbX2.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bz-0KfR0.js";import"./Portal-CZvTnhKZ.js";import"./useMemoizedId-4MNB7gNb.js";import"./FormControl-8DuxOAbG.js";import"./InputLabel-D4el736C.js";import"./TooltipIcon-BgDhRiQe.js";import"./LegacyTooltip-B4izmg71.js";import"./useLink-dheUg-NM.js";import"./IconExclamationMarkCircle24-DerCV26r.js";import"./IconQuestionMarkCircle-CjKqKFR0.js";import"./Switch-DEUU4lT2.js";import"./TabItem-C-Hm3P-3.js";import"./TextInput-BL5oiPXa.js";import"./Tooltip-PuWPc4b0.js";import"./useClickOutside-C7qyTSbO.js";import"./dialog-D9O7a7Fm.js";import"./Tree-uW6T6fR6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DzVsRQlw.js";import"./IconIcon16-B6wo4Wzb.js";import"./IconIcon24-BmOp81ZF.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
