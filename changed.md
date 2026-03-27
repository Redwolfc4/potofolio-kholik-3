# Candidate Changes For TanStack Query, Zod, and Zustand

Dokumen ini bukan daftar file "wajib diubah semua", tetapi daftar file yang paling relevan bila proyek ini ingin memakai `@tanstack/react-query`, `zod`, dan `zustand` secara konsisten untuk data fetching, validasi, dan state client.

## TanStack Query

1. [src/components/query-provider.tsx](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L1)
Status saat ini:
Provider React Query sudah ada.

Alasan perlu dipertahankan/dipakai:
- [src/components/query-provider.tsx:4](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L4) sudah import `QueryClient` dan `QueryClientProvider`
- [src/components/query-provider.tsx:10](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L10) sudah membungkus children dengan provider

Potensi perubahan:
- Tambahkan konfigurasi default `queries` dan `mutations` seperti retry, staleTime, dan refetch behavior agar provider ini benar-benar berguna saat API dipakai lebih banyak.

2. [src/app/[lang]/layout.tsx](D:/github/potofolio-kholik-3/src/app/[lang]/layout.tsx#L5)
Status saat ini:
Sudah memasang wrapper `QueryProvider`.

Baris terkait:
- [src/app/[lang]/layout.tsx:5](D:/github/potofolio-kholik-3/src/app/[lang]/layout.tsx#L5) import `QueryProvider`
- [src/app/[lang]/layout.tsx:80](D:/github/potofolio-kholik-3/src/app/[lang]/layout.tsx#L80) pemakaian `<QueryProvider>`

Potensi perubahan:
- Tidak wajib diubah kalau provider cukup.
- Perlu dicek lagi hanya jika nanti ingin menambah Devtools, hydration, atau server prefetch.

3. [src/components/contact/contact-form.tsx](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L1)
Status saat ini:
Submit form masih memakai pemanggilan async manual ke service.

Baris terkait:
- [src/components/contact/contact-form.tsx:49](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L49) `onSubmit`
- [src/components/contact/contact-form.tsx:52](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L52) `emailService.sendEmail(data)`

Potensi perubahan:
- Ubah submit ke `useMutation` supaya status loading, success, error, retry, dan invalidation mengikuti pola TanStack Query.
- Ini kandidat paling jelas untuk mulai memakai TanStack Query karena sudah ada interaksi API nyata.

4. [src/services/email.service.ts](D:/github/potofolio-kholik-3/src/services/email.service.ts#L1)
Status saat ini:
Masih berupa wrapper fetch manual.

Baris terkait:
- [src/services/email.service.ts:12](D:/github/potofolio-kholik-3/src/services/email.service.ts#L12) deklarasi `emailService`
- [src/services/email.service.ts:19](D:/github/potofolio-kholik-3/src/services/email.service.ts#L19) request `fetch("/api/contact", ...)`

Potensi perubahan:
- Tetap dipakai sebagai fetcher untuk `useMutation`.
- Bisa dipisah menjadi fungsi `sendContactEmail` biasa agar lebih natural dipakai oleh TanStack Query.

## Zod

1. [src/components/contact/contact-form.tsx](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L12)
Status saat ini:
Sudah memakai Zod di client untuk validasi form.

Baris terkait:
- [src/components/contact/contact-form.tsx:12](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L12) `contactSchema`
- [src/components/contact/contact-form.tsx:41](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L41) `zodResolver(contactSchema)`

Potensi perubahan:
- Skema sebaiknya dipindah ke file shared seperti `src/lib/validators/contact.ts` atau `src/types/contact.ts` agar client dan server memakai aturan yang sama.

2. [src/app/api/contact/route.ts](D:/github/potofolio-kholik-3/src/app/api/contact/route.ts#L1)
Status saat ini:
Server baru memeriksa field secara manual dengan `if (!name || !email || !subject || !message)`.

Baris terkait:
- [src/app/api/contact/route.ts:35](D:/github/potofolio-kholik-3/src/app/api/contact/route.ts#L35) `const data = await req.json();`
- [src/app/api/contact/route.ts:39](D:/github/potofolio-kholik-3/src/app/api/contact/route.ts#L39) validasi manual missing fields

Potensi perubahan:
- Ganti validasi manual dengan `contactSchema.safeParse(data)`.
- Ini penting supaya validasi server setara dengan client, termasuk trim, panjang minimum, dan format email.

3. [src/services/email.service.ts](D:/github/potofolio-kholik-3/src/services/email.service.ts#L1)
Status saat ini:
Response API ditulis sebagai type biasa.

Potensi perubahan:
- Jika ingin lebih ketat, bentuk response API juga bisa divalidasi dengan Zod sebelum dipakai UI.
- Berguna jika nanti API bertambah dan ingin menangani response/error shape secara konsisten.

## Zustand

1. [src/stores/use-longpress-store.ts](D:/github/potofolio-kholik-3/src/stores/use-longpress-store.ts#L1)
Status saat ini:
Zustand sudah dipakai untuk state interaksi long press.

Baris terkait:
- [src/stores/use-longpress-store.ts:1](D:/github/potofolio-kholik-3/src/stores/use-longpress-store.ts#L1) import `create`
- [src/stores/use-longpress-store.ts:10](D:/github/potofolio-kholik-3/src/stores/use-longpress-store.ts#L10) store dibuat

Potensi perubahan:
- Tidak perlu diganti bila kebutuhan state tetap kecil.
- Bisa ditingkatkan dengan selector granular bila nanti rerender terasa berat.

2. [src/components/contact/contact-form.tsx](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L33)
Status saat ini:
State submit masih lokal dengan `useState`.

Baris terkait:
- [src/components/contact/contact-form.tsx:33](D:/github/potofolio-kholik-3/src/components/contact/contact-form.tsx#L33) `const [status, setStatus] = useState(...)`

Potensi perubahan:
- Tidak wajib pindah ke Zustand.
- Pindah ke Zustand hanya masuk akal kalau status form, toast, atau error message perlu dipakai lintas komponen.
- Untuk form tunggal seperti ini, local state masih lebih sederhana.

3. [src/components/projects/projects.tsx](D:/github/potofolio-kholik-3/src/components/projects/projects.tsx#L97)
Status saat ini:
State carousel masih lokal via Embla API + hook React.

Potensi perubahan:
- Tidak perlu Zustand saat ini.
- Baru layak dipertimbangkan bila status carousel aktif, filter project, atau modal detail project perlu dibagikan ke banyak komponen.

## Suggested Priority

1. Terapkan Zod di server contact route agar validasi client dan server sinkron.
2. Ubah submit contact form ke TanStack Query `useMutation`.
3. Pertahankan `QueryProvider` karena memang dibutuhkan untuk langkah nomor 2.
4. Biarkan Zustand tetap fokus ke shared UI state, jangan dipaksa untuk state lokal yang sederhana.
