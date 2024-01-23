const products = [
    {
        "id": 1,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/1/1.jpg",
            "https://cdn.dummyjson.com/product-images/1/2.jpg",
            "https://cdn.dummyjson.com/product-images/1/3.jpg",
            "https://cdn.dummyjson.com/product-images/1/4.jpg",
            "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
        ]
    },
    {
        "id": 2,
        "title": "iPhone X",
        "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        "price": 899,
        "discountPercentage": 17.94,
        "rating": 4.44,
        "stock": 34,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/2/1.jpg",
            "https://cdn.dummyjson.com/product-images/2/2.jpg",
            "https://cdn.dummyjson.com/product-images/2/3.jpg",
            "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
        ]
    },
    {
        "id": 3,
        "title": "Samsung Universe 9",
        "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
        "price": 1249,
        "discountPercentage": 15.46,
        "rating": 4.09,
        "stock": 36,
        "brand": "Samsung",
        "category": "smartphones",
        "thumbnail": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/3/1.jpg"
        ]
    },
    {
        "id": 4,
        "title": "OPPOF19",
        "description": "OPPO F19 is officially announced on April 2021.",
        "price": 280,
        "discountPercentage": 17.91,
        "rating": 4.3,
        "stock": 123,
        "brand": "OPPO",
        "category": "smartphones",
        "thumbnail": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/4/1.jpg",
            "https://cdn.dummyjson.com/product-images/4/2.jpg",
            "https://cdn.dummyjson.com/product-images/4/3.jpg",
            "https://cdn.dummyjson.com/product-images/4/4.jpg",
            "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
        ]
    },
    {
        "id": 5,
        "title": "Huawei P30",
        "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
        "price": 499,
        "discountPercentage": 10.58,
        "rating": 4.09,
        "stock": 32,
        "brand": "Huawei",
        "category": "smartphones",
        "thumbnail": "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/5/1.jpg",
            "https://cdn.dummyjson.com/product-images/5/2.jpg",
            "https://cdn.dummyjson.com/product-images/5/3.jpg"
        ]
    },
    {
        "id": 6,
        "title": "MacBook Pro",
        "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
        "price": 1749,
        "discountPercentage": 11.02,
        "rating": 4.57,
        "stock": 83,
        "brand": "Apple",
        "category": "laptops",
        "thumbnail": "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
        "images": [
            "https://cdn.dummyjson.com/product-images/6/1.png",
            "https://cdn.dummyjson.com/product-images/6/2.jpg",
            "https://cdn.dummyjson.com/product-images/6/3.png",
            "https://cdn.dummyjson.com/product-images/6/4.jpg"
        ]
    },
    {
        "id": 7,
        "title": "Samsung Galaxy Book",
        "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
        "price": 1499,
        "discountPercentage": 4.15,
        "rating": 4.25,
        "stock": 50,
        "brand": "Samsung",
        "category": "laptops",
        "thumbnail": "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/7/1.jpg",
            "https://cdn.dummyjson.com/product-images/7/2.jpg",
            "https://cdn.dummyjson.com/product-images/7/3.jpg",
            "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg"
        ]
    },
    {
        "id": 9,
        "title": "Infinix INBOOK",
        "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
        "price": 1099,
        "discountPercentage": 11.83,
        "rating": 4.54,
        "stock": 96,
        "brand": "Infinix",
        "category": "laptops",
        "thumbnail": "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/9/1.jpg",
            "https://cdn.dummyjson.com/product-images/9/2.png",
            "https://cdn.dummyjson.com/product-images/9/3.png",
            "https://cdn.dummyjson.com/product-images/9/4.jpg",
            "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg"
        ]
    },
    {
        "id": 11,
        "title": "perfume Oil",
        "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
        "price": 13,
        "discountPercentage": 8.4,
        "rating": 4.26,
        "stock": 65,
        "brand": "Impression of Acqua Di Gio",
        "category": "fragrances",
        "thumbnail": "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/11/1.jpg",
            "https://cdn.dummyjson.com/product-images/11/2.jpg",
            "https://cdn.dummyjson.com/product-images/11/3.jpg",
            "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg"
        ]
    },
    {
        "id": 12,
        "title": "Brown Perfume",
        "description": "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
        "price": 40,
        "discountPercentage": 15.66,
        "rating": 4,
        "stock": 52,
        "brand": "Royal_Mirage",
        "category": "fragrances",
        "thumbnail": "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/12/1.jpg",
            "https://cdn.dummyjson.com/product-images/12/2.jpg",
            "https://cdn.dummyjson.com/product-images/12/3.png",
            "https://cdn.dummyjson.com/product-images/12/4.jpg",
            "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg"
        ]
    },
    {
        "id": 15,
        "title": "Eau De Perfume Spray",
        "description": "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
        "price": 30,
        "discountPercentage": 10.99,
        "rating": 4.7,
        "stock": 105,
        "brand": "Lord - Al-Rehab",
        "category": "fragrances",
        "thumbnail": "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/15/1.jpg",
            "https://cdn.dummyjson.com/product-images/15/2.jpg",
            "https://cdn.dummyjson.com/product-images/15/3.jpg",
            "https://cdn.dummyjson.com/product-images/15/4.jpg",
            "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg"
        ]
    },
    {
        "id": 16,
        "title": "Hyaluronic Acid Serum",
        "description": "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
        "price": 19,
        "discountPercentage": 13.31,
        "rating": 4.83,
        "stock": 110,
        "brand": "L'Oreal Paris",
        "category": "skincare",
        "thumbnail": "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/16/1.png",
            "https://cdn.dummyjson.com/product-images/16/2.webp",
            "https://cdn.dummyjson.com/product-images/16/3.jpg",
            "https://cdn.dummyjson.com/product-images/16/4.jpg",
            "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg"
        ]
    },
    {
        "id": 17,
        "title": "Tree Oil 30ml",
        "description": "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
        "price": 12,
        "discountPercentage": 4.09,
        "rating": 4.52,
        "stock": 78,
        "brand": "Hemani Tea",
        "category": "skincare",
        "thumbnail": "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/17/1.jpg",
            "https://cdn.dummyjson.com/product-images/17/2.jpg",
            "https://cdn.dummyjson.com/product-images/17/3.jpg",
            "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg"
        ]
    },
    {
        "id": 19,
        "title": "Skin Beauty Serum.",
        "description": "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
        "price": 46,
        "discountPercentage": 10.68,
        "rating": 4.42,
        "stock": 54,
        "brand": "ROREC White Rice",
        "category": "skincare",
        "thumbnail": "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/19/1.jpg",
            "https://cdn.dummyjson.com/product-images/19/2.jpg",
            "https://cdn.dummyjson.com/product-images/19/3.png",
            "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg"
        ]
    },
    {
        "id": 22,
        "title": "Elbow Macaroni - 400 gm",
        "description": "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
        "price": 14,
        "discountPercentage": 15.58,
        "rating": 4.57,
        "stock": 146,
        "brand": "Bake Parlor Big",
        "category": "groceries",
        "thumbnail": "https://cdn.dummyjson.com/product-images/22/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/22/1.jpg",
            "https://cdn.dummyjson.com/product-images/22/2.jpg",
            "https://cdn.dummyjson.com/product-images/22/3.jpg"
        ]
    },
    {
        "id": 24,
        "title": "cereals muesli fruit nuts",
        "description": "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
        "price": 46,
        "discountPercentage": 16.8,
        "rating": 4.94,
        "stock": 113,
        "brand": "fauji",
        "category": "groceries",
        "thumbnail": "https://cdn.dummyjson.com/product-images/24/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/24/1.jpg",
            "https://cdn.dummyjson.com/product-images/24/2.jpg",
            "https://cdn.dummyjson.com/product-images/24/3.jpg",
            "https://cdn.dummyjson.com/product-images/24/4.jpg",
            "https://cdn.dummyjson.com/product-images/24/thumbnail.jpg"
        ]
    },
    {
        "id": 25,
        "title": "Gulab Powder 50 Gram",
        "description": "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
        "price": 70,
        "discountPercentage": 13.58,
        "rating": 4.87,
        "stock": 47,
        "brand": "Dry Rose",
        "category": "groceries",
        "thumbnail": "https://cdn.dummyjson.com/product-images/25/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/25/1.png",
            "https://cdn.dummyjson.com/product-images/25/2.jpg",
            "https://cdn.dummyjson.com/product-images/25/3.png",
            "https://cdn.dummyjson.com/product-images/25/4.jpg",
            "https://cdn.dummyjson.com/product-images/25/thumbnail.jpg"
        ]
    },
    {
        "id": 27,
        "title": "Flying Wooden Bird",
        "description": "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
        "price": 51,
        "discountPercentage": 15.58,
        "rating": 4.41,
        "stock": 17,
        "brand": "Flying Wooden",
        "category": "home-decoration",
        "thumbnail": "https://cdn.dummyjson.com/product-images/27/thumbnail.webp",
        "images": [
            "https://cdn.dummyjson.com/product-images/27/1.jpg",
            "https://cdn.dummyjson.com/product-images/27/2.jpg",
            "https://cdn.dummyjson.com/product-images/27/3.jpg",
            "https://cdn.dummyjson.com/product-images/27/4.jpg",
            "https://cdn.dummyjson.com/product-images/27/thumbnail.webp"
        ]
    },
    {
        "id": 30,
        "title": "Key Holder",
        "description": "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
        "price": 30,
        "discountPercentage": 2.92,
        "rating": 4.92,
        "stock": 54,
        "brand": "Golden",
        "category": "home-decoration",
        "thumbnail": "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg",
        "images": [
            "https://cdn.dummyjson.com/product-images/30/1.jpg",
            "https://cdn.dummyjson.com/product-images/30/2.jpg",
            "https://cdn.dummyjson.com/product-images/30/3.jpg",
            "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg"
        ]
    }
]
let productDOM = document.querySelector('.container')
let cart = JSON.parse(localStorage.getItem('cart')) || []
let cartDOM = document.querySelector('.cart-dom')

