import{r as s,j as t}from"./iframe-Dkg06RjX.js";import{a as l}from"./Box-DJ_QB4qy.js";import{B as d}from"./Button-Ck3U3EnT.js";import{D as u}from"./DialogBody-Bd11ATwV.js";import{D as g}from"./DialogFooter-CoVNVHGo.js";import{D as f}from"./DialogHeader-BO0T-aJH.js";import{P as n}from"./Popover-Bkjeahzp.js";import{I as x}from"./IconIcon-CXGukDuZ.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C9VEbcfm.js";import"./Checkbox-CDButxBc.js";import"./useFocusable-Dxaa7OPm.js";import"./useFocusRing-CEtI7pDJ.js";import"./useEffectEvent-KNqAjB1f.js";import"./chain-CgS8Uj0H.js";import"./index-CBpye4dH.js";import"./useFormValidationState-nmuzmEoy.js";import"./useControlledState-CPPx_1ny.js";import"./InputLabel-BEJ9owXS.js";import"./TooltipIcon-ZSWAEMEr.js";import"./LegacyTooltip-CNBxqgOu.js";import"./useLink-BiIAuQPL.js";import"./usePopper-BAL_8qLj.js";import"./index-CFlcmsyM.js";import"./Portal-D1nUMvyP.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BAlQ1vfb.js";import"./IconCheckMark-i1BAgGgA.js";import"./IconExclamationMarkCircle24-BJC0lc_m.js";import"./IconExclamationMarkTriangle-DXcgw6u2.js";import"./IconExclamationMarkTriangle24-Dn4iwSTT.js";import"./IconQuestionMarkCircle-Bb7y1LEg.js";import"./IconMinus-C-ho5-_Q.js";import"./Divider-BjOepDpQ.js";import"./FormControl-BkAQXhRL.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B-i1jWHW.js";import"./Switch-DcE0cref.js";import"./TabItem-Dz7rWhGx.js";import"./elements-BOYmskOL.js";import"./TextInput-jYI9A8oV.js";import"./IconCross-DiOEwTiI.js";import"./Tooltip-B4AmaOSr.js";import"./useClickOutside-B3jYYgtq.js";import"./EnablePortalWrapper-kTZGOFtg.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CV7W9H3_.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DW_2JkVx.js";import"./IconCaretDown-DOg4ihB9.js";import"./IconCaretDown16-ClPYJULt.js";import"./IconTrashBin16-DASFbRcE.js";import"./IconTrashBin24-omzGfmal.js";import"./useButton-DUilcnPW.js";import"./Flex-Nd9Yctc-.js";import"./IconIcon16-B2oVpvfD.js";import"./IconIcon24-CWei1RON.js";const vt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(a=o.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const qt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,qt as __namedExportsOrder,vt as default};
