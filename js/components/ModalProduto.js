/**
 * ModalProduto.js
 * Modal profissional de produto com controle de estoque
 * Gerencia seleção de tamanho, personalização e adição ao carrinho
 */

class ModalProduto {
  constructor() {
    this.produtoAtual = null;
    this.tamanhoSelecionado = null;
    this.personalizacaoSelecionada = false;
    this.vincularEventos();
  }

  /**
   * Vincula eventos do modal
   */
  vincularEventos() {
    // Fechar modal
    document.getElementById('modal-produto-close')?.addEventListener('click', () => {
      this.fechar();
    });

    document.querySelector('.modal-produto-backdrop')?.addEventListener('click', () => {
      this.fechar();
    });

    // Adicionar ao carrinho
    document.getElementById('modal-btn-adicionar-carrinho')?.addEventListener('click', () => {
      this.adicionarAoCarrinho();
    });

    // ESC para fechar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.produtoAtual) {
        this.fechar();
      }
    });
  }

  /**
   * Abre modal com produto específico
   * @param {string} produtoId - ID do produto
   */
  async abrir(produtoId) {
    const produto = productService.buscarPorId(produtoId);
    if (!produto) {
      console.error('Produto não encontrado:', produtoId);
      return;
    }

    this.produtoAtual = produto;
    this.preencherDados(produto);
    this.carregarImagens(produto);
    this.criarBotoesTamanho(produto);
    this.criarBotoesPersonalizacao();
    
    // Mostra modal
    const modal = document.getElementById('modal-produto');
    if (modal) {
      modal.removeAttribute('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    // Atualiza SEO
    this.atualizarSEO(produto);
  }

  /**
   * Fecha o modal
   */
  fechar() {
    const modal = document.getElementById('modal-produto');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
    this.produtoAtual = null;
    this.tamanhoSelecionado = null;
    this.personalizacaoSelecionada = false;
  }

  /**
   * Preenche dados do produto no modal
   * @param {Object} produto - Dados do produto
   */
  preencherDados(produto) {
    // Título
    const titulo = document.getElementById('modal-produto-titulo');
    if (titulo) titulo.textContent = produto.nome;

    // Descrição
    const descricao = document.getElementById('modal-produto-descricao');
    if (descricao) descricao.textContent = produto.descricao;

    // Preço
    this.atualizarPreco(produto);

    // Avaliação
    this.atualizarAvaliacao(produto);

    // Informações técnicas
    this.atualizarInfoTecnicas(produto);
  }

  /**
   * Atualiza preço no modal
   * @param {Object} produto - Dados do produto
   */
  atualizarPreco(produto) {
    const containerPreco = document.getElementById('modal-produto-preco');
    if (!containerPreco) return;

    const desconto = productService.calcularDesconto(produto);

    if (produto.promocao && desconto > 0) {
      containerPreco.innerHTML = `
        <div class="modal-preco-tag">
          <span class="modal-preco-original">R$ ${produto.precoOriginal.toFixed(2).replace('.', ',')}</span>
          <span class="modal-preco-atual">R$ ${produto.precoAtual.toFixed(2).replace('.', ',')}</span>
          <span class="badge-promo-modal">-${desconto}%</span>
        </div>
      `;
    } else {
      containerPreco.innerHTML = `
        <span class="modal-preco-atual">R$ ${produto.precoAtual.toFixed(2).replace('.', ',')}</span>
      `;
    }
  }

  /**
   * Atualiza avaliação no modal
   * @param {Object} produto - Dados do produto
   */
  atualizarAvaliacao(produto) {
    const container = document.getElementById('modal-produto-avaliacao');
    if (!container) return;

    const estrelas = ProductCard.criarEstrelas(produto.avaliacao);
    container.innerHTML = `
      ${estrelas}
      <span class="modal-total-avaliacoes">${produto.totalAvaliacoes} avaliações</span>
    `;
  }

  /**
   * Atualiza informações técnicas
   * @param {Object} produto - Dados do produto
   */
  atualizarInfoTecnicas(produto) {
    const container = document.getElementById('modal-info-tecnicas');
    if (!container) return;

    container.innerHTML = `
      <div class="info-tecnica-item">
        <strong>Material:</strong> ${produto.material}
      </div>
      <div class="info-tecnica-item">
        <strong>Tecnologia:</strong> ${produto.tecnologia}
      </div>
      <div class="info-tecnica-item">
        <strong>Peso:</strong> ${produto.peso}g
      </div>
      ${produto.prontaEntrega ? '<div class="info-tecnica-item badge-pronta-entrega">✓ Pronta Entrega</div>' : ''}
    `;
  }

  /**
   * Carrega imagens do produto
   * @param {Object} produto - Dados do produto
   */
  carregarImagens(produto) {
    const mainImg = document.getElementById('modal-main-img');
    const thumbList = document.getElementById('modal-thumb-list');
    
    if (!mainImg || !thumbList) return;

    thumbList.innerHTML = '';
    
    // Tenta carregar até 5 imagens
    for (let i = 1; i <= 5; i++) {
      const urlPng = `images/${produto.pasta}/${i}.png`;
      const urlJpg = `images/${produto.pasta}/${i}.jpg`;
      
      const img = new Image();
      img.src = urlPng;
      
      img.onload = () => this.adicionarThumb(urlPng, mainImg, thumbList);
      img.onerror = () => {
        const imgJpg = new Image();
        imgJpg.src = urlJpg;
        imgJpg.onload = () => this.adicionarThumb(urlJpg, mainImg, thumbList);
      };
    }
  }

  /**
   * Adiciona thumbnail de imagem
   * @param {string} url - URL da imagem
   * @param {HTMLElement} mainImg - Imagem principal
   * @param {HTMLElement} thumbList - Container de thumbs
   */
  adicionarThumb(url, mainImg, thumbList) {
    const thumb = document.createElement('img');
    thumb.src = url;
    thumb.className = 'modal-thumb-item';
    thumb.loading = 'lazy';
    
    thumb.onclick = () => {
      mainImg.src = url;
      document.querySelectorAll('.modal-thumb-item').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    };
    
    thumbList.appendChild(thumb);
    
    // Primeira imagem ativa
    if (thumbList.children.length === 1) {
      mainImg.src = url;
      thumb.classList.add('active');
    }
  }

  /**
   * Cria botões de tamanho com controle de estoque
   * @param {Object} produto - Dados do produto
   */
  criarBotoesTamanho(produto) {
    const container = document.getElementById('modal-tamanhos');
    if (!container) return;

    container.innerHTML = '';

    produto.tamanhos.forEach((tamanho, index) => {
      const estoque = produto.estoque[tamanho] || 0;
      const disponivel = estoque > 0;
      const ultimasUnidades = estoque > 0 && estoque <= 2;

      const btn = document.createElement('button');
      btn.className = 'modal-btn-opcao';
      btn.dataset.tamanho = tamanho;
      
      if (!disponivel) {
        btn.classList.add('disabled');
        btn.disabled = true;
        btn.innerHTML = `${tamanho} <span class="badge-esgotado">Esgotado</span>`;
      } else {
        if (index === 0) {
          btn.classList.add('active');
          this.tamanhoSelecionado = tamanho;
        }
        
        btn.innerHTML = tamanho;
        
        if (ultimasUnidades) {
          btn.innerHTML += ` <span class="badge-ultimas">Últimas ${estoque}</span>`;
        }

        btn.onclick = () => {
          container.querySelectorAll('.modal-btn-opcao').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.tamanhoSelecionado = tamanho;
        };
      }

      container.appendChild(btn);
    });
  }

  /**
   * Cria botões de personalização
   */
  criarBotoesPersonalizacao() {
    const container = document.getElementById('modal-personalizacao');
    if (!container) return;

    container.innerHTML = `
      <button class="modal-btn-opcao active" data-perso="nao">Não</button>
      <button class="modal-btn-opcao" data-perso="sim">Somente Personalizado</button>
    `;

    container.querySelectorAll('.modal-btn-opcao').forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll('.modal-btn-opcao').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.personalizacaoSelecionada = btn.dataset.perso === 'sim';
      };
    });
  }

  /**
   * Adiciona produto ao carrinho
   */
  adicionarAoCarrinho() {
    if (!this.produtoAtual) return;

    if (!this.tamanhoSelecionado) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    const sucesso = cartService.adicionarProduto(
      this.produtoAtual,
      this.tamanhoSelecionado,
      this.personalizacaoSelecionada,
      1
    );

    if (sucesso) {
      // Abre o carrinho automaticamente
      setTimeout(() => {
        cartUI.abrirCarrinho();
      }, 500);
    }
  }

  /**
   * Atualiza meta tags para SEO
   * @param {Object} produto - Dados do produto
   */
  atualizarSEO(produto) {
    // Title
    document.title = `${produto.nome} - Koala Sports`;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = produto.descricao;

    // Open Graph
    this.atualizarMetaTag('og:title', produto.nome);
    this.atualizarMetaTag('og:description', produto.descricao);
    this.atualizarMetaTag('og:image', `${window.location.origin}/images/${produto.pasta}/1.png`);
    this.atualizarMetaTag('og:url', `${window.location.origin}?produto=${produto.slug}`);
  }

  /**
   * Atualiza ou cria meta tag
   * @param {string} property - Propriedade da meta tag
   * @param {string} content - Conteúdo da meta tag
   */
  atualizarMetaTag(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }
}

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.modalProduto = new ModalProduto();
});
