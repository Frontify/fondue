import{r as p,j as t}from"./iframe-CHTDhBOw.js";import{a as l}from"./Box-CBPJusEs.js";import{B as d}from"./Button-BGdoAku5.js";import{D as u}from"./DialogBody-CxArk14k.js";import{D as g}from"./DialogFooter-B9QNP724.js";import{D as f}from"./DialogHeader-B4EsOdAE.js";import{P as n}from"./Popover-BgfI2Jqu.js";import{I as x}from"./IconJohanna-CHc-af32.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-djRa9qHK.js";import"./Divider-CIYdp59O.js";import"./Dropdown-jHV7NTSi.js";import"./useButton-DQwwQNDs.js";import"./useFocusable-wUQP4iRG.js";import"./useFocusRing-B9ljnzvU.js";import"./useEffectEvent-C_zZUYtw.js";import"./chain-gGRwirEw.js";import"./index-NZpU9fsB.js";import"./FocusScope-CbrJ0X92.js";import"./useOverlayTriggerState-ChnurNZW.js";import"./useControlledState-Dyp77OM5.js";import"./useMenuTrigger-grTO5Qe1.js";import"./useLabels-IJBk5yiI.js";import"./useLocalizedStringFormatter-BQCdTs0l.js";import"./context-BiY5BK-o.js";import"./VisuallyHidden-BCHw-yIg.js";import"./helper-B9AmTkD4.js";import"./keyboard-Db7mZRua.js";import"./SelectionManager-CfehHhqG.js";import"./useField-yVlFEyW7.js";import"./useFormValidationState-B2zh8KVN.js";import"./usePopper-C5FqElHn.js";import"./index-B1BGL-gG.js";import"./MenuItem-Uj9s8-V9.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B_wMabco.js";import"./IconCheckMark-CQY-3-zS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CH8flQ6d.js";import"./Trigger-Bl0mFWY9.js";import"./IconCaretDown-B2SIJpLO.js";import"./IconCaretDown16-Cz4JQCqT.js";import"./IconCross-DWeuQ1JS.js";import"./IconExclamationMarkTriangle-mlvDeGrH.js";import"./IconExclamationMarkTriangle24-C2n0SPiZ.js";import"./IconTrashBin16-P9BnFBNa.js";import"./IconTrashBin24-BtqjXLr0.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BLiyXpiv.js";import"./Portal-nIPd8MLx.js";import"./useMemoizedId-BEUTTPGp.js";import"./FormControl-BzDjNNoV.js";import"./InputLabel-QcPAW579.js";import"./TooltipIcon-D1bgs6mY.js";import"./LegacyTooltip-uEHKcS05.js";import"./useLink-C1eg4OUw.js";import"./IconExclamationMarkCircle24-DIy9V4jm.js";import"./IconQuestionMarkCircle-DSmq-Pjo.js";import"./Switch-Bn7c7Gvc.js";import"./TabItem-BUF1jYrI.js";import"./TextInput-CWHjYK3t.js";import"./Tooltip-izQuXX3x.js";import"./useClickOutside-TKpqzDgM.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CQXnKAKI.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-C1Xn7-g7.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
