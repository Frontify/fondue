import{r as p,j as t}from"./iframe-O_XuH54Q.js";import{a as l}from"./Box-p9n4chOp.js";import{B as d}from"./Button-B58Ioqyx.js";import{D as u}from"./DialogBody-_jN4uiOy.js";import{D as g}from"./DialogFooter-D1YsHMTr.js";import{D as f}from"./DialogHeader-GHsHax7s.js";import{P as n}from"./Popover-UIkH9ACG.js";import{I as x}from"./IconJohanna-ClzdPHoK.js";import"./preload-helper-OKB6Z3Tn.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-hHIqtYHh.js";import"./Divider-yYtBfNCG.js";import"./Dropdown-CisXlk34.js";import"./useButton-C8BySKAQ.js";import"./useFocusable-C0fuhW15.js";import"./useFocusRing-Bqot2-Rk.js";import"./useEffectEvent-DACClfwZ.js";import"./chain-C6q0R5T-.js";import"./index-BVb_rcK3.js";import"./FocusScope-3do7GGAS.js";import"./useOverlayTriggerState-kzEfGejS.js";import"./useControlledState-B6qV4UF7.js";import"./useMenuTrigger-BkxjOV5I.js";import"./useLabels-vi5D6r2t.js";import"./useLocalizedStringFormatter-Xd96at2a.js";import"./context-CYxI3e2S.js";import"./VisuallyHidden-TL1dlXLg.js";import"./helper-B92HrXNX.js";import"./keyboard-Bkql7voq.js";import"./SelectionManager-BnFpMhKG.js";import"./useField-B-7APjb3.js";import"./useFormValidationState-C1mqDRzs.js";import"./usePopper-CVWvsVB1.js";import"./index-BLmxJglX.js";import"./MenuItem-BvAIyVQb.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-7Y9Pbj0u.js";import"./IconCheckMark-BeCL8EEQ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B4E3yWjH.js";import"./Trigger-Bdyc308T.js";import"./IconCaretDown-CeAN14oY.js";import"./IconCaretDown16-CXHhXr84.js";import"./IconCross-iTiFWRH5.js";import"./IconExclamationMarkTriangle-B1eeTH9v.js";import"./IconExclamationMarkTriangle24-ClNbD2R3.js";import"./IconTrashBin16-BE79xRak.js";import"./IconTrashBin24-BjrrNMTQ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNQxf1Z5.js";import"./Portal-C3Khk6dG.js";import"./useMemoizedId-BWUvvHPY.js";import"./FormControl-BzAndHoF.js";import"./InputLabel-J904gGNu.js";import"./TooltipIcon-BBkgYmHu.js";import"./LegacyTooltip-DF0yijww.js";import"./useLink-DIfoGhG2.js";import"./IconExclamationMarkCircle24-BJXQgdBn.js";import"./IconQuestionMarkCircle-D3VJ3tCq.js";import"./Switch-CZzOpnJT.js";import"./TabItem-DGj8BxC4.js";import"./TextInput-D-u9u7p0.js";import"./Tooltip-Ck3jaqE5.js";import"./useClickOutside-BlXnLcs9.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DTx26U4T.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DFK2GEYF.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const kt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,kt as __namedExportsOrder,Ft as default};
