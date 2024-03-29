hamburger = document.querySelector('.hamburger-icon');
hamburger.onclick = function () {
    navBar = document.querySelector('.nav__content-list')
    navBar.classList.toggle('active')

};

searchBtn = document.querySelector('.nav__content-search');
searchBtn.onclick = function () {
    searchModal = document.querySelector('.search')
    searchModal.classList.toggle('active')
}

likeBtn = document.querySelector('.nav__content-heart');
likeBtn.onclick = function () {
    likeModal = document.querySelector('.like')
    likeModal.classList.toggle('active')
}

likeClose = document.querySelector('.like__close');
likeClose.onclick = function () {
    likeModal = document.querySelector('.like')
    likeModal.classList.remove('active')
}

// shopBtn = document.querySelector('.nav__content-shop')
// shopBtn.onclick = function () {
//     shopModal = document.querySelector('.basket')
//     shopModal.classList.toggle('active')
// }

// shopClose = document.querySelector('.basket__close')
// shopClose.onclick = function () {
//     shopModal = document.querySelector('.basket')
//     shopModal.classList.remove('active')
// }

// document.body.addEventListener('click', function (event) {
//     if (!searchModal.contains(event.target) && !searchBtn.contains(event.target)) {
//         searchModal.classList.remove('active');
//     }
// });



const product = {
    microwave: {
        name: 'Microwave',
        price: 1500000,
        amount: 0,
        img: './img/pic-1.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    electea: {
        name: 'Electea',
        price: 300000,
        amount: 0,
        img: './img/pic-2.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    tv: {
        name: 'Tv',
        price: 3000000,
        amount: 0,
        img: './img/pic-3.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    loundry: {
        name: 'Loundry',
        price: 6000000,
        amount: 0,
        img: './img/pic-4.png',
        get totalSum() {
            return this.price * this.amount;
        }
    }
}



const
    productBtns = document.querySelectorAll('.pro__content-shop'),
    basketBtn = document.querySelector('.nav__content-shop'),
    basketIndicator = document.querySelector('.nav__content-indicator'),
    basketModal = document.querySelector('.basket'),
    closeBtnModal = document.querySelector('.basket__close'),
    basketChecklist = document.querySelector('.basket__center'),
    basketTotalPrice = document.querySelector('.basket__price'),
    basketPrint = document.querySelector('.basket__buy'),
    clearBtn = document.querySelector('.basket__reset')
printChecklist = document.querySelector('.print__body'),
    printTotalSum = document.querySelector('.print__footer');

basketBtn.addEventListener('click', () => basketModal.classList.toggle('active'));
closeBtnModal.addEventListener('click', () => basketModal.classList.remove('active'));

productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
});

function plusOrMinus(button) {
    var parent = button.closest('.pro__content-card')
    var parentId = parent.getAttribute('id')
    product[parentId].amount++;
    console.log(parentId);
    basket();

}

