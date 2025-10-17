import{j as e}from"./iframe-BeiBdUkj.js";import{F as p}from"./Flex-BeKKq40J.js";import{a as n,b as a,D as i}from"./Divider-CLJmmEDX.js";import"./preload-helper-B933Jwna.js";import"./Box-D4F-X9ac.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dues2-Nh.js";import"./Button-CEdhFolC.js";import"./useButton-Bfzzcqg5.js";import"./useFocusable-K9RKW1xo.js";import"./useFocusRing-tD2j4ccM.js";import"./useEffectEvent-CUg9NzP8.js";import"./chain-BnPfELDY.js";import"./index-C_AqB298.js";import"./IconSize-BcCrF_mi.js";import"./DialogBody-DnUjNEmB.js";import"./dialog-D9O7a7Fm.js";import"./FormControl-CBftJPGv.js";import"./InputLabel-BemZWnj2.js";import"./TooltipIcon-CvcUFsUW.js";import"./LegacyTooltip-3hRALyjK.js";import"./useLink-BDEcosNp.js";import"./usePopper-BHsjRDQS.js";import"./index-P2pbIT9A.js";import"./Portal-10ds-kWa.js";import"./useMemoizedId-DpnrngAE.js";import"./IconCheckMark-DjE8xlPN.js";import"./IconExclamationMarkCircle24-C6BOKAZO.js";import"./IconExclamationMarkTriangle-DYfoTdmg.js";import"./IconExclamationMarkTriangle24-z_nTLkhR.js";import"./IconQuestionMarkCircle-DVDkCeg5.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-yqG1DmvY.js";import"./Switch-COUJExrf.js";import"./TabItem-C8DEnH_5.js";import"./elements-BOYmskOL.js";import"./TextInput-DwAUnCKi.js";import"./IconCross-BKyvJ37_.js";import"./Tooltip-BlwHkNi4.js";import"./useClickOutside-DpjInTHt.js";import"./EnablePortalWrapper-BTQthFT8.js";import"./Tree-C-ulmRr-.js";import"./_Uint8Array-CwPxMkg2.js";const re={title:"Components/Divider",component:i,tags:["autodocs"],args:{color:"red",vertical:!1,"data-test-id":"custom-test-id"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Divider component](/docs/current_components-divider--documentation) instead."}}},argTypes:{color:{control:{type:"color"}},style:{options:Object.values(a),control:{type:"select",labels:Object.entries(a).reduce((t,[o,s])=>({...t,[s]:o}),{})}},height:{options:Object.values(n),control:{type:"select",labels:Object.entries(n).reduce((t,[o,s])=>({...t,[s]:o}),{})}},vertical:{control:{type:"boolean"}}}},r=t=>t.vertical?e.jsxs(p,{direction:"row",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]}):e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]});r.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{as:{required:!1,tsType:{name:"union",raw:"'div' | 'li'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'li'"}]},description:""},style:{required:!1,tsType:{name:"DividerStyle"},description:""},height:{required:!1,tsType:{name:"union",raw:"DividerHeight | string",elements:[{name:"DividerHeight"},{name:"string"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: DividerProps) => {
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
