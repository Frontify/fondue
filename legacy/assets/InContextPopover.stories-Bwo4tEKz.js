import{r as p,j as t}from"./iframe-BA0Mz7oG.js";import{a as l}from"./Box-6EgFzlg5.js";import{B as d}from"./Button-BMcKUNaS.js";import{D as u}from"./DialogBody-DPSxQ9xC.js";import{D as g}from"./DialogFooter-BRTqIAtT.js";import{D as f}from"./DialogHeader-CBlc52qn.js";import{P as n}from"./Popover-DFKnb7lu.js";import{I as x}from"./IconIcon-DQXc9H61.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BhY5ATgP.js";import"./Divider-BQTpcCZ1.js";import"./Dropdown-m3PlXCHT.js";import"./useButton-C3UyT0Z5.js";import"./useFocusable-B19sJuLq.js";import"./useFocusRing-DV-myszv.js";import"./useEffectEvent-CUAIJOQt.js";import"./chain-BmiFarN7.js";import"./index-C8Y1Fo5J.js";import"./FocusScope-1wMxK_PV.js";import"./useOverlayTriggerState-Zz4T26iK.js";import"./useControlledState-DUTcD0La.js";import"./useMenuTrigger-DReJd5tq.js";import"./useLabels-CvZxNEa3.js";import"./useLocalizedStringFormatter-BXDW7lKW.js";import"./context-CFhd1GSa.js";import"./VisuallyHidden-BmYzMKFw.js";import"./helper-BEDA2E7r.js";import"./keyboard-CJWK3Pb7.js";import"./SelectionManager-CMBHO6YV.js";import"./useField-BBXdNT_C.js";import"./useFormValidationState-uGPj3SfU.js";import"./usePopper-BboI6ZtD.js";import"./index-_rDBBRbe.js";import"./MenuItem-DyVT4swA.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DFhJNzD7.js";import"./IconCheckMark-jgsk33Ac.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DVhJLBvl.js";import"./Trigger-WKBugyiB.js";import"./IconCaretDown-BIBe4WwZ.js";import"./IconCaretDown16-DJi1Y7nM.js";import"./IconCross-Dz3mCt_c.js";import"./IconExclamationMarkTriangle-ChaJ9IRd.js";import"./IconExclamationMarkTriangle24-nnnmpyhC.js";import"./IconTrashBin16-J_Xa8eUp.js";import"./IconTrashBin24-B1AFtuTy.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Jb0Q3zWN.js";import"./Portal-FaQGc_aH.js";import"./useMemoizedId-BOmFmYFD.js";import"./FormControl-BpVZp6SF.js";import"./InputLabel-CaL3IwWg.js";import"./TooltipIcon-D1mkVicS.js";import"./LegacyTooltip-3QXpUEwW.js";import"./useLink-88124U24.js";import"./IconExclamationMarkCircle24-CoHtCN_U.js";import"./IconQuestionMarkCircle-BR4Rojrk.js";import"./Switch-Dy7-sb6F.js";import"./TabItem-2OFAmaau.js";import"./TextInput-WvGvOj3y.js";import"./Tooltip-CUfVLjDz.js";import"./useClickOutside-BBPHLqZS.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CybCrDUv.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DZ86GbIF.js";import"./IconIcon16-BktjyK3h.js";import"./IconIcon24-FvvEoF7z.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
