import{r as p,j as t}from"./iframe-DQZoCshs.js";import{a as l}from"./Box-BDl1uIVb.js";import{B as d}from"./Button-ytMoA_uz.js";import{D as u}from"./DialogBody-B6Iy1ycJ.js";import{D as g}from"./DialogFooter-CgTuWzG2.js";import{D as f}from"./DialogHeader-78hqgY8C.js";import{P as n}from"./Popover-14XzoXHD.js";import{I as x}from"./IconJohanna-37GjpJRx.js";import"./preload-helper-ClJkntjM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-z8GwYBpE.js";import"./Checkbox-C4MvX6Ye.js";import"./useFocusable-BBQoLTeh.js";import"./useFocusRing-DzC-uLC_.js";import"./useEffectEvent-CGYJKY5S.js";import"./chain-BuRxycqd.js";import"./index-B8qXirP9.js";import"./useFormValidationState-DbKGDjYr.js";import"./useControlledState-CtyZ7QgW.js";import"./InputLabel-Dzdxn41b.js";import"./TooltipIcon-C7r6FNKp.js";import"./LegacyTooltip-CDAdmYGm.js";import"./useLink-LUVwUCH7.js";import"./usePopper-DszYhXja.js";import"./index-3IyLkK9K.js";import"./Portal-BKobMvb1.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D0yBRadr.js";import"./IconCheckMark-CjcfOY3h.js";import"./IconExclamationMarkCircle24-YH8jJSgF.js";import"./IconExclamationMarkTriangle-CBiEK6F-.js";import"./IconExclamationMarkTriangle24-DjctIpBj.js";import"./IconQuestionMarkCircle-DwleYyem.js";import"./IconMinus-CfoqbIj7.js";import"./Divider-D7lSDPcQ.js";import"./Dropdown-CqY_CMr7.js";import"./useButton-CsNnQIPX.js";import"./FocusScope-DH9wDV-9.js";import"./useOverlayTriggerState-C6YZ0OW1.js";import"./useMenuTrigger-OXhk5r7d.js";import"./useLabels-CxTsjsBe.js";import"./useLocalizedStringFormatter-IWxdoe4l.js";import"./context-CP3_KLJu.js";import"./VisuallyHidden-qmSAPGWI.js";import"./helper-DVQH8vyC.js";import"./keyboard-QJqQzFc3.js";import"./SelectionManager-DwoBoMb8.js";import"./useField-Bk-U2Zzd.js";import"./MenuItem-Dw3WqHed.js";import"./IconCaretRight-Ez1SMPuo.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BvV7T1zK.js";import"./Trigger-C9FqWfj_.js";import"./IconCaretDown-0NTUtVqi.js";import"./IconCaretDown16-jWrqagMd.js";import"./IconCross-BUNknNaW.js";import"./IconTrashBin16-D30EDo3n.js";import"./IconTrashBin24-C2S7T8fv.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B7pwOcwp.js";import"./FormControl-Nwry38Le.js";import"./Switch-BG7E8pTO.js";import"./TabItem-AjV6Ylio.js";import"./TextInput-BtZ3-Qgd.js";import"./Tooltip-ClLcCziU.js";import"./useClickOutside-BW83cRIA.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BdFovfk1.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BQSDo5dI.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
