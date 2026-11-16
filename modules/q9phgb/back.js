/* teklif-sihirbazi-hero — Teklif Sihirbazı Hero — açılışta 3 adımlı teklif formu, dikey ilerleme rayı (16 Kas 2026 · mcp:webmaker/20261116-113510-tlwf · D17).
   Üstte etiket, h1, metin ve düğmeler; altında geniş sihirbaz kartı: marka renkli dikey rayda numaralı adım işaretleri (ilerleme çizgisi dolar) ve canlı talep özeti, yanında adım içeriği — 1) hizmet türü (data maddeleri ikonlu seçim karoları) 2) ölçü/kapsam (sayı + birim, kapsam çipleri) 3) iletişim. Önceki/sonraki adımda alan doğrulaması; gönderim WhatsApp / e-posta / formAction. Kanal yoksa yalnız madde listesi basılır; JS yokken tüm adımlar alt alta açık.
   Üretici: scripts/modul-fabrika (aile hero) — elle düzenleme yerine tanımı değiştirip yeniden üret.
   Veri: desing: ust · baslik · metin · img · img2 · video/poster · alt · cta_ad/cta_url · cta2_ad/cta2_url · rozet_*; data (kısa maddeler/sayılar): [{ ikon?, deger?, metin?, img?, url? }] — metinler dil sözlüğü. */
