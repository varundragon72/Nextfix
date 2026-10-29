/**
 * NEXTFLIX Movie Catalogue & Poster Registry
 * Contains allowlisted playable movies and catalog poster titles.
 */

// ─── 1. ALLOWLISTED PLAYABLE MOVIES (8 Titles from local video directory) ───
export const ALLOWLISTED_MOVIES = [
  {
    id: 'dude',
    title: 'Dude',
    poster: '/images/Dude-2025.jpg',
    year: 2025,
    rating: 'U/A 13+',
    match: 98,
    duration: '2h 15m',
    category: 'Comedy / Drama',
    tags: ['Youth', 'Friendship', 'Comedy', 'Drama'],
    desc: 'A vibrant youth drama capturing the emotional twists and turns of friendship, romance, and college life.',
    isAllowlisted: true,
    file: 'Dude_2025_HQ_PreDVD_720p_HD__900_MB_.mp4'
  },
  {
    id: 'dragon',
    title: 'Dragon',
    poster: '/images/dragon-2025',
    year: 2025,
    rating: 'U/A 16+',
    match: 99,
    duration: '2h 30m',
    category: 'Action / Thriller',
    tags: ['Action', 'Thriller', 'Blockbuster'],
    desc: 'An intense action thriller following a relentless protagonist facing insurmountable odds in a criminal underworld.',
    isAllowlisted: true,
    file: 'Dragon (2025) Proper HDRip Single Part (720p) HEVC.mp4'
  },
  {
    id: 'lik',
    title: 'Love Insurance Kompany (Lik)',
    poster: '/images/Lik-2026',
    year: 2026,
    rating: 'U/A 13+',
    match: 96,
    duration: '2h 20m',
    category: 'Romance / Sci-Fi',
    tags: ['Sci-Fi', 'Romance', 'Comedy'],
    desc: 'A futuristic romantic comedy revolving around a revolutionary company offering insurance policies against heartbreak.',
    isAllowlisted: true,
    file: 'Love_Insurance_Kompany_2026_HQ_PreDVD_720p_HD.mp4'
  },
  {
    id: 'amaran',
    title: 'Amaran',
    poster: '/images/Amaran-2025',
    year: 2024,
    rating: 'U/A 16+',
    match: 99,
    duration: '2h 47m',
    category: 'Action / Biography',
    tags: ['Biography', 'Military', 'Valour', 'Emotion'],
    desc: 'The inspiring and valorous real-life journey of Major Mukund Varadarajan and his unwavering courage in the line of duty.',
    isAllowlisted: true,
    file: 'Moviesda.Mobi - Amaran 2024 Original 720p HD.mp4'
  },
  {
    id: 'adipurush',
    title: 'Adipurush',
    poster: '/images/Aadhipurush-2023.jpg',
    year: 2023,
    rating: 'U/A 13+',
    match: 94,
    duration: '2h 59m',
    category: 'Mythology / Action',
    tags: ['Epic', 'Mythology', 'Action', 'Drama'],
    desc: 'An epic saga inspired by the Ramayana portraying the grand battle between righteousness and demonic forces.',
    isAllowlisted: true,
    file: 'Moviesda.Mobi - Adipurush 2023 Original 720p HD.mp4'
  },
  {
    id: 'sita-ramam',
    title: 'Sita Ramam',
    poster: '/images/sita-ramam-2026.jpg',
    year: 2022,
    rating: 'U',
    match: 99,
    duration: '2h 43m',
    category: 'Romance / Drama',
    tags: ['Classic', 'Romance', 'Drama', 'Period'],
    desc: 'A timeless romantic classic set against a military backdrop, where letters of love cross insurmountable borders.',
    isAllowlisted: true,
    file: 'Moviesda.Mobi - Sita Ramam 2022 Original 720p HD.mp4'
  },
  {
    id: 'moonu',
    title: 'Moonu (3)',
    poster: '/images/moonu-2012.jpg',
    year: 2012,
    rating: 'U/A 16+',
    match: 97,
    duration: '2h 25m',
    category: 'Romance / Psychological Drama',
    tags: ['Romance', 'Psychological', 'Drama', 'Musical'],
    desc: 'A deeply emotional tale tracing the poignant love story of Ram and Janani from high school innocence to complex adulthood challenges.',
    isAllowlisted: true,
    file: 'Moonu (2012) HDRip Single Part (640x360).mp4'
  },
  {
    id: 'ponniyin-selvan',
    title: 'Ponniyin Selvan: Part One',
    poster: '/images/ponniyin-selvan-2022.jpg',
    year: 2022,
    rating: 'U/A 13+',
    match: 98,
    duration: '2h 47m',
    category: 'Historical / Action / Epic Drama',
    tags: ['Epic', 'Historical', 'Action', 'Blockbuster'],
    desc: 'Vandiyathevan sets out across the Chola realm to deliver a vital message, amidst a brewing conspiracy against the royal crown.',
    isAllowlisted: true,
    file: 'Moviesda.Mobi - Ponniyin Selvan 2022 Original 720p HD.mp4'
  }
];

