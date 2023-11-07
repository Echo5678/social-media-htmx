export const BaseHtml = ({
  styles,
  scripts,
  links,
  children,
}: {
  styles?: string;
  scripts?: string;
  links?: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <>
    {"<!DOCTYPE html>"}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CoDev</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://d20yxzu0sm1upk.cloudfront.net/logo-min_65x65.png"
        />
        <meta
          name="description"
          content="Social Media platform for finding developers interested in the same technologies as you"
        />
        {links}
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
      </head>
      <style type="text/tailwindcss">
        {`
        ${styles}
        .selected {
    background-color: rgb(212 212 216);
  }
  @media (prefers-color-scheme: dark) {
    .selected  {
      background-color: rgb(39 39 42);
    }
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
        @layer utilities {
            .selected-home-tab {
                border-bottom: 2px solid;
                color: white;
            }
            :root {
    --plus-color: black; 
    --plus-icon-size: 40px;
}
.custom-scrollbar::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #2e2e2e;
  }
  
  .custom-scrollbar::-webkit-scrollbar
  {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
.plus{
  border-radius:100%;
  background:#fff;
  width: 40px;
  height: 40px;
  position:relative;
}
.plus:before{
  transition:all ease 0.4s;
  content:'';
  top:50%;
  left:50%;
  position:absolute;
  width: calc(var(--plus-icon-size)/2);
  height:1px;
  margin-left:calc(var(--plus-icon-size)/-4);
  margin-top:calc((var(--plus-icon-size)/40)-1);
  background:var(--plus-color);
}
.plus:after{
  transition:all ease 0.4s;
  content:'';
  top:50%;
  left:50%;
  position:absolute;
  width:1px;
  height:calc(var(--plus-icon-size)/2);
  margin-left:calc((var(--plus-icon-size)/40)-1);
  margin-top:calc(var(--plus-icon-size)/-4);
  background:var(--plus-color);
}
.open .plus{
    box-shadow:0 1px 40px rgba(175, 212, 237, 0.3);
}
.open .plus:before{
  opacity:0;
  animation:rotateIcon 0.4s linear;
}
.open .plus:after{
  transition:all ease 0.4s;
  transform:rotate(90deg);
}

@keyframe rotateIcon{
  from{
    opacity:1;
  }
  to{
    transform: rotate(180deg);
    opacity:0;
  }
}

.menu{
  transition:all ease 0.4s;
  opacity:0;
}

.menu ul li{
  transition:all ease 0.4s;
  transform: translateY(80px);
}

.open .menu{
  transition:all ease 0.4s;
  animation:pulse 0.4s linear;
  opacity:1;
}

.open .menu ul li{
   transform: translateX(0);
}

 .pulse {
  -webkit-animation-name: pulse;
  animation-name: pulse;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes pulse {
  0% {
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  }
  50% {
  -webkit-transform: scale3d(1.05, 1.05, 1.05);
  transform: scale3d(1.05, 1.05, 1.05);
  }
  100% {
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  }
  }
  @keyframes pulse {
  0% {
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  }
  50% {
  -webkit-transform: scale3d(1.05, 1.05, 1.05);
  transform: scale3d(1.05, 1.05, 1.05);
  }
  100% {
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  }
  }
        }
        `}
      </style>
      <body
        class="min-h-screen bg-[#fcfcfc] text-black dark:bg-[#0e0e0e] dark:text-white flex flex-col custom-scrollbar"
        id="main"
        hx-ext="response-targets, preload"
        hx-target-404="#main"
      >
        {children}
      </body>
      <script>{scripts}</script>
    </html>
  </>
);

export const BlogEditorLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <BaseHtml
    styles={`<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/simple-image@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/quote@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/embed@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest"></script>`}
    scripts={`<script>
  const stuff = document.querySelector("#blog");
  
  const editor = new EditorJS({
    holder: 'editor',

    tools: {
      header: {
        class: Header,
        inlineToolbar : true,
      },
      list: {
        class: List,
        inlineToolbar: true
      },
      image: {
        class: SimpleImage,
        inlineToolbar: ['link']
      },
      quote: {
        class: Quote,
        inlineToolbar: true
      },
      embed: {
        class:  Embed,
        inlineToolbar: true
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true
      },
    },
    
    placeholder: "Write a blog post.", 
    onChange: (api, event) => {
      editor.save().then(output => {
        console.log(output)
        stuff.value = JSON.stringify(output)
      }).catch(e => {
        console.log("Failed to save.", e);
      })
    },
  });
</script>`}
  >
    {children}
  </BaseHtml>
);

export const MessageLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <BaseHtml
    links={`<script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>`}
  >
    {children}
  </BaseHtml>
);

export const ProjectFormLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => <BaseHtml>{children}</BaseHtml>;

export const BlogLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <BaseHtml
    links={`<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>`}
    scripts={`
  const quill = new Quill("#editor")
  quill.enable(false);
  const stuff = document.querySelector("#blog");
  quill.setContents(JSON.parse(stuff.value).ops);
  stuff.value = '';
`}
  >
    {children}
  </BaseHtml>
);
