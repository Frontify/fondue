import{r as c,j as t}from"./iframe-B8HjM2bH.js";import{a as k}from"./Box-bVNTwxZW.js";import{B as i,b as n,a}from"./Button-Cxlg_Jlu.js";import{D as I}from"./DialogBody-DkjzXw6O.js";import{D as O}from"./DialogFooter-B3UkxZmU.js";import{D as E}from"./DialogHeader-D4uxTZZo.js";import{D as b}from"./Divider-CScJkmxy.js";import{D as T}from"./Dropdown-1D2p0mCw.js";import{F as y}from"./Flex-Djn0ZkXj.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BNoJRCc5.js";import{I as d}from"./InlineDialog-_TBhSlwR.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Bv0LnrNd.js";import"./FormControl-CdhDe2yr.js";import"./InputLabel-BY8Y4V_H.js";import"./TooltipIcon-BcHMbg4P.js";import"./LegacyTooltip-D1gEUfx1.js";import"./useLink-By4Pag_x.js";import"./useFocusable-CZmCl03Y.js";import"./useFocusRing-3Gw7Pb6L.js";import"./useEffectEvent-DldudAt0.js";import"./chain-DcfYi800.js";import"./index-DQu1qdiw.js";import"./usePopper-aUIx4INC.js";import"./index-e4lb8Yn9.js";import"./Portal-CydnS4Q0.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C7w6N4e1.js";import"./IconCheckMark-D2gcRUJK.js";import"./IconExclamationMarkCircle24-BZjJkaig.js";import"./IconExclamationMarkTriangle-0oh_v4Q_.js";import"./IconExclamationMarkTriangle24-Cug0QU8I.js";import"./IconQuestionMarkCircle-M_tmPE3y.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CsRn3Dui.js";import"./Switch-Dgyq-URC.js";import"./TabItem-_0QyVAb0.js";import"./elements-BOYmskOL.js";import"./TextInput-6wrBtR06.js";import"./IconCross-DNgwupST.js";import"./Tooltip-DzWMZmIs.js";import"./useClickOutside-DEQ-8D9O.js";import"./EnablePortalWrapper-mRPgidZV.js";import"./Tree-dBPfT1V8.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-qLWd3HsL.js";import"./IconCaretDown-jnmRmvBC.js";import"./IconCaretDown16-DooVhUZz.js";import"./IconTrashBin16-D23_ZH0V.js";import"./IconTrashBin24-DkqIbv5B.js";import"./useButton-B3xO9RgR.js";import"./FocusScope-DzUilBpY.js";import"./useOverlayTriggerState-C_2tGnG8.js";import"./useControlledState-Cruvscar.js";import"./useMenuTrigger-n-N-gLF7.js";import"./useLabels-BdWZl8t7.js";import"./useLocalizedStringFormatter-DnKFZXOJ.js";import"./context-C88ziPfd.js";import"./VisuallyHidden-O156DaXA.js";import"./helper-Ijke0SGX.js";import"./keyboard-CXSBV2-2.js";import"./SelectionManager-DHIj7-4C.js";import"./useField-73JdbjyK.js";import"./useFormValidationState-DsTfsc6h.js";import"./MenuItem-Dye6i1me.js";import"./IconCaretRight-43PqgEC-.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
