!function(t){function e(e){for(var r,i,s=e[0],c=e[1],p=e[2],l=0,d=[];l<s.length;l++)i=s[l],a[i]&&d.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(u&&u(e);d.length;)d.shift()();return o.push.apply(o,p||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={2:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var p=0;p<s.length;p++)e(s[p]);var u=c;o.push([7,0]),n()}({6:function(t,e){t.exports='<div class="mdc-chip mdc-ripple-upgraded" data-tag="<%= tag %>">\n  <div class="mdc-chip__text"><%= tag %></div>\n  <i class="material-icons mdc-chip__icon mdc-chip__icon--trailing" tabindex="0" role="button">cancel</i>\n</div>\n'},7:function(t,e,n){const r=n(0),a=n(1),o=n(3);UI={init:function(){this.setupMDCTextFields(),this.setupMDCChipSet(),this.setupMDCButtons(),this.setupMDCSnackBar()},invokeLoginAlert:function(){this.snackbar.show({message:"You are not logged in. Please login and try again",actionText:"Login",actionHandler:()=>{o.tabs.create({url:"https://scrapbox.io/login/google"})}})},checkAuth:function(){const t=this;r.ajax({url:"https://scrapbox.io/api/projects",type:"get",dataType:"json",statusCode:{200:()=>{App.getCurrentTabUrl()},401:()=>{t.invokeLoginAlert()}}})},checkProject:function(){const t=this;chrome.storage.local.get("a2sProjectName",e=>{e.a2sProjectName||(t.snackbar.show({message:"Target scrapbox project is undefined. See arxiv2scap options"}),r("#a2s-save").disabled=!0)})},setupMDCSnackBar:function(){const t=n(5).MDCSnackbar;this.snackbar=new t(document.querySelector(".mdc-snackbar"))},setupMDCButtons:function(){const t=this;new(0,n(12).MDCIconButtonToggle)(document.getElementById("a2s-save"));r("#a2s-save").on("click",()=>{const e=r("#a2s-paper-title")[0].value,n=r("#a2s-paper-abstract")[0].value,i=a.map(t.chipSet.chips,t=>"#"+document.getElementById(t.id).dataset.tag).join(" ")+"\n"+t.url+"\n>"+n+"\n";chrome.storage.local.get("a2sProjectName",t=>{const n=`https://scrapbox.io/${t.a2sProjectName}`;o.tabs.create({url:n+"/"+encodeURIComponent(e)+"?body="+encodeURIComponent(i)})})})},setupMDCTextFields:function(){const t=n(13).MDCTextField,e=r(".mdc-text-field");for(const n of e)new t(n)},_str2elem:function(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},setupMDCChipSet:function(){const t=this,e=n(14).MDCChipSet,o=r(".mdc-chip-set")[0];t.chipSet=new e(o),r("#a2s-tags").on("keydown",e=>{if("Enter"!=e.key&&" "!=e.key)return;const o=n(6),i=a.template(o),s=t._str2elem(i({tag:r("#a2s-tags")[0].value}));r(".mdc-chip-set").append(s),t.chipSet.addChip(s),r("#a2s-tags")[0].value=""})},setFormContents:function(t){const e=this;for(author of(e.url=t.url,r("#a2s-paper-title").val(t.paperTitle).focus(),r("#a2s-paper-abstract").val(t.abstract).focus(),t.authors)){const t=n(6),o=a.template(t),i=e._str2elem(o({tag:author.replace(/\ /g,"_")}));r(".mdc-chip-set").append(i),e.chipSet.addChip(i)}}},App={api:"http://export.arxiv.org/api/query/search_query",isArxivUrl:function(t){return t&&0===t.indexOf("https://arxiv.org")},parseArXivId:function(t){return t.match(/\d+.\d+/)},getCurrentTabUrl:function(){const t=this;chrome.tabs.query({active:!0,currentWindow:!0},e=>{const n=e[0].url;t.isArxivUrl(n)&&t.getPaperInfo(n)})},getPaperInfo:function(t){const e=this.parseArXivId(t);r.ajax({url:this.api,type:"get",dataType:"xml",data:{id_list:e.toString()},statusCode:{200:t=>{const n=r(t).find("entry"),o=n.find("title")[0].textContent,i=n.find("summary")[0].textContent.trim().replace(/\n/g," "),s=a.map(n.find("author"),t=>t.textContent.trim());UI.setFormContents({url:"https://arxiv.org/abs/"+e,paperTitle:o,abstract:i,authors:s})}}}).fail(()=>{alert("arXiv API request failed")})}},UI.init(),UI.checkProject(),UI.checkAuth()}});