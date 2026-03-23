// OP1: insertMany() — insert all 3 documents from sample_documents.json
db.products.insertMany([
  {
    product_id: "E1001",
    product_name: "Samsung Smart TV 55 inch",
    category: "Electronics",
    brand: "Samsung",
    price: 54999,
    stock: 18,
    specifications: {
      warranty_years: 2,
      voltage: "220-240V",
      screen_size: "55 inch",
      resolution: "4K UHD"
    },
    features: ["Smart TV", "WiFi", "HDR10+", "Voice Control"],
    seller: {
      seller_id: "S001",
      seller_name: "ElectroWorld"
    }
  },
  {
    product_id: "C2001",
    product_name: "Men's Cotton Casual Shirt",
    category: "Clothing",
    brand: "Allen Solly",
    price: 1899,
    stock: 75,
    specifications: {
      size_options: ["M", "L", "XL"],
      color: "Navy Blue",
      material: "100% Cotton",
      fit: "Regular Fit"
    },
    features: ["Breathable Fabric", "Machine Washable"],
    seller: {
      seller_id: "S002",
      seller_name: "FashionHub"
    }
  },
  {
    product_id: "G3001",
    product_name: "Organic Almond Milk 1L",
    category: "Groceries",
    brand: "Urban Platter",
    price: 325,
    stock: 120,
    expiry_date: new Date("2024-12-20"),
    nutritional_info: {
      calories_per_100ml: 42,
      protein_g: 1.2,
      fat_g: 3.1,
      carbohydrates_g: 2.4
    },
    ingredients: ["Water", "Almonds", "Sea Salt", "Natural Stabilizer"],
    seller: {
      seller_id: "S003",
      seller_name: "FreshCart"
    }
  }
]);

// OP2: find() — retrieve all Electronics products with price > 20000
db.products.find({
  category: "Electronics",
  price: { $gt: 20000 }
});

// OP3: find() — retrieve all Groceries expiring before 2025-01-01
db.products.find({
  category: "Groceries",
  expiry_date: { $lt: new Date("2025-01-01") }
});

// OP4: updateOne() — add a "discount_percent" field to a specific product
db.products.updateOne(
  { product_id: "E1001" },
  { $set: { discount_percent: 10 } }
);

// OP5: createIndex() — create an index on category field and explain why
db.products.createIndex({ category: 1 });

// This index improves query performance for category-based searches,
// especially when filtering products such as Electronics, Clothing, or Groceries.