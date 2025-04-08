// ManageProducts.js (React)
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "", image_path: null, oldImagePath: null });
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [postPerPage, setPostPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [newProductShow, setNewProductShow] = useState(false);
    const [cvupload, setCvupload] = useState(false);



 
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(product.stock).includes(searchQuery)
        );        
        setFilteredProducts(filtered);
    }, [products, searchQuery]);

    const fetchProducts = () => {
        console.log("Fetching products...");
        axios.get("http://localhost:5001/api/products")
            .then(res => {
                setProducts(res.data);
                setTotalPosts(res.data.length);
            })
            .catch(err => console.error("Error fetching products:", err));            
    };

    const handleChange = (e) => {
        if (e.target.name === "image_path") {
            setNewProduct({ ...newProduct, image_path: e.target.files[0] });
        } else {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
        }
    };

    const addProduct = async () => {
        console.log("Adding product:", newProduct);
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("stock", newProduct.stock);
        formData.append("category", newProduct.category);
        if (newProduct.image_path) {
            formData.append("image_path", newProduct.image_path);
        }

       await axios.post("http://localhost:5001/api/products", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log("Product added successfully:", res.data);
                setProducts([...products, res.data]);
                setNewProduct({ name: "", price: "", stock: "", category: "", image_path: null, oldImagePath: null });
            })
            .catch(err => { 
                console.error("Error adding product:", err.response?.data?.message || err.message);
                alert("Error adding product: " + err.response?.data?.message || err.message);});
    };
    
    const editProduct = (id) => {
        const productToEdit = products.find(product => product.id === id);
        if (productToEdit) {
            setNewProduct({ ...productToEdit, oldImagePath: productToEdit.image_path });
            setIsEditing(true);
        } else {
            console.error("Product not found for editing:", id);
        }
    };

    const saveProduct = () => {
        console.log("Saving product:", newProduct);
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("stock", newProduct.stock);
        formData.append("category", newProduct.category);
        if (newProduct.image_path) {
            formData.append("image_path", newProduct.image_path);
        }
        formData.append("oldImagePath", newProduct.oldImagePath);

        axios.put(`http://localhost:5001/api/products/${newProduct.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log("Product updated successfully:", res.data);
                setProducts(products.map(product =>
                    product.id === res.data.id ? res.data : product
                ));
                setNewProduct({ name: "", price: "", stock: "", category: "", image_path: null, oldImagePath: null });
                setIsEditing(false);
            })
            .catch(err => {
                console.error("Error updating product:", err.response?.data?.message || err.message);
                alert("Error updating product: " + (err.response?.data?.message || "Unknown error"));
            });
    };

    const deleteProduct = (id) => {
        console.log("Deleting product with ID:", id);
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        axios.delete(`http://localhost:5001/api/products/${id}`)
            .then(() => {
                console.log("Product deleted successfully:", id);
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(err => alert("Error deleting product: " + err.response?.data?.message || err.message));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const lines = text.split("\n").slice(1);
                const newProducts = lines.map(line => {
                    const [name, price, stock, category, image_path] = line.split(",");
                    return { name, price: parseFloat(price), stock: parseInt(stock), category, image_path: image_path };
                }).filter(product => product.name && !isNaN(product.price) && !isNaN(product.stock));

                if (newProducts.length > 0) {
                    Promise.all(newProducts.map(product =>
                        axios.post("http://localhost:5001/api/products", product)
                    ))
                        .then(responses => {                            
                            const addedProducts = responses.map(res => res.data);
                            console.log("Products imported successfully:", addedProducts);
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

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = filteredProducts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="container mx-auto p-4">

            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <div className="flex justify-end">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setNewProductShow(true)}
                >
                    Add Product
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setIsSearching(true)}
                >
                    Search
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setCvupload(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293 7.707a1 1 0 011.414 0L9 9.414V17a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 11-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3z" clipRule="evenodd" />
                    </svg>
                </button>
             
            </div>
            <div className="mb-4">
                {newProductShow && (
                    <form onSubmit={addProduct}>
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
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-2 mr-2 rounded"
                        />
                        <input
                            type="file"
                            name="image_path"
                            placeholder="Select Image"
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-2 mr-2 rounded"
                        />
                        <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
                         <button onClick={saveProduct} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Save Product</button>
                    </form>
                )}

<br />
                {isSearching && (
                <input
                    type="text"
                    placeholder="Search by name or stock"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 px-3 py-2 mr-2 rounded mt-2 mb-2"
                />
                )} 
                <br />
                {cvupload && (
                <input
                    type="file"
                    accept=".csv"
                    placeholder="Select a CSV file"
                    onChange={handleFileChange}
                    className="ml-4 border border-gray-300 px-3 py-2 rounded"
                />
                )}
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Image</th>
                        <th className="border border-gray-300 px-4 py-2">Product ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Stock</th>
                        <th className="border border-gray-300 px-4 py-2">Category</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map(product => (
                        <tr key={product.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">
                             
                                    <img src={product.image_path} alt={product.name} className="w-16 h-16 object-cover" />
                               
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-300 px-4 py-2">₹{product.price}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                <button onClick={() => editProduct(product.id)} className="bg-blue-500 text-white px-3 py-1 ml-2 rounded">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="mt-4 flex justify-center">
                {Array.from({ length: Math.ceil(filteredProducts.length / postPerPage) }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {page}
                    </button>
                ))}
            </div> */}
            <div className="mt-4 flex justify-center">
            <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {Array.from({ length: Math.ceil(totalPosts / postPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                    disabled={currentPage === Math.ceil(totalPosts / postPerPage)}
                >
                    Next
                </button>
            
            </div>
           


        </div>
    );
};

export default ManageProducts;
