import{j as k}from"./jsx-runtime-Nms4Y4qS.js";import{r as n}from"./index-BwDkhjyp.js";import{C as y}from"./colors-cqDZVL9s.js";import{C as F,E as g}from"./example-palettes-BGTbamix.js";import"./_commonjsHelpers-BosuxZz1.js";import"./SegmentedControls-D3WaRgzO.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./useFocusable-CAGu0lKI.js";import"./chain-D5h1pgIF.js";import"./useFormValidationState-Vs0Uifwm.js";import"./FocusScope-DYM0gkGr.js";import"./useField-BhCfq6jD.js";import"./useLabels-DH9bA-v0.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-YFPGrsWM.js";import"./useControlledState-C0C-dzuH.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./motion-C48bHxkn.js";import"./TextInput-CTUXZk8A.js";import"./LoadingCircle-CZrma5le.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconSize-BcCrF_mi.js";import"./IconEyeOff-Dzh4tjis.js";import"./IconCross-Bt-I3opn.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./validation-C9S5KgfE.js";import"./LegacyTooltip-DXE5SqpV.js";import"./useLink-DorAuuFQ.js";import"./usePopper-DPXU-o95.js";import"./index-DxjWwZXO.js";import"./index-CfyPTyT-.js";import"./Button-CYWlMQhW.js";import"./useButton-DofEV6SJ.js";import"./Portal-0C9N3MSP.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./IconStackVertical-T6496SrD.js";import"./IconMagnifier-TFwQHjUi.js";import"./IconMagnifier16-Cf1Zb6X7.js";import"./index-YYnwjzoa.js";import"./Dropdown-BzoVEXLv.js";import"./useOverlayTriggerState-Bq4IkdK0.js";import"./useMenuTrigger-tJGR04eL.js";import"./useLocalizedStringFormatter-D7Kogc_3.js";import"./helper-Cw1sh7G0.js";import"./isScrollable-Bts8_1NI.js";import"./SelectionManager-BuW52QpN.js";import"./MenuItem-C9PA6k_H.js";import"./IconCaretRight-CxmZKZHS.js";import"./elements-BOYmskOL.js";import"./Trigger-BkAUJNF7.js";import"./IconCaretDown-Cxrx1sF_.js";import"./IconCaretDown16-BGp5IVAI.js";import"./IconTrashBin-Bl46mt1V.js";import"./IconTrashBin16-qlTE457i.js";import"./IconTrashBin24-CvdAkIgz.js";import"./EnablePortalWrapper-DvpkRq0I.js";const hr={title:"Components/Color Picker",component:F,tags:["autodocs"],args:{currentColor:{red:85,green:102,blue:255}},argTypes:{onSelect:{action:"Select Color"}}},s=e=>{const[x,E]=n.useState(e.currentColor),[P,f]=n.useState(y.Hex);return k.jsx(F,{...e,currentColor:x,currentFormat:P,setFormat:f,onSelect:m=>{e.onSelect(m),E(m)}})},t=s.bind({}),r=s.bind({});r.args={palettes:g,allowCustomColor:!1};const o=s.bind({});o.args={palettes:g};var a,c,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  const [selectedColor, setSelectedColor] = useState(args.currentColor);
  const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);
  return <ColorPicker {...args} currentColor={selectedColor} currentFormat={currentFormat} setFormat={setCurrentFormat} onSelect={color => {
    args.onSelect(color);
    setSelectedColor(color);
  }} />;
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,i,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const [selectedColor, setSelectedColor] = useState(args.currentColor);
  const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);
  return <ColorPicker {...args} currentColor={selectedColor} currentFormat={currentFormat} setFormat={setCurrentFormat} onSelect={color => {
    args.onSelect(color);
    setSelectedColor(color);
  }} />;
}`,...(u=(i=r.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var C,d,S;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const [selectedColor, setSelectedColor] = useState(args.currentColor);
  const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);
  return <ColorPicker {...args} currentColor={selectedColor} currentFormat={currentFormat} setFormat={setCurrentFormat} onSelect={color => {
    args.onSelect(color);
    setSelectedColor(color);
  }} />;
}`,...(S=(d=o.parameters)==null?void 0:d.docs)==null?void 0:S.source}}};const Ar=["OnlyCustomColor","OnlyBrandColor","WithBrandColors"];export{r as OnlyBrandColor,t as OnlyCustomColor,o as WithBrandColors,Ar as __namedExportsOrder,hr as default};