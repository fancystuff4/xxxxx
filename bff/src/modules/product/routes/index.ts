export enum DESKTOP_ROUTES {
    //Brands
    BRANDS = "desktop/brands",
    BRAND_WITH_PARAM = "desktop/brands/:id",
    BRAND_STATUS="desktop/brands/:id/active",
    BRAND_LOGOS ="desktop/brands/:id/logos",
    BRAND_LOGO_WITH_PARAM="desktop/brands/:id/logos/:logoId",

    //Category
    CATEGORIES = "desktop/categories",
    CATEGORY_WITH_PARAM = "desktop/categories/:id",
    CATEGORY_STATUS="desktop/categories/:id/active",
    CATEGORY_IMAGES ="desktop/categories/:id/images",
    CATEGORY_IMAGE_WITH_PARAM="desktop/categories/:id/images/:imageId",

    //SubCategory
    SUB_CATEGORIES = "desktop/categories/:id/sub-categories",
    SUB_CATEGORY_WITH_PARAM = "desktop/categories/:id/sub-categories/:subCategoryId",
    SUB_CATEGORY_STATUS="desktop/categories/:id/sub-categories/:subCategoryId/active",
    OPTION_WITH_PARAM="desktop/categories/:id/sub-categories/:subCategoryId/options/:optionId",
    OPTION_STATUS="desktop/categories/:id/sub-categories/:subCategoryId/options/:optionId/active",
    OPTIONS="desktop/categories/:id/sub-categories/:subCategoryId/options/",
    SUB_CATEGORY_IMAGES ="desktop/categories/:id/sub-categories/:subCategoryId/images",
    SUB_CATEGORY_IMAGE_WITH_PARAM ="desktop/categories/:id/sub-categories/:subCategoryId/images/:imageId",

    //Products
    PRODUCTS ="desktop/subCategories/:subCategoryId/products",
    PRODUCT_PAGINATE ="desktop/subCategories/:subCategoryId/all/products",
    PRODUCT_WITH_PARAM ="desktop/subCategories/:subCategoryId/products/:productId",
    PRODUCT_STATUS ="desktop/subCategories/:subCategoryId/products/:productId/active",
    PRODUCT_IMAGES ="desktop/subCategories/:subCategoryId/products/:productId/images",
    PRODUCT_IMAGE_WITH_PARAM="desktop/subCategories/:subCategoryId/products/:productId/images/:imageId",


    //Variants
    VARIANTS ="desktop/subCategories/:subCategoryId/products/:productId/variants",
    VARIANT_WITH_PARAM ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId",
    VARIANT_STATUS ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/active",
    VARIANT_OPTIONS ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/options",
    VARIANT_IMAGES_WITH_PARAM ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/images/:imageId",
    VARIANT_IMAGES ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/images",

}

export enum MOBILE_ROUTES {
    //Brands
    BRANDS = "mobile/brands",
    BRAND_WITH_PARAM = "mobile/brands/:id",
    BRAND_STATUS="mobile/brands/:id/active",
    BRAND_LOGOS ="mobile/brands/:id/logos",
    BRAND_LOGO_WITH_PARAM="mobile/brands/:id/logos/:logoId",

    //Category
    CATEGORIES = "mobile/categories",
    CATEGORY_WITH_PARAM = "mobile/categories/:id",
    CATEGORY_STATUS="mobile/categories/:id/active",
    CATEGORY_IMAGES ="mobile/categories/:id/images",
    CATEGORY_IMAGE_WITH_PARAM="mobile/categories/:id/images/:imageId",

    //SubCategory
    SUB_CATEGORIES = "mobile/categories/:id/sub-categories",
    SUB_CATEGORY_WITH_PARAM = "mobile/categories/:id/sub-categories/:subCategoryId",
    SUB_CATEGORY_STATUS="mobile/categories/:id/sub-categories/:subCategoryId/active",
    OPTION_WITH_PARAM="mobile/categories/:id/sub-categories/:subCategoryId/options/:optionId",
    OPTION_STATUS="mobile/categories/:id/sub-categories/:subCategoryId/options/:optionId/active",
    OPTIONS="mobile/categories/:id/sub-categories/:subCategoryId/options/",
    SUB_CATEGORY_IMAGES ="mobile/categories/:id/sub-categories/:subCategoryId/images",
    SUB_CATEGORY_IMAGE_WITH_PARAM ="mobile/categories/:id/sub-categories/:subCategoryId/images/:imageId",

    //Products
    PRODUCTS ="mobile/subCategories/:subCategoryId/products",
    PRODUCT_PAGINATE ="mobile/subCategories/:subCategoryId/all/products",
    PRODUCT_WITH_PARAM ="mobile/subCategories/:subCategoryId/products/:productId",
    PRODUCT_STATUS ="mobile/subCategories/:subCategoryId/products/:productId/active",
    PRODUCT_IMAGES ="mobile/subCategories/:subCategoryId/products/:productId/images",
    PRODUCT_IMAGE_WITH_PARAM="mobile/subCategories/:subCategoryId/products/:productId/images/:imageId",


    //Variants
    VARIANTS ="mobile/subCategories/:subCategoryId/products/:productId/variants",
    VARIANT_WITH_PARAM ="mobile/subCategories/:subCategoryId/products/:productId/variants/:variantId",
    VARIANT_STATUS ="mobile/subCategories/:subCategoryId/products/:productId/variants/:variantId/active",
    VARIANT_OPTIONS ="mobile/subCategories/:subCategoryId/products/:productId/variants/:variantId/options",
    VARIANT_IMAGES_WITH_PARAM ="mobile/subCategories/:subCategoryId/products/:productId/variants/:variantId/images/:imageId",
    VARIANT_IMAGES ="mobile/subCategories/:subCategoryId/products/:productId/variants/:variantId/images",

}
