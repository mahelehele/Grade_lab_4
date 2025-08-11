import React, { useState, useEffect } from "react";
import "./App.css"; // for basic styling

function App() {
  // State variables
  const [products, setProducts] = useState([]); // All products
  const [searchQuery, setSearchQuery] = useState(""); // Search text
  const [loading, setLoading] = useState(true); // Loading status
  const [error, setError] = useState(false); // Error status

  // Fetch products when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1> Product Catalogue</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />

      {/* Loading State */}
      {loading && <p>Loading products...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>Failed to load products.</p>}

      {/* No Results */}
      {!loading && !error && filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {/* Products Grid */}
      <div className="product-list">
        {!loading &&
          !error &&
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>💲 {product.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
