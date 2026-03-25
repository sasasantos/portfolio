// ================================================
// PORTFÓLIO — SCRIPT PRINCIPAL
// ================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── CUSTOM CURSOR ──
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (cursor && follower) {
        let mx = 0, my = 0, fx = 0, fy = 0;
        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
        });
        function animFollower() {
            fx += (mx - fx) * 0.12;
            fy += (my - fy) * 0.12;
            follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%,-50%)`;
            requestAnimationFrame(animFollower);
        }
        animFollower();
        document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; follower.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; follower.style.opacity = '1'; });
    }

    // ── NAVBAR SCROLL ──
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.background = window.scrollY > 40
                ? 'rgba(8,8,8,0.98)'
                : 'rgba(8,8,8,0.85)';
        });
    }

    // ── HAMBURGER ──
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const spans = hamburger.querySelectorAll('span');
            if (mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            }
        });
    }

    // ── REVEAL ON SCROLL ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el, i) => {
        // stagger siblings
        const parent = el.parentElement;
        const siblings = [...parent.querySelectorAll(':scope > .reveal')];
        const idx = siblings.indexOf(el);
        if (idx > 0 && !el.dataset.delay) {
            el.style.transitionDelay = `${idx * 0.08}s`;
        }
        revealObserver.observe(el);
    });

    // ── SKILL BARS ──
    const bars = document.querySelectorAll('.skill-bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.dataset.width;
                entry.target.style.width = target;
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    bars.forEach(bar => barObserver.observe(bar));

    // ── CONTACT FORM ──
    const form = document.getElementById('contactForm');
    const successBanner = document.getElementById('successBanner');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const nome    = form.nome?.value.trim();
            const email   = form.email?.value.trim();
            const assunto = form.assunto?.value.trim();
            const msg     = form.mensagem?.value.trim();

            if (!nome || !email || !assunto || !msg) {
                showToast('Preencha todos os campos!', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Email inválido.', 'error');
                return;
            }
            if (successBanner) {
                successBanner.style.display = 'block';
                setTimeout(() => successBanner.style.display = 'none', 5000);
            }
            form.reset();
            showToast('Mensagem enviada! ✓', 'success');
        });

        // live validation
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    field.style.borderColor = 'rgba(90, 162, 255, 0.4)';
                } else {
                    field.style.borderColor = '';
                }
                if (field.type === 'email' && field.value.trim()) {
                    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
                    field.style.borderColor = valid ? 'rgba(90, 162, 255, 0.4)' : 'rgba(53, 120, 255, 0.5)';
                }
            });
        });
    }

    // ── TOAST ──
    function showToast(msg, type = 'success') {
        const t = document.createElement('div');
        t.textContent = msg;
        t.style.cssText = `
            position:fixed; bottom:2rem; right:2rem; z-index:9999;
            padding:.875rem 1.5rem;
            background:${type === 'success' ? '#5abaff' : '#4335ff'};
            color:#080808;
            font-family:'Syne',sans-serif; font-size:.85rem; font-weight:700;
            border-radius:999px;
            transform:translateY(80px); opacity:0;
            transition: all .4s cubic-bezier(0.16,1,0.3,1);
        `;
        document.body.appendChild(t);
        requestAnimationFrame(() => {
            t.style.transform = 'translateY(0)';
            t.style.opacity = '1';
        });
        setTimeout(() => {
            t.style.transform = 'translateY(80px)';
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 400);
        }, 3500);
    }

    // ── SCROLL TO TOP ──
    window.addEventListener('scroll', () => {
        const existing = document.querySelector('.scroll-top-btn');
        if (window.scrollY > 500) {
            if (!existing) {
                const btn = document.createElement('button');
                btn.className = 'scroll-top-btn';
                btn.innerHTML = '↑';
                btn.style.cssText = `
                    position:fixed; bottom:2rem; right:2rem; z-index:500;
                    width:42px; height:42px;
                    background:#5aafff; color:#080808;
                    border:none; border-radius:50%;
                    font-family:'Syne',sans-serif; font-size:1rem; font-weight:800;
                    cursor:none;
                    transition:all .3s cubic-bezier(0.16,1,0.3,1);
                    box-shadow:0 4px 20px rgba(0, 85, 255, 0.3);
                `;
                btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.1)'; });
                btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
                btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
                document.body.appendChild(btn);
            }
        } else {
            existing?.remove();
        }
    });

    // ── ACTIVE NAV LINK ──
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === page);
    });

    // ── COUNTER ANIMATION (stats) ──
    function animateCounter(el) {
        const target = el.textContent.replace(/[^0-9]/g, '');
        const suffix = el.textContent.replace(/[0-9]/g, '');
        if (!target) return;
        const num = parseInt(target);
        let current = 0;
        const step = Math.ceil(num / 40);
        const timer = setInterval(() => {
            current = Math.min(current + step, num);
            el.textContent = current + suffix;
            if (current >= num) clearInterval(timer);
        }, 30);
    }
    const statNums = document.querySelectorAll('.stat-n');
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
        });
    }, { threshold: .5 });
    statNums.forEach(el => counterObs.observe(el));

});
