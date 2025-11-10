import{r as c,j as t}from"./iframe-CfBLd35K.js";import{a as k}from"./Box-BW40DMyr.js";import{B as i,b as n,a}from"./Button-BMq1fE2z.js";import{D as I}from"./DialogBody-C4Zwdxq3.js";import{D as O}from"./DialogFooter-Oy9w8mHO.js";import{D as E}from"./DialogHeader-B0hC51kU.js";import{D as b}from"./Divider-CEFbS-0k.js";import{D as T}from"./Dropdown-msJI69H3.js";import{F as y}from"./Flex-CyBMyncv.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DnLGMQgh.js";import{I as d}from"./InlineDialog-BNmdrfoh.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-LRIhm9ZT.js";import"./FormControl-Dc2R__I5.js";import"./InputLabel-DJehHiuq.js";import"./TooltipIcon-zj5xDHAE.js";import"./LegacyTooltip-D3XZnxSi.js";import"./useLink-Br-w_ucj.js";import"./useFocusable-BcIBCRrh.js";import"./useFocusRing-HQOnF_Kw.js";import"./useEffectEvent-DtYDcY6c.js";import"./chain-pG_FVjze.js";import"./index-Bt8gmfke.js";import"./usePopper-gF1CZnu9.js";import"./index-Deq_MCO1.js";import"./Portal-DJoc2mSv.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BANpn3Gk.js";import"./IconCheckMark-C_jUhamR.js";import"./IconExclamationMarkCircle24-B8H-ybyW.js";import"./IconExclamationMarkTriangle-BoMnVsxx.js";import"./IconExclamationMarkTriangle24-kc206Dg0.js";import"./IconQuestionMarkCircle-CtFKirTB.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTHCP9Mo.js";import"./Switch-BGmleg8v.js";import"./TabItem-Oa5L5Tkf.js";import"./elements-BOYmskOL.js";import"./TextInput-CnhhlBIJ.js";import"./IconCross-CVl0uK4o.js";import"./Tooltip-DT6vH3pO.js";import"./useClickOutside-BUIhcMEJ.js";import"./EnablePortalWrapper-BEYQ1EgJ.js";import"./Tree-jLSMCZKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-HWEtsWO-.js";import"./FocusScope-NaJ6X-7k.js";import"./useOverlayTriggerState-6pXikwCB.js";import"./useControlledState-C9WHfCYO.js";import"./useMenuTrigger-zDXar3N1.js";import"./useLabels-DT9Bb-sB.js";import"./useLocalizedStringFormatter-BvdwTUs4.js";import"./context-CMvj-BfJ.js";import"./VisuallyHidden-CEBIOZFZ.js";import"./helper-DA_iJq6R.js";import"./keyboard-D8xRU-Ay.js";import"./SelectionManager-1koXhfc4.js";import"./useField-DVkUr7OL.js";import"./useFormValidationState-BETjbCr0.js";import"./MenuItem-5mcUlOkg.js";import"./IconCaretRight-DMhBk2l8.js";import"./Trigger-CMbarR76.js";import"./IconCaretDown-BUciQsUp.js";import"./IconCaretDown16-bn1bAJM-.js";import"./IconTrashBin16-D2jqe9uk.js";import"./IconTrashBin24-CffgCcCE.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
