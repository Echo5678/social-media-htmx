/*
! tailwindcss v3.3.5 | MIT License | https://tailwindcss.com
*/

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
5. Use the user's configured `sans` font-feature-settings by default.
6. Use the user's configured `sans` font-variation-settings by default.
*/

html {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
     tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
  font-feature-settings: normal;
  /* 5 */
  font-variation-settings: normal;
  /* 6 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured `mono` font family by default.
2. Correct the odd `em` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-feature-settings: inherit;
  /* 1 */
  font-variation-settings: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/

dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

/*
1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */

[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

.pointer-events-none {
  pointer-events: none;
}

.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.inset-x-0 {
  left: 0px;
  right: 0px;
}

.-bottom-7 {
  bottom: -1.75rem;
}

.-left-1 {
  left: -0.25rem;
}

.-top-1 {
  top: -0.25rem;
}

.-top-14 {
  top: -3.5rem;
}

.bottom-0 {
  bottom: 0px;
}

.bottom-\[84px\] {
  bottom: 84px;
}

.left-0 {
  left: 0px;
}

.left-5 {
  left: 1.25rem;
}

.right-1 {
  right: 0.25rem;
}

.right-5 {
  right: 1.25rem;
}

.top-0 {
  top: 0px;
}

.z-40 {
  z-index: 40;
}

.col-auto {
  grid-column: auto;
}

.col-span-4 {
  grid-column: span 4 / span 4;
}

.col-span-7 {
  grid-column: span 7 / span 7;
}

.row-span-1 {
  grid-row: span 1 / span 1;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.my-12 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-20 {
  margin-bottom: 5rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.ml-auto {
  margin-left: auto;
}

.mr-1 {
  margin-right: 0.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-1\.5 {
  margin-top: 0.375rem;
}

.mt-10 {
  margin-top: 2.5rem;
}

.mt-12 {
  margin-top: 3rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-8 {
  margin-top: 2rem;
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.grid {
  display: grid;
}

.hidden {
  display: none;
}

.h-1\/2 {
  height: 50%;
}

.h-10 {
  height: 2.5rem;
}

.h-2 {
  height: 0.5rem;
}

.h-5 {
  height: 1.25rem;
}

.h-8 {
  height: 2rem;
}

.h-\[100px\] {
  height: 100px;
}

.h-\[10px\] {
  height: 10px;
}

.h-\[15px\] {
  height: 15px;
}

.h-\[175px\] {
  height: 175px;
}

.h-\[1px\] {
  height: 1px;
}

.h-\[20px\] {
  height: 20px;
}

.h-\[20vw\] {
  height: 20vw;
}

.h-\[22\.5px\] {
  height: 22.5px;
}

.h-\[250px\] {
  height: 250px;
}

.h-\[27\.5px\] {
  height: 27.5px;
}

.h-\[35px\] {
  height: 35px;
}

.h-\[37\.5px\] {
  height: 37.5px;
}

.h-\[40px\] {
  height: 40px;
}

.h-\[50px\] {
  height: 50px;
}

.h-\[5px\] {
  height: 5px;
}

.h-\[7\.5px\] {
  height: 7.5px;
}

.h-\[75px\] {
  height: 75px;
}

.h-\[7px\] {
  height: 7px;
}

.h-fit {
  height: -moz-fit-content;
  height: fit-content;
}

.h-full {
  height: 100%;
}

.min-h-screen {
  min-height: 100vh;
}

.w-1\/2 {
  width: 50%;
}

.w-1\/4 {
  width: 25%;
}

.w-10\/12 {
  width: 83.333333%;
}

.w-14 {
  width: 3.5rem;
}

.w-20 {
  width: 5rem;
}

.w-5 {
  width: 1.25rem;
}

.w-8 {
  width: 2rem;
}

.w-\[100\%\] {
  width: 100%;
}

.w-\[100vw\] {
  width: 100vw;
}

.w-\[125px\] {
  width: 125px;
}

.w-\[160px\] {
  width: 160px;
}

.w-\[200px\] {
  width: 200px;
}

.w-\[20px\] {
  width: 20px;
}

.w-\[22\.5px\] {
  width: 22.5px;
}

.w-\[27\.5px\] {
  width: 27.5px;
}

.w-\[35px\] {
  width: 35px;
}

.w-\[37\.5px\] {
  width: 37.5px;
}

.w-\[40px\] {
  width: 40px;
}

.w-\[50px\] {
  width: 50px;
}

.w-\[5px\] {
  width: 5px;
}

.w-\[7\.5px\] {
  width: 7.5px;
}

.w-\[75px\] {
  width: 75px;
}

.w-\[7px\] {
  width: 7px;
}

.w-fit {
  width: -moz-fit-content;
  width: fit-content;
}

.w-full {
  width: 100%;
}

.w-screen {
  width: 100vw;
}

.min-w-\[242px\] {
  min-width: 242px;
}

.max-w-\[642px\] {
  max-width: 642px;
}

.max-w-\[700px\] {
  max-width: 700px;
}

.max-w-\[800px\] {
  max-width: 800px;
}

.max-w-none {
  max-width: none;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.flex-grow {
  flex-grow: 1;
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse {
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.resize-none {
  resize: none;
}

.grid-flow-row {
  grid-auto-flow: row;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-12 {
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-rows-none {
  grid-template-rows: none;
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-x-12 {
  -moz-column-gap: 3rem;
       column-gap: 3rem;
}

.gap-y-4 {
  row-gap: 1rem;
}

.space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-1\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.375rem * var(--tw-space-x-reverse));
  margin-left: calc(0.375rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-2\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.625rem * var(--tw-space-x-reverse));
  margin-left: calc(0.625rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.25rem * var(--tw-space-x-reverse));
  margin-left: calc(1.25rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(2rem * var(--tw-space-x-reverse));
  margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}

.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.space-y-7 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.75rem * var(--tw-space-y-reverse));
}

.self-end {
  align-self: flex-end;
}

.overflow-y-scroll {
  overflow-y: scroll;
}

.rounded-3xl {
  border-radius: 1.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.border {
  border-width: 1px;
}

.border-2 {
  border-width: 2px;
}

.border-x {
  border-left-width: 1px;
  border-right-width: 1px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-b-2 {
  border-bottom-width: 2px;
}

.border-l {
  border-left-width: 1px;
}

.border-t-2 {
  border-top-width: 2px;
}

.border-\[\#2f3336\] {
  --tw-border-opacity: 1;
  border-color: rgb(47 51 54 / var(--tw-border-opacity));
}

.border-\[\#444444\] {
  --tw-border-opacity: 1;
  border-color: rgb(68 68 68 / var(--tw-border-opacity));
}

.border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}

.border-transparent {
  border-color: transparent;
}

.border-zinc-200 {
  --tw-border-opacity: 1;
  border-color: rgb(228 228 231 / var(--tw-border-opacity));
}

.border-zinc-300 {
  --tw-border-opacity: 1;
  border-color: rgb(212 212 216 / var(--tw-border-opacity));
}

.border-zinc-800 {
  --tw-border-opacity: 1;
  border-color: rgb(39 39 42 / var(--tw-border-opacity));
}

.bg-\[\#010101\] {
  --tw-bg-opacity: 1;
  background-color: rgb(1 1 1 / var(--tw-bg-opacity));
}

.bg-\[\#f9f9f9\] {
  --tw-bg-opacity: 1;
  background-color: rgb(249 249 249 / var(--tw-bg-opacity));
}

.bg-\[\#fcfcfc\] {
  --tw-bg-opacity: 1;
  background-color: rgb(252 252 252 / var(--tw-bg-opacity));
}

.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}

.bg-black\/20 {
  background-color: rgb(0 0 0 / 0.2);
}

.bg-green-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(74 222 128 / var(--tw-bg-opacity));
}

.bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity));
}

.bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity));
}

.bg-red-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity));
}

