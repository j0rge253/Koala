/**
 * CartUI.js
 * Interface do carrinho lateral (sidebar)
 * Gerencia exibição e interações do carrinho
 */

class CartUI {
  constructor() {
    this.WA_NUMERO = '5585996543820';
    this.inicializar();
    this.vincularEventos();
  }

  /**
   * Inicializa o carrinho na interface
   */
  inicializar() {
    // Listener para mudanças no carrinho
    cartService.adicionarListener((evento, dados) => {
      this.atualizarInterface();
      this.mostrarFeedback(evento, dados);
    });

    // Atualiza interface inicial
    this.atualizarInterface();
  }

  /**
   * Vincula eventos de clique
   */
  vincularEventos() {
    // Botão de abrir carrinho
    document.getElementById('btn-abrir-carrinho')?.addEventListener('click', () => {
      this.abrirCarrinho();
    });

    // Botão de fechar carrinho
    document.getElementById('btn-fechar-carrinho')?.addEventListener('click', () => {
      this.fecharCarrinho();
    });

    // Backdrop
    document.getElementById('cart-backdrop')?.addEventListener('click', () => {
      this.fecharCarrinho();
    });

    // Botão finalizar
    document.getElementById('btn-finalizar-carrinho')?.addEventListener('click', () => {
      this.finalizarPedido();
    });

    // Botão limpar carrinho
    document.getElementById('btn-limpar-carrinho')?.addEventListener('click', () => {
      this.limparCarrinho();
    });
  }

  /**
   * Atualiza toda a interface do carrinho
   */
  atualizarInterface() {
    this.atualizarBadge();
    this.atualizarListaItens();
    this.atualizarTotais();
    this.atualizarEstadoVazio();
  }

  /**
   * Atualiza badge de quantidade
   */
  atualizarBadge() {
    const badge = document.getElementById('cart-badge');
    const quantidade = cartService.calcularQuantidadeTotal();
    
    if (badge) {
      badge.textContent = quantidade;
      badge.style.display = quantidade > 0 ? 'flex' : 'none';
    }
  }

