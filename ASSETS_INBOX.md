# Assets inbox

These files were provided via Telegram and are currently stored in the OpenClaw inbound media folder. Copy them into this repo under `public/assets/` (or a similar stable path) before wiring them into the UI.

## Provided files (current locations)
- Band photo (group shot):
  - `C:\Users\allan\.openclaw\media\inbound\file_1---beed0777-4165-4ab6-8601-0645304a15ff.jpg`
- Artwork (skull/rose “thorns”):
  - `C:\Users\allan\.openclaw\media\inbound\file_2---3573c4db-a952-4655-af7d-5aa1dc93c187.jpg`
- Texture / grain background:
  - `C:\Users\allan\.openclaw\media\inbound\file_3---f4a53d92-75aa-46c6-92bc-2b9bd13d6211.jpg`
- Wordmark / logo (KINTSUGI):
  - `C:\Users\allan\.openclaw\media\inbound\file_4---aae2a9f6-4c74-4698-9c30-2975812ad48c.jpg`
- Artwork (lighthouse “fading echoes”):
  - `C:\Users\allan\.openclaw\media\inbound\file_5---889b3b2b-8d7f-4240-b5c2-6149fba30bb8.jpg`

## Suggested destinations in-repo
Create these files (same content) under:
- `public/assets/hero.jpg` (band photo for hero)
- `public/assets/merch-thorns.jpg` (thorns artwork)
- `public/assets/texture.jpg` (grain/texture overlay)
- `public/assets/wordmark.jpg` (wordmark/logo if needed)
- `public/assets/epk-fading-echoes.jpg` (lighthouse artwork)

## Usage guidance
- Prefer `next/image` for performance.
- Hero: full-bleed band photo + dark overlay; optionally add `texture.jpg` as an additional low-opacity overlay.
- Keep red as accent-only; do not tint whole sections red.