function updateCart(items) {
    localStorage.setItem(`cart`, JSON.stringify(items));
}

function showProducts(products) {
    productDOM.innerHTML = products.map(item => {
        let { id, title, price, thumbnail } = item
        let search = cart.find(x => x.id === id);
        return `
        <div class="product">
            <div class="product-img"><img src="${thumbnail}" alt="${title}"></div>
            <h2>${title}</h2>
            <h5>Rs. ${price}</h5>
            <button class="btn" ${search ? 'disabled' : ''} data-id='${id}' onclick='addCartItem(event)'>${search ? 'Already in Cart' : 'Add to Cart'}</button>
        </div> `
    }).join('')
}

showProducts(products)


//cart
function addCartItem(e) {
    e.preventDefault()
    console.log('adding')
    let selectedItem = e.target;
    let selectedId = parseFloat(selectedItem.dataset.id)
    let search = cart.find(x => x.id === selectedId);
    if (search === undefined) {
        cart.push({
            id: selectedId,
            quantity: 1
        });
    }
    console.log(cart)
    updateCart(cart)
    selectedItem.disabled = true
    selectedItem.innerHTML = 'Already in cart'
    showCart()
}
function generateCart() {
    if (cart.length < 1) {
        cartDOM.innerHTML = '<p>🛒Cart is Empty</p>'
        return
    }
    cartDOM.innerHTML = cart.map(item => {
        let search = products.find(x => x.id === item.id);
        let { id, title, price, thumbnail } = search

        return `
        <div class="cart-product">
                <img src="${thumbnail}" alt="${title}">
                <div class="info">
                    <h4>${title}</h4>
                    <h5>Rs. ${price}</h5>
                    <div class="items-number">
                        <button onclick='increaseItems(${id})'>^</button>${item.quantity}<button onclick='decreaseItems(${id})'>v</button>
                    </div>
                    <button class="btn" onclick='removeCart(${id})'>remove</button>
                </div>
            </div>`
    }).join('')
}

