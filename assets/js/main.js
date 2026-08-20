/* ===== 数据：作品展示（标题按 Keynote 幻灯片原始顺序；海报为从 .key 抽取的真实大图，按文件序号排序配对） =====
   注：Keynote 以内部哈希 ID 引用图片，文件名未被写入 IWA，故“标题↔海报”为最佳推测配对，需人工过目。 */
const WORKS = [
{ t: "PUBGM 年轻化 品牌PV", s: "CG", wide:true, img: "assets/img/poster_015.jpg", titleImg: "assets/img/title_pubgm_young.png", u: "https://www.xinpianchang.com/a13706449?from=UserProfile" },
{ t: "PUBGM 半人马PV", s: "AIGC", wide:true, img: "assets/img/poster_017.jpg", titleImg: "assets/img/title_pubgm_centaur.png", titleBig:true, u: "https://www.xinpianchang.com/a13783845?token=4ekCmw3Ilb9DZgZY64sLeRM&from=UserProfile" },
{ t: "英雄联盟手游x世界杯TCL《一起开秀敢为不同》", s: "CG+2D", img: "assets/img/poster_024.jpg", titleImg: "assets/img/title_lol_tcl.png", u: "https://www.xinpianchang.com/a13610020?from=UserProfile" },
{ t: "第五人格《昨日之笼》PV", s: "CG", img: "assets/img/poster_016.jpg", titleImg: "assets/img/title_identity_v_yesterday.png", titleBig:true, u: "https://www.xinpianchang.com/a13695222?from=UserProfile" },
{ t: "逆战未来 猪猪侠PV", s: "", img: "assets/img/poster_002.jpg", titleImg: "assets/img/title_nizhan_zhuzhuxia.png", u: "https://weibo.com/1732349315/5282801964550941" },
{ t: "第五人格 2026五骥映春主题CG", s: "", img: "assets/img/poster_014.jpg", u: "https://www.xinpianchang.com/a13621100?from=UserProfile" },
{ t: "穿越火线：张碧晨MV《一念封神》", s: "实拍特效", img: "assets/img/poster_021.jpg", u: "https://www.xinpianchang.com/a13268311?from=UserProfile" },
{ t: "蔚来 萤火虫《自在玩家》", s: "实拍", img: "assets/img/poster_003.jpg", u: "https://www.xinpianchang.com/a13654148?from=UserProfile" },
{ t: "天猫超品日年终盘点", s: "实拍", img: "assets/img/poster_018.jpg", u: "https://www.xinpianchang.com/a11705981?from=UserProfile" },
{ t: "和平精英x吴京：《开局就超爆》", s: "实拍CG视效", img: "assets/img/poster_026.jpg", u: "https://xinpianchang.com/a13344006?from=UserProfile&ws_referrer_origin=https%3A%2F%2Fwww.xinpianchang.com%2Fu10050726%3Ffrom%3Dnavigator" },
{ t: "LOLM x CocaCola品牌营销动画", s: "多风格", img: "assets/img/poster_019.jpg", u: "https://www.xinpianchang.com/a12165985?from=UserProfile" },
{ t: "宝马x和平精英病毒视频", s: "", img: "assets/img/poster_022.jpg", u: "https://www.xinpianchang.com/a13295648?from=UserProfile" },
{ t: "京东超市 年货节病毒篇", s: "实拍", img: "assets/img/poster_009.jpg", u: "https://www.xinpianchang.com/a12910267?from=UserProfile" },
{ t: "穿越火线《CFMx变形金刚 突变复古动画》", s: "三维", img: "assets/img/poster_023.jpg", u: "https://www.xinpianchang.com/a12822622?from=UserProfile" },
{ t: "和平精英《谓龙的传人》", s: "2D水墨", wide:true, img: "assets/img/poster_027.jpg", u: "https://www.xinpianchang.com/a12911330?from=UserProfile" },
{ t: "京东x浪浪山《小妖怪的夏天 618特辑》", s: "", img: "assets/img/poster_013.jpg", u: "https://www.xinpianchang.com/a12718245?from=UserProfile" },
{ t: "穿越火线 《CFM七周年浪漫巨献》", s: "多风格", img: "assets/img/poster_012.jpg", u: "https://www.xinpianchang.com/a12302951?from=UserProfile" },
{ t: "和平精英《汇聚全宇宙的力量TVC》动画部分", s: "多风格", img: "assets/img/poster_020.jpg", u: "https://xinpianchang.com/a12631047?from=UserProfile&ws_referrer_origin=https%3A%2F%2Fwww.xinpianchang.com%2Fu10050726%3Fbadge%3D%26cate_id%3D0%26order%3Ddefault%26role_id%3D%26public_status%3D0%26kw%3D" },
{ t: "京东生肖兔《兔哪》", s: "实拍", img: "assets/img/poster_001.jpg", u: "https://www.xinpianchang.com/a12340674?from=UserProfile" },
{ t: "泡泡玛特x迪士尼", s: "", img: "assets/img/poster_006.jpg", u: "https://www.xinpianchang.com/a13610494?from=UserProfile" },
{ t: "POPMART泡泡玛特《小帽子 寻找大象滑梯》", s: "", img: "assets/img/poster_028.jpg", u: "https://www.xinpianchang.com/a13549454?token=XVcuP3KKiEE1vIhYC1lj6pq&from=UserProfile" },
{ t: "京东买药x雄狮少年《就是快！》", s: "", img: "assets/img/poster_005.jpg", u: "https://www.xinpianchang.com/a13243463?from=UserProfile" },
{ t: "上汽大众CNY", s: "", img: "assets/img/poster_004.jpg", u: "https://www.xinpianchang.com/a13606607?from=UserProfile" },
{ t: "京东超市x上美影《蜈蚣精居然技高一筹》", s: "", img: "assets/img/poster_010.jpg", u: "https://www.xinpianchang.com/a13695233?from=UserProfile" },
{ t: "和平精英x田曦薇官宣视频", s: "实拍", img: "assets/img/poster_029.jpg", u: "https://www.xinpianchang.com/a13193941?from=UserProfile" },
{ t: "《陈唐关的百姓有福了》", s: "", img: "assets/img/poster_008.jpg", u: "https://www.xinpianchang.com/a13499917?from=UserProfile" },
{ t: "京东大促《炸年兽》", s: "", img: "assets/img/poster_011.jpg", u: "https://www.xinpianchang.com/a11130561?from=UserProfile" },
{ t: "美团CNY", s: "定格", img: "assets/img/poster_007.jpg", u: "https://www.xinpianchang.com/a13654704?from=UserProfile" }
];

