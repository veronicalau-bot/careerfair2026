import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Mail, 
  FileText, 
  MessageSquare,
  Mic,
  ArrowRight,
  ChevronLeft,
  ExternalLink,
  Loader2,
  Tablet,
  Book,
  Compass,
  Target
} from 'lucide-react';

// ==========================================
// 1. Google Sheet CSV 網址
// ==========================================
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRu2p9VtmvRH3Pa64IbJpLBAypqS6X6RoxcxXNt11zlUV_AgQ0jDZhzdpwboI5sSFu7025bp7x_QvA2/pub?output=csv"; 

// ==========================================
// 2. 極簡高對比風格分類設定 (Minimalist & Structured)
// ==========================================
const baseCategories = [
  { 
    id: 'self-exploration', 
    title: '自我探索 Self-Exploration', 
    icon: Compass, 
    styles: { bg: 'bg-gray-100', text: 'text-black', border: 'border-gray-200', btn: 'bg-black hover:bg-gray-800 text-white', textHover: 'group-hover:text-gray-600' }, 
    desc: '透過 MBTI 與人格分析深入了解自己，發掘適合的職涯方向。 Discover suitable career paths through MBTI and personality analysis.', 
    wixUrl: '',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'online-resources', 
    title: '搜尋職缺技巧 Job Seeking', 
    icon: Search, 
    styles: { bg: 'bg-gray-100', text: 'text-black', border: 'border-gray-200', btn: 'bg-black hover:bg-gray-800 text-white', textHover: 'group-hover:text-gray-600' }, 
    desc: '掌握最新的求職平台與線上工具，學習如何高效搜尋職缺。 Master the latest platforms to efficiently search for jobs.', 
    wixUrl: 'https://career306.wixsite.com/careerresourcehub/online-resources-for-job-searching',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'email-writing', 
    title: '撰寫求職信 Cover Letter Writing', 
    icon: Mail, 
    styles: { bg: 'bg-gray-100', text: 'text-black', border: 'border-gray-200', btn: 'bg-black hover:bg-gray-800 text-white', textHover: 'group-hover:text-gray-600' }, 
    desc: '教你如何寫出一封專業且吸睛的求職信件。 Learn how to write a professional and eye-catching cover letter.', 
    wixUrl: 'https://career306.wixsite.com/careerresourcehub/writing-an-email-for-job-application',
    image: 'https://images.unsplash.com/photo-1556204975-1851fadab092?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'resume', 
    title: '撰寫履歷技巧 Resume Tips', 
    icon: FileText, 
    styles: { bg: 'bg-gray-100', text: 'text-black', border: 'border-gray-200', btn: 'bg-black hover:bg-gray-800 text-white', textHover: 'group-hover:text-gray-600' }, 
    desc: '將學術與其他成就亮點，轉化為出色的履歷。 Transform academic and extracurricular highlights into the perfect resume', 
    wixUrl: 'https://career306.wixsite.com/careerresourcehub/resume-tips',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'interview', 
    title: '面試技巧指南 Interview Tips', 
    icon: MessageSquare, 
    styles: { bg: 'bg-gray-100', text: 'text-black', border: 'border-gray-200', btn: 'bg-black hover:bg-gray-800 text-white', textHover: 'group-hover:text-gray-600' }, 
    desc: '從常見問題分析到面試策略，助你準備見工面試。 Help you prepare for job interviews, from common questions to interview strategies.', 
    wixUrl: 'https://career306.wixsite.com/careerresourcehub/interview-tips',
    image: 'https://images.unsplash.com/photo-1698047681452-08eba22d0c64?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'elevator-pitch', 
    title: '自我介紹與個人品牌 Elevator Pitch & Personal Branding', 
    icon: Mic, 
    styles: { bg: 'bg-gray-100', text: 'text-black', border: 'border-gray-200', btn: 'bg-black hover:bg-gray-800 text-white', textHover: 'group-hover:text-gray-600' }, 
    desc: '建立個人品牌並掌握電梯簡報訣竅，學會精準行銷自己。 Build your personal brand and master the elevator pitch to market yourself.', 
    wixUrl: 'https://career306.wixsite.com/careerresourcehub/elevator-pitch',
    libGuideUrl: 'https://lgapi-au.libapps.com/widget_box.php?site_id=18098&widget_type=8&output_format=2&widget_title=Online+Courses+%E7%B7%9A%E4%B8%8A%E8%AA%B2%E7%A8%8B&widget_height=&widget_width=&widget_embed_type=1&guide_id=946020&box_id=23175179&map_id=27161535&content_only=0&include_jquery=0&config_id=1774599982146&bs5_widget=0',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'self-management', 
    title: '各種自我管理技能 Self-Management Skills', 
    icon: Target, 
    styles: { bg: 'bg-gray-100', text: 'text-black', border: 'border-gray-200', btn: 'bg-black hover:bg-gray-800 text-white', textHover: 'group-hover:text-gray-600' }, 
    desc: '培養時間管理、情緒調節與抗壓等能力。 Develop skills including time management, emotional resilience, and stress management.', 
    wixUrl: '',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop'
  }
];

