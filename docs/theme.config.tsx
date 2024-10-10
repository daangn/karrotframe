import { type DocsThemeConfig, useTheme } from "nextra-theme-docs";
import Favicon from "./assets/favicon.png";

const Logo = () => {
  const { theme, systemTheme } = useTheme();
  const dark = theme === "system" ? systemTheme === "dark" : theme === "dark";

  return (
    <svg
      width="173"
      height="27"
      viewBox="0 0 338 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.0291 40.3412C-0.34287 39.6956 -0.342869 38.6488 1.0291 38.0032L27.1128 25.7285C28.4848 25.0829 30.7092 25.0829 32.0812 25.7285L58.1649 38.0032C59.5369 38.6488 59.5369 39.6956 58.1649 40.3412L32.0812 52.6159C30.7092 53.2616 28.4848 53.2616 27.1128 52.6159L1.0291 40.3412Z"
        fill="#A03A03"
      />
      <path
        d="M1.0291 30.766C-0.34287 30.1204 -0.342869 29.0736 1.0291 28.428L27.1128 16.1533C28.4848 15.5077 30.7092 15.5077 32.0812 16.1533L58.1649 28.428C59.5369 29.0736 59.5369 30.1204 58.1649 30.766L32.0812 43.0407C30.7092 43.6864 28.4848 43.6864 27.1128 43.0407L1.0291 30.766Z"
        fill="#CC4700"
      />
      <path
        d="M1.02897 15.097C-0.342992 14.4513 -0.342991 13.4046 1.02898 12.7589L27.1127 0.484223C28.4847 -0.161408 30.7091 -0.161408 32.081 0.484224L58.1648 12.7589C59.5367 13.4046 59.5367 14.4513 58.1648 15.097L32.081 27.3717C30.7091 28.0173 28.4847 28.0173 27.1127 27.3717L1.02897 15.097Z"
        fill="#FF6F0F"
      />
      <path
        d="M84.8757 33.8541C86.4735 34.9617 88.4187 35.879 90.7112 36.6058C93.0037 37.3327 95.0878 37.6962 96.9635 37.6962C101.618 37.6962 103.945 36.4674 103.945 34.0098C103.945 33.006 103.355 32.158 102.174 31.4657C101.028 30.7735 99.0997 30.1158 96.3904 29.4928C91.8748 28.489 88.6445 27.0871 86.6993 25.2872C84.7889 23.4527 83.8336 20.926 83.8336 17.7069C83.8336 15.3532 84.4762 13.2764 85.7614 11.4765C87.0814 9.64199 88.905 8.22284 91.2322 7.21905C93.5942 6.18065 96.2688 5.66144 99.256 5.66144C101.722 5.66144 104.241 5.95566 106.811 6.54409C109.381 7.13251 111.222 7.84209 112.334 8.67281L110.719 16.6166C109.329 15.7166 107.61 14.9898 105.56 14.4359C103.511 13.8821 101.514 13.6052 99.5687 13.6052C97.9361 13.6052 96.5988 13.8994 95.5568 14.4879C94.5494 15.0763 94.0458 15.8551 94.0458 16.8243C94.0458 17.8627 94.5668 18.7107 95.6089 19.3684C96.6856 19.9914 98.5266 20.5452 101.132 21.0298C105.752 21.8951 109.069 23.2797 111.083 25.1834C113.133 27.0871 114.157 29.7351 114.157 33.1272C114.157 37.0731 112.664 40.171 109.677 42.4209C106.724 44.6361 102.608 45.7438 97.3282 45.7438C94.7231 45.7438 92.0138 45.3457 89.2002 44.5496C86.3867 43.7535 84.3199 42.8189 83 41.7459L84.8757 33.8541Z"
        fill={dark ? "white" : "black"}
      />
      <path
        d="M129.462 45.6399C126.197 45.6399 123.54 44.8784 121.49 43.3554C119.441 41.7978 118.416 39.323 118.416 35.9309V24.5604H113.258V17.2916H118.833V9.19201H127.586V17.2916H135.454V24.5604H127.586V33.6983C127.586 35.0136 127.916 36.0001 128.576 36.6578C129.271 37.3154 130.157 37.6442 131.234 37.6442C132.762 37.6442 134.256 37.35 135.715 36.7616L136.131 44.4977C134.082 45.2592 131.859 45.6399 129.462 45.6399Z"
        fill={dark ? "white" : "black"}
      />
      <path
        d="M149.393 45.7438C146.996 45.7438 144.825 45.1207 142.88 43.8746C140.935 42.594 139.406 40.846 138.295 38.6307C137.183 36.3808 136.628 33.8714 136.628 31.1023C136.628 28.3332 137.183 25.8411 138.295 23.6258C139.406 21.3759 140.935 19.628 142.88 18.3819C144.825 17.1012 146.996 16.4608 149.393 16.4608C151.477 16.4608 153.318 16.9108 154.916 17.8108C156.513 18.7107 157.66 19.9222 158.354 21.4452V17.2916H167.524V44.9131H158.354V40.7594C157.903 42.2824 156.861 43.4939 155.228 44.3939C153.596 45.2938 151.65 45.7438 149.393 45.7438ZM146.214 31.1023C146.214 33.1445 146.77 34.8232 147.882 36.1386C148.993 37.4192 150.452 38.0596 152.258 38.0596C154.065 38.0596 155.523 37.4192 156.635 36.1386C157.781 34.8232 158.354 33.1445 158.354 31.1023C158.354 29.0601 157.781 27.3987 156.635 26.118C155.523 24.8027 154.065 24.145 152.258 24.145C150.452 24.145 148.993 24.7854 147.882 26.0661C146.77 27.3467 146.214 29.0255 146.214 31.1023Z"
        fill={dark ? "white" : "black"}
      />
      <path
        d="M185.105 45.7438C181.978 45.7438 179.217 45.1207 176.82 43.8746C174.458 42.594 172.635 40.846 171.35 38.6307C170.064 36.3808 169.422 33.8714 169.422 31.1023C169.422 28.3332 170.082 25.8411 171.402 23.6258C172.722 21.3759 174.562 19.628 176.924 18.3819C179.286 17.1012 181.978 16.4608 185 16.4608C188.022 16.4608 190.489 17.0146 192.399 18.1223C194.309 19.2299 195.681 20.5452 196.515 22.0682C197.383 23.5912 197.852 25.0623 197.922 26.4814L189.169 28.7659C188.925 27.5198 188.422 26.516 187.658 25.7545C186.928 24.9584 185.921 24.5604 184.636 24.5604C183.142 24.5604 181.874 25.1661 180.832 26.3776C179.825 27.5544 179.321 29.1293 179.321 31.1023C179.321 33.1099 179.912 34.7021 181.093 35.879C182.308 37.0558 183.941 37.6442 185.99 37.6442C187.484 37.6442 188.908 37.3673 190.263 36.8135C191.617 36.2251 192.851 35.4463 193.962 34.4771L196.724 41.6421C195.369 42.9228 193.702 43.9266 191.722 44.6535C189.776 45.3803 187.571 45.7438 185.105 45.7438Z"
        fill={dark ? "white" : "black"}
      />
      <path
        d="M200.011 5.66144H209.181V26.3776C210.744 25.6507 212.377 24.4219 214.079 22.6912C215.816 20.926 217.101 19.1261 217.935 17.2916H228.511C227.33 20.0952 225.75 22.6393 223.77 24.9238C221.79 27.1737 219.602 29.0428 217.205 30.5312L230.179 44.9131H218.091L209.233 33.7502H209.181V44.9131H200.011V5.66144Z"
        fill={dark ? "white" : "black"}
      />
      <path
        d="M248.485 12.5668C247.234 11.9092 245.596 11.6842 244.102 11.6842C242.852 11.6842 241.914 11.9784 241.289 12.5668C240.664 13.1552 240.351 14.0206 240.351 15.1628C240.351 15.7166 240.473 16.2185 240.716 16.6685C240.994 17.0839 241.271 17.2916 241.549 17.2916H248.485V24.5604H241.497V44.9131H232.327V24.5604H228.511V17.2916H232.9C232.588 17.2916 232.258 16.8589 231.91 15.9935C231.563 15.1282 231.389 14.2802 231.389 13.4495C231.389 10.6112 232.345 8.32668 234.255 6.59601C236.2 4.86534 238.043 4 241.413 4C243.844 4 246.856 4.75609 248.485 5.66144V12.5668ZM249.782 5.66144H259.056V44.9131H249.782V5.66144Z"
        fill={dark ? "white" : "black"}
      />
      <path
        d="M276.771 45.7438C273.818 45.7438 271.144 45.1034 268.747 43.8227C266.385 42.542 264.509 40.7941 263.12 38.5788C261.765 36.3289 261.088 33.8368 261.088 31.1023C261.088 28.3678 261.765 25.893 263.12 23.6777C264.509 21.4279 266.385 19.6626 268.747 18.3819C271.144 17.1012 273.818 16.4608 276.771 16.4608C279.689 16.4608 282.328 17.1012 284.69 18.3819C287.087 19.6626 288.963 21.4279 290.317 23.6777C291.707 25.893 292.402 28.3678 292.402 31.1023C292.402 33.8368 291.707 36.3289 290.317 38.5788C288.963 40.7941 287.087 42.542 284.69 43.8227C282.328 45.1034 279.689 45.7438 276.771 45.7438ZM270.675 31.1023C270.675 33.1099 271.231 34.754 272.342 36.0347C273.488 37.3154 274.965 37.9558 276.771 37.9558C278.542 37.9558 279.984 37.3154 281.095 36.0347C282.242 34.7194 282.815 33.0753 282.815 31.1023C282.815 29.0947 282.259 27.4506 281.147 26.1699C280.036 24.8892 278.577 24.2488 276.771 24.2488C274.965 24.2488 273.488 24.8892 272.342 26.1699C271.231 27.4506 270.675 29.0947 270.675 31.1023Z"
        fill={dark ? "white" : "black"}
      />
      <path
        d="M300.278 17.2916L305.54 33.8021L310.75 17.2916H318.253L323.515 33.8021L328.726 17.2916H338L327.684 44.9131H319.295L314.345 30.1158L309.396 44.9131H301.007L290.587 17.2916H300.278Z"
        fill={dark ? "white" : "black"}
      />
    </svg>
  );
};

