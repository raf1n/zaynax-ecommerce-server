const Product = require("./product.model");

const createProductService = async (payload, imageData) => {
  const data = {
    ...payload,
    image: imageData?.url,
  };

  const result = await Product.create(data);
  return result;
};

const getActiveProductsService = async (searchQuery) => {
  let query = { status: "active" };

  if (searchQuery) {
    const nameRegex = new RegExp(searchQuery, "i");

    const numericSearchQuery = parseFloat(searchQuery);

    if (!isNaN(numericSearchQuery)) {
      query.$or = [
        { price: numericSearchQuery },
        { discount: numericSearchQuery },
      ];
    } else {
      query.name = nameRegex;
    }
  }

  const products = await Product.find(query);
  return products;
};

const getAllProductsService = async () => {
  const products = await Product.find();
  return products;
};

const getProductByIdService = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

const updateProductService = async (productId, updateData, imageData) => {
  let updatedData = { ...updateData };

  // Checking if imageData.url exists and update the image field accordingly

  if (imageData && imageData.url) {
    updatedData.image = imageData.url;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true }
  );

  return updatedProduct;
};

const deleteProductService = async (productId) => {
  await Product.findByIdAndDelete(productId);
};

module.exports = {
  createProductService,
  getAllProductsService,
  getActiveProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
