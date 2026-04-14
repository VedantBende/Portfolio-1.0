export const projects = [
  {
    id: 1,
    title: 'CineTv+',
    category: 'Full-Stack',
    description:
      'A full-stack OTT-style streaming platform built with a modular architecture. Features authentication, user data persistence, watchlist synchronization, and third-party API integration for dynamic content delivery.',
    focus: 'Scalability & System Design',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    highlights: [
      'Modular component architecture for maintainability',
      'Authentication with persistent user sessions',
      'Watchlist sync across sessions via backend API',
      'Dynamic content powered by third-party API integration',
    ],
    image: 'https://res.cloudinary.com/dmhqj66m5/image/upload/v1776170612/CineTv_Image_wjj9uh.png',
    logo: 'https://res.cloudinary.com/dmhqj66m5/image/upload/v1776172526/CineTvPlus_Logo_uj2fmb.png',
    github: 'https://github.com/VedantBende/CineTvPlus',
    live: 'https://cinetvplus.vercel.app/'
  },
  {
    id: 2,
    title: 'Weather Dashboard',
    category: 'PWA',
    description:
      'A Progressive Web App delivering real-time weather data with offline support. Engineered for performance — reduced redundant API calls by ~30%, enabled offline access via Workbox, and improved load time by ~35%.',
    focus: 'Performance & Reliability',
    stack: ['Vue.js', 'Vite', 'JavaScript', 'Workbox', 'REST APIs'],
    highlights: [
      '~30% reduction in API calls via intelligent state management',
      'Offline-first capability enabled by Workbox integration',
      '35% improvement in time-to-interactive relative benchmarks',
    ],
    image: 'https://res.cloudinary.com/dmhqj66m5/image/upload/v1776166681/weather-dashboard-21.vercel.app_dashboard_b3fkqb.png',
    logo: 'https://res.cloudinary.com/dmhqj66m5/image/upload/v1776172526/Weather_Dashboard_Logo_metwbx.png',
    github: 'https://github.com/VedantBende/weather-dashboard',
    live: 'https://weather-dashboard-21.vercel.app/dashboard'
  },
  {
    id: 3,
    title: 'Potato Leaf Disease Detection',
    category: 'AI / ML',
    description:
      'An AI-powered image classification system for detecting plant diseases from leaf imagery. Built on a CNN with transfer learning for high accuracy, deployed with a real-time inference interface.',
    focus: 'Applied AI & Real-World Problem Solving',
    stack: ['Python', 'TensorFlow', 'CNN', 'Transfer Learning', 'Streamlit'],
    highlights: [
      'Deployed deep learning CNN architecture strictly for edge performance',
      'Automated analysis mapping 9 different leaf affliction vectors',
      'Built cross-platform data visualization dashboards via Streamlit',
    ],
    image: 'https://res.cloudinary.com/dmhqj66m5/image/upload/v1776166682/potato-leaf-diseases-detection.streamlit.app__mjwjgm.png',
    logo: 'https://res.cloudinary.com/dmhqj66m5/image/upload/v1776172527/Potato_Leaf_Disease_Detection_Logo_tqsaur.png',
    github: 'https://github.com/VedantBende/potato-leaf-disease-detection',
    live: 'https://potato-leaf-diseases-detection.streamlit.app/'
  },
];