// ==========================================
// 預設展示資料
// ==========================================
const defaultBooks = [
  { categoryId: 'online-resources', id: 1, title: '數位時代的求職聖經', author: '張小明', cover: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', desc: '全面解析各大求職平台的演算法，打造讓獵頭主動找上門的數位名片。', format: 'eBook', language: 'Chinese Book', url: 'https://books.google.com/' },
  { categoryId: 'email-writing', id: 2, title: '精準商務寫作', author: '溝通專家', cover: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=800&q=80', desc: '從主旨到結尾，避開常見的 NG 寫法，寫出讓人無法拒絕的專業信件。', format: 'Physical Book', language: 'English Book', url: 'https://books.google.com/' }
];

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i+1] === '\n') i++; 
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }
  return rows;
}

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 過濾器狀態
  const [filterFormat, setFilterFormat] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All');

  // 圖書館搜尋器專用 Ref 與發送邏輯
  const formRef = useRef(null);
  const queryInputRef = useRef(null);

  const handlePrimoSearch = (e) => {
    e.preventDefault();
    const queryTempValue = queryInputRef.current?.value.trim() || "";
    const queryField = formRef.current?.elements['query'];
    if (queryField && queryTempValue) {
      queryField.value = "any,contains," + queryTempValue;
      formRef.current?.submit();
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        let booksData = [];
        if (GOOGLE_SHEET_CSV_URL) {
          const response = await fetch(GOOGLE_SHEET_CSV_URL);
          if (!response.ok) throw new Error('無法讀取 Google Sheets');
          const csvText = await response.text();
          const parsedData = parseCSV(csvText);
          const headers = parsedData[0].map(h => h.trim());
          
          booksData = parsedData.slice(1).filter(row => row.length > 1 && row[0]).map((row, index) => {
            let bookObj = { id: `gs-${index}` };
            headers.forEach((header, i) => {
              bookObj[header] = row[i] || '';
            });
            return bookObj;
          });
        } else {
          booksData = defaultBooks;
        }

        const mergedCategories = baseCategories.map(cat => ({
          ...cat,
          books: booksData.filter(book => book.categoryId === cat.id)
        }));
        setCategories(mergedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFilterFormat('All');
    setFilterLanguage('All');
  }, [activeView]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black w-full text-left">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-sm font-bold tracking-widest uppercase">Loading Resources 載入資源中...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen font-sans text-black text-left bg-[#FDFDFD] selection:bg-black selection:text-white relative overflow-hidden">
      
      {/* 注入自訂的漂浮方塊動畫 CSS (參考自 CodePen) */}
      <style>{`
        .circles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          margin: 0;
          padding: 0;
          z-index: 0;
          pointer-events: none;
        }
        .circles li {
          position: absolute;
          display: block;
          list-style: none;
          width: 20px;
          height: 20px;
          background: rgba(0, 0, 0, 0.03);
          animation: animate 25s linear infinite;
          bottom: -150px;
        }
        .circles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
        .circles li:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
        .circles li:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
        .circles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
        .circles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
        .circles li:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
        .circles li:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
        .circles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
        .circles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
        .circles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }

        /* 針對 LibGuides Widget 的樣式微調 */
        .libguides-container .s-lg-widget {
          font-family: inherit !important;
        }

        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
      `}</style>

      {/* 漂浮方塊背景 */}
      <ul className="circles">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>

      {/* 導航列 - 調整為 max-w-[1600px] 以適應 16:9 寬螢幕 */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex justify-between items-center h-20 gap-4">
            <button 
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2 md:gap-3 hover:opacity-70 transition-opacity shrink-0"
            >
              <div className="bg-black p-1.5 md:p-2 rounded-lg text-white">
                <BookOpen className="w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase whitespace-nowrap">
                Library Resources
              </span>
            </button>
            <div className="hidden sm:block text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 text-right shrink ml-4 leading-snug break-words">
              HKAPA Career & Internship Fair 2026
            </div>
          </div>
        </div>
      </nav>

      {error && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-lg shadow-sm font-medium text-sm">
          {error}
        </div>
      )}

      {activeView === 'home' ? (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col min-h-screen">
          
          {/* 主內容區 - 同步調整為 max-w-[1600px] */}
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 w-full flex-1 flex flex-col">
            
            <div className="max-w-4xl mb-24">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black mb-8 leading-[1.05] uppercase">
                Empower <br/>
                <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-500 transition-all duration-500 cursor-default">
                  Your Career.
                </span>
              </h1>
              
              {/* 圖書館自訂搜尋器 (整合 Primo Search) */}
              <div className="mt-12 bg-white p-6 md:p-8 border border-gray-200 relative z-10 shadow-sm">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-black mb-1">
                    You may search with keywords for other resources in the Library:
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    亦可在圖書館目錄內，以關鍵字檢索。
                  </p>
                </div>

                <form 
                  ref={formRef}
                  name="searchForm" 
                  role="search" 
                  method="get" 
                  action="https://hkapa.primo.exlibrisgroup.com/discovery/search" 
                  encType="application/x-www-form-urlencoded; charset=utf-8" 
                  target="_blank" 
                  onSubmit={handlePrimoSearch}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <input name="search_scope" value="MyInstitution" type="hidden" />
                  <input name="vid" value="852HKAPA_INST:852HKAPA_INST" type="hidden" />
                  <input name="query" type="hidden" />
                  
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      ref={queryInputRef}
                      type="text" 
                      name="queryTemp" 
                      placeholder="Search Library Collection 檢索圖書館館藏" 
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-black text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors whitespace-nowrap"
                  >
                    Search 檢索
                  </button>
                </form>
              </div>
            </div>

            {/* 主題分類卡片區 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((cat, index) => {
                const IconComponent = cat.icon;
                const bookCount = cat.books ? cat.books.length : 0;

                return (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveView(cat.id)}
                    className="group block w-full text-left bg-white border border-gray-200 hover:border-black transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* 上半部：實景相片 */}
                    <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop'}}
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className="text-[10px] sm:text-xs font-bold bg-white text-black px-3 py-1.5 uppercase tracking-widest shadow-sm">
                          {bookCount} Items 項目
                        </span>
                      </div>
                    </div>
                    
                    {/* 下半部：內容區塊 */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col relative bg-white">
                      <div className={`w-14 h-14 ${cat.styles.bg} rounded-xl flex items-center justify-center ${cat.styles.text} absolute -top-7 left-6 sm:left-8 border-4 border-white shadow-sm`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="mt-8 flex-1 flex flex-col">
                        <h4 className="text-xl md:text-2xl font-bold text-black mb-3">
                          {cat.title}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                          {cat.desc}
                        </p>
                        <div className="text-black font-bold flex items-center text-sm uppercase tracking-wider mt-auto">
                          Explore 探索 <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        /* 分類書單視圖 */
        (() => {
          const activeCat = categories.find(c => c.id === activeView);
          const IconComponent = activeCat.icon;
          
          // 根據目前的過濾條件篩選書籍
          const filteredBooks = activeCat.books.filter(book => {
            const matchFormat = filterFormat === 'All' || (book.format && book.format.includes(filterFormat));
            const matchLanguage = filterLanguage === 'All' || (book.language && book.language.includes(filterLanguage));
            return matchFormat && matchLanguage;
          });

          return (
            <section className="pt-32 pb-20 min-h-screen relative bg-transparent flex flex-col">
              
              {/* 分類內容區 - 同步調整為 max-w-[1600px] */}
              <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 w-full flex-1">
                
                <button 
                  onClick={() => setActiveView('home')}
                  className="inline-flex items-center text-gray-400 hover:text-black mb-12 transition-colors font-bold text-sm uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back to Categories 返回分類
                </button>

                {/* 極簡橫幅 */}
                <div className="border-b border-gray-200 pb-16 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between">
                  
                  <div className="md:w-2/3">
                    <div className={`w-16 h-16 ${activeCat.styles.bg} rounded-xl flex items-center justify-center ${activeCat.styles.text} mb-8 shadow-sm`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">{activeCat.title}</h2>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">{activeCat.desc}</p>
                  </div>

                  <div className="mt-10 md:mt-0 w-full md:w-auto">
                    {activeCat.wixUrl ? (
                      <a 
                        href={activeCat.wixUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`inline-flex justify-center items-center px-8 py-4 ${activeCat.styles.btn} font-bold text-sm uppercase tracking-widest transition-colors w-full md:w-auto text-center`}
                      >
                        Useful Tips from SAO <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    ) : (
                      <div className="inline-flex justify-center items-center px-8 py-4 bg-gray-50 text-gray-400 font-bold text-sm uppercase tracking-widest w-full md:w-auto text-center border border-gray-200 cursor-not-allowed">
                        Tips Coming Soon
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-12 gap-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-black tracking-tight">Selected Resources 精選書單</h3>
                    <span className="text-gray-400 text-sm font-bold uppercase tracking-widest hidden sm:inline-block">{filteredBooks.length} Books 書籍</span>
                  </div>

                  {/* 新增：書籍過濾器 (Filters) */}
                  <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    <div className="flex items-center border border-gray-200 bg-white w-full sm:w-auto">
                      <span className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-r border-gray-200 bg-gray-50 whitespace-nowrap">Format 格式</span>
                      {['All', 'Physical Book', 'eBook'].map(f => (
                        <button 
                          key={f}
                          onClick={() => setFilterFormat(f)}
                          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold uppercase tracking-widest border-r border-gray-200 last:border-r-0 transition-colors ${filterFormat === f ? 'bg-black text-white' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                        >
                          {f === 'All' ? '全部 All' : (f === 'Physical Book' ? '實體 Physical Book' : '電子 eBook')}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center border border-gray-200 bg-white w-full sm:w-auto">
                      <span className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-r border-gray-200 bg-gray-50 whitespace-nowrap">Lang 語言</span>
                      {['All', 'Chinese Book', 'English Book'].map(l => (
                        <button 
                          key={l}
                          onClick={() => setFilterLanguage(l)}
                          className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold uppercase tracking-widest border-r border-gray-200 last:border-r-0 transition-colors ${filterLanguage === l ? 'bg-black text-white' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                        >
                          {l === 'All' ? '全部 All' : (l === 'Chinese Book' ? '中文 Chinese Book' : '英文 English Book')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {filteredBooks.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredBooks.map(book => (
                      <div key={book.id} className="group flex flex-col">
                        <div className="aspect-[3/4] w-full overflow-hidden relative bg-gray-100 border border-gray-200 mb-4 sm:mb-6">
                          
                          {book.format && (
                            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
                              <span className="text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 bg-black text-white uppercase tracking-widest flex items-center">
                                {book.format.includes('eBook') ? <Tablet className="w-3 h-3 mr-1 sm:mr-1.5" /> : 
                                 book.format.includes('Physical') ? <Book className="w-3 h-3 mr-1 sm:mr-1.5" /> : null}
                                {book.format}
                              </span>
                            </div>
                          )}

                          <div className="w-full h-full relative overflow-hidden">
                            {book.cover ? (
                              <img 
                                src={book.cover} 
                                alt={book.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'}}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <BookOpen className="w-12 h-12" />
                              </div>
                            )}
                            
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                              <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center">
                                {book.url ? 'Go to Library' : 'View Details'} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                              </span>
                            </div>
                          </div>
                          
                          {book.url && (
                            <a href={book.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={`前往圖書館查看 ${book.title}`}></a>
                          )}
                        </div>
                        
                        <div className="flex flex-col flex-1">
                          <div className="text-[10px] sm:text-xs font-bold text-gray-400 mb-1 sm:mb-2 uppercase tracking-widest">
                            {book.author || 'Unknown Author 未知作者'}
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-black mb-2 sm:mb-3 leading-snug">{book.title}</h4>
                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">{book.desc}</p>
                          
                          {book.url && (
                            <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                              <a 
                                href={book.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black hover:text-gray-500 transition-colors"
                              >
                                Library Page 圖書館頁面 <ExternalLink className="w-3 h-3 ml-1 sm:ml-1.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 border border-gray-200 bg-white">
                    <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-6" />
                    <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">
                      {activeCat.books.length > 0 ? 'No matching resources 尚無符合條件的資源' : 'No resources found 尚無資源'}
                    </p>
                    {activeCat.books.length > 0 && (
                      <button 
                        onClick={() => { setFilterFormat('All'); setFilterLanguage('All'); }}
                        className="mt-4 text-xs font-bold uppercase tracking-widest text-black underline hover:text-gray-500 transition-colors"
                      >
                        Clear Filters 清除條件
                      </button>
                    )}
                  </div>
                )}

                {/* LibGuides 動態載入區塊 (改為 iframe 確保內容正確顯示) */}
                {activeCat.libGuideUrl && (
                  <div className="mt-20 pt-16 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-black tracking-tight">Other Library Resources 其他圖書館資源</h3>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm w-full h-[600px] overflow-hidden">
                      <iframe 
                        title="Library Guides Content Box" 
                        src={activeCat.libGuideUrl}
                        className="w-full h-full border-none"
                        scrolling="yes"
                      ></iframe>
                    </div>
                  </div>
                )}

              </div>
            </section>
          );
        })()
      )}
    </div>
  );
};

export default App;