import{r as p,j as t}from"./iframe-CVRB9xG5.js";import{a as l}from"./Box-DJoc6VJd.js";import{B as d}from"./Button-DRuLCDDt.js";import{D as u}from"./DialogBody-D4YA7uE-.js";import{D as g}from"./DialogFooter-BcERLKgo.js";import{D as f}from"./DialogHeader-BW8YuBBN.js";import{P as n}from"./Popover-DyDEKW9E.js";import{I as x}from"./IconIcon-CVDNdNrf.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DIG8XJhi.js";import"./Divider-COlvtABj.js";import"./Dropdown-BZ-q_Yo7.js";import"./useButton-BKijJ8Ox.js";import"./useFocusable-K9LUaTpT.js";import"./useFocusRing-CIR8l5qb.js";import"./useEffectEvent-D4McFjJW.js";import"./chain-CmopQXAK.js";import"./index-C6YV3ckd.js";import"./FocusScope-tItaIZX5.js";import"./useOverlayTriggerState-GQW_x-1C.js";import"./useControlledState-Bj_ZyrJ6.js";import"./useMenuTrigger-DXxV6CNV.js";import"./useLabels-SLuP_5C7.js";import"./useLocalizedStringFormatter-CXhFz9Uz.js";import"./context-DA4el76b.js";import"./VisuallyHidden-BFQqEv8e.js";import"./helper-DhtKJs8K.js";import"./keyboard-BKGhVC1E.js";import"./SelectionManager-C7n6sNA4.js";import"./useField-DQHpHPfW.js";import"./useFormValidationState-Cf_zmRn5.js";import"./usePopper-BPdQg_1a.js";import"./index-Dm3ZYyOZ.js";import"./MenuItem-nXi4WjEb.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-zxwIR15_.js";import"./IconCheckMark-D8jA0-uN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D2yuAP7u.js";import"./Trigger-CsKuBAxO.js";import"./IconCaretDown-Dk5eGzJF.js";import"./IconCaretDown16-D-_xQ8kJ.js";import"./IconCross-DXx1uM3O.js";import"./IconExclamationMarkTriangle-CDVeuzB2.js";import"./IconExclamationMarkTriangle24-CzJn6JJ4.js";import"./IconTrashBin16-BDkWhi4I.js";import"./IconTrashBin24-BLra6c_I.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CVWQx04t.js";import"./Portal-C9aGMHWR.js";import"./useMemoizedId-DZ_GWwWH.js";import"./FormControl-CQTEks-w.js";import"./InputLabel-DYgwFPIk.js";import"./TooltipIcon-CSS_ITO5.js";import"./LegacyTooltip-bqc1XdDN.js";import"./useLink-Bi6OJ7FT.js";import"./IconExclamationMarkCircle24-DEAcLkxP.js";import"./IconQuestionMarkCircle-pq_7Xd4U.js";import"./Switch-qFvrWM4M.js";import"./TabItem-D5Bmdvm6.js";import"./TextInput-D688XE6y.js";import"./Tooltip-Q8dstYik.js";import"./useClickOutside-CH4jqpXL.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BhxCNV8P.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-QWw8QXcZ.js";import"./IconIcon16-DpNto2vM.js";import"./IconIcon24-BDr-p4NH.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
