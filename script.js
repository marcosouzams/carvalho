// Variáveis globais
let isMenuOpen = false;
let isLoading = true;

// Função para scroll suave
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Fechar menu mobile se estiver aberto
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}

// Função para toggle do menu mobile
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const hamburgerLines = document.querySelectorAll('.hamburger-lines span');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileNav.style.maxHeight = '300px';
        mobileNav.style.opacity = '1';
        
        // Animar hamburger para X
        hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburgerLines[1].style.opacity = '0';
        hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        mobileNav.style.maxHeight = '0';
        mobileNav.style.opacity = '0';
        
        // Resetar hamburger
        hamburgerLines[0].style.transform = 'none';
        hamburgerLines[1].style.opacity = '1';
        hamburgerLines[2].style.transform = 'none';
    }
}

// Função para animação on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Função para efeito parallax no header
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
        header.style.borderBottom = '1px solid rgba(236, 117, 66, 0.1)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
    }
}

// Função para contadores animados
function animateCounters() {
    const counters = document.querySelectorAll('.stats-counter[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white max-w-sm`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Função para atualizar indicador de scroll
function updateScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
}

// Função para navegação ativa
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('onclick')?.includes(sectionId)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Função para abrir modal de vídeo
function openVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('youtube-iframe');
    
    // Substitua pela URL do seu vídeo do YouTube
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal de vídeo
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('youtube-iframe');
    
    iframe.src = '';
    modal.classList.remove('modal-visible');
    document.body.style.overflow = 'auto';
}

// Função para abrir modal de sucesso
function openSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal de sucesso
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('modal-visible');
    document.body.style.overflow = 'auto';
}

// Função para lazy loading de imagens
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para smooth reveal de elementos
function revealElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar contadores quando a seção hero for visível
                if (entry.target.id === 'home') {
                    setTimeout(() => {
                        animateCounters();
                    }, 500);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Função para adicionar efeitos de hover nos cards
function addCardEffects() {
    const cards = document.querySelectorAll('.card-hover-glow');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para adicionar efeito de typing (se necessário)
function addTypingEffect() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;
    
    const text = textElement.textContent;
    textElement.textContent = '';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            textElement.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Função para adicionar partículas flutuantes
function createFloatingParticles() {
    const hero = document.getElementById('home');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-white/20 rounded-full animate-float';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        hero.appendChild(particle);
    }
}

// Função para adicionar efeito de cursor personalizado (desktop)
function addCustomCursor() {
    if (window.innerWidth < 768) return; // Não adicionar em mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-brand-orange rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150';
    cursor.style.display = 'none';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 8 + 'px';
        cursor.style.top = mouseY - 8 + 'px';
        cursor.style.display = 'block';
    });
    
    // Esconder cursor personalizado em dispositivos touch
    document.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
    });
    
    // Efeito de hover no cursor
    const hoverElements = document.querySelectorAll('button, a, .card-hover-glow, .interactive-element');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Função para adicionar animação de shake
function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Função para o formulário de contato com EmailJS
function initContactForm() {
    // Inicializar EmailJS
    emailjs.init('FOobaEy9qgscdkpLb'); // Chave pública configurada

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitIcon = document.getElementById('submit-icon');
    const submitLoading = document.getElementById('submit-loading');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Mostrar loading
            submitBtn.disabled = true;
            submitText.style.display = 'none';
            submitIcon.style.display = 'none';
            submitLoading.style.display = 'flex';
            
            // Esconder mensagens anteriores
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');

            try {
                // Coletar dados do formulário
                const templateParams = {
                    user_name: document.getElementById('user_name').value,
                    user_email: document.getElementById('user_email').value,
                    user_phone: document.getElementById('user_phone').value || 'Não informado',
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                    timestamp: new Date().toLocaleString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                };

                // Enviar email usando EmailJS
                const response = await emailjs.send(
                    'service_vnc49ef',    // Service ID configurado
                    'template_w6zh37e',   // Template ID configurado
                    templateParams
                );

                if (response.status === 200) {
                    // Sucesso
                    successMessage.classList.remove('hidden');
                    form.reset();
                    
                    // Scroll para a mensagem de sucesso
                    successMessage.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });

                    // Limpar validações visuais
                    clearFormValidation();
                } else {
                    throw new Error('Erro no envio');
                }
            } catch (error) {
                // Erro
                errorMessage.classList.remove('hidden');
                console.error('Erro ao enviar formulário:', error);
                
                // Scroll para a mensagem de erro
                errorMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            } finally {
                // Resetar botão
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitText.style.display = 'inline';
                    submitIcon.style.display = 'inline';
                    submitLoading.style.display = 'none';
                }, 1000);
            }
        });
    }
}

