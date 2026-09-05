/* =============================================================================
   Miami Physiology Cards — single source of truth
   -----------------------------------------------------------------------------
   Edit THIS file to change any study card (question, answer, diagram, colors).
   Both the website (index.html) and the print builder load this same file, so a
   change here updates the flip cards AND the printable 6x4 cards.

   window.CARD_CONTENT[videoId] = [ {card}, {card}, {card} ]   // 3 per video
   window.CARD_DIAGRAMS[key]     = "<svg>...</svg>"            // one per card

   card fields:
     accent   "green" | "orange" | "pink"   (hook / mechanism / payoff)
     deck     small label, top of the front (e.g. "Malignant Hyperthermia")
     kicker   eyebrow over the question ("The hook" / "The mechanism" / "The payoff")
     foot     small subtitle, bottom of the front
     q        the front question
     aTitle   header on the back
     lead     optional bold one-liner on the back
     aHtml    the answer (may use <b>…</b>)
     tag      optional highlighted takeaway chip (hook/payoff cards)
     legend   optional [[hex,label],…] key (mechanism cards)
     wide     true  -> diagram spans full width under the text (mechanism cards)
     diagram  key into CARD_DIAGRAMS
   ========================================================================== */
(function(){
  // ---- shared palette (video-accurate) -------------------------------------
  var C = {
    ca:"#5AA84E", caL:"#8CC97C", caD:"#3C7A34",         // calcium (green)
    memL:"#E19A70", memD:"#9E5A38", mem:"#CE7C4F",       // SR / cell membrane (salmon)
    ryrL:"#A874C4", ryrD:"#5E3A78", ryr:"#8A54A8",        // ryanodine receptor / Ca-channel (violet)
    serca:"#AA9C92", sercaD:"#7D7169",                    // SERCA pump (tan-grey)
    dant:"#3E8EDD", dantD:"#2668A8",                      // drug (blue)
    atp:"#F2B23C", heat:"#E8542A",                        // ATP (amber) / heat (red-orange)
    na:"#A99CE6", naD:"#6F5FC0",                          // sodium (lavender)
    pump:"#7C5BC9", pumpD:"#553D95",                      // Na/K-ATPase (purple)
    anion:"#8C93A3", anionD:"#5c6270",                    // trapped anion (grey-blue)
    ach:"#E0503C", achD:"#a83322",                        // acetylcholine (red)
    achr:"#3FC6B4", achrD:"#1f8577",                      // ACh receptor (teal)
    kch:"#E8925A", kchD:"#b5622e",                        // K channel (orange)
    cav:"#BE3A8E", cavD:"#8a1f63",                        // L-type Ca_v (magenta)
    ncx:"#E0B23A", ncxD:"#a87f16",                        // NCX (gold)
    ink:"#8a8073", label:"#6c6156"
  };
  function ions(list, fill, stroke){ return '<g fill="'+fill+'" stroke="'+stroke+'" stroke-width="2">'+
    list.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(p[2]||22)+'"'+(p[3]?' opacity="'+p[3]+'"':'')+'/>';}).join('')+'</g>'; }

  var D = {};

  /* ===================== VIDEO 3 — Malignant Hyperthermia ================== */
  D.mh1 = '<svg viewBox="0 0 820 760" role="img" aria-label="RyR1 open, calcium flooding into the cytosol">'
    +'<defs><linearGradient id="wm1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="wc1" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<linearGradient id="wr1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.ryrL+'"/><stop offset="1" stop-color="'+C.ryrD+'"/></linearGradient></defs>'
    +'<text x="16" y="52" font-size="30" font-weight="700" fill="'+C.ink+'">CYTOSOL</text>'
    +'<text x="16" y="726" font-size="28" font-weight="700" fill="'+C.ink+'">SR LUMEN</text>'
    +'<rect x="0" y="470" width="820" height="270" fill="#5aa84e19"/>'
    +'<rect x="0" y="410" width="820" height="66" fill="url(#wm1)"/><rect x="0" y="410" width="820" height="10" fill="#ffffff47"/>'
    +ions([[80,560,26],[150,620,26],[230,560,26],[120,690,26],[300,640,26],[60,640,26],[210,695,26],[360,580,26],[430,650,26],[520,600,26],[600,660,26],[690,600,26],[760,660,26],[660,700,26],[470,710,26]],"url(#wc1)",C.caD)
    +'<path d="M300 410 L520 410 L470 300 L350 300 Z" fill="url(#wr1)"/><rect x="330" y="410" width="160" height="70" fill="url(#wr1)"/><path d="M300 476 L520 476 L505 560 L315 560 Z" fill="url(#wr1)" opacity=".92"/><ellipse cx="410" cy="300" rx="60" ry="16" fill="'+C.ryrD+'"/>'
    +ions([[410,360,22],[380,250,22],[445,230,22],[360,150,22],[470,140,22],[410,90,22]],"url(#wc1)",C.caD)
    +'<text x="540" y="360" font-size="30" font-weight="700" fill="'+C.ryrD+'">RyR1</text><text x="540" y="396" font-size="24" fill="'+C.ink+'">(open)</text></svg>';

  D.mh2 = '<svg viewBox="0 0 1500 470" role="img" aria-label="Normal RyR1 versus MH crisis">'
    +'<defs><linearGradient id="wm2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="wc2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<linearGradient id="wr2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.ryrL+'"/><stop offset="1" stop-color="'+C.ryrD+'"/></linearGradient>'
    +'<linearGradient id="ws2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c3b6ac"/><stop offset="1" stop-color="'+C.sercaD+'"/></linearGradient>'
    +'<marker id="wah2" markerWidth="10" markerHeight="10" refX="5" refY="5" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="'+C.caD+'"/></marker></defs>'
    +'<text x="20" y="40" font-size="34" font-weight="800" fill="'+C.caD+'">NORMAL</text>'
    +'<rect x="0" y="300" width="680" height="150" fill="#5aa84e19"/><rect x="0" y="250" width="680" height="52" fill="url(#wm2)"/>'
    +'<path d="M250 250 L360 250 L335 190 L275 190 Z" fill="url(#wr2)"/><rect x="268" y="250" width="74" height="52" fill="url(#wr2)"/>'
    +ions([[305,150,18],[270,110,15],[340,120,15]],"url(#wc2)",C.caD)
    +'<rect x="470" y="238" width="70" height="120" rx="30" fill="url(#ws2)"/><path d="M505 150 q40 40 0 84" fill="none" stroke="'+C.caD+'" stroke-width="5" opacity=".5" marker-end="url(#wah2)"/><circle cx="505" cy="140" r="16" fill="url(#wc2)" stroke="'+C.caD+'" stroke-width="2"/>'
    +'<text x="450" y="410" font-size="26" font-weight="600" fill="'+C.ink+'">SERCA resets it</text>'
    +ions([[90,360,20],[150,400,20],[210,360,20],[430,390,20],[590,370,20],[360,400,20]],"url(#wc2)",C.caD)
    +'<line x1="740" y1="20" x2="740" y2="450" stroke="#ded7c8" stroke-width="4" stroke-dasharray="10 12"/>'
    +'<g transform="translate(760,0)"><text x="20" y="40" font-size="34" font-weight="800" fill="'+C.heat+'">MH CRISIS</text>'
    +'<rect x="0" y="300" width="680" height="150" fill="#5aa84e1f"/><rect x="0" y="250" width="680" height="52" fill="url(#wm2)"/>'
    +'<path d="M230 250 L380 250 L350 180 L260 180 Z" fill="url(#wr2)"/><rect x="255" y="250" width="100" height="52" fill="url(#wr2)"/><ellipse cx="305" cy="180" rx="46" ry="12" fill="'+C.ryrD+'"/>'
    +'<text x="60" y="238" font-size="26" font-weight="700" fill="'+C.ryrD+'">stuck</text><text x="60" y="270" font-size="26" font-weight="700" fill="'+C.ryrD+'">open</text>'
    +ions([[305,150,20],[260,110,20],[350,110,20],[300,70,20],[230,70,18],[385,70,18],[330,30,16]],"url(#wc2)",C.caD)
    +'<rect x="470" y="238" width="72" height="122" rx="30" fill="url(#ws2)"/><circle cx="506" cy="299" r="18" fill="'+C.atp+'"/><text x="497" y="308" font-size="22" font-weight="800" fill="#6b4d10">A</text>'
    +'<g stroke="'+C.caD+'" stroke-width="6" fill="none" opacity=".7"><path d="M506 150 q46 46 0 92"/><path d="M545 160 q46 46 0 92"/></g>'
    +'<text x="452" y="410" font-size="26" font-weight="700" fill="'+C.heat+'">burns ATP → heat</text>'
    +'<g stroke="'+C.heat+'" stroke-width="5" fill="none" opacity=".8" stroke-linecap="round"><path d="M600 120 q14 -18 28 0 q14 18 28 0"/><path d="M600 80 q14 -18 28 0 q14 18 28 0"/></g><text x="596" y="55" font-size="26" font-weight="800" fill="'+C.heat+'">CO₂↑</text>'
    +ions([[90,370,20],[160,400,20],[430,390,20],[590,380,20]],"url(#wc2)",C.caD)+'</g></svg>';

  D.mh3 = '<svg viewBox="0 0 980 760" role="img" aria-label="Dantrolene calms RyR1 while SERCA recovers calcium">'
    +'<defs><linearGradient id="wm3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="wc3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<linearGradient id="wr3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.ryrL+'"/><stop offset="1" stop-color="'+C.ryrD+'"/></linearGradient>'
    +'<radialGradient id="wd3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#7ab8f0"/><stop offset="1" stop-color="'+C.dantD+'"/></radialGradient></defs>'
    +'<text x="20" y="60" font-size="30" font-weight="700" fill="'+C.ink+'">CYTOSOL</text><text x="20" y="726" font-size="30" font-weight="700" fill="'+C.ink+'">SR LUMEN</text>'
    +'<rect x="0" y="470" width="980" height="270" fill="#5aa84e19"/><rect x="0" y="410" width="980" height="66" fill="url(#wm3)"/><rect x="0" y="410" width="980" height="10" fill="#ffffff47"/>'
    +ions([[80,560,26],[150,620,26],[230,560,26],[120,690,26],[300,640,26],[60,640,26],[210,695,26],[360,580,26],[430,650,26],[520,600,26],[610,660,26],[700,600,26],[470,710,26],[560,700,26],[650,705,26]],"url(#wc3)",C.caD)
    +'<path d="M300 410 L470 410 L442 340 L328 340 Z" fill="url(#wr3)"/><rect x="335" y="410" width="130" height="66" fill="url(#wr3)"/>'
    +'<circle cx="300" cy="330" r="46" fill="url(#wd3)" stroke="'+C.dantD+'" stroke-width="3"/><circle cx="284" cy="316" r="12" fill="#ffffff80"/>'
    +'<text x="372" y="296" font-size="34" font-weight="800" fill="'+C.dantD+'">Dantrolene</text><text x="372" y="332" font-size="25" fill="'+C.ink+'">binds &amp; calms RyR1</text>'
    +ions([[252,250,18,".9"],[340,238,16,".7"]],"url(#wc3)",C.caD)
    +'<rect x="800" y="398" width="72" height="122" rx="30" fill="'+C.serca+'"/><path d="M836 300 q44 46 0 94" fill="none" stroke="'+C.caD+'" stroke-width="6" opacity=".6"/><circle cx="836" cy="290" r="16" fill="url(#wc3)" stroke="'+C.caD+'" stroke-width="2"/>'
    +'<text x="744" y="372" font-size="28" font-weight="700" fill="'+C.caD+'">SERCA</text><text x="706" y="404" font-size="22" fill="'+C.ink+'">recovers Ca²⁺</text></svg>';

  /* ===================== VIDEO 1 — Resting Membrane Potential ============== */
  // cm1: interior negative, K leaks out
  D.cm1 = '<svg viewBox="0 0 820 760" role="img" aria-label="Potassium leaks out, leaving the interior negative">'
    +'<defs><linearGradient id="cmm1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="cmk1" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient></defs>'
    +'<text x="16" y="50" font-size="28" font-weight="700" fill="'+C.ink+'">OUTSIDE  (+)</text>'
    +'<text x="16" y="726" font-size="28" font-weight="700" fill="'+C.ink+'">INSIDE  −70 mV</text>'
    +'<rect x="0" y="470" width="820" height="270" fill="#5aa84e10"/>'
    +'<rect x="0" y="360" width="820" height="66" fill="url(#cmm1)"/><rect x="0" y="360" width="820" height="10" fill="#ffffff47"/>'
    // K leak channel (green-tinted pore)
    +'<rect x="360" y="360" width="90" height="66" fill="#3f7a3a"/><rect x="372" y="360" width="66" height="66" fill="#daf0d2"/>'
    +'<text x="470" y="344" font-size="26" font-weight="700" fill="'+C.caD+'">K⁺ leak channel</text>'
    // K ions moving up/out through the channel
    +ions([[405,470,22],[405,300,22],[380,200,20],[430,150,20],[405,80,18]],"url(#cmk1)",C.caD)
    +'<path d="M405 470 L405 60" stroke="'+C.caD+'" stroke-width="5" fill="none" opacity=".28" stroke-dasharray="3 16" stroke-linecap="round"/>'
    // trapped anions inside
    +'<g fill="'+C.anion+'" stroke="'+C.anionD+'" stroke-width="2">'
    +'<circle cx="120" cy="560" r="30"/><circle cx="230" cy="640" r="30"/><circle cx="160" cy="690" r="30"/><circle cx="640" cy="600" r="30"/><circle cx="720" cy="680" r="30"/><circle cx="560" cy="680" r="30"/></g>'
    +'<g fill="#fff" font-size="30" font-weight="800" text-anchor="middle">'
    +'<text x="120" y="571">–</text><text x="230" y="651">–</text><text x="160" y="701">–</text><text x="640" y="611">–</text><text x="720" y="691">–</text><text x="560" y="691">–</text></g>'
    +'<text x="470" y="690" font-size="24" fill="'+C.ink+'">trapped anions (A⁻)</text>'
    +'<g fill="'+C.caL+'" stroke="'+C.caD+'" stroke-width="2"><circle cx="90" cy="560" r="16"/><circle cx="300" cy="600" r="16"/><circle cx="500" cy="640" r="16"/></g></svg>';

  // cm2 (wide): the three forces — pump, leak, anions
  D.cm2 = '<svg viewBox="0 0 1500 470" role="img" aria-label="Sodium-potassium pump, potassium leak, and trapped anions">'
    +'<defs><linearGradient id="cmm2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="cmk2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<radialGradient id="cmn2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#c3b8f2"/><stop offset="1" stop-color="'+C.naD+'"/></radialGradient>'
    +'<linearGradient id="cmp2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7de0"/><stop offset="1" stop-color="'+C.pumpD+'"/></linearGradient></defs>'
    +'<text x="20" y="40" font-size="28" font-weight="700" fill="'+C.ink+'">OUTSIDE</text><text x="20" y="452" font-size="28" font-weight="700" fill="'+C.ink+'">INSIDE (−70 mV)</text>'
    +'<rect x="0" y="210" width="1500" height="52" fill="url(#cmm2)"/>'
    // Na/K pump
    +'<rect x="150" y="196" width="120" height="128" rx="26" fill="url(#cmp2)"/><text x="120" y="366" font-size="24" font-weight="700" fill="'+C.pumpD+'">Na⁺/K⁺-ATPase</text>'
    +'<circle cx="210" cy="300" r="18" fill="'+C.atp+'"/><text x="201" y="309" font-size="20" font-weight="800" fill="#6b4d10">A</text>'
    // 3 Na out (lavender up)
    +ions([[130,120,20],[210,90,20],[290,120,20]],"url(#cmn2)",C.naD)
    +'<text x="95" y="70" font-size="24" font-weight="700" fill="'+C.naD+'">3 Na⁺ out</text>'
    // 2 K in (green down)
    +ions([[175,150,20],[250,150,20]],"url(#cmk2)",C.caD)
    +'<text x="300" y="150" font-size="24" font-weight="700" fill="'+C.caD+'">2 K⁺ in</text>'
    +'<line x1="740" y1="30" x2="740" y2="450" stroke="#ded7c8" stroke-width="4" stroke-dasharray="10 12"/>'
    // K leak channel
    +'<g transform="translate(760,0)"><rect x="120" y="210" width="90" height="52" fill="#3f7a3a"/><rect x="132" y="210" width="66" height="52" fill="#daf0d2"/>'
    +'<text x="70" y="366" font-size="24" font-weight="700" fill="'+C.caD+'">K⁺ leak channel</text>'
    +ions([[165,300,20],[165,150,20],[140,80,18],[195,60,18]],"url(#cmk2)",C.caD)
    +'<path d="M165 300 L165 50" stroke="'+C.caD+'" stroke-width="5" fill="none" opacity=".3" stroke-dasharray="3 14" stroke-linecap="round"/>'
    // trapped anions
    +'<g fill="'+C.anion+'" stroke="'+C.anionD+'" stroke-width="2"><circle cx="430" cy="330" r="30"/><circle cx="540" cy="370" r="30"/><circle cx="640" cy="330" r="30"/></g>'
    +'<g fill="#fff" font-size="30" font-weight="800" text-anchor="middle"><text x="430" y="341">–</text><text x="540" y="381">–</text><text x="640" y="341">–</text></g>'
    +'<text x="420" y="420" font-size="24" font-weight="700" fill="'+C.anionD+'">trapped anions (A⁻)</text></g></svg>';

  // cm3: hyperkalemia — outside K rises, membrane depolarizes
  D.cm3 = '<svg viewBox="0 0 820 760" role="img" aria-label="High extracellular potassium depolarizes the membrane">'
    +'<defs><linearGradient id="cmm3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="cmk3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient></defs>'
    +'<text x="16" y="50" font-size="28" font-weight="700" fill="'+C.heat+'">OUTSIDE — K⁺ ↑ (7.4)</text>'
    +'<text x="16" y="726" font-size="28" font-weight="700" fill="'+C.ink+'">INSIDE — depolarized</text>'
    +'<rect x="0" y="360" width="820" height="66" fill="url(#cmm3)"/><rect x="0" y="360" width="820" height="10" fill="#ffffff47"/>'
    // crowded K outside
    +ions([[70,120,24],[150,90,24],[230,130,24],[320,90,24],[110,200,24],[260,210,24],[400,140,24],[190,150,24],[340,180,24],[60,250,22],[430,230,22]],"url(#cmk3)",C.caD)
    +'<text x="500" y="150" font-size="26" font-weight="700" fill="'+C.caD+'">less K⁺ gradient</text>'
    // voltage arrow moving from -70 toward 0
    +'<rect x="560" y="300" width="200" height="360" rx="10" fill="#f3efe6" stroke="#e2dccb"/>'
    +'<text x="600" y="340" font-size="24" font-weight="700" fill="'+C.ink+'">Vm</text>'
    +'<line x1="600" y1="360" x2="600" y2="640" stroke="#c9c2b2" stroke-width="4"/>'
    +'<text x="620" y="368" font-size="20" fill="'+C.ink+'">0 mV</text><text x="612" y="636" font-size="20" fill="'+C.ink+'">−90</text>'
    +'<circle cx="600" cy="520" r="14" fill="'+C.anion+'"/><text x="620" y="527" font-size="19" fill="'+C.ink+'">−70 rest</text>'
    +'<circle cx="600" cy="430" r="16" fill="'+C.heat+'"/><path d="M600 505 L600 448" stroke="'+C.heat+'" stroke-width="6" marker-end="url(#cmah3)"/>'
    +'<defs><marker id="cmah3" markerWidth="12" markerHeight="12" refX="6" refY="6" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L12 6 L0 12 z" fill="'+C.heat+'"/></marker></defs>'
    +'<text x="622" y="436" font-size="19" font-weight="700" fill="'+C.heat+'">depolarized</text>'
    // ECG peaked T
    +'<text x="80" y="470" font-size="24" font-weight="700" fill="'+C.heat+'">peaked T waves</text>'
    +'<path d="M60 620 h60 l14 -18 l10 40 l10 -22 h40 l18 -70 l18 70 h60" fill="none" stroke="'+C.heat+'" stroke-width="5" stroke-linejoin="round"/></svg>';

  /* ===================== VIDEO 2 — Cross-bridge cycle ===================== */
  function actin(y){ // pink thin filament with beads
    return '<rect x="0" y="'+y+'" width="1500" height="26" rx="13" fill="'+C.ach+'" opacity=".0"/>'; }
  D.ms1 = '<svg viewBox="0 0 820 760" role="img" aria-label="Myosin heads reach from the thick filament to the actin thin filament">'
    +'<defs><linearGradient id="myo1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.ryrL+'"/><stop offset="1" stop-color="'+C.ryrD+'"/></linearGradient>'
    +'<radialGradient id="act1" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#efa7bd"/><stop offset="1" stop-color="'+C.achD+'"/></radialGradient></defs>'
    // actin thin filament (top) with beads
    +'<rect x="0" y="150" width="820" height="30" rx="15" fill="#c24b6e"/>'
    +'<g fill="url(#act1)" stroke="'+C.achD+'" stroke-width="2">'
    +[60,150,240,330,420,510,600,690,780].map(function(x){return '<circle cx="'+x+'" cy="165" r="26"/>';}).join('')+'</g>'
    +'<text x="16" y="120" font-size="28" font-weight="700" fill="#a83a58">ACTIN (thin filament)</text>'
    // myosin thick filament (bottom) with heads reaching up
    +'<rect x="0" y="600" width="820" height="40" rx="20" fill="'+C.ryrD+'"/>'
    +'<text x="16" y="710" font-size="28" font-weight="700" fill="'+C.ryrD+'">MYOSIN (thick filament)</text>'
    +[170,410,650].map(function(x){return '<g><rect x="'+(x-8)+'" y="360" width="16" height="242" rx="8" fill="url(#myo1)"/><ellipse cx="'+(x+24)+'" cy="345" rx="52" ry="30" fill="url(#myo1)" transform="rotate(-32 '+(x+24)+' 345)"/></g>';}).join('')
    +'<text x="470" y="300" font-size="26" font-weight="700" fill="'+C.ryrD+'">heads reach &amp; pull →</text>'
    +'<path d="M250 300 q60 -30 120 -8" fill="none" stroke="'+C.ryrD+'" stroke-width="5" opacity=".5" marker-end="url(#msah)"/>'
    +'<defs><marker id="msah" markerWidth="12" markerHeight="12" refX="6" refY="6" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L12 6 L0 12 z" fill="'+C.ryrD+'"/></marker></defs></svg>';

  D.ms2 = '<svg viewBox="0 0 1500 470" role="img" aria-label="Cross-bridge cycle: calcium, power stroke, ATP reset">'
    +'<defs><linearGradient id="myo2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.ryrL+'"/><stop offset="1" stop-color="'+C.ryrD+'"/></linearGradient>'
    +'<radialGradient id="act2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#efa7bd"/><stop offset="1" stop-color="'+C.achD+'"/></radialGradient>'
    +'<radialGradient id="ca2b" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient></defs>';
  (function(){
    var panels = [
      {x:0,   t:"① Ca²⁺ unblocks actin", tc:C.caD},
      {x:500, t:"② power stroke (Pi out)", tc:C.ryrD},
      {x:1000,t:"③ ATP detaches head", tc:"#a2470f"}
    ];
    var s="";
    panels.forEach(function(p){
      s+='<g transform="translate('+p.x+',0)">'
        +'<text x="20" y="38" font-size="26" font-weight="800" fill="'+p.tc+'">'+p.t+'</text>'
        +'<rect x="0" y="150" width="440" height="24" rx="12" fill="#c24b6e"/>'
        +'<g fill="url(#act2)" stroke="'+C.achD+'" stroke-width="2"><circle cx="70" cy="162" r="22"/><circle cx="170" cy="162" r="22"/><circle cx="270" cy="162" r="22"/><circle cx="370" cy="162" r="22"/></g>'
        +'<rect x="0" y="360" width="440" height="30" rx="15" fill="'+C.ryrD+'"/>';
      s+='</g>';
    });
    // panel 1: Ca binds, head not yet bound
    s+='<g transform="translate(0,0)"><rect x="196" y="250" width="16" height="110" rx="8" fill="url(#myo2)"/><ellipse cx="230" cy="238" rx="46" ry="26" fill="url(#myo2)" transform="rotate(-30 230 238)"/>'
      +'<circle cx="150" cy="120" r="18" fill="url(#ca2b)" stroke="'+C.caD+'" stroke-width="2"/><circle cx="300" cy="110" r="16" fill="url(#ca2b)" stroke="'+C.caD+'" stroke-width="2"/></g>';
    // panel 2: power stroke — head bound, tilted, actin pulled left (arrow)
    s+='<g transform="translate(500,0)"><rect x="206" y="250" width="16" height="110" rx="8" fill="url(#myo2)"/><ellipse cx="188" cy="196" rx="50" ry="28" fill="url(#myo2)" transform="rotate(30 188 196)"/>'
      +'<circle cx="176" cy="299" r="14" fill="'+C.atp+'"/><text x="150" y="150" font-size="20" font-weight="700" fill="'+C.ryrD+'">Pi →</text>'
      +'<path d="M240 120 h-90" stroke="'+C.achD+'" stroke-width="6" marker-end="url(#msah2)"/><text x="250" y="126" font-size="20" fill="'+C.achD+'">actin slides</text></g>';
    // panel 3: ATP binds, head detached (up)
    s+='<g transform="translate(1000,0)"><rect x="206" y="250" width="16" height="110" rx="8" fill="url(#myo2)"/><ellipse cx="238" cy="236" rx="46" ry="26" fill="url(#myo2)" transform="rotate(-34 238 236)"/>'
      +'<circle cx="250" cy="150" r="20" fill="'+C.atp+'"/><text x="234" y="158" font-size="20" font-weight="800" fill="#6b4d10">ATP</text>'
      +'<text x="110" y="120" font-size="20" fill="#a2470f">head lets go</text></g>';
    s+='<defs><marker id="msah2" markerWidth="12" markerHeight="12" refX="6" refY="6" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L12 6 L0 12 z" fill="'+C.achD+'"/></marker></defs>';
    D.ms2 += s;
  })();
  D.ms2 += '</svg>';

  D.ms3 = '<svg viewBox="0 0 820 760" role="img" aria-label="Rigor mortis: myosin locked to actin without ATP">'
    +'<defs><linearGradient id="myo3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.ryrL+'"/><stop offset="1" stop-color="'+C.ryrD+'"/></linearGradient>'
    +'<radialGradient id="act3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#efa7bd"/><stop offset="1" stop-color="'+C.achD+'"/></radialGradient></defs>'
    +'<rect x="0" y="170" width="820" height="30" rx="15" fill="#c24b6e"/>'
    +'<g fill="url(#act3)" stroke="'+C.achD+'" stroke-width="2">'
    +[60,180,300,420,540,660,780].map(function(x){return '<circle cx="'+x+'" cy="185" r="26"/>';}).join('')+'</g>'
    +'<text x="16" y="140" font-size="28" font-weight="700" fill="#a83a58">ACTIN</text>'
    +'<rect x="0" y="600" width="820" height="40" rx="20" fill="'+C.ryrD+'"/><text x="16" y="710" font-size="28" font-weight="700" fill="'+C.ryrD+'">MYOSIN</text>'
    // heads all locked onto actin (bound, upright to beads)
    +[160,340,520,700].map(function(x){return '<g><rect x="'+(x-8)+'" y="235" width="16" height="365" rx="8" fill="url(#myo3)"/><ellipse cx="'+x+'" cy="210" rx="48" ry="26" fill="url(#myo3)"/></g>';}).join('')
    +'<text x="250" y="410" font-size="30" font-weight="800" fill="'+C.ryrD+'">LOCKED — no ATP</text>'
    // crossed-out ATP
    +'<circle cx="150" cy="420" r="34" fill="'+C.atp+'" opacity=".5"/><text x="118" y="428" font-size="22" font-weight="800" fill="#6b4d10">ATP</text>'
    +'<line x1="120" y1="392" x2="182" y2="450" stroke="'+C.heat+'" stroke-width="7"/></svg>';

  /* ===================== VIDEO 4 — Lambert-Eaton (LEMS) =================== */
  // helper: presynaptic terminal + cleft + muscle receptor band
  function nmjBase(){
    return '<rect x="0" y="470" width="900" height="120" fill="#0000000a"/>'  // cleft/muscle strip bg
      // presynaptic bouton (top dome)
      +'<path d="M120 60 Q450 -40 780 60 Q820 260 700 380 Q450 470 200 380 Q80 260 120 60 Z" fill="#e9e0d6" opacity=".55" stroke="#cbb8a6" stroke-width="3"/>'
      // muscle membrane (bottom, teal receptors)
      +'<rect x="0" y="560" width="900" height="30" fill="'+C.mem+'"/>';
  }
  D.le1 = '<svg viewBox="0 0 900 620" role="img" aria-label="Healthy neuromuscular junction: calcium drives acetylcholine release">'
    +'<defs><radialGradient id="lca1" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<radialGradient id="lach1" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#f0a08f"/><stop offset="1" stop-color="'+C.achD+'"/></radialGradient></defs>'
    +nmjBase()
    +'<text x="16" y="40" font-size="26" font-weight="700" fill="'+C.ink+'">NERVE TERMINAL</text>'
    // Ca channels (purple) on presynaptic membrane with green Ca entering
    +'<rect x="300" y="360" width="70" height="44" rx="10" fill="'+C.ryr+'"/><rect x="470" y="360" width="70" height="44" rx="10" fill="'+C.ryr+'"/>'
    +'<text x="250" y="345" font-size="22" font-weight="700" fill="'+C.ryrD+'">P/Q Ca²⁺ channels</text>'
    +ions([[335,330,16],[505,330,16],[420,300,16]],"url(#lca1)",C.caD)
    // vesicles releasing red ACh into cleft
    +'<circle cx="420" cy="420" r="34" fill="#ffffffcc" stroke="#d8ccbe" stroke-width="2"/>'
    +ions([[420,490,13],[390,520,11],[450,520,11],[420,548,10]],"url(#lach1)",C.achD)
    // teal receptors on muscle
    +[120,220,320,420,520,620,720].map(function(x){return '<rect x="'+(x-16)+'" y="560" width="32" height="52" rx="8" fill="'+C.achr+'"/>';}).join('')
    +'<text x="600" y="600" font-size="22" font-weight="700" fill="'+C.achrD+'">ACh receptors</text>'
    +'<text x="470" y="470" font-size="20" fill="'+C.achD+'">ACh</text></svg>';

  D.le2 = '<svg viewBox="0 0 1500 470" role="img" aria-label="Antibodies block calcium channels, so little acetylcholine is released">'
    +'<defs><radialGradient id="lca2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<radialGradient id="lach2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#f0a08f"/><stop offset="1" stop-color="'+C.achD+'"/></radialGradient></defs>'
    +'<text x="20" y="40" font-size="30" font-weight="800" fill="'+C.heat+'">LEMS</text>'
    +'<text x="150" y="40" font-size="24" font-weight="600" fill="'+C.ink+'">antibodies block the presynaptic Ca²⁺ channels</text>'
    // presynaptic membrane band
    +'<rect x="0" y="250" width="1500" height="46" fill="'+C.mem+'"/>'
    // Ca channels with antibodies (yellow Y) blocking
    +[300,600,900,1200].map(function(x){return '<rect x="'+(x-38)+'" y="210" width="76" height="46" rx="10" fill="'+C.ryr+'"/>'
        +'<g stroke="'+C.atp+'" stroke-width="8" fill="none" stroke-linecap="round"><path d="M'+x+' 205 V168"/><path d="M'+x+' 168 L'+(x-22)+' 142"/><path d="M'+x+' 168 L'+(x+22)+' 142"/></g>';}).join('')
        // only a little Ca gets in
    +ions([[300,300,15,".9"],[900,300,14,".8"]],"url(#lca2)",C.caD)
    +'<text x="60" y="360" font-size="24" font-weight="700" fill="'+C.caD+'">↓ Ca²⁺ enters</text>'
    // trickle of ACh below
    +'<rect x="640" y="296" width="60" height="60" rx="16" fill="#ffffffcc" stroke="#d8ccbe" stroke-width="2"/>'
    +ions([[670,380,12,".9"],[700,410,10,".7"]],"url(#lach2)",C.achD)
    +'<text x="740" y="400" font-size="24" font-weight="700" fill="'+C.achD+'">only a trickle of ACh → weak signal</text></svg>';

  D.le3 = '<svg viewBox="0 0 900 620" role="img" aria-label="Firdapse blocks potassium channels, prolonging depolarization and calcium entry">'
    +'<defs><radialGradient id="lca3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<radialGradient id="lach3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#f0a08f"/><stop offset="1" stop-color="'+C.achD+'"/></radialGradient>'
    +'<radialGradient id="ldan3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#7ab8f0"/><stop offset="1" stop-color="'+C.dantD+'"/></radialGradient></defs>'
    +nmjBase()
    +'<text x="16" y="40" font-size="26" font-weight="700" fill="'+C.ink+'">NERVE TERMINAL</text>'
    // K channel (orange) blocked by blue Firdapse
    +'<rect x="150" y="360" width="70" height="44" rx="10" fill="'+C.kch+'"/>'
    +'<circle cx="185" cy="345" r="30" fill="url(#ldan3)" stroke="'+C.dantD+'" stroke-width="3"/><circle cx="174" cy="336" r="8" fill="#ffffff88"/>'
    +'<text x="230" y="330" font-size="22" font-weight="800" fill="'+C.dantD+'">Firdapse</text><text x="230" y="358" font-size="19" fill="'+C.ink+'">blocks K⁺ channel</text>'
    // Ca channels open longer -> more Ca in
    +'<rect x="470" y="360" width="70" height="44" rx="10" fill="'+C.ryr+'"/><rect x="600" y="360" width="70" height="44" rx="10" fill="'+C.ryr+'"/>'
    +ions([[505,330,16],[635,330,16],[505,290,15],[635,290,15],[570,270,14]],"url(#lca3)",C.caD)
    +'<text x="470" y="255" font-size="22" font-weight="700" fill="'+C.caD+'">more Ca²⁺ in</text>'
    // more ACh released
    +'<circle cx="560" cy="430" r="34" fill="#ffffffcc" stroke="#d8ccbe" stroke-width="2"/>'
    +ions([[560,495,13],[525,520,12],[595,520,12],[560,548,11],[530,548,10],[592,548,10]],"url(#lach3)",C.achD)
    +[120,220,320,420,520,620,720].map(function(x){return '<rect x="'+(x-16)+'" y="560" width="32" height="52" rx="8" fill="'+C.achr+'"/>';}).join('')
    +'<text x="590" y="470" font-size="20" fill="'+C.achD+'">more ACh</text></svg>';

  /* ===================== VIDEO 5 — Cardiac EC coupling =================== */
  D.ce1 = '<svg viewBox="0 0 820 760" role="img" aria-label="Calcium-induced calcium release: a small trigger opens a large SR release">'
    +'<defs><linearGradient id="cem1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="cec1" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<linearGradient id="cav1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d95fae"/><stop offset="1" stop-color="'+C.cavD+'"/></linearGradient>'
    +'<linearGradient id="cery1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.ryrL+'"/><stop offset="1" stop-color="'+C.ryrD+'"/></linearGradient></defs>'
    +'<text x="16" y="46" font-size="26" font-weight="700" fill="'+C.ink+'">OUTSIDE</text>'
    // sarcolemma (top) with Cav1.2
    +'<rect x="0" y="150" width="820" height="52" fill="url(#cem1)"/>'
    +'<rect x="360" y="150" width="80" height="52" fill="url(#cav1)"/><text x="450" y="185" font-size="24" font-weight="700" fill="'+C.cavD+'">Ca_v1.2</text>'
    // small Ca trigger enters
    +ions([[400,250,16],[400,320,15]],"url(#cec1)",C.caD)+'<text x="120" y="250" font-size="22" font-weight="700" fill="'+C.caD+'">small trigger</text>'
    // SR (bottom) with RyR2
    +'<rect x="0" y="470" width="820" height="52" fill="url(#cem1)"/><text x="16" y="726" font-size="26" font-weight="700" fill="'+C.ink+'">SR (calcium store)</text>'
    +'<rect x="350" y="418" width="110" height="52" fill="url(#cery1)"/><text x="470" y="452" font-size="24" font-weight="700" fill="'+C.ryrD+'">RyR2</text>'
    // big burst of Ca out of SR
    +ions([[405,380,20],[360,350,20],[450,350,20],[320,320,18],[490,320,18],[405,300,20],[280,300,16],[530,300,16],[405,250,16]],"url(#cec1)",C.caD)
    +'<text x="120" y="360" font-size="24" font-weight="800" fill="'+C.caD+'">BIG release (CICR)</text>'
    +'<path d="M405 418 L405 360" stroke="'+C.caD+'" stroke-width="6" opacity=".3" stroke-dasharray="3 14" stroke-linecap="round"/></svg>';

  D.ce2 = '<svg viewBox="0 0 1500 470" role="img" aria-label="SERCA and the sodium-calcium exchanger clear cytosolic calcium">'
    +'<defs><linearGradient id="cem2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="cec2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<radialGradient id="cen2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#c3b8f2"/><stop offset="1" stop-color="'+C.naD+'"/></radialGradient>'
    +'<linearGradient id="ces2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c3b6ac"/><stop offset="1" stop-color="'+C.sercaD+'"/></linearGradient>'
    +'<linearGradient id="cex2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eccb5e"/><stop offset="1" stop-color="'+C.ncxD+'"/></linearGradient></defs>'
    // SERCA side (into SR)
    +'<text x="20" y="40" font-size="26" font-weight="800" fill="'+C.sercaD+'">SERCA → back into SR (~80%)</text>'
    +'<rect x="0" y="250" width="680" height="52" fill="url(#cem2)"/><text x="20" y="330" font-size="22" fill="'+C.ink+'">SR membrane</text>'
    +'<rect x="300" y="238" width="74" height="120" rx="30" fill="url(#ces2)"/>'
    +ions([[337,150,18],[300,110,16],[380,120,16]],"url(#cec2)",C.caD)
    +'<path d="M337 175 q40 40 0 84" fill="none" stroke="'+C.caD+'" stroke-width="6" opacity=".55"/>'
    +'<line x1="740" y1="20" x2="740" y2="450" stroke="#ded7c8" stroke-width="4" stroke-dasharray="10 12"/>'
    // NCX side (out of cell)
    +'<g transform="translate(760,0)"><text x="20" y="40" font-size="26" font-weight="800" fill="'+C.ncxD+'">NCX → out of the cell (3 Na : 1 Ca)</text>'
    +'<rect x="0" y="250" width="680" height="52" fill="url(#cem2)"/><text x="20" y="330" font-size="22" fill="'+C.ink+'">sarcolemma</text>'
    +'<rect x="300" y="238" width="80" height="120" rx="20" fill="url(#cex2)"/>'
    // 1 Ca out (up)
    +'<circle cx="330" cy="150" r="18" fill="url(#cec2)" stroke="'+C.caD+'" stroke-width="2"/><text x="250" y="120" font-size="20" font-weight="700" fill="'+C.caD+'">1 Ca²⁺ out</text>'
    // 3 Na in (down)
    +ions([[360,140,16],[400,110,16],[430,140,16]],"url(#cen2)",C.naD)
    +'<text x="406" y="96" font-size="20" font-weight="700" fill="'+C.naD+'">3 Na⁺ in</text></g></svg>';

  D.ce3 = '<svg viewBox="0 0 820 760" role="img" aria-label="Verapamil and diltiazem block the L-type calcium channel">'
    +'<defs><linearGradient id="cem3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="cec3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<linearGradient id="cav3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d95fae"/><stop offset="1" stop-color="'+C.cavD+'"/></linearGradient>'
    +'<radialGradient id="cdd3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#7ab8f0"/><stop offset="1" stop-color="'+C.dantD+'"/></radialGradient></defs>'
    +'<text x="16" y="46" font-size="26" font-weight="700" fill="'+C.ink+'">OUTSIDE</text>'
    +'<rect x="0" y="360" width="820" height="52" fill="url(#cem3)"/><text x="16" y="470" font-size="26" font-weight="700" fill="'+C.ink+'">INSIDE (cardiomyocyte)</text>'
    // Cav1.2 blocked by CCB
    +'<rect x="330" y="360" width="90" height="52" fill="url(#cav3)"/><text x="440" y="396" font-size="24" font-weight="700" fill="'+C.cavD+'">Ca_v1.2</text>'
    +'<circle cx="375" cy="335" r="40" fill="url(#cdd3)" stroke="'+C.dantD+'" stroke-width="3"/><circle cx="360" cy="322" r="10" fill="#ffffff88"/>'
    +'<text x="60" y="150" font-size="24" font-weight="800" fill="'+C.dantD+'">verapamil /</text><text x="60" y="182" font-size="24" font-weight="800" fill="'+C.dantD+'">diltiazem</text>'
    +'<text x="60" y="230" font-size="20" fill="'+C.ink+'">block the L-type channel</text>'
    // little Ca gets in
    +ions([[375,470,15,".8"]],"url(#cec3)",C.caD)
    +'<text x="440" y="470" font-size="22" font-weight="700" fill="'+C.caD+'">↓ Ca²⁺ → slower AV node</text>'
    // warning box
    +'<rect x="120" y="560" width="580" height="150" rx="14" fill="#fbe9e7" stroke="#eec9c2"/>'
    +'<text x="150" y="606" font-size="24" font-weight="800" fill="'+C.heat+'">⚠ dangerous when:</text>'
    +'<text x="150" y="648" font-size="22" fill="#8a3310">• decompensated HFrEF (negative inotrope)</text>'
    +'<text x="150" y="686" font-size="22" fill="#8a3310">• pre-excited AF / WPW (favors accessory path)</text></svg>';


  /* ============== VIDEO 6 — Smooth Muscle Contraction & Vascular Tone ====== */
  C.mlcp = "#2FA58C"; C.mlcpD = "#1d6d5c";      // phosphatase (teal)
  C.mlck = "#E8A33C"; C.mlckD = "#a86f16";      // kinase (amber)
  C.myo  = "#9E63C6"; C.myoD  = "#6b3a8c";      // myosin (violet)
  C.act  = "#C1563F"; C.actD  = "#8a3626";      // actin (brick)
  C.cam  = "#E3D2A6"; C.camD  = "#a89463";      // calmodulin (sand)
  C.drug = "#F07020"; C.drugD = "#b04a0c";      // amlodipine (orange)

  function smArrow(id, col){
    return '<marker id="'+id+'" markerWidth="12" markerHeight="12" refX="6" refY="6" '
      +'markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L12 6 L0 12 z" fill="'+col+'"/></marker>';
  }

  /* card 1 — no troponin: calcium works through calmodulin onto the MYOSIN */
  D.sm1 = '<svg viewBox="0 0 820 760" role="img" aria-label="Calcium binds calmodulin, calmodulin activates MLCK, and MLCK phosphorylates the myosin head so it can bind actin">'
    +'<defs><radialGradient id="sc1" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<linearGradient id="sm1m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.myo+'"/><stop offset="1" stop-color="'+C.myoD+'"/></linearGradient>'
    +'<linearGradient id="sm1k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.mlck+'"/><stop offset="1" stop-color="'+C.mlckD+'"/></linearGradient>'
    +'<linearGradient id="sm1a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.act+'"/><stop offset="1" stop-color="'+C.actD+'"/></linearGradient>'
    +smArrow("sa1ca", C.caD)+smArrow("sa1cam", C.camD)+smArrow("sa1k", C.mlckD)+'</defs>'
    +'<text x="16" y="44" font-size="30" font-weight="700" fill="'+C.ink+'">NO TROPONIN</text>'
    +'<text x="16" y="78" font-size="23" fill="'+C.label+'">the switch sits on the myosin, not on the actin</text>'
    /* calcium pool */
    +ions([[52,168,22],[104,138,22],[96,206,22],[148,176,22],[46,232,22]],"url(#sc1)",C.caD)
    +'<path d="M182 180 L228 172" stroke="'+C.caD+'" stroke-width="8" marker-end="url(#sa1ca)"/>'
    /* calmodulin, four lobes */
    +'<g transform="translate(288,146)"><circle cx="0" cy="0" r="30" fill="'+C.cam+'" stroke="'+C.camD+'" stroke-width="3"/>'
    +'<circle cx="42" cy="14" r="30" fill="'+C.cam+'" stroke="'+C.camD+'" stroke-width="3"/>'
    +'<circle cx="6" cy="44" r="26" fill="'+C.cam+'" stroke="'+C.camD+'" stroke-width="3"/>'
    +'<circle cx="48" cy="56" r="26" fill="'+C.cam+'" stroke="'+C.camD+'" stroke-width="3"/></g>'
    +'<text x="270" y="252" font-size="22" font-weight="700" fill="'+C.camD+'">calmodulin</text>'
    +'<path d="M356 178 L426 172" stroke="'+C.camD+'" stroke-width="8" marker-end="url(#sa1cam)"/>'
    /* MLCK */
    +'<rect x="440" y="124" width="176" height="100" rx="28" fill="url(#sm1k)"/>'
    +'<text x="528" y="172" font-size="36" font-weight="700" fill="#fff" text-anchor="middle">MLCK</text>'
    +'<text x="528" y="202" font-size="20" fill="#fff4e2" text-anchor="middle">puts P on the myosin</text>'
    +'<path d="M528 232 Q528 300 500 336" stroke="'+C.mlckD+'" stroke-width="7" fill="none" stroke-dasharray="13 10" marker-end="url(#sa1k)"/>'
    /* actin */
    +'<rect x="40" y="404" width="740" height="28" rx="14" fill="url(#sm1a)"/>'
    +'<text x="42" y="392" font-size="22" font-weight="700" fill="'+C.actD+'">ACTIN</text>'
    /* thick filament backbone */
    +'<rect x="40" y="592" width="740" height="52" rx="26" fill="url(#sm1m)"/>'
    +'<text x="60" y="626" font-size="21" font-weight="700" fill="#fff">MYOSIN · thick filament</text>'
    /* two phosphorylated heads reaching UP and touching the actin */
    +'<g stroke="'+C.myo+'" stroke-width="19" stroke-linecap="round" fill="none">'
    +'<path d="M210 592 L258 500"/><path d="M470 592 L518 500"/></g>'
    +'<circle cx="264" cy="466" r="34" fill="'+C.myo+'" stroke="'+C.myoD+'" stroke-width="3"/>'
    +'<circle cx="524" cy="466" r="34" fill="'+C.myo+'" stroke="'+C.myoD+'" stroke-width="3"/>'
    +'<g font-size="21" font-weight="700" text-anchor="middle">'
    +'<circle cx="302" cy="436" r="18" fill="'+C.atp+'" stroke="'+C.mlckD+'" stroke-width="3"/><text x="302" y="443" fill="#5a3c00">P</text>'
    +'<circle cx="562" cy="436" r="18" fill="'+C.atp+'" stroke="'+C.mlckD+'" stroke-width="3"/><text x="562" y="443" fill="#5a3c00">P</text></g>'
    /* one bare head, hanging down, nowhere near the actin */
    +'<path d="M700 644 L722 700" stroke="'+C.myo+'" stroke-width="19" stroke-linecap="round" fill="none" opacity=".5"/>'
    +'<circle cx="728" cy="712" r="28" fill="'+C.myo+'" stroke="'+C.myoD+'" stroke-width="3" opacity=".5"/>'
    +'<text x="686" y="692" font-size="20" font-weight="700" fill="'+C.label+'" text-anchor="end">no P →</text>'
    +'<text x="686" y="716" font-size="20" font-weight="700" fill="'+C.label+'" text-anchor="end">cannot bind</text>'
    +'<text x="40" y="708" font-size="23" font-weight="700" fill="'+C.myoD+'">only a phosphorylated</text>'
    +'<text x="40" y="736" font-size="23" font-weight="700" fill="'+C.myoD+'">head binds and pulls</text>'
    +'</svg>';

  /* card 2 — the balance: MLCK adds it, MLCP takes it off */
  D.sm2 = '<svg viewBox="0 0 820 760" role="img" aria-label="MLCK puts a phosphate on the myosin light chain and MLCP takes it off; tone is the balance between them">'
    +'<defs><linearGradient id="sm2k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.mlck+'"/><stop offset="1" stop-color="'+C.mlckD+'"/></linearGradient>'
    +'<linearGradient id="sm2p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.mlcp+'"/><stop offset="1" stop-color="'+C.mlcpD+'"/></linearGradient>'
    +'<linearGradient id="sm2m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+C.myo+'"/><stop offset="1" stop-color="'+C.myoD+'"/></linearGradient>'
    +smArrow("sa2k", C.mlckD)+smArrow("sa2p", C.mlcpD)+'</defs>'
    +'<text x="16" y="44" font-size="30" font-weight="700" fill="'+C.ink+'">TONE = THE BALANCE</text>'
    +'<text x="16" y="78" font-size="23" fill="'+C.label+'">the phosphatase never stops — it is always pulling the other way</text>'
    /* the two enzymes */
    +'<rect x="30" y="118" width="212" height="104" rx="28" fill="url(#sm2k)"/>'
    +'<text x="136" y="166" font-size="34" font-weight="700" fill="#fff" text-anchor="middle">MLCK</text>'
    +'<text x="136" y="198" font-size="21" fill="#fff4e2" text-anchor="middle">puts P on</text>'
    +'<rect x="578" y="118" width="212" height="104" rx="28" fill="url(#sm2p)"/>'
    +'<text x="684" y="166" font-size="34" font-weight="700" fill="#fff" text-anchor="middle">MLCP</text>'
    +'<text x="684" y="198" font-size="21" fill="#e6f7f3" text-anchor="middle">takes P off</text>'
    /* opposing arrows onto the head */
    +'<path d="M180 236 Q300 300 348 344" stroke="'+C.mlckD+'" stroke-width="10" fill="none" marker-end="url(#sa2k)"/>'
    +'<path d="M640 236 Q520 300 472 344" stroke="'+C.mlcpD+'" stroke-width="10" fill="none" marker-end="url(#sa2p)"/>'
    /* myosin light chain carrying the contested phosphate */
    +'<circle cx="410" cy="410" r="66" fill="url(#sm2m)"/>'
    +'<text x="410" y="404" font-size="22" font-weight="700" fill="#fff" text-anchor="middle">myosin</text>'
    +'<text x="410" y="430" font-size="20" fill="#f0e4fa" text-anchor="middle">light chain</text>'
    +'<circle cx="470" cy="360" r="26" fill="'+C.atp+'" stroke="'+C.mlckD+'" stroke-width="4"/>'
    +'<text x="470" y="369" font-size="27" font-weight="700" fill="#5a3c00" text-anchor="middle">P</text>'
    /* the balance itself */
    +'<g transform="translate(410,600) rotate(-4)">'
    +'<rect x="-290" y="-8" width="580" height="16" rx="8" fill="'+C.ink+'" opacity=".5"/>'
    +'<circle cx="-224" cy="-42" r="34" fill="'+C.mlck+'" stroke="'+C.mlckD+'" stroke-width="4"/>'
    +'<circle cx="224" cy="-42" r="34" fill="'+C.mlcp+'" stroke="'+C.mlcpD+'" stroke-width="4"/></g>'
    +'<path d="M410 604 L368 686 L452 686 Z" fill="'+C.ink+'" opacity=".5"/>'
    +'<text x="30" y="716" font-size="22" font-weight="700" fill="'+C.mlckD+'">more P → contract</text>'
    +'<text x="790" y="716" font-size="22" font-weight="700" fill="'+C.mlcpD+'" text-anchor="end">less P → relax</text>'
    +'</svg>';

  /* card 3 — amlodipine plugs the L-type channel; the chain runs backwards */
  D.sm3 = '<svg viewBox="0 0 820 760" role="img" aria-label="Amlodipine plugs the mouth of the L-type channel, cytosolic calcium falls, and the vessel dilates">'
    +'<defs><radialGradient id="sc3" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="'+C.caL+'"/><stop offset="1" stop-color="'+C.caD+'"/></radialGradient>'
    +'<linearGradient id="sm3c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+C.cav+'"/><stop offset="1" stop-color="'+C.cavD+'"/></linearGradient>'
    +'<linearGradient id="sm3m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+C.memL+'"/><stop offset="1" stop-color="'+C.memD+'"/></linearGradient>'
    +'<radialGradient id="sm3d" cx="34%" cy="28%" r="76%"><stop offset="0" stop-color="#FFA766"/><stop offset="1" stop-color="'+C.drugD+'"/></radialGradient>'
    +smArrow("sa3ca", C.caD)+smArrow("sa3s", "#8a8073")+'</defs>'
    +'<text x="16" y="44" font-size="29" font-weight="700" fill="'+C.ink+'">AMLODIPINE · a dihydropyridine</text>'
    /* membrane, well clear of the title */
    +'<rect x="556" y="96" width="80" height="664" fill="url(#sm3m)"/>'
    +'<rect x="556" y="96" width="9" height="664" fill="#ffffff44"/>'
    +'<text x="800" y="80" font-size="21" font-weight="700" fill="'+C.label+'" text-anchor="end">OUTSIDE</text>'
    +'<text x="16" y="80" font-size="21" font-weight="700" fill="'+C.label+'">CYTOSOL</text>'
    /* the channel: two lobes above and below a horizontal pore, sunk into the
       membrane, with the drug plugging the OUTER mouth - half in, half out */
    +'<path d="M512 236 L680 236 L680 348 L590 348 L568 322 L512 322 Z" fill="url(#sm3c)"/>'
    +'<path d="M512 484 L680 484 L680 372 L590 372 L568 398 L512 398 Z" fill="url(#sm3c)"/>'
    +'<rect x="512" y="236" width="168" height="12" rx="6" fill="#ffffff3a"/>'
    +'<circle cx="676" cy="360" r="42" fill="url(#sm3d)" stroke="'+C.drugD+'" stroke-width="4"/>'
    +'<text x="676" y="369" font-size="22" font-weight="700" fill="#fff" text-anchor="middle">DHP</text>'
    +'<text x="596" y="540" font-size="20" font-weight="700" fill="'+C.cavD+'" text-anchor="middle">L-type channel</text>'
    /* calcium stuck outside, turned away */
    +ions([[730,232,21],[774,296,21],[742,452,21],[782,516,21],[736,588,21]],"url(#sc3)",C.caD)
    +'<path d="M770 320 Q736 342 748 300" stroke="'+C.caD+'" stroke-width="7" fill="none" marker-end="url(#sa3ca)"/>'
    +'<path d="M768 404 Q736 382 750 424" stroke="'+C.caD+'" stroke-width="7" fill="none" marker-end="url(#sa3ca)"/>'
    /* the falling pool inside */
    +'<text x="16" y="132" font-size="25" font-weight="700" fill="'+C.caD+'">cytosolic Ca²⁺ falls</text>'
    +ions([[52,196,20,".95"],[118,178,20,".62"],[84,252,20,".38"],[164,236,20,".2"]],"url(#sc3)",C.caD)
    +'<text x="16" y="316" font-size="20" fill="'+C.label+'">SERCA · PMCA · NCX never stopped removing it —</text>'
    +'<text x="16" y="344" font-size="20" fill="'+C.label+'">block entry and removal wins</text>'
    /* the consequence chain */
    +'<g font-size="24" font-weight="700">'
    +'<text x="16" y="440" fill="'+C.mlckD+'">MLCK goes quiet</text>'
    +'<text x="16" y="530" fill="'+C.mlcpD+'">MLCP wins by default</text>'
    +'<text x="16" y="620" fill="'+C.myoD+'">the phosphates come off</text>'
    +'<text x="16" y="710" fill="'+C.drugD+'">the vessel opens</text></g>'
    +'<g stroke="#8a8073" stroke-width="5" opacity=".55" marker-end="url(#sa3s)">'
    +'<path d="M30 458 L30 496"/><path d="M30 548 L30 586"/><path d="M30 638 L30 676"/></g>'
    +'</svg>';

  window.CARD_DIAGRAMS = D;

  // ------------------------------------------------------------------ content
  var green=function(o){o.accent="green";return o;},
      orange=function(o){o.accent="orange";o.wide=true;return o;},
      pink=function(o){o.accent="pink";return o;};

  window.CARD_CONTENT = {
  "smooth-muscle-tone": [
    green({ deck:"Smooth Muscle & Vascular Tone", kicker:"The hook", foot:"Calmodulin · MLCK", diagram:"sm1",
      q:"Vascular smooth muscle has no troponin. So what does calcium switch on?",
      aTitle:"Calcium works through calmodulin", lead:"The switch sits on the myosin, not on the actin.",
      aHtml:"Striated muscle regulates the <b>thin</b> filament: calcium binds troponin and tropomyosin moves off the actin. Smooth muscle has no troponin, so it regulates the <b>thick</b> filament instead. Calcium binds <b>calmodulin</b>; Ca²⁺–calmodulin activates <b>myosin light chain kinase (MLCK)</b>, which phosphorylates the myosin regulatory light chain. <b>Only a phosphorylated head can bind actin and pull</b> — the unphosphorylated ones hang there, useless.",
      tag:"Ca²⁺ → calmodulin → MLCK → P on myosin" }),
    orange({ deck:"Smooth Muscle & Vascular Tone", kicker:"The mechanism", foot:"MLCP · latch · cAMP & cGMP", diagram:"sm2",
      q:"If MLCK phosphorylates the myosin, what actually sets how tight the vessel sits?",
      aTitle:"Tone is a tug of war over one phosphate",
      aHtml:"<b>Myosin light chain phosphatase (MLCP)</b> takes the phosphate straight back off, and it never stops — so tone is the <b>balance</b> between kinase and phosphatase, not the calcium level alone. A head dephosphorylated while still attached detaches very slowly: the <b>latch state</b>, which holds tone for hours on very little ATP. Both relaxation arms act on this balance — <b>cAMP inhibits MLCK</b>, while <b>NO → guanylyl cyclase → cGMP activates MLCP</b>. Same endpoint, opposite enzyme. And because the NO is made in the endothelium, <b>ACh and bradykinin need that cell intact</b>; nitroprusside brings its own.",
      legend:[["#5AA84E","Ca²⁺"],["#E8A33C","MLCK"],["#2FA58C","MLCP"],["#9E63C6","myosin"],["#C1563F","actin"]] }),
    pink({ deck:"Smooth Muscle & Vascular Tone", kicker:"The payoff", foot:"Amlodipine · ankle edema", diagram:"sm3",
      q:"How does amlodipine lower blood pressure — and why does it swell the ankles?",
      aTitle:"Close the door and removal wins", lead:"Sustained tone needs calcium from outside.",
      aHtml:"<b>Amlodipine</b>, a <b>dihydropyridine</b>, plugs the <b>L-type (DHP) channel</b>. SERCA, PMCA and NCX never stopped removing calcium, so blocking entry lets removal win: the cytosolic pool falls, MLCK goes quiet, <b>MLCP wins by default</b>, the phosphates come off and the vessel opens. DHPs are <b>vessel-selective</b> where verapamil and diltiazem are cardiac — vascular smooth muscle sits chronically depolarized and DHPs prefer the inactivated channel. The catch is the same mechanism one compartment too far: they dilate <b>arterioles but not venules</b>, so capillary hydrostatic pressure rises and fluid filters out — <b>ankle edema, not fluid overload</b>, which is why a diuretic does not fix it.",
      tag:"Block Ca²⁺ entry → MLCP wins → dilation (± ankle edema)" })
  ],

  "calcium-release": [
    green({ deck:"Malignant Hyperthermia", kicker:"The hook", foot:"Excitation–contraction coupling · RyR1", diagram:"mh1",
      q:"What happens when anesthesia unmasks a hidden genetic risk?",
      aTitle:"The trigger", lead:"The muscle's calcium gate is thrown wide open.",
      aHtml:"A <b>RyR1</b> (or DHPR) mutation lets certain <b>inhaled anesthetics</b> — or <b>succinylcholine</b> — force RyR1 open. Calcium's gate stays open and <b>green calcium floods</b> the cell. That runaway release is <b>malignant hyperthermia</b>.",
      tag:"Trigger → RyR1 opens → Ca²⁺ flood" }),
    orange({ deck:"Malignant Hyperthermia", kicker:"The mechanism", foot:"RyR1 · SERCA · hypermetabolism", diagram:"mh2",
      q:"Walk through the calcium — from trigger to an overheating muscle.",
      aTitle:"Why the muscle overheats",
      aHtml:"Normally RyR1 opens for a <b>moment</b> and closes. In MH it <b>stays open</b>, so calcium pours out non-stop. <b>SERCA</b> pumps frantically to claw it back — <b>burning ATP</b> every cycle. Endless release + endless pumping = relentless <b>heat, rigidity, and rising CO₂</b>. Hypermetabolism.",
      legend:[["#5AA84E","Ca²⁺"],["#8A54A8","RyR1"],["#AA9C92","SERCA"],["#CE7C4F","SR membrane"],["#F2B23C","ATP"]] }),
    pink({ deck:"Malignant Hyperthermia", kicker:"The payoff", foot:"The antidote · dantrolene", diagram:"mh3",
      q:"How does dantrolene stop the crisis?",
      aTitle:"Dantrolene calms the gate", lead:"Dantrolene quiets RyR1 — it doesn't plug it.",
      aHtml:"Dantrolene binds the <b>RyR1</b> receptor and <b>dampens</b> its calcium release rather than corking the pore. Release falls, <b>SERCA catches up</b>, cytosolic calcium drops, and the muscle relaxes.",
      tag:"Treats the crisis — it doesn't fix the gene." })
  ],

  "cell-membrane-potential": [
    green({ deck:"Resting Membrane Potential", kicker:"The hook", foot:"K⁺ leak · trapped anions", diagram:"cm1",
      q:"Why does the inside of every living cell sit at about −70 mV?",
      aTitle:"A negative interior", lead:"The cell rests negative — and it's mostly potassium's doing.",
      aHtml:"At rest the membrane is far more leaky to <b>K⁺</b> than to anything else. K⁺ drifts out down its gradient, leaving the inside negative — close to the <b>K⁺ equilibrium potential (≈ −90 mV)</b>. Large <b>trapped anions</b> (proteins, phosphates) can't follow, deepening the negativity.",
      tag:"More K⁺ leak → interior negative (≈ −70 mV)" }),
    orange({ deck:"Resting Membrane Potential", kicker:"The mechanism", foot:"Pump · leak · anions", diagram:"cm2",
      q:"What actually builds and holds the resting potential?",
      aTitle:"Three forces at rest",
      aHtml:"The <b>Na⁺/K⁺-ATPase</b> pumps <b>3 Na⁺ out</b> for <b>2 K⁺ in</b>, building the gradients (and adding ≈ −4 mV directly). <b>K⁺ leak channels</b> let K⁺ exit toward its equilibrium. <b>Trapped intracellular anions</b> hold negative charge inside. Together they park the cell near −70 mV.",
      legend:[["#7C5BC9","Na⁺/K⁺-ATPase"],["#5AA84E","K⁺"],["#A99CE6","Na⁺"],["#8C93A3","anion A⁻"],["#CE7C4F","membrane"]] }),
    pink({ deck:"Resting Membrane Potential", kicker:"The payoff", foot:"Hyperkalemia · the clinical twist", diagram:"cm3",
      q:"A dialysis patient's K⁺ hits 7.4. Why is the ECG changing?",
      aTitle:"When outside K⁺ climbs", lead:"Raise extracellular K⁺ and the cell depolarizes.",
      aHtml:"More K⁺ outside <b>shrinks the K⁺ gradient</b>, so E_K — and the resting Vm — become <b>less negative</b>. The membrane <b>depolarizes</b> → voltage-gated Na⁺ channels inactivate → conduction slows → <b>widened QRS</b>. Separately, high extracellular K⁺ <b>raises I_Kr conductance</b> → faster repolarization → <b>peaked T waves with a short QT</b>. IV calcium stabilizes the membrane.",
      tag:"↑ extracellular K⁺ → depolarized, unstable membrane" })
  ],

  "muscle-shortening": [
    green({ deck:"The Cross-Bridge Cycle", kicker:"The hook", foot:"Sliding filaments · myosin & actin", diagram:"ms1",
      q:"How does a muscle physically get shorter?",
      aTitle:"Filaments slide", lead:"Nothing shrinks — the filaments slide past each other.",
      aHtml:"<b>Myosin</b> heads reach from the thick filament, grab the <b>actin</b> thin filament, and pull it inward. Repeat the grab-and-pull thousands of times and the sarcomere shortens. This is the <b>sliding-filament</b> mechanism.",
      tag:"Myosin pulls actin → sarcomere shortens" }),
    orange({ deck:"The Cross-Bridge Cycle", kicker:"The mechanism", foot:"Ca²⁺ → power stroke → ATP resets", diagram:"ms2",
      q:"Walk the cross-bridge cycle — what does each step cost?",
      aTitle:"One cross-bridge cycle",
      aHtml:"<b>Ca²⁺</b> binds <b>troponin</b>, sliding tropomyosin off actin. Myosin binds. Release of <b>Pi</b> fires the <b>power stroke</b> — the pull. <b>ADP</b> leaves. A fresh <b>ATP</b> binds and <b>detaches</b> the head; hydrolysis re-cocks it for the next cycle.",
      legend:[["#C24B6E","actin"],["#8A54A8","myosin"],["#5AA84E","Ca²⁺"],["#F2B23C","ATP"]] }),
    pink({ deck:"The Cross-Bridge Cycle", kicker:"The payoff", foot:"Rigor mortis · the clinical twist", diagram:"ms3",
      q:"Why do muscles stiffen hours after death?",
      aTitle:"No ATP, no release", lead:"Detaching myosin needs a fresh ATP — and death runs out of it.",
      aHtml:"Myosin only lets go of actin when a <b>new ATP</b> binds. After death, <b>ATP is depleted</b>, so cross-bridges stay <b>locked</b> and the muscle stiffens — <b>rigor mortis</b>. It fades later as enzymes break down the filaments.",
      tag:"ATP gone → cross-bridges locked → rigor" })
  ],

  "lambert-eaton": [
    green({ deck:"Lambert-Eaton (LEMS)", kicker:"The hook", foot:"Neuromuscular junction · P/Q Ca²⁺", diagram:"le1",
      q:"Why do these weak muscles get stronger the more you use them?",
      aTitle:"The paradox of LEMS", lead:"Weakness that warms up points to the presynaptic terminal.",
      aHtml:"At the neuromuscular junction, a nerve impulse opens <b>presynaptic P/Q-type Ca²⁺ channels</b>; calcium drives vesicles to release <b>acetylcholine</b>. In LEMS this release is impaired — but <b>repeated firing lets calcium build up</b>, so strength briefly improves with use.",
      tag:"Presynaptic Ca²⁺ → ACh → contraction" }),
    orange({ deck:"Lambert-Eaton (LEMS)", kicker:"The mechanism", foot:"Antibodies · less Ca²⁺ · less ACh", diagram:"le2",
      q:"What are the antibodies attacking, and what breaks?",
      aTitle:"Antibodies choke the trigger",
      aHtml:"Autoantibodies attack the <b>presynaptic P/Q-type (Ca_v2.1) calcium channels</b>. With channels blocked, <b>far less calcium</b> enters the terminal, <b>fewer vesicles fuse</b>, and only a <b>trickle of acetylcholine</b> is released — the muscle signal is weak. It's often <b>paraneoplastic</b> (small-cell lung cancer).",
      legend:[["#8A54A8","Ca²⁺ channel"],["#F2C14E","antibody"],["#5AA84E","Ca²⁺"],["#E0503C","ACh"],["#3FC6B4","ACh receptor"]] }),
    pink({ deck:"Lambert-Eaton (LEMS)", kicker:"The payoff", foot:"Firdapse · 3,4-DAP", diagram:"le3",
      q:"How does Firdapse restore the signal?",
      aTitle:"Firdapse holds the door open", lead:"It can't remove the antibodies — so it squeezes more calcium in.",
      aHtml:"Firdapse (<b>amifampridine, 3,4-DAP</b>) blocks presynaptic <b>K⁺ channels</b>, prolonging the nerve's depolarization. That holds the remaining <b>Ca²⁺ channels open longer</b>, so more calcium enters — <b>more vesicles, more acetylcholine</b>, a stronger signal.",
      tag:"Block K⁺ → longer depolarization → more Ca²⁺" })
  ],

  "cardiac-ec-coupling": [
    green({ deck:"Cardiac EC Coupling", kicker:"The hook", foot:"CICR · Ca_v1.2 & RyR2", diagram:"ce1",
      q:"Remove extracellular calcium and the heart stops in seconds — but skeletal muscle keeps going. Why?",
      aTitle:"Calcium triggers calcium", lead:"The heart has no mechanical latch — calcium must enter first.",
      aHtml:"In skeletal muscle the DHPR is physically linked to RyR1, so no calcium needs to enter. The heart is different: calcium must enter through <b>L-type Ca_v1.2</b> channels, cross the dyad, and open <b>RyR2</b> to trigger a <b>much larger SR release</b> — <b>calcium-induced calcium release</b>. No entry, no trigger.",
      tag:"Ca²⁺ in via Ca_v1.2 → RyR2 → big SR release" }),
    orange({ deck:"Cardiac EC Coupling", kicker:"The mechanism", foot:"SERCA reuptake · NCX 3:1", diagram:"ce2",
      q:"How does the cardiomyocyte clear its calcium and relax?",
      aTitle:"Clearing the calcium",
      aHtml:"<b>SERCA</b> pumps most calcium back into the SR (≈ 70–90%). The <b>Na⁺/Ca²⁺ exchanger (NCX)</b> extrudes the rest at <b>3 Na⁺ in : 1 Ca²⁺ out</b> — one net inward charge per cycle, an electrogenic current. As cytosolic calcium falls, the myofilaments release and the cell relaxes.",
      legend:[["#5AA84E","Ca²⁺"],["#AA9C92","SERCA"],["#E0B23A","NCX"],["#A99CE6","Na⁺"],["#8A54A8","RyR2"]] }),
    pink({ deck:"Cardiac EC Coupling", kicker:"The payoff", foot:"Verapamil · diltiazem", diagram:"ce3",
      q:"Why do verapamil and diltiazem slow a fast AF — and when are they dangerous?",
      aTitle:"Blocking the L-type channel", lead:"The same channel sets AV-node conduction and contractile force.",
      aHtml:"Non-dihydropyridine CCBs block <b>Ca_v1.2</b>, slowing <b>AV-node</b> conduction to control the ventricular rate in atrial fibrillation. But the working myocyte uses the same channel for force — so they're <b>negative inotropes</b>: dangerous in <b>decompensated HFrEF</b>, and in <b>pre-excited AF (WPW)</b>, where blocking the node favors the accessory pathway.",
      tag:"Block Ca_v1.2 → slow AV node (careful in HFrEF, WPW)" })
  ]

  };
})();
