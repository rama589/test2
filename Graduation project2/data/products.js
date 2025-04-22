// بيانات المنتجات المشتركة بين الصفحات
const products = [
    {
        id: 1,
        name: "لابتوب جيمنج",
        price: 999,
        description: "لابتوب قوي للألعاب والتطبيقات الثقيلة",
        image: "placeholder-laptop.jpg"
    },
    {
        id: 2,
        name: "هاتف ذكي",
        price: 699,
        description: "أحدث طراز من الهواتف الذكية",
        image: "placeholder-phone.jpg"
    }
];

// تصدير البيانات للاستخدام في الصفحات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products; // لاستخدامها مع Node.js إذا لزم الأمر
} else {
    window.sharedProducts = products; // للاستخدام في المتصفح
}