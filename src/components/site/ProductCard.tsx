import Image from 'next/image';

type ProductCardProps = {
  title: string;
  price: string;
  image: string;
  checkoutUrl?: string;
};

export function ProductCard({ title, price, image, checkoutUrl }: ProductCardProps) {
  const unavailable = !checkoutUrl;

  return (
    <article className="panel-card overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={640}
        height={640}
        className="h-64 w-full object-cover"
      />
      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-xl">{title}</h3>
          <p className="mt-2 text-text-muted">{price}</p>
        </div>
        {unavailable ? (
          <p className="text-sm text-text-muted">Unavailable</p>
        ) : (
          <a
            href={checkoutUrl}
            className="btn-quiet"
          >
            Checkout
          </a>
        )}
      </div>
    </article>
  );
}
