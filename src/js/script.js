document.addEventListener('DOMContentLoaded', () => { 

    let contador = 0;
    const contadorEl = document.getElementById('contador-carrinho');

    const botoesCompra = document.querySelectorAll('.botao-compra');

    botoesCompra.forEach(botao => {
        botao.addEventListener('click', () => {
            contador++;
            contadorEl.textContent = contador;
            contadorEl.classList.remove('pulse');
            void contadorEl.offsetWidth;
            setTimeout(() => contadorEl.classList.add('pulse'), 600);
            setTimeout(() => contadorEl.classList.remove('pulse'), 1300);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    const produtos = document.querySelectorAll('#compra .produto');
    const btnProximoProd = document.getElementById('btn-proximo-cmp');
    const btnAnteriorProd = document.getElementById('btn-anterior-cmp');
    let paginaAtual = 0;

    function getProdutosPorPagina() {
        return window.innerWidth <= 1024 ? 1 : 5;
    }

    let produtosPorPagina = getProdutosPorPagina();

    function atualizarProdutos() {
        produtos.forEach((produto, i) => {
            if (i >= paginaAtual * produtosPorPagina && i < (paginaAtual + 1) * produtosPorPagina) {
                produto.style.display = 'block';
            } else {
                produto.style.display = 'none';
            }
        });
    }

    btnProximoProd.addEventListener('click', () => {
        const produtosPorPagina = getProdutosPorPagina();
        if ((paginaAtual + 1) * produtosPorPagina < produtos.length) {
            paginaAtual++;
        } else {
            paginaAtual = 0;
        }
        atualizarProdutos();
    });

    btnAnteriorProd.addEventListener('click', () => {
        const produtosPorPagina = getProdutosPorPagina();
        if (paginaAtual > 0) {
            paginaAtual--;
        } else {
            paginaAtual = Math.floor((produtos.length - 1) / produtosPorPagina);
        }
        atualizarProdutos();
    });

    window.addEventListener('resize', () => {
        produtosPorPagina = getProdutosPorPagina();
        const maxPagina = Math.floor((produtos.length - 1) / produtosPorPagina);
        if (paginaAtual > maxPagina) paginaAtual = maxPagina;
        atualizarProdutos();
    });

    atualizarProdutos();

    const bannerItems = [
        {
            imagem: "./src/assets/PLANO X.png",
            titulo: "PLANO X",
            descricao: "O plano mais completo de todos!",
            preco: "$833,00/mês"
        },
        {
            imagem: "./src/assets/PLANO BÁSICO.png",
            titulo: "PLANO BÁSICO",
            descricao: "Atende as necessidades básicas de sua empresa",
            preco: "$91,00/mês"
        },
        {
            imagem: "./src/assets/PLANO AVANÇADO.png",
            titulo: "PLANO AVANÇADO",
            descricao: "Proteja-se com segurança e reduza o risco com este Plano",
            preco: "$217,00/mês"
        }
    ];

    let bannerIndex = 0;
    const banner = document.getElementById('banner');
    const tituloBanner = document.querySelector('.banner-titulo');
    const descricaoBanner = document.querySelector('.banner-descricao');
    const precoBanner = document.querySelector('#banner-conteudo p');
    const btnProximoBanner = document.querySelector('.btn-proximo');
    const btnAnteriorBanner = document.querySelector('.btn-anterior');
    let bannerInterval;

    function atualizarBanner() {
        banner.style.backgroundImage = `url('${bannerItems[bannerIndex].imagem}')`;
        tituloBanner.textContent = bannerItems[bannerIndex].titulo;
        descricaoBanner.textContent = bannerItems[bannerIndex].descricao;
        precoBanner.textContent = bannerItems[bannerIndex].preco;
    }

    function iniciarBannerAutomatico() {
        if (window.innerWidth <= 1024) {
            bannerInterval = setInterval(() => {
                bannerIndex = (bannerIndex + 1) % bannerItems.length;
                atualizarBanner();
            }, 5000);
        }
    }

    function pararBannerAutomatico() {
        clearInterval(bannerInterval);
    }

    atualizarBanner();
    iniciarBannerAutomatico();

    btnProximoBanner.addEventListener('click', () => {
        pararBannerAutomatico();
        bannerIndex = (bannerIndex + 1) % bannerItems.length;
        atualizarBanner();
        iniciarBannerAutomatico();
    });

    btnAnteriorBanner.addEventListener('click', () => {
        pararBannerAutomatico();
        bannerIndex = (bannerIndex - 1 + bannerItems.length) % bannerItems.length;
        atualizarBanner();
        iniciarBannerAutomatico();
    });

    window.addEventListener('resize', () => {
        pararBannerAutomatico();
        iniciarBannerAutomatico();
    });
});
