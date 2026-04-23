(function () {
  'use strict';
  const WA_NUMERO = '5585996543820';
  let carrinho = JSON.parse(localStorage.getItem('koala_carrinho')) || [];

  // --- CARREGAMENTO INICIAL E GRID ---
  window.carregarCamisas = function(listaParaExibir = bancoDeDadosCamisas, gridId = 'grid-principal') {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = ''; 

    const itensValidos = listaParaExibir.filter(c => c.nome && c.pasta);

    itensValidos.forEach(camisa => {
      const article = document.createElement('article');
      article.className = 'card-produto';
      article.dataset.productId = camisa.pasta;
      article.dataset.nome = camisa.nome;
      article.dataset.preco = camisa.preco;
      article.dataset.id = camisa.id;

      const seloPronta = camisa.prontaEntrega ? '<span class="card-badge badge-pronta-entrega">Pronta Entrega</span>' : '';

      article.innerHTML = `
        <div class="card-badges">${seloPronta}</div>
        <div class="card-image" onclick="openModalProduto(this.closest('.card-produto'))">
          <img src="" alt="${camisa.nome}" class="img-principal" loading="lazy">
          <span class="card-ver-fotos">Ver Detalhes</span>
        </div>
        <div class="card-body">
          <h3 class="card-nome">${camisa.nome}</h3>
          <span class="card-preco">R$ ${camisa.preco.toFixed(2).replace('.', ',')}</span>
          <div class="card-actions">
            <button class="btn-add-cart" onclick="event.stopPropagation(); openModalProduto(this.closest('.card-produto'))" title="Adicionar ao Carrinho">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 2L7 6H3L6 20H18L21 6H17L15 2H9Z"/>
                <circle cx="9" cy="21" r="1"/>
                <circle cx="15" cy="21" r="1"/>
              </svg>
            </button>
            <button class="btn-whatsapp" onclick="event.stopPropagation(); openModalProduto(this.closest('.card-produto'))">
              Compre Agora
            </button>
          </div>
        </div>
      `;
      grid.appendChild(article);
      carregarImagemComFallback(article.querySelector('.img-principal'), camisa.pasta);
    });
  };

  // --- FILTRO POR LIGA ---
  window.filtrarLiga = function(liga) {
    // Highlight active liga icon
    document.querySelectorAll('.liga-item').forEach(el => el.classList.remove('active'));
    const clickedItem = event.target.closest('.liga-item');
    if (clickedItem) clickedItem.classList.add('active');

    const filtrados = bancoDeDadosCamisas.filter(c => c.liga === liga);
    carregarCamisas(filtrados, 'grid-internacional');
    document.getElementById('scroll-internacional').closest('section').scrollIntoView({ behavior: 'smooth' });
  };

  window.resetarLiga = function() {
    document.querySelectorAll('.liga-item').forEach(el => el.classList.remove('active'));
    const internacionais = bancoDeDadosCamisas.filter(c => c.categorias.includes('internacional'));
    carregarCamisas(internacionais, 'grid-internacional');
  };

  // --- FILTRO POR TIME NACIONAL ---
  const timeKeywords = {
    'flamengo':      ['flamengo'],
    'palmeiras':     ['palmeiras'],
    'atletico-mg':   ['atlético mineiro', 'atletico mineiro'],
    'cruzeiro':      ['cruzeiro'],
    'gremio':        ['grêmio', 'gremio'],
    'santos':        ['santos'],
    'fluminense':    ['fluminense'],
    'botafogo':      ['botafogo'],
    'corinthians':   ['corinthians'],
    'sao-paulo':     ['são paulo', 'sao paulo'],
    'vasco':         ['vasco'],
    'bahia':         ['bahia'],
    'internacional': ['internacional'],
    'athletico-pr':  ['athletico'],
    'bragantino':    ['bragantino'],
    'vitoria':       ['vitória', 'vitoria'],
    'mirassol':      ['mirassol'],
    'remo':          ['remo'],
    'chapecoense':   ['chapecoense'],
    'coritiba':      ['coritiba'],
    'fortaleza':     ['fortaleza'],
  };

  window.filtrarTime = function(time) {
    document.querySelectorAll('.time-item').forEach(el => el.classList.remove('active'));
    const clickedItem = event.target.closest('.time-item');
    if (clickedItem) clickedItem.classList.add('active');

    const termos = timeKeywords[time] || [time];
    const filtrados = bancoDeDadosCamisas.filter(c =>
      c.categorias.includes('nacional') &&
      termos.some(t => c.nome.toLowerCase().includes(t))
    );
    carregarCamisas(filtrados, 'grid-nacional');
    document.getElementById('scroll-nacional').closest('section').scrollIntoView({ behavior: 'smooth' });
  };

  window.resetarTime = function() {
    document.querySelectorAll('.time-item').forEach(el => el.classList.remove('active'));
    const nacionais = bancoDeDadosCamisas.filter(c => c.categorias.includes('nacional'));
    carregarCamisas(nacionais, 'grid-nacional');
  };
  // --- PESQUISA AUTOMÁTICA ---
  window.pesquisarAutomatico = function(termo) {
    document.getElementById('inputPesquisa').value = termo;
    pesquisarCamisas();
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
  };

  // --- ABRIR PRODUTO ESPECÍFICO ---
  window.abrirProdutoPorPasta = function(pasta) {
    const produto = bancoDeDadosCamisas.find(c => c.pasta === pasta);
    if (produto) {
      // Criar um card temporário com os dados do produto
      const cardTemp = document.createElement('div');
      cardTemp.className = 'card-produto';
      cardTemp.dataset.productId = produto.pasta;
      cardTemp.dataset.nome = produto.nome;
      cardTemp.dataset.preco = produto.preco;
      cardTemp.dataset.id = produto.id;
      
      openModalProduto(cardTemp);
    }
  };

  // --- LÓGICA DE FILTRO E PESQUISA ---
  window.filtrarPorBanco = function(categoria) {
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtrados = (categoria === 'todos') 
      ? bancoDeDadosCamisas 
      : bancoDeDadosCamisas.filter(c => c.categorias.includes(categoria));

    carregarCamisas(filtrados);
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
  };

  window.pesquisarCamisas = function() {
    const termo = document.getElementById('inputPesquisa').value.toLowerCase();
    const filtrados = bancoDeDadosCamisas.filter(camisa => 
      camisa.nome.toLowerCase().includes(termo)
    );
    carregarCamisas(filtrados);
  };

  // --- SCROLL DOS CARROSSÉIS ---
  window.scrollCarrossel = function(dir) {
    document.querySelector('.produtos-scroll-container').scrollBy({ left: dir * 330, behavior: 'smooth' });
  };

  window.scrollCarrosselCategoria = function(categoria, dir) {
    const container = document.getElementById(`scroll-${categoria}`);
    if (container) {
      container.scrollBy({ left: dir * 330, behavior: 'smooth' });
    }
  };

  // --- MODAL COM GALERIA COMPLETA E PERSONALIZAÇÃO ---
  window.openModalProduto = function (card) {
    const modal = document.getElementById('modal-produto');
    const folder = card.dataset.productId;
    const nome = card.dataset.nome;
    const precoBase = parseFloat(card.dataset.preco);
    const id = card.dataset.id;

    document.getElementById('modal-produto-titulo').textContent = nome;
    document.getElementById('modal-produto-descricao').textContent = 'Vestir o manto do seu time com o padrão de excelência que você busca. Somos especializados em importações com qualidade tailandesa 1:1, o que garante tecidos de alta tecnologia.';
    
    // Atualiza preço inicial
    atualizarPrecoModal(precoBase);

    // Busca dados no banco para carregar tamanhos
    const dadosCamisa = bancoDeDadosCamisas.find(c => c.id === id);
    const boxTamanhos = document.getElementById('modal-tamanhos');
    boxTamanhos.innerHTML = '';

    if (dadosCamisa && dadosCamisa.tamanhos) {
      dadosCamisa.tamanhos.forEach((tam, index) => {
        const btn = document.createElement('button');
        btn.className = 'modal-btn-opcao'; // Removido o 'active' do primeiro
        btn.textContent = tam;
        btn.dataset.tamanho = tam;
        btn.onclick = function() {
          boxTamanhos.querySelectorAll('.modal-btn-opcao').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          updateLink();
        };
        boxTamanhos.appendChild(btn);
      });
    }

    // Personalização com opções
    const boxPerso = document.getElementById('modal-personalizacao');
    boxPerso.innerHTML = `
      <button class="modal-btn-opcao active" data-perso="nao" onclick="selecionarPersonalizacao('nao', ${precoBase})">Não</button>
      <button class="modal-btn-opcao" data-perso="sim" onclick="selecionarPersonalizacao('sim', ${precoBase})">Sim (+R$ 30,00)</button>
    `;

    // Campos de personalização (inicialmente ocultos)
    const camposPerso = document.getElementById('campos-personalizacao');
    camposPerso.style.display = 'none';
    camposPerso.innerHTML = `
      <input type="text" id="input-nome-perso" placeholder="Nome (ex: NEYMAR)" maxlength="15">
      <input type="number" id="input-numero-perso" placeholder="Número (ex: 10)" min="0" max="99">
    `;

    // Lógica de imagens - GALERIA COMPLETA
    const mainImg = document.getElementById('modal-main-img');
    const thumbList = document.getElementById('modal-thumb-list');
    thumbList.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const urlPng  = `images/${folder}/${i}.png`;
      const urlJpg  = `images/${folder}/${i}.jpg`;
      const urlWebp = `images/${folder}/${i}.webp`;

      const tentativas = [urlPng, urlJpg, urlWebp];
      let t = 0;
      function tentarProxima(idx) {
        if (t >= tentativas.length) return;
        const imgTeste = new Image();
        imgTeste.src = tentativas[t];
        imgTeste.onload = () => adicionarThumb(tentativas[t]);
        imgTeste.onerror = () => { t++; tentarProxima(idx); };
      }
      tentarProxima(i);
    }

    function adicionarThumb(url) {
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
      
      if (thumbList.children.length === 1) {
        mainImg.src = url;
        thumb.classList.add('active');
      }
    }

    const updateLink = () => {
      const tam = document.querySelector('#modal-tamanhos .active')?.dataset.tamanho || 'P';
      const perso = document.querySelector('#modal-personalizacao .active')?.dataset.perso || 'nao';
      const precoFinal = perso === 'sim' ? precoBase + 30 : precoBase;
      
      let msg = `🔥 *KOALA SPORTS*\n\n`;
      msg += `Olá! Vim pelo site e gostaria de finalizar o pedido:\n\n`;
      msg += `👕 *Camisa:* ${nome}\n`;
      msg += `📏 *Tamanho:* ${tam}\n`;
      
      if (perso === 'sim') {
        const nomePerso = document.getElementById('input-nome-perso')?.value || '';
        const numeroPerso = document.getElementById('input-numero-perso')?.value || '';
        msg += `🧵 *Personalização:* SIM\n`;
        if (nomePerso) msg += `   Nome: ${nomePerso}\n`;
        if (numeroPerso) msg += `   Número: ${numeroPerso}\n`;
      } else {
        msg += `🧵 *Personalização:* NÃO\n`;
      }
      
      msg += `💰 *Valor:* R$ ${precoFinal.toFixed(2).replace('.', ',')}\n\n`;
      msg += `🎁 *Promoção: Leve 3 Pague 2!*`;
      
      document.getElementById('modal-btn-comprar').href = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`;
    };

    updateLink();
    modal.style.display = 'flex';
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  // --- PERSONALIZAÇÃO ---
  window.selecionarPersonalizacao = function(tipo, precoBase) {
    document.querySelectorAll('#modal-personalizacao .modal-btn-opcao').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    const camposPerso = document.getElementById('campos-personalizacao');
    if (tipo === 'sim') {
      camposPerso.style.display = 'flex';
      atualizarPrecoModal(precoBase + 30);
    } else {
      camposPerso.style.display = 'none';
      atualizarPrecoModal(precoBase);
    }
  };

  function atualizarPrecoModal(preco) {
    document.getElementById('modal-produto-preco').textContent = `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }

  // --- UTILITÁRIOS ---
  function carregarImagemComFallback(imgElement, pasta) {
    const tentativas = [
      `images/${pasta}/1.png`, 
      `images/${pasta}/1.jpg`, 
      `images/${pasta}/1.jpeg`,
      `images/${pasta}/1.webp`,
      `images/${pasta}/1 (1).jpg`
    ];
    let i = 0;
    function proxima() {
      if (i < tentativas.length) {
        const t = new Image();
        t.src = tentativas[i];
        t.onload = () => { imgElement.src = t.src; };
        t.onerror = () => { i++; proxima(); };
      } else {
        imgElement.src = 'https://placehold.co/300x400/f5f5f5/666?text=Sem+Foto';
      }
    }
    proxima();
  }

  window.closeModalProduto = () => {
    document.getElementById('modal-produto').style.display = 'none';
    document.getElementById('modal-produto').setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  // --- INICIALIZAÇÃO ---
  function embaralhar(arr) {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  window.onload = () => {
    carregarCamisas(embaralhar(bancoDeDadosCamisas), 'grid-principal');
    
    // Carrega carrosséis de categorias
    const nacionais = bancoDeDadosCamisas.filter(c => c.categorias.includes('nacional'));
    carregarCamisas(nacionais, 'grid-nacional');
    
    const internacionais = bancoDeDadosCamisas.filter(c => c.categorias.includes('internacional'));
    carregarCamisas(internacionais, 'grid-internacional');
    
    // Atualiza badge do carrinho
    atualizarBadgeCarrinho();
    
    // Inicializa animação dos contadores
    iniciarContadores();
  };

  // --- ANIMAÇÃO DOS CONTADORES ---
  function iniciarContadores() {
    const contadores = document.querySelectorAll('.estatistica-numero');
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elemento = entry.target;
          const target = parseInt(elemento.dataset.target);
          animarContador(elemento, target);
          observer.unobserve(elemento);
        }
      });
    }, observerOptions);

    contadores.forEach(contador => observer.observe(contador));
  }

  function animarContador(elemento, target) {
    let atual = 0;
    const incremento = target / 50;
    const duracao = 2000;
    const intervalo = duracao / 50;

    const timer = setInterval(() => {
      atual += incremento;
      if (atual >= target) {
        elemento.textContent = target + (elemento.parentElement.querySelector('.estatistica-label').textContent.includes('%') ? '%' : '+');
        clearInterval(timer);
      } else {
        elemento.textContent = Math.floor(atual) + (elemento.parentElement.querySelector('.estatistica-label').textContent.includes('%') ? '%' : '+');
      }
    }, intervalo);
  }

  // --- FUNÇÕES DO CARRINHO ---
  window.abrirCarrinho = function() {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
    renderizarCarrinho();
  };

  window.fecharCarrinho = function() {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-backdrop').classList.remove('active');
    document.body.style.overflow = '';
  };

  window.adicionarAoCarrinho = function() {
    const modal = document.getElementById('modal-produto');
    const nome = document.getElementById('modal-produto-titulo').textContent;
    const tamanhoSelecionado = document.querySelector('#modal-tamanhos .active');
    
    // Validação: verificar se um tamanho foi selecionado
    if (!tamanhoSelecionado) {
      mostrarToast('⚠️ Por favor, selecione um tamanho!', 'warning');
      // Destacar a seção de tamanhos
      const boxTamanhos = document.getElementById('modal-tamanhos');
      boxTamanhos.style.border = '2px solid #ff4444';
      boxTamanhos.style.padding = '10px';
      boxTamanhos.style.borderRadius = '8px';
      setTimeout(() => {
        boxTamanhos.style.border = '';
        boxTamanhos.style.padding = '';
      }, 2000);
      return;
    }
    
    const precoTexto = document.getElementById('modal-produto-preco').textContent;
    const preco = parseFloat(precoTexto.replace('R$ ', '').replace(',', '.'));
    const tamanho = tamanhoSelecionado.dataset.tamanho;
    const perso = document.querySelector('#modal-personalizacao .active')?.dataset.perso || 'nao';
    
    // Buscar dados do produto para verificar se é retro
    const cardTemp = {
      dataset: {
        nome: nome
      }
    };
    const produtoData = bancoDeDadosCamisas.find(p => p.nome === nome);
    const isRetro = produtoData ? produtoData.categorias.includes('retro') : false;
    
    let nomePerso = '';
    let numeroPerso = '';
    if (perso === 'sim') {
      nomePerso = document.getElementById('input-nome-perso')?.value || '';
      numeroPerso = document.getElementById('input-numero-perso')?.value || '';
    }

    const item = {
      id: Date.now(),
      nome,
      preco,
      tamanho,
      personalizacao: perso === 'sim',
      nomePersonalizado: nomePerso,
      numeroPersonalizado: numeroPerso,
      quantidade: 1,
      isRetro: isRetro
    };

    carrinho.push(item);
    salvarCarrinho();
    atualizarBadgeCarrinho();
    mostrarToast('✅ Produto adicionado ao carrinho!', 'success');
    closeModalProduto();
    abrirCarrinho();
  };

  window.removerDoCarrinho = function(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    atualizarBadgeCarrinho();
    renderizarCarrinho();
  };

  window.alterarQuantidade = function(id, delta) {
    const item = carrinho.find(i => i.id === id);
    if (item) {
      item.quantidade += delta;
      if (item.quantidade <= 0) {
        removerDoCarrinho(id);
      } else {
        salvarCarrinho();
        renderizarCarrinho();
      }
    }
  };

  window.limparCarrinho = function() {
    if (confirm('Deseja realmente limpar o carrinho?')) {
      carrinho = [];
      salvarCarrinho();
      atualizarBadgeCarrinho();
      renderizarCarrinho();
    }
  };

  window.finalizarCarrinho = function() {
    if (carrinho.length === 0) return;

    let msg = `🔥 *KOALA SPORTS*\n\n`;
    msg += `Olá! Vim pelo site e gostaria de finalizar o pedido:\n\n`;
    
    carrinho.forEach((item, index) => {
      msg += `*${index + 1}. ${item.nome}*${item.isRetro ? ' (RETRO)' : ''}\n`;
      msg += `   📏 Tamanho: ${item.tamanho}\n`;
      if (item.personalizacao) {
        msg += `   🧵 Personalização: SIM\n`;
        if (item.nomePersonalizado) msg += `      Nome: ${item.nomePersonalizado}\n`;
        if (item.numeroPersonalizado) msg += `      Número: ${item.numeroPersonalizado}\n`;
      }
      msg += `   🔢 Quantidade: ${item.quantidade}\n`;
      msg += `   💰 Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n\n`;
    });

    // Calcular desconto
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    const temRetro = carrinho.some(item => item.isRetro);
    
    let desconto = 0;
    if (totalItens >= 3 && !temRetro) {
      const grupos = Math.floor(totalItens / 3);
      desconto = grupos * 180; // Desconto fixo de R$ 180 por grupo de 3
    }
    
    const total = subtotal - desconto;
    
    msg += `💵 *Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}*\n`;
    if (desconto > 0) {
      msg += `🎁 *Desconto (Leve 3 Pague 2): - R$ ${desconto.toFixed(2).replace('.', ',')}*\n`;
    }
    if (temRetro) {
      msg += `⚠️ *Promoção não aplicada (camisas RETRO no carrinho)*\n`;
    }
    msg += `💵 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    if (!temRetro) {
      msg += `🎁 *Promoção: Leve 3 Pague 2!*`;
    }

    window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  function renderizarCarrinho() {
    const content = document.getElementById('cart-content');
    const footer = document.getElementById('cart-footer');

    if (carrinho.length === 0) {
      content.innerHTML = `
        <div class="cart-empty-state">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 2L7 6H3L6 20H18L21 6H17L15 2H9Z"/>
            <circle cx="9" cy="21" r="1"/>
            <circle cx="15" cy="21" r="1"/>
          </svg>
          <p>Seu carrinho está vazio</p>
          <button class="btn-secondary" onclick="fecharCarrinho()">Continuar Comprando</button>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'block';
    
    let html = '<div class="cart-items-list">';
    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      html += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4 class="cart-item-nome">${item.nome}${item.isRetro ? ' <span style="color: #ffa500; font-size: 0.75rem;">(RETRO)</span>' : ''}</h4>
            <p class="cart-item-detalhes">Tamanho: ${item.tamanho}</p>
            ${item.personalizacao ? `<p class="cart-item-detalhes">Personalizado: ${item.nomePersonalizado || ''} ${item.numeroPersonalizado || ''}</p>` : ''}
            <p class="cart-item-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
            <div class="cart-item-quantidade">
              <button class="btn-qty" onclick="alterarQuantidade(${item.id}, -1)">-</button>
              <span class="qty-value">${item.quantidade}</span>
              <button class="btn-qty" onclick="alterarQuantidade(${item.id}, 1)">+</button>
            </div>
          </div>
          <div class="cart-item-actions">
            <span class="cart-item-subtotal">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            <button class="btn-remover-item" onclick="removerDoCarrinho(${item.id})">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    content.innerHTML = html;

    // Calcular totais com promoção 3 por 2
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    
    // Verificar se há camisas retro no carrinho
    const temRetro = carrinho.some(item => item.isRetro);
    
    // Lógica: A cada 3 itens, desconto fixo de R$ 180 (apenas se não houver retro)
    let desconto = 0;
    let promocaoAplicavel = false;
    
    if (totalItens >= 3 && !temRetro) {
      const grupos = Math.floor(totalItens / 3);
      desconto = grupos * 180; // Desconto fixo de R$ 180 por grupo de 3
      promocaoAplicavel = true;
    }
    
    const total = subtotal - desconto;
    
    document.getElementById('cart-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    // Mostrar desconto se aplicável
    const totaisDiv = document.querySelector('.cart-totais');
    const descontoExistente = document.getElementById('cart-desconto-linha');
    if (descontoExistente) descontoExistente.remove();
    
    if (desconto > 0) {
      const descontoLinha = document.createElement('div');
      descontoLinha.id = 'cart-desconto-linha';
      descontoLinha.className = 'cart-total-linha';
      descontoLinha.style.color = '#00e676';
      descontoLinha.innerHTML = `<span>Desconto (Leve 3 Pague 2):</span><span>- R$ ${desconto.toFixed(2).replace('.', ',')}</span>`;
      totaisDiv.insertBefore(descontoLinha, totaisDiv.children[1]);
    }
    
    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    // Atualizar mensagem de promoção
    const promoInfo = document.querySelector('.cart-promo-info');
    if (temRetro) {
      promoInfo.style.background = '#ffa500';
      promoInfo.innerHTML = '⚠️ Promoção não válida para camisas RETRO';
    } else if (promocaoAplicavel) {
      promoInfo.style.background = '#00e676';
      promoInfo.style.color = '#000';
      promoInfo.innerHTML = '🎉 Promoção aplicada: Leve 3 Pague 2!';
    } else {
      promoInfo.style.background = '#ff4444';
      promoInfo.style.color = '#fff';
      promoInfo.innerHTML = `🎁 Leve 3 Pague 2! Faltam ${3 - totalItens} item(ns)`;
    }
  }

  function salvarCarrinho() {
    localStorage.setItem('koala_carrinho', JSON.stringify(carrinho));
  }

  function atualizarBadgeCarrinho() {
    const badge = document.getElementById('cart-badge');
    const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }

  function mostrarToast(mensagem, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo} show`;
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Adicionar evento ao botão do carrinho no header
  document.getElementById('btn-abrir-carrinho')?.addEventListener('click', abrirCarrinho);
  
  // Menu mobile toggle
  document.getElementById('btn-menu-mobile')?.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
  });

  // Fechar menu ao clicar em link
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav').classList.remove('active');
    });
  });
  
  // Adicionar evento ao botão de tema
  document.getElementById('btn-theme-toggle')?.addEventListener('click', toggleTheme);
  
  // Carregar tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();

// --- TEMA DARK/LIGHT ---
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
