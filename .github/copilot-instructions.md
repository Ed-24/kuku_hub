# KukuHub - Copilot Instructions

## Project Overview
**KukuHub** is an Expo-based React Native marketplace app connecting chicken farmers with buyers. The app features dual user types (buyer/farmer), real-time cart management, order processing, and integrated Firebase backend.

**Tech Stack:** Expo, React Native, React Navigation, Firebase (Auth + Firestore), React Context

---

## Architecture & Data Flow

### Core Structure
```
src/
├── context/AppContext.js      → Global state (user, cart, orders, auth)
├── firebase/
│   ├── firebaseConfig.js      → Firebase initialization + exports (auth, db, storage)
│   ├── authService.js         → Authentication logic (signUp, signIn, logout, error handling)
│   └── dataService.js         → CRUD operations (products, orders, cart, reviews, messages)
├── navigation/AppNavigator.js → Conditional routing based on auth state
├── screens/
│   ├── auth/                  → Welcome, SignIn, SignUp screens
│   ├── dashboard/             → BuyerDashboard, FarmerDashboard
│   ├── order/                 → Product discovery & ordering
│   ├── cart/                  → Cart management
│   ├── account/               → User profiles, settings
│   └── [other domains]/       → Payment, tracking, inventory, messages
└── constants/theme.js         → Centralized COLORS, SIZES for UI consistency
```

### Authentication Flow
1. App starts → `AppContext` listens to Firebase auth state (`onAuthStateChangedListener`)
2. `AppNavigator` checks `user` state:
   - **Logged in:** Shows `TabNavigator` (main app with bottom tabs)
   - **Logged out:** Shows auth screens (Welcome → SignIn/SignUp)
3. On successful auth, Firebase auto-updates context, triggering re-render

### Data State Management
- **AppContext** = Single source of truth for: user, userProfile, userType, cart, orders
- **No Redux/Zustand** - Context sufficient for current complexity
- **Cart synced with Firestore** (`src/firebase/dataService.js` → `addToCart`, `getCart`, `removeFromCart`)
- **Orders loaded on auth** and updated when user interacts

---

## Critical Patterns & Conventions

### Firebase Service Layer (`src/firebase/`)
All Firebase operations isolated in service functions returning `{ success: boolean, data?, error? }`:

```javascript
// Example: src/firebase/dataService.js
export const createOrder = async (buyerId, orderData) => {
  try {
    // Operation here
    return { success: true, id: orderRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

**Why:** Consistent error handling, easy testing, screen code stays clean. Always check `result.success` before accessing data.

### Screen Imports Pattern
**Screens in subdirectories must use correct relative paths to `firebase/` and `context/`:**
- From `screens/auth/SignInScreen.js` → `import { signIn } from '../../firebase/authService';`
- From `screens/account/ProfileEditScreen.js` → `import { updateUserProfile } from '../../firebase/dataService';`
- **Common bug:** Using wrong `../` count causes bundler errors

### Theme Constants (`src/constants/theme.js`)
Centralized design tokens:
```javascript
COLORS: { primary, white, gray, lightGray, darkGray, border, ... }
SIZES: { xs, sm, md, lg, xl, borderRadius, ... }
```
**Always use** `COLORS.primary` not hardcoded `'#FF6B35'` for consistency.

### User Type Conditional Logic
Two user paths: `'buyer'` and `'farmer'` (stored in `userProfile.userType` in Firestore):
```javascript
const { userType } = useApp();
if (userType === 'farmer') {
  // Show: Inventory, Analytics, Earnings screens
} else {
  // Show: Order, Cart, Checkout screens
}
```

---

## Essential Workflows & Commands

### Development
```bash
npm start              # Start Expo dev server (web/android/ios)
npm run web           # Open web version at http://localhost:8082
npm install firebase  # Add Firebase package (use cmd /c wrapper on Windows)
```

### Firebase Integration Checklist
When adding new features using Firebase:
1. Add service function in `src/firebase/dataService.js` with try-catch
2. Call from screen using `useApp()` context
3. Handle result: `if (result.success) { ... } else { Alert.alert(...) }`
4. Import paths: Always `../../firebase/` from screen subdirs

### Common File Modifications
- **Adding auth-related logic:** Update `src/firebase/authService.js` + test in `SignInScreen.js`/`SignUpScreen.js`
- **Adding data operations:** Update `src/firebase/dataService.js` + use `getCart()`, `createOrder()`, etc.
- **Adding new screen:** Place in appropriate subdirectory, import in `src/navigation/AppNavigator.js`, add route to Stack

---

## Key Integration Points

### AppContext → Screen Interaction
Screens access global state via `const { user, cart, userProfile, isLoading } = useApp();`

**Available context methods:**
- `addToCart(product, quantity)` - Updates local + Firestore
- `removeFromCart(productId)` - Removes item
- `clearCart()` - Empties cart
- `getCartTotal()` - Returns sum of (price × quantity)
- `addOrder(order)` - Creates order + notification
- `logout()` - Signs out user

### Firebase Collections Schema
```
users/{uid}
├── email, displayName, userType ('buyer'|'farmer')
├── profile: { phone, address, city, profileImage, bio }
└── isVerified, createdAt, updatedAt

products/{id}
├── farmerId, name, price, quantity, description
└── createdAt, updatedAt

orders/{id}
├── buyerId, farmerId, status ('pending'|'confirmed'|'shipped'|'delivered')
├── items: [{ productId, quantity }]
└── createdAt, updatedAt

carts/{buyerId}
└── items: [{ productId, quantity }]

reviews/{id}, messages/{id}
```

---

## Common Pitfalls & Debugging

### "Unable to resolve" Import Errors
- **Cause:** Wrong relative path count in import
- **Fix:** Count directory levels: `screens/account/ProfileEditScreen.js` = 2 levels down = `../../firebase/`

### 400 Firebase Auth Errors
- **Cause:** Invalid credentials, user not found, or weak password
- **Fix:** Check `authService.js` error messages are displayed. Validate email format in screen.

### Loading State Not Showing
- **Check:** `AppContext` has `isLoading` state that's only `true` during initial Firebase auth check
- **Solution:** Show loading spinner when `isLoading === true` in screens

### Navigation Not Switching After Login
- **Cause:** AppContext not updating, or user state not triggering re-render
- **Fix:** Ensure `onAuthStateChangedListener` is called in AppContext.js (auto-updates user state)

---

## Adding a New Feature: Complete Example

**Task:** Add "Favorites" for buyers

1. **Update Firestore schema:**
   - Add `favorites` collection with structure: `{ buyerId, productIds: [] }`

2. **Add service functions** (`src/firebase/dataService.js`):
```javascript
export const addToFavorites = async (buyerId, productId) => {
  try {
    const favRef = doc(db, 'favorites', buyerId);
    await updateDoc(favRef, { productIds: arrayUnion(productId) });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

3. **Update AppContext** to load favorites on auth

4. **Use in screen:**
```javascript
import { addToFavorites } from '../../firebase/dataService';
const { user } = useApp();
await addToFavorites(user.uid, productId);
```

---

## Questions for Iteration
- Should I add any specific testing patterns?
- Any security considerations beyond Firebase rules?
- Should error boundary patterns be documented?
