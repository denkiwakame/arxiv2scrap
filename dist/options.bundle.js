!function(e){function t(t){for(var n,c,s=t[0],i=t[1],u=t[2],p=0,f=[];p<s.length;p++)c=s[p],r[c]&&f.push(r[c][0]),r[c]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(l&&l(t);f.length;)f.shift()();return a.push.apply(a,u||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],n=!0,s=1;s<o.length;s++){var i=o[s];0!==r[i]&&(n=!1)}n&&(a.splice(t--,1),e=c(c.s=o[0]))}return e}var n={},r={1:0},a=[];function c(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.m=e,c.c=n,c.d=function(e,t,o){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(o,n,function(t){return e[t]}.bind(null,n));return o},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var s=window.webpackJsonp=window.webpackJsonp||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=i;a.push([15,0]),o()}({15:function(e,t,o){const n=o(0),r=(o(1),o(3));UI={init:function(){this.setupMDCSelect(),this.setupMDCSnackBar(),this.getProjectName()},setupMDCSelect:function(){const e=this,t=new(0,o(16).MDCSelect)(document.querySelector(".mdc-select"));t.listen("MDCSelect:change",()=>{chrome.storage.local.set({a2sProjectName:t.value}),e.snackbar.show({message:`target project is set to "${t.value}"`})})},setupMDCSnackBar:function(){const e=o(5).MDCSnackbar;this.snackbar=new e(document.querySelector(".mdc-snackbar"))},getProjectName:function(){const e=this;n.ajax({url:"https://scrapbox.io/api/projects",type:"get",dataType:"json",statusCode:{200:e=>{for(project of e.projects){const e=project.name,t=project.displayName;n(".mdc-select__native-control").append(`<option value="${e}">${t}</option>`)}chrome.storage.local.get("a2sProjectName",e=>{e.a2sProjectName&&(document.querySelector(`select option[value='${e.a2sProjectName}']`).selected=!0)})},401:t=>{e.snackbar.show({message:"You are not logged in. Please login and try again",actionText:"Login",actionHandler:()=>{r.tabs.create({url:"https://scrapbox.io/login/google"})}})}}})}},UI.init()}});