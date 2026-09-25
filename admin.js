const KEY='smartDukanShops';
const shops=()=>JSON.parse(localStorage.getItem(KEY)||'[]');
function render(){
 const a=shops(), active=a.filter(x=>x.status==='active').length, pending=a.filter(x=>x.status==='pending').length;
 document.getElementById('total').textContent=a.length;document.getElementById('active').textContent=active;document.getElementById('pending').textContent=pending;
 document.getElementById('shops').innerHTML=a.length?a.map(x=>`<div class="card" style="margin:12px 0"><h3>${x.shopName}</h3><p>${x.ownerName} • ${x.mobile}</p><p>UTR: ${x.utr} • Status: <b>${x.status}</b></p><button class="btn" onclick="activate('${x.id}')">Activate</button> <a class="btn secondary" href="shop.html?id=${x.id}">View</a></div>`).join(''):'<p class="muted">Abhi koi registration nahi hai.</p>'}
function activate(id){const a=shops();const x=a.find(s=>s.id===id);if(!x)return;x.status='active';x.startDate=new Date().toISOString().slice(0,10);const d=new Date();d.setFullYear(d.getFullYear()+1);x.expiryDate=d.toISOString().slice(0,10);localStorage.setItem(KEY,JSON.stringify(a));render()}
render();