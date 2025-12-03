import{r as s,j as t}from"./iframe-Daozt3iQ.js";import{a as l}from"./Box-xGIeYbF0.js";import{B as d}from"./Button-Bd7LWYaJ.js";import{D as u}from"./DialogBody-Cw1V-grV.js";import{D as g}from"./DialogFooter-Dma9M4EM.js";import{D as f}from"./DialogHeader-BRza9JEH.js";import{P as n}from"./Popover-B2ez-mbM.js";import{I as x}from"./IconIcon-3_2Zk4pr.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D8x9f3pr.js";import"./Divider-Bsg79Mxz.js";import"./FormControl-DWwqpw-d.js";import"./InputLabel-CVDMD-Tn.js";import"./TooltipIcon-DYcAVd3n.js";import"./LegacyTooltip-ChAPEshh.js";import"./useLink-Dy-sCuG2.js";import"./useFocusable-DL4Y5ggQ.js";import"./useFocusRing-CGU-cSgr.js";import"./useEffectEvent-12J7pWwB.js";import"./chain-CsCbg1Z2.js";import"./index-BfIvuXwT.js";import"./usePopper-vdmvH7Th.js";import"./index-OWryF59X.js";import"./Portal-DTK6lLVZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dk7Aese3.js";import"./IconCheckMark-Clmozq0X.js";import"./IconExclamationMarkCircle24-BwRpG_-o.js";import"./IconExclamationMarkTriangle-Dk5-PKfw.js";import"./IconExclamationMarkTriangle24-C02DR5Po.js";import"./IconQuestionMarkCircle-BAV0QCbN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DDuBjsDb.js";import"./Switch-BvmLFAiE.js";import"./TabItem-Cfcnd0Sr.js";import"./elements-BOYmskOL.js";import"./TextInput-C78iyWbb.js";import"./IconCross-CTbg5X3_.js";import"./Tooltip-D8rhxf09.js";import"./useClickOutside-ZxkCjlDe.js";import"./EnablePortalWrapper-B8rj-dCL.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CgXzFTP6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B2W7P8Z-.js";import"./IconCaretDown-JmDsgtmL.js";import"./IconCaretDown16-HYLk9eai.js";import"./IconTrashBin16-ZQBoDWZj.js";import"./IconTrashBin24-Du6CqYoX.js";import"./useButton-ObNU-Eop.js";import"./Flex-CwY_nNhN.js";import"./IconIcon16-tc6NI_qW.js";import"./IconIcon24-DZ1GwacK.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
