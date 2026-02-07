import { ProductCard } from '@/components/site/ProductCard';

type Product = {
  slug: string;
  title: string;
  priceGBP: number;
  image: string;
  stripePriceId?: string;
};

type MerchSectionProps = {
  products: Product[];
};

const formatPenceToGBP = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value / 100);

export function MerchSection({ products }: MerchSectionProps) {
  return (
    <section id="merch" className="section-space">
      <h2>Merch</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            title={product.title}
            price={formatPenceToGBP(product.priceGBP)}
            image={product.image}
            checkoutUrl={
              product.stripePriceId
                ? `/api/checkout?priceId=${encodeURIComponent(product.stripePriceId)}`
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}

