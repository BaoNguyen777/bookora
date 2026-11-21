"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, Heart, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, Star, Truck, X } from "lucide-react";

type Book = { id: number; title: string; author: string; price: number; oldPrice?: number; category: string; rating: number; reviews: number; cover: string; tag?: string; color: string };
const books: Book[] = [
  { id: 1, title: "Đi tìm lẽ sống", author: "Viktor E. Frankl", price: 89000, oldPrice: 120000, category: "Tâm lý", rating: 4.9, reviews: 328, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=700&q=85", tag: "Bán chạy", color: "#d7c4a6" },
  { id: 2, title: "Nhà giả kim", author: "Paulo Coelho", price: 79000, category: "Văn học", rating: 4.8, reviews: 256, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=85", tag: "Được yêu thích", color: "#d5b58b" },
  { id: 3, title: "Tư duy nhanh và chậm", author: "Daniel Kahneman", price: 159000, oldPrice: 189000, category: "Kinh doanh", rating: 4.9, reviews: 194, cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&q=85", color: "#c9d2c4" },
  { id: 4, title: "Tuổi trẻ đáng giá bao nhiêu", author: "Rosie Nguyễn", price: 68000, category: "Phát triển bản thân", rating: 4.7, reviews: 412, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=700&q=85", tag: "Gợi ý", color: "#d6b7a9" },
  { id: 5, title: "Đắc nhân tâm", author: "Dale Carnegie", price: 76000, category: "Phát triển bản thân", rating: 4.8, reviews: 521, cover: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=700&q=85", color: "#d8c9a8" },
  { id: 6, title: "Sapiens: Lược sử loài người", author: "Yuval Noah Harari", price: 189000, category: "Lịch sử", rating: 4.9, reviews: 287, cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&q=85", color: "#c4c9cf" },
  { id: 7, title: "Cây cam ngọt của tôi", author: "José Mauro de Vasconcelos", price: 99000, category: "Văn học", rating: 4.9, reviews: 634, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=85", color: "#dfc4a6" },
  { id: 8, title: "Clean Code", author: "Robert C. Martin", price: 245000, category: "Công nghệ", rating: 4.8, reviews: 146, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=700&q=85", tag: "Sách chuyên ngành", color: "#c5d0d4" },
];
const categories = ["Tất cả", "Văn học", "Kinh doanh", "Tâm lý", "Phát triển bản thân", "Công nghệ", "Lịch sử"];
const money = (n: number) => n.toLocaleString("vi-VN") + "₫";

export default function Home() {
  const [category, setCategory] = useState("Tất cả");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const filtered = useMemo(() => books.filter(b => (category === "Tất cả" || b.category === category) && (b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))), [category, query]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = books.reduce((sum, b) => sum + b.price * (cart[b.id] || 0), 0);
  const add = (id: number) => { setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 })); setNotice("Đã thêm sách vào giỏ hàng"); setTimeout(() => setNotice(""), 1800); };
  const change = (id: number, amount: number) => setCart(c => { const next = { ...c, [id]: Math.max(0, (c[id] || 0) + amount) }; if (!next[id]) delete next[id]; return next; });

  return <main>
    <div className="announcement"><Sparkles size={13}/> Ưu đãi chào bạn mới — giảm 10% cho đơn hàng đầu tiên <span>BOOKORA10</span></div>
    <header className="header">
      <a className="logo" href="#"><span className="logo-mark"><BookOpen size={21}/></span>bookora<span className="logo-dot">.</span></a>
      <nav className={mobileMenu ? "nav nav-open" : "nav"}>
        <a href="#books">Khám phá sách</a><a href="#categories">Thể loại</a><a href="#about">Về Bookora</a>
      </nav>
      <div className="header-actions">
        <div className="search-box"><Search size={17}/><input value={query} onChange={e => {setQuery(e.target.value); document.getElementById("books")?.scrollIntoView({behavior:"smooth"});}} placeholder="Tìm tên sách, tác giả..."/></div>
        <button className="icon-button cart-trigger" onClick={() => setCartOpen(true)} aria-label="Giỏ hàng"><ShoppingBag size={20}/>{count > 0 && <span className="cart-count">{count}</span>}</button>
        <button className="icon-button menu-trigger" onClick={() => setMobileMenu(!mobileMenu)}><Menu/></button>
      </div>
    </header>

    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><span/> MỘT TRANG SÁCH, VẠN HÀNH TRÌNH</div>
        <h1>Mở sách ra,<br/><em>mở thế giới.</em></h1>
        <p>Mỗi cuốn sách là một cánh cửa. Tìm thấy câu chuyện, tri thức và phiên bản tốt hơn của chính mình cùng BOOKORA.</p>
        <div className="hero-buttons"><a className="primary-button" href="#books">Khám phá ngay <ArrowUpRight size={17}/></a><a className="text-button" href="#categories">Danh mục sách <ArrowRight size={16}/></a></div>
        <div className="hero-proof"><div className="avatar-stack"><i>H</i><i>M</i><i>A</i><i>+</i></div><div><strong>2.500+</strong><small>độc giả đồng hành</small></div><div className="proof-divider"/><div><strong>4.9/5</strong><small>đánh giá hài lòng</small></div></div>
      </div>
      <div className="hero-art"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-note note-top">THE ART OF SLOW LIVING <span>✳</span></div>
        <div className="hero-book book-back"><div className="book-cover-label">THE<br/>CREATIVE<br/>MIND</div><small>IDEAS THAT MATTER</small></div>
        <div className="hero-book book-front"><div className="book-sun"/><div className="book-cover-title">THE<br/><b>GOOD</b><br/>LIFE</div><small>A LITTLE BOOK OF WISDOM</small></div>
        <div className="hero-sticker"><Star size={13} fill="currentColor"/> GOOD<br/>THINGS<br/>INSIDE</div><div className="hero-note note-bottom">EST. FOR CURIOUS MINDS — 2026</div>
      </div>
    </section>

    <section className="benefits"><div><Truck/><span><b>Giao hàng toàn quốc</b><small>Nhận sách tận nhà</small></span></div><div><BookOpen/><span><b>Sách chọn lọc</b><small>Nội dung chất lượng</small></span></div><div><Heart/><span><b>Đóng gói tận tâm</b><small>Trao gửi từng trang sách</small></span></div><div><Check/><span><b>Thanh toán linh hoạt</b><small>COD & chuyển khoản</small></span></div></section>

    <section className="categories-section" id="categories"><div className="section-heading"><div><div className="eyebrow">TÌM ĐIỀU BẠN QUAN TÂM</div><h2>Một thế giới <em>đang chờ.</em></h2></div><p>Chọn một chủ đề, bắt đầu hành trình khám phá tiếp theo của bạn.</p></div>
      <div className="category-grid">{[{name:"Văn học",desc:"Những câu chuyện chạm đến trái tim",n:"01",emoji:"✳"},{name:"Kinh doanh",desc:"Tư duy mới, bước tiến mới",n:"02",emoji:"↗"},{name:"Tâm lý",desc:"Thấu hiểu mình và thế giới",n:"03",emoji:"◉"},{name:"Phát triển bản thân",desc:"Mỗi ngày tốt hơn một chút",n:"04",emoji:"✦"},{name:"Công nghệ",desc:"Ý tưởng định hình tương lai",n:"05",emoji:"⌘"},{name:"Lịch sử",desc:"Lắng nghe chuyện của thời gian",n:"06",emoji:"◷"}].map(c=><button key={c.name} className="category-card" onClick={()=>{setCategory(c.name);document.getElementById("books")?.scrollIntoView({behavior:"smooth"});}}><span className="category-number">{c.n}</span><span className="category-emoji">{c.emoji}</span><b>{c.name}</b><small>{c.desc}</small><ArrowUpRight className="category-arrow" size={18}/></button>)}</div>
    </section>

    <section className="books-section" id="books"><div className="section-heading"><div><div className="eyebrow">ĐƯỢC ĐỘC GIẢ LỰA CHỌN</div><h2>Những cuốn sách <em>nổi bật.</em></h2></div><a className="text-button" href="#books">Khám phá tất cả <ArrowRight size={16}/></a></div>
      <div className="filter-row">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"filter-chip active":"filter-chip"}>{c}</button>)}</div>
      <div className="book-grid">{filtered.map((b,i)=><article className="book-card" key={b.id}><div className="book-image" style={{backgroundColor:b.color}}><img src={b.cover} alt={b.title}/>{b.tag && <span className="book-tag">{b.tag}</span>}<button className={liked.includes(b.id)?"wish-button wished":"wish-button"} onClick={()=>setLiked(v=>v.includes(b.id)?v.filter(x=>x!==b.id):[...v,b.id])} aria-label="Yêu thích"><Heart size={17} fill={liked.includes(b.id)?"currentColor":"none"}/></button><button className="quick-add" onClick={()=>add(b.id)}>Thêm vào giỏ <Plus size={15}/></button></div><div className="book-info"><div className="book-rating"><Star size={13} fill="currentColor"/>{b.rating} <span>({b.reviews})</span></div><h3>{b.title}</h3><p>{b.author}</p><div className="book-price">{money(b.price)} {b.oldPrice && <del>{money(b.oldPrice)}</del>}</div></div></article>)}</div>
      {filtered.length===0 && <div className="empty-state">Không tìm thấy sách phù hợp. Thử từ khóa khác nhé.</div>}
    </section>

    <section className="quote-section" id="about"><div className="quote-mark">“</div><blockquote>Một căn phòng không có sách giống như một cơ thể không có linh hồn.</blockquote><span>— CICERO</span><div className="quote-decoration">READ<br/>MORE.</div></section>
    <section className="newsletter"><div><div className="eyebrow">THƯ VIỆN CỦA NHỮNG TÂM HỒN TÒ MÒ</div><h2>Nhận một chút <em>cảm hứng</em><br/>vào hộp thư của bạn.</h2></div><form onSubmit={e=>{e.preventDefault();setNotice("Cảm ơn bạn đã đăng ký nhận tin!");setTimeout(()=>setNotice(""),2200);}}><input type="email" required placeholder="Email của bạn"/><button type="submit">Đăng ký <ArrowRight size={16}/></button><small>Không spam. Chỉ gửi những điều đáng đọc.</small></form></section>
    <footer><a className="logo footer-logo" href="#"><span className="logo-mark"><BookOpen size={20}/></span>bookora<span className="logo-dot">.</span></a><p>Nuôi dưỡng trí tò mò, từng trang một.</p><div className="footer-links"><a href="#books">Sách</a><a href="#categories">Thể loại</a><a href="#about">Câu chuyện</a><a href="mailto:hello@bookora.vn">Liên hệ</a></div><small>© 2026 BOOKORA. Made for curious minds.</small></footer>

    {notice && <div className="toast"><Check size={17}/>{notice}</div>}
    {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">GIỎ HÀNG CỦA BẠN</span><h2>Đang chọn đọc <em>gì nhỉ?</em></h2></div><button className="icon-button" onClick={()=>setCartOpen(false)}><X/></button></div>
      {count===0 ? <div className="cart-empty"><ShoppingBag size={36}/><h3>Giỏ hàng còn trống</h3><p>Thêm một cuốn sách hay để bắt đầu nhé.</p><button className="primary-button" onClick={()=>setCartOpen(false)}>Khám phá sách <ArrowRight size={16}/></button></div> : <><div className="cart-items">{books.filter(b=>cart[b.id]).map(b=><div className="cart-item" key={b.id}><img src={b.cover} alt={b.title}/><div className="cart-item-info"><b>{b.title}</b><small>{b.author}</small><strong>{money(b.price)}</strong><div className="quantity"><button onClick={()=>change(b.id,-1)}><Minus size={13}/></button><span>{cart[b.id]}</span><button onClick={()=>change(b.id,1)}><Plus size={13}/></button></div></div></div>)}</div><div className="cart-total"><div><span>Tạm tính</span><b>{money(total)}</b></div><small>Phí vận chuyển sẽ được xác nhận khi đặt hàng.</small><button className="primary-button full-button" onClick={()=>{setCartOpen(false);setCheckout(true);}}>Tiến hành đặt hàng <ArrowRight size={16}/></button></div></>}
    </aside></div>}
    {checkout && <div className="overlay" onClick={()=>setCheckout(false)}><div className="checkout-modal" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">HOÀN TẤT ĐƠN HÀNG</span><h2>Thông tin <em>giao sách.</em></h2></div><button className="icon-button" onClick={()=>setCheckout(false)}><X/></button></div><form onSubmit={e=>{e.preventDefault();setCheckout(false);setCart({});setNotice("Đã ghi nhận đơn hàng demo. Cảm ơn bạn!");setTimeout(()=>setNotice(""),3000);}}><label>Họ và tên<input required placeholder="Nguyễn Văn A"/></label><label>Số điện thoại<input required type="tel" placeholder="09xx xxx xxx"/></label><label>Địa chỉ nhận hàng<input required placeholder="Số nhà, đường, phường/xã, tỉnh/thành"/></label><label>Phương thức thanh toán<select><option>Thanh toán khi nhận hàng (COD)</option><option>Chuyển khoản ngân hàng</option></select></label><div className="checkout-total"><span>Tổng đơn hàng</span><b>{money(total)}</b></div><button className="primary-button full-button" type="submit">Xác nhận đặt hàng <ArrowRight size={16}/></button><small className="demo-note">Đây là bản demo giao diện — chưa kết nối cổng thanh toán hoặc hệ thống xử lý đơn hàng.</small></form></div></div>}
  </main>;
}
