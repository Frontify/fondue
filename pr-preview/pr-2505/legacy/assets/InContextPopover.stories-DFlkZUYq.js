import{r as p,j as t}from"./iframe-DvE_Cfbx.js";import{a as l}from"./Box-Dp80e-XP.js";import{B as d}from"./Button-D4w0aNJF.js";import{D as u}from"./DialogBody-e7l6N9bm.js";import{D as g}from"./DialogFooter-DTyhCwEE.js";import{D as f}from"./DialogHeader-wVAKmA82.js";import{P as n}from"./Popover-oquhKdww.js";import{I as x}from"./IconJohanna-CaX0CZFj.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BbtE7GOK.js";import"./Divider-BWXyH0fd.js";import"./Dropdown-BcR6SuzD.js";import"./useButton-Cnlh5iFm.js";import"./useFocusable-YbUi6w36.js";import"./useFocusRing-DzW8Z_47.js";import"./useEffectEvent-BtTn6BuB.js";import"./chain-EXX0zfKx.js";import"./index-C1x3BvL1.js";import"./FocusScope-CICA33ZM.js";import"./useOverlayTriggerState-VX9MWZa-.js";import"./useControlledState-B4RRmpoX.js";import"./useMenuTrigger-B0K6261F.js";import"./useLabels-B4qGKxij.js";import"./useLocalizedStringFormatter-uH6M_LlD.js";import"./context-CjYtJ2Dh.js";import"./VisuallyHidden-CH37k1zR.js";import"./helper-hQLxgAVw.js";import"./keyboard-Do92NHuN.js";import"./SelectionManager-DmiDq3y6.js";import"./useField-D1PK1BbW.js";import"./useFormValidationState-DTcHrzlU.js";import"./usePopper-0GpztLz0.js";import"./index-CgHmLPyd.js";import"./MenuItem-DjyGJryO.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DG2OLDac.js";import"./IconCheckMark-BnWU-4-4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B7EbVwIE.js";import"./Trigger-WSkRExH6.js";import"./IconCaretDown-BLKtQPMT.js";import"./IconCaretDown16-tjMVBqmZ.js";import"./IconCross-ILvZHpzK.js";import"./IconExclamationMarkTriangle-CtL4mprZ.js";import"./IconExclamationMarkTriangle24-BeKRmNeI.js";import"./IconTrashBin16-Ye7gwNbF.js";import"./IconTrashBin24-D62Bq0Kp.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-VFf8OAPW.js";import"./Portal-DXJII2sF.js";import"./useMemoizedId-DamS-zza.js";import"./FormControl-DQTGT8Qd.js";import"./InputLabel-CPiknDaM.js";import"./TooltipIcon-BgeNhtJq.js";import"./LegacyTooltip-HylOrONJ.js";import"./useLink-DFHjCfB3.js";import"./IconExclamationMarkCircle24-DG3gLjOd.js";import"./IconQuestionMarkCircle-DyvTHndi.js";import"./Switch-D0uhFjX4.js";import"./TabItem-lY2wl6EQ.js";import"./TextInput-JeIEGuUe.js";import"./Tooltip-CI2uwgUy.js";import"./useClickOutside-BRVMQ9di.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CNHT-QdV.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-MyyQk_sl.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
