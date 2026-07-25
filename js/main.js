// Scroll-to-top
$(document).ready(function(){ $().UItoTop({easingType:'easeOutQuart'}); });
// Filterizr
$(function(){ $('.filtr-container').filterizr(); });
// Swipebox
jQuery(function($){ $('.swipebox').swipebox(); });
// miSlider
jQuery(function($){ $('.mis-stage').miSlider({stageHeight:320,slidesOnStage:false,slidePosition:'center',slideStart:'mid',slideScaling:150,offsetV:-5,centerV:true,navButtonsOpacity:1}); });

// Navbar
(function(){
  var $w=$(window), $nav=$('.header-nav'), isFixed=false, ticking=false;
  var $navLinks=$('.nav.navbar-nav li');

  function updateNav(scrollTop){
    if(scrollTop>300&&!isFixed){ $nav.addClass('menu_fixed'); isFixed=true; }
    else if(scrollTop<=300&&isFixed){ $nav.removeClass('menu_fixed'); isFixed=false; }
    var $sections=$('[section-scroll]'), idx=-1, off=scrollTop+180;
    $sections.each(function(i){ if($(this).offset().top<=off) idx=i; });
    $navLinks.find('a').removeClass('active');
    if(idx>=0) $navLinks.eq(idx+1).find('a').addClass('active');
    else $navLinks.eq(0).find('a').addClass('active');
    ticking=false;
  }

  $w.on('scroll',function(){
    if(!ticking){ requestAnimationFrame(function(){ updateNav($w.scrollTop()); }); ticking=true; }
  });
  updateNav($w.scrollTop());
  $w.on('resize',function(){ updateNav($w.scrollTop()); });

  $nav.on('click','li a.scroll',function(e){
    e.preventDefault();
    var t=$('[section-scroll="'+$(this).attr('href')+'"]');
    if(t.length) $('html,body').stop().animate({scrollTop:t.offset().top-130},800,'easeInOutCubic');
  });
  $nav.on('click','li a.scroll-home',function(e){
    e.preventDefault();
    $('html,body').stop().animate({scrollTop:0},600,'easeInOutCubic');
  });
})();

// iUp
(function(){
  var els=document.querySelectorAll('.iUp');
  if(!els.length) return;
  var pending=[].slice.call(els), ticking=false;
  function reveal(){
    var vh=window.innerHeight;
    for(var i=pending.length-1;i>=0;i--){
      if(pending[i].getBoundingClientRect().top<vh+60){ pending[i].classList.add('up'); pending.splice(i,1); }
    }
    if(!pending.length) window.removeEventListener('scroll',onScroll);
    ticking=false;
  }
  function onScroll(){ if(!ticking){ requestAnimationFrame(reveal); ticking=true; } }
  window.addEventListener('scroll',onScroll,{passive:true});
  setTimeout(reveal,200);
})();

// ========== 手机端独立导航 ==========
(function(){
  if(window.innerWidth>767) return;
  var btn=document.querySelector('.navbar-toggle');
  var links=document.querySelectorAll('.nav.navbar-nav li a');
  if(!btn||!links.length) return;

  // 建菜单
  var menu=document.createElement('div');
  menu.id='mnav';
  var s=menu.style;
  s.cssText='display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#fff;z-index:99999;padding:60px 0 0;overflow-y:auto;font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;';

  // 关闭按钮
  var cls=document.createElement('div');
  cls.textContent='×';
  cls.style.cssText='position:absolute;top:12px;right:18px;font-size:32px;color:#27AE60;cursor:pointer;line-height:1;z-index:1;';
  cls.onclick=function(){ menu.style.display='none'; document.body.style.overflow=''; };
  menu.appendChild(cls);

  // 链接
  for(var i=0;i<links.length;i++){
    var a=document.createElement('a');
    a.textContent=links[i].textContent;
    a.href=links[i].getAttribute('href')||'#';
    a.style.cssText='display:block;padding:14px 20px;color:#2c3e50;font-size:17px;text-align:center;border-bottom:1px solid #f0f0f0;text-decoration:none;';
    a.onclick=function(e){
      e.preventDefault();
      menu.style.display='none'; document.body.style.overflow='';
      var h=this.getAttribute('href');
      if(h==='#'||h==='index.html') window.scrollTo({top:0,behavior:'smooth'});
      else{var t=document.querySelector('[section-scroll="'+h+'"]');if(t)setTimeout(function(){window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-10,behavior:'smooth'});},100);}
    };
    menu.appendChild(a);
  }

  document.body.appendChild(menu);

  // 汉堡点击
  btn.onclick=function(e){
    e.preventDefault();e.stopPropagation();
    menu.style.display='block'; document.body.style.overflow='hidden';
  };

  // 同时隐藏Bootstrap折叠
  var bs=document.getElementById('bs-example-navbar-collapse-1');
  if(bs) bs.style.display='none';
})();
