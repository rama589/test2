// admin/script.js
class AttackSimulator {
    constructor() {
        this.attackInterval = null;
        this.currentAttack = null;
        this.metrics = {
            requests: 0,
            attacks: 0,
            serverLoad: 0,
            responseTime: 100,
            conversionRate: 3.5
        };
        this.initCharts();
    }

    initCharts() {
        // مخطط حركة المرور
        this.trafficChart = new Chart(document.getElementById('trafficChart'), {
            type: 'line',
            data: {
                labels: Array(20).fill(''),
                datasets: [
                    {
                        label: 'حركة عادية',
                        data: Array(20).fill(50),
                        borderColor: '#2ecc71',
                        tension: 0.1
                    },
                    {
                        label: 'حركة هجوم',
                        data: Array(20).fill(0),
                        borderColor: '#e74c3c',
                        tension: 0.1
                    }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        // مقاييس الأداء
        this.updateGauges();
    }

    startAttackSimulation() {
        const attackType = document.getElementById('attackType').value;
        this.currentAttack = attackType;
        
        // تحميل وحدات الهجوم
        import(`../modules/attacks/${attackType}.js`)
            .then(module => {
                this.attackInterval = setInterval(() => {
                    this.metrics.requests += 10;
                    this.metrics.attacks += 1;
                    
                    // محاكاة تأثير الهجوم
                    this.simulateAttackImpact();
                    
                    // تحديث الواجهة
                    this.updateMetrics();
                    this.addLogEntry(module.generateLogEntry());
                    
                }, 1500); // محاكاة كل 1.5 ثانية
            })
            .catch(err => console.error('Error loading attack module:', err));
    }

    simulateAttackImpact() {
        // تأثير على حمل الخادم
        this.metrics.serverLoad = Math.min(100, this.metrics.serverLoad + 5);
        
        // تأثير على زمن الاستجابة
        this.metrics.responseTime = Math.min(2000, this.metrics.responseTime + 50);
        
        // تأثير على معدل التحويل
        this.metrics.conversionRate = Math.max(0, this.metrics.conversionRate - 0.1);
        
        // تحديث المخططات
        this.updateTrafficChart();
        this.updateGauges();
    }

    updateMetrics() {
        document.getElementById('requests').textContent = this.metrics.requests;
        document.getElementById('attacks').textContent = this.metrics.attacks;
    }

    updateTrafficChart() {
        // إضافة نقطة بيانات جديدة
        this.trafficChart.data.datasets[0].data.push(
            Math.floor(Math.random() * 30) + 20
        );
        this.trafficChart.data.datasets[1].data.push(
            Math.floor(Math.random() * 70) + 30
        );
        
        // الحفاظ على عدد ثابت من النقاط
        if (this.trafficChart.data.datasets[0].data.length > 20) {
            this.trafficChart.data.datasets.forEach(dataset => {
                dataset.data.shift();
            });
        }
        
        this.trafficChart.update();
    }

    updateGauges() {
        // يمكن استبدال هذا بمكتبة رسم متخصصة
        document.getElementById('serverLoadGauge').style.background = 
            `conic-gradient(#e74c3c ${this.metrics.serverLoad}%, #f0f0f0 ${this.metrics.serverLoad}% 100%)`;
        
        document.getElementById('responseTimeGauge').style.background = 
            `conic-gradient(#f39c12 ${this.metrics.responseTime / 20}%, #f0f0f0 ${this.metrics.responseTime / 20}% 100%)`;
        
        document.getElementById('conversionRateGauge').style.background = 
            `conic-gradient(#2ecc71 ${this.metrics.conversionRate * 20}%, #f0f0f0 ${this.metrics.conversionRate * 20}% 100%)`;
    }

    addLogEntry(entry) {
        const logElement = document.createElement('div');
        logElement.className = 'log-entry';
        logElement.innerHTML = `
            <span class="log-time">${new Date().toLocaleTimeString()}</span>
            <span class="log-type ${entry.type}">${entry.type}</span>
            <span class="log-message">${entry.message}</span>
            <span class="log-ip">${this.generateRandomIP()}</span>
        `;
        document.getElementById('attackLog').prepend(logElement);
    }

    generateRandomIP() {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }

    stopSimulation() {
        clearInterval(this.attackInterval);
        this.currentAttack = null;
    }
}

// تهيئة المحاكي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.attackSimulator = new AttackSimulator();
});