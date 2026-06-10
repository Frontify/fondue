---
"@frontify/fondue-components": patch
---

fix(Card): keep the border in place on hover, show the banner border over images, and make the small banner square its images

Hovering a card no longer shifts the border outward by a pixel — it stays in the banner's position and simply extends down around the rest of the card. The banner border is now visible whether or not the banner has an image. The small banner uses a 3:1 aspect ratio so that a banner split into three images shows each one as a square.