// ─── 2. NEWLY INTEGRATED TAMIL POSTER TITLES (Poster-only catalog) ───
export const TAMIL_POSTER_MOVIES = [
  {
    id: 'jigarthanda-doublex',
    title: 'Jigarthanda DoubleX',
    poster: '/images/jigardhanda-2-2023.jpg',
    year: 2023,
    rating: 'U/A 16+',
    match: 98,
    duration: '2h 52m',
    category: 'Tamil Cinema / Action Drama',
    tags: ['Tamil', 'Action', 'Western', 'Cinema', 'Cult'],
    desc: 'In 1975 Tamil Nadu, an undercover cop posing as a filmmaker collaborates with an eccentric gangster aspiring to become a Western movie star.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'karuppu',
    title: 'Karuppu',
    poster: '/images/karuppu-2026.jpg',
    year: 2026,
    rating: 'U/A 16+',
    match: 95,
    duration: '2h 18m',
    category: 'Tamil Cinema / Action Thriller',
    tags: ['Tamil', 'Action', 'Gritty', 'Thriller'],
    desc: 'A high-octane Tamil action thriller delving into the relentless confrontation between righteous resistance and systemic corruption.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'mandaadi',
    title: 'Mandaadi',
    poster: '/images/mandaadi-2026.jpg',
    year: 2026,
    rating: 'U/A 13+',
    match: 94,
    duration: '2h 25m',
    category: 'Tamil Cinema / Period Drama',
    tags: ['Tamil', 'Period', 'Rustic', 'Heritage'],
    desc: 'A sweeping Tamil period saga honoring generational traditions, courageous family loyalties, and an unbroken quest for rustic honor.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'modha-rathri',
    title: 'Modha Rathri',
    poster: '/images/modha-rathri-2026',
    year: 2026,
    rating: 'U/A 16+',
    match: 93,
    duration: '2h 10m',
    category: 'Tamil Cinema / Romance',
    tags: ['Tamil', 'Romance', 'Drama', 'Emotional'],
    desc: 'A poignant and nuanced exploration of relationships, heartfelt revelations, and choices defining modern love.',
    isAllowlisted: false,
    file: null
  }
];

