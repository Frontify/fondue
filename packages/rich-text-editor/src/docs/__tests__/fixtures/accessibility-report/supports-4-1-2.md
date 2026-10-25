# Accessibility report fixture

## Tested configuration

Version 1.0.0 in the Document profile, in Chromium, Firefox and WebKit. No screen reader, real device or person took part.

## WCAG 2.2 criteria

| Criterion                               | Conformance level | Remarks and explanations                                                                                                |
| --------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1.3.1 Info and Relationships (Level A)  | Not Evaluated     | Evidence: `src/features/__tests__/markElements.spec.tsx`, `src/reader/__tests__/reader.spec.ts`. No screen reader ran. |
| 1.3.5 Identify Input Purpose (Level AA) | Not Applicable    | No field collects information about the author.                                                                         |
| 1.4.5 Images of Text (Level AA)         | Not Evaluated     | Chrome icons and text are not tested. Evidence: no automated test.                                                      |
| 1.4.4 Resize Text (Level AA)            | Supports          | Evidence: `src/react/__tests__/textSize.ct.tsx`.                                                                       |
| 2.4.11 Focus Not Obscured (Level AA)    | Not Evaluated     | Evidence: `src/react/__tests__/overlaysTouch.ct.tsx`. No device ran.                                                   |
| 4.1.2 Name, Role, Value (Level A)       | Supports          | Evidence: `src/react/__tests__/axe.ct.tsx`, `src/react/__tests__/profiles.ct.tsx`. No screen reader ran.                |
| 4.1.3 Status Messages (Level AA)        | Does Not Support  | Evidence: `src/react/__tests__/liveRegion.spec.tsx`. Its test failed.                                                  |

## AAA targets

| Criterion                           | Conformance level | Remarks and explanations                        |
| ----------------------------------- | ----------------- | ----------------------------------------------- |
| 2.4.13 Focus Appearance (Level AAA) | Supports          | Evidence: `src/react/__tests__/toolbar.ct.tsx`. |

## ATAG 2.0 annex

| Criterion                                             | Conformance level | Remarks and explanations                                                         |
| ----------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------- |
| A.2.2.2 Access to Rendered Text Properties (Level AA) | Not Evaluated     | Evidence: `src/features/__tests__/markElements.spec.tsx`. No screen reader ran. |

## Limitations and host-owned criteria

The host page owns 2.4.2 Page Titled.

## Editing and published output

The editing surface is a `textbox`; the reader output is not.

## Product targets beyond AA

| Criterion                                | Conformance level | Remarks and explanations                              |
| ---------------------------------------- | ----------------- | ----------------------------------------------------- |
| 2.5.5 Target Size (Enhanced) (Level AAA) | Supports          | Evidence: `src/react/__tests__/toolbarTouch.ct.tsx`. |
