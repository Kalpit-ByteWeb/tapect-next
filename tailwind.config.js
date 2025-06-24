/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'herobannermax': '1220px',
        'xxl': '1480px',
        'landscapemax': '1100px',
        'productshowcasemax': '1580px'
      },
      colors:{
        primary:"#652DBF",
        secondary:"#010E21",
        border_color:"#E5E5E5",
        body:"#464646",
      },
      padding:{
        60: '3.75rem',
        100: '6.25rem',
        88: '5.5rem',
        120 : '7.5rem'
      },
      margin:{
        88: '5.5rem',
        60: '3.75rem',
        120 : '7.5rem'
      },
      boxShadow:{
        'featurecardsection': '0px 0px 16px 0px #0000000A',
        'featurecardvertical2' : '0px 0px 10px 0px #0000000a',
        'AdvanceFeature' : '0px 0px 10px 0px #0000001A',
        'dropdownmenu' : '0px 0px 15px 0px #0000000a',
        'tabsection': '0px 0px 16px 0px #0000000A',
        'jobOpening': '0px 0px 10px 0px #00000040',
        'contact-form': '0px 4px 4px 0px #00000040',
        'toc': '0px 1px 1px 0px #0000000D',
        'checkout': '0px 0px 2px 0px #00000040',
        'howtous': '0px 0px 15px 0px #0000000F',
        'mobile_menu': '4px 0px 4px 0px #0000000'
      },
      space:{
        88 : '5.5rem',
        120 : '7.5rem'
      },
      backgroundColor:{
        featurelightbg : '#F5F8FE',
      },
      backgroundImage: {
        'Feature-bg': 'linear-gradient(180deg, #FCFBFF 0%, rgba(245, 248, 254, 0.1) 100%)',
        'product-customize': 'linear-gradient(180deg, #6225C2 0%, #BC22BF 100%)',
      },
    },
    container:{
      screens: {
        DEFAULT: '1220px',
      },
    },
    fontFamily: {
      primary: ["var(--font-lexend)", "sans-serif"], 
      secondary: ["var(--font-manrope)", "sans-serif"], 
    },
    borderRadius:{
      DEFAULT:'0.5rem',
      10: '0.625rem',
      15: '0.938rem',
      16: '1rem',
      30:'1.875rem',
      20: '1.25rem',
      48: '3rem',
      full:'100%',
    },
    fontSize: {
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      24: '1.5rem',
      28: '1.75rem',
      TitleHeading: '2.5rem',
      BannerTitle: '3.75rem',
      60: '3.75rem',
    },
    lineHeight:{
      85: '5.313rem',
      30: '1.875rem',
      33 : '2.063rem',
      40: '2.5rem',
      24: '1.5rem',
      56: '3.5rem',
    },
  },
  plugins: [],
}