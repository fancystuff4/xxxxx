export enum DESKTOP_ROUTES {
    //Brands
    BRAND_WITH_NO_PARAM = "desktop/brands",
    BRAND_WITH_PARAM = "desktop/brands/:id",
    BRAND_STATUS="desktop/brands/:id/active",
    BRAND_LOGO_WITH_NO_PARAM ="desktop/brands/:id/logos",
    BRAND_LOGO_WITH_PARAM="desktop/brands/:id/logos/:logoId",

    //Category
    CATEGORY_WITH_NO_PARAM = "desktop/categories",
    CATEGORY_WITH_PARAM = "desktop/categories/:id",
    CATEGORY_STATUS="desktop/categories/:id/active",
    CATEGORY_IMAGE_WITH_NO_PARAM ="desktop/categories/:id/images",
    CATEGORY_IMAGE_WITH_PARAM="desktop/categories/:id/images/:imageId",

    //SubCategory
    SUB_CATEGORY_WITH_NO_PARAM = "desktop/categories/:id/sub-categories",
    SUB_CATEGORY_WITH_PARAM = "desktop/categories/:id/sub-categories/:subCategoryId",
    SUB_CATEGORY_STATUS="desktop/categories/:id/sub-categories/:subCategoryId/active",
    OPTION_WITH_PARAM="desktop/categories/:id/sub-categories/:subCategoryId/options/:optionId",
    OPTION_STATUS="desktop/categories/:id/sub-categories/:subCategoryId/options/:optionId/active",
    OPTION_WITH_NO_PARAM="desktop/categories/:id/sub-categories/:subCategoryId/options/",
    SUB_CATEGORY_IMAGE_WITH_NO_PARAM ="desktop/categories/:id/sub-categories/:subCategoryId/images",
    SUB_CATEGORY_IMAGE_WITH_PARAM ="desktop/categories/:id/sub-categories/:subCategoryId/images/:imageId",

    //Products
    PRODUCT_WITH_NO_PARAM ="desktop/subCategories/:subCategoryId/products",
    PRODUCT_WITH_PARAM ="desktop/subCategories/:subCategoryId/products/:productId",
    PRODUCT_STATUS ="desktop/subCategories/:subCategoryId/products/:productId/active",
    PRODUCT_IMAGE_WITH_NO_PARAM ="desktop/subCategories/:subCategoryId/products/:productId/images",
    PRODUCT_IMAGE_WITH_PARAM="desktop/subCategories/:subCategoryId/products/:productId/images/:imageId",


    //Variants
    VARIANT_WITH_NO_PARAM ="desktop/subCategories/:subCategoryId/products/:productId/variants",
    VARIANT_WITH_PARAM ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId",
    VARIANT_STATUS ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/active",
    VARIANT_OPTIONS ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/options",
    VARIANT_IMAGES_WITH_PARAM ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/images/:imageId",
    VARIANT_IMAGES_WITH_NO_PARAM ="desktop/subCategories/:subCategoryId/products/:productId/variants/:variantId/images",


}

