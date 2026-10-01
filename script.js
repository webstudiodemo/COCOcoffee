gsap.registerPlugin(ScrollTrigger);
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;

function initLenis(){
 if(reduced||typeof Lenis==="undefined") return null;
 const lenis=new Lenis({duration:1.08,smoothWheel:true,wheelMultiplier:.9,touchMultiplier:1.05});
 lenis.on("scroll",ScrollTrigger.update);
 gsap.ticker.add(t=>lenis.raf(t*1000));
 gsap.ticker.lagSmoothing(0);
 return lenis;
}
function initOpening(){
 if(reduced){document.querySelector(".intro")?.remove();return}
 document.body.style.overflow="hidden";
 const intro=document.querySelector(".intro");
 const scene=document.querySelector(".intro-scene");
 const tl=gsap.timeline({defaults:{ease:"power3.out"},onComplete:()=>{document.body.style.overflow="";if(intro)intro.style.pointerEvents="none";ScrollTrigger.refresh()}});
 gsap.set(".intro-product-cookie",{x:-80,y:55,rotateY:-12,rotateZ:-3,scale:1.14,opacity:0});
 gsap.set(".intro-product-croissant",{x:90,y:65,rotateY:14,rotateZ:4,scale:1.14,opacity:0});
 gsap.set(".intro-product-cup",{y:75,scale:.72,rotateZ:-6,opacity:0});
 gsap.set(".intro-word-back",{scale:1.18,opacity:0,filter:"blur(12px)"});
 gsap.set(".intro-word-front",{scale:.88,opacity:0});
 gsap.set(".intro-topline,.intro-caption",{opacity:0});
 tl.to(".intro-word-back",{scale:1,opacity:.92,filter:"blur(0px)",duration:1.05})
   .to(".intro-product-cup",{y:0,scale:1,rotateZ:0,opacity:1,duration:1.25,ease:"expo.out"},"-=.72")
   .to(".intro-product-cookie",{x:0,y:0,rotateY:0,rotateZ:0,scale:1,opacity:1,duration:1.05},"-=.95")
   .to(".intro-product-croissant",{x:0,y:0,rotateY:0,rotateZ:0,scale:1,opacity:1,duration:1.05},"-=.9")
   .to(".intro-word-front",{scale:1,opacity:1,duration:.9},"-=.85")
   .to(".intro-topline,.intro-caption",{opacity:1,duration:.55,stagger:.08},"-=.5")
   .to(".intro-scene",{scale:1.075,z:80,duration:1.05,ease:"power2.inOut"},"+=.45")
   .to(".intro-product-cookie",{x:-35,y:-18,scale:1.05,duration:1.05,ease:"power2.inOut"},"<")
   .to(".intro-product-croissant",{x:38,y:18,scale:1.07,duration:1.05,ease:"power2.inOut"},"<")
   .to(".intro-product-cup",{scale:1.12,y:-8,duration:1.05,ease:"power2.inOut"},"<")
   .to(".intro",{clipPath:"inset(0 0 100% 0)",duration:1.05,ease:"power4.inOut"},"-=.18");
 if(matchMedia("(hover:hover) and (pointer:fine)").matches&&scene){
   const layers=[[".intro-word-back",5],[".intro-product-cookie",11],[".intro-product-cup",7],[".intro-product-croissant",13],[".intro-word-front",3]];
   intro.addEventListener("pointermove",e=>{const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;layers.forEach(([sel,d])=>gsap.to(sel,{x:nx*d,y:ny*d,duration:.75,ease:"power3.out",overwrite:"auto"}))});
 }
}
function initHero(){
 if(reduced)return;
 gsap.to(".hero-media",{yPercent:18,scale:1.045,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
 gsap.from(".hero-copy>*",{y:42,opacity:0,stagger:.11,duration:1,ease:"power3.out",delay:2.15});
}
function initPinnedReveal(){
 if(reduced)return;
 const mm=gsap.matchMedia();
 mm.add("(min-width: 801px)",()=>{
  const frame=document.querySelector(".cinema-frame");
  gsap.timeline({scrollTrigger:{trigger:".cinema",start:"top top",end:"bottom bottom",scrub:1,pin:frame,anticipatePin:1}})
   .to(frame,{width:"100vw",height:"100svh",left:0,top:0,ease:"none"})
   .to(".cinema-image",{scale:1.08,ease:"none"},0);
 });
}
function initHorizontal(){
 if(reduced)return;
 gsap.matchMedia().add("(min-width: 801px)",()=>{
  const track=document.querySelector(".collection-track"); if(!track)return;
  const distance=()=>Math.max(0,track.scrollWidth-innerWidth);
  gsap.to(track,{x:()=>-distance(),ease:"none",scrollTrigger:{trigger:".collection",start:"top top",end:()=>"+="+distance(),scrub:1,pin:true,anticipatePin:1,invalidateOnRefresh:true}});
 });
}
function initReveals(){
 if(reduced)return;
 gsap.from(".statement h2",{y:70,opacity:0,scrollTrigger:{trigger:".statement",start:"top 72%",end:"center 50%",scrub:1}});
 gsap.utils.toArray(".quotes blockquote,.visit-info>div").forEach(el=>gsap.from(el,{y:30,opacity:0,duration:.75,scrollTrigger:{trigger:el,start:"top 88%"}}));
}
function initMouse(){
 if(reduced||!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
 const hero=document.querySelector(".hero"), media=document.querySelector(".hero-media"); if(!hero||!media)return;
 const x=gsap.quickTo(media,"x",{duration:.8,ease:"power3.out"}),y=gsap.quickTo(media,"y",{duration:.8,ease:"power3.out"});
 hero.addEventListener("pointermove",e=>{x((e.clientX/innerWidth-.5)*12);y((e.clientY/innerHeight-.5)*8)});
 hero.addEventListener("pointerleave",()=>{x(0);y(0)});
}
function initAnchors(lenis){
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const el=document.querySelector(a.getAttribute("href"));if(!el)return;e.preventDefault();lenis&&!reduced?lenis.scrollTo(el,{offset:-30}):el.scrollIntoView({behavior:reduced?"auto":"smooth"})}));
}
const lenis=initLenis();initOpening();initHero();initPinnedReveal();initHorizontal();initReveals();initMouse();initAnchors(lenis);

