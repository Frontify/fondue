import{r as p,j as t}from"./iframe-DkeuAZGN.js";import{a as l}from"./Box-CKSPIqz1.js";import{B as d}from"./Button-Cyg2loOs.js";import{D as u}from"./DialogBody-BhrQ69MU.js";import{D as g}from"./DialogFooter-BKAbJNKj.js";import{D as f}from"./DialogHeader-BfkBmprl.js";import{P as n}from"./Popover-CYWYTmCb.js";import{I as x}from"./IconIcon-C84NygL6.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-x2DM1voP.js";import"./Divider-BOKamc1v.js";import"./Dropdown-Dz6KAcG4.js";import"./useButton-DMxfMeHO.js";import"./useFocusable-BFcWdvIz.js";import"./useFocusRing-DV1ndlYm.js";import"./useEffectEvent-p_mtkbDO.js";import"./chain-CAdXsIYK.js";import"./index-DGl5uXCK.js";import"./FocusScope-CWLvvfZj.js";import"./useOverlayTriggerState-DfyYWZfM.js";import"./useControlledState-BMnYmkPp.js";import"./useMenuTrigger-CSYe2A-2.js";import"./useLabels-a9mHBJ4N.js";import"./useLocalizedStringFormatter-DZ9hskvU.js";import"./context-CwvE4v2V.js";import"./VisuallyHidden-B2MJ5_a1.js";import"./helper-CaAYgyFI.js";import"./keyboard-Cy4ODuoA.js";import"./SelectionManager-DzET1wUq.js";import"./useField-BLvA30x0.js";import"./useFormValidationState-Bfsywdbb.js";import"./usePopper-DJ8Ra6pa.js";import"./index-QN_6ztFs.js";import"./MenuItem-cnoEN4N-.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DbFwzl53.js";import"./IconCheckMark-BiPkWBUo.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DcHgqeRw.js";import"./Trigger-g-PSolXT.js";import"./IconCaretDown-DYgzH1Dj.js";import"./IconCaretDown16-z4g6R74Y.js";import"./IconCross-BAyIl8km.js";import"./IconExclamationMarkTriangle-BJT3VxjX.js";import"./IconExclamationMarkTriangle24-WjiVeEOa.js";import"./IconTrashBin16-BbxXYwm0.js";import"./IconTrashBin24-De7vrx_E.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-9dEMfA_M.js";import"./Portal-BMGHkKMU.js";import"./useMemoizedId-nou-DeIg.js";import"./FormControl-Cr4pEOLe.js";import"./InputLabel-g3xE7uYS.js";import"./TooltipIcon-CTQIKmsd.js";import"./LegacyTooltip-DhsEbG6A.js";import"./useLink-D_dJZrWN.js";import"./IconExclamationMarkCircle24-Dc8IlBFK.js";import"./IconQuestionMarkCircle-BTA8lui4.js";import"./Switch-C_UZItiR.js";import"./TabItem-nV4RBMGC.js";import"./TextInput-DJpfvaHj.js";import"./Tooltip-BWUoNyF1.js";import"./useClickOutside-DnmkQ4-b.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DhyCmg2e.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BJIK7lEu.js";import"./IconIcon16-CKwU6JAs.js";import"./IconIcon24-v1gbUfbP.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
