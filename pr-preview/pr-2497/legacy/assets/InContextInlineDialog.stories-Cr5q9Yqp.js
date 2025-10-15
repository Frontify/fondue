import{r as c,j as t}from"./iframe-Djhyb1Nw.js";import{a as k}from"./Box-D0XRmwDf.js";import{B as i,b as n,a}from"./Button-ssJq5wZ5.js";import{D as I}from"./DialogBody-Je0Y8JTH.js";import{D as O}from"./DialogFooter-CGDMeLlV.js";import{D as E}from"./DialogHeader-BfU3BVmK.js";import{D as b}from"./Divider-BV9agdk2.js";import{D as T}from"./Dropdown-DWhof__V.js";import{F as y}from"./Flex-DU7NyJpQ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-IT-9Ct3d.js";import{I as d}from"./InlineDialog-DReCRX8N.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-ByQXrLpA.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BNuxpfmZ.js";import"./Checkbox-BPt_nkZF.js";import"./useFocusable-RQra_wsh.js";import"./useFocusRing-BK8gfdmv.js";import"./useEffectEvent-D8GnYFw3.js";import"./chain-BBFq5J0-.js";import"./index-Dck4b_ZY.js";import"./useFormValidationState-CHKEXlxK.js";import"./useControlledState-tL2x730j.js";import"./InputLabel-QFI6GSyz.js";import"./TooltipIcon-CEv9sFhn.js";import"./LegacyTooltip-Cb5X18lM.js";import"./useLink-CfY98U_U.js";import"./usePopper-ziJ2hQm4.js";import"./index-GoQApQif.js";import"./Portal-WVq5P5Ln.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D3WKz3gH.js";import"./IconCheckMark-DpPTXnBy.js";import"./IconExclamationMarkCircle24-B4LDGZRs.js";import"./IconExclamationMarkTriangle-CqCA4URp.js";import"./IconExclamationMarkTriangle24-zRe49Xao.js";import"./IconQuestionMarkCircle-BwedOQ2z.js";import"./IconMinus-D0YRjLJo.js";import"./FormControl-BEIfgU3P.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CvhdSucE.js";import"./TabItem-CUq7VJzt.js";import"./elements-BOYmskOL.js";import"./TextInput-Dxto4TCR.js";import"./IconCross-BKTNGjjx.js";import"./Tooltip-DJCDDg4Z.js";import"./useClickOutside-CauG5xuz.js";import"./EnablePortalWrapper-D4jAT6wB.js";import"./Tree-g_pCSlp0.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-B99H2_Qx.js";import"./FocusScope-BrSo0WOE.js";import"./useOverlayTriggerState-D6SmIhNB.js";import"./useMenuTrigger-BbU1vduN.js";import"./useLabels-EzQDK0_-.js";import"./useLocalizedStringFormatter-f21rb2a6.js";import"./context-Dw9gC9MP.js";import"./VisuallyHidden-CHKAONgM.js";import"./helper-Dy-jpPWj.js";import"./keyboard-BKAfbxGK.js";import"./SelectionManager-CwO2Two3.js";import"./useField-foZtG_xK.js";import"./MenuItem-D7vyBlaq.js";import"./IconCaretRight-Dbb0p0Yv.js";import"./Trigger-CCbe5bxU.js";import"./IconCaretDown-BHUKYEtH.js";import"./IconCaretDown16-CGARgb4W.js";import"./IconTrashBin16-BpFa3dsJ.js";import"./IconTrashBin24-C8KwJ_wL.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Xt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const Zt=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,Zt as __namedExportsOrder,Xt as default};
