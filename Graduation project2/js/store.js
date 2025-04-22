// تهيئة المتجر
document.addEventListener('DOMContentLoaded', () => {
    initProductGrid();
    setupEventListeners();
    updateSecurityIndicator();
});

// عرض المنتجات
async function initProductGrid() {
    const productsContainer = document.getElementById('productsContainer');
    const response = await fetch('../data/products.json');
    const products = await response.json();
    
    productsContainer.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.1}s">
            ${product.vulnerable ? '<span class="product-badge">ثغرة أمنية</span>' : ''}
            <div class="product-image">
                <img src="../assets/products/${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> أضف للسلة
                    </button>
                    <button class="btn btn-outline" onclick="showProductDetails(${product.id})">
                        <i class="fas fa-info-circle"></i> التفاصيل
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// تفاعلات المتجر
function setupEventListeners() {
    // تغيير وضع العرض
    document.querySelectorAll('.view-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.view-option').forEach(btn => btn.classList.remove('active'));
            option.classList.add('active');
            
            const productsContainer = document.getElementById('productsContainer');
            productsContainer.className = option.dataset.view === 'grid' ? 
                'products-grid' : 'products-list';
        });
    });
    
    // البحث عن المنتجات
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.product-card').forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            card.style.display = title.includes(searchTerm) ? 'block' : 'none';
        });
    });
    
    // تبديل السمة
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// مؤشر الأمان الديناميكي
function updateSecurityIndicator() {
    const fill = document.querySelector('.progress-fill');
    const level = document.querySelector('.security-level');
    
    // محاكاة تغير مستوى الأمان
    let progress = 30;
    const interval = setInterval(() => {
        progress += Math.random() * 10 - 5;
        progress = Math.max(10, Math.min(90, progress));
        
        fill.style.width = `${progress}%`;
        
        if (progress < 30) {
            level.textContent = "ضعيف جداً";
            level.style.color = "var(--danger)";
            fill.style.background = "linear-gradient(90deg, #f72585, #7209b7)";
        } else if (progress < 60) {
            level.textContent = "ضعيف";
            level.style.color = "var(--warning)";
            fill.style.background = "linear-gradient(90deg, #ff9e00, #ff006e)";
        } else {
            level.textContent = "جيد";
            level.style.color = "var(--success)";
            fill.style.background = "linear-gradient(90deg, #4cc9f0, #4361ee)";
        }
    }, 3000);
    
    return () => clearInterval(interval);
}

// تبديل السمة الداكنة
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#themeToggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// تحميل السمة المحفوظة
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = document.querySelector('#themeToggle i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// تحميل الخطوط بشكل ديناميكي
function loadFonts() {
    const font = new FontFace('Tajawal', 'url(../fonts/Tajawal-Regular.woff2)');
    font.load().then(() => {
        document.fonts.add(font);
        console.log('تم تحميل الخط بنجاح');
    }).catch(err => {
        console.error('فشل تحميل الخط:', err);
    });
}

document.addEventListener('DOMContentLoaded', loadFonts);



document.addEventListener('DOMContentLoaded', function() {
    const viewOptions = document.querySelectorAll('.view-option');
    const productsContainer = document.getElementById('productsContainer');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            viewOptions.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            // تغيير طريقة العرض
            if (this.dataset.view === 'list') {
                productsContainer.classList.add('products-list');
            } else {
                productsContainer.classList.remove('products-list');
            }
        });
    });
});


const securityLevels = [
    { level: "ضعيف جداً", color: "#f72585", width: "10%" },
    { level: "ضعيف", color: "#b5179e", width: "30%" },
    { level: "متوسط", color: "#7209b7", width: "50%" },
    { level: "جيد", color: "#560bad", width: "70%" },
    { level: "ممتاز", color: "#480ca8", width: "90%" }
];

// محاكاة تحسين الأمان
function improveSecurity() {
    let currentLevel = 1; // البدء من مستوى "ضعيف"
    
    // تحديث كل 3 ثواني (يمكن تغييرها حسب الحاجة)
    const interval = setInterval(() => {
        if (currentLevel < securityLevels.length - 1) {
            currentLevel++;
            updateSecurityIndicator(currentLevel);
        } else {
            clearInterval(interval);
        }
    }, 3000);
}

function updateSecurityIndicator(levelIndex) {
    const level = securityLevels[levelIndex];
    const progressFill = document.getElementById('securityProgress');
    const levelText = document.getElementById('securityLevelText');
    
    progressFill.style.width = level.width;
    progressFill.style.background = level.color;
    levelText.textContent = level.level;
    levelText.style.color = level.color;
    
    // تغيير لون الحدود حسب المستوى
    document.querySelector('.security-indicator').style.borderLeftColor = level.color;
}

