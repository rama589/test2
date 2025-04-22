// تطبيق إعدادات الوضع المظلم من المتجر
document.addEventListener('DOMContentLoaded', function() {
    // استعادة إعدادات الوضع المظلم
    if(localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // إدارة موافقة ملفات الارتباط
    const cookieConsent = localStorage.getItem('cookieConsent');
    if(!cookieConsent) {
        showConsentBanner();
    }
});

function showConsentBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <p>نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. 
        <a href="legal/cookie-policy.html">تعرف أكثر</a></p>
        <button class="btn-primary" id="acceptCookies">قبول</button>
    `;
    document.body.appendChild(banner);
    
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        banner.style.display = 'none';
    });
}