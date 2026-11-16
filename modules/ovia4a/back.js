/* menu-3 — dil fallback'li isim okuma (m3Lang): name[lang] eksikse tum modul
   patlayip {{html}}/{{menucontactlist}}/{{langhtml}}/{{langclass}} ciktiya
   siziyordu. url/spot alanlari da bos-guvenli. */
function m3Lang(val) {
  if (val == null) {
    return "";
  }
  if (typeof val === "object") {
    if (val[json.lang] != null) {
      return val[json.lang];
    }
    if (val.tr != null) {
      return val.tr;
    }
    var m3Keys = Object.keys(val);
    return m3Keys.length ? (val[m3Keys[0]] || "") : "";
  }
  return String(val);
}

// Find the page with `modulestatus.page` set to true
var pagesettingjson = webmakerdata.pagesetting.data.find(
  function(item) { return item.modulestatus && item.modulestatus.page; },
);
var backhtml = `<a class="modulexmenulist-menu" href="${wxLangInternalHref('')}">@home@ </a>`;
if (pagesettingjson) {
  var durum = "";
  for (var iterator of webmakerdata[pagesettingjson.path].data) {
    if (iterator.status == "play") {
      if (iterator.category == "") {
        if (page.path == iterator.path) {
          durum = "dropdown-content-active-modulex";
        } else {
          durum = "";
        }

        backhtml += `<div class="modulexmenulist-menu ${durum}" >

      <a href="${wxLangInternalHref(iterator.pathnext || iterator.path)}">
       ${m3Lang(iterator.name)}
      </a>
     ${pagecategory(iterator.id)}
                    </div>
    `;
      }
    }
  }
}
// Replace the placeholder {{html}} with the generated backhtml content
html = html.replace(new RegExp("{{html}}", "g"), backhtml);

menucontactlist = "";
for (var key of (json.data || [])) {
  var m3Spot = m3Lang(key.spot);
  /* Kalem bazli renkler CSS placeholder (--spotcolor--) ile cozulmez; inline uygula. */
  var m3SpotColor = (key.spotcolor && String(key.spotcolor).trim()) ? String(key.spotcolor).trim() : "#000";
  var m3IconColor = (key.iconcolor && String(key.iconcolor).trim()) ? String(key.iconcolor).trim() : "#000";
  menucontactlist += `
    <a href="${key.url || "#"}" class="mobil-closed" target="_blank" rel="noopener noreferrer">
     <div class="material-symbols-outlined modulex-icon" style="color:${m3IconColor}">${key.icon || ""}</div>
     <div>
      <div  class="modulex-title">${m3Lang(key.name)}</div>
      <div  class="modulex-spot" style="color:${m3SpotColor}">${m3Spot}</div>
     </div>
    </a>
    `;
}
html = html.replace(new RegExp("{{menucontactlist}}", "g"), menucontactlist);
// Dil linkleri: bulunulan sayfada kalsın (ana sayfa değilse aynı path ile dil değişsin)
langhtml = "";
var langcount = 0;
var currentPagePath = (page && typeof page === "object" && page.path !== undefined) ? page.path : "";
for (var key in webmakerdata.setting.langs) {
  if (webmakerdata.setting.langs[key] == true) {
    langcount++;
    var langUrl = wxLangHref(key, currentPagePath || "");
    langhtml += typeof wmLangLi === "function" ? wmLangLi(key, langUrl, { style: "text", upper: false }) : `<li><a href="${langUrl}">${key}</a></li>`; /* G1 */
  }
}
var langclass = "";
if (langcount <= 1) {
  langhtml = "";
  langclass = "lang-hidden";
}
html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);
html = html.replace(new RegExp("{{langclass}}", "g"), langclass);
function pagecategory(path) {
  var backhtml = "";
  if (path != undefined && path != "") {
    var pagesettingjson = webmakerdata.pagesetting.data.find(
      function(item) { return item.modulestatus && item.modulestatus.page; },
    );
    if (pagesettingjson) {
      for (var page of webmakerdata[pagesettingjson.path].data) {
        if (page.status == "play") {
          if (path == page.category) {
            backhtml += `<a href="${wxLangInternalHref(page.pathnext || page.path)}">
    ${m3Lang(page.name)}</a>
      `;
          }
        }
      }
    }

    if (backhtml != "") {
      backhtml = `<div class="dropdown-content-modulex">
    ${backhtml}
    </div>`;
    }
  }
  return backhtml;
}
