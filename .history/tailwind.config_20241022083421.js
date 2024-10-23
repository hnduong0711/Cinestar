import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    backgroundImage: {
      "blur-right": "url('/assets/blur-right.webp')",
      "blur-left": "url('/assets/blur-left.webp')",
      'custom-gradient': 'linear-gradient(90deg, rgba(86,47,132,1) 15%, rgba(47,84,171,1) 85%)',
    },
    fontFamily: {
      title: ["Anton", "sans-serif"],
      content : ["josefin sans", "sans-serif"],
      header : ["Bungee", "sans-serif"]
      
    },
    extend: {
      colors: {
        "cinestar-black": "#0f172a", // Màu nền chính
        "cinestar-gold": "#ffd700", // Màu vàng
        "cinestar-gray": "#f8f8f8", // Màu xám nhạt
        "cinestar-blue": "#0056b3", // Màu xanh
        "cinestar-red": "#e50914", // Màu đỏ
        "cinestar-purple": "#663399", //Màu tím
        "cinestar-orange": "#FF7201",
        "cinestar-black-opacity": "rgba(15, 23, 42, 0.7)",
        "cinestar-custom-white" : '#f8fafc', // trắng cho chữ
        "cinestar-custom-blue": "#365fbf",
        "cinestar-custom-yellow" : "#f3ea28",
        "cinestar-custom-bule" : "rgb(86,47,132)",
        "cinestar-button-food" : "#94A3BB",
        "cinestar-button-food-hover" : "#f3ea28",
      

      },
      backgroundImage: {
        "purple-blue-gradient": "linear-gradient(to right, #7b2cbf, #4a90e2)",
        "orange-yellow-gradient": "linear-gradient(to right, #ffa500, #ff4500)",
        "oragan-yellow-dradient": "linear-gradient(to right, #ff6e00, #ffba06)",
        
      },

      borderRadius: {
        'custom-10px': '10px',  // Khai báo border radius tùy chỉnh
      },
      textUnderlineOffset: {
        4: '4px',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents }) {
      addBase({});
      addComponents({
        ".button": {
          "@apply text-[14px] font-bold flex rounded-md items-center justify-center cursor-pointer relative overflow-hidden":
            {},
          ".md:button": {
            "@apply flex": {},
          },
        },
        ".select-data-btn": {
          "@apply border border-cinestar-purple rounded-md text-[16px] flex  px-2 py-3  bg-white font-bold overflow-hidden text-ellipsis whitespace-nowrap":
            {},
        },
        ".heading": {
          "@apply text-4xl font-title tracking-wide uppercase": {},
        },
      });
    }),
  ],
};
