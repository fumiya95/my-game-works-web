(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $("#app");

  const STORAGE_LIKES = "mgw_likes";

  const state = {
    loggedIn: false,
    route: location.hash || "#/login",
    selectedGenre: null,
    selectedGameId: null,
    timer: null,
    ratingFilter: "ALL",   // ALL, S, A, B, C
    priceSort: "none"      // none, asc, desc
  };

  // ===== 「参考になった」ボタン（ローカル保存） =====
  function getLikes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_LIKES) || "{}");
    } catch {
      return {};
    }
  }
  function saveLikes(obj) {
    localStorage.setItem(STORAGE_LIKES, JSON.stringify(obj));
  }

  // ===== ルーティング =====
  function setRoute(h) {
    state.route = h;
    location.hash = h;
    render();
  }

  addEventListener("hashchange", () => {
    state.route = location.hash || "#/login";
    const m1 = state.route.match(/^#\/genres\/([^\/]+)$/);
    const m2 = state.route.match(/^#\/games\/([^\/]+)$/);
    state.selectedGenre = m1 ? decodeURIComponent(m1[1]) : null;
    state.selectedGameId = m2 ? decodeURIComponent(m2[1]) : null;
    render();
  });

  function setActiveTab() {
    $("#tabList").classList.toggle("active", state.route.startsWith("#/list"));
    $("#tabGenres").classList.toggle("active", state.route.startsWith("#/genres"));
  }

  // ===== おすすめ段階 S/A/B/C =====
  // S: TOP3全部 ＋ Zort ＋ Palworld
  // C: Backrooms…, 僕のヒーロー…, PAYDAY 2
  // A: recommend = true の残り
  // B: recommend = false の残り
  function getRating(g) {
    const top3Ids = (DATA.ranking || []).map(r => r.gameId);
    if (top3Ids.includes(g.id) || ["zort", "palworld"].includes(g.id)) return "S";
    if (["backrooms-escape-together", "hero-aca-ultra-rumble", "payday-2"].includes(g.id)) return "C";
    if (g.recommend) return "A";
    return "B";
  }

  function ratingLabel(r) {
    switch (r) {
      case "S": return "超オススメ";
      case "A": return "おすすめ";
      case "B": return "まぁまぁ";
      case "C": return "おすすめしない";
      default:  return "";
    }
  }

  function ratingStyle(r) {
    switch (r) {
      case "S": return "background:#16a34a;color:#fff;";    // 緑
      case "A": return "background:#2563eb;color:#fff;";    // 青
      case "B": return "background:#ca8a04;color:#fff;";    // オレンジ
      case "C": return "background:#b91c1c;color:#fff;";    // 赤
      default:  return "";
    }
  }

  function ratingBadge(g) {
    const r = getRating(g);
    const label = ratingLabel(r);
    if (!label) return "";
    return `<span class="badge" style="${ratingStyle(r)}">${label}</span>`;
  }

  // ===== ログイン画面 =====
  function loginView() {
    app.innerHTML = `
      <div class="login card container">
        <h1 class="title">ログイン</h1>
        <div class="section">
          <div class="label">ユーザー名</div>
          <input id="loginUser" class="input" placeholder="ユーザー名">
        </div>
        <div class="section">
          <div class="label">パスワード</div>
          <input id="loginPass" class="input" placeholder="パスワード" type="password">
        </div>
        <button id="btnLogin" class="btn primary">ログイン</button>
        <div class="hint">
          ユーザー名：<b>${DATA.credentials.username}</b>
          パスワード：<b>${DATA.credentials.password}</b>
        </div>
      </div>
    `;
    $("#btnLogin").onclick = () => {
      const u = $("#loginUser").value.trim();
      const p = $("#loginPass").value;
      if (u === DATA.credentials.username && p === DATA.credentials.password) {
        state.loggedIn = true;
        setRoute("#/list");
      } else {
        alert("ユーザー名またはパスワードが違います。");
      }
    };
  }

  // ===== ヘッダー =====
  function headerEvents() {
    $("#tabList").onclick = () => setRoute("#/list");
    $("#tabGenres").onclick = () => setRoute("#/genres");
    $("#year").textContent = new Date().getFullYear();
  }

  // ===== 画像モーダル =====
  function openImageModal(src) {
    const existing = document.querySelector(".image-modal");
    if (existing) existing.remove();

    const wrapper = document.createElement("div");
    wrapper.className = "image-modal";
    wrapper.innerHTML = `
      <div class="image-modal-inner">
        <span class="image-modal-close" aria-label="閉じる">×</span>
        <img src="${src}" alt="">
      </div>
    `;
    document.body.appendChild(wrapper);

    const close = () => wrapper.remove();

    wrapper.addEventListener("click", (e) => {
      if (e.target === wrapper) close();
    });
    wrapper.querySelector(".image-modal-close").addEventListener("click", close);
  }

  // ===== 6カテゴリ分類 =====
  const CAT6 = [
    "FPS/シューター",
    "ホラー",
    "マルチプレイ",
    "アクション/アドベンチャー",
    "パズル/推理",
    "シミュレーション"
  ];

  function bucketGame(g) {
    const gs = (g.genres || []).map(s => s.toLowerCase());
    if (gs.includes("fps") || gs.includes("shooter")) return CAT6[0];
    if (gs.includes("horror")) return CAT6[1];
    if (gs.includes("co-op") || gs.includes("party")) return CAT6[2];
    if (gs.includes("puzzle") || gs.includes("programming") || gs.includes("mystery") || gs.includes("strategy")) return CAT6[4];
    if (gs.includes("simulation") || gs.includes("life")) return CAT6[5];
    return CAT6[3];
  }

  const GENRE_INFO = {
    [CAT6[0]]: { icon: "🔫", desc: "一人称視点・射撃重視のスリル" },
    [CAT6[1]]: { icon: "👻", desc: "恐怖演出と緊張感を楽しむ" },
    [CAT6[2]]: { icon: "🤝", desc: "友達と協力して盛り上がる" },
    [CAT6[3]]: { icon: "🧭", desc: "操作の爽快感と探索の面白さ" },
    [CAT6[4]]: { icon: "🧩", desc: "考えて解くロジックや推理" },
    [CAT6[5]]: { icon: "🛠️", desc: "現実的な体験や生活の再現" }
  };

  // ===== TOP3カルーセル =====
  function heroCarousel() {
    const root = document.createElement("div");
    root.className = "container hero";

    const slides = (DATA.ranking || [])
      .slice()
      .sort((a, b) => a.rank - b.rank)
      .map(r => {
        const g = DATA.games.find(x => x.id === r.gameId);
        return {
          id: g.id,
          title: g.title,
          cover: g.cover,
          genres: g.genres,
          review: g.review
        };
      });

    root.innerHTML = `
      <div class="carousel" id="carousel">
        ${slides.map((s, i) => {
          const game = DATA.games.find(x => x.id === s.id);
          return `
            <div class="slide ${i === 0 ? "active" : ""}" data-id="${s.id}">
              <img src="${s.cover}" alt="">
              <div class="slide-info">
                <div class="cta">
                  <h1 class="title card-title-text">${s.title}</h1>
                  <div class="card-badges-line">
                    ${ratingBadge(game)}
                  </div>
                  <div style="margin:6px 0">
                    ${s.genres.map(t => `<span class="tag">${t}</span>`).join("")}
                  </div>
                  <div style="max-width:720px;opacity:.9;margin-bottom:10px">${s.review}</div>
                  <button class="btn primary" data-goto="${s.id}">詳細</button>
                </div>
              </div>
              <div class="controls">
                <div class="arrow" data-prev>❮</div>
                <div class="arrow" data-next>❯</div>
              </div>
              <div class="dots">
                ${slides.map((_, j) => `
                  <div class="dot ${j === i ? "active" : ""}" data-dot="${j}"></div>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
    setTimeout(() => initCarousel(root.querySelector("#carousel")), 0);
    return root;
  }

  function initCarousel(el) {
    const slides = Array.from(el.querySelectorAll(".slide"));
    let idx = 0;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => {
        s.classList.toggle("active", k === idx);
        s.querySelectorAll(".dot").forEach((d, j) => {
          d.classList.toggle("active", j === idx);
        });
      });
    }

    const next = () => show(idx + 1);
    const prev = () => show(idx - 1);

    slides.forEach(s => {
      s.querySelector("[data-next]").onclick = next;
      s.querySelector("[data-prev]").onclick = prev;
      s.querySelectorAll("[data-goto]").forEach(b => {
        b.onclick = () => setRoute(`#/games/${b.dataset.goto}`);
      });
      s.querySelectorAll("[data-dot]").forEach(d => {
        d.onclick = () => show(parseInt(d.dataset.dot, 10));
      });
    });

    clearInterval(state.timer);
    state.timer = setInterval(next, 4000);
  }

  // ===== 一覧用カード =====
  function cardsRow(title, list) {
    const wrap = document.createElement("div");
    wrap.className = "container";
    wrap.innerHTML = `<h2 class="title">${title}</h2><div class="grid"></div>`;
    const grid = wrap.querySelector(".grid");

    list.forEach(g => {
      const el = document.createElement("div");
      el.className = "card";
      const priceText = typeof g.price === "number"
        ? `${g.price.toLocaleString()}円`
        : "価格情報未設定";
      el.innerHTML = `
        <div class="thumb" style="background:url('${g.cover}') center/cover no-repeat"></div>
        <div class="content">
          <div class="card-header-line">
            <span class="card-title-text">${g.title}</span>
          </div>
          <div class="card-badges-line">
            ${ratingBadge(g)}
          </div>
          <div style="margin:6px 0">
            ${g.genres.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
          <div class="meta price">価格：${priceText}</div>
          <button class="btn" data-id="${g.id}">詳細</button>
        </div>
      `;
      el.querySelector("button").onclick = () => setRoute(`#/games/${g.id}`);
      grid.appendChild(el);
    });

    return wrap;
  }

  // ===== おすすめタブ（一覧） =====
  function listView() {
    app.innerHTML = "";

    // フィルターバー
    const controls = document.createElement("div");
    controls.className = "container filter-bar";
    controls.innerHTML = `
      <div class="filter-left">
        <label>おすすめ段階：
          <select id="ratingFilter">
            <option value="ALL">すべて</option>
            <option value="S">超オススメ</option>
            <option value="A">おすすめ</option>
            <option value="B">まぁまぁ</option>
            <option value="C">おすすめしない</option>
          </select>
        </label>
        <label>値段並び替え：
          <select id="priceSort">
            <option value="none">なし</option>
            <option value="asc">安い順</option>
            <option value="desc">高い順</option>
          </select>
        </label>
      </div>
    `;
    app.appendChild(controls);

    // ランキング見出し
    const head = document.createElement("div");
    head.className = "ranking-header container";
    head.innerHTML = `<h2>2023〜2025 ランキングTOP3</h2>`;
    app.appendChild(head);

    // TOP3カルーセル
    app.appendChild(heroCarousel());

    // カード一覧（ランキング以外）
    let list = DATA.games.filter(g => !DATA.ranking.some(r => r.gameId === g.id));

    // おすすめ段階フィルタ
    if (state.ratingFilter !== "ALL") {
      list = list.filter(g => getRating(g) === state.ratingFilter);
    }

    // 値段ソート（price を data.js に追加すれば有効）
    if (state.priceSort === "asc") {
      list = list.slice().sort((a, b) => {
        const pa = typeof a.price === "number" ? a.price : Number.MAX_SAFE_INTEGER;
        const pb = typeof b.price === "number" ? b.price : Number.MAX_SAFE_INTEGER;
        return pa - pb;
      });
    } else if (state.priceSort === "desc") {
      list = list.slice().sort((a, b) => {
        const pa = typeof a.price === "number" ? a.price : -1;
        const pb = typeof b.price === "number" ? b.price : -1;
        return pb - pa;
      });
    }

    app.appendChild(cardsRow("レビューしたゲーム一覧", list));

    const rf = $("#ratingFilter", controls);
    const ps = $("#priceSort", controls);
    rf.value = state.ratingFilter;
    ps.value = state.priceSort;

    rf.onchange = e => {
      state.ratingFilter = e.target.value;
      render();
    };
    ps.onchange = e => {
      state.priceSort = e.target.value;
      render();
    };
  }

  // ===== カテゴリ一覧 =====
  function genresView() {
    const counts = new Map(CAT6.map(n => [n, 0]));
    DATA.games.forEach(g => {
      const b = bucketGame(g);
      counts.set(b, (counts.get(b) || 0) + 1);
    });

    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `<h2 class="title">カテゴリ（6分類）</h2><div class="cat-grid"></div>`;
    const grid = container.querySelector(".cat-grid");

    CAT6.forEach(name => {
      const info = GENRE_INFO[name];
      const el = document.createElement("div");
      el.className = "cat";
      el.innerHTML = `
        <div class="icon">${info.icon}</div>
        <div>
          <div class="card-header-line">
            <span class="card-title-text">${name}</span>
          </div>
          <div class="card-badges-line">
            <!-- カテゴリ自体にはランクは付けない -->
          </div>
          <div class="meta">${info.desc}</div>
          <div class="meta">${counts.get(name) || 0} タイトル</div>
          <div style="margin-top:8px">
            <button class="btn" data-name="${name}">このカテゴリを見る</button>
          </div>
        </div>
      `;
      el.querySelector("button").onclick = () => setRoute(`#/genres/${encodeURIComponent(name)}`);
      grid.appendChild(el);
    });

    app.innerHTML = "";
    app.appendChild(container);
  }

  // ===== 詳細ページ =====
  function detailView(id) {
    const g = DATA.games.find(x => x.id === id);
    if (!g) {
      setRoute("#/list");
      return;
    }

    const container = document.createElement("div");
    container.className = "container";

    const likesObj = getLikes();
    const alreadyLiked = !!likesObj[g.id];
    const likeCount = alreadyLiked ? 1 : 0;

    const priceText = typeof g.price === "number"
      ? `${g.price.toLocaleString()}円`
      : "価格情報未設定";

    const galleryHtml = (g.images && g.images.length > 0)
      ? g.images.map(src => `
          <img src="${src}" alt="">
        `).join("")
      : `<div class="hint">プレイ画像を撮影していません</div>`;

    container.innerHTML = `
      <div class="card">
        <div class="thumb" style="height:260px;background:url('${g.cover}') center/cover no-repeat"></div>
        <div class="content">
          <div class="card-header-line">
            <h1 class="title card-title-text">${g.title}</h1>
          </div>
          <div class="card-badges-line">
            ${ratingBadge(g)}
          </div>
          <div style="margin:6px 0">
            ${g.genres.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
          <div class="meta price">価格：${priceText}</div>

          <div class="section">
            <div class="label">私のプレイ感想</div>
            <div>${(g.review || "").replace(/\n/g, "<br>")}</div>
          </div>

          <div class="section">
            <button class="btn secondary" id="btnLike" data-id="${g.id}">
              参考になった（<span id="likeCount">${likeCount}</span>）
            </button>
          </div>

          <div class="section">
            <a class="btn primary" href="${g.steamUrl || "#"}" target="_blank" rel="noopener">
              Steamを開く
            </a>
          </div>

          <div class="section">
            <div class="label">プレイ画像</div>
            <div class="gallery">
              ${galleryHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    app.innerHTML = "";
    app.appendChild(container);

    // 「参考になった」は1人1回だけ
    const btnLike = $("#btnLike", container);
    const likeSpan = $("#likeCount", container);
    if (alreadyLiked) {
      btnLike.disabled = true;
    }
    btnLike.onclick = () => {
      const all = getLikes();
      if (all[g.id]) return;   // 既に押していたら何もしない
      all[g.id] = true;
      saveLikes(all);
      likeSpan.textContent = 1;
      btnLike.disabled = true;
    };

    // プレイ画像クリックで拡大
    const imgs = container.querySelectorAll(".gallery img");
    imgs.forEach(img => {
      img.addEventListener("click", () => openImageModal(img.src));
    });
  }

  // ===== メイン render =====
  function render() {
    setActiveTab();
    $("#year").textContent = new Date().getFullYear();

    if (!state.loggedIn && state.route !== "#/login") {
      setRoute("#/login");
      return;
    }
    if (!state.loggedIn) {
      loginView();
      return;
    }

    if (state.route.startsWith("#/genres/") && state.selectedGenre) {
      const filter = state.selectedGenre;
      const list = DATA.games.filter(g => bucketGame(g) === filter);

      const container = document.createElement("div");
      container.className = "container";
      container.innerHTML = `<h2 class="title">${filter} のゲーム</h2><div class="grid"></div>`;
      const grid = container.querySelector(".grid");

      list.forEach(g => {
        const el = document.createElement("div");
        el.className = "card";
        const priceText = typeof g.price === "number"
          ? `${g.price.toLocaleString()}円`
          : "価格情報未設定";
        el.innerHTML = `
          <div class="thumb" style="background:url('${g.cover}') center/cover no-repeat"></div>
          <div class="content">
            <div class="card-header-line">
              <span class="card-title-text">${g.title}</span>
            </div>
            <div class="card-badges-line">
              ${ratingBadge(g)}
            </div>
            <div style="margin:6px 0">
              ${g.genres.map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
            <div class="meta price">価格：${priceText}</div>
            <button class="btn" data-id="${g.id}">詳細</button>
          </div>
        `;
        el.querySelector("button").onclick = () => setRoute(`#/games/${g.id}`);
        grid.appendChild(el);
      });

      app.innerHTML = "";
      app.appendChild(container);
      return;
    }

    if (state.route.startsWith("#/games/") && state.selectedGameId) {
      detailView(state.selectedGameId);
      return;
    }

    if (state.route === "#/genres") {
      genresView();
      return;
    }

    // デフォルトはおすすめタブ
    listView();
  }

  // 初期化
  headerEvents();
  render();
})();