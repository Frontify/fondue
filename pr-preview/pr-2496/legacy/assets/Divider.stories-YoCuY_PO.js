import{j as e}from"./iframe-BgYojI_W.js";import{F as p}from"./Flex-CV28Rxpp.js";import{a as n,b as a,D as i}from"./Divider-CDy9eqK6.js";import"./preload-helper-D2dEV7R8.js";import"./Box-BYPsPXhj.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cs8fv1qz.js";import"./Button-BY43IOw2.js";import"./useButton-BDmytRL6.js";import"./useFocusable-BriU369z.js";import"./useFocusRing-S1vUz9A3.js";import"./useEffectEvent-CjtgopOr.js";import"./chain-CLjZ0rZo.js";import"./index-CW7dYZLD.js";import"./IconSize-BcCrF_mi.js";import"./DialogBody-C-jKznGi.js";import"./dialog-D9O7a7Fm.js";import"./FormControl-B4bo9qwF.js";import"./InputLabel-DVV4hrtx.js";import"./TooltipIcon-CmvJf6ug.js";import"./LegacyTooltip-DblPyA6F.js";import"./useLink-BnSQ2pha.js";import"./usePopper-C2LFeOXI.js";import"./index-DJQ3JVVA.js";import"./Portal-VEfQ3NaP.js";import"./useMemoizedId-DElFU63U.js";import"./IconCheckMark-D8XnL3-x.js";import"./IconExclamationMarkCircle24-7FcJBMVN.js";import"./IconExclamationMarkTriangle-vM5NM8pJ.js";import"./IconExclamationMarkTriangle24-ChN_MsIm.js";import"./IconQuestionMarkCircle-CmPTeuhb.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-yP6bM4mM.js";import"./Switch-BUBn1H02.js";import"./TabItem-ti1_PO_n.js";import"./elements-BOYmskOL.js";import"./TextInput-DQyO_ikN.js";import"./IconCross-BSCCmRlT.js";import"./Tooltip-BAsK2xdZ.js";import"./useClickOutside-Cx9dWJ8X.js";import"./EnablePortalWrapper-DIXXfq5B.js";import"./Tree-CMaAuYs0.js";import"./_Uint8Array-CwPxMkg2.js";const re={title:"Components/Divider",component:i,tags:["autodocs"],args:{color:"red",vertical:!1,"data-test-id":"custom-test-id"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Divider component](/docs/current_components-divider--documentation) instead."}}},argTypes:{color:{control:{type:"color"}},style:{options:Object.values(a),control:{type:"select",labels:Object.entries(a).reduce((t,[o,s])=>({...t,[s]:o}),{})}},height:{options:Object.values(n),control:{type:"select",labels:Object.entries(n).reduce((t,[o,s])=>({...t,[s]:o}),{})}},vertical:{control:{type:"boolean"}}}},r=t=>t.vertical?e.jsxs(p,{direction:"row",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]}):e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]});r.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{as:{required:!1,tsType:{name:"union",raw:"'div' | 'li'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'li'"}]},description:""},style:{required:!1,tsType:{name:"DividerStyle"},description:""},height:{required:!1,tsType:{name:"union",raw:"DividerHeight | string",elements:[{name:"DividerHeight"},{name:"string"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: DividerProps) => {
  if (args.vertical) {
    return <Flex direction="row">
                <div>Just like life, cheeseburgers are meant to be relished.</div>
                <DividerComponent {...args} />
                <div>
                    Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet
                    brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the
                    ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in
                    all forms - bun intended.
                </div>
                <DividerComponent {...args} />
                <div>Cheeseburgers are like a metaphor for life.</div>
                <DividerComponent {...args} />
                <div>All the good stuff is in the middle but the rest of it is necessary too.</div>
            </Flex>;
  }
  return <div className="tw-flex tw-flex-col">
            <div>Just like life, cheeseburgers are meant to be relished.</div>
            <DividerComponent {...args} />
            <div>
                Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie
                and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’
                faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all
                forms - bun intended.
            </div>
            <DividerComponent {...args} />
            <div>Cheeseburgers are like a metaphor for life.</div>
            <DividerComponent {...args} />
            <div>All the good stuff is in the middle but the rest of it is necessary too.</div>
        </div>;
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const oe=["Divider"];export{r as Divider,oe as __namedExportsOrder,re as default};