const menuData={
coffee:{title:"Espresso Bar",note:"Klasiklerden COCO dokunuşlarına; espresso bazlı kahveler ve yavaş demlemeler.",items:[
["Espresso","140₺","Yoğun taze çekilmiş kahve"],["Americano","190₺","Espresso ve sıcak su"],["Latte Macchiato","220₺","Sıcak süt kreması, espresso"],["Coffee Latte","220₺","Espresso ve sıcak süt kreması"],["Capuccino","220₺","Espresso, süt köpüğü ve sıcak süt"],["Flat White","240₺","Yoğun espresso, ince kremalı sıcak süt"],["Cortado","230₺","Yoğun espresso, az miktarda sıcak süt"],["Red Eye","250₺","Filtre kahve ve tek shot espresso"],["Dirty Chai","270₺","Chai Tea Latte ve tek shot espresso"],["Coffee Mocha","270₺","Nutella / White / Caramel"],["Toffee Nut Latte","270₺","Espresso, süt kreması, karamel ve fındık"],["Affogato","300₺","Çift shot espresso ve 80 gr dondurma"],["Türk Kahvesi","150₺","Klasik Türk kahvesi"],["Double Türk Kahvesi","190₺","Büyük boy klasik Türk kahvesi"],["Filtre Kahve","190₺","Taze demlenmiş kahve"],["Cold Brew","250₺","24 saat soğuk suda demlenir"],["V60","300₺","Endonezya Ciblek / Guatemala Antigua SHB"]]},
drinks:{title:"İçecekler",note:"Bitki çaylarından matcha ve COCO'nun ev yapımı soğuk içeceklerine.",items:[
["Siyah Çay","60₺ / 120₺","Taze demlenmiş"],["Refresh Tea","220₺","Siyah çay, rooibos, kakao, tarçın, hindistan cevizi"],["Happy Tea","220₺","Çilek, honeybush, nane, elma"],["Mystic Tea","220₺","Mango, elma, hindistan cevizi, zerdeçal, yeşil çay"],["Boost Tea","220₺","Zencefil, kuşburnu, ekinezya, elma, mürver"],["Relax Tea","220₺","Rooibos, papatya, lavanta, elma, vanilya"],["Matcha Latte","250₺ / 320₺","Strawberry / Banana honey / Vanilya seçenekleri"],["Golden Milk","210₺","Zencefil, zerdeçal, karabiber, tarçın"],["Sıcak Çikolata","210₺",""],["Beyaz Çikolata","210₺",""],["Chai Tea Latte","210₺","Yenilenmiş tarif"],["Salep","210₺",""],["Su","50₺","Uludağ Premium"],["Ayran","70₺",""],["Churchill","120₺","Maden suyu, tuz, limon"],["Gazlı İçecek","80₺","Kola / Portakal / Gazoz"],["Coco's Homemade Ice Tea","240₺","Narlı hindistan cevizli, misket limonlu, şeftalili"],["Limonata","210₺","Mevsiminde, ev yapımı"],["Maden Suyu","60₺","Beypazarı"],["%100 Meyve Suyu","180₺","Organik narlı / Exotic"],["Coco's Special Cocktail","240₺","Yeşil elma veya çilek"],["Strawberry Coc.","250₺","Taze çilek, nane şurubu, taze limon"],["Berry Coc.","275₺","Kırmızı meyve, badem sütü, muz"],["Happy Green Coc.","275₺","Yeşil elma, portakal, limon, dondurma"]]},
breakfast:{title:"Kahvaltı / Sandviç",note:"El yapımı ekmekler, yumurta, avokado ve gün boyu iyi hissettiren tabaklar.",items:[
["Kahvaltı Tabağı","600₺","Kruvasan, füme etler, peynirler, yumurta, çay ve mevsim yeşillikleri","","https://static.wixstatic.com/media/81add0_f7ac771a10b546ac8b93823d75eb7df9~mv2.jpg"],["Double Side Breakfast","500₺","Ciabatta, labne, domates, avokado sos, çırpılmış yumurta","","https://static.wixstatic.com/media/81add0_d0f9b174a385452f990ba81c1bc1dae3~mv2.jpg"],["Kruvasan Kahvaltı","500₺","Kruvasan, avokado sos, yumurta, kaşar, yeşillik","","https://static.wixstatic.com/media/81add0_c32f7c30545740aba76ff4e23a3955ca~mv2.jpg"],["Ekmek Üstü Avokado & Göz Yumurta","400₺","Ekşi mayalı köy ekmeği, avokado, iki göz yumurta","","https://static.wixstatic.com/media/81add0_0935d0404864453da3829d61f9cd2fac~mv2.jpg"],["Porridge Bowl","420₺","Yulaf, chia, bitter çikolata, fıstık ezmesi, meyve","","https://static.wixstatic.com/media/81add0_d1e866c3dc8c4edb848096f4e28e4bc3~mv2.jpg"],["Granola Kase","420₺","Ev yapımı granola, süzme yoğurt, badem, meyve, chia","","https://static.wixstatic.com/media/81add0_d4308b5b80164910940fb36fe1fecba4~mv2.jpg"],["Focaccia Sandviç","480₺","El yapımı focaccia, hellim, hindi füme, avokado, acı sos","","https://static.wixstatic.com/media/81add0_43a89b3c28524785bc899888ee577fc7~mv2.jpg"],["Hindi Fümeli Ciabatta","400₺","Hindi füme, kaşar, mevsim yeşillikleri, acı sos","","https://static.wixstatic.com/media/81add0_fefa814070a3492f816b82c4b0107061~mv2.jpg"],["Kaburga Fümeli Ciabatta","400₺","Kaburga füme, çedar, yeşillik, acı sos","","https://static.wixstatic.com/media/81add0_f4d652d4e80b4f93aa12b278e941889b~mv2.jpg"],["Hellimli Ciabatta","400₺","Izgara hellim, çeri domates, yeşillik, avokado sos","","https://static.wixstatic.com/media/81add0_fc669c7be8b642ffa77cc779fc5af6af~mv2.jpg"]]},
croissant:{title:"Kruvasanlar",note:"Taze pişen, tereyağlı katmanlar; tatlı ve tuzlu COCO yorumları.",items:[
["Sade Kruvasan","210₺","Süt reçeli ile","","https://static.wixstatic.com/media/81add0_19b1fb4eeac443719bbaa8a1d3144411~mv2.jpg"],["Kaburga Füme Kruvasan","400₺","Kaburga füme, cheddar, roka, acılı dip sos","","https://static.wixstatic.com/media/81add0_b0080a23d04a4ce49182e776f928070f~mv2.jpg"],["Hindi Füme Kruvasan","400₺","Hindi füme, kaşar, roka, acılı dip sos","","https://static.wixstatic.com/media/81add0_ba58fce72b214b74b915fe5e2494e84c~mv2.jpg"],["Üç Peynirli Kruvasan","400₺","Çedar, kaşar, hellim, roka","","https://static.wixstatic.com/media/81add0_4519c36155f24835ad2b0319fde3f8f0~mv2.jpg"],["Fıstık Ezmeli Kruvasan","440₺","Pastacı kreması, %100 yer fıstığı ezmesi, muz","","https://static.wixstatic.com/media/81add0_fcdd09fae5fb45f9a307973703b266d4~mv2.jpg"],["Çikolatalı Kruvasan","440₺","Çikolatalı ganaj, muz, çilek, file fındık","","https://static.wixstatic.com/media/81add0_a00a0d1884d84aaa9aa5d138ef81067c~mv2.jpg"],["Pastacı Kremalı Kruvasan","420₺","Pastacı kreması, muz, çilek, file badem","","https://static.wixstatic.com/media/81add0_e5e12602d48842378abaa60877e3f5d9~mv2.jpg"],["Nutellalı Kruvasan","440₺","Nutella, muz, çilek, file fındık","","https://static.wixstatic.com/media/81add0_a00a0d1884d84aaa9aa5d138ef81067c~mv2.jpg"],["Lotuslu Kruvasan","480₺","Pastacı kreması, muz, Lotus bisküvisi ve kreması","","https://static.wixstatic.com/media/81add0_f2df443a6ae74681a0457993b0533a32~mv2.jpg"],["Antep Fıstıklı Kruvasan","500₺","Antep fıstıklı pastacı kreması, boz fıstık, muz, bal","","https://static.wixstatic.com/media/81add0_d6a40ddbf76244878d86a07bcd8a1ea8~mv2.jpg"],["Double Side Kruvasan","540₺","Pastacı kremalı ve çikolata ganajlı iki taraf","","https://static.wixstatic.com/media/81add0_765a9b3dd5e243bc84ebf2703e7b5035~mv2.jpg"],["Waffle Bowl","560₺","Çıtır kruvasan, muz, çilek, Nutella, dondurma, fıstık","","https://static.wixstatic.com/media/81add0_4bd1bf3e69e842f99dbafa7b7435ebe1~mv2.jpg"],["Orman Meyveli Kruvasan","540₺","Orman meyveli krema, çilek, ruby ve beyaz çikolata","","https://static.wixstatic.com/media/81add0_a3400f861f624aeeb692248b2ce269cb~mv2.jpg"]]},
bowls:{title:"Doyurucu Tabaklar",note:"Mevsim sebzeleri, protein ve dengeli tabaklar. Servis süresi 20–30 dakika.",items:[
["Kinoalı Nohutlu Tabak","480₺","Beyaz kinoa, mevsim yeşillikleri, sebzeler, baharatlı nohut","","https://static.wixstatic.com/media/81add0_69b84011e8a0458094fd8184afaa2185~mv2.jpg"],["Kinoalı Tavuklu Tabak","500₺","Beyaz kinoa, yeşillik, sebze ve 150 gr kızarmış tavuk","","https://static.wixstatic.com/media/81add0_110570f09ef5414eabf911317dd92ade~mv2.jpg"],["Basmati Bowl","500₺","Basmati, mısır, mor lahana, sebze, susamlı ballı soya tavuk","","https://static.wixstatic.com/media/81add0_8fc3862cf0f743e3afa10315e18e8f46~mv2.jpg"],["Protein Bowl","540₺","Yeşillik, avokado, yumurta, hellim, nohut, siyez ekmeği","","https://static.wixstatic.com/media/81add0_c04d212eea6a45ab960646fdb35b9651~mv2.png"],["Köfte Bowl","690₺","Basmati, salata, sebze, yoğurt dip ve fıstıklı dana köfte","","https://static.wixstatic.com/media/81add0_4c7b35b0025f494f8f6359248ca47c64~mv2.jpeg"],["Coco's Fettuccine","480₺","Fettuccine, özel krema sosu, 150 gr tavuk, baharatlar","","https://static.wixstatic.com/media/81add0_bb5bed13538142f7b02c9b78a8dec904~mv2.jpg"],["Kızarmış Peynirli Salata","450₺","Yeşillik, 100 gr hellim, siyez ekmeği, yeşil elma","","https://static.wixstatic.com/media/81add0_4e673efe31e448d39f138285ed5598f5~mv2.jpg"],["Vegan Proteinli Salata","420₺","Yeşillik, sebzeler, siyez ekmeği, baharatlı nohut","","https://static.wixstatic.com/media/81add0_778c4aa8295c4583a464f88ffa8c27f1~mv2.jpg"],["Tavuklu Salata","450₺","Yeşillik, sebzeler, siyez ekmeği, 150 gr tavuk","","https://static.wixstatic.com/media/81add0_28117a5269194131be491202fb4837f4~mv2.jpg"]]},
dessert:{title:"COCO Tatlıları",note:"Tamamen kendi yapımları. Taze ve günlük üretim; tereyağı ve zeytinyağı kullanılıyor.",items:[
["Tadım Tabağı","1200₺","Brownie, profiterol, golden cookie, kruvasan ve Callebaut çikolatalar","","https://static.wixstatic.com/media/81add0_303a3978922b4991ae29014250c334eb~mv2.jpg"],["Waffle Bowl","560₺","Çıtır kruvasan, muz, çilek, Nutella, beyaz çikolata, dondurma, fıstık"],["Coco's Mekik","420₺","Antep fıstıklı kek, ev yapımı ahududu reçeli, beyaz Belçika çikolatası","NEW","https://static.wixstatic.com/media/81add0_e5a58ad00a104bfb979e7238809a1c84~mv2.jpg"],["Anteplim","420₺","Pastacı kreması, Antep fıstığı kreması, çıtır kadayıf, Belçika çikolatası","","https://static.wixstatic.com/media/81add0_24633be9c75b407aa3f39273af6371ab~mv2.jpg"],["Coco's Tiramisu","420₺","Brownie, taze espresso, mascarpone kreması, kakao","","https://static.wixstatic.com/media/81add0_47f33f91e367449baca67756217d23b5~mv2.jpg"],["Lotus Cup","420₺","Lotus kreması ve bisküvisi, muz, çilek, pastacı kreması","","https://static.wixstatic.com/media/81add0_1679f384fb5048f4b076e47f3de3f866~mv2.jpg"],["San Sebastian Cheesecake","360₺","COCO'nun meşhur Sebastian'ı, çikolata sos ile","","https://static.wixstatic.com/media/81add0_26ce19bc09ac4cf9b27fe0730ad3ae7e~mv2.jpg"],["Brownie","360₺","Beyaz çikolatalı, dondurma ile","","https://static.wixstatic.com/media/81add0_876512f6c02a4680b06f63370f178b68~mv2.jpg"],["Profiterol","390₺","Bol çikolata soslu, pastacı kremalı üç top profiterol","","https://static.wixstatic.com/media/81add0_70cd516b809644859f70f9de4806ea70~mv2.jpg"],["Magnolia","350₺","Muz, çilek, magnolya kreması, bisküvi, Antep fıstığı","","https://static.wixstatic.com/media/81add0_9fd479aeb7e540f6a5a8f6a5d630e5e6~mv2.jpg"],["Vegan Bar","360₺","Bademli, kırmızı meyveli, rafine şekersiz, glutensiz, vegan","","https://static.wixstatic.com/media/81add0_c3ebcb20e63b4ff3b64ee5c8cae539de~mv2.jpg"],["Golden / Dark Cookie","150₺","Bol çikolatalı tereyağlı COCO kurabiyeleri · 55 gr","","https://static.wixstatic.com/media/81add0_8643d0f6afcc4c51a45bab0b182ae982~mv2.jpg"]]}
};
function renderMenu(key,animate=true){const d=menuData[key],grid=document.querySelector("#product-grid");if(!grid)return;const paint=()=>{document.querySelector("#menu-category-title").textContent=d.title;document.querySelector("#menu-category-note").textContent=d.note;document.querySelector("#menu-count").textContent="01 — "+String(d.items.length).padStart(2,"0");grid.innerHTML=d.items.map((x,i)=>`<article class="product-item ${x[4]?"has-image":""}">${x[4]?`<div class="product-photo" style="background-image:url('${x[4]}')"></div>`:""}<span class="product-index">${String(i+1).padStart(2,"0")}</span><div class="product-copy">${x[3]?`<span class="product-new">${x[3]}</span>`:""}<div class="product-title-row"><h4 class="product-title">${x[0]}</h4><strong class="product-price">${x[1]}</strong></div><p class="product-desc">${x[2]||""}</p></div></article>`).join("");if(!reduced&&animate)gsap.fromTo(".product-item",{y:34,opacity:0},{y:0,opacity:1,duration:.65,stagger:.045,ease:"power3.out"});ScrollTrigger.refresh()};if(!reduced&&animate){gsap.to(grid,{opacity:0,y:14,duration:.22,onComplete:()=>{paint();gsap.to(grid,{opacity:1,y:0,duration:.28})}})}else paint()}
document.querySelectorAll(".menu-tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".menu-tab").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderMenu(btn.dataset.category)}));renderMenu("coffee",false);
