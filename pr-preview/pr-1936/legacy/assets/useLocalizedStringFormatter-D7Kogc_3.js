import{$}from"./context-C2PaECDE.js";import{r as b}from"./index-BwDkhjyp.js";const g=Symbol.for("react-aria.i18n.locale"),h=Symbol.for("react-aria.i18n.strings");let i;class c{getStringForLocale(e,t){let n=this.getStringsForLocale(t)[e];if(!n)throw new Error(`Could not find intl message ${e} in ${t} locale`);return n}getStringsForLocale(e){let t=this.strings[e];return t||(t=p(e,this.strings,this.defaultLocale),this.strings[e]=t),t}static getGlobalDictionaryForPackage(e){if(typeof window>"u")return null;let t=window[g];if(i===void 0){let n=window[h];if(!n)return null;i={};for(let o in n)i[o]=new c({[t]:n[o]},t)}let r=i==null?void 0:i[e];if(!r)throw new Error(`Strings for package "${e}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);return r}constructor(e,t="en-US"){this.strings=Object.fromEntries(Object.entries(e).filter(([,r])=>r)),this.defaultLocale=t}}function p(a,e,t="en-US"){if(e[a])return e[a];let r=w(a);if(e[r])return e[r];for(let n in e)if(n.startsWith(r+"-"))return e[n];return e[t]}function w(a){return Intl.Locale?new Intl.Locale(a).language:a.split("-")[0]}const s=new Map,f=new Map;class m{format(e,t){let r=this.strings.getStringForLocale(e,this.locale);return typeof r=="function"?r(t,this):r}plural(e,t,r="cardinal"){let n=t["="+e];if(n)return typeof n=="function"?n():n;let o=this.locale+":"+r,l=s.get(o);l||(l=new Intl.PluralRules(this.locale,{type:r}),s.set(o,l));let d=l.select(e);return n=t[d]||t.other,typeof n=="function"?n():n}number(e){let t=f.get(this.locale);return t||(t=new Intl.NumberFormat(this.locale),f.set(this.locale,t)),t.format(e)}select(e,t){let r=e[t]||e.other;return typeof r=="function"?r():r}constructor(e,t){this.locale=e,this.strings=t}}const u=new WeakMap;function y(a){let e=u.get(a);return e||(e=new c(a),u.set(a,e)),e}function S(a,e){return e&&c.getGlobalDictionaryForPackage(e)||y(a)}function F(a,e){let{locale:t}=$(),r=S(a,e);return b.useMemo(()=>new m(t,r),[t,r])}export{F as $};