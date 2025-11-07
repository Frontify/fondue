import{r as p,j as t}from"./iframe-BoDZ-62Y.js";import{a as l}from"./Box-dpqcsXit.js";import{B as d}from"./Button-XdttJYYW.js";import{D as u}from"./DialogBody-SibwY-Nm.js";import{D as g}from"./DialogFooter-wWZf1O32.js";import{D as f}from"./DialogHeader-fbG1rikO.js";import{P as n}from"./Popover-C3c7rYnF.js";import{I as x}from"./IconIcon-aNRBFDMG.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DM6-sKQT.js";import"./Divider-CDbGDUMW.js";import"./Dropdown-C89E-ui-.js";import"./useButton-BOiM2RrI.js";import"./useFocusable-IrRukKaY.js";import"./useFocusRing-C82xZb5f.js";import"./useEffectEvent-CL3fZGDF.js";import"./chain-CtJGAl97.js";import"./index-DniVUvLY.js";import"./FocusScope-BJM6DygL.js";import"./useOverlayTriggerState--76nwOyg.js";import"./useControlledState-D4E8YFD2.js";import"./useMenuTrigger-DfanVkFJ.js";import"./useLabels-Bn-zGoDP.js";import"./useLocalizedStringFormatter-BzyNpVuE.js";import"./context-BI_iBaQx.js";import"./VisuallyHidden-wNCK1ErZ.js";import"./helper-CVvlIGp8.js";import"./keyboard-DpnoosrG.js";import"./SelectionManager-CDCBW3Mu.js";import"./useField-BdBRqYcV.js";import"./useFormValidationState-BUePSdx-.js";import"./usePopper-fX-V3a5j.js";import"./index-Dy7Jj2P1.js";import"./MenuItem-BdhJiMlc.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-D2TbKBqd.js";import"./IconCheckMark-Bhtr2HMb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Dcgk16SJ.js";import"./Trigger-DeSIG4eM.js";import"./IconCaretDown-tlfhZzfs.js";import"./IconCaretDown16-Dfz3_L5B.js";import"./IconCross-CFotdVXc.js";import"./IconExclamationMarkTriangle-BjTSrBRl.js";import"./IconExclamationMarkTriangle24-C8IyBX4S.js";import"./IconTrashBin16-Cx4-ceNO.js";import"./IconTrashBin24-gvulk-5K.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B-SFKPCM.js";import"./Portal-Cd-p_RwN.js";import"./useMemoizedId-DSzFtEMc.js";import"./FormControl-DkAU8isK.js";import"./InputLabel-RHUqZBiI.js";import"./TooltipIcon-BCLIHycj.js";import"./LegacyTooltip-DnSpI6bL.js";import"./useLink-ntWqaK50.js";import"./IconExclamationMarkCircle24-DwluY09Y.js";import"./IconQuestionMarkCircle-DGkGHnN8.js";import"./Switch-C8qfsnGD.js";import"./TabItem-BNybx-7f.js";import"./TextInput-C4npCLQz.js";import"./Tooltip-Bmh9kEw6.js";import"./useClickOutside-BnjlGsM0.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C1AwpO8S.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-CUQ-etYG.js";import"./IconIcon16-DA4M9EdO.js";import"./IconIcon24-DRZ3ZEpR.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
