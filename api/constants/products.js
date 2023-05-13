const PRODUCTS_BRANDS = {
  tea: {
    OOLONG: "oolong",
    DARK: 'dark',
    WHITE: 'white',
    GREEN: 'green',
    MIXES: 'mixes',
  },
  coffee: {
    INFUSED: "infused",
    BOILED: "boiled",
    VACUUM: "vacuum",
    ESPRESSO: "espresso",
  },
}

const PRODUCTS_TYPES = {
  TEA: 'tea',
  COFFEE: 'coffee',
}

const PRODUCTS_STATUSES = {
  ACTIVE: 'active',
  PENDING: 'pending',
  DISAPPROVED: 'disapproved',
  EXPIRED: 'expired',
}

module.exports = {
  PRODUCTS_STATUSES,
  PRODUCTS_BRANDS,
  PRODUCTS_TYPES
}