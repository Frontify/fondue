---
"@frontify/fondue-components": minor
---

feat(Card): update the card to the new design. The card now has 8px inner padding and 12px corners, so the banner, thumbnail and actions line up on the same edge. The banner is 16:9, always keeps its rounded corners and stays dim on hover. The thumbnail is 36px and the title uses the small text size. A selected card has the active surface and a 2px border inside it. The banner description, checkbox and badges follow the new spacing. The card's minimum width drops from 240px to 144px; set column widths in the layout that holds the cards. Banner icons are now 48px and thumbnail icons 20px. `Card.BannerIcon` and `Card.ThumbnailIcon` take a new `customColor` prop (any CSS color value or token) to paint the icon in a custom color, such as a folder color.