.bg-sky-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(56 189 248 / var(--tw-bg-opacity));
}

.bg-sky-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(14 165 233 / var(--tw-bg-opacity));
}

.bg-transparent {
  background-color: transparent;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity));
}

.bg-zinc-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(244 244 245 / var(--tw-bg-opacity));
}

.bg-zinc-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(228 228 231 / var(--tw-bg-opacity));
}

.bg-zinc-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 216 / var(--tw-bg-opacity));
}

.bg-zinc-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 250 250 / var(--tw-bg-opacity));
}

.bg-zinc-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(63 63 70 / var(--tw-bg-opacity));
}

.bg-zinc-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(39 39 42 / var(--tw-bg-opacity));
}

.bg-zinc-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity));
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-purple-400 {
  --tw-gradient-from: #c084fc var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(192 132 252 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-pink-600 {
  --tw-gradient-to: #db2777 var(--tw-gradient-to-position);
}

.bg-cover {
  background-size: cover;
}

.bg-clip-text {
  -webkit-background-clip: text;
          background-clip: text;
}

.fill-current {
  fill: currentColor;
}

.object-contain {
  -o-object-fit: contain;
     object-fit: contain;
}

.p-1 {
  padding: 0.25rem;
}

.p-1\.5 {
  padding: 0.375rem;
}

