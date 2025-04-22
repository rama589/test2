// وظائف مشتركة بين جميع الصفحات

// حفظ بيانات الجلسة
const session = {
    currentUser: null,
    cart: []
};

// نقل البيانات بين الصفحات
function navigateTo(page) {
    // يمكن إضافة حفظ بيانات قبل الانتقال
    window.location.href = page;
}

// تحميل البيانات المشتركة
function loadSharedData() {
    // يمكن تحميل البيانات من localStorage أو من ملفات خارجية
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(window.sharedProducts || []));
    }
}

// تهيئة الصفحة عند التحميل
window.addEventListener('DOMContentLoaded', () => {
    loadSharedData();

    // إضافة حدث للروابط المشتركة
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        });
    });
});