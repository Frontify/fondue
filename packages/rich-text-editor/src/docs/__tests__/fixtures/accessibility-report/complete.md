# Accessibility report fixture

## Tested configuration

Version 1.0.0 in the Document profile, in Chromium, Firefox and WebKit. No screen reader, real device or person took part.

## WCAG 2.2 criteria

| Criterion                                 | Conformance level | Remarks and explanations                                                   |
| ----------------------------------------- | ----------------- | -------------------------------------------------------------------------- |
| 1.3.1 Info and Relationships (Level A)    | Not Evaluated     | Automated tests: AC-003, output/AC-003. No screen reader ran.              |
| 1.3.5 Identify Input Purpose (Level AA)   | Not Applicable    | No field collects information about the author.                            |
| 1.4.4 Resize Text (Level AA)              | Supports          | Automated tests: AC-009.                                                   |
| 2.4.11 Focus Not Obscured (Level AA)      | Not Evaluated     | Automated tests: AC-024. No device ran.                                    |
| 4.1.2 Name, Role, Value (Level A)         | Not Evaluated     | Automated tests: AC-036, react/AC-027. No screen reader ran.               |
| 4.1.3 Status Messages (Level AA)          | Does Not Support  | Automated tests: AC-037. Its test failed.                                  |

## AAA targets

| Criterion                                 | Conformance level | Remarks and explanations                                                   |
| ----------------------------------------- | ----------------- | -------------------------------------------------------------------------- |
| 2.4.13 Focus Appearance (Level AAA)       | Supports          | Automated tests: AC-023.                                                   |

## ATAG 2.0 annex

| Criterion                                              | Conformance level | Remarks and explanations                                      |
| ------------------------------------------------------ | ----------------- | ------------------------------------------------------------- |
| A.2.2.2 Access to Rendered Text Properties (Level AA)  | Not Evaluated     | Automated tests: AC-003. No screen reader ran.                |

## Limitations and host-owned criteria

The host page owns 2.4.2 Page Titled.

## Editing and published output

The editing surface is a `textbox`; the reader output is not.

## Product targets beyond AA

| Criterion                                 | Conformance level | Remarks and explanations                                                   |
| ----------------------------------------- | ----------------- | -------------------------------------------------------------------------- |
| Coarse pointer targets of 44 by 44 px     | Supports          | Automated tests: react/AC-041.                                             |
