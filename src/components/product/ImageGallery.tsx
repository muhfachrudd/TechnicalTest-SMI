import { useState } from 'react'
import type { Product } from '../../types/product'

const placeholderImage = '/product-placeholder.svg'

interface ImageGalleryProps {
  readonly product: Product
}

export function ImageGallery({ product }: ImageGalleryProps) {
  const images = product.images.length > 0 ? product.images : [product.thumbnail]
  const [selectedImage, setSelectedImage] = useState(images[0] || placeholderImage)

  return (
    <div className="space-y-4">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 p-6">
        <img
          src={selectedImage || placeholderImage}
          alt={product.title}
          onError={(event) => {
            event.currentTarget.src = placeholderImage
          }}
          className="h-full w-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image || placeholderImage)}
              className={`aspect-square cursor-pointer overflow-hidden rounded-xl border-2 bg-gray-100 p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                selectedImage === image ? 'border-gray-900' : 'border-gray-200'
              }`}
              aria-label={`Tampilkan gambar ${index + 1}`}
            >
              <img
                src={image || placeholderImage}
                alt=""
                onError={(event) => {
                  event.currentTarget.src = placeholderImage
                }}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
