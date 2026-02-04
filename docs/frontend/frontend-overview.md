# Frontend Overview

This document outlines the frontend design for the Case Worker Wishlist application.
The frontend is responsible for user interaction, navigation, and presentation of data
provided by the backend API.

## User Roles

### Case Workers (Authenticated Users)
- Log into the application
- Create and manage wishlists
- View fulfillment status of wishlist items

### Public Users (Unauthenticated)
- View case worker wishlists
- See item fulfillment status
- Access Amazon wishlist links
- Read-only access

## Frontend Responsibilities
- Page routing and navigation
- Role-based access control
- Display wishlist and item data
- Handle user input and validation