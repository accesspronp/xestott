Firebase login added.

Files:
- login.html has official Firebase Google login using your config.
- admin.html and tracker.html removed.
- index.html and buy.html include Login link.

Local testing:
Do NOT open login.html directly with file://.
Run a local server from the folder:
python -m http.server 8000
Then open:
http://localhost:8000/login.html

Firebase authorized domains:
Add these in Firebase Authentication > Settings > Authorized domains:
localhost
zestotts.shop
www.zestotts.shop

When hosted:
Open https://zestotts.shop/login.html
Google login should work if Google provider is enabled and domain is authorized.
