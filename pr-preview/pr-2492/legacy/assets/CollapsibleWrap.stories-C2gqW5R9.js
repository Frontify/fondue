import{j as e}from"./iframe-XxqBN40N.js";import{C as m}from"./Card-CQchkCpy.js";import{H as h}from"./Heading-g27hR7tG.js";import{T as n}from"./Text-DUWoui1P.js";import{A as b}from"./index-Dp5KcVBo.js";import{m as v}from"./proxy-B41xMHeg.js";import"./preload-helper-Dv4nbGDI.js";import"./useButton-VKq2aPNh.js";import"./useFocusable-Bci-pVKV.js";import"./useFocusRing-i9vnNELz.js";import"./useEffectEvent-OMvGf4aJ.js";import"./chain-CVi4IT3l.js";import"./index-CyF0k7RH.js";import"./focusStyle-6rwBDk7H.js";import"./merge-DI-veSMP.js";import"./records-DFIz8BfL.js";const o=({children:t,isOpen:f=!1,preventInitialAnimation:w=!1,animateOpacity:u=!0,"data-test-id":x="collapsible-wrap"})=>e.jsx(b,{initial:w?!1:void 0,children:f&&t?e.jsx(v.div,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{height:"auto",overflow:"hidden",opacity:1,transitionEnd:{overflow:"visible"}},collapsed:{height:0,overflow:"hidden",opacity:u?0:1}},transition:{type:"tween"},"data-test-id":x,children:t}):null});o.displayName="FondueCollapsibleWrap";o.__docgenInfo={description:"@deprecated Use `Accordion` from `@frontify/fondue/components` instead.",methods:[],displayName:"FondueCollapsibleWrap",props:{isOpen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},preventInitialAnimation:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},animateOpacity:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}}}};const V={title:"Legacy Components/Collapsible Wrap",component:o,tags:["autodocs"],args:{isOpen:!0,animateOpacity:!0},parameters:{docs:{description:{component:`### *Legacy component warning*
#### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.`}}}},a=t=>e.jsx(m,{children:e.jsxs("div",{className:"tw-divide-y tw-divide-black-10",children:[e.jsx("div",{className:"tw-p-3",children:e.jsx(h,{children:"Collapsible Wrap"})}),e.jsx(o,{...t,children:e.jsxs("div",{className:"tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col",children:[e.jsx(n,{children:"I am the child content of the Collapsible Wrap Component."}),e.jsx(n,{children:"Toggle the open state to hide me."})]})})]})}),i=t=>e.jsx(m,{children:e.jsxs("div",{className:"tw-divide-y tw-divide-black-10",children:[e.jsx("div",{className:"tw-p-3",children:e.jsx(h,{children:"Collapsible Wrap Without First Animation"})}),e.jsx(o,{...t,preventInitialAnimation:!0,children:e.jsxs("div",{className:"tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col",children:[e.jsx(n,{children:"I am the child content of the Collapsible Wrap Component."}),e.jsx(n,{children:"Toggle the open state to hide me."})]})})]})});a.__docgenInfo={description:"",methods:[],displayName:"CollapsibleWrap"};i.__docgenInfo={description:"",methods:[],displayName:"CollapsibleWrapNoStartingAnimation"};var l,s,r;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`args => <Card>
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <Heading>Collapsible Wrap</Heading>
            </div>
            <CollapsibleWrapComponent {...args}>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <Text>I am the child content of the Collapsible Wrap Component.</Text>
                    <Text>Toggle the open state to hide me.</Text>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </Card>`,...(r=(s=a.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};var p,d,c;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`args => <Card>
        <div className="tw-divide-y tw-divide-black-10">
            <div className="tw-p-3">
                <Heading>Collapsible Wrap Without First Animation</Heading>
            </div>
            <CollapsibleWrapComponent {...args} preventInitialAnimation>
                <div className="tw-h-[200px] tw-p-5 tw-bg-black-5 tw-flex tw-justify-center tw-items-center tw-flex-col">
                    <Text>I am the child content of the Collapsible Wrap Component.</Text>
                    <Text>Toggle the open state to hide me.</Text>
                </div>
            </CollapsibleWrapComponent>
        </div>
    </Card>`,...(c=(d=i.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const E=["CollapsibleWrap","CollapsibleWrapNoStartingAnimation"];export{a as CollapsibleWrap,i as CollapsibleWrapNoStartingAnimation,E as __namedExportsOrder,V as default};
