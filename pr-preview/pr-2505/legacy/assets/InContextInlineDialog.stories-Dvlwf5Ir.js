import{r as c,j as t}from"./iframe-O6Xb67gi.js";import{a as k}from"./Box-BHmfZPGu.js";import{B as i,b as n,a}from"./Button-fwlsdqhf.js";import{D as I}from"./DialogBody-BPYdeEy2.js";import{D as O}from"./DialogFooter-CtJjVeuI.js";import{D as E}from"./DialogHeader-4GGBaOqD.js";import{D as b}from"./Divider-OLZKORyi.js";import{D as T}from"./Dropdown-DkJ1LQLr.js";import{F as y}from"./Flex-Br6p_LRl.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-CbjAHH5a.js";import{I as d}from"./InlineDialog-3GQmp1_T.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C1Wd_Pe4.js";import"./FormControl-By4HoBU2.js";import"./InputLabel-Bhp6BFGH.js";import"./TooltipIcon-COw8BRsT.js";import"./LegacyTooltip-Bv0XhaDP.js";import"./useLink-BbG6K7ZD.js";import"./useFocusable-CIKgwDH6.js";import"./useFocusRing-CHeGnMQA.js";import"./useEffectEvent-DTA_MKoh.js";import"./chain-CQUeJXJW.js";import"./index-CQ6zbiUp.js";import"./usePopper-DUNlXtjr.js";import"./index-B9jSwJHi.js";import"./Portal-D436pgRI.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DoJPVw-z.js";import"./IconCheckMark-CKGB0Mef.js";import"./IconExclamationMarkCircle24-1lif7gA0.js";import"./IconExclamationMarkTriangle-C1H0ir6P.js";import"./IconExclamationMarkTriangle24-DYPgUd-A.js";import"./IconQuestionMarkCircle-BIFVHJje.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BypHdLvW.js";import"./Switch-OtYNeozi.js";import"./TabItem-B01iiyD0.js";import"./elements-BOYmskOL.js";import"./TextInput-CfBurs0_.js";import"./IconCross-BxWaSX4m.js";import"./Tooltip-BsVrbu4u.js";import"./useClickOutside--9sKWVao.js";import"./EnablePortalWrapper-D4p2tHkH.js";import"./Tree-BAe8On3F.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DPZTu-hN.js";import"./IconCaretDown-CbXQpFjn.js";import"./IconCaretDown16-spw0sC6J.js";import"./IconTrashBin16-DBuvi8VI.js";import"./IconTrashBin24-1mHVIMfW.js";import"./useButton-D5BwoBXI.js";import"./FocusScope--mUmRhU_.js";import"./useOverlayTriggerState-C-z83KL3.js";import"./useControlledState-Bqg_pIq_.js";import"./useMenuTrigger-BdgnVO0V.js";import"./useLabels-BSIpPAgP.js";import"./useLocalizedStringFormatter-Cz4luPbj.js";import"./context-ByKPL08u.js";import"./VisuallyHidden-B2p5YlCX.js";import"./helper-DUvrElbv.js";import"./keyboard-B1J9S0AG.js";import"./SelectionManager-bbMc2UWc.js";import"./useField-CsabfYa2.js";import"./useFormValidationState-DWOowmKC.js";import"./MenuItem-DBzSyDfl.js";import"./IconCaretRight-C-Bl03aw.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
