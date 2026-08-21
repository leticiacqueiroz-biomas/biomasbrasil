const RES = Object.assign({
  mapBio: 'assets/bioregional-v2.png',
  mapBacia: 'assets/watershed.png',
  mapVila: 'assets/village.png',
  mapCasa: 'assets/household.png',
  logo: 'assets/logo-biomas.png'
}, window.__resources || {});
/* Biomas Brasil — vídeo de abertura do site.
   Jornada de zoom: APA → bacia do Piracanga → vila → residência,
   com indicadores (Água, Resíduos, Pessoas, Relações) ao vivo. */

const BB = {
  bg: '#0B2430',
  panel: '#0E2B38',
  ink: '#EAF4F1',
  green: '#3FD68F',
  greenDeep: '#1F8A5B',
  yellow: '#F2C230',
  dim: 'rgba(234,244,241,0.55)',
  line: 'rgba(234,244,241,0.14)',
  font: "'Montserrat', 'Helvetica Neue', sans-serif"
};

// Os três helpers de movimento do vídeo — nada de easing fora deles.
const MOTION = {
  enter(T, start, dur = 0.8, dy = 26) {
    const p = clamp((T - start) / dur, 0, 1);
    const e = Easing.easeOutCubic(p);
    return {
      opacity: e,
      transform: `translateY(${(1 - e) * dy}px)`
    };
  },
  pop(T, start, dur = 0.6) {
    const p = clamp((T - start) / dur, 0, 1);
    return {
      opacity: Math.min(1, p * 2.5),
      transform: `scale(${0.5 + 0.5 * Easing.easeOutBack(p)})`
    };
  },
  glide(from, to, start, end) {
    return animate({
      from,
      to,
      start,
      end,
      ease: Easing.easeInOutCubic
    });
  }
};
const LEVELS = [{
  img: RES.mapBio,
  kicker: 'NÍVEL BIORREGIONAL',
  name: 'Região da APA Serra Grande-Itacaré',
  o: [71.7, 19.9],
  vals: [74, 61, 68, 72]
}, {
  img: RES.mapBacia,
  kicker: 'NÍVEL DE PEQUENA BACIA HIDROGRÁFICA',
  name: 'Bacia do Rio Piracanga',
  o: [82.6, 35.8],
  vals: [82, 70, 76, 80]
}, {
  img: RES.mapVila,
  kicker: 'NÍVEL DE BAIRRO',
  name: 'Vila de Piracanga',
  o: [55.8, 31.7],
  vals: [88, 79, 84, 86]
}, {
  img: RES.mapCasa,
  kicker: 'NÍVEL DE RESIDÊNCIA',
  name: 'Casa Felicidade',
  o: [50, 50],
  vals: [95, 90, 92, 96]
}];
const CUM = [1, 3.16, 32.32, 256.77]; // escala real de cada mapa vs o nível biorregional
const INDICATORS = ['Água', 'Resíduos', 'Bem-estar', 'Relações'];
const CRUMBS = ['Biorregião', 'Bacia', 'Vila', 'Casa'];
const BOX = 860;
function LogoMark({
  size = 44,
  progress = 1
}) {
  const r = size / 2 - 3;
  const C = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: BB.green,
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeDasharray: `${C * clamp(progress, 0, 1)} ${C}`,
    transform: `rotate(-90 ${size / 2} ${size / 2})`
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: size / 7,
    fill: BB.green,
    opacity: clamp(progress * 1.5 - 0.5, 0, 1)
  }));
}
function IndicatorRow({
  label,
  value,
  drawn,
  blink
}) {
  const v = clamp(value, 0, 100);
  const shown = Math.round(v);
  const color = v >= 80 ? BB.green : BB.yellow;
  const r = 26,
    C = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 64,
      height: 64
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "64",
    height: "64",
    viewBox: "0 0 64 64"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: r,
    fill: "none",
    stroke: BB.line,
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeDasharray: `${C * (v / 100) * drawn} ${C}`,
    transform: "rotate(-90 32 32)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      fontSize: 16,
      fontWeight: 700,
      color: BB.ink,
      fontFamily: BB.font
    }
  }, shown)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '0.12em',
      color: BB.ink,
      fontFamily: BB.font
    }
  }, label.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      letterSpacing: '0.06em',
      color: BB.dim,
      fontFamily: BB.font,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: color,
      opacity: blink
    }
  }), "índice de cuidado · agora")));
}
function BiomasPiece({
  showCaptions,
  narrar
}) {
  const {
    T,
    CUES,
    authoredTotal
  } = useComposition();
  const g = MOTION.glide;

  // Profundidade de zoom contínua: 0=biorregião … 3=residência.
  const D = g(0, 1, CUES.Bacia - 0.3, CUES.Bacia + 1.7)(T) + g(0, 1, CUES.Vila - 0.3, CUES.Vila + 1.7)(T) + g(0, 1, CUES.Casa - 0.3, CUES.Casa + 1.7)(T);
  const drift = 1 + 0.006 * T; // câmera nunca totalmente parada
  const active = Math.round(clamp(D, 0, 3));

  // Indicadores interpolados entre níveis + oscilação "ao vivo".
  const i0 = Math.floor(clamp(D, 0, 2.999));
  const f = clamp(D, 0, 3) - i0;
  const vals = INDICATORS.map((_, j) => {
    const base = LEVELS[i0].vals[j] * (1 - f) + LEVELS[Math.min(i0 + 1, 3)].vals[j] * f;
    return base + 1.6 * Math.sin(T * 2.3 + j * 1.9) + 0.9 * Math.sin(T * 4.1 + j * 0.7);
  });
  const blink = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(T * 5));
  const captionItems = [{
    at: CUES.Bioregional + 0.9,
    until: CUES.Bioregional + 4.3,
    text: 'Como olhar para uma biorregião? Quais os limites que a definem?'
  }, {
    at: CUES.Bioregional + 4.5,
    until: CUES.Bioregional + 8.7,
    text: 'Para nós, no Biomas Brasil, a Água é o elemento condutor mais fundamental. Por isso, olhamos para pequenas bacias hidrográficas como territórios vivos.'
  }, {
    at: CUES.Bacia + 1.0,
    until: CUES.Bacia + 4.8,
    text: 'Para cada nível de zoom que damos, temos dados e informações que nos permitem acessar a condição desse sistema vivo em tempo real.'
  }, {
    at: CUES.Bacia + 5.0,
    until: CUES.Bacia + 7.6,
    text: 'Água, resíduos, bem-estar social e relações — indicadores vivos do território'
  }, {
    at: CUES.Vila + 1.0,
    until: CUES.Vila + 4.6,
    text: 'Da bacia à vila, casa a casa'
  }, {
    at: CUES.Casa + 1.0,
    until: CUES.Casa + 4.6,
    text: 'Até cada residência — o cuidado acontecendo em tempo real'
  }];
  // Narração: fala a legenda ativa via síntese de voz do navegador (apenas na reprodução ao vivo).
  const cap = captionItems.find(c => T >= c.at && T < c.until);
  const capText = cap ? cap.text : '';
  const prevT = React.useRef(T);
  const advancing = T > prevT.current && T - prevT.current < 0.5;
  prevT.current = T;
  // Narração por síntese de voz removida: a abertura roda sem áudio.

  const introFade = 1 - g(0, 1, CUES.Bioregional - 0.6, CUES.Bioregional + 0.4)(T);
  const outroFade = g(0, 1, CUES.Encerramento + 0.15, CUES.Encerramento + 1.1)(T);
  const finalFade = g(0, 1, authoredTotal - 0.55, authoredTotal - 0.08)(T);
  const pinP = (T * 0.8 + 10) % 1;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": `t=${Math.floor(T)}s`,
    style: {
      position: 'absolute',
      inset: 0,
      background: BB.bg,
      overflow: 'hidden',
      fontFamily: BB.font
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 96,
      top: 0,
      bottom: 0,
      width: 700,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      ...MOTION.enter(T, CUES.Bioregional + 0.1)
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: RES.logo,
    alt: "Biomas Brasil",
    style: {
      display: 'block',
      height: 58
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 140,
      marginTop: 54,
      ...MOTION.enter(T, CUES.Bioregional + 0.3)
    }
  }, LEVELS.map((lv, i) => {
    const near = 1 - clamp((Math.abs(D - i) - 0.18) / 0.32, 0, 1);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        inset: 0,
        opacity: near,
        transform: `translateY(${(D - i) * -14}px)`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '0.24em',
        color: BB.green
      }
    }, lv.kicker), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 46,
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: BB.ink,
        marginTop: 10,
        textWrap: 'pretty'
      }
    }, lv.name));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 6,
      ...MOTION.enter(T, CUES.Bioregional + 0.5)
    }
  }, CRUMBS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '0.14em',
      color: i === active ? BB.green : BB.dim,
      transform: `scale(${i === active ? 1.06 : 1})`
    }
  }, c.toUpperCase()), i < 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 1,
      background: BB.line
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 26,
      marginTop: 56
    }
  }, INDICATORS.map((label, j) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: MOTION.enter(T, CUES.Bioregional + 0.7 + j * 0.18)
  }, /*#__PURE__*/React.createElement(IndicatorRow, {
    label: label,
    value: vals[j],
    drawn: g(0, 1, CUES.Bioregional + 0.8 + j * 0.18, CUES.Bioregional + 2 + j * 0.18)(T),
    blink: blink
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 52,
      ...MOTION.enter(T, CUES.Bioregional + 1.5)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 99,
      background: BB.green,
      opacity: blink
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      letterSpacing: '0.22em',
      fontWeight: 600,
      color: BB.dim
    }
  }, "AO VIVO · ATUALIZADO EM TEMPO REAL"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 96,
      top: (1080 - BOX) / 2,
      width: BOX,
      height: BOX,
      borderRadius: 22,
      overflow: 'hidden',
      border: `1px solid ${BB.line}`,
      background: '#08303a',
      boxShadow: '0 40px 90px rgba(0,0,0,0.45)',
      ...MOTION.enter(T, CUES.Bioregional, 0.9, 0)
    }
  }, LEVELS.map((lv, i) => {
    const Dc = clamp(D, 0, 3);
    const i0z = Math.floor(Math.min(Dc, 2.999));
    const G = CUM[i0z] * Math.pow(CUM[i0z + 1] / CUM[i0z], Dc - i0z);
    const s = G / CUM[i] * drift;
    const op = 1 - clamp((Math.abs(D - i) - 0.35) / 0.45, 0, 1);
    if (op <= 0) return null;
    const incoming = D < i;
    let tx = 0,
      ty = 0;
    if (incoming && i > 0) {
      const P = LEVELS[i - 1].o;
      const w = clamp(1 - s, 0, 1);
      tx = w * (P[0] - 50) / 100 * BOX;
      ty = w * (P[1] - 50) / 100 * BOX;
    }
    return /*#__PURE__*/React.createElement("img", {
      key: i,
      src: lv.img,
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: op,
        transform: `translate(${tx}px, ${ty}px) scale(${s})`,
        transformOrigin: incoming ? '50% 50%' : `${lv.o[0]}% ${lv.o[1]}%`
      }
    });
  }), (() => {
    const lv = LEVELS[active];
    const vis = (1 - clamp((Math.abs(D - active) - 0.12) / 0.18, 0, 1)) * (1 - outroFade);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: `${lv.o[0]}%`,
        top: `${lv.o[1]}%`,
        width: 0,
        height: 0,
        opacity: vis
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: -7,
        top: -7,
        width: 14,
        height: 14,
        borderRadius: 99,
        background: BB.green,
        boxShadow: '0 0 12px rgba(63,214,143,0.9)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: -7,
        top: -7,
        width: 14,
        height: 14,
        borderRadius: 99,
        border: `2px solid ${BB.green}`,
        transform: `scale(${1 + pinP * 3.4})`,
        opacity: 1 - pinP
      }
    }));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      boxShadow: 'inset 0 0 140px rgba(4,18,24,0.75)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      bottom: 22,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 18px',
      borderRadius: 99,
      background: 'rgba(8,32,42,0.78)',
      border: `1px solid ${BB.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 99,
      background: BB.green,
      opacity: blink
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '0.18em',
      color: BB.ink
    }
  }, LEVELS[active].kicker))), showCaptions && /*#__PURE__*/React.createElement(Captions, {
    items: captionItems
  }), /*#__PURE__*/React.createElement(Shot, {
    from: 0,
    to: CUES.Bioregional + 0.5
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: BB.bg,
      opacity: introFade,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: MOTION.enter(T, 0.3, 0.9, 18)
  }, /*#__PURE__*/React.createElement("img", {
    src: RES.logo,
    alt: "Biomas Brasil",
    style: {
      display: 'block',
      width: 560
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      letterSpacing: '0.22em',
      color: BB.green,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      ...MOTION.enter(T, 1.4)
    }
  }, "O TERRITÓRIO, VIVO E EM TEMPO REAL"))), /*#__PURE__*/React.createElement(Shot, {
    from: CUES.Encerramento,
    to: authoredTotal + 1
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(11,36,48,0.94)',
      opacity: outroFade,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: MOTION.enter(T, CUES.Encerramento + 0.5, 0.8, 18)
  }, /*#__PURE__*/React.createElement("img", {
    src: RES.logo,
    alt: "Biomas Brasil",
    style: {
      display: 'block',
      width: 480
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      lineHeight: 1.5,
      color: BB.ink,
      fontWeight: 500,
      maxWidth: 880,
      textAlign: 'center',
      textWrap: 'pretty',
      ...MOTION.enter(T, CUES.Encerramento + 1.0)
    }
  }, "Conhecer o território para decidir e agir coletivamente pela biodiversidade."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: BB.bg,
      opacity: finalFade,
      pointerEvents: 'none'
    }
  }));
}
function BiomasApp() {
  return /*#__PURE__*/React.createElement(CompositionStage, {
    width: 1920,
    height: 1080,
    scenes: window.OM_SCENES,
    playback: window.OM_PLAYBACK,
    bg: BB.bg
  }, /*#__PURE__*/React.createElement(BiomasPiece, {
    showCaptions: true,
    narrar: false
  }));
}
window.BiomasApp = BiomasApp;