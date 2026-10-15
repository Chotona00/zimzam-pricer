/* EN/ES switch: every translatable element carries data-es (Spanish); English is the page text. */
(function(){var KEY='zzpro_lang';function apply(l){document.documentElement.lang=l;document.querySelectorAll('[data-es]').forEach(function(el){if(!el.dataset.en)el.dataset.en=el.innerHTML;el.innerHTML=l==='es'?el.dataset.es:el.dataset.en});
  document.querySelectorAll('[data-es-href]').forEach(function(a){if(!a.dataset.enHref)a.dataset.enHref=a.getAttribute('href');a.setAttribute('href',l==='es'?a.dataset.esHref:a.dataset.enHref)});
  var b=document.getElementById('lang');if(b)b.textContent=l==='es'?'EN':'ES';try{localStorage.setItem(KEY,l)}catch(e){}}
var l='en';try{l=localStorage.getItem(KEY)||((navigator.language||'').slice(0,2)==='es'?'es':'en')}catch(e){}
var q=(location.search.match(/[?&]lang=(en|es)/)||[])[1];if(q)l=q;
document.addEventListener('DOMContentLoaded',function(){apply(l);var b=document.getElementById('lang');if(b)b.onclick=function(){l=l==='es'?'en':'es';apply(l)}})})();
