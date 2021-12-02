const body = document.querySelector('body');

const bottomAside = document.querySelector('.botao_aside');
const imagensGaleria = document.querySelectorAll('.foto');
const botaoPagFavoritos = document.querySelector('.galeria-fav');
const botaoPagHome = document.querySelector('.home')
//-------------------MODAL--------------------------
const modal = document.querySelector('.modal');
const modalImagem = document.querySelector('.modal__image');
const modalCloseButton = document.querySelector('.modal__button--close');
const modalPreviousButton = document.querySelector('.modal__button--previous');
const modalNextButton = document.querySelector('.modal__button--next');
//----------------CURTIDAS-------------------------
const modalLike = document.querySelector('.modal__like')
const ModalFavoritos = document.querySelector('.modal-favoritos')
const favoritos = document.querySelector('.favoritos')
const buttonFavoritos = document.querySelector('.icon-close_modal-favoritos')
const imageFavoritos = document.querySelectorAll('.imagem_favoritos');
const likeFavoritos = document.querySelectorAll('.like-ativo')
const itemLike = document.querySelectorAll('.item__like')
//-----------------------------------------------

let currentItem = 0;
let likedImages = [];

//aside
bottomAside.addEventListener('click', function () {
    const menuAside = bottomAside.parentElement;

    const iconAside = bottomAside.querySelector('.menu-icon')

    const isClosed = menuAside.classList.contains('aside-close');

    iconAside.src = isClosed ? './assets/open-menu.svg' : './assets/closed-menu.svg';

    menuAside.classList.toggle('aside-close')
})

botaoPagFavoritos.addEventListener('click', function (event) {
    event.stopPropagation()
    ModalFavoritos.classList.remove('hidden')
    alertaFavoritos()
    body.classList.add('overflow-hidden')
    addOverflow()
});

buttonFavoritos.addEventListener('click', function () {
    ModalFavoritos.classList.add('hidden');
    body.classList.remove('overflow-hidden')
})

botaoPagHome.addEventListener('click', function () {
    ModalFavoritos.classList.add('hidden')
})

//modal
imagensGaleria.forEach(function (item, index) {
    item.addEventListener('click', function (event) {
        modal.classList.remove('hidden');

        currentItem = index;

        atualizarImagemModal(event.target.src)
        atualizarBotoesModal()

        if (likedImages.includes(currentItem)) {
            modalLike.src = "./assets/like.svg";
            imageFavoritos.src = event.target.src
        } else {
            modalLike.src = './assets/inactive-like.svg';
        }
    });
});

modalImagem.addEventListener('click', (event) => {
    event.stopPropagation();
})

modalPreviousButton.addEventListener('click', (event) => {
    event.stopPropagation();

    if (currentItem === 0) {
        return;
    }

    currentItem--;

    atualizarImagemModal(imagensGaleria[currentItem].src);
    atualizarBotoesModal();
    atualizarLikeModal();

})

modalNextButton.addEventListener('click', (event) => {
    event.stopPropagation();

    if (currentItem === imagensGaleria.length - 1) {
        return;
    }
    currentItem++;

    atualizarImagemModal(imagensGaleria[currentItem].src);
    atualizarBotoesModal();
    atualizarLikeModal();
})

function atualizarBotoesModal() {
    if (currentItem === 0) {
        modalPreviousButton.classList.add('hidden');
    } else {
        modalPreviousButton.classList.remove('hidden');
    }

    if (currentItem === imagensGaleria.length - 1) {
        modalNextButton.classList.add('hidden');
    } else {
        modalNextButton.classList.remove('hidden');
    }
}

function atualizarImagemModal(novaImagem) {
    modalImagem.src = novaImagem;
}

function atualizarLikeModal() {
    if (likedImages.includes(currentItem)) {
        modalLike.classList.remove('hidden');
    } else {
        modalLike.classList.add('hidden')
    }
}

modalCloseButton.addEventListener('click', fecharModal);
modal.addEventListener('click', fecharModal);
function fecharModal() {
    modal.classList.add('hidden')
}

//Likes
modalImagem.addEventListener('dblclick', likeDeslike)
itemLike.forEach(function (item, index) {
    item.addEventListener('click', function () {
        currentItem = index;
        likeDeslike()
    })
})

modalLike.addEventListener('click', function (event) {
    event.stopPropagation();
    likeDeslike()
})

const elementLike = imagensGaleria[currentItem].previousElementSibling
const parentLike = imageFavoritos[currentItem].parentElement

function likeDeslike() {
    const elementLike = imagensGaleria[currentItem].previousElementSibling
    const parentLike = imageFavoritos[currentItem].parentElement

    if (likedImages.includes(currentItem)) {
        likedImages = likedImages.filter(function (likedImages) {
            return likedImages !== currentItem
        });

        modalLike.src = "./assets/inactive-like.svg"
        elementLike.src = "./assets/inactive-like.svg"
        parentLike.classList.add('hidden')
    } else {
        likedImages.push(currentItem)
        modalLike.src = "./assets/like.svg"
        elementLike.src = "./assets/like.svg"
        parentLike.classList.remove('hidden')
    }
}

function alertaFavoritos() {
    const alert = document.querySelector('.alerta');
    if (likedImages.length == 0) {
        alert.classList.remove('hidden')
    } else {
        alert.classList.add('hidden')
    }
}

function addOverflow(params) {
    console.log(likedImages)
    if (likedImages.length > 3) {
        favoritos.classList.add('overflow-active')
    }
}

likeFavoritos.forEach(function (item, index) {
    item.addEventListener('click', function () {
        currentItem = index
        const parentLike = imageFavoritos[currentItem].parentElement
        const elementLike = imagensGaleria[currentItem].previousElementSibling

        if (likedImages.includes(currentItem)) {
            likedImages = likedImages.filter(function (likedImages) {
                return likedImages !== currentItem
            })

            modalLike.src = "./assets/inactive-like.svg"
            elementLike.src = "./assets/inactive-like.svg"
            parentLike.classList.add('hidden')

            alertaFavoritos()
        }
    })
})


