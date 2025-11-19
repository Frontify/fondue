import{r as s,j as t}from"./iframe-DrsP0mC8.js";import{a as l}from"./Box-DAnc-jBI.js";import{B as d}from"./Button-sGRJ3zJD.js";import{D as u}from"./DialogBody-CfoB3BfY.js";import{D as g}from"./DialogFooter-6ClVD1X-.js";import{D as f}from"./DialogHeader-CcOlQ1hn.js";import{P as n}from"./Popover-CdA28ZNZ.js";import{I as x}from"./IconIcon-7c4qLDFD.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DrIRcZ2o.js";import"./Divider-BQuCpcnb.js";import"./FormControl-CCGEZKvo.js";import"./InputLabel-b22zEYCS.js";import"./TooltipIcon-BKlM5VvP.js";import"./LegacyTooltip-nr7JOdfK.js";import"./useLink-C5XP-LD8.js";import"./useFocusable-BuE9XHnz.js";import"./useFocusRing-CKBi6dQY.js";import"./useEffectEvent-DpFeMwOa.js";import"./chain-DxHFvYQT.js";import"./index-CJyWOG7R.js";import"./usePopper-BH1cP2gE.js";import"./index-DqrgdDDW.js";import"./Portal-DuxSJTp6.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-xqKMvJ0F.js";import"./IconCheckMark-BxT7lDuv.js";import"./IconExclamationMarkCircle24-CvMYQPpG.js";import"./IconExclamationMarkTriangle-DrRipsbx.js";import"./IconExclamationMarkTriangle24-CmuFC6GZ.js";import"./IconQuestionMarkCircle-CREEkhhg.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-lLuJXt01.js";import"./Switch-XIypBL0y.js";import"./TabItem-BvcH60pC.js";import"./elements-BOYmskOL.js";import"./TextInput-DgbtZt2h.js";import"./IconCross-DQHLhP2e.js";import"./Tooltip-CWMlfrw8.js";import"./useClickOutside-6TLcKZ3Q.js";import"./EnablePortalWrapper--2V3pvxH.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ChzbjJ1l.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B0Mf2Rj6.js";import"./IconCaretDown-RqLvhzy_.js";import"./IconCaretDown16-BCsvkJdq.js";import"./IconTrashBin16-Bn-weaoa.js";import"./IconTrashBin24-Wm5Cd6TS.js";import"./useButton-W2DAnca8.js";import"./Flex-Dt30bcqI.js";import"./IconIcon16-qKuZe-5u.js";import"./IconIcon24-CWlbkGsc.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
