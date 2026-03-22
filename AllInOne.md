# Shopsynch API


## Authentication.
### Register Shop Owner<br><br>Registers a new shop owner (merchant) account with store details. This endpoint handles the complete<br>merchant registration workflow including email verification token generation and merchant creation event publishing.
**URL:** https://api.shopsynch.com/v1/auth/signup/merchant

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
         - Validates email uniqueness before registration
         - Automatically assigns the STORE_OWNER role
         - Creates a new tenant (store) associated with the user
         - Generates an email verification token (random digit format)
         - Constructs a verification URL with token and email
         - Sends a welcome email with verification details
         - Publishes a MerchantCreatedEvent for event-driven processing
         - Skips tenant context validation as registration is tenant-independent
         - Email verification is mandatory before full account activation

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Email is invalid)]|-||
|password|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=Password can not be less than 2 characters)]|-||
|fullName|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=full name cannot be less than 2 characters)]|-||
|phoneNumber|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=10, message=Phone number cannot be less than 10 characters)]|-||
|address|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=5, message=address cannot be less than 5 characters)]|-||
|storeName|string|true|No comments found.|-||
|clientUrl|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/auth/signup/merchant' --data '{
  "email": "",
  "password": "",
  "fullName": "",
  "phoneNumber": "",
  "address": "",
  "storeName": "",
  "clientUrl": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### Login User (Shop Owner/Merchant)<br><br>Authenticates a shop owner or merchant user using email and password credentials. Upon successful authentication,<br>generates a JWT token for subsequent API calls and returns the authenticated user&apos;s details.
**URL:** https://api.shopsynch.com/v1/auth/login

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
         - Uses email and password for credential validation
         - Generates a JWT token with user identity and roles embedded
         - Token is valid for the configured expiration duration (typically 24 hours or per configuration)
         - X-Session-Id header is optional and used for tracking login events
         - Skips tenant context validation as login is tenant-independent
         - Returned token must be included in Authorization header for subsequent API calls
         - Password hashing verification is performed server-side for security

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-Session-Id|string|false|Optional session identifier header (X-Session-Id) for tracking login events and session management.<br/>                 If not provided, login proceeds without explicit session tracking.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|false|No comments found.|-||
|password|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/login' --data '{
  "email": "",
  "password": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|user|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|token|string|No comments found.|-||
|expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "user": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  },
  "token": "",
  "expiresIn": 0
}
```

### Login Customer<br><br>Authenticates a customer user using email and password credentials. Upon successful authentication, generates a JWT token<br>for API access and returns the customer&apos;s profile information. Also publishes a customer login event for tracking and analytics.
**URL:** https://api.shopsynch.com/v1/auth/login/customer

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
         - Authenticates customer in the context of current tenant/store
         - Generates JWT token specific to customer identity and permissions
         - Returns complete customer profile including preferences, account type, and status
         - X-Session-Id header enables customer login event publishing for tracking and audit logs
         - Token expiration is returned in milliseconds for client-side token refresh logic
         - Publishes CustomerLoginEvent only if sessionId is provided and tenant is valid
         - Customer must belong to the current tenant context for successful authentication
         - Requires active tenant context (unlike shop owner login which skips tenant check)

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-Session-Id|string|false|Optional session identifier header (X-Session-Id) for tracking customer login events and session correlation.<br/>                 If provided along with valid tenant, publishes CustomerLoginEvent for event-driven processing.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|false|No comments found.|-||
|password|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/login/customer' --data '{
  "email": "",
  "password": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|customer|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|token|string|No comments found.|-||
|expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "customer": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:39",
    "updatedAt": "2026-03-22 18:31:39"
  },
  "token": "",
  "expiresIn": 0
}
```

## Whatsapp Authentication
### Initiate OTP
**URL:** https://api.shopsynch.com/v1/auth/phone/initiate

**Type:** POST


**Content-Type:** application/json

**Description:** A One Time Password is sent to user whatsapp number to verify their identity


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|phoneNumber|string|true|No comments found.|-||
|businessName|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/phone/initiate' --data '{
  "phoneNumber": "",
  "businessName": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": ""
}
```

### Verify OTP
**URL:** https://api.shopsynch.com/v1/auth/phone/verify

**Type:** POST


**Content-Type:** application/json

**Description:** Verify OTP


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|phoneNumber|string|true|No comments found.|-||
|code|string|true|No comments found.|-||
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/phone/verify' --data '{
  "phoneNumber": "",
  "code": "",
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─user|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─token|string|No comments found.|-||
|└─expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "user": {
      "id": "",
      "email": "",
      "fullName": "",
      "phoneNumber": "",
      "address": "",
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    },
    "token": "",
    "expiresIn": 0
  }
}
```

## Payment Gateway
### Resolve Account Number:
**URL:** https://api.shopsynch.com/v1/payment-gateway/verify-account-number

**Type:** POST


**Content-Type:** application/json

**Description:** In test mode use
     {
     *     "accountNumber": "8131974410",
     *     "bankCode": "001",
     *     "gateway": "PAYSTACK"
     * }

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accountNumber|string|true|No comments found.|-||
|bankCode|string|true|No comments found.|-||
|gateway|enum|true|No comments found.<br/>[Enum: PAYSTACK-("PAYSTACK","Nigeria-based processor (Card, Transfer, USSD)"),FLUTTERWAVE-("FLUTTERWAVE","Global infrastructure for Africa-wide payments"),STRIPE-("STRIPE","International card processing (USD/EUR/GBP)"),OFFLINE-("OFFLINE","Manual bank transfer or Cash on Delivery"),MONNIFY-("MONNIFY","Automated bank transfer provider for Nigeria")]|-|PAYSTACK|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payment-gateway/verify-account-number' --data '{
  "accountNumber": "",
  "bankCode": "",
  "gateway": "PAYSTACK"
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## Promo Ad API
### Create Promo Ad
**URL:** https://api.shopsynch.com/v1/promo-ads

**Type:** POST


**Content-Type:** application/json

**Description:** This API creates a new promotional ad.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|adName|string|false|No comments found.|-||
|images|array|true|No comments found.|-|""","""|
|ctaText|string|false|No comments found.|-||
|promoCode|string|false|No comments found.|-||
|buttons|array|false|No comments found.|-||
|└─type|string|true|No comments found.|-||
|└─position|string|true|No comments found.|-||
|└─color|string|true|No comments found.|-||
|└─textColor|string|true|No comments found.|-||
|└─text|string|true|No comments found.|-||
|└─link|string|true|No comments found.|-||
|└─metadata|object|false|No comments found.|-||
|status|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promo-ads' --data '{
  "adName": "",
  "images": [
    ""
  ],
  "ctaText": "",
  "promoCode": "",
  "buttons": [
    {
      "type": "",
      "position": "",
      "color": "",
      "textColor": "",
      "text": "",
      "link": "",
      "metadata": {}
    }
  ],
  "status": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─adName|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─ctaText|string|No comments found.|-||
|└─promoCode|string|No comments found.|-||
|└─buttons|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─position|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─textColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─text|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─link|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─metadata|object|No comments found.|-||
|└─status|string|No comments found.|-||
|└─metadata|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:37"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:37"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "adName": "",
    "images": [
      ""
    ],
    "ctaText": "",
    "promoCode": "",
    "buttons": [
      {
        "type": "",
        "position": "",
        "color": "",
        "textColor": "",
        "text": "",
        "link": "",
        "metadata": {}
      }
    ],
    "status": "",
    "metadata": {},
    "createdAt": "2026-03-22 18:31:37",
    "updatedAt": "2026-03-22 18:31:37"
  },
  "message": "",
  "status": true
}
```

### Update Promo Ad
**URL:** https://api.shopsynch.com/v1/promo-ads/{id}

**Type:** PATCH


**Content-Type:** application/json

**Description:** This API updates a specific promotional ad by its ID.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|adName|string|false|No comments found.|-||
|images|array|true|No comments found.|-|""","""|
|ctaText|string|false|No comments found.|-||
|promoCode|string|false|No comments found.|-||
|buttons|array|false|No comments found.|-||
|└─type|string|true|No comments found.|-||
|└─position|string|true|No comments found.|-||
|└─color|string|true|No comments found.|-||
|└─textColor|string|true|No comments found.|-||
|└─text|string|true|No comments found.|-||
|└─link|string|true|No comments found.|-||
|└─metadata|object|false|No comments found.|-||
|status|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promo-ads/{id}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─adName|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─ctaText|string|No comments found.|-||
|└─promoCode|string|No comments found.|-||
|└─buttons|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─position|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─textColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─text|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─link|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─metadata|object|No comments found.|-||
|└─status|string|No comments found.|-||
|└─metadata|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:37"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:37"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "adName": "",
    "images": [
      ""
    ],
    "ctaText": "",
    "promoCode": "",
    "buttons": [
      {
        "type": "",
        "position": "",
        "color": "",
        "textColor": "",
        "text": "",
        "link": "",
        "metadata": {}
      }
    ],
    "status": "",
    "metadata": {},
    "createdAt": "2026-03-22 18:31:37",
    "updatedAt": "2026-03-22 18:31:37"
  },
  "message": "",
  "status": true
}
```

### Get Promo Ad by ID
**URL:** https://api.shopsynch.com/v1/promo-ads/{id}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves a specific promotional ad by its ID.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promo-ads/{id}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─adName|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─ctaText|string|No comments found.|-||
|└─promoCode|string|No comments found.|-||
|└─buttons|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─position|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─textColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─text|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─link|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─metadata|object|No comments found.|-||
|└─status|string|No comments found.|-||
|└─metadata|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:37"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:37"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "adName": "",
    "images": [
      ""
    ],
    "ctaText": "",
    "promoCode": "",
    "buttons": [
      {
        "type": "",
        "position": "",
        "color": "",
        "textColor": "",
        "text": "",
        "link": "",
        "metadata": {}
      }
    ],
    "status": "",
    "metadata": {},
    "createdAt": "2026-03-22 18:31:37",
    "updatedAt": "2026-03-22 18:31:37"
  },
  "message": "",
  "status": true
}
```

### Fetch Promo Ads.
**URL:** https://api.shopsynch.com/v1/promo-ads

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves a list of promotional ads filtered by status and paginated using a cursor.
The response includes promotional ads in either DRAFT or PUBLISHED status.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|false|No comments found.|-||
|cursor|string|false|No comments found.|-||
|limit|int32|true|No comments found.|-|10|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promo-ads?status=&cursor=&limit=10'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─data|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─adName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─images|array|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ctaText|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─promoCode|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─buttons|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─position|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─textColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─text|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─link|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─metadata|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─metadata|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─nextCursor|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "data": [
      {
        "id": "",
        "adName": "",
        "images": [
          ""
        ],
        "ctaText": "",
        "promoCode": "",
        "buttons": [
          {
            "type": "",
            "position": "",
            "color": "",
            "textColor": "",
            "text": "",
            "link": "",
            "metadata": {}
          }
        ],
        "status": "",
        "metadata": {},
        "createdAt": "2026-03-22 18:31:38",
        "updatedAt": "2026-03-22 18:31:38"
      }
    ],
    "nextCursor": "yyyy-MM-dd HH:mm:ss"
  },
  "message": "",
  "status": true
}
```

