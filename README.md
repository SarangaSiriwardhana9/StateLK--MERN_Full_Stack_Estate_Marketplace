# StateLk

StateLk is a modern real estate platform built using the MERN (MongoDB, Express, React, Node.js) stack, with Firebase integration for Google sign-in, image uploading, and JWT authentication. It provides a seamless experience for users to explore, list, and manage properties.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality, including Google sign-in.
- **Property Listings**: View available listings for houses and lands.
- **Search and Sort**: Easily search and sort listings based on various criteria.
- **Contact Sellers**: Contact sellers directly via email for inquiries.
- **Add Listings**: Users can add their own property listings.
- **Profile Management**: Update user profiles and view added listings.
- **Responsive Design**: Fully responsive design for optimal user experience on all devices.

## Installation

To run StateLk locally, follow these steps:

1. Clone the repository: `git clone https://github.com/SarangaSiriwardhana9/StateLK--MERN_Full_Stack_Estate_Marketplace.git`
2. Navigate to the 'client' folder and create a `.env` file with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
```
4. Navigate to the 'server' folder and create a `.env` file with your MongoDB URI and JWT secret:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```
5. Install dependencies in both the 'client' and 'server' folders: `npm install`
6. Start the development servers:
- For the client: `npm run dev` in the 'client' folder
- For the server: `npm run dev` in the 'server' folder

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase Authentication
- **Image Uploading**: Firebase Storage
- **Other**: JWT Authentication, Axios

## Contributing

Contributions are welcome! Please create a new branch for your changes and submit a pull request.


## Acknowledgements

- Thanks to [Firebase](https://firebase.google.com/) for providing authentication and storage services.
- Swiper for the awesome slider component.
- Inspiration from similar real estate platforms.
