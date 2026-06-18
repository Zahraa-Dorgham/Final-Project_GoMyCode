import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './Shop.css';

const logos = [
  { name: 'nike', src: 'https://i.pinimg.com/webp70/736x/e7/65/04/e7650458fe434cd647eafb289a569fe2.webp' },
  { name: 'qnb', src: 'https://i.pinimg.com/1200x/f9/27/13/f927132a5384c176ea95d5c69725876f.jpg' },
  { name: 'adidas', src: 'https://i.pinimg.com/webp70/736x/85/e8/ac/85e8ac7e34fc40846fedd80dee7bec86.webp' },
  { name: 'new balence', src: 'https://i.pinimg.com/736x/e0/8c/de/e08cde2f956d6768fc44216a9b89ff6e.jpg' },
  { name: 'puma', src: 'https://i.pinimg.com/736x/ea/b2/f6/eab2f6607757689f5eba6aaac97a7118.jpg' },
  { name: 'crocs', src: 'https://i.pinimg.com/1200x/18/78/35/18783572533fd0a5db630a6036c06334.jpg' },
  { name: 'converce', src: 'https://i.pinimg.com/webp70/736x/a3/89/f0/a389f01c97d24df3fa1e26dd4af08e6b.webp' },
  { name: 'kappa', src: 'https://i.pinimg.com/1200x/fe/f8/72/fef872fc2eec48c89e27ec88f8f7c1f6.jpg' },
  { name: 'reebook', src: 'https://i.pinimg.com/1200x/49/a9/17/49a917dc23d53b51bcb2b459b5d35c8b.jpg' },
  { name: 'under armour', src: 'https://i.pinimg.com/736x/87/4a/06/874a060331d5329537f23f70a001dffb.jpg' },
];

const fallbackImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=900&q=80',
];

const formatPrice = (price) => {
  const amount = Number(price || 0);
  return `$${amount.toFixed(2)}`;
};

const getProductImages = (product, index = 0) => {
  const rawImages = [
    ...(Array.isArray(product.images) ? product.images : []),
    product.image,
    product.image2,
    product.image3,
  ];
  const images = rawImages.filter(Boolean);

  return images.length > 0 ? [...new Set(images)] : [fallbackImages[index % fallbackImages.length]];
};

const getProductOptions = (category) => {
  const normalizedCategory = (category || '').toLowerCase();

  if (normalizedCategory === 'clothes') {
    return ['XS', 'S', 'M', 'L', 'XL'];
  }

  if (normalizedCategory === 'shoes') {
    return ['37', '38', '39', '40', '41'];
  }

  return [];
};

const getProductOptionLabel = (category) => {
  const normalizedCategory = (category || '').toLowerCase();

  return normalizedCategory === 'shoes' ? 'Pointure' : 'Size';
};

