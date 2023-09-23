import { type PropsWithChildren } from "@kitajs/html";

export const ProjectFormLayout = ({ children }: PropsWithChildren) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoDev</title>
  <link rel="icon" type="image/x-icon" href="https://res.cloudinary.com/dtkwfyslj/image/upload/v1695253847/Untitled_design-removebg-preview_wpselx.png">
  <meta name="description" content="Social Media platform for finding developers interested in the same technologies as you">
  <script src="https://unpkg.com/htmx.org@1.9.5"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
</head>
<style>
  input[type="radio"] + label span {
    transition: background .2s,
      transform .2s;
  }

  input[type="radio"] + label span:hover,
  input[type="radio"] + label:hover span{
  transform: scale(1.2);
  } 

  input[type="radio"]:checked + label span {
  background-color: #3490DC; //bg-blue
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