### Fetch Published Promo Ads.
**URL:** https://api.shopsynch.com/v1/promo-ads/published

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves a list of published promotional ads.
The response includes promotional ads in PUBLISHED status.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|limit|int32|true|No comments found.|-|3|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promo-ads/published?limit=3'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─adName|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─ctaText|string|No comments found.|-||
|└─promoCode|string|No comments found.|-||
|└─buttons|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─position|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─textColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─text|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─link|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─metadata|object|No comments found.|-||
|└─status|string|No comments found.|-||
|└─metadata|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": [
    {
      "id": "",
      "adName": "",
      "images": [
        ""
      ],
      "ctaText": "",
      "promoCode": "",
      "buttons": [
        {
          "type": "",
          "position": "",
          "color": "",
          "textColor": "",
          "text": "",
          "link": "",
          "metadata": {}
        }
      ],
      "status": "",
      "metadata": {},
      "createdAt": "2026-03-22 18:31:38",
      "updatedAt": "2026-03-22 18:31:38"
    }
  ],
  "message": "",
  "status": true
}
```

### Update Promo Ad Status.
**URL:** https://api.shopsynch.com/v1/promo-ads/update/{id}/status/{status}

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API updates the status of a specific promotional ad.
The response includes promotional ads in PUBLISHED status.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||
|status|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promo-ads/update/{id}/status/{status}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Delete Promo Ad.
**URL:** https://api.shopsynch.com/v1/promo-ads/{id}

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API deletes a specific promotional ad.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promo-ads/{id}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## Customer Order Management
### Fetch Customer Orders.<br>This API retrieves a list of orders for the authenticated customer.<br>The response includes orders in PUBLISHED status.
**URL:** https://api.shopsynch.com/v1/customer-orders

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Customer Orders.
This API retrieves a list of orders for the authenticated customer.
The response includes orders in PUBLISHED status.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|page|int32|true|No comments found.|-|0|
|limit|int32|true|No comments found.|-|100|
|sortField|string|true|No comments found.|-|CREATED_AT|
|sortDir|string|true|No comments found.|-|DESC|
|orderNumber|string|false|Search by order number (exact match) - This is a separate field to allow for precise filtering by order number, while the 'search' field can be used for more general text search across multiple fields (like order number and customer name).|-||
|search|string|false|General search text for order number or customer name - This field allows for a broader search that can match either the order number or the customer's name, providing more flexibility in filtering orders based on user input.|-||
|status|string|false|Filter by order status|-||
|paymentStatus|string|false|Filter by payment status|-||
|dateFrom|string|false|Filter by date range start|-||
|dateTo|string|false|Filter by date range end|-||
|minAmount|double|false|Filter by minimum amount|-|0.0|
|maxAmount|double|false|Filter by maximum amount|-|0.0|
|customerId|string|false|Filter by customer ID|-||
|productId|string|false|Filter by product ID (orders that contain a specific product)|-||
|authCustomer|string|false|Authenticated customer ID (internal use)|-||
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customer-orders?page=0&limit=100&sortField=CREATED_AT&sortDir=DESC&orderNumber=&search=&status=true&paymentStatus=&dateFrom=&dateTo=&minAmount=0.0&maxAmount=0.0&customerId=&productId=&authCustomer=&createdAt="2026-03-22 18:31:38"&updatedAt="2026-03-22 18:31:38"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

### Fetch Customer Orders.<br>This API retrieves a list of orders for a specific customer.
**URL:** https://api.shopsynch.com/v1/customer-orders/{customerId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Customer Orders.
This API retrieves a list of orders for a specific customer.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|customerId|string|true|No comments found.|-||

**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|page|int32|true|No comments found.|-|0|
|limit|int32|true|No comments found.|-|100|
|sortFieldParam|string|true|No comments found.|-|ORDER_DATE|
|sortDirectionParam|string|true|No comments found.|-|DESC|
|orderNumber|string|false|Search by order number (exact match) - This is a separate field to allow for precise filtering by order number, while the 'search' field can be used for more general text search across multiple fields (like order number and customer name).|-||
|search|string|false|General search text for order number or customer name - This field allows for a broader search that can match either the order number or the customer's name, providing more flexibility in filtering orders based on user input.|-||
|status|string|false|Filter by order status|-||
|paymentStatus|string|false|Filter by payment status|-||
|dateFrom|string|false|Filter by date range start|-||
|dateTo|string|false|Filter by date range end|-||
|minAmount|double|false|Filter by minimum amount|-|0.0|
|maxAmount|double|false|Filter by maximum amount|-|0.0|
|customerId|string|false|Filter by customer ID|-||
|productId|string|false|Filter by product ID (orders that contain a specific product)|-||
|authCustomer|string|false|Authenticated customer ID (internal use)|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customer-orders/{customerId}?page=0&limit=100&sortFieldParam=ORDER_DATE&sortDirectionParam=DESC&orderNumber=&search=&status=&paymentStatus=&dateFrom=&dateTo=&minAmount=0.0&maxAmount=0.0&customerId=&productId=&authCustomer='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

### Fetch Order Items.<br>This API retrieves a list of items in a specific order.
**URL:** https://api.shopsynch.com/v1/customer-orders/{orderId}/items

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Order Items.
This API retrieves a list of items in a specific order.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|No comments found.|-||

**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customer-orders/{orderId}/items?createdAt="2026-03-22 18:31:39"&updatedAt="2026-03-22 18:31:39"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─orderId|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─price|double|No comments found.|-|0.0|
|└─totalPrice|double|No comments found.|-|0.0|
|└─productId|string|No comments found.|-||
|└─variationId|string|No comments found.|-||
|└─variationPriceDetailId|string|No comments found.|-||
|└─product|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─description|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─thumbnail|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─imageList|array|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─brand|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─category|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─rating|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─features|array|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─specification|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variation|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "orderId": "",
      "quantity": 0,
      "price": 0.0,
      "totalPrice": 0.0,
      "productId": "",
      "variationId": "",
      "variationPriceDetailId": "",
      "product": {
        "id": "",
        "name": "",
        "slug": "",
        "description": "",
        "image": "",
        "thumbnail": "",
        "imageList": [
          ""
        ],
        "price": 0.0,
        "newPrice": 0.0,
        "ramSize": "",
        "Storage": "",
        "size": "",
        "sku": "",
        "quantityInStock": 0,
        "brand": "",
        "discount": 0.0,
        "category": "",
        "color": "",
        "rating": 0,
        "features": [
          ""
        ],
        "specification": [
          {
            "key": "",
            "value": ""
          }
        ],
        "variation": {
          "id": "",
          "customColor": "",
          "color": "",
          "image": ""
        }
      },
      "customer": {
        "id": "",
        "email": "",
        "fullName": "",
        "phoneNumber": "",
        "address": "",
        "status": "",
        "createdAt": "2026-03-22 18:31:39",
        "updatedAt": "2026-03-22 18:31:39"
      },
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    }
  ]
}
```

## Cart Management
### List Items In Cart.
**URL:** https://api.shopsynch.com/v1/carts/items

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves a list of items in the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/items?createdAt="2026-03-22 18:31:40"&updatedAt="2026-03-22 18:31:40"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─productId|string|No comments found.|-||
|└─variationId|string|No comments found.|-||
|└─variationPriceId|string|No comments found.|-||
|└─customerId|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─Storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─sku|string|No comments found.|-||
|└─quantityInStock|int32|No comments found.|-|0|
|└─discount|double|No comments found.|-|0.0|
|└─color|string|No comments found.|-||
|└─rating|int32|No comments found.|-|0|
|└─sessionId|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": [
    {
      "id": "",
      "productId": "",
      "variationId": "",
      "variationPriceId": "",
      "customerId": "",
      "name": "",
      "image": "",
      "price": 0.0,
      "newPrice": 0.0,
      "ramSize": "",
      "Storage": "",
      "size": "",
      "sku": "",
      "quantityInStock": 0,
      "discount": 0.0,
      "color": "",
      "rating": 0,
      "sessionId": "",
      "quantity": 0
    }
  ],
  "message": "",
  "status": true
}
```

### Add Item To Cart.
**URL:** https://api.shopsynch.com/v1/carts/add

**Type:** POST


**Content-Type:** application/json

**Description:** This API adds an item to the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|variationId|string|false|No comments found.<br/>Validation[Size(max=2147483647, min=1)]|-||
|tenantId|string|false|No comments found.|-||
|variationPriceId|string|false|No comments found.|-||
|quantity|int32|true|No comments found.<br/>Validation[Min(value=1)]|-|0|
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/add?createdAt="2026-03-22 18:31:40"&updatedAt="2026-03-22 18:31:40"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug=' --data '{
  "productId": "",
  "variationId": "",
  "tenantId": "",
  "variationPriceId": "",
  "quantity": 0,
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─productId|string|No comments found.|-||
|└─variationId|string|No comments found.|-||
|└─variationPriceId|string|No comments found.|-||
|└─customerId|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─Storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─sku|string|No comments found.|-||
|└─quantityInStock|int32|No comments found.|-|0|
|└─discount|double|No comments found.|-|0.0|
|└─color|string|No comments found.|-||
|└─rating|int32|No comments found.|-|0|
|└─sessionId|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "productId": "",
    "variationId": "",
    "variationPriceId": "",
    "customerId": "",
    "name": "",
    "image": "",
    "price": 0.0,
    "newPrice": 0.0,
    "ramSize": "",
    "Storage": "",
    "size": "",
    "sku": "",
    "quantityInStock": 0,
    "discount": 0.0,
    "color": "",
    "rating": 0,
    "sessionId": "",
    "quantity": 0
  },
  "message": "",
  "status": true
}
```

### Remove Item From Cart.
**URL:** https://api.shopsynch.com/v1/carts/remove/{carItemId}

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API removes an item from the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|false|No comments found.|-||


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|carItemId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/remove/{carItemId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Increment Item Quantity.
**URL:** https://api.shopsynch.com/v1/carts/item/increment/quantity/{cartId}

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API increments the quantity of an item in the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|false|No comments found.|-||


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|cartId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/item/increment/quantity/{cartId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Decrement Item Quantity.
**URL:** https://api.shopsynch.com/v1/carts/item/decrement/quantity/{cartId}

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API decrements the quantity of an item in the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|false|No comments found.|-||


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|cartId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/item/decrement/quantity/{cartId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Clear Cart.
**URL:** https://api.shopsynch.com/v1/carts/clear

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API clears the cart for the authenticated customer or via sessionId.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/clear?createdAt="2026-03-22 18:31:40"&updatedAt="2026-03-22 18:31:40"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Checkout Cart.
**URL:** https://api.shopsynch.com/v1/carts/checkout

**Type:** POST


**Content-Type:** application/json

**Description:** This API checks out the cart for the authenticated customer.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|firstName|string|true|No comments found.<br/>Validation[Length(max=100, min=2, message=first name is must be a minimum of 2 and maximum of 100 characters)]|-||
|lastName|string|true|No comments found.<br/>Validation[Length(max=100, min=2, message=first name is must be a minimum of 2 and maximum of 100 characters)]|-||
|email|string|true|No comments found.|-||
|phoneNumber|string|true|No comments found.|-||
|country|string|false|No comments found.|-||
|currency|string|false|No comments found.|-||
|state|string|true|No comments found.|-||
|city|string|true|No comments found.|-||
|area|string|false|No comments found.<br/>Validation[Length(max=100, min=2, message=area is must be a minimum of 2 and maximum of 100 characters)]|-||
|landmark|string|false|No comments found.<br/>Validation[Length(max=100, min=2, message=landmark is must be a minimum of 2 and maximum of 100 characters)]|-||
|meta|object|false|No comments found.|-||
|shippingAddress|string|true|No comments found.|-||
|billingAddress|string|false|No comments found.|-||
|totalAmount|double|false|No comments found.|-|0.0|
|shippingMethod|string|true|No comments found.|-||
|paymentMethod|string|true|No comments found.|-||
|promoCode|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/checkout?createdAt="2026-03-22 18:31:40"&updatedAt="2026-03-22 18:31:40"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug=' --data '{
  "firstName": "",
  "lastName": "",
  "email": "",
  "phoneNumber": "",
  "country": "",
  "currency": "",
  "state": "",
  "city": "",
  "area": "",
  "landmark": "",
  "meta": {},
  "shippingAddress": "",
  "billingAddress": "",
  "totalAmount": 0.0,
  "shippingMethod": "",
  "paymentMethod": "",
  "promoCode": "",
  "tenantId": "",
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Guest Checkout Cart.
**URL:** https://api.shopsynch.com/v1/carts/guest/checkout

**Type:** POST


**Content-Type:** application/json

**Description:** This API checks out the cart for a guest user.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-SessionId|string|false|The X-SessionId header is mandatory for managing cart for none guest customers., if your customer is authenticated, then it will be ignored|-|ee5bfa88-56a2-4551-ae1d-d753984ae1d9|
|X-Session-Id|string|true|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|firstName|string|true|No comments found.<br/>Validation[Length(max=100, min=2, message=first name is must be a minimum of 2 and maximum of 100 characters)]|-||
|lastName|string|true|No comments found.<br/>Validation[Length(max=100, min=2, message=first name is must be a minimum of 2 and maximum of 100 characters)]|-||
|email|string|true|No comments found.|-||
|phoneNumber|string|true|No comments found.|-||
|country|string|false|No comments found.|-||
|currency|string|false|No comments found.|-||
|state|string|true|No comments found.|-||
|city|string|true|No comments found.|-||
|area|string|false|No comments found.<br/>Validation[Length(max=100, min=2, message=area is must be a minimum of 2 and maximum of 100 characters)]|-||
|landmark|string|false|No comments found.<br/>Validation[Length(max=100, min=2, message=landmark is must be a minimum of 2 and maximum of 100 characters)]|-||
|meta|object|false|No comments found.|-||
|shippingAddress|string|true|No comments found.|-||
|billingAddress|string|false|No comments found.|-||
|totalAmount|double|false|No comments found.|-|0.0|
|shippingMethod|string|true|No comments found.|-||
|paymentMethod|string|true|No comments found.|-||
|promoCode|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-SessionId:ee5bfa88-56a2-4551-ae1d-d753984ae1d9" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/guest/checkout' --data '{
  "firstName": "",
  "lastName": "",
  "email": "",
  "phoneNumber": "",
  "country": "",
  "currency": "",
  "state": "",
  "city": "",
  "area": "",
  "landmark": "",
  "meta": {},
  "shippingAddress": "",
  "billingAddress": "",
  "totalAmount": 0.0,
  "shippingMethod": "",
  "paymentMethod": "",
  "promoCode": "",
  "tenantId": "",
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## CategoryController
### getAllCategories
**URL:** https://api.shopsynch.com/v1/categories

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|search|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|parentId|string|false|No comments found.|-||
|featured|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/categories?search=&status=&parentId=&featured=true'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "name": "",
      "slug": ""
    }
  ]
}
```

## Delivery Zone Management
### Create Delivery Zone.
**URL:** https://api.shopsynch.com/v1/delivery-zones

**Type:** POST


**Content-Type:** application/json

**Description:** This API creates a new delivery zone.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|No comments found.|-||
|fee|double|true|No comments found.<br/>Validation[Min(value=0, message=Delivery fee cannot be negative)]|-|0.0|
|stateAreas|array|true|No comments found.|-||
|└─state|string|true|No comments found.|-||
|└─areas|array|true|No comments found.|-|""","""|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/delivery-zones' --data '{
  "name": "",
  "fee": 0.0,
  "stateAreas": [
    {
      "state": "",
      "areas": [
        ""
      ]
    }
  ]
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─fee|double|No comments found.|-|0.0|
|└─stateAreas|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─state|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─areas|array|No comments found.|-|""","""|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "fee": 0.0,
    "stateAreas": [
      {
        "state": "",
        "areas": [
          ""
        ]
      }
    ]
  }
}
```

### Get All Delivery Zones.
**URL:** https://api.shopsynch.com/v1/delivery-zones

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API returns all delivery zones.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/delivery-zones'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─fee|double|No comments found.|-|0.0|
|└─stateAreas|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─state|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─areas|array|No comments found.|-|""","""|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "name": "",
      "fee": 0.0,
      "stateAreas": [
        {
          "state": "",
          "areas": [
            ""
          ]
        }
      ]
    }
  ]
}
```

### Update Delivery Zone.
**URL:** https://api.shopsynch.com/v1/delivery-zones/{id}

**Type:** PUT


**Content-Type:** application/json

**Description:** This API updates an existing delivery zone.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|No comments found.|-||
|fee|double|true|No comments found.<br/>Validation[Min(value=0, message=Delivery fee cannot be negative)]|-|0.0|
|stateAreas|array|true|No comments found.|-||
|└─state|string|true|No comments found.|-||
|└─areas|array|true|No comments found.|-|""","""|

**Request-example:**
```bash
curl -X PUT -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/delivery-zones/{id}' --data '{
  "name": "",
  "fee": 0.0,
  "stateAreas": [
    {
      "state": "",
      "areas": [
        ""
      ]
    }
  ]
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─fee|double|No comments found.|-|0.0|
|└─stateAreas|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─state|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─areas|array|No comments found.|-|""","""|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "fee": 0.0,
    "stateAreas": [
      {
        "state": "",
        "areas": [
          ""
        ]
      }
    ]
  }
}
```

### Delete Delivery Zone.
**URL:** https://api.shopsynch.com/v1/delivery-zones/{id}

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API deletes an existing delivery zone.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/delivery-zones/{id}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": ""
}
```

## Promotion management.
### Apply Promo Code
**URL:** https://api.shopsynch.com/v1/promotions/apply/promo-code

**Type:** POST


**Content-Type:** application/json

