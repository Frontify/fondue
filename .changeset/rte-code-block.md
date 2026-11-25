---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): add `codeBlockPlugin`, a code block that keeps its text as written, with an optional language, written as HTML `<pre><code class="language-ts">` and as a Markdown fence. It is not in `defaultPlugins`: add it to `plugins` to edit or read code blocks.
