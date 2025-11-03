import{j as e}from"./iframe-BBUK-lA_.js";import{F as p}from"./Flex-sN9wzTkj.js";import{a as n,b as a,D as i}from"./Divider-yBF62UcD.js";import"./preload-helper-C1FmrZbK.js";import"./Box-D3ctPfl6.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BIcir0t3.js";import"./Button-B31LSWwb.js";import"./useButton-8PvOjSfD.js";import"./useFocusable-BiJmBI_q.js";import"./useFocusRing-D7OvJ_KD.js";import"./useEffectEvent-ptIIDFd-.js";import"./chain-BJfy_l2h.js";import"./index-CTZuWojy.js";import"./IconSize-BcCrF_mi.js";import"./DialogBody-Bj-PUqam.js";import"./dialog-D9O7a7Fm.js";import"./FormControl-BCTOvGLk.js";import"./InputLabel-DbAwK9IA.js";import"./TooltipIcon-B2kE7y7F.js";import"./LegacyTooltip-FO6mXZEV.js";import"./useLink-Dktta1pV.js";import"./usePopper-C8_GcEdq.js";import"./index-BqsSDnn7.js";import"./Portal-CiTndoAp.js";import"./useMemoizedId-BJ-4wNHt.js";import"./IconCheckMark-CL_s8PNa.js";import"./IconExclamationMarkCircle24-C1Qol9e3.js";import"./IconExclamationMarkTriangle-C_-tqr5Y.js";import"./IconExclamationMarkTriangle24-Ib49INxl.js";import"./IconQuestionMarkCircle-DFYYprkw.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-IbLyar8j.js";import"./Switch-Le7Ns5mA.js";import"./TabItem-CmceOQp_.js";import"./elements-BOYmskOL.js";import"./TextInput-jqQMt8hf.js";import"./IconCross-CSFyNShK.js";import"./Tooltip-CpoL3JMk.js";import"./useClickOutside-DnCNqt1t.js";import"./EnablePortalWrapper-fiRvGGru.js";import"./Tree-BKUiGIux.js";import"./_Uint8Array-CwPxMkg2.js";const re={title:"Components/Divider",component:i,tags:["autodocs"],args:{color:"red",vertical:!1,"data-test-id":"custom-test-id"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Divider component](/docs/current_components-divider--documentation) instead."}}},argTypes:{color:{control:{type:"color"}},style:{options:Object.values(a),control:{type:"select",labels:Object.entries(a).reduce((t,[o,s])=>({...t,[s]:o}),{})}},height:{options:Object.values(n),control:{type:"select",labels:Object.entries(n).reduce((t,[o,s])=>({...t,[s]:o}),{})}},vertical:{control:{type:"boolean"}}}},r=t=>t.vertical?e.jsxs(p,{direction:"row",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]}):e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsx("div",{children:"Just like life, cheeseburgers are meant to be relished."}),e.jsx(i,{...t}),e.jsx("div",{children:"Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended."}),e.jsx(i,{...t}),e.jsx("div",{children:"Cheeseburgers are like a metaphor for life."}),e.jsx(i,{...t}),e.jsx("div",{children:"All the good stuff is in the middle but the rest of it is necessary too."})]});r.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{as:{required:!1,tsType:{name:"union",raw:"'div' | 'li'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'li'"}]},description:""},style:{required:!1,tsType:{name:"DividerStyle"},description:""},height:{required:!1,tsType:{name:"union",raw:"DividerHeight | string",elements:[{name:"DividerHeight"},{name:"string"}]},description:""},color:{required:!1,tsType:{name:"string"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: DividerProps) => {
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
