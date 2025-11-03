import{r as p,j as t}from"./iframe-DXv6_zxw.js";import{a as l}from"./Box-hQidnB8s.js";import{B as d}from"./Button-DB7dFfFM.js";import{D as u}from"./DialogBody-BpBSwj_T.js";import{D as g}from"./DialogFooter-vU1Ey0Lw.js";import{D as f}from"./DialogHeader-D2Pli9L5.js";import{P as n}from"./Popover-CtY_C_fG.js";import{I as x}from"./IconIcon-DMRRS0M3.js";import"./preload-helper-DuVWtNEG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-E2C5Vnav.js";import"./Dropdown-CN2QCvAy.js";import"./useButton-BWcd71sq.js";import"./useFocusable-C6g0tqIP.js";import"./useFocusRing-BDH3dCmG.js";import"./useEffectEvent-Cb0J6-Z5.js";import"./chain-Cep8FPJT.js";import"./index-D5d5qoat.js";import"./FocusScope-DF8eB_8k.js";import"./useOverlayTriggerState-BF9Ejr7z.js";import"./useControlledState-DDv6-Uf2.js";import"./useMenuTrigger-CSV6ff0t.js";import"./useLabels-C9c88eWi.js";import"./useLocalizedStringFormatter-C9M-JYBw.js";import"./context-dXxHuuPL.js";import"./VisuallyHidden-NB3jxiiY.js";import"./helper-CDVeeeSq.js";import"./keyboard-cPqzm9YB.js";import"./SelectionManager-CiO-adce.js";import"./useField-vps60C3F.js";import"./useFormValidationState-Dg9NlgVh.js";import"./usePopper-DoCz1CAH.js";import"./index-DTurQfMI.js";import"./MenuItem-Caq1dhQs.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B-1fyYMe.js";import"./IconCheckMark-DMtvZSaL.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CtBuO66S.js";import"./Trigger-DJZQqjTl.js";import"./IconCaretDown-COFec5dc.js";import"./IconCaretDown16-K8LLN_zE.js";import"./IconCross-ChoN4EKq.js";import"./IconExclamationMarkTriangle-3n2PXe_1.js";import"./IconExclamationMarkTriangle24-BbOn-BSr.js";import"./IconTrashBin16-DydGqa1B.js";import"./IconTrashBin24-DuDeaqYC.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CUHPqDOI.js";import"./Portal-Cq_WqqFl.js";import"./useMemoizedId-BtQw0SRa.js";import"./FormControl-5qp0V7R7.js";import"./InputLabel-BqHeIl9A.js";import"./TooltipIcon-B5Y25Mx8.js";import"./LegacyTooltip-Bkscll9N.js";import"./useLink-XVzpit63.js";import"./IconExclamationMarkCircle24-McNHjZdr.js";import"./IconQuestionMarkCircle-B6JXS_eg.js";import"./Switch-D9Cyv3s_.js";import"./TabItem-CKM5VRvc.js";import"./TextInput-DvIqlsWQ.js";import"./Tooltip-CrVDz4tQ.js";import"./useClickOutside-Dz50VxsE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D-E_zzFb.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-gxqJk_7I.js";import"./IconIcon16-DocUnJGW.js";import"./IconIcon24-DrSsBoZm.js";const kt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Nt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Nt as __namedExportsOrder,kt as default};
