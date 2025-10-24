import{r as a,j as t}from"./iframe-CJlMYO80.js";import{a as l}from"./Box-DIcrVcBE.js";import{B as d}from"./Button-D6R4ZlBR.js";import{D as u}from"./DialogBody-DZ2oTug1.js";import{D as g}from"./DialogFooter-BMHwXw1W.js";import{D as f}from"./DialogHeader-CIn4qu_i.js";import{P as m}from"./Popover-C_4BtYGw.js";import{I as x}from"./IconJohanna-CFN5N2N9.js";import"./preload-helper-D5qcpbyD.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C5zVzKm_.js";import"./Divider-ClUzdkwN.js";import"./FormControl-gMoYzkb2.js";import"./InputLabel-ID6ydJAd.js";import"./TooltipIcon-CBNoZlW9.js";import"./LegacyTooltip-Cx-bObkX.js";import"./useLink-Dm_1DGUw.js";import"./useFocusable-Da6ZanHY.js";import"./useFocusRing-Bsvhr9s0.js";import"./useEffectEvent-CvTwE8Xm.js";import"./chain-C-znv-QV.js";import"./index-Dga2Wd8a.js";import"./usePopper-DuhTdrxj.js";import"./index-BfzQNO5H.js";import"./Portal-Bk3sxlWw.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CFLyj4-_.js";import"./IconCheckMark-Pw1LRiGI.js";import"./IconExclamationMarkCircle24-BRHwesp6.js";import"./IconExclamationMarkTriangle-Ds0JLIWc.js";import"./IconExclamationMarkTriangle24-cWkM6964.js";import"./IconQuestionMarkCircle-BicQdYl1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-RqqqUQxG.js";import"./Switch-O47mxw0z.js";import"./TabItem-DjTu6M2f.js";import"./elements-BOYmskOL.js";import"./TextInput-CFJnHCWz.js";import"./IconCross-DvaqP0gf.js";import"./Tooltip-Dni0pXgC.js";import"./useClickOutside-BfCTNUvs.js";import"./EnablePortalWrapper-DClsg5oD.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C8cRInY9.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D35Bb6ec.js";import"./Flex-B3PT0ahy.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const gt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,gt as __namedExportsOrder,ut as default};