**Description:** Applies a promo code to calculate discounted price"

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promoCode|string|false|The promo code to be applied|-||
|amount|double|false|The original amount before discount|-|0.0|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promotions/apply/promo-code' --data '{
  "promoCode": "",
  "amount": 0.0
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|double|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": 0.0
}
```

### Create Promotion
**URL:** https://api.shopsynch.com/v1/promotions

**Type:** POST


**Content-Type:** application/json

**Description:** Creates a new promotion (shop owner access required)

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|The name of the promotion|-||
|code|string|true|The code for the promotion<br/>Validation[Size(max=50, min=3, message=Promotion code must be between 3 and 50 characters)]|-||
|description|string|false|A description of the promotion|-||
|startDate|string|true|The start date of the promotion<br/>Validation[Future(message=Start date must be in the future)]|-|yyyy-MM-dd HH:mm:ss|
|endDate|string|true|The end date of the promotion<br/>Validation[Future(message=End date must be in the future)]|-|yyyy-MM-dd HH:mm:ss|
|discount|double|true|The discount percentage for the promotion<br/>Validation[Min(value=0, message=Discount must be at least 0); Max(value=100, message=Discount cannot exceed 100)]|-|0.0|
|status|string|false|The status of the promotion (e.g., active, expired, upcoming)|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promotions' --data '{
  "name": "",
  "code": "",
  "description": "",
  "startDate": "yyyy-MM-dd HH:mm:ss",
  "endDate": "yyyy-MM-dd HH:mm:ss",
  "discount": 0.0,
  "status": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─id|string|No comments found.|-||
|└─name|string|Name of promotion|-||
|└─code|string|The code that customers will use to redeem the promotion|-||
|└─description|string|A description of the promotion|-||
|└─startDate|string|The start date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─endDate|string|The end date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─discount|double|The discount amount for the promotion|-|0.0|
|└─status|string|The status of the promotion (e.g., active, expired, upcoming)|-||
|└─tenantId|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "createdAt": "2026-03-22 18:31:38",
    "updatedAt": "2026-03-22 18:31:38",
    "id": "",
    "name": "",
    "code": "",
    "description": "",
    "startDate": "yyyy-MM-dd HH:mm:ss",
    "endDate": "yyyy-MM-dd HH:mm:ss",
    "discount": 0.0,
    "status": "",
    "tenantId": ""
  }
}
```

### Fetch All Promotions
**URL:** https://api.shopsynch.com/v1/promotions

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves all promotions for the current tenant (shop owner access required)

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|code|string|false|Filter promotions by specific code|-||
|name|string|false|Search promotions by specific name|-||
|description|string|false|Search promotions by specific description|-||
|status|string|false|Filter promotions by specific status|-||
|startDate|string|false|Filter promotions by specific start date|-||
|endDate|string|false|Filter promotions by specific end date|-||
|createdAt|string|false|Filter promotions by specific created date|-||
|updatedAt|string|false|Filter promotions by specific updated date|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promotions?code=&name=&description=&status=&startDate=&endDate=&createdAt=&updatedAt='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─id|string|No comments found.|-||
|└─name|string|Name of promotion|-||
|└─code|string|The code that customers will use to redeem the promotion|-||
|└─description|string|A description of the promotion|-||
|└─startDate|string|The start date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─endDate|string|The end date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─discount|double|The discount amount for the promotion|-|0.0|
|└─status|string|The status of the promotion (e.g., active, expired, upcoming)|-||
|└─tenantId|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "createdAt": "2026-03-22 18:31:38",
      "updatedAt": "2026-03-22 18:31:38",
      "id": "",
      "name": "",
      "code": "",
      "description": "",
      "startDate": "yyyy-MM-dd HH:mm:ss",
      "endDate": "yyyy-MM-dd HH:mm:ss",
      "discount": 0.0,
      "status": "",
      "tenantId": ""
    }
  ]
}
```

### Show Promotion
**URL:** https://api.shopsynch.com/v1/promotions/{promotionId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves a specific promotion by ID (shop owner access required)

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promotionId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promotions/{promotionId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─id|string|No comments found.|-||
|└─name|string|Name of promotion|-||
|└─code|string|The code that customers will use to redeem the promotion|-||
|└─description|string|A description of the promotion|-||
|└─startDate|string|The start date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─endDate|string|The end date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─discount|double|The discount amount for the promotion|-|0.0|
|└─status|string|The status of the promotion (e.g., active, expired, upcoming)|-||
|└─tenantId|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "createdAt": "2026-03-22 18:31:38",
    "updatedAt": "2026-03-22 18:31:38",
    "id": "",
    "name": "",
    "code": "",
    "description": "",
    "startDate": "yyyy-MM-dd HH:mm:ss",
    "endDate": "yyyy-MM-dd HH:mm:ss",
    "discount": 0.0,
    "status": "",
    "tenantId": ""
  }
}
```

### Update Promotion
**URL:** https://api.shopsynch.com/v1/promotions/{promotionId}

**Type:** PATCH


**Content-Type:** application/json

**Description:** Updates an existing promotion (shop owner access required)

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promotionId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|The name of the promotion|-||
|code|string|true|The code for the promotion<br/>Validation[Size(max=50, min=3, message=Promotion code must be between 3 and 50 characters)]|-||
|description|string|false|A description of the promotion|-||
|startDate|string|true|The start date of the promotion|-|yyyy-MM-dd HH:mm:ss|
|endDate|string|true|The end date of the promotion|-|yyyy-MM-dd HH:mm:ss|
|discount|double|true|The discount percentage for the promotion<br/>Validation[Min(value=0, message=Discount must be at least 0); Max(value=100, message=Discount cannot exceed 100)]|-|0.0|
|status|string|false|The status of the promotion (e.g., active, expired, upcoming)|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promotions/{promotionId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─id|string|No comments found.|-||
|└─name|string|Name of promotion|-||
|└─code|string|The code that customers will use to redeem the promotion|-||
|└─description|string|A description of the promotion|-||
|└─startDate|string|The start date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─endDate|string|The end date and time of the promotion|-|yyyy-MM-dd HH:mm:ss|
|└─discount|double|The discount amount for the promotion|-|0.0|
|└─status|string|The status of the promotion (e.g., active, expired, upcoming)|-||
|└─tenantId|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "createdAt": "2026-03-22 18:31:38",
    "updatedAt": "2026-03-22 18:31:38",
    "id": "",
    "name": "",
    "code": "",
    "description": "",
    "startDate": "yyyy-MM-dd HH:mm:ss",
    "endDate": "yyyy-MM-dd HH:mm:ss",
    "discount": 0.0,
    "status": "",
    "tenantId": ""
  }
}
```

### Delete Promotion
**URL:** https://api.shopsynch.com/v1/promotions/{promotionId}

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** Deletes a promotion (shop owner access required)

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promotionId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/promotions/{promotionId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## Merchant Management
### Get Merchant Profile.
**URL:** https://api.shopsynch.com/v1/merchants/profile

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API returns the merchant profile.


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/merchants/profile'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─role|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|└─merchantId|string|No comments found.|-||
|└─currentMode|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "role": {
      "name": "",
      "slug": ""
    },
    "merchantId": "",
    "currentMode": "",
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### Get Merchant Business Profile.
**URL:** https://api.shopsynch.com/v1/merchants/profile/business

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API returns the merchant business profile.


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/merchants/profile/business'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## RoleController
### findAll
**URL:** https://api.shopsynch.com/v1/roles

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/roles'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─status|boolean|No comments found.|-|true|
|└─slug|string|No comments found.|-||
|└─permissions|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "createdAt": "2026-03-22 18:31:39",
      "updatedAt": "2026-03-22 18:31:39",
      "id": "",
      "name": "",
      "status": true,
      "slug": "",
      "permissions": [
        {
          "createdAt": "2026-03-22 18:31:39",
          "updatedAt": "2026-03-22 18:31:39",
          "id": "",
          "name": "",
          "status": true,
          "slug": ""
        }
      ]
    }
  ]
}
```

## ProductStatsController
### index
**URL:** https://api.shopsynch.com/v1/product-stats

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/product-stats'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## VariationOptionController
### getAllVariations
**URL:** https://api.shopsynch.com/v1/variation/options/{variationId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|variationId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/variation/options/{variationId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─value|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─variation|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productCategory|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "value": "",
      "slug": "",
      "variation": {
        "id": "",
        "name": "",
        "slug": "",
        "productCategory": {
          "id": "",
          "name": "",
          "slug": ""
        }
      }
    }
  ]
}
```

## ReviewController
### Get All Reviews
**URL:** https://api.shopsynch.com/v1/reviews

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves all product reviews in the merchant's store with optional filtering. Shop owners use this to monitor
customer feedback, identify problematic reviews, and manage reputation.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|search|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|minRating|int32|false|No comments found.|-|0|
|maxRating|int32|false|No comments found.|-|0|
|productId|string|false|No comments found.|-||
|customerId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/reviews?search=&status=&minRating=0&maxRating=0&productId=&customerId='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─createdDate|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─rating|int32|No comments found.|-|0|
|└─comment|string|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|└─product|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─description|string|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": [
    {
      "id": "",
      "createdDate": "yyyy-MM-dd HH:mm:ss",
      "rating": 0,
      "comment": "",
      "customer": {
        "id": "",
        "email": "",
        "fullName": "",
        "phoneNumber": "",
        "address": "",
        "status": "",
        "createdAt": "2026-03-22 18:31:40",
        "updatedAt": "2026-03-22 18:31:40"
      },
      "product": {
        "id": "",
        "name": "",
        "description": ""
      }
    }
  ],
  "message": "",
  "status": true
}
```

### Get Product Reviews
**URL:** https://api.shopsynch.com/v1/reviews/product/{productId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves all reviews for a specific product. Reviews are filtered by status (active, hidden, or pending)
to display only appropriate reviews on product detail pages.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product to retrieve reviews for.|-||

**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|true|Review status filter: "active" (published), "hidden" (removed from display), or "pending" (awaiting moderation).<br/>             Default is "active" to show only published reviews.|-|ACTIVE|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/reviews/product/{productId}?status=ACTIVE'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─createdDate|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─rating|int32|No comments found.|-|0|
|└─comment|string|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|└─product|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─description|string|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": [
    {
      "id": "",
      "createdDate": "yyyy-MM-dd HH:mm:ss",
      "rating": 0,
      "comment": "",
      "customer": {
        "id": "",
        "email": "",
        "fullName": "",
        "phoneNumber": "",
        "address": "",
        "status": "",
        "createdAt": "2026-03-22 18:31:40",
        "updatedAt": "2026-03-22 18:31:40"
      },
      "product": {
        "id": "",
        "name": "",
        "description": ""
      }
    }
  ],
  "message": "",
  "status": true
}
```

### Create/Submit Product Review
**URL:** https://api.shopsynch.com/v1/reviews/add

**Type:** POST


**Content-Type:** application/json

**Description:** Submits a new product review from a customer. Reviews include rating, comment, and reviewer name.
System validates one review per customer per product and performs moderation checks.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|rating|int32|false|No comments found.<br/>Validation[Min(value=1, message=rating must be greater than or equal to 1); Max(value=5, message=rating can not be greater than 5)]|-|0|
|comment|string|true|No comments found.|-||
|productId|string|true|No comments found.|-||
|customerId|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/reviews/add' --data '{
  "rating": 0,
  "comment": "",
  "productId": "",
  "customerId": "",
  "tenantId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─createdDate|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─rating|int32|No comments found.|-|0|
|└─comment|string|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|└─product|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─description|string|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "createdDate": "yyyy-MM-dd HH:mm:ss",
    "rating": 0,
    "comment": "",
    "customer": {
      "id": "",
      "email": "",
      "fullName": "",
      "phoneNumber": "",
      "address": "",
      "status": "",
      "createdAt": "2026-03-22 18:31:40",
      "updatedAt": "2026-03-22 18:31:40"
    },
    "product": {
      "id": "",
      "name": "",
      "description": ""
    }
  },
  "message": "",
  "status": true
}
```

### Delete Review
**URL:** https://api.shopsynch.com/v1/reviews/{reviewId}

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Requires Authorization header (@RequireAuthorizationHeader)
         - Permanently removes review from system (no recovery possible)
         - Review is removed from all product displays
         - Useful for removing reviews with false claims, spam, or offensive content
         - Use hideReview instead if you want to temporarily remove review

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|reviewId|string|true|Unique identifier of the review to delete.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/reviews/{reviewId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Hide Review
**URL:** https://api.shopsynch.com/v1/reviews/hide/{reviewId}

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** Hides a review from public display temporarily. Hidden reviews no longer appear on product pages
but remain in system for audit purposes. Reviews can be unhidden if needed (soft deletion).

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|reviewId|string|true|Unique identifier of the review to hide.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/reviews/hide/{reviewId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## TenantController
### Add Bank Details
**URL:** https://api.shopsynch.com/v1/merchants/tenant/bank-details

**Type:** POST


**Content-Type:** application/json

**Description:** This API adds the bank details of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accountNumber|string|true|No comments found.|-||
|bankCode|string|true|No comments found.|-||
|gateway|enum|true|No comments found.<br/>[Enum: PAYSTACK-("PAYSTACK","Nigeria-based processor (Card, Transfer, USSD)"),FLUTTERWAVE-("FLUTTERWAVE","Global infrastructure for Africa-wide payments"),STRIPE-("STRIPE","International card processing (USD/EUR/GBP)"),OFFLINE-("OFFLINE","Manual bank transfer or Cash on Delivery"),MONNIFY-("MONNIFY","Automated bank transfer provider for Nigeria")]|-|PAYSTACK|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/merchants/tenant/bank-details' --data '{
  "accountNumber": "",
  "bankCode": "",
  "gateway": "PAYSTACK"
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## ColorController
### getAllColors
**URL:** https://api.shopsynch.com/v1/colors

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/colors'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─code|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "name": "",
      "code": ""
    }
  ]
}
```

## VariationController
### createVariation
**URL:** https://api.shopsynch.com/v1/variations

**Type:** POST


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|false|No comments found.|-||
|name|string|false|No comments found.|-||
|CategoryId|string|false|No comments found.|-||
|productCategory|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─parentId|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|└─tenantId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/variations' --data '{
  "id": "",
  "name": "",
  "CategoryId": "",
  "productCategory": {
    "createdAt": "2026-03-22 18:31:39",
    "updatedAt": "2026-03-22 18:31:39",
    "id": "",
    "parentId": "",
    "name": "",
    "slug": "",
    "tenantId": ""
  }
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─productCategory|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "name": "",
    "slug": "",
    "productCategory": {
      "id": "",
      "name": "",
      "slug": ""
    }
  },
  "message": "",
  "status": true
}
```

