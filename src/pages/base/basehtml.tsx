import { type PropsWithChildren } from "@kitajs/html";

export const BaseHtml = ({ children }: PropsWithChildren) => (
  <>
    {"<!DOCTYPE html>"}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          http-equiv="Content-Security-Policy"
          content="script-src https://unpkg.com/htmx.org@1.9.5 https://cdn.tailwindcss.com https://unpkg.com/htmx.org/dist/ext/response-targets.js https://unpkg.com/htmx.org/dist/ext/preload.js https://unpkg.com/hyperscript.org@0.9.11"
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
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
      </head>
      <style type="text/tailwindcss">
        {`
        @layer utilities {
            .selected {
                border-bottom: 2px solid;
                color: white;
            }
            :root {
    --plus-color: black; 
    --plus-icon-size: 40px;
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
        class="min-h-screen bg-[#fcfcfc] text-black dark:bg-[#0e0e0e] dark:text-white flex flex-col"
        id="main"
        hx-ext="response-targets, preload"
        hx-target-404="#main"
      >
        {children}
      </body>
    </html>
  </>
);
