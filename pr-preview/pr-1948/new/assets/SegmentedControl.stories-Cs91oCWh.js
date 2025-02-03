import{j as e}from"./jsx-runtime-BSxFkHFN.js";import{r as R,e as m}from"./index-i66itsuO.js";import{c as u}from"./fondue-icons348-COpsOkcC.js";import{a as te}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{L as oe}from"./Label-C1RQDYRK.js";import{c as ne}from"./index-BwxsjnLo.js";import{P as y}from"./index-DBZ-mzwX.js";import{c as $,I as re,R as se}from"./index-BLvRamEp.js";import{c as ae}from"./index-BNYVQE02.js";import{u as G}from"./index-P4w4wmP2.js";import{u as le}from"./index-DLXHbKnz.js";import{u as ie}from"./useControllableState-BeU1Rl3I.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./styleUtilities-rhQWLmVU.js";import"./index-CKhSlaqw.js";import"./index-DuKli7Nf.js";import"./index-BJaWHrbV.js";var de="Toggle",H=R.forwardRef((t,o)=>{const{pressed:r,defaultPressed:l=!1,onPressedChange:s,...d}=t,[i=!1,a]=G({prop:r,onChange:s,defaultProp:l});return e.jsx(y.button,{type:"button","aria-pressed":i,"data-state":i?"on":"off","data-disabled":t.disabled?"":void 0,...d,ref:o,onClick:ae(t.onClick,()=>{t.disabled||a(!i)})})});H.displayName=de;var I="ToggleGroup",[J,Oe]=ne(I,[$]),K=$(),P=m.forwardRef((t,o)=>{const{type:r,...l}=t;if(r==="single"){const s=l;return e.jsx(ce,{...s,ref:o})}if(r==="multiple"){const s=l;return e.jsx(me,{...s,ref:o})}throw new Error(`Missing prop \`type\` expected on \`${I}\``)});P.displayName=I;var[Q,X]=J(I),ce=m.forwardRef((t,o)=>{const{value:r,defaultValue:l,onValueChange:s=()=>{},...d}=t,[i,a]=G({prop:r,defaultProp:l,onChange:s});return e.jsx(Q,{scope:t.__scopeToggleGroup,type:"single",value:i?[i]:[],onItemActivate:a,onItemDeactivate:m.useCallback(()=>a(""),[a]),children:e.jsx(Y,{...d,ref:o})})}),me=m.forwardRef((t,o)=>{const{value:r,defaultValue:l,onValueChange:s=()=>{},...d}=t,[i=[],a]=G({prop:r,defaultProp:l,onChange:s}),c=m.useCallback(p=>a((v=[])=>[...v,p]),[a]),_=m.useCallback(p=>a((v=[])=>v.filter(ee=>ee!==p)),[a]);return e.jsx(Q,{scope:t.__scopeToggleGroup,type:"multiple",value:i,onItemActivate:c,onItemDeactivate:_,children:e.jsx(Y,{...d,ref:o})})});P.displayName=I;var[ue,ge]=J(I),Y=m.forwardRef((t,o)=>{const{__scopeToggleGroup:r,disabled:l=!1,rovingFocus:s=!0,orientation:d,dir:i,loop:a=!0,...c}=t,_=K(r),p=le(i),v={role:"group",dir:p,...c};return e.jsx(ue,{scope:r,rovingFocus:s,disabled:l,children:s?e.jsx(se,{asChild:!0,..._,orientation:d,dir:p,loop:a,children:e.jsx(y.div,{...v,ref:o})}):e.jsx(y.div,{...v,ref:o})})}),j="ToggleGroupItem",Z=m.forwardRef((t,o)=>{const r=X(j,t.__scopeToggleGroup),l=ge(j,t.__scopeToggleGroup),s=K(t.__scopeToggleGroup),d=r.value.includes(t.value),i=l.disabled||t.disabled,a={...t,pressed:d,disabled:i},c=m.useRef(null);return l.rovingFocus?e.jsx(re,{asChild:!0,...s,focusable:!i,active:d,ref:c,children:e.jsx(N,{...a,ref:o})}):e.jsx(N,{...a,ref:o})});Z.displayName=j;var N=m.forwardRef((t,o)=>{const{__scopeToggleGroup:r,value:l,...s}=t,d=X(j,r),i={role:"radio","aria-checked":t.pressed,"aria-pressed":void 0},a=d.type==="single"?i:void 0;return e.jsx(H,{...a,...s,ref:o,onPressedChange:c=>{c?d.onItemActivate(l):d.onItemDeactivate(l)}})}),pe=P,ve=Z;const Ie="_root_1hloi_5",fe="_item_1hloi_26",he="_itemLabel_1hloi_46",Ce="_itemLabelActive_1hloi_66",xe="_itemLabelInactive_1hloi_96",Se="_activeIndicator_1hloi_126",je="_separator_1hloi_223",g={root:Ie,item:fe,itemLabel:he,itemLabelActive:Ce,itemLabelInactive:xe,activeIndicator:Se,separator:je},T=({children:t,value:o,defaultValue:r,onValueChange:l,...s},d)=>{const[i,a]=ie({prop:o,defaultProp:r,onChange:l});return e.jsxs(pe,{ref:d,...s,className:g.root,onValueChange:c=>{c&&a(c)},value:i,type:"single",asChild:!1,"aria-disabled":s.disabled,children:[t,e.jsx("div",{className:g.activeIndicator})]})};T.displayName="SegmentedControl.Root";const b=({children:t,...o},r)=>e.jsxs(ve,{ref:r,...o,className:g.item,asChild:!1,children:[e.jsx("span",{className:g.separator}),e.jsxs("span",{className:g.itemLabel,children:[e.jsx("span",{className:g.itemLabelActive,children:t}),e.jsx("span",{className:g.itemLabelInactive,children:t})]})]});b.displayName="SegmentedControl.Item";const n={Root:R.forwardRef(T),Item:R.forwardRef(b)};T.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultValue:{required:!0,tsType:{name:"string"},description:`The default value of the segmented control
Used for uncontrolled components`},value:{required:!1,tsType:{name:"string"},description:"The controlled value of the segmented control"},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the value changes"},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the segmented control
@default false`}}};b.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""}}};const ke={title:"Components/Segmented Control",component:T,subcomponents:{"SegmentedControl.Item":b},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:te("onValueChange")},decorators:t=>e.jsx("div",{className:"tw-w-64",children:e.jsx(t,{})})},f={render:t=>e.jsxs(n.Root,{...t,children:[e.jsx(n.Item,{value:"first",children:"First"}),e.jsx(n.Item,{value:"second",children:"Second"}),e.jsx(n.Item,{value:"third",children:"Third"})]})},h={render:t=>e.jsxs(n.Root,{...t,children:[e.jsx(n.Item,{value:"first",children:e.jsx(u,{size:20})}),e.jsx(n.Item,{value:"second",children:e.jsx(u,{size:20})}),e.jsx(n.Item,{value:"third",children:e.jsx(u,{size:20})})]})},C={render:t=>e.jsxs(n.Root,{...t,children:[e.jsxs(n.Item,{value:"first",children:[e.jsx(u,{size:20}),"First"]}),e.jsxs(n.Item,{value:"second",children:[e.jsx(u,{size:20}),"Second"]}),e.jsxs(n.Item,{value:"third",children:[e.jsx(u,{size:20}),"Third"]})]})},x={render:t=>e.jsxs(n.Root,{...t,disabled:!0,children:[e.jsxs(n.Item,{value:"first",children:[e.jsx(u,{size:20}),"First"]}),e.jsxs(n.Item,{value:"second",children:[e.jsx(u,{size:20}),"Second"]}),e.jsxs(n.Item,{value:"third",children:[e.jsx(u,{size:20}),"Third"]})]})},S={render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(oe,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(n.Root,{...t,id:"segmented-control",children:[e.jsx(n.Item,{value:"first",children:"First"}),e.jsx(n.Item,{value:"second",children:"Second"}),e.jsx(n.Item,{value:"third",children:"Third"})]})]})};var L,w,z;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(z=(w=f.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var F,V,A;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(A=(V=h.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var E,q,D;C.parameters={...C.parameters,docs:{...(E=C.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(D=(q=C.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var M,O,k;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args} disabled>
            <SegmentedControl.Item value="first">
                <IconIcon size={20} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={20} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={20} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(k=(O=x.parameters)==null?void 0:O.docs)==null?void 0:k.source}}};var B,U,W;S.parameters={...S.parameters,docs:{...(B=S.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => {
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label htmlFor="segmented-control">Segmented Control</Label>

                <SegmentedControl.Root {...args} id="segmented-control">
                    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
                </SegmentedControl.Root>
            </div>;
  }
}`,...(W=(U=S.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};const Be=["TextOnly","IconOnly","IconAndText","Disabled","WithLabel"];export{x as Disabled,C as IconAndText,h as IconOnly,f as TextOnly,S as WithLabel,Be as __namedExportsOrder,ke as default};