## EmailPreviewController
### previewWelcomeEmail
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/welcome

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-|test@example.com|
|shopName|string|true|No comments found.|-|My Awesome Shop|
|verificationCode|string|true|No comments found.|-|123456|
|verificationUrl|string|true|No comments found.|-|http://localhost:3000/verify|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/api/v1/test/email-preview/welcome?email=test@example.com&shopName=My Awesome Shop&verificationCode=123456&verificationUrl=http:/localhost:3000/verify'
```

**Response-example:**
```json
string
```

### previewMerchantNewOrder
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/merchant/new-order/{orderId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/api/v1/test/email-preview/merchant/new-order/{orderId}'
```

**Response-example:**
```json
string
```

### previewCustomerOrderConfirmation
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/customer/order-confirmation/{orderId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/api/v1/test/email-preview/customer/order-confirmation/{orderId}'
```

**Response-example:**
```json
string
```

### previewCustomerPaymentConfirmation
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/customer/payment-confirmation/{paymentId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|paymentId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/api/v1/test/email-preview/customer/payment-confirmation/{paymentId}'
```

**Response-example:**
```json
string
```

### previewForgotPassword
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/forgot-password

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|No comments found.|-|John|
|pin|string|true|No comments found.|-|1234|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/api/v1/test/email-preview/forgot-password?name=John&pin=1234'
```

**Response-example:**
```json
string
```

## Password-less Authentication.
### Initiate Password-less Authentication.
**URL:** https://api.shopsynch.com/v1/auth/passwordless/initiate

**Type:** POST


**Content-Type:** application/json

**Description:** This API initiates password-less authentication.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Invalid email format)]|-||
|phoneNumber|string|true|No comments found.|-||
|userType|string|false|No comments found.|-||
|businessName|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/passwordless/initiate' --data '{
  "email": "",
  "phoneNumber": "",
  "userType": "",
  "businessName": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": ""
}
```

### Initiate Password-less email Authentication.
**URL:** https://api.shopsynch.com/v1/auth/passwordless/initiate/email

**Type:** POST


**Content-Type:** application/json

**Description:** This API initiates password-less authentication via user email address.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Email is invalid)]|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/passwordless/initiate/email' --data '{
  "email": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": ""
}
```

### Initiate Password-less Phone number Authentication .
**URL:** https://api.shopsynch.com/v1/auth/passwordless/initiate/phone

**Type:** POST


**Content-Type:** application/json

**Description:** This API initiates password-less authentication for phone number via whatsapp.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|phoneNumber|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/passwordless/initiate/phone' --data '{
  "phoneNumber": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": ""
}
```

### Verify Merchant Email.
**URL:** https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-email

**Type:** POST


**Content-Type:** application/json

**Description:** This API verifies merchant email.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Invalid email format)]|-||
|token|string|true|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-email' --data '{
  "email": "",
  "token": "",
  "phoneNumber": "",
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─user|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─token|string|No comments found.|-||
|└─expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "user": {
      "id": "",
      "email": "",
      "fullName": "",
      "phoneNumber": "",
      "address": "",
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    },
    "token": "",
    "expiresIn": 0
  }
}
```

### Verify Merchant Phone.
**URL:** https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-phone

**Type:** POST


**Content-Type:** application/json

**Description:** This API verifies merchant phone.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|phoneNumber|string|true|No comments found.|-||
|code|string|true|No comments found.|-||
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/passwordless/merchant/verify-phone' --data '{
  "phoneNumber": "",
  "code": "",
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─user|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─token|string|No comments found.|-||
|└─expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "user": {
      "id": "",
      "email": "",
      "fullName": "",
      "phoneNumber": "",
      "address": "",
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    },
    "token": "",
    "expiresIn": 0
  }
}
```

### Verify Customer Email.
**URL:** https://api.shopsynch.com/v1/auth/passwordless/customer/verify-email

**Type:** POST


**Content-Type:** application/json

**Description:** This API verifies customer email.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Invalid email format)]|-||
|token|string|true|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/passwordless/customer/verify-email' --data '{
  "email": "",
  "token": "",
  "phoneNumber": "",
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─token|string|No comments found.|-||
|└─expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "customer": {
      "id": "",
      "email": "",
      "fullName": "",
      "phoneNumber": "",
      "address": "",
      "status": "",
      "createdAt": "2026-03-22 18:31:39",
      "updatedAt": "2026-03-22 18:31:39"
    },
    "token": "",
    "expiresIn": 0
  }
}
```

### Verify Customer Phone.
**URL:** https://api.shopsynch.com/v1/auth/passwordless/customer/verify-phone

**Type:** POST


**Content-Type:** application/json

**Description:** This API verifies customer phone.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|phoneNumber|string|true|No comments found.|-||
|code|string|true|No comments found.|-||
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/passwordless/customer/verify-phone' --data '{
  "phoneNumber": "",
  "code": "",
  "sessionId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─token|string|No comments found.|-||
|└─expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "customer": {
      "id": "",
      "email": "",
      "fullName": "",
      "phoneNumber": "",
      "address": "",
      "status": "",
      "createdAt": "2026-03-22 18:31:39",
      "updatedAt": "2026-03-22 18:31:39"
    },
    "token": "",
    "expiresIn": 0
  }
}
```

## CustomerController
### Get All Customers
**URL:** https://api.shopsynch.com/v1/customers

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves a paginated list of customers for a shop owner with advanced pagination support using cursor-based
navigation. Supports filtering by search term, registration date range, account status, and account type.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|cursor|string|false|Optional cursor token from previous response for cursor-based pagination. If not provided,<br/>             starts from beginning of results.|-||
|limit|int32|true|Maximum number of customers per page. Validated to maximum of 20 records per security policy.|-|10|
|page|int32|true|Page number for offset-based pagination (zero-based). Default is 0.|-|0|
|sortFieldParam|string|true|Field to sort by (CREATED_AT, NAME, EMAIL, STATUS, etc.). Default is CREATED_AT.|-|CREATED_AT|
|sortDirectionParam|string|true|Sort direction: "ASC" or "DESC". Default is DESC (newest first).|-|DESC|
|search|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|registeredFrom|string|false|No comments found.|-||
|registeredTo|string|false|No comments found.|-||
|accountType|string|false|No comments found.|-||
|country|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customers?cursor=&limit=10&page=0&sortFieldParam=CREATED_AT&sortDirectionParam=DESC&search=&status=&registeredFrom=&registeredTo=&accountType=&country='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─data|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─nextCursor|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "data": [
      {
        "id": "",
        "email": "",
        "fullName": "",
        "phoneNumber": "",
        "address": "",
        "status": "",
        "createdAt": "2026-03-22 18:31:41",
        "updatedAt": "2026-03-22 18:31:41"
      }
    ],
    "nextCursor": "yyyy-MM-dd HH:mm:ss"
  },
  "message": "",
  "status": true
}
```

### Get Authenticated Customer Profile
**URL:** https://api.shopsynch.com/v1/customers/profile

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Requires customer authentication (implicit from SecurityContextHolder)
         - No path parameters required - uses authenticated user from JWT token
         - Returns customer's own profile data only (privacy-protected)
         - CustomerMapper transforms entity to DTO with all profile fields
         - Useful for profile display pages in customer dashboard

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customers/profile'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:41",
    "updatedAt": "2026-03-22 18:31:41"
  }
}
```

### Get Specific Customer (Shop Owner View)
**URL:** https://api.shopsynch.com/v1/customers/{customerId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Allows merchants to view customer details for order fulfillment and customer service
         - Returns full customer profile including registration date, contact, account status
         - CustomerMapper includes all customer information in response

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|customerId|string|true|Unique identifier of the customer to retrieve.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customers/{customerId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:41",
    "updatedAt": "2026-03-22 18:31:41"
  },
  "message": "",
  "status": true
}
```

### Deactivate Customer Account
**URL:** https://api.shopsynch.com/v1/customers/{customerId}/deactivate

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** Deactivates a customer account, preventing further login and transactions. The account remains in the system
for historical and audit purposes but becomes inactive. Account can be reactivated if needed.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|customerId|string|true|Unique identifier of the customer account to deactivate.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customers/{customerId}/deactivate'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:41",
    "updatedAt": "2026-03-22 18:31:41"
  },
  "message": "",
  "status": true
}
```

### Activate Customer Account
**URL:** https://api.shopsynch.com/v1/customers/{customerId}/activate

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** Reactivates a previously deactivated customer account. Once reactivated, customer can log in and place orders again.
Account retains all historical data and order history.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|customerId|string|true|Unique identifier of the customer account to activate.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customers/{customerId}/activate'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:41",
    "updatedAt": "2026-03-22 18:31:41"
  },
  "message": "",
  "status": true
}
```

### Register New Customer
**URL:** https://api.shopsynch.com/v1/customers/signup

**Type:** POST


**Content-Type:** application/json

**Description:** Registers a new customer account in the current store/tenant. Validates email uniqueness, creates customer record,
and returns customer profile with confirmation of successful registration.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Email is invalid)]|-||
|password|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=Password can not be less than 2 characters)]|-||
|fullName|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=full name cannot be less than 2 characters)]|-||
|phoneNumber|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=10, message=Phone number cannot be less than 10 characters)]|-||
|address|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=5, message=address cannot be less than 5 characters)]|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customers/signup' --data '{
  "email": "",
  "password": "",
  "fullName": "",
  "phoneNumber": "",
  "address": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:41",
    "updatedAt": "2026-03-22 18:31:41"
  }
}
```

### Update Customer Profile
**URL:** https://api.shopsynch.com/v1/customers/profile/update

**Type:** PATCH


**Content-Type:** application/json

**Description:** Updates the authenticated customer's profile information. Customer can modify personal details,
contact information, preferences, and other account settings.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|fullName|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=full name can not be less than 2 characters)]|-||
|phoneNumber|string|true|No comments found.<br/>Validation[Pattern(regexp=^\+?[1-9]\d{9,14}$, message=Phone number must include country code (e.g. 2348012345678))]|-||
|address|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=5, message=address can not be less than 5 characters)]|-||
|dateOfBirth|string|false|No comments found.|-||
|nationality|string|false|No comments found.|-||
|idType|string|false|No comments found.|-||
|idNumber|string|false|No comments found.|-||
|idDocumentUrl|string|false|No comments found.|-||
|profileUrl|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/customers/profile/update'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:41",
    "updatedAt": "2026-03-22 18:31:41"
  }
}
```

## Email Verification
### Verify Merchant Email
**URL:** https://api.shopsynch.com/v1/auth/email/merchant/verify

**Type:** POST


**Content-Type:** application/json

**Description:** Verify Merchant Email


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|token|string|true|No comments found.|-||
|email|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/email/merchant/verify' --data '{
  "token": "",
  "email": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Initiate Merchant Email Verification
**URL:** https://api.shopsynch.com/v1/auth/email/merchant/initiate/verification

**Type:** POST


**Content-Type:** application/json

**Description:** Initiate Merchant Email Verification


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/email/merchant/initiate/verification' --data '{
  "email": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## Customer Authentication
### Register Customer.
**URL:** https://api.shopsynch.com/v1/auth/customer/signup

**Type:** POST


**Content-Type:** application/json

**Description:** This API registers a new customer.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Email is invalid)]|-||
|password|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=Password can not be less than 2 characters)]|-||
|fullName|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=full name cannot be less than 2 characters)]|-||
|phoneNumber|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=10, message=Phone number cannot be less than 10 characters)]|-||
|address|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=5, message=address cannot be less than 5 characters)]|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/auth/customer/signup' --data '{
  "email": "",
  "password": "",
  "fullName": "",
  "phoneNumber": "",
  "address": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:39",
    "updatedAt": "2026-03-22 18:31:39"
  }
}
```

### Register Customer Via Google.
**URL:** https://api.shopsynch.com/v1/auth/customer/signup/google

**Type:** POST


**Content-Type:** application/json

**Description:** This API registers a new customer via google.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-Session-Id|string|false|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accessToken|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/customer/signup/google' --data '{
  "accessToken": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|customer|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|token|string|No comments found.|-||
|expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "customer": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:39",
    "updatedAt": "2026-03-22 18:31:39"
  },
  "token": "",
  "expiresIn": 0
}
```

### Login Customer Via Google.<br>This API logs in a customer via google.
**URL:** https://api.shopsynch.com/v1/auth/customer/login/google

**Type:** POST


**Content-Type:** application/json

**Description:** Login Customer Via Google.
This API logs in a customer via google.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-Session-Id|string|false|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accessToken|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/customer/login/google' --data '{
  "accessToken": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|customer|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|token|string|No comments found.|-||
|expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "customer": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:39",
    "updatedAt": "2026-03-22 18:31:39"
  },
  "token": "",
  "expiresIn": 0
}
```

## UserController
### getUserProfile
**URL:** https://api.shopsynch.com/v1/users/profile

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/users/profile'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─role|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|└─merchantId|string|No comments found.|-||
|└─currentMode|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "role": {
      "name": "",
      "slug": ""
    },
    "merchantId": "",
    "currentMode": "",
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### getUserProfileWithRole
**URL:** https://api.shopsynch.com/v1/users/profile/with/role

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/users/profile/with/role'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─role|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|└─merchantId|string|No comments found.|-||
|└─currentMode|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "role": {
      "name": "",
      "slug": ""
    },
    "merchantId": "",
    "currentMode": "",
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### updateContact
**URL:** https://api.shopsynch.com/v1/users/profile/update

**Type:** PATCH


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|fullName|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=full name can not be less than 2 characters)]|-||
|phoneNumber|string|true|No comments found.<br/>Validation[Pattern(regexp=^\+?[1-9]\d{9,14}$, message=Phone number must include country code (e.g. 2348012345678))]|-||
|address|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=5, message=address can not be less than 5 characters)]|-||
|dateOfBirth|string|false|No comments found.|-||
|nationality|string|false|No comments found.|-||
|idType|string|false|No comments found.|-||
|idNumber|string|false|No comments found.|-||
|idDocumentUrl|string|false|No comments found.|-||
|profileUrl|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/users/profile/update'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