/* ===== 数据：联系方式 ===== */
const CONTACT = [
  { k: "微信", v: "acfanrry" },
  { k: "小红书", v: "墨山大宝" },
  { k: "新片场", v: "xinpianchang.com/u10050726", href: "https://www.xinpianchang.com/u10050726" },
];

/* ===== 渲染作品（海报卡片） ===== */
(function renderWorks() {
  const grid = document.getElementById("worksGrid");
  if (!grid) return;
  // 本地排序覆盖（sort.html 编辑页写入）：标题顺序数组，优先于源码默认顺序
  try {
    const workOrder = JSON.parse(localStorage.getItem("workOrder") || "null");
    const titles = WORKS.map((w) => w.t);
    if (Array.isArray(workOrder) && workOrder.length === titles.length && workOrder.every((t) => titles.includes(t))) {
      WORKS.sort((a, b) => workOrder.indexOf(a.t) - workOrder.indexOf(b.t));
    }
  } catch (e) {}
  const saved = JSON.parse(localStorage.getItem("workUrls") || "{}");
  // 本地配对覆盖（map.html 编辑页写入）：标题 -> 图片路径，优先于源码默认图
  const workImgs = JSON.parse(localStorage.getItem("workImgs") || "{}");
  const imgOf = (w) => workImgs[w.t] || w.img;
  const isUrl = (s) => /^https?:\/\//i.test((s || "").trim());
  const isVideoUrl = (s) => /^https?:\/\/[^\s"]+\.(mp4|webm|mov|m4v|mkv)(\?.*)?$/i.test((s || "").trim());
  const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

  const cardFoot = (w, url, ok) => {
    const edit = ok
      ? ""
      : `<div class="work-card__edit">
          <input class="work-card__url" type="url" inputmode="url" data-t="${w.t}" placeholder="粘贴该作品链接…" value="${(url || "").replace(/"/g, "&quot;")}" />
          <button class="work-card__ok" type="button" data-t="${w.t}">确定</button>
        </div>`;
    const out = ok
      ? `<a class="work-card__out" href="${url}" target="_blank" rel="noopener">▶ 观看作品</a>`
      : "";
    return `<div class="work-card__foot">${edit}${out}</div>`;
  };

  grid.innerHTML = WORKS.map((w) => {
    const url = (saved[w.t] || w.u || "").trim();
    const ok = isUrl(url);
    // 有 data video 字段（本地或远程均可），或用户输入的是直链视频，则使用“视频 + 截图”测试布局
    const videoMode = !!w.video || isVideoUrl(url);
    // 有 embedSrc / embed 字段则走 iframe 嵌入模式（新片场等平台）
    const iframeMode = !!(w.embedSrc || w.embed);

    // 标题/类型放在卡片框外，直接在网页黑底上、与图片左对齐（去掉序号）
    const titleImgClass = "work-card__title-img" + (w.titleBig ? " work-card__title-img--big" : "");
    const titleHtml = w.titleImg
      ? `<img class="${titleImgClass}" src="${w.titleImg}" alt="${w.t}" loading="lazy" />`
      : `<h3 class="work-card__title">${w.t}</h3>`;
    const head = `<div class="work-item__head">
        <div class="work-card__meta">
          ${titleHtml}
          ${w.s ? `<span class="work-card__style">${w.s}</span>` : ""}
        </div>
      </div>`;

    let body;
    if (videoMode || iframeMode) {
      const shots = w.shots || [imgOf(w)];
      const media = iframeMode
        ? (w.embed || `<iframe class="work-card__frame" src="${w.embedSrc}" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`)
        : `<video controls playsinline webkit-playsinline x5-playsinline preload="none" poster="${imgOf(w)}" src="${w.video || url}"></video>
           <button class="work-card__play" type="button" aria-label="播放视频">▶</button>`;
      body = `<article class="work-card work-card--video ${w.wide ? 'work-card--wide' : ''}" data-url="${ok ? url : ""}">
        <div class="work-card__video">
          ${media}
        </div>
        <div class="work-card__gallery">
          ${shots.map((s, i) => `<img loading="lazy" src="${s}" alt="${w.t} ${i + 1}" />`).join("")}
          ${cardFoot(w, url, ok)}
        </div>
      </article>`;
    } else {
      body = `<article class="work-card ${w.wide ? 'work-card--wide' : ''}" data-url="${ok ? url : ""}">
        <div class="work-card__media">
          <img loading="lazy" src="${imgOf(w)}" alt="${w.t}" />
          ${cardFoot(w, url, ok)}
        </div>
      </article>`;
    }
    return `<div class="work-item reveal">${head}${body}</div>`;
  }).join("");

  // 把某张卡片提交为“内嵌网址”（生成可点击链接 + 允许点图跳转）
  const commit = (card, raw) => {
    const val = (raw || "").trim();
    const url = isUrl(val) ? val : "";
    card.dataset.url = url;
    let out = card.querySelector(".work-card__out");
    if (url) {
      if (!out) {
        out = document.createElement("a");
        out.className = "work-card__out";
        out.target = "_blank"; out.rel = "noopener";
        card.querySelector(".work-card__foot").appendChild(out);
      }
      out.href = url;
      out.textContent = "▶ 观看作品";
      // 生成内嵌链接后，删除输入框与确定按钮
      const edit = card.querySelector(".work-card__edit");
      if (edit) edit.remove();
    } else if (out) {
      out.remove();
    }
  };

  // 输入即暂存（刷新不丢），但不立即生效
  grid.querySelectorAll(".work-card__url").forEach((inp) => {
    inp.addEventListener("click", (e) => e.stopPropagation());
    inp.addEventListener("input", (e) => {
      e.stopPropagation();
      const key = e.target.dataset.t;
      const val = e.target.value.trim();
      const store = JSON.parse(localStorage.getItem("workUrls") || "{}");
      if (val) store[key] = val; else delete store[key];
      localStorage.setItem("workUrls", JSON.stringify(store));
    });
  });
  // 点击“确定”才提交为卡片内嵌链接
  grid.querySelectorAll(".work-card__ok").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".work-card");
      const key = btn.dataset.t;
      const val = card.querySelector(".work-card__url").value.trim();
      const store = JSON.parse(localStorage.getItem("workUrls") || "{}");
      if (val) store[key] = val; else delete store[key];
      localStorage.setItem("workUrls", JSON.stringify(store));
      commit(card, val);
    });
  });

  // 移动端/部分浏览器原生控件不触发时，靠覆盖层按钮播放视频
  grid.querySelectorAll(".work-card--video").forEach((card) => {
    const video = card.querySelector("video");
    const playBtn = card.querySelector(".work-card__play");
    if (!video || !playBtn) return;
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.play();
    });
    video.addEventListener("play", () => { playBtn.hidden = true; });
    video.addEventListener("pause", () => { playBtn.hidden = false; });
    video.addEventListener("ended", () => { playBtn.hidden = false; });
  });
})();

