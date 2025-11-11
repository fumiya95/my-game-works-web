(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $("#app");
  const state = { loggedIn: false, route: location.hash || "#/login", selectedGenre: null, selectedGameId: null, timer: null };

  function setRoute(h) { state.route = h; location.hash = h; render(); }
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

  function badge(rec) { if (rec === true) return '<span class="badge">おすすめ</span>'; if (rec === false) return '<span class="badge ng">おすすめしない</span>'; return ""; }

  function loginView() {
    app.innerHTML = `
      <div class="login card container">
        <h1 class="title">ログイン</h1>
        <div class="section"><div class="label">ユーザー名</div><input id="loginUser" class="input" placeholder="ユーザー名"></div>
        <div class="section"><div class="label">パスワード</div><input id="loginPass" class="input" placeholder="パスワード" type="password"></div>
        <button id="btnLogin" class="btn primary">ログイン</button>
        <div class="hint">ユーザー名：<b>${DATA.credentials.username}</b>　パスワード：<b>${DATA.credentials.password}</b></div>
      </div>`;
    $("#btnLogin").onclick = () => {
      const u = $("#loginUser").value.trim(), p = $("#loginPass").value;
      if (u === DATA.credentials.username && p === DATA.credentials.password) { state.loggedIn = true; setRoute("#/list"); }
      else alert("ユーザー名またはパスワードが違います。");
    };
  }

  function headerEvents() {
    $("#tabList").onclick = () => setRoute("#/list");
    $("#tabGenres").onclick = () => setRoute("#/genres");
    $("#year").textContent = new Date().getFullYear();
  }

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

  function heroCarousel() {
    const root = document.createElement("div");
    root.className = "container hero";
    const slides = DATA.ranking.slice().sort((a, b) => a.rank - b.rank).map(r => {
      const g = DATA.games.find(x => x.id === r.gameId);
      return { id: g.id, title: g.title, cover: g.cover, recommend: g.recommend, genres: g.genres, review: g.review };
    });
    root.innerHTML = `
      <div class="carousel" id="carousel">
        ${slides.map((s, i) => `
          <div class="slide ${i === 0 ? 'active' : ''}" data-id="${s.id}">
            <img src="${s.cover}" alt="">
            <div class="slide-info">
              <div class="cta">
                <h1>${s.title} ${badge(s.recommend)}</h1>
                <div style="margin:6px 0">${s.genres.map(t => `<span class="tag">${t}</span>`).join("")}</div>
                <div style="max-width:720px;opacity:.9;margin-bottom:10px">${s.review}</div>
                <button class="btn primary" data-goto="${s.id}">詳細</button>
              </div>
            </div>
            <div class="controls">
              <div class="arrow" data-prev>❮</div>
              <div class="arrow" data-next>❯</div>
            </div>
            <div class="dots">${slides.map((_, j) => `<div class="dot ${j === i ? 'active' : ''}" data-dot="${j}"></div>`).join("")}</div>
          </div>`).join("")}
      </div>`;
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
        s.querySelectorAll(".dot").forEach((d, j) => d.classList.toggle("active", j === idx));
      });
    }
    const next = () => show(idx + 1);
    const prev = () => show(idx - 1);
    slides.forEach(s => {
      s.querySelector("[data-next]").onclick = next;
      s.querySelector("[data-prev]").onclick = prev;
      s.querySelectorAll("[data-goto]").forEach(b => b.onclick = () => setRoute(`#/games/${b.dataset.goto}`));
      s.querySelectorAll("[data-dot]").forEach(d => d.onclick = () => show(parseInt(d.dataset.dot)));
    });
    clearInterval(state.timer);
    state.timer = setInterval(next, 4000);
  }

  function cardsRow(title, list) {
    const wrap = document.createElement("div");
    wrap.className = "container";
    wrap.innerHTML = `<h2 class="title">${title}</h2><div class="grid"></div>`;
    const grid = wrap.querySelector(".grid");
    list.forEach(g => {
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `<div class="thumb" style="background:url('${g.cover}') center/cover no-repeat"></div>
        <div class="content">
          <div style="font-weight:700">${g.title} ${badge(g.recommend)}</div>
          <div style="margin:6px 0">${g.genres.map(t => `<span class="tag">${t}</span>`).join("")}</div>
          <button class="btn" data-id="${g.id}">詳細</button>
        </div>`;
      el.querySelector("button").onclick = () => setRoute(`#/games/${g.id}`);
      grid.appendChild(el);
    });
    return wrap;
  }

  function listView() {
    app.innerHTML = "";

    // ★ランキング見出し（おすすめ＝一覧のときだけ）
    const head = document.createElement("div");
    head.className = "ranking-header container";
    head.innerHTML = `<h2>2023~2025 ランキングTOP3</h2>`;
    app.appendChild(head);

    // ここから既存
    app.appendChild(heroCarousel());
    const more = DATA.games
      .filter(g => !DATA.ranking.some(r => r.gameId === g.id))
      .slice(0, 12);
    app.appendChild(cardsRow("過去に話題なったタイトル", more));
  }

  function genresView() {
    const counts = new Map(CAT6.map(n => [n, 0]));
    DATA.games.forEach(g => counts.set(bucketGame(g), (counts.get(bucketGame(g)) || 0) + 1));
    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `<h2 class="title">カテゴリ（6分類）</h2><div class="cat-grid"></div>`;
    const grid = container.querySelector(".cat-grid");
    CAT6.forEach(name => {
      const info = GENRE_INFO[name];
      const el = document.createElement("div");
      el.className = "cat";
      el.innerHTML = `<div class="icon">${info.icon}</div>
        <div><div style="font-weight:700">${name}</div>
        <div class="meta">${info.desc}</div>
        <div class="meta">${counts.get(name) || 0} タイトル</div>
        <div style="margin-top:8px"><button class="btn" data-name="${name}">このカテゴリを見る</button></div></div>`;
      el.querySelector("button").onclick = () => setRoute(`#/genres/${encodeURIComponent(name)}`);
      grid.appendChild(el);
    });
    app.innerHTML = ""; app.appendChild(container);
  }

  function detailView(id) {
    const g = DATA.games.find(x => x.id === id);
    if (!g) { setRoute("#/list"); return; }
    const container = document.createElement("div");
    container.className = "container";
    const gallery = (g.images || []).map(s => `<img src="${s}" alt="">`).join("");
    container.innerHTML = `
      <div class="row">
        <div class="card" style="flex:2 1 520px">
          <div class="thumb" style="height:260px;background:url('${g.cover}') center/cover no-repeat"></div>
          <div class="content">
            <h1 class="title">${g.title} ${badge(g.recommend)}</h1>
            <div style="margin:6px 0">${g.genres.map(t => `<span class="tag">${t}</span>`).join("")}</div>
            <div class="section"><div class="label">私のプレイ感想</div><div>${(g.review || "").replace(/\\n/g, "<br>")}</div></div>
            <div class="section"><a class="btn primary" href="${g.steamUrl || '#'}" target="_blank" rel="noopener">Steamを開く</a></div>
          </div>
        </div>
        <div class="card" style="flex:1 1 300px">
          <div class="content">
            <div class="label">プレイ写真</div>
            <div class="gallery">${gallery || "<div class='hint'>images/ に入れて data.js の images に追記</div>"}</div>
          </div>
        </div>
      </div>`;
    app.innerHTML = ""; app.appendChild(container);
  }

  function render() {
    setActiveTab();
    $("#year").textContent = new Date().getFullYear();
    if (!state.loggedIn && state.route !== "#/login") { setRoute("#/login"); return; }
    if (!state.loggedIn) return loginView();
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
        el.innerHTML = `<div class="thumb" style="background:url('${g.cover}') center/cover no-repeat"></div>
          <div class="content">
            <div style="font-weight:700">${g.title} ${badge(g.recommend)}</div>
            <div style="margin:6px 0">${g.genres.map(t => `<span class="tag">${t}</span>`).join("")}</div>
            <button class="btn" data-id="${g.id}">詳細</button>
          </div>`;
        el.querySelector("button").onclick = () => setRoute(`#/games/${g.id}`);
        grid.appendChild(el);
      });
      app.innerHTML = ""; app.appendChild(container);
      return;
    }
    if (state.route.startsWith("#/games/") && state.selectedGameId) return detailView(state.selectedGameId);
    if (state.route === "#/genres") return genresView();
    if (state.route === "#/list") return listView();
    return listView();
  }

  headerEvents();
  render();
})();