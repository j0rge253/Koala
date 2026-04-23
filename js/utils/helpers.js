/**
 * helpers.js
 * Funções utilitárias para toda a aplicação
 */

/**
 * Debounce - Atrasa execução de função
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função com debounce
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle - Limita execuções de função
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função com throttle
 */
function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Formata preço para exibição
 * @param {number} valor - Valor numérico
 * @returns {string} Valor formatado
 */
function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

/**
 * Formata número com separador de milhares
 * @param {number} numero - Número a formatar
 * @returns {string} Número formatado
 */
function formatarNumero(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Gera slug a partir de texto
 * @param {string} texto - Texto para converter
 * @returns {string} Slug gerado
 */
function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Copia texto para clipboard
 * @param {string} texto - Texto a copiar
 * @returns {Promise<boolean>} Sucesso da operação
 */
async function copiarParaClipboard(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (error) {
    console.error('Erro ao copiar:', error);
    return false;
  }
}

/**
 * Scroll suave para elemento
 * @param {string} seletor - Seletor CSS do elemento
 * @param {number} offset - Offset em pixels
 */
function scrollParaElemento(seletor, offset = 0) {
  const elemento = document.querySelector(seletor);
  if (!elemento) return;

  const posicao = elemento.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: posicao,
    behavior: 'smooth'
  });
}

/**
 * Verifica se elemento está visível no viewport
 * @param {HTMLElement} elemento - Elemento a verificar
 * @returns {boolean} True se visível
 */
function estaVisivel(elemento) {
  const rect = elemento.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Lazy loading de imagens
 * @param {string} seletor - Seletor das imagens
 */
function inicializarLazyLoading(seletor = 'img[loading="lazy"]') {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(seletor).forEach(img => imageObserver.observe(img));
  }
}

/**
 * Valida email
 * @param {string} email - Email a validar
 * @returns {boolean} True se válido
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida telefone brasileiro
 * @param {string} telefone - Telefone a validar
 * @returns {boolean} True se válido
 */
function validarTelefone(telefone) {
  const regex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
  return regex.test(telefone);
}

/**
 * Formata telefone brasileiro
 * @param {string} telefone - Telefone a formatar
 * @returns {string} Telefone formatado
 */
function formatarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, '');
  
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (numeros.length === 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return telefone;
}

/**
 * Obtém parâmetro da URL
 * @param {string} nome - Nome do parâmetro
 * @returns {string|null} Valor do parâmetro
 */
function obterParametroURL(nome) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nome);
}

/**
 * Atualiza parâmetro da URL sem recarregar
 * @param {string} nome - Nome do parâmetro
 * @param {string} valor - Valor do parâmetro
 */
function atualizarParametroURL(nome, valor) {
  const url = new URL(window.location);
  if (valor) {
    url.searchParams.set(nome, valor);
  } else {
    url.searchParams.delete(nome);
  }
  window.history.pushState({}, '', url);
}

/**
 * Detecta dispositivo móvel
 * @returns {boolean} True se mobile
 */
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta iOS
 * @returns {boolean} True se iOS
 */
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/**
 * Gera ID único
 * @returns {string} ID único
 */
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Aguarda tempo específico
 * @param {number} ms - Milissegundos
 * @returns {Promise} Promise que resolve após o tempo
 */
function aguardar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sanitiza HTML para prevenir XSS
 * @param {string} html - HTML a sanitizar
 * @returns {string} HTML sanitizado
 */
function sanitizarHTML(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Trunca texto com reticências
 * @param {string} texto - Texto a truncar
 * @param {number} limite - Limite de caracteres
 * @returns {string} Texto truncado
 */
function truncarTexto(texto, limite = 100) {
  if (texto.length <= limite) return texto;
  return texto.substr(0, limite).trim() + '...';
}

/**
 * Converte imagem para WebP (preparação futura)
 * @param {string} url - URL da imagem
 * @returns {string} URL com WebP se suportado
 */
function converterParaWebP(url) {
  // Verifica suporte a WebP
  const suportaWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;

  if (suportaWebP && url.match(/\.(jpg|jpeg|png)$/i)) {
    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }

  return url;
}

/**
 * Analytics - Rastreia evento (preparação futura)
 * @param {string} categoria - Categoria do evento
 * @param {string} acao - Ação realizada
 * @param {string} rotulo - Rótulo adicional
 * @param {number} valor - Valor numérico
 */
function rastrearEvento(categoria, acao, rotulo = '', valor = 0) {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', acao, {
      event_category: categoria,
      event_label: rotulo,
      value: valor
    });
  }

  // Meta Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', acao, {
      category: categoria,
      label: rotulo,
      value: valor
    });
  }

  console.log('Evento rastreado:', { categoria, acao, rotulo, valor });
}

/**
 * Rastreia visualização de produto
 * @param {Object} produto - Dados do produto
 */
function rastrearVisualizacaoProduto(produto) {
  rastrearEvento('Produto', 'ViewContent', produto.nome, produto.precoAtual);
}

/**
 * Rastreia adição ao carrinho
 * @param {Object} produto - Dados do produto
 * @param {number} quantidade - Quantidade adicionada
 */
function rastrearAdicaoCarrinho(produto, quantidade) {
  rastrearEvento('Carrinho', 'AddToCart', produto.nome, produto.precoAtual * quantidade);
}

/**
 * Rastreia início de checkout
 * @param {number} valor - Valor total
 */
function rastrearInicioCheckout(valor) {
  rastrearEvento('Checkout', 'InitiateCheckout', '', valor);
}