.p-10 {
  padding: 2.5rem;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.p-5 {
  padding: 1.25rem;
}

.p-6 {
  padding: 1.5rem;
}

.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.px-2\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-3\.5 {
  padding-left: 0.875rem;
  padding-right: 0.875rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.px-\[10vw\] {
  padding-left: 10vw;
  padding-right: 10vw;
}

.px-\[12\.5\%\] {
  padding-left: 12.5%;
  padding-right: 12.5%;
}

.px-\[25\%\] {
  padding-left: 25%;
  padding-right: 25%;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.py-1\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-3\.5 {
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.py-\[10px\] {
  padding-top: 10px;
  padding-bottom: 10px;
}

.py-\[5\.5px\] {
  padding-top: 5.5px;
  padding-bottom: 5.5px;
}

.pb-1 {
  padding-bottom: 0.25rem;
}

.pb-10 {
  padding-bottom: 2.5rem;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.pb-24 {
  padding-bottom: 6rem;
}

.pb-28 {
  padding-bottom: 7rem;
}

.pb-3 {
  padding-bottom: 0.75rem;
}

.pb-4 {
  padding-bottom: 1rem;
}

.pb-6 {
  padding-bottom: 1.5rem;
}

.pl-12 {
  padding-left: 3rem;
}

.pl-2 {
  padding-left: 0.5rem;
}

.pl-2\.5 {
  padding-left: 0.625rem;
}

.pl-\[45\.5px\] {
  padding-left: 45.5px;
}

.pl-\[59\.02px\] {
  padding-left: 59.02px;
}

.pl-\[60px\] {
  padding-left: 60px;
}

.pr-1 {
  padding-right: 0.25rem;
}

.pr-2 {
  padding-right: 0.5rem;
}

.pr-3 {
  padding-right: 0.75rem;
}

.pr-4 {
  padding-right: 1rem;
}

.pt-1 {
  padding-top: 0.25rem;
}

.pt-1\.5 {
  padding-top: 0.375rem;
}

.pt-10 {
  padding-top: 2.5rem;
}

.pt-14 {
  padding-top: 3.5rem;
}

.pt-2 {
  padding-top: 0.5rem;
}

.pt-3 {
  padding-top: 0.75rem;
}

.pt-4 {
  padding-top: 1rem;
}

.pt-5 {
  padding-top: 1.25rem;
}

.pt-6 {
  padding-top: 1.5rem;
}

.pt-8 {
  padding-top: 2rem;
}

.text-center {
  text-align: center;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-7xl {
  font-size: 4.5rem;
  line-height: 1;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.font-bold {
  font-weight: 700;
}

.font-extrabold {
  font-weight: 800;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.italic {
  font-style: italic;
}

.tracking-wide {
  letter-spacing: 0.025em;
}

.text-\[\#444444\] {
  --tw-text-opacity: 1;
  color: rgb(68 68 68 / var(--tw-text-opacity));
}

.text-\[\#B1B1B1\] {
  --tw-text-opacity: 1;
  color: rgb(177 177 177 / var(--tw-text-opacity));
}

.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}

.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}

.text-green-500 {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity));
}

.text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity));
}

.text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}

