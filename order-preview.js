import { auth, db } from './firebase.js';
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const box = document.createElement('section');
box.id = 'homeOrderPreview';
box.style.cssText = 'width:min(1200px,calc(100% - 24px));margin:18px auto;padding:18px 20px;background:white;border:1px solid #ffd0e3;border-radius:24px;box-shadow:0 10px 25px rgba(255,85,150,.12);color:#704057;';
box.innerHTML = '<h2 style="color:#d81b60;margin:0 0 8px;">Your Orders</h2><div id="homeOrderContent">Checking orders...</div><p style="margin-top:10px;"><a href="orders.html">View all orders</a></p>';

const header = document.querySelector('.cartoon-nav');
if (header) header.insertAdjacentElement('afterend', box);
else document.body.prepend(box);

const content = document.getElementById('homeOrderContent');

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    content.innerHTML = 'Login to see your orders.';
    return;
  }

  try {
    const q = query(collection(db, 'orders'), where('userEmail', '==', user.email));
    const snap = await getDocs(q);

    if (snap.empty) {
      content.innerHTML = '<strong>No orders yet.</strong>';
      return;
    }

    let html = '';
    let count = 0;
    snap.forEach((docSnap) => {
      if (count >= 3) return;
      const order = docSnap.data();
      html += '<div style="margin:8px 0;padding:10px;border-radius:14px;background:#fff8fb;border:1px solid #ffd0e3;"><strong>' + (order.product || 'Order') + '</strong><br>Status: ' + (order.orderStatus || 'pending') + '<br>Payment: ' + (order.paymentStatus || 'pending') + '</div>';
      count++;
    });
    content.innerHTML = html;
  } catch (error) {
    content.innerHTML = 'Could not load orders.';
  }
});
