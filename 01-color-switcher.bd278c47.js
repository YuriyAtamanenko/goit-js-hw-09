!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");e.setAttribute("disabled","");var n=null;function o(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.addEventListener("click",(function(){r.style.backgroundColor=o(),t.setAttribute("disabled",""),e.removeAttribute("disabled"),n=setInterval((function(){r.style.backgroundColor=o()}),1e3)})),e.addEventListener("click",(function(){clearInterval(n),t.removeAttribute("disabled"),e.setAttribute("disabled","")}))}();
//# sourceMappingURL=01-color-switcher.bd278c47.js.map