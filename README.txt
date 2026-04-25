Zest OTT Mobile Friendly Store

Files included:
- index.html
- buy.html
- style.css
- zest-logo.png
- khalti-payment.png
- esewa-payment.png

Features:
- Mobile and desktop friendly design
- NPR active, USD coming soon
- Netflix pricing added
- eSewa and Khalti payment cards added
- Receipt upload field
- Note/description box
- WhatsApp verification button
- Special setup fields:
  Spotify: email + password + confirmation checkbox
  ChatGPT Pro and other own-email products: email + confirmation checkbox

Important:
Browsers cannot automatically attach the selected receipt file to WhatsApp.
The verify button opens WhatsApp with order details. Customer must manually attach the receipt screenshot there.

Update: Payment page now has side-by-side Khalti/eSewa buttons. Only selected QR is shown.


New pages added:
- login.html: Google sign-in UI placeholder for Firebase/Supabase
- tracker.html: order tracking page using browser demo storage
- admin.html: pricing dashboard template using browser demo storage

To connect real Google login:
- Firebase: replace demoLogin() with Firebase Auth GoogleProvider popup/redirect.
- Supabase: replace demoLogin() with supabase.auth.signInWithOAuth({ provider: 'google' }).

To connect real prices/orders:
- Store products and orders in Firebase Firestore or Supabase database.
- Fetch product list on index.html.
- Create order row on buy.html after verify.
