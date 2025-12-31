import{r as s,j as t}from"./iframe-Db2lMgIJ.js";import{a as l}from"./Box-QKpCgCWO.js";import{B as d}from"./Button-DrV-oxb6.js";import{D as u}from"./DialogBody-CLGVsZLB.js";import{D as g}from"./DialogFooter-CabfAiyv.js";import{D as f}from"./DialogHeader-DG-s-g6-.js";import{P as n}from"./Popover-CViUkro9.js";import{I as x}from"./IconIcon-CixNjnEF.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dxp6Hmi5.js";import"./FormControl-CzH52flP.js";import"./InputLabel-BuiyOa5e.js";import"./TooltipIcon-B2QKXg6s.js";import"./LegacyTooltip-9uaOguTu.js";import"./useLink-DRnxTn0l.js";import"./useFocusable-CTEFGZiK.js";import"./useFocusRing-B9RuWWoE.js";import"./useEffectEvent-B6yt_MbU.js";import"./chain-DNotTnBs.js";import"./index-DJB9gcJu.js";import"./usePopper-aywqiBd9.js";import"./index-eahnjmcY.js";import"./Portal-D_ZcylIA.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-B4gdAHT4.js";import"./IconCheckMark-DjEX-BrJ.js";import"./IconExclamationMarkCircle24-BOaIUvhj.js";import"./IconExclamationMarkTriangle-BVyt7aNf.js";import"./IconExclamationMarkTriangle24-BLFlkBha.js";import"./IconQuestionMarkCircle-DXfc1EwE.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BNtw18aK.js";import"./Switch-DpzcFjU4.js";import"./TabItem-Bgtxl6CT.js";import"./elements-BOYmskOL.js";import"./TextInput-JaqVfONk.js";import"./IconCross-CzRefrvN.js";import"./Tooltip-VGceQO3J.js";import"./useClickOutside-CXT4Q1eP.js";import"./EnablePortalWrapper-DKPHOS0M.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bw4XPOUo.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-ng2O4uuE.js";import"./IconCaretDown-zENP2QKX.js";import"./IconCaretDown16-giTZ49XX.js";import"./IconTrashBin16-DqIm0Q2w.js";import"./IconTrashBin24-G7BNemIR.js";import"./useButton-CLCKE_lb.js";import"./Flex-Dqr0LrDe.js";import"./IconIcon16-B-4kG_kU.js";import"./IconIcon24-B-UGhnjV.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
