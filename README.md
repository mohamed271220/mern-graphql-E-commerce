# Zimart

Zimart is a full-stack e-commerce app built using the MERN stack, a combination of `MongoDB`, `Express.js`, `React`, and `Node.js`. It also incorporates `TypeScript` for enhanced type safety and `SASS` for flexible styling. The app features both a `RESTful API` and a `GraphQL` endpoint for flexible data retrieval. The dashboard is built using `React` and `TypeScript`, and allows merchants to efficiently manage their online store by managing products, orders, and customers.

## Shopping

The shopping section of this project includes several features that make it easy for users to browse and purchase products.

- **Add and Remove Products to/from Cart:** Users can add products to their cart and remove them whenever they want. The cart is managed using Redux, allowing for seamless updates without requiring a page refresh.

- **Add and Remove Products to/from Wishlist:** Users can also add products to their wishlist and remove them later. The wishlist is also managed using Redux, which ensures that changes are reflected in real-time.

- **Compare Products:** Users can compare different products by selecting them from the product listings. The comparison feature allows users to see the differences between products side-by-side.

- **Pagination:** The product listings are paginated, which means that they are divided into smaller pages to improve performance and make it easier to navigate through the products.

- **Search by Title and Category:** Users can search for products by title and category using the search bar. The search results are displayed in real-time as the user types, and the matching text is highlighted.

- **Filtering:** Users can filter the product listings by category, price range, and other parameters. The filtering feature makes it easier for users to find the products they are looking for.

- **Grid and List View of Products:** Users can view the product listings in either a grid or list format. The choice of view depends on the user's preference.

- **Single Route for Each Product:** Each product has its own dedicated page, which includes all the relevant information about the product.

- **Hover to Zoom and Highlight Product Image using react-image-magnifiers:** Users can hover over the product images to zoom in and highlight specific areas of the image. This feature uses the react-image-magnifiers library.

- **Lazy Loading for Better Performance:** The product listings use lazy loading to improve performance. This means that the products are loaded as the user scrolls down the page, rather than all at once.

## User Accounts

The user account section of the project allows users to create an account, log in, and manage their profile information.

- **Authentication and Authorization:** Users can create an account, log in, and log out of the website. The authentication and authorization processes ensure that only authorized users can access certain parts of the website.

- **Update User Data and Change User Avatar:** Users can update their personal data, such as their name and email address, and change their avatar.

- **Dashboard Notifications:** The dashboard provides notifications to users regarding their account activity, such as order confirmations and account updates.

- **Responsive Design for Optimal Viewing on Different Devices:** The user interface is designed to be responsive, which means that it is optimized for viewing on different devices, such as desktops, laptops, tablets, and smartphones.

## Admin Dashboard

The admin dashboard is designed for site administrators to manage the website's products, users, orders, and earnings.

- **Add and Update Products for Admins:** Site administrators can add and update products, which includes changing the product information and updating the product images.

- **Charts to Visualize Users, Products, Orders, and Earnings:** The admin dashboard includes charts that provide visualizations of user activity, product sales, order history, and earnings.

- **Breadcrumbs:** The admin dashboard includes a breadcrumb feature that displays the user's location within the website hierarchy, making it easier to navigate back to previous pages.

## Reviews and Ratings

Users can add reviews and ratings for each product. Users can also edit their ratings and reviews if they wish to make changes.

- **Reviews for Every Product:** Each product has a dedicated review section where users can leave their opinions and thoughts about the product.

- **Ability for Users to Add and Edit Ratings and Reviews:** Users can add ratings and reviews for each product. They can also edit their ratings and reviews if they wish to make changes.

## Theme

- **Light and Dark Themes for Customization:** The project includes a `light` and `dark` theme that you can use to customize the visual design of your application. These themes are designed to provide a consistent and accessible user experience across different devices and environments. The `light` theme uses a light color scheme with dark text, while the `dark` theme uses a dark color scheme with light text. By providing both themes, users can choose the one that best suits their preferences and needs without sacrificing accessibility.

## Technology

The project uses Redux to manage the state of products, the cart, wishlist, and orders. This allows changes to be displayed without requiring a page refresh. The Stripe API is integrated for payment processing, and Google OAuth is used for easy login and signup. Refresh tokens are used for security purposes.

