import { type PropsWithChildren } from "@kitajs/html";

export const BaseHtml = ({ children }: PropsWithChildren) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoDev</title>
  <meta name="description" content="Social Media platform for finding developers interested in the same technologies as you">
  <script src="https://unpkg.com/htmx.org@1.9.5"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
  <style type="text/tailwindcss">
    @layer utilities {
      .nav-link::after{
        @apply content-[''] bg-white h-[3px] w-[0%] left-0 -bottom-[5px] rounded-xl absolute duration-300;
      }
      .nav-link:hover::after{
        @apply w-[100%];
      }
    }
  </style>
</head>
<style>
input[type="radio"] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span {
  transform: scale(1.2);
}

input[type="radio"]:checked + label span {
  background-color: #000000;
  box-shadow: 0px 0px 0px 2px white inset;
}
</style>
<body 
  class="min-h-screen bg-[#fcfcfc] text-black dark:bg-[#0e0e0e] dark:text-white flex flex-col"
  id="main"
  hx-ext="response-targets"
  hx-ext="preload"
  hx-target-5*="#main"
  hx-target-404="#main"
>
${children}
</body>
</html>
`;
