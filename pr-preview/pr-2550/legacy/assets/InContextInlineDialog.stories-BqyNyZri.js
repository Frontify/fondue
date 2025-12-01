import{r as c,j as t}from"./iframe-BxkmZ_qS.js";import{a as k}from"./Box-CBIfPAh5.js";import{B as i,b as n,a}from"./Button-B7-zHvnj.js";import{D as I}from"./DialogBody-CYQoVR2Y.js";import{D as O}from"./DialogFooter-CqEXB7uj.js";import{D as E}from"./DialogHeader-D-leWkog.js";import{D as b}from"./Divider-BeD3hYt7.js";import{D as T}from"./Dropdown-rZLafnwN.js";import{F as y}from"./Flex-B5GlvWVG.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-CXVCU2G3.js";import{I as d}from"./InlineDialog-Cw88cJd_.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DGVESE2Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DxWp8C5T.js";import"./FormControl-BVGE11Hg.js";import"./InputLabel-Cy2480Uz.js";import"./TooltipIcon-hzSmRwpv.js";import"./LegacyTooltip-NfvcJwD5.js";import"./useLink-C7JKiGPY.js";import"./useFocusable-CMqYS_wN.js";import"./useFocusRing-3sDfkXlZ.js";import"./useEffectEvent-DC2V05mW.js";import"./chain-CVnaEK-u.js";import"./index-BHLQBrUq.js";import"./usePopper-CfpTIbUB.js";import"./index-B1O1MNq5.js";import"./Portal-C5SODFR_.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BMYZCDTz.js";import"./IconCheckMark-D276Qa_c.js";import"./IconExclamationMarkCircle24-hm6ZOfLp.js";import"./IconExclamationMarkTriangle-C2mrgeE6.js";import"./IconExclamationMarkTriangle24-D7QSRMTV.js";import"./IconQuestionMarkCircle-C_4XNBvy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BXjrMe8D.js";import"./Switch-BGnM1Fs9.js";import"./TabItem-RUpz2903.js";import"./elements-BOYmskOL.js";import"./TextInput-LXs-tQDI.js";import"./IconCross-Du4TXULc.js";import"./Tooltip-BfikMBee.js";import"./useClickOutside-C5ztWzxe.js";import"./EnablePortalWrapper-DTqQDG5a.js";import"./Tree-Cv8I9p-L.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DTKD_JJt.js";import"./FocusScope-CjnLqfp2.js";import"./useOverlayTriggerState-CM5LBP8P.js";import"./useControlledState-D0YF3UCt.js";import"./useMenuTrigger-6RbXtrcu.js";import"./useLabels-DlfpMOYu.js";import"./useLocalizedStringFormatter-2U36YzN4.js";import"./context-Bqa1Eh5k.js";import"./VisuallyHidden-CGNY0Pde.js";import"./helper-C5TgkMkQ.js";import"./keyboard-DgolnSm_.js";import"./SelectionManager-Dh5zjJkk.js";import"./useField-D3FWcFBw.js";import"./useFormValidationState-W-gQZp2T.js";import"./MenuItem-BgqPr_D_.js";import"./IconCaretRight-CKTXvcB3.js";import"./Trigger-CPFovDQw.js";import"./IconCaretDown-Bwq4qGRm.js";import"./IconCaretDown16-BSKaUddp.js";import"./IconTrashBin16-DbgFiwem.js";import"./IconTrashBin24-3t_bfVUY.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Flex justify="start">
            <Button onClick={action('onClick')} style={ButtonStyle.Default}>
                Button
            </Button>
            <Button onClick={action('onClick')} style={ButtonStyle.Danger}>
                Button
            </Button>
            <Button ref={triggerRef} emphasis={ButtonEmphasis.Default} icon={<IconDotsVertical16 />} onClick={() => setIsOpen(!isOpen)}>
                InlineDialog Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody>
                    <Box className="tw-p-4">
                        <TextExample />
                    </Box>
                </DialogBody>
            </InlineDialog>
            <Button onClick={action('onClick')} style={ButtonStyle.Loud}>
                Button
            </Button>
        </Flex>;
}`,...(h=(f=m.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,C,D;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div>
            <Flex justify="end">
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default}>
                    Button
                </Button>
                <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                    InlineDialog Trigger
                </Button>
                <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                    <DialogHeader title="Collaborator Settings" padding="compact" onClose={() => setIsOpen(false)} />
                    <DialogBody>
                        <div className="tw-p-2 tw-text-text">
                            <Dropdown enablePortal={false} onChange={id => console.log(id)} activeItemId={'1'} menuBlocks={[{
              id: 'block1',
              menuItems: [{
                id: '1',
                title: 'Item 1'
              }, {
                id: '2',
                title: 'Item 2'
              }, {
                id: '3',
                title: 'Item 3'
              }, {
                id: '4',
                title: 'Item 4'
              }, {
                id: '5',
                title: 'Item 5'
              }]
            }]} />
                            <p className="tw-flex tw-items-center tw-my-2">Label 2</p>

                            <TextExample />
                            <TextExample />
                        </div>
                    </DialogBody>
                    <DialogFooter actionButtons={[{
          children: 'Cancel',
          emphasis: ButtonEmphasis.Default,
          onClick: () => setIsOpen(false)
        }, {
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </InlineDialog>
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Strong} style={ButtonStyle.Loud}>
                    Button
                </Button>
            </Flex>
            <Divider />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <Button emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default} onClick={action('onClick')}>
                Button
            </Button>
        </div>;
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const Xt=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,Xt as __namedExportsOrder,Qt as default};