  /**
   * Atualiza lista de itens no carrinho
   */
  atualizarListaItens() {
    const container = document.getElementById('cart-items-list');
    if (!container) return;

    const itens = cartService.obterItens();
    
    if (itens.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = itens.map(item => this.criarItemHTML(item)).join('');
    
    // Vincula eventos dos itens
    this.vincularEventosItens();
  }

  /**
   * Cria HTML de um item do carrinho
   * @param {Object} item - Item do carrinho
   * @returns {string} HTML do item
   */
  criarItemHTML(item) {
    const imagemUrl = this.obterImagemProduto(item.imagem);
    const subtotal = (item.preco * item.quantidade).toFixed(2).replace('.', ',');

    return `
      <div class="cart-item" data-id="${item.id}" data-tamanho="${item.tamanho}" data-personalizado="${item.personalizado}">
        <img src="${imagemUrl}" alt="${item.nome}" class="cart-item-img" loading="lazy">
        <div class="cart-item-info">
          <h4 class="cart-item-nome">${item.nome}</h4>
          <p class="cart-item-detalhes">
            Tamanho: ${item.tamanho} ${item.personalizado ? '• Personalizado' : ''}
          </p>
          <p class="cart-item-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
          <div class="cart-item-quantidade">
            <button class="btn-qty" data-action="diminuir">−</button>
            <span class="qty-value">${item.quantidade}</span>
            <button class="btn-qty" data-action="aumentar">+</button>
          </div>
        </div>
        <div class="cart-item-actions">
          <span class="cart-item-subtotal">R$ ${subtotal}</span>
          <button class="btn-remover-item" title="Remover item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Vincula eventos dos itens do carrinho
   */
  vincularEventosItens() {
    // Botões de quantidade
    document.querySelectorAll('.cart-item .btn-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const item = e.target.closest('.cart-item');
        const action = e.target.dataset.action;
        this.alterarQuantidade(item, action);
      });
    });

    // Botões de remover
    document.querySelectorAll('.btn-remover-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const item = e.target.closest('.cart-item');
        this.removerItem(item);
      });
    });
  }

  /**
   * Altera quantidade de um item
   * @param {HTMLElement} itemElement - Elemento do item
   * @param {string} action - 'aumentar' ou 'diminuir'
   */
  alterarQuantidade(itemElement, action) {
    const id = itemElement.dataset.id;
    const tamanho = itemElement.dataset.tamanho;
    const personalizado = itemElement.dataset.personalizado === 'true';
    
    const item = cartService.obterItens().find(
      i => i.id === id && i.tamanho === tamanho && i.personalizado === personalizado
    );

    if (!item) return;

    const novaQuantidade = action === 'aumentar' 
      ? item.quantidade + 1 
      : item.quantidade - 1;

    cartService.atualizarQuantidade(id, tamanho, personalizado, novaQuantidade);
  }

  /**
   * Remove item do carrinho
   * @param {HTMLElement} itemElement - Elemento do item
   */
  removerItem(itemElement) {
    const id = itemElement.dataset.id;
    const tamanho = itemElement.dataset.tamanho;
    const personalizado = itemElement.dataset.personalizado === 'true';

    if (confirm('Deseja remover este item do carrinho?')) {
      cartService.removerProduto(id, tamanho, personalizado);
    }
  }

  /**
   * Atualiza totais do carrinho
   */
  atualizarTotais() {
    const subtotal = cartService.calcularSubtotal();
    const quantidade = cartService.calcularQuantidadeTotal();

    const subtotalElement = document.getElementById('cart-subtotal');
    const quantidadeElement = document.getElementById('cart-quantidade-total');

    if (subtotalElement) {
      subtotalElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }

    if (quantidadeElement) {
      quantidadeElement.textContent = quantidade;
    }
  }

  /**
   * Atualiza estado vazio do carrinho
   */
  atualizarEstadoVazio() {
    const vazio = cartService.estaVazio();
    const emptyState = document.getElementById('cart-empty-state');
    const content = document.getElementById('cart-content');
    const footer = document.getElementById('cart-footer');

    if (emptyState) emptyState.style.display = vazio ? 'flex' : 'none';
    if (content) content.style.display = vazio ? 'none' : 'block';
    if (footer) footer.style.display = vazio ? 'none' : 'block';
  }

  /**
   * Abre o carrinho lateral
   */
  abrirCarrinho() {
    const sidebar = document.getElementById('cart-sidebar');
    const backdrop = document.getElementById('cart-backdrop');
    
    if (sidebar) sidebar.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Fecha o carrinho lateral
   */
  fecharCarrinho() {
    const sidebar = document.getElementById('cart-sidebar');
    const backdrop = document.getElementById('cart-backdrop');
    
    if (sidebar) sidebar.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Finaliza pedido via WhatsApp
   */
  finalizarPedido() {
    if (cartService.estaVazio()) {
      alert('Seu carrinho está vazio!');
      return;
    }

    const mensagem = cartService.gerarMensagemWhatsApp();
    const url = `https://wa.me/${this.WA_NUMERO}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
    
    // Opcional: limpar carrinho após finalizar
    // cartService.limparCarrinho();
  }

  /**
   * Limpa todo o carrinho
   */
  limparCarrinho() {
    if (confirm('Deseja limpar todo o carrinho?')) {
      cartService.limparCarrinho();
    }
  }

  /**
   * Mostra feedback visual
   * @param {string} evento - Tipo de evento
   * @param {Object} dados - Dados do evento
   */
  mostrarFeedback(evento, dados) {
    switch (evento) {
      case 'item-adicionado':
        this.mostrarToast('✅ Produto adicionado ao carrinho!', 'success');
        break;
      case 'item-removido':
        this.mostrarToast('🗑️ Produto removido do carrinho', 'info');
        break;
      case 'estoque-insuficiente':
        this.mostrarToast(`⚠️ Estoque insuficiente! Apenas ${dados.estoqueDisponivel} unidades disponíveis`, 'warning');
        break;
      case 'carrinho-limpo':
        this.mostrarToast('🧹 Carrinho limpo com sucesso', 'info');
        break;
    }
  }

  /**
   * Exibe toast de notificação
   * @param {string} mensagem - Mensagem a exibir
   * @param {string} tipo - Tipo de toast (success, error, warning, info)
   */
  mostrarToast(mensagem, tipo = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Obtém URL da imagem do produto
   * @param {string} pasta - Nome da pasta do produto
   * @returns {string} URL da imagem
   */
  obterImagemProduto(pasta) {
    return `images/${pasta}/1.png`;
  }
}

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.cartUI = new CartUI();
});
