const sharp = require('sharp');
sharp('public/imgPortofolio/pwa-icon512.png').resize(192, 192).toFile('public/imgPortofolio/pwa-icon192.png').then(() => console.log('192 created'));
sharp('public/imgPortofolio/pwa-icon512.png').resize(152, 152).toFile('public/imgPortofolio/pwa-icon152.png').then(() => console.log('152 created'));
