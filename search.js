let api = [];
const apiDocListSize = 1
api.push({
    name: 'default',
    order: '1',
    list: []
})
api[0].list.push({
    alias: 'ProductVariationPriceDetailController',
    order: '1',
    link: 'productvariationpricedetailcontroller',
    desc: 'ProductVariationPriceDetailController',
    list: []
})
api[0].list[0].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/priceDetail/{variationPriceDetailId}',
    methodId: 'bc35bf72f0d730ef3fcafdee62d3b447',
    desc: 'updateProductVariationPriceDetail',
});
api[0].list[0].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/priceDetail',
    methodId: 'f102faae84d2c3b316032d20b84855e1',
    desc: 'addProductVariationPriceDetail',
});
api[0].list.push({
    alias: 'ProductTemplateController',
    order: '2',
    link: 'product_template_management',
    desc: 'Product Template Management',
    list: []
})
api[0].list[1].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/product-templates',
    methodId: 'a6e57f4047184bf054739489c9a61e4f',
    desc: 'List product templates',
});
api[0].list[1].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/product-templates/by-category/{categoryId}',
    methodId: '86b6029b9b3ff8785595616a70773dd9',
    desc: 'Get effective template for a category',
});
api[0].list[1].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/product-templates/{id}',
    methodId: '8c7f3855d4ba2d01472f397ca16f8b93',
    desc: 'Get product template by ID',
});
api[0].list[1].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/product-templates',
    methodId: 'd387d916c67bdaa613bd9efc8a35f749',
    desc: 'Create a product template',
});
api[0].list[1].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/product-templates/{id}',
    methodId: 'd1004411bf8af7ae47dc97790878e506',
    desc: 'Update a product template',
});
api[0].list[1].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/product-templates/{id}',
    methodId: '7d572bc5b871112832dbf34f96d17e2e',
    desc: 'Delete a product template',
});
api[0].list.push({
    alias: 'PaymentGatewayController',
    order: '3',
    link: 'payment_gateway',
    desc: 'Payment Gateway',
    list: []
})
api[0].list[2].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-gateway/verify-account-number',
    methodId: 'd4d1c632ee43f79d7df127df11d76db8',
    desc: 'Resolve Account Number:',
});
api[0].list.push({
    alias: 'PromoAdController',
    order: '4',
    link: 'promo_ad_api',
    desc: 'Promo Ad API',
    list: []
})
api[0].list[3].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads',
    methodId: '23eed6e3541e4cbc09bdf0129d92443f',
    desc: 'Create Promo Ad',
});
api[0].list[3].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}',
    methodId: '69b2d7ea2d37424761aa9e7c8d72864d',
    desc: 'Update Promo Ad',
});
api[0].list[3].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}',
    methodId: '298a4eb3c41986e6821fab71931a4c68',
    desc: 'Get Promo Ad by ID',
});
api[0].list[3].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads',
    methodId: 'f13c7e1d13cc5b393d3702b48a075410',
    desc: 'Fetch Promo Ads.',
});
api[0].list[3].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/published',
    methodId: 'cd217d4055c74776194690e9f3872f96',
    desc: 'Fetch Published Promo Ads.',
});
api[0].list[3].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/update/{id}/status/{status}',
    methodId: '13b7e0487de6e60a3fe85e3dc4786f92',
    desc: 'Update Promo Ad Status.',
});
api[0].list[3].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}',
    methodId: 'ed7c384e95e33647a103b367b3a75626',
    desc: 'Delete Promo Ad.',
});
api[0].list.push({
    alias: 'CustomerOrderController',
    order: '5',
    link: 'customer_order_management',
    desc: 'Customer Order Management',
    list: []
})
api[0].list[4].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders',
    methodId: 'b66b31c3d59d0d391208de9a62871916',
    desc: 'Fetch Customer Orders.',
});
api[0].list[4].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders/{customerId}',
    methodId: '6397e5deffc3327c96c4929f45088396',
    desc: 'Fetch Customer Orders.',
});
api[0].list[4].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders/{orderId}/items',
    methodId: '7960689c6019705dc812e3c49bf9b5fe',
    desc: 'Fetch Order Items. This API retrieves a list of items in a specific order.',
});
api[0].list.push({
    alias: 'CartController',
    order: '6',
    link: 'cart_management',
    desc: 'Cart Management',
    list: []
})
api[0].list[5].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/items',
    methodId: '9ae9ec28b44b18de5cee10d716ab2840',
    desc: 'List Items In Cart.',
});
api[0].list[5].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/add',
    methodId: '7eef633926c0c939dc677a337abc56b9',
    desc: 'Add Item To Cart.',
});
api[0].list[5].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/remove/{carItemId}',
    methodId: 'eeb2a371071485fa427d8467c5dc0d44',
    desc: 'Remove Item From Cart.',
});
api[0].list[5].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/item/increment/quantity/{cartId}',
    methodId: '38371979b0f11857aa41843a413ae468',
    desc: 'Increment Item Quantity.',
});
api[0].list[5].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/item/decrement/quantity/{cartId}',
    methodId: '52ee31353e7b87f668cfacb6780f3324',
    desc: 'Decrement Item Quantity.',
});
api[0].list[5].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/clear',
    methodId: '1082d8e90f239d66e4285d93d7b8224f',
    desc: 'Clear Cart.',
});
api[0].list[5].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/checkout',
    methodId: '512864f9afbe838ddb4c3e41fbc1393d',
    desc: 'Checkout Cart.',
});
api[0].list[5].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/guest/checkout',
    methodId: 'a144f0800c383e972d4a58052cc0538b',
    desc: 'Guest Checkout Cart.',
});
api[0].list.push({
    alias: 'ProductVariationController',
    order: '7',
    link: 'product_variation_management_(authenticated)',
    desc: 'Product Variation Management (Authenticated)',
    list: []
})
api[0].list[6].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/{variationId}',
    methodId: 'eeba27bda64a6edbb072f89fde7b6464',
    desc: 'Update Product Variation',
});
api[0].list[6].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/add',
    methodId: '7e4197fdd958a5e793a72991e00218f3',
    desc: 'Add Product Variation',
});
api[0].list.push({
    alias: 'CategoryController',
    order: '8',
    link: 'categorycontroller',
    desc: 'CategoryController',
    list: []
})
api[0].list[7].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/categories',
    methodId: '5dfef8e3459afb0677c75009a06194ce',
    desc: 'getAllCategories',
});
api[0].list.push({
    alias: 'PromotionController',
    order: '9',
    link: 'promotion_management.',
    desc: 'Promotion management.',
    list: []
})
api[0].list[8].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/apply/promo-code',
    methodId: 'a2d5739d4472bb583e47748d82896acd',
    desc: 'Apply Promo Code',
});
api[0].list[8].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions',
    methodId: 'b57c71d78cdc01959d4d458dc8e7fb1b',
    desc: 'Create Promotion',
});
api[0].list[8].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions',
    methodId: 'b9c21bdfd17324306ec0d10f816e6d8e',
    desc: 'Fetch All Promotions',
});
api[0].list[8].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}',
    methodId: 'c9b52db21f462ea9831779f011389aa6',
    desc: 'Show Promotion',
});
api[0].list[8].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}',
    methodId: '98d861e9e3d65e5407ed810786739bd6',
    desc: 'Update Promotion',
});
api[0].list[8].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}',
    methodId: '29bfe16c867583b219d236894d08c475',
    desc: 'Delete Promotion',
});
api[0].list.push({
    alias: 'LocationController',
    order: '10',
    link: 'locationcontroller',
    desc: 'LocationController',
    list: []
})
api[0].list[9].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/locations/countries',
    methodId: '3249608bc332dc37d1c3176588276637',
    desc: 'getCountries',
});
api[0].list[9].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/locations/states/{countryCode}',
    methodId: 'b4cf55c444ba9938e5515f3f499bbcf5',
    desc: 'getStates',
});
api[0].list.push({
    alias: 'ReviewController',
    order: '11',
    link: 'reviewcontroller',
    desc: 'ReviewController',
    list: []
})
api[0].list[10].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews',
    methodId: '0b9965cf3cce5830354d4463be7b296f',
    desc: 'Get All Reviews',
});
api[0].list[10].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/product/{productId}',
    methodId: '0b5112181d406b277bd044cd3781d98e',
    desc: 'Get Product Reviews',
});
api[0].list[10].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/add',
    methodId: '562f22d968bf15eda9978b126994a902',
    desc: 'Create/Submit Product Review',
});
api[0].list[10].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/{reviewId}',
    methodId: '0595ea2ae24a3a218bc889f89b1b00c6',
    desc: 'Delete Review',
});
api[0].list[10].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/hide/{reviewId}',
    methodId: '2fd9b7fcf0ea359a151d8ddf0ddd0198',
    desc: 'Hide Review',
});
api[0].list.push({
    alias: 'ColorController',
    order: '12',
    link: 'colorcontroller',
    desc: 'ColorController',
    list: []
})
api[0].list[11].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/colors',
    methodId: '7d7d0ff6e3ffda2ce913650eb06f7028',
    desc: 'getAllColors',
});
api[0].list.push({
    alias: 'VariationController',
    order: '13',
    link: 'variationcontroller',
    desc: 'VariationController',
    list: []
})
api[0].list[12].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/variations',
    methodId: '5d22058e1fd7f0d17a50bb5b5792f887',
    desc: 'createVariation',
});
api[0].list.push({
    alias: 'StatSnapshotController',
    order: '14',
    link: 'statsnapshotcontroller',
    desc: 'StatSnapshotController',
    list: []
})
api[0].list[13].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/stats/snapshots',
    methodId: 'ac6cfbff69c709594788e82f8db188cb',
    desc: 'Get Recent Snapshots by Domain Retrieves the most recently created snapshots for the current tenant. Useful for the &quot;Recent Reports&quot; section of the dashboard.',
});
api[0].list[13].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/stats/snapshots/{id}/invalidate',
    methodId: '53b61fc7ae7e7848d42713d62d13101a',
    desc: 'Invalidate Snapshot Invalidates a range of snapshots and triggers a re-computation. Limited to 3 invalidations per day per tenant to prevent abuse.',
});
api[0].list.push({
    alias: 'AnalyticsController',
    order: '15',
    link: 'analyticscontroller',
    desc: 'AnalyticsController',
    list: []
})
api[0].list[14].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/analytics/events',
    methodId: 'a03ccb1bb278cc4c54077cb8238f3951',
    desc: 'ingest',
});
api[0].list.push({
    alias: 'PasswordlessAuthController',
    order: '16',
    link: 'password-less_authentication.',
    desc: 'Password-less Authentication.',
    list: []
})
api[0].list[15].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/initiate',
    methodId: '0d5a462750d73eec3651df2c3486b367',
    desc: 'Initiate Password-less Authentication.',
});
api[0].list[15].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/initiate/email',
    methodId: '473e261a50f6f954804f26cf7707326d',
    desc: 'Initiate Password-less email Authentication.',
});
api[0].list[15].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/initiate/phone',
    methodId: '824368cbac6468eeaa36faf531bf42ba',
    desc: 'Initiate Password-less Phone number Authentication .',
});
api[0].list[15].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-email',
    methodId: 'bfd34cccaba8fdb773d59ebded1856bc',
    desc: 'Verify Merchant Email.',
});
api[0].list[15].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-phone',
    methodId: 'da0cac51e1636d36fe07710dc691e1b9',
    desc: 'Verify Merchant Phone.',
});
api[0].list[15].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/customer/verify-email',
    methodId: 'd98bef387ac812b14f55b0a44f1b2e23',
    desc: 'Verify Customer Email.',
});
api[0].list[15].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/customer/verify-phone',
    methodId: '5281e197ed23cfbefafe74d053d1067a',
    desc: 'Verify Customer Phone.',
});
api[0].list.push({
    alias: 'CustomerController',
    order: '17',
    link: 'customercontroller',
    desc: 'CustomerController',
    list: []
})
api[0].list[16].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers',
    methodId: 'fae2c9b5de1cfb53d7996eeafeccee27',
    desc: 'Get All Customers',
});
api[0].list[16].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/profile',
    methodId: '11b7ce0b35465a5a7b1c6380ae02e8e3',
    desc: 'Get Authenticated Customer Profile',
});
api[0].list[16].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}',
    methodId: '456c7ae2d880abc457b287956376348c',
    desc: 'Get Specific Customer (Shop Owner View)',
});
api[0].list[16].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}/deactivate',
    methodId: '0abd05f73267bf8fa84c42b161f47f45',
    desc: 'Deactivate Customer Account',
});
api[0].list[16].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}/activate',
    methodId: '23167bd3010adc9f4f13d6179e97eede',
    desc: 'Activate Customer Account',
});
api[0].list[16].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/signup',
    methodId: 'a07a4635daa35aafa41b7cbe6e6f6ceb',
    desc: 'Register New Customer',
});
api[0].list[16].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/profile/update',
    methodId: '869066a7136dfcb2e62f7cc777f43fdf',
    desc: 'Update Customer Profile',
});
api[0].list[16].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/order-based',
    methodId: '6144a9e12bb5dc9f49dc7533aae3957c',
    desc: 'Get Order-Based Customers',
});
api[0].list.push({
    alias: 'MerchantBankAccountController',
    order: '18',
    link: 'merchantbankaccountcontroller',
    desc: 'MerchantBankAccountController',
    list: []
})
api[0].list[17].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts',
    methodId: '0f5c2dfded13946ddb68fe01da99eb2e',
    desc: 'addBankDetails',
});
api[0].list[17].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts',
    methodId: '459e7fc66e389094f7859f4ce727a3ba',
    desc: 'getBankAccounts',
});
api[0].list[17].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts/{id}/promote',
    methodId: 'aca8fb6edc4108a6879f83a60236a371',
    desc: 'promoteToPrimary',
});
api[0].list[17].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts/{id}/disable',
    methodId: 'eb73ce8728305c68aaa009f3c47f2ce4',
    desc: 'disableBankAccount',
});
api[0].list.push({
    alias: 'EmailVerificationController',
    order: '19',
    link: 'email_verification',
    desc: 'Email Verification',
    list: []
})
api[0].list[18].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/email/merchant/verify',
    methodId: '090d110b891d967f6bdefae8a25c2587',
    desc: 'Verify Merchant Email',
});
api[0].list[18].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/email/merchant/initiate/verification',
    methodId: 'f852376784a2c56aa21a990832bd2e32',
    desc: 'Initiate Merchant Email Verification',
});
api[0].list.push({
    alias: 'DashboardController',
    order: '20',
    link: 'dashboardcontroller',
    desc: 'DashboardController',
    list: []
})
api[0].list[19].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/orders',
    methodId: '8aac152c6dd4da49394fd6c98fd816ec',
    desc: 'Get Order Overview  Retrieves the high-level order statistics and breakdowns.',
});
api[0].list[19].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/orders/chart',
    methodId: '10c5646c99950da4ae584d2f1102a567',
    desc: 'Get Order Volume Chart  Retrieves the daily chart data for order volumes.',
});
api[0].list[19].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/revenue',
    methodId: 'a95efd27a1ca50cf069146de1073817b',
    desc: 'Get Revenue Overview  Retrieves revenue statistics including totals, averages, and payment method breakdowns.',
});
api[0].list[19].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/revenue/chart',
    methodId: '7e3de794abc5a5ce8f2dcb03d2312f96',
    desc: 'Get Revenue Chart  Retrieves the daily chart data for revenue.',
});
api[0].list[19].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/customers',
    methodId: '513dcaba6bcc0b4465c728568509340d',
    desc: 'Get Customer Insights  Retrieves customer statistics including top spenders and location breakdown.',
});
api[0].list[19].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/products',
    methodId: '9ddabf8d473b46c353c9f3ca0bf9880e',
    desc: 'Get Product Insights  Retrieves product insights including overall catalog numbers and top selling items.',
});
api[0].list[19].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/inventory',
    methodId: 'd93cb2674063fd865655af5ffe64e48c',
    desc: 'Get Inventory Insights  Retrieves inventory health metrics: total stock quantities, low-stock and out-of-stock counts, total inventory value, and a per-warehouse breakdown.',
});
api[0].list[19].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/sales/monthly-chart',
    methodId: 'bfe8d011d1faf80b6558ec35a3507fcc',
    desc: 'Get Monthly Sales Chart  Retrieves the monthly chart data for sales (volume and revenue) for a specific year.',
});
api[0].list[19].list.push({
    order: '9',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/overview/summary',
    methodId: '83b230c57f2567f00688a3d96938207a',
    desc: 'Get Dashboard Overview Summary',
});
api[0].list[19].list.push({
    order: '10',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/overview/sales-chart',
    methodId: '590aa611a62d1f819088e73aa63e6a3e',
    desc: 'Get Overview Sales Chart',
});
api[0].list[19].list.push({
    order: '11',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/overview/low-stock',
    methodId: '8ad7c0cced626dd55a4fa925bbfd9e01',
    desc: 'Get Low-Stock Products Panel',
});
api[0].list[19].list.push({
    order: '12',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/inventory/performance',
    methodId: 'ca9505f9a954593e74d359edfd5ec69f',
    desc: 'Get Inventory Performance Panel',
});
api[0].list[19].list.push({
    order: '13',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/overview/abandoned-carts',
    methodId: '24a7ffc31ee8720a7b1a86ed8c8941ea',
    desc: 'Get Abandoned Carts Panel',
});
api[0].list[19].list.push({
    order: '14',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/payments',
    methodId: '2f74a9dc8ede237e43490f45a56b9ad4',
    desc: 'Get Payment Metrics',
});
api[0].list[19].list.push({
    order: '15',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/payments/chart',
    methodId: '9a05588e827cf1fabe2048d94454ab0a',
    desc: 'Get Payment Status Chart',
});
api[0].list.push({
    alias: 'CustomerAuthController',
    order: '21',
    link: 'customer_authentication',
    desc: 'Customer Authentication',
    list: []
})
api[0].list[20].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/signup',
    methodId: '26525736959fc67d40c2ec6baba01c8e',
    desc: 'Register Customer.',
});
api[0].list[20].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/refresh-token',
    methodId: '8bb81d1919d6a0298b887b73ea4d6bee',
    desc: 'Login Customer',
});
api[0].list.push({
    alias: 'WhatsAppWebhookController',
    order: '22',
    link: 'whatsappwebhookcontroller',
    desc: 'WhatsAppWebhookController',
    list: []
})
api[0].list[21].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp/send-template',
    methodId: '53f5e9c1bf694beb4d521caee07aa266',
    desc: 'Send a template message to initiate or re-establish a connection.',
});
api[0].list[21].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp',
    methodId: '6d0c5cdc794b217d2102b8f5fb6aea24',
    desc: 'verifyWebhook',
});
api[0].list[21].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp',
    methodId: '13b422174db718b58e8f4ef067151a3f',
    desc: 'receiveMessage',
});
api[0].list.push({
    alias: 'StateController',
    order: '23',
    link: 'statecontroller',
    desc: 'StateController',
    list: []
})
api[0].list[22].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/states/{countryId}',
    methodId: 'abf63e23b503e47ae7e35c42493c5661',
    desc: 'index',
});
api[0].list.push({
    alias: 'ComplianceController',
    order: '24',
    link: 'tenant_compliance_management',
    desc: 'Tenant Compliance Management',
    list: []
})
api[0].list[23].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/profile',
    methodId: '7e83ce029de141a722b2854098408b5b',
    desc: 'Get Business Profile',
});
api[0].list[23].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/status',
    methodId: '8de9039399d35ed4948edd79dc04d096',
    desc: 'Get Business Compliance Status',
});
api[0].list[23].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/profile',
    methodId: '22c803391d364cc84b6897cd5cc6efe7',
    desc: 'Update Business Profile',
});
api[0].list[23].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/contact/detail',
    methodId: '333c7f4d381f3c513706c09f19d4d383',
    desc: 'Get Business Contact',
});
api[0].list[23].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/submit',
    methodId: '7c94217b763b1423f6b23881142d6b54',
    desc: 'Submit Compliance for Review',
});
api[0].list[23].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/contact/detail',
    methodId: 'd4d66c8be17a89a1ef9b0a0dea8fd040',
    desc: 'Update Business Contact',
});
api[0].list.push({
    alias: 'MonnifyWebhookController',
    order: '25',
    link: 'monnifywebhookcontroller',
    desc: 'MonnifyWebhookController',
    list: []
})
api[0].list[24].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/monnify',
    methodId: '985612f542771efebd76417e8ae3a45f',
    desc: 'handleWebhook',
});
api[0].list.push({
    alias: 'AdminInventoryController',
    order: '26',
    link: 'internal_admin_endpoints_for_inventory_management. these_endpoints_are_not_exposed_to_merchant_users.',
    desc: 'Internal admin endpoints for inventory management. These endpoints are not exposed to merchant users.',
    list: []
})
api[0].list[25].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/admin/inventory/tenants/{tenantId}/enable',
    methodId: 'b6f2de16fc79a28363334b7cce77c3d4',
    desc: 'Enables inventory tracking for a V1 tenant.',
});
api[0].list.push({
    alias: 'CheckoutLinkController',
    order: '27',
    link: 'checkoutlinkcontroller',
    desc: 'CheckoutLinkController',
    list: []
})
api[0].list[26].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/checkout-links',
    methodId: '217f47d045566e13055efc8f2022caea',
    desc: 'generateCheckoutLink',
});
api[0].list[26].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/checkout-links/order/{orderId}',
    methodId: 'b0a6321cbb7f427bebe8280eb9e7a0a0',
    desc: 'getOrderDetails',
});
api[0].list.push({
    alias: 'CountryController',
    order: '28',
    link: 'countrycontroller',
    desc: 'CountryController',
    list: []
})
api[0].list[27].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/countries',
    methodId: '92859af28e035c3955dddb41c3cff82f',
    desc: 'getAllCountries',
});
api[0].list.push({
    alias: 'TenantStoreController',
    order: '29',
    link: 'tenantstorecontroller',
    desc: 'TenantStoreController',
    list: []
})
api[0].list[28].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/store/settings',
    methodId: '52b62b1d67a09559db58dc4a53c13645',
    desc: 'Retrieve Store Settings',
});
api[0].list[28].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/store/settings',
    methodId: '1968c9cbf9cc1daaa4690ced2197e4c3',
    desc: 'Update Store Settings',
});
api[0].list[28].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/store/{slug}',
    methodId: '7b53c8d43359fe5ee6021a60783d10be',
    desc: 'Fetch Store Config',
});
api[0].list[28].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/store/check-slug/{slug}',
    methodId: 'a36e3014477c4db90cbfef59088cbae3',
    desc: 'Check if slug exists',
});
api[0].list[28].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/store/google-oauth-redirect',
    methodId: '691a7d99e83f6536c19f892e8c0f1f33',
    desc: 'patchGoogleOauthRedirectUrl',
});
api[0].list.push({
    alias: 'SpecificationController',
    order: '30',
    link: 'specification_management',
    desc: 'Specification Management',
    list: []
})
api[0].list[29].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/specifications',
    methodId: '46ce6f26556a2b372b4c1092ab6615ce',
    desc: 'getSpecifications',
});
api[0].list.push({
    alias: 'CommunicationMessageTemplateController',
    order: '31',
    link: 'compliance_rejectiontemplate_controller',
    desc: 'Compliance RejectionTemplate Controller',
    list: []
})
api[0].list[30].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/compliance/rejection-templates',
    methodId: '10623a5929ebc9058170c10407f3ea1e',
    desc: 'Create Compliance Rejection Template',
});
api[0].list[30].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/compliance/rejection-templates',
    methodId: '27eb40118b4c2e686ad927e4cff21170',
    desc: 'Get Active Compliance Rejection Templates',
});
api[0].list[30].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/compliance/rejection-templates/{code}',
    methodId: 'fd8772798064fd529968158b021c74f5',
    desc: 'Get Compliance Rejection Template by Code',
});
api[0].list.push({
    alias: 'ConfigController',
    order: '32',
    link: 'tenant_configuration_management',
    desc: 'Tenant Configuration Management',
    list: []
})
api[0].list[31].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/currentMode/{mode}',
    methodId: '04e57a6e750a85f91d71f7495b5ec135',
    desc: 'Update Current Mode',
});
api[0].list[31].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/domain',
    methodId: '68423828012c3af9c2e6a00662366531',
    desc: 'Update Domain',
});
api[0].list[31].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/domain',
    methodId: 'd377e1a2c0a098faa9c9523b638ccece',
    desc: 'Get Domains',
});
api[0].list[31].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/keys',
    methodId: '9afe865c81823e190deac0ddf7ced2e0',
    desc: 'Get Keys',
});
api[0].list[31].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/regenerate/keys/{mode}',
    methodId: '188775cb6746174329a37defaaab411b',
    desc: 'Generate Keys',
});
api[0].list.push({
    alias: 'HomeController',
    order: '33',
    link: 'homecontroller',
    desc: 'HomeController',
    list: []
})
api[0].list[32].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/health',
    methodId: '57285e31c4400dc59fb47f6c288b3536',
    desc: 'getHealth',
});
api[0].list[32].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/healths',
    methodId: '0103512c7c6cd0ce66467092691fc7ed',
    desc: 'getHealths',
});
api[0].list.push({
    alias: 'FileController',
    order: '34',
    link: 'file_management_(file_upload)',
    desc: 'File Management (File Upload)',
    list: []
})
api[0].list[33].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/files/upload/single/image',
    methodId: '15ae4b213f6a3636dec8b7fd22b36ea3',
    desc: 'Upload Single Image.',
});
api[0].list[33].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/files/upload/multiple/images',
    methodId: '3cf3e42903fc6c236c6fe3d8aba909ea',
    desc: 'Upload Multiple Images.',
});
api[0].list.push({
    alias: 'PaymentLinkController',
    order: '35',
    link: 'paymentlinkcontroller',
    desc: 'PaymentLinkController',
    list: []
})
api[0].list[34].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-links',
    methodId: 'c1877df44ddd9f96a6310064f33e6096',
    desc: 'Generate Payment Link',
});
api[0].list.push({
    alias: 'NotificationController',
    order: '36',
    link: 'notification_management',
    desc: 'Notification Management',
    list: []
})
api[0].list[35].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications',
    methodId: '29966480bfeb12d4d320160662f647dc',
    desc: 'Fetch All Notification',
});
api[0].list[35].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications/{id}/read',
    methodId: '92493af60b0d5cf9419998389e30aee4',
    desc: 'Mark Notification as Read',
});
api[0].list[35].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications/read-all',
    methodId: '09494bbfe19b3da32471eabf6d130382',
    desc: 'Mark all Notification as Read',
});
api[0].list[35].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications/{id}',
    methodId: '3c3907551f568a71af0b137b1ad3f1b5',
    desc: 'Delete Notification',
});
api[0].list.push({
    alias: 'ProductStatsController',
    order: '37',
    link: 'productstatscontroller',
    desc: 'ProductStatsController',
    list: []
})
api[0].list[36].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/product-stats',
    methodId: '88f27a82dd07c264b5cf9af461301994',
    desc: 'Get Top Selling Products (Public)  Retrieves a list of the most popular products based on total quantity sold. This endpoint is public-facing and omits sensitive business metrics.',
});
api[0].list[36].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/product-stats/top-by-quantity',
    methodId: 'a5b8bdbfda92020c44749dfe02210d9e',
    desc: 'Get Top Selling Products (Public)  Retrieves a list of the most popular products based on total quantity sold. This endpoint is public-facing and omits sensitive business metrics.',
});
api[0].list[36].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/product-stats/top-by-revenue',
    methodId: '34107413383e1524d850fa2ba3620218',
    desc: 'Get Top Selling Products base on revenue  Retrieves a list of the most popular products based on total revenue.',
});
api[0].list.push({
    alias: 'ChangePasswordController',
    order: '38',
    link: 'change_password_management_(authenticated)',
    desc: 'Change Password Management (authenticated)',
    list: []
})
api[0].list[37].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/change/password/customer',
    methodId: '12915658062bdc6a85b2c4bb124a7965',
    desc: 'Change Customer Password',
});
api[0].list[37].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/change/password/merchant',
    methodId: 'dea6b0e82069187a6eb7e62aa20ad9d3',
    desc: 'Change Merchant Password',
});
api[0].list.push({
    alias: 'BrandController',
    order: '39',
    link: 'brandcontroller',
    desc: 'BrandController',
    list: []
})
api[0].list[38].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/brands',
    methodId: '115e772d8da36d4d867fe9611d6a729a',
    desc: 'getAllBrands',
});
api[0].list.push({
    alias: 'AdminAuthController',
    order: '40',
    link: 'admin_authentication.',
    desc: 'Admin Authentication.',
    list: []
})
api[0].list[39].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/auth/login',
    methodId: '02150601c2b99ef398baebfc516d995d',
    desc: 'Login Admin User',
});
api[0].list[39].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/auth/profile',
    methodId: 'a4c54eda2d510f168cb7609c6e7abca4',
    desc: 'Get Admin User Profile',
});
api[0].list.push({
    alias: 'PaymentController',
    order: '41',
    link: 'payment_management',
    desc: 'Payment Management',
    list: []
})
api[0].list[40].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments',
    methodId: '7c5361a34da8b80f053a0046d79b2ad6',
    desc: 'Get All Payments',
});
api[0].list[40].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/order/{orderId}',
    methodId: '3b5ec24d972e71038197f4163e8beb9f',
    desc: 'Get Payment by Order ID',
});
api[0].list[40].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/initialize',
    methodId: '8ef0a005bbca6a4954cf34681e8b3ecf',
    desc: 'Initialize Customer Payment',
});
api[0].list[40].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/guest/initialize',
    methodId: 'e3a4f43efac78feffbefa60b250b1236',
    desc: 'Initialize Guest Payment',
});
api[0].list[40].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/confirm',
    methodId: '3105326759ca7a7334354b7811fb014e',
    desc: 'Verify and Confirm Payment',
});
api[0].list[40].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/{paymentId}/status',
    methodId: '79388ab405d77b003315b80d69f0cb9c',
    desc: 'Update Payment Status',
});
api[0].list[40].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/statuses',
    methodId: '32d30a3768f3c7897f32a58e2b4a4015',
    desc: 'Get All Payment Statuses',
});
api[0].list.push({
    alias: 'AuthController',
    order: '42',
    link: 'authentication.',
    desc: 'Authentication.',
    list: []
})
api[0].list[41].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/signup/merchant',
    methodId: '3043ac33af4d542a26de87becc6fb7ee',
    desc: 'Register Shop Owner',
});
api[0].list[41].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/login',
    methodId: 'fa19cf5b1eb76ca04b66b8999c0c57eb',
    desc: 'Login User (Shop Owner/Merchant)',
});
api[0].list[41].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/login/customer',
    methodId: 'c12f7a6d09d97c07b51e7e9aaa41a841',
    desc: 'Login Customer',
});
api[0].list[41].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/refresh-token',
    methodId: '65c9b3bf1513b624e910dab85bc1cd90',
    desc: 'Refresh Token',
});
api[0].list[41].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/logout',
    methodId: 'f7bbef0f36b36d226481dd3358059eaa',
    desc: 'logout',
});
api[0].list.push({
    alias: 'QAController',
    order: '43',
    link: 'qacontroller',
    desc: 'QAController',
    list: []
})
api[0].list[42].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/qa/scenarios/merchant-with-orders',
    methodId: '907b26b9ab8d4ace3f8933afa4a09f07',
    desc: 'seedMerchantWithOrders',
});
api[0].list[42].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/qa/scenarios/customer-with-orders',
    methodId: 'fa5cf436708f388866bbcf06cff5d832',
    desc: 'seedCustomerWithOrders',
});
api[0].list.push({
    alias: 'WhatsAppAuthController',
    order: '44',
    link: 'whatsapp_authentication',
    desc: 'Whatsapp Authentication',
    list: []
})
api[0].list[43].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/phone/initiate',
    methodId: '4fa19983afa5383b8859b165752d6d87',
    desc: 'Initiate OTP',
});
api[0].list[43].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/phone/verify',
    methodId: '94a2af74f5679ee9350885184d0b70d5',
    desc: 'Verify OTP',
});
api[0].list.push({
    alias: 'AdminComplianceController',
    order: '45',
    link: 'admin_compliance_management',
    desc: 'Admin Compliance Management',
    list: []
})
api[0].list[44].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/compliance/tenants/{tenantId}/review',
    methodId: 'f5ebc632ea8ef7db850e5c84977ef79e',
    desc: 'Review Compliance Submission',
});
api[0].list[44].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/compliance/tenants/{tenantId}',
    methodId: '39435fc9f0fc33df2db72349f7eaee77',
    desc: 'Get Tenant Compliance Details',
});
api[0].list[44].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/compliance/tenants/{tenantId}/override',
    methodId: '0eb272b4d2fa11ab57b37c61ec8d6f63',
    desc: 'Grant Compliance Override',
});
api[0].list[44].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/compliance/tenants/{tenantId}/override',
    methodId: 'e6638d25c753b33b0c9eeda2210b7628',
    desc: 'Revoke Compliance Override',
});
api[0].list.push({
    alias: 'ProductVariantGroupController',
    order: '46',
    link: 'manages_variant_groups_and_their_skus_for_v2_products.  &amp;lt;p&amp;gt;all_endpoints_are_scoped_under_{@code_/v2/products/{productid}/variant-groups}. v1_variation_endpoints_({@code_/v1/products/variation/*})_are_not_affected.',
    desc: 'Manages variant groups and their SKUs for V2 products.  &amp;lt;p&amp;gt;All endpoints are scoped under {@code /v2/products/{productId}/variant-groups}. V1 variation endpoints ({@code /v1/products/variation/*}) are NOT affected.',
    list: []
})
api[0].list[45].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/variant-groups',
    methodId: '16b93d7798bc4e40cd3db69f13f22ac6',
    desc: 'addVariantGroup',
});
api[0].list[45].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/variant-groups/{groupId}',
    methodId: 'aa31cf69b315620c6963dc32b3adcd28',
    desc: 'updateVariantGroup',
});
api[0].list[45].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/variant-groups/{groupId}',
    methodId: '6223e5e26fe55f8aa924732b93cdb498',
    desc: 'removeVariantGroup',
});
api[0].list[45].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/variant-groups/{groupId}/skus',
    methodId: '85e1839a0d6283e965dad43021cafdfc',
    desc: 'addSku',
});
api[0].list[45].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/variant-groups/{groupId}/skus/{skuId}',
    methodId: 'a42619fd14a195dc06fefaa7bf686050',
    desc: 'updateSku',
});
api[0].list[45].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/variant-groups/{groupId}/skus/{skuId}',
    methodId: '05ba232e57939fd0cc2896ac3de123b2',
    desc: 'removeSku',
});
api[0].list.push({
    alias: 'DeliveryZoneController',
    order: '47',
    link: 'delivery_zone_management',
    desc: 'Delivery Zone Management',
    list: []
})
api[0].list[46].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones',
    methodId: '1a83a9dee588c7424203b2e67d44d2ae',
    desc: 'Create Delivery Zone.',
});
api[0].list[46].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones',
    methodId: '80ce2161699b3fe57690f9f59f0292ad',
    desc: 'Get All Delivery Zones.',
});
api[0].list[46].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones/{id}',
    methodId: 'f17698c1f116a16283eab014c4bc2565',
    desc: 'Update Delivery Zone.',
});
api[0].list[46].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones/{id}',
    methodId: '6f4484dc94cea460ac67de61cf31009b',
    desc: 'Delete Delivery Zone.',
});
api[0].list.push({
    alias: 'MerchantController',
    order: '48',
    link: 'merchant_management',
    desc: 'Merchant Management',
    list: []
})
api[0].list[47].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/profile',
    methodId: 'd9a31bc791df9688c9f339f4489e1c96',
    desc: 'Get Merchant Profile.',
});
api[0].list[47].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/profile/business',
    methodId: 'dc42264d7e9318fa680f63c39d25535a',
    desc: 'Get Merchant Business Profile.',
});
api[0].list.push({
    alias: 'RoleController',
    order: '49',
    link: 'rolecontroller',
    desc: 'RoleController',
    list: []
})
api[0].list[48].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/roles',
    methodId: '6d7d3684c05dc9ff908d1f733e9fc270',
    desc: 'findAll',
});
api[0].list.push({
    alias: 'ProductV2Controller',
    order: '50',
    link: 'v2_product_management_—_supports_all_product_types_(simple,_variable,_digital,_bundle).',
    desc: 'V2 Product Management — supports all product types (SIMPLE, VARIABLE, DIGITAL, BUNDLE).',
    list: []
})
api[0].list[49].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products',
    methodId: '24e61687247897b9682ec852652fac0d',
    desc: 'allProducts',
});
api[0].list[49].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/slug/{slug}',
    methodId: 'ce90982a66da13f2522c1e72cbddbac1',
    desc: 'Get Product Details by slug',
});
api[0].list[49].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}',
    methodId: '6dbb893e0ecff2b845a8c0020a54a11c',
    desc: 'showProduct',
});
api[0].list[49].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products',
    methodId: '7fd50fd566df757e10e496c655ac3c9a',
    desc: 'createProduct',
});
api[0].list[49].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}',
    methodId: '80aeb7bb702a9f103e3b55256c7fd857',
    desc: 'updateProduct',
});
api[0].list[49].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}',
    methodId: 'ed49ec69e075ad5d3b22d0c36f273dc7',
    desc: 'deleteProduct',
});
api[0].list[49].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/archive',
    methodId: '46beb27b0a5e0bee7f0e6b837cdbb848',
    desc: 'Archive Product (V2)',
});
api[0].list[49].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/{productId}/unarchive',
    methodId: 'a5bc9364ac76aacc8ec96ba5cc115c24',
    desc: 'Unarchive Product (V2)',
});
api[0].list[49].list.push({
    order: '9',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/similar/by/category/{productId}',
    methodId: '9d0e2f1b077304170f3d8b90edc4a1eb',
    desc: 'getSimilarProducts',
});
api[0].list[49].list.push({
    order: '10',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/products/top-selling',
    methodId: 'cbbe9131c1532d5aff30d9c67d379d4c',
    desc: 'getTopSelling',
});
api[0].list.push({
    alias: 'TenantRoleController',
    order: '51',
    link: 'merchant-accessible_apis_for_roles_and_permissions_within_a_specific_store.  these_endpoints_are_tenant-scoped:_the_caller_must_be_the_store_owner_or a_member_with_the_can_read_role_permission._admin-only_roles_and non-merchant-visible_permissions_are_automatically_excluded_from_responses.',
    desc: 'Merchant-accessible APIs for roles and permissions within a specific store.  These endpoints are tenant-scoped: the caller must be the store owner or a member with the CAN_READ_ROLE permission. Admin-only roles and non-merchant-visible permissions are automatically excluded from responses.',
    list: []
})
api[0].list[50].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/roles',
    methodId: '58de4be69971b029ecddc19201aa4bcb',
    desc: 'Get Roles for a Store',
});
api[0].list[50].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/permissions',
    methodId: '499fa7f9a871fb62d4100d26c8276b95',
    desc: 'Get Merchant-Visible Permissions',
});
api[0].list[50].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/roles',
    methodId: '901557e33975034acc932a3f9eb9aa3a',
    desc: 'Create Custom Role',
});
api[0].list[50].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/roles/{roleId}',
    methodId: '897e36a50038fd924541c4b881e3c681',
    desc: 'Update Custom Role',
});
api[0].list[50].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/roles/{roleId}',
    methodId: '6ce8e52262ead41240f5d49346768b33',
    desc: 'Delete Custom Role',
});
api[0].list.push({
    alias: 'MerchantAppSettingController',
    order: '52',
    link: 'merchant_–_tenant_app_setting_management',
    desc: 'Merchant – Tenant App Setting Management',
    list: []
})
api[0].list[51].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/settings',
    methodId: '1a2b48f1c016338eaf792ca08639dc45',
    desc: 'List Tenant Settings',
});
api[0].list[51].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/settings/{key}/value',
    methodId: 'bad55c07724744e4d28280e585f7e89f',
    desc: 'Override a Tenant Setting Value',
});
api[0].list[51].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/settings/{key}',
    methodId: '202c5782371aea5b275227ff4aa0248d',
    desc: 'Delete a Tenant Setting Override',
});
api[0].list[51].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/settings/public',
    methodId: 'c7e2c60f8a6d2344d19caa18cab24091',
    desc: 'Get Public Settings for a Tenant (no auth required)',
});
api[0].list.push({
    alias: 'VariationOptionController',
    order: '53',
    link: 'variationoptioncontroller',
    desc: 'VariationOptionController',
    list: []
})
api[0].list[52].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/variation/options/{variationId}',
    methodId: 'c04465f75d6b12d3dfcbccd942add990',
    desc: 'getAllVariations',
});
api[0].list.push({
    alias: 'WarehouseController',
    order: '54',
    link: 'warehousecontroller',
    desc: 'WarehouseController',
    list: []
})
api[0].list[53].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/warehouses',
    methodId: 'd6590795f78fe5ab08b3423d3a8324f7',
    desc: 'list',
});
api[0].list[53].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/warehouses',
    methodId: 'ef45a6ef1dece692239d98b022ac9f4d',
    desc: 'create',
});
api[0].list[53].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/warehouses/{id}',
    methodId: 'b49dc535c5997cf7f4b74ac33f7e4664',
    desc: 'update',
});
api[0].list.push({
    alias: 'EmailPreviewController',
    order: '55',
    link: 'emailpreviewcontroller',
    desc: 'EmailPreviewController',
    list: []
})
api[0].list[54].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/merchant-welcome',
    methodId: '91d22fda29bb1628845c5a6535236aad',
    desc: 'previewWelcomeEmail',
});
api[0].list[54].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer-welcome',
    methodId: '11d333a76ac855af09b8af011f3a446e',
    desc: 'previewCustomerWelcomeEmail',
});
api[0].list[54].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/merchant-new-order/{orderId}',
    methodId: 'aeb17e7dcd1d83dbdf08eb34e4e350bc',
    desc: 'previewMerchantNewOrder',
});
api[0].list[54].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer-order-confirmation/{orderId}',
    methodId: '72e375ba0785f51d98507cb4271542a3',
    desc: 'previewCustomerOrderConfirmation',
});
api[0].list[54].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer-payment-confirmation/{paymentId}',
    methodId: '7e9f3c6e747a382236c950f4cf5da2df',
    desc: 'previewCustomerPaymentConfirmation',
});
api[0].list[54].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/forgot-password',
    methodId: '49f6642a9422fee89b9c82f7a14c030e',
    desc: 'previewForgotPassword',
});
api[0].list[54].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/password-reset-successful',
    methodId: '990f49cc06f43843251175a2dd770ac9',
    desc: 'previewResetPassword',
});
api[0].list[54].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer-abandoned-cart',
    methodId: '19487a4a0615e66d9e46854cb0e1cc77',
    desc: 'previewCustomerAbandonedCart',
});
api[0].list[54].list.push({
    order: '9',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/order-confirmation',
    methodId: 'bdbe00ffcb534d5dccc56b25b466df9e',
    desc: 'previewOrderConfirmation',
});
api[0].list[54].list.push({
    order: '10',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/order-status-update',
    methodId: '4416ab1d05f197eadc1a47424f9abc81',
    desc: 'previewOrderStatusUpdate',
});
api[0].list[54].list.push({
    order: '11',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/team-invitation',
    methodId: '7621d1ba2020b13705c5e107db3460ac',
    desc: 'previewTeamInvitation',
});
api[0].list[54].list.push({
    order: '12',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/team-member-removed',
    methodId: 'f77deb4839983c5868ada8bd20c2b869',
    desc: 'previewTeamMemberRemoved',
});
api[0].list.push({
    alias: 'ProductController',
    order: '56',
    link: 'product_management',
    desc: 'Product Management',
    list: []
})
api[0].list[55].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products',
    methodId: '7367c5f0dd8dd16e6bfccd29d9eb8678',
    desc: 'Get All Products',
});
api[0].list[55].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products',
    methodId: '735feb3e9a9ce56556975c5307c9f78b',
    desc: 'Create Product',
});
api[0].list[55].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/slug/{slug}',
    methodId: '804a958d9c52f1fdb4acc5db00bcfab0',
    desc: 'Get Product Details by slug',
});
api[0].list[55].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}',
    methodId: '6194664144efdaea0022b198fe20ac81',
    desc: 'Get Product Details',
});
api[0].list[55].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/similar/by/category/{productId}',
    methodId: '509618e9f12343d1220d6fba24136441',
    desc: 'Get Similar Products',
});
api[0].list[55].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}',
    methodId: 'ce9cb1aeb4fa7cf56917f0508ef6ef78',
    desc: 'Delete Product',
});
api[0].list[55].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}/rating',
    methodId: '51bd374fe26174d5f9a77bbc8d266bc2',
    desc: 'Get Product Rating  Retrieves the average customer rating for a product calculated from all customer reviews. Rating provides social proof and helps customers make purchase decisions.',
});
api[0].list[55].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/top-selling',
    methodId: '5f5b3030ba560fc3f6145cbe6daa9b87',
    desc: 'Get Top Selling Products (Public)  Retrieves a list of the most popular products based on total quantity sold. This endpoint is public-facing and omits sensitive business metrics.',
});
api[0].list.push({
    alias: 'InventoryController',
    order: '57',
    link: 'inventory_management manage_stock_levels_across_warehouses,_track_inventory_movements,_and_view low-stock_items. all_operations_are_tenant-scoped_and_require_merchant_access.',
    desc: 'Inventory Management Manage stock levels across warehouses, track inventory movements, and view low-stock items. All operations are tenant-scoped and require merchant access.',
    list: []
})
api[0].list[56].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory',
    methodId: '04d70a0ee2cef024a7d12c2144b4373a',
    desc: 'Get All Inventory Records',
});
api[0].list[56].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory/product/{productId}',
    methodId: 'd501eb0dc2f10e888a23605825c3dcef',
    desc: 'Get Inventory by Product',
});
api[0].list[56].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory/product/{productId}/sku/{skuId}',
    methodId: '439b9a20b18e37956b0813260adaaab4',
    desc: 'Get Stock by SKU',
});
api[0].list[56].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory/low-stock',
    methodId: '813b0b1e95335fe46110c0964b63d7ac',
    desc: 'List Low-Stock Items',
});
api[0].list[56].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory/logs',
    methodId: '44b0655bb6a4cccc18ccdbf1fa6cef82',
    desc: 'Get Inventory Logs',
});
api[0].list[56].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory',
    methodId: '8a1fc2a0f1ebf02aaeebd20af079e013',
    desc: 'Create Inventory Record',
});
api[0].list[56].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory/{id}/adjust',
    methodId: 'd2b7e1152697d8bdebf5415e4947267f',
    desc: 'Adjust Stock Quantity',
});
api[0].list[56].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory/{id}/reserve',
    methodId: 'a6787c051601cdf9c5f02826eb098d8a',
    desc: 'Reserve Stock for Order',
});
api[0].list[56].list.push({
    order: '9',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/inventory/{id}/release',
    methodId: '161d58371e01bd3ecea10e87b93b98f6',
    desc: 'Release Stock Reservation',
});
api[0].list.push({
    alias: 'UserController',
    order: '58',
    link: 'usercontroller',
    desc: 'UserController',
    list: []
})
api[0].list[57].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile',
    methodId: 'a661e39277999c9f6d51859946734b85',
    desc: 'Get User Profile',
});
api[0].list[57].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/compliance/detail',
    methodId: 'cca77495dc8e786cfd12c0ea23342262',
    desc: 'Get Business Owner Detail',
});
api[0].list[57].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile/with/role',
    methodId: 'b76aafbd39431c5efcd4f10dc747adca',
    desc: 'Get User Profile with Role',
});
api[0].list[57].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile/update',
    methodId: '17f3c0a159f6f7447923eb8db64544f7',
    desc: 'Update User Profile',
});
api[0].list[57].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/me/stores',
    methodId: '5f33d05dfa0fac5d1e529465c095b725',
    desc: 'Get My Stores',
});
api[0].list[57].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/me/switch-store',
    methodId: '983b41ee79ba2bd53d9c5280fab8d996',
    desc: 'Switch Active Store',
});
api[0].list.push({
    alias: 'OrderController',
    order: '59',
    link: 'order_management',
    desc: 'Order Management',
    list: []
})
api[0].list[58].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders',
    methodId: '8bca6265e4aba517ce0aeb6f72d333b1',
    desc: 'Get All Orders',
});
api[0].list[58].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderNumber}/show',
    methodId: '00015578a7f79090d8ec97abf7118a32',
    desc: 'Get Order by Order Number',
});
api[0].list[58].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/detail',
    methodId: '150f612186ab664c6ab4caa72ab1d5d6',
    desc: 'Get Order Detail for Merchant',
});
api[0].list[58].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/items',
    methodId: '5beeb8c23f5ead8f7c8be4e3430595f2',
    desc: 'Get Order Line Items',
});
api[0].list[58].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/status',
    methodId: '5cd3387860122d0ccdf8c9b4d72f2b5b',
    desc: 'Update Order Status',
});
api[0].list[58].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/force-status',
    methodId: '6f02f14a425f4ce53cc0541f93724acd',
    desc: 'Force Update Order Status (Admin Override)',
});
api[0].list[58].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/merchant/stats',
    methodId: 'a4b57f9ea9d653fe52e58a76bf9dd106',
    desc: 'Get Order Statistics',
});
api[0].list[58].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/statuses',
    methodId: '52a10d7e1c8863b3ea519094f25af790',
    desc: 'Get All Order Statuses',
});
api[0].list.push({
    alias: 'AdminUserController',
    order: '60',
    link: 'admin_user_management',
    desc: 'Admin User Management',
    list: []
})
api[0].list[59].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/users',
    methodId: '0022e8e0332cb323dabed8f594723a56',
    desc: 'List All Users',
});
api[0].list[59].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/users/{userId}',
    methodId: 'c492239808457bdd75b1ea10005c25f7',
    desc: 'Get User Detail',
});
api[0].list[59].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/users/{userId}/status',
    methodId: '10ab76cf9920bd2506b37ef21f96ccfd',
    desc: 'Update User Status',
});
api[0].list.push({
    alias: 'SocialAuthController',
    order: '61',
    link: 'socialauthcontroller',
    desc: 'SocialAuthController',
    list: []
})
api[0].list[60].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/social/google/merchant/initiate',
    methodId: '38f53e500d3aa680cb46aef13102e276',
    desc: 'Initiate Merchant Social Auth Generates a Google authorization URL for Merchants and redirects to the consent screen.  Account will be linked or a new store provisioned.',
});
api[0].list[60].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/social/google/customer/initiate',
    methodId: 'ba672c12b0f444bdc73e975d6e935c33',
    desc: 'Initiate Customer Social Auth Generates a Google authorization URL for Customers and redirects to the consent screen. Specific to the provided tenantId/store.',
});
api[0].list[60].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/social/google/callback',
    methodId: '564663d0a03ae776550fc534f56e53f7',
    desc: 'Social Auth Callback Securely processes the Google authorization code, resolving the user&apos;s role  and tenant from the state, then redirects to the storefront callback.',
});
api[0].list[60].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/social/google/merchant/verify',
    methodId: 'b7624463e7f131eb9ccb1d67f2e40a78',
    desc: 'Verify Merchant Social Token Verifies a Google ID token from a client SDK specifically for Merchant access.  Returns a session JWT upon successful verification.',
});
api[0].list[60].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/social/google/customer/verify',
    methodId: 'e32cd2a73bf51d7a978b6c6f9f1d5bc7',
    desc: 'Verify Customer Social Token Verifies a Google ID token from a client SDK for Customer access within a specific tenant. Returns a session JWT upon successful verification.',
});
api[0].list.push({
    alias: 'BankController',
    order: '62',
    link: 'bankcontroller',
    desc: 'BankController',
    list: []
})
api[0].list[61].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/banks',
    methodId: '8591a2856617028b24f44e437c2e8bf0',
    desc: 'getBanks',
});
api[0].list.push({
    alias: 'AdminCacheController',
    order: '63',
    link: 'admin_cache_management',
    desc: 'Admin Cache Management',
    list: []
})
api[0].list[62].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/cache',
    methodId: '00fafe9902fe2d5ba14c02f9a1c81571',
    desc: 'List All Named Caches',
});
api[0].list[62].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/cache',
    methodId: 'adf32d55e3392308fe646c91a993f4f3',
    desc: 'Clear All Named Caches',
});
api[0].list[62].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/cache/{cacheName}',
    methodId: '61901e9f38ea41be9080d8561a0ddd68',
    desc: 'Clear a Specific Named Cache',
});
api[0].list[62].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/cache/tenant/{tenantId}',
    methodId: '6bc5c564b7ccaa4aa77bd735965635a8',
    desc: 'Clear Tenant-Specific Redis Keys',
});
api[0].list.push({
    alias: 'PaymentMethodController',
    order: '64',
    link: 'payment_method_management',
    desc: 'Payment Method Management',
    list: []
})
api[0].list[63].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-methods',
    methodId: 'a2afc573024e174a57b4339d8f974bee',
    desc: 'List Payment Methods.',
});
api[0].list.push({
    alias: 'TenantMemberController',
    order: '65',
    link: 'team_management_apis',
    desc: 'Team Management APIs',
    list: []
})
api[0].list[64].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/members',
    methodId: '68e5a7734fc627709179ea598b6ffded',
    desc: 'List Tenant Members',
});
api[0].list[64].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/members/{userId}',
    methodId: '3b7d112bf4c0c81e42875fcf764d541b',
    desc: 'Remove Member from Store',
});
api[0].list[64].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/members/{userId}/roles',
    methodId: 'de6ab64220b024d8d8cd0e21f89caabc',
    desc: 'Update Member Roles',
});
api[0].list.push({
    alias: 'TenantCategoryController',
    order: '66',
    link: 'tenant_category_management',
    desc: 'Tenant Category Management',
    list: []
})
api[0].list[65].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories',
    methodId: '5c839cdbe8e243af0732e3083b66d902',
    desc: 'List Tenant Categories.',
});
api[0].list[65].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories',
    methodId: 'c1dc2db691667f40a855be6d79f38964',
    desc: 'Create Tenant Category.',
});
api[0].list[65].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories/{categoryId}',
    methodId: '394f85dd6d51b59b16d21554e468b7e2',
    desc: 'Update Tenant Category name. Only custom categories (no systemCategoryId) can be renamed. System-backed categories return 400 if a rename is attempted.',
});
api[0].list[65].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories/{categoryId}',
    methodId: '9a0fe1173b3dd9b5064612905497f842',
    desc: 'Delete Tenant Category.',
});
api[0].list.push({
    alias: 'CartV2Controller',
    order: '67',
    link: 'cart_management_v2',
    desc: 'Cart Management V2',
    list: []
})
api[0].list[66].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/items',
    methodId: '489da3ded2f1b1184606e20cc8fda5af',
    desc: 'List Items In Cart',
});
api[0].list[66].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/add',
    methodId: 'bb94dcde9916eebe6d0e8c48f7e9adc7',
    desc: 'Add Item To Cart',
});
api[0].list[66].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/remove/{cartItemId}',
    methodId: '1c66051e83537ab67548bf748306a033',
    desc: 'Remove Item From Cart',
});
api[0].list[66].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/item/increment/quantity/{cartId}',
    methodId: '67f7813bd4dfa3e99c43e8069110298f',
    desc: 'Increment Item Quantity',
});
api[0].list[66].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/item/decrement/quantity/{cartId}',
    methodId: '20aaf4e6e3f848b8863f928f1fe1aa48',
    desc: 'Decrement Item Quantity',
});
api[0].list[66].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/clear',
    methodId: '5d9aa097c95542f3d3af78f5a7f1bd6a',
    desc: 'Clear Cart',
});
api[0].list[66].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/checkout',
    methodId: 'a2876687c0e17781d5f65aceff7c7e8e',
    desc: 'Checkout Cart',
});
api[0].list[66].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v2/carts/guest/checkout',
    methodId: '8aa1d72f43b68a5da276e8891135eb7c',
    desc: 'Guest Checkout Cart',
});
api[0].list.push({
    alias: 'OrderStatusHistoryController',
    order: '68',
    link: 'order_status_history_management',
    desc: 'Order Status History Management',
    list: []
})
api[0].list[67].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/order-status-history/{orderNumber}',
    methodId: 'f2a031a43867d8765bbe7ce28b1843d7',
    desc: 'Get Order History/Tracking',
});
api[0].list.push({
    alias: 'LocalGovernmentController',
    order: '69',
    link: 'localgovernmentcontroller',
    desc: 'LocalGovernmentController',
    list: []
})
api[0].list[68].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/local-governments/{stateId}',
    methodId: '292982b66f40314e6efc295d96703037',
    desc: 'index',
});
api[0].list.push({
    alias: 'AdminDashboardController',
    order: '70',
    link: 'admin_platform_dashboard',
    desc: 'Admin Platform Dashboard',
    list: []
})
api[0].list[69].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/dashboard/overview',
    methodId: 'a2fd1d5d5e1c51493038af76d8afe572',
    desc: 'Platform KPI Overview',
});
api[0].list[69].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/dashboard/merchants/trend',
    methodId: '3b66357fbcd91c5cca551d88ac46e1d6',
    desc: 'Merchant Registration Trend',
});
api[0].list[69].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/dashboard/compliance/summary',
    methodId: 'b4102c0d5647602c81edf2c3763a069b',
    desc: 'Compliance Status Summary',
});
api[0].list.push({
    alias: 'AppTokenController',
    order: '71',
    link: 'app_token_management',
    desc: 'App Token Management',
    list: []
})
api[0].list[70].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/verify/merchant/reset-password-token',
    methodId: '8b57860ad6a22525593b7be02543807e',
    desc: 'Verify Merchant Reset Password Token',
});
api[0].list.push({
    alias: 'TenantInvitationController',
    order: '72',
    link: 'tenant_member_invitation_management_apis',
    desc: 'Tenant Member Invitation Management APIs',
    list: []
})
api[0].list[71].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/invitations/{token}/details',
    methodId: '22e171d3dc98341757577283cd1f4a65',
    desc: 'Get Invitation Details',
});
api[0].list[71].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/invitations/{token}/accept',
    methodId: 'b84afbeb5d35f7de7a54777f89baa626',
    desc: 'Accept Invitation',
});
api[0].list[71].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/invitations/{invitationId}',
    methodId: '65ff3c68a83ea2d05ff5353f7f0e9d33',
    desc: 'Cancel Invitation',
});
api[0].list[71].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/invitations/{invitationId}/resend',
    methodId: 'b80257d7af9236feab281661025214d3',
    desc: 'Resend Invitation',
});
api[0].list[71].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/invitations',
    methodId: '71274ad12918a27c9d2015f6a46efdd3',
    desc: 'List Store Invitations',
});
api[0].list[71].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenants/{tenantId}/invite',
    methodId: '3eca9fa2f12aec12c8fb8bd1b9dea98c',
    desc: 'Invite User to Store',
});
api[0].list.push({
    alias: 'ForgotPasswordController',
    order: '73',
    link: 'forgot_password_management_(unauthenticated)',
    desc: 'Forgot Password Management (Unauthenticated)',
    list: []
})
api[0].list[72].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/forgot/request/customer',
    methodId: 'aa6359793293d4a66414ce920bbc269f',
    desc: 'Initiate Forgot Password for Customer',
});
api[0].list[72].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/forgot/request/merchant',
    methodId: 'c3aa16cb33fa000d6661c0b6e8b631d4',
    desc: 'Initiate Forgot Password for Merchant',
});
api[0].list[72].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/reset/customer',
    methodId: '8bc5757cbe0a3235b2afebf56f283778',
    desc: 'Reset Customer Password.',
});
api[0].list[72].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/reset/merchant',
    methodId: 'd61dc027e05bfb390012eb9234755b89',
    desc: 'Reset Merchant Password.',
});
api[0].list.push({
    alias: 'PaystackWebhookController',
    order: '74',
    link: 'paystackwebhookcontroller',
    desc: 'PaystackWebhookController',
    list: []
})
api[0].list[73].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/paystack',
    methodId: 'f47a722b85531fa26c916e4fccd5402c',
    desc: 'handleWebhook',
});
api[0].list.push({
    alias: 'AdminAppSettingController',
    order: '75',
    link: 'admin_–_global_app_setting_management',
    desc: 'Admin – Global App Setting Management',
    list: []
})
api[0].list[74].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/settings',
    methodId: 'e749c37bfb47e77ea53bf727fba6b61a',
    desc: 'List All Global Settings',
});
api[0].list[74].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/settings',
    methodId: '2a24e3d40fd3d4bb61a40e61e826bf85',
    desc: 'Create or Fully Upsert a Global Setting',
});
api[0].list[74].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/settings/{key}/value',
    methodId: 'c67081fc6ecd504b5a25cafc8957f460',
    desc: 'Update a Global Setting&apos;s Value',
});
api[0].list[74].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/settings/{key}',
    methodId: '20f7155ee21cf7a02fc9c84f72263805',
    desc: 'Delete a Global Setting',
});
api[0].list.push({
    alias: 'CartSessionController',
    order: '76',
    link: 'cartsessioncontroller',
    desc: 'CartSessionController',
    list: []
})
api[0].list[75].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/generate/session/id',
    methodId: 'e55ac7fdc87ea0cccd19524b9c24a87f',
    desc: 'getSessionID',
});
api[0].list.push({
    alias: 'AdminMerchantController',
    order: '77',
    link: 'admin_merchant_management',
    desc: 'Admin Merchant Management',
    list: []
})
api[0].list[76].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/merchants',
    methodId: 'e79f37003f67b61475fee5e641746b07',
    desc: 'List All Merchants',
});
api[0].list[76].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/merchants/compliance-queue',
    methodId: 'f02dda3676d65810397fbecb69498aa3',
    desc: 'Compliance Queue',
});
api[0].list[76].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/merchants/{tenantId}',
    methodId: 'eec9825f2eef8db98eec0713d2a59772',
    desc: 'Get Merchant Detail',
});
api[0].list[76].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/merchants/{tenantId}/status',
    methodId: '21df84184107abecc85504cf09d725cf',
    desc: 'Update Merchant Status',
});
api[0].list[76].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/merchants/{tenantId}/payment-secrets',
    methodId: '76e8920b99ab4757580c0beb26edabff',
    desc: 'Get Payment Gateway Secrets (Metadata Only)',
});
api[0].list[76].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/admin/merchants/{tenantId}/payment-secrets',
    methodId: 'e7db2b810e824d1464675e00e771a7f9',
    desc: 'Set / Update Payment Gateway Secret',
});
api[0].list.push({
    alias: 'AddressController',
    order: '78',
    link: 'addresscontroller',
    desc: 'AddressController',
    list: []
})
api[0].list[77].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses',
    methodId: '35402a4e699148ebbd8931d0fd1d95e4',
    desc: 'getUserAddresses',
});
api[0].list[77].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses',
    methodId: '7b7a36375a116d8022e7ec5d1851c951',
    desc: 'store',
});
api[0].list[77].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}',
    methodId: '1eb3ebd96d3d60f2985445c0317ec8f7',
    desc: 'updateAddress',
});
api[0].list[77].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}',
    methodId: '9bebaa479b9b23eb4ff5a8e2e88d9130',
    desc: 'deleteAddress',
});
api[0].list[77].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}/default',
    methodId: 'ebb2e659d486235130b53f1c159a8875',
    desc: 'makeAddressDefault',
});
api[0].list.push({
    alias: 'dict',
    order: '79',
    link: 'dict_list',
    desc: 'Data Dictionaries',
    list: []
})
api[0].list[78].list.push({
    order: '1',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Order Status Codes',
});
api[0].list[78].list.push({
    order: '2',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Payment Statuses',
});
api[0].list[78].list.push({
    order: '3',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Payment Gateways',
});
api[0].list[78].list.push({
    order: '4',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Discount Types',
});
api[0].list[78].list.push({
    order: '5',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Notification Types',
});
api[0].list[78].list.push({
    order: '6',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Notification Channels',
});
document.onkeydown = keyDownSearch;
function keyDownSearch(e) {
    const theEvent = e;
    const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code === 13) {
        const search = document.getElementById('search');
        const searchValue = search.value.toLocaleLowerCase();

        let searchGroup = [];
        for (let i = 0; i < api.length; i++) {

            let apiGroup = api[i];

            let searchArr = [];
            for (let i = 0; i < apiGroup.list.length; i++) {
                let apiData = apiGroup.list[i];
                const desc = apiData.desc;
                if (desc.toLocaleLowerCase().indexOf(searchValue) > -1) {
                    searchArr.push({
                        order: apiData.order,
                        desc: apiData.desc,
                        link: apiData.link,
                        alias: apiData.alias,
                        list: apiData.list
                    });
                } else {
                    let methodList = apiData.list || [];
                    let methodListTemp = [];
                    for (let j = 0; j < methodList.length; j++) {
                        const methodData = methodList[j];
                        const methodDesc = methodData.desc;
                        if (methodDesc.toLocaleLowerCase().indexOf(searchValue) > -1) {
                            methodListTemp.push(methodData);
                            break;
                        }
                    }
                    if (methodListTemp.length > 0) {
                        const data = {
                            order: apiData.order,
                            desc: apiData.desc,
                            link: apiData.link,
                            alias: apiData.alias,
                            list: methodListTemp
                        };
                        searchArr.push(data);
                    }
                }
            }
            if (apiGroup.name.toLocaleLowerCase().indexOf(searchValue) > -1) {
                searchGroup.push({
                    name: apiGroup.name,
                    order: apiGroup.order,
                    list: searchArr
                });
                continue;
            }
            if (searchArr.length === 0) {
                continue;
            }
            searchGroup.push({
                name: apiGroup.name,
                order: apiGroup.order,
                list: searchArr
            });
        }
        let html;
        if (searchValue === '') {
            const liClass = "";
            const display = "display: none";
            html = buildAccordion(api,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        } else {
            const liClass = "open";
            const display = "display: block";
            html = buildAccordion(searchGroup,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        }
        const Accordion = function (el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;
            const links = this.el.find('.dd');
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
        };
        Accordion.prototype.dropdown = function (e) {
            const $el = e.data.el;
            let $this = $(this), $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp("20").parent().removeClass('open');
            }
        };
        new Accordion($('#accordion'), false);
    }
}