- **Products, Wishlist, Cart, and Orders are Managed with Redux:** The state of products, the cart, wishlist, and orders are managed using Redux. This ensures that changes are reflected in real-time, without requiring a page refresh.

- **Stripe Integration for Payment Processing:** The Stripe API is integrated into the project for payment processing. This allows users to make payments using their credit or debit cards.

- **Google OAuth for Easy Login and Signup:** Google OAuth is used for easy login and signup. Users can log in using their Google credentials, which makes the process faster and more convenient.

- **Refresh Tokens for Security:** Refresh tokens are used for security purposes. They are used to generate new access tokens, which allows users to access protected resources without having to re-enter their credentials.

-**Form Validation:** All forms in the project, including `update user data`, `login`, `signup`, `add product`, and `update product`, are validated using the `React Hook Form` library and `yup` validation schema.

`React Hook Form` simplifies the process of building forms in React by handling the form state and validation, and returning the relevant values and functions that can be used to manage the form. `yup` is a schema-based validation library that allows you to define validation rules for each field in the form.

The validation rules for each form include checking for required fields, valid email addresses, valid dates, and other specific conditions depending on the form's purpose. If a user submits an invalid form, an error message is displayed to prompt them to correct the errors.

By using `React Hook Form` and `yup` for form validation, we ensure that users enter correct and valid information, which improves the overall user experience and reduces the likelihood of errors and issues.

## Contact

The project provides links to contact the developer, and a `Contact Us` page that includes a map of the company's location.

- **Links to Contact Me:** The project provides links that allow users to contact me directly.

- **Contact Us Page with a Map of the Company's Location:** The `Contact Us` page includes a map of the company's location, which makes it easier for users to find the company's physical address.

## Blogs

The project includes a series of blog articles that provide in-depth coverage of various topics related to the project. These articles are written by members of the development team and cover a range of topics, including:

- Best practices for using the project
- Advanced techniques and features
- Tips and tricks for optimizing performance
- Case studies and real-world examples

The blog articles are published on our website and can be accessed from the project's homepage. We regularly update the blog with new articles, so be sure to check back often for the latest insights and updates.

# Technology

## Frontend

- `HTML`: the standard markup language used to create web pages.
- `Sass`: a preprocessor scripting language that is interpreted into Cascading Style Sheets (CSS).
- `React`: a JavaScript library for building user interfaces.
- `TypeScript`: a superset of JavaScript that adds optional static typing and other features.
- `Apollo Client`: a GraphQL client for React that makes it easy to fetch and manage data from a GraphQL API.
- `React Form Hook`: a library that provides a simple way to manage form state in React.
- `Framer Motion`: a library for creating animations and gestures in React.
- `React Hot Toast`: a library for displaying toast notifications in React.
- `React Tilt`: a library for adding a 3D tilt effect to elements in React.
- `React Leaflet`: a library for integrating Leaflet maps into React applications.
- `React Router DOM`: a library for managing client-side routing in React applications.
- `React Redux`: a library for managing state in React applications using the Redux pattern.
- `React Responsive`: a library for building responsive React applications.
- Chart.js: a JavaScript library for creating charts and graphs.
- `React Avatar Editor`: a library for editing avatars in React.
- Stripe: a payment processing platform that provides APIs for integrating payments into web applications.
- `React Slick`: a library for building responsive sliders and carousels in React.

## Custom components

- **Custom Checkbox :** a custom React component designed in `Figma` that includes an SVG animation to highlight the checkbox when the user checks or unchecks it.

- **Custom Select Input:** a custom React component built manually that includes an animation using `Framer Motion` library. The component is used for filtering country and products in the project when the user selects an option from the dropdown menu. The options in the dropdown are populated dynamically based on the available country and products data.

## Custom Hooks

The project includes several custom hooks that are designed to simplify complex functionality and improve code reusability. These hooks include:

- `useAddReview`: A custom hook that manages the process of adding a review to a product.
- `useAddToCart`: A custom hook that manages the process of adding a product to the user's shopping cart.
- `useAddToFav`: A custom hook that manages the process of adding a product to the user's favorites list.
- `useAvg`: A custom hook that calculates the average rating of a product based on its reviews.
- `useBuy`: A custom hook that handles the process of buying a product from the shopping cart.
- `useCarousel`: A custom hook that manages the state and functionality of a carousel component.
- `useClickOutside`: A custom hook that detects clicks outside of a specified element.
- `useDashProgress`: A custom hook that manages the state and functionality of a progress bar in the dashboard.
- `useDeleteOrder`: A custom hook that handles the process of deleting an order.
- `useFilterCategory`: A custom hook that filters products by category.
- `useFIlterState`: A custom hook that filters products by state.
- `useFormSchema`: A custom hook that defines the validation schema for a form.
- `useHide`: A custom hook that handles the visibility of a specified element.
- `useIndex`: A custom hook that manages the state and functionality of an index component.
- `useIsMobile`: A custom hook that detects whether the device is a mobile device or not.
- `useLogOut`: A custom hook that handles the process of logging out the user.
- `useNumberOfPages`: A custom hook that calculates the total number of pages for a paginated list.
- `usePathAndId`: A custom hook that extracts the path and id from the URL.
- `useRemoveFeomFav`: A custom hook that handles the process of removing a product from the user's favorites list.
- `useRemoveFromCart`: A custom hook that handles the process of removing a product from the user's shopping cart.
- `useRemoveFromCompareList`: A custom hook that handles the process of removing a product from the comparison list.
- `useShowTitle`: A custom hook that manages the state and functionality of a title component.
- `useUpdateOrder`: A custom hook that handles the process of updating an order.
- `useUpdateUserRole`: A custom hook that handles the process of updating a user's role.

By using these custom hooks, we can easily implement complex functionality and improve the overall code quality and reusability. Each hook is designed to handle a specific task, making it easier to manage and maintain the codebase.

## Backend

The project uses the following packages:

- `apollo-server-express`: A package that allows you to quickly set up a GraphQL server with Express.
- `bcrypt`: A package that provides secure password hashing.

- `cors`: A package that provides Cross-Origin Resource Sharing (CORS) middleware for Express.
- `dotenv`: A package that loads environment variables from a `.env` file.

- `graphql`: A package that provides a query language for APIs and a runtime for executing those queries by using a type system defined by a GraphQL schema.

- `graphql-shield`: A package that provides a way to add authorization rules to your GraphQL resolvers.

- `jsonwebtoken`: A package that provides JSON Web Token (JWT) authentication and authorization.
- `mongoose`: A package that provides a way to interact with MongoDB databases using Object-Document Mapping (ODM).
- `multer`: A package that provides middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- `multer-storage-cloudinary`: A package that provides a storage engine for Multer that allows you to upload files to Cloudinary.

- `passport-google-oauth20`: A package that provides Google authentication strategy for Passport.
- `stripe`: A package that provides a way to interact with the Stripe payments platform.

# Setting up the project

To install the required packages, you can use the following command in your terminal:
`npm install
`

This will install all the packages listed in your `package.json` file.

To clone the project, use the following command in your terminal:

```
git clone
https://github.com/Mahmoudaboelenien19/mern-graphql-E-commerce
```

Before running your application, make sure to set the environment variables in a `.env` file in the root directory of your project. Here is an example of what your `.env` file might look like:

```
CLOUD_ACCESS=your_cloudinary_access_key
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
MongoDB_URL=your_mongodb_url
BCRYPT_SALT_ROUNDS=10
BCRYPT_SECRET=your_bcrypt_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
Stripe_key=your_stripe_secret_key
Client_Url=http://localhost:3000
Stripe_Public=your_stripe_public_key
Google_Client_ID=your_google_client_id
Google_Secret=your_google_client_secret
Session_Secret=your_session_secret
```

Make sure to replace the values with your own secrets, access keys, and URLs.

Note that you should never share your secret keys or access keys in your code or on a public repository like GitHub. Instead, you can use environment variables to store these secrets and access them in your code using `process.env`.

## Running the project

To run your application, you can use the following command:

```
npm start
```

This will start your application on port 3000. You can access it by navigating to `http://localhost:3000` in your web browser.
