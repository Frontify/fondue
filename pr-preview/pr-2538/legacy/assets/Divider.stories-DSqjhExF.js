import{j as e}from"./iframe-BqQHxnDd.js";import{F as p}from"./Flex-CO2q96At.js";import{a as n,b as a,D as i}from"./Divider-CT__RMy9.js";import"./preload-helper-B3RP-zrM.js";import"./Box-CMRxuKYI.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DYzjlsPw.js";import"./Button-DWsc2vdA.js";import"./useButton-CxAhYbwu.js";import"./useFocusable-BY5EgtMj.js";import"./useFocusRing-B3DYOANT.js";import"./useEffectEvent-DIjOIMgn.js";import"./chain-8dJdl4Ia.js";import"./index-DId98sNP.js";import"./IconSize-BcCrF_mi.js";import"./FormControl-Lk1i6m-Z.js";import"./InputLabel-CzWQnPda.js";import"./TooltipIcon-Dadx3MDO.js";import"./LegacyTooltip-BS4owh4e.js";import"./useLink-Cykwcau2.js";import"./usePopper-Cdf_544z.js";import"./index-DiYa8SvX.js";import"./Portal-GP9guqaf.js";import"./useMemoizedId-BKZvTVU3.js";import"./IconCheckMark-gnOAOTGu.js";import"./IconExclamationMarkCircle24-Fp0gSAGm.js";import"./IconExclamationMarkTriangle-DRYbaBww.js";import"./IconExclamationMarkTriangle24-BFk3Bxlq.js";import"./IconQuestionMarkCircle-9xIeZgio.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BCYd-I0j.js";import"./Switch-Dhb_5KgN.js";import"./TabItem-COVABDjx.js";import"./elements-BOYmskOL.js";import"./TextInput-CRCf7Wwq.js";import"./IconCross-C4KjmdPO.js";import"./Tooltip-nXmfdmOX.js";import"./useClickOutside-CTwfTc9E.js";import"./EnablePortalWrapper-DfwDhaeV.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C1qnlzq3.js";import"./_Uint8Array-CwPxMkg2.js";const ie={title:"Components/Divider",component:i,tags:["autodocs"],args:{color:"red",vertical:!1,"data-test-id":"custom-test-id"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Divider component](/docs/current_components-divider--documentation) instead."}}},argTypes:{color:{control:{type:"color"}},style:{options:Object.values(a),control:{type:"select",labels:Object.entries(a).reduce((t,[o,s])=>({...t,[s]:o}),{})}},height:{options:Object.values(n),control:{type:"select",labels:Object.entries(n).reduce((t,[o,s])=>({...t,[s]:o}),{})}},vertical:{control:{type:"boolean"}}}},r=t=>t.vertical?e.jsxs(p,{direction:"row",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]}):e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]});r.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{as:{required:!1,tsType:{name:"union",raw:"'div' | 'li'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'li'"}]},description:""},style:{required:!1,tsType:{name:"DividerStyle"},description:""},height:{required:!1,tsType:{name:"union",raw:"DividerHeight | string",elements:[{name:"DividerHeight"},{name:"string"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: DividerProps) => {
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