/* ===== 渲染联系 ===== */
(function renderContact() {
  const list = document.getElementById("contactList");
  if (!list) return;
  list.innerHTML = CONTACT.map((c) => {
    const inner = c.href
      ? `<a class="v" href="${c.href}" target="_blank" rel="noopener">${c.v}</a>`
      : `<span class="v">${c.v}</span>`;
    return `<li><span class="k">${c.k}</span>${inner}</li>`;
  }).join("");
})();

/* ===== 渲染合作品牌（横向滚动 logo 占位） ===== */
(function renderBrands() {
  const track = document.getElementById("brandsTrack");
  if (!track) return;
  // 占位：后续汇总真实 logo 后，替换对应 img 路径即可（目前为网上下载的黑白版占位 logo）
  const BRANDS = [
    { name: "腾讯", img: "assets/img/brands/tencent_group.png" },
    { name: "腾讯游戏", img: "assets/img/brands/tencent_games.png" },
    { name: "网易游戏", img: "assets/img/brands/netease.png" },
    { name: "米哈游", img: "assets/img/brands/mihoyo.png" },
    { name: "京东", img: "assets/img/brands/jd.png" },
    { name: "美团", img: "assets/img/brands/meituan.png" },
  ];
  const tile = (b) => b.img
    ? `<div class="brand-logo"><img src="${b.img}" alt="${b.name}" /></div>`
    : `<div class="brand-logo">${b.name}</div>`;
  const one = BRANDS.map(tile).join("");
  track.innerHTML = one.repeat(4); // 复制 4 份，配合 -25% 位移实现无缝循环（间距内置于每个 logo 的 margin-right）
})();

/* ===== 导航滚动态 + 进度条 ===== */
const nav = document.getElementById("nav");
const progress = document.getElementById("scrollProgress");
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ===== 滚动揭示 ===== */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ===== 轻量灯箱（点击作品图放大） ===== */
(function lightbox() {
  const lb = document.createElement("div");
  lb.className = "lb";
  lb.innerHTML = `<img alt="预览" /><span class="lb__close">✕</span>`;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  function open(src) { lbImg.src = src; lb.classList.add("open"); }
  function close() { lb.classList.remove("open"); lbImg.src = ""; }
  document.getElementById("worksGrid").addEventListener("click", (e) => {
    // 输入框 / 按钮 / 内嵌链接 / 视频控件 各自处理，不触发卡片跳转
    if (e.target.closest(".work-card__edit") || e.target.closest(".work-card__out") || e.target.closest(".work-card__video")) return;
    const card = e.target.closest(".work-card");
    if (!card) return;
    const url = card.dataset.url;
    if (url) { window.open(url, "_blank", "noopener"); }
    else {
      const img = card.querySelector(".work-card__media img, .work-card__gallery img");
      open(img ? img.src : "");
    }
  });
  lb.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();