const SEED_SCALE_COLOR_SCRIPT = `(()=>{var e=document.documentElement,d=window.matchMedia("(prefers-color-scheme: dark)"),a=()=>{e.dataset.seed="",e.dataset.seedScaleColor=d.matches?"dark":"light"};"addEventListener"in d?d.addEventListener("change",a):"addListener"in d&&d.addListener(a),a()})();`;
const NEXTRA_THEME_SCRIPT = `(()=>{var e=document.documentElement,d=window.matchMedia("(prefers-color-scheme: dark)"),s=()=>{e.classList.remove("light"),e.classList.remove("dark"),d.matches?e.classList.add("dark"):e.classList.add("light")};"addEventListener"in d?d.addEventListener("change",s):"addListener"in d&&d.addListener(s),s()})();`;

const themeConfig: DocsThemeConfig = {
  i18n: [
    { locale: "ko", text: "한국어" },
    { locale: "en", text: "English" },
  ],
  project: {
    link: "https://github.com/daangn/stackflow",
  },
  docsRepositoryBase: "https://github.com/daangn/stackflow/tree/main/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s - Stackflow",
    };
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
  },
  navigation: {
    prev: true,
    next: true,
  },
  darkMode: false,
  footer: {
    text: <span>MIT {new Date().getFullYear()} © Stackflow</span>,
  },
  search: {
    placeholder: "Search",
  },
  logo: <Logo />,
  gitTimestamp: ({ timestamp }) =>
    Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(timestamp),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Mobile-first stack navigator framework with Composable Plugin System"
      />
      <meta name="og:title" content="Stackflow" />
      <link rel="shortcut icon" type="image/x-icon" href={Favicon.src} />
      <script dangerouslySetInnerHTML={{ __html: SEED_SCALE_COLOR_SCRIPT }} />
      <script dangerouslySetInnerHTML={{ __html: NEXTRA_THEME_SCRIPT }} />
    </>
  ),
};

export default themeConfig;
