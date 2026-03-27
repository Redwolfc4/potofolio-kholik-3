# Unused Code Audit

Audit ini sengaja konservatif. Saya hanya mencatat item yang bisa dibuktikan dari referensi di `src`.

## Likely Unused

1. [src/components/query-provider.tsx](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L1)
Alasan:
File ini hanya membuat `QueryClientProvider` di baris 4-12, tetapi pencarian di `src` tidak menemukan consumer React Query lain seperti `useQuery`, `useMutation`, `useInfiniteQuery`, atau hook lain dari `@tanstack/react-query`.

Baris terkait:
- [src/components/query-provider.tsx:4](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L4) import `QueryClient, QueryClientProvider`
- [src/components/query-provider.tsx:6](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L6) deklarasi `QueryProvider`
- [src/components/query-provider.tsx:7](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L7) inisialisasi `QueryClient`
- [src/components/query-provider.tsx:10](D:/github/potofolio-kholik-3/src/components/query-provider.tsx#L10) pemakaian `QueryClientProvider`

Pemanggilan wrapper yang tampak tidak punya consumer:
- [src/app/[lang]/layout.tsx:5](D:/github/potofolio-kholik-3/src/app/[lang]/layout.tsx#L5) import `QueryProvider`
- [src/app/[lang]/layout.tsx:80](D:/github/potofolio-kholik-3/src/app/[lang]/layout.tsx#L80) wrapper `<QueryProvider>`

Catatan:
Kalau memang ada rencana menambah React Query dalam waktu dekat, file ini belum salah, hanya belum dipakai secara nyata saat ini.

## Audit Limits

- Saya mencoba menjalankan pengecekan tambahan (`pnpm lint` dan `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`), tetapi environment lokal mengembalikan error `EPERM` pada path `C:\\Users\\Salah`, jadi saya tidak memasukkan temuan yang belum bisa dibuktikan langsung dari referensi kode.
