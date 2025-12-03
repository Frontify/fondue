import{j as K}from"./iframe-CVRB9xG5.js";import{b as u,A as B,a as d,E as p,M as g}from"./example-assets-CCPgGaxR.js";import"./preload-helper-MprHWY6w.js";import"./Button-DRuLCDDt.js";import"./useButton-BKijJ8Ox.js";import"./useFocusable-K9LUaTpT.js";import"./useFocusRing-CIR8l5qb.js";import"./useEffectEvent-D4McFjJW.js";import"./chain-CmopQXAK.js";import"./index-C6YV3ckd.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./useMemoizedId-DZ_GWwWH.js";import"./FocusScope-tItaIZX5.js";import"./useMenuTrigger-DXxV6CNV.js";import"./useLabels-SLuP_5C7.js";import"./useLocalizedStringFormatter-CXhFz9Uz.js";import"./context-DA4el76b.js";import"./VisuallyHidden-BFQqEv8e.js";import"./helper-DhtKJs8K.js";import"./keyboard-BKGhVC1E.js";import"./SelectionManager-C7n6sNA4.js";import"./useControlledState-Bj_ZyrJ6.js";import"./useOverlayTriggerState-GQW_x-1C.js";import"./ActionMenu-CZGLi45F.js";import"./MenuItem-nXi4WjEb.js";import"./IconCaretRight-zxwIR15_.js";import"./IconCheckMark-D8jA0-uN.js";import"./elements-BOYmskOL.js";import"./Switch-qFvrWM4M.js";import"./InputLabel-DYgwFPIk.js";import"./TooltipIcon-CSS_ITO5.js";import"./LegacyTooltip-bqc1XdDN.js";import"./useLink-Bi6OJ7FT.js";import"./usePopper-BPdQg_1a.js";import"./index-Dm3ZYyOZ.js";import"./Portal-C9aGMHWR.js";import"./IconExclamationMarkCircle24-DEAcLkxP.js";import"./IconExclamationMarkTriangle-CDVeuzB2.js";import"./IconExclamationMarkTriangle24-CzJn6JJ4.js";import"./IconQuestionMarkCircle-pq_7Xd4U.js";import"./IconCaretDown-Dk5eGzJF.js";import"./IconCaretDown16-D-_xQ8kJ.js";import"./IconMusicNote-BU-6S5Zm.js";import"./index-qXB5bytB.js";import"./proxy-LxDu6xcw.js";import"./IconCross-DXx1uM3O.js";import"./IconIcon-CVDNdNrf.js";import"./IconIcon16-DpNto2vM.js";import"./IconIcon24-BDr-p4NH.js";const Hs={title:"Components/Asset Input",component:B,tags:["autodocs"],argTypes:{size:{options:Object.values(u),control:{type:"radio"}},onItemClick:{action:"onItemClick",table:{disable:!0}},onMultiAssetClick:{action:"onMultiAssetClick"}},args:{size:u.Small,isLoading:!1,hideSize:!1,hideExtension:!1,numberOfLocations:1}},e=s=>{if(s!=null&&s.actions)for(const H of s.actions)for(const J of H.menuItems)J.onClick=s.onItemClick;return s.isLoading&&s.assets&&(s.assets=void 0),K.jsx(B,{...s})},a=e.bind({});a.argTypes={onUploadClick:{action:"onUploadClick",table:{disable:!0}},onLibraryClick:{action:"onLibraryClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}},numberOfLocations:{table:{disable:!0}},onMultiAssetClick:{table:{disable:!0}}};const o=e.bind({});o.argTypes={onUploadClick:{action:"onUploadClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}},numberOfLocations:{table:{disable:!0}},onMultiAssetClick:{table:{disable:!0}}};const n=e.bind({});n.argTypes={onLibraryClick:{action:"onLibraryClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}},numberOfLocations:{table:{disable:!0}},onMultiAssetClick:{table:{disable:!0}}};const i=e.bind({});i.args={assets:[p[0]],actions:d};const c=e.bind({});c.args={assets:[p[1]],size:u.Large,actions:d};const l=e.bind({});l.args={assets:[g[3]],actions:d};const m=e.bind({});m.args={assets:[g[2]],actions:d};const F={onUploadClick:{action:"onUploadClick",table:{disable:!0}},onLibraryClick:{action:"onLibraryClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}}},t=e.bind({});t.args={assets:[p[0],...g.slice(2,4)],numberOfLocations:1};t.argTypes=F;const r=e.bind({});r.args={assets:p,numberOfLocations:2};r.argTypes=F;var b,f,k;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(k=(f=a.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var I,C,L;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(L=(C=o.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var A,y,S;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(S=(y=n.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var h,z,E;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(E=(z=i.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var x,O,M;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(M=(O=c.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var T,U,P;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(P=(U=l.parameters)==null?void 0:U.docs)==null?void 0:P.source}}};var _,j,v;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(v=(j=m.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var X,D,G;t.parameters={...t.parameters,docs:{...(X=t.parameters)==null?void 0:X.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(G=(D=t.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var R,q,w;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  if (args?.actions) {
    for (const block of args.actions) {
      for (const item of block.menuItems) {
        item.onClick = args.onItemClick;
      }
    }
  }
  if (args.isLoading && args.assets) {
    args.assets = undefined;
  }
  return <AssetInput {...args} />;
}`,...(w=(q=r.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};const Js=["Placeholder","PlaceholderUploadOnly","PlaceholderLibraryOnly","Image","ImageLibraryLarge","Audio","Icon","MixedAssets","ImageAssets"];export{l as Audio,m as Icon,i as Image,r as ImageAssets,c as ImageLibraryLarge,t as MixedAssets,a as Placeholder,n as PlaceholderLibraryOnly,o as PlaceholderUploadOnly,Js as __namedExportsOrder,Hs as default};