function showSecurityTips() {
    const tips = document.getElementById('securityTips');
    tips.classList.toggle('show');
}

// بدء المحاكاة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    // البدء بالمستوى الثاني (ضعيف)
    updateSecurityIndicator(1); 
    
    // بدء تحسين الأمان تلقائياً (يمكن تعطيله إذا أردت)
    setTimeout(improveSecurity, 2000);
});


document.addEventListener('DOMContentLoaded', function() {
    // تفعيل القائمة المنسدلة
    const userDropdown = document.querySelector('.user-dropdown');
    if(userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelector('.dropdown-menu').classList.toggle('show');
        });
    }
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.dropdown-menu');
        if(dropdown) dropdown.classList.remove('show');
    });
    
    // تأثير التمرير
    window.addEventListener('scroll', function() {
        if(window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });
    
    // تبديل الثيم
    const themeToggle = document.getElementById('themeToggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if(document.body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
    
    // القائمة الجوالية
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('mobile-show');
        });
    }
});

// نظام التنبيهات الأمنية
class SecurityAlertSystem {
    constructor() {
        this.alertsContainer = document.getElementById('securityAlertsContainer');
        this.activeAlerts = [];
        
        // محاكاة تنبيهات عند تحميل الصفحة (يمكن إزالتها في الإنتاج)
        this.simulateInitialAlerts();
        
        // الاستماع لأحداث الهجوم من أنظمة المحاكاة
        document.addEventListener('securityAttack', (e) => {
            this.showAlert(e.detail);
        });
    }
    
    showAlert(alertData) {
        const alertId = Date.now().toString();
        const alertLevel = alertData.level || 'danger';
        const isCritical = alertData.critical || false;
        
        const alertElement = document.createElement('div');
        alertElement.className = `security-alert ${alertLevel}`;
        alertElement.id = `alert-${alertId}`;
        if (isCritical) alertElement.classList.add('critical-alert');
        
        alertElement.innerHTML = `
            <div class="alert-icon">
                <i class="fas ${this.getAlertIcon(alertLevel)}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-title">${alertData.title}</div>
                <div class="alert-message">${alertData.message}</div>
            </div>
            <button class="alert-close" onclick="securityAlerts.closeAlert('${alertId}')">
                &times;
            </button>
        `;
        
        this.alertsContainer.appendChild(alertElement);
        this.activeAlerts.push(alertId);
        
        // إخفاء التنبيه تلقائياً بعد فترة ما لم يكن حرجاً
        if (!isCritical) {
            setTimeout(() => {
                this.closeAlert(alertId);
            }, 10000);
        }
    }
    
    closeAlert(alertId) {
        const alertElement = document.getElementById(`alert-${alertId}`);
        if (alertElement) {
            alertElement.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                alertElement.remove();
                this.activeAlerts = this.activeAlerts.filter(id => id !== alertId);
            }, 500);
        }
    }
    
    getAlertIcon(level) {
        const icons = {
            'danger': 'fa-shield-alt',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[level] || 'fa-bell';
    }
    
    simulateInitialAlerts() {
        // هذه للعرض فقط - يمكن حذفها في الإنتاج
        setTimeout(() => {
            this.showAlert({
                title: 'تنبيه أمني',
                message: 'تم اكتشاف محاولة وصول غير مصرح بها',
                level: 'warning'
            });
        }, 3000);
        
        setTimeout(() => {
            this.showAlert({
                title: 'تحذير حرج!',
                message: 'تم اكتشاف محاولة حقن SQL في نموذج البحث',
                level: 'danger',
                critical: true
            });
        }, 6000);
    }
}

// تهيئة نظام التنبيهات
const securityAlerts = new SecurityAlertSystem();

// دالة لاختبار التنبيهات (يمكن استدعاؤها من وحدة المحاكاة)
function testSecurityAlert() {
    securityAlerts.showAlert({
        title: 'اختبار تنبيه',
        message: 'هذا تنبيه اختباري لنظام الأمان',
        level: 'info'
    });
}

// مثال لكيفية إرسال تنبيه من نظام المحاكاة:
/*
const attackEvent = new CustomEvent('securityAttack', {
    detail: {
        title: 'هجوم محتمل',
        message: 'تم اكتشاف محاولة XSS في تعليقات المنتج',
        level: 'danger',
        critical: true
    }
});
document.dispatchEvent(attackEvent);
*/



// تتبع المنتجات التي تم مشاهدتها
const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];

