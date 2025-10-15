import{j as e}from"./iframe-DTy7hSDB.js";import{F as p}from"./Flex-4TVp1KZb.js";import{a as n,b as a,D as i}from"./Divider-D6qgLBCM.js";import"./preload-helper-C1FmrZbK.js";import"./Box-B8CaeEYe.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B6wq3pRW.js";import"./Button-u3Szlpwi.js";import"./useButton-CPiAOWt4.js";import"./useFocusable-DDn7q-OS.js";import"./useFocusRing-BF_hD86R.js";import"./useEffectEvent-DWzMvHEb.js";import"./chain-Dz97J3RG.js";import"./index-BmPKOmbc.js";import"./IconSize-BcCrF_mi.js";import"./FormControl-Ce6rGZlg.js";import"./InputLabel-B_ubJQB3.js";import"./TooltipIcon-CizTpoEE.js";import"./LegacyTooltip-BDG39uOT.js";import"./useLink-D1XzLJMC.js";import"./usePopper-CiVsTA5i.js";import"./index-CVY-dQCv.js";import"./Portal-DWemPOBz.js";import"./useMemoizedId-Du4L_hMj.js";import"./IconCheckMark-Dg23ywij.js";import"./IconExclamationMarkCircle24-D9HRm0iS.js";import"./IconExclamationMarkTriangle-YIBYFaAr.js";import"./IconExclamationMarkTriangle24-DTwuytdQ.js";import"./IconQuestionMarkCircle-adEHOKLh.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Ou7o56up.js";import"./Switch-Dt4o7jmn.js";import"./TabItem-D2ZNavNs.js";import"./elements-BOYmskOL.js";import"./TextInput-CHRYntRv.js";import"./IconCross-bYE-tDxm.js";import"./Tooltip-DpHHfC_y.js";import"./useClickOutside-CjHzvR4j.js";import"./EnablePortalWrapper-AD12x3kU.js";import"./dialog-D9O7a7Fm.js";import"./Tree-X4dp1bQ5.js";import"./_Uint8Array-CwPxMkg2.js";const ie={title:"Components/Divider",component:i,tags:["autodocs"],args:{color:"red",vertical:!1,"data-test-id":"custom-test-id"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Divider component](/docs/current_components-divider--documentation) instead."}}},argTypes:{color:{control:{type:"color"}},style:{options:Object.values(a),control:{type:"select",labels:Object.entries(a).reduce((t,[o,s])=>({...t,[s]:o}),{})}},height:{options:Object.values(n),control:{type:"select",labels:Object.entries(n).reduce((t,[o,s])=>({...t,[s]:o}),{})}},vertical:{control:{type:"boolean"}}}},r=t=>t.vertical?e.jsxs(p,{direction:"row",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]}):e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]});r.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{as:{required:!1,tsType:{name:"union",raw:"'div' | 'li'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'li'"}]},description:""},style:{required:!1,tsType:{name:"DividerStyle"},description:""},height:{required:!1,tsType:{name:"union",raw:"DividerHeight | string",elements:[{name:"DividerHeight"},{name:"string"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: DividerProps) => {
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
