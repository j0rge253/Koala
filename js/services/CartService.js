/**
 * CartService.js
 * Gerenciamento completo do carrinho de compras
 * Inclui persistência com localStorage e cálculos automáticos
 */

class CartService {
  constructor() {
    this.STORAGE_KEY = 'koala_sports_cart';
    this.carrinho = this.carregarDoStorage();
    this.listeners = [];
  }

  /**
   * Adiciona produto ao carrinho
   * @param {Object} produto - Dados do produto
   * @param {string} tamanho - Tamanho selecionado
   * @param {boolean} personalizado - Se é personalizado
   * @param {number} quantidade - Quantidade a adicionar
   * @returns {boolean} Sucesso da operação
   */
  adicionarProduto(produto, tamanho, personalizado = false, quantidade = 1) {
    // Verifica estoque disponível
    const estoqueDisponivel = productService.verificarEstoque(produto.id, tamanho);
    
    const itemExistente = this.carrinho.find(
      item => item.id === produto.id && 
              item.tamanho === tamanho && 
              item.personalizado === personalizado
    );

    if (itemExistente) {
      const novaQuantidade = itemExistente.quantidade + quantidade;
      if (novaQuantidade > estoqueDisponivel) {
        this.notificar('estoque-insuficiente', { produto, estoqueDisponivel });
        return false;
      }
      itemExistente.quantidade = novaQuantidade;
    } else {
      if (quantidade > estoqueDisponivel) {
        this.notificar('estoque-insuficiente', { produto, estoqueDisponivel });
        return false;
      }

      this.carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.precoAtual,
        tamanho,
        personalizado,
        quantidade,
        imagem: produto.pasta,
        slug: produto.slug
      });
    }

    this.salvarNoStorage();
    this.notificar('item-adicionado', { produto, tamanho, quantidade });
    return true;
  }

  /**
   * Remove produto do carrinho
   * @param {string} id - ID do produto
   * @param {string} tamanho - Tamanho do produto
   * @param {boolean} personalizado - Se é personalizado
   */
  removerProduto(id, tamanho, personalizado) {
    const index = this.carrinho.findIndex(
      item => item.id === id && 
              item.tamanho === tamanho && 
              item.personalizado === personalizado
    );

    if (index !== -1) {
      const item = this.carrinho[index];
      this.carrinho.splice(index, 1);
      this.salvarNoStorage();
      this.notificar('item-removido', { item });
    }
  }

  /**
   * Atualiza quantidade de um item
   * @param {string} id - ID do produto
   * @param {string} tamanho - Tamanho do produto
   * @param {boolean} personalizado - Se é personalizado
   * @param {number} novaQuantidade - Nova quantidade
   * @returns {boolean} Sucesso da operação
   */
  atualizarQuantidade(id, tamanho, personalizado, novaQuantidade) {
    if (novaQuantidade < 1) {
      this.removerProduto(id, tamanho, personalizado);
      return true;
    }

    const item = this.carrinho.find(
      i => i.id === id && 
           i.tamanho === tamanho && 
           i.personalizado === personalizado
    );

    if (!item) return false;

    const estoqueDisponivel = productService.verificarEstoque(id, tamanho);
    if (novaQuantidade > estoqueDisponivel) {
      this.notificar('estoque-insuficiente', { 
        produto: item, 
        estoqueDisponivel 
      });
      return false;
    }

    item.quantidade = novaQuantidade;
    this.salvarNoStorage();
    this.notificar('quantidade-atualizada', { item });
    return true;
  }

  /**
   * Limpa todo o carrinho
   */
  limparCarrinho() {
    this.carrinho = [];
    this.salvarNoStorage();
    this.notificar('carrinho-limpo');
  }

  /**
   * Retorna itens do carrinho
   * @returns {Array} Itens do carrinho
   */
  obterItens() {
    return [...this.carrinho];
  }

  /**
   * Calcula subtotal do carrinho
   * @returns {number} Valor total
   */
  calcularSubtotal() {
    return this.carrinho.reduce((total, item) => {
      return total + (item.preco * item.quantidade);
    }, 0);
  }

  /**
   * Calcula quantidade total de itens
   * @returns {number} Quantidade total
   */
  calcularQuantidadeTotal() {
    return this.carrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  /**
   * Verifica se carrinho está vazio
   * @returns {boolean} True se vazio
   */
  estaVazio() {
    return this.carrinho.length === 0;
  }

  /**
   * Gera mensagem para WhatsApp
   * @returns {string} Mensagem formatada
   */
  gerarMensagemWhatsApp() {
    if (this.estaVazio()) return '';

    let mensagem = '🔥 *KOALA SPORTS - PEDIDO*\n\n';
    
    this.carrinho.forEach((item, index) => {
      mensagem += `${index + 1}. *${item.nome}*\n`;
      mensagem += `   📏 Tamanho: ${item.tamanho}\n`;
      mensagem += `   🧵 Personalização: ${item.personalizado ? 'SIM' : 'NÃO'}\n`;
      mensagem += `   📦 Quantidade: ${item.quantidade}\n`;
      mensagem += `   💰 Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n\n`;
    });

    mensagem += `━━━━━━━━━━━━━━━━━━━━\n`;
    mensagem += `💵 *TOTAL: R$ ${this.calcularSubtotal().toFixed(2).replace('.', ',')}*\n`;
    mensagem += `📦 *Total de itens: ${this.calcularQuantidadeTotal()}*\n\n`;
    mensagem += `🎁 *Promoção: Leve 3 Pague 2!*`;

    return mensagem;
  }

  /**
   * Salva carrinho no localStorage
   */
  salvarNoStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carrinho));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }

  /**
   * Carrega carrinho do localStorage
   * @returns {Array} Itens do carrinho
   */
  carregarDoStorage() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      return [];
    }
  }

  /**
   * Adiciona listener para mudanças no carrinho
   * @param {Function} callback - Função a ser chamada
   */
  adicionarListener(callback) {
    this.listeners.push(callback);
  }

  /**
   * Notifica listeners sobre mudanças
   * @param {string} evento - Tipo de evento
   * @param {Object} dados - Dados do evento
   */
  notificar(evento, dados = {}) {
    this.listeners.forEach(callback => {
      callback(evento, dados, this.carrinho);
    });
  }

  /**
   * Aplica cupom de desconto (preparação futura)
   * @param {string} codigo - Código do cupom
   * @returns {Object} Resultado da aplicação
   */
  aplicarCupom(codigo) {
    // Preparação para sistema de cupons futuro
    return {
      sucesso: false,
      mensagem: 'Sistema de cupons em breve!'
    };
  }
}

// Exporta instância única (Singleton)
const cartService = new CartService();