const P = "modulex-teklif-sihirbazi-hero";
const IMG_KOK = "/img/";
/* --- ortak ön ek (scripts/modul-fabrika/on-ek.js) — dil · güvenlik · sayı yardımcıları --- */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `${IMG_KOK}${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
/* ilk dolu alan: yeni ad önce, eski kuşak şablonun adı yedek (G6 yalnız path değiştirerek takas eder) */
const ilk = (o, ks) => {
  for (const k of ks) {
    const v = o == null ? undefined : o[k];
    if (v == null || v === "") continue;
    if (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length) continue;
    return v;
  }
  return "";
};
const metinAl = (o, ks) => pick(ilk(o, ks)).trim();
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];
const dil = String(json.lang || "");
const sayiBicim = (v, ondalik) => {
  try { return new Intl.NumberFormat(dil || undefined, { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik }).format(v); } catch (e) { return String(v); }
};
const ikonH = (ad, sinif) => (ad ? `<span class="${sinif} material-symbols-outlined" aria-hidden="true">${ad}</span>` : "");
const no = (i) => String(i + 1).padStart(2, "0");
const ctaHtml = () => {
  const a1 = metinAl(des, ["cta_ad", "button"]); const u1 = href(ilk(des, ["cta_url", "buttonurl", "url"]));
  const a2 = metinAl(des, ["cta2_ad"]); const u2 = href(ilk(des, ["cta2_url"]));
  const d = (a, u, ek) => (a && u ? `<a class="${P}-dugme${ek}" href="${esc(u)}">${esc(a)}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a>` : "");
  const ic = d(a1, u1, "") + d(a2, u2, ` ${P}-dugme--ikincil`);
  return ic ? `<div class="${P}-cta">${ic}</div>` : "";
};
const basHtml = (B, ek) => {
  if (!B.ust && !B.baslik && !B.metin && !ek) return "";
  return `<header class="${P}-bas">`
    + (B.ust ? `<p class="${P}-ust">${esc(B.ust)}</p>` : "")
    + (B.baslik ? `<h2 class="${P}-baslik" id="${P}-{{id}}-b">${esc(B.baslik)}</h2>` : "")
    + (B.metin ? `<p class="${P}-metin">${satirlar(B.metin)}</p>` : "")
    + (ek || "")
    + "</header>";
};
/* --- aile: hero --- */
const IMG = medyaUrl(pick(ilk(des, ["img", "image", "gorsel"])));
const IMG2 = medyaUrl(pick(ilk(des, ["img2", "image2"])));
const VID = medyaUrl(pick(ilk(des, ["video"])));
const POS = medyaUrl(pick(ilk(des, ["poster"]))) || IMG;
const ALT = metinAl(des, ["alt"]);
/* düğmeler: yeni ad önce, hero-5 cta1 · hero-1 btn1 · hero-2 btn1Text adları yedek */
const DV = [[["cta_ad", "cta1_ad", "cta1", "btn1", "btn1Text", "button"], ["cta_url", "cta1_url", "btn1_url", "btn1Url", "buttonurl"]], [["cta2_ad", "cta2", "btn2", "btn2Text"], ["cta2_url", "btn2_url", "btn2Url"]]]
  .map((x) => ({ ad: metinAl(des, x[0]), url: href(pick(ilk(des, x[1]))) })).filter((d) => d.ad && d.url);
const dugH = (ek) => (DV.length ? `<div class="${P}-cta${ek ? ` ${ek}` : ""}">${DV.map((d, i) => `<a class="${P}-dugme${i ? ` ${P}-dugme--ikincil` : ""}" href="${esc(d.url)}">${esc(d.ad)}${i ? "" : `<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span>`}</a>`).join("")}</div>` : "");
/* maddeler: data (yeni + hero-4 {icon,text} + hero-6 {deger,etiket,img}) yoksa hero-1 stats borusu, hero-3 statN */
const yeniOge = veri.map((o) => ({
  ikon: ikonAd(ilk(o, ["ikon", "icon"])), deger: metinAl(o, ["deger", "value", "number", "sayi"]),
  metin: metinAl(o, ["metin", "text", "etiket", "label", "baslik", "title", "name"]), img: medyaUrl(pick(ilk(o, ["img", "image"]))),
  url: href(pick(ilk(o, ["url", "link"]))),
})).filter((k) => k.metin || k.deger);
const boru = metinAl(des, ["stats"]).split("|").map((x) => x.trim());
const boruOge = [];
for (let i = 0; i + 1 < boru.length; i += 2) if (boru[i] || boru[i + 1]) boruOge.push({ ikon: "", deger: boru[i], metin: boru[i + 1], img: "", url: "" });
const statOge = [1, 2, 3, 4].map((n) => ({ ikon: "", deger: metinAl(des, ["stat" + n + "Value"]), metin: metinAl(des, ["stat" + n + "Label"]), img: "", url: "" })).filter((k) => k.deger || k.metin);
const kayitlar = yeniOge.length ? yeniOge : boruOge.concat(statOge);
const RZ = { ikon: ikonAd(ilk(des, ["rozet_ikon", "badge_icon"])), deger: metinAl(des, ["rozet_deger", "badge_value"]), metin: metinAl(des, ["rozet_metin", "badge_label"]) };
const rzH = (s) => (RZ.deger || RZ.metin ? `<p class="${P}-${s || "rozet"}">${ikonH(RZ.ikon, `${P}-rikon`)}${RZ.deger ? `<strong class="${P}-rdeger">${esc(RZ.deger)}</strong>` : ""}${RZ.metin ? `<span class="${P}-rmetin">${esc(RZ.metin)}</span>` : ""}</p>` : "");
const ustH = (B, s) => (B.ust ? `<p class="${P}-ust${s ? ` ${P}-${s}` : ""}">${esc(B.ust)}</p>` : "");
const h1H = (B, ek) => `<h1 class="${P}-h1${ek ? ` ${ek}` : ""}" id="${P}-{{id}}-b">${esc(B.baslik)}</h1>`;
const metH = (B) => (B.metin ? `<p class="${P}-metin">${satirlar(B.metin)}</p>` : "");
/* ilk görsel LCP: eager + fetchpriority; sonrakiler lazy */
const medH = (src, s, w, h, gec, alt) => (src ? `<img class="${P}-${s}" src="${esc(src)}" alt="${esc(alt == null ? ALT : alt)}" width="${w || 1600}" height="${h || 1000}" ${gec ? `loading="lazy"` : `loading="eager" fetchpriority="high"`} decoding="async" />` : "");
const ogeH = (k, s) => `<li class="${P}-${s || "oge"}">${ikonH(k.ikon, `${P}-oikon`)}${k.deger ? `<strong class="${P}-odeger">${esc(k.deger)}</strong>` : ""}${k.metin ? `<span class="${P}-ometin">${k.url ? `<a class="${P}-obag" href="${esc(k.url)}">${esc(k.metin)}</a>` : esc(k.metin)}</span>` : ""}</li>`;
const listeH = (ic, s) => (ic ? `<ul class="${P}-${s || "ogeler"}" role="list">${ic}</ul>` : "");
/* --- modül: teklif-sihirbazi-hero --- */
const kart = (k, i) => `<label class="${P}-karo"><input class="${P}-radyo" type="radio" name="service" value="h${i + 1}" data-metin="${esc(k.metin || k.deger)}" data-etiket="${esc(metinAl(des, ["adim1Ad"]) || "@booking-service@")}"${i === 0 ? " required" : ""} /><span class="${P}-kic">${ikonH(k.ikon || "check_circle", `${P}-kikon`)}${k.metin ? `<strong class="${P}-kad">${esc(k.metin)}</strong>` : ""}${k.deger ? `<span class="${P}-kdeger">${esc(k.deger)}</span>` : ""}<span class="${P}-ktik material-symbols-outlined" aria-hidden="true">check</span></span></label>`;
const sar = (ic, A, B) => {
    const fid = (k) => `${P}-{{id}}-${k}`;
    const telYazi = metinAl(des, ["telefon", "phone"]) || String(setting.phone || "").trim();
    const eposta = metinAl(des, ["eposta", "email"]) || String(setting.email || "").trim();
    const waHam = String(pick(ilk(des, ["whatsapp"])) || setting.whatsapp || "").replace(/\D/g, "") || telYazi.replace(/\D/g, "");
    const waNo = waHam.length >= 8 ? waHam : "";
    const ACTION = ((a) => (/^\/(?!\/)[A-Za-z0-9_\-./]*$/.test(a) || /^https:\/\/[^\s"'<>\\]+$/i.test(a) ? a : ""))(pick(des.formAction).trim());
    const GON = waNo ? "whatsapp" : "mailto";
    const AKTIF = !!(ACTION || waNo || eposta);
    const ust = `<div class="${P}-kafa ${P}-gir">${ustH(B)}${h1H(B)}${metH(B)}${dugH()}</div>`;
    if (!AKTIF) return `${ust}${listeH(A.map((k) => ogeH(k)).join(""))}`;
    const E1 = metinAl(des, ["adim1Ad"]) || "@booking-service@";
    const OLCU = metinAl(des, ["olcuAd"]);
    const BIRIM = metinAl(des, ["olcuBirim"]);
    const KAPSAM = metinAl(des, ["kapsamAd"]);
    const KL = (Array.isArray(des.kapsamlar) ? des.kapsamlar : []).map((x) => pick(x).trim()).filter(Boolean);
    const E2 = KAPSAM || OLCU;
    const E3 = metinAl(des, ["adim3Ad"]) || "@booking-details@";
    const GONDER = metinAl(des, ["gonderAd", "submitText"]) || "@request-a-quote@";
    const zor = `<span class="${P}-zor" aria-hidden="true"> *</span>`;
    const alan = (k, tip, et, z, oto, ek) => `<div class="${P}-alan${tip === "textarea" ? ` ${P}-alan--genis` : ""}"><label class="${P}-etiket" for="${fid(k)}">${et}${z ? zor : ""}</label>${tip === "textarea" ? `<textarea class="${P}-girdi" id="${fid(k)}" name="${k}" rows="3" data-etiket="${et}"></textarea>` : `<input class="${P}-girdi" id="${fid(k)}" name="${k}" type="${tip}" data-etiket="${et}" autocomplete="${oto}"${z ? " required" : ""}${ek || ""} />`}</div>`;
    const ADIM = [];
    if (ic) ADIM.push({ ad: E1, ic: `<div class="${P}-karolar">${ic}</div>` });
    if (E2 && (OLCU || KL.length)) ADIM.push({ ad: E2, ic: (OLCU ? `<div class="${P}-alan ${P}-alan--olcu"><label class="${P}-etiket" for="${fid("olcu")}">${esc(OLCU)}</label><div class="${P}-olcu"><input class="${P}-girdi" id="${fid("olcu")}" name="olcu" type="number" inputmode="decimal" min="0" step="any" data-etiket="${esc(OLCU + (BIRIM ? ` (${BIRIM})` : ""))}" />${BIRIM ? `<span class="${P}-birim">${esc(BIRIM)}</span>` : ""}</div></div>` : "")
      + (KL.length ? `<fieldset class="${P}-grup"><legend class="${P}-etiket">${esc(KAPSAM || OLCU)}</legend><div class="${P}-cipler">${KL.map((x) => `<label class="${P}-cip"><input class="${P}-radyo" type="radio" name="kapsam" value="${esc(x)}" data-metin="${esc(x)}" data-etiket="${esc(KAPSAM || OLCU)}" /><span class="${P}-cyazi">${esc(x)}</span></label>`).join("")}</div></fieldset>` : "") });
    ADIM.push({ ad: E3, ic: `<div class="${P}-alanlar">${alan("name", "text", "@your-name-and-surname@", true, "name")}${alan("phone", "tel", "@contact-phone@", true, "tel", ' inputmode="tel" minlength="7"')}${alan("email", "email", "@contact-email@", false, "email")}${alan("message", "textarea", "@your-message@", false, "")}</div>` });
    const coklu = ADIM.length > 1;
    return `${ust}<form class="${P}-sihirbaz${coklu ? "" : ` ${P}-sihirbaz--tek`}"${!ACTION && GON === "mailto" && eposta ? ` action="mailto:${esc(eposta)}" method="post" enctype="text/plain"` : ""} data-fb-randevu data-gonderim="${GON}" data-wa="${waNo}" data-eposta="${esc(eposta)}" data-action="${esc(ACTION)}" data-konu="${esc(B.baslik)}" data-ok="@form-sent@" data-hata="@form-error@">`
      + `<div class="${P}-ray">${coklu ? `<ol class="${P}-isaretler">${ADIM.map((a, i) => `<li class="${P}-isaret" data-adim-isaret><span class="${P}-ino">${sayiBicim(i + 1, 0)}</span><span class="${P}-iad">${esc(a.ad)}</span></li>`).join("")}</ol>` : ""}<ul class="${P}-ozet" data-ozet aria-label="@booking-summary@"></ul></div>`
      + `<div class="${P}-adimlar">${ADIM.map((a) => `<fieldset class="${P}-adim"${coklu ? " data-adim" : ""}><legend class="${P}-alegend">${esc(a.ad)}</legend>${a.ic}</fieldset>`).join("")}`
      + `<div class="${P}-nav">${coklu ? `<button type="button" class="${P}-dugme ${P}-dugme--ikincil" data-geri><span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_back</span>@previous@</button><button type="button" class="${P}-dugme" data-ileri>@next@<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></button>` : ""}<button type="submit" class="${P}-dugme ${P}-gonder" data-son>${esc(GONDER)}<span class="material-symbols-outlined" aria-hidden="true">${GON === "whatsapp" && !ACTION ? "chat" : "send"}</span></button><p class="${P}-durum" role="status" aria-live="polite"></p></div></div>`
      + (ACTION ? `<div class="${P}-bal" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" /></label></div>` : "")
      + `</form>`;
  };
const B = { ust: metinAl(des, ["ust","eyebrow","badge","kicker"]), baslik: metinAl(des, ["baslik","title"]), metin: metinAl(des, ["metin","description"]) };
/* veri yoksa gövde hiç kurulmaz (sarmalayıcı boş listeye dokunmaz) */
const BOS = !B.baslik;
const govde = BOS ? "" : sar(kayitlar.map((k, i) => kart(k, i, kayitlar.length, kayitlar)).join(""), kayitlar, B);
const bas = "";
const sinif = (bas || B.ust || B.baslik || B.metin ? "" : ` ${P}--bassiz`);
html = html
  .replaceAll("{{fbsinif}}", () => sinif)
  .replaceAll("{{fbetiket}}", () => (B.baslik ? `aria-labelledby="${P}-{{id}}-b"` : ""))
  .replaceAll("{{fbbas}}", () => bas)
  .replaceAll("{{fbgovde}}", () => govde);
if (BOS) html = "";
