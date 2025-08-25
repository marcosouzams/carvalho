# Configuração do Google Ads - Carvalho Engenharia

## Implementação Realizada

### 1. Tag do Google (gtag.js) 
✅ **Instalada no `<head>` do HTML**

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17494332059"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-17494332059');
</script>
```

### 2. Snippet de Conversão 
✅ **Implementado no `<head>` do HTML**

```html
<!-- Event snippet for Pixel - Clicou no botão wpp conversion page -->
<script>
function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof(url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-17494332059/RAVfCL-zrI0bEJul-ZVB',
        'value': 0.0,
        'currency': 'BRL',
        'event_callback': callback
    });
    return false;
}
</script>
```

### 3. Rastreamento de Conversões Implementado

#### Links do WhatsApp com onclick:
✅ **7 links do WhatsApp configurados com rastreamento:**

1. **Botão principal do Hero:** "Solicite um orçamento"
2. **Controle Tecnológico de Concreto:** "Solicite uma proposta" 
3. **Controle Tecnológico de Solos:** "Solicite uma proposta"
4. **Controle Tecnológico de Asfalto:** "Solicite uma proposta"
5. **Ensaio de Agregados:** "Solicite uma proposta"
6. **Infraestrutura:** "Solicite uma proposta"
7. **Construção Civil:** "Solicite uma proposta"

#### Formulário de Contato:
✅ **Formulário configurado para rastrear conversão no envio bem-sucedido**

- Implementado no `script.js` na função de sucesso do EmailJS
- Chama `gtag_report_conversion()` quando o formulário é enviado com sucesso

## IDs de Configuração

- **Conta Google Ads:** `AW-17494332059`
- **ID de Conversão:** `AW-17494332059/RAVfCL-zrI0bEJul-ZVB` (Pixel - Clicou no botão wpp)
- **Tipo de Conversão:** Leads
- **Moeda:** BRL (Real Brasileiro)
- **Valor Padrão:** 0.0

## Como Funciona

### Para Links do WhatsApp:
```html
<a href="URL_WHATSAPP" onclick="return gtag_report_conversion('URL_WHATSAPP');">Texto do Link</a>
```

### Para Formulário:
- Conversão é disparada automaticamente quando o formulário é enviado com sucesso
- Implementado na função `initContactForm()` no `script.js`

## Validação

### Como testar se está funcionando:

1. **Google Tag Assistant Legacy** (Chrome Extension)
2. **Google Analytics Debugger** 
3. **Console do navegador:** verificar se não há erros de JavaScript
4. **Google Ads:** verificar conversões em tempo real

### Verificações importantes:

- [ ] Tag do Google carrega sem erros
- [ ] Função `gtag_report_conversion` está definida globalmente  
- [ ] Links do WhatsApp disparam a conversão ao serem clicados
- [ ] Formulário de contato dispara conversão quando enviado com sucesso
- [ ] Não há erros no console do navegador

## Próximos Passos

1. **Testar** todos os pontos de conversão
2. **Validar** no Google Ads se as conversões estão sendo registradas
3. **Monitorar** por 24-48h para confirmar funcionamento
4. **Ajustar** se necessário baseado nos dados coletados

## Observações Técnicas

- A tag foi implementada seguindo as diretrizes oficiais do Google Ads
- Compatível com o sistema EmailJS já implementado
- Não interfere nas funcionalidades existentes do site
- Implementação responsiva e compatível com todos os dispositivos
