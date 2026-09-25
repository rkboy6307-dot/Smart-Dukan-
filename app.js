const KEY='smartDukanShops';
const demo={id:'demo',shopName:'Rahul Garments',ownerName:'Rahul',mobile:'9876543210',whatsapp:'9876543210',address:'Kanpur, Uttar Pradesh',mapLink:'https://maps.google.com/',about:'Men\'s wear, jeans, shirts aur T-shirts.',opening:'10:00',closing:'21:00',products:'Shirts, Jeans, T-Shirts, Trousers',reviewLink:'https://www.google.com/',status:'active',utr:'DEMO',startDate:'2026-09-25',expiryDate:'2027-09-25'};
function getShops(){return JSON.parse(localStorage.getItem(KEY)||'[]')}
function saveShops(x){localStorage.setItem(KEY,JSON.stringify(x))}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
function renderShop(){
 const el=document.getElementById('app'); if(!el)return;
 const id=new URLSearchParams(location.search).get('id')||'demo';
 let shop=id==='demo'?demo:getShops().find(x=>x.id===id);
 if(!shop){el.innerHTML='<div class="card"><h2>Shop nahi mili</h2><a class="btn" href="index.html">Home</a></div>';return}
 const wa=(shop.whatsapp||shop.mobile||'').replace(/\D/g,'');
 const products=(shop.products||'').split(',').map(x=>x.trim()).filter(Boolean);
 el.innerHTML=`<div class="card shophead"><div class="shoplogo">${(shop.shopName||'SD').slice(0,2).toUpperCase()}</div><h1>${shop.shopName}</h1><p>${shop.about||''}</p><div class="shop-actions"><a href="tel:${shop.mobile}">📞 Call</a><a href="https://wa.me/91${wa}" target="_blank">💬 WhatsApp</a><a href="${shop.mapLink||'#'}" target="_blank">📍 Directions</a><a href="${shop.reviewLink||'#'}" target="_blank">⭐ Review</a></div></div>
 <div class="card"><h2>Products / Categories</h2><div class="products">${products.map(p=>`<span class="pill">${p}</span>`).join('')||'<span class="muted">Products coming soon</span>'}</div><h2>Shop Details</h2><p>📍 ${shop.address||''}</p><p>🕒 ${shop.opening||'—'} - ${shop.closing||'—'}</p><button class="btn" onclick="navigator.clipboard?.writeText(location.href);this.innerText='Link Copied ✓'">🔗 Share Shop</button></div>`}
function initReg(){
 const f=document.getElementById('regForm');if(!f)return;
 f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));d.id=slug(d.shopName)+'-'+Date.now();d.status='pending';d.startDate='';d.expiryDate='';const shops=getShops();shops.push(d);saveShops(shops);document.getElementById('result').innerHTML='<div class="card"><h3>✅ Registration received</h3><p>Aapka form save ho gaya. Payment verify hone ke baad shop activate ki jayegi.</p></div>';f.reset();}
}
renderShop();initReg();