function basket() {

    const productArray = [];
    var totalCount = 0;
    basketIndicator.classList.remove('active');

    for (const key in product) {
        const po = product[key];
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`);
        const productCardInd = productCard.querySelector('.pro__content-count');

        if (po.amount) {
            productArray.push(po);
            basketIndicator.classList.add('active');
            totalCount += po.amount
            productCardInd.classList.add('active');
            productCardInd.innerHTML = po.amount;
        } else {
            productCardInd.classList.remove('active');
            productCardInd.innerHTML = 0;
        }
        basketIndicator.innerHTML = totalCount;
    }
    basketChecklist.innerHTML = ' ';

    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemPro(productArray[i]);
    }
    basketTotalPrice.innerHTML = totalSumProducts();
}


function cardItemPro(dataPro) {

    const { name, totalSum: price, amount, img } = dataPro;
    return `
        <div class="basket__product">
            <div class="basket__info">
            <img src="${img}" alt="">
                <div class="basket__sub">
                    <p class="basket__name">${name}</p>
                    <p class="basket__sum"><span>${price.toLocaleString()}</span> сум</p>
                </div>
            </div>
            <div class="basket__count" id="${name.toLowerCase()}__card">
                <button class="basket__symbol" data-symbol="-">-</button>
                <output class="basket__output">${amount}</output>
                <button class="basket__symbol" data-symbol="+">+</button>
            </div>
        </div>
                `
}

window.addEventListener('click', function (event) {
    const btn = event.target;

    if (btn.classList.contains('basket__symbol')) {
        const attr = btn.getAttribute('data-symbol')

        const parent = btn.closest('.basket__count')
        console.log(attr);

        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0];

            if (attr == '+') {
                product[idProduct].amount++
            } else if (attr == '-') {
                product[idProduct].amount--
            }

            basket()
        }
    }
})

clearBtn.addEventListener('click', function () {
    for (const key in product) {
        product[key].amount = 0;
    }
    basket();
});

function totalSumProducts() {
    let total = 0;

    for (const key in product) {
        total += product[key].totalSum
    }

    return total.toLocaleString() + ' сум'
}


basketPrint.addEventListener('click', function () {
    printChecklist.innerHTML = ''

    for (const key in product) {

        const { name, totalSum, amount } = product[key]

        if (amount) {

            printChecklist.innerHTML += `
                                        <div class="print__item">
                                            <p class="print__body-item_name">
                                                <span class="name">${name}</span>
                                                <span class="count">${amount}</span>
                                                <p class="print__body-item_sum">${totalSum.toLocaleString()} сум</p>
                                            </p>
                                        </div>
            
                                        `
        }
    }
    printTotalSum.innerHTML = totalSumProducts()
    window.print()
})


const favoriteBtns = document.querySelectorAll('.heart-btn');
const favorites = [];

favoriteBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        const parent = this.closest('.pro__content-card');
        const productId = parent.getAttribute('id');
        const productData = product[productId];


        this.classList.toggle('active');


        if (!favorites.includes(productData)) {
            favorites.push(productData);
            updateFavoritesList();
        } else {
            removeFromFavorites(productData.name);
            updateFavoritesList();
        }

    });
});


function updateFavoritesList() {
    const likeCenter = document.querySelector('.like__center');
    likeCenter.innerHTML = '';


    favorites.forEach((favProduct) => {
        likeCenter.innerHTML += cardItemFavorite(favProduct);
    });


    const deleteButtons = document.querySelectorAll('.like__icon');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            const parentProduct = this.closest('.like__product');
            const productName = parentProduct.querySelector('.like__name').innerText;
            removeFromFavorites(productName);
            updateFavoritesList();
        });
    });
}

function cardItemFavorite(data) {
    const { name, totalSum, img } = data;
    return `
        <div class="like__product">
            <div class="like__info">
                <img src="${img}" alt="">
                <div class="like__sub">
                    <p class="like__name">${name}</p>
                </div>
            </div>

            <button class="like__icon">
                <i class="fas fa-heart" style="color: red;"></i>
            </button>
        </div>
    `;
}

function removeFromFavorites(productName) {
    const index = favorites.findIndex((favProduct) => favProduct.name === productName);
    if (index !== -1) {
        favorites.splice(index, 1);
    }
}





const searchInput = document.getElementById('search-input');
const productNames = document.querySelectorAll('.pro__content-name');
const originalProductNames = Array.from(productNames).map(name => name.textContent);

searchInput.addEventListener('input', function () {
    const searchTerm = this.value.trim().toLowerCase();

    productNames.forEach((name, index) => {
        const originalName = originalProductNames[index];
        const productName = originalName.toLowerCase();
        let markedName = '';
        let currentIndex = 0;

        for (let i = 0; i < productName.length; i++) {
            if (searchTerm[currentIndex] === productName[i]) {
                markedName += `<span class="highlight">${originalName[i]}</span>`;
                currentIndex++;
            } else {
                markedName += originalName[i];
            }
        }

        name.innerHTML = markedName;

        if (searchTerm && currentIndex === searchTerm.length) {
            name.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (!searchTerm) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});