function showCart() {
    let cartDom = document.querySelector('.cart-container')
    let overlay = document.querySelector('.overlay')
    cartDom.classList.add('show-cart')
    overlay.classList.add('show-cart')
    generateCart()
    calculateTotalPrice()
}
function closeCart(){
    let cartDom = document.querySelector('.cart-container')
    let overlay = document.querySelector('.overlay')
    cartDom.classList.remove('show-cart')
    overlay.classList.remove('show-cart')
}
function removeCart(id) {
    cart = cart.filter(item => item.id !== id)
    updateCart(cart)
    generateCart()
    showProducts(products)
    calculateTotalPrice()
}

function increaseItems(id) {
    let search = cart.find((x) => x.id === id)
    if (search) search.quantity += 1;
    updateCart(cart);
    console.log('increasing')
    calculateTotalPrice()
    generateCart()
}

function decreaseItems(id) {
    let search = cart.find((x) => x.id === id)
    if (search.quantity === 0) return
    else {
        search.quantity -= 1;
    }
    cart = cart.filter(x => x.quantity !== 0)
    updateCart(cart);
    generateCart()
    calculateTotalPrice()
}

function calculateTotalPrice(){
    let priceDom = document.querySelector('.total-price')
    if(cart.length <1) {
        priceDom.innerText = 0
        return
    }
    let totalPrice= cart.map(item=>{
        let search = products.find(x=>x.id===item.id)
        return item.quantity * search.price
    }).reduce((x,y)=> x+ y)
    priceDom.innerText = totalPrice
}
function checkout(){
    if (cart.length < 1) {
        alert('Cart is Empty')
        return
    }
    let priceDom = document.querySelector('.total-price')
    let order = JSON.parse(localStorage.getItem('order')) || []

    let newOrder = {
        items: cart,
        time: new Date(),
        totalPrice: priceDom.innerText
    }
    let updatedOrder= [...order,newOrder]
    localStorage.setItem('order', JSON.stringify(updatedOrder))
    cart =[]
    updateCart(cart)
    showProducts(products)
    closeCart()
    alert('order has been made')
}