/* ============================================================================
   YOUR TRIP DATA — this is the only file you should need to touch.

   Two ways to edit it:
     1. Tell Claude what changed in chat ("add a stop on the 14th for X at 2pm")
        and it'll edit this file and push for you.
     2. Edit it yourself on GitHub: open this file at
        github.com/tetsuakira-vk/japan-trip, tap the pencil icon, edit, commit
        straight to main. The site (GitHub Pages) redeploys automatically,
        usually within a minute.

   PRIVACY — this repo and site are PUBLIC. Anyone with the link can read this
   file and every past version of it in git history. Don't put exact home/
   lodging addresses, door codes, phone numbers, or anything you wouldn't want
   public in here — use the "Private notes" box on the page instead (saved
   only in your phone's browser storage, never committed to git). Keep this
   file at neighbourhood-level for anything sensitive.

   Shape:
     Each day:  { date:"YYYY-MM-DD", city:"…", stops:[ … ], coords:[lat,lon] }
       - coords: optional. The page guesses weather-forecast coordinates from
                 known city names in `city` (Tokyo, Kyoto, Osaka, Nara,
                 Hiroshima, Fukuoka, Sapporo, Nagoya, Yokohama, Kanazawa,
                 Hakone, Nikko, Kobe). Add coords explicitly if you're
                 somewhere else, or to override the guess. Forecasts only
                 exist ~16 days out and are skipped on "→" travel days.
     Each stop: { time:"09:30", name:"…", note:"…", tags:["food"], map:"search text", photo:"https://…", coords:[lat,lon] }
       - time  : optional, 24h "HH:MM". Leave "" for unscheduled / anytime.
       - map   : what to search in Apple Maps (place name + city works best).
                 Leave "" if there's nothing to map (e.g. "check in", "pack").
       - tags  : any of food, sight, temple, music, transit, stay, free, explore,
                 games, vintage, hike — or make up your own; unrecognised tags render grey
                 (handy for a one-off status flag like "closed").
       - photo : optional. A direct image URL shown as a thumbnail on the
                 card. Prefer stable, openly-licensed sources (e.g. Wikimedia
                 Commons) over random web image results, which can vanish or
                 carry unclear rights. Leave "" (or omit) and a small icon for
                 the stop's first tag is shown instead.
       - coords: optional [lat, lon]. Drops a pin for this stop on the day map
                 (desktop: side panel; mobile: Map tab). Tell Claude the stop
                 and it'll look the coordinates up for you, same as it does
                 for photos and map-link verification — you shouldn't need to
                 find these yourself. A stop with no coords just has no pin.
       - group : optional. Give two or more stops the same group string (e.g.
                 "breakfast") and they collapse into one swipeable carousel
                 card instead of separate cards — handy for "pick one of
                 these" options. Must be on CONSECUTIVE stops in the array.
       - groupLabel : optional, put it on the first stop of the group — the
                 heading shown above the carousel (e.g. "Breakfast · pick one").
                 Defaults to the group string itself if omitted.
     A day with stops: [] renders as a free day.
============================================================================ */
const TRIP = {
  title: "Japan 2026",
  days: [
    { date:"2026-11-08", city:"UK → Tokyo · Travel day", stops:[
      { time:"", name:"Flight to Japan", note:"Whole day is the flight — overnight, lands 07:30 on the 9th. Visit Japan Web QR sorted before boarding.", tags:["transit"], map:"" },
    ]},
    { date:"2026-11-09", city:"Tokyo · Shinjuku — Arrival", stops:[
      { time:"07:30", name:"Land in Tokyo", note:"Immigration + customs — Visit Japan Web QR ready. Grab cash/IC card if needed.", tags:["transit"], map:"" /* ← add Haneda or Narita once you know the airport */ },
      { time:"08:30", name:"Out of the airport → transfer to Airbnb", note:"Pre-booked transfer to Shinjuku", tags:["transit"], map:"" },
      { time:"09:30", name:"Check in + unpack", note:"Airbnb, Hyakunincho. Exact address + door code are in Private Notes below (kept off this public page on purpose). Settle in, grab the wifi code, dump the bags.", tags:["stay"], map:"Hyakunincho, Shinjuku City, Tokyo", coords:[35.7030,139.6986] },
      { time:"", name:"Explore the neighbourhood", note:"First day = just wander. Hyakunincho / Shin-Ōkubo is right there — food street, shops. Ease in, find somewhere for dinner.", tags:["explore"], map:"Shin-Okubo, Shinjuku", coords:[35.7013,139.7001],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Shin_Okubo_Daytime.jpg/250px-Shin_Okubo_Daytime.jpg" /* Photo: Ph0kin, CC BY-SA 3.0, via Wikimedia Commons */ },
    ]},
    { date:"2026-11-10", city:"Tokyo · Shinjuku — First full day", stops:[
      // ---- BREAKFAST · pick one ----
      { time:"08:00", name:"Yayoiken (Hyakunincho)", note:"Traditional set breakfast (grilled fish, rice, miso), order by kiosk. Literally next to the apartment, opens 5am, cheap.", tags:["food"], map:"やよい軒 新宿百人町店", coords:[35.7030,139.6986], group:"breakfast", groupLabel:"Breakfast · pick one" },
      { time:"08:00", name:"Paul Bassett", note:"Proper specialty coffee + brunch plates (eggs benedict etc). West Shinjuku, basement, opens 7:30. ~12 min walk.", tags:["food"], map:"Paul Bassett Shinjuku", group:"breakfast" },
      { time:"10:00", name:"Flipper's (Shinjuku)", note:"SWAPPED IN — A Happy Pancake's Shinjuku branch closed back in 2022, this is the same fluffy-soufflé-pancake idea and it's actually open. Shinjuku 4-1-7, 2F. Opens 9:00.", tags:["food"], map:"Flipper's Shinjuku", coords:[35.6888,139.7042], group:"breakfast" },

      // ---- LATE MORNING · garden or view ----
      { time:"09:30", name:"Shinjuku Gyoen", note:"Big garden, maples turning in Nov. Calm jet-lag antidote. Small fee, opens 9:30, shut Mondays (fine, this is a Tue).", tags:["sight"], map:"Shinjuku Gyoen National Garden", coords:[35.6851,139.7095], group:"morning", groupLabel:"Late morning · garden or view",
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Autumn_leaves_-_Shinjuku_gyoen_-_nov_2016.jpg/250px-Autumn_leaves_-_Shinjuku_gyoen_-_nov_2016.jpg" /* Photo: Nesnad, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"10:30", name:"Tokyo Metro Gov't Building", note:"Free observation deck at 202m, west Shinjuku. Clear mornings = Fuji on the horizon.", tags:["sight"], map:"Tokyo Metropolitan Government Building", coords:[35.6895,139.6917], group:"morning",
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Tokyo_Metropolitan_Government_Building_2024.jpg/250px-Tokyo_Metropolitan_Government_Building_2024.jpg" /* Photo: Kakidai, CC BY-SA 4.0, via Wikimedia Commons */ },

      // ---- LUNCH · pick one ----
      { time:"12:00", name:"Fuunji", note:"Legendary tsukemen (dipping ramen). Technically just over the line in Yoyogi/Shibuya-ku, a couple of minutes from Shinjuku's south exit. Queues; lunch service ends 15:00, closed 15:00–17:00.", tags:["food"], map:"風雲児 代々木2-14-3", coords:[35.6869,139.6967], group:"lunch", groupLabel:"Lunch · pick one" },
      { time:"12:00", name:"Menya Musashi", note:"Shinjuku ramen institution, tsukemen or shoyu. Open all day (to 22:30), less brutal queue. West Shinjuku.", tags:["food"], map:"麺屋武蔵 新宿 西新宿", coords:[35.6956,139.6977], group:"lunch" },
      { time:"12:30", name:"Shin-Ōkubo Koreatown", note:"Casual: just graze your own street. Korean BBQ, cheese dogs, street food, right by the apartment.", tags:["food"], map:"Shin-Okubo Koreatown", coords:[35.7013,139.7001], group:"lunch",
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Shin_Okubo_Daytime.jpg/250px-Shin_Okubo_Daytime.jpg" /* Photo: Ph0kin, CC BY-SA 3.0, via Wikimedia Commons */ },

      // ---- AFTERNOON · your bit ----
      // NEEDS YOUR INPUT — see chat: which Disk Union branch(es) did you actually mean by "VK/metal floors"?
      { time:"13:30", name:"Union Record Shinjuku", note:"Vinyl specifically. Shinjuku 3-34-1, Juraku Twin Bldg 1F, opens 12:00. The used-CD store (3-17-5, T&T III Bldg 3F) is a short walk. There's also a separate genre-specific Rock CD Store (3-31-4, Yamada Bldg 5F) if the metal/VK stuff lives there instead — worth checking before you go.", tags:["music"], map:"ユニオンレコード新宿", coords:[35.6903,139.7031] },
      { time:"15:30", name:"Kabukicho + Godzilla Head", note:"Neon wander to shift gears. Godzilla peering over the Toho building (Hotel Gracery). Tame by day, sets up the night.", tags:["explore"], map:"Godzilla Head Shinjuku", coords:[35.6956,139.7023],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Shinjuku-Toho-Geb%C3%A4ude_in_Tokio_03.jpg/250px-Shinjuku-Toho-Geb%C3%A4ude_in_Tokio_03.jpg" /* Photo: Olaf2, CC BY-SA 4.0, via Wikimedia Commons */ },

      // ---- EVENING · wind down to Golden Gai ----
      { time:"18:00", name:"Omoide Yokocho", note:"Early yakitori + beer in a tiny smoky alley. Great atmosphere, low commitment. West side of the station.", tags:["food"], map:"Omoide Yokocho", coords:[35.6929,139.6996],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Omoide_Yokocho_2019a.jpg/250px-Omoide_Yokocho_2019a.jpg" /* Photo: 江戸村のとくぞう, CC BY-SA 4.0, via Wikimedia Commons */ },
      { time:"19:30", name:"Hanazono Shrine", note:"Quiet minute right beside Golden Gai before the bars. Lit up at night.", tags:["sight"], map:"Hanazono Shrine Shinjuku", coords:[35.6933,139.7058],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Hanazono_Shrine.jpg/250px-Hanazono_Shrine.jpg" /* Photo: Fay1982, CC BY-SA 4.0, via Wikimedia Commons — daytime/spring shot, not the night view described, but it's confirmed the right shrine */ },
      // ← your message cut off right after this one — add Golden Gai itself (or whatever came next) whenever you're ready.
    ]},
    { date:"2026-11-11", city:"Tokyo · Akihabara — Games & CDs", stops:[
      // ---- BREAKFAST · near the apartment ----
      { time:"09:30", name:"Bam Bi Coffee", note:"Relaxed start — good coffee + fluffy pancakes, 5 min from the flat. Sources disagree on opening time (official IG says 10:00, other listings say 11:00) — worth a quick check that morning. (Early bird instead? Yayoiken from the 10th opens 5am.)", tags:["food"], map:"1-14-26 Okubo, Shinjuku City, Tokyo", coords:[35.6997,139.7053] },

      // ---- GET THERE ----
      { time:"10:50", name:"Ōkubo Stn → Akihabara", note:"JR Chūō-Sōbu line (yellow), direct, ~20 min, no changes. Ōkubo Stn is ~2 min from the flat.", tags:["transit"], map:"Okubo Station, Shinjuku, Tokyo", coords:[35.7022,139.6952] },

      // ---- RETRO GAMES / CONSOLES ----
      { time:"11:15", name:"Super Potato", note:"THE retro game shrine — consoles, carts, plus a tiny retro arcade on the top floor. Sotokanda. Opens 11:00.", tags:["games"], map:"1-11-2 Sotokanda, Chiyoda City, Tokyo", coords:[35.6984,139.7709],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Akihabara_-_Super_Potato_Retro_Game_Shop.jpg/250px-Akihabara_-_Super_Potato_Retro_Game_Shop.jpg" /* Photo: IQRemix, CC BY-SA 2.0, via Wikimedia Commons */ },
      { time:"12:00", name:"Retro Game Camp", note:"Locals rate it over Super Potato on price — they test consoles/carts in front of you, sell HDMI adapters. Opens 11:00.", tags:["games"], map:"3-14-7 Sotokanda, Chiyoda City, Tokyo", coords:[35.7013,139.7705] },
      { time:"12:30", name:"Trader HQ", note:"Second-hand games, media, figures across several floors. Cheap. Opens 11:00.", tags:["games"], map:"4-2-1 Sotokanda, Chiyoda City, Tokyo", coords:[35.7014,139.7724],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TRADER_Akihabara.jpg/250px-TRADER_Akihabara.jpg" /* Photo: Starchild1884, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"13:00", name:"Mandarake Complex", note:"8 floors of second-hand everything — retro games, plus a whole floor of CDs/DVDs. Opens 12:00.", tags:["games"], map:"3-11-12 Sotokanda, Chiyoda City, Tokyo", coords:[35.7013,139.7705],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/MANDARAKE_COMPLEX_AKIHABARA.JPG/250px-MANDARAKE_COMPLEX_AKIHABARA.JPG" /* Photo: 正和, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"", name:"Beep Akihabara", note:"Confirmed closed Wednesdays — and the 11th is a Wed. Retro PCs, consoles, arcade boards, a real gem. Swap onto another day or skip. Moved in 2026 to SEEKBASE, basement, Kanda Neribeicho.", tags:["games","closed"], map:"15-1 Kanda Neribeicho, Chiyoda City, Tokyo", coords:[35.7007,139.7740] },

      // ---- LUNCH · the heavy one · pick one ----
      { time:"13:45", name:"Kyushu Jangara (Akihabara)", note:"OPTION 1 — Akihabara's landmark tonkotsu chain, rich garlicky broth. Cramped, quick queue, open 11:00–21:45. Right in the games district.", tags:["food"], map:"3-11-6 Sotokanda, Chiyoda City, Tokyo", coords:[35.7013,139.7705], group:"lunch11", groupLabel:"Lunch · pick one" },
      { time:"13:45", name:"Ramen Jiro (Kanda Jinbocho)", note:"OPTION 2 — the ultra-heavy cult one: thick fatty garlic broth, huge portions, cheap, CASH ONLY. Say 'hanbun' for half noodles. Long queue, 11:00–17:30, closed Sun. ~12 min walk south.", tags:["food"], map:"1-21-4 Kanda Jimbocho, Chiyoda City, Tokyo", coords:[35.6960,139.7584], group:"lunch11",
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3%E4%BA%8C%E9%83%8E_%E7%A5%9E%E7%94%B0%E7%A5%9E%E4%BF%9D%E7%94%BA%E5%BA%97IMG_20220213_084922_01.jpg/250px-%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3%E4%BA%8C%E9%83%8E_%E7%A5%9E%E7%94%B0%E7%A5%9E%E4%BF%9D%E7%94%BA%E5%BA%97IMG_20220213_084922_01.jpg" /* Photo: 経済特区, CC BY-SA 4.0, via Wikimedia Commons */ },

      // ---- CDs ----
      { time:"15:30", name:"Disk Union Ochanomizu", note:"Big Disk Union between Akihabara & Ochanomizu (~10 min walk) — used CDs/vinyl, rock/metal/prog. There are 3 separate Ochanomizu branches by genre; this pins the station-front all-genres one, which is the one that actually lists rock/punk/prog. Opens 12:00. (Mandarake also has physical media if you'd rather not walk.)", tags:["music"], map:"ディスクユニオンお茶の水駅前店", coords:[35.6983,139.7639] },

      // ---- BACK WEST + close ----
      { time:"18:30", name:"Akihabara → Shinjuku", note:"Chūō-Sōbu line back, or Yamanote. ~20 min.", tags:["transit"], map:"Akihabara Station, Tokyo", coords:[35.6990,139.7737] },
      { time:"20:00", name:"Golden Gai", note:"Nightly ritual. Hanazono Shrine right beside it for a quiet minute first.", tags:["explore"], map:"Shinjuku Golden Gai", coords:[35.6940,139.7047],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg/250px-Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg" /* Photo: Fabio Achilli, CC BY 2.0, via Wikimedia Commons */ },
    ]},
    { date:"2026-11-12", city:"Tokyo · Ikebukuro — Arcades & retro", stops:[
      // ---- BREAKFAST · near the apartment ----
      { time:"09:00", name:"The Bake Factory (Shin-Ōkubo)", note:"Croissants + coffee, opens 9:00, right by the flat (Hyakunincho). Grab-and-go or sit. Third breakfast option so you're not repeating.", tags:["food"], map:"2-2-1 Hyakunincho, Shinjuku City, Tokyo", coords:[35.7030,139.6986] },

      // ---- GET THERE ----
      { time:"10:15", name:"Shin-Ōkubo → Ikebukuro", note:"Yamanote line, ~7 min, 3 stops (Shin-Ōkubo → Takadanobaba → Mejiro → Ikebukuro). Head for the East exit / Sunshine City.", tags:["transit"], map:"Shin-Okubo Station, Tokyo", coords:[35.7013,139.7001] },

      // ---- ARCADES · the real game floors ----
      { time:"10:30", name:"Round1 Ikebukuro", note:"Massive multi-floor arcade — pay by the hour, free-play on loads of machines, plus bowling/sports upstairs. Open 24h. Best value for actually playing.", tags:["games"], map:"1-14-1 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7312,139.7149] },
      { time:"11:15", name:"Taito Station Ikebukuro", note:"Classic cabinets, fighting + rhythm games (Ongeki etc), VR in the basement. Good catch-rate cranes too. West exit side. Opens 10:00.", tags:["games"], map:"1-15-9 Nishiikebukuro, Toshima City, Tokyo" /* ← address corrected: you had 1-15-15, confirmed real one is 1-15-9 */, coords:[35.7302,139.7094] },
      { time:"", name:"GiGO Ikebukuro", note:"Mostly crane/claw machines — mixed reputation (rigged-machine complaints), so go in eyes-open. Some video game floors upstairs. This is the GiGO flagship store. Opens 10:00.", tags:["games"], map:"1-13-6 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7312,139.7149],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Ikebukuro-Tokyo---2025-04-19_001.jpg/250px-Ikebukuro-Tokyo---2025-04-19_001.jpg" /* Photo: RuinDig/Yuki Uchida, CC BY 4.0, via Wikimedia Commons */ },

      // ---- RETRO / SECOND-HAND ----
      { time:"11:45", name:"Super Potato Ikebukuro", note:"The Ikebukuro branch — regulars rate it OVER Akihabara's (better stock, less picked-over). Retro consoles + carts. Opens 11:00.", tags:["games"], map:"1-23-13 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7312,139.7149] },
      { time:"12:15", name:"BookOff (Sunshine 60 St)", note:"Big used-media floors — retro games/consoles at great prices, plus CDs/DVDs/figures. Opens 10:00.", tags:["games"], map:"1-22-10 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7297,139.7158] },

      // ---- LUNCH · omurice callback · pick one ----
      { time:"13:00", name:"yellow (omurice)", note:"OPTION 1 — the photogenic one: soft omelette sliced open to flood the rice. Could well be your original photo. Expect a queue (up to ~45 min). Opens 11:00.", tags:["food"], map:"1-27-5 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7312,139.7149], group:"lunch12", groupLabel:"Lunch · omurice · pick one" },
      { time:"13:00", name:"Tamago-Ken (omurice)", note:"OPTION 2 — legendary value, ticket-machine omurice with hamburg + free pickles/soup. Faster, tiny, 4.7 stars. Opens 11:00.", tags:["food"], map:"1-23-8 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7312,139.7149], group:"lunch12" },

      // ---- AFTERNOON · more browsing (optional) ----
      { time:"14:30", name:"Mandarake LaLaLa Ikebukuro", note:"Second-hand manga, CDs, collectibles, retro bits. Opens 12:00.", tags:["games"], map:"3-15-2 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7308,139.7180] },
      { time:"15:00", name:"Animate Ikebukuro (flagship)", note:"World's largest anime store, 9+ floors. Worth a gawk even if you don't buy. Opens 10:00.", tags:["explore"], map:"1-20-7 Higashiikebukuro, Toshima City, Tokyo", coords:[35.7303,139.7152],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Animate_Ikebukuro_20120613_1.jpg/250px-Animate_Ikebukuro_20120613_1.jpg" /* Photo: Dick Johnson, CC BY 2.0, via Wikimedia Commons */ },
      { time:"", name:"Namjatown (optional)", note:"Namco indoor theme park in Sunshine City — retro-game maker's attraction, gyoza stadium, quirky. Entry fee. Opens 10:00.", tags:["explore"], map:"Namjatown Sunshine City Ikebukuro", coords:[35.7289,139.7197],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Namco_NamjaTown_front.jpg/250px-Namco_NamjaTown_front.jpg" /* Photo: SnowFire, CC BY 4.0, via Wikimedia Commons */ },

      // ---- BACK WEST + close ----
      { time:"18:30", name:"Ikebukuro → Shinjuku", note:"Yamanote back, ~7 min.", tags:["transit"], map:"Ikebukuro Station, Tokyo", coords:[35.7298,139.7131] },
      { time:"20:00", name:"Golden Gai", note:"The nightly ritual.", tags:["explore"], map:"Shinjuku Golden Gai", coords:[35.6940,139.7047],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg/250px-Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg" /* Photo: Fabio Achilli, CC BY 2.0, via Wikimedia Commons */ },
    ]},
    { date:"2026-11-13", city:"Tokyo · Nakano — Vintage & games", stops:[
      // ---- BREAKFAST · near the apartment ----
      { time:"09:30", name:"The Bake Factory (Shin-Ōkubo)", note:"Easy croissant + coffee near the flat (opens 9). Or hold out and grab a café in Nakano's Sun Mall on arrival — this is a late-start day.", tags:["food"], map:"2-2-1 Hyakunincho, Shinjuku City, Tokyo", coords:[35.7030,139.6986] },

      // ---- GET THERE ----
      { time:"11:00", name:"Ōkubo → Nakano", note:"JR Chūō-Sōbu line (yellow) westbound, ~5 min, 2 stops (Ōkubo → Higashi-Nakano → Nakano). North exit for Sun Mall.", tags:["transit"], map:"Okubo Station, Shinjuku, Tokyo", coords:[35.7022,139.6952] },

      // ---- THE INDOOR STREET ----
      { time:"11:15", name:"Nakano Sun Mall", note:"The covered shopping arcade you remembered — runs straight from the station up to Broadway. Wander it on the way in.", tags:["explore"], map:"5-63-3 Nakano, Nakano City, Tokyo", coords:[35.7079,139.6693],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Nakano_sunmall_shopping_street_tokyo_2009.JPG/250px-Nakano_sunmall_shopping_street_tokyo_2009.JPG" /* Photo: Kentin, CC BY-SA 3.0, via Wikimedia Commons */ },

      // ---- LUNCH · local legend, before the noon rush ----
      { time:"11:30", name:"Chūka Soba Aoba (honten)", note:"Nakano IS the birthplace of this rich double-broth (fish + pork) style — this is the original shop. Ticket machine, quick, cheap. Opens 10:30, so beat the queue.", tags:["food"], map:"5-58-1 Nakano, Nakano City, Tokyo", coords:[35.7079,139.6693],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Chuka_soba_aoba_nakano_head_store_2015.jpg/250px-Chuka_soba_aoba_nakano_head_store_2015.jpg" /* Photo: Kentin, CC BY-SA 4.0, via Wikimedia Commons */ },

      // ---- GAMES · Broadway ----
      { time:"12:15", name:"Nakano Broadway", note:"The 4-floors-plus complex: dozens of Mandarake shops + indies selling retro consoles, carts, figures, watches. Game Station (Western-game merch) is in here too. Most shops open 12:00.", tags:["games"], map:"5-52-15 Nakano, Nakano City, Tokyo", coords:[35.7090,139.6658],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Nakano_broadway_entrance.JPG/250px-Nakano_broadway_entrance.JPG" /* Photo: Kentin, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"13:00", name:"Mandarake Nakano", note:"Not one shop but many themed branches scattered through Broadway — retro games/consoles, robots, Showa memorabilia. Easy to lose an hour+. Opens 12:00.", tags:["games"], map:"Mandarake Nakano", coords:[35.7090,139.6658] },

      // ---- VINTAGE CLOTHING ----
      { time:"14:30", name:"TreFacStyle Nakano", note:"Quality second-hand — brands, bags, shoes, neatly sorted (vintage Ferragamo for ¥4k kind of finds). Opens 11:00. ~8 min from Broadway.", tags:["vintage"], map:"2-14-22 Nakano, Nakano City, Tokyo", coords:[35.7041,139.6691] },
      { time:"15:15", name:"Little Bird", note:"Charming 60s/70s vintage, beautifully kept pieces. Opens 12:00.", tags:["vintage"], map:"5-29-4 Nakano, Nakano City, Tokyo", coords:[35.7079,139.6693] },
      { time:"", name:"Broadway vintage + backstreets", note:"More vintage in Broadway's upper floors (e.g. Vintage Life, shop #114, opens 14:00) and the furugiya dotted around the north-exit backstreets — worth a wander.", tags:["vintage"], map:"5-52-15 Nakano, Nakano City, Tokyo", coords:[35.7090,139.6658] },

      // ---- BACK + close ----
      { time:"18:30", name:"Nakano → Shinjuku", note:"Chūō line rapid, 1 stop, ~4 min (or Chūō-Sōbu back via Ōkubo).", tags:["transit"], map:"Nakano Station, Tokyo", coords:[35.7058,139.6658] },
      { time:"20:00", name:"Golden Gai", note:"The nightly ritual.", tags:["explore"], map:"Shinjuku Golden Gai", coords:[35.6940,139.7047],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg/250px-Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg" /* Photo: Fabio Achilli, CC BY 2.0, via Wikimedia Commons */ },
    ]},
    { date:"2026-11-14", city:"Day trip · Mt Oyama (Isehara)", coords:[35.4319,139.2380], stops:[
      { time:"08:30", name:"Shinjuku Stn — Odakyu line", note:"Walk/1 stop from the flat to Shinjuku. Buy the Tanzawa-Oyama Freepass (丹沢・大山フリーパス) at the Odakyu counter — the 'A' ticket includes the Oyama Cable Car, covers round-trip train + bus + cable car at a discount.", tags:["transit"], map:"Shinjuku Station, Tokyo", coords:[35.6923,139.6995] },
      { time:"08:50", name:"Odakyu → Isehara", note:"Odakyu Odawara Line, EXPRESS (急行) or RAPID EXPRESS (快速急行) toward Odawara/Hon-Atsugi. Get off at ISEHARA (~60–65 min). Avoid the Local (too slow). Romancecar is faster but a paid reserved seat.", tags:["transit"], map:"Isehara Station, Kanagawa", coords:[35.3960,139.3135] },
      { time:"10:00", name:"Isehara → 'Oyama Cable' bus", note:"North Exit (北口), bus stop #4, Kanachu bus bound for 大山ケーブル (Oyama Cable). Ride to the LAST stop, ~25 min.", tags:["transit"], map:"Isehara Station, Kanagawa", coords:[35.3960,139.3135] },
      { time:"10:35", name:"Koma-sando approach walk", note:"~15 min up a stepped lane of tofu shops & souvenir stalls to the cable car station. (This is where you'll want lunch later.)", tags:["explore"], map:"Oyama Koma-sando, Isehara", coords:[35.4206,139.2550] },
      { time:"10:55", name:"Oyama Cable Car ↑", note:"Oyama-Cable Station → Afuri-jinja Station, ~6 min. Hop off midway at Ōyama-dera if you want the maple tunnel.", tags:["transit"], map:"Oyama Cable Station, Isehara", coords:[35.4278,139.2445] },
      { time:"11:10", name:"Ōyama-dera (midway)", note:"755 AD temple; the red maples over its steps are the famous autumn shot. Cable car's middle stop.", tags:["temple"], map:"Oyama-dera Temple, Isehara", coords:[35.4296,139.2410],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/%E5%A4%A7%E5%B1%B1%E5%AF%BA%E3%81%A8%E7%B4%85%E8%91%89%2C_Oyamadera_temple_and_colored_leaves_-_panoramio.jpg/250px-%E5%A4%A7%E5%B1%B1%E5%AF%BA%E3%81%A8%E7%B4%85%E8%91%89%2C_Oyamadera_temple_and_colored_leaves_-_panoramio.jpg" /* Photo: xe zna, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"11:45", name:"Ōyama Afuri Shrine (lower)", note:"The payoff: Michelin 2-star view — Fuji, Enoshima, Sagami Bay on a clear day. Teahouse Sekison (Michelin) alongside for matcha + spring-water coffee.", tags:["temple"], map:"Oyama Afuri Shrine, Isehara", coords:[35.4319,139.2380] },
      { time:"", name:"Optional summit hike", note:"From left of the shrine, ~1.5–2 hrs up (and same down) to the 1,252m top. Skip if legs/time are tight — the shrine view already delivers.", tags:["hike"], map:"Mount Oyama summit, Isehara", coords:[35.4408,139.2313] },
      { time:"13:30", name:"Tofu lunch on Koma-sando", note:"Ōyama tofu is the speciality (made from the mountain's spring water) — tofu kaiseki at the inns lining the approach. Freepass gets discounts at some.", tags:["food"], map:"Oyama Koma-sando, Isehara", coords:[35.4206,139.2550] },
      { time:"15:30", name:"Return → Shinjuku", note:"Cable down → bus to Isehara → Odakyu Express back to Shinjuku (~60 min). Reverse of the morning.", tags:["transit"], map:"Isehara Station, Kanagawa", coords:[35.3960,139.3135] },
    ]},
    { date:"2026-11-15", city:"Day trip · Mt Tsukuba (Ibaraki)", coords:[36.2131,140.1013], stops:[
      { time:"08:30", name:"Ōkubo → Akihabara", note:"JR Chūō-Sōbu line (yellow) from Ōkubo Stn (2 min from flat), direct to Akihabara, ~18 min.", tags:["transit"], map:"Okubo Station, Shinjuku, Tokyo", coords:[35.7022,139.6952] },
      { time:"09:00", name:"Akihabara → Tsukuba (TX)", note:"Buy the Mt. Tsukuba Ticket (筑波山きっぷ) at the TX counter — covers TX round-trip + shuttle bus + cable car + ropeway. ¥4,300 from Akihabara (your note said ~¥4,000 — close, price has crept up slightly). Then Tsukuba Express RAPID (快速) to the terminus, TSUKUBA, ~45 min.", tags:["transit"], map:"Akihabara Station, Tokyo", coords:[35.6990,139.7737] },
      { time:"09:50", name:"Tsukuba Stn → shuttle bus", note:"Tsukubasan Shuttle from the bus terminal to '筑波山神社入口' (Tsukubasan-jinja-iriguchi), ~40 min.", tags:["transit"], map:"Tsukuba Station, Ibaraki", coords:[36.0826,140.1112] },
      { time:"10:40", name:"Tsukubasan Shrine (base)", note:"Ancient shrine at the foot, known for matchmaking. Cable car station is just behind it.", tags:["temple"], map:"Tsukubasan Shrine, Ibaraki", coords:[36.2131,140.1013] },
      { time:"11:15", name:"Cable Car ↑ (Miyawaki)", note:"Funicular Miyawaki → Miyukigahara (near the summit ridge), ~8 min. Red/green cars for the seasons.", tags:["transit"], map:"Tsukubasan Cable Car Miyawaki Station, Ibaraki", coords:[36.2254,140.1067] },
      { time:"11:40", name:"Nantai & Nyotai peaks", note:"Two summits ~15 min apart along the ridge (Nyotai 877m is the higher, confirmed — Nantai is 871m). Oddly-shaped sacred rocks, the Gama-ishi toad rock, Kantō plain + Skytree + Fuji views.", tags:["hike"], map:"Mount Tsukuba Nyotaisan, Ibaraki", coords:[36.2250,140.1065],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Summit_%40_Nyotai_Peak_%40_Mount_Tsukuba_%289975577435%29.jpg/250px-Summit_%40_Nyotai_Peak_%40_Mount_Tsukuba_%289975577435%29.jpg" /* Photo: Guilhem Vellut, CC BY 2.0, via Wikimedia Commons */ },
      { time:"13:30", name:"Ropeway ↓ (Nyotai)", note:"Swiss-made ropeway Nyotaisan → Tsutsujigaoka, ~6 min — down a different face from the cable car so you see both.", tags:["transit"], map:"Tsukubasan Ropeway Nyotaisan Station, Ibaraki", coords:[36.2224,140.1127] },
      { time:"14:00", name:"Tsutsujigaoka → Tsukuba Stn", note:"Shuttle bus back to Tsukuba Station, ~50 min.", tags:["transit"], map:"Tsutsujigaoka, Tsukuba, Ibaraki", coords:[36.2198,140.1189] },
      { time:"15:30", name:"Return → flat", note:"TX back Tsukuba → Akihabara (~45 min), then Chūō-Sōbu → Ōkubo (~18 min).", tags:["transit"], map:"Tsukuba Station, Ibaraki", coords:[36.0826,140.1112] },
    ]},
    { date:"2026-11-16", city:"Day trip · Nokogiriyama (Chiba)", coords:[35.1603,139.8261], stops:[
      { time:"08:00", name:"Shinjuku → Tokyo Station", note:"JR Chūō line RAPID, ~14 min. (Early start — this is the long one.)", tags:["transit"], map:"Tokyo Station", coords:[35.6827,139.7651] },
      { time:"08:30", name:"Tokyo → Hama-Kanaya (浜金谷)", note:"JR Uchibō Line down the Bōsō coast. Practical route: Tokyo → change at KIMITSU (君津) onto a Tateyama-bound local → get off at HAMA-KANAYA. ~2 hrs. Exact trains/transfers shift by timetable — check Apple Maps/Navitime that morning.", tags:["transit"], map:"Hama-Kanaya Station, Chiba", coords:[35.1681,139.8224] },
      { time:"10:40", name:"Walk to the ropeway", note:"~8 min from Hama-Kanaya station to the Nokogiriyama Ropeway base.", tags:["explore"], map:"Nokogiriyama Ropeway, Chiba", coords:[35.1603,139.8261] },
      { time:"11:00", name:"Nokogiriyama Ropeway ↑", note:"~4 min to the summit. Views back over Tokyo Bay to Fuji on a clear day. Checked: the ropeway's only known annual closure is mid-Jan–mid-Feb (13 Jan–13 Feb 2026), not November — should be running, but a quick check nearer the date is still sensible for any unscheduled maintenance.", tags:["transit"], map:"Nokogiriyama Ropeway, Chiba", coords:[35.1603,139.8261] },
      { time:"11:20", name:"Jigoku Nozoki (Hell Peek)", note:"The famous rock ledge jutting over a sheer drop — the money shot. Inside the Nihon-ji grounds (entry fee).", tags:["sight"], map:"Jigoku Nozoki Nokogiriyama, Chiba", coords:[35.1586,139.8289],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Jigoku_nozoki_at_Nokogiriyama02.JPG/250px-Jigoku_nozoki_at_Nokogiriyama02.JPG" /* Photo: Captain76, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"12:00", name:"Nihon-ji Great Buddha", note:"Confirmed: at 31.05m this really is bigger than both Nara's (18.18m) and Kamakura's (13.35m) — biggest carved-in-place Buddha in Japan. Plus 1,500 carved arhat statues and the Hyaku-shaku Kannon. Lots of stairs across the grounds.", tags:["temple"], map:"Nihon-ji Temple, Nokogiriyama, Chiba", coords:[35.1566,139.8332],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nihonji_daibutsu.jpg/250px-Nihonji_daibutsu.jpg" /* Photo: Emily Zarndt, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"14:00", name:"Seafood lunch — Kanaya port", note:"Hama-Kanaya is a fishing port — fresh seafood by the harbour before the long ride back.", tags:["food"], map:"Hama-Kanaya, Chiba", coords:[35.1681,139.8224] },
      { time:"15:30", name:"Return → Shinjuku", note:"Reverse: Hama-Kanaya → change at Kimitsu → Tokyo Station → Chūō line to Shinjuku. ~2 hrs.", tags:["transit"], map:"Hama-Kanaya Station, Chiba", coords:[35.1681,139.8224] },
    ]},
    { date:"2026-11-17", city:"Day trip · Nikko (shrines + falls)", coords:[36.7576,139.5991], stops:[
      // ---- GET THERE ----
      { time:"06:45", name:"Flat → Asakusa", note:"WEEKDAY routing: JR Yamanote Shin-Ōkubo → Ueno (~20 min), then Tokyo Metro Ginza line Ueno → Asakusa (~5 min). If you move this to a WEEKEND, skip all this and take the direct Shinjuku→Tobu-Nikko train instead — confirmed real (Shinjuku dep ~07:30, arr Tobu-Nikko ~09:28, matches your 07:31/09:27 almost exactly) — reserved seats, book ahead.", tags:["transit"], map:"Asakusa Station, Tokyo", coords:[35.7093,139.7969] },
      { time:"07:50", name:"Asakusa → Tobu-Nikko (Spacia X)", note:"Tobu limited express, ~1h50, arrives ~09:39. All reserved — book the seat in advance. Sit right-side for river/mountain views near the end. Confirmed real service (Standard seat ¥3,340 one-way from Asakusa).", tags:["transit"], map:"Tobu-Nikko Station, 4-3 Matsubaracho, Nikko, Tochigi", coords:[36.7475,139.6198] },
      { time:"09:40", name:"Tobu-Nikko Station — sort buses", note:"Coin lockers for bags. Buy your bus pass here: the 'World Heritage' loop pass (世界遺産めぐり手形 — confirmed real) covers the shrines; the wider 2-day area pass also covers the Chūzenji/Kegon buses — get that one since you're doing the falls. Toshogu tickets sold here too.", tags:["transit"], map:"Tobu-Nikko Station, 4-3 Matsubaracho, Nikko, Tochigi", coords:[36.7475,139.6198] },

      // ---- SHRINE ZONE (walkable cluster) ----
      { time:"10:00", name:"Shinkyō Bridge", note:"The iconic vermilion arch over the Daiya river — the gateway shot into the shrine area. ~10 min bus (or 20-25 min walk) from the station.", tags:["sight"], map:"Shinkyo Bridge, Kamihatsuishimachi, Nikko, Tochigi", coords:[36.7533,139.6040],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/NikkoShinkyo5593.jpg/250px-NikkoShinkyo5593.jpg" /* Photo: Fg2, public domain, via Wikimedia Commons */ },
      { time:"10:20", name:"Rinnō-ji (Sanbutsudō)", note:"Nikko's great temple — the main hall holds three 7.5m gilded Buddha statues. Founded 766 AD. Opens 8:00.", tags:["temple"], map:"Rinnoji Temple, 2300 Sannai, Nikko, Tochigi", coords:[36.7547,139.6008] },
      { time:"10:50", name:"Nikkō Tōshōgū", note:"THE one: Tokugawa Ieyasu's mausoleum, 500+ carvings incl. the sleeping cat & three wise monkeys, gold leaf everywhere, cedar avenues. Give it 1.5 hrs. Opens 9:00.", tags:["temple"], map:"Nikko Toshogu, 2301 Sannai, Nikko, Tochigi", coords:[36.7576,139.5991],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/The_Three_Wise_Monkeys%2C_Nikk%C5%8D_T%C5%8Dsh%C5%8D-g%C5%AB%3B_April_2018.jpg/250px-The_Three_Wise_Monkeys%2C_Nikk%C5%8D_T%C5%8Dsh%C5%8D-g%C5%AB%3B_April_2018.jpg" /* Photo: Ray in Manila, CC BY 2.0, via Wikimedia Commons */ },
      { time:"12:20", name:"Futarasan Shrine", note:"Quieter, right beside Toshogu — mountain-deity shrine in cedar forest, ¥300. A calm breather after the crowds.", tags:["temple"], map:"Nikko Futarasan Shrine, 2307 Sannai, Nikko, Tochigi", coords:[36.7584,139.5967] },
      { time:"12:45", name:"Taiyū-in (Iemitsu mausoleum)", note:"The sleeper hit — Iemitsu's tomb, deliberately more restrained than Toshogu but many say more beautiful, and far less crowded. Elaborate gates in the forest.", tags:["temple"], map:"Taiyuin, 2300 Sannai, Nikko, Tochigi", coords:[36.7580,139.5959] },
      { time:"13:30", name:"Lunch — yuba near the shrines", note:"Nikko's speciality is yuba (tofu skin) — several spots around the shrine approach & Shinkyō. Quick bowl before heading up the mountain.", tags:["food"], map:"Shinkyo Bridge, Kamihatsuishimachi, Nikko, Tochigi", coords:[36.7533,139.6040] },

      // ---- MOUNTAIN ZONE (bus up the Irohazaka) ----
      { time:"14:15", name:"Bus up to Chūzenji / Kegon", note:"Tobu bus (Chūzenji-Onsen / Yumoto line) from the shrine-area stop up the Irohazaka hairpins, ~40-45 min. Roughly every 30-60 min — check the posted times. Covered by the area pass.", tags:["transit"], map:"Kegon Falls, 2479-2 Chugushi, Nikko, Tochigi", coords:[36.7382,139.5036] },
      { time:"", name:"Akechidaira Ropeway (optional)", note:"Partway up — a 3-min ropeway to a lookout over Kegon Falls AND Lake Chūzenji together. Confirmed real, ¥600 adult. Worth it on a clear day IF time allows; skip if running late.", tags:["sight"], map:"Akechidaira Ropeway, Hosoomachi, Nikko, Tochigi", coords:[36.7373,139.5161] },
      { time:"15:00", name:"Kegon Falls", note:"97m plunge fed by Lake Chūzenji — one of Japan's great waterfalls. Pay ¥600 for the elevator down to the base observation deck (confirmed current price). Cold in the tunnels, take a layer.", tags:["sight"], map:"Kegon Falls, 2479-2 Chugushi, Nikko, Tochigi", coords:[36.7382,139.5036],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/%E7%B4%85%E8%91%89%E3%81%AE%E8%8F%AF%E5%8E%B3%E3%81%AE%E6%BB%9D.jpg/250px-%E7%B4%85%E8%91%89%E3%81%AE%E8%8F%AF%E5%8E%B3%E3%81%AE%E6%BB%9D.jpg" /* Photo: くろふね (Jranar), CC BY-SA 4.0, via Wikimedia Commons */ },
      { time:"15:45", name:"Lake Chūzenji", note:"Right by the falls — a serene highland lake ringed by mountains, formed by an old eruption of Mt Nantai. Lakeside stroll, grilled ayu fish from stalls.", tags:["sight"], map:"Lake Chuzenji, Nikko, Tochigi", coords:[36.7368,139.4769],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mount_nantai_and_lake_chuzenji.jpg/250px-Mount_nantai_and_lake_chuzenji.jpg" /* Photo: Uraomote yamaneko, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"16:45", name:"Bus back down → Tobu-Nikko", note:"~45 min back down the Irohazaka to the station. Aim for a bus that gets you back for your return train.", tags:["transit"], map:"Tobu-Nikko Station, 4-3 Matsubaracho, Nikko, Tochigi", coords:[36.7475,139.6198] },

      // ---- RETURN ----
      { time:"18:00", name:"Tobu-Nikko → home", note:"Limited express back to Asakusa (~1h50) then Metro/JR to the flat — or, if you came on the weekend direct train, straight back to Shinjuku (last direct dep reportedly ~16:38 — not independently re-verified, so on a weekend leave the lake a bit earlier and double check that time).", tags:["transit"], map:"Tobu-Nikko Station, 4-3 Matsubaracho, Nikko, Tochigi", coords:[36.7475,139.6198] },
    ]},
    { date:"2026-11-18", city:"Tokyo · Shibuya + Harajuku", stops:[
      { time:"09:45", name:"Breakfast near the flat", note:"Quick one before you head out — Bake Factory (Hyakunincho) or grab coffee in Shibuya on arrival. Shops don't open till ~11-12 so no rush.", tags:["food"], map:"2-2-1 Hyakunincho, Shinjuku City, Tokyo", coords:[35.7030,139.6986] },
      { time:"10:45", name:"Shin-Ōkubo → Shibuya", note:"JR Yamanote line, ~12 min (Shin-Ōkubo → Shinjuku → Yoyogi → Harajuku → Shibuya). Hachikō exit for Udagawachō.", tags:["transit"], map:"Shin-Okubo Station, Tokyo", coords:[35.7013,139.7001] },
      { time:"11:15", name:"RECOfan (MAGNET by Shibuya109)", note:"Warm-up dig — big, cheap used-CD floor, all genres mixed in the rock/pop bins (good for J-music). Opens 10:00, 6F.", tags:["music"], map:"Jinnan 1-23-10, MAGNET by Shibuya109 6F, Shibuya, Tokyo", coords:[35.6635,139.7002] },
      { time:"12:00", name:"diskunion ROCK in TOKYO", note:"The flagship rock/metal store — basement, walls of album covers, Western + Japanese, well-priced vinyl & CD. Your closest thing to VK turf. Opens 12:00. Confirmed address matches exactly.", tags:["music"], map:"Udagawacho 32-7, YY Udagawa Bldg B1F, Shibuya, Tokyo", coords:[35.6621,139.6975] },
      { time:"12:45", name:"Disk Union Shibuya Club Music", note:"Optional — separate branch, huge house/techno/electronic bins if that's ever your thing. 2 min away, 4F.", tags:["music"], map:"Udagawacho 30-7 4F, Shibuya, Tokyo", coords:[35.6621,139.6975] },
      { time:"13:00", name:"Mandarake Shibuya", note:"Retro games, consoles, PS-era discs & collectibles in the Shibuya BEAM basement. Opens 12:00. Confirmed address matches exactly.", tags:["games"], map:"Udagawacho 31-2, Shibuya BEAM B2F, Shibuya, Tokyo", coords:[35.6614,139.6976] },
      { time:"13:45", name:"Lunch — Udagawachō", note:"Pick one: Niku to Tamago (hamburg + omurice, cheap, 4.8, pinned) / Ichiran (solo-booth tonkotsu, Jinnan) / Gyumon (halal wagyu ramen) / Uobei (touchscreen conveyor sushi, Dōgenzaka).", tags:["food"], map:"Udagawacho 30-2, Cassette House 2.5F, Shibuya, Tokyo", coords:[35.6621,139.6975] },
      { time:"15:00", name:"Walk up Cat Street → Harajuku", note:"~12 min stroll north — Cat Street itself is lined with vintage & streetwear, so browse as you go.", tags:["explore"], map:"Cat Street, Jingumae, Shibuya, Tokyo", coords:[35.6659,139.7051],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Cat_Street%2C_Ura_Harajuku_1.jpg/250px-Cat_Street%2C_Ura_Harajuku_1.jpg" /* Photo: Aw1805, CC BY-SA 3.0, via Wikimedia Commons */ },
      { time:"15:20", name:"Flamingo (Cat Street)", note:"Curated vintage, unique pieces, friendly staff. Pricey but good stuff. Opens 12:00. Address corrected: you had 4-26-7, confirmed real one is 4-26-28 (same Junk Yard building).", tags:["vintage"], map:"Jingumae 4-26-28, Junk Yard 1F, Shibuya, Tokyo" /* ← corrected from your 4-26-7 */, coords:[35.6682,139.7098] },
      { time:"15:50", name:"Kinji Harajuku", note:"The big one for you — huge, strong on vintage rock/band tees + designer + Hawaiian. Opens 11:00, B1F. Confirmed address matches exactly.", tags:["vintage"], map:"Jingumae 4-31-10, YM Square Harajuku B1F, Shibuya, Tokyo", coords:[35.6682,139.7098] },
      { time:"16:25", name:"RAGTAG Harajuku", note:"Used designer/brand over two floors, neatly sorted by label. Opens 11:00. Confirmed address matches exactly.", tags:["vintage"], map:"Jingumae 5-17-9, Hulic Jingumae 1F-2F, Shibuya, Tokyo", coords:[35.6657,139.7053] },
      { time:"16:55", name:"Chicago Harajuku", note:"Big American vintage + a great cheap kimono/yukata corner. Opens 11:00, 2F. Confirmed address matches exactly.", tags:["vintage"], map:"Jingumae 6-31-15 2F, Shibuya, Tokyo", coords:[35.6661,139.7041] },
      { time:"18:30", name:"Harajuku → Shinjuku", note:"JR Yamanote, ~5 min.", tags:["transit"], map:"Harajuku Station, Tokyo", coords:[35.6705,139.7024] },
      { time:"20:00", name:"Golden Gai", note:"The nightly ritual.", tags:["explore"], map:"Shinjuku Golden Gai", coords:[35.6940,139.7047],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg/250px-Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg" /* Photo: Fabio Achilli, CC BY 2.0, via Wikimedia Commons */ },
    ]},
    { date:"2026-11-19", city:"Tokyo · Shimokitazawa + Kōenji", stops:[
      { time:"10:30", name:"Breakfast near the flat", note:"Relaxed start — everything in both areas opens 12-1pm. Bake Factory / Bam Bi near the flat.", tags:["food"], map:"2-2-1 Hyakunincho, Shinjuku City, Tokyo", coords:[35.7030,139.6986] },
      { time:"11:40", name:"Flat → Shimokitazawa", note:"Yamanote to Shinjuku, then Odakyu Odawara Line to SHIMOKITAZAWA, ~7 min (Local or any train that stops there). ~2 stops.", tags:["transit"], map:"Shimokitazawa Station, Tokyo", coords:[35.6613,139.6669] },
      { time:"12:00", name:"Disk Union Shimokitazawa", note:"One of the best-organised record stores in Tokyo — spacious, well-labelled, Rock/Jazz/Soul/Japanese/Anime + big new-arrivals wall. Opens 12:00. Confirmed address matches exactly.", tags:["music"], map:"Kitazawa 1-40-6, Kashiwa 3rd 1F, Setagaya, Tokyo", coords:[35.6628,139.6729] },
      { time:"12:45", name:"Lunch — Rojiura Curry SAMURAI", note:"Shimokita is curry country. Samurai does customisable soup curry loaded with ~20 fresh veg. (Wilder alt: Magic Spice, the psychedelic soup-curry landmark — but it's shut Tue/Wed.) Confirmed address matches exactly.", tags:["food"], map:"Kitazawa 3-31-14, Setagaya, Tokyo", coords:[35.6651,139.6691] },
      { time:"13:45", name:"AULD LANG SUN", note:"Standout vintage — statement pieces, rare finds, lovely staff (4.9). Pricier end. Opens 12:00. Confirmed address matches exactly.", tags:["vintage"], map:"Kitazawa 2-33-5, Setagaya, Tokyo", coords:[35.6620,139.6683] },
      { time:"14:15", name:"Furugiya Memento", note:"Reckoned the best-curated vintage in Shimokita (4.9), unique accessories & knits. Opens 13:00. Address corrected: they moved — your Daizawa 5-36-12 was their old spot, current one is Kitazawa 2-15-1, Tatsumi Bldg 1F.", tags:["vintage"], map:"Kitazawa 2-15-1, Tatsumi Bldg 1F, Setagaya, Tokyo" /* ← corrected from your old Daizawa 5-36-12 address; shop relocated */, coords:[35.6620,139.6683] },
      { time:"", name:"Shimokita wander", note:"The whole warren north & south of the station is wall-to-wall vintage + record shops (Flash Disc Ranch etc.) — leave time to just drift.", tags:["explore"], map:"Shimokitazawa Station, Tokyo", coords:[35.6613,139.6669],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Shimokitazawa_Street_2015.jpg/250px-Shimokitazawa_Street_2015.jpg" /* Photo: Aw1805, CC BY-SA 4.0, via Wikimedia Commons */ },
      { time:"15:15", name:"Shimokitazawa → Kōenji", note:"Odakyu back to Shinjuku, transfer to JR Chūō (rapid) to KŌENJI. ~30 min total. South exit for the vintage maze.", tags:["transit"], map:"Koenji Station, Tokyo", coords:[35.7053,139.6500] },
      { time:"16:00", name:"BE-IN RECORDS", note:"Crate-digger's vinyl den — original-press 60s/70s rock (US/UK), 7\"s & LPs, immaculate condition. Narrow staircase off a busy street. Opens 12:30. Address corrected: you had 3-57-9, confirmed real one is 3-57-8.", tags:["music"], map:"Koenjiminami 3-57-8, Suginami, Tokyo" /* ← corrected from your 3-57-9 */, coords:[35.7015,139.6462] },
      { time:"16:30", name:"Trip Vintage Kōenji", note:"Lovely curated vintage, genuinely fair prices (rare for the scene), warm staff (4.9). Opens 13:00. Confirmed address matches exactly.", tags:["vintage"], map:"Koenjiminami 3-37-1, Suginami, Tokyo", coords:[35.7015,139.6462] },
      { time:"17:00", name:"Trip Vintage Mens Kōenji", note:"The men's sister store — vintage designer/brand, big Burberry-trench-for-cheap energy. 5.0 rated. Opens 13:00. Couldn't independently confirm this exact address (less-indexed sister branch) — worth a Maps double-check before relying on it.", tags:["vintage"], map:"Koenjiminami 4-27-7 102, Suginami, Tokyo", coords:[35.7042,139.6528] },
      { time:"", name:"Kōenji backstreets", note:"Kōenji is a vintage maze — the Look Shōtengai / PAL arcade south of the station is dense with furugiya. Also a legendary cheap izakaya scene under the tracks if you'd rather drink HERE than Golden Gai.", tags:["explore"], map:"Koenji Look Shotengai, Suginami, Tokyo", coords:[35.7021,139.6477],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Koenji_pal_2019.jpg/250px-Koenji_pal_2019.jpg" /* Photo: Suikotei, CC BY-SA 4.0, via Wikimedia Commons */ },
      { time:"18:30", name:"Kōenji → Shinjuku", note:"JR Chūō line, ~10 min, direct.", tags:["transit"], map:"Koenji Station, Tokyo", coords:[35.7053,139.6500] },
      { time:"20:00", name:"Golden Gai", note:"The nightly ritual (or stay in Kōenji — your call).", tags:["explore"], map:"Shinjuku Golden Gai", coords:[35.6940,139.7047],
        photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg/250px-Golden_Gai%2C_Kabukicho%2C_Shinjuku_%2842385146670%29.jpg" /* Photo: Fabio Achilli, CC BY 2.0, via Wikimedia Commons */ },
    ]},
    // …add the rest of your days here (through 2026-11-24).
  ]
};