// ─── 3. BLOCKBUSTER & HIT CATALOG TITLES (Poster-only catalog) ───
export const BLOCKBUSTER_CATALOG_MOVIES = [
  {
    id: 'kgf-chapter-2',
    title: 'K.G.F: Chapter 2',
    poster: '/images/kgf.jpg',
    year: 2022,
    rating: 'U/A 16+',
    match: 99,
    duration: '2h 48m',
    category: 'Blockbuster / Action',
    tags: ['Action', 'Blockbuster', 'Crime', 'Epic'],
    desc: 'In the blood-soaked realm of Kolar Gold Fields, Rocky solidifies his undisputed reign while clashing with ruthless adversaries.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'bhool-bhulaiyaa',
    title: 'Bhool Bhulaiyaa',
    poster: '/images/bhool-bhulaiyaa.jpg',
    year: 2007,
    rating: 'U/A 13+',
    match: 97,
    duration: '2h 39m',
    category: 'Comedy / Mystery / Thriller',
    tags: ['Comedy', 'Horror', 'Mystery', 'Classic'],
    desc: 'When supernatural disturbances haunt an ancestral palace, an eccentric psychiatrist arrives to unveil an eerie ancient secret.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'immortals',
    title: 'Immortals',
    poster: '/images/immortals-2026',
    year: 2026,
    rating: 'U/A 16+',
    match: 92,
    duration: '2h 15m',
    category: 'Action / Fantasy',
    tags: ['Fantasy', 'Action', 'Mythology'],
    desc: 'An epic confrontation across mythical domains where timeless heroes rise against relentless forces of darkness.',
    isAllowlisted: false,
    file: null
  }
];

