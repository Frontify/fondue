import{r as c,j as t}from"./iframe-D7sy4xpx.js";import{a as k}from"./Box-S-zoCEGs.js";import{B as i,b as n,a}from"./Button-DEB8PLLZ.js";import{D as I}from"./DialogBody-BBgUIDr9.js";import{D as O}from"./DialogFooter-DfIcyVh7.js";import{D as E}from"./DialogHeader-DyhRvJ8F.js";import{D as b}from"./Divider-SPqxn73n.js";import{D as T}from"./Dropdown-Bu55er1w.js";import{F as y}from"./Flex-d7a7vw3v.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DX9-C7zv.js";import{I as d}from"./InlineDialog-B3T8ra49.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D5qcpbyD.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-4t-GCPBE.js";import"./FormControl-D5oAbp8P.js";import"./InputLabel-CYvYAlW9.js";import"./TooltipIcon-BGEDG3-W.js";import"./LegacyTooltip-cn45ntVE.js";import"./useLink-CL4VGZfG.js";import"./useFocusable-b3_Iq_aJ.js";import"./useFocusRing-WiOBaN36.js";import"./useEffectEvent-DlN4b1VG.js";import"./chain-BymMFmeJ.js";import"./index-DwQQnJlT.js";import"./usePopper-CJvB9LLR.js";import"./index-3l7JjlNh.js";import"./Portal-B_6AOlsI.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CwwPF4gy.js";import"./IconCheckMark-CIqMCS41.js";import"./IconExclamationMarkCircle24-D5O0dO8v.js";import"./IconExclamationMarkTriangle-BfrYu7jT.js";import"./IconExclamationMarkTriangle24-CUOt1Yz_.js";import"./IconQuestionMarkCircle-C2ycqPAW.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BQ0evsM9.js";import"./Switch-DPWAfSEu.js";import"./TabItem-Chmjtcut.js";import"./elements-BOYmskOL.js";import"./TextInput-Bx10SaWy.js";import"./IconCross-drLq2WNq.js";import"./Tooltip-Bg8kSzf3.js";import"./useClickOutside-OCCiafFp.js";import"./EnablePortalWrapper-fTgbhwPV.js";import"./Tree-CCvSBT-2.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DJDqn6_h.js";import"./IconCaretDown-BcvnAaV6.js";import"./IconCaretDown16-C1emQBb_.js";import"./IconTrashBin16-CZgyFd-i.js";import"./IconTrashBin24-D7P9aEXw.js";import"./useButton-BzdN_3XI.js";import"./FocusScope-i-5CSdu1.js";import"./useOverlayTriggerState-BcGtZFB6.js";import"./useControlledState-DwGGjx3X.js";import"./useMenuTrigger-Dvlm422P.js";import"./useLabels-Blyommyn.js";import"./useLocalizedStringFormatter-DvaMBSMR.js";import"./context-B61iDk61.js";import"./VisuallyHidden-CeceVG54.js";import"./helper-ChSewBYb.js";import"./keyboard-BoxrP_Gl.js";import"./SelectionManager-vVt0pswu.js";import"./useField-B01EU0XD.js";import"./useFormValidationState-D9XgnKSN.js";import"./MenuItem-CvdFQWLC.js";import"./IconCaretRight-grzHKMpF.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