.text-transparent {
  color: transparent;
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.text-zinc-800 {
  --tw-text-opacity: 1;
  color: rgb(39 39 42 / var(--tw-text-opacity));
}

.underline {
  text-decoration-line: underline;
}

.decoration-1 {
  text-decoration-thickness: 1px;
}

.opacity-0 {
  opacity: 0;
}

.opacity-75 {
  opacity: 0.75;
}

.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.blur-sm {
  --tw-blur: blur(4px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.placeholder\:text-\[\#444444\]::-moz-placeholder {
  --tw-text-opacity: 1;
  color: rgb(68 68 68 / var(--tw-text-opacity));
}

.placeholder\:text-\[\#444444\]::placeholder {
  --tw-text-opacity: 1;
  color: rgb(68 68 68 / var(--tw-text-opacity));
}

.invalid\:border-red-500:invalid {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity));
}

.focus-within\:border-blue-500:focus-within {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}

.hover\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:cursor-pointer:hover {
  cursor: pointer;
}

.hover\:border-black:hover {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}

.hover\:bg-zinc-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(244 244 245 / var(--tw-bg-opacity));
}

.hover\:bg-zinc-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 216 / var(--tw-bg-opacity));
}

.hover\:bg-zinc-900:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity));
}

.hover\:text-black:hover {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}

.hover\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.hover\:text-zinc-400:hover {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity));
}

.hover\:underline:hover {
  text-decoration-line: underline;
}

.focus\:border-blue-500:focus {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}

