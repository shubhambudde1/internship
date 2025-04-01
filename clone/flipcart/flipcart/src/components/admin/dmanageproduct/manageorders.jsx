import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        fetchProducts();
    }, []);

    // Update filtered products when products or searchQuery changes
    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(product.stock).includes(searchQuery)
        );
        setFilteredProducts(filtered);
    }, [products, searchQuery]);

    const fetchProducts = () => {
        axios.get("http://localhost:5001/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Error fetching products:", err));
    };

    // Handle input change
    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Add new product
    const addProduct = () => {
        axios.post("http://localhost:5001/api/products", newProduct)
            .then(res => {
                setProducts([...products, res.data]);
                setNewProduct({ name: "", price: "", stock: "" });
            })
            .catch(err => alert("Error adding product: " + err.response?.data?.message || err.message));
    };

    // Delete product
    const deleteProduct = (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        axios.delete(`http://localhost:5001/api/products/${id}`)
            .then(() => setProducts(products.filter(product => product.id !== id)))
            .catch(err => alert("Error deleting product: " + err.response?.data?.message || err.message));
    };

    // Edit product
    const editProduct = (id) => {
        const productToEdit = products.find(product => product.id === id);
        if (productToEdit) {
            setNewProduct({ ...productToEdit });
            setIsEditing(true);
        } else {
            console.error("Product not found for editing:", id);
        }
    };

    // Save product
    const saveProduct = () => {
        console.log("Saving product:", newProduct);
        if (!newProduct.id) {
            alert("Product ID is missing. Cannot update product.");
            return;
        }
        axios.put(`http://localhost:5001/api/products/${newProduct.id}`, newProduct)
            .then(res => {
                setProducts(products.map(product =>
                    product.id === newProduct.id ? res.data : product
                ));
                setNewProduct({ name: "", price: "", stock: "" });
                setIsEditing(false);
            })
            .catch(err => {
                console.error("Error updating product:", err.response?.data?.message || err.message);
                alert("Error updating product: " + (err.response?.data?.message || "Unknown error"));
            });
    };

    // Bulk import products from CSV
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const lines = text.split("\n").slice(1); // Skip header row
                const newProducts = lines.map(line => {
                    const [name, price, stock] = line.split(",");
                    return { name, price: parseFloat(price), stock: parseInt(stock) };
                }).filter(product => product.name && !isNaN(product.price) && !isNaN(product.stock)); // Validate data

                if (newProducts.length > 0) {
                    Promise.all(newProducts.map(product =>
                        axios.post("http://localhost:5001/api/products", product)
                    ))
                        .then(responses => {
                            const addedProducts = responses.map(res => res.data);
                            setProducts([...products, ...addedProducts]);
                            alert("Products imported successfully!");
                        })
                        .catch(err => alert("Error importing products: " + err.response?.data?.message || err.message));
                } else {
                    alert("No valid products found in the CSV file.");
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

            <div className="mb-4">
              
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-3 py-2 mr-2 rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleChange}
                    className="border border-gray-300 px-3 py-2 mr-2 rounded"
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={handleChange}
                    className="border border-gray-300 px-3 py-2 mr-2 rounded"
                />
                {!isEditing ? (
                    <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
                ) : (
                    <button onClick={saveProduct} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Save Product</button>
                )} <br />
                <input
                    type="text"
                    placeholder="Search by name or stock"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 px-3 py-2 mr-2 rounded mt-2 mb-2"
                /> <br />
                <input
                    type="file"
                    accept=".csv"
                    placeholder="Select a CSV file"
                    onChange={handleFileChange}
                    className="ml-4 border border-gray-300 px-3 py-2 rounded"
                />
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Stock</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-300 px-4 py-2">₹{product.price}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                <button onClick={() => editProduct(product.id)} className="bg-blue-500 text-white px-3 py-1 ml-2 rounded">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;
