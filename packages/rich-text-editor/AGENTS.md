# AGENTS.md

Context for AI agents that change the rich text editor. Read [`README.md`](./README.md) first: it explains content and plugins and where each layer lives. The repo rules in [`../../AGENTS.md`](../../AGENTS.md) also apply.

`CLAUDE.md` and `GEMINI.md` are links to this file. Edit `AGENTS.md` only.

## Rules

1. **Keep feature logic inside its plugin.** Add a core or engine API only when a second plugin needs it. First try the API that exists.
2. **Import the engine only through its barrel.** Only `editor/parseHtml.ts` and `editor/hooks/useEditorHandle.ts` load the engine, and both import `#/editor/engines/prosemirror`, never a file inside it. `oxlint.config.ts` enforces the layer rules; do not add exceptions.
3. **Read stored values once, where they enter.** A value from stored HTML or from the host is untrusted. Read it once with a helper that turns an unknown value into a known one. For example, `storedKind` reads an unknown mention kind as none, and the mention then shows as a person.
4. **Make typing rules leave technical text alone.** A delimiter rule that can occur inside a word sets `wordBounded`. Test each rule on `__init__`, `self.__dict__` and file paths.
5. **Do not copy the old editor's accidents.** Behaviour that came from a framework default in the old editor is not a requirement.
6. **Take every built-in string from `src/locales/`.** There is one file per language and one source per string; add no string option or `labels` prop. A shipped plugin labels with `translatedLabel(key)` and its UI reads `useTranslate()`. A surface outside the editor's language, such as the keyboard reference, resolves labels in English and never shows a key. Text stored in the document stays English. `src/plugins/labels.spec.ts` checks the shipped labels; extend it for a new kind of label.
7. **Quote code in docs pages only through excerpts.** A guide shows code with `excerptOf` from a real story or plugin file (see `src/docs/authoringExcerpts.ts`), never a hand-written snippet. A docs page gets no spec of its own.
8. **Read the guide again after an API change.** A moved excerpt anchor fails when the page loads, but a stale sentence does not. After a change to names or shapes, or a rebase onto one, check every excerpt anchor and every claim in `src/docs/`.

## Glossary

**Content**:
What `defineContent(...)` returns: the blocks, marks and inlines a document can hold, and how each one is written as HTML and read back. The renderer needs only content.
_Avoid_: schema

**Plugin**:
A function that returns `definePlugin(...)`: the editing parts on top of a content, such as toolbar buttons, keys and typing rules. Every plugin is called, `boldPlugin()`, and takes its options there.
_Avoid_: passing a plugin without calling it

**Look**:
The one option that sets how a plugin's output looks, such as `textStylePlugin({ look })` with a `TextStyleLook`. Pass the same `look` to the editor's plugin and the renderer's content.
_Avoid_: looks, buttonLooks, variant

**Translated label**:
What `translatedLabel(key)` returns: a shipped plugin's label as a function that the editor calls with its translator each time it draws, so the label follows a change of language. A host's plugin passes its own text or `({ lang }) => …` instead.
_Avoid_: locale label, a label that is sometimes a key and sometimes text

**Engine barrel**:
`#/editor/engines/prosemirror`, the only path through which the shell reaches the editing engine. Only the files under `editor/engines/prosemirror/` know ProseMirror.
