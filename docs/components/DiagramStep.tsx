const svg = `
<svg width="335" height="346" viewBox="0 0 335 346" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="15.5" y="279.5" width="181" height="47" rx="7.5" stroke="currentColor"/>
<rect x="15.5" y="153.5" width="181" height="47" rx="7.5" stroke="currentColor"/>
<rect x="15.5" y="215.5" width="181" height="47" rx="7.5" stroke="currentColor"/>
<path d="M79.5781 182L80.6094 179.016H85.0156L86.0469 182H87.875L83.7969 170.688H81.8125L77.75 182H79.5781ZM81.1016 177.578L82.7656 172.75H82.8438L84.5156 177.578H81.1016ZM92.625 182.172C94.625 182.172 95.9297 180.961 96.1094 179.312H94.4844C94.2734 180.227 93.5703 180.758 92.625 180.75C91.2266 180.758 90.3281 179.609 90.3281 177.75C90.3281 175.945 91.25 174.805 92.625 174.797C93.6797 174.805 94.3125 175.469 94.4844 176.266H96.1094C95.9297 174.547 94.5312 173.406 92.5938 173.406C90.2031 173.406 88.6484 175.211 88.6562 177.797C88.6484 180.352 90.1484 182.172 92.625 182.172ZM101.656 173.516H99.9219V171.484H98.2656V173.516H97.0156V174.844H98.2656V179.844C98.25 181.391 99.4297 182.109 100.734 182.109C101.195 182.109 101.555 182.078 101.781 182.047V180.594C101.547 180.617 101.18 180.641 100.938 180.641C100.398 180.633 99.9297 180.461 99.9219 179.5V174.844H101.656V173.516ZM103.281 182H104.953V173.516H103.281V182ZM103.062 171.219C103.07 171.766 103.547 172.211 104.125 172.203C104.695 172.211 105.172 171.766 105.172 171.219C105.172 170.672 104.695 170.234 104.125 170.234C103.547 170.234 103.07 170.672 103.062 171.219ZM114.266 173.516H112.469L110.328 180.031H110.25L108.109 173.516H106.312L109.391 182H111.188L114.266 173.516ZM115.625 182H117.297V173.516H115.625V182ZM115.406 171.219C115.414 171.766 115.891 172.211 116.469 172.203C117.039 172.211 117.516 171.766 117.516 171.219C117.516 170.672 117.039 170.234 116.469 170.234C115.891 170.234 115.414 170.672 115.406 171.219ZM123.297 173.516H121.562V171.484H119.906V173.516H118.656V174.844H119.906V179.844C119.891 181.391 121.07 182.109 122.375 182.109C122.836 182.109 123.195 182.078 123.422 182.047V180.594C123.188 180.617 122.82 180.641 122.578 180.641C122.039 180.633 121.57 180.461 121.562 179.5V174.844H123.297V173.516ZM125.953 185.188C127.352 185.18 128.211 184.469 128.703 183.125L132.203 173.516H130.406L128.266 180.094H128.172L126.031 173.516H124.25L127.359 182.109L127.156 182.672C126.758 183.742 126.328 183.773 125.812 183.781C125.578 183.773 125.25 183.766 125.062 183.75V185.141C125.273 185.172 125.609 185.18 125.953 185.188Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 89C18.5817 89 15 92.5817 15 97V129C15 133.418 18.5817 137 23 137H189C193.418 137 197 133.418 197 129V97C197 92.5817 193.418 89 189 89H23ZM105.953 118H104.281V109.516H105.953V118ZM105.125 108.203C104.547 108.211 104.07 107.766 104.062 107.219C104.07 106.672 104.547 106.234 105.125 106.234C105.695 106.234 106.172 106.672 106.172 107.219C106.172 107.766 105.695 108.211 105.125 108.203ZM81.6094 115.016L80.5781 118H78.75L82.8125 106.688H84.7969L88.875 118H87.0469L86.0156 115.016H81.6094ZM83.7656 108.75L82.1016 113.578H85.5156L83.8438 108.75H83.7656ZM97.1094 115.312C96.9297 116.961 95.625 118.172 93.625 118.172C91.1484 118.172 89.6484 116.352 89.6562 113.797C89.6484 111.211 91.2031 109.406 93.5938 109.406C95.5312 109.406 96.9297 110.547 97.1094 112.266H95.4844C95.3125 111.469 94.6797 110.805 93.625 110.797C92.25 110.805 91.3281 111.945 91.3281 113.75C91.3281 115.609 92.2266 116.758 93.625 116.75C94.5703 116.758 95.2734 116.227 95.4844 115.312H97.1094ZM102.656 109.516H100.922V107.484H99.2656V109.516H98.0156V110.844H99.2656V115.844C99.25 117.391 100.43 118.109 101.734 118.109C102.195 118.109 102.555 118.078 102.781 118.047V116.594C102.547 116.617 102.18 116.641 101.938 116.641C101.398 116.633 100.93 116.461 100.922 115.5V110.844H102.656V109.516ZM115.266 109.516H113.469L111.328 116.031H111.25L109.109 109.516H107.312L110.391 118H112.188L115.266 109.516ZM118.297 118H116.625V109.516H118.297V118ZM117.469 108.203C116.891 108.211 116.414 107.766 116.406 107.219C116.414 106.672 116.891 106.234 117.469 106.234C118.039 106.234 118.516 106.672 118.516 107.219C118.516 107.766 118.039 108.211 117.469 108.203ZM124.297 109.516H122.562V107.484H120.906V109.516H119.656V110.844H120.906V115.844C120.891 117.391 122.07 118.109 123.375 118.109C123.836 118.109 124.195 118.078 124.422 118.047V116.594C124.188 116.617 123.82 116.641 123.578 116.641C123.039 116.633 122.57 116.461 122.562 115.5V110.844H124.297V109.516ZM129.703 119.125C129.211 120.469 128.352 121.18 126.953 121.188C126.609 121.18 126.273 121.172 126.062 121.141V119.75C126.214 119.763 126.457 119.77 126.668 119.777L126.812 119.781C127.328 119.773 127.758 119.742 128.156 118.672L128.359 118.109L125.25 109.516H127.031L129.172 116.094H129.266L131.406 109.516H133.203L129.703 119.125Z" fill="currentColor"/>
<rect x="42.5" y="54.5" width="127" height="22" rx="7.5" stroke="currentColor"/>
<path d="M96.4531 62.6719H98.125C98.0703 60.8438 96.4688 59.5312 94.1719 59.5312C91.8828 59.5312 90.1484 60.8281 90.1406 62.7812C90.1484 64.3594 91.2734 65.2812 93.0938 65.7812L94.4375 66.1406C95.6328 66.4609 96.5703 66.8594 96.5781 67.8438C96.5703 68.9531 95.5234 69.6797 94.0781 69.6875C92.7578 69.6797 91.6641 69.0938 91.5625 67.8594H89.8438C89.9531 69.9219 91.5469 71.1875 94.0781 71.1875C96.75 71.1875 98.2734 69.7891 98.2812 67.875C98.2734 65.8281 96.4609 65.0391 95.0156 64.6875L93.9219 64.3906C93.0234 64.1797 91.8594 63.7578 91.8594 62.6875C91.8672 61.7266 92.7422 61.0156 94.125 61.0156C95.4219 61.0156 96.3438 61.6172 96.4531 62.6719Z" fill="currentColor"/>
<path d="M103.953 62.5156H102.219V60.4844H100.562V62.5156H99.3125V63.8438H100.562V68.8438C100.547 70.3906 101.727 71.1094 103.031 71.1094C103.492 71.1094 103.852 71.0781 104.078 71.0469V69.5938C103.844 69.6172 103.477 69.6406 103.234 69.6406C102.695 69.6328 102.227 69.4609 102.219 68.5V63.8438H103.953V62.5156Z" fill="currentColor"/>
<path d="M109.141 71.1719C111.008 71.1719 112.312 70.25 112.687 68.875H111C110.719 69.3906 110.102 69.7969 109.156 69.7969C107.766 69.7969 106.812 68.8828 106.766 67.2656H112.797V66.6719C112.797 63.6016 110.961 62.4062 109.031 62.4062C106.664 62.4062 105.102 64.2031 105.109 66.8125C105.102 69.4453 106.641 71.1719 109.141 71.1719ZM106.773 66.0156C106.844 64.8203 107.711 63.7734 109.047 63.7812C110.32 63.7734 111.156 64.7266 111.156 66.0156H106.773Z" fill="currentColor"/>
<path d="M114.453 74.1875H116.125V69.6719H116.219C116.523 70.2266 117.133 71.1641 118.672 71.1719C120.727 71.1641 122.219 69.5156 122.219 66.7812C122.219 64.0156 120.711 62.4062 118.656 62.4062C117.086 62.4062 116.516 63.3594 116.219 63.8906H116.078V62.5156H114.453V74.1875ZM116.094 66.75C116.094 64.9844 116.859 63.8203 118.297 63.8281C119.789 63.8203 120.531 65.0781 120.531 66.75C120.531 68.4531 119.766 69.7422 118.297 69.75C116.875 69.7422 116.094 68.5312 116.094 66.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M111 23C106.582 23 103 26.5817 103 31V38C103 42.4183 106.582 46 111 46H223C227.418 46 231 42.4183 231 38V31C231 26.5817 227.418 23 223 23H111ZM159.125 31.6719H157.453C157.344 30.6172 156.422 30.0156 155.125 30.0156C153.742 30.0156 152.867 30.7266 152.859 31.6875C152.859 32.7578 154.023 33.1797 154.922 33.3906L156.016 33.6875C157.461 34.0391 159.273 34.8281 159.281 36.875C159.273 38.7891 157.75 40.1875 155.078 40.1875C152.547 40.1875 150.953 38.9219 150.844 36.8594H152.562C152.664 38.0938 153.758 38.6797 155.078 38.6875C156.523 38.6797 157.57 37.9531 157.578 36.8438C157.57 35.8594 156.633 35.4609 155.438 35.1406L154.094 34.7812C152.273 34.2812 151.148 33.3594 151.141 31.7812C151.148 29.8281 152.883 28.5312 155.172 28.5312C157.469 28.5312 159.07 29.8438 159.125 31.6719ZM163.219 31.5156H164.953V32.8438H163.219V37.5C163.227 38.4609 163.695 38.6328 164.234 38.6406C164.477 38.6406 164.844 38.6172 165.078 38.5938V40.0469C164.852 40.0781 164.492 40.1094 164.031 40.1094C162.727 40.1094 161.547 39.3906 161.562 37.8438V32.8438H160.312V31.5156H161.562V29.4844H163.219V31.5156ZM170.141 40.1719C172.008 40.1719 173.312 39.25 173.688 37.875H172C171.719 38.3906 171.102 38.7969 170.156 38.7969C168.766 38.7969 167.812 37.8828 167.766 36.2656H173.797V35.6719C173.797 32.6016 171.961 31.4062 170.031 31.4062C167.664 31.4062 166.102 33.2031 166.109 35.8125C166.102 38.4453 167.641 40.1719 170.141 40.1719ZM167.773 35.0156C167.844 33.8203 168.711 32.7734 170.047 32.7812C171.32 32.7734 172.156 33.7266 172.156 35.0156H167.773ZM177.125 43.1875H175.453V31.5156H177.078V32.8906H177.219C177.516 32.3594 178.086 31.4062 179.656 31.4062C181.711 31.4062 183.219 33.0156 183.219 35.7812C183.219 38.5156 181.727 40.1641 179.672 40.1719C178.133 40.1641 177.523 39.2266 177.219 38.6719H177.125V43.1875ZM179.297 32.8281C177.859 32.8203 177.094 33.9844 177.094 35.75C177.094 37.5312 177.875 38.7422 179.297 38.75C180.766 38.7422 181.531 37.4531 181.531 35.75C181.531 34.0781 180.789 32.8203 179.297 32.8281Z" fill="currentColor"/>
<path d="M79.5781 244L80.6094 241.016H85.0156L86.0469 244H87.875L83.7969 232.688H81.8125L77.75 244H79.5781ZM81.1016 239.578L82.7656 234.75H82.8438L84.5156 239.578H81.1016ZM92.625 244.172C94.625 244.172 95.9297 242.961 96.1094 241.312H94.4844C94.2734 242.227 93.5703 242.758 92.625 242.75C91.2266 242.758 90.3281 241.609 90.3281 239.75C90.3281 237.945 91.25 236.805 92.625 236.797C93.6797 236.805 94.3125 237.469 94.4844 238.266H96.1094C95.9297 236.547 94.5312 235.406 92.5938 235.406C90.2031 235.406 88.6484 237.211 88.6562 239.797C88.6484 242.352 90.1484 244.172 92.625 244.172ZM101.656 235.516H99.9219V233.484H98.2656V235.516H97.0156V236.844H98.2656V241.844C98.25 243.391 99.4297 244.109 100.734 244.109C101.195 244.109 101.555 244.078 101.781 244.047V242.594C101.547 242.617 101.18 242.641 100.938 242.641C100.398 242.633 99.9297 242.461 99.9219 241.5V236.844H101.656V235.516ZM103.281 244H104.953V235.516H103.281V244ZM103.062 233.219C103.07 233.766 103.547 234.211 104.125 234.203C104.695 234.211 105.172 233.766 105.172 233.219C105.172 232.672 104.695 232.234 104.125 232.234C103.547 232.234 103.07 232.672 103.062 233.219ZM114.266 235.516H112.469L110.328 242.031H110.25L108.109 235.516H106.312L109.391 244H111.188L114.266 235.516ZM115.625 244H117.297V235.516H115.625V244ZM115.406 233.219C115.414 233.766 115.891 234.211 116.469 234.203C117.039 234.211 117.516 233.766 117.516 233.219C117.516 232.672 117.039 232.234 116.469 232.234C115.891 232.234 115.414 232.672 115.406 233.219ZM123.297 235.516H121.562V233.484H119.906V235.516H118.656V236.844H119.906V241.844C119.891 243.391 121.07 244.109 122.375 244.109C122.836 244.109 123.195 244.078 123.422 244.047V242.594C123.188 242.617 122.82 242.641 122.578 242.641C122.039 242.633 121.57 242.461 121.562 241.5V236.844H123.297V235.516ZM125.953 247.188C127.352 247.18 128.211 246.469 128.703 245.125L132.203 235.516H130.406L128.266 242.094H128.172L126.031 235.516H124.25L127.359 244.109L127.156 244.672C126.758 245.742 126.328 245.773 125.812 245.781C125.578 245.773 125.25 245.766 125.062 245.75V247.141C125.273 247.172 125.609 247.18 125.953 247.188Z" fill="currentColor"/>
<path d="M79.5781 308L80.6094 305.016H85.0156L86.0469 308H87.875L83.7969 296.688H81.8125L77.75 308H79.5781ZM81.1016 303.578L82.7656 298.75H82.8438L84.5156 303.578H81.1016ZM92.625 308.172C94.625 308.172 95.9297 306.961 96.1094 305.312H94.4844C94.2734 306.227 93.5703 306.758 92.625 306.75C91.2266 306.758 90.3281 305.609 90.3281 303.75C90.3281 301.945 91.25 300.805 92.625 300.797C93.6797 300.805 94.3125 301.469 94.4844 302.266H96.1094C95.9297 300.547 94.5312 299.406 92.5938 299.406C90.2031 299.406 88.6484 301.211 88.6562 303.797C88.6484 306.352 90.1484 308.172 92.625 308.172ZM101.656 299.516H99.9219V297.484H98.2656V299.516H97.0156V300.844H98.2656V305.844C98.25 307.391 99.4297 308.109 100.734 308.109C101.195 308.109 101.555 308.078 101.781 308.047V306.594C101.547 306.617 101.18 306.641 100.938 306.641C100.398 306.633 99.9297 306.461 99.9219 305.5V300.844H101.656V299.516ZM103.281 308H104.953V299.516H103.281V308ZM103.062 297.219C103.07 297.766 103.547 298.211 104.125 298.203C104.695 298.211 105.172 297.766 105.172 297.219C105.172 296.672 104.695 296.234 104.125 296.234C103.547 296.234 103.07 296.672 103.062 297.219ZM114.266 299.516H112.469L110.328 306.031H110.25L108.109 299.516H106.312L109.391 308H111.188L114.266 299.516ZM115.625 308H117.297V299.516H115.625V308ZM115.406 297.219C115.414 297.766 115.891 298.211 116.469 298.203C117.039 298.211 117.516 297.766 117.516 297.219C117.516 296.672 117.039 296.234 116.469 296.234C115.891 296.234 115.414 296.672 115.406 297.219ZM123.297 299.516H121.562V297.484H119.906V299.516H118.656V300.844H119.906V305.844C119.891 307.391 121.07 308.109 122.375 308.109C122.836 308.109 123.195 308.078 123.422 308.047V306.594C123.188 306.617 122.82 306.641 122.578 306.641C122.039 306.633 121.57 306.461 121.562 305.5V300.844H123.297V299.516ZM125.953 311.188C127.352 311.18 128.211 310.469 128.703 309.125L132.203 299.516H130.406L128.266 306.094H128.172L126.031 299.516H124.25L127.359 308.109L127.156 308.672C126.758 309.742 126.328 309.773 125.812 309.781C125.578 309.773 125.25 309.766 125.062 309.75V311.141C125.273 311.172 125.609 311.18 125.953 311.188Z" fill="currentColor"/>
<circle cx="317.5" cy="35" r="3" transform="rotate(-180 317.5 35)" stroke="currentColor"/>
<path d="M230.646 34.6464C230.451 34.8417 230.451 35.1583 230.646 35.3535L233.828 38.5355C234.024 38.7308 234.34 38.7308 234.536 38.5355C234.731 38.3403 234.731 38.0237 234.536 37.8284L231.707 35L234.536 32.1716C234.731 31.9763 234.731 31.6597 234.536 31.4645C234.34 31.2692 234.024 31.2692 233.828 31.4645L230.646 34.6464ZM314.5 34.5L231 34.5L231 35.5L314.5 35.5L314.5 34.5Z" fill="currentColor"/>
</svg>
`;

const DiagramStep: React.FC = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div
      style={{ width: "100%", padding: "2rem 0 1rem", maxWidth: "20rem" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  </div>
);

export default DiagramStep;
