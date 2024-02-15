const {
  createProductService,
  getAllProductsService,
  getActiveProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} = require("./product.service");

const sendResponse = require("../../../shared/sendResponse");

const createProduct = async (req, res, next) => {
  try {
    const productImage = req.file;

    let imageData = {};

    if (productImage?.path) {
      imageData = {
        url: productImage?.path,
        public_id: productImage?.filename,
      };
    }

    const result = await createProductService(req.body, imageData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getActiveProducts = async (req, res, next) => {
  try {
    const products = await getActiveProductsService();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await getProductByIdService(productId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productImage = req.file;

    let imageData = {};

    if (productImage?.path) {
      imageData = {
        url: productImage?.path,
        public_id: productImage?.filename,
      };
    }

    const updatedProduct = await updateProductService(
      productId,
      req.body,
      imageData
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await deleteProductService(productId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getActiveProducts,
};