## OrderController
### Get All Orders<br><br>Retrieves a paginated and filtered list of orders for an authenticated shop owner. Supports sorting by various<br>fields, pagination, and multiple filtering criteria including search terms, order status, payment status, amount ranges,<br>and date ranges.
**URL:** https://api.shopsynch.com/v1/orders

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Retrieves orders for current authenticated tenant/merchant
         - Converts strongly-typed OrderQueryRequest to Map for service layer compatibility
         - Supports dynamic filtering: search (order number, customer), status, paymentStatus, amount range, date range
         - Default sorting by ORDER_DATE in descending order (newest first)
         - Response includes pagination metadata for client-side navigation
         - OrderMapper converts entity objects to DTOs with necessary fields only
         - Useful for order management dashboards and reporting

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|page|int32|true|Zero-based page number for pagination. Default is 0 (first page).|-|0|
|limit|int32|true|Maximum number of records per page. Default is 100, adjustable for performance.|-|100|
|sortField|string|true|Field name to sort results by (ORDER_DATE, CREATED_AT, ORDER_AMOUNT, etc.). Default is ORDER_DATE.|-|ORDER_DATE|
|sortDir|string|true|Sort direction: "ASC" for ascending or "DESC" for descending. Default is DESC.|-|DESC|
|orderNumber|string|false|Search by order number (exact match) - This is a separate field to allow for precise filtering by order number, while the 'search' field can be used for more general text search across multiple fields (like order number and customer name).|-||
|search|string|false|General search text for order number or customer name - This field allows for a broader search that can match either the order number or the customer's name, providing more flexibility in filtering orders based on user input.|-||
|status|string|false|Filter by order status|-||
|paymentStatus|string|false|Filter by payment status|-||
|dateFrom|string|false|Filter by date range start|-||
|dateTo|string|false|Filter by date range end|-||
|minAmount|double|false|Filter by minimum amount|-|0.0|
|maxAmount|double|false|Filter by maximum amount|-|0.0|
|customerId|string|false|Filter by customer ID|-||
|productId|string|false|Filter by product ID (orders that contain a specific product)|-||
|authCustomer|string|false|Authenticated customer ID (internal use)|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders?page=0&limit=100&sortField=ORDER_DATE&sortDir=DESC&orderNumber=&search=&status=&paymentStatus=&dateFrom=&dateTo=&minAmount=0.0&maxAmount=0.0&customerId=&productId=&authCustomer='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

### Get Order by Order Number<br><br>Retrieves a single order by its order number. Order number is visible to both customers and merchants,<br>providing a human-readable alternative to internal order IDs.
**URL:** https://api.shopsynch.com/v1/orders/{orderNumber}/show

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Accessible without shop owner restriction (visible to customers and admins)
         - Retrieves order for current tenant context
         - Returns complete order information including contact details
         - Useful for order tracking pages where customer provides order number
         - OrderMapper includes all relevant order details in response

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderNumber|string|true|The unique order number (e.g., "ORD-20260308-001") assigned at order creation.<br/>                  Visible in customer receipts and emails.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders/{orderNumber}/show'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

### Get Order Detail for Merchant<br><br>Retrieves complete order details including all associated order line items for a shop owner. Provides<br>comprehensive view necessary for order fulfillment, including item quantities, prices, and variants.
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/detail

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Retrieves complete order including all line items
         - OrderLineMapper includes product details, quantities, unit prices, and discounts
         - Essential for order fulfillment workflow
         - Returns detailed information not included in list view

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order. Must belong to the authenticated merchant's tenant.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders/{orderId}/detail'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

### Get Order Line Items<br><br>Retrieves all line items (products) associated with a specific order. Each line item includes<br>product details, variant information, quantity ordered, and pricing.
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/items

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Returns only items/line items, not order summary
         - OrderLineMapper includes detailed product information and variant selections
         - Useful for constructing packing slips or generating invoices
         - Separating items retrieval allows efficient data loading patterns

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order. Must belong to the authenticated merchant's tenant.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders/{orderId}/items'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─orderId|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─price|double|No comments found.|-|0.0|
|└─totalPrice|double|No comments found.|-|0.0|
|└─productId|string|No comments found.|-||
|└─variationId|string|No comments found.|-||
|└─variationPriceDetailId|string|No comments found.|-||
|└─product|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─description|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─thumbnail|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─imageList|array|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─brand|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─category|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─rating|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─features|array|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─specification|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variation|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "orderId": "",
      "quantity": 0,
      "price": 0.0,
      "totalPrice": 0.0,
      "productId": "",
      "variationId": "",
      "variationPriceDetailId": "",
      "product": {
        "id": "",
        "name": "",
        "slug": "",
        "description": "",
        "image": "",
        "thumbnail": "",
        "imageList": [
          ""
        ],
        "price": 0.0,
        "newPrice": 0.0,
        "ramSize": "",
        "Storage": "",
        "size": "",
        "sku": "",
        "quantityInStock": 0,
        "brand": "",
        "discount": 0.0,
        "category": "",
        "color": "",
        "rating": 0,
        "features": [
          ""
        ],
        "specification": [
          {
            "key": "",
            "value": ""
          }
        ],
        "variation": {
          "id": "",
          "customColor": "",
          "color": "",
          "image": ""
        }
      },
      "customer": {
        "id": "",
        "email": "",
        "fullName": "",
        "phoneNumber": "",
        "address": "",
        "status": "",
        "createdAt": "2026-03-22 18:31:38",
        "updatedAt": "2026-03-22 18:31:38"
      },
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    }
  ]
}
```

### Update Order Status
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/status

**Type:** PATCH


**Content-Type:** application/json

**Description:** Updates the current status of an order to reflect fulfillment progress. Valid status transitions are enforced
to prevent invalid workflow progressions. Records an audit trail entry capturing who changed the status and why.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order to update. Must belong to authenticated merchant's tenant.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|true|No comments found.|-||
|reason|string|false|No comments found.<br/>Validation[Size(max=500, min=3, message=Reason should be minimum of 3 characters and maximum of 500 characters)]|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders/{orderId}/status'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─orderId|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─price|double|No comments found.|-|0.0|
|└─totalPrice|double|No comments found.|-|0.0|
|└─productId|string|No comments found.|-||
|└─variationId|string|No comments found.|-||
|└─variationPriceDetailId|string|No comments found.|-||
|└─product|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─description|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─thumbnail|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─imageList|array|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─brand|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─category|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─rating|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─features|array|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─specification|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variation|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|└─customer|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:38"|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "orderId": "",
      "quantity": 0,
      "price": 0.0,
      "totalPrice": 0.0,
      "productId": "",
      "variationId": "",
      "variationPriceDetailId": "",
      "product": {
        "id": "",
        "name": "",
        "slug": "",
        "description": "",
        "image": "",
        "thumbnail": "",
        "imageList": [
          ""
        ],
        "price": 0.0,
        "newPrice": 0.0,
        "ramSize": "",
        "Storage": "",
        "size": "",
        "sku": "",
        "quantityInStock": 0,
        "brand": "",
        "discount": 0.0,
        "category": "",
        "color": "",
        "rating": 0,
        "features": [
          ""
        ],
        "specification": [
          {
            "key": "",
            "value": ""
          }
        ],
        "variation": {
          "id": "",
          "customColor": "",
          "color": "",
          "image": ""
        }
      },
      "customer": {
        "id": "",
        "email": "",
        "fullName": "",
        "phoneNumber": "",
        "address": "",
        "status": "",
        "createdAt": "2026-03-22 18:31:38",
        "updatedAt": "2026-03-22 18:31:38"
      },
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    }
  ]
}
```

### Force Update Order Status (Admin Override)<br><br>Bypasses all standard transition rules and forcibly sets the order to the given status.<br>Use with caution — this is intended for administrative corrections only (e.g., stuck orders,<br>data recovery, third-party sync discrepancies).
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/force-status

**Type:** PATCH


**Content-Type:** application/json

**Description:** Force Update Order Status (Admin Override)

Bypasses all standard transition rules and forcibly sets the order to the given status.
Use with caution — this is intended for administrative corrections only (e.g., stuck orders,
data recovery, third-party sync discrepancies).

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|                   Unique identifier of the order to update.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|true|No comments found.|-||
|reason|string|false|No comments found.<br/>Validation[Size(max=500, min=3, message=Reason should be minimum of 3 characters and maximum of 500 characters)]|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders/{orderId}/force-status'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Get Order Statistics
**URL:** https://api.shopsynch.com/v1/orders/merchant/stats

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves comprehensive order statistics for a merchant including order count, total revenue, average order value,
orders by status breakdown, and other aggregated metrics useful for business insights and dashboards.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders/merchant/stats'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Get All Order Statuses
**URL:** https://api.shopsynch.com/v1/orders/statuses

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Returns an array of all possible order statuses defined in the system.
This endpoint is public and does not require tenant context.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/orders/statuses'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    "PENDING"
  ]
}
```

## WhatsAppWebhookController
### Send a template message to initiate or re-establish a connection.
**URL:** https://api.shopsynch.com/v1/webhooks/whatsapp/send-template

**Type:** POST


**Content-Type:** application/json

**Description:** Send a template message to initiate or re-establish a connection.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|to|string|false|No comments found.|-||
|templateName|string|false|No comments found.|-||
|languageCode|string|false|No comments found.|-||
|parameters|array|false|No comments found.|-|""","""|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/webhooks/whatsapp/send-template' --data '{
  "to": "",
  "templateName": "",
  "languageCode": "",
  "parameters": [
    ""
  ]
}'
```

**Response-example:**
```json
string
```

### verifyWebhook
**URL:** https://api.shopsynch.com/v1/webhooks/whatsapp

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|hub.mode|string|false|No comments found.|-||
|hub.verify_token|string|false|No comments found.|-||
|hub.challenge|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/webhooks/whatsapp?hub.mode=&hub.verify_token=&hub.challenge='
```

**Response-example:**
```json
string
```

### receiveMessage
**URL:** https://api.shopsynch.com/v1/webhooks/whatsapp

**Type:** POST


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|array|boolean|false|No comments found.|-|true|
|object|boolean|false|No comments found.|-|true|
|valueNode|boolean|false|No comments found.|-|true|
|containerNode|boolean|false|No comments found.|-|true|
|missingNode|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/webhooks/whatsapp' --data '{
  "array": true,
  "object": true,
  "valueNode": true,
  "containerNode": true,
  "missingNode": true
}'
```

**Response-example:**
```json
string
```

## SocialAuthController
### registerMerchant
**URL:** https://api.shopsynch.com/v1/auth/social/google/signup/merchant

**Type:** POST


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accessToken|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/auth/social/google/signup/merchant' --data '{
  "accessToken": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|customer|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─email|string|No comments found.|-||
|└─fullName|string|No comments found.|-||
|└─phoneNumber|string|No comments found.|-||
|└─address|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|token|string|No comments found.|-||
|expiresIn|int64|No comments found.|-|0|

**Response-example:**
```json
{
  "customer": {
    "id": "",
    "email": "",
    "fullName": "",
    "phoneNumber": "",
    "address": "",
    "status": "",
    "createdAt": "2026-03-22 18:31:39",
    "updatedAt": "2026-03-22 18:31:39"
  },
  "token": "",
  "expiresIn": 0
}
```

## Product Variation Management (Authenticated)
### Update Product Variation
**URL:** https://api.shopsynch.com/v1/products/variation/{variationId}

**Type:** PATCH


**Content-Type:** application/json

**Description:** This API updates the variation of an authenticated merchant's product.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|variationId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|color|string|false|No comments found.|-||
|customColor|string|false|No comments found.|-||
|image|string|false|No comments found.|-||
|productId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/variation/{variationId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|└─summary|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─thumbnail|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─brand|string|No comments found.|-||
|└─discount|double|No comments found.|-|0.0|
|└─category|string|No comments found.|-||
|└─color|string|No comments found.|-||
|└─customColor|string|No comments found.|-||
|└─specifications|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|└─variations|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeValue|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productPriceDetails|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|A map key.|-||
|└─features|array|No comments found.|-|""","""|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "slug": "",
    "description": "",
    "summary": "",
    "image": "",
    "thumbnail": "",
    "images": [
      ""
    ],
    "price": 0.0,
    "newPrice": 0.0,
    "ramSize": "",
    "storage": "",
    "size": "",
    "quantity": 0,
    "brand": "",
    "discount": 0.0,
    "category": "",
    "color": "",
    "customColor": "",
    "specifications": [
      {
        "key": "",
        "value": ""
      }
    ],
    "variations": [
      {
        "id": "",
        "attributeName": "",
        "attributeValue": "",
        "color": {
          "id": "",
          "name": "",
          "code": ""
        },
        "customColor": "",
        "image": "",
        "productPriceDetails": [
          {
            "id": "",
            "price": 0.0,
            "newPrice": 0.0,
            "ramSize": "",
            "Storage": "",
            "size": "",
            "sku": "",
            "quantityInStock": 0,
            "discount": 0.0,
            "variationAttributes": {
              "mapKey1": "",
              "mapKey2": ""
            }
          }
        ]
      }
    ],
    "features": [
      ""
    ],
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### Add Product Variation
**URL:** https://api.shopsynch.com/v1/products/variation/add

**Type:** POST


**Content-Type:** application/json

**Description:** This API adds a variation to an authenticated merchant's product.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|colorId|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=10, message=Please supply a valid color id)]|-||
|customColor|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=3, message=Length of custom color can not be less 3)]|-||
|image|string|false|No comments found.|-||
|priceDetails|array|false|No comments found.<br/>Validation[Size(max=2147483647, min=1, message=At least one price detail is required)]|-||
|└─id|string|false|No comments found.|-||
|└─price|double|true|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|└─newPrice|double|false|No comments found.|-|0.0|
|└─ramSize|string|false|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|└─Storage|string|false|No comments found.|-||
|└─size|string|false|No comments found.|-||
|└─sku|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|└─quantityInStock|int32|true|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|└─discount|double|false|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|└─variationAttributes|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|false|A map key.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/variation/add' --data '{
  "productId": "",
  "colorId": "",
  "customColor": "",
  "image": "",
  "priceDetails": [
    {
      "id": "",
      "price": 0.0,
      "newPrice": 0.0,
      "ramSize": "",
      "Storage": "",
      "size": "",
      "sku": "",
      "quantityInStock": 0,
      "discount": 0.0,
      "variationAttributes": {
        "mapKey1": "",
        "mapKey2": ""
      }
    }
  ]
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|└─summary|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─thumbnail|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─brand|string|No comments found.|-||
|└─discount|double|No comments found.|-|0.0|
|└─category|string|No comments found.|-||
|└─color|string|No comments found.|-||
|└─customColor|string|No comments found.|-||
|└─specifications|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|└─variations|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeValue|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productPriceDetails|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|A map key.|-||
|└─features|array|No comments found.|-|""","""|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "slug": "",
    "description": "",
    "summary": "",
    "image": "",
    "thumbnail": "",
    "images": [
      ""
    ],
    "price": 0.0,
    "newPrice": 0.0,
    "ramSize": "",
    "storage": "",
    "size": "",
    "quantity": 0,
    "brand": "",
    "discount": 0.0,
    "category": "",
    "color": "",
    "customColor": "",
    "specifications": [
      {
        "key": "",
        "value": ""
      }
    ],
    "variations": [
      {
        "id": "",
        "attributeName": "",
        "attributeValue": "",
        "color": {
          "id": "",
          "name": "",
          "code": ""
        },
        "customColor": "",
        "image": "",
        "productPriceDetails": [
          {
            "id": "",
            "price": 0.0,
            "newPrice": 0.0,
            "ramSize": "",
            "Storage": "",
            "size": "",
            "sku": "",
            "quantityInStock": 0,
            "discount": 0.0,
            "variationAttributes": {
              "mapKey1": "",
              "mapKey2": ""
            }
          }
        ]
      }
    ],
    "features": [
      ""
    ],
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

## StateController
### index
**URL:** https://api.shopsynch.com/v1/states/{countryId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|countryId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/states/{countryId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:40"|
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "createdAt": "2026-03-22 18:31:40",
      "updatedAt": "2026-03-22 18:31:40",
      "id": "",
      "name": "",
      "status": true
    }
  ]
}
```

## Tenant Compliance Management
### Get Business Profile
**URL:** https://api.shopsynch.com/v1/compliance/business/profile

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves the business profile of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/compliance/business/profile'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Get Business Compliance Status
**URL:** https://api.shopsynch.com/v1/compliance/business/status

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves the business compliance status of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/compliance/business/status'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Update Business Profile
**URL:** https://api.shopsynch.com/v1/compliance/business/profile

**Type:** PATCH


**Content-Type:** application/json

**Description:** This API updates the business profile of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|businessTradingName|string|true|No comments found.|-||
|legalBusinessName|string|false|No comments found.|-||
|businessType|string|true|No comments found.|-||
|staffSize|int32|false|No comments found.|-|0|
|businessRegistrationNumber|string|false|No comments found.|-||
|businessStorefrontUrl|string|false|No comments found.|-||
|businessDescription|string|true|No comments found.<br/>Validation[Size(max=1000, min=10)]|-||
|industry|string|true|No comments found.|-||
|businessTaxIdNumber|string|false|No comments found.|-||
|businessExpectedMonthlyIncome|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/compliance/business/profile'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Get Business Contact
**URL:** https://api.shopsynch.com/v1/compliance/business/contact/detail

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves the business contact of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/compliance/business/contact/detail'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Update Business Contact
**URL:** https://api.shopsynch.com/v1/compliance/business/contact/detail

**Type:** PATCH


**Content-Type:** application/json

**Description:** This API updates the business contact of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|businessCountry|string|true|No comments found.|-||
|businessCity|string|true|No comments found.|-||
|businessAddress|string|true|No comments found.|-||
|businessPrimaryPhoneNumber|string|true|No comments found.|-||
|businessSecondaryPhoneNumber|string|false|No comments found.|-||
|businessSupportEmailAddress|string|true|No comments found.<br/>Validation[Email()]|-||
|businessGeneralEmailAddress|string|true|No comments found.<br/>Validation[Email()]|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/compliance/business/contact/detail'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## CountryController
### getAllCountries
**URL:** https://api.shopsynch.com/v1/countries

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/countries?name='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─status|boolean|No comments found.|-|true|
|└─states|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:41"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": [
    {
      "createdAt": "2026-03-22 18:31:41",
      "updatedAt": "2026-03-22 18:31:41",
      "id": "",
      "name": "",
      "status": true,
      "states": [
        {
          "createdAt": "2026-03-22 18:31:41",
          "updatedAt": "2026-03-22 18:31:41",
          "id": "",
          "name": "",
          "status": true
        }
      ]
    }
  ],
  "message": "",
  "status": true
}
```

