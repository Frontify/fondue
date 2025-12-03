import{r as p,j as t}from"./iframe-C5FCeANG.js";import{a as l}from"./Box-CejzEdD9.js";import{B as d}from"./Button-pSl7YIn6.js";import{D as u}from"./DialogBody-CgLazonz.js";import{D as g}from"./DialogFooter-ruBTm7w1.js";import{D as f}from"./DialogHeader-Cz1aUVRY.js";import{P as n}from"./Popover-D6OddvmN.js";import{I as x}from"./IconIcon-B6vCTcIt.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DyKck07G.js";import"./Divider-B3vPtGWV.js";import"./Dropdown-68H7QW5t.js";import"./useButton-ZILAtz4G.js";import"./useFocusable-CY4uEMcZ.js";import"./useFocusRing-CSVVjKoO.js";import"./useEffectEvent-Cco2ff7h.js";import"./chain-B9u4QWXy.js";import"./index-DTL76Uzm.js";import"./FocusScope-DUJW4sW9.js";import"./useOverlayTriggerState-CmB7Q7xQ.js";import"./useControlledState-DUJj6fF8.js";import"./useMenuTrigger-B76dE1tY.js";import"./useLabels-C6587Rwv.js";import"./useLocalizedStringFormatter-C6JeEUeQ.js";import"./context-CFHaOxRb.js";import"./VisuallyHidden-DNomqPth.js";import"./helper-Btg6kSDv.js";import"./keyboard-h-whvZ9l.js";import"./SelectionManager-Cypv6ImN.js";import"./useField-CrD9-LIh.js";import"./useFormValidationState-D7UwuQXV.js";import"./usePopper-TsKshzhZ.js";import"./index-DO8gX9nn.js";import"./MenuItem-B7s3STBs.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-BxEtnF3E.js";import"./IconCheckMark-DgmsN_BS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DNEFvbJq.js";import"./Trigger-CAWL6COj.js";import"./IconCaretDown-Bo3-wsXi.js";import"./IconCaretDown16-B3Wb7dsU.js";import"./IconCross-PAKP7vlq.js";import"./IconExclamationMarkTriangle-BEtRbrcZ.js";import"./IconExclamationMarkTriangle24-DrttrznJ.js";import"./IconTrashBin16-BBy7j7q_.js";import"./IconTrashBin24-CeM0tTNB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CG8Vi9yo.js";import"./Portal-DYc2VTWX.js";import"./useMemoizedId-BZYsMqio.js";import"./FormControl-D6-pg3ec.js";import"./InputLabel-CFmjz5AS.js";import"./TooltipIcon-PUl9w845.js";import"./LegacyTooltip-BknZ-Vak.js";import"./useLink-BxRMFuuh.js";import"./IconExclamationMarkCircle24-DKp6IBYY.js";import"./IconQuestionMarkCircle-C8O1sgV_.js";import"./Switch-CAYbyrAA.js";import"./TabItem-CQdW0_QP.js";import"./TextInput-BNgbcGER.js";import"./Tooltip-CVpq9eSP.js";import"./useClickOutside-Cpgd9MVc.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DWqfVsyk.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Vyon2QEr.js";import"./IconIcon16-DfCtLuTw.js";import"./IconIcon24-E0LUn5Kt.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