function Shop() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  const infiniteLogos = useMemo(() => [...logos, ...logos], []);
  const categories = useMemo(() => {
    const productCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ['all', ...new Set(productCategories)];
  }, [products]);
  const filteredProducts = useMemo(() => {
    if (categoryFilter === 'all') {
      return products;
    }

    return products.filter((product) => product.category === categoryFilter);
  }, [categoryFilter, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shop/all');
        setProducts(response.data.products || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewProducts = () => {
    document.querySelector('.shop-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProduct = (product, index) => {
    const images = getProductImages(product, index);

    setSelectedProduct({ ...product, shopIndex: index });
    setSelectedImage(images[0]);
    setQuantity(1);
    setSize('');

    setTimeout(() => {
      document.querySelector('.shop-product-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const selectedImages = selectedProduct ? getProductImages(selectedProduct, selectedProduct.shopIndex) : [];
  const selectedOptions = selectedProduct ? getProductOptions(selectedProduct.category) : [];
  const selectedOptionLabel = selectedProduct ? getProductOptionLabel(selectedProduct.category) : 'Size';

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="shop-header-overlay">
          <h1 className="shop-header-title">Premium Fitness <br /> Equipment</h1>
          <p className="shop-header-text">Discover our exclusive collection of high-quality sports equipment and fitness products to enhance your training experience.</p>
          <button className="shop-view-btn" onClick={handleViewProducts}>View Products</button>
        </div>
      </div>

      <div className="logo-container">
        <div className="logo-brands">
          {infiniteLogos.map((logo, index) => (
            <img
              key={`${logo.name}-${index}`}
              src={logo.src}
              alt={logo.name}
              className="img-logo-brands"
            />
          ))}
        </div>
      </div>

      <section className="shop-products">
        {products.length > 0 ? (
          <div className="shop-category-filter" aria-label="Filtrer les produits par catégorie">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`shop-category-btn${categoryFilter === category ? ' active' : ''}`}
                onClick={() => setCategoryFilter(category)}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        ) : null}

        <div className="shop-products-grid">
          {filteredProducts.map((product, index) => {
            const productImage = getProductImages(product, index)[0];

            return (
              <article className="shop-product-card" key={product._id || product.name}>
                <button
                  type="button"
                  className="shop-product-image-btn"
                  onClick={() => handleSelectProduct(product, index)}
                  aria-label={`View ${product.name}`}
                >
                  <img src={productImage} alt={product.name} className="shop-product-image" />
                </button>
                <h2>{product.name}</h2>
                <p>{formatPrice(product.price)}</p>
                <button
                  type="button"
                  className="shop-select-btn"
                  onClick={() => handleSelectProduct(product, index)}
                >
                  Select options
                </button>
              </article>
            );
          })}
        </div>

        {products.length === 0 ? (
          <div className="shop-empty-state">
            <h2>Aucun produit disponible</h2>
            <p>Ajoutez des produits dans la base de données pour les afficher ici.</p>
          </div>
        ) : null}

        {products.length > 0 && filteredProducts.length === 0 ? (
          <div className="shop-empty-state">
            <h2>Aucun produit trouvé</h2>
            <p>Essayez une autre catégorie.</p>
          </div>
        ) : null}
      </section>

      {selectedProduct ? (
        <section className="shop-product-detail">
          <div className="shop-detail-gallery">
            <div className="shop-detail-thumbs">
              {selectedImages.map((image) => (
                <button
                  key={image}
                  type="button"
                  className={`shop-thumb-btn${selectedImage === image ? ' active' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={selectedProduct.name} />
                </button>
              ))}
            </div>
            <div className="shop-detail-main-image">
              <img src={selectedImage} alt={selectedProduct.name} />
            </div>
          </div>

          <div className="shop-detail-info">
            <h2>{selectedProduct.name}</h2>
            <p className="shop-detail-price">{formatPrice(selectedProduct.price)}</p>
            <p className="shop-detail-description">
              {selectedProduct.description || 'A premium fitness product selected to support your training routine with comfort and style.'}
            </p>

            {selectedOptions.length > 0 ? (
              <div className="shop-option-row">
                <label htmlFor="product-option">{selectedOptionLabel}</label>
                <select id="product-option" value={size} onChange={(event) => setSize(event.target.value)}>
                  <option value="">Choose an option</option>
                  {selectedOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ) : null}

            <div className="shop-cart-row">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                aria-label="Quantity"
              />
              <button type="button" className="shop-add-cart-btn">Add to cart</button>
            </div>

            <div className="shop-detail-meta">
              <p><strong>SKU:</strong> {selectedProduct._id?.slice(-6).toUpperCase() || 'SHOP01'}</p>
              <p><strong>Categories:</strong> {selectedProduct.category || 'Sport'}</p>
              <p><strong>Tags:</strong> {selectedProduct.category || 'sport'}, fitness</p>
            </div>
          </div>

          <div className="shop-detail-tabs">
            <button type="button" className="active">Description</button>
            <button type="button">Additional information</button>
            <button type="button">Reviews (0)</button>
          </div>

          <p className="shop-detail-long-description">
            {selectedProduct.description || 'This product is designed for active training days, combining a clean athletic look with dependable everyday performance.'}
          </p>
        </section>
      ) : null}
    </div>
  );
}

export default Shop;
