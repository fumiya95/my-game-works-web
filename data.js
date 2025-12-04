const DATA = {
  "credentials": {
    "username": "student",
    "password": "1234"
  },
  "profile": {
    "owner": "nemoto"
  },
  "ranking": [
    { "rank": 1, "gameId": "majo-justice-2" },
    { "rank": 2, "gameId": "arena-breakout-infinite" },
    { "rank": 3, "gameId": "repo" }
  ],
  "games": [

    {
      "id": "majo-justice-2",
      "title": "🥇1位 魔法少女ノ魔女裁判",
      "genres": ["Adventure", "Horror"],
      "recommend": true,
      "price": 3500,
      "cover": "images/manosabamain.png",
      "images": ["images/manosaba.jpg", "images/manosaba2.jpg", "images/manosaba3.jpg"],
      "steamUrl": "https://store.steampowered.com/app/3101040/_/",
      "review": "ストーリーやキャラのビジュアル、没入感の完成度が高く、特に“選択で物語が大きく変わる”点が魅力です。選択を誤ると予想外で少し怖い展開になるのも面白いところ。より楽しむなら「ヒントOFF」がおすすめ。2800円で迷いましたが買って正解でした。小説や推理が好きな人には特に向いています。ただし、文字を読むのが苦手な人やメンタルが不安定な人にはやや重く感じるかも。時折証拠が少なく「これで合ってる？」と思う場面もありますが、推理を楽しめる人なら満足できるゲームです。"
    },

    {
      "id": "arena-breakout-infinite",
      "title": "🥈2位 Arena Breakout: Infinite",
      "genres": ["FPS", "Extraction"],
      "recommend": true,
      "price": 0,
      "cover": "images/ariburemain.WEBP",
      "images": ["images/aribureplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2073620/Arena_Breakout_Infinite/",
      "review": "プレイヤーレベル30までやったものです。とうとうSteam版が少し遅れてリリースされました！タルコフが高くて買えない人におすすめです。物資がその場で相場の価値がわかる点がタルコフより優しくていいですね。微課金でプレイをしたい人は倉庫拡張がおすすめです。"
    },

    {
      "id": "repo",
      "title": "🥉3位 R.E.P.O.",
      "genres": ["Horror", "Co-op"],
      "recommend": true,
      "price": 1200,
      "cover": "images/repomain.JPG",
      "images": ["images/repoplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/3241660/REPO/",
      "review": "仲間と協力して任務を遂行するタイプの協力型ホラーゲームです。ルールがシンプルで分かりやすく、Lethal Companyよりも難易度がやや優しめに感じました。パーティーゲームのような要素も強く、人数が多いほど盛り上がること間違いなしです！"
    },

    {
      "id": "zort",
      "title": "Zort",
      "genres": ["Co-op", "Indie"],
      "recommend": true,
      "price": 500,
      "cover": "images/zortmain.jpg",
      "images": ["images/zortplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/3121110/Zort/",
      "review": "おすすめします。500円にしてはボリュームがあり、マルチで友達と遊ぶにはちょうど良いゲームだと思います。一部クオリティが低く感じる部分もありますが、フレンドとわいわい楽しむ分には全く問題なく、十分に盛り上がれました。"
    },

    {
      "id": "battlefield6",
      "title": "Battlefield™ 6",
      "genres": ["FPS"],
      "recommend": true,
      "price": 9800,
      "cover": "images/bf6main.AVIF",
      "images": ["images/bf6game1.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2807960/Battlefield_6/",
      "review": "おすすめします。非常にリアルな戦場の臨場感と、ダイナミックな破壊表現を存分に楽しむことができます。"
    },

    {
      "id": "farmer-replaced",
      "title": "農家は Replace() されました",
      "genres": ["Puzzle", "Programming"],
      "recommend": true,
      "price": 1200,
      "cover": "images/noukamain.jpg",
      "images": ["images/nouka.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2060160/_Replace/",
      "review": "おすすめします。授業でPythonを学んでいる中で、コードを書く楽しさをあまり感じられなかった自分でも、このゲームを通して「プログラミングって面白い」と思えるようになりました。あくまで“ゲーム”としてではなく、“学習ツール”として購入するのがおすすめです。ProgateなどでPythonの基礎講座を一通り学んでからプレイすると、より理解が深まり楽しめます。まだ数時間しか遊んでいませんが、何十時間も続けていくうちに、少しでもプログラミングの技術が向上すればいいなと思っています。"
    },

    {
      "id": "escape-from-daccof",
      "title": "エスケープ フロム ダッコフ",
      "genres": ["Extraction", "Shooter"],
      "recommend": true,
      "price": 1800,
      "cover": "images/dakkohumain.jpg",
      "images": ["images/dakohuplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/3167020/_/",
      "review": "おすすめします。PvPが怖かったり、『タルコフ』の敷居が高くて手を出せなかった人にちょうどいい作品です。タスクをこなして報酬を得るシステムが楽しく、ハマる人はとことんハマると思います。一方で、『タルコフ』や『アリブレ』のような高い緊張感を求める人には、少し物足りなく感じるかもしれません。"
    },

    {
      "id": "obra-dinn",
      "title": "Return of the Obra Dinn",
      "genres": ["Puzzle", "Mystery"],
      "recommend": false,
      "price": 2300,
      "cover": "images/returnmain.avif",
      "images": ["images/orplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/653530/Return_of_the_Obra_Dinn/",
      "review": "おすすめしません。独特なモノクロ調のグラフィックと緻密な推理要素が特徴の作品ですが、全体的に美術館の展示を眺めているような雰囲気で、自分にはあまり合いませんでした。雰囲気や芸術性を重視する人には向いているかもしれません。"
    },

    {
      "id": "ultimate-chicken-horse",
      "title": "Ultimate Chicken Horse",
      "genres": ["Party", "Action"],
      "recommend": true,
      "price": 1600,
      "cover": "images/arutikimain.webp",
      "images": ["images/ultimateplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/386940/Ultimate_Chicken_Horse/",
      "review": "おすすめします。自分たちでステージを作りながら遊ぶ、マリオメーカーのような対戦型アクションゲームです。友達とプレイすると非常に盛り上がりますが、2時間ほどで満足してしまうボリューム感です。定価の1600円ではやや割高に感じるため、セールのとき（約640円）に購入するのがおすすめです。"
    },

    {
      "id": "the-sims-4",
      "title": "The Sims™ 4",
      "genres": ["Simulation", "Life"],
      "recommend": true,
      "price": 0,
      "cover": "images/sim4main.jpg",
      "images": ["images/simplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1222670/The_Sims_4/",
      "review": "自分だけのキャラクターを作り、家を建て、仕事や恋愛、生活を自由に楽しめるリアルなお人形遊びのようなゲームです。想像力次第で何時間でも遊べる奥深さがあり、現実とは違う人生を体験したい人にぴったりです。"
    },

    {
      "id": "street-fighter-6",
      "title": "Street Fighter 6",
      "genres": ["Action", "Fighting"],
      "recommend": false,
      "price": 4990,
      "cover": "images/st6main.avif",
      "images": ["images/st6play.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1364780/Street_Fighter_6/",
      "review": "セールのときに購入しましたが、練習モードでコンボを覚えるのが面倒で続きませんでした。そしてこのゲームにはモダン操作とクラシック操作があり、モダン操作ならでは動きで負けることがあるので操作が分かれている点はゲームの不公正さを生み出している。"
    },

    {
      "id": "delta-force",
      "title": "Delta Force",
      "genres": ["FPS"],
      "recommend": false,
      "price": 0,
      "cover": "images/deltamain.jpeg",
      "images": ["images/delplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2507950/Delta_Force/",
      "review": "オペレーションズが追加されたため再度プレイしてみましたが、スキルのバランスが悪く、全体的に調整不足を感じました。"
    },

    {
      "id": "buckshot-roulette",
      "title": "Buckshot Roulette",
      "genres": ["Party", "Strategy"],
      "recommend": false,
      "price": 350,
      "cover": "images/buckshotmain.jpg",
      "images": ["images/buckplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2835570/Buckshot_Roulette/",
      "review": "ロシアンルーレット風の心理戦ゲーム。ソロだとあっさり、最近のマルチは一人狙いが起きやすい。"
    },

    {
      "id": "the-finals",
      "title": "THE FINALS",
      "genres": ["FPS"],
      "recommend": false,
      "price": 0,
      "cover": "images/finalsmain.jpeg",
      "images": ["images/finalplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2073850/THE_FINALS/",
      "review": "派手な破壊表現とスピード感のあるFPSですが、他タイトルへの影響も含めてあまり良い印象を持てませんでした。"
    },

    {
      "id": "anomaly-exit",
      "title": "Anomaly Exit",
      "genres": ["Horror", "Exploration"],
      "recommend": true,
      "price": 550,
      "cover": "images/anomalymain.jpeg",
      "images": ["images/exitplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2232600/Anomaly_Exit/",
      "review": "異常現象を見つけて報告するホラー系探索。マルチ対応の初見恐怖が良いが、異変が多めなのが残念(クリアが簡単)。"
    },

    {
      "id": "ready-or-not",
      "title": "Ready or Not",
      "genres": ["FPS", "Tactical"],
      "recommend": true,
      "price": 7150,
      "cover": "images/readymain.jpg",
      "images": ["images/notplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1144200/Ready_or_Not/",
      "review": "SWAT隊員として突入作戦を行うタクティカルFPS。美しいグラフィックと緊張感。"
    },

    {
      "id": "devour",
      "title": "DEVOUR",
      "genres": ["Horror", "Co-op"],
      "recommend": true,
      "price": 1200,
      "cover": "images/devourmain.jpg",
      "images": ["images/devorplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1274570/DEVOUR/",
      "review": "邪悪な存在から逃げながら儀式を進める協力型ホラー。終盤は難易度急上昇だがフレンドと盛り上がる。"
    },

    {
      "id": "payday-2",
      "title": "PAYDAY 2",
      "genres": ["FPS", "Co-op"],
      "recommend": false,
      "price": 1200,
      "cover": "images/payday2main.webp",
      "images": ["images/payday2.jpg"],
      "steamUrl": "https://store.steampowered.com/app/218620/PAYDAY_2/",
      "review": "協力して銀行強盗などを行うFPSだが、敵の無限湧きBOT感や古さが目立つ。"
    },

    {
      "id": "palworld",
      "title": "Palworld / パルワールド",
      "genres": ["Simulation", "Adventure"],
      "recommend": true,
      "price": 3400,
      "cover": "images/palworldmain.webp",
      "images": ["images/palplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1623730/Palworld/",
      "review": "人気ゲームの要素を上手く取り入れ新鮮。拠点づくりや素材集めが好きなら楽しめる。"
    },

    {
      "id": "surgeon-simulator-2",
      "title": "Surgeon Simulator 2",
      "genres": ["Simulation"],
      "recommend": false,
      "price": 2300,
      "cover": "images/surgeonmain.jpg",
      "images": ["images/surplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/774791/Surgeon_Simulator_2/",
      "review": "手術をテーマにしたユニークなゲーム。最初は楽しいが作業が繰り返しで飽きやすい。"
    },

    {
      "id": "apex-legends",
      "title": "Apex Legends",
      "genres": ["FPS", "Battle Royale"],
      "recommend": false,
      "price": 0,
      "cover": "images/apexmain.avif",
      "images": ["images/apexplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1172470/_/",
      "review": "キーボードマウスで高い操作スキルを磨いてもaimアシストにより不公平さを感じる場面が多い。"
    },

    {
      "id": "ultimate-fishing-simulator",
      "title": "究極の釣りシミュレータ",
      "genres": ["Simulation"],
      "recommend": true,
      "price": 2300,
      "cover": "images/fishmain.jpg",
      "images": ["images/turiplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/468920/_/",
      "review": "リアルな釣り体験。脳を休めたい時や自然を求めたいときに良いです。"
    },

    {
      "id": "meikyu-kosha",
      "title": "迷宮校舎",
      "genres": ["Horror"],
      "recommend": false,
      "price": 780,
      "cover": "images/meikyuumain.jpg",
      "images": ["images/meiplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2423300/_/",
      "review": "ホラー要素はあるが攻略は簡単で単調。敵が同じところを徘徊される点も改善点の一つ"
    },

    {
      "id": "hero-aca-ultra-rumble",
      "title": "僕のヒーローアカデミア ULTRA RUMBLE",
      "genres": ["Action"],
      "recommend": false,
      "price": 0,
      "cover": "images/hiroakamain.jpg",
      "images": ["images/hiroplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1607250/_ULTRA_RUMBLE/",
      "review": "格闘バトルロワイヤル。キャラの強さのバランスや動きに違和感があり、クオリティが最近のゲームにしては低めな印象。"
    },

    {
      "id": "the-outlast-trials",
      "title": "The Outlast Trials",
      "genres": ["Horror", "Co-op"],
      "recommend": true,
      "price": 4500,
      "cover": "images/outlastmain.jpg",
      "images": ["images/outplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/1304930/The_Outlast_Trials/",
      "review": "ガソリンを発電機に入れたり、部品を運んだり、塩酸でスープを作ったりといったタスクをこなしてエリアを進み、最終的に脱出を目指すホラーゲームです。グロテスクな描写が多く、緊張感と恐怖感の演出が非常に上手いです。一人で遊ぶよりも、フレンドと協力してプレイする方がより楽しめます。"
    },

    {
      "id": "backrooms-escape-together",
      "title": "Backrooms: Escape Together",
      "genres": ["Horror"],
      "recommend": false,
      "price": 1200,
      "cover": "images/backroomsTmain.jpg",
      "images": ["images/togetplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/2141730/Backrooms_Escape_Together/",
      "review": "脱出系ホラーゲーム。1000円に対してボリューム不足で敵が出てこない雰囲気だけのステージが多いためおすすめできない。ただし画質は綺麗"
    },

    {
      "id": "dead-by-daylight",
      "title": "Dead by Daylight",
      "genres": ["Horror", "PvP"],
      "recommend": false,
      "price": 1980,
      "cover": "images/dbdmain.jpg",
      "images": ["images/dbdplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/381210/_/",
      "review": "プレイヤーのマナーが悪い人と当たることが多く、煽られることもしばしばあります。ゲーム自体の完成度は高いものの、対人環境が合わない人にはストレスがたまりやすいと思います。"
    },

    {
      "id": "left4dead2",
      "title": "Left 4 Dead 2",
      "genres": ["FPS", "Co-op"],
      "recommend": true,
      "price": 1200,
      "cover": "images/l4d2main.jpg",
      "images": [],
      "steamUrl": "https://store.steampowered.com/app/550/Left_4_Dead_2/",
      "review": "4人協力プレイでゾンビの群れを相手に戦う、テンポの良いアクションシューティングゲームです。古いタイトルながら、今遊んでも十分に面白く、爽快感があります。グラフィックボードのないIntel内蔵GPUでも快適に動作する点も魅力です。"
    },

    {
      "id": "stardew-valley",
      "title": "Stardew Valley",
      "genres": ["Simulation", "Life"],
      "recommend": true,
      "price": 1480,
      "cover": "images/stardewmain.jpg",
      "images": ["images/starplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/413150/Stardew_Valley/",
      "review": "畑を耕したり、釣りをしたり、住民と交流したりと、のんびりとした田舎生活を楽しめるゲームです。忙しい日常の合間に、こういうゆったりした時間を過ごすのも悪くないと感じました。"
    },

    {
      "id": "half-life-2",
      "title": "Half-Life 2",
      "genres": ["FPS"],
      "recommend": true,
      "price": 1200,
      "cover": "images/half2main.jpg",
      "images": ["images/halplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/220/HalfLife_2/",
      "review": "2004年作とは思えない完成度。ではあるが最近のゲームと比べたらクオリティが低いが、昔のゲーム大作に触れたい人向け"
    },

    {
      "id": "raft",
      "title": "Raft",
      "genres": ["Simulation", "Adventure"],
      "recommend": false,
      "price": 1980,
      "cover": "images/raftmain.jpg",
      "images": ["images/raftplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/648800/Raft/",
      "review": "最初はやることがわかってくると楽しいのですが、目標を見失うと一気に飽きてしまいます。飽きやすい人には、サバイバル系のゲームはあまり向いていないと思います。システム的に面白いのでサバイバルゲームなので人によってはおすすめかもしれない。"
    },

    {
      "id": "goat-simulator-3",
      "title": "Goat Simulator 3",
      "genres": ["Action", "Simulation", "Party"],
      "recommend": true,
      "price": 3400,
      "cover": "images/goatsimulatormain.webp",
      "images": ["images/goatplay.jpg"],
      "steamUrl": "https://store.steampowered.com/app/850190/Goat_Simulator_3/",
      "review": "なんでも好き放題に暴れられる、カオスで自由度の高いゲームです。最初は破壊の爽快感が楽しいものの、刺激に慣れると数時間で飽きてしまうかもしれません。小中学生など、ドタバタ系のノリが好きな人には特におすすめです。"
    }
  ]
};