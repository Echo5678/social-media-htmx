import { type PropsWithChildren } from "@kitajs/html";

export const BlogEditorLayout = ({ children }: PropsWithChildren) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoDev</title>
  <link rel="icon" type="image/x-icon" href="https://res.cloudinary.com/dtkwfyslj/image/upload/v1695253847/Untitled_design-removebg-preview_wpselx.png">
  <meta name="description" content="Social Media platform for finding developers interested in the same technologies as you">
  <script src="https://unpkg.com/htmx.org@1.9.5"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</head>
<body 
  class="min-h-screen bg-[#fcfcfc] text-black dark:bg-[#0e0e0e] dark:text-white flex flex-col"
  id="main"
  hx-ext="preload"
>
${children}
</body>
  <script>
        const toolbarOptions  = [
          [{'header': [2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{ 'script': 'sub'}, { 'script': 'super'}],
          [{ 'indent': '-1'}, { 'indent': '+1'}],
          ['link', 'image', 'video'],
        ]
        const quill = new Quill("#editor", {
          modules: {
            toolbar: toolbarOptions
          },
          theme: 'snow',
        })
        const stuff = document.querySelector("#blog");

        quill.on("text-change", function(delta, oldDelta, source) {
          stuff.value = JSON.stringify(quill.getContents());
        })
  </script>
</html>
`;
