let api = [];
const apiDocListSize = 1
api.push({
    name: 'default',
    order: '1',
    list: []
})
api[0].list.push({
    alias: 'PaymentGatewayController',
    order: '1',
    link: 'payment_gateway',
    desc: 'Payment Gateway',
    list: []
})
api[0].list[0].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-gateway/verify-account-number',
    methodId: 'd4d1c632ee43f79d7df127df11d76db8',
    desc: 'Resolve Account Number:',
});
api[0].list.push({
    alias: 'PromoAdController',
    order: '2',
    link: 'promo_ad_api',
    desc: 'Promo Ad API',
    list: []
})
api[0].list[1].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads',
    methodId: '23eed6e3541e4cbc09bdf0129d92443f',
    desc: 'Create Promo Ad',
});
api[0].list[1].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}',
    methodId: '69b2d7ea2d37424761aa9e7c8d72864d',
    desc: 'Update Promo Ad',
});
api[0].list[1].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}',
    methodId: '298a4eb3c41986e6821fab71931a4c68',
    desc: 'Get Promo Ad by ID',
});
api[0].list[1].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads',
    methodId: 'f13c7e1d13cc5b393d3702b48a075410',
    desc: 'Fetch Promo Ads.',
});
api[0].list[1].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/published',
    methodId: 'cd217d4055c74776194690e9f3872f96',
    desc: 'Fetch Published Promo Ads.',
});
api[0].list[1].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/update/{id}/status/{status}',
    methodId: '13b7e0487de6e60a3fe85e3dc4786f92',
    desc: 'Update Promo Ad Status.',
});
api[0].list[1].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}',
    methodId: 'ed7c384e95e33647a103b367b3a75626',
    desc: 'Delete Promo Ad.',
});
api[0].list.push({
    alias: 'CustomerOrderController',
    order: '3',
    link: 'customer_order_management',
    desc: 'Customer Order Management',
    list: []
})
api[0].list[2].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders',
    methodId: 'b66b31c3d59d0d391208de9a62871916',
    desc: 'Fetch Customer Orders. This API retrieves a list of orders for the authenticated customer. The response includes orders in PUBLISHED status.',
});
api[0].list[2].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders/{customerId}',
    methodId: '6397e5deffc3327c96c4929f45088396',
    desc: 'Fetch Customer Orders. This API retrieves a list of orders for a specific customer.',
});
api[0].list[2].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders/{orderId}/items',
    methodId: '7960689c6019705dc812e3c49bf9b5fe',
    desc: 'Fetch Order Items. This API retrieves a list of items in a specific order.',
});
api[0].list.push({
    alias: 'CartController',
    order: '4',
    link: 'cart_management',
    desc: 'Cart Management',
    list: []
})
api[0].list[3].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/items',
    methodId: '9ae9ec28b44b18de5cee10d716ab2840',
    desc: 'List Items In Cart.',
});
api[0].list[3].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/add',
    methodId: '7eef633926c0c939dc677a337abc56b9',
    desc: 'Add Item To Cart.',
});
api[0].list[3].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/remove/{carItemId}',
    methodId: 'eeb2a371071485fa427d8467c5dc0d44',
    desc: 'Remove Item From Cart.',
});
api[0].list[3].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/item/increment/quantity/{cartId}',
    methodId: '38371979b0f11857aa41843a413ae468',
    desc: 'Increment Item Quantity.',
});
api[0].list[3].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/item/decrement/quantity/{cartId}',
    methodId: '52ee31353e7b87f668cfacb6780f3324',
    desc: 'Decrement Item Quantity.',
});
api[0].list[3].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/clear',
    methodId: '1082d8e90f239d66e4285d93d7b8224f',
    desc: 'Clear Cart.',
});
api[0].list[3].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/checkout',
    methodId: '512864f9afbe838ddb4c3e41fbc1393d',
    desc: 'Checkout Cart.',
});
api[0].list[3].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/guest/checkout',
    methodId: 'a144f0800c383e972d4a58052cc0538b',
    desc: 'Guest Checkout Cart.',
});
api[0].list.push({
    alias: 'CategoryController',
    order: '5',
    link: 'categorycontroller',
    desc: 'CategoryController',
    list: []
})
api[0].list[4].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/categories',
    methodId: '5dfef8e3459afb0677c75009a06194ce',
    desc: 'getAllCategories',
});
api[0].list.push({
    alias: 'PromotionController',
    order: '6',
    link: 'promotion_management.',
    desc: 'Promotion management.',
    list: []
})
api[0].list[5].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/apply/promo-code',
    methodId: 'a2d5739d4472bb583e47748d82896acd',
    desc: 'Apply Promo Code',
});
api[0].list[5].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions',
    methodId: 'b57c71d78cdc01959d4d458dc8e7fb1b',
    desc: 'Create Promotion',
});
api[0].list[5].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions',
    methodId: 'b9c21bdfd17324306ec0d10f816e6d8e',
    desc: 'Fetch All Promotions',
});
api[0].list[5].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}',
    methodId: 'c9b52db21f462ea9831779f011389aa6',
    desc: 'Show Promotion',
});
api[0].list[5].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}',
    methodId: '98d861e9e3d65e5407ed810786739bd6',
    desc: 'Update Promotion',
});
api[0].list[5].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}',
    methodId: '29bfe16c867583b219d236894d08c475',
    desc: 'Delete Promotion',
});
api[0].list.push({
    alias: 'ProductStatsController',
    order: '7',
    link: 'productstatscontroller',
    desc: 'ProductStatsController',
    list: []
})
api[0].list[6].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/product-stats',
    methodId: '51bf7fec32aab042df2445552135c1c5',
    desc: 'Get Top Selling Products (Public)  Retrieves a list of the most popular products based on total quantity sold. This endpoint is public-facing and omits sensitive business metrics.',
});
api[0].list[6].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/product-stats/top-by-quantity',
    methodId: '8125499180111a9e3c8831633b7b0c3a',
    desc: 'Get Top Selling Products (Public)  Retrieves a list of the most popular products based on total quantity sold. This endpoint is public-facing and omits sensitive business metrics.',
});
api[0].list[6].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/product-stats/top-by-revenue',
    methodId: 'b5ce68e3ea6fc9cce01c7796c737079b',
    desc: 'Get Top Selling Products base on revenue  Retrieves a list of the most popular products based on total revenue.',
});
api[0].list.push({
    alias: 'LocationController',
    order: '8',
    link: 'locationcontroller',
    desc: 'LocationController',
    list: []
})
api[0].list[7].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/locations/countries',
    methodId: '3249608bc332dc37d1c3176588276637',
    desc: 'getCountries',
});
api[0].list[7].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/locations/states/{countryCode}',
    methodId: 'b4cf55c444ba9938e5515f3f499bbcf5',
    desc: 'getStates',
});
api[0].list.push({
    alias: 'ReviewController',
    order: '9',
    link: 'reviewcontroller',
    desc: 'ReviewController',
    list: []
})
api[0].list[8].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews',
    methodId: '0b9965cf3cce5830354d4463be7b296f',
    desc: 'Get All Reviews',
});
api[0].list[8].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/product/{productId}',
    methodId: '0b5112181d406b277bd044cd3781d98e',
    desc: 'Get Product Reviews',
});
api[0].list[8].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/add',
    methodId: '562f22d968bf15eda9978b126994a902',
    desc: 'Create/Submit Product Review',
});
api[0].list[8].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/{reviewId}',
    methodId: '0595ea2ae24a3a218bc889f89b1b00c6',
    desc: 'Delete Review',
});
api[0].list[8].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/hide/{reviewId}',
    methodId: '2fd9b7fcf0ea359a151d8ddf0ddd0198',
    desc: 'Hide Review',
});
api[0].list.push({
    alias: 'ColorController',
    order: '10',
    link: 'colorcontroller',
    desc: 'ColorController',
    list: []
})
api[0].list[9].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/colors',
    methodId: '7d7d0ff6e3ffda2ce913650eb06f7028',
    desc: 'getAllColors',
});
api[0].list.push({
    alias: 'VariationController',
    order: '11',
    link: 'variationcontroller',
    desc: 'VariationController',
    list: []
})
api[0].list[10].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/variations',
    methodId: '5d22058e1fd7f0d17a50bb5b5792f887',
    desc: 'createVariation',
});
api[0].list.push({
    alias: 'StatSnapshotController',
    order: '12',
    link: 'statsnapshotcontroller',
    desc: 'StatSnapshotController',
    list: []
})
api[0].list[11].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/stats/snapshots',
    methodId: 'ac6cfbff69c709594788e82f8db188cb',
    desc: 'Get Recent Snapshots by Domain Retrieves the most recently created snapshots for the current tenant. Useful for the &quot;Recent Reports&quot; section of the dashboard.',
});
api[0].list[11].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/stats/snapshots/{id}/invalidate',
    methodId: '53b61fc7ae7e7848d42713d62d13101a',
    desc: 'Invalidate Snapshot Invalidates a range of snapshots and triggers a re-computation. Limited to 3 invalidations per day per tenant to prevent abuse.',
});
api[0].list.push({
    alias: 'PasswordlessAuthController',
    order: '13',
    link: 'password-less_authentication.',
    desc: 'Password-less Authentication.',
    list: []
})
api[0].list[12].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/initiate',
    methodId: '0d5a462750d73eec3651df2c3486b367',
    desc: 'Initiate Password-less Authentication.',
});
api[0].list[12].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/initiate/email',
    methodId: '473e261a50f6f954804f26cf7707326d',
    desc: 'Initiate Password-less email Authentication.',
});
api[0].list[12].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/initiate/phone',
    methodId: '824368cbac6468eeaa36faf531bf42ba',
    desc: 'Initiate Password-less Phone number Authentication .',
});
api[0].list[12].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-email',
    methodId: 'bfd34cccaba8fdb773d59ebded1856bc',
    desc: 'Verify Merchant Email.',
});
api[0].list[12].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-phone',
    methodId: 'da0cac51e1636d36fe07710dc691e1b9',
    desc: 'Verify Merchant Phone.',
});
api[0].list[12].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/customer/verify-email',
    methodId: 'd98bef387ac812b14f55b0a44f1b2e23',
    desc: 'Verify Customer Email.',
});
api[0].list[12].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/passwordless/customer/verify-phone',
    methodId: '5281e197ed23cfbefafe74d053d1067a',
    desc: 'Verify Customer Phone.',
});
api[0].list.push({
    alias: 'CustomerController',
    order: '14',
    link: 'customercontroller',
    desc: 'CustomerController',
    list: []
})
api[0].list[13].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers',
    methodId: 'fae2c9b5de1cfb53d7996eeafeccee27',
    desc: 'Get All Customers',
});
api[0].list[13].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/profile',
    methodId: '11b7ce0b35465a5a7b1c6380ae02e8e3',
    desc: 'Get Authenticated Customer Profile',
});
api[0].list[13].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}',
    methodId: '456c7ae2d880abc457b287956376348c',
    desc: 'Get Specific Customer (Shop Owner View)',
});
api[0].list[13].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}/deactivate',
    methodId: '0abd05f73267bf8fa84c42b161f47f45',
    desc: 'Deactivate Customer Account',
});
api[0].list[13].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}/activate',
    methodId: '23167bd3010adc9f4f13d6179e97eede',
    desc: 'Activate Customer Account',
});
api[0].list[13].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/signup',
    methodId: 'a07a4635daa35aafa41b7cbe6e6f6ceb',
    desc: 'Register New Customer',
});
api[0].list[13].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/profile/update',
    methodId: '869066a7136dfcb2e62f7cc777f43fdf',
    desc: 'Update Customer Profile',
});
api[0].list.push({
    alias: 'MerchantBankAccountController',
    order: '15',
    link: 'merchantbankaccountcontroller',
    desc: 'MerchantBankAccountController',
    list: []
})
api[0].list[14].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts',
    methodId: '0f5c2dfded13946ddb68fe01da99eb2e',
    desc: 'addBankDetails',
});
api[0].list[14].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts',
    methodId: '459e7fc66e389094f7859f4ce727a3ba',
    desc: 'getBankAccounts',
});
api[0].list[14].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts/{id}/promote',
    methodId: 'aca8fb6edc4108a6879f83a60236a371',
    desc: 'promoteToPrimary',
});
api[0].list[14].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/bank-accounts/{id}/disable',
    methodId: 'eb73ce8728305c68aaa009f3c47f2ce4',
    desc: 'disableBankAccount',
});
api[0].list.push({
    alias: 'EmailVerificationController',
    order: '16',
    link: 'email_verification',
    desc: 'Email Verification',
    list: []
})
api[0].list[15].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/email/merchant/verify',
    methodId: '090d110b891d967f6bdefae8a25c2587',
    desc: 'Verify Merchant Email',
});
api[0].list[15].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/email/merchant/initiate/verification',
    methodId: 'f852376784a2c56aa21a990832bd2e32',
    desc: 'Initiate Merchant Email Verification',
});
api[0].list.push({
    alias: 'DashboardController',
    order: '17',
    link: 'dashboardcontroller',
    desc: 'DashboardController',
    list: []
})
api[0].list[16].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/orders',
    methodId: '8aac152c6dd4da49394fd6c98fd816ec',
    desc: 'Retrieves the high-level order statistics and breakdowns.',
});
api[0].list[16].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/orders/chart',
    methodId: '10c5646c99950da4ae584d2f1102a567',
    desc: 'Retrieves the daily chart data for order volumes.',
});
api[0].list[16].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/revenue',
    methodId: 'a95efd27a1ca50cf069146de1073817b',
    desc: 'Retrieves revenue statistics including totals, averages, and payment method breakdowns.',
});
api[0].list[16].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/revenue/chart',
    methodId: '7e3de794abc5a5ce8f2dcb03d2312f96',
    desc: 'Retrieves the daily chart data for revenue.',
});
api[0].list[16].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/customers',
    methodId: '513dcaba6bcc0b4465c728568509340d',
    desc: 'Retrieves customer statistics including top spenders and location breakdown.',
});
api[0].list[16].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/products',
    methodId: '9ddabf8d473b46c353c9f3ca0bf9880e',
    desc: 'Retrieves product insights including overall catalog numbers and top selling items.',
});
api[0].list[16].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/dashboard/sales/monthly-chart',
    methodId: '8c777f56dc5342a296f15680c068a9eb',
    desc: 'Get Monthly Sales Chart  Retrieves the monthly chart data for sales (volume and revenue) for a specific year.',
});
api[0].list.push({
    alias: 'CustomerAuthController',
    order: '18',
    link: 'customer_authentication',
    desc: 'Customer Authentication',
    list: []
})
api[0].list[17].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/signup',
    methodId: '26525736959fc67d40c2ec6baba01c8e',
    desc: 'Register Customer.',
});
api[0].list[17].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/signup/google',
    methodId: '6d60511c8162d06510dfbfa7bac28657',
    desc: 'Register Customer Via Google.',
});
api[0].list[17].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/login/google',
    methodId: '232bf517af8365ac1854f4d687c97339',
    desc: 'Login Customer Via Google. This API logs in a customer via google.',
});
api[0].list[17].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/refresh-token',
    methodId: '53eb4ebdf110070fe41a95f348e245e5',
    desc: 'refreshToken',
});
api[0].list.push({
    alias: 'WhatsAppWebhookController',
    order: '19',
    link: 'whatsappwebhookcontroller',
    desc: 'WhatsAppWebhookController',
    list: []
})
api[0].list[18].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp/send-template',
    methodId: '53f5e9c1bf694beb4d521caee07aa266',
    desc: 'Send a template message to initiate or re-establish a connection.',
});
api[0].list[18].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp',
    methodId: '6d0c5cdc794b217d2102b8f5fb6aea24',
    desc: 'verifyWebhook',
});
api[0].list[18].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp',
    methodId: '13b422174db718b58e8f4ef067151a3f',
    desc: 'receiveMessage',
});
api[0].list.push({
    alias: 'StateController',
    order: '20',
    link: 'statecontroller',
    desc: 'StateController',
    list: []
})
api[0].list[19].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/states/{countryId}',
    methodId: 'abf63e23b503e47ae7e35c42493c5661',
    desc: 'index',
});
api[0].list.push({
    alias: 'ComplianceController',
    order: '21',
    link: 'tenant_compliance_management',
    desc: 'Tenant Compliance Management',
    list: []
})
api[0].list[20].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/profile',
    methodId: '7e83ce029de141a722b2854098408b5b',
    desc: 'Get Business Profile',
});
api[0].list[20].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/status',
    methodId: '8de9039399d35ed4948edd79dc04d096',
    desc: 'Get Business Compliance Status',
});
api[0].list[20].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/profile',
    methodId: '22c803391d364cc84b6897cd5cc6efe7',
    desc: 'Update Business Profile',
});
api[0].list[20].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/contact/detail',
    methodId: '333c7f4d381f3c513706c09f19d4d383',
    desc: 'Get Business Contact',
});
api[0].list[20].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/contact/detail',
    methodId: 'd224afb86cfe933dbe5bb0c4cbda1f9e',
    desc: 'Update Business Contact',
});
api[0].list.push({
    alias: 'MonnifyWebhookController',
    order: '22',
    link: 'monnifywebhookcontroller',
    desc: 'MonnifyWebhookController',
    list: []
})
api[0].list[21].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/monnify',
    methodId: '985612f542771efebd76417e8ae3a45f',
    desc: 'handleWebhook',
});
api[0].list.push({
    alias: 'CheckoutLinkController',
    order: '23',
    link: 'checkoutlinkcontroller',
    desc: 'CheckoutLinkController',
    list: []
})
api[0].list[22].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/checkout-links',
    methodId: '217f47d045566e13055efc8f2022caea',
    desc: 'generateCheckoutLink',
});
api[0].list[22].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/checkout-links/order/{orderId}',
    methodId: 'b0a6321cbb7f427bebe8280eb9e7a0a0',
    desc: 'getOrderDetails',
});
api[0].list.push({
    alias: 'CountryController',
    order: '24',
    link: 'countrycontroller',
    desc: 'CountryController',
    list: []
})
api[0].list[23].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/countries',
    methodId: '92859af28e035c3955dddb41c3cff82f',
    desc: 'getAllCountries',
});
api[0].list.push({
    alias: 'SpecificationController',
    order: '25',
    link: 'specificationcontroller',
    desc: 'SpecificationController',
    list: []
})
api[0].list[24].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/specifications',
    methodId: '46ce6f26556a2b372b4c1092ab6615ce',
    desc: 'getSpecifications',
});
api[0].list.push({
    alias: 'ConfigController',
    order: '26',
    link: 'tenant_configuration_management',
    desc: 'Tenant Configuration Management',
    list: []
})
api[0].list[25].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/currentMode/{mode}',
    methodId: '04e57a6e750a85f91d71f7495b5ec135',
    desc: 'Update Current Mode',
});
api[0].list[25].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/domain',
    methodId: '68423828012c3af9c2e6a00662366531',
    desc: 'Update Domain',
});
api[0].list[25].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/domain',
    methodId: 'd377e1a2c0a098faa9c9523b638ccece',
    desc: 'Get Domains',
});
api[0].list[25].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/keys',
    methodId: '9afe865c81823e190deac0ddf7ced2e0',
    desc: 'Get Keys',
});
api[0].list[25].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/regenerate/keys/{mode}',
    methodId: '188775cb6746174329a37defaaab411b',
    desc: 'Generate Keys',
});
api[0].list.push({
    alias: 'HomeController',
    order: '27',
    link: 'homecontroller',
    desc: 'HomeController',
    list: []
})
api[0].list[26].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/health',
    methodId: '57285e31c4400dc59fb47f6c288b3536',
    desc: 'getHealth',
});
api[0].list[26].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/healths',
    methodId: '0103512c7c6cd0ce66467092691fc7ed',
    desc: 'getHealths',
});
api[0].list.push({
    alias: 'ProductVariationPriceDetailController',
    order: '28',
    link: 'productvariationpricedetailcontroller',
    desc: 'ProductVariationPriceDetailController',
    list: []
})
api[0].list[27].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/priceDetail/{variationPriceDetailId}',
    methodId: '0e207a059010360d544e57b8a4beb596',
    desc: 'updateProductVariationPriceDetail',
});
api[0].list[27].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/priceDetail',
    methodId: 'c009682c23765b98d956c0aca2df4f51',
    desc: 'addProductVariationPriceDetail',
});
api[0].list.push({
    alias: 'FileController',
    order: '29',
    link: 'file_management_(file_upload)',
    desc: 'File Management (File Upload)',
    list: []
})
api[0].list[28].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/files/upload/single/image',
    methodId: '15ae4b213f6a3636dec8b7fd22b36ea3',
    desc: 'Upload Single Image.',
});
api[0].list[28].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/files/upload/multiple/images',
    methodId: '3cf3e42903fc6c236c6fe3d8aba909ea',
    desc: 'Upload Multiple Images.',
});
api[0].list.push({
    alias: 'PaymentLinkController',
    order: '30',
    link: 'paymentlinkcontroller',
    desc: 'PaymentLinkController',
    list: []
})
api[0].list[29].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-links',
    methodId: 'c1877df44ddd9f96a6310064f33e6096',
    desc: 'Generate Payment Link',
});
api[0].list.push({
    alias: 'NotificationController',
    order: '31',
    link: 'notification_management',
    desc: 'Notification Management',
    list: []
})
api[0].list[30].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications',
    methodId: '29966480bfeb12d4d320160662f647dc',
    desc: 'Fetch All Notification',
});
api[0].list[30].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications/{id}/read',
    methodId: '92493af60b0d5cf9419998389e30aee4',
    desc: 'Mark Notification as Read',
});
api[0].list[30].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications/read-all',
    methodId: '09494bbfe19b3da32471eabf6d130382',
    desc: 'Mark all Notification as Read',
});
api[0].list[30].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/notifications/{id}',
    methodId: '3c3907551f568a71af0b137b1ad3f1b5',
    desc: 'Delete Notification',
});
api[0].list.push({
    alias: 'ChangePasswordController',
    order: '32',
    link: 'change_password_management_(authenticated)',
    desc: 'Change Password Management (authenticated)',
    list: []
})
api[0].list[31].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/change/password/customer',
    methodId: '12915658062bdc6a85b2c4bb124a7965',
    desc: 'Change Customer Password',
});
api[0].list[31].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/change/password/merchant',
    methodId: 'dea6b0e82069187a6eb7e62aa20ad9d3',
    desc: 'Change Merchant Password',
});
api[0].list.push({
    alias: 'BrandController',
    order: '33',
    link: 'brandcontroller',
    desc: 'BrandController',
    list: []
})
api[0].list[32].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/brands',
    methodId: '115e772d8da36d4d867fe9611d6a729a',
    desc: 'getAllBrands',
});
api[0].list.push({
    alias: 'PaymentController',
    order: '34',
    link: 'payment_management',
    desc: 'Payment Management',
    list: []
})
api[0].list[33].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments',
    methodId: '7c5361a34da8b80f053a0046d79b2ad6',
    desc: 'Get All Payments',
});
api[0].list[33].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/order/{orderId}',
    methodId: '3b5ec24d972e71038197f4163e8beb9f',
    desc: 'Get Payment by Order ID',
});
api[0].list[33].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/initialize',
    methodId: '8ef0a005bbca6a4954cf34681e8b3ecf',
    desc: 'Initialize Customer Payment',
});
api[0].list[33].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/guest/initialize',
    methodId: 'e3a4f43efac78feffbefa60b250b1236',
    desc: 'Initialize Guest Payment',
});
api[0].list[33].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/confirm',
    methodId: '3105326759ca7a7334354b7811fb014e',
    desc: 'Verify and Confirm Payment',
});
api[0].list[33].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/{paymentId}/status',
    methodId: '79388ab405d77b003315b80d69f0cb9c',
    desc: 'Update Payment Status',
});
api[0].list[33].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/statuses',
    methodId: '32d30a3768f3c7897f32a58e2b4a4015',
    desc: 'Get All Payment Statuses',
});
api[0].list.push({
    alias: 'AuthController',
    order: '35',
    link: 'authentication.',
    desc: 'Authentication.',
    list: []
})
api[0].list[34].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/signup/merchant',
    methodId: '3043ac33af4d542a26de87becc6fb7ee',
    desc: 'Register Shop Owner  Registers a new shop owner (merchant) account with store details. This endpoint handles the complete merchant registration workflow including email verification token generation and merchant creation event publishing.',
});
api[0].list[34].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/login',
    methodId: 'fa19cf5b1eb76ca04b66b8999c0c57eb',
    desc: 'Login User (Shop Owner/Merchant)  Authenticates a shop owner or merchant user using email and password credentials. Upon successful authentication, generates a JWT token for subsequent API calls and returns the authenticated user&apos;s details.',
});
api[0].list[34].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/login/customer',
    methodId: 'c12f7a6d09d97c07b51e7e9aaa41a841',
    desc: 'Login Customer  Authenticates a customer user using email and password credentials. Upon successful authentication, generates a JWT token for API access and returns the customer&apos;s profile information. Also publishes a customer login event for tracking and analytics.',
});
api[0].list[34].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/refresh-token',
    methodId: '65c9b3bf1513b624e910dab85bc1cd90',
    desc: 'refreshToken',
});
api[0].list[34].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/logout',
    methodId: 'f7bbef0f36b36d226481dd3358059eaa',
    desc: 'logout',
});
api[0].list.push({
    alias: 'QAController',
    order: '36',
    link: 'qacontroller',
    desc: 'QAController',
    list: []
})
api[0].list[35].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/qa/scenarios/merchant-with-orders',
    methodId: '907b26b9ab8d4ace3f8933afa4a09f07',
    desc: 'seedMerchantWithOrders',
});
api[0].list[35].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/qa/scenarios/customer-with-orders',
    methodId: 'fa5cf436708f388866bbcf06cff5d832',
    desc: 'seedCustomerWithOrders',
});
api[0].list.push({
    alias: 'WhatsAppAuthController',
    order: '37',
    link: 'whatsapp_authentication',
    desc: 'Whatsapp Authentication',
    list: []
})
api[0].list[36].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/phone/initiate',
    methodId: '4fa19983afa5383b8859b165752d6d87',
    desc: 'Initiate OTP',
});
api[0].list[36].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/phone/verify',
    methodId: '94a2af74f5679ee9350885184d0b70d5',
    desc: 'Verify OTP',
});
api[0].list.push({
    alias: 'DeliveryZoneController',
    order: '38',
    link: 'delivery_zone_management',
    desc: 'Delivery Zone Management',
    list: []
})
api[0].list[37].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones',
    methodId: '1a83a9dee588c7424203b2e67d44d2ae',
    desc: 'Create Delivery Zone.',
});
api[0].list[37].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones',
    methodId: '80ce2161699b3fe57690f9f59f0292ad',
    desc: 'Get All Delivery Zones.',
});
api[0].list[37].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones/{id}',
    methodId: 'f17698c1f116a16283eab014c4bc2565',
    desc: 'Update Delivery Zone.',
});
api[0].list[37].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones/{id}',
    methodId: '6f4484dc94cea460ac67de61cf31009b',
    desc: 'Delete Delivery Zone.',
});
api[0].list.push({
    alias: 'MerchantController',
    order: '39',
    link: 'merchant_management',
    desc: 'Merchant Management',
    list: []
})
api[0].list[38].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/profile',
    methodId: 'd9a31bc791df9688c9f339f4489e1c96',
    desc: 'Get Merchant Profile.',
});
api[0].list[38].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/profile/business',
    methodId: 'dc42264d7e9318fa680f63c39d25535a',
    desc: 'Get Merchant Business Profile.',
});
api[0].list.push({
    alias: 'RoleController',
    order: '40',
    link: 'rolecontroller',
    desc: 'RoleController',
    list: []
})
api[0].list[39].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/roles',
    methodId: '6d7d3684c05dc9ff908d1f733e9fc270',
    desc: 'findAll',
});
api[0].list.push({
    alias: 'VariationOptionController',
    order: '41',
    link: 'variationoptioncontroller',
    desc: 'VariationOptionController',
    list: []
})
api[0].list[40].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/variation/options/{variationId}',
    methodId: 'c04465f75d6b12d3dfcbccd942add990',
    desc: 'getAllVariations',
});
api[0].list.push({
    alias: 'EmailPreviewController',
    order: '42',
    link: 'emailpreviewcontroller',
    desc: 'EmailPreviewController',
    list: []
})
api[0].list[41].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/welcome',
    methodId: '91d22fda29bb1628845c5a6535236aad',
    desc: 'previewWelcomeEmail',
});
api[0].list[41].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/merchant/new-order/{orderId}',
    methodId: '39a7ebc151c6356afe8e125cf9e592c2',
    desc: 'previewMerchantNewOrder',
});
api[0].list[41].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer/order-confirmation/{orderId}',
    methodId: 'f4993eb9944736fe20a0c9afc630629b',
    desc: 'previewCustomerOrderConfirmation',
});
api[0].list[41].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer/payment-confirmation/{paymentId}',
    methodId: '23b2a858266195729ecbda885214f141',
    desc: 'previewCustomerPaymentConfirmation',
});
api[0].list[41].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/forgot-password',
    methodId: 'ab603489f8e1549cbca9198f50089dfa',
    desc: 'previewForgotPassword',
});
api[0].list.push({
    alias: 'UserController',
    order: '43',
    link: 'usercontroller',
    desc: 'UserController',
    list: []
})
api[0].list[42].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile',
    methodId: 'a661e39277999c9f6d51859946734b85',
    desc: 'getUserProfile',
});
api[0].list[42].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile/with/role',
    methodId: '0c21283d6285bd659e4423a704be3c4e',
    desc: 'getUserProfileWithRole',
});
api[0].list[42].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile/update',
    methodId: 'fbbd246c81a1045601c1ec777ada9936',
    desc: 'updateContact',
});
api[0].list.push({
    alias: 'OrderController',
    order: '44',
    link: 'order_management',
    desc: 'Order Management',
    list: []
})
api[0].list[43].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders',
    methodId: '8bca6265e4aba517ce0aeb6f72d333b1',
    desc: 'Get All Orders  Retrieves a paginated and filtered list of orders for an authenticated shop owner. Supports sorting by various fields, pagination, and multiple filtering criteria including search terms, order status, payment status, amount ranges, and date ranges.',
});
api[0].list[43].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderNumber}/show',
    methodId: '00015578a7f79090d8ec97abf7118a32',
    desc: 'Get Order by Order Number  Retrieves a single order by its order number. Order number is visible to both customers and merchants, providing a human-readable alternative to internal order IDs.',
});
api[0].list[43].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/detail',
    methodId: '150f612186ab664c6ab4caa72ab1d5d6',
    desc: 'Get Order Detail for Merchant  Retrieves complete order details including all associated order line items for a shop owner. Provides comprehensive view necessary for order fulfillment, including item quantities, prices, and variants.',
});
api[0].list[43].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/items',
    methodId: '5beeb8c23f5ead8f7c8be4e3430595f2',
    desc: 'Get Order Line Items  Retrieves all line items (products) associated with a specific order. Each line item includes product details, variant information, quantity ordered, and pricing.',
});
api[0].list[43].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/status',
    methodId: '5cd3387860122d0ccdf8c9b4d72f2b5b',
    desc: 'Update Order Status',
});
api[0].list[43].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/force-status',
    methodId: '6f02f14a425f4ce53cc0541f93724acd',
    desc: 'Force Update Order Status (Admin Override)  Bypasses all standard transition rules and forcibly sets the order to the given status. Use with caution — this is intended for administrative corrections only (e.g., stuck orders, data recovery, third-party sync discrepancies).',
});
api[0].list[43].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/merchant/stats',
    methodId: 'a4b57f9ea9d653fe52e58a76bf9dd106',
    desc: 'Get Order Statistics',
});
api[0].list[43].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/statuses',
    methodId: '52a10d7e1c8863b3ea519094f25af790',
    desc: 'Get All Order Statuses',
});
api[0].list.push({
    alias: 'SocialAuthController',
    order: '45',
    link: 'socialauthcontroller',
    desc: 'SocialAuthController',
    list: []
})
api[0].list[44].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/social/google/signup/merchant',
    methodId: 'd416a2c7749d8f4a4bd07bcc1b8a7b4e',
    desc: 'registerMerchant',
});
api[0].list.push({
    alias: 'ProductVariationController',
    order: '46',
    link: 'product_variation_management_(authenticated)',
    desc: 'Product Variation Management (Authenticated)',
    list: []
})
api[0].list[45].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/{variationId}',
    methodId: '862c14c3082787c05908efdb63961536',
    desc: 'Update Product Variation',
});
api[0].list[45].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/add',
    methodId: '0a0d515a713d559798b3e39f1e491078',
    desc: 'Add Product Variation',
});
api[0].list.push({
    alias: 'BankController',
    order: '47',
    link: 'bankcontroller',
    desc: 'BankController',
    list: []
})
api[0].list[46].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/banks',
    methodId: '8591a2856617028b24f44e437c2e8bf0',
    desc: 'getBanks',
});
api[0].list.push({
    alias: 'PaymentMethodController',
    order: '48',
    link: 'payment_method_management',
    desc: 'Payment Method Management',
    list: []
})
api[0].list[47].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-methods',
    methodId: 'a2afc573024e174a57b4339d8f974bee',
    desc: 'List Payment Methods.',
});
api[0].list.push({
    alias: 'TenantCategoryController',
    order: '49',
    link: 'tenant_category_management',
    desc: 'Tenant Category Management',
    list: []
})
api[0].list[48].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories',
    methodId: '5c839cdbe8e243af0732e3083b66d902',
    desc: 'List Tenant Categories.',
});
api[0].list[48].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories',
    methodId: 'c1dc2db691667f40a855be6d79f38964',
    desc: 'Create Tenant Category.',
});
api[0].list[48].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories/{categoryId}',
    methodId: '7017b48abe30e62ec8a73bb351b7016e',
    desc: 'Delete Tenant Category.',
});
api[0].list.push({
    alias: 'LocalGovernmentController',
    order: '50',
    link: 'localgovernmentcontroller',
    desc: 'LocalGovernmentController',
    list: []
})
api[0].list[49].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/local-governments/{stateId}',
    methodId: '292982b66f40314e6efc295d96703037',
    desc: 'index',
});
api[0].list.push({
    alias: 'NaturalLanguageQueryController',
    order: '51',
    link: 'public_rest_controller_for_processing_natural_language_query_(nlq)_requests. allows_merchants_to_query_dashboard_stats_using_plain_english_phrases.  flow: 1._receives_natural_language_&amp;quot;query&amp;quot;_(e.g._&amp;quot;how_are_my_sales_today?&amp;quot;). 2._delegates_to_{@link_naturallanguagestatparser}_to_translate_the_text_into_structured_dates. 3._uses_{@link_statsqueryservice}_to_fetch_actual_business_metrics_for_those_dates. 4._returns_both_the_interpreted_range_and_the_resulting_statistics_data.',
    desc: 'Public REST Controller for processing Natural Language Query (NLQ) requests. Allows merchants to query dashboard stats using plain English phrases.  Flow: 1. Receives natural language &amp;quot;query&amp;quot; (e.g. &amp;quot;how are my sales today?&amp;quot;). 2. Delegates to {@link NaturalLanguageStatParser} to translate the text into structured dates. 3. Uses {@link StatsQueryService} to fetch actual business metrics for those dates. 4. Returns both the interpreted range and the resulting statistics data.',
    list: []
})
api[0].list[50].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/stats/natural-query',
    methodId: '9479c65aad4a3c85fd8f6ac2cab7f5df',
    desc: 'query',
});
api[0].list.push({
    alias: 'AppTokenController',
    order: '52',
    link: 'app_token_management',
    desc: 'App Token Management',
    list: []
})
api[0].list[51].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/verify/merchant/reset-password-token',
    methodId: '8b57860ad6a22525593b7be02543807e',
    desc: 'Verify Merchant Reset Password Token',
});
api[0].list.push({
    alias: 'ForgotPasswordController',
    order: '53',
    link: 'forgot_password_management_(unauthenticated)',
    desc: 'Forgot Password Management (Unauthenticated)',
    list: []
})
api[0].list[52].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/forgot/request/customer',
    methodId: 'aa6359793293d4a66414ce920bbc269f',
    desc: 'Initiate Forgot Password for Customer',
});
api[0].list[52].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/forgot/request/merchant',
    methodId: 'c3aa16cb33fa000d6661c0b6e8b631d4',
    desc: 'Initiate Forgot Password for Merchant',
});
api[0].list[52].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/reset/customer',
    methodId: '8bc5757cbe0a3235b2afebf56f283778',
    desc: 'Reset Customer Password.',
});
api[0].list[52].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/reset/merchant',
    methodId: 'd61dc027e05bfb390012eb9234755b89',
    desc: 'Reset Merchant Password.',
});
api[0].list.push({
    alias: 'PaystackWebhookController',
    order: '54',
    link: 'paystackwebhookcontroller',
    desc: 'PaystackWebhookController',
    list: []
})
api[0].list[53].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/paystack',
    methodId: 'f47a722b85531fa26c916e4fccd5402c',
    desc: 'handleWebhook',
});
api[0].list.push({
    alias: 'ProductController',
    order: '55',
    link: 'product_management',
    desc: 'Product Management',
    list: []
})
api[0].list[54].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products',
    methodId: '602c60e0c6c449b301cfcb1b3c58b0ac',
    desc: 'Get All Products',
});
api[0].list[54].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products',
    methodId: 'f7b551eea448d2c97ee531aae755ec5e',
    desc: 'Create Product',
});
api[0].list[54].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}',
    methodId: '75a1f711dba574c2e2c560e4d2fe0ff1',
    desc: 'Update Product',
});
api[0].list[54].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}',
    methodId: '131ab3904dc5fc1911696814c4b10bf1',
    desc: 'Get Product Details',
});
api[0].list[54].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/similar/by/category/{productId}',
    methodId: '1241fe80ab493f3253f690674a08dc3d',
    desc: 'Get Similar Products',
});
api[0].list[54].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}',
    methodId: '182d6afa6b55185cfebf4072ad7a6e63',
    desc: 'Delete Product',
});
api[0].list[54].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}/rating',
    methodId: '86bc1c589aae09219c98c3af1c3fe522',
    desc: 'Get Product Rating  Retrieves the average customer rating for a product calculated from all customer reviews. Rating provides social proof and helps customers make purchase decisions.',
});
api[0].list[54].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/top-selling',
    methodId: 'b43d8f582b421ebbdea689fdc0c1904b',
    desc: 'Get Top Selling Products (Public)  Retrieves a list of the most popular products based on total quantity sold. This endpoint is public-facing and omits sensitive business metrics.',
});
api[0].list.push({
    alias: 'CartSessionController',
    order: '56',
    link: 'cartsessioncontroller',
    desc: 'CartSessionController',
    list: []
})
api[0].list[55].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/generate/session/id',
    methodId: 'e55ac7fdc87ea0cccd19524b9c24a87f',
    desc: 'getSessionID',
});
api[0].list.push({
    alias: 'AddressController',
    order: '57',
    link: 'addresscontroller',
    desc: 'AddressController',
    list: []
})
api[0].list[56].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses',
    methodId: '35402a4e699148ebbd8931d0fd1d95e4',
    desc: 'getUserAddresses',
});
api[0].list[56].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses',
    methodId: '7b7a36375a116d8022e7ec5d1851c951',
    desc: 'store',
});
api[0].list[56].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}',
    methodId: '1eb3ebd96d3d60f2985445c0317ec8f7',
    desc: 'updateAddress',
});
api[0].list[56].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}',
    methodId: '9bebaa479b9b23eb4ff5a8e2e88d9130',
    desc: 'deleteAddress',
});
api[0].list[56].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}/default',
    methodId: 'ebb2e659d486235130b53f1c159a8875',
    desc: 'makeAddressDefault',
});
api[0].list.push({
    alias: 'dict',
    order: '58',
    link: 'dict_list',
    desc: 'Data Dictionaries',
    list: []
})
api[0].list[57].list.push({
    order: '1',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Order Status Codes',
});
api[0].list[57].list.push({
    order: '2',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Payment Statuses',
});
api[0].list[57].list.push({
    order: '3',
    deprecated: 'false',
    url: '',
    methodId: '',
    desc: 'Payment Gateways',
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