// Função para limpar validações visuais
function clearFormValidation() {
    const form = document.getElementById('contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            input.style.borderColor = '';
        });
    }
}

// Função para validação em tempo real
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        field.style.borderColor = '#10B981'; // Verde
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        field.style.borderColor = '#EF4444'; // Vermelho
    }
    
    return isValid;
}

// Função para formatar telefone automaticamente
function initPhoneFormatter() {
    const phoneInput = document.getElementById('user_phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar loading
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.classList.add('hidden');
        isLoading = false;
        
        // Inicializar animações após loading
        setTimeout(() => {
            animateOnScroll();
            revealElements();
            createFloatingParticles();
            addCardEffects();
            addCustomCursor();
            addShakeAnimation();
            
            // Animar elementos do hero
            const heroElements = document.querySelectorAll('#home .animate-on-scroll');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate');
                }, index * 200);
            });
        }, 300);
    }, 1500);
    
    // Event listener para scroll
    window.addEventListener('scroll', () => {
        if (!isLoading) {
            animateOnScroll();
            handleHeaderScroll();
            updateScrollIndicator();
            updateActiveNavLink();
        }
    });
    
    // Event listener para formulário
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simular envio de formulário
                const submitButton = this.querySelector('button[type="submit"]');
                const originalHTML = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.innerHTML = originalHTML;
                    submitButton.disabled = false;
                    this.reset();
                    openSuccessModal();
                }, 2000);
            } else {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            }
        });
    }
    
    // Event listeners para modais
    document.getElementById('close-video-modal')?.addEventListener('click', closeVideoModal);
    
    // Fechar modal clicando fora
    document.getElementById('video-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeVideoModal();
        }
    });
    
    document.getElementById('success-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeSuccessModal();
        }
    });
    
    // Event listener para tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
            closeSuccessModal();
        }
    });
    
    // Lazy loading de imagens
    lazyLoadImages();
    
    // Preload de imagens importantes
    const importantImages = [
        'https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3862599/pexels-photo-3862599.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Adicionar suporte para PWA (se necessário)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Otimizações de performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollIndicator();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Adicionar efeitos de hover para elementos interativos
    const interactiveElements = document.querySelectorAll('.interactive-element');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Adicionar efeito de fade-in para elementos quando carregam
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observar todos os elementos com animação
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Função para redimensionamento da janela
window.addEventListener('resize', () => {
    // Reajustar elementos se necessário
    if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Performance optimizations
window.addEventListener('load', () => {
    // Preload das próximas seções
    const nextSectionImages = document.querySelectorAll('img');
    nextSectionImages.forEach(img => {
        if (img.complete) return;
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
    
    // Otimizar animações para dispositivos com baixa performance
    const isLowPerformance = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;
    
    if (isLowPerformance) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        document.querySelectorAll('.animate-blob, .animate-float').forEach(el => {
            el.style.animation = 'none';
        });
    }
});

// Adicionar funcionalidade de busca (se necessário)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const searchableElements = document.querySelectorAll('[data-searchable]');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    });
}

// Função para adicionar tooltips (se necessário)
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-800 text-white px-2 py-1 rounded text-sm z-50';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.top = this.offsetTop - 30 + 'px';
            tooltip.style.left = this.offsetLeft + 'px';
            document.body.appendChild(tooltip);
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                document.body.removeChild(this.tooltipElement);
                this.tooltipElement = null;
            }
        });
    });
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    initializeTooltips();
    initContactForm();
    initFormValidation();
    initPhoneFormatter();
});