## SpecificationController
### getSpecifications
**URL:** https://api.shopsynch.com/v1/specifications

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/specifications'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": [
    {
      "id": "",
      "name": "",
      "slug": "",
      "description": ""
    }
  ],
  "message": "",
  "status": true
}
```

## Tenant Configuration Management
### Update Current Mode
**URL:** https://api.shopsynch.com/v1/config/currentMode/{mode}

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API updates the current mode of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|mode|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/config/currentMode/{mode}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Update Domain
**URL:** https://api.shopsynch.com/v1/config/domain

**Type:** PATCH


**Content-Type:** application/json

**Description:** This API updates the domain of the tenant .

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|domains|array|false|No comments found.|-|""","""|
|mode|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/config/domain'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Get Domains
**URL:** https://api.shopsynch.com/v1/config/domain

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves the domains of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/config/domain'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Get Keys
**URL:** https://api.shopsynch.com/v1/config/keys

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves the api keys of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/config/keys'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Generate Keys
**URL:** https://api.shopsynch.com/v1/config/regenerate/keys/{mode}

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API regenerates the api keys of the tenant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|mode|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/config/regenerate/keys/{mode}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## HomeController
### getHealth
**URL:** https://api.shopsynch.com/v1/health

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/health'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### getHealths
**URL:** https://api.shopsynch.com/v1/healths

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/healths'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## ProductVariationPriceDetailController
### updateProductVariationPriceDetail
**URL:** https://api.shopsynch.com/v1/products/variation/priceDetail/{variationPriceDetailId}

**Type:** PATCH


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|variationPriceDetailId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|variationId|string|true|No comments found.|-||
|price|double|false|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|newPrice|double|false|No comments found.|-|0.0|
|ramSize|string|false|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|Storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|quantityInStock|int32|false|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|discount|double|false|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/variation/priceDetail/{variationPriceDetailId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|└─summary|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─thumbnail|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─brand|string|No comments found.|-||
|└─discount|double|No comments found.|-|0.0|
|└─category|string|No comments found.|-||
|└─color|string|No comments found.|-||
|└─customColor|string|No comments found.|-||
|└─specifications|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|└─variations|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeValue|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productPriceDetails|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|A map key.|-||
|└─features|array|No comments found.|-|""","""|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "slug": "",
    "description": "",
    "summary": "",
    "image": "",
    "thumbnail": "",
    "images": [
      ""
    ],
    "price": 0.0,
    "newPrice": 0.0,
    "ramSize": "",
    "storage": "",
    "size": "",
    "quantity": 0,
    "brand": "",
    "discount": 0.0,
    "category": "",
    "color": "",
    "customColor": "",
    "specifications": [
      {
        "key": "",
        "value": ""
      }
    ],
    "variations": [
      {
        "id": "",
        "attributeName": "",
        "attributeValue": "",
        "color": {
          "id": "",
          "name": "",
          "code": ""
        },
        "customColor": "",
        "image": "",
        "productPriceDetails": [
          {
            "id": "",
            "price": 0.0,
            "newPrice": 0.0,
            "ramSize": "",
            "Storage": "",
            "size": "",
            "sku": "",
            "quantityInStock": 0,
            "discount": 0.0,
            "variationAttributes": {
              "mapKey1": "",
              "mapKey2": ""
            }
          }
        ]
      }
    ],
    "features": [
      ""
    ],
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### addProductVariationPriceDetail
**URL:** https://api.shopsynch.com/v1/products/variation/priceDetail

**Type:** POST


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|variationId|string|true|No comments found.|-||
|price|double|false|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|newPrice|double|false|No comments found.|-|0.0|
|ramSize|string|false|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|Storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|quantityInStock|int32|false|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|discount|double|false|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/variation/priceDetail' --data '{
  "productId": "",
  "variationId": "",
  "price": 0.0,
  "newPrice": 0.0,
  "ramSize": "",
  "Storage": "",
  "size": "",
  "sku": "",
  "quantityInStock": 0,
  "discount": 0.0
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|└─summary|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─thumbnail|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─brand|string|No comments found.|-||
|└─discount|double|No comments found.|-|0.0|
|└─category|string|No comments found.|-||
|└─color|string|No comments found.|-||
|└─customColor|string|No comments found.|-||
|└─specifications|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|└─variations|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeValue|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productPriceDetails|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|A map key.|-||
|└─features|array|No comments found.|-|""","""|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "slug": "",
    "description": "",
    "summary": "",
    "image": "",
    "thumbnail": "",
    "images": [
      ""
    ],
    "price": 0.0,
    "newPrice": 0.0,
    "ramSize": "",
    "storage": "",
    "size": "",
    "quantity": 0,
    "brand": "",
    "discount": 0.0,
    "category": "",
    "color": "",
    "customColor": "",
    "specifications": [
      {
        "key": "",
        "value": ""
      }
    ],
    "variations": [
      {
        "id": "",
        "attributeName": "",
        "attributeValue": "",
        "color": {
          "id": "",
          "name": "",
          "code": ""
        },
        "customColor": "",
        "image": "",
        "productPriceDetails": [
          {
            "id": "",
            "price": 0.0,
            "newPrice": 0.0,
            "ramSize": "",
            "Storage": "",
            "size": "",
            "sku": "",
            "quantityInStock": 0,
            "discount": 0.0,
            "variationAttributes": {
              "mapKey1": "",
              "mapKey2": ""
            }
          }
        ]
      }
    ],
    "features": [
      ""
    ],
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

## File Management (File Upload)
### Upload Single Image.
**URL:** https://api.shopsynch.com/v1/files/upload/single/image

**Type:** POST


**Content-Type:** multipart/form-data

**Description:** This API uploads a single image.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|file|file|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: multipart/form-data" -H "X-MerchantApiKey:pk_test" -F 'file=' -i 'https://api.shopsynch.com/v1/files/upload/single/image'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─name|string|No comments found.|-||
|└─url|string|No comments found.|-||
|└─type|string|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "name": "",
    "url": "",
    "type": ""
  },
  "message": "",
  "status": true
}
```

### Upload Multiple Images.
**URL:** https://api.shopsynch.com/v1/files/upload/multiple/images

**Type:** POST


**Content-Type:** multipart/form-data

**Description:** This API uploads multiple images.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|files|file|true|No comments found.(array of file)|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: multipart/form-data" -H "X-MerchantApiKey:pk_test" -F 'files=' -i 'https://api.shopsynch.com/v1/files/upload/multiple/images'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─name|string|No comments found.|-||
|└─url|string|No comments found.|-||
|└─type|string|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": [
    {
      "name": "",
      "url": "",
      "type": ""
    }
  ],
  "message": "",
  "status": true
}
```

## Payment Method Management
### List Payment Methods.
**URL:** https://api.shopsynch.com/v1/payment-methods

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves a list of payment methods.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payment-methods'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

## Tenant Category Management
### List Tenant Categories.
**URL:** https://api.shopsynch.com/v1/tenant-categories

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API retrieves a list of tenant categories.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|search|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|parentId|string|false|No comments found.|-||
|featured|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/tenant-categories?search=&status=&parentId=&featured=true'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "name": "",
      "slug": ""
    }
  ]
}
```

### Create Tenant Category.
**URL:** https://api.shopsynch.com/v1/tenant-categories

**Type:** POST


**Content-Type:** application/json

**Description:** This API creates a new tenant category.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|false|No comments found.<br/>Validation[Size(max=50, min=1, message=Name can not be less than 1 character and can not exceed 255 characters)]|-||
|categoryId|string|false|No comments found.|-||
|parentId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/tenant-categories' --data '{
  "name": "",
  "categoryId": "",
  "parentId": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "slug": ""
  }
}
```

### Delete Tenant Category.
**URL:** https://api.shopsynch.com/v1/tenant-categories/{categoryId}

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** This API deletes a tenant category.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|categoryId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/tenant-categories/{categoryId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## LocalGovernmentController
### index
**URL:** https://api.shopsynch.com/v1/local-governments/{stateId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|stateId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/local-governments/{stateId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─status|boolean|No comments found.|-|true|
|└─state|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "createdAt": "2026-03-22 18:31:39",
      "updatedAt": "2026-03-22 18:31:39",
      "id": "",
      "name": "",
      "status": true,
      "state": {
        "createdAt": "2026-03-22 18:31:39",
        "updatedAt": "2026-03-22 18:31:39",
        "id": "",
        "name": "",
        "status": true
      }
    }
  ]
}
```

## App Token Management
### Verify Merchant Reset Password Token
**URL:** https://api.shopsynch.com/v1/verify/merchant/reset-password-token

**Type:** POST


**Content-Type:** application/json

