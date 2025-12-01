import{j as e}from"./iframe-BxkmZ_qS.js";import{F as p}from"./Flex-B5GlvWVG.js";import{a as n,b as a,D as i}from"./Divider-BeD3hYt7.js";import"./preload-helper-DGVESE2Y.js";import"./Box-CBIfPAh5.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DxWp8C5T.js";import"./Button-B7-zHvnj.js";import"./useButton-DTKD_JJt.js";import"./useFocusable-CMqYS_wN.js";import"./useFocusRing-3sDfkXlZ.js";import"./useEffectEvent-DC2V05mW.js";import"./chain-CVnaEK-u.js";import"./index-BHLQBrUq.js";import"./IconSize-BcCrF_mi.js";import"./FormControl-BVGE11Hg.js";import"./InputLabel-Cy2480Uz.js";import"./TooltipIcon-hzSmRwpv.js";import"./LegacyTooltip-NfvcJwD5.js";import"./useLink-C7JKiGPY.js";import"./usePopper-CfpTIbUB.js";import"./index-B1O1MNq5.js";import"./Portal-C5SODFR_.js";import"./useMemoizedId-BMYZCDTz.js";import"./IconCheckMark-D276Qa_c.js";import"./IconExclamationMarkCircle24-hm6ZOfLp.js";import"./IconExclamationMarkTriangle-C2mrgeE6.js";import"./IconExclamationMarkTriangle24-D7QSRMTV.js";import"./IconQuestionMarkCircle-C_4XNBvy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BXjrMe8D.js";import"./Switch-BGnM1Fs9.js";import"./TabItem-RUpz2903.js";import"./elements-BOYmskOL.js";import"./TextInput-LXs-tQDI.js";import"./IconCross-Du4TXULc.js";import"./Tooltip-BfikMBee.js";import"./useClickOutside-C5ztWzxe.js";import"./EnablePortalWrapper-DTqQDG5a.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Cv8I9p-L.js";import"./_Uint8Array-CwPxMkg2.js";const ie={title:"Components/Divider",component:i,tags:["autodocs"],args:{color:"red",vertical:!1,"data-test-id":"custom-test-id"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Divider component](/docs/current_components-divider--documentation) instead."}}},argTypes:{color:{control:{type:"color"}},style:{options:Object.values(a),control:{type:"select",labels:Object.entries(a).reduce((t,[o,s])=>({...t,[s]:o}),{})}},height:{options:Object.values(n),control:{type:"select",labels:Object.entries(n).reduce((t,[o,s])=>({...t,[s]:o}),{})}},vertical:{control:{type:"boolean"}}}},r=t=>t.vertical?e.jsxs(p,{direction:"row",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]}):e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]});r.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{as:{required:!1,tsType:{name:"union",raw:"'div' | 'li'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'li'"}]},description:""},style:{required:!1,tsType:{name:"DividerStyle"},description:""},height:{required:!1,tsType:{name:"union",raw:"DividerHeight | string",elements:[{name:"DividerHeight"},{name:"string"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: DividerProps) => {
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
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const re=["Divider"];export{r as Divider,re as __namedExportsOrder,ie as default};
