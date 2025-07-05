import type { FC, ReactElement } from 'react'

import { PRODUCTS } from '@shared/config'

import { ProductCard } from './ProductCard'

export const ProductsPage: FC = (): ReactElement => {
  return (
    <section>
      <h1 className="mb-2">Products:</h1>

      <div className="sm:flex gap-2">
        {PRODUCTS.map((item) => (
          <ProductCard {...item} />
        ))}
      </div>
    </section>
  )
}
