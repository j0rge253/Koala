/**
 * ProductCard.js
 * Componente para renderização de cards de produtos
 * Inclui badges, preços, avaliações e controle de estoque
 */

class ProductCard {
  /**
   * Cria HTML de um card de produto
   * @param {Object} produto - Dados do produto
   * @returns {string} HTML do card
   */
  static criar(produto) {
    const desconto = productService.calcularDesconto(produto);
    const imagemUrl = `images/${produto.pasta}/1.png`;
    const estrelas = this.criarEstrelas(produto.avaliacao);
    
    return `
      <article class="card-produto" data-product-id="${produto.id}">
        ${this.criarBadges(produto, desconto)}
        <div class="card-image" onclick="modalProduto.abrir('${produto.id}')">
          <img 
            src="${imagemUrl}" 
            alt="${produto.nome}" 
            class="img-principal"
            loading="lazy"
            onerror="this.src='https://placehold.co/300x400/111/fff?text=Sem+Foto'"
          >
          <span class="card-ver-fotos">Ver Detalhes</span>
        </div>
        <div class="card-body">
          <div class="card-avaliacao">
            ${estrelas}
            <span class="card-total-avaliacoes">(${produto.totalAvaliacoes})</span>
          </div>
          <h3 class="card-nome">${produto.nome}</h3>
          ${this.criarPrecos(produto)}
          <button 
            class="btn-whatsapp" 
            onclick="modalProduto.abrir('${produto.id}')"
          >
            Compre Agora
          </button>
        </div>
      </article>
    `;
  }

  /**
   * Cria badges do produto
   * @param {Object} produto - Dados do produto
   * @param {number} desconto - Percentual de desconto
   * @returns {string} HTML das badges
   */
  static criarBadges(produto, desconto) {
    const badges = [];

    if (produto.promocao && desconto > 0) {
      badges.push(`<span class="card-badge badge-desconto">-${desconto}%</span>`);
    }

    if (produto.prontaEntrega) {
      badges.push(`<span class="card-badge badge-pronta-entrega">Pronta Entrega</span>`);
    }

    if (produto.categorias.includes('lançamento')) {
      badges.push(`<span class="card-badge badge-lancamento">Lançamento</span>`);
    }

    return badges.length > 0 
      ? `<div class="card-badges">${badges.join('')}</div>` 
      : '';
  }

  /**
   * Cria HTML de preços
   * @param {Object} produto - Dados do produto
   * @returns {string} HTML dos preços
   */
  static criarPrecos(produto) {
    if (produto.promocao && produto.precoOriginal > produto.precoAtual) {
      return `
        <div class="card-precos">
          <span class="card-preco-original">R$ ${produto.precoOriginal.toFixed(2).replace('.', ',')}</span>
          <span class="card-preco">R$ ${produto.precoAtual.toFixed(2).replace('.', ',')}</span>
        </div>
      `;
    }

    return `
      <span class="card-preco">R$ ${produto.precoAtual.toFixed(2).replace('.', ',')}</span>
    `;
  }

  /**
   * Cria estrelas de avaliação
   * @param {number} avaliacao - Nota de 0 a 5
   * @returns {string} HTML das estrelas
   */
  static criarEstrelas(avaliacao) {
    const estrelasCompletas = Math.floor(avaliacao);
    const temMeia = avaliacao % 1 >= 0.5;
    const estrelasVazias = 5 - estrelasCompletas - (temMeia ? 1 : 0);

    let html = '<div class="estrelas">';
    
    // Estrelas completas
    for (let i = 0; i < estrelasCompletas; i++) {
      html += '<span class="estrela estrela-completa">★</span>';
    }
    
    // Meia estrela
    if (temMeia) {
      html += '<span class="estrela estrela-meia">★</span>';
    }
    
    // Estrelas vazias
    for (let i = 0; i < estrelasVazias; i++) {
      html += '<span class="estrela estrela-vazia">★</span>';
    }
    
    html += `<span class="avaliacao-numero">${avaliacao.toFixed(1)}</span>`;
    html += '</div>';
    
    return html;
  }

  /**
   * Cria skeleton loading
   * @returns {string} HTML do skeleton
   */
  static criarSkeleton() {
    return `
      <article class="card-produto skeleton">
        <div class="skeleton-image"></div>
        <div class="card-body">
          <div class="skeleton-line skeleton-line-short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-line-medium"></div>
          <div class="skeleton-button"></div>
        </div>
      </article>
    `;
  }
}
