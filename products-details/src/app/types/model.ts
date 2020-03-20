export const pricingInfo = {
    budget: [
        "4k-6k",
        "5k-8k",
        "8k-11k"
    ],
    premier: [
        "23k-28k",
        "30k-34k",
        "35k-45k"
    ]
}

export interface Product {
    name: string,
    pricingTier: string,
    priceRange: string,
    weight: string,
    availability: number,
    productUrl: string,
    isEditable: boolean
}

export interface Products {
    products: Product[]
}