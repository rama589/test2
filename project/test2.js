const phrases = ["حيث التألق", "حيث الأناقة", "حيث نرتقي"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const animatedText = document.getElementById("animated-text");
const typingSpeed = 100;  // سرعة الكتابة
const deletingSpeed = 50; // سرعة الحذف
const pauseBetweenPhrases = 2000; // التوقف بين العبارات

function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        // الحذف التدريجي
        animatedText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // الانتقال إلى العبارة التالية
            setTimeout(typeEffect, 500); // انتظار قبل بدء الكتابة مجدداً
        } else {
            setTimeout(typeEffect, deletingSpeed);
        }
    } else {
        // الكتابة التدريجية
        animatedText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseBetweenPhrases); // انتظار قبل بدء الحذف
        } else {
            setTimeout(typeEffect, typingSpeed);
        }
    }
}

// بدء التأثير
typeEffect();