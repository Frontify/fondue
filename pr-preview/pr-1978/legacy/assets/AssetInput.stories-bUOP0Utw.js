import{j as K}from"./jsx-runtime-Nms4Y4qS.js";import{A as B,a as u,E as d,b as p,M as g}from"./example-assets-Ci-Shq_7.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./Button-DL4HHSbC.js";import"./useButton-pp-RVGt-.js";import"./useFocusable-CsWTbG_a.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./IconCrop-DmnjnoSH.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./FocusScope-CQ2H9xVQ.js";import"./useMenuTrigger-YQf43D4x.js";import"./useLabels-DH9bA-v0.js";import"./useLocalizedStringFormatter-D7Kogc_3.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-C3uPRR7_.js";import"./helper-Beo_jWfG.js";import"./index-DxjWwZXO.js";import"./isScrollable-Bts8_1NI.js";import"./SelectionManager-BuW52QpN.js";import"./useControlledState-C0C-dzuH.js";import"./useOverlayTriggerState-Ct95nBq-.js";import"./ActionMenu-D54sYN8N.js";import"./MenuItem-BEWw9_Ux.js";import"./IconCaretRight-BUEYSaCS.js";import"./IconCheckMark-BVQYjlwc.js";import"./elements-BOYmskOL.js";import"./Switch-BbDrWjRD.js";import"./InputLabel-B0cLpc7C.js";import"./TooltipIcon-C2H9B4Ax.js";import"./LegacyTooltip-0fX5D3PP.js";import"./useLink-3WgLA7Za.js";import"./usePopper-DPXU-o95.js";import"./index-CfyPTyT-.js";import"./Portal-0C9N3MSP.js";import"./IconExclamationMarkCircle-BkFYjnTO.js";import"./IconExclamationMarkCircle24-ChDY1Cve.js";import"./IconExclamationMarkTriangle-BucVSAOs.js";import"./IconExclamationMarkTriangle24-C3Ss9MHq.js";import"./IconQuestionMarkCircle-CMNESB9s.js";import"./IconCaretDown-C-LXN2Z7.js";import"./IconCaretDown16-Bqoo7UzD.js";import"./IconMusicNote-qGOLTNH6.js";import"./index-hyK68Dd8.js";import"./motion-C48bHxkn.js";import"./IconCross-BUeQrH0h.js";import"./IconIcon-BwqYlkW2.js";import"./IconIcon16-TK9s3MAx.js";import"./IconIcon24-DxzSV-8K.js";const Ns={title:"Components/Asset Input",component:B,tags:["autodocs"],argTypes:{size:{options:Object.values(u),control:{type:"radio"}},onItemClick:{action:"onItemClick",table:{disable:!0}},onMultiAssetClick:{action:"onMultiAssetClick"}},args:{size:u.Small,isLoading:!1,hideSize:!1,hideExtension:!1,numberOfLocations:1}},e=s=>{if(s!=null&&s.actions)for(const H of s.actions)for(const J of H.menuItems)J.onClick=s.onItemClick;return s.isLoading&&s.assets&&(s.assets=void 0),K.jsx(B,{...s})},o=e.bind({});o.argTypes={onUploadClick:{action:"onUploadClick",table:{disable:!0}},onLibraryClick:{action:"onLibraryClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}},numberOfLocations:{table:{disable:!0}},onMultiAssetClick:{table:{disable:!0}}};const a=e.bind({});a.argTypes={onUploadClick:{action:"onUploadClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}},numberOfLocations:{table:{disable:!0}},onMultiAssetClick:{table:{disable:!0}}};const n=e.bind({});n.argTypes={onLibraryClick:{action:"onLibraryClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}},numberOfLocations:{table:{disable:!0}},onMultiAssetClick:{table:{disable:!0}}};const i=e.bind({});i.args={assets:[d[0]],actions:p};const c=e.bind({});c.args={assets:[d[1]],size:u.Large,actions:p};const l=e.bind({});l.args={assets:[g[3]],actions:p};const m=e.bind({});m.args={assets:[g[2]],actions:p};const F={onUploadClick:{action:"onUploadClick",table:{disable:!0}},onLibraryClick:{action:"onLibraryClick",table:{disable:!0}},size:{table:{disable:!0}},isLoading:{table:{disable:!0}},hideSize:{table:{disable:!0}},hideExtension:{table:{disable:!0}}},t=e.bind({});t.args={assets:[d[0],...g.slice(2,4)],numberOfLocations:1};t.argTypes=F;const r=e.bind({});r.args={assets:d,numberOfLocations:2};r.argTypes=F;var b,f,k;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
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
}`,...(k=(f=o.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var I,C,L;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
}`,...(L=(C=a.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var A,y,S;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
}`,...(w=(q=r.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};const Qs=["Placeholder","PlaceholderUploadOnly","PlaceholderLibraryOnly","Image","ImageLibraryLarge","Audio","Icon","MixedAssets","ImageAssets"];export{l as Audio,m as Icon,i as Image,r as ImageAssets,c as ImageLibraryLarge,t as MixedAssets,o as Placeholder,n as PlaceholderLibraryOnly,a as PlaceholderUploadOnly,Qs as __namedExportsOrder,Ns as default};
