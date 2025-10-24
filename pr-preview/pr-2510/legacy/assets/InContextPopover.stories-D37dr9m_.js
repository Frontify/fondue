import{r as a,j as t}from"./iframe-CM-rC4pW.js";import{a as l}from"./Box-DqdYGOYd.js";import{B as d}from"./Button-CenNVBp8.js";import{D as u}from"./DialogBody-efQ2N35i.js";import{D as g}from"./DialogFooter-B5ecTogR.js";import{D as f}from"./DialogHeader-CgdjYSKJ.js";import{P as n}from"./Popover-DJeW7Tuj.js";import{I as x}from"./IconJohanna-D-iLBOKO.js";import"./preload-helper-qBSLZfTS.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DeL375Sl.js";import"./Divider-DS3QNkAW.js";import"./FormControl-DNUPkDjx.js";import"./InputLabel-DXmhaygW.js";import"./TooltipIcon-Dc96l6Xh.js";import"./LegacyTooltip-ppPP8AMC.js";import"./useLink-DKND8L_-.js";import"./useFocusable-DxQGPu8E.js";import"./useFocusRing-65bRAxqP.js";import"./useEffectEvent-CiImHouW.js";import"./chain-5aqg5xgJ.js";import"./index-nGC6dqdw.js";import"./usePopper-C9oL71dO.js";import"./index-CW6wVUMq.js";import"./Portal-BZmq1DWy.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-do8RxhNb.js";import"./IconCheckMark-65Jmd977.js";import"./IconExclamationMarkCircle24-BL0yj-2z.js";import"./IconExclamationMarkTriangle-BGBvrNZu.js";import"./IconExclamationMarkTriangle24-CdnFfC2B.js";import"./IconQuestionMarkCircle-BdV_lOz6.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Drb61Rof.js";import"./Switch-GxhEavR1.js";import"./TabItem-_vqA6YBV.js";import"./elements-BOYmskOL.js";import"./TextInput-CEsrv-ON.js";import"./IconCross-n48ME2rd.js";import"./Tooltip-s2Wcg1K3.js";import"./useClickOutside-COgqo7bE.js";import"./EnablePortalWrapper-B39I2ECN.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Iitc_LxH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CRpr7kn-.js";import"./IconCaretDown-maSGby9p.js";import"./IconCaretDown16-BmJK5U7d.js";import"./IconTrashBin16-BqeWSU2Q.js";import"./IconTrashBin24-D801_wi5.js";import"./useButton-B0mM1imS.js";import"./Flex-BtvjQvQY.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const Ct=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Ct as __namedExportsOrder,Bt as default};
