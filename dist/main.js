"use strict";(()=>{var c="kakeibo_transactions",d=class{getTransactions(){let t=localStorage.getItem(c);return t?JSON.parse(t):[]}addTransaction(t){let o=this.getTransactions();o.push(t),localStorage.setItem(c,JSON.stringify(o))}deleteTransaction(t){let o=this.getTransactions().filter(a=>a.id!==t);localStorage.setItem(c,JSON.stringify(o))}},s=new d;var p=["\u7D66\u6599","\u526F\u696D","\u6295\u8CC7","\u305D\u306E\u4ED6"],g=["\u98DF\u8CBB","\u4F4F\u5C45\u8CBB","\u4EA4\u901A\u8CBB","\u5A2F\u697D","\u65E5\u7528\u54C1","\u305D\u306E\u4ED6"];function l(e){let t=document.getElementById("category"),o=e==="income"?p:g;t.innerHTML=o.map(a=>`<option value="${a}">${a}</option>`).join("")}function u(e,t){let o=document.getElementById("transaction-list"),a=[...e].sort((n,r)=>new Date(r.date).getTime()-new Date(n.date).getTime());if(a.length===0){o.innerHTML='<p class="text-gray-500 text-center py-8">\u53D6\u5F15\u304C\u3042\u308A\u307E\u305B\u3093</p>';return}o.innerHTML=a.map(n=>`
      <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 text-xs rounded ${n.type==="income"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}">
              ${n.type==="income"?"\u53CE\u5165":"\u652F\u51FA"}
            </span>
            <span class="text-sm text-gray-500">${n.date}</span>
            <span class="text-sm text-gray-600">${n.category}</span>
          </div>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-lg font-semibold ${n.type==="income"?"text-green-600":"text-red-600"}">
              ${n.type==="income"?"+":"-"}${n.amount.toLocaleString()}\u5186
            </span>
            ${n.memo?`<span class="text-sm text-gray-500">${n.memo}</span>`:""}
          </div>
        </div>
        <button
          data-delete-id="${n.id}"
          class="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="\u524A\u9664"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    `).join(""),o.querySelectorAll("[data-delete-id]").forEach(n=>{n.addEventListener("click",()=>{let r=n.dataset.deleteId;confirm("\u3053\u306E\u53D6\u5F15\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F")&&t(r)})})}function T(e){let t=e.filter(r=>r.type==="income").reduce((r,i)=>r+i.amount,0),o=e.filter(r=>r.type==="expense").reduce((r,i)=>r+i.amount,0),a=t-o;document.getElementById("total-income").textContent=`+${t.toLocaleString()}\u5186`,document.getElementById("total-expense").textContent=`-${o.toLocaleString()}\u5186`;let n=document.getElementById("balance");n.textContent=`${a>=0?"+":""}${a.toLocaleString()}\u5186`,n.className=a>=0?"text-3xl font-bold text-green-600":"text-3xl font-bold text-red-600"}function y(){let e=document.getElementById("type").value,t=parseInt(document.getElementById("amount").value,10),o=document.getElementById("category").value,a=document.getElementById("date").value,n=document.getElementById("memo").value;return!t||t<=0||!a?(alert("\u91D1\u984D\u3068\u65E5\u4ED8\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"),null):{type:e,amount:t,category:o,date:a,memo:n}}function E(){document.getElementById("amount").value="",document.getElementById("memo").value=""}function x(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}function m(){let e=s.getTransactions();u(e,v),T(e)}function v(e){s.deleteTransaction(e),m()}function f(e){e.preventDefault();let t=y();if(!t)return;let o={...t,id:x(),createdAt:new Date().toISOString()};s.addTransaction(o),E(),m()}function I(e){let t=e.target.value;l(t)}function S(){let e=document.getElementById("transaction-form"),t=document.getElementById("type"),o=document.getElementById("date");o.value=new Date().toISOString().split("T")[0],l("expense"),e.addEventListener("submit",f),t.addEventListener("change",I),m()}document.addEventListener("DOMContentLoaded",S);})();