function buildAccordion(apiGroups, liClass, display) {
    let html = "";
    if (apiGroups.length > 0) {
        if (apiDocListSize === 1) {
            let apiData = apiGroups[0].list;
            let order = apiGroups[0].order;
            for (let j = 0; j < apiData.length; j++) {
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#' + apiData[j].alias + '">' + apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                html += '<ul class="sectlevel2" style="'+display+'">';
                let doc = apiData[j].list;
                for (let m = 0; m < doc.length; m++) {
                    let spanString;
                    if (doc[m].deprecated === 'true') {
                        spanString='<span class="line-through">';
                    } else {
                        spanString='<span>';
                    }
                    html += '<li><a href="#' + doc[m].methodId + '">' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                }
                html += '</ul>';
                html += '</li>';
            }
        } else {
            for (let i = 0; i < apiGroups.length; i++) {
                let apiGroup = apiGroups[i];
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#_'+apiGroup.order+'_' + apiGroup.name + '">' + apiGroup.order + '.&nbsp;' + apiGroup.name + '</a>';
                html += '<ul class="sectlevel1">';

                let apiData = apiGroup.list;
                for (let j = 0; j < apiData.length; j++) {
                    html += '<li class="'+liClass+'">';
                    html += '<a class="dd" href="#' + apiData[j].alias + '">' +apiGroup.order+'.'+ apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                    html += '<ul class="sectlevel2" style="'+display+'">';
                    let doc = apiData[j].list;
                    for (let m = 0; m < doc.length; m++) {
                       let spanString;
                       if (doc[m].deprecated === 'true') {
                           spanString='<span class="line-through">';
                       } else {
                           spanString='<span>';
                       }
                       html += '<li><a href="#' + doc[m].methodId + '">'+apiGroup.order+'.' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                   }
                    html += '</ul>';
                    html += '</li>';
                }

                html += '</ul>';
                html += '</li>';
            }
        }
    }
    return html;
}