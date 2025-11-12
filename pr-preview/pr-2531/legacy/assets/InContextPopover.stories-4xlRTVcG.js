import{r as s,j as t}from"./iframe-Bi_jfSnd.js";import{a as l}from"./Box-D8rPKBOz.js";import{B as d}from"./Button-B0gf8XMR.js";import{D as u}from"./DialogBody-CvSvJ_bb.js";import{D as g}from"./DialogFooter-D1hv2ltC.js";import{D as f}from"./DialogHeader-pG72i0F8.js";import{P as n}from"./Popover-DtzWpzOm.js";import{I as x}from"./IconIcon-CmUgOF70.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BF1ntz6i.js";import"./Checkbox-CEAe9bvX.js";import"./useFocusable-BHWiTFLM.js";import"./useFocusRing-CQP_YSAQ.js";import"./useEffectEvent-zHRh56A3.js";import"./chain-CTs3wXrO.js";import"./index-Cl_29qdh.js";import"./useFormValidationState-BWEIozTf.js";import"./useControlledState-BgciVEFz.js";import"./InputLabel-DiFtr5lq.js";import"./TooltipIcon-BREcT8uO.js";import"./LegacyTooltip-CmBmbwCT.js";import"./useLink-BDIhzraw.js";import"./usePopper-hPvozz_f.js";import"./index-D7izUPt0.js";import"./Portal-BK2M_YVZ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-mCaU_17l.js";import"./IconCheckMark-BD9LKDAE.js";import"./IconExclamationMarkCircle24-DHU_uxqb.js";import"./IconExclamationMarkTriangle-BeXKyi0N.js";import"./IconExclamationMarkTriangle24-DbV4sldj.js";import"./IconQuestionMarkCircle-CuPjajkp.js";import"./IconMinus-BfcrP6eh.js";import"./Divider-JGezgy-W.js";import"./FormControl-CupTHtjN.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DeLs2a81.js";import"./Switch-CuFp48yf.js";import"./TabItem-ChiUX7xJ.js";import"./elements-BOYmskOL.js";import"./TextInput-BYV0thMr.js";import"./IconCross-B6ER-0OV.js";import"./Tooltip-C2sQhq_x.js";import"./useClickOutside-CczPXN2W.js";import"./EnablePortalWrapper-DT0NwmAe.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CCGCuf6m.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-QBPONJkz.js";import"./Flex-DW2lxbKG.js";import"./IconIcon16-DWFc_9T8.js";import"./IconIcon24-DMrPVXpa.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
