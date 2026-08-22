
(function(){
  var root=document.documentElement;
  var saved=null; try{saved=localStorage.getItem('guia-theme');}catch(e){}
  if(saved) root.setAttribute('data-theme',saved);
  var tbtn=document.getElementById('theme');
  function label(){
    var d=root.getAttribute('data-theme');
    var dark = d==='dark' || (!d && matchMedia('(prefers-color-scheme: dark)').matches);
    tbtn.textContent = dark ? '☀' : '☾';
  }
  label();
  tbtn.addEventListener('click',function(){
    var d=root.getAttribute('data-theme');
    var dark = d==='dark' || (!d && matchMedia('(prefers-color-scheme: dark)').matches);
    var nxt = dark ? 'light':'dark';
    root.setAttribute('data-theme',nxt);
    try{localStorage.setItem('guia-theme',nxt);}catch(e){}
    label();
  });

  function norm(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();}
  var q=document.getElementById('q');
  var tocBox=document.querySelector('.toc');
  var baseHTML=tocBox.innerHTML;
  var IDX=window.__IDX__||[];
  var ready=false;
  function prep(){
    if(ready) return;
    IDX.forEach(function(r){ r._n=norm(r.t+' · '+r.c+' · '+(r.x||'')+' · '+(r.a||'')); });
    ready=true;
  }
  function esc(s){return s.replace(/[&<>"]/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  function snippet(r,v){
    var raw=r.x||''; if(!raw) return '';
    var i=norm(raw).indexOf(v);
    if(i===-1) return '';
    var a=Math.max(0,i-45), b=Math.min(raw.length,i+v.length+95);
    var pre=(a>0?'…':'')+raw.slice(a,i);
    var hit=raw.slice(i,i+v.length);
    var post=raw.slice(i+v.length,b)+(b<raw.length?'…':'');
    return '<span class="sn">'+esc(pre)+'<mark>'+esc(hit)+'</mark>'+esc(post)+'</span>';
  }

  function render(v){
    if(!v||v.length<2){tocBox.innerHTML=baseHTML;wire();return;}
    prep();
    var scored=[];
    for(var i=0;i<IDX.length;i++){
      var r=IDX[i];
      if(r._n.indexOf(v)===-1) continue;
      var sc=0;
      if(norm(r.t).indexOf(v)!==-1) sc+=100;
      if(norm(r.c).indexOf(v)!==-1) sc+=25;
      var body=norm(r.x||'');
      var k=0,pos=body.indexOf(v);
      while(pos!==-1&&k<12){k++;pos=body.indexOf(v,pos+v.length);}
      sc+=Math.min(k,12)*6;
      // el capítulo 0 reproduce el índice completo: coincide con casi todo
      if(r.u.indexOf('cap-00-mapa')===0) sc-=70;
      scored.push([sc,i,r]);
    }
    scored.sort(function(a,b){return b[0]-a[0]||a[1]-b[1];});
    var hits=scored.slice(0,80).map(function(e){return e[2];});
    if(!hits.length){
      tocBox.innerHTML='<div class="toc-part">Sin resultados para “'+esc(q.value)+'”</div>';
      return;
    }
    var by={},order=[];
    hits.forEach(function(r){ if(!by[r.c]){by[r.c]=[];order.push(r.c);} by[r.c].push(r); });
    var out='<div class="toc-part">'+hits.length+(hits.length===80?'+':'')+' resultados</div>';
    order.forEach(function(c){
      out+='<div class="toc-part sub">'+esc(c)+'</div>';
      by[c].forEach(function(r){
        out+='<a class="res" href="'+r.u+'"><span class="rt">'+esc(r.t)+'</span>'+snippet(r,v)+'</a>';
      });
    });
    tocBox.innerHTML=out;
  }
  var t=null;
  q.addEventListener('input',function(){
    clearTimeout(t);
    t=setTimeout(function(){render(norm(q.value.trim()));},140);
  });
  q.addEventListener('keydown',function(e){
    if(e.key==='Escape'){q.value='';render('');q.blur();}
    if(e.key==='Enter'){var a=tocBox.querySelector('a.res'); if(a) a.click();}
  });
  document.addEventListener('keydown',function(e){
    if((e.key==='/'||((e.metaKey||e.ctrlKey)&&e.key==='k')) && document.activeElement!==q){
      e.preventDefault();q.focus();q.select();}
  });

  var bar=document.getElementById('bar');
  var heads=[].slice.call(document.querySelectorAll('h2[id],h3[id],h4[id]'));
  var map={},cur=null,ticking=false;
  function wire(){
    map={};
    [].slice.call(tocBox.querySelectorAll('a')).forEach(function(a){
      var h=a.getAttribute('href');
      if(h && h.charAt(0)==='#') map[h.slice(1)]=a;
    });
  }
  wire();
  function onScroll(){
    if(ticking) return; ticking=true;
    requestAnimationFrame(function(){
      var st=window.scrollY||document.documentElement.scrollTop;
      var h=document.documentElement.scrollHeight-window.innerHeight;
      if(bar) bar.style.width=(h>0?(st/h*100):0)+'%';
      var tp=document.getElementById('top');
      if(tp) tp.classList.toggle('show', st>700);
      var best=null;
      for(var i=0;i<heads.length;i++){
        if(heads[i].getBoundingClientRect().top<=110) best=heads[i]; else break;
      }
      if(best && best.id!==cur){
        if(cur&&map[cur]) map[cur].classList.remove('active');
        cur=best.id;
        if(map[cur]){
          map[cur].classList.add('active');
          var r=map[cur].getBoundingClientRect(), rb=tocBox.getBoundingClientRect();
          if(r.top<rb.top+40||r.bottom>rb.bottom-40)
            tocBox.scrollTop += r.top-rb.top-tocBox.clientHeight/2.6;
        }
      }
      ticking=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var tp=document.getElementById('top');
  if(tp) tp.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  var nav=document.querySelector('.nav'), nt=document.getElementById('navtoggle');
  if(nt) nt.addEventListener('click',function(){nav.classList.toggle('open');});
  tocBox.addEventListener('click',function(e){
    if(e.target.tagName==='A'&&window.innerWidth<=1080) nav.classList.remove('open');
  });
  [].slice.call(document.querySelectorAll('main table')).forEach(function(t){
    if(t.parentElement.classList.contains('tw')) return;
    var d=document.createElement('div'); d.className='tw';
    t.parentNode.insertBefore(d,t); d.appendChild(t);
  });
  // llevar el índice a la entrada del capítulo actual
  var c=tocBox.querySelector('a.cur');
  if(c) tocBox.scrollTop = Math.max(0, c.offsetTop - 160);
})();
