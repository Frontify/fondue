import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as R,R as m}from"./index-BwDkhjyp.js";import{c as u}from"./fondue-icons345-BOWXYo6a.js";import{a as te}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{L as oe}from"./Label-Dm6TJ1JV.js";import{c as re}from"./index-BnOD_KYf.js";import{P as y}from"./index-BtCsUTRM.js";import{c as $,R as ne,I as se}from"./index-BudAUfSk.js";import{c as ae}from"./index-DOnKqARA.js";import{u as G}from"./index-DGaPG0k3.js";import{u as le}from"./index-C8IlRUt1.js";import{u as ie}from"./useControllableState-Bxhgt0vK.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./styleUtilities-CZDH020m.js";import"./index-CS4BWtGh.js";import"./index-B0lKOUy8.js";import"./index-DduqEaLY.js";var de="Toggle",H=R.forwardRef((t,o)=>{const{pressed:n,defaultPressed:l=!1,onPressedChange:s,...d}=t,[i=!1,a]=G({prop:n,onChange:s,defaultProp:l});return e.jsx(y.button,{type:"button","aria-pressed":i,"data-state":i?"on":"off","data-disabled":t.disabled?"":void 0,...d,ref:o,onClick:ae(t.onClick,()=>{t.disabled||a(!i)})})});H.displayName=de;var I="ToggleGroup",[J,Oe]=re(I,[$]),K=$(),P=m.forwardRef((t,o)=>{const{type:n,...l}=t;if(n==="single"){const s=l;return e.jsx(ce,{...s,ref:o})}if(n==="multiple"){const s=l;return e.jsx(me,{...s,ref:o})}throw new Error(`Missing prop \`type\` expected on \`${I}\``)});P.displayName=I;var[Q,X]=J(I),ce=m.forwardRef((t,o)=>{const{value:n,defaultValue:l,onValueChange:s=()=>{},...d}=t,[i,a]=G({prop:n,defaultProp:l,onChange:s});return e.jsx(Q,{scope:t.__scopeToggleGroup,type:"single",value:i?[i]:[],onItemActivate:a,onItemDeactivate:m.useCallback(()=>a(""),[a]),children:e.jsx(Y,{...d,ref:o})})}),me=m.forwardRef((t,o)=>{const{value:n,defaultValue:l,onValueChange:s=()=>{},...d}=t,[i=[],a]=G({prop:n,defaultProp:l,onChange:s}),c=m.useCallback(p=>a((v=[])=>[...v,p]),[a]),_=m.useCallback(p=>a((v=[])=>v.filter(ee=>ee!==p)),[a]);return e.jsx(Q,{scope:t.__scopeToggleGroup,type:"multiple",value:i,onItemActivate:c,onItemDeactivate:_,children:e.jsx(Y,{...d,ref:o})})});P.displayName=I;var[ue,ge]=J(I),Y=m.forwardRef((t,o)=>{const{__scopeToggleGroup:n,disabled:l=!1,rovingFocus:s=!0,orientation:d,dir:i,loop:a=!0,...c}=t,_=K(n),p=le(i),v={role:"group",dir:p,...c};return e.jsx(ue,{scope:n,rovingFocus:s,disabled:l,children:s?e.jsx(ne,{asChild:!0,..._,orientation:d,dir:p,loop:a,children:e.jsx(y.div,{...v,ref:o})}):e.jsx(y.div,{...v,ref:o})})}),j="ToggleGroupItem",Z=m.forwardRef((t,o)=>{const n=X(j,t.__scopeToggleGroup),l=ge(j,t.__scopeToggleGroup),s=K(t.__scopeToggleGroup),d=n.value.includes(t.value),i=l.disabled||t.disabled,a={...t,pressed:d,disabled:i},c=m.useRef(null);return l.rovingFocus?e.jsx(se,{asChild:!0,...s,focusable:!i,active:d,ref:c,children:e.jsx(w,{...a,ref:o})}):e.jsx(w,{...a,ref:o})});Z.displayName=j;var w=m.forwardRef((t,o)=>{const{__scopeToggleGroup:n,value:l,...s}=t,d=X(j,n),i={role:"radio","aria-checked":t.pressed,"aria-pressed":void 0},a=d.type==="single"?i:void 0;return e.jsx(H,{...a,...s,ref:o,onPressedChange:c=>{c?d.onItemActivate(l):d.onItemDeactivate(l)}})}),pe=P,ve=Z;const Ie="_root_2wdi8_5",fe="_item_2wdi8_26",he="_itemLabel_2wdi8_46",Ce="_itemLabelActive_2wdi8_65",xe="_itemLabelInactive_2wdi8_94",Se="_activeIndicator_2wdi8_124",je="_separator_2wdi8_221",g={root:Ie,item:fe,itemLabel:he,itemLabelActive:Ce,itemLabelInactive:xe,activeIndicator:Se,separator:je},T=({children:t,value:o,defaultValue:n,onValueChange:l,...s},d)=>{const[i,a]=ie({prop:o,defaultProp:n,onChange:l});return e.jsxs(pe,{ref:d,...s,className:g.root,onValueChange:c=>{c&&a(c)},value:i,type:"single",asChild:!1,"aria-disabled":s.disabled,children:[t,e.jsx("div",{className:g.activeIndicator})]})};T.displayName="SegmentedControl.Root";const b=({children:t,...o},n)=>e.jsxs(ve,{ref:n,...o,className:g.item,asChild:!1,children:[e.jsx("span",{className:g.separator}),e.jsxs("span",{className:g.itemLabel,children:[e.jsx("span",{className:g.itemLabelActive,children:t}),e.jsx("span",{className:g.itemLabelInactive,children:t})]})]});b.displayName="SegmentedControl.Item";const r={Root:R.forwardRef(T),Item:R.forwardRef(b)};T.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultValue:{required:!0,tsType:{name:"string"},description:`The default value of the segmented control
Used for uncontrolled components`},value:{required:!1,tsType:{name:"string"},description:"The controlled value of the segmented control"},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the value changes"},disabled:{required:!1,tsType:{name:"boolean"},description:`Disable the segmented control
@default false`}}};b.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""}}};const ke={title:"Components/Segmented Control",component:T,subcomponents:{"SegmentedControl.Item":b},tags:["autodocs"],parameters:{status:{type:"released"}},args:{defaultValue:"first",disabled:!1,onValueChange:te("onValueChange")},decorators:t=>e.jsx("div",{className:"tw-w-64",children:e.jsx(t,{})})},f={render:t=>e.jsxs(r.Root,{...t,children:[e.jsx(r.Item,{value:"first",children:"First"}),e.jsx(r.Item,{value:"second",children:"Second"}),e.jsx(r.Item,{value:"third",children:"Third"})]})},h={render:t=>e.jsxs(r.Root,{...t,children:[e.jsx(r.Item,{value:"first",children:e.jsx(u,{size:20})}),e.jsx(r.Item,{value:"second",children:e.jsx(u,{size:20})}),e.jsx(r.Item,{value:"third",children:e.jsx(u,{size:20})})]})},C={render:t=>e.jsxs(r.Root,{...t,children:[e.jsxs(r.Item,{value:"first",children:[e.jsx(u,{size:20}),"First"]}),e.jsxs(r.Item,{value:"second",children:[e.jsx(u,{size:20}),"Second"]}),e.jsxs(r.Item,{value:"third",children:[e.jsx(u,{size:20}),"Third"]})]})},x={render:t=>e.jsxs(r.Root,{...t,disabled:!0,children:[e.jsxs(r.Item,{value:"first",children:[e.jsx(u,{size:20}),"First"]}),e.jsxs(r.Item,{value:"second",children:[e.jsx(u,{size:20}),"Second"]}),e.jsxs(r.Item,{value:"third",children:[e.jsx(u,{size:20}),"Third"]})]})},S={render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(oe,{htmlFor:"segmented-control",children:"Segmented Control"}),e.jsxs(r.Root,{...t,id:"segmented-control",children:[e.jsx(r.Item,{value:"first",children:"First"}),e.jsx(r.Item,{value:"second",children:"Second"}),e.jsx(r.Item,{value:"third",children:"Third"})]})]})};var N,L,z;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
}`,...(z=(L=f.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var F,V,A;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
