import React, {useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import {initHeroFx} from './fx.js';

const getTheme=()=>{try{const t=localStorage.getItem('theme');if(t==='dark'||t==='light')return t}catch(e){}return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'};
const getLang=()=>{try{const l=localStorage.getItem('lang');if(l==='ar'||l==='en')return l}catch(e){}return (navigator.language||'').toLowerCase().startsWith('ar')?'ar':'en'};
const applyLang=l=>{document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.title=l==='ar'?'عمر بازيد | واجهات أمامية وتجارة إلكترونية':'Omar Bazeed | Frontend & E-commerce'};
document.documentElement.dataset.theme=getTheme();
applyLang(getLang());
const github='https://github.com/OmarBazeed';
const linkedin='https://www.linkedin.com/in/omar-bazeed-516437246/';

const projects=[
 {id:'01',key:'nylon',category:'Commerce',featured:true,image:'nylon-store.webp',demo:'https://www.nylonsa.com/'},
 {id:'02',key:'pm',category:'Web',image:'prohect stystem.webp',repo:'project-mangement-system',demo:'https://project-mange-sys.netlify.app/'},
 {id:'03',key:'food',category:'Web',image:'food app.webp',repo:'food-app-react',demo:'https://food-app-mangement.netlify.app/'},
 {id:'04',key:'estate',category:'Web',image:'real-estate.webp',repo:'Real-Estate-App-Nextjs-API',demo:'https://ob-real-estate-nextjs-api.netlify.app/'}
];

const T={
en:{
 skip:'Skip to content',home:'Omar Bazeed home',name:'Omar Bazeed',menu:'Menu',close:'Close',
 nav:[['work','Work'],['commerce','E-commerce'],['showreel','Showreel'],['about','About']],talk:"Let's talk",
 eyebrow:'FRONTEND DEVELOPER + E-COMMERCE STORE MANAGER',
 h1:<>Interfaces with purpose.<br/><em>Stores that work.</em></>,
 intro:"I'm Omar Bazeed, a frontend developer with a focus on e-commerce store management. I connect the interface with the work behind the store.",
 explore:'Explore my work',linkedin:'LinkedIn',heroNote:'React · JavaScript · TypeScript · E-commerce',
 visual:'THE PERSON BEHIND THE PIXELS',cardLabel:'TWO CONNECTED DISCIPLINES',card:<>Build the experience.<br/>Understand the business.</>,
 strip:['Responsive interfaces','E-commerce experiences','Practical problem solving'],
 workEy:'01 / SELECTED WORK',workH:<>A closer look at<br/>what I've built.</>,workP:'One real-world store project, followed by three selected development projects. Each is labeled to make the context clear.',
 filterLabel:'Filter selected projects',filters:[['All','All'],['Commerce','Commerce'],['Web','Web applications']],
 featured:'FEATURED',realWork:'REAL-WORLD WORK',viewSrc:t=>'View '+t+' source code',openDemo:'Open demo',viewCode:'View code',
 myRole:'My role',roleV:'Store manager & frontend developer',collab:'Collaboration',collabV:'App updates with a Flutter developer, not a claim of sole app development.',visitNylon:'Visit NYLON store',
 nylonNote:'Live storefront capture · 23 Nov 2026. My responsibilities are described here, not a claim of sole authorship of every store element.',
 nylonAlt:'NYLON live Arabic storefront, captured from nylonsa.com',previewAlt:t=>t+' interface preview',
 p:{
  nylon:{title:'NYLON',stack:['OpenCart','Store operations','Frontend','AI-assisted workflows'],text:'Store management and frontend development, with AI-assisted work on the website backend and database. I also manage and update the NYLON app alongside a Flutter developer.'},
  pm:{title:'Project management system',stack:['React','TypeScript','Bootstrap'],text:'A collaborative application with authentication, manager and employee roles, and CRUD workflows for users, projects and tasks.',note:'Team project. My exact contribution will be detailed in the final case study. Demo opens at sign-in.'},
  food:{title:'Food management app',stack:['React','JavaScript','Bootstrap'],text:'Authentication, category and recipe management, dashboard modules, shared form context, validation and Axios-based CRUD workflows.',note:'Development project. Demo opens at sign-in.'},
  estate:{title:'Real estate explorer',stack:['Next.js','Chakra UI','Rapid API'],text:'A property-search interface using external listing data, with reusable UI components and formatted property information.',note:'Development project. Listing data is not a claim of real-estate client work.'}
 },
 comEy:'02 / BEYOND THE STOREFRONT',comH:<>A store is more<br/>than its homepage.</>,comLead:'My portfolio brings frontend development and e-commerce store management together, rather than treating them as separate worlds.',discuss:'Discuss a role',
 services:[['Frontend development','Responsive interfaces and web applications, with clear layouts and reusable components.'],['E-commerce focus','Storefront projects that connect browsing, product presentation and account experiences.'],['Design & communication','A visual approach to explaining services, supported by the bilingual showreel below.']],
 reelEy:'03 / SERVICES IN MOTION',reelH:<>The bigger picture.<br/>In under a minute.</>,reelP:'A short visual introduction to my e-commerce services, available in English and Arabic.',videoLang:'Video language',
 vidEn:'English services showreel',vidAr:'Arabic services showreel',vidFallback:'Your browser does not support video playback.',
 concept:s=>'SERVICES CONCEPT / '+s+' SEC',vidH:<>From the first<br/>impression to the<br/><em>whole experience.</em></>,
 vidP:'The showreel presents a storefront concept, mobile experiences, AI-assisted tools, visual identity and paid-ad services.',
 vidSum:'Read the video overview',vidDet:"Omar's services concept introduces an e-commerce storefront, a mobile application concept, AI-assisted workflows, graphic design and paid advertising. The closing screen invites viewers to contact Omar on LinkedIn.",
 disc:'NOVA is an illustrative concept. Store visuals and campaign figures in the video are examples, not verified client work or performance results.',
 abEy:'04 / A LITTLE ABOUT ME',abH:<>Technical thinking.<br/><em>A practical mindset.</em></>,
 abLead:'I build frontend projects with React and JavaScript, with work spanning storefronts, dashboards and API-powered applications. My interests also include graphic design and digital marketing.',
 abMuted:'I want my work to be useful, easy to understand and comfortable to use, on a phone as much as on a desktop.',
 toolkit:'My toolkit',tk:[['FRONTEND','React · JavaScript · TypeScript · HTML · CSS'],['APPLICATIONS & STYLING','Redux Toolkit · Next.js · Bootstrap · Sass'],['WORKFLOW','Git · GitHub · REST APIs · Responsive design']],
 ctEy:"05 / LET'S CONNECT",ctH:<>Have a role<br/>in mind<span>?</span></>,ctP:<>Frontend development or e-commerce.<br/>Let's talk about what your team needs.</>,email:'Email Omar',
 footer:'Frontend & E-commerce',top:'Back to top ↑',
 themeToLight:'Switch to light mode',themeToDark:'Switch to dark mode',themeTitleLight:'Light mode',themeTitleDark:'Dark mode',
 langLabel:'العربية',langAria:'Switch to Arabic',mainNav:'Main navigation'
},
ar:{
 skip:'تخطَّ إلى المحتوى',home:'عمر بازيد - الرئيسية',name:'عمر بازيد',menu:'القائمة',close:'إغلاق',
 nav:[['work','الأعمال'],['commerce','التجارة الإلكترونية'],['showreel','الفيديو'],['about','نبذة']],talk:'لنتحدث',
 eyebrow:'مطوّر واجهات أمامية + مدير متاجر إلكترونية',
 h1:<>واجهات بهدف.<br/><em>ومتاجر تعمل.</em></>,
 intro:'أنا عمر بازيد، مطوّر واجهات أمامية مع تركيز على إدارة المتاجر الإلكترونية. أربط بين الواجهة والعمل الذي يقف خلف المتجر.',
 explore:'استعرض أعمالي',linkedin:'لينكدإن',heroNote:'React · JavaScript · TypeScript · التجارة الإلكترونية',
 visual:'الشخص خلف البكسلات',cardLabel:'تخصصان متكاملان',card:<>أبني التجربة.<br/>وأفهم الأعمال.</>,
 strip:['واجهات متجاوبة','تجارب تجارة إلكترونية','حل المشكلات عمليًا'],
 workEy:'01 / أعمال مختارة',workH:<>نظرة أقرب على<br/>ما بنيته.</>,workP:'مشروع متجر حقيقي واحد، يليه ثلاثة مشاريع تطوير مختارة. كل مشروع موضَّح لتتضح طبيعته.',
 filterLabel:'تصفية المشاريع المختارة',filters:[['All','الكل'],['Commerce','تجارة إلكترونية'],['Web','تطبيقات ويب']],
 featured:'مميّز',realWork:'عمل حقيقي',viewSrc:t=>'عرض الكود المصدري لمشروع '+t,openDemo:'فتح العرض',viewCode:'عرض الكود',
 myRole:'دوري',roleV:'مدير متجر ومطوّر واجهات أمامية',collab:'التعاون',collabV:'تحديثات التطبيق بالتعاون مع مطوّر Flutter، وليس تطويرًا منفردًا للتطبيق.',visitNylon:'زيارة متجر NYLON',
 nylonNote:'لقطة من المتجر المباشر · 23 نوفمبر 2026. تصف هذه الصفحة مسؤولياتي، ولا تدّعي أنني المؤلف الوحيد لكل عنصر في المتجر.',
 nylonAlt:'واجهة متجر NYLON العربية المباشرة، لقطة من nylonsa.com',previewAlt:t=>'معاينة واجهة '+t,
 p:{
  nylon:{title:'NYLON',stack:['OpenCart','إدارة المتجر','واجهات أمامية','عمل بمساعدة الذكاء الاصطناعي'],text:'إدارة المتجر وتطوير الواجهة الأمامية، مع استخدام الذكاء الاصطناعي في العمل على الواجهة الخلفية وقاعدة بيانات الموقع. كما أدير تطبيق NYLON وأحدّثه بالتعاون مع مطوّر Flutter.'},
  pm:{title:'نظام إدارة المشاريع',stack:['React','TypeScript','Bootstrap'],text:'تطبيق تعاوني يتضمن تسجيل الدخول وأدوار المدير والموظف، وعمليات إنشاء وقراءة وتعديل وحذف للمستخدمين والمشاريع والمهام.',note:'مشروع فريق. سيُوضَّح إسهامي بدقة في دراسة الحالة النهائية. يفتح العرض عند شاشة تسجيل الدخول.'},
  food:{title:'تطبيق إدارة الطعام',stack:['React','JavaScript','Bootstrap'],text:'تسجيل الدخول، وإدارة الفئات والوصفات، ووحدات لوحة التحكم، وسياق نماذج مشترك، والتحقق من المدخلات، وعمليات CRUD عبر Axios.',note:'مشروع تطويري. يفتح العرض عند شاشة تسجيل الدخول.'},
  estate:{title:'مستكشف العقارات',stack:['Next.js','Chakra UI','Rapid API'],text:'واجهة بحث عن العقارات تعتمد على بيانات إعلانات خارجية، مع مكوّنات واجهة قابلة لإعادة الاستخدام وعرض منسّق لمعلومات العقار.',note:'مشروع تطويري. بيانات الإعلانات لا تعني عملًا مع عملاء عقاريين.'}
 },
 comEy:'02 / ما وراء واجهة المتجر',comH:<>المتجر أكثر<br/>من صفحته الرئيسية.</>,comLead:'يجمع معرض أعمالي بين تطوير الواجهات الأمامية وإدارة المتاجر الإلكترونية، بدل التعامل معهما كعالمين منفصلين.',discuss:'ناقش وظيفة',
 services:[['تطوير الواجهات الأمامية','واجهات متجاوبة وتطبيقات ويب بتصميم واضح ومكوّنات قابلة لإعادة الاستخدام.'],['التركيز على التجارة الإلكترونية','مشاريع متاجر تربط بين التصفح وعرض المنتجات وتجارب الحساب.'],['التصميم والتواصل','أسلوب بصري في شرح الخدمات، يدعمه الفيديو ثنائي اللغة أدناه.']],
 reelEy:'03 / الخدمات في حركة',reelH:<>الصورة الأكبر.<br/>في أقل من دقيقة.</>,reelP:'مقدمة بصرية قصيرة لخدماتي في التجارة الإلكترونية، متاحة بالإنجليزية والعربية.',videoLang:'لغة الفيديو',
 vidEn:'فيديو الخدمات بالإنجليزية',vidAr:'فيديو الخدمات بالعربية',vidFallback:'متصفحك لا يدعم تشغيل الفيديو.',
 concept:s=>'مفهوم الخدمات / '+s+' ثانية',vidH:<>من الانطباع الأول<br/>إلى <em>التجربة كاملة.</em></>,
 vidP:'يعرض الفيديو مفهوم متجر، وتجارب جوال، وأدوات بالذكاء الاصطناعي، وهوية بصرية، وخدمات إعلانات مدفوعة.',
 vidSum:'اقرأ ملخص الفيديو',vidDet:'يقدّم فيديو خدمات عمر مفهوم متجر إلكتروني، وتصوّر تطبيق جوال، وسير عمل بمساعدة الذكاء الاصطناعي، وتصميمًا جرافيكيًا وإعلانات مدفوعة. وتدعو الشاشة الختامية المشاهدين إلى التواصل مع عمر عبر لينكدإن.',
 disc:'NOVA مفهوم توضيحي. العناصر البصرية للمتجر والأرقام الإعلانية في الفيديو أمثلة، وليست أعمالًا موثّقة لعملاء أو نتائج أداء فعلية.',
 abEy:'04 / نبذة صغيرة عني',abH:<>تفكير تقني.<br/><em>وعقلية عملية.</em></>,
 abLead:'أبني مشاريع الواجهات الأمامية باستخدام React وJavaScript، وتشمل أعمالي متاجر ولوحات تحكم وتطبيقات تعتمد على واجهات API. كما تشمل اهتماماتي التصميم الجرافيكي والتسويق الرقمي.',
 abMuted:'أريد أن يكون عملي مفيدًا وسهل الفهم ومريحًا في الاستخدام، على الجوال بقدر ما هو على الحاسوب.',
 toolkit:'أدواتي',tk:[['الواجهات الأمامية','React · JavaScript · TypeScript · HTML · CSS'],['التطبيقات والتنسيق','Redux Toolkit · Next.js · Bootstrap · Sass'],['سير العمل','Git · GitHub · REST APIs · تصميم متجاوب']],
 ctEy:'05 / لنتواصل',ctH:<>هل لديك<br/>وظيفة في بالك<span>؟</span></>,ctP:<>تطوير واجهات أمامية أو تجارة إلكترونية.<br/>دعنا نتحدث عمّا يحتاجه فريقك.</>,email:'راسل عمر',
 footer:'واجهات أمامية وتجارة إلكترونية',top:'العودة للأعلى ↑',
 themeToLight:'التبديل إلى الوضع الفاتح',themeToDark:'التبديل إلى الوضع الداكن',themeTitleLight:'الوضع الفاتح',themeTitleDark:'الوضع الداكن',
 langLabel:'English',langAria:'التبديل إلى الإنجليزية',mainNav:'التنقل الرئيسي'
}};

function Arrow(){return <span className="arr" aria-hidden="true">↗</span>}
function ThemeIcon({dark}){return dark?<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>}
const revealSelectors='.hero-copy>*,.hero-visual,.discipline-strip .wrap,.section-heading,.filters,.project,.commerce-layout>div:first-child,.service-line,.video-layout>*,.about>*,.contact .wrap>*';
function App(){
 const [theme,setTheme]=useState(getTheme);
 const [lang,setLang]=useState(getLang);
 const t=T[lang];
 useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('theme',theme)}catch(e){}const m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',theme==='dark'?'#0e1721':'#111d2c')},[theme]);
 useEffect(()=>{applyLang(lang);try{localStorage.setItem('lang',lang)}catch(e){}},[lang]);
 useEffect(()=>{const bar=document.getElementById('progress');const onScroll=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;if(bar)bar.style.transform='scaleX('+(h>0?Math.min(1,window.scrollY/h):0)+')';document.body.classList.toggle('scrolled',window.scrollY>10)};onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  let io;const els=[...document.querySelectorAll(revealSelectors)];
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting||e.boundingClientRect.top<0){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'});els.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--d',(i%4)*70+'ms');io.observe(el)})}
  return()=>{window.removeEventListener('scroll',onScroll);io&&io.disconnect()}},[]);
 const heroRef=useRef(null),canvasRef=useRef(null),visualRef=useRef(null);
 useEffect(()=>initHeroFx({hero:heroRef.current,canvas:canvasRef.current,visual:visualRef.current,src:'/media/omar.webp'}),[]);
 const [filter,setFilter]=useState('All');const [menu,setMenu]=useState(false);const [language,setLanguage]=useState('en');
 const dark=theme==='dark';
 return <>
 <div id="progress" className="progress" aria-hidden="true"/><a className="skip" href="#main">{t.skip}</a>
 <div className="topbar"><header className="header"><a className="wordmark" href="#home" aria-label={t.home}>OB<span>{t.name}</span><i/></a><button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu?t.close:t.menu} <span aria-hidden="true">{menu?'−':'+'}</span></button><nav id="navigation" className={menu?'nav open':'nav'} aria-label={t.mainNav}>{t.nav.map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={()=>setMenu(false)}>{t.talk} <Arrow/></a></nav>
 <button className="lang-toggle" onClick={()=>setLang(lang==='ar'?'en':'ar')} aria-label={t.langAria} lang={lang==='ar'?'en':'ar'}>{t.langLabel}</button>
 <button className="theme-toggle" onClick={()=>setTheme(dark?'light':'dark')} aria-label={dark?t.themeToLight:t.themeToDark} title={dark?t.themeTitleLight:t.themeTitleDark}><ThemeIcon dark={dark}/></button></header></div>
 <main id="main">
 <section className="fx-hero" id="home" ref={heroRef}><canvas className="fx-canvas" ref={canvasRef} aria-hidden="true"/><div className="fx-inner"><div className="hero-copy"><p className="eyebrow"><span/> {t.eyebrow}</p><h1>{t.h1}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button primary" href="#work">{t.explore} <span>↓</span></a><a className="text-link" href={linkedin} target="_blank" rel="noreferrer">{t.linkedin} <Arrow/></a></div><p className="hero-note">{t.heroNote}</p></div></div><div className="fx-visual" ref={visualRef}><img src="/media/omar.webp" alt={t.name} width="400" height="400" fetchpriority="high"/></div></section>
 <div className="discipline-strip"><div className="wrap"><span>{t.strip[0]}</span><i>✳</i><span>{t.strip[1]}</span><i>✳</i><span>{t.strip[2]}</span></div></div>
 <section className="section wrap" id="work"><div className="section-heading"><div><p className="eyebrow">{t.workEy}</p><h2>{t.workH}</h2></div><p>{t.workP}</p></div><div className="filters" role="group" aria-label={t.filterLabel}>{t.filters.map(([k,label])=><button key={k} aria-pressed={filter===k} onClick={()=>setFilter(k)}>{label}{k==='All'?' / '+projects.length:''}</button>)}</div><div className="project-grid">{projects.filter(p=>filter==='All'||p.category===filter).map(p=>{const d=t.p[p.key];return <article className={p.featured?'project featured-project':'project'} key={p.id}>
<div className={p.featured?'project-image nylon-screenshot':'project-image'}><img src={'/media/'+p.image} loading="lazy" alt={p.featured?t.nylonAlt:t.previewAlt(d.title)}/><span className="project-number">{p.featured?t.featured:p.id}</span></div>
<div className="project-top"><h3>{d.title}</h3>{p.repo?<a href={github+'/'+p.repo} target="_blank" rel="noreferrer" aria-label={t.viewSrc(d.title)}><Arrow/></a>:<span className="real-badge">{t.realWork}</span>}</div><p>{d.text}</p><ul className="tags">{d.stack.map(x=><li key={x}>{x}</li>)}</ul>
{p.featured?<div className="nylon-scope"><p><strong>{t.myRole}</strong> {t.roleV}</p><p><strong>{t.collab}</strong> {t.collabV}</p><a className="project-source" href={p.demo} target="_blank" rel="noreferrer">{t.visitNylon} <Arrow/></a><p className="preview-note">{t.nylonNote}</p></div>:<><div className="project-links"><a className="project-source" href={p.demo} target="_blank" rel="noreferrer">{t.openDemo} <Arrow/></a><a className="project-source" href={github+'/'+p.repo} target="_blank" rel="noreferrer">{t.viewCode} <Arrow/></a></div><p className="project-note">{d.note}</p></>}
</article>})}</div></section>
 <section className="commerce" id="commerce"><div className="wrap commerce-layout"><div><p className="eyebrow">{t.comEy}</p><h2>{t.comH}</h2><p className="lead">{t.comLead}</p><a className="button light" href="#contact">{t.discuss} <Arrow/></a></div><div className="commerce-right">{t.services.map(([h,p],i)=><div className="service-line" key={i}><span>0{i+1}</span><div><h3>{h}</h3><p>{p}</p></div></div>)}</div></div></section>
 <section className="section wrap" id="showreel"><div className="section-heading"><div><p className="eyebrow">{t.reelEy}</p><h2>{t.reelH}</h2></div><div><p>{t.reelP}</p><div className="language-controls" role="group" aria-label={t.videoLang}><button aria-pressed={language==='en'} onClick={()=>setLanguage('en')}>English</button><button lang="ar" aria-pressed={language==='ar'} onClick={()=>setLanguage('ar')}>العربية</button></div></div></div><div className="video-layout"><video key={language} controls preload="none" playsInline poster="/media/services-poster.webp" aria-label={language==='en'?t.vidEn:t.vidAr}><source src={'/media/services-'+language+'.mp4'} type="video/mp4"/>{t.vidFallback}</video><div className="video-copy"><span className="small-label">{t.concept(language==='en'?'24':'21')}</span><h3>{t.vidH}</h3><p>{t.vidP}</p><details><summary>{t.vidSum}</summary><p>{t.vidDet}</p></details><p className="disclaimer">{t.disc}</p></div></div></section>
 <section className="about section wrap" id="about"><div><p className="eyebrow">{t.abEy}</p><h2>{t.abH}</h2><p className="lead">{t.abLead}</p><p className="muted">{t.abMuted}</p></div><div className="skills-panel"><h3>{t.toolkit}</h3>{t.tk.map(([a,b])=><div key={a}><span>{a}</span><p>{b}</p></div>)}</div></section>
 <section className="contact" id="contact"><div className="wrap"><p className="eyebrow">{t.ctEy}</p><h2>{t.ctH}</h2><div className="contact-bottom"><p>{t.ctP}</p><a className="button primary" href="mailto:omarbazeed@gmail.com">{t.email} <Arrow/></a></div><div className="contact-links"><a href="mailto:omarbazeed@gmail.com"><bdi>omarbazeed@gmail.com</bdi> <Arrow/></a><a href={linkedin} target="_blank" rel="noreferrer">{t.linkedin} <Arrow/></a><a href={github} target="_blank" rel="noreferrer">GitHub <Arrow/></a></div></div></section>
 </main><footer className="wrap footer"><a className="wordmark" href="#home">OB<span>{t.name}</span></a><span>{t.footer}</span><a href="#home">{t.top}</a></footer>
 </>}
createRoot(document.getElementById('root')).render(<App/>);
