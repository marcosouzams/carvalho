// EXEMPLO AVANÇADO: EmailJS com Auto-resposta
// Adicione este código no script.js para implementar auto-resposta

// Função avançada para o formulário com auto-resposta
function initAdvancedContactForm() {
    // Inicializar EmailJS com suas chaves
    emailjs.init('FOobaEy9qgscdkpLb');

    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Mostrar loading...
            showLoading(true);
            hideMessages();

            try {
                // Dados do formulário
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

                // 1. Enviar email para a empresa
                const emailToCompany = await emailjs.send(
                    'service_vnc49ef',
                    'template_w6zh37e',
                    templateParams
                );

                // 2. Enviar auto-resposta para o cliente
                const autoReplyParams = {
                    user_name: templateParams.user_name,
                    user_email: templateParams.user_email,
                    subject: templateParams.subject,
                    timestamp: templateParams.timestamp,
                    to_email: templateParams.user_email // Para onde enviar a auto-resposta
                };

                const autoReply = await emailjs.send(
                    'sservice_vnc49ef',
                    'template_autoreply_123', // Crie um segundo template para auto-resposta
                    autoReplyParams
                );

                // Verificar se ambos foram enviados com sucesso
                if (emailToCompany.status === 200 && autoReply.status === 200) {
                    showSuccessMessage();
                    form.reset();
                    clearFormValidation();
                } else {
                    throw new Error('Erro no envio');
                }

            } catch (error) {
                showErrorMessage();
                console.error('Erro ao enviar formulário:', error);
            } finally {
                showLoading(false);
            }
        });
    }
}

// Funções auxiliares
function showLoading(show) {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitIcon = document.getElementById('submit-icon');
    const submitLoading = document.getElementById('submit-loading');

    submitBtn.disabled = show;
    
    if (show) {
        submitText.style.display = 'none';
        submitIcon.style.display = 'none';
        submitLoading.style.display = 'flex';
    } else {
        setTimeout(() => {
            submitText.style.display = 'inline';
            submitIcon.style.display = 'inline';
            submitLoading.style.display = 'none';
        }, 1000);
    }
}

function hideMessages() {
    document.getElementById('form-success').classList.add('hidden');
    document.getElementById('form-error').classList.add('hidden');
}

function showSuccessMessage() {
    const successMessage = document.getElementById('form-success');
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showErrorMessage() {
    const errorMessage = document.getElementById('form-error');
    errorMessage.classList.remove('hidden');
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Substituir a função original por esta versão avançada
// initContactForm = initAdvancedContactForm;
