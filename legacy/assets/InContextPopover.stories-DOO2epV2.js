import{r as s,j as t}from"./iframe-k-C5zOgA.js";import{a as l}from"./Box-BwhMBBE_.js";import{B as d}from"./Button-CrIHq6vz.js";import{D as u}from"./DialogBody-dXibw1e9.js";import{D as g}from"./DialogFooter-Cfz2TPkF.js";import{D as f}from"./DialogHeader-DIkbS6Bc.js";import{P as m}from"./Popover-DE3ekXfh.js";import{I as x}from"./IconIcon-D9Fgi_pW.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BIV5YgRq.js";import"./Divider-DpzSkZUI.js";import"./FormControl-f_7HK3xN.js";import"./InputLabel-Cr68VyEY.js";import"./TooltipIcon-BgDCyP61.js";import"./LegacyTooltip-DHIJ1M0N.js";import"./useLink-Dhyb-o7l.js";import"./useFocusable-BKbIVd9V.js";import"./useFocusRing-zjRx5HlW.js";import"./useEffectEvent-Bd7g7S0J.js";import"./chain-B0Z7lx77.js";import"./index-L2Ocyl2d.js";import"./usePopper-DVXji213.js";import"./index-CuiNxJds.js";import"./Portal-BXYLScPw.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BpHHvwNo.js";import"./IconCheckMark-sowd_iWZ.js";import"./IconExclamationMarkCircle24-DsL8ew2C.js";import"./IconExclamationMarkTriangle-DiVGAHYU.js";import"./IconExclamationMarkTriangle24-DKJtjUJu.js";import"./IconQuestionMarkCircle-CGvdlIsT.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Co0q58xM.js";import"./Switch-BsqwnQlp.js";import"./TabItem-DAoeBrZy.js";import"./elements-BOYmskOL.js";import"./TextInput-mHnpEVVE.js";import"./IconCross-Ch3YnY2j.js";import"./Tooltip-pDfFo5qH.js";import"./useClickOutside-BCkiqmbU.js";import"./EnablePortalWrapper-D6binzKF.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C6acidfU.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-B_4IPEJt.js";import"./Flex-DWRsCIv5.js";import"./IconIcon16-CqkFYGqE.js";import"./IconIcon24-D3BpeoXX.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
