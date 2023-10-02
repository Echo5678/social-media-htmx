import { type PropsWithChildren } from "@kitajs/html";

export const ProfileLayout = ({ children }: PropsWithChildren) => (
  <>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          http-equiv="Content-Security-Policy"
          content="script-src https://unpkg.com/htmx.org@1.9.5 https://unpkg.com/hyperscript.org@0.9.11 https://cdn.tailwindcss.com https://unpkg.com/htmx.org/dist/ext/response-targets.js"
        ></meta>
        <title>CoDev</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://res.cloudinary.com/dtkwfyslj/image/upload/v1695253847/Untitled_design-removebg-preview_wpselx.png"
        />
        <meta
          name="description"
          content="Social Media platform for finding developers interested in the same technologies as you"
        />
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
      </head>
      <style type="text/tailwindcss">
        {`
        @layer utilities {
            .selected {
                border-bottom: 2px solid;
                color: white;
            }
        }
        `}
      </style>
      <body
        class="min-h-screen bg-[#fcfcfc] text-black dark:bg-[#0e0e0e] dark:text-white flex flex-col"
        id="main"
        hx-ext="response-targets"
        hx-target-404="#main"
      >
        {children}
      </body>
    </html>
  </>
);
