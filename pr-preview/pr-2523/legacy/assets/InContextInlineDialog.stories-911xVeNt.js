import{r as c,j as t}from"./iframe-c512yrIH.js";import{a as k}from"./Box-Bg-lACQJ.js";import{B as i,b as n,a}from"./Button-CQ2twKwQ.js";import{D as I}from"./DialogBody-BWHPNw25.js";import{D as O}from"./DialogFooter-BTiTBYnl.js";import{D as E}from"./DialogHeader-dvPFGBZ0.js";import{D as b}from"./Divider-DlUNLzPc.js";import{D as T}from"./Dropdown-B4OVsMHE.js";import{F as y}from"./Flex-xmflwPaQ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16--Bp-jlva.js";import{I as d}from"./InlineDialog-BGJRDynr.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DuVWtNEG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DAbnrn4s.js";import"./Checkbox-VGd323Ci.js";import"./useFocusable-CF9RzjNn.js";import"./useFocusRing-pRW46DX8.js";import"./useEffectEvent-DKu7Utjh.js";import"./chain-CfHjZEmK.js";import"./index-BPiDMcMS.js";import"./useFormValidationState-yuQ204mm.js";import"./useControlledState-C0RSaY3j.js";import"./InputLabel-B86WLvjV.js";import"./TooltipIcon-BTYBy4eU.js";import"./LegacyTooltip-nkYMLArH.js";import"./useLink-qwOmUS1x.js";import"./usePopper-DqfTW_q9.js";import"./index-0bzfsZuo.js";import"./Portal-aqbXDSbc.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CQNzOXzl.js";import"./IconCheckMark-Dsh2IxuG.js";import"./IconExclamationMarkCircle24-BpjzptM1.js";import"./IconExclamationMarkTriangle-D0OAcy7G.js";import"./IconExclamationMarkTriangle24-D_roIFdK.js";import"./IconQuestionMarkCircle-seQQRrmY.js";import"./IconMinus-gxLnqE3X.js";import"./FormControl-C_BMoidY.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BUQQWMLi.js";import"./Switch-DCarcGco.js";import"./TabItem-Bg44aVa7.js";import"./elements-BOYmskOL.js";import"./TextInput-D9V2hlzg.js";import"./IconCross-XkaW0Zf_.js";import"./Tooltip-DJYsqGzv.js";import"./useClickOutside-n9EKo7xD.js";import"./EnablePortalWrapper-BeV-lT_S.js";import"./Tree-pvsOByw0.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-LRcnMm3f.js";import"./IconCaretDown-sOW78wV8.js";import"./IconCaretDown16-B0YkCtOb.js";import"./IconTrashBin16-ophRe3jP.js";import"./IconTrashBin24-zXSq5zF0.js";import"./useButton-B443xHOa.js";import"./FocusScope-CRZaiUDm.js";import"./useOverlayTriggerState-C9wPBadA.js";import"./useMenuTrigger-DcBgOj5c.js";import"./useLabels-BuE-qrQS.js";import"./useLocalizedStringFormatter-HxzxCwyC.js";import"./context-CxIksXaP.js";import"./VisuallyHidden-CmHa94ri.js";import"./helper-D3G0LJ9v.js";import"./keyboard-CIXuXDMN.js";import"./SelectionManager-CveW1mMB.js";import"./useField-E1oM5QUC.js";import"./MenuItem-C8iGAXpO.js";import"./IconCaretRight-D72Z8--F.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
