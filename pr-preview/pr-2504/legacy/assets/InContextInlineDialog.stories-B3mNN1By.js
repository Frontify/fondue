import{r as c,j as t}from"./iframe-CjtBbWFy.js";import{a as k}from"./Box-BNkz-oee.js";import{B as i,b as n,a}from"./Button-CnwsL3Ro.js";import{D as I}from"./DialogBody-DROvf7qL.js";import{D as O}from"./DialogFooter-CzZ0x6-D.js";import{D as E}from"./DialogHeader-85pfGI4P.js";import{D as b}from"./Divider-BdjnAWXd.js";import{D as T}from"./Dropdown-BnWsPNmL.js";import{F as y}from"./Flex-B8UnjY4w.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BJOOH7Kp.js";import{I as d}from"./InlineDialog-C3Wd9kxr.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OKB6Z3Tn.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ba0Bf5HV.js";import"./Checkbox-BpSnOp8M.js";import"./useFocusable-B1riX0q_.js";import"./useFocusRing-DKH8TC1y.js";import"./useEffectEvent-Bvk3GHSi.js";import"./chain-CJ40OBqG.js";import"./index-D3QZuRsF.js";import"./useFormValidationState-B82DO5rQ.js";import"./useControlledState-DFUyN-u3.js";import"./InputLabel-1H4PKH4V.js";import"./TooltipIcon-CdgnbPJi.js";import"./LegacyTooltip-CECqrk99.js";import"./useLink-D81xicVU.js";import"./usePopper-DOYFNROV.js";import"./index-CW_2kq9w.js";import"./Portal-Ctlgj8Ml.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BEZTnksE.js";import"./IconCheckMark-D8JZM9L-.js";import"./IconExclamationMarkCircle24-BT7Ql3K_.js";import"./IconExclamationMarkTriangle-s_f3UMNv.js";import"./IconExclamationMarkTriangle24-BDYPAIuO.js";import"./IconQuestionMarkCircle-C1Ad-WKL.js";import"./IconMinus-CcF99uwO.js";import"./FormControl-Bq4xFB8E.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Cp7aQDJ_.js";import"./Switch-CBp_d0nm.js";import"./TabItem-BS9-1NTO.js";import"./elements-BOYmskOL.js";import"./TextInput-DT25f2Ql.js";import"./IconCross-RT0uymvJ.js";import"./Tooltip-BxbW-1EZ.js";import"./useClickOutside-CCoMfOuc.js";import"./EnablePortalWrapper-DV8bmMCs.js";import"./Tree-C-XNFFHl.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DcmUr2NY.js";import"./IconCaretDown-PCmiz6X9.js";import"./IconCaretDown16-C7c3SGqO.js";import"./IconTrashBin16-DW8Ffu5a.js";import"./IconTrashBin24-CaWVM4gw.js";import"./useButton-D1ZYnjYr.js";import"./FocusScope-D3LSJzcY.js";import"./useOverlayTriggerState-Cm4fUNDO.js";import"./useMenuTrigger-CMWBqxSD.js";import"./useLabels-CQKO-oLK.js";import"./useLocalizedStringFormatter-CWDQ0ZoV.js";import"./context-CSKv1vqr.js";import"./VisuallyHidden-DYPurLGi.js";import"./helper-C2mYNdbP.js";import"./keyboard-BhdFtCz8.js";import"./SelectionManager-B76f-b-n.js";import"./useField-C2QrH0k3.js";import"./MenuItem-qulHJgIL.js";import"./IconCaretRight-DdJiRQ48.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
