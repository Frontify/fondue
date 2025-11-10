import{r as s,j as t}from"./iframe-CfPuYCkc.js";import{a as l}from"./Box-CTorSzIa.js";import{B as d}from"./Button-P0_yZEya.js";import{D as u}from"./DialogBody-Db2Zyx65.js";import{D as g}from"./DialogFooter-DhnT0nXa.js";import{D as f}from"./DialogHeader-DW-oVsav.js";import{P as m}from"./Popover-Bn_L8O9a.js";import{I as x}from"./IconIcon-BtC1ehb1.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BVSF0FgO.js";import"./Divider-BhjYTOKO.js";import"./FormControl-D2_fVdWA.js";import"./InputLabel-C_8Dwm1R.js";import"./TooltipIcon-CmtZDacc.js";import"./LegacyTooltip-CjFAb0zN.js";import"./useLink-LjhgSgZQ.js";import"./useFocusable-D-paoeAA.js";import"./useFocusRing-QpzEDMnI.js";import"./useEffectEvent-Dv8f7GJF.js";import"./chain-C19WL_uP.js";import"./index-Bx-Of9lq.js";import"./usePopper-CvJBRhWp.js";import"./index-zcMFWya2.js";import"./Portal-WScJP0vs.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-malfCv9t.js";import"./IconCheckMark-BYwPf0VX.js";import"./IconExclamationMarkCircle24-6K_9_SYY.js";import"./IconExclamationMarkTriangle-DGhh4hsy.js";import"./IconExclamationMarkTriangle24-BHPw5oqP.js";import"./IconQuestionMarkCircle-OJH5l0NO.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Bncc__1q.js";import"./Switch-BoBtyxQk.js";import"./TabItem-DVIiyxpY.js";import"./elements-BOYmskOL.js";import"./TextInput-3rFZ_7kf.js";import"./IconCross-B0F4YhCk.js";import"./Tooltip-DZGS-GoA.js";import"./useClickOutside-Bui2w_m3.js";import"./EnablePortalWrapper-BVW3lNmE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D_lCnUal.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-lcCdVKcp.js";import"./Flex-BMOkPveq.js";import"./IconIcon16-DmIQDi0Y.js";import"./IconIcon24-7tMS3NRd.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const xt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,xt as __namedExportsOrder,ft as default};
