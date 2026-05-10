const rateLimit = require('express-rate-limit');

/**
 * ZihinAğı Güvenlik Katmanı
 * Ağ stabilitesini korumak için IP bazlı istek sınırlaması.
 * (Ağ yapılandırması ve yüksek performanslı sunucu yönetimi için kritik bir bileşendir).
 */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // Her IP için 15 dakikada maksimum 100 istek
    message: {
        error: "Too many requests from this IP, please try again after 15 minutes.",
        status: 429
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

/**
 * Bağlantı zaman aşımı kontrolü (Network Timeout Management)
 */
const timeoutMiddleware = (req, res, next) => {
    // 5 saniyeden uzun süren işlemleri kes
    req.setTimeout(5000, () => {
        let err = new Error('Request Timeout');
        err.status = 408;
        next(err);
    });
    next();
};

module.exports = { apiLimiter, timeoutMiddleware };
