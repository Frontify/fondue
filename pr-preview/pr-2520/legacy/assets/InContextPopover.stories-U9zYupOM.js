import{r as s,j as t}from"./iframe-DWv2_3F3.js";import{a as l}from"./Box-DZV4Rol0.js";import{B as d}from"./Button-3b6YjLG-.js";import{D as u}from"./DialogBody-BUUH1s__.js";import{D as g}from"./DialogFooter-D8DApMbJ.js";import{D as f}from"./DialogHeader-BaxNqvcA.js";import{P as n}from"./Popover-X1CIWCZ9.js";import{I as x}from"./IconIcon-2mVzQxe5.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DOHXhmdp.js";import"./Divider-CJHNe1Lx.js";import"./FormControl-DPSEspuo.js";import"./InputLabel-BpbBpTEJ.js";import"./TooltipIcon-BWW4VUwK.js";import"./LegacyTooltip-Bkj0Y90d.js";import"./useLink-xo2YEpBC.js";import"./useFocusable-qSwycdkT.js";import"./useFocusRing-C16v0dJv.js";import"./useEffectEvent-juQ_2xsn.js";import"./chain-DnIzMUek.js";import"./index-CLQYMQ4B.js";import"./usePopper-DLcHPtMx.js";import"./index-DHnyPWvB.js";import"./Portal-BV8sDH92.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BszDH4v2.js";import"./IconCheckMark-BP-kTSCX.js";import"./IconExclamationMarkCircle24-BFKPQHIe.js";import"./IconExclamationMarkTriangle-DLLktyep.js";import"./IconExclamationMarkTriangle24-N_dmScL6.js";import"./IconQuestionMarkCircle-liTEEGY2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DXJsvyyy.js";import"./Switch-DPVCwgoR.js";import"./TabItem-DswxiGFz.js";import"./elements-BOYmskOL.js";import"./TextInput-BwolyqU0.js";import"./IconCross-CMrthrPn.js";import"./Tooltip-DeBt6Am5.js";import"./useClickOutside-DJjP4yWs.js";import"./EnablePortalWrapper-ZVyNR658.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D-vkmlIL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BEkDJK5J.js";import"./IconCaretDown-BseuEDR4.js";import"./IconCaretDown16-CmK_73p0.js";import"./IconTrashBin16-Dn2w5CcX.js";import"./IconTrashBin24-v2Dg-pXu.js";import"./useButton-C7s8up6S.js";import"./Flex-BENIsi-Q.js";import"./IconIcon16-Q05PI63p.js";import"./IconIcon24-Cxd-0MaE.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