**Description:** This API verifies the merchant reset password token.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||
|token|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/verify/merchant/reset-password-token' --data '{
  "email": "",
  "token": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## Change Password Management (authenticated)
### Change Customer Password
**URL:** https://api.shopsynch.com/v1/change/password/customer

**Type:** PATCH


**Content-Type:** application/json

**Description:** This API changes the password of an authenticated customer.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|accountNonExpired|boolean|false|No comments found.|-|true|
|accountNonLocked|boolean|false|No comments found.|-|true|
|credentialsNonExpired|boolean|false|No comments found.|-|true|
|id|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|firstName|string|false|No comments found.|-||
|lastName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─fullAddress|string|false|No comments found.|-||
|└─street|string|false|No comments found.|-||
|└─streetNumber|string|false|No comments found.|-||
|└─postalCode|string|false|No comments found.|-||
|└─city|string|false|No comments found.|-||
|└─customerId|string|false|No comments found.|-||
|└─isDefault|boolean|false|No comments found.|-|true|
|└─state|string|false|No comments found.|-||
|└─localGovernment|string|false|No comments found.|-||
|└─country|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|currentPassword|string|true|No comments found.|-||
|newPassword|string|true|No comments found.|-||
|confirmPassword|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/change/password/customer?createdAt="2026-03-22 18:31:39"&updatedAt="2026-03-22 18:31:39"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Change Merchant Password
**URL:** https://api.shopsynch.com/v1/change/password/merchant

**Type:** PATCH


**Content-Type:** application/json

**Description:** This API changes the password of an authenticated merchant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|id|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|password|string|false|No comments found.|-||
|fullName|string|false|No comments found.|-||
|dateOfBirth|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|nationality|string|false|No comments found.|-||
|idType|string|false|e.g. "National ID", "Passport"|-||
|idNumber|string|false|ID number|-||
|idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|profileUrl|string|false|File storage URL|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|└─id|string|false|No comments found.|-||
|└─businessTradingName|string|false|e.g. Business name|-||
|└─legalBusinessName|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|└─businessCountry|string|false|Country of business incorporation|-||
|└─businessCity|string|false|Business city|-||
|└─businessAddress|string|false|Business register address|-||
|└─paystackSubaccountCode|string|false|No comments found.|-||
|└─accountName|string|false|No comments found.|-||
|└─accountNumber|string|false|No comments found.|-||
|└─bankName|string|false|No comments found.|-||
|└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|└─businessDescription|string|false|Business register address|-||
|└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|└─staffSize|int32|false|No comments found.|-|0|
|└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|└─currency|string|false|Default currency|-||
|└─timezone|string|false|Default timezone|-||
|└─language|string|false|Preferred Language|-||
|└─code|string|false|No comments found.|-||
|└─currentMode|string|false|No comments found.|-||
|└─liveKey|string|false|No comments found.|-||
|└─testKey|string|false|No comments found.|-||
|└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|└─status|boolean|false|No comments found.|-|true|
|└─createdBy|string|false|No comments found.|-||
|└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-22 18:31:39"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─lastLoggedInAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|currentPassword|string|true|No comments found.|-||
|newPassword|string|true|No comments found.|-||
|confirmPassword|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/change/password/merchant?createdAt="2026-03-22 18:31:39"&updatedAt="2026-03-22 18:31:39"&id=&email=&tenantId=&password=&fullName=&dateOfBirth=&phoneNumber=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&status=&address=&version=0&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&phoneVerifiedAt=yyyy-MM-dd HH:mm:ss&lastLoggedInAt=yyyy-MM-dd HH:mm:ss&name=&slug=&businessTradingName=&legalBusinessName=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## BrandController
### getAllBrands
**URL:** https://api.shopsynch.com/v1/brands

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/brands'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─logo|string|No comments found.|-||
|└─slug|string|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "name": "",
      "logo": "",
      "slug": ""
    }
  ]
}
```

## Forgot Password Management (Unauthenticated)
### Initiate Forgot Password for Customer
**URL:** https://api.shopsynch.com/v1/password/forgot/request/customer

**Type:** POST


**Content-Type:** application/json

**Description:** This API generates a reset token and sends an email to the customer.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Email is invalid)]|-||
|clientUrl|string|true|No comments found.|-||
|expiresIn|int32|false|No comments found.<br/>Validation[Min(value=300, message=Expires in can not be less than 300 secs i.e 5min)]|-|0|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/password/forgot/request/customer' --data '{
  "email": "",
  "clientUrl": "",
  "expiresIn": 0
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Initiate Forgot Password for Merchant
**URL:** https://api.shopsynch.com/v1/password/forgot/request/merchant

**Type:** POST


**Content-Type:** application/json

**Description:** This API generates a reset token and sends an email to the merchant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.<br/>Validation[Email(message=Email is invalid)]|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/password/forgot/request/merchant' --data '{
  "email": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Reset Customer Password.
**URL:** https://api.shopsynch.com/v1/password/reset/customer

**Type:** POST


**Content-Type:** application/json

**Description:** This API resets the customer password.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|token|string|true|No comments found.|-||
|newPassword|string|true|No comments found.|-||
|confirmPassword|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/password/reset/customer' --data '{
  "token": "",
  "newPassword": "",
  "confirmPassword": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Reset Merchant Password.
**URL:** https://api.shopsynch.com/v1/password/reset/merchant

**Type:** POST


**Content-Type:** application/json

**Description:** This API resets the merchant password.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|token|string|true|No comments found.|-||
|newPassword|string|true|No comments found.|-||
|confirmPassword|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/password/reset/merchant' --data '{
  "token": "",
  "newPassword": "",
  "confirmPassword": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─any object|object|any object.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## Product Management
### Get All Products
**URL:** https://api.shopsynch.com/v1/products

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves a paginated list of products with optional filtering and sorting. Supports filtering by search term,
category, brand, color, price range, stock status, and customer rating. Results are returned in pages for efficient
data loading and display.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|page|int32|true|Zero-based page number for pagination. Default is 0 (first page). Must be >= 0.|-|0|
|limit|int32|true|Maximum number of products per page. Default is 100, adjustable for performance.|-|100|
|sortFieldParam|string|true|Field to sort by (CREATED_AT, NAME, PRICE, RATING, etc.). Default is CREATED_AT.|-|CREATED_AT|
|sortDirectionParam|string|true|Sort direction: "ASC" for ascending or "DESC" for descending. Default is DESC.|-|DESC|
|search|string|false|No comments found.|-||
|category|string|false|No comments found.|-||
|brand|string|false|No comments found.|-||
|color|string|false|No comments found.|-||
|minPrice|double|false|No comments found.|-|0.0|
|maxPrice|double|false|No comments found.|-|0.0|
|availability|boolean|false|No comments found.|-|true|
|status|string|false|No comments found.|-||
|minRating|double|false|No comments found.|-|0.0|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products?page=0&limit=100&sortFieldParam=CREATED_AT&sortDirectionParam=DESC&search=&category=&brand=&color=&minPrice=0.0&maxPrice=0.0&availability=true&status=&minRating=0.0'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

### Create Product
**URL:** https://api.shopsynch.com/v1/products

**Type:** POST


**Content-Type:** application/json

**Description:** Creates a new product in the merchant's store (tenant). Validates product details including brand, color,
and category associations. Specifications are validated against tenant-specific configuration. Product is
immediately published upon creation unless status is set to INACTIVE.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|false|No comments found.|-||
|name|string|true|No comments found.<br/>Validation[Length(max=2147483647, min=1)]|-||
|slug|string|false|No comments found.|-||
|description|string|true|No comments found.<br/>Validation[Length(max=1000, min=5, message=Description must be between 5-1000 characters)]|-||
|summary|string|false|No comments found.<br/>Validation[Length(max=500, min=5, message=Summary must be between 5-500 characters)]|-||
|image|string|true|No comments found.|-||
|thumbnail|string|true|No comments found.|-||
|imageList|array|false|No comments found.|-|""","""|
|features|array|false|No comments found.<br/>Validation[Size(max=2147483647, min=1, message=At least one feature is required, it can not be empty)]|-|""","""|
|price|double|true|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|ramSize|string|false|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|quantityInStock|int32|true|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|brandId|string|false|No comments found.|-||
|discount|double|false|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|categoryId|string|true|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|colorId|string|false|No comments found.<br/>Validation[Size(max=2147483647, min=10)]|-||
|customColor|string|false|No comments found.<br/>Validation[Size(max=50, min=3)]|-||
|specifications|array|false|No comments found.<br/>Validation[Size(max=2147483647, min=1, message=At least one specification is required)]|-||
|└─key|string|true|No comments found.|-||
|└─value|string|true|No comments found.|-||
|variations|array|false|No comments found.<br/>Validation[Size(max=2147483647, min=1, message=At least one variation is required)]|-||
|└─color|string|true|No comments found.|-||
|└─image|string|false|No comments found.|-||
|└─priceDetails|array|false|No comments found.<br/>Validation[Size(max=2147483647, min=1, message=At least one price detail is required)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|true|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|false|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|false|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|true|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|false|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|false|A map key.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products' --data '{
  "id": "",
  "name": "",
  "slug": "",
  "description": "",
  "summary": "",
  "image": "",
  "thumbnail": "",
  "imageList": [
    ""
  ],
  "features": [
    ""
  ],
  "price": 0.0,
  "ramSize": "",
  "storage": "",
  "size": "",
  "sku": "",
  "quantityInStock": 0,
  "brandId": "",
  "discount": 0.0,
  "categoryId": "",
  "tenantId": "",
  "colorId": "",
  "customColor": "",
  "specifications": [
    {
      "key": "",
      "value": ""
    }
  ],
  "variations": [
    {
      "color": "",
      "image": "",
      "priceDetails": [
        {
          "id": "",
          "price": 0.0,
          "newPrice": 0.0,
          "ramSize": "",
          "Storage": "",
          "size": "",
          "sku": "",
          "quantityInStock": 0,
          "discount": 0.0,
          "variationAttributes": {
            "mapKey1": "",
            "mapKey2": ""
          }
        }
      ]
    }
  ]
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Update Product
**URL:** https://api.shopsynch.com/v1/products/{productId}

**Type:** PATCH


**Content-Type:** application/json

**Description:** Updates an existing product's details. Allows modification of product information including name, description,
pricing, status, and specifications. Only merchant who owns the product can update it.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product to update. Must belong to authenticated merchant's tenant.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=1, message=Product name must have at least 1 character)]|-||
|slug|string|false|No comments found.|-||
|description|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=50, message=Description must be at least 50 characters long)]|-||
|summary|string|false|No comments found.<br/>Validation[Length(max=255, min=10, message=Summary must be at least 10 characters long)]|-||
|image|string|false|No comments found.|-||
|thumbnail|string|false|No comments found.|-||
|imageList|array|false|No comments found.|-|""","""|
|features|array|false|No comments found.|-|""","""|
|price|double|false|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|ramSize|string|false|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB', 'MB', 'KB', or 'TB' (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2, message=SKU must have at least 2 characters)]|-||
|quantityInStock|int32|false|No comments found.<br/>Validation[Min(value=0, message=Quantity in stock cannot be less than 0)]|-|0|
|brandId|string|false|No comments found.|-||
|discount|double|false|No comments found.<br/>Validation[Min(value=0, message=Discount cannot be less than 0); Max(value=100, message=Discount cannot be greater than 100)]|-|0.0|
|categoryId|string|false|No comments found.|-||
|colorId|string|false|No comments found.|-||
|customColor|string|false|No comments found.|-||
|specifications|array|false|No comments found.<br/>Validation[Size(max=2147483647, min=1, message=At least one specification is required)]|-||
|└─key|string|true|No comments found.|-||
|└─value|string|true|No comments found.|-||
|variations|array|false|No comments found.|-||
|└─color|string|true|No comments found.|-||
|└─image|string|false|No comments found.|-||
|└─priceDetails|array|false|No comments found.<br/>Validation[Size(max=2147483647, min=1, message=At least one price detail is required)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|true|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|false|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|false|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|false|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|true|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|false|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|false|A map key.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/{productId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|└─summary|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─thumbnail|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─brand|string|No comments found.|-||
|└─discount|double|No comments found.|-|0.0|
|└─category|string|No comments found.|-||
|└─color|string|No comments found.|-||
|└─customColor|string|No comments found.|-||
|└─specifications|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|└─variations|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeValue|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productPriceDetails|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|A map key.|-||
|└─features|array|No comments found.|-|""","""|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "slug": "",
    "description": "",
    "summary": "",
    "image": "",
    "thumbnail": "",
    "images": [
      ""
    ],
    "price": 0.0,
    "newPrice": 0.0,
    "ramSize": "",
    "storage": "",
    "size": "",
    "quantity": 0,
    "brand": "",
    "discount": 0.0,
    "category": "",
    "color": "",
    "customColor": "",
    "specifications": [
      {
        "key": "",
        "value": ""
      }
    ],
    "variations": [
      {
        "id": "",
        "attributeName": "",
        "attributeValue": "",
        "color": {
          "id": "",
          "name": "",
          "code": ""
        },
        "customColor": "",
        "image": "",
        "productPriceDetails": [
          {
            "id": "",
            "price": 0.0,
            "newPrice": 0.0,
            "ramSize": "",
            "Storage": "",
            "size": "",
            "sku": "",
            "quantityInStock": 0,
            "discount": 0.0,
            "variationAttributes": {
              "mapKey1": "",
              "mapKey2": ""
            }
          }
        ]
      }
    ],
    "features": [
      ""
    ],
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### Get Product Details
**URL:** https://api.shopsynch.com/v1/products/{productId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves complete details of a single product including all attributes, specifications, pricing,
availability, and related information.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product. Must belong to current tenant context.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/{productId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|└─summary|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─thumbnail|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─brand|string|No comments found.|-||
|└─discount|double|No comments found.|-|0.0|
|└─category|string|No comments found.|-||
|└─color|string|No comments found.|-||
|└─customColor|string|No comments found.|-||
|└─specifications|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|└─variations|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeValue|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productPriceDetails|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|A map key.|-||
|└─features|array|No comments found.|-|""","""|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "slug": "",
    "description": "",
    "summary": "",
    "image": "",
    "thumbnail": "",
    "images": [
      ""
    ],
    "price": 0.0,
    "newPrice": 0.0,
    "ramSize": "",
    "storage": "",
    "size": "",
    "quantity": 0,
    "brand": "",
    "discount": 0.0,
    "category": "",
    "color": "",
    "customColor": "",
    "specifications": [
      {
        "key": "",
        "value": ""
      }
    ],
    "variations": [
      {
        "id": "",
        "attributeName": "",
        "attributeValue": "",
        "color": {
          "id": "",
          "name": "",
          "code": ""
        },
        "customColor": "",
        "image": "",
        "productPriceDetails": [
          {
            "id": "",
            "price": 0.0,
            "newPrice": 0.0,
            "ramSize": "",
            "Storage": "",
            "size": "",
            "sku": "",
            "quantityInStock": 0,
            "discount": 0.0,
            "variationAttributes": {
              "mapKey1": "",
              "mapKey2": ""
            }
          }
        ]
      }
    ],
    "features": [
      ""
    ],
    "createdAt": "yyyy-MM-dd HH:mm:ss"
  }
}
```

### Get Similar Products
**URL:** https://api.shopsynch.com/v1/products/similar/by/category/{productId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves a list of products similar to a specified product, typically from the same category or with
related attributes. Useful for "You might also like" or "Related products" sections in product detail pages.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the reference product. Must belong to current tenant.|-||

