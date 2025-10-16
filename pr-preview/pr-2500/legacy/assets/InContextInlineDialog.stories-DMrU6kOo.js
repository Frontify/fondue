import{r as c,j as t}from"./iframe-hiR8UZb1.js";import{a as k}from"./Box-BXfZ-YTJ.js";import{B as i,b as n,a}from"./Button-CsgAQ1Ze.js";import{D as I}from"./DialogBody-BXw6sRiq.js";import{D as O}from"./DialogFooter-CMYKUIqn.js";import{D as E}from"./DialogHeader-Bhc9vZ9d.js";import{D as b}from"./Divider-CVM_OPs0.js";import{D as T}from"./Dropdown-D4YKxmIO.js";import{F as y}from"./Flex-Cv_55dft.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-D3oSDUfB.js";import{I as d}from"./InlineDialog-DhO3cVcu.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C9_mj7KT.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C-_DQcQy.js";import"./Checkbox-BpCInNI_.js";import"./useFocusable-BCILdq-A.js";import"./useFocusRing-BR2BAc58.js";import"./useEffectEvent-C-IKAOB5.js";import"./chain-DuoQPSqe.js";import"./index-C0843eWw.js";import"./useFormValidationState-CBzLcmFd.js";import"./useControlledState-VHtsEoGt.js";import"./InputLabel-DVTWnutn.js";import"./TooltipIcon-BdKeis3H.js";import"./LegacyTooltip-DA6F3nhF.js";import"./useLink-OqhAq_XY.js";import"./usePopper-iYfCN7OJ.js";import"./index-Bfg3rXQ9.js";import"./Portal-BE88c7bW.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C8g_De_i.js";import"./IconCheckMark-CPcP6jGi.js";import"./IconExclamationMarkCircle24-CYrEKXzW.js";import"./IconExclamationMarkTriangle-BRLHFmEi.js";import"./IconExclamationMarkTriangle24-C2uA4N2L.js";import"./IconQuestionMarkCircle-DzFus8Aq.js";import"./IconMinus-C_ROGjyB.js";import"./FormControl-Cu-skwPp.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BgTdFwYN.js";import"./Switch-DTzFT674.js";import"./TabItem-BGtxtLir.js";import"./elements-BOYmskOL.js";import"./TextInput-C5gXopDg.js";import"./IconCross-WBrqmq48.js";import"./Tooltip-D2dj-_xH.js";import"./useClickOutside-DJvglM5I.js";import"./EnablePortalWrapper-Cbz1aY1U.js";import"./Tree-ChVxWgYn.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BuTqCltI.js";import"./FocusScope-CLLubA4N.js";import"./useOverlayTriggerState-YZeHQFTN.js";import"./useMenuTrigger-60eNA7wG.js";import"./useLabels-I_WHPtX6.js";import"./useLocalizedStringFormatter-DJNAmz5G.js";import"./context-CZdOiBHj.js";import"./VisuallyHidden-D2FwfA67.js";import"./helper-CuUa8o3V.js";import"./keyboard-DbttWqR4.js";import"./SelectionManager-ewl4jbqQ.js";import"./useField-kpg-rK26.js";import"./MenuItem-exd6RWSR.js";import"./IconCaretRight-BkW49fVC.js";import"./Trigger-CRLRbSZf.js";import"./IconCaretDown-BNiERKAd.js";import"./IconCaretDown16-DQy0Wzy6.js";import"./IconTrashBin16-DHV2XC9n.js";import"./IconTrashBin24-D75gAwdl.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const $t=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,$t as __namedExportsOrder,Zt as default};