// ─── 4. ANIME MASTERPIECES (Poster-only catalog) ───
export const ANIME_CATALOG_MOVIES = [
  {
    id: 'silent-voice',
    title: 'A Silent Voice',
    poster: '/images/silent-voice.jpg',
    year: 2016,
    rating: 'U/A 13+',
    match: 98,
    duration: '2h 10m',
    category: 'Anime',
    tags: ['Anime', 'Drama', 'Romance', 'Heartfelt'],
    desc: 'A former elementary school bully seeks redemption and attempts to make amends with the deaf girl he once tormented years earlier.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'your-name',
    title: 'Your Name.',
    poster: '/images/your-name.jpg',
    year: 2016,
    rating: 'U/A 13+',
    match: 98,
    duration: '1h 52m',
    category: 'Anime',
    tags: ['Anime', 'Romance', 'Fantasy', 'Masterpiece'],
    desc: 'Two teenagers separated by distance and destiny mysteriously begin swapping bodies, embarking on an unforgettable journey across time.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Mugen Train',
    poster: '/images/demon-slayer.jpg',
    year: 2020,
    rating: 'U/A 16+',
    match: 99,
    duration: '1h 57m',
    category: 'Anime',
    tags: ['Anime', 'Action', 'Dark Fantasy', 'Blockbuster'],
    desc: 'Tanjiro and the Demon Slayer Corps join Flame Hashira Kyojuro Rengoku aboard the mysterious Mugen Train to face a deadly demon.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    poster: '/images/attack-on-titan.jpg',
    year: 2021,
    rating: '18+',
    match: 99,
    duration: '2h 15m',
    category: 'Anime',
    tags: ['Anime', 'Dark Fantasy', 'Action', 'Epic'],
    desc: 'Humanity struggles for survival inside towering walled cities against gigantic human-eating humanoid Titans.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'death-note',
    title: 'Death Note',
    poster: '/images/death-note.jpg',
    year: 2006,
    rating: 'U/A 16+',
    match: 98,
    duration: '2h 5m',
    category: 'Anime',
    tags: ['Anime', 'Psychological', 'Thriller', 'Mystery'],
    desc: 'An exceptional high school genius discovers a supernatural notebook that grants him the godlike ability to eliminate anyone whose name he writes.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'weathering-with-you',
    title: 'Weathering With You',
    poster: '/images/weathering-with-you.jpg',
    year: 2019,
    rating: 'U/A 13+',
    match: 97,
    duration: '1h 54m',
    category: 'Anime',
    tags: ['Anime', 'Fantasy', 'Romance', 'Drama'],
    desc: 'During an endlessly rainy Tokyo summer, a runaway boy crosses paths with an orphaned girl who possesses the wondrous power to stop the rain.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'garden-of-words',
    title: 'The Garden of Words',
    poster: '/images/garden-of-words.jpg',
    year: 2013,
    rating: 'U/A 13+',
    match: 95,
    duration: '46m',
    category: 'Romance',
    tags: ['Anime', 'Romance', 'Visual Poetry'],
    desc: 'On rainy mornings in a quiet Tokyo garden, an aspiring young shoemaker and a troubled older woman form an unspoken bond.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'josee-tiger-fish',
    title: 'Josee, the Tiger and the Fish',
    poster: '/images/josee-tiger-fish.jpg',
    year: 2020,
    rating: 'U/A 13+',
    match: 96,
    duration: '1h 38m',
    category: 'Romance',
    tags: ['Anime', 'Inspiring', 'Romance'],
    desc: 'A passionate university marine biology student becomes the caretaker for an imaginative paraplegic girl, opening up new horizons.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'pancreas',
    title: 'I Want to Eat Your Pancreas',
    poster: '/images/pancreas.jpg',
    year: 2018,
    rating: 'U/A 13+',
    match: 96,
    duration: '1h 48m',
    category: 'Drama',
    tags: ['Anime', 'Tearjerker', 'Romance'],
    desc: 'An introverted high school boy discovers the secret diary of his vivacious classmate and learns she is silently living with a fatal illness.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'grave-of-fireflies',
    title: 'Grave of the Fireflies',
    poster: '/images/grave-of-the-fireflies.jpg',
    year: 1988,
    rating: '16+',
    match: 99,
    duration: '1h 29m',
    category: 'Anime',
    tags: ['Studio Ghibli', 'War', 'Tragedy', 'Classic'],
    desc: 'In the closing months of World War II, two orphaned siblings fight desperately for survival against starvation in wartime Japan.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'spirited-away',
    title: 'Spirited Away',
    poster: '/images/spirited-away.jpg',
    year: 2001,
    rating: 'U',
    match: 99,
    duration: '2h 5m',
    category: 'Anime',
    tags: ['Studio Ghibli', 'Oscar Winner', 'Adventure'],
    desc: 'Ten-year-old Chihiro wanders into a secret spirit world ruled by witches and spirits, working in an otherworldly bathhouse to rescue her parents.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'suzume',
    title: 'Suzume',
    poster: '/images/suzume.jpg',
    year: 2022,
    rating: 'U/A 13+',
    match: 97,
    duration: '2h 2m',
    category: 'Anime',
    tags: ['Anime', 'Adventure', 'Fantasy'],
    desc: 'A courageous 17-year-old girl and an enigmatic young traveler journey across abandoned ruins in Japan to seal mystical doors.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'anohana',
    title: 'Anohana: The Flower We Saw That Day',
    poster: '/images/anohana.jpg',
    year: 2013,
    rating: 'U/A 13+',
    match: 95,
    duration: '1h 39m',
    category: 'Drama',
    tags: ['Anime', 'Drama', 'Nostalgia', 'Friendship'],
    desc: 'Years after a childhood tragedy shattered their circle, the spirit of Menma appears to Jinta to fulfill an unremembered promise.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'spy-family',
    title: 'Spy x Family',
    poster: '/images/spy-family.jpg',
    year: 2022,
    rating: 'U/A 13+',
    match: 97,
    duration: '2h 10m',
    category: 'Anime',
    tags: ['Anime', 'Comedy', 'Action', 'Spy'],
    desc: 'A master spy creates a counterfeit family consisting of a telepathic daughter and an assassin wife for his critical mission.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    poster: '/images/one-punch-man.jpg',
    year: 2015,
    rating: 'U/A 16+',
    match: 98,
    duration: '2h 0m',
    category: 'Anime',
    tags: ['Anime', 'Superhero', 'Comedy', 'Action'],
    desc: 'A superhero who can defeat any opponent with a single punch grows bored by the absence of a genuine challenge.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'tokyo-revengers',
    title: 'Tokyo Revengers',
    poster: '/images/tokyo-revengers.jpg',
    year: 2021,
    rating: '16+',
    match: 96,
    duration: '2h 12m',
    category: 'Anime',
    tags: ['Anime', 'Time Travel', 'Action', 'Drama'],
    desc: 'Takemichi travels back 12 years into his past to save his middle school girlfriend from a deadly crime gang.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'mob-psycho-100',
    title: 'Mob Psycho 100',
    poster: '/images/mob-psycho-100.jpg',
    year: 2016,
    rating: 'U/A 13+',
    match: 97,
    duration: '2h 15m',
    category: 'Anime',
    tags: ['Anime', 'Supernatural', 'Comedy', 'Action'],
    desc: 'An eighth-grader with tremendous psychic prowess tries to lead a normal life while keeping his emotional gauge below 100%.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'campfire-cooking',
    title: 'Campfire Cooking in Another World',
    poster: '/images/campfire-cooking.jpg',
    year: 2023,
    rating: 'U',
    match: 94,
    duration: '2h 5m',
    category: 'Anime',
    tags: ['Anime', 'Fantasy', 'Gourmet', 'Slice of Life'],
    desc: 'Summoned to a fantasy world with an Online Grocery skill, Mukouda discovers delicious culinary creations tame legendary mythical beasts.',
    isAllowlisted: false,
    file: null
  },
  {
    id: 'hyouka',
    title: 'Hyouka',
    poster: '/images/hyouka.jpg',
    year: 2012,
    rating: 'U',
    match: 95,
    duration: '2h 8m',
    category: 'Anime',
    tags: ['Anime', 'Mystery', 'School', 'Slice of Life'],
    desc: 'Energy-conserving high schooler Hotaro Oreki joins the Classic Literature Club and is drawn into solving intriguing everyday mysteries.',
    isAllowlisted: false,
    file: null
  }
];

