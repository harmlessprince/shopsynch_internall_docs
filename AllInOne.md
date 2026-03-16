# Shopsynch API


## Authentication.
### Register Shop Owner<br><br>Registers a new shop owner (merchant) account with store details. This endpoint handles the complete<br>merchant registration workflow including email verification token generation and merchant creation event publishing.
**URL:** https://api.shopsynch.com/v1/auth/signup/merchant.do

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


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||
|password|string|true|No comments found.|-||
|fullName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|storeName|string|true|No comments found.|-||
|clientUrl|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/signup/merchant.do' --data '{
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
**URL:** https://api.shopsynch.com/v1/auth/login.do

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
|X-Session-Id|string|false|Optional session identifier header (X-Session-Id) for tracking login events and session management.<br/>                 If not provided, login proceeds without explicit session tracking.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|false|No comments found.|-||
|password|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/login.do' --data '{
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
**URL:** https://api.shopsynch.com/v1/auth/login/customer.do

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
|X-Session-Id|string|false|Optional session identifier header (X-Session-Id) for tracking customer login events and session correlation.<br/>                 If provided along with valid tenant, publishes CustomerLoginEvent for event-driven processing.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|false|No comments found.|-||
|password|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/login/customer.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:46"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:46"|
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
    "createdAt": "2026-03-16 19:36:46",
    "updatedAt": "2026-03-16 19:36:46"
  },
  "token": "",
  "expiresIn": 0
}
```

## TestAppController
### createUser
**URL:** https://api.shopsynch.com/v1/internal/test/create/merchant/profile.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|userId|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|password|string|false|No comments found.|-||
|roleId|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|tenantName|string|false|No comments found.|-||
|code|string|false|No comments found.|-||
|liveKey|string|false|No comments found.|-||
|testKey|string|false|No comments found.|-||
|createdBy|string|false|No comments found.|-||
|createdAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|updatedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|user|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─id|string|false|No comments found.|-||
|└─email|string|false|No comments found.|-||
|└─tenantId|string|false|No comments found.|-||
|└─password|string|false|No comments found.|-||
|└─fullName|string|false|No comments found.|-||
|└─dateOfBirth|string|false|No comments found.|-||
|└─phoneNumber|string|false|No comments found.|-||
|└─nationality|string|false|No comments found.|-||
|└─idType|string|false|e.g. "National ID", "Passport"|-||
|└─idNumber|string|false|ID number|-||
|└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|└─profileUrl|string|false|File storage URL|-||
|└─status|string|false|No comments found.|-||
|└─address|string|false|No comments found.|-||
|└─version|int32|false|No comments found.|-|0|
|└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/internal/test/create/merchant/profile.do' --data '{
  "userId": "",
  "email": "",
  "password": "",
  "roleId": "",
  "tenantId": "",
  "tenantName": "",
  "code": "",
  "liveKey": "",
  "testKey": "",
  "createdBy": "",
  "createdAt": "yyyy-MM-dd HH:mm:ss",
  "updatedAt": "yyyy-MM-dd HH:mm:ss",
  "user": {
    "createdAt": "2026-03-16 19:36:47",
    "updatedAt": "2026-03-16 19:36:47",
    "id": "",
    "email": "",
    "tenantId": "",
    "password": "",
    "fullName": "",
    "dateOfBirth": "",
    "phoneNumber": "",
    "nationality": "",
    "idType": "",
    "idNumber": "",
    "idDocumentUrl": "",
    "profileUrl": "",
    "status": "",
    "address": "",
    "version": 0,
    "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
    "role": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "name": "",
      "status": true,
      "slug": "",
      "permissions": [
        {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "name": "",
          "status": true,
          "slug": ""
        }
      ]
    },
    "tenant": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "businessTradingName": "",
      "legalBusinessName": "",
      "name": "",
      "businessType": "",
      "businessRegistrationNumber": "",
      "businessCountry": "",
      "businessCity": "",
      "businessAddress": "",
      "paystackSubaccountCode": "",
      "accountName": "",
      "accountNumber": "",
      "bankName": "",
      "businessStorefrontUrl": "",
      "businessDescription": "",
      "industry": "",
      "businessTaxIdNumber": "",
      "businessExpectedMonthlyIncome": "",
      "staffSize": 0,
      "businessPrimaryPhoneNumber": "",
      "businessSecondaryPhoneNumber": "",
      "businessSupportEmailAddress": "",
      "businessGeneralEmailAddress": "",
      "kybCompleted": true,
      "profileDetailFilled": true,
      "contactDetailFilled": true,
      "kycCompleted": true,
      "documentsVerified": true,
      "bankAccountVerified": true,
      "termsAccepted": true,
      "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
      "complianceNotes": [
        ""
      ],
      "liveModeReady": true,
      "currency": "",
      "timezone": "",
      "language": "",
      "code": "",
      "currentMode": "",
      "liveKey": "",
      "testKey": "",
      "liveWhitelistedDomains": [
        ""
      ],
      "testWhitelistedDomains": [
        ""
      ],
      "status": true,
      "createdBy": "",
      "user": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "email": "",
        "tenantId": "",
        "password": "",
        "fullName": "",
        "dateOfBirth": "",
        "phoneNumber": "",
        "nationality": "",
        "idType": "",
        "idNumber": "",
        "idDocumentUrl": "",
        "profileUrl": "",
        "status": "",
        "address": "",
        "version": 0,
        "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
        "role": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "name": "",
          "status": true,
          "slug": "",
          "permissions": [
            {
              "createdAt": "2026-03-16 19:36:47",
              "updatedAt": "2026-03-16 19:36:47",
              "id": "",
              "name": "",
              "status": true,
              "slug": ""
            }
          ]
        },
        "tenant": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "businessTradingName": "",
          "legalBusinessName": "",
          "name": "",
          "businessType": "",
          "businessRegistrationNumber": "",
          "businessCountry": "",
          "businessCity": "",
          "businessAddress": "",
          "paystackSubaccountCode": "",
          "accountName": "",
          "accountNumber": "",
          "bankName": "",
          "businessStorefrontUrl": "",
          "businessDescription": "",
          "industry": "",
          "businessTaxIdNumber": "",
          "businessExpectedMonthlyIncome": "",
          "staffSize": 0,
          "businessPrimaryPhoneNumber": "",
          "businessSecondaryPhoneNumber": "",
          "businessSupportEmailAddress": "",
          "businessGeneralEmailAddress": "",
          "kybCompleted": true,
          "profileDetailFilled": true,
          "contactDetailFilled": true,
          "kycCompleted": true,
          "documentsVerified": true,
          "bankAccountVerified": true,
          "termsAccepted": true,
          "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
          "complianceNotes": [
            ""
          ],
          "liveModeReady": true,
          "currency": "",
          "timezone": "",
          "language": "",
          "code": "",
          "currentMode": "",
          "liveKey": "",
          "testKey": "",
          "liveWhitelistedDomains": [
            ""
          ],
          "testWhitelistedDomains": [
            ""
          ],
          "status": true,
          "createdBy": "",
          "user": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "email": "",
            "tenantId": "",
            "password": "",
            "fullName": "",
            "dateOfBirth": "",
            "phoneNumber": "",
            "nationality": "",
            "idType": "",
            "idNumber": "",
            "idDocumentUrl": "",
            "profileUrl": "",
            "status": "",
            "address": "",
            "version": 0,
            "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
            "role": {
              "$ref": "..."
            },
            "tenant": {
              "$ref": "..."
            }
          }
        }
      }
    }
  },
  "tenant": {
    "createdAt": "2026-03-16 19:36:47",
    "updatedAt": "2026-03-16 19:36:47",
    "id": "",
    "businessTradingName": "",
    "legalBusinessName": "",
    "name": "",
    "businessType": "",
    "businessRegistrationNumber": "",
    "businessCountry": "",
    "businessCity": "",
    "businessAddress": "",
    "paystackSubaccountCode": "",
    "accountName": "",
    "accountNumber": "",
    "bankName": "",
    "businessStorefrontUrl": "",
    "businessDescription": "",
    "industry": "",
    "businessTaxIdNumber": "",
    "businessExpectedMonthlyIncome": "",
    "staffSize": 0,
    "businessPrimaryPhoneNumber": "",
    "businessSecondaryPhoneNumber": "",
    "businessSupportEmailAddress": "",
    "businessGeneralEmailAddress": "",
    "kybCompleted": true,
    "profileDetailFilled": true,
    "contactDetailFilled": true,
    "kycCompleted": true,
    "documentsVerified": true,
    "bankAccountVerified": true,
    "termsAccepted": true,
    "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
    "complianceNotes": [
      ""
    ],
    "liveModeReady": true,
    "currency": "",
    "timezone": "",
    "language": "",
    "code": "",
    "currentMode": "",
    "liveKey": "",
    "testKey": "",
    "liveWhitelistedDomains": [
      ""
    ],
    "testWhitelistedDomains": [
      ""
    ],
    "status": true,
    "createdBy": "",
    "user": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "email": "",
      "tenantId": "",
      "password": "",
      "fullName": "",
      "dateOfBirth": "",
      "phoneNumber": "",
      "nationality": "",
      "idType": "",
      "idNumber": "",
      "idDocumentUrl": "",
      "profileUrl": "",
      "status": "",
      "address": "",
      "version": 0,
      "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
      "role": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "name": "",
        "status": true,
        "slug": "",
        "permissions": [
          {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "name": "",
            "status": true,
            "slug": ""
          }
        ]
      },
      "tenant": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "businessTradingName": "",
        "legalBusinessName": "",
        "name": "",
        "businessType": "",
        "businessRegistrationNumber": "",
        "businessCountry": "",
        "businessCity": "",
        "businessAddress": "",
        "paystackSubaccountCode": "",
        "accountName": "",
        "accountNumber": "",
        "bankName": "",
        "businessStorefrontUrl": "",
        "businessDescription": "",
        "industry": "",
        "businessTaxIdNumber": "",
        "businessExpectedMonthlyIncome": "",
        "staffSize": 0,
        "businessPrimaryPhoneNumber": "",
        "businessSecondaryPhoneNumber": "",
        "businessSupportEmailAddress": "",
        "businessGeneralEmailAddress": "",
        "kybCompleted": true,
        "profileDetailFilled": true,
        "contactDetailFilled": true,
        "kycCompleted": true,
        "documentsVerified": true,
        "bankAccountVerified": true,
        "termsAccepted": true,
        "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
        "complianceNotes": [
          ""
        ],
        "liveModeReady": true,
        "currency": "",
        "timezone": "",
        "language": "",
        "code": "",
        "currentMode": "",
        "liveKey": "",
        "testKey": "",
        "liveWhitelistedDomains": [
          ""
        ],
        "testWhitelistedDomains": [
          ""
        ],
        "status": true,
        "createdBy": "",
        "user": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "email": "",
          "tenantId": "",
          "password": "",
          "fullName": "",
          "dateOfBirth": "",
          "phoneNumber": "",
          "nationality": "",
          "idType": "",
          "idNumber": "",
          "idDocumentUrl": "",
          "profileUrl": "",
          "status": "",
          "address": "",
          "version": 0,
          "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
          "role": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "name": "",
            "status": true,
            "slug": "",
            "permissions": [
              {
                "$ref": "..."
              }
            ]
          },
          "tenant": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "businessTradingName": "",
            "legalBusinessName": "",
            "name": "",
            "businessType": "",
            "businessRegistrationNumber": "",
            "businessCountry": "",
            "businessCity": "",
            "businessAddress": "",
            "paystackSubaccountCode": "",
            "accountName": "",
            "accountNumber": "",
            "bankName": "",
            "businessStorefrontUrl": "",
            "businessDescription": "",
            "industry": "",
            "businessTaxIdNumber": "",
            "businessExpectedMonthlyIncome": "",
            "staffSize": 0,
            "businessPrimaryPhoneNumber": "",
            "businessSecondaryPhoneNumber": "",
            "businessSupportEmailAddress": "",
            "businessGeneralEmailAddress": "",
            "kybCompleted": true,
            "profileDetailFilled": true,
            "contactDetailFilled": true,
            "kycCompleted": true,
            "documentsVerified": true,
            "bankAccountVerified": true,
            "termsAccepted": true,
            "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
            "complianceNotes": [
              ""
            ],
            "liveModeReady": true,
            "currency": "",
            "timezone": "",
            "language": "",
            "code": "",
            "currentMode": "",
            "liveKey": "",
            "testKey": "",
            "liveWhitelistedDomains": [
              ""
            ],
            "testWhitelistedDomains": [
              ""
            ],
            "status": true,
            "createdBy": "",
            "user": {
              "$ref": "..."
            }
          }
        }
      }
    }
  }
}'
```

**Response-example:**
```json
Return void.
```

