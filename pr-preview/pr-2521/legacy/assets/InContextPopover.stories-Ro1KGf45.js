import{r as p,j as t}from"./iframe-BM7ef9cd.js";import{a as l}from"./Box-BDI0AoIe.js";import{B as d}from"./Button-D3BlpDGO.js";import{D as u}from"./DialogBody-DMu3teAI.js";import{D as g}from"./DialogFooter-B8USxwv6.js";import{D as f}from"./DialogHeader-1VK2wzAf.js";import{P as n}from"./Popover-CRqrRK_i.js";import{I as x}from"./IconIcon-DgFGBsZD.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CM7GoLG0.js";import"./Divider-DLXoYDJG.js";import"./Dropdown-BX4meYN2.js";import"./useButton-BVtexVRf.js";import"./useFocusable-BE1kPMio.js";import"./useFocusRing-BEC2owvQ.js";import"./useEffectEvent-BC_1uHyR.js";import"./chain-alM-wSYL.js";import"./index-CqMzEB5i.js";import"./FocusScope-DL7-Bqqi.js";import"./useOverlayTriggerState-CZotgndy.js";import"./useControlledState-CHhpUkp0.js";import"./useMenuTrigger-BXCREVSp.js";import"./useLabels-Ds2PpTN7.js";import"./useLocalizedStringFormatter-69TNCH83.js";import"./context-1U3mNMRV.js";import"./VisuallyHidden-CDwv4QbC.js";import"./helper-jHS2d2qQ.js";import"./keyboard-my2f-9FG.js";import"./SelectionManager-GTUli88q.js";import"./useField-ByUvNGor.js";import"./useFormValidationState-DzXeuUB0.js";import"./usePopper-DnQbG6Dm.js";import"./index-DvD3x05a.js";import"./MenuItem-D8DU1p7f.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B9n7WX4x.js";import"./IconCheckMark-CIHN93e5.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CAeqqZJ1.js";import"./Trigger-ByGBqbrp.js";import"./IconCaretDown-BxZaxq_6.js";import"./IconCaretDown16-DildURkb.js";import"./IconCross-DbmORowV.js";import"./IconExclamationMarkTriangle-CGKXM6PS.js";import"./IconExclamationMarkTriangle24-Dc_rwIH6.js";import"./IconTrashBin16-DY1V43zp.js";import"./IconTrashBin24-Ci6kQii_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BrP4X50G.js";import"./Portal-Cc6MwqwZ.js";import"./useMemoizedId-B6KdJLbo.js";import"./FormControl-YhBUG1d9.js";import"./InputLabel-g6I3etEJ.js";import"./TooltipIcon-CpaG5WEB.js";import"./LegacyTooltip-DwWPrLpM.js";import"./useLink-Bc9Xufj0.js";import"./IconExclamationMarkCircle24-CmndOdXf.js";import"./IconQuestionMarkCircle-D_64i_0i.js";import"./Switch-kFbq1dH3.js";import"./TabItem-C-Spro5Q.js";import"./TextInput-BGEzNyCQ.js";import"./Tooltip-BetQNmeG.js";import"./useClickOutside-DvjhYIr4.js";import"./dialog-D9O7a7Fm.js";import"./Tree-HpA7bznW.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BRXNycHN.js";import"./IconIcon16-DO7iMaHA.js";import"./IconIcon24-BQKcgnTu.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
