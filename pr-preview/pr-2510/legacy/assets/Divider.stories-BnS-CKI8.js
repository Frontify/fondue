import{j as e}from"./iframe-DxfotSS9.js";import{F as p}from"./Flex-DXRGZQZX.js";import{a as n,b as a,D as i}from"./Divider-CYjlWnZw.js";import"./preload-helper-qBSLZfTS.js";import"./Box-C7GOpf5o.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-vYE7nqub.js";import"./Button-CMmxZlIG.js";import"./useButton-To_o5pjp.js";import"./useFocusable-BqelGtsA.js";import"./useFocusRing-Cl2cI3Lp.js";import"./useEffectEvent-D8_6AnRF.js";import"./chain-DM-najzk.js";import"./index-DpBu0Yu5.js";import"./IconSize-BcCrF_mi.js";import"./FormControl-mFXaAePr.js";import"./InputLabel-yMo-9wjq.js";import"./TooltipIcon-DRNfXv40.js";import"./LegacyTooltip-BRORIEgS.js";import"./useLink-D_fwx5cq.js";import"./usePopper-k_Qq_7j_.js";import"./index-GOXnEJ6I.js";import"./Portal-BqvWEzGw.js";import"./useMemoizedId-DPND1Hj9.js";import"./IconCheckMark-CRZ1v2hw.js";import"./IconExclamationMarkCircle24-BUygXcvA.js";import"./IconExclamationMarkTriangle-DWC4GrnU.js";import"./IconExclamationMarkTriangle24-BQSC-xnV.js";import"./IconQuestionMarkCircle-B2qDKiRV.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C8Sn9wYM.js";import"./Switch-CoQEYtyM.js";import"./TabItem-B1nt7sRl.js";import"./elements-BOYmskOL.js";import"./TextInput-Dt9oyCFy.js";import"./IconCross-C-EMmBjd.js";import"./Tooltip-BXvhTdAr.js";import"./useClickOutside-BbMxOwiV.js";import"./EnablePortalWrapper-DtYYhlB2.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ChEZSjl9.js";import"./_Uint8Array-CwPxMkg2.js";const ie={title:"Components/Divider",component:i,tags:["autodocs"],args:{color:"red",vertical:!1,"data-test-id":"custom-test-id"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Divider component](/docs/current_components-divider--documentation) instead."}}},argTypes:{color:{control:{type:"color"}},style:{options:Object.values(a),control:{type:"select",labels:Object.entries(a).reduce((t,[o,s])=>({...t,[s]:o}),{})}},height:{options:Object.values(n),control:{type:"select",labels:Object.entries(n).reduce((t,[o,s])=>({...t,[s]:o}),{})}},vertical:{control:{type:"boolean"}}}},r=t=>t.vertical?e.jsxs(p,{direction:"row",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]}):e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]});r.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{as:{required:!1,tsType:{name:"union",raw:"'div' | 'li'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'li'"}]},description:""},style:{required:!1,tsType:{name:"DividerStyle"},description:""},height:{required:!1,tsType:{name:"union",raw:"DividerHeight | string",elements:[{name:"DividerHeight"},{name:"string"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: DividerProps) => {
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
