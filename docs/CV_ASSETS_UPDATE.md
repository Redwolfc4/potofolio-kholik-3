# CV Assets Update

## Scope

Pembaruan ini hanya mengganti salinan aset CV pada website portofolio Kholik dan menambahkan preview halaman pertama untuk menu CV. File sumber tidak dipindahkan, dihapus, atau diubah. Tidak ada deployment, commit, atau push otomatis.

## Source Files

| Language | Variant | Source | Format | Size | SHA-256 |
| --- | --- | --- | ---: | ---: | --- |
| Indonesia | Plain | `/run/media/salahudin/New Volume1/punya kholik/cv/tanpa gambar/2026/indonesia/salahudin-kholik-prasetyono-cv-id-2.pdf` | PDF, 2 pages | 129,324 bytes | `89c499dea7674f004c2964ff646d2b3974f5bb6484e3cf7945d4b5bd1e4dbb17` |
| Indonesia | Image | `/run/media/salahudin/New Volume1/punya kholik/cv/dengan gambar/2026/indonesia/salahudin-kholik-prasetyono-cv.pdf` | PDF, 2 pages | 179,777 bytes | `3c2e2d4255b5f1a3f4c7a8d2ef629db201a9b455023b889206b7b33fbb4e35eb` |
| English | Plain | `/run/media/salahudin/New Volume1/punya kholik/cv/tanpa gambar/2026/inggris/salahudin-kholik-prasetyono-cv-en-2.pdf` | PDF, 2 pages | 170,395 bytes | `3e0b58f21aa3f28a37485f988d8e428ee301cc910271da8dddad3c44d18e3d87` |
| English | Image | `/run/media/salahudin/New Volume1/punya kholik/cv/dengan gambar/2026/inggris/salahudin-kholik-prasetyono-cv-en-3.pdf` | PDF, 2 pages | 213,467 bytes | `06eebf9139d7ac89391bb5bae5709a87d517a3a89a82d14180419b20e0320a54` |

## Updated Assets

| Language | Variant | Public target | SHA-256 | Copy status |
| --- | --- | --- | --- | --- |
| Indonesia | Plain | `/public/docs/portofolio/indonesia/salahudin-kholik-prasetyono-cv_id_1.pdf` | `89c499dea7674f004c2964ff646d2b3974f5bb6484e3cf7945d4b5bd1e4dbb17` | PASS; byte-identical to source |
| Indonesia | Image | `/public/docs/portofolio/indonesia/salahudin-kholik-prasetyono-cvgambar_id_1.pdf` | `3c2e2d4255b5f1a3f4c7a8d2ef629db201a9b455023b889206b7b33fbb4e35eb` | PASS; byte-identical to source |
| English | Plain | `/public/docs/portofolio/inggris/salahudin-kholik-prasetyono-cv_en_1.pdf` | `3e0b58f21aa3f28a37485f988d8e428ee301cc910271da8dddad3c44d18e3d87` | PASS; byte-identical to source |
| English | Image | `/public/docs/portofolio/inggris/salahudin-kholik-prasetyono-cvgambar_en_1.pdf` | `06eebf9139d7ac89391bb5bae5709a87d517a3a89a82d14180419b20e0320a54` | PASS; byte-identical to source |

## Preview Assets

Generated from page 1 of the matching image/plain PDF using `pdftoppm` at 144 DPI. Preview URLs are public framework assets; no filesystem paths are used by the browser.

- `/docs/portofolio/preview/cv-id-image.png`
- `/docs/portofolio/preview/cv-id-plain.png`
- `/docs/portofolio/preview/cv-en-image.png`
- `/docs/portofolio/preview/cv-en-plain.png`

## Website Integration

Updated component and data contracts:

- `src/components/hero/hero.tsx`
- `src/types/i18n/common.ts`
- `src/data/id/common.json`
- `src/data/en/common.json`

The existing CV menu layout and animation behavior are preserved. Each language/variant now shows a matching preview and provides:

- **View PDF**: opens the public PDF URL in a new tab without changing the file.
- **Download PDF**: uses the same public PDF URL with the native `download` attribute.

Public PDF URLs:

- Indonesian plain: `/docs/portofolio/indonesia/salahudin-kholik-prasetyono-cv_id_1.pdf`
- Indonesian image: `/docs/portofolio/indonesia/salahudin-kholik-prasetyono-cvgambar_id_1.pdf`
- English plain: `/docs/portofolio/inggris/salahudin-kholik-prasetyono-cv_en_1.pdf`
- English image: `/docs/portofolio/inggris/salahudin-kholik-prasetyono-cvgambar_en_1.pdf`

## Validation

- Source/target SHA-256 comparison: PASS for all four PDF pairs.
- PDF header check: PASS for all four targets.
- PDF page count: PASS, two pages per target.
- Preview generation: PASS for all four matching PDFs.
- Public URL scheme: PASS; all browser URLs use `/docs/...` assets, not local filesystem paths.
- Fallback preview: PASS; uses existing `/placeholders/education-fallback.svg`.
- Static HTTP smoke test from the Next.js `public/` asset root: PASS; all 4 PDF URLs returned `200` with `application/pdf`, and all 4 preview URLs returned `200` with `image/png`.
- `git diff --check`: PASS after normalizing changed text files to repository LF line endings.
- `bun run lint`: PASS (ESLint passed with zero errors).
- `bunx tsc --noEmit`: PASS (TypeScript check passed with zero errors).
- `bun run build`: PASS (Next.js production build succeeded and generated `/en`, `/id`, `/sitemap.xml`, and `/api/contact`).
