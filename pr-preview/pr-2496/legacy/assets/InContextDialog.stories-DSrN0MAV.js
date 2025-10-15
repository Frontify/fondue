import{r as i,j as e}from"./iframe-BgYojI_W.js";import{a as B}from"./Box-BYPsPXhj.js";import{B as q,a as A}from"./Button-BY43IOw2.js";import{D as S}from"./DialogBody-C-jKznGi.js";import{D as N}from"./DialogFooter-CYwQivbn.js";import{D as R}from"./DialogHeader-CC4VPHaK.js";import{F as E}from"./Flex-CV28Rxpp.js";import{I as F}from"./InlineDialog-BJTVzpbX.js";import{L as W,T as z,a as U}from"./LegacyTooltip-DblPyA6F.js";import{b as X}from"./MenuItem-CK90v2n3.js";import{T as O}from"./TabItem-ti1_PO_n.js";import{T as _,a as J}from"./Tabs-BO64o3bw.js";import{T as G}from"./TextInput-DQyO_ikN.js";import{T as K}from"./Tooltip-BAsK2xdZ.js";import{I as Q}from"./IconCaretDown-iXKI0o7n.js";import{I as V}from"./IconCaretUp-DrVfI4yP.js";import{I as Y}from"./IconMagnifier-CVB1rpbh.js";import{I as Z}from"./IconSize-BcCrF_mi.js";import{T}from"./Text-B7znQN7Y.js";import{D as h}from"./Dialog-Dw1GDHJj.js";import{M as d}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D2dEV7R8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cs8fv1qz.js";import"./Divider-CDy9eqK6.js";import"./FormControl-B4bo9qwF.js";import"./InputLabel-DVV4hrtx.js";import"./TooltipIcon-CmvJf6ug.js";import"./IconQuestionMarkCircle-CmPTeuhb.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-yP6bM4mM.js";import"./Switch-BUBn1H02.js";import"./useFocusRing-S1vUz9A3.js";import"./useEffectEvent-CjtgopOr.js";import"./useMemoizedId-DElFU63U.js";import"./Tree-CMaAuYs0.js";import"./index-CW7dYZLD.js";import"./_Uint8Array-CwPxMkg2.js";import"./index-DJQ3JVVA.js";import"./IconCheckMark-D8XnL3-x.js";import"./IconCross-BSCCmRlT.js";import"./IconExclamationMarkTriangle-vM5NM8pJ.js";import"./IconExclamationMarkTriangle24-ChN_MsIm.js";import"./useButton-BDmytRL6.js";import"./useFocusable-BriU369z.js";import"./chain-CLjZ0rZo.js";import"./useLink-BnSQ2pha.js";import"./usePopper-C2LFeOXI.js";import"./Portal-VEfQ3NaP.js";import"./IconExclamationMarkCircle24-7FcJBMVN.js";import"./IconCaretRight-DgsYXu0T.js";import"./elements-BOYmskOL.js";import"./Badge-AS4kqDPa.js";import"./colors-cqDZVL9s.js";import"./IconDotsHorizontal-Cqp_q4hR.js";import"./proxy-CEIYE82H.js";import"./useClickOutside-Cx9dWJ8X.js";import"./EnablePortalWrapper-DIXXfq5B.js";import"./IconCaretDown16-BixWz1Dj.js";import"./IconMagnifier16-F_y5fPwR.js";import"./records-DFIz8BfL.js";const ct={title:"Experimental/Dialog/In Context",component:h,tags:["autodocs"],args:{modality:d.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(d),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},$=u=>{const[n,o]=i.useState(!1),[g,p]=i.useState("1"),s=i.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(q,{ref:s,onClick:()=>o(!n),children:"Dialog trigger"}),e.jsxs(h,{...u,anchor:s,open:n,handleClose:()=>o(!1),children:[e.jsx(R,{title:"Heading",padding:"comfortable",onClose:()=>o(!1),separator:!1}),e.jsx(S,{children:e.jsxs(_,{activeItemId:g,paddingX:J.None,onChange:a=>p(a),children:[e.jsx(O,{id:"1",label:"Tab 1",children:e.jsx("p",{className:"tw-p-6",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."})}),e.jsx(O,{id:"2",label:"Tab 2",children:e.jsxs(B,{className:"tw-p-6",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."})]})})]})}),e.jsx(N,{actionButtons:[{children:"Cancel",emphasis:A.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]})]})},m=[{code:"en",label:"English"},{code:"de",label:"German"},{code:"fr",label:"French"},{code:"es",label:"Spanish"}],ee=u=>{const[n,o]=i.useState(!1),[g,p]=i.useState(m),[s,a]=i.useState(!1),[b,w]=i.useState(null),[M,x]=i.useState(""),I=i.useRef(null),C=i.useRef(null),f=()=>{o(!1),x(""),w(null),p(m)},H=t=>{w(m.find(c=>c.code===t)??null),a(!1)},P=t=>{x(t),p(m.filter(c=>c.label.toLowerCase().includes(t.toLowerCase())||c.code.toLowerCase().includes(t.toLowerCase())))};return e.jsxs("div",{className:"tw-inline-flex",children:[e.jsx(W,{content:"Triggering button",position:z.Right,enablePortal:!0,hoverDelay:50,enterDelay:300,triggerElement:e.jsx(q,{ref:I,onClick:()=>o(!n),children:"Dialog Trigger"}),withArrow:!0}),e.jsxs(h,{...u,anchor:I,open:n,handleClose:f,children:[e.jsx(R,{onClose:()=>o(!1),padding:"comfortable",title:"Dialog content header"}),e.jsx(S,{children:e.jsxs(B,{className:"tw-p-10",children:[e.jsxs(E,{justify:"start",alignContent:"center",children:[e.jsx(K,{content:"Just some Information",children:e.jsx(U,{})}),e.jsx("p",{children:"Information"})]}),e.jsxs("button",{type:"button",onClick:()=>a(!0),ref:C,className:"tw-text-ellipsis tw-flex tw-items-center tw-h-9 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-bg-white dark:tw-bg-transparent tw-border-solid focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20 tw-justify-between tw-gap-x-3 tw-w-full",children:[b?e.jsx("div",{className:"tw-flex tw-flex-row tw-w-full",children:e.jsx(T,{color:"x-weak",children:b.label})}):e.jsx("span",{children:e.jsx("span",{children:"Select option"})}),s?e.jsx(V,{}):e.jsx(Q,{})]}),e.jsx(F,{anchor:C,open:s,flip:!0,handleClose:()=>a(!1),maxWidth:600,minHeight:0,minWidth:0,width:"100%",autoHeight:!0,modality:d.NonModal,offset:[0,8],placement:"bottom-start",enablePortal:!1,children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-w-[486px] tw-px-4 tw-py-2",children:e.jsx(G,{focusOnMount:!0,decorator:e.jsx(Y,{size:Z.Size16}),id:"name",placeholder:"Search",value:M,onChange:t=>P(t)})}),s&&g.map(t=>e.jsx(X,{onClick:()=>H(t.code),children:e.jsx("div",{className:"tw-flex tw-flex-row tw-w-full",children:e.jsx(T,{color:"x-weak",children:t.label})})},t.code))]})})]})}),e.jsx(N,{actionButtons:[{children:"Cancel",emphasis:A.Default,onClick:f},{children:"Confirm",onClick:f}]})]})]})},r=$.bind({});r.args={verticalAlignment:"top"};const l=ee.bind({});l.args={modality:d.Modal,darkUnderlay:!0};var L,D,j;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('1');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog trigger
            </Button>

            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogHeader title="Heading" padding="comfortable" onClose={() => setIsOpen(false)} separator={false} />
                <DialogBody>
                    <Tabs activeItemId={activeItemId} paddingX={TabsPaddingX.None} onChange={value => setActiveItemId(value)}>
                        <TabItem id="1" label="Tab 1">
                            <p className="tw-p-6">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam
                                reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit.
                            </p>
                        </TabItem>

                        <TabItem id="2" label="Tab 2">
                            <Box className="tw-p-6">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                            </Box>
                        </TabItem>
                    </Tabs>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Cancel',
        emphasis: ButtonEmphasis.Default,
        onClick: () => setIsOpen(false)
      }, {
        children: 'Confirm',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(j=(D=r.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var y,v,k;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptionList, setFilteredOptionList] = useState<OptionListItem[]>(optionList);
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [optionItemChosen, setOptionItemChosen] = useState<Nullable<OptionListItem>>(null);
  const [inputPhrase, setInputPhrase] = useState('');
  const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);
  const inlineDialogTriggerRef = useRef<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setIsOpen(false);
    setInputPhrase('');
    setOptionItemChosen(null);
    setFilteredOptionList(optionList);
  };
  const chooseOption = (code: string) => {
    setOptionItemChosen(optionList.find(option => option.code === code) ?? null);
    setIsOptionListOpen(false);
  };
  const handleInput = (value: string) => {
    setInputPhrase(value);
    setFilteredOptionList(optionList.filter(option => option.label.toLowerCase().includes(value.toLowerCase()) || option.code.toLowerCase().includes(value.toLowerCase())));
  };
  return <div className="tw-inline-flex">
            <LegacyTooltip content="Triggering button" position={TooltipPosition.Right} enablePortal hoverDelay={50} enterDelay={300} triggerElement={<Button ref={dialogTriggerRef} onClick={() => setIsOpen(!isOpen)}>
                        Dialog Trigger
                    </Button>} withArrow />
            <Dialog {...args} anchor={dialogTriggerRef} open={isOpen} handleClose={handleClose}>
                <DialogHeader onClose={() => setIsOpen(false)} padding="comfortable" title="Dialog content header" />
                <DialogBody>
                    <Box className="tw-p-10">
                        <Flex justify="start" alignContent="center">
                            <Tooltip content="Just some Information">
                                <IconExclamationMarkCircle16 />
                            </Tooltip>
                            <p>Information</p>
                        </Flex>
                        <button type="button" onClick={() => setIsOptionListOpen(true)} ref={inlineDialogTriggerRef} className="tw-text-ellipsis tw-flex tw-items-center tw-h-9 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-bg-white dark:tw-bg-transparent tw-border-solid focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20 tw-justify-between tw-gap-x-3 tw-w-full">
                            {optionItemChosen ? <div className="tw-flex tw-flex-row tw-w-full">
                                    <Text color="x-weak">{optionItemChosen.label}</Text>
                                </div> : <span>
                                    <span>Select option</span>
                                </span>}
                            {isOptionListOpen ? <IconCaretUp /> : <IconCaretDown />}
                        </button>
                        <InlineDialog anchor={inlineDialogTriggerRef} open={isOptionListOpen} flip handleClose={() => setIsOptionListOpen(false)} maxWidth={600} minHeight={0} minWidth={0} width="100%" autoHeight modality={Modality.NonModal} offset={[0, 8]} placement="bottom-start" enablePortal={false}>
                            <div>
                                <div className="tw-w-[486px] tw-px-4 tw-py-2">
                                    <TextInput focusOnMount decorator={<IconMagnifier size={IconSize.Size16} />} id="name" placeholder="Search" value={inputPhrase} onChange={value => handleInput(value)} />
                                </div>

                                {isOptionListOpen && filteredOptionList.map(option => <MenuItem key={option.code} onClick={() => chooseOption(option.code)}>
                                            <div className="tw-flex tw-flex-row tw-w-full">
                                                <Text color="x-weak">{option.label}</Text>
                                            </div>
                                        </MenuItem>)}
                            </div>
                        </InlineDialog>
                    </Box>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Cancel',
        emphasis: ButtonEmphasis.Default,
        onClick: handleClose
      }, {
        children: 'Confirm',
        onClick: handleClose
      }]} />
            </Dialog>
        </div>;
}`,...(k=(v=l.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};const mt=["WithTabsAndTopAlignment","WithInlineDialogInside"];export{l as WithInlineDialogInside,r as WithTabsAndTopAlignment,mt as __namedExportsOrder,ct as default};
