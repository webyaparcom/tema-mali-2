var pagesettingjson = webmakerdata.pagesetting.data.find(
  function(item) { return item.modulestatus && item.modulestatus.page; },
);
var backhtml = "";
backhtml = `<li class="menu__item"><a class="menu__link" href="${wxLangInternalHref('')}">@home@</a></li>`;
if (pagesettingjson) {
  // Iterate over the relevant data to create HTML content
  for (var page of webmakerdata[pagesettingjson.path].data) {
    if (page.status == "play") {
      backhtml += `<li class="menu__item"><a class="menu__link" href="${wxLangInternalHref(page.path)}">${page.name[json.lang]}</a></li>`;
    }
  }
  // Replace the placeholder {{html}} with the generated backhtml content
  html = html.replace(new RegExp("{{html}}", "g"), backhtml);
}
/* storelinks / helplinks / aboutlinks / accountlinks: desing pipe listesi "Ad|url|Ad|url" */
function footer7BuildLinks(raw, lang) {
  var out = "";
  if (!raw) {
    return out;
  }
  var value = (raw != null && typeof raw === "object" && raw[lang] !== undefined) ? raw[lang] : raw;
  var parts = String(value).split("|");
  for (var fi = 0; fi + 1 < parts.length; fi += 2) {
    out += '<li><a href="' + (parts[fi + 1] || "#") + '">' + parts[fi] + "</a></li>";
  }
  return out;
}
html = html.replace(new RegExp("{{storelinks}}", "g"), footer7BuildLinks(json.desing.storelinks, json.lang));
html = html.replace(new RegExp("{{helplinks}}", "g"), footer7BuildLinks(json.desing.helplinks, json.lang));
html = html.replace(new RegExp("{{aboutlinks}}", "g"), footer7BuildLinks(json.desing.aboutlinks, json.lang));
html = html.replace(new RegExp("{{accountlinks}}", "g"), footer7BuildLinks(json.desing.accountlinks, json.lang));
html = html.replace(new RegExp("{{year}}", "g"), new Date().getFullYear());

var color = json.desing.color;
color = color.replace(new RegExp("#", "g"), "");
html = html.replace(new RegExp("#color#", "g"), color);