.active\:shadow-inner:active {
  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

@media (prefers-color-scheme: dark) {
  .dark\:border-\[\#222222\] {
    --tw-border-opacity: 1;
    border-color: rgb(34 34 34 / var(--tw-border-opacity));
  }

  .dark\:border-\[\#B1B1B1\] {
    --tw-border-opacity: 1;
    border-color: rgb(177 177 177 / var(--tw-border-opacity));
  }

  .dark\:border-white {
    --tw-border-opacity: 1;
    border-color: rgb(255 255 255 / var(--tw-border-opacity));
  }

  .dark\:border-zinc-800 {
    --tw-border-opacity: 1;
    border-color: rgb(39 39 42 / var(--tw-border-opacity));
  }

  .dark\:border-zinc-900 {
    --tw-border-opacity: 1;
    border-color: rgb(24 24 27 / var(--tw-border-opacity));
  }

  .dark\:bg-\[\#010101\] {
    --tw-bg-opacity: 1;
    background-color: rgb(1 1 1 / var(--tw-bg-opacity));
  }

  .dark\:bg-\[\#0a0a0a\] {
    --tw-bg-opacity: 1;
    background-color: rgb(10 10 10 / var(--tw-bg-opacity));
  }

  .dark\:bg-\[\#0e0e0e\] {
    --tw-bg-opacity: 1;
    background-color: rgb(14 14 14 / var(--tw-bg-opacity));
  }

  .dark\:bg-\[\#111111\] {
    --tw-bg-opacity: 1;
    background-color: rgb(17 17 17 / var(--tw-bg-opacity));
  }

  .dark\:bg-\[\#616161\] {
    --tw-bg-opacity: 1;
    background-color: rgb(97 97 97 / var(--tw-bg-opacity));
  }

  .dark\:bg-\[313131\] {
    background-color: 313131;
  }

  .dark\:bg-black {
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity));
  }

  .dark\:bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  }

  .dark\:bg-zinc-700 {
    --tw-bg-opacity: 1;
    background-color: rgb(63 63 70 / var(--tw-bg-opacity));
  }

  .dark\:bg-zinc-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(39 39 42 / var(--tw-bg-opacity));
  }

  .dark\:text-\[\#1e1e1e\] {
    --tw-text-opacity: 1;
    color: rgb(30 30 30 / var(--tw-text-opacity));
  }

  .dark\:text-\[\#B1B1B1\] {
    --tw-text-opacity: 1;
    color: rgb(177 177 177 / var(--tw-text-opacity));
  }

  .dark\:text-\[\#fafafa\] {
    --tw-text-opacity: 1;
    color: rgb(250 250 250 / var(--tw-text-opacity));
  }

  .dark\:text-black {
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity));
  }

  .dark\:text-green-400 {
    --tw-text-opacity: 1;
    color: rgb(74 222 128 / var(--tw-text-opacity));
  }

  .dark\:text-red-400 {
    --tw-text-opacity: 1;
    color: rgb(248 113 113 / var(--tw-text-opacity));
  }

  .dark\:text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .placeholder\:dark\:text-\[\#B1B1B1\]::-moz-placeholder {
    --tw-text-opacity: 1;
    color: rgb(177 177 177 / var(--tw-text-opacity));
  }

  .placeholder\:dark\:text-\[\#B1B1B1\]::placeholder {
    --tw-text-opacity: 1;
    color: rgb(177 177 177 / var(--tw-text-opacity));
  }

  .hover\:dark\:border-white:hover {
    --tw-border-opacity: 1;
    border-color: rgb(255 255 255 / var(--tw-border-opacity));
  }

  .hover\:dark\:bg-zinc-100:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(244 244 245 / var(--tw-bg-opacity));
  }

  .hover\:dark\:bg-zinc-800:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(39 39 42 / var(--tw-bg-opacity));
  }

  .hover\:dark\:bg-zinc-900:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(24 24 27 / var(--tw-bg-opacity));
  }

  .dark\:hover\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .hover\:dark\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }
}

@media not all and (min-width: 768px) {
  .max-md\:bottom-48 {
    bottom: 12rem;
  }

  .max-md\:right-5 {
    right: 1.25rem;
  }
}

@media (min-width: 640px) {
  .sm\:block {
    display: block;
  }

  .sm\:h-\[15vw\] {
    height: 15vw;
  }

  .sm\:h-\[45vw\] {
    height: 45vw;
  }

  .sm\:w-1\/2 {
    width: 50%;
  }

  .sm\:w-\[50vw\] {
    width: 50vw;
  }

  .sm\:w-auto {
    width: auto;
  }

  .sm\:flex-row {
    flex-direction: row;
  }

  .sm\:items-center {
    align-items: center;
  }

  .sm\:rounded-b-md {
    border-bottom-right-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }

  .sm\:border-x {
    border-left-width: 1px;
    border-right-width: 1px;
  }

  .sm\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .sm\:text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  .sm\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .sm\:text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
}

