const categoryData = [
  { id: 1, name: "Apģērbi" },
  { id: 2, name: "Apavi" },
  { id: 3, name: "Sports" },
  { id: 4, name: "Aksesuāri" },
  { id: 5, name: "Rotaļlietas" }
];

const sizeData = [
  { id: 1, name: "XXS" },
  { id: 2, name: "XS" },
  { id: 3, name: "S" },
  { id: 4, name: "M" },
  { id: 5, name: "L" },
  { id: 6, name: "XL" }
];

const brandData = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Adidas" },
  { id: 3, name: "Reebook" },
  { id: 4, name: "Gucci" }
];

const colorData = [
  { id: 1, name: "Sarkans", color: "#f54242" },
  { id: 2, name: "Zils", color: "#f54242" },
  { id: 3, name: "Dzeltens", color: "#f54242" },
  { id: 4, name: "Melns", color: "#f54242" },
  { id: 5, name: "Balts", color: "#f54242" }
];

const cartData = {
  totalPrice: 70.0,
  totalQuantity: 5,
  items: [
    { productId: 1, price: 20.0, quantity: 2 },
    { productId: 2, price: 10.0, quantity: 3 }
  ]
};

const productData = [
  {
    id: 1,
    name: "Pludmales jaka",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 20.0,
    category: [1],
    size: [1, 2],
    brand: 1,
    color: [1, 2],
    isFreeShipping: true,
    image: "images/bilde1.jpg"
  },
  {
    id: 2,
    name: "Pludmales čības",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 10.0,
    category: [2],
    size: [1, 2, 3, 4],
    brand: 2,
    color: [2, 3],
    isFreeShipping: true
  },
  {
    id: 3,
    name: "Botas",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 30.5,
    category: [2, 3],
    size: [6],
    brand: 4,
    color: [4],
    isFreeShipping: false
  },
  {
    id: 4,
    name: "1 Botas",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 30.5,
    category: [2, 3],
    size: [6],
    brand: 4,
    color: [4],
    isFreeShipping: false
  },
  {
    id: 5,
    name: "2 Botas",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 30.5,
    category: [2, 3],
    size: [6],
    brand: 4,
    color: [4],
    isFreeShipping: false
  },
  {
    id: 6,
    name: "3 Botas",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 30.5,
    category: [2, 3],
    size: [6],
    brand: 4,
    color: [4],
    isFreeShipping: false
  },
  {
    id: 7,
    name: "4 Botas",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 30.5,
    category: [2, 3],
    size: [6],
    brand: 4,
    color: [4],
    isFreeShipping: false
  },
  {
    id: 8,
    name: "5 Botas",
    description: "Forsa pludmales jaka visiem gadijumiem",
    price: 30.5,
    category: [2, 3],
    size: [6],
    brand: 4,
    color: [4],
    isFreeShipping: false
  }
];

export default {
  categoryData,
  productData,
  sizeData,
  brandData,
  cartData,
  colorData
};