// Combine all catalog (poster-only) titles
export const OTHER_CATALOG_MOVIES = [
  ...TAMIL_POSTER_MOVIES,
  ...BLOCKBUSTER_CATALOG_MOVIES,
  ...ANIME_CATALOG_MOVIES
];

// Unified complete collection
export const ALL_MOVIES = [...ALLOWLISTED_MOVIES, ...OTHER_CATALOG_MOVIES];

// ─── 5. MAINTAINABLE POSTER REGISTRATION SYSTEM ───
/**
 * Dynamic registry allows registering new Tamil or international posters in the future
 * with a single function call, without modifying multiple component files.
 */
export const registerMoviePoster = (movieConfig) => {
  const newMovie = {
    id: movieConfig.id || movieConfig.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: movieConfig.title,
    poster: movieConfig.poster,
    year: movieConfig.year || new Date().getFullYear(),
    rating: movieConfig.rating || 'U/A 13+',
    match: movieConfig.match || 95,
    duration: movieConfig.duration || '2h 15m',
    category: movieConfig.category || 'Tamil Cinema',
    tags: movieConfig.tags || ['Tamil', 'Cinema'],
    desc: movieConfig.desc || `${movieConfig.title} streaming soon on NEXTFLIX.`,
    isAllowlisted: Boolean(movieConfig.isAllowlisted),
    file: movieConfig.file || null
  };

  // Add to master lists if not already present
  if (!ALL_MOVIES.some(m => m.id === newMovie.id)) {
    if (newMovie.isAllowlisted) {
      ALLOWLISTED_MOVIES.push(newMovie);
    } else {
      OTHER_CATALOG_MOVIES.unshift(newMovie);
    }
    ALL_MOVIES.push(newMovie);
  }

  return newMovie;
};

// ─── 6. UTILITY FUNCTIONS ───

export const isMovieAllowlisted = (id) => {
  if (!id) return false;
  const clean = String(id).toLowerCase();
  return ALLOWLISTED_MOVIES.some(m => m.id === clean);
};

export const getMovieById = (id) => {
  if (!id) return null;
  const clean = String(id).toLowerCase();
  return ALL_MOVIES.find(m => m.id === clean) || null;
};

/**
 * Deterministic PRNG-based shuffle that produces varied orders per section
 * and remains completely stable during a user browsing session.
 */
export const shuffleWithSeed = (array, seed = 1) => {
  if (!array || array.length <= 1) return array || [];
  const result = [...array];
  let s = Math.abs(seed);
  if (s === 0) s = 12345;
  for (let i = result.length - 1; i > 0; i--) {
    // Linear Congruential Generator step
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((s / 4294967296) * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};
