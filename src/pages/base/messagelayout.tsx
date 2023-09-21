import { type PropsWithChildren } from "@kitajs/html";

export const MessageLayout = ({ children }: PropsWithChildren) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoDev</title>
  <meta name="description" content="Social Media platform for finding developers interested in the same technologies as you">
  <script src="https://unpkg.com/htmx.org@1.9.5"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
</head>
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
