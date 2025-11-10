import{r as s,j as t}from"./iframe-VP-rj3ss.js";import{a as l}from"./Box-C2g9G4fK.js";import{B as d}from"./Button-H9149hhP.js";import{D as u}from"./DialogBody-DUfiyOvM.js";import{D as g}from"./DialogFooter-D4dwP4dd.js";import{D as f}from"./DialogHeader-D8bz-tua.js";import{P as n}from"./Popover-DlXajZjw.js";import{I as x}from"./IconIcon-iTMmc6QP.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DbPhG1Mi.js";import"./Divider-BeS1SEC7.js";import"./FormControl-Ds9OPQIX.js";import"./InputLabel-DKfyyE-L.js";import"./TooltipIcon-BB6WuI2S.js";import"./LegacyTooltip-B3uL2g3M.js";import"./useLink-CDB-dtP1.js";import"./useFocusable-70EHDk-J.js";import"./useFocusRing-CWmfaWzw.js";import"./useEffectEvent-9NhyLe8y.js";import"./chain-D-vXek5r.js";import"./index-BzPxahxi.js";import"./usePopper-DHNSkWdc.js";import"./index-CQ-ttjzC.js";import"./Portal-BzEGVDDb.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CnSioqH6.js";import"./IconCheckMark-4MgfguYy.js";import"./IconExclamationMarkCircle24-BWBIouVW.js";import"./IconExclamationMarkTriangle-DNsIIxuS.js";import"./IconExclamationMarkTriangle24-CPd2DW0P.js";import"./IconQuestionMarkCircle-D7GyOumb.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B16sn3Wb.js";import"./Switch-DjuFcvYb.js";import"./TabItem-DHlabpFh.js";import"./elements-BOYmskOL.js";import"./TextInput-D_zE4BB7.js";import"./IconCross-I4nIknD6.js";import"./Tooltip-HV_M36R-.js";import"./useClickOutside-Bnf6bGUq.js";import"./EnablePortalWrapper-Bbp-dpHj.js";import"./dialog-D9O7a7Fm.js";import"./Tree-gAPlGMQU.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-C9zmZwbv.js";import"./IconCaretDown-AhRvL11Y.js";import"./IconCaretDown16-BfDWy1dg.js";import"./IconTrashBin16-DLeGvJqp.js";import"./IconTrashBin24-hEZp_ivy.js";import"./useButton-Ve5DxqXS.js";import"./Flex-MwjcJng8.js";import"./IconIcon16-Bd5sT5qL.js";import"./IconIcon24-BypNRLmO.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const It=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,It as __namedExportsOrder,jt as default};
