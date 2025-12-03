import{r as p,j as t}from"./iframe-C7JOSz35.js";import{a as l}from"./Box-ClDUo7hq.js";import{B as d}from"./Button-CP8ZJhZu.js";import{D as u}from"./DialogBody-CGBajXkX.js";import{D as g}from"./DialogFooter-DFBAVnhE.js";import{D as f}from"./DialogHeader-BFvWH3k1.js";import{P as n}from"./Popover-5fXsEdR1.js";import{I as x}from"./IconIcon-DvAMutgc.js";import"./preload-helper-1L8wWKLL.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Etqtp1pP.js";import"./Divider-VnrqbJet.js";import"./Dropdown-Cd4BCPzM.js";import"./useButton-CgUc2oI0.js";import"./useFocusable-Dwt4J9wN.js";import"./useFocusRing-K7RGIjkv.js";import"./useEffectEvent-BKOTEyw3.js";import"./chain-Hhaz5iun.js";import"./index-BIm_f9L2.js";import"./FocusScope-e9N67m-1.js";import"./useOverlayTriggerState-D9S1TF3G.js";import"./useControlledState-Dm6dsicG.js";import"./useMenuTrigger-CWxHef3f.js";import"./useLabels-DNxyzFSf.js";import"./useLocalizedStringFormatter-G41whQA5.js";import"./context-BRO6MuBG.js";import"./VisuallyHidden-ZhLtFnJ1.js";import"./helper-BS8ZS_-V.js";import"./keyboard-Bjf4lIPo.js";import"./SelectionManager-B4jpUwKf.js";import"./useField-DnXidplQ.js";import"./useFormValidationState-BObGN0xN.js";import"./usePopper-C7dET8l6.js";import"./index-DdDF_rEU.js";import"./MenuItem-uY8r57uf.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BK3hTeUD.js";import"./IconCheckMark-DcX0E_d_.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CEf8j1r3.js";import"./Trigger-BUVOjXfY.js";import"./IconCaretDown-1ItWNo4o.js";import"./IconCaretDown16-DHXciLtK.js";import"./IconCross-Lrr-nknY.js";import"./IconExclamationMarkTriangle-YzrmnrTp.js";import"./IconExclamationMarkTriangle24-BQgDJRgV.js";import"./IconTrashBin16-ALv36KUi.js";import"./IconTrashBin24-BOAt-_fa.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BfvMlMf5.js";import"./Portal-BBaw5-ag.js";import"./useMemoizedId-J2vchGxH.js";import"./FormControl-QVbL00q_.js";import"./InputLabel-Qg5VNGmD.js";import"./TooltipIcon-a0nnUUPG.js";import"./LegacyTooltip-DXLyha72.js";import"./useLink-BHEqG8hr.js";import"./IconExclamationMarkCircle24-BuUIJ3it.js";import"./IconQuestionMarkCircle-D1fGw7N0.js";import"./Switch-Bf3FzBYG.js";import"./TabItem-0_s6xpXk.js";import"./TextInput-4jL9UWTk.js";import"./Tooltip-BcrqjYrR.js";import"./useClickOutside-BwVLQGPR.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B-q5Lc_A.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Bu_9AXae.js";import"./IconIcon16-Lc6n0URU.js";import"./IconIcon24-Bv14HURv.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
