import { useCart } from "../../../contexts/CartContext";
import { Product } from "../../../types/main";
import { forwardRef, useState } from "react";

interface ProductCardProps {
  product: Product;
}

// Wrap the component using React.forwardRef to pass the ref
export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product }, ref) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
      addToCart(product._id as string, quantity);
    };


    return (
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="aspect-w-4 aspect-h-3">
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">${product.price}</span>

            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-2 py-1 border-r hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-2 py-1 border-l hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

