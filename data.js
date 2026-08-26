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
                 games — or make up your own; unrecognised tags just render grey
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
    { date:"2026-11-12", city:"Tokyo → Kyoto", stops:[
      { time:"10:03", name:"Shinkansen to Kyoto", note:"Nozomi from Tokyo Stn — reserved car. ~2h15", tags:["transit"], map:"Tokyo Station", coords:[35.6827,139.7651] },
      { time:"12:30", name:"Drop bags at Kyoto Airbnb", note:"", tags:["stay"], map:"" },
      { time:"14:00", name:"Fushimi Inari", note:"Endless torii — go up past the crowds", tags:["temple","sight"], map:"Fushimi Inari Taisha", coords:[34.9675,135.7797] },
      { time:"18:00", name:"Dinner — Pontocho alley", note:"", tags:["food"], map:"Pontocho Kyoto", coords:[35.0042,135.7712] },
    ]},
    { date:"2026-11-13", city:"Kyoto", stops:[
      { time:"08:30", name:"Arashiyama bamboo grove", note:"Early = no crowds", tags:["sight"], map:"Arashiyama Bamboo Grove", coords:[35.0167,135.6711] },
      { time:"11:00", name:"Tenryu-ji", note:"Zen garden next to the grove", tags:["temple"], map:"Tenryu-ji Kyoto", coords:[35.0162,135.6729] },
      { time:"15:00", name:"Kinkaku-ji (Golden Pavilion)", note:"", tags:["temple","sight"], map:"Kinkaku-ji Kyoto", coords:[35.0395,135.7295] },
    ]},
    // …add the rest of your days here (through 2026-11-24).
  ]
};