function trackProductView(productId) {
    if (!viewedProducts.includes(productId)) {
        viewedProducts.unshift(productId);
        if (viewedProducts.length > 5) {
            viewedProducts.pop();
        }
        localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
    }
}

// عرض المنتجات التي تم مشاهدتها مؤخراً
function displayRecentlyViewed() {
    const recentlyViewedContainer = document.getElementById('recentlyViewed');
    if (recentlyViewedContainer && viewedProducts.length > 0) {
        recentlyViewedContainer.innerHTML = viewedProducts.map(productId => {
            const product = productsData.find(p => p.id === productId);
            return product ? createSmallProductCard(product) : '';
        }).join('');
    }
}

// تفعيل نموذج التواصل
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    // هنا يمكنك إضافة كود إرسال الرسالة
    console.log('تم إرسال الرسالة:', { name, email, message });
    
    // عرض رسالة نجاح
    showSuccessAlert('تم الإرسال', 'شكراً لتواصلك معنا، سنرد عليك في أقرب وقت', 5000);
    
    // إعادة تعيين النموذج
    this.reset();
});

// تفعيل زر عرض الخريطة
document.getElementById('viewMapBtn').addEventListener('click', function() {
    // يمكنك استبدال هذا بفتح خريطة فعلية
    window.open('https://maps.google.com?q=الرياض،+المملكة+العربية+السعودية', '_blank');
    
    // أو عرض نافذة منبثقة بالخريطة
    // showMapModal();
});

// تأثيرات عند التمرير
function setupContactAnimations() {
    const contactSection = document.querySelector('.contact-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.contact-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1 });
    
    if (contactSection) {
        observer.observe(contactSection);
        
        // تهيئة الحالة الأولية للبطاقات
        document.querySelectorAll('.contact-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.5s ease-out';
        });
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', setupContactAnimations);

// التحقق من صحة النموذج وإرساله
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnotherBtn = document.getElementById('sendAnother');
    const charCount = document.getElementById('charCount');
    const messageInput = document.getElementById('contactMessage');
    
    if (contactForm) {
        // عداد أحرف الرسالة
        messageInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            if (currentLength > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = 500;
            }
        });
        
        // إرسال النموذج
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // إعادة تعيين رسائل الخطأ
            resetErrors();
            
            // التحقق من الصحة
            const isValid = validateForm();
            
            if (isValid) {
                // عرض حالة التحميل
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال';
                submitBtn.disabled = true;
                
                // محاكاة إرسال النموذج (استبدل هذا بالكود الفعلي للإرسال)
                setTimeout(() => {
                    // إخفاء النموذج وعرض رسالة النجاح
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('show');
                    
                    // إعادة تعيين النموذج
                    contactForm.reset();
                    charCount.textContent = '0';
                    
                    // إعادة تعيين زر الإرسال
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // زر إرسال رسالة جديدة
        sendAnotherBtn.addEventListener('click', function() {
            formSuccess.classList.remove('show');
            contactForm.style.display = 'block';
            resetErrors();
        });
    }
    
    // وظيفة التحقق من الصحة
    function validateForm() {
        let isValid = true;
        
        // التحقق من الاسم
        const nameInput = document.getElementById('contactName');
        if (nameInput.value.trim() === '') {
            showError('nameError', 'الاسم مطلوب');
            nameInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        } else if (nameInput.value.trim().length < 3) {
            showError('nameError', 'الاسم يجب أن يكون أكثر من 3 أحرف');
            nameInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        // التحقق من البريد الإلكتروني
        const emailInput = document.getElementById('contactEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError('emailError', 'البريد الإلكتروني مطلوب');
            emailInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError('emailError', 'البريد الإلكتروني غير صحيح');
            emailInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        // التحقق من الموضوع
        const subjectInput = document.getElementById('contactSubject');
        if (!subjectInput.value) {
            showError('subjectError', 'الموضوع مطلوب');
            subjectInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        // التحقق من الرسالة
        const messageInput = document.getElementById('contactMessage');
        if (messageInput.value.trim() === '') {
            showError('messageError', 'الرسالة مطلوبة');
            messageInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError('messageError', 'الرسالة يجب أن تكون أكثر من 10 أحرف');
            messageInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // عرض رسالة الخطأ
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    // إعادة تعيين رسائل الخطأ
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const formGroups = document.querySelectorAll('.form-group');
        
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
    }
    
    // التحقق أثناء الكتابة
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('error');
                const errorId = this.id + 'Error';
                document.getElementById(errorId).textContent = '';
            }
        });
    });
});