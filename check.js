const urls = [
  'https://lincah.id/wp-content/uploads/2023/12/logo-lincah-2.png',
  'https://haltev.id/wp-content/uploads/2023/07/logo-haltev-1.png',
  'https://winnicode.com/wp-content/uploads/2021/04/Logo-Winnicode-1.png',
  'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=200&auto=format&fit=crop' // Placeholder for S-TechX
];

Promise.all(urls.map(u => fetch(u, { method: 'HEAD' }).then(r => console.log(u, r.status)).catch(e => console.error(u, e.message))));
