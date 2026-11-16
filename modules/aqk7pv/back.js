var pagesettingjson = webmakerdata.pagesetting.data.find(
  function(item) { return item.modulestatus && item.modulestatus.page; },
);
var backhtml = "";
backhtml = `<li class="modulex-menu__item"><a class="modulex-menu__link" href="${wxLangInternalHref('')}">@home@</a></li>`;
if (pagesettingjson) {
  // Iterate over the relevant data to create HTML content
  for (var page of webmakerdata[pagesettingjson.path].data) {
    if (page.status == "play") {
      backhtml += `<li class="modulex-menu__item"><a class="modulex-menu__link" href="/${
        json.lang
      }/${page.path}">${((page.name && (page.name[json.lang] != null ? page.name[json.lang] : page.name.tr)) || "")}</a></li>`;
    }
  }
  // Replace the placeholder {{html}} with the generated backhtml content
  html = html.replace(new RegExp("{{html}}", "g"), backhtml);
}
html = html.replace(new RegExp("{{year}}", "g"), new Date().getFullYear());
var color = json.desing.color;
color = color.replace(new RegExp("#", "g"), "");
html = html.replace(new RegExp("#color#", "g"), color);