@media (min-width: 768px) {
  .md\:static {
    position: static;
  }

  .md\:left-28 {
    left: 7rem;
  }

  .md\:top-64 {
    top: 16rem;
  }

  .md\:col-span-1 {
    grid-column: span 1 / span 1;
  }

  .md\:col-span-8 {
    grid-column: span 8 / span 8;
  }

  .md\:mx-0 {
    margin-left: 0px;
    margin-right: 0px;
  }

  .md\:mt-8 {
    margin-top: 2rem;
  }

  .md\:block {
    display: block;
  }

  .md\:grid {
    display: grid;
  }

  .md\:hidden {
    display: none;
  }

  .md\:h-20 {
    height: 5rem;
  }

  .md\:h-\[37\.5vw\] {
    height: 37.5vw;
  }

  .md\:h-\[500px\] {
    height: 500px;
  }

  .md\:max-h-\[450px\] {
    max-height: 450px;
  }

  .md\:min-h-screen {
    min-height: 100vh;
  }

  .md\:w-1\/2 {
    width: 50%;
  }

  .md\:w-1\/3 {
    width: 33.333333%;
  }

  .md\:w-10\/12 {
    width: 83.333333%;
  }

  .md\:w-11\/12 {
    width: 91.666667%;
  }

  .md\:w-3\/4 {
    width: 75%;
  }

  .md\:w-\[40vw\] {
    width: 40vw;
  }

  .md\:w-auto {
    width: auto;
  }

  .md\:w-full {
    width: 100%;
  }

  .md\:grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\:flex-row {
    flex-direction: row;
  }

  .md\:flex-col {
    flex-direction: column;
  }

  .md\:items-end {
    align-items: flex-end;
  }

  .md\:space-x-6 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1.5rem * var(--tw-space-x-reverse));
    margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .md\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }

  .md\:space-y-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
  }

  .md\:self-end {
    align-self: flex-end;
  }

  .md\:rounded-full {
    border-radius: 9999px;
  }

  .md\:rounded-md {
    border-radius: 0.375rem;
  }

  .md\:border-r-2 {
    border-right-width: 2px;
  }

  .md\:border-t-0 {
    border-top-width: 0px;
  }

  .md\:p-1 {
    padding: 0.25rem;
  }

  .md\:p-2 {
    padding: 0.5rem;
  }

  .md\:p-2\.5 {
    padding: 0.625rem;
  }

  .md\:px-0 {
    padding-left: 0px;
    padding-right: 0px;
  }

  .md\:px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .md\:px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .md\:px-2\.5 {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }

  .md\:px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .md\:px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .md\:py-7 {
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
  }

  .md\:pl-0 {
    padding-left: 0px;
  }

  .md\:pr-1 {
    padding-right: 0.25rem;
  }

  .md\:pt-0 {
    padding-top: 0px;
  }

  .md\:pt-2 {
    padding-top: 0.5rem;
  }

  .md\:pt-20 {
    padding-top: 5rem;
  }

  .md\:text-left {
    text-align: left;
  }

  .md\:text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  .md\:text-5xl {
    font-size: 3rem;
    line-height: 1;
  }

  .md\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .md\:transition {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .md\:hover\:bg-zinc-200:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(228 228 231 / var(--tw-bg-opacity));
  }

  @media (prefers-color-scheme: dark) {
    .md\:hover\:dark\:bg-zinc-800:hover {
      --tw-bg-opacity: 1;
      background-color: rgb(39 39 42 / var(--tw-bg-opacity));
    }
  }
}

@media (min-width: 1024px) {
  .lg\:h-\[12\.5vw\] {
    height: 12.5vw;
  }

  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .lg\:text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }

  .lg\:text-8xl {
    font-size: 6rem;
    line-height: 1;
  }
}

@media (min-width: 1280px) {
  .xl\:col-span-9 {
    grid-column: span 9 / span 9;
  }

  .xl\:h-\[7\.5vw\] {
    height: 7.5vw;
  }

  .xl\:w-1\/2 {
    width: 50%;
  }

  .xl\:w-1\/4 {
    width: 25%;
  }

  .xl\:w-3\/4 {
    width: 75%;
  }

  .xl\:w-4\/5 {
    width: 80%;
  }

  .xl\:w-\[75\%\] {
    width: 75%;
  }

  .xl\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .xl\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\:px-14 {
    padding-left: 3.5rem;
    padding-right: 3.5rem;
  }

  .xl\:px-48 {
    padding-left: 12rem;
    padding-right: 12rem;
  }

  .xl\:pt-10 {
    padding-top: 2.5rem;
  }

  .xl\:pt-8 {
    padding-top: 2rem;
  }

  .xl\:text-5xl {
    font-size: 3rem;
    line-height: 1;
  }

  .xl\:text-7xl {
    font-size: 4.5rem;
    line-height: 1;
  }

  .xl\:text-9xl {
    font-size: 8rem;
    line-height: 1;
  }
}
