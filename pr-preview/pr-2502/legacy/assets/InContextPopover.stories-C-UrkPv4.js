import{r as p,j as t}from"./iframe-BsrH74wW.js";import{a as l}from"./Box-BoU9j_-M.js";import{B as d}from"./Button-Ca7IJx5d.js";import{D as u}from"./DialogBody-ZzDA7jur.js";import{D as g}from"./DialogFooter-CpoKS4gX.js";import{D as f}from"./DialogHeader-BQqtkZhF.js";import{P as n}from"./Popover-BJE_KCY0.js";import{I as x}from"./IconJohanna-mJLCPGVa.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CMubI7vX.js";import"./Dropdown-vrNjwJ4t.js";import"./useButton-PikOkiBX.js";import"./useFocusable-D4UOYfqs.js";import"./useFocusRing-hWS3vXVU.js";import"./useEffectEvent-BNtJsWpB.js";import"./chain-F-BtQllU.js";import"./index-BuHowFQm.js";import"./FocusScope-D-MiZ49_.js";import"./useOverlayTriggerState-CQObmmI1.js";import"./useControlledState-B5iqGSbV.js";import"./useMenuTrigger-DHg7FuWy.js";import"./useLabels-DykprWij.js";import"./useLocalizedStringFormatter-BnBHXZ2i.js";import"./context-WDB9iL2j.js";import"./VisuallyHidden-DoRJ1ABU.js";import"./helper-BASIhnZe.js";import"./keyboard-DY2UNgnm.js";import"./SelectionManager-dybXC34z.js";import"./useField-Dzkf9Z-B.js";import"./useFormValidationState-XqvpKhv-.js";import"./usePopper-D4H62yBu.js";import"./index-BVx1uj1e.js";import"./MenuItem-Dw6fhHFt.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C5TlupxE.js";import"./IconCheckMark-BonruZ95.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-s8Rinl8F.js";import"./Trigger-DYPmnBhX.js";import"./IconCaretDown-ClCIJDke.js";import"./IconCaretDown16-V3Dju6dr.js";import"./IconCross-BWIuzEwt.js";import"./IconExclamationMarkTriangle-Bu22p--y.js";import"./IconExclamationMarkTriangle24-D4qPWYL4.js";import"./IconTrashBin16-DlVR9DwO.js";import"./IconTrashBin24-Clf_HqQZ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-IRN-cTF_.js";import"./Portal-BJaQAvNu.js";import"./useMemoizedId-JCqlWWiP.js";import"./FormControl-DCqfzu6M.js";import"./InputLabel-BeG_0hG4.js";import"./TooltipIcon-a-cgVA81.js";import"./LegacyTooltip-w6VRqQyz.js";import"./useLink-N5D_jC9v.js";import"./IconExclamationMarkCircle24-onFYI8CK.js";import"./IconQuestionMarkCircle-DvRcLFtP.js";import"./Switch-CAzpIv7f.js";import"./TabItem-C5L6J1Pg.js";import"./TextInput-B5tiVWeN.js";import"./Tooltip-BHVUW8DF.js";import"./useClickOutside-BoYLtvpE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BK8uNI6q.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BOwXRHQD.js";const yt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const Ft=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Ft as __namedExportsOrder,yt as default};
