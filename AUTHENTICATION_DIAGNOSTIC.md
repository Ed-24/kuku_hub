# KukuHub Authentication Diagnostic Guide

## Problem Statement
Sign-up and sign-in are failing. Accounts may not be persisting in Firestore.

## Chain of Thought Analysis

### Signup Flow Steps:
1. User enters email, password, name, user type
2. `SignUpScreen` calls `signUp(email, password, name, userType)`
3. Firebase Auth creates user account ✅
4. `updateProfile()` sets displayName ✅
5. `setDoc()` writes user document to Firestore `users/{uid}` collection
6. Auth state changes (Firebase internal)
7. `onAuthStateChangedListener` fires
8. `AppContext` calls `getUserProfile(uid)`
9. If profile exists, user is logged in ✅
10. If profile doesn't exist, stuck on auth screens ❌

### Critical Points Where Failure Can Occur:

**Point A: Firestore Write (setDoc)**
- If security rules don't allow write: User auth created but profile not saved
- Result: Next login attempt fails (user exists in Auth but not in Firestore)

**Point B: Profile Fetch (getUserProfile)**
- If profile doesn't exist in Firestore: Returns error
- Result: AppContext doesn't set user profile, navigation doesn't switch

**Point C: Auth State Listener Timing**
- If listener doesn't fire quickly enough after signup
- Result: App stays on signup screen even though auth succeeded

## Diagnosis Steps

### Step 1: Check Firebase Console
Go to https://console.firebase.google.com/project/young4chick

1. **Authentication Tab**
   - Do you see test users in "Users" list?
   - If YES: Auth creation works, issue is Firestore
   - If NO: Auth creation itself is failing

2. **Firestore Tab → Database → Collections**
   - Do you see a "users" collection?
   - If YES, expand it - are there user documents with your test email?
   - If NO: Firestore rules are blocking write

### Step 2: Check Browser Console
1. Open the app in browser (http://localhost:8082)
2. Open DevTools (F12)
3. Go to Console tab
4. Look for logs starting with 🔥, ✅, or ❌

**Successful signup logs should show:**
```
🔥 [AUTH] Starting sign up: { email: "test@test.com", displayName: "Test User", userType: "buyer" }
✅ [AUTH] Services obtained, creating user...
✅ [AUTH] User created with UID: abc123xyz
✅ [AUTH] Firebase profile updated with displayName: Test User
🔥 [AUTH] About to save user document to Firestore at path: users/abc123xyz
🔥 [AUTH] Document data: { uid: "abc123xyz", ... }
✅ [AUTH] Firestore user document created successfully
🔥 [AUTH] Verifying document was saved...
✅ [AUTH] Verification successful - document exists: { uid: "abc123xyz", ... }
```

**If you see permission-denied error:**
```
❌ [AUTH] Firestore setDoc failed: permission-denied
```
This means security rules are blocking the write. See Solution #2 below.

### Step 3: Check Firestore Rules Deployment
Run this command in PowerShell (using cmd wrapper):
```powershell
cmd /c "firebase rules:list --project young4chick"
```

Should output the latest deployed rules. If empty or old, rules weren't deployed.

## Solutions

### Solution 1: Redeploy Firestore Rules
If rules weren't properly deployed:

```bash
# From project root
firebase deploy --only firestore:rules --project young4chick
```

Or use cmd wrapper:
```powershell
cmd /c "firebase deploy --only firestore:rules --project young4chick"
```

### Solution 2: Verify Security Rules Allow Write
The [firestore.rules](../firestore.rules) file should have:

```firestore
match /users/{uid} {
  allow read, write: if request.auth.uid == uid;
}
```

This means: Authenticated users can read/write their own user document.

### Solution 3: Check if Firestore Database Exists
The project must have a Firestore database (not just Firebase project):

1. Go to Firebase Console → Firestore Database
2. If it says "Create Database", click it and create in "us-central1" region
3. Choose "Start in test mode" initially (then lock down with rules)

### Solution 4: Ensure Auth Listener Is Active
The AppContext auth listener must be active:

1. Check that `onAuthStateChangedListener` is called when app starts
2. Look for logs like: `🔥 [CONTEXT] Auth state changed: abc123xyz`
3. If not appearing, auth listener isn't set up properly

## Step-by-Step Testing

### Test Sign-Up:
1. Clear all browser storage (DevTools → Application → Clear Site Data)
2. Go to sign-up screen
3. Enter:
   - Name: `Test User`
   - Email: `test.signup.123@gmail.com` (use unique email each time)
   - Password: `TestPassword123!`
   - Type: `Buyer`
4. Click Sign Up
5. Check browser console (F12 → Console tab)
6. Look for success or error logs

### If Sign-Up Succeeds:
- Check Firebase Console → Authentication → Users (do you see the email?)
- Check Firebase Console → Firestore → users collection (is there a document?)
- Try Sign-In screen with same email/password

### If Sign-Up Fails:
- Copy the error message from browser console
- See "Solutions" section above

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Firestore permission denied" | Rules not deployed or restrictive | Redeploy rules or check rules syntax |
| "User profile not found" | Profile not saved to Firestore | Ensure setDoc succeeded (check auth logs) |
| Stuck on sign-up screen after success | Auth listener not firing | Restart dev server, check AppContext |
| "Firebase Auth not configured" | Services not initialized | Check firebaseConfig.js, restart server |
| Can create account but can't sign in | Old rules preventing read | Redeploy rules from firestore.rules file |

## Manual Account Creation (Fallback)

If you need test accounts without signup:

1. Firebase Console → Authentication → Add user (via email/password)
2. Create user document in Firestore:
   - Collection: `users`
   - Document ID: `{uid from step 1}`
   - Fields:
     ```json
     {
       "uid": "{uid}",
       "email": "test@example.com",
       "displayName": "Test User",
       "userType": "buyer",
       "profile": {
         "phone": "",
         "address": "",
         "city": "",
         "country": "",
         "profileImage": "",
         "bio": ""
       },
       "isVerified": false,
       "createdAt": "2026-01-19T00:00:00.000Z",
       "updatedAt": "2026-01-19T00:00:00.000Z"
     }
     ```

## Next Actions

1. Check Firebase Console (Authentication + Firestore tabs)
2. Look at browser console logs (F12) while attempting signup
3. Run the diagnostic command to check rules deployment
4. Apply appropriate solution from list above
5. Test again with fresh account

---

**Updated:** 2026-01-19
**Enhanced Error Handling in:** authService.js (signUp function)
**Improved Logging in:** AppContext.js
**Rules File:** firestore.rules