### updateTenantProfile
**URL:** https://api.shopsynch.com/v1/internal/test/update/tenant/collection.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|userId|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|password|string|false|No comments found.|-||
|roleId|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|tenantName|string|false|No comments found.|-||
|code|string|false|No comments found.|-||
|liveKey|string|false|No comments found.|-||
|testKey|string|false|No comments found.|-||
|createdBy|string|false|No comments found.|-||
|createdAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|updatedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|user|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─id|string|false|No comments found.|-||
|└─email|string|false|No comments found.|-||
|└─tenantId|string|false|No comments found.|-||
|└─password|string|false|No comments found.|-||
|└─fullName|string|false|No comments found.|-||
|└─dateOfBirth|string|false|No comments found.|-||
|└─phoneNumber|string|false|No comments found.|-||
|└─nationality|string|false|No comments found.|-||
|└─idType|string|false|e.g. "National ID", "Passport"|-||
|└─idNumber|string|false|ID number|-||
|└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|└─profileUrl|string|false|File storage URL|-||
|└─status|string|false|No comments found.|-||
|└─address|string|false|No comments found.|-||
|└─version|int32|false|No comments found.|-|0|
|└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/internal/test/update/tenant/collection.do' --data '{
  "userId": "",
  "email": "",
  "password": "",
  "roleId": "",
  "tenantId": "",
  "tenantName": "",
  "code": "",
  "liveKey": "",
  "testKey": "",
  "createdBy": "",
  "createdAt": "yyyy-MM-dd HH:mm:ss",
  "updatedAt": "yyyy-MM-dd HH:mm:ss",
  "user": {
    "createdAt": "2026-03-16 19:36:47",
    "updatedAt": "2026-03-16 19:36:47",
    "id": "",
    "email": "",
    "tenantId": "",
    "password": "",
    "fullName": "",
    "dateOfBirth": "",
    "phoneNumber": "",
    "nationality": "",
    "idType": "",
    "idNumber": "",
    "idDocumentUrl": "",
    "profileUrl": "",
    "status": "",
    "address": "",
    "version": 0,
    "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
    "role": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "name": "",
      "status": true,
      "slug": "",
      "permissions": [
        {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "name": "",
          "status": true,
          "slug": ""
        }
      ]
    },
    "tenant": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "businessTradingName": "",
      "legalBusinessName": "",
      "name": "",
      "businessType": "",
      "businessRegistrationNumber": "",
      "businessCountry": "",
      "businessCity": "",
      "businessAddress": "",
      "paystackSubaccountCode": "",
      "accountName": "",
      "accountNumber": "",
      "bankName": "",
      "businessStorefrontUrl": "",
      "businessDescription": "",
      "industry": "",
      "businessTaxIdNumber": "",
      "businessExpectedMonthlyIncome": "",
      "staffSize": 0,
      "businessPrimaryPhoneNumber": "",
      "businessSecondaryPhoneNumber": "",
      "businessSupportEmailAddress": "",
      "businessGeneralEmailAddress": "",
      "kybCompleted": true,
      "profileDetailFilled": true,
      "contactDetailFilled": true,
      "kycCompleted": true,
      "documentsVerified": true,
      "bankAccountVerified": true,
      "termsAccepted": true,
      "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
      "complianceNotes": [
        ""
      ],
      "liveModeReady": true,
      "currency": "",
      "timezone": "",
      "language": "",
      "code": "",
      "currentMode": "",
      "liveKey": "",
      "testKey": "",
      "liveWhitelistedDomains": [
        ""
      ],
      "testWhitelistedDomains": [
        ""
      ],
      "status": true,
      "createdBy": "",
      "user": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "email": "",
        "tenantId": "",
        "password": "",
        "fullName": "",
        "dateOfBirth": "",
        "phoneNumber": "",
        "nationality": "",
        "idType": "",
        "idNumber": "",
        "idDocumentUrl": "",
        "profileUrl": "",
        "status": "",
        "address": "",
        "version": 0,
        "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
        "role": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "name": "",
          "status": true,
          "slug": "",
          "permissions": [
            {
              "createdAt": "2026-03-16 19:36:47",
              "updatedAt": "2026-03-16 19:36:47",
              "id": "",
              "name": "",
              "status": true,
              "slug": ""
            }
          ]
        },
        "tenant": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "businessTradingName": "",
          "legalBusinessName": "",
          "name": "",
          "businessType": "",
          "businessRegistrationNumber": "",
          "businessCountry": "",
          "businessCity": "",
          "businessAddress": "",
          "paystackSubaccountCode": "",
          "accountName": "",
          "accountNumber": "",
          "bankName": "",
          "businessStorefrontUrl": "",
          "businessDescription": "",
          "industry": "",
          "businessTaxIdNumber": "",
          "businessExpectedMonthlyIncome": "",
          "staffSize": 0,
          "businessPrimaryPhoneNumber": "",
          "businessSecondaryPhoneNumber": "",
          "businessSupportEmailAddress": "",
          "businessGeneralEmailAddress": "",
          "kybCompleted": true,
          "profileDetailFilled": true,
          "contactDetailFilled": true,
          "kycCompleted": true,
          "documentsVerified": true,
          "bankAccountVerified": true,
          "termsAccepted": true,
          "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
          "complianceNotes": [
            ""
          ],
          "liveModeReady": true,
          "currency": "",
          "timezone": "",
          "language": "",
          "code": "",
          "currentMode": "",
          "liveKey": "",
          "testKey": "",
          "liveWhitelistedDomains": [
            ""
          ],
          "testWhitelistedDomains": [
            ""
          ],
          "status": true,
          "createdBy": "",
          "user": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "email": "",
            "tenantId": "",
            "password": "",
            "fullName": "",
            "dateOfBirth": "",
            "phoneNumber": "",
            "nationality": "",
            "idType": "",
            "idNumber": "",
            "idDocumentUrl": "",
            "profileUrl": "",
            "status": "",
            "address": "",
            "version": 0,
            "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
            "role": {
              "$ref": "..."
            },
            "tenant": {
              "$ref": "..."
            }
          }
        }
      }
    }
  },
  "tenant": {
    "createdAt": "2026-03-16 19:36:47",
    "updatedAt": "2026-03-16 19:36:47",
    "id": "",
    "businessTradingName": "",
    "legalBusinessName": "",
    "name": "",
    "businessType": "",
    "businessRegistrationNumber": "",
    "businessCountry": "",
    "businessCity": "",
    "businessAddress": "",
    "paystackSubaccountCode": "",
    "accountName": "",
    "accountNumber": "",
    "bankName": "",
    "businessStorefrontUrl": "",
    "businessDescription": "",
    "industry": "",
    "businessTaxIdNumber": "",
    "businessExpectedMonthlyIncome": "",
    "staffSize": 0,
    "businessPrimaryPhoneNumber": "",
    "businessSecondaryPhoneNumber": "",
    "businessSupportEmailAddress": "",
    "businessGeneralEmailAddress": "",
    "kybCompleted": true,
    "profileDetailFilled": true,
    "contactDetailFilled": true,
    "kycCompleted": true,
    "documentsVerified": true,
    "bankAccountVerified": true,
    "termsAccepted": true,
    "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
    "complianceNotes": [
      ""
    ],
    "liveModeReady": true,
    "currency": "",
    "timezone": "",
    "language": "",
    "code": "",
    "currentMode": "",
    "liveKey": "",
    "testKey": "",
    "liveWhitelistedDomains": [
      ""
    ],
    "testWhitelistedDomains": [
      ""
    ],
    "status": true,
    "createdBy": "",
    "user": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "email": "",
      "tenantId": "",
      "password": "",
      "fullName": "",
      "dateOfBirth": "",
      "phoneNumber": "",
      "nationality": "",
      "idType": "",
      "idNumber": "",
      "idDocumentUrl": "",
      "profileUrl": "",
      "status": "",
      "address": "",
      "version": 0,
      "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
      "role": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "name": "",
        "status": true,
        "slug": "",
        "permissions": [
          {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "name": "",
            "status": true,
            "slug": ""
          }
        ]
      },
      "tenant": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "businessTradingName": "",
        "legalBusinessName": "",
        "name": "",
        "businessType": "",
        "businessRegistrationNumber": "",
        "businessCountry": "",
        "businessCity": "",
        "businessAddress": "",
        "paystackSubaccountCode": "",
        "accountName": "",
        "accountNumber": "",
        "bankName": "",
        "businessStorefrontUrl": "",
        "businessDescription": "",
        "industry": "",
        "businessTaxIdNumber": "",
        "businessExpectedMonthlyIncome": "",
        "staffSize": 0,
        "businessPrimaryPhoneNumber": "",
        "businessSecondaryPhoneNumber": "",
        "businessSupportEmailAddress": "",
        "businessGeneralEmailAddress": "",
        "kybCompleted": true,
        "profileDetailFilled": true,
        "contactDetailFilled": true,
        "kycCompleted": true,
        "documentsVerified": true,
        "bankAccountVerified": true,
        "termsAccepted": true,
        "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
        "complianceNotes": [
          ""
        ],
        "liveModeReady": true,
        "currency": "",
        "timezone": "",
        "language": "",
        "code": "",
        "currentMode": "",
        "liveKey": "",
        "testKey": "",
        "liveWhitelistedDomains": [
          ""
        ],
        "testWhitelistedDomains": [
          ""
        ],
        "status": true,
        "createdBy": "",
        "user": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "email": "",
          "tenantId": "",
          "password": "",
          "fullName": "",
          "dateOfBirth": "",
          "phoneNumber": "",
          "nationality": "",
          "idType": "",
          "idNumber": "",
          "idDocumentUrl": "",
          "profileUrl": "",
          "status": "",
          "address": "",
          "version": 0,
          "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
          "role": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "name": "",
            "status": true,
            "slug": "",
            "permissions": [
              {
                "$ref": "..."
              }
            ]
          },
          "tenant": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "businessTradingName": "",
            "legalBusinessName": "",
            "name": "",
            "businessType": "",
            "businessRegistrationNumber": "",
            "businessCountry": "",
            "businessCity": "",
            "businessAddress": "",
            "paystackSubaccountCode": "",
            "accountName": "",
            "accountNumber": "",
            "bankName": "",
            "businessStorefrontUrl": "",
            "businessDescription": "",
            "industry": "",
            "businessTaxIdNumber": "",
            "businessExpectedMonthlyIncome": "",
            "staffSize": 0,
            "businessPrimaryPhoneNumber": "",
            "businessSecondaryPhoneNumber": "",
            "businessSupportEmailAddress": "",
            "businessGeneralEmailAddress": "",
            "kybCompleted": true,
            "profileDetailFilled": true,
            "contactDetailFilled": true,
            "kycCompleted": true,
            "documentsVerified": true,
            "bankAccountVerified": true,
            "termsAccepted": true,
            "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
            "complianceNotes": [
              ""
            ],
            "liveModeReady": true,
            "currency": "",
            "timezone": "",
            "language": "",
            "code": "",
            "currentMode": "",
            "liveKey": "",
            "testKey": "",
            "liveWhitelistedDomains": [
              ""
            ],
            "testWhitelistedDomains": [
              ""
            ],
            "status": true,
            "createdBy": "",
            "user": {
              "$ref": "..."
            }
          }
        }
      }
    }
  }
}'
```

**Response-example:**
```json
Return void.
```

### updateUser
**URL:** https://api.shopsynch.com/v1/internal/test/update/user/collection.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|userId|string|false|No comments found.|-||
|email|string|false|No comments found.|-||
|password|string|false|No comments found.|-||
|roleId|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|tenantName|string|false|No comments found.|-||
|code|string|false|No comments found.|-||
|liveKey|string|false|No comments found.|-||
|testKey|string|false|No comments found.|-||
|createdBy|string|false|No comments found.|-||
|createdAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|updatedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|user|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─id|string|false|No comments found.|-||
|└─email|string|false|No comments found.|-||
|└─tenantId|string|false|No comments found.|-||
|└─password|string|false|No comments found.|-||
|└─fullName|string|false|No comments found.|-||
|└─dateOfBirth|string|false|No comments found.|-||
|└─phoneNumber|string|false|No comments found.|-||
|└─nationality|string|false|No comments found.|-||
|└─idType|string|false|e.g. "National ID", "Passport"|-||
|└─idNumber|string|false|ID number|-||
|└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|└─profileUrl|string|false|File storage URL|-||
|└─status|string|false|No comments found.|-||
|└─address|string|false|No comments found.|-||
|└─version|int32|false|No comments found.|-|0|
|└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTradingName|string|false|e.g. Business name|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─legalBusinessName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessType|string|false|e.g. "LLC", "Sole Proprietor"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessRegistrationNumber|string|false|Government-issued business ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCountry|string|false|Country of business incorporation|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessCity|string|false|Business city|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessAddress|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─paystackSubaccountCode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─accountNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessStorefrontUrl|string|false|Business Storefront URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessDescription|string|false|Business register address|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─industry|string|false|Business Industry<br/>e.g. fashion, electronics|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessTaxIdNumber|string|false|Optional - Business Tax ID|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessExpectedMonthlyIncome|string|false|Optional – for profiling|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─staffSize|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessPrimaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSecondaryPhoneNumber|string|false|Optional – for contacting business|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessSupportEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─businessGeneralEmailAddress|string|false|for contacting business and sending notifications|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kybCompleted|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contactDetailFilled|boolean|false|Know Your Business passed|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─kycCompleted|boolean|false|merchant_compliance_status<br/>Owner verification done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─documentsVerified|boolean|false|merchant_compliance_status<br/>All docs approved|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─bankAccountVerified|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─termsAccepted|boolean|false|merchant_compliance_status<br/>Bank payout setup done|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─movedToLiveModeAt|string|false|merchant_compliance_status<br/>time of switch|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─complianceNotes|array|false|merchant_compliance_status<br/>Admin/internal notes|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveModeReady|boolean|false|merchant_compliance_status<br/>true if all verification is complete|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currency|string|false|Default currency|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─timezone|string|false|Default timezone|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─language|string|false|Preferred Language|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─code|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─currentMode|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testKey|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─liveWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─testWhitelistedDomains|array|false|No comments found.|-|""","""|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdBy|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─user|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─email|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenantId|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─password|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─fullName|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─dateOfBirth|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─phoneNumber|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─nationality|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idType|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idNumber|string|false|ID number|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─idDocumentUrl|string|false|e.g. "National ID", "Passport"|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─profileUrl|string|false|File storage URL|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─address|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|int32|false|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─emailVerifiedAt|string|false|No comments found.|-|yyyy-MM-dd HH:mm:ss|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
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

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/internal/test/update/user/collection.do' --data '{
  "userId": "",
  "email": "",
  "password": "",
  "roleId": "",
  "tenantId": "",
  "tenantName": "",
  "code": "",
  "liveKey": "",
  "testKey": "",
  "createdBy": "",
  "createdAt": "yyyy-MM-dd HH:mm:ss",
  "updatedAt": "yyyy-MM-dd HH:mm:ss",
  "user": {
    "createdAt": "2026-03-16 19:36:47",
    "updatedAt": "2026-03-16 19:36:47",
    "id": "",
    "email": "",
    "tenantId": "",
    "password": "",
    "fullName": "",
    "dateOfBirth": "",
    "phoneNumber": "",
    "nationality": "",
    "idType": "",
    "idNumber": "",
    "idDocumentUrl": "",
    "profileUrl": "",
    "status": "",
    "address": "",
    "version": 0,
    "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
    "role": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "name": "",
      "status": true,
      "slug": "",
      "permissions": [
        {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "name": "",
          "status": true,
          "slug": ""
        }
      ]
    },
    "tenant": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "businessTradingName": "",
      "legalBusinessName": "",
      "name": "",
      "businessType": "",
      "businessRegistrationNumber": "",
      "businessCountry": "",
      "businessCity": "",
      "businessAddress": "",
      "paystackSubaccountCode": "",
      "accountName": "",
      "accountNumber": "",
      "bankName": "",
      "businessStorefrontUrl": "",
      "businessDescription": "",
      "industry": "",
      "businessTaxIdNumber": "",
      "businessExpectedMonthlyIncome": "",
      "staffSize": 0,
      "businessPrimaryPhoneNumber": "",
      "businessSecondaryPhoneNumber": "",
      "businessSupportEmailAddress": "",
      "businessGeneralEmailAddress": "",
      "kybCompleted": true,
      "profileDetailFilled": true,
      "contactDetailFilled": true,
      "kycCompleted": true,
      "documentsVerified": true,
      "bankAccountVerified": true,
      "termsAccepted": true,
      "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
      "complianceNotes": [
        ""
      ],
      "liveModeReady": true,
      "currency": "",
      "timezone": "",
      "language": "",
      "code": "",
      "currentMode": "",
      "liveKey": "",
      "testKey": "",
      "liveWhitelistedDomains": [
        ""
      ],
      "testWhitelistedDomains": [
        ""
      ],
      "status": true,
      "createdBy": "",
      "user": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "email": "",
        "tenantId": "",
        "password": "",
        "fullName": "",
        "dateOfBirth": "",
        "phoneNumber": "",
        "nationality": "",
        "idType": "",
        "idNumber": "",
        "idDocumentUrl": "",
        "profileUrl": "",
        "status": "",
        "address": "",
        "version": 0,
        "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
        "role": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "name": "",
          "status": true,
          "slug": "",
          "permissions": [
            {
              "createdAt": "2026-03-16 19:36:47",
              "updatedAt": "2026-03-16 19:36:47",
              "id": "",
              "name": "",
              "status": true,
              "slug": ""
            }
          ]
        },
        "tenant": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "businessTradingName": "",
          "legalBusinessName": "",
          "name": "",
          "businessType": "",
          "businessRegistrationNumber": "",
          "businessCountry": "",
          "businessCity": "",
          "businessAddress": "",
          "paystackSubaccountCode": "",
          "accountName": "",
          "accountNumber": "",
          "bankName": "",
          "businessStorefrontUrl": "",
          "businessDescription": "",
          "industry": "",
          "businessTaxIdNumber": "",
          "businessExpectedMonthlyIncome": "",
          "staffSize": 0,
          "businessPrimaryPhoneNumber": "",
          "businessSecondaryPhoneNumber": "",
          "businessSupportEmailAddress": "",
          "businessGeneralEmailAddress": "",
          "kybCompleted": true,
          "profileDetailFilled": true,
          "contactDetailFilled": true,
          "kycCompleted": true,
          "documentsVerified": true,
          "bankAccountVerified": true,
          "termsAccepted": true,
          "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
          "complianceNotes": [
            ""
          ],
          "liveModeReady": true,
          "currency": "",
          "timezone": "",
          "language": "",
          "code": "",
          "currentMode": "",
          "liveKey": "",
          "testKey": "",
          "liveWhitelistedDomains": [
            ""
          ],
          "testWhitelistedDomains": [
            ""
          ],
          "status": true,
          "createdBy": "",
          "user": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "email": "",
            "tenantId": "",
            "password": "",
            "fullName": "",
            "dateOfBirth": "",
            "phoneNumber": "",
            "nationality": "",
            "idType": "",
            "idNumber": "",
            "idDocumentUrl": "",
            "profileUrl": "",
            "status": "",
            "address": "",
            "version": 0,
            "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
            "role": {
              "$ref": "..."
            },
            "tenant": {
              "$ref": "..."
            }
          }
        }
      }
    }
  },
  "tenant": {
    "createdAt": "2026-03-16 19:36:47",
    "updatedAt": "2026-03-16 19:36:47",
    "id": "",
    "businessTradingName": "",
    "legalBusinessName": "",
    "name": "",
    "businessType": "",
    "businessRegistrationNumber": "",
    "businessCountry": "",
    "businessCity": "",
    "businessAddress": "",
    "paystackSubaccountCode": "",
    "accountName": "",
    "accountNumber": "",
    "bankName": "",
    "businessStorefrontUrl": "",
    "businessDescription": "",
    "industry": "",
    "businessTaxIdNumber": "",
    "businessExpectedMonthlyIncome": "",
    "staffSize": 0,
    "businessPrimaryPhoneNumber": "",
    "businessSecondaryPhoneNumber": "",
    "businessSupportEmailAddress": "",
    "businessGeneralEmailAddress": "",
    "kybCompleted": true,
    "profileDetailFilled": true,
    "contactDetailFilled": true,
    "kycCompleted": true,
    "documentsVerified": true,
    "bankAccountVerified": true,
    "termsAccepted": true,
    "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
    "complianceNotes": [
      ""
    ],
    "liveModeReady": true,
    "currency": "",
    "timezone": "",
    "language": "",
    "code": "",
    "currentMode": "",
    "liveKey": "",
    "testKey": "",
    "liveWhitelistedDomains": [
      ""
    ],
    "testWhitelistedDomains": [
      ""
    ],
    "status": true,
    "createdBy": "",
    "user": {
      "createdAt": "2026-03-16 19:36:47",
      "updatedAt": "2026-03-16 19:36:47",
      "id": "",
      "email": "",
      "tenantId": "",
      "password": "",
      "fullName": "",
      "dateOfBirth": "",
      "phoneNumber": "",
      "nationality": "",
      "idType": "",
      "idNumber": "",
      "idDocumentUrl": "",
      "profileUrl": "",
      "status": "",
      "address": "",
      "version": 0,
      "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
      "role": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "name": "",
        "status": true,
        "slug": "",
        "permissions": [
          {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "name": "",
            "status": true,
            "slug": ""
          }
        ]
      },
      "tenant": {
        "createdAt": "2026-03-16 19:36:47",
        "updatedAt": "2026-03-16 19:36:47",
        "id": "",
        "businessTradingName": "",
        "legalBusinessName": "",
        "name": "",
        "businessType": "",
        "businessRegistrationNumber": "",
        "businessCountry": "",
        "businessCity": "",
        "businessAddress": "",
        "paystackSubaccountCode": "",
        "accountName": "",
        "accountNumber": "",
        "bankName": "",
        "businessStorefrontUrl": "",
        "businessDescription": "",
        "industry": "",
        "businessTaxIdNumber": "",
        "businessExpectedMonthlyIncome": "",
        "staffSize": 0,
        "businessPrimaryPhoneNumber": "",
        "businessSecondaryPhoneNumber": "",
        "businessSupportEmailAddress": "",
        "businessGeneralEmailAddress": "",
        "kybCompleted": true,
        "profileDetailFilled": true,
        "contactDetailFilled": true,
        "kycCompleted": true,
        "documentsVerified": true,
        "bankAccountVerified": true,
        "termsAccepted": true,
        "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
        "complianceNotes": [
          ""
        ],
        "liveModeReady": true,
        "currency": "",
        "timezone": "",
        "language": "",
        "code": "",
        "currentMode": "",
        "liveKey": "",
        "testKey": "",
        "liveWhitelistedDomains": [
          ""
        ],
        "testWhitelistedDomains": [
          ""
        ],
        "status": true,
        "createdBy": "",
        "user": {
          "createdAt": "2026-03-16 19:36:47",
          "updatedAt": "2026-03-16 19:36:47",
          "id": "",
          "email": "",
          "tenantId": "",
          "password": "",
          "fullName": "",
          "dateOfBirth": "",
          "phoneNumber": "",
          "nationality": "",
          "idType": "",
          "idNumber": "",
          "idDocumentUrl": "",
          "profileUrl": "",
          "status": "",
          "address": "",
          "version": 0,
          "emailVerifiedAt": "yyyy-MM-dd HH:mm:ss",
          "role": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "name": "",
            "status": true,
            "slug": "",
            "permissions": [
              {
                "$ref": "..."
              }
            ]
          },
          "tenant": {
            "createdAt": "2026-03-16 19:36:47",
            "updatedAt": "2026-03-16 19:36:47",
            "id": "",
            "businessTradingName": "",
            "legalBusinessName": "",
            "name": "",
            "businessType": "",
            "businessRegistrationNumber": "",
            "businessCountry": "",
            "businessCity": "",
            "businessAddress": "",
            "paystackSubaccountCode": "",
            "accountName": "",
            "accountNumber": "",
            "bankName": "",
            "businessStorefrontUrl": "",
            "businessDescription": "",
            "industry": "",
            "businessTaxIdNumber": "",
            "businessExpectedMonthlyIncome": "",
            "staffSize": 0,
            "businessPrimaryPhoneNumber": "",
            "businessSecondaryPhoneNumber": "",
            "businessSupportEmailAddress": "",
            "businessGeneralEmailAddress": "",
            "kybCompleted": true,
            "profileDetailFilled": true,
            "contactDetailFilled": true,
            "kycCompleted": true,
            "documentsVerified": true,
            "bankAccountVerified": true,
            "termsAccepted": true,
            "movedToLiveModeAt": "yyyy-MM-dd HH:mm:ss",
            "complianceNotes": [
              ""
            ],
            "liveModeReady": true,
            "currency": "",
            "timezone": "",
            "language": "",
            "code": "",
            "currentMode": "",
            "liveKey": "",
            "testKey": "",
            "liveWhitelistedDomains": [
              ""
            ],
            "testWhitelistedDomains": [
              ""
            ],
            "status": true,
            "createdBy": "",
            "user": {
              "$ref": "..."
            }
          }
        }
      }
    }
  }
}'
```

**Response-example:**
```json
Return void.
```

### updatePaymentSecret
**URL:** https://api.shopsynch.com/v1/internal/test/update/payment-secret.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|paymentSecret|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:47"|
|└─id|string|false|No comments found.|-||
|└─tenantId|string|false|No comments found.|-||
|└─paymentGateway|enum|false|No comments found.<br/>[Enum: PAYSTACK, FLUTTERWAVE, STRIPE, OFFLINE, MONNIFY]|-|PAYSTACK|
|└─liveEncryptedSecret|string|false|No comments found.|-||
|└─testEncryptedSecret|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/internal/test/update/payment-secret.do' --data '{
  "paymentSecret": {
    "createdAt": "2026-03-16 19:36:47",
    "updatedAt": "2026-03-16 19:36:47",
    "id": "",
    "tenantId": "",
    "paymentGateway": "PAYSTACK",
    "liveEncryptedSecret": "",
    "testEncryptedSecret": ""
  }
}'
```

**Response-example:**
```json
Return void.
```

## Whatsapp Authentication
### Initiate OTP<br>A One Time Password is sent to user whatsapp number to verify their identity
**URL:** https://api.shopsynch.com/v1/auth/phone/initiate.do

**Type:** POST


**Content-Type:** application/json

**Description:** Initiate OTP
A One Time Password is sent to user whatsapp number to verify their identity


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|phoneNumber|string|true|No comments found.|-||
|businessName|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/phone/initiate.do' --data '{
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
**URL:** https://api.shopsynch.com/v1/auth/phone/verify.do

**Type:** POST


**Content-Type:** application/json

**Description:** Verify OTP


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|phoneNumber|string|true|No comments found.|-||
|code|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/phone/verify.do' --data '{
  "phoneNumber": "",
  "code": ""
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
### Resolve Account Number<br>In test mode use: &lt;br/&gt;<br>{<br>    &quot;accountNumber&quot;: &quot;8131974410&quot;,<br>    &quot;bankCode&quot;: &quot;001&quot;,<br>    &quot;gateway&quot;: &quot;PAYSTACK&quot;<br>}
**URL:** https://api.shopsynch.com/v1/payment-gateway/verify-account-number.do

**Type:** POST


**Content-Type:** application/json

**Description:** Resolve Account Number
In test mode use: <br/>
{
    "accountNumber": "8131974410",
    "bankCode": "001",
    "gateway": "PAYSTACK"
}


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accountNumber|string|true|No comments found.|-||
|bankCode|string|true|No comments found.|-||
|gateway|enum|true|No comments found.<br/>[Enum: PAYSTACK, FLUTTERWAVE, STRIPE, OFFLINE, MONNIFY]|-|PAYSTACK|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/payment-gateway/verify-account-number.do' --data '{
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
Promo ads enable store owners or admins to seamlessly add advertisements to their homepage or any other page on their website.
Whether it&apos;s in the hero section or any other part of the webpage,
this feature provides the flexibility to display promotions exactly where they’ll be most effective,
helping you grab attention and increase engagement.
### Create Promo Ad<br>This API creates a new promotional ad.
**URL:** https://api.shopsynch.com/v1/promo-ads.do

**Type:** POST


**Content-Type:** application/json

**Description:** Create Promo Ad
This API creates a new promotional ad.


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
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/promo-ads.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:40"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:40"|
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
    "createdAt": "2026-03-16 19:36:40",
    "updatedAt": "2026-03-16 19:36:40"
  },
  "message": "",
  "status": true
}
```

### Update Promo Ad<br>This API updates a specific promotional ad by its ID.
**URL:** https://api.shopsynch.com/v1/promo-ads/{id}.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** Update Promo Ad
This API updates a specific promotional ad by its ID.


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
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/promo-ads/{id}.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:40"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:40"|
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
    "createdAt": "2026-03-16 19:36:40",
    "updatedAt": "2026-03-16 19:36:40"
  },
  "message": "",
  "status": true
}
```

### Get Promo Ad by ID<br>This API retrieves a specific promotional ad by its ID.
**URL:** https://api.shopsynch.com/v1/promo-ads/{id}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Get Promo Ad by ID
This API retrieves a specific promotional ad by its ID.


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/promo-ads/{id}.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:40"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:40"|
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
    "createdAt": "2026-03-16 19:36:40",
    "updatedAt": "2026-03-16 19:36:40"
  },
  "message": "",
  "status": true
}
```

### Fetch Promo Ads.<br>This API retrieves a list of promotional ads filtered by status and paginated using a cursor.<br>The response includes promotional ads in either DRAFT or PUBLISHED status.
**URL:** https://api.shopsynch.com/v1/promo-ads.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Promo Ads.
This API retrieves a list of promotional ads filtered by status and paginated using a cursor.
The response includes promotional ads in either DRAFT or PUBLISHED status.


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|false|No comments found.|-||
|cursor|string|false|No comments found.|-||
|limit|int32|true|No comments found.|-|10|

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/promo-ads.do?status=&cursor=&limit=10'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:40"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:40"|
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
        "createdAt": "2026-03-16 19:36:40",
        "updatedAt": "2026-03-16 19:36:40"
      }
    ],
    "nextCursor": "yyyy-MM-dd HH:mm:ss"
  },
  "message": "",
  "status": true
}
```

### Fetch Published Promo Ads.<br>This API retrieves a list of published promotional ads.<br>The response includes promotional ads in PUBLISHED status.
**URL:** https://api.shopsynch.com/v1/promo-ads/published.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Published Promo Ads.
This API retrieves a list of published promotional ads.
The response includes promotional ads in PUBLISHED status.


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|limit|int32|true|No comments found.|-|3|

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/promo-ads/published.do?limit=3'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:40"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:40"|
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
      "createdAt": "2026-03-16 19:36:40",
      "updatedAt": "2026-03-16 19:36:40"
    }
  ],
  "message": "",
  "status": true
}
```

### Update Promo Ad Status.<br>This API updates the status of a specific promotional ad.<br>The response includes promotional ads in PUBLISHED status.
**URL:** https://api.shopsynch.com/v1/promo-ads/update/{id}/status/{status}.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** Update Promo Ad Status.
This API updates the status of a specific promotional ad.
The response includes promotional ads in PUBLISHED status.


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||
|status|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/promo-ads/update/{id}/status/{status}.do'
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

### Delete Promo Ad.<br>This API deletes a specific promotional ad.
**URL:** https://api.shopsynch.com/v1/promo-ads/{id}.do

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** Delete Promo Ad.
This API deletes a specific promotional ad.


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -i 'https://api.shopsynch.com/v1/promo-ads/{id}.do'
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
**URL:** https://api.shopsynch.com/v1/customer-orders.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Customer Orders.
This API retrieves a list of orders for the authenticated customer.
The response includes orders in PUBLISHED status.


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
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:43"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/customer-orders.do?page=0&limit=100&sortField=CREATED_AT&sortDir=DESC&orderNumber=&search=&status=true&paymentStatus=&dateFrom=&dateTo=&minAmount=0.0&maxAmount=0.0&customerId=&productId=&authCustomer=&createdAt="2026-03-16 19:36:44"&updatedAt="2026-03-16 19:36:44"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
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
**URL:** https://api.shopsynch.com/v1/customer-orders/{customerId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Customer Orders.
This API retrieves a list of orders for a specific customer.


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/customer-orders/{customerId}.do?page=0&limit=100&sortFieldParam=ORDER_DATE&sortDirectionParam=DESC&orderNumber=&search=&status=&paymentStatus=&dateFrom=&dateTo=&minAmount=0.0&maxAmount=0.0&customerId=&productId=&authCustomer='
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
**URL:** https://api.shopsynch.com/v1/customer-orders/{orderId}/items.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch Order Items.
This API retrieves a list of items in a specific order.


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|No comments found.|-||

**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/customer-orders/{orderId}/items.do?createdAt="2026-03-16 19:36:44"&updatedAt="2026-03-16 19:36:44"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:44"|
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
        "createdAt": "2026-03-16 19:36:44",
        "updatedAt": "2026-03-16 19:36:44"
      },
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    }
  ]
}
```

## Cart Management
This API provides endpoints for managing customer carts.
### List Items In Cart.<br>This API retrieves a list of items in the cart.
**URL:** https://api.shopsynch.com/v1/carts/items.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** List Items In Cart.
This API retrieves a list of items in the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/items.do?createdAt="2026-03-16 19:36:51"&updatedAt="2026-03-16 19:36:51"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
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

### Add Item To Cart.<br>This API adds an item to the cart.
**URL:** https://api.shopsynch.com/v1/carts/add.do

**Type:** POST


**Content-Type:** application/json

**Description:** Add Item To Cart.
This API adds an item to the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|variationId|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|variationPriceId|string|false|No comments found.|-||
|quantity|int32|true|No comments found.|-|0|
|sessionId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/add.do?createdAt="2026-03-16 19:36:51"&updatedAt="2026-03-16 19:36:51"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug=' --data '{
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

### Remove Item From Cart.<br>This API removes an item from the cart.
**URL:** https://api.shopsynch.com/v1/carts/remove/{carItemId}.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** Remove Item From Cart.
This API removes an item from the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|carItemId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/remove/{carItemId}.do'
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

### Increment Item Quantity.<br>This API increments the quantity of an item in the cart.
**URL:** https://api.shopsynch.com/v1/carts/item/increment/quantity/{cartId}.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** Increment Item Quantity.
This API increments the quantity of an item in the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|cartId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/item/increment/quantity/{cartId}.do'
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

### Decrement Item Quantity.<br>This API decrements the quantity of an item in the cart.
**URL:** https://api.shopsynch.com/v1/carts/item/decrement/quantity/{cartId}.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** Decrement Item Quantity.
This API decrements the quantity of an item in the cart.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|cartId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/item/decrement/quantity/{cartId}.do'
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

### Clear Cart.<br>This API clears the cart for the authenticated customer or via sessionId.
**URL:** https://api.shopsynch.com/v1/carts/clear.do

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** Clear Cart.
This API clears the cart for the authenticated customer or via sessionId.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/clear.do?createdAt="2026-03-16 19:36:52"&updatedAt="2026-03-16 19:36:52"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
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

### Checkout Cart.<br>This API checks out the cart for the authenticated customer.
**URL:** https://api.shopsynch.com/v1/carts/checkout.do

**Type:** POST


**Content-Type:** application/json

**Description:** Checkout Cart.
This API checks out the cart for the authenticated customer.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:52"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|firstName|string|true|No comments found.|-||
|lastName|string|true|No comments found.|-||
|email|string|true|No comments found.|-||
|phoneNumber|string|true|No comments found.|-||
|country|string|false|No comments found.|-||
|currency|string|false|No comments found.|-||
|state|string|true|No comments found.|-||
|city|string|true|No comments found.|-||
|area|string|false|No comments found.|-||
|landmark|string|false|No comments found.|-||
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
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/checkout.do?createdAt="2026-03-16 19:36:52"&updatedAt="2026-03-16 19:36:52"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug=' --data '{
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

### Guest Checkout Cart.<br>This API checks out the cart for a guest user.
**URL:** https://api.shopsynch.com/v1/carts/guest/checkout.do

**Type:** POST


**Content-Type:** application/json

**Description:** Guest Checkout Cart.
This API checks out the cart for a guest user.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|true|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|firstName|string|true|No comments found.|-||
|lastName|string|true|No comments found.|-||
|email|string|true|No comments found.|-||
|phoneNumber|string|true|No comments found.|-||
|country|string|false|No comments found.|-||
|currency|string|false|No comments found.|-||
|state|string|true|No comments found.|-||
|city|string|true|No comments found.|-||
|area|string|false|No comments found.|-||
|landmark|string|false|No comments found.|-||
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
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/carts/guest/checkout.do' --data '{
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
**URL:** https://api.shopsynch.com/v1/categories.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|search|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|parentId|string|false|No comments found.|-||
|featured|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/categories.do?search=&status=&parentId=&featured=true'
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
### Create Delivery Zone.<br>This API creates a new delivery zone.
**URL:** https://api.shopsynch.com/v1/delivery-zones.do

**Type:** POST


**Content-Type:** application/json

**Description:** Create Delivery Zone.
This API creates a new delivery zone.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|No comments found.|-||
|fee|double|true|No comments found.|-|0.0|
|states|array|false|No comments found.|-|""","""|
|lgas|array|false|No comments found.|-|""","""|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/delivery-zones.do' --data '{
  "name": "",
  "fee": 0.0,
  "states": [
    ""
  ],
  "lgas": [
    ""
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
|└─states|array|No comments found.|-|""","""|
|└─lgas|array|No comments found.|-|""","""|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "fee": 0.0,
    "states": [
      ""
    ],
    "lgas": [
      ""
    ]
  }
}
```

### Get All Delivery Zones.<br>This API returns all delivery zones.
**URL:** https://api.shopsynch.com/v1/delivery-zones.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Get All Delivery Zones.
This API returns all delivery zones.


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/delivery-zones.do'
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
|└─states|array|No comments found.|-|""","""|
|└─lgas|array|No comments found.|-|""","""|

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
      "states": [
        ""
      ],
      "lgas": [
        ""
      ]
    }
  ]
}
```

### Update Delivery Zone.<br>This API updates an existing delivery zone.
**URL:** https://api.shopsynch.com/v1/delivery-zones/{id}.do

**Type:** PUT


**Content-Type:** application/json

**Description:** Update Delivery Zone.
This API updates an existing delivery zone.


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|No comments found.|-||
|fee|double|true|No comments found.|-|0.0|
|states|array|false|No comments found.|-|""","""|
|lgas|array|false|No comments found.|-|""","""|

**Request-example:**
```bash
curl -X PUT -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/delivery-zones/{id}.do' --data '{
  "name": "",
  "fee": 0.0,
  "states": [
    ""
  ],
  "lgas": [
    ""
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
|└─states|array|No comments found.|-|""","""|
|└─lgas|array|No comments found.|-|""","""|

**Response-example:**
```json
{
  "status": true,
  "message": "",
  "data": {
    "id": "",
    "name": "",
    "fee": 0.0,
    "states": [
      ""
    ],
    "lgas": [
      ""
    ]
  }
}
```

### Delete Delivery Zone.<br>This API deletes an existing delivery zone.
**URL:** https://api.shopsynch.com/v1/delivery-zones/{id}.do

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** Delete Delivery Zone.
This API deletes an existing delivery zone.


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -i 'https://api.shopsynch.com/v1/delivery-zones/{id}.do'
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
### Apply Promo Code<br>Applies a promo code to calculate discounted price&quot;
**URL:** https://api.shopsynch.com/v1/promotions/apply/promo-code.do

**Type:** POST


**Content-Type:** application/json

**Description:** Apply Promo Code
Applies a promo code to calculate discounted price"


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promoCode|string|false|The promo code to be applied|-||
|amount|double|false|The original amount before discount|-|0.0|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/promotions/apply/promo-code.do' --data '{
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

### Create Promotion<br>Only accessible by merchant
**URL:** https://api.shopsynch.com/v1/promotions.do

**Type:** POST


**Content-Type:** application/json

**Description:** Create Promotion
Only accessible by merchant


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|The name of the promotion|-||
|code|string|true|The code for the promotion|-||
|description|string|false|A description of the promotion|-||
|startDate|string|true|The start date of the promotion|-|yyyy-MM-dd HH:mm:ss|
|endDate|string|true|The end date of the promotion|-|yyyy-MM-dd HH:mm:ss|
|discount|double|true|The discount percentage for the promotion|-|0.0|
|status|string|false|The status of the promotion (e.g., active, expired, upcoming)|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/promotions.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:40"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:40"|
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
    "createdAt": "2026-03-16 19:36:40",
    "updatedAt": "2026-03-16 19:36:40",
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

### Fetch All Promotions<br>Only accessible by merchant
**URL:** https://api.shopsynch.com/v1/promotions.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Fetch All Promotions
Only accessible by merchant


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/promotions.do?code=&name=&description=&status=&startDate=&endDate=&createdAt=&updatedAt='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:41"|
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
      "createdAt": "2026-03-16 19:36:41",
      "updatedAt": "2026-03-16 19:36:41",
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

### Show Promotion<br>Only accessible to merchant
**URL:** https://api.shopsynch.com/v1/promotions/{promotionId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Show Promotion
Only accessible to merchant


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promotionId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/promotions/{promotionId}.do'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:41"|
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
    "createdAt": "2026-03-16 19:36:41",
    "updatedAt": "2026-03-16 19:36:41",
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

### Update Promotion<br>Only accessible to merchant
**URL:** https://api.shopsynch.com/v1/promotions/{promotionId}.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** Update Promotion
Only accessible to merchant


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promotionId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|The name of the promotion|-||
|code|string|true|The code for the promotion|-||
|description|string|false|A description of the promotion|-||
|startDate|string|true|The start date of the promotion|-|yyyy-MM-dd HH:mm:ss|
|endDate|string|true|The end date of the promotion|-|yyyy-MM-dd HH:mm:ss|
|discount|double|true|The discount percentage for the promotion|-|0.0|
|status|string|false|The status of the promotion (e.g., active, expired, upcoming)|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/promotions/{promotionId}.do'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|object|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:41"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:41"|
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
    "createdAt": "2026-03-16 19:36:41",
    "updatedAt": "2026-03-16 19:36:41",
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

### Delete Promotion<br>Only accessible to merchant
**URL:** https://api.shopsynch.com/v1/promotions/{promotionId}.do

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** Delete Promotion
Only accessible to merchant


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|promotionId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -i 'https://api.shopsynch.com/v1/promotions/{promotionId}.do'
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
### Get Merchant Profile.<br>This API returns the merchant profile.
**URL:** https://api.shopsynch.com/v1/merchants/profile.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Get Merchant Profile.
This API returns the merchant profile.


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/merchants/profile.do'
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

### Get Merchant Business Profile.<br>This API returns the merchant business profile.
**URL:** https://api.shopsynch.com/v1/merchants/profile/business.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Get Merchant Business Profile.
This API returns the merchant business profile.


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/merchants/profile/business.do'
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
**URL:** https://api.shopsynch.com/v1/roles.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/roles.do'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:44"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:44"|
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─status|boolean|No comments found.|-|true|
|└─slug|string|No comments found.|-||
|└─permissions|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:44"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:44"|
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
      "createdAt": "2026-03-16 19:36:44",
      "updatedAt": "2026-03-16 19:36:44",
      "id": "",
      "name": "",
      "status": true,
      "slug": "",
      "permissions": [
        {
          "createdAt": "2026-03-16 19:36:44",
          "updatedAt": "2026-03-16 19:36:44",
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
**URL:** https://api.shopsynch.com/v1/product-stats.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/product-stats.do'
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
**URL:** https://api.shopsynch.com/v1/variation/options/{variationId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|variationId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/variation/options/{variationId}.do'
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
### Get All Reviews<br><br>Retrieves all product reviews in the merchant&apos;s store with optional filtering. Shop owners use this to monitor<br>customer feedback, identify problematic reviews, and manage reputation.
**URL:** https://api.shopsynch.com/v1/reviews.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Requires Authorization header (@RequireAuthorizationHeader)
         - Converts strongly-typed ReviewQueryRequest to Map for service layer compatibility
         - Returns all reviews across all products in merchant's store
         - Useful for review moderation dashboard and reputation management
         - ReviewMapper transforms entity objects to DTOs with customer names and product info


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/reviews.do?search=&status=&minRating=0&maxRating=0&productId=&customerId='
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:50"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:50"|
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
        "createdAt": "2026-03-16 19:36:50",
        "updatedAt": "2026-03-16 19:36:50"
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

### Get Product Reviews<br><br>Retrieves all reviews for a specific product. Reviews are filtered by status (active, hidden, or pending)<br>to display only appropriate reviews on product detail pages.
**URL:** https://api.shopsynch.com/v1/reviews/product/{productId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Public endpoint (no authentication required)
         - Default status is "active" to show customer-visible reviews
         - Can filter by status: active=published, hidden=removed from display, pending=moderation queue
         - Displays only reviews customer should see on product pages
         - Review count and average ratings typically calculated from active reviews
         - Useful for product detail pages showing customer feedback


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/reviews/product/{productId}.do?status=ACTIVE'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:50"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:50"|
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
        "createdAt": "2026-03-16 19:36:50",
        "updatedAt": "2026-03-16 19:36:50"
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

### Create/Submit Product Review<br><br>Submits a new product review from a customer. Reviews include rating, comment, and reviewer name.<br>System validates one review per customer per product and performs moderation checks.
**URL:** https://api.shopsynch.com/v1/reviews/add.do

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
         - Public endpoint (allows both authenticated customers and guests)
         - Validates one review per customer per product (prevents duplicate reviews)
         - Rating range is typically 1-5 stars
         - Reviews may require moderation before becoming active
         - Customer ID is extracted from authenticated user or provided in request
         - Submitted review status defaults to "pending" or "active" based on configuration
         - ReviewMapper includes customer name and rating in response
         - Useful for gathering customer feedback and building social proof


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|rating|int32|false|No comments found.|-|0|
|comment|string|true|No comments found.|-||
|productId|string|true|No comments found.|-||
|customerId|string|false|No comments found.|-||
|tenantId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/reviews/add.do' --data '{
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:51"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:51"|
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
      "createdAt": "2026-03-16 19:36:51",
      "updatedAt": "2026-03-16 19:36:51"
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

### Delete Review<br><br>Permanently deletes a product review. Removed review no longer appears on product pages or in<br>review listings. Deletion is irreversible (deleted review cannot be recovered).
**URL:** https://api.shopsynch.com/v1/reviews/{reviewId}.do

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Requires Authorization header (@RequireAuthorizationHeader)
         - Permanently removes review from system (no recovery possible)
         - Review is removed from all product displays
         - Useful for removing reviews with false claims, spam, or offensive content
         - Use hideReview instead if you want to temporarily remove review


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|reviewId|string|true|Unique identifier of the review to delete.|-||

**Request-example:**
```bash
curl -X DELETE -k -i 'https://api.shopsynch.com/v1/reviews/{reviewId}.do'
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

### Hide Review<br><br>Hides a review from public display temporarily. Hidden reviews no longer appear on product pages<br>but remain in system for audit purposes. Reviews can be unhidden if needed (soft deletion).
**URL:** https://api.shopsynch.com/v1/reviews/hide/{reviewId}.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Requires Authorization header (@RequireAuthorizationHeader)
         - Sets review.status to "hidden" or "inactive"
         - Review remains in system for audit trail and history
         - Hidden reviews can potentially be unhidden if merchant changes mind
         - Does not permanently delete the review (use deleteReview for permanent removal)
         - Useful for temporarily removing reviews while investigating authenticity or disputes


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|reviewId|string|true|Unique identifier of the review to hide.|-||

**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/reviews/hide/{reviewId}.do'
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
### addBankDetails
**URL:** https://api.shopsynch.com/v1/merchants/tenant/bank-details.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accountNumber|string|true|No comments found.|-||
|bankCode|string|true|No comments found.|-||
|gateway|enum|true|No comments found.<br/>[Enum: PAYSTACK, FLUTTERWAVE, STRIPE, OFFLINE, MONNIFY]|-|PAYSTACK|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/merchants/tenant/bank-details.do' --data '{
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
**URL:** https://api.shopsynch.com/v1/colors.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/colors.do'
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
**URL:** https://api.shopsynch.com/v1/variations.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|false|No comments found.|-||
|name|string|false|No comments found.|-||
|CategoryId|string|false|No comments found.|-||
|productCategory|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:44"|
|└─id|string|false|No comments found.|-||
|└─parentId|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|└─tenantId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/variations.do' --data '{
  "id": "",
  "name": "",
  "CategoryId": "",
  "productCategory": {
    "createdAt": "2026-03-16 19:36:44",
    "updatedAt": "2026-03-16 19:36:44",
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
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/welcome.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-|test@example.com|
|shopName|string|true|No comments found.|-|My Awesome Shop|
|verificationCode|string|true|No comments found.|-|123456|
|verificationUrl|string|true|No comments found.|-|http://localhost:3000/verify|

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/api/v1/test/email-preview/welcome.do?email=test@example.com&shopName=My Awesome Shop&verificationCode=123456&verificationUrl=http:/localhost:3000/verify'
```

**Response-example:**
```json
string
```

### previewMerchantNewOrder
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/merchant/new-order/{orderId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/api/v1/test/email-preview/merchant/new-order/{orderId}.do'
```

**Response-example:**
```json
string
```

### previewCustomerOrderConfirmation
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/customer/order-confirmation/{orderId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/api/v1/test/email-preview/customer/order-confirmation/{orderId}.do'
```

**Response-example:**
```json
string
```

### previewCustomerPaymentConfirmation
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/customer/payment-confirmation/{paymentId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|paymentId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/api/v1/test/email-preview/customer/payment-confirmation/{paymentId}.do'
```

**Response-example:**
```json
string
```

### previewForgotPassword
**URL:** https://api.shopsynch.com/api/v1/test/email-preview/forgot-password.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|true|No comments found.|-|John|
|pin|string|true|No comments found.|-|1234|

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/api/v1/test/email-preview/forgot-password.do?name=John&pin=1234'
```

**Response-example:**
```json
string
```

## CustomerController
### Get All Customers<br><br>Retrieves a paginated list of customers for a shop owner with advanced pagination support using cursor-based<br>navigation. Supports filtering by search term, registration date range, account status, and account type.
**URL:** https://api.shopsynch.com/v1/customers.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Converts strongly-typed CustomerQueryRequest to Map for service layer compatibility
         - Uses cursor-based pagination for better performance on large datasets
         - Limit is capped at 20 records per page for efficient database queries
         - Supports filtering by registration date range, status, account type
         - Returns cursor token in response for fetching next page
         - Useful for customer management dashboards and customer lists
         - CustomerMapper converts entity objects to display DTOs with minimal fields


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/customers.do?cursor=&limit=10&page=0&sortFieldParam=CREATED_AT&sortDirectionParam=DESC&search=&status=&registeredFrom=&registeredTo=&accountType=&country='
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:53"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:53"|
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
        "createdAt": "2026-03-16 19:36:53",
        "updatedAt": "2026-03-16 19:36:53"
      }
    ],
    "nextCursor": "yyyy-MM-dd HH:mm:ss"
  },
  "message": "",
  "status": true
}
```

### Get Authenticated Customer Profile<br><br>Retrieves the complete profile information of the authenticated customer, including personal details,<br>account status, preferences, and account type.
**URL:** https://api.shopsynch.com/v1/customers/profile.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Requires customer authentication (implicit from SecurityContextHolder)
         - No path parameters required - uses authenticated user from JWT token
         - Returns customer's own profile data only (privacy-protected)
         - CustomerMapper transforms entity to DTO with all profile fields
         - Useful for profile display pages in customer dashboard


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/customers/profile.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:53"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:53"|

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
    "createdAt": "2026-03-16 19:36:53",
    "updatedAt": "2026-03-16 19:36:53"
  }
}
```

### Get Specific Customer (Shop Owner View)<br><br>Retrieves detailed information for a specific customer by ID. Only shop owners can access other customers&apos; data.<br>Returns all customer details for merchant relationship and account management purposes.
**URL:** https://api.shopsynch.com/v1/customers/{customerId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Allows merchants to view customer details for order fulfillment and customer service
         - Returns full customer profile including registration date, contact, account status
         - CustomerMapper includes all customer information in response


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|customerId|string|true|Unique identifier of the customer to retrieve.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/customers/{customerId}.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:54"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:54"|
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
    "createdAt": "2026-03-16 19:36:53",
    "updatedAt": "2026-03-16 19:36:53"
  },
  "message": "",
  "status": true
}
```

### Deactivate Customer Account<br><br>Deactivates a customer account, preventing further login and transactions. The account remains in the system<br>for historical and audit purposes but becomes inactive. Account can be reactivated if needed.
**URL:** https://api.shopsynch.com/v1/customers/{customerId}/deactivate.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Sets customer.status to INACTIVE or similar inactive state
         - Does not delete customer data (soft deactivation)
         - Prevents deactivated customer from placing new orders
         - Customer can be reactivated later if needed
         - Useful for fraud prevention or customer-requested deactivations


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|customerId|string|true|Unique identifier of the customer account to deactivate.|-||

**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/customers/{customerId}/deactivate.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:54"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:54"|
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
    "createdAt": "2026-03-16 19:36:54",
    "updatedAt": "2026-03-16 19:36:54"
  },
  "message": "",
  "status": true
}
```

### Activate Customer Account<br><br>Reactivates a previously deactivated customer account. Once reactivated, customer can log in and place orders again.<br>Account retains all historical data and order history.
**URL:** https://api.shopsynch.com/v1/customers/{customerId}/activate.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Sets customer.status back to ACTIVE or enabled state
         - Restores customer ability to place orders and log in
         - Preserves all historical order and profile data
         - Typically used to reverse a deactivation action


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|customerId|string|true|Unique identifier of the customer account to activate.|-||

**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/customers/{customerId}/activate.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:54"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:54"|
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
    "createdAt": "2026-03-16 19:36:54",
    "updatedAt": "2026-03-16 19:36:54"
  },
  "message": "",
  "status": true
}
```

### Register New Customer<br><br>Registers a new customer account in the current store/tenant. Validates email uniqueness, creates customer record,<br>and returns customer profile with confirmation of successful registration.
**URL:** https://api.shopsynch.com/v1/customers/signup.do

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
         - Public endpoint (no authentication required)
         - Email must be unique per tenant (same email can exist in different stores)
         - Creates customer in current tenant context
         - Password is hashed during creation
         - Default account type is PERSONAL or determined by request
         - Customer can immediately log in after registration
         - Returns created customer details in response


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||
|password|string|true|No comments found.|-||
|fullName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|address|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/customers/signup.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:54"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:54"|

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
    "createdAt": "2026-03-16 19:36:54",
    "updatedAt": "2026-03-16 19:36:54"
  }
}
```

### Update Customer Profile<br><br>Updates the authenticated customer&apos;s profile information. Customer can modify personal details,<br>contact information, preferences, and other account settings.
**URL:** https://api.shopsynch.com/v1/customers/profile/update.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** This endpoint:
         - Requires customer authentication (@CustomerAccess)
         - Uses authenticated user from SecurityContext
         - Supports partial updates (null fields are ignored)
         - Updates modifiedAt timestamp automatically
         - Returns complete updated profile in response
         - Useful for account settings pages where customer manages their information


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|fullName|string|true|No comments found.|-||
|phoneNumber|string|true|No comments found.|-||
|address|string|true|No comments found.|-||
|dateOfBirth|string|false|No comments found.|-||
|nationality|string|false|No comments found.|-||
|idType|string|false|No comments found.|-||
|idNumber|string|false|No comments found.|-||
|idDocumentUrl|string|false|No comments found.|-||
|profileUrl|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/customers/profile/update.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:54"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:54"|

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
    "createdAt": "2026-03-16 19:36:54",
    "updatedAt": "2026-03-16 19:36:54"
  }
}
```

## EmailVerificationController
### verifyEmail
**URL:** https://api.shopsynch.com/v1/auth/email/merchant/verify.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|token|string|true|No comments found.|-||
|email|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/email/merchant/verify.do' --data '{
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

### initiateEmailVerification
**URL:** https://api.shopsynch.com/v1/auth/email/merchant/initiate/verification.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/email/merchant/initiate/verification.do' --data '{
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
### Register Customer.<br>This API registers a new customer.
**URL:** https://api.shopsynch.com/v1/auth/customer/signup.do

**Type:** POST


**Content-Type:** application/json

**Description:** Register Customer.
This API registers a new customer.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||
|password|string|true|No comments found.|-||
|fullName|string|false|No comments found.|-||
|phoneNumber|string|false|No comments found.|-||
|address|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/customer/signup.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:45"|

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
    "createdAt": "2026-03-16 19:36:45",
    "updatedAt": "2026-03-16 19:36:45"
  }
}
```

### Register Customer Via Google.<br>This API registers a new customer via google.
**URL:** https://api.shopsynch.com/v1/auth/customer/signup/google.do

**Type:** POST


**Content-Type:** application/json

**Description:** Register Customer Via Google.
This API registers a new customer via google.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accessToken|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/customer/signup/google.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:45"|
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
    "createdAt": "2026-03-16 19:36:45",
    "updatedAt": "2026-03-16 19:36:45"
  },
  "token": "",
  "expiresIn": 0
}
```

### Login Customer Via Google.<br>This API logs in a customer via google.
**URL:** https://api.shopsynch.com/v1/auth/customer/login/google.do

**Type:** POST


**Content-Type:** application/json

**Description:** Login Customer Via Google.
This API logs in a customer via google.

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|No comments found.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accessToken|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/auth/customer/login/google.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:45"|
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
    "createdAt": "2026-03-16 19:36:45",
    "updatedAt": "2026-03-16 19:36:45"
  },
  "token": "",
  "expiresIn": 0
}
```

## UserController
### getUserProfile
**URL:** https://api.shopsynch.com/v1/users/profile.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/users/profile.do'
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
**URL:** https://api.shopsynch.com/v1/users/profile/with/role.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/users/profile/with/role.do'
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
**URL:** https://api.shopsynch.com/v1/users/profile/update.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|fullName|string|true|No comments found.|-||
|phoneNumber|string|true|No comments found.|-||
|address|string|true|No comments found.|-||
|dateOfBirth|string|false|No comments found.|-||
|nationality|string|false|No comments found.|-||
|idType|string|false|No comments found.|-||
|idNumber|string|false|No comments found.|-||
|idDocumentUrl|string|false|No comments found.|-||
|profileUrl|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/users/profile/update.do'
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
**URL:** https://api.shopsynch.com/v1/orders.do

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
curl -X GET -k -i 'https://api.shopsynch.com/v1/orders.do?page=0&limit=100&sortField=ORDER_DATE&sortDir=DESC&orderNumber=&search=&status=&paymentStatus=&dateFrom=&dateTo=&minAmount=0.0&maxAmount=0.0&customerId=&productId=&authCustomer='
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
**URL:** https://api.shopsynch.com/v1/orders/{orderNumber}/show.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Accessible without shop owner restriction (visible to customers and admins)
         - Retrieves order for current tenant context
         - Returns complete order information including contact details
         - Useful for order tracking pages where customer provides order number
         - OrderMapper includes all relevant order details in response


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderNumber|string|true|The unique order number (e.g., "ORD-20260308-001") assigned at order creation.<br/>                  Visible in customer receipts and emails.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/orders/{orderNumber}/show.do'
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
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/detail.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Retrieves complete order including all line items
         - OrderLineMapper includes product details, quantities, unit prices, and discounts
         - Essential for order fulfillment workflow
         - Returns detailed information not included in list view


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order. Must belong to the authenticated merchant's tenant.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/orders/{orderId}/detail.do'
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
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/items.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Returns only items/line items, not order summary
         - OrderLineMapper includes detailed product information and variant selections
         - Useful for constructing packing slips or generating invoices
         - Separating items retrieval allows efficient data loading patterns


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order. Must belong to the authenticated merchant's tenant.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/orders/{orderId}/items.do'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:42"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:42"|
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
        "createdAt": "2026-03-16 19:36:42",
        "updatedAt": "2026-03-16 19:36:42"
      },
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    }
  ]
}
```

### Update Order Status<br><br>Updates the current status of an order to reflect fulfillment progress. Valid status transitions are enforced<br>to prevent invalid workflow progressions. Records an audit trail entry capturing who changed the status and why.
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/status.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Validates new status is valid PaymentStatusEnum value
         - Enforces status transition rules (prevents invalid progressions like SHIPPED -> PENDING)
         - Records status change with reason in OrderStatusHistory table
         - Captures actor (merchant) ID and timestamp of status change
         - Updates Order.status field with validation
         - Essential for order fulfillment workflow tracking
         - Enables customer notifications based on status changes


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order to update. Must belong to authenticated merchant's tenant.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|true|No comments found.|-||
|reason|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/orders/{orderId}/status.do'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:42"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:42"|
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
        "createdAt": "2026-03-16 19:36:42",
        "updatedAt": "2026-03-16 19:36:42"
      },
      "createdAt": "yyyy-MM-dd HH:mm:ss"
    }
  ]
}
```

### Force Update Order Status (Admin Override)<br><br>Bypasses all standard transition rules and forcibly sets the order to the given status.<br>Use with caution — this is intended for administrative corrections only (e.g., stuck orders,<br>data recovery, third-party sync discrepancies).
**URL:** https://api.shopsynch.com/v1/orders/{orderId}/force-status.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Does NOT enforce standard transition rules (PENDING → PROCESSING etc.)
         - Requires a non-blank reason — mandatory for audit trail integrity
         - Prefixes audit reason with [MANUAL_OVERRIDE] for easy filtering in history
         - Syncs fulfillment status when forcing SHIPPED or DELIVERED
         - Logs a WARN-level entry with old/new status for server-side traceability


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|                   Unique identifier of the order to update.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|status|string|true|No comments found.|-||
|reason|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/orders/{orderId}/force-status.do'
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

### Get Order Statistics<br><br>Retrieves comprehensive order statistics for a merchant including order count, total revenue, average order value,<br>orders by status breakdown, and other aggregated metrics useful for business insights and dashboards.
**URL:** https://api.shopsynch.com/v1/orders/merchant/stats.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Skips tenant context check as it handles context internally
         - Aggregates data using database queries for performance
         - Includes metrics like total orders, revenue, average order value
         - Includes breakdown by status (pending, processing, shipped, delivered, etc.)
         - Useful for dashboard displays and business intelligence
         - Uses aggregation pipelines for efficient counting and summing


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/orders/merchant/stats.do'
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

## WhatsAppWebhookController
### Send a template message to initiate or re-establish a connection.
**URL:** https://api.shopsynch.com/v1/webhooks/whatsapp/send-template.do

**Type:** POST


**Content-Type:** application/json

**Description:** Send a template message to initiate or re-establish a connection.


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|to|string|false|No comments found.|-||
|templateName|string|false|No comments found.|-||
|languageCode|string|false|No comments found.|-||
|parameters|array|false|No comments found.|-|""","""|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/webhooks/whatsapp/send-template.do' --data '{
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
**URL:** https://api.shopsynch.com/v1/webhooks/whatsapp.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|hub.mode|string|false|No comments found.|-||
|hub.verify_token|string|false|No comments found.|-||
|hub.challenge|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/webhooks/whatsapp.do?hub.mode=&hub.verify_token=&hub.challenge='
```

**Response-example:**
```json
string
```

### receiveMessage
**URL:** https://api.shopsynch.com/v1/webhooks/whatsapp.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|array|boolean|false|No comments found.|-|true|
|valueNode|boolean|false|No comments found.|-|true|
|containerNode|boolean|false|No comments found.|-|true|
|missingNode|boolean|false|No comments found.|-|true|
|object|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/webhooks/whatsapp.do' --data '{
  "array": true,
  "valueNode": true,
  "containerNode": true,
  "missingNode": true,
  "object": true
}'
```

**Response-example:**
```json
string
```

## SocialAuthController
### registerMerchant
**URL:** https://api.shopsynch.com/v1/auth/social/google/signup/merchant.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|accessToken|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/auth/social/google/signup/merchant.do' --data '{
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:46"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:46"|
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
    "createdAt": "2026-03-16 19:36:46",
    "updatedAt": "2026-03-16 19:36:46"
  },
  "token": "",
  "expiresIn": 0
}
```

## ProductVariationController
### updateProductVariation
**URL:** https://api.shopsynch.com/v1/products/variation/{variationId}.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


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
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/products/variation/{variationId}.do'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
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

### addProductVariation
**URL:** https://api.shopsynch.com/v1/products/variation/add.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|colorId|string|false|No comments found.|-||
|customColor|string|false|No comments found.|-||
|image|string|false|No comments found.|-||
|priceDetails|array|false|No comments found.|-||
|└─id|string|false|No comments found.|-||
|└─price|double|true|No comments found.|-|0.0|
|└─newPrice|double|false|No comments found.|-|0.0|
|└─ramSize|string|false|No comments found.|-||
|└─Storage|string|false|No comments found.|-||
|└─size|string|false|No comments found.|-||
|└─sku|string|false|No comments found.|-||
|└─quantityInStock|int32|true|No comments found.|-|0|
|└─discount|double|false|No comments found.|-|0.0|
|└─variationAttributes|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|false|A map key.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/products/variation/add.do' --data '{
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
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
**URL:** https://api.shopsynch.com/v1/states/{countryId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|countryId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/states/{countryId}.do'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:50"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:50"|
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
      "createdAt": "2026-03-16 19:36:50",
      "updatedAt": "2026-03-16 19:36:50",
      "id": "",
      "name": "",
      "status": true
    }
  ]
}
```

## ComplianceController
### getBusinessProfile
**URL:** https://api.shopsynch.com/v1/compliance/business/profile.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/compliance/business/profile.do'
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

### getBusinessComplianceStatus
**URL:** https://api.shopsynch.com/v1/compliance/business/status.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/compliance/business/status.do'
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

### updateBusinessProfile
**URL:** https://api.shopsynch.com/v1/compliance/business/profile.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|businessTradingName|string|true|No comments found.|-||
|legalBusinessName|string|false|No comments found.|-||
|businessType|string|true|No comments found.|-||
|staffSize|int32|false|No comments found.|-|0|
|businessRegistrationNumber|string|false|No comments found.|-||
|businessStorefrontUrl|string|false|No comments found.|-||
|businessDescription|string|true|No comments found.|-||
|industry|string|true|No comments found.|-||
|businessTaxIdNumber|string|false|No comments found.|-||
|businessExpectedMonthlyIncome|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/compliance/business/profile.do'
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

### getBusinessContact
**URL:** https://api.shopsynch.com/v1/compliance/business/contact/detail.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/compliance/business/contact/detail.do'
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

### updateBusinessContact
**URL:** https://api.shopsynch.com/v1/compliance/business/contact/detail.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|businessCountry|string|true|No comments found.|-||
|businessCity|string|true|No comments found.|-||
|businessAddress|string|true|No comments found.|-||
|businessPrimaryPhoneNumber|string|true|No comments found.|-||
|businessSecondaryPhoneNumber|string|false|No comments found.|-||
|businessSupportEmailAddress|string|true|No comments found.|-||
|businessGeneralEmailAddress|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/compliance/business/contact/detail.do'
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
**URL:** https://api.shopsynch.com/v1/countries.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/countries.do?name='
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:53"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:53"|
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─status|boolean|No comments found.|-|true|
|└─states|array|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:53"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:53"|
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
      "createdAt": "2026-03-16 19:36:53",
      "updatedAt": "2026-03-16 19:36:53",
      "id": "",
      "name": "",
      "status": true,
      "states": [
        {
          "createdAt": "2026-03-16 19:36:53",
          "updatedAt": "2026-03-16 19:36:53",
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
**URL:** https://api.shopsynch.com/v1/specifications.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/specifications.do'
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

## ConfigController
### updateCurrentMode
**URL:** https://api.shopsynch.com/v1/config/currentMode/{mode}.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|mode|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/config/currentMode/{mode}.do'
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

### updateDomain
**URL:** https://api.shopsynch.com/v1/config/domain.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|domains|array|false|No comments found.|-|""","""|
|mode|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/config/domain.do'
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

### getDomains
**URL:** https://api.shopsynch.com/v1/config/domain.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/config/domain.do'
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

### getKeys
**URL:** https://api.shopsynch.com/v1/config/keys.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/config/keys.do'
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

### generateKeys
**URL:** https://api.shopsynch.com/v1/config/regenerate/keys/{mode}.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|mode|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/config/regenerate/keys/{mode}.do'
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

### syncProfile
**URL:** https://api.shopsynch.com/v1/config/sync/profile.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/config/sync/profile.do'
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

## HomeController
### getHealth
**URL:** https://api.shopsynch.com/v1/health.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/health.do'
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
**URL:** https://api.shopsynch.com/v1/healths.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/healths.do'
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
**URL:** https://api.shopsynch.com/v1/products/variation/priceDetail/{variationPriceDetailId}.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|variationPriceDetailId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|variationId|string|true|No comments found.|-||
|price|double|false|No comments found.|-|0.0|
|newPrice|double|false|No comments found.|-|0.0|
|ramSize|string|false|No comments found.|-||
|Storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.|-||
|quantityInStock|int32|false|No comments found.|-|0|
|discount|double|false|No comments found.|-|0.0|

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/products/variation/priceDetail/{variationPriceDetailId}.do'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
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
**URL:** https://api.shopsynch.com/v1/products/variation/priceDetail.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|No comments found.|-||
|variationId|string|true|No comments found.|-||
|price|double|false|No comments found.|-|0.0|
|newPrice|double|false|No comments found.|-|0.0|
|ramSize|string|false|No comments found.|-||
|Storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.|-||
|quantityInStock|int32|false|No comments found.|-|0|
|discount|double|false|No comments found.|-|0.0|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/products/variation/priceDetail.do' --data '{
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
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

## FileController
### uploadSingleImage
**URL:** https://api.shopsynch.com/v1/files/upload/single/image.do

**Type:** POST


**Content-Type:** multipart/form-data

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|file|file|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: multipart/form-data" -F 'file=' -i 'https://api.shopsynch.com/v1/files/upload/single/image.do'
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

### uploadMultipleImages
**URL:** https://api.shopsynch.com/v1/files/upload/multiple/images.do

**Type:** POST


**Content-Type:** multipart/form-data

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|files|file|true|No comments found.(array of file)|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: multipart/form-data" -F 'files=' -i 'https://api.shopsynch.com/v1/files/upload/multiple/images.do'
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

## PaymentMethodController
### getAllPaymentMethods
**URL:** https://api.shopsynch.com/v1/payment-methods.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/payment-methods.do'
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

## TenantCategoryController
### getAllCategories
**URL:** https://api.shopsynch.com/v1/tenant-categories.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|search|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|parentId|string|false|No comments found.|-||
|featured|boolean|false|No comments found.|-|true|

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/tenant-categories.do?search=&status=&parentId=&featured=true'
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

### createCategory
**URL:** https://api.shopsynch.com/v1/tenant-categories.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|false|No comments found.|-||
|categoryId|string|false|No comments found.|-||
|parentId|string|false|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/tenant-categories.do' --data '{
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

### deleteCategory
**URL:** https://api.shopsynch.com/v1/tenant-categories/{categoryId}.do

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|categoryId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X DELETE -k -i 'https://api.shopsynch.com/v1/tenant-categories/{categoryId}.do'
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

## PaymentSecretController
### allSecrets
**URL:** https://api.shopsynch.com/v1/payment-secrets.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/payment-secrets.do'
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

### saveSecret
**URL:** https://api.shopsynch.com/v1/payment-secrets.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|testSecret|string|false|No comments found.|-||
|liveSecret|string|false|No comments found.|-||
|gateway|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/payment-secrets.do' --data '{
  "testSecret": "",
  "liveSecret": "",
  "gateway": ""
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

### saveSecret
**URL:** https://api.shopsynch.com/v1/payment-secrets/{paymentSecretId}.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|paymentSecretId|string|true|No comments found.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|testSecret|string|false|No comments found.|-||
|liveSecret|string|false|No comments found.|-||
|gateway|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/payment-secrets/{paymentSecretId}.do'
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
**URL:** https://api.shopsynch.com/v1/local-governments/{stateId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|stateId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/local-governments/{stateId}.do'
```
**Response-fields:**

| Field | Type | Description | Since | Example |
|-------|------|-------------|-------|---------|
|status|boolean|No comments found.|-|true|
|message|string|No comments found.|-||
|data|array|No comments found.|-||
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:46"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:46"|
|└─id|string|No comments found.|-||
|└─name|string|No comments found.|-||
|└─status|boolean|No comments found.|-|true|
|└─state|object|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|No comments found.|-|"2026-03-16 19:36:46"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:46"|
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
      "createdAt": "2026-03-16 19:36:46",
      "updatedAt": "2026-03-16 19:36:46",
      "id": "",
      "name": "",
      "status": true,
      "state": {
        "createdAt": "2026-03-16 19:36:46",
        "updatedAt": "2026-03-16 19:36:46",
        "id": "",
        "name": "",
        "status": true
      }
    }
  ]
}
```

## AppTokenController
### verifyMerchantResetPasswordToken
**URL:** https://api.shopsynch.com/v1/verify/merchant/reset-password-token.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||
|token|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/verify/merchant/reset-password-token.do' --data '{
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

## ChangePasswordController
### changeCustomerPassword
**URL:** https://api.shopsynch.com/v1/change/password/customer.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|googleAccount|boolean|false|No comments found.|-|true|
|password|string|false|No comments found.|-||
|status|string|false|No comments found.|-||
|address|string|false|No comments found.|-||
|version|int32|false|No comments found.|-|0|
|addresses|array|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|roleResource|object|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─slug|string|false|No comments found.|-||
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/change/password/customer.do?createdAt="2026-03-16 19:36:45"&updatedAt="2026-03-16 19:36:45"&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true&id=&tenantId=&fullName=&firstName=&lastName=&phoneNumber=&email=&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&googleAccount=true&password=&status=true&address=&version=0&fullAddress=&street=&streetNumber=&postalCode=&city=&customerId=&isDefault=true&state=&localGovernment=&country=&businessTradingName=&legalBusinessName=&name=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy=&dateOfBirth=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&slug='
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

### changeMerchantPassword
**URL:** https://api.shopsynch.com/v1/change/password/merchant.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


**Query-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|role|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|└─id|string|false|No comments found.|-||
|└─name|string|false|No comments found.|-||
|└─status|boolean|false|No comments found.|-|true|
|└─slug|string|false|No comments found.|-||
|└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|tenant|object|false|No comments found.|-||
|└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─role|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─permissions|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─status|boolean|false|No comments found.|-|true|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─slug|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─tenant|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─createdAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─updatedAt|string|false|No comments found.|-|"2026-03-16 19:36:45"|
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
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/change/password/merchant.do?createdAt="2026-03-16 19:36:45"&updatedAt="2026-03-16 19:36:45"&id=&email=&tenantId=&password=&fullName=&dateOfBirth=&phoneNumber=&nationality=&idType=&idNumber=&idDocumentUrl=&profileUrl=&status=&address=&version=0&emailVerifiedAt=yyyy-MM-dd HH:mm:ss&name=&slug=&businessTradingName=&legalBusinessName=&businessType=&businessRegistrationNumber=&businessCountry=&businessCity=&businessAddress=&paystackSubaccountCode=&accountName=&accountNumber=&bankName=&businessStorefrontUrl=&businessDescription=&industry=&businessTaxIdNumber=&businessExpectedMonthlyIncome=&staffSize=0&businessPrimaryPhoneNumber=&businessSecondaryPhoneNumber=&businessSupportEmailAddress=&businessGeneralEmailAddress=&kybCompleted=true&profileDetailFilled=true&contactDetailFilled=true&kycCompleted=true&documentsVerified=true&bankAccountVerified=true&termsAccepted=true&movedToLiveModeAt=yyyy-MM-dd HH:mm:ss&complianceNotes=""","""&liveModeReady=true&currency=&timezone=&language=&code=&currentMode=&liveKey=&testKey=&liveWhitelistedDomains=""","""&testWhitelistedDomains=""","""&createdBy='
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
**URL:** https://api.shopsynch.com/v1/brands.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/brands.do'
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

## ForgotPasswordController
### Forgot Password - Generates Reset Token and Sends Email
**URL:** https://api.shopsynch.com/v1/password/forgot/request/customer.do

**Type:** POST


**Content-Type:** application/json

**Description:** Forgot Password - Generates Reset Token and Sends Email


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||
|clientUrl|string|true|No comments found.|-||
|expiresIn|int32|false|No comments found.|-|0|

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/password/forgot/request/customer.do' --data '{
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

### Forgot Password - Generates Reset Token and Sends Email
**URL:** https://api.shopsynch.com/v1/password/forgot/request/merchant.do

**Type:** POST


**Content-Type:** application/json

**Description:** Forgot Password - Generates Reset Token and Sends Email


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|email|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/password/forgot/request/merchant.do' --data '{
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

### resetCustomerPassword
**URL:** https://api.shopsynch.com/v1/password/reset/customer.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|token|string|true|No comments found.|-||
|newPassword|string|true|No comments found.|-||
|confirmPassword|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/password/reset/customer.do' --data '{
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

### resetMerchantPassword
**URL:** https://api.shopsynch.com/v1/password/reset/merchant.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|token|string|true|No comments found.|-||
|newPassword|string|true|No comments found.|-||
|confirmPassword|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/password/reset/merchant.do' --data '{
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

## ProductController
### Get All Products<br><br>Retrieves a paginated list of products with optional filtering and sorting. Supports filtering by search term,<br>category, brand, color, price range, stock status, and customer rating. Results are returned in pages for efficient<br>data loading and display.
**URL:** https://api.shopsynch.com/v1/products.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Public endpoint (no authentication required, but respects tenant context)
         - Converts strongly-typed ProductQueryRequest to Map for service layer compatibility
         - Supports dynamic filtering: search, category, brand, color, price range, availability, rating
         - Default sorting by CREATED_AT in descending order (newest products first)
         - Enforces default page=0 if page number is negative or 0
         - ProductMapper converts entity objects to DTOs optimized for API response
         - Useful for product catalog pages with search and filter functionality
         - Returns product count and pages info for client-side pagination controls


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/products.do?page=0&limit=100&sortFieldParam=CREATED_AT&sortDirectionParam=DESC&search=&category=&brand=&color=&minPrice=0.0&maxPrice=0.0&availability=true&status=&minRating=0.0'
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

### Create Product<br><br>Creates a new product in the merchant&apos;s store (tenant). Validates product details including brand, color,<br>and category associations. Specifications are validated against tenant-specific configuration. Product is<br>immediately published upon creation unless status is set to INACTIVE.
**URL:** https://api.shopsynch.com/v1/products.do

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Category is mandatory; brand and color are optional
         - Product records immediately belong to authenticated merchant's tenant
         - Validates all referenced entities (brand, color, category) exist and belong to tenant
         - Validates product specifications against tenant's specification configuration
         - Automatically sets product status based on request (ACTIVE/INACTIVE/DRAFT)
         - Assigns unique SKU and product ID upon creation
         - Returns complete product details including tenant association


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|id|string|false|No comments found.|-||
|name|string|true|No comments found.|-||
|slug|string|false|No comments found.|-||
|description|string|true|No comments found.|-||
|summary|string|false|No comments found.|-||
|image|string|true|No comments found.|-||
|thumbnail|string|true|No comments found.|-||
|imageList|array|false|No comments found.|-|""","""|
|features|array|false|No comments found.|-|""","""|
|price|double|true|No comments found.|-|0.0|
|ramSize|string|false|No comments found.|-||
|storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.|-||
|quantityInStock|int32|true|No comments found.|-|0|
|brandId|string|false|No comments found.|-||
|discount|double|false|No comments found.|-|0.0|
|categoryId|string|true|No comments found.|-||
|tenantId|string|false|No comments found.|-||
|colorId|string|false|No comments found.|-||
|customColor|string|false|No comments found.|-||
|specifications|array|false|No comments found.|-||
|└─key|string|true|No comments found.|-||
|└─value|string|true|No comments found.|-||
|variations|array|false|No comments found.|-||
|└─color|string|true|No comments found.|-||
|└─image|string|false|No comments found.|-||
|└─priceDetails|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|true|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|false|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|true|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|false|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|false|A map key.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/products.do' --data '{
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

### Update Product<br><br>Updates an existing product&apos;s details. Allows modification of product information including name, description,<br>pricing, status, and specifications. Only merchant who owns the product can update it.
**URL:** https://api.shopsynch.com/v1/products/{productId}.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Uses PATCH method for partial updates (only provided fields are updated)
         - Updates only fields present in UpdateProductRequest (null fields are ignored)
         - Updates modifiedAt timestamp automatically
         - Returns complete updated product object
         - Useful for single field updates or bulk product information corrections


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product to update. Must belong to authenticated merchant's tenant.|-||

**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|name|string|false|No comments found.|-||
|slug|string|false|No comments found.|-||
|description|string|false|No comments found.|-||
|summary|string|false|No comments found.|-||
|image|string|false|No comments found.|-||
|thumbnail|string|false|No comments found.|-||
|imageList|array|false|No comments found.|-|""","""|
|features|array|false|No comments found.|-|""","""|
|price|double|false|No comments found.|-|0.0|
|ramSize|string|false|No comments found.|-||
|storage|string|false|No comments found.|-||
|size|string|false|No comments found.|-||
|sku|string|false|No comments found.|-||
|quantityInStock|int32|false|No comments found.|-|0|
|brandId|string|false|No comments found.|-||
|discount|double|false|No comments found.|-|0.0|
|categoryId|string|false|No comments found.|-||
|colorId|string|false|No comments found.|-||
|customColor|string|false|No comments found.|-||
|specifications|array|false|No comments found.|-||
|└─key|string|true|No comments found.|-||
|└─value|string|true|No comments found.|-||
|variations|array|false|No comments found.|-||
|└─color|string|true|No comments found.|-||
|└─image|string|false|No comments found.|-||
|└─priceDetails|array|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─id|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|true|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|false|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|true|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|false|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─variationAttributes|object|false|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─mapKey|string|false|A map key.|-||

**Request-example:**
```bash
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/products/{productId}.do'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
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

### Get Product Details<br><br>Retrieves complete details of a single product including all attributes, specifications, pricing,<br>availability, and related information.
**URL:** https://api.shopsynch.com/v1/products/{productId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Public endpoint (no authentication required)
         - Returns complete product information including specifications and pricing
         - ProductMapper transforms entity to DTO with all relevant fields
         - Useful for product detail pages after clicking on product in catalog


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product. Must belong to current tenant context.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/products/{productId}.do'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
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

### Get Similar Products<br><br>Retrieves a list of products similar to a specified product, typically from the same category or with<br>related attributes. Useful for &quot;You might also like&quot; or &quot;Related products&quot; sections in product detail pages.
**URL:** https://api.shopsynch.com/v1/products/similar/by/category/{productId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Public endpoint (no authentication required)
         - Finds products in same category as reference product
         - Excludes the reference product from results
         - Returns limited result set (default 4) for UI display optimization
         - Useful for cross-selling and product discovery features
         - Default limit of 4 products is typical for "Related products" widgets


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/products/similar/by/category/{productId}.do?limit=4'
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
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─price|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─newPrice|double|No comments found.|-|0.0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ramSize|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─Storage|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─size|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─sku|string|No comments found.|-||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─quantityInStock|int32|No comments found.|-|0|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─discount|double|No comments found.|-|0.0|
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

### Delete Product<br><br>Permanently deletes a product from the merchant&apos;s store. Product details are removed from system but<br>historical order records remain intact for audit purposes.
**URL:** https://api.shopsynch.com/v1/products/{productId}.do

**Type:** DELETE


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Restricted to shop owner access only (@ShopOwnerAccess)
         - Permanently removes product from catalog
         - Does not affect historical orders containing this product (referential integrity maintained)
         - Cannot be undone (no soft delete/restoration available)
         - Useful for removing inactive or obsolete products from inventory


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product to delete. Must belong to authenticated merchant's tenant.|-||

**Request-example:**
```bash
curl -X DELETE -k -i 'https://api.shopsynch.com/v1/products/{productId}.do'
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
**URL:** https://api.shopsynch.com/v1/products/{productId}/rating.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** This endpoint:
         - Public endpoint (no authentication required)
         - Computes average rating from all published customer reviews
         - Rating range is typically 1.0 to 5.0 stars
         - Returns 0.0 if product has no reviews yet
         - Used in product listings and detail pages to display customer sentiment
         - Computation is cached or aggregated query for performance


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|productId|string|true|Unique identifier of the product. Must belong to current tenant.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/products/{productId}/rating.do'
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
**URL:** https://api.shopsynch.com/v1/generate/session/id.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/generate/session/id.do'
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

## PaymentController
### Get All Payments<br><br>Retrieves a paginated list of payments for a tenant with cursor-based navigation.
**URL:** https://api.shopsynch.com/v1/payments.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Get All Payments
<p>
Retrieves a paginated list of payments for a tenant with cursor-based navigation.


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
curl -X GET -k -i 'https://api.shopsynch.com/v1/payments.do?cursor=&limit=10&sortDirectionParam=DESC&status=&gateway=&paymentMethod=&reference=&customerId='
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

### Get Payment by Order ID<br><br>Retrieves the payment details associated with a specific order.
**URL:** https://api.shopsynch.com/v1/payments/order/{orderId}.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** Get Payment by Order ID
<p>
Retrieves the payment details associated with a specific order.


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|orderId|string|true|Unique identifier of the order.|-||

**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/payments/order/{orderId}.do'
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
|└─createdAt|string|No comments found.|-|"2026-03-16 19:36:46"|
|└─updatedAt|string|No comments found.|-|"2026-03-16 19:36:46"|
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
    "createdAt": "2026-03-16 19:36:46",
    "updatedAt": "2026-03-16 19:36:46"
  },
  "message": "",
  "status": true
}
```

### Initialize Customer Payment<br><br>Initializes a payment transaction for an authenticated customer&apos;s order.<br>Validates the requested payment gateway<br>and method, ensures the merchant has configured the payment gateway, creates<br>a payment record, and initiates<br>the payment processing with the external payment gateway.
**URL:** https://api.shopsynch.com/v1/payments/initialize.do

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
- Validates both payment gateway and method against supported
options
- Generates a unique payment reference for tracking
- Creates a Payment entity with PENDING status
- Updates associated Order with payment gateway and method details
- Handles OFFLINE gateway specially (returns success without
external processing)
- Generates metadata (orderNumber) for payment gateway callback
tracking
- Returns redirect URL or initialization data for hosted payment
pages
- Requires customer authentication and tenant context
- Callback URL must be provided for payment verification redirection


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
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/payments/initialize.do' --data '{
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

### Initialize Guest Payment<br><br>Initializes a payment transaction for a guest (unauthenticated) customer&apos;s<br>order. Performs same validation as<br>customer payment initialization but without requiring user authentication.<br>Guest payment includes currency validation<br>and creates a guest-friendly payment record.
**URL:** https://api.shopsynch.com/v1/payments/guest/initialize.do

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
- Allows unauthenticated payment initiation for guest checkout flow
- Validates payment gateway, method AND currency (more validation
than customer payments)
- Ensures merchant has configured the payment gateway secrets
- Generates payment record linked to Order but not to Customer
- Returns payment gateway initialization data for guest checkout
completion
- Contact information embedded in Order (not extracted from
authenticated user)
- Useful for checkout flows where customer doesn't have account yet
- No customer authentication required


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
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/payments/guest/initialize.do' --data '{
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

### Verify and Confirm Payment<br><br>Verifies payment completion with the external payment gateway using the<br>payment reference. Confirms the payment<br>amount, currency, and status, updates the payment record with gateway<br>verification details, and triggers order<br>status progression to PROCESSING. Also sends notification emails to merchant.
**URL:** https://api.shopsynch.com/v1/payments/confirm.do

**Type:** POST


**Content-Type:** application/json

**Description:** This endpoint:
- Queries external payment gateway to verify transaction
- Validates amount paid matches order total (prevents underpayment)
- Validates currency matches payment request
- Updates Payment entity with gateway response and verification
details
- Records payment status changes in PaymentStatusHistory for audit
trail
- Updates Order payment status to match verified payment status
- Automatically progresses Order to PROCESSING status on successful
payment
- Clears customer's cart session upon successful payment
- Sends merchant notification email with order and customer details
- Is transactional to ensure consistency across multiple entity
updates
- Prevents double-payment situations before confirmation

**Request-headers:**

| Header | Type | Required | Description | Since | Example |
|--------|------|----------|-------------|-------|---------|
|X-Session-Id|string|false|Optional session identifier for tracking payment<br/>                 confirmation events and audit logs.|-||


**Body-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|reference|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X POST -k -H "Content-Type: application/json" -H "X-Session-Id" -i 'https://api.shopsynch.com/v1/payments/confirm.do' --data '{
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

### Update Payment Status<br><br>Updates the payment status for a specific payment record. Used by shop owners<br>to manually confirm or adjust<br>payment status, particularly for offline or manual payment methods. Records<br>status transition history and<br>updates associated order status accordingly.
**URL:** https://api.shopsynch.com/v1/payments/{paymentId}/status.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** This endpoint:
- Restricted to shop owner accounts only (@ShopOwnerAccess)
- Validates new status is a valid PaymentStatusEnum value
- Validates status transition logic (e.g., cannot go from SUCCESS to
PENDING)
- Prevents multiple successful payments for same order
- Marks payment as manual_payment=true when updated this way
- Records actor (shop owner) and timestamp of verification
- Stores proofOfPayment (receipt URL, reference) in metadata
- Stores manual notes in metadata for audit and reconciliation
- Automatically progresses Order to PROCESSING status if payment
marked SUCCESS
- Records detailed history in PaymentStatusHistory with actor type
(MERCHANT)
- Used for offline payments, bank transfers, or manual
reconciliation scenarios


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
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/payments/{paymentId}/status.do'
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

## AddressController
### getUserAddresses
**URL:** https://api.shopsynch.com/v1/addresses.do

**Type:** GET


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Request-example:**
```bash
curl -X GET -k -i 'https://api.shopsynch.com/v1/addresses.do'
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
**URL:** https://api.shopsynch.com/v1/addresses.do

**Type:** POST


**Content-Type:** application/json

**Description:** 


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
curl -X POST -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/addresses.do' --data '{
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
**URL:** https://api.shopsynch.com/v1/addresses/{addressId}.do

**Type:** PATCH


**Content-Type:** application/json

**Description:** 


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
curl -X PATCH -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/addresses/{addressId}.do'
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
**URL:** https://api.shopsynch.com/v1/addresses/{addressId}.do

**Type:** DELETE


**Content-Type:** application/json

**Description:** 


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
curl -X DELETE -k -H "Content-Type: application/json" -i 'https://api.shopsynch.com/v1/addresses/{addressId}.do?id=&street=&streetNumber=&postalCode=&city=&stateId=&localGovernmentId=&isDefault=true'
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
**URL:** https://api.shopsynch.com/v1/addresses/{addressId}/default.do

**Type:** PATCH


**Content-Type:** application/x-www-form-urlencoded

**Description:** 


**Path-parameters:**

| Parameter | Type | Required | Description | Since | Example |
|-----------|------|----------|-------------|-------|---------|
|addressId|string|true|No comments found.|-||

**Request-example:**
```bash
curl -X PATCH -k -i 'https://api.shopsynch.com/v1/addresses/{addressId}/default.do'
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


