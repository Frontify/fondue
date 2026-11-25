---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): set the gap between a list marker and its item text with `gap` in a bullet or numbered list level's look. A string marker such as `'•'` gets no room of its own, so set `gap` to keep it off the text. With `gap` set, leave the trailing space out of the string: the space adds to the gap. Left out, the look does not change in left-to-right text. In right-to-left text a list's indent now sits on the right, the side its markers hang on, where it used to sit on the left.
