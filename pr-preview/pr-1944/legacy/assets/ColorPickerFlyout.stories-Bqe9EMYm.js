import{j as y}from"./jsx-runtime-Nms4Y4qS.js";import{r as p}from"./index-BwDkhjyp.js";import{E as S}from"./example-palettes-hCQx1LE8.js";import{C as n}from"./ColorPickerFlyout-CgSsGjIO.js";import"./_commonjsHelpers-BosuxZz1.js";import"./SegmentedControls-D3WaRgzO.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./useFocusable-CAGu0lKI.js";import"./chain-D5h1pgIF.js";import"./useFormValidationState-Vs0Uifwm.js";import"./FocusScope-DYM0gkGr.js";import"./useField-BhCfq6jD.js";import"./useLabels-DH9bA-v0.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-YFPGrsWM.js";import"./useControlledState-C0C-dzuH.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./motion-C48bHxkn.js";import"./colors-cqDZVL9s.js";import"./TextInput-D2gdfhfK.js";import"./LoadingCircle-CZrma5le.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconSize-BcCrF_mi.js";import"./IconEyeOff-Dzh4tjis.js";import"./IconCross-Bt-I3opn.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./validation-C9S5KgfE.js";import"./LegacyTooltip-BsRDxGT9.js";import"./useLink-DorAuuFQ.js";import"./usePopper-D9CaHHBx.js";import"./index-B8XB3FuZ.js";import"./index-CfyPTyT-.js";import"./Button-CYWlMQhW.js";import"./useButton-DofEV6SJ.js";import"./Portal-dPA1dSZg.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./IconStackVertical-T6496SrD.js";import"./IconMagnifier-TFwQHjUi.js";import"./IconMagnifier16-Cf1Zb6X7.js";import"./index-YYnwjzoa.js";import"./Dropdown-CTG8V9Ey.js";import"./useOverlayTriggerState-Bq4IkdK0.js";import"./useMenuTrigger-BhJE1x_4.js";import"./useLocalizedStringFormatter-D7Kogc_3.js";import"./helper-DdpWMU6g.js";import"./isScrollable-Bts8_1NI.js";import"./SelectionManager-BuW52QpN.js";import"./MenuItem-C9PA6k_H.js";import"./IconCaretRight-CxmZKZHS.js";import"./elements-BOYmskOL.js";import"./Trigger-BkAUJNF7.js";import"./IconCaretDown-Cxrx1sF_.js";import"./IconCaretDown16-BGp5IVAI.js";import"./IconTrashBin-Bl46mt1V.js";import"./IconTrashBin16-qlTE457i.js";import"./IconTrashBin24-CvdAkIgz.js";import"./EnablePortalWrapper-BTwPCJkS.js";import"./Flyout-Pce6wJR6.js";import"./index-Cs2EGVrg.js";import"./useDialog-CN--Sfvy.js";import"./Badge-D-eWKloI.js";import"./FieldsetHeader-BqhAIRg2.js";import"./Switch-tgKqV9Jh.js";import"./InputLabel-Cp7I5Zy5.js";import"./TooltipIcon-fOjL_ywJ.js";import"./IconQuestionMarkCircle-C_agVHg1.js";import"./IconMinus-Bw7tNJhm.js";import"./IconPlus-Dy9edG7f.js";import"./IconPlus16-DMEnDMzI.js";import"./getVerticalPositioning-Cog3xIxH.js";import"./IconDroplet-BSIUi8V_.js";const wo={title:"Components/Color Picker/Flyout",component:n,tags:["autodocs"],args:{disabled:!1,currentColor:null,clearable:!1},argTypes:{onDelete:{action:"onDelete"}}},o=({disabled:s,currentColor:a,clearable:c,onDelete:C})=>{const[t,r]=p.useState(null),[u,e]=p.useState(a);return y.jsx(n,{disabled:s,clearable:c,currentColor:t??u,onClick:()=>e(t),onClose:()=>r(null),onSelect:d=>r(d),palettes:S,onClear:()=>{r(null),e(null)},onDelete:C})};o.__docgenInfo={description:"",methods:[],displayName:"Flyout"};var m,l,i;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`({
  disabled,
  currentColor,
  clearable,
  onDelete
}) => {
  const [temporaryColor, setTemporaryColor] = useState<Color | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(currentColor);
  return <ColorPickerFlyoutComponent disabled={disabled} clearable={clearable} currentColor={temporaryColor ?? selectedColor} onClick={() => setSelectedColor(temporaryColor)} onClose={() => setTemporaryColor(null)} onSelect={color => setTemporaryColor(color)} palettes={EXAMPLE_PALETTES} onClear={() => {
    setTemporaryColor(null);
    setSelectedColor(null);
  }} onDelete={onDelete} />;
}`,...(i=(l=o.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const zo=["Flyout"];export{o as Flyout,zo as __namedExportsOrder,wo as default};