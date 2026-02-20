# Pages and Routes

This document defines the pages exposed by the frontend application and
the functionality available on each page.

---

## Public Pages (Unauthenticated)

### Public Wishlist Page
**Route:** /wishlists/:id

**Description:**
Allows unauthenticated users to view a Case Worker’s wishlist.

**Features:**
- Display Case Worker name
- Display wishlist description
- Display list of wishlist items
- Show fulfillment status for each item
- Show quantity fulfilled vs requested
- Display link to Amazon wishlist
- Read-only access (no editing)

---

## Authentication Pages

### Login Page
**Route:** /login

**Description:**
Allows Case Workers to authenticate and access protected areas of the application.

**Features:**
- Email and password input
- Client-side validation
- Error handling
- Redirect to dashboard on success

---

## Authenticated Pages (Case Workers)

### Dashboard
**Route:** /dashboard

**Description:**
Primary landing page for authenticated Case Workers.

**Features:**
- Display Case Worker profile information
- List of all wishlists created by the Case Worker
- Overview of fulfillment status for each wishlist

---

### Create / Edit Wishlist Page
**Route:** /wishlists/new  
**Route:** /wishlists/:id/edit

**Description:**
Allows Case Workers to create and manage wishlists.

**Features:**
- Wishlist title and description
- Amazon wishlist link input
- List of items with quantity requested
- Fulfillment status indicators

---

## Potential Future Pages

### User Registration Page
**Route:** /register

**Description:**
Allows end users to create an account for tracking fulfillment activity.

---

### User Fulfillment History Page
**Route:** /my-fulfillments

**Description:**
Displays a list of fulfillment claims submitted by the authenticated user,
including claim status and associated wishlists.

---

### Fulfillment Dispute Page
**Route:** /fulfillments/:id/dispute

**Description:**
Allows users to submit disputes for denied fulfillment claims, potentially
initiating communication with a Case Worker.