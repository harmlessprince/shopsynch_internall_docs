let api = [];
const apiDocListSize = 1
api.push({
    name: 'default',
    order: '1',
    list: []
})
api[0].list.push({
    alias: 'AuthController',
    order: '1',
    link: 'authentication.',
    desc: 'Authentication.',
    list: []
})
api[0].list[0].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/signup/merchant.do',
    methodId: '3043ac33af4d542a26de87becc6fb7ee',
    desc: 'Register Shop Owner  Registers a new shop owner (merchant) account with store details. This endpoint handles the complete merchant registration workflow including email verification token generation and merchant creation event publishing.',
});
api[0].list[0].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/login.do',
    methodId: 'fa19cf5b1eb76ca04b66b8999c0c57eb',
    desc: 'Login User (Shop Owner/Merchant)  Authenticates a shop owner or merchant user using email and password credentials. Upon successful authentication, generates a JWT token for subsequent API calls and returns the authenticated user&apos;s details.',
});
api[0].list[0].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/login/customer.do',
    methodId: 'c12f7a6d09d97c07b51e7e9aaa41a841',
    desc: 'Login Customer  Authenticates a customer user using email and password credentials. Upon successful authentication, generates a JWT token for API access and returns the customer&apos;s profile information. Also publishes a customer login event for tracking and analytics.',
});
api[0].list.push({
    alias: 'TestAppController',
    order: '2',
    link: 'testappcontroller',
    desc: 'TestAppController',
    list: []
})
api[0].list[1].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/internal/test/create/merchant/profile.do',
    methodId: '11c017c95017790877bb7466cc16c012',
    desc: 'createUser',
});
api[0].list[1].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/internal/test/update/tenant/collection.do',
    methodId: 'daa5573f10a4e96b9eeadfd3a29b7c17',
    desc: 'updateTenantProfile',
});
api[0].list[1].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/internal/test/update/user/collection.do',
    methodId: '6c6e638fa41d9fd2bf7233716ca57d15',
    desc: 'updateUser',
});
api[0].list[1].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/internal/test/update/payment-secret.do',
    methodId: '062485a337c2b44053974f91ea0272fe',
    desc: 'updatePaymentSecret',
});
api[0].list.push({
    alias: 'WhatsAppAuthController',
    order: '3',
    link: 'whatsappauthcontroller',
    desc: 'WhatsAppAuthController',
    list: []
})
api[0].list[2].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/phone/initiate.do',
    methodId: '4fa19983afa5383b8859b165752d6d87',
    desc: 'initiateOTP',
});
api[0].list[2].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/phone/verify.do',
    methodId: '94a2af74f5679ee9350885184d0b70d5',
    desc: 'verifyOTP',
});
api[0].list.push({
    alias: 'PaymentGatewayController',
    order: '4',
    link: 'paymentgatewaycontroller',
    desc: 'PaymentGatewayController',
    list: []
})
api[0].list[3].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-gateway/verify-account-number.do',
    methodId: 'd4d1c632ee43f79d7df127df11d76db8',
    desc: 'resolveAccountDetail',
});
api[0].list.push({
    alias: 'PromoAdController',
    order: '5',
    link: 'promo_ad_api promo_ads_enable_store_owners_or_admins_to_seamlessly_add_advertisements_to_their_homepage_or_any_other_page_on_their_website. whether_it&amp;apos;s_in_the_hero_section_or_any_other_part_of_the_webpage, this_feature_provides_the_flexibility_to_display_promotions_exactly_where_they’ll_be_most_effective, helping_you_grab_attention_and_increase_engagement.',
    desc: 'Promo Ad API Promo ads enable store owners or admins to seamlessly add advertisements to their homepage or any other page on their website. Whether it&amp;apos;s in the hero section or any other part of the webpage, this feature provides the flexibility to display promotions exactly where they’ll be most effective, helping you grab attention and increase engagement.',
    list: []
})
api[0].list[4].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads.do',
    methodId: '23eed6e3541e4cbc09bdf0129d92443f',
    desc: 'createAd',
});
api[0].list[4].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}.do',
    methodId: '69b2d7ea2d37424761aa9e7c8d72864d',
    desc: 'updateAd',
});
api[0].list[4].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}.do',
    methodId: '298a4eb3c41986e6821fab71931a4c68',
    desc: 'getAdById',
});
api[0].list[4].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads.do',
    methodId: 'f13c7e1d13cc5b393d3702b48a075410',
    desc: 'Fetch Promo Ads. This API retrieves a list of promotional ads filtered by status and paginated using a cursor. The response includes promotional ads in either DRAFT or PUBLISHED status.',
});
api[0].list[4].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/published.do',
    methodId: 'cd217d4055c74776194690e9f3872f96',
    desc: 'getAllPublishedAds',
});
api[0].list[4].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/update/{id}/status/{status}.do',
    methodId: '13b7e0487de6e60a3fe85e3dc4786f92',
    desc: 'changeAdsStatus',
});
api[0].list[4].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promo-ads/{id}.do',
    methodId: 'ed7c384e95e33647a103b367b3a75626',
    desc: 'deleteAd',
});
api[0].list.push({
    alias: 'CustomerOrderController',
    order: '6',
    link: 'customerordercontroller',
    desc: 'CustomerOrderController',
    list: []
})
api[0].list[5].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders.do',
    methodId: 'b66b31c3d59d0d391208de9a62871916',
    desc: 'getCustomerOrders',
});
api[0].list[5].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders/{customerId}.do',
    methodId: '6397e5deffc3327c96c4929f45088396',
    desc: 'fetchCustomerOrders',
});
api[0].list[5].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customer-orders/{orderId}/items.do',
    methodId: '7960689c6019705dc812e3c49bf9b5fe',
    desc: 'getOrderItems',
});
api[0].list.push({
    alias: 'CartController',
    order: '7',
    link: 'cartcontroller',
    desc: 'CartController',
    list: []
})
api[0].list[6].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/items.do',
    methodId: '9ae9ec28b44b18de5cee10d716ab2840',
    desc: 'listItemsInCart',
});
api[0].list[6].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/add.do',
    methodId: '7eef633926c0c939dc677a337abc56b9',
    desc: 'addItemToCart',
});
api[0].list[6].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/remove/{carItemId}.do',
    methodId: 'eeb2a371071485fa427d8467c5dc0d44',
    desc: 'removeItemFromCart',
});
api[0].list[6].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/item/increment/quantity/{cartId}.do',
    methodId: '38371979b0f11857aa41843a413ae468',
    desc: 'incrementItemQuantity',
});
api[0].list[6].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/item/decrement/quantity/{cartId}.do',
    methodId: '52ee31353e7b87f668cfacb6780f3324',
    desc: 'decrementItemQuantity',
});
api[0].list[6].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/clear.do',
    methodId: '1082d8e90f239d66e4285d93d7b8224f',
    desc: 'clearCart',
});
api[0].list[6].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/checkout.do',
    methodId: '512864f9afbe838ddb4c3e41fbc1393d',
    desc: 'checkoutCart',
});
api[0].list[6].list.push({
    order: '8',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/carts/guest/checkout.do',
    methodId: 'a144f0800c383e972d4a58052cc0538b',
    desc: 'guestCheckout',
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
    url: 'https://api.shopsynch.com/v1/categories.do',
    methodId: '5dfef8e3459afb0677c75009a06194ce',
    desc: 'getAllCategories',
});
api[0].list.push({
    alias: 'DeliveryZoneController',
    order: '9',
    link: 'deliveryzonecontroller',
    desc: 'DeliveryZoneController',
    list: []
})
api[0].list[8].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones.do',
    methodId: '1a83a9dee588c7424203b2e67d44d2ae',
    desc: 'createZone',
});
api[0].list[8].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones.do',
    methodId: '80ce2161699b3fe57690f9f59f0292ad',
    desc: 'getZones',
});
api[0].list[8].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones/{id}.do',
    methodId: 'f17698c1f116a16283eab014c4bc2565',
    desc: 'updateZone',
});
api[0].list[8].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/delivery-zones/{id}.do',
    methodId: '6f4484dc94cea460ac67de61cf31009b',
    desc: 'deleteZone',
});
api[0].list.push({
    alias: 'PromotionController',
    order: '10',
    link: 'promotion_management.',
    desc: 'Promotion management.',
    list: []
})
api[0].list[9].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/apply/promo-code.do',
    methodId: 'a2d5739d4472bb583e47748d82896acd',
    desc: 'Apply Promo Code Applies a promo code to calculate discounted price&quot;',
});
api[0].list[9].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions.do',
    methodId: 'b57c71d78cdc01959d4d458dc8e7fb1b',
    desc: 'Create Promotion Only accessible by merchant',
});
api[0].list[9].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions.do',
    methodId: 'b9c21bdfd17324306ec0d10f816e6d8e',
    desc: 'Fetch All Promotions Only accessible by merchant',
});
api[0].list[9].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}.do',
    methodId: 'c9b52db21f462ea9831779f011389aa6',
    desc: 'Show Promotion Only accessible to merchant',
});
api[0].list[9].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}.do',
    methodId: '98d861e9e3d65e5407ed810786739bd6',
    desc: 'Update Promotion Only accessible to merchant',
});
api[0].list[9].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/promotions/{promotionId}.do',
    methodId: '29bfe16c867583b219d236894d08c475',
    desc: 'Delete Promotion Only accessible to merchant',
});
api[0].list.push({
    alias: 'MerchantController',
    order: '11',
    link: 'merchantcontroller',
    desc: 'MerchantController',
    list: []
})
api[0].list[10].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/profile.do',
    methodId: 'd9a31bc791df9688c9f339f4489e1c96',
    desc: 'getUserProfile',
});
api[0].list[10].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/profile/business.do',
    methodId: 'dc42264d7e9318fa680f63c39d25535a',
    desc: 'getUserProfileBusiness',
});
api[0].list.push({
    alias: 'RoleController',
    order: '12',
    link: 'rolecontroller',
    desc: 'RoleController',
    list: []
})
api[0].list[11].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/roles.do',
    methodId: '6d7d3684c05dc9ff908d1f733e9fc270',
    desc: 'findAll',
});
api[0].list.push({
    alias: 'ProductStatsController',
    order: '13',
    link: 'productstatscontroller',
    desc: 'ProductStatsController',
    list: []
})
api[0].list[12].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/product-stats.do',
    methodId: '51bf7fec32aab042df2445552135c1c5',
    desc: 'index',
});
api[0].list.push({
    alias: 'VariationOptionController',
    order: '14',
    link: 'variationoptioncontroller',
    desc: 'VariationOptionController',
    list: []
})
api[0].list[13].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/variation/options/{variationId}.do',
    methodId: 'c04465f75d6b12d3dfcbccd942add990',
    desc: 'getAllVariations',
});
api[0].list.push({
    alias: 'ReviewController',
    order: '15',
    link: 'reviewcontroller',
    desc: 'ReviewController',
    list: []
})
api[0].list[14].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews.do',
    methodId: '0b9965cf3cce5830354d4463be7b296f',
    desc: 'Get All Reviews  Retrieves all product reviews in the merchant&apos;s store with optional filtering. Shop owners use this to monitor customer feedback, identify problematic reviews, and manage reputation.',
});
api[0].list[14].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/product/{productId}.do',
    methodId: '0b5112181d406b277bd044cd3781d98e',
    desc: 'Get Product Reviews  Retrieves all reviews for a specific product. Reviews are filtered by status (active, hidden, or pending) to display only appropriate reviews on product detail pages.',
});
api[0].list[14].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/add.do',
    methodId: '562f22d968bf15eda9978b126994a902',
    desc: 'Create/Submit Product Review  Submits a new product review from a customer. Reviews include rating, comment, and reviewer name. System validates one review per customer per product and performs moderation checks.',
});
api[0].list[14].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/{reviewId}.do',
    methodId: '0595ea2ae24a3a218bc889f89b1b00c6',
    desc: 'Delete Review  Permanently deletes a product review. Removed review no longer appears on product pages or in review listings. Deletion is irreversible (deleted review cannot be recovered).',
});
api[0].list[14].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/reviews/hide/{reviewId}.do',
    methodId: '2fd9b7fcf0ea359a151d8ddf0ddd0198',
    desc: 'Hide Review  Hides a review from public display temporarily. Hidden reviews no longer appear on product pages but remain in system for audit purposes. Reviews can be unhidden if needed (soft deletion).',
});
api[0].list.push({
    alias: 'TenantController',
    order: '16',
    link: 'tenantcontroller',
    desc: 'TenantController',
    list: []
})
api[0].list[15].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/merchants/tenant/bank-details.do',
    methodId: '9b41b4986cca45564316115804c28c89',
    desc: 'addBankDetails',
});
api[0].list.push({
    alias: 'ColorController',
    order: '17',
    link: 'colorcontroller',
    desc: 'ColorController',
    list: []
})
api[0].list[16].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/colors.do',
    methodId: '7d7d0ff6e3ffda2ce913650eb06f7028',
    desc: 'getAllColors',
});
api[0].list.push({
    alias: 'VariationController',
    order: '18',
    link: 'variationcontroller',
    desc: 'VariationController',
    list: []
})
api[0].list[17].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/variations.do',
    methodId: '5d22058e1fd7f0d17a50bb5b5792f887',
    desc: 'createVariation',
});
api[0].list.push({
    alias: 'EmailPreviewController',
    order: '19',
    link: 'emailpreviewcontroller',
    desc: 'EmailPreviewController',
    list: []
})
api[0].list[18].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/welcome.do',
    methodId: '91d22fda29bb1628845c5a6535236aad',
    desc: 'previewWelcomeEmail',
});
api[0].list[18].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/merchant/new-order/{orderId}.do',
    methodId: '39a7ebc151c6356afe8e125cf9e592c2',
    desc: 'previewMerchantNewOrder',
});
api[0].list[18].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer/order-confirmation/{orderId}.do',
    methodId: 'f4993eb9944736fe20a0c9afc630629b',
    desc: 'previewCustomerOrderConfirmation',
});
api[0].list[18].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/customer/payment-confirmation/{paymentId}.do',
    methodId: '23b2a858266195729ecbda885214f141',
    desc: 'previewCustomerPaymentConfirmation',
});
api[0].list[18].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/api/v1/test/email-preview/forgot-password.do',
    methodId: 'ab603489f8e1549cbca9198f50089dfa',
    desc: 'previewForgotPassword',
});
api[0].list.push({
    alias: 'CustomerController',
    order: '20',
    link: 'customercontroller',
    desc: 'CustomerController',
    list: []
})
api[0].list[19].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers.do',
    methodId: 'fae2c9b5de1cfb53d7996eeafeccee27',
    desc: 'Get All Customers  Retrieves a paginated list of customers for a shop owner with advanced pagination support using cursor-based navigation. Supports filtering by search term, registration date range, account status, and account type.',
});
api[0].list[19].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/profile.do',
    methodId: '11b7ce0b35465a5a7b1c6380ae02e8e3',
    desc: 'Get Authenticated Customer Profile  Retrieves the complete profile information of the authenticated customer, including personal details, account status, preferences, and account type.',
});
api[0].list[19].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}.do',
    methodId: '456c7ae2d880abc457b287956376348c',
    desc: 'Get Specific Customer (Shop Owner View)  Retrieves detailed information for a specific customer by ID. Only shop owners can access other customers&apos; data. Returns all customer details for merchant relationship and account management purposes.',
});
api[0].list[19].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}/deactivate.do',
    methodId: '0abd05f73267bf8fa84c42b161f47f45',
    desc: 'Deactivate Customer Account  Deactivates a customer account, preventing further login and transactions. The account remains in the system for historical and audit purposes but becomes inactive. Account can be reactivated if needed.',
});
api[0].list[19].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/{customerId}/activate.do',
    methodId: '23167bd3010adc9f4f13d6179e97eede',
    desc: 'Activate Customer Account  Reactivates a previously deactivated customer account. Once reactivated, customer can log in and place orders again. Account retains all historical data and order history.',
});
api[0].list[19].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/signup.do',
    methodId: 'a07a4635daa35aafa41b7cbe6e6f6ceb',
    desc: 'Register New Customer  Registers a new customer account in the current store/tenant. Validates email uniqueness, creates customer record, and returns customer profile with confirmation of successful registration.',
});
api[0].list[19].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/customers/profile/update.do',
    methodId: '869066a7136dfcb2e62f7cc777f43fdf',
    desc: 'Update Customer Profile  Updates the authenticated customer&apos;s profile information. Customer can modify personal details, contact information, preferences, and other account settings.',
});
api[0].list.push({
    alias: 'EmailVerificationController',
    order: '21',
    link: 'emailverificationcontroller',
    desc: 'EmailVerificationController',
    list: []
})
api[0].list[20].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/email/merchant/verify.do',
    methodId: '090d110b891d967f6bdefae8a25c2587',
    desc: 'verifyEmail',
});
api[0].list[20].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/email/merchant/initiate/verification.do',
    methodId: 'f852376784a2c56aa21a990832bd2e32',
    desc: 'initiateEmailVerification',
});
api[0].list.push({
    alias: 'CustomerAuthController',
    order: '22',
    link: 'customerauthcontroller',
    desc: 'CustomerAuthController',
    list: []
})
api[0].list[21].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/signup.do',
    methodId: '26525736959fc67d40c2ec6baba01c8e',
    desc: 'registerCustomer',
});
api[0].list[21].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/signup/google.do',
    methodId: '6d60511c8162d06510dfbfa7bac28657',
    desc: 'registerCustomerViaGoogle',
});
api[0].list[21].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/customer/login/google.do',
    methodId: '232bf517af8365ac1854f4d687c97339',
    desc: 'loginCustomerViaGoogle',
});
api[0].list.push({
    alias: 'UserController',
    order: '23',
    link: 'usercontroller',
    desc: 'UserController',
    list: []
})
api[0].list[22].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile.do',
    methodId: 'a661e39277999c9f6d51859946734b85',
    desc: 'getUserProfile',
});
api[0].list[22].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile/with/role.do',
    methodId: '0c21283d6285bd659e4423a704be3c4e',
    desc: 'getUserProfileWithRole',
});
api[0].list[22].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/users/profile/update.do',
    methodId: 'fbbd246c81a1045601c1ec777ada9936',
    desc: 'updateContact',
});
api[0].list.push({
    alias: 'OrderController',
    order: '24',
    link: 'ordercontroller',
    desc: 'OrderController',
    list: []
})
api[0].list[23].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders.do',
    methodId: '8bca6265e4aba517ce0aeb6f72d333b1',
    desc: 'Get All Orders  Retrieves a paginated and filtered list of orders for an authenticated shop owner. Supports sorting by various fields, pagination, and multiple filtering criteria including search terms, order status, payment status, amount ranges, and date ranges.',
});
api[0].list[23].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderNumber}/show.do',
    methodId: '00015578a7f79090d8ec97abf7118a32',
    desc: 'Get Order by Order Number  Retrieves a single order by its order number. Order number is visible to both customers and merchants, providing a human-readable alternative to internal order IDs.',
});
api[0].list[23].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/detail.do',
    methodId: '150f612186ab664c6ab4caa72ab1d5d6',
    desc: 'Get Order Detail for Merchant  Retrieves complete order details including all associated order line items for a shop owner. Provides comprehensive view necessary for order fulfillment, including item quantities, prices, and variants.',
});
api[0].list[23].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/items.do',
    methodId: '5beeb8c23f5ead8f7c8be4e3430595f2',
    desc: 'Get Order Line Items  Retrieves all line items (products) associated with a specific order. Each line item includes product details, variant information, quantity ordered, and pricing.',
});
api[0].list[23].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/status.do',
    methodId: '5cd3387860122d0ccdf8c9b4d72f2b5b',
    desc: 'Update Order Status  Updates the current status of an order to reflect fulfillment progress. Valid status transitions are enforced to prevent invalid workflow progressions. Records an audit trail entry capturing who changed the status and why.',
});
api[0].list[23].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/{orderId}/force-status.do',
    methodId: '6f02f14a425f4ce53cc0541f93724acd',
    desc: 'Force Update Order Status (Admin Override)  Bypasses all standard transition rules and forcibly sets the order to the given status. Use with caution — this is intended for administrative corrections only (e.g., stuck orders, data recovery, third-party sync discrepancies).',
});
api[0].list[23].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/orders/merchant/stats.do',
    methodId: 'a4b57f9ea9d653fe52e58a76bf9dd106',
    desc: 'Get Order Statistics  Retrieves comprehensive order statistics for a merchant including order count, total revenue, average order value, orders by status breakdown, and other aggregated metrics useful for business insights and dashboards.',
});
api[0].list.push({
    alias: 'WhatsAppWebhookController',
    order: '25',
    link: 'whatsappwebhookcontroller',
    desc: 'WhatsAppWebhookController',
    list: []
})
api[0].list[24].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp/send-template.do',
    methodId: '53f5e9c1bf694beb4d521caee07aa266',
    desc: 'Send a template message to initiate or re-establish a connection.',
});
api[0].list[24].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp.do',
    methodId: '6d0c5cdc794b217d2102b8f5fb6aea24',
    desc: 'verifyWebhook',
});
api[0].list[24].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/webhooks/whatsapp.do',
    methodId: '13b422174db718b58e8f4ef067151a3f',
    desc: 'receiveMessage',
});
api[0].list.push({
    alias: 'SocialAuthController',
    order: '26',
    link: 'socialauthcontroller',
    desc: 'SocialAuthController',
    list: []
})
api[0].list[25].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/auth/social/google/signup/merchant.do',
    methodId: 'd416a2c7749d8f4a4bd07bcc1b8a7b4e',
    desc: 'registerMerchant',
});
api[0].list.push({
    alias: 'ProductVariationController',
    order: '27',
    link: 'productvariationcontroller',
    desc: 'ProductVariationController',
    list: []
})
api[0].list[26].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/{variationId}.do',
    methodId: '862c14c3082787c05908efdb63961536',
    desc: 'updateProductVariation',
});
api[0].list[26].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/add.do',
    methodId: '0a0d515a713d559798b3e39f1e491078',
    desc: 'addProductVariation',
});
api[0].list.push({
    alias: 'StateController',
    order: '28',
    link: 'statecontroller',
    desc: 'StateController',
    list: []
})
api[0].list[27].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/states/{countryId}.do',
    methodId: 'abf63e23b503e47ae7e35c42493c5661',
    desc: 'index',
});
api[0].list.push({
    alias: 'ComplianceController',
    order: '29',
    link: 'compliancecontroller',
    desc: 'ComplianceController',
    list: []
})
api[0].list[28].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/profile.do',
    methodId: '7e83ce029de141a722b2854098408b5b',
    desc: 'getBusinessProfile',
});
api[0].list[28].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/status.do',
    methodId: '8de9039399d35ed4948edd79dc04d096',
    desc: 'getBusinessComplianceStatus',
});
api[0].list[28].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/profile.do',
    methodId: '22c803391d364cc84b6897cd5cc6efe7',
    desc: 'updateBusinessProfile',
});
api[0].list[28].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/contact/detail.do',
    methodId: '333c7f4d381f3c513706c09f19d4d383',
    desc: 'getBusinessContact',
});
api[0].list[28].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/compliance/business/contact/detail.do',
    methodId: 'd224afb86cfe933dbe5bb0c4cbda1f9e',
    desc: 'updateBusinessContact',
});
api[0].list.push({
    alias: 'CountryController',
    order: '30',
    link: 'countrycontroller',
    desc: 'CountryController',
    list: []
})
api[0].list[29].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/countries.do',
    methodId: '92859af28e035c3955dddb41c3cff82f',
    desc: 'getAllCountries',
});
api[0].list.push({
    alias: 'SpecificationController',
    order: '31',
    link: 'specificationcontroller',
    desc: 'SpecificationController',
    list: []
})
api[0].list[30].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/specifications.do',
    methodId: '46ce6f26556a2b372b4c1092ab6615ce',
    desc: 'getSpecifications',
});
api[0].list.push({
    alias: 'ConfigController',
    order: '32',
    link: 'configcontroller',
    desc: 'ConfigController',
    list: []
})
api[0].list[31].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/currentMode/{mode}.do',
    methodId: '04e57a6e750a85f91d71f7495b5ec135',
    desc: 'updateCurrentMode',
});
api[0].list[31].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/domain.do',
    methodId: '68423828012c3af9c2e6a00662366531',
    desc: 'updateDomain',
});
api[0].list[31].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/domain.do',
    methodId: 'd377e1a2c0a098faa9c9523b638ccece',
    desc: 'getDomains',
});
api[0].list[31].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/keys.do',
    methodId: '9afe865c81823e190deac0ddf7ced2e0',
    desc: 'getKeys',
});
api[0].list[31].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/regenerate/keys/{mode}.do',
    methodId: '188775cb6746174329a37defaaab411b',
    desc: 'generateKeys',
});
api[0].list[31].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/config/sync/profile.do',
    methodId: 'e84397c2a6e592a387ca46264ac75511',
    desc: 'syncProfile',
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
    url: 'https://api.shopsynch.com/v1/health.do',
    methodId: '57285e31c4400dc59fb47f6c288b3536',
    desc: 'getHealth',
});
api[0].list[32].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/healths.do',
    methodId: '0103512c7c6cd0ce66467092691fc7ed',
    desc: 'getHealths',
});
api[0].list.push({
    alias: 'ProductVariationPriceDetailController',
    order: '34',
    link: 'productvariationpricedetailcontroller',
    desc: 'ProductVariationPriceDetailController',
    list: []
})
api[0].list[33].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/priceDetail/{variationPriceDetailId}.do',
    methodId: '0e207a059010360d544e57b8a4beb596',
    desc: 'updateProductVariationPriceDetail',
});
api[0].list[33].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/variation/priceDetail.do',
    methodId: 'c009682c23765b98d956c0aca2df4f51',
    desc: 'addProductVariationPriceDetail',
});
api[0].list.push({
    alias: 'FileController',
    order: '35',
    link: 'filecontroller',
    desc: 'FileController',
    list: []
})
api[0].list[34].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/files/upload/single/image.do',
    methodId: '15ae4b213f6a3636dec8b7fd22b36ea3',
    desc: 'uploadSingleImage',
});
api[0].list[34].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/files/upload/multiple/images.do',
    methodId: '3cf3e42903fc6c236c6fe3d8aba909ea',
    desc: 'uploadMultipleImages',
});
api[0].list.push({
    alias: 'PaymentMethodController',
    order: '36',
    link: 'paymentmethodcontroller',
    desc: 'PaymentMethodController',
    list: []
})
api[0].list[35].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-methods.do',
    methodId: 'a2afc573024e174a57b4339d8f974bee',
    desc: 'getAllPaymentMethods',
});
api[0].list.push({
    alias: 'TenantCategoryController',
    order: '37',
    link: 'tenantcategorycontroller',
    desc: 'TenantCategoryController',
    list: []
})
api[0].list[36].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories.do',
    methodId: '5c839cdbe8e243af0732e3083b66d902',
    desc: 'getAllCategories',
});
api[0].list[36].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories.do',
    methodId: 'c1dc2db691667f40a855be6d79f38964',
    desc: 'createCategory',
});
api[0].list[36].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/tenant-categories/{categoryId}.do',
    methodId: '7017b48abe30e62ec8a73bb351b7016e',
    desc: 'deleteCategory',
});
api[0].list.push({
    alias: 'PaymentSecretController',
    order: '38',
    link: 'paymentsecretcontroller',
    desc: 'PaymentSecretController',
    list: []
})
api[0].list[37].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-secrets.do',
    methodId: '1a8b3cfac82e9b9e9fb3930e3312d12e',
    desc: 'allSecrets',
});
api[0].list[37].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-secrets.do',
    methodId: '464863a9b476af946cc1cd4c4f7a6102',
    desc: 'saveSecret',
});
api[0].list[37].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payment-secrets/{paymentSecretId}.do',
    methodId: '8c41c4d05c66234be674f3daefb2d971',
    desc: 'saveSecret',
});
api[0].list.push({
    alias: 'LocalGovernmentController',
    order: '39',
    link: 'localgovernmentcontroller',
    desc: 'LocalGovernmentController',
    list: []
})
api[0].list[38].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/local-governments/{stateId}.do',
    methodId: '292982b66f40314e6efc295d96703037',
    desc: 'index',
});
api[0].list.push({
    alias: 'AppTokenController',
    order: '40',
    link: 'apptokencontroller',
    desc: 'AppTokenController',
    list: []
})
api[0].list[39].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/verify/merchant/reset-password-token.do',
    methodId: '8b57860ad6a22525593b7be02543807e',
    desc: 'verifyMerchantResetPasswordToken',
});
api[0].list.push({
    alias: 'ChangePasswordController',
    order: '41',
    link: 'changepasswordcontroller',
    desc: 'ChangePasswordController',
    list: []
})
api[0].list[40].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/change/password/customer.do',
    methodId: '12915658062bdc6a85b2c4bb124a7965',
    desc: 'changeCustomerPassword',
});
api[0].list[40].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/change/password/merchant.do',
    methodId: 'dea6b0e82069187a6eb7e62aa20ad9d3',
    desc: 'changeMerchantPassword',
});
api[0].list.push({
    alias: 'BrandController',
    order: '42',
    link: 'brandcontroller',
    desc: 'BrandController',
    list: []
})
api[0].list[41].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/brands.do',
    methodId: '115e772d8da36d4d867fe9611d6a729a',
    desc: 'getAllBrands',
});
api[0].list.push({
    alias: 'ForgotPasswordController',
    order: '43',
    link: 'forgotpasswordcontroller',
    desc: 'ForgotPasswordController',
    list: []
})
api[0].list[42].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/forgot/request/customer.do',
    methodId: 'aa6359793293d4a66414ce920bbc269f',
    desc: 'Forgot Password - Generates Reset Token and Sends Email',
});
api[0].list[42].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/forgot/request/merchant.do',
    methodId: 'c3aa16cb33fa000d6661c0b6e8b631d4',
    desc: 'Forgot Password - Generates Reset Token and Sends Email',
});
api[0].list[42].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/reset/customer.do',
    methodId: '8bc5757cbe0a3235b2afebf56f283778',
    desc: 'resetCustomerPassword',
});
api[0].list[42].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/password/reset/merchant.do',
    methodId: 'd61dc027e05bfb390012eb9234755b89',
    desc: 'resetMerchantPassword',
});
api[0].list.push({
    alias: 'ProductController',
    order: '44',
    link: 'productcontroller',
    desc: 'ProductController',
    list: []
})
api[0].list[43].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products.do',
    methodId: '602c60e0c6c449b301cfcb1b3c58b0ac',
    desc: 'Get All Products  Retrieves a paginated list of products with optional filtering and sorting. Supports filtering by search term, category, brand, color, price range, stock status, and customer rating. Results are returned in pages for efficient data loading and display.',
});
api[0].list[43].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products.do',
    methodId: 'f7b551eea448d2c97ee531aae755ec5e',
    desc: 'Create Product  Creates a new product in the merchant&apos;s store (tenant). Validates product details including brand, color, and category associations. Specifications are validated against tenant-specific configuration. Product is immediately published upon creation unless status is set to INACTIVE.',
});
api[0].list[43].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}.do',
    methodId: '75a1f711dba574c2e2c560e4d2fe0ff1',
    desc: 'Update Product  Updates an existing product&apos;s details. Allows modification of product information including name, description, pricing, status, and specifications. Only merchant who owns the product can update it.',
});
api[0].list[43].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}.do',
    methodId: '131ab3904dc5fc1911696814c4b10bf1',
    desc: 'Get Product Details  Retrieves complete details of a single product including all attributes, specifications, pricing, availability, and related information.',
});
api[0].list[43].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/similar/by/category/{productId}.do',
    methodId: '1241fe80ab493f3253f690674a08dc3d',
    desc: 'Get Similar Products  Retrieves a list of products similar to a specified product, typically from the same category or with related attributes. Useful for &quot;You might also like&quot; or &quot;Related products&quot; sections in product detail pages.',
});
api[0].list[43].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}.do',
    methodId: '182d6afa6b55185cfebf4072ad7a6e63',
    desc: 'Delete Product  Permanently deletes a product from the merchant&apos;s store. Product details are removed from system but historical order records remain intact for audit purposes.',
});
api[0].list[43].list.push({
    order: '7',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/products/{productId}/rating.do',
    methodId: '86bc1c589aae09219c98c3af1c3fe522',
    desc: 'Get Product Rating  Retrieves the average customer rating for a product calculated from all customer reviews. Rating provides social proof and helps customers make purchase decisions.',
});
api[0].list.push({
    alias: 'CartSessionController',
    order: '45',
    link: 'cartsessioncontroller',
    desc: 'CartSessionController',
    list: []
})
api[0].list[44].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/generate/session/id.do',
    methodId: 'e55ac7fdc87ea0cccd19524b9c24a87f',
    desc: 'getSessionID',
});
api[0].list.push({
    alias: 'PaymentController',
    order: '46',
    link: 'paymentcontroller',
    desc: 'PaymentController',
    list: []
})
api[0].list[45].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments.do',
    methodId: '7c5361a34da8b80f053a0046d79b2ad6',
    desc: 'Get All Payments &lt;p&gt; Retrieves a paginated list of payments for a tenant with cursor-based navigation.',
});
api[0].list[45].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/order/{orderId}.do',
    methodId: '3b5ec24d972e71038197f4163e8beb9f',
    desc: 'Get Payment by Order ID &lt;p&gt; Retrieves the payment details associated with a specific order.',
});
api[0].list[45].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/initialize.do',
    methodId: '8ef0a005bbca6a4954cf34681e8b3ecf',
    desc: 'Initialize Customer Payment &lt;p&gt; Initializes a payment transaction for an authenticated customer&apos;s order. Validates the requested payment gateway and method, ensures the merchant has configured the payment gateway, creates a payment record, and initiates the payment processing with the external payment gateway.',
});
api[0].list[45].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/guest/initialize.do',
    methodId: 'e3a4f43efac78feffbefa60b250b1236',
    desc: 'Initialize Guest Payment &lt;p&gt; Initializes a payment transaction for a guest (unauthenticated) customer&apos;s order. Performs same validation as customer payment initialization but without requiring user authentication. Guest payment includes currency validation and creates a guest-friendly payment record.',
});
api[0].list[45].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/confirm.do',
    methodId: '3105326759ca7a7334354b7811fb014e',
    desc: 'Verify and Confirm Payment &lt;p&gt; Verifies payment completion with the external payment gateway using the payment reference. Confirms the payment amount, currency, and status, updates the payment record with gateway verification details, and triggers order status progression to PROCESSING. Also sends notification emails to merchant.',
});
api[0].list[45].list.push({
    order: '6',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/payments/{paymentId}/status.do',
    methodId: '79388ab405d77b003315b80d69f0cb9c',
    desc: 'Update Payment Status &lt;p&gt; Updates the payment status for a specific payment record. Used by shop owners to manually confirm or adjust payment status, particularly for offline or manual payment methods. Records status transition history and updates associated order status accordingly.',
});
api[0].list.push({
    alias: 'AddressController',
    order: '47',
    link: 'addresscontroller',
    desc: 'AddressController',
    list: []
})
api[0].list[46].list.push({
    order: '1',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses.do',
    methodId: '35402a4e699148ebbd8931d0fd1d95e4',
    desc: 'getUserAddresses',
});
api[0].list[46].list.push({
    order: '2',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses.do',
    methodId: '7b7a36375a116d8022e7ec5d1851c951',
    desc: 'store',
});
api[0].list[46].list.push({
    order: '3',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}.do',
    methodId: '1eb3ebd96d3d60f2985445c0317ec8f7',
    desc: 'updateAddress',
});
api[0].list[46].list.push({
    order: '4',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}.do',
    methodId: '9bebaa479b9b23eb4ff5a8e2e88d9130',
    desc: 'deleteAddress',
});
api[0].list[46].list.push({
    order: '5',
    deprecated: 'false',
    url: 'https://api.shopsynch.com/v1/addresses/{addressId}/default.do',
    methodId: 'ebb2e659d486235130b53f1c159a8875',
    desc: 'makeAddressDefault',
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