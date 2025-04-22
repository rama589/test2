export function loadFonts() {
    const fonts = [
        {
            name: 'Tajawal',
            url: '../fonts/Tajawal-Regular.woff2',
            weight: 400
        },
        {
            name: 'Tajawal',
            url: '../fonts/Tajawal-Bold.woff2',
            weight: 700
        },
        {
            name: 'Almarai',
            url: '../fonts/Almarai-Regular.woff2',
            weight: 400
        }
    ];

    fonts.forEach(font => {
        const fontFace = new FontFace(
            font.name,
            `url(${font.url}) format('woff2')`,
            { weight: font.weight.toString() }
        );
        
        fontFace.load().then(() => {
            document.fonts.add(fontFace);
        }).catch(err => {
            console.error(`فشل تحميل الخط ${font.name}:`, err);
        });
    });
}