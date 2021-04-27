# EWBOK_Rookies

# Assignment Requirement

Build an ecommerce web site with minimum functionality below:

**For customers:**

- Home page: category menu, features products
- View products by category
- View product details
- Product rating
- Register
- Login/Logout
- Optional (shopping cart, ordering)

**For admin:**

- Login/logout
- Manage product categories (Name, Description)
- Manage products (Name, Category, Description, Price, Images, CreatedDate, UpdatedDate)
- View customers
<hr/>

# Feature
### For customer site
- View products by category, material, brand.
- Pagination.
- View product details.
- Chosse Size of product to Add To Cart.
- View gallery mage of product.
- Product rating.
- Comment in each product
- Shopping cart page.
- Checkout page.
- Login/Logout

### For admin site
- View products
- Create/Edit/Delete products (include manage Size, Gallery)
- View categories 
- Create/Edit/Delete categories
- View materials 
- Create/Edit/Delete materials
- View current users 
- View comments
- Delete comment
- View ratings
- Delete rating
- Login/Logout
<hr/>

# I. Backend Project (.NETCore Api)
### 1. Using
- .NET 5.0 (with API Project Template)
- Entity Framework 6
- Identity intergate IdentityServer 4
- Swagger

### 2. Set up
1. Restore packages in projects with Dotnet CLI: 
 ```cmd 
 dotnet restore 
 ```
3. Change Client URLs in path `../EWBOK_Rookies_Back_End/appsettings.json` (if run it on diffrent host/domain)
4. Change ConnectionStrings in path `../EWBOK_Rookies_Back_End/appsettings.json`

<b>TIP</b>. Use EF Migrations on different Assembly

Add migrations
```cmd
dotnet ef migrations add Init -s ../Core
```
Database update
```cmd
dotnet ef database update -s ../Core
```
<hr/>

# II. Customer Site (.NETCore Mvc)
### 1. Using
- Dependency Injection (Services).
- Partial View.
- Tag Helpper.
- View Component.
- Session Storage.
### 2. Resource reference
- Bootstrap (Grid System) - https://github.com/twbs/bootstrap
### 3. Set up
1. Restore packages in projects with Dotnet CLI: 
 ```cmd 
 dotnet restore 
 ```
2. Change Backend URLs and Image Res in path `../EWBOK_Rookies_Front_End/appsettings.json` (if run it on diffrent host/domain)

<hr/>

# III. Admin Site (ReactJS)
### 1. Using
- React 17.0.2
- Intergate IdentityServer 4
- Redux
### 2. Resource reference
- Axios - https://github.com/axios/axios
- React-Toastify - https://github.com/fkhadra/react-toastify
- redux-Thunk - https://github.com/reduxjs/redux-thunk
- Oidc-Client - https://github.com/IdentityModel/oidc-client-js
- React-router-dom - https://reactrouter.com/web/guides/quick-start
### 3. Set up
1. Install packages in project with Bash: 
 ```cmd 
 npm install 
 ```
2. Change Backend URLs and Image Res in path `../Constants/Config.js` (if run it on diffrent host/domain)
3. Change Client Config in path `../services/authService.js`.



