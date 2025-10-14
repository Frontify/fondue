import{r as c,j as t}from"./iframe-8Aj-00-r.js";import{a as k}from"./Box-BnsoD87U.js";import{B as i,b as n,a}from"./Button-CG-0nyWt.js";import{D as I}from"./DialogBody-Ddxe0wtY.js";import{D as O}from"./DialogFooter-eHPQohMl.js";import{D as E}from"./DialogHeader-BucXdDCK.js";import{D as b}from"./Divider-Cb8yJJpF.js";import{D as T}from"./Dropdown-C-O-Den-.js";import{F as y}from"./Flex-aA7zU9ix.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BDo8sWr2.js";import{I as d}from"./InlineDialog-DFBwepsY.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-ClJkntjM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cb-cDZ2G.js";import"./FormControl-DsARninL.js";import"./InputLabel-DPPpQodA.js";import"./TooltipIcon-Di_0n2EP.js";import"./LegacyTooltip-C9tle7yu.js";import"./useLink-BNAZ-U-L.js";import"./useFocusable-BwZ_9y-T.js";import"./useFocusRing-qG24ebph.js";import"./useEffectEvent-Cq9opHnK.js";import"./chain-BjqAHd5L.js";import"./index-DCNbMVtB.js";import"./usePopper-CXS_WYpq.js";import"./index-Dnw8Dsyi.js";import"./Portal-Bz1ny3RM.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CGc7h3BS.js";import"./IconCheckMark-W08NCNhP.js";import"./IconExclamationMarkCircle24-wOO7RqI2.js";import"./IconExclamationMarkTriangle-CTaWxLT5.js";import"./IconExclamationMarkTriangle24-DBim1kUj.js";import"./IconQuestionMarkCircle-DR6B91h_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CiFVWgYB.js";import"./Switch-CG7Fwrxc.js";import"./TabItem-_H69nyMB.js";import"./elements-BOYmskOL.js";import"./TextInput-p2yGTJcX.js";import"./IconCross-BxAiCgtg.js";import"./Tooltip-Bgz3MuCc.js";import"./useClickOutside-E2Pu4nAj.js";import"./EnablePortalWrapper-doVjENwO.js";import"./Tree-LcjhZUHT.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Bafp_Ri-.js";import"./IconCaretDown-ByO_B0hy.js";import"./IconCaretDown16-l4VSPtYz.js";import"./IconTrashBin16-DiEpovv2.js";import"./IconTrashBin24-CL9xT_lP.js";import"./useButton-Dojg9qor.js";import"./FocusScope-CTjdKyO5.js";import"./useOverlayTriggerState-ChNjsbrI.js";import"./useControlledState-D_xv8YeC.js";import"./useMenuTrigger-B56YI9sB.js";import"./useLabels-CzFGOsdE.js";import"./useLocalizedStringFormatter-B8RupXhl.js";import"./context-DJA_byga.js";import"./VisuallyHidden-pr9n8Eu6.js";import"./helper-CFr4oJ23.js";import"./keyboard-BqGaruCr.js";import"./SelectionManager-BrlFgUVk.js";import"./useField-BLaRcGJ8.js";import"./useFormValidationState-QoNIVx9j.js";import"./MenuItem-DpQE8dX8.js";import"./IconCaretRight-Dx4qKvYw.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