**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|limit|int32|true|Maximum number of similar products to return. Default is 4, adjustable based on UI requirements.|-|4|

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/similar/by/category/{productId}?limit=4'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─slug|string|No comments found.|-||
|└─description|string|No comments found.|-||
|└─summary|string|No comments found.|-||
|└─image|string|No comments found.|-||
|└─thumbnail|string|No comments found.|-||
|└─images|array|No comments found.|-|""","""|
|└─price|double|No comments found.|-|0.0|
|└─newPrice|double|No comments found.|-|0.0|
|└─ramSize|string|No comments found.|-||
|└─storage|string|No comments found.|-||
|└─size|string|No comments found.|-||
|└─quantity|int32|No comments found.|-|0|
|└─brand|string|No comments found.|-||
|└─discount|double|No comments found.|-|0.0|
|└─category|string|No comments found.|-||
|└─color|string|No comments found.|-||
|└─customColor|string|No comments found.|-||
|└─specifications|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─key|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|No comments found.|-||
|└─variations|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeName|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─attributeValue|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─color|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─customColor|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─image|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─productPriceDetails|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.<br/>Validation[Min(value=1, message=Price can not be less than 1)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.<br/>Validation[Pattern(regexp=^\d+(GB|MB|KB|TB)$, message=RAM size must be a number followed by 'GB' or 'MB' or 'KB' or TB (e.g., 4GB, 512MB, 12KB, 1TB))]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.<br/>Validation[Length(max=2147483647, min=2)]|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.<br/>Validation[Min(value=1, message=Quantity can not be less than 1)]|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.<br/>Validation[Min(value=0, message=Discount can not be less than 0); Max(value=100, message=Discount can not be greater than 100)]|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|A map key.|-||
|└─features|array|No comments found.|-|""","""|
|└─createdAt|string|No comments found.|-|yyyy-MM-dd HH:mm:ss|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "name": "",
      "slug": "",
      "description": "",
      "summary": "",
      "image": "",
      "thumbnail": "",
      "images": [
        ""
      ],
      "price": 0.0,
      "newPrice": 0.0,
      "ramSize": "",
      "storage": "",
      "size": "",
      "quantity": 0,
      "brand": "",
      "discount": 0.0,
      "category": "",
      "color": "",
      "customColor": "",
      "specifications": [
        {
          "key": "",
          "value": ""
        }
      ],
      "variations": [
        {
          "id": "",
          "attributeName": "",
          "attributeValue": "",
          "color": {
            "id": "",
            "name": "",
            "code": ""
          },
          "customColor": "",
          "image": "",
          "productPriceDetails": [
            {
              "id": "",
              "price": 0.0,
              "newPrice": 0.0,
              "ramSize": "",
              "Storage": "",
              "size": "",
              "sku": "",
              "quantityInStock": 0,
              "discount": 0.0,
              "variationAttributes": {
                "mapKey1": "",
                "mapKey2": ""
              }
            }
          ]
        }
      ],
      "features": [
        ""
      ],
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    }
  ]
}
```

### Delete Product
**URL:** https://api.shopsynch.com/v1/products/{productId}

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** Permanently deletes a product from the merchant's store. Product details are removed from system but
historical order records remain intact for audit purposes.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product to delete. Must belong to authenticated merchant's tenant.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/{productId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Get Product Rating<br><br>Retrieves the average customer rating for a product calculated from all customer reviews.<br>Rating provides social proof and helps customers make purchase decisions.
**URL:** https://api.shopsynch.com/v1/products/{productId}/rating

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Public endpoint (no authentication required)
         - Computes average rating from all published customer reviews
         - Rating range is typically 1.0 to 5.0 stars
         - Returns 0.0 if product has no reviews yet
         - Used in product listings and detail pages to display customer sentiment
         - Computation is cached or aggregated query for performance

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product. Must belong to current tenant.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/products/{productId}/rating'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

## CartSessionController
### getSessionID
**URL:** https://api.shopsynch.com/v1/generate/session/id

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/generate/session/id'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

## Payment Management
### Get All Payments
**URL:** https://api.shopsynch.com/v1/payments

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves a paginated list of payments for a tenant with cursor-based navigation.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|cursor|string|false|            Optional cursor token for pagination.|-||
|limit|int32|true|             Maximum number of records per page.|-|10|
|sortDirectionParam|string|true|Sort direction: "ASC" or "DESC". Default is DESC.|-|DESC|
|status|string|false|No comments found.|-||
|gateway|string|false|No comments found.|-||
|paymentMethod|string|false|No comments found.|-||
|reference|string|false|No comments found.|-||
|customerId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payments?cursor=&limit=10&sortDirectionParam=DESC&status=&gateway=&paymentMethod=&reference=&customerId='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─mapKey|object|A map key.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "mapKey": {
      "warning": "Using java.util.Object as a Map value is not recommended. Smart-doc cannot process it properly. Please use a specific type for better documentation generation."
    }
  }
}
```

### Get Payment by Order ID
**URL:** https://api.shopsynch.com/v1/payments/order/{orderId}

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Retrieves the payment details associated with a specific order.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payments/order/{orderId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─customerId|string|No comments found.|-||
|└─reference|string|No comments found.|-||
|└─amount|double|No comments found.|-|0.0|
|└─paidAt|string|No comments found.|-||
|└─gateway|string|No comments found.|-||
|└─paymentMethod|string|No comments found.|-||
|└─currency|string|No comments found.|-||
|└─orderId|string|No comments found.|-||
|└─status|string|No comments found.|-||
|└─paymentGatewayTransactionId|string|No comments found.|-||
|└─manualPayment|boolean|No comments found.|-|true|
|└─createdAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|└─updatedAt|string|No comments found.|-|"2026-03-22 18:31:39"|
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {
    "id": "",
    "customerId": "",
    "reference": "",
    "amount": 0.0,
    "paidAt": "",
    "gateway": "",
    "paymentMethod": "",
    "currency": "",
    "orderId": "",
    "status": "",
    "paymentGatewayTransactionId": "",
    "manualPayment": true,
    "createdAt": "2026-03-22 18:31:39",
    "updatedAt": "2026-03-22 18:31:39"
  },
  "message": "",
  "status": true
}
```

### Initialize Customer Payment
**URL:** https://api.shopsynch.com/v1/payments/initialize

**Type:** POST


**Content-Type:** application/json

**Description:** Initializes a payment transaction for an authenticated customer's order. Validates the requested payment gateway
and method, ensures the merchant has configured the payment gateway, creates a payment record, and initiates
the payment processing with the external payment gateway.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|The order id of the order to be paid for|-||
|paymentMethod|string|true|The payment method to be used for the payment|-||
|paymentGateway|string|true|The payment gateway to be used for the payment<br/>The following payment gateways are supported:<br/>- PAYSTACK<br/>- FLUTTERWAVE (coming soon)<br/>- STRIPE (coming soon)<br/>- OFFLINE|-||
|currency|string|true|The currency to be used for the payment|-||
|callbackUrl|string|false|The callback URL to be used for the payment that are not offline|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payments/initialize' --data '{
  "orderId": "",
  "paymentMethod": "",
  "paymentGateway": "",
  "currency": "",
  "callbackUrl": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Initialize Guest Payment
**URL:** https://api.shopsynch.com/v1/payments/guest/initialize

**Type:** POST


**Content-Type:** application/json

**Description:** Initializes a payment transaction for a guest (unauthenticated) customer's order.
Performs same validation as customer payment initialization but without requiring user authentication.
Guest payment includes currency validation and creates a guest-friendly payment record.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|The order id of the order to be paid for|-||
|paymentMethod|string|true|The payment method to be used for the payment|-||
|paymentGateway|string|true|The payment gateway to be used for the payment<br/>The following payment gateways are supported:<br/>- PAYSTACK<br/>- FLUTTERWAVE (coming soon)<br/>- STRIPE (coming soon)<br/>- OFFLINE|-||
|currency|string|true|The currency to be used for the payment|-||
|callbackUrl|string|false|The callback URL to be used for the payment that are not offline|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payments/guest/initialize' --data '{
  "orderId": "",
  "paymentMethod": "",
  "paymentGateway": "",
  "currency": "",
  "callbackUrl": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|object|No comments found.|-||
|message|string|No comments found.|-||
|status|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "data": {},
  "message": "",
  "status": true
}
```

### Verify and Confirm Payment
**URL:** https://api.shopsynch.com/v1/payments/confirm

**Type:** POST


**Content-Type:** application/json

**Description:** Verifies payment completion with the external payment gateway using the payment reference. Confirms the payment
amount, currency, and status, updates the payment record with gateway verification details, and triggers order status
progression to PROCESSING. Also sends notification emails to merchant.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|
|X-Session-Id|string|false|Optional session identifier for tracking payment<br/>                 confirmation events and audit logs.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|reference|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/payments/confirm' --data '{
  "reference": ""
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|any object|object|any object.|-||

**Response-example:**
```json
{}
```

### Update Payment Status
**URL:** https://api.shopsynch.com/v1/payments/{paymentId}/status

**Type:** PATCH


**Content-Type:** application/json

**Description:** Updates the payment status for a specific payment record. Used by shop owners
to manually confirm or adjust
payment status, particularly for offline or manual payment methods. Records
status transition history and
updates associated order status accordingly.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|paymentId|string|true|                 Unique identifier of the payment record to<br/>                                  update. Must belong to current tenant.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|true|No comments found.|-||
|proofOfPayment|string|false|No comments found.|-||
|notes|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payments/{paymentId}/status'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```

### Get All Payment Statuses
**URL:** https://api.shopsynch.com/v1/payments/statuses

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Returns an array of all possible payment statuses defined in the system.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/payments/statuses'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    "SUCCESS"
  ]
}
```

## AddressController
### getUserAddresses
**URL:** https://api.shopsynch.com/v1/addresses

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Request-example:**
```bash
curl -X GET -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/addresses'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─id|string|No comments found.|-||
|└─street|string|No comments found.|-||
|└─streetNumber|string|No comments found.|-||
|└─postalCode|string|No comments found.|-||
|└─city|string|No comments found.|-||
|└─state|string|No comments found.|-||
|└─country|string|No comments found.|-||
|└─localGovernmentName|string|No comments found.|-||
|└─isDefault|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": [
    {
      "id": "",
      "street": "",
      "streetNumber": "",
      "postalCode": "",
      "city": "",
      "state": "",
      "country": "",
      "localGovernmentName": "",
      "isDefault": true
    }
  ]
}
```

### store
**URL:** https://api.shopsynch.com/v1/addresses

**Type:** POST


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|false|No comments found.|-||
|street|string|false|No comments found.|-||
|streetNumber|string|false|No comments found.|-||
|postalCode|string|false|No comments found.|-||
|city|string|false|No comments found.|-||
|stateId|string|false|No comments found.|-||
|localGovernmentId|string|false|No comments found.|-||
|isDefault|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/addresses' --data '{
  "id": "",
  "street": "",
  "streetNumber": "",
  "postalCode": "",
  "city": "",
  "stateId": "",
  "localGovernmentId": "",
  "isDefault": true
}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─street|string|No comments found.|-||
|└─streetNumber|string|No comments found.|-||
|└─postalCode|string|No comments found.|-||
|└─city|string|No comments found.|-||
|└─state|string|No comments found.|-||
|└─country|string|No comments found.|-||
|└─localGovernmentName|string|No comments found.|-||
|└─isDefault|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "street": "",
    "streetNumber": "",
    "postalCode": "",
    "city": "",
    "state": "",
    "country": "",
    "localGovernmentName": "",
    "isDefault": true
  }
}
```

### updateAddress
**URL:** https://api.shopsynch.com/v1/addresses/{addressId}

**Type:** PATCH


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|addressId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|false|No comments found.|-||
|street|string|false|No comments found.|-||
|streetNumber|string|false|No comments found.|-||
|postalCode|string|false|No comments found.|-||
|city|string|false|No comments found.|-||
|stateId|string|false|No comments found.|-||
|localGovernmentId|string|false|No comments found.|-||
|isDefault|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/addresses/{addressId}'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─street|string|No comments found.|-||
|└─streetNumber|string|No comments found.|-||
|└─postalCode|string|No comments found.|-||
|└─city|string|No comments found.|-||
|└─state|string|No comments found.|-||
|└─country|string|No comments found.|-||
|└─localGovernmentName|string|No comments found.|-||
|└─isDefault|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "street": "",
    "streetNumber": "",
    "postalCode": "",
    "city": "",
    "state": "",
    "country": "",
    "localGovernmentName": "",
    "isDefault": true
  }
}
```

### deleteAddress
**URL:** https://api.shopsynch.com/v1/addresses/{addressId}

**Type:** DELETE


**Content-Type:** application/json

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|addressId|string|true|No comments found.|-||

**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|false|No comments found.|-||
|street|string|false|No comments found.|-||
|streetNumber|string|false|No comments found.|-||
|postalCode|string|false|No comments found.|-||
|city|string|false|No comments found.|-||
|stateId|string|false|No comments found.|-||
|localGovernmentId|string|false|No comments found.|-||
|isDefault|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X DELETE -k -H "Content-Type: application/json" -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/addresses/{addressId}?id=&street=&streetNumber=&postalCode=&city=&stateId=&localGovernmentId=&isDefault=true'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─id|string|No comments found.|-||
|└─street|string|No comments found.|-||
|└─streetNumber|string|No comments found.|-||
|└─postalCode|string|No comments found.|-||
|└─city|string|No comments found.|-||
|└─state|string|No comments found.|-||
|└─country|string|No comments found.|-||
|└─localGovernmentName|string|No comments found.|-||
|└─isDefault|boolean|No comments found.|-|true|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "street": "",
    "streetNumber": "",
    "postalCode": "",
    "city": "",
    "state": "",
    "country": "",
    "localGovernmentName": "",
    "isDefault": true
  }
}
```

### makeAddressDefault
**URL:** https://api.shopsynch.com/v1/addresses/{addressId}/default

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** 

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-MerchantApiKey|string|true|For every request the X-MerchantApiKey header is mandatory. You will get an error if the X-MerchantApiKey is not supplied when it is required|-|pk_test|


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|addressId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-MerchantApiKey:pk_test" -i 'https://api.shopsynch.com/v1/addresses/{addressId}/default'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─any object|object|any object.|-||

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {}
}
```


## Data Dictionaries


### Order Status Codes

| Name | Code | Type | Description |
|------|------|------|-------------|
|PENDING|PENDING|string|Order has been placed but not paid|
|PROCESSING|PROCESSING|string|Payment confirmed, preparing items|
|SHIPPED|SHIPPED|string|Handed over to courier|
|DELIVERED|DELIVERED|string|Received by customer|
|CANCELLED|CANCELLED|string|Order revoked by user or system|
|IN_TRANSIT|IN_TRANSIT|string|Currently on the road|
|FAILED|FAILED|string|Payment or logistics failure|

### Payment Statuses

| Name | Code | Type | Description |
|------|------|------|-------------|
|SUCCESS|SUCCESS|string|Transaction completed and funds captured|
|FAILED|FAILED|string|Payment rejected by gateway or insufficient funds|
|PENDING|PENDING|string|Waiting for customer to initiate or complete payment action|
|PROCESSING|PROCESSING|string|Payment is undergoing verification or gateway processing|
|REFUNDED|REFUNDED|string|Transaction has been reversed and funds returned|
|ABANDONED|ABANDONED|string|Customer exited the payment session without completion|

### Payment Gateways

| Name | Code | Type | Description |
|------|------|------|-------------|
|PAYSTACK|PAYSTACK|string|Nigeria-based processor (Card, Transfer, USSD)|
|FLUTTERWAVE|FLUTTERWAVE|string|Global infrastructure for Africa-wide payments|
|STRIPE|STRIPE|string|International card processing (USD/EUR/GBP)|
|OFFLINE|OFFLINE|string|Manual bank transfer or Cash on Delivery|
|MONNIFY|MONNIFY|string|Automated bank transfer provider for Nigeria|
