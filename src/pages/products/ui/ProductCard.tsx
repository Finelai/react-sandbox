import type { FC, ReactElement } from 'react'

type TProductCard = {
  title: string
  origin: string
  price: number
  currency: string
  imageUrl: string
}

export const ProductCard: FC<TProductCard> = ({
  title,
  origin,
  price,
  currency,
  imageUrl,
}): ReactElement => {
  const formatPrice = (priceInCents: number, currencyCode: string): string => {
    const priceInUnits = priceInCents / 100
    const userLocale =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages[0]
        : navigator.language

    return new Intl.NumberFormat(userLocale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(priceInUnits)
  }

  return (
    <article className="product-card group relative rounded-lg overflow-hidden shadow-md border border-gray-200 max-w-xl mx-auto transition-transform mb-2 hover:shadow-lg xs:flex">
      <figure className="xs:w-2/5 p-4 bg-white flex items-center justify-center">
        <img
          src={`/images/products/${imageUrl}`}
          alt={`${title} image`}
          className="w-full h-auto object-cover rounded-md"
        />
      </figure>

      <section className="p-6 xs:w-3/5 flex flex-col justify-between">
        <header>
          <h2 className="text-xl font-semibold text-gray-100 mb-2">{title}</h2>
          <p className="text-sm text-gray-300 mb-4">{origin}</p>
        </header>

        <footer className="mt-auto mb-2">
          <p className="text-lg font-bold text-white">
            {formatPrice(price, currency)}
          </p>
        </footer>

        <button>Buy</button>
      </section>
    </article>
  )
}
