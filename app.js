/* ============================================
   KKP WEALTH EXPANDED DASHBOARD — Application
   Notion-style rebuild with Backtest, Projection, Lost Decade
   ============================================ */

(function () {
  "use strict";

  /* ------------------------------------------
     DATA — All 62 holdings
  ------------------------------------------ */
  var HOLDINGS = [
    /* Equity sleeve — Local Equity */
    { product: "VAYU1", details: "VAYU1", target: 1.13, assetClass: "Equity", sleeve: "Equity", thematic: null, expReturn: 8.5, maxDD: -35 },
    { product: "PTT", details: "PTT.BK", target: 2.06, assetClass: "Equity", sleeve: "Equity", thematic: null, expReturn: 7.0, maxDD: -40 },
    /* Equity sleeve — Global Equity */
    { product: "Various Global Stocks", details: "GLOBAL", target: 1.55, assetClass: "Equity", sleeve: "Equity", thematic: null, expReturn: 9.0, maxDD: -30 },

    /* Mandate — Offshore (KKP Balanced Standard) */
    { product: "SPDR Portfolio S&P 500 ETF", details: "SPLG.P", target: 5.26, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 10.5, maxDD: -34 },
    { product: "Vanguard S&P 500 ETF", details: "VOO.P", target: 2.80, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 10.5, maxDD: -34 },
    { product: "iShares MSCI USA Quality Factor ETF", details: "QUAL.BATS", target: 0.15, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 11.0, maxDD: -28 },
    { product: "Vanguard Russell 2000 ETF", details: "VTWO.O", target: 0.38, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 9.0, maxDD: -41 },
    { product: "iShares Europe Index (IE) Instl Dis USD", details: "IE00B4L8GV30", target: 1.91, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 7.5, maxDD: -33 },
    { product: "iShares Japan Index (IE) D Acc USD", details: "IE00BD0NCS18", target: 0.64, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 7.0, maxDD: -30 },
    { product: "iShares EmergMkts Idx (IE) D Acc USD", details: "IE00BYWYC907", target: 1.17, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 7.5, maxDD: -38 },
    { product: "iShares Dev RI Elt Idx (IE) D Acc $", details: "IE000LUZEWK5", target: 0.28, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 6.0, maxDD: -35 },
    { product: "iShares Global Infrastructure ETF", details: "IGF.O", target: 0.28, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 7.5, maxDD: -30 },
    { product: "iShares 20+ Year Treasury Bond ETF", details: "TLT.P", target: 1.27, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 3.5, maxDD: -39 },
    { product: "State Street Glb Aggt Bd Idx I USD Hdg", details: "LU0956450620", target: 1.25, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 2.5, maxDD: -15 },
    { product: "iShares Scrn Gl Corp Bd Idx Ins USD H A", details: "IE000JWH7DS4", target: 3.10, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 3.5, maxDD: -14 },
    { product: "SSGA Stt Strt EM Hrd Ccy Govt Bd Idx I USD", details: "LU2407009567", target: 0.64, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 4.5, maxDD: -18 },
    { product: "GSF II GS Tact Tilt Overlay IP USD Acc", details: "LU2322936241", target: 1.70, assetClass: "Alternative", sleeve: "Mandate", thematic: null, expReturn: 4.0, maxDD: -10 },
    { product: "Cash in United States Dollar", details: "CASH.USD", target: 0.42, assetClass: "Cash", sleeve: "Mandate", thematic: null, expReturn: 2.0, maxDD: 0 },

    /* Mandate — Onshore (KKP Moderate THB) */
    { product: "Brown Advisory Global Leaders", details: "IE00BG0R3926", target: 0.42, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 10.0, maxDD: -30 },
    { product: "Dodge & Cox Worldwide", details: "IE00B54PRV58", target: 0.26, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 9.5, maxDD: -35 },
    { product: "Robeco Global Stars", details: "LU2080584019", target: 0.41, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 9.5, maxDD: -30 },
    { product: "BlackRock Advantage US", details: "IE00BFZP7V49", target: 0.44, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 10.0, maxDD: -32 },
    { product: "JPM US Select", details: "LU0248005711", target: 0.44, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 9.0, maxDD: -33 },
    { product: "Eleva European Selection", details: "LU1331971256", target: 0.21, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 8.0, maxDD: -28 },
    { product: "Invesco S&P 500 UCITS ETF", details: "IE00B3YCGJ38", target: 1.22, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 10.5, maxDD: -34 },
    { product: "iShares MSCI USA Quality", details: "US46432F3394", target: 0.11, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 11.0, maxDD: -28 },
    { product: "Amundi Index MSCI Europe", details: "LU1437015735", target: 0.29, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 7.5, maxDD: -33 },
    { product: "Nomura Japan Strategic", details: "IE00BW38TS53", target: 0.16, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 7.5, maxDD: -30 },
    { product: "Robeco Emerging Markets", details: "LU0478762148", target: 0.16, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 8.0, maxDD: -38 },
    { product: "RBC Emerging Markets", details: "LU2986377153", target: 0.16, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 8.0, maxDD: -38 },
    { product: "Kempen Global Small-Cap", details: "LU1894035184", target: 0.16, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 8.5, maxDD: -38 },
    { product: "DWS Invest Global Infrastructure", details: "LU2046587650", target: 0.16, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 7.0, maxDD: -28 },
    { product: "Principal Global Real Estate", details: "IE00B62LQD71", target: 0.16, assetClass: "Equity", sleeve: "Mandate", thematic: null, expReturn: 5.5, maxDD: -38 },
    { product: "JPM Global Aggregate Bond", details: "LU0430493998", target: 1.73, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 3.0, maxDD: -14 },
    { product: "PIMCO GIS Global Bond", details: "IE0002461055", target: 1.73, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 3.0, maxDD: -13 },
    { product: "SSGA Global Agg Bond", details: "LU0956450620_ON", target: 2.77, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 2.5, maxDD: -15 },
    { product: "iShares USD Treasury 20+yr", details: "IE00BFM6TC58", target: 0.65, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 3.5, maxDD: -39 },
    { product: "Amundi Global Corporate Bond", details: "LU3097925054", target: 1.35, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 3.5, maxDD: -14 },
    { product: "PGIM Global Corporate Bond", details: "IE00BFLQZJ56", target: 1.35, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 3.5, maxDD: -14 },
    { product: "Neuberger Berman EM Debt", details: "IE00B99K6R29", target: 0.33, assetClass: "Fixed Income", sleeve: "Mandate", thematic: null, expReturn: 5.0, maxDD: -20 },
    { product: "GSF II GS Tact Tilt Overlay", details: "LU0721525060", target: 1.14, assetClass: "Alternative", sleeve: "Mandate", thematic: null, expReturn: 4.0, maxDD: -10 },
    { product: "GS Alternative Trend", details: "LU1103308471", target: 0.33, assetClass: "Alternative", sleeve: "Mandate", thematic: null, expReturn: 3.5, maxDD: -12 },
    { product: "Cash USD", details: "CASH.USD_ON", target: 0.16, assetClass: "Cash", sleeve: "Mandate", thematic: null, expReturn: 2.0, maxDD: 0 },

    /* Alternative sleeve */
    { product: "Vista Equity Partners Fund VIII", details: "BCAP-VISPE22BUI", target: 3.22, assetClass: "Private Equity", sleeve: "Alternative", thematic: null, expReturn: 15.0, maxDD: -25 },
    { product: "Lazard Global Listed Infrastructure Equity Fund", details: "IE00B3X5FG30", target: 2.06, assetClass: "Alternative", sleeve: "Alternative", thematic: null, expReturn: 8.5, maxDD: -28 },
    { product: "Onshore Fund of Hedge Funds", details: "FoHF", target: 2.58, assetClass: "Alternative", sleeve: "Alternative", thematic: null, expReturn: 5.0, maxDD: -15 },
    { product: "KKR Private Markets Equity Fund", details: "KKR-KPRIME", target: 3.09, assetClass: "Private Equity", sleeve: "Alternative", thematic: null, expReturn: 12.0, maxDD: -20 },
    { product: "Gold Bullions", details: "GOLD", target: 14.43, assetClass: "Commodities", sleeve: "Alternative", thematic: null, expReturn: 8.0, maxDD: -33 },

    /* Satellite sleeve */
    { product: "iShares U.S. Medical Devices ETF", details: "IHI", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "MedTech", expReturn: 10.0, maxDD: -30 },
    { product: "Columbia Threadneedle Global Technology", details: "LU0444971666", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "Technology", expReturn: 12.0, maxDD: -38 },
    { product: "iShares Semiconductor ETF", details: "SOXX", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "Technology", expReturn: 18.0, maxDD: -45 },
    { product: "iShares Russell 2000 ETF", details: "IWM", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "Small Cap", expReturn: 9.0, maxDD: -41 },
    { product: "iShares MSCI India ETF", details: "INDA", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "India", expReturn: 9.0, maxDD: -35 },
    { product: "Robeco Indian Equities I USD", details: "LU0944707735", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "India", expReturn: 10.0, maxDD: -35 },
    { product: "Goldman Sachs Europe CORE Equity (Unhedged)", details: "LU1856271447", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "Europe", expReturn: 8.0, maxDD: -33 },
    { product: "Goldman Sachs Europe CORE Equity (Hedged)", details: "LU0234682044", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "Europe", expReturn: 8.0, maxDD: -30 },
    { product: "Wellington Strategic European Equity Fund", details: "IE00B6TYHG95", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "Europe", expReturn: 9.0, maxDD: -32 },
    { product: "iShares STOXX Europe 600 UCITS ETF", details: "STOXX", target: 0.52, assetClass: "Equity", sleeve: "Satellite", thematic: "Europe", expReturn: 7.5, maxDD: -33 },

    /* Cash sleeve */
    { product: "Fixed Savings", details: "SAVINGS", target: 27.20, assetClass: "Cash", sleeve: "Cash", thematic: null, expReturn: 2.5, maxDD: 0 }
  ];

  var SLEEVE_ORDER = ["Equity", "Mandate", "Alternative", "Satellite", "Cash"];
  var SLEEVE_COLORS = {
    "Equity": "#437a22",
    "Mandate": "#2d7ec7",
    "Alternative": "#7c5cbf",
    "Satellite": "#c49a2a",
    "Cash": "#9b9a97"
  };

  var ASSET_CLASS_ORDER = ["Equity", "Fixed Income", "Alternative", "Commodities", "Private Equity", "Cash"];
  var ASSET_CLASS_COLORS = {
    "Equity": "#2d7ec7",
    "Fixed Income": "#20808D",
    "Alternative": "#7c5cbf",
    "Commodities": "#c49a2a",
    "Private Equity": "#A84B2F",
    "Cash": "#9b9a97"
  };

  var CHART_COLORS = [
    "#20808D", "#437a22", "#A84B2F", "#7c5cbf", "#c49a2a",
    "#2d7ec7", "#c75a8a", "#5ca3a8", "#a86b32", "#6b8fa3",
    "#8b6bbf", "#4a9e6b", "#d4774b", "#5b8fb8", "#b8954a"
  ];

  var GEO_DATA = [
    { region: "US", pct: 21, contributors: "SPLG.P, VOO.P, QUAL, VTWO, TLT, BlackRock US, JPM US Select, Invesco S&P 500, IWM" },
    { region: "Europe", pct: 6, contributors: "iShares Europe, Eleva European, Amundi Europe, KKP EUROPE-UH/H, ES-EG-A, B-EUPASSIVE" },
    { region: "Emerging Markets", pct: 4, contributors: "iShares EM, Robeco EM, RBC EM, Neuberger EM Debt, SSGA EM Govt Bond" },
    { region: "Global/Non-Geographic", pct: 49, contributors: "Gold Bullions (14.43%), Fixed Savings (27.20%), Global bond funds, GS Overlay, Hedge Funds" },
    { region: "Japan", pct: 2, contributors: "iShares Japan Index, Nomura Japan Strategic" },
    { region: "India", pct: 2, contributors: "TISCOIN/INDA, KKP INDIA-UH" },
    { region: "Thailand", pct: 5, contributors: "VAYU1, PTT, THB cash allocations" },
    { region: "Other", pct: 11, contributors: "Private equity (Vista, KKR), Global infrastructure, Dev RI, Global Real Estate" }
  ];

  var EQUITY_SUB = [
    { name: "US Large Cap (S&P 500)", pct: 10.6 },
    { name: "US Quality & Small Cap", pct: 1.8 },
    { name: "Europe", pct: 4.8 },
    { name: "Japan", pct: 0.8 },
    { name: "Emerging Markets", pct: 2.8 },
    { name: "India", pct: 1.0 },
    { name: "Thai Equity (VAYU1 + PTT)", pct: 3.2 },
    { name: "Global Active Equity", pct: 3.7 },
    { name: "Infrastructure / Real Estate", pct: 0.9 },
    { name: "Technology & MedTech", pct: 1.6 }
  ];

  var FI_SUB = [
    { name: "US Treasury 20+yr", pct: 1.9 },
    { name: "Global Aggregate Bond", pct: 5.8 },
    { name: "Global Corporate Bond", pct: 5.8 },
    { name: "EM Government/Debt Bond", pct: 1.0 }
  ];

  var THEMES = {
    "MedTech": { icon: "\u{1F3E5}", pct: 0.52, thesis: "Medical technology is a secular growth sector driven by aging populations, rising healthcare spending globally, and innovation in devices like robotic surgery systems and cardiac monitors.", holdings: [] },
    "Technology": { icon: "\u{1F4BB}", pct: 1.04, thesis: "Technology remains the dominant growth sector. This allocation splits between a broad global tech fund and a focused semiconductor ETF.", holdings: [] },
    "Small Cap": { icon: "\u{1F3D7}\uFE0F", pct: 0.52, thesis: "US small-cap stocks (Russell 2000) have historically outperformed large caps over long periods.", holdings: [] },
    "India": { icon: "\u{1F1EE}\u{1F1F3}", pct: 1.04, thesis: "India is the world's fastest-growing major economy with favorable demographics, digital transformation, and infrastructure investment.", holdings: [] },
    "Europe": { icon: "\u{1F1EA}\u{1F1FA}", pct: 2.08, thesis: "Europe is trading at historically cheap valuations relative to the US. This allocation reflects a tactical overweight across 4 funds.", holdings: [] }
  };

  HOLDINGS.forEach(function (h) {
    if (h.thematic && THEMES[h.thematic]) { THEMES[h.thematic].holdings.push(h); }
  });

  /* Fact sheet and research data from CSV */
  var FUND_RESEARCH = {
    "IE000JWH7DS4": { url: "https://www.ishares.com/ch/professionals/en/literature/fact-sheet/ishares-screened-global-corporate-bond-index-fund-ie-class-inst-acc-hedge-usd-factsheet-ie000jwh7ds4-ch-en-institutional.pdf", ret10: null, expense: "0.17%" },
    "IGF.O": { url: "https://www.ishares.com/us/literature/fact-sheet/igf-ishares-global-infrastructure-etf-fund-fact-sheet-en-us.pdf", ret10: "8.68%", expense: "0.39%" },
    "QUAL.BATS": { url: "https://www.ishares.com/us/literature/fact-sheet/qual-ishares-msci-usa-quality-factor-etf-fund-fact-sheet-en-us.pdf", ret10: "13.64%", expense: "0.15%" },
    "LU0478762148": { url: "https://www.robeco.com/files/doca/CGF_EMEU_I-fact-202512-profgloben.pdf", ret10: "9.64%", expense: "0.98%" },
    "IE00BYWYC907": { url: "https://www.blackrock.com/lu/intermediaries/literature/fact-sheet/ishares-emerging-markets-index-fund-ie-class-d-usd-factsheet-ie00bywyc907-lu-en-individual.pdf", ret10: null, expense: "0.20%" },
    "SPLG.P": { url: "https://www.ssga.com/library-content/products/factsheets/etfs/us/factsheet-us-en-spym.pdf", ret10: "14.81%", expense: "0.02%" },
    "LU0956450620": { url: "https://www.ssga.com/library-content/products/factsheets/mf/emea/factsheet-emea-en_gb-lu0956450620.pdf", ret10: null, expense: "0.22%" },
    "LU2080584019": { url: "https://www.robeco.com/files/doca/CGF_GLSTARU_IL-fact-202601-profgloben.pdf", ret10: null, expense: "1.01%" },
    "LU2407009567": { url: "https://www.ssga.com/es/en_gb/intermediary/library-content/products/factsheets/mf/emea/factsheet-emea-en_gb-lu2407009567.pdf", ret10: null, expense: "0.19%" },
    "IE00BFM6TC58": { url: "https://www.blackrock.com/americas-offshore/en/literature/fact-sheet/dtla-ishares-treasury-bond-20yr-ucits-etf-fund-fact-sheet-en-lm.pdf", ret10: null, expense: "0.07%" },
    "IE00B62LQD71": { url: "https://www.principal.cl/sites/default/files/2024-07/Global%20Property%20Securities%20Fund%20-%20I%20Class%20Accumulation%20Units_0.PDF", ret10: "2.48%", expense: "0.87%" },
    "IE00B3YCGJ38": { url: "https://www.invesco.com/content/dam/invesco/emea/en/product-documents/etf/share-class/factsheet/IE00B3YCGJ38_factsheet_en.pdf", ret10: "~15.9%", expense: "0.05%" },
    "IE00B54PRV58": { url: "https://www.dodgeandcox.com/content/dam/dc/ww/en/pdf/fact-sheets/Dodge_Cox_Worldwide_Funds-Global_Stock_Fund_Fact_Sheet.pdf", ret10: "10.98%", expense: "0.63%" },
    "VOO.P": { url: "https://investor.vanguard.com/investment-products/etfs/profile/voo", ret10: "14.15%", expense: "0.03%" },
    "LU1331971256": { url: "https://elevacapital.pitchme-am.com/system/elevacapital/documents/attachments/000/002/779/original.pdf", ret10: null, expense: "0.90%" },
    "LU1103308471": { url: "https://www.gsam.com/gsam-docs/fund_kiids/legal/kiid/lu1103308471_en.pdf", ret10: "2.69%", expense: "0.77%" },
    "INDA": { url: "https://www.ishares.com/us/literature/fact-sheet/inda-ishares-msci-india-etf-fund-fact-sheet-en-us.pdf", ret10: "8.17%", expense: "0.61%" },
    "SOXX": { url: "https://www.ishares.com/us/literature/fact-sheet/soxx-ishares-semiconductor-etf-fund-fact-sheet-en-us.pdf", ret10: "27.28%", expense: "0.34%" },
    "IHI": { url: "https://www.ishares.com/us/literature/fact-sheet/ihi-ishares-u-s-medical-devices-etf-fund-fact-sheet-en-us.pdf", ret10: "12.22%", expense: "0.38%" },
    "TLT.P": { url: "https://www.ishares.com/us/literature/fact-sheet/tlt-ishares-20-year-treasury-bond-etf-fund-fact-sheet-en-us.pdf", ret10: "-0.46%", expense: "0.15%" },
    "LU0944707735": { url: "https://www.robeco.com/files/doca/CGF_INDU_I-fact-202511-profgloben.pdf", ret10: null, expense: "1.03%" },
    "LU2322936241": { url: "https://am.gs.com/public-assets/documents/acbabe24-91a7-11ef-a476-55bf14736505?view=true", ret10: null, expense: "0.12%" },
    "IE00BFZP7V49": { url: "https://www.blackrock.com/at/privatanleger/literature/fact-sheet/blackrock-advantage-us-equity-fund-class-d-acc-usd-factsheet-ie00bfzp7v49-at-en-individual.pdf", ret10: null, expense: "0.30%" },
    "IWM": { url: "https://www.ishares.com/us/literature/fact-sheet/iwm-ishares-russell-2000-etf-fund-fact-sheet-en-us.pdf", ret10: "9.54%", expense: "0.19%" },
    "LU2046587650": { url: "https://download.dws.com/download/asset/c2cc96264bb84b2292b14be22764e7f5", ret10: null, expense: "0.40%" },
    "IE0002461055": { url: "http://factsheets.financialexpress.net/ZIL/J2I7_ROW.PDF", ret10: "~3.0%", expense: "0.49%" },
    "IE00B6TYHG95": { url: "https://www.eastspring.co.th/THDocs/FS/11S_master_en_03.pdf", ret10: "10.6%", expense: "0.79%" },
    "LU0248005711": { url: "https://wl.fundsquare.net/serv/down-doc/request?cdClient=jpmorgan&isin=LU0248005711&docTypeCode=KIID&docLang=EN&docCountry=GB", ret10: "~5.5%", expense: "0.66%" },
    "IE00BD0NCS18": { url: "https://www.blackrock.com/lu/individual/literature/fact-sheet/ishares-japan-index-fund-ie-class-d-usd-factsheet-ie00bd0ncs18-lu-en-individual.pdf", ret10: null, expense: "0.15%" },
    "IE00BW38TS53": { url: "https://www.nomura-asset.co.uk/funds/fund-range/nomura-funds-ireland-japan-strategic-value-fund/", ret10: null, expense: "0.85%" },
    "IE00B3X5FG30": { url: "https://www.lazardassetmanagement.com/docs/9571/LazardGlobalListedInfrastructureEquityFundAAccUSDHedged_UCITSKIID_IE00B3X5FG30_en.pdf", ret10: "10.1%", expense: "0.92%" },
    "LU3097925054": { url: "https://www.amundi.com/globaldistributor/product/view/LU0319688445", ret10: null, expense: null },
    "LU0721525060": { url: "https://www.gsam.com/content/dam/gsam/pdfs/international/en/prospectus-and-regulatory/kiids/LU0721525060_CE_PRIIPSVEU.pdf", ret10: "3.83%", expense: "0.06%" },
    "IE00B4L8GV30": { url: "https://www.ishares.com/uk/individual/en/literature/fact-sheet/ishares-europe-index-fund-ie-inst-usd-factsheet-ie00b4l8gv30-gb-en-individual.pdf", ret10: null, expense: "0.28%" },
    "IE00BG0R3926": { url: "https://info.brownadvisory.com/intl-factsheet-global-leaders-ucits-fund", ret10: null, expense: "0.71%" },
    "IE000LUZEWK5": { url: "https://www.blackrock.com/at/privatanleger/literature/fact-sheet/ishares-developed-real-estate-index-fund-ie-class-d-acc-usd-factsheet-ie000luzewk5-at-en-individual.pdf", ret10: null, expense: "0.17%" },
    "LU1856271447": { url: "https://am.gs.com/public-assets/documents/b1bdcdd6-1d50-11ef-9fda-87bfd714f0c7?view=true", ret10: null, expense: "0.56%" },
    "VTWO.O": { url: "https://investor.vanguard.com/investment-products/etfs/profile/vtwo", ret10: "11.35%", expense: "0.06%" },
    "LU0444971666": { url: "https://www.columbiathreadneedle.com/en/lu/intermediary/fund-details/ct-lux-global-technology-au-usd_lu2126_lu0444971666/", ret10: null, expense: "1.65%" },
    "STOXX": { url: "https://www.ishares.com/ch/individual/en/literature/fact-sheet/exsa-ishares-stoxx-europe-600-ucits-etf-de-fund-fact-sheet-en-ch.pdf", ret10: "9.63%", expense: "0.20%" },
    "LU0234682044": { url: "https://www.gsam.com/gsam-docs/fund_kiids/legal/kiid/lu0234682044_en.pdf", ret10: "~9.4%", expense: "0.56%" },
    "LU2986377153": { url: "https://institutional.rbcgam.com/documents/en/europe/product/rbc-funds-lux-emerging-markets-equity-fund.pdf", ret10: null, expense: "0.69%" },
    "IE00B99K6R29": { url: "https://www.nb.com/handlers/documents.ashx?item_id=aa01c957-f3f4-47d1-ac72-895f7339f004", ret10: "4.02%", expense: "0.65%" },
    "IE00BFLQZJ56": { url: "https://www.pgim.com/gb/en/intermediary/investment-capabilities/funds/ucits/pgim-global-corporate-bond/pgim-global-corporate-bond-fund-usd-i", ret10: null, expense: "0.35%" },
    "LU0430493998": { url: "https://am.jpmorgan.com/lu/en/asset-management/adv/products/jpm-aggregate-bond-i-acc-usd-lu0430493998", ret10: null, expense: "0.46%" },
    "LU1894035184": { url: "https://api.kneip.com/v1/documentdata/permalinks/KPP_LU1894035184_de_DE.pdf", ret10: null, expense: "0.91%" },
    "LU1437015735": { url: "https://www.amundietf.co.uk/en/professional/products/equity/amundi-core-msci-europe-ucits-etf-acc/lu1437015735", ret10: null, expense: "0.12%" },
    "US46432F3394": { url: null, ret10: null, expense: "0.15%" },
    "PTT.BK": { url: "https://ptt.listedcompany.com/misc/factsheet/20250321-ptt-factsheet-2024.pdf", ret10: null, expense: "N/A (stock)" },
    "BCAP-VISPE22BUI": { url: "https://www.nj.gov/treasury/doinvest/pdf/AlternativeInvestments/PrivateEquity/VistaEquityPartnersVIII.pdf", ret10: null, expense: "1.5% + 20% carry" },
    "KKR-KPRIME": { url: "https://kseries.kkr.com/kprime/", ret10: null, expense: "1.25% + 15% perf" },
    "GOLD": { url: "https://www.ssga.com/us/en/intermediary/etfs/spdr-gold-shares-gld", ret10: "~13%", expense: "N/A (physical)" }
  };

  /* LEARN explanations */
  var LEARN_EXPLANATIONS = {
    "Equity": {
      "VAYU1": "VAYU1 is a Thai equity fund providing direct exposure to the Thai stock market. It gives you Thai-baht returns with no currency risk.",
      "PTT.BK": "PTT Public Company Limited is Thailand's largest energy company. This direct stock holding provides local equity exposure with a strong dividend yield (~6-7%).",
      "GLOBAL": "A small allocation to various global stocks providing direct equity market exposure outside mandates."
    },
    "Mandate": {
      "SPLG.P": "The SPDR S&P 500 ETF tracks the 500 largest US companies at ultra-low cost. At 5.26%, it's the largest single equity holding in the mandate.",
      "VOO.P": "Vanguard S&P 500 complements SPLG for additional S&P 500 exposure within the offshore mandate.",
      "QUAL.BATS": "iShares MSCI USA Quality focuses on US companies with high profitability, stable earnings, and low debt.",
      "VTWO.O": "Vanguard Russell 2000 provides US small-cap exposure \u2014 smaller, faster-growing companies.",
      "IE00B4L8GV30": "iShares Europe Index provides broad exposure to European equities \u2014 UK, Germany, France, Switzerland, and more.",
      "IE00BD0NCS18": "iShares Japan Index gives exposure to Japanese companies benefiting from governance reforms.",
      "IE00BYWYC907": "iShares Emerging Markets Index covers stocks from China, Taiwan, India, South Korea, and Brazil.",
      "IE000LUZEWK5": "iShares Developed Markets RI Index focuses on companies with strong ESG practices.",
      "IGF.O": "iShares Global Infrastructure ETF invests in toll roads, airports, power companies, and utilities worldwide.",
      "TLT.P": "iShares 20+ Year Treasury Bond ETF holds long-dated US government bonds \u2014 portfolio ballast.",
      "LU0956450620": "State Street Global Aggregate Bond Index is a broad global bond fund within the offshore mandate.",
      "IE000JWH7DS4": "iShares Global Corporate Bond Index invests in investment-grade corporate bonds globally.",
      "LU2407009567": "SSGA EM Government Bond invests in bonds issued by emerging market governments in hard currencies.",
      "LU2322936241": "Goldman Sachs Tactical Tilt Overlay is an alternative strategy using derivatives to add return.",
      "CASH.USD": "Cash held in US dollars within the offshore mandate for liquidity.",
      "IE00BG0R3926": "Brown Advisory Global Leaders invests in quality companies with sustainable competitive advantages.",
      "IE00B54PRV58": "Dodge & Cox Worldwide is a value-oriented active fund finding undervalued companies globally.",
      "LU2080584019": "Robeco Global Stars selects global quality-growth stocks using fundamental and quantitative analysis.",
      "IE00BFZP7V49": "BlackRock Advantage US uses data science to systematically select US stocks.",
      "LU0248005711": "JPM US Select is an actively managed US equity fund focusing on above-average earnings growth.",
      "LU1331971256": "Eleva European Selection is an active European equity fund picking companies with improving fundamentals.",
      "IE00B3YCGJ38": "Invesco S&P 500 UCITS ETF provides low-cost S&P 500 exposure within the onshore mandate.",
      "US46432F3394": "iShares MSCI USA Quality Factor provides additional US quality equity exposure.",
      "LU1437015735": "Amundi MSCI Europe Index provides passive European equity exposure at low cost.",
      "IE00BW38TS53": "Nomura Japan Strategic is an actively managed Japanese equity fund.",
      "LU0478762148": "Robeco Emerging Markets is an active EM equity fund using both fundamental and quantitative models.",
      "LU2986377153": "RBC Emerging Markets provides additional active EM equity exposure.",
      "LU1894035184": "Kempen Global Small-Cap invests in smaller companies worldwide.",
      "LU2046587650": "DWS Invest Global Infrastructure provides exposure to global infrastructure companies.",
      "IE00B62LQD71": "Principal Global Real Estate invests in REITs and real estate companies worldwide.",
      "LU0430493998": "JPM Global Aggregate Bond is an active global bond fund managed by J.P. Morgan.",
      "IE0002461055": "PIMCO GIS Global Bond is one of the world\u2019s most respected bond funds.",
      "LU0956450620_ON": "SSGA Global Aggregate Bond (onshore) provides broad global bond market exposure \u2014 2.77%.",
      "IE00BFM6TC58": "iShares USD Treasury Bond 20+yr provides long-duration US Treasury exposure.",
      "LU3097925054": "Amundi Global Corporate Bond invests in investment-grade corporate bonds worldwide.",
      "IE00BFLQZJ56": "PGIM Global Corporate Bond provides corporate bond exposure with deep credit research.",
      "IE00B99K6R29": "Neuberger Berman EM Debt invests in emerging market bonds for higher yields.",
      "LU0721525060": "Goldman Sachs Tactical Tilt Overlay (onshore) adds systematic alternative return streams.",
      "LU1103308471": "GS Alternative Trend follows market trends using systematic trading strategies.",
      "CASH.USD_ON": "Cash held in USD within the onshore mandate for liquidity."
    },
    "Alternative": {
      "BCAP-VISPE22BUI": "Vista Equity Partners Fund VIII is a private equity fund focused on enterprise software companies. Prior funds delivered 10.5\u201329.2% net IRR. Provides illiquidity premium and technology sector exposure.",
      "IE00B3X5FG30": "Lazard Global Listed Infrastructure invests in essential infrastructure assets \u2014 toll roads, pipelines, power grids. 10yr return ~10.1%.",
      "FoHF": "A diversified onshore fund of hedge funds providing exposure to multiple hedge fund strategies for return diversification.",
      "KKR-KPRIME": "KKR K-PRIME is a semi-liquid private equity fund providing access to KKR's buyout, growth, and infrastructure deals. Targets steady returns with lower volatility than public equity.",
      "GOLD": "Physical gold bullions (14.43% of portfolio). Gold is the portfolio's primary inflation hedge and crisis buffer. Historical avg annual return ~13% over recent decades."
    },
    "Satellite": {
      "IHI": "iShares US Medical Devices ETF invests in companies making surgical robots, cardiac devices, and diagnostic equipment.",
      "LU0444971666": "K-GTECH tracks Columbia Threadneedle Global Technology \u2014 broad exposure to leading tech companies.",
      "SOXX": "KKP SEMICON-H tracks the iShares Semiconductor ETF \u2014 chipmakers powering AI, EVs, smartphones.",
      "IWM": "SCBRS2000 tracks the iShares Russell 2000 \u2014 US small-cap stocks with growth potential.",
      "INDA": "TISCOIN tracks the iShares MSCI India ETF \u2014 passive exposure to India\u2019s booming equity market.",
      "LU0944707735": "KKP INDIA-UH invests in Robeco Indian Equities \u2014 active stock-picking in India.",
      "LU1856271447": "KKP EUROPE-UH tracks Goldman Sachs Europe CORE \u2014 systematic European equity selection (unhedged).",
      "LU0234682044": "KKP EUROPE-H tracks Goldman Sachs Europe CORE \u2014 same strategy but hedged to THB.",
      "IE00B6TYHG95": "Eastspring European Growth focuses on European companies with sustainable growth characteristics.",
      "STOXX": "B-EUPASSIVE tracks the iShares STOXX Europe 600 \u2014 broad passive European equity."
    },
    "Cash": {
      "SAVINGS": "Fixed savings deposits providing capital preservation, liquidity, and stable income at current interest rates. This 27.20% allocation is the portfolio's largest single position, serving as a liquidity buffer and deflation hedge."
    }
  };

  /* ------------------------------------------
     BACKTEST DATA — Asset class annual returns
  ------------------------------------------ */
  var YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

  var PROXY_RETURNS = {
    "US Large Cap":    [11.96, 21.83, -4.38, 31.49, 18.40, 28.71, -18.11, 26.29, 25.02, 12],
    "US Small Cap":    [21.31, 14.65, -11.01, 25.52, 19.96, 14.82, -20.44, 16.93, 11.54, 8],
    "US Quality":      [11.96, 21.83, -4.38, 31.49, 18.40, 28.71, -18.11, 26.29, 25.02, 12],
    "Europe Equity":   [2.6, 25.5, -14.9, 23.8, -3.3, 22.2, -14.5, 18.2, 5.8, 8],
    "Japan Equity":    [2.7, 24.4, -12.6, 19.7, 14.3, 2.0, -16.2, 20.3, 20.6, 10],
    "Emerging Markets":[11.2, 37.3, -14.6, 18.4, 18.3, -2.5, -20.1, 9.8, 7.5, 6],
    "India Equity":    [-1.4, 38.8, -7.3, 7.6, 15.6, 26.3, -8.1, 20.8, 12.1, 5],
    "Global Bond":     [2.1, 7.4, -1.2, 6.8, 5.3, -4.7, -16.2, 5.7, -1.7, 3],
    "US Treasury 20+": [1.2, 8.6, -1.8, 14.1, 17.7, -4.6, -31.2, 3.5, -7.6, 2],
    "Global Corporate":[5.6, 8.2, -3.5, 11.4, 6.8, -1.0, -15.4, 8.2, 1.2, 4],
    "EM Debt Hard":    [10.2, 10.3, -4.6, 15.0, 5.3, -1.8, -17.8, 11.1, 5.7, 5],
    "Infrastructure":  [11.0, 19.1, -8.9, 25.2, -8.5, 21.4, 3.2, 5.1, 11.8, 10],
    "Semiconductor":   [38.2, 38.2, -8.6, 60.8, 51.6, 41.4, -36.4, 66.8, 19.3, 15],
    "MedTech":         [8.9, 30.4, 15.1, 39.3, 19.3, 20.2, -24.7, 1.1, 12.8, 10],
    "Technology":      [13.8, 38.8, -3.1, 48.0, 43.9, 34.5, -33.0, 55.1, 33.5, 15],
    "Hedge/Alt Trend": [3, 5, -4, 8, 2, 10, 8, 5, 6, 4],
    "Private Equity":  [12, 18, 14, 13, 11, 27, -3, 12, 15, 10],
    "Thai Equity":     [19.8, 13.7, -10.8, 1.0, -8.3, 14.4, 0.2, -15.2, 1.2, -3],
    "Cash USD":        [0.5, 1.0, 1.9, 2.3, 0.5, 0.1, 1.5, 5.0, 5.3, 4.5],
    "Fixed Savings":   [1.5, 1.5, 1.5, 1.8, 1.0, 0.5, 0.8, 2.0, 2.5, 2.5],
    "Gold":            [8.6, 13.7, -1.6, 18.3, 25.1, -3.6, -0.3, 13.1, 27.2, 30.0],
    "GS Tactical":     [6, 14, -5, 18, 10, 10, -14, 13, 8, 6],
    "Global Equity":   [8, 23, -8, 28, 16, 22, -18, 24, 20, 10],
    "ESG Dev":         [8, 22, -9, 28, 15, 21, -17, 23, 19, 9],
    "Global Real Estate":[4.5, 12.5, -6.5, 22, -8, 25, -25, 3, 5, 6]
  };

  /* S&P 500, MSCI World for comparison */
  var SP500_RETURNS = [11.96, 21.83, -4.38, 31.49, 18.40, 28.71, -18.11, 26.29, 25.02, 12];
  var MSCI_WORLD_RETURNS = [7.5, 22.4, -8.7, 27.7, 15.9, 21.8, -18.1, 23.8, 18.7, 10];
  var GLOBAL_6040_RETURNS = [5.5, 14.2, -4.8, 18.5, 11.5, 10.5, -17.0, 15.5, 10.0, 7.0];

  /* Map each holding to a proxy return series */
  function getHoldingProxy(h) {
    var d = h.details;
    // Equity sleeve
    if (d === "VAYU1") return "Thai Equity";
    if (d === "PTT.BK") return "Thai Equity";
    if (d === "GLOBAL") return "Global Equity";
    // Cash
    if (d === "SAVINGS") return "Fixed Savings";
    if (h.assetClass === "Cash") return "Cash USD";
    // Gold
    if (d === "GOLD") return "Gold";
    // Private equity
    if (d === "BCAP-VISPE22BUI" || d === "KKR-KPRIME") return "Private Equity";
    // Fund of HF
    if (d === "FoHF") return "Hedge/Alt Trend";
    // By ticker/details
    if (d === "SPLG.P" || d === "VOO.P" || d === "IE00B3YCGJ38") return "US Large Cap";
    if (d === "QUAL.BATS" || d === "US46432F3394") return "US Quality";
    if (d === "VTWO.O" || d === "IWM") return "US Small Cap";
    if (d === "IE00B4L8GV30" || d === "LU1437015735" || d === "LU1331971256" || d === "LU1856271447" || d === "LU0234682044" || d === "IE00B6TYHG95" || d === "STOXX") return "Europe Equity";
    if (d === "IE00BD0NCS18" || d === "IE00BW38TS53") return "Japan Equity";
    if (d === "IE00BYWYC907" || d === "LU0478762148" || d === "LU2986377153") return "Emerging Markets";
    if (d === "INDA" || d === "LU0944707735") return "India Equity";
    if (d === "TLT.P" || d === "IE00BFM6TC58") return "US Treasury 20+";
    if (d === "LU0956450620" || d === "LU0956450620_ON" || d === "LU0430493998" || d === "IE0002461055") return "Global Bond";
    if (d === "IE000JWH7DS4" || d === "LU3097925054" || d === "IE00BFLQZJ56") return "Global Corporate";
    if (d === "LU2407009567" || d === "IE00B99K6R29") return "EM Debt Hard";
    if (d === "IGF.O" || d === "LU2046587650" || d === "IE00B3X5FG30") return "Infrastructure";
    if (d === "IE000LUZEWK5") return "ESG Dev";
    if (d === "IE00B62LQD71") return "Global Real Estate";
    if (d === "LU2322936241" || d === "LU0721525060") return "GS Tactical";
    if (d === "LU1103308471") return "Hedge/Alt Trend";
    if (d === "IHI") return "MedTech";
    if (d === "SOXX") return "Semiconductor";
    if (d === "LU0444971666") return "Technology";
    // Global active equity managers
    if (d === "IE00BG0R3926" || d === "IE00B54PRV58" || d === "LU2080584019") return "Global Equity";
    if (d === "IE00BFZP7V49" || d === "LU0248005711") return "US Large Cap";
    if (d === "LU1894035184") return "US Small Cap";
    return "Global Equity";
  }

  /* ------------------------------------------
     THEME + CHART SETUP
  ------------------------------------------ */
  function isDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function getChartColors() {
    return {
      text: isDark() ? "rgba(255,255,255,0.5)" : "#787774",
      grid: isDark() ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      tooltipBg: isDark() ? "#2f2f2f" : "#37352f",
      tooltipBorder: isDark() ? "rgba(255,255,255,0.1)" : "rgba(55,53,47,0.2)",
      borderColor: isDark() ? "#202020" : "#ffffff"
    };
  }

  function applyChartDefaults() {
    var c = getChartColors();
    Chart.defaults.color = c.text;
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.plugins.legend.labels.padding = 12;
    Chart.defaults.plugins.legend.labels.boxWidth = 12;
    Chart.defaults.plugins.legend.labels.boxHeight = 12;
    Chart.defaults.plugins.tooltip.backgroundColor = c.tooltipBg;
    Chart.defaults.plugins.tooltip.borderColor = c.tooltipBorder;
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.cornerRadius = 6;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.titleFont = { weight: "600", size: 12 };
    Chart.defaults.plugins.tooltip.bodyFont = { size: 11 };
    Chart.defaults.scale.grid.color = c.grid;
  }

  /* ------------------------------------------
     SAFE STORAGE (in-memory with optional persistence)
  ------------------------------------------ */
  var _memStore = {};
  var _persist = (function() { try { var s = window["local" + "Storage"]; s.setItem("_t","1"); s.removeItem("_t"); return s; } catch(e) { return null; } })();
  var safeStorage = {
    getItem: function(k) { return _persist ? _persist.getItem(k) : (_memStore[k] || null); },
    setItem: function(k,v) { if (_persist) _persist.setItem(k,v); _memStore[k] = v; }
  };

  /* ------------------------------------------
     THEME TOGGLE
  ------------------------------------------ */
  function initThemeToggle() {
    var stored = safeStorage.getItem("kkp-exp-theme");
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    applyChartDefaults();

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        var next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        safeStorage.setItem("kkp-exp-theme", next);
        applyChartDefaults();
        rebuildAllCharts();
      });
    }
  }

  var charts = {};
  var currentInvestment = 10000000;

  function rebuildAllCharts() {
    Object.keys(charts).forEach(function (k) {
      if (charts[k]) { charts[k].destroy(); delete charts[k]; }
    });
    Object.keys(tabInitialized).forEach(function (k) { tabInitialized[k] = false; });
    tabInitialized.overview = false;
    renderKPIs();
    renderSleeveDonut();
    renderHoldingsBar();
    var active = document.querySelector(".nav-btn.active");
    if (active) {
      var tab = active.getAttribute("data-tab");
      initTab(tab);
      initTab("overview");
    }
  }

  /* ------------------------------------------
     UTILITY FUNCTIONS
  ------------------------------------------ */
  function fmt(n, decimals) {
    if (decimals === undefined) decimals = 2;
    return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  function fmtPctRaw(n) { return n.toFixed(2) + "%"; }

  function getSleeveData() {
    var data = {};
    HOLDINGS.forEach(function (h) {
      if (!data[h.sleeve]) data[h.sleeve] = 0;
      data[h.sleeve] += h.target;
    });
    return data;
  }

  function getAssetClassData() {
    var data = {};
    HOLDINGS.forEach(function (h) {
      if (!data[h.assetClass]) data[h.assetClass] = 0;
      data[h.assetClass] += h.target;
    });
    return data;
  }

  /* ------------------------------------------
     NAVIGATION
  ------------------------------------------ */
  var tabInitialized = { overview: true, structure: false, assetmix: false, geography: false, themes: false, learn: false, backtest: false, projection: false, cashflow: false, lostdecade: false };

  function initNavigation() {
    document.querySelectorAll(".nav-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = btn.getAttribute("data-tab");
        window.location.hash = tab;
        switchTab(tab);
      });
    });
    document.querySelectorAll(".mobile-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = btn.getAttribute("data-tab");
        window.location.hash = tab;
        switchTab(tab);
      });
    });
  }

  function initTab(tabId) {
    if (tabInitialized[tabId]) return;
    tabInitialized[tabId] = true;
    switch (tabId) {
      case "structure": renderStructure(); break;
      case "assetmix": renderAssetMix(); break;
      case "geography": renderGeography(); break;
      case "themes": renderThemes(); break;
      case "learn": renderLearnCards(); break;
      case "backtest": renderBacktest(); break;
      case "projection": renderProjection(); initCompoundingInput(); break;
      case "cashflow": renderCashFlow(); initCashFlowInputs(); break;
      case "lostdecade": renderIranWar(); break;
    }
  }

  function switchTab(tabId) {
    document.querySelectorAll(".nav-btn, .mobile-tab").forEach(function (b) {
      b.classList.remove("active");
      b.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-tab=\"" + tabId + "\"]").forEach(function (btn) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "page");
    });
    document.querySelectorAll(".tab-content").forEach(function (t) { t.classList.remove("active"); });
    var tabEl = document.getElementById("tab-" + tabId);
    if (tabEl) tabEl.classList.add("active");
    initTab(tabId);
    document.querySelector(".main").scrollTop = 0;
    setTimeout(function () {
      Object.keys(charts).forEach(function (k) {
        if (charts[k] && typeof charts[k].resize === "function") charts[k].resize();
      });
    }, 150);
  }

  /* ------------------------------------------
     TAB 1: OVERVIEW
  ------------------------------------------ */
  function renderKPIs() {
    var grid = document.getElementById("kpi-grid");
    var kpis = [
      { label: "Total Holdings", value: String(HOLDINGS.length), sub: "Across all sleeves", cls: "" },
      { label: "Sleeves", value: "6", sub: "Portfolio segments", cls: "" },
      { label: "Asset Classes", value: "6", sub: "Eq, FI, Alt, Comm, PE, Cash", cls: "" },
      { label: "Largest Sleeve", value: "37.52%", sub: "Mandate", cls: "accent" }
    ];
    grid.innerHTML = kpis.map(function (k) {
      return '<div class="kpi-card"><span class="kpi-label">' + k.label + '</span><span class="kpi-value ' + k.cls + '">' + k.value + '</span><span class="kpi-sub">' + k.sub + '</span></div>';
    }).join("");
  }

  function renderSleeveDonut() {
    var ctx = document.getElementById("chart-sleeve-donut").getContext("2d");
    var data = getSleeveData();
    var cc = getChartColors();
    if (charts.sleeveDonut) charts.sleeveDonut.destroy();
    charts.sleeveDonut = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: SLEEVE_ORDER,
        datasets: [{ data: SLEEVE_ORDER.map(function (s) { return +(data[s] || 0).toFixed(2); }), backgroundColor: SLEEVE_ORDER.map(function (s) { return SLEEVE_COLORS[s]; }), borderColor: cc.borderColor, borderWidth: 2 }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: "65%", plugins: { legend: { position: "bottom" }, tooltip: { callbacks: { label: function (c) { return c.label + ": " + c.raw + "%"; } } } } }
    });
  }

  function renderHoldingsBar() {
    var ctx = document.getElementById("chart-holdings-bar").getContext("2d");
    var cc = getChartColors();
    var datasets = ASSET_CLASS_ORDER.map(function (ac) {
      return { label: ac, data: SLEEVE_ORDER.map(function (s) { var t = 0; HOLDINGS.forEach(function (h) { if (h.sleeve === s && h.assetClass === ac) t += h.target; }); return +t.toFixed(2); }), backgroundColor: ASSET_CLASS_COLORS[ac], borderRadius: 2, borderSkipped: false };
    });
    if (charts.holdingsBar) charts.holdingsBar.destroy();
    charts.holdingsBar = new Chart(ctx, {
      type: "bar",
      data: { labels: SLEEVE_ORDER.map(function (s) { return s.length > 15 ? s.substring(0, 14) + "\u2026" : s; }), datasets: datasets },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" }, tooltip: { callbacks: { label: function (i) { return i.dataset.label + ": " + i.raw + "%"; } } } }, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true, ticks: { callback: function (v) { return v + "%"; } }, grid: { color: cc.grid } } } }
    });
  }

  function renderHoldingsTable() {
    var tbody = document.getElementById("holdings-tbody");
    tbody.innerHTML = HOLDINGS.map(function (h) {
      var sc = SLEEVE_COLORS[h.sleeve] || "#9b9a97";
      var erCls = (h.expReturn || 0) >= 8 ? "positive" : (h.expReturn || 0) >= 5 ? "" : "negative";
      var ddCls = "negative";
      var erVal = h.expReturn != null ? (h.expReturn >= 0 ? "+" : "") + h.expReturn.toFixed(1) + "%" : "—";
      var ddVal = h.maxDD != null ? h.maxDD.toFixed(0) + "%" : "—";
      return "<tr><td><strong>" + h.product + "</strong></td><td style=\"font-family:monospace;font-size:var(--text-xs)\">" + h.details + "</td><td><span class=\"tag\" style=\"background:" + sc + "18;color:" + sc + "\">" + h.sleeve + "</span></td><td><span class=\"tag tag--neutral\">" + h.assetClass + "</span></td><td class=\"num\">" + fmtPctRaw(h.target) + "</td><td class=\"num " + erCls + "\">" + erVal + "</td><td class=\"num " + ddCls + "\">" + ddVal + "</td></tr>";
    }).join("");
  }

  function initTableSort() {
    var table = document.getElementById("holdings-table");
    if (!table) return;
    table.querySelectorAll("th[data-sort]").forEach(function (th) {
      th.addEventListener("click", function () {
        var field = th.getAttribute("data-sort");
        var asc = th.classList.contains("sort-asc");
        table.querySelectorAll("th").forEach(function (h2) { h2.classList.remove("sort-asc", "sort-desc"); });
        th.classList.add(asc ? "sort-desc" : "sort-asc");
        HOLDINGS.sort(function (a, b) {
          var va, vb;
          switch (field) {
            case "product": va = a.product; vb = b.product; break;
            case "details": va = a.details; vb = b.details; break;
            case "sleeve": va = a.sleeve; vb = b.sleeve; break;
            case "assetClass": va = a.assetClass; vb = b.assetClass; break;
            case "target": va = a.target; vb = b.target; break;
            case "expReturn": va = a.expReturn || 0; vb = b.expReturn || 0; break;
            case "maxDD": va = a.maxDD || 0; vb = b.maxDD || 0; break;
            default: va = 0; vb = 0;
          }
          if (typeof va === "string") return asc ? vb.localeCompare(va) : va.localeCompare(vb);
          return asc ? va - vb : vb - va;
        });
        renderHoldingsTable();
      });
    });
  }

  /* ------------------------------------------
     TAB 2: STRUCTURE
  ------------------------------------------ */
  function renderStructure() {
    var container = document.getElementById("structure-container");
    var sleeveGroups = {};
    SLEEVE_ORDER.forEach(function (s) { sleeveGroups[s] = []; });
    HOLDINGS.forEach(function (h) { if (sleeveGroups[h.sleeve]) sleeveGroups[h.sleeve].push(h); });

    var html = "";
    SLEEVE_ORDER.forEach(function (sleeve, idx) {
      var items = sleeveGroups[sleeve];
      var totalPct = 0; items.forEach(function (h) { totalPct += h.target; });
      var openClass = idx < 2 ? " open" : "";
      var color = SLEEVE_COLORS[sleeve];
      var mandateLabel = "";
      if (sleeve === "Mandate") mandateLabel = '<div style="padding:var(--space-2) var(--space-3);font-size:var(--text-xs);color:var(--text-muted);background:var(--surface-2);border-bottom:1px solid var(--border)">KKP Balanced Standard (21.21% offshore) + KKP Moderate THB (16.31% onshore) \u2014 40 underlying holdings</div>';

      html += '<div class="structure-sleeve' + openClass + '"><div class="structure-sleeve-header"><div class="structure-sleeve-info"><div class="structure-sleeve-dot" style="background:' + color + '"></div><span class="structure-sleeve-name">' + sleeve + '</span><span class="structure-sleeve-pct">' + totalPct.toFixed(2) + '%</span></div><div style="display:flex;align-items:center;gap:var(--space-3)"><span class="structure-sleeve-count">' + items.length + ' holdings</span><div class="structure-toggle"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div></div></div><div class="structure-sleeve-body">' + mandateLabel + '<div class="structure-sleeve-content"><div class="structure-holding-row" style="font-weight:600;color:var(--text-secondary);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid var(--border)"><div>Product</div><div>Ticker/ISIN</div><div>Asset Class</div><div style="text-align:right">Target %</div></div>';

      items.forEach(function (h) {
        html += '<div class="structure-holding-row"><div class="structure-holding-name">' + h.product + '</div><div class="structure-holding-detail">' + h.details + '</div><div class="structure-holding-class"><span class="tag tag--neutral">' + h.assetClass + '</span></div><div class="structure-holding-pct">' + fmtPctRaw(h.target) + '</div></div>';
      });
      html += '</div></div></div>';
    });
    container.innerHTML = html;
    container.querySelectorAll(".structure-sleeve-header").forEach(function (header) {
      header.addEventListener("click", function () { header.closest(".structure-sleeve").classList.toggle("open"); });
    });
  }

  /* ------------------------------------------
     TAB 3: ASSET MIX
  ------------------------------------------ */
  function renderAssetMix() {
    var acData = getAssetClassData();
    var cc = getChartColors();
    var ctx1 = document.getElementById("chart-asset-donut").getContext("2d");
    if (charts.assetDonut) charts.assetDonut.destroy();
    charts.assetDonut = new Chart(ctx1, { type: "doughnut", data: { labels: ASSET_CLASS_ORDER, datasets: [{ data: ASSET_CLASS_ORDER.map(function (ac) { return +(acData[ac] || 0).toFixed(2); }), backgroundColor: ASSET_CLASS_ORDER.map(function (ac) { return ASSET_CLASS_COLORS[ac]; }), borderColor: cc.borderColor, borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "65%", plugins: { legend: { position: "bottom" }, tooltip: { callbacks: { label: function (c) { return c.label + ": " + c.raw + "%"; } } } } } });

    var ctx2 = document.getElementById("chart-asset-by-sleeve").getContext("2d");
    var datasets = SLEEVE_ORDER.map(function (s) { return { label: s, data: ASSET_CLASS_ORDER.map(function (ac) { var t = 0; HOLDINGS.forEach(function (h) { if (h.sleeve === s && h.assetClass === ac) t += h.target; }); return +t.toFixed(2); }), backgroundColor: SLEEVE_COLORS[s], borderRadius: 2, borderSkipped: false }; });
    if (charts.assetBySleeve) charts.assetBySleeve.destroy();
    charts.assetBySleeve = new Chart(ctx2, { type: "bar", data: { labels: ASSET_CLASS_ORDER, datasets: datasets }, options: { responsive: true, maintainAspectRatio: false, indexAxis: "y", plugins: { legend: { position: "top" }, tooltip: { callbacks: { label: function (c) { return c.dataset.label + ": " + c.raw + "%"; } } } }, scales: { x: { stacked: true, beginAtZero: true, ticks: { callback: function (v) { return v + "%"; } }, grid: { color: cc.grid } }, y: { stacked: true, grid: { display: false } } } } });

    var ctx3 = document.getElementById("chart-equity-sub").getContext("2d");
    if (charts.equitySub) charts.equitySub.destroy();
    charts.equitySub = new Chart(ctx3, { type: "bar", data: { labels: EQUITY_SUB.map(function (e) { return e.name; }), datasets: [{ data: EQUITY_SUB.map(function (e) { return e.pct; }), backgroundColor: EQUITY_SUB.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }), borderRadius: 3, borderSkipped: false, minBarLength: 3 }] }, options: { responsive: true, maintainAspectRatio: false, indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { callback: function (v) { return v + "%"; } }, grid: { color: cc.grid } }, y: { grid: { display: false } } } } });

    var ctx4 = document.getElementById("chart-fi-sub").getContext("2d");
    if (charts.fiSub) charts.fiSub.destroy();
    charts.fiSub = new Chart(ctx4, { type: "bar", data: { labels: FI_SUB.map(function (e) { return e.name; }), datasets: [{ data: FI_SUB.map(function (e) { return e.pct; }), backgroundColor: ["#20808D", "#5ca3a8", "#437a22", "#c49a2a"], borderRadius: 3, borderSkipped: false, minBarLength: 3 }] }, options: { responsive: true, maintainAspectRatio: false, indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { callback: function (v) { return v + "%"; } }, grid: { color: cc.grid } }, y: { grid: { display: false } } } } });
  }

  /* ------------------------------------------
     TAB 4: GEOGRAPHY
  ------------------------------------------ */
  function renderGeography() {
    var cc = getChartColors();
    var sorted = GEO_DATA.slice().sort(function (a, b) { return b.pct - a.pct; });
    var ctx1 = document.getElementById("chart-geo-bar").getContext("2d");
    if (charts.geoBar) charts.geoBar.destroy();
    charts.geoBar = new Chart(ctx1, { type: "bar", data: { labels: sorted.map(function (g) { return g.region; }), datasets: [{ label: "Portfolio Exposure", data: sorted.map(function (g) { return g.pct; }), backgroundColor: sorted.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }), borderRadius: 3, borderSkipped: false, minBarLength: 3 }] }, options: { responsive: true, maintainAspectRatio: false, indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { callback: function (v) { return v + "%"; } }, grid: { color: cc.grid } }, y: { grid: { display: false } } } } });

    var regions = [{ name: "North America", pct: 21 }, { name: "Europe", pct: 6 }, { name: "Asia-Pacific", pct: 4 }, { name: "Emerging Markets", pct: 4 }, { name: "Thailand", pct: 5 }, { name: "Global/Non-Geographic", pct: 49 }, { name: "Other", pct: 11 }];
    var ctx2 = document.getElementById("chart-region-donut").getContext("2d");
    if (charts.regionDonut) charts.regionDonut.destroy();
    charts.regionDonut = new Chart(ctx2, { type: "doughnut", data: { labels: regions.map(function (r) { return r.name; }), datasets: [{ data: regions.map(function (r) { return r.pct; }), backgroundColor: regions.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }), borderColor: cc.borderColor, borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "60%", plugins: { legend: { position: "bottom" } } } });

    var tbody = document.getElementById("geo-tbody");
    tbody.innerHTML = sorted.map(function (g) { return "<tr><td><strong>" + g.region + "</strong></td><td class=\"num\">~" + g.pct + "%</td><td>" + g.contributors + "</td></tr>"; }).join("");
  }

  /* ------------------------------------------
     TAB 5: THEMES
  ------------------------------------------ */
  function renderThemes() {
    var cc = getChartColors();
    var themeNames = Object.keys(THEMES);
    document.getElementById("themes-overview").innerHTML = themeNames.map(function (name) { var t = THEMES[name]; return '<div class="theme-overview-card"><div class="theme-overview-icon">' + t.icon + '</div><div class="theme-overview-name">' + name + '</div><div class="theme-overview-pct">' + t.pct + '%</div><div class="theme-overview-count">' + t.holdings.length + ' fund' + (t.holdings.length > 1 ? 's' : '') + '</div></div>'; }).join("");

    var ctx1 = document.getElementById("chart-themes-donut").getContext("2d");
    if (charts.themesDonut) charts.themesDonut.destroy();
    charts.themesDonut = new Chart(ctx1, { type: "doughnut", data: { labels: themeNames, datasets: [{ data: themeNames.map(function (n) { return THEMES[n].pct; }), backgroundColor: themeNames.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }), borderColor: cc.borderColor, borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "60%", plugins: { legend: { position: "bottom" } } } });

    var ctx2 = document.getElementById("chart-themes-bar").getContext("2d");
    if (charts.themesBar) charts.themesBar.destroy();
    charts.themesBar = new Chart(ctx2, { type: "bar", data: { labels: themeNames, datasets: [{ label: "Allocation %", data: themeNames.map(function (n) { return THEMES[n].pct; }), backgroundColor: themeNames.map(function (_, i) { return CHART_COLORS[i % CHART_COLORS.length]; }), borderRadius: 3, borderSkipped: false }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: function (v) { return v + "%"; } }, grid: { color: cc.grid } }, x: { grid: { display: false } } } } });

    document.getElementById("themes-detail").innerHTML = themeNames.map(function (name) { var t = THEMES[name]; var holdingsHtml = t.holdings.map(function (h) { return '<div class="theme-holding-item"><div><span class="theme-holding-name">' + h.product + '</span><span class="theme-holding-detail">' + h.details + '</span></div><div class="theme-holding-pct">' + fmtPctRaw(h.target) + '</div></div>'; }).join(""); return '<div class="theme-detail-card"><div class="theme-detail-header"><div class="theme-detail-icon">' + t.icon + '</div><div class="theme-detail-name">' + name + '</div><div class="theme-detail-pct">' + t.pct + '%</div></div><div class="theme-detail-thesis">' + t.thesis + '</div><div class="theme-holdings-list">' + holdingsHtml + '</div></div>'; }).join("");
  }

  /* ------------------------------------------
     TAB 6: LEARN (with fact sheets)
  ------------------------------------------ */
  function renderLearnCards() {
    var grid = document.getElementById("learn-grid");
    var html = "";
    SLEEVE_ORDER.forEach(function (sleeve) {
      var items = HOLDINGS.filter(function (h) { return h.sleeve === sleeve; });
      if (items.length === 0) return;
      var iconClass = "local";
      if (sleeve === "Mandate") iconClass = "offshore";
      else if (sleeve === "Alternative") iconClass = "alt";
      else if (sleeve === "Satellite") iconClass = "sat";
      else if (sleeve === "Cash") iconClass = "onshore";

      items.forEach(function (h) {
        var learnData = LEARN_EXPLANATIONS[sleeve] || {};
        var explain = learnData[h.details] || learnData[h.product] || "";
        if (!explain) explain = h.product + " is part of the " + sleeve + " allocation with a " + fmtPctRaw(h.target) + " target weight.";

        var initials = (h.details || h.product).substring(0, 2).toUpperCase();
        var researchKey = h.details;
        // Handle _ON suffix for onshore duplicate tickers
        if (researchKey === "LU0956450620_ON") researchKey = "LU0956450620";
        if (researchKey === "CASH.USD_ON") researchKey = "CASH.USD";
        var research = FUND_RESEARCH[h.details] || FUND_RESEARCH[researchKey] || {};
        var factsheetHtml = "";
        if (research.url) {
          factsheetHtml = '<a class="learn-factsheet-link" href="' + research.url + '" target="_blank" rel="noopener noreferrer"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 1h5l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2"/><path d="M8 1v3h3" stroke="currentColor" stroke-width="1.2"/></svg>Fact Sheet</a>';
        }

        var extraMeta = "";
        if (research.expense) {
          extraMeta += '<div class="learn-meta-item"><span class="learn-meta-label">Expense Ratio</span><span class="learn-meta-value">' + research.expense + '</span></div>';
        }
        if (research.ret10) {
          extraMeta += '<div class="learn-meta-item"><span class="learn-meta-label">10yr Return</span><span class="learn-meta-value">' + research.ret10 + '</span></div>';
        }

        html += '<div class="learn-card"><div class="learn-card-header"><div class="learn-card-icon learn-card-icon--' + iconClass + '">' + initials + '</div><div class="learn-card-title"><div class="learn-card-ticker">' + (h.details || h.product) + '</div><div class="learn-card-name">' + h.product + '</div></div><span class="learn-card-sleeve">' + sleeve + '</span></div><div class="learn-card-explain">' + explain + '</div><div class="learn-card-meta"><div class="learn-meta-item"><span class="learn-meta-label">Target</span><span class="learn-meta-value">' + fmtPctRaw(h.target) + '</span></div><div class="learn-meta-item"><span class="learn-meta-label">Asset Class</span><span class="learn-meta-value">' + h.assetClass + '</span></div>' + extraMeta + '</div>' + (factsheetHtml ? '<div class="learn-card-tip">' + factsheetHtml + '</div>' : '') + '</div>';
      });
    });
    grid.innerHTML = html;
  }

  /* ------------------------------------------
     TAB 7: BACKTEST
  ------------------------------------------ */
  function computeBacktest() {
    var portfolioReturns = [];
    for (var yi = 0; yi < YEARS.length; yi++) {
      var weightedReturn = 0;
      var totalWeight = 0;
      HOLDINGS.forEach(function (h) {
        var proxy = getHoldingProxy(h);
        var series = PROXY_RETURNS[proxy];
        if (series) {
          weightedReturn += (h.target / 100) * series[yi];
          totalWeight += h.target / 100;
        }
      });
      if (totalWeight > 0) weightedReturn = weightedReturn / totalWeight * totalWeight;
      portfolioReturns.push(weightedReturn);
    }
    return portfolioReturns;
  }

  function renderBacktest() {
    var cc = getChartColors();
    var portReturns = computeBacktest();

    // Cumulative index
    var portIndex = [100];
    var sp500Index = [100];
    var msciIndex = [100];
    var g6040Index = [100];
    for (var i = 0; i < YEARS.length; i++) {
      portIndex.push(portIndex[i] * (1 + portReturns[i] / 100));
      sp500Index.push(sp500Index[i] * (1 + SP500_RETURNS[i] / 100));
      msciIndex.push(msciIndex[i] * (1 + MSCI_WORLD_RETURNS[i] / 100));
      g6040Index.push(g6040Index[i] * (1 + GLOBAL_6040_RETURNS[i] / 100));
    }

    var labels = ["2015"].concat(YEARS.map(String));

    // KPIs
    var cagr = (Math.pow(portIndex[10] / 100, 1 / 10) - 1) * 100;
    var best = Math.max.apply(null, portReturns);
    var worst = Math.min.apply(null, portReturns);
    var maxDD = 0;
    var peak = 100;
    for (var j = 1; j <= 10; j++) {
      if (portIndex[j] > peak) peak = portIndex[j];
      var dd = (portIndex[j] - peak) / peak * 100;
      if (dd < maxDD) maxDD = dd;
    }
    var avgReturn = portReturns.reduce(function (a, b) { return a + b; }, 0) / portReturns.length;
    var variance = portReturns.reduce(function (s, r) { return s + Math.pow(r - avgReturn, 2); }, 0) / portReturns.length;
    var vol = Math.sqrt(variance);
    var sharpe = vol > 0 ? (avgReturn - 2.5) / vol : 0;

    var kpiGrid = document.getElementById("backtest-kpi-grid");
    kpiGrid.innerHTML = [
      { label: "CAGR (10yr)", value: cagr.toFixed(1) + "%", cls: "accent" },
      { label: "Best Year", value: "+" + best.toFixed(1) + "%", cls: "positive" },
      { label: "Worst Year", value: worst.toFixed(1) + "%", cls: "negative" },
      { label: "Max Drawdown", value: maxDD.toFixed(1) + "%", cls: "negative" },
      { label: "Volatility", value: vol.toFixed(1) + "%", cls: "" },
      { label: "Sharpe Ratio", value: sharpe.toFixed(2), cls: "accent" }
    ].map(function (k) { return '<div class="kpi-card"><span class="kpi-label">' + k.label + '</span><span class="kpi-value ' + k.cls + '">' + k.value + '</span></div>'; }).join("");

    // Cumulative chart
    var ctx1 = document.getElementById("chart-backtest-cumulative").getContext("2d");
    if (charts.backtestCum) charts.backtestCum.destroy();
    charts.backtestCum = new Chart(ctx1, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          { label: "KKP Expanded Portfolio", data: portIndex.map(function (v) { return +v.toFixed(1); }), borderColor: "#20808D", backgroundColor: "rgba(32,128,141,0.08)", fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: "#20808D" },
          { label: "S&P 500", data: sp500Index.map(function (v) { return +v.toFixed(1); }), borderColor: "#2d7ec7", borderWidth: 1.5, tension: 0.3, pointRadius: 0, borderDash: [5, 3] },
          { label: "MSCI World", data: msciIndex.map(function (v) { return +v.toFixed(1); }), borderColor: "#7c5cbf", borderWidth: 1.5, tension: 0.3, pointRadius: 0, borderDash: [5, 3] },
          { label: "Global 60/40", data: g6040Index.map(function (v) { return +v.toFixed(1); }), borderColor: "#c49a2a", borderWidth: 1.5, tension: 0.3, pointRadius: 0, borderDash: [3, 3] }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } }, scales: { x: { grid: { color: cc.grid } }, y: { grid: { color: cc.grid } } } }
    });

    // Table
    var tbody = document.getElementById("backtest-tbody");
    tbody.innerHTML = YEARS.map(function (yr, idx) {
      var pRet = portReturns[idx];
      var pCls = pRet >= 0 ? "positive" : "negative";
      var spRet = SP500_RETURNS[idx];
      var spCls = spRet >= 0 ? "positive" : "negative";
      var mRet = MSCI_WORLD_RETURNS[idx];
      return "<tr><td class=\"num\">" + yr + "</td><td class=\"num " + pCls + "\">" + (pRet >= 0 ? "+" : "") + pRet.toFixed(1) + "%</td><td class=\"num\">" + portIndex[idx + 1].toFixed(1) + "</td><td class=\"num " + spCls + "\">" + (spRet >= 0 ? "+" : "") + spRet.toFixed(1) + "%</td><td class=\"num\">" + sp500Index[idx + 1].toFixed(1) + "</td><td class=\"num\">" + (mRet >= 0 ? "+" : "") + mRet.toFixed(1) + "%</td></tr>";
    }).join("");

    // Volatility chart
    var volData = [];
    for (var vi = 0; vi < YEARS.length; vi++) {
      if (vi < 2) { volData.push(null); continue; }
      var slice = portReturns.slice(vi - 2, vi + 1);
      var mean = slice.reduce(function (a, b) { return a + b; }, 0) / 3;
      var v = Math.sqrt(slice.reduce(function (s, r) { return s + Math.pow(r - mean, 2); }, 0) / 3);
      volData.push(+v.toFixed(1));
    }
    var ctx2 = document.getElementById("chart-backtest-vol").getContext("2d");
    if (charts.backtestVol) charts.backtestVol.destroy();
    charts.backtestVol = new Chart(ctx2, {
      type: "bar",
      data: { labels: YEARS.map(String), datasets: [{ label: "Rolling 3-Year Volatility (%)", data: volData, backgroundColor: "rgba(32,128,141,0.3)", borderColor: "#20808D", borderWidth: 1, borderRadius: 3 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { callback: function (v) { return v + "%"; } }, grid: { color: cc.grid } } } }
    });
  }

  /* ------------------------------------------
     TAB 8: PROJECTION
  ------------------------------------------ */
  var BASE_RATE = 0.065;
  var BOOST_RATE = 0.08;
  var STRESS_RATE = 0.035;

  function renderProjection() {
    updateCompoundingDisplay();
    renderMonteCarloChart();
    renderComparisonChart();
    renderCompoundingTable();
  }

  function updateCompoundingDisplay() {
    var inflAdj = document.getElementById("inflation-toggle") && document.getElementById("inflation-toggle").checked;
    var inflRate = inflAdj ? 0.03 : 0;
    var br = BASE_RATE - inflRate;
    var bor = BOOST_RATE - inflRate;
    var sr = STRESS_RATE - inflRate;

    var base20 = currentInvestment * Math.pow(1 + br, 20);
    var boost20 = currentInvestment * Math.pow(1 + bor, 20);
    var stress20 = currentInvestment * Math.pow(1 + sr, 20);

    var label = inflAdj ? " (real)" : "";
    document.getElementById("base-rate").textContent = ((br) * 100).toFixed(1) + "% annual" + label;
    document.getElementById("base-final").textContent = "\u0E3F" + fmt(base20, 0);
    document.getElementById("base-gain").textContent = "+" + fmt(base20 - currentInvestment, 0) + " gain";
    document.getElementById("boost-rate").textContent = ((bor) * 100).toFixed(1) + "% annual" + label;
    document.getElementById("boost-final").textContent = "\u0E3F" + fmt(boost20, 0);
    document.getElementById("boost-gain").textContent = "+" + fmt(boost20 - currentInvestment, 0) + " gain";
    document.getElementById("stress-rate").textContent = ((sr) * 100).toFixed(1) + "% annual" + label;
    document.getElementById("stress-final").textContent = "\u0E3F" + fmt(stress20, 0);
    document.getElementById("stress-gain").textContent = "+" + fmt(stress20 - currentInvestment, 0) + " gain";

    var kpis = document.getElementById("scenario-kpis");
    kpis.innerHTML = [
      { label: "Base (6.5%)", value: "\u0E3F" + fmt(base20, 0) },
      { label: "Dollar Boost (8.0%)", value: "\u0E3F" + fmt(boost20, 0) },
      { label: "Stress (3.5%)", value: "\u0E3F" + fmt(stress20, 0) }
    ].map(function (k) { return '<div class="scenario-kpi"><span class="scenario-kpi-label">' + k.label + '</span><span class="scenario-kpi-value">' + k.value + '</span></div>'; }).join("");
  }

  function monteCarloPercentiles(mu, sigma, years, startVal) {
    var nSims = 2000;
    var paths = [];
    function gaussRand() {
      var u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    for (var s = 0; s < nSims; s++) {
      var path = [startVal];
      for (var y = 0; y < years; y++) {
        var r = mu + sigma * gaussRand();
        path.push(path[y] * (1 + r));
      }
      paths.push(path);
    }
    var p5 = [], p25 = [], p50 = [], p75 = [], p95 = [];
    for (var yr = 0; yr <= years; yr++) {
      var vals = paths.map(function (p) { return p[yr]; }).sort(function (a, b) { return a - b; });
      p5.push(vals[Math.floor(nSims * 0.05)]);
      p25.push(vals[Math.floor(nSims * 0.25)]);
      p50.push(vals[Math.floor(nSims * 0.50)]);
      p75.push(vals[Math.floor(nSims * 0.75)]);
      p95.push(vals[Math.floor(nSims * 0.95)]);
    }
    return { p5: p5, p25: p25, p50: p50, p75: p75, p95: p95 };
  }

  function renderMonteCarloChart() {
    var cc = getChartColors();
    var inflAdj = document.getElementById("inflation-toggle") && document.getElementById("inflation-toggle").checked;
    var inflRate = inflAdj ? 0.03 : 0;
    var mu = BASE_RATE - inflRate;
    var sigma = 0.08;
    var mc = monteCarloPercentiles(mu, sigma, 20, currentInvestment);
    var labels = [];
    for (var i = 0; i <= 20; i++) labels.push("Year " + i);

    var ctx = document.getElementById("chart-montecarlo").getContext("2d");
    if (charts.montecarlo) charts.montecarlo.destroy();

    function roundArr(arr) { return arr.map(function (v) { return Math.round(v); }); }

    charts.montecarlo = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          { label: "95th percentile", data: roundArr(mc.p95), borderColor: "rgba(32,128,141,0.2)", backgroundColor: "rgba(32,128,141,0.04)", fill: "+1", borderWidth: 1, pointRadius: 0, tension: 0.3 },
          { label: "75th percentile", data: roundArr(mc.p75), borderColor: "rgba(32,128,141,0.3)", backgroundColor: "rgba(32,128,141,0.08)", fill: "+1", borderWidth: 1, pointRadius: 0, tension: 0.3 },
          { label: "Median (50th)", data: roundArr(mc.p50), borderColor: "#20808D", borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: "#20808D", tension: 0.3, fill: false },
          { label: "25th percentile", data: roundArr(mc.p25), borderColor: "rgba(32,128,141,0.3)", backgroundColor: "rgba(32,128,141,0.08)", fill: "+1", borderWidth: 1, pointRadius: 0, tension: 0.3 },
          { label: "5th percentile", data: roundArr(mc.p5), borderColor: "rgba(32,128,141,0.2)", borderWidth: 1, pointRadius: 0, tension: 0.3, fill: false }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: "top" }, tooltip: { callbacks: { label: function (c) { return c.dataset.label + ": \u0E3F" + fmt(c.raw, 0); } } } },
        scales: { x: { grid: { color: cc.grid } }, y: { beginAtZero: false, ticks: { callback: function (v) { return v >= 1000000 ? "\u0E3F" + (v / 1000000).toFixed(0) + "M" : "\u0E3F" + fmt(v, 0); } }, grid: { color: cc.grid } } }
      }
    });
  }

  function renderComparisonChart() {
    var cc = getChartColors();
    var inflAdj = document.getElementById("inflation-toggle") && document.getElementById("inflation-toggle").checked;
    var inflRate = inflAdj ? 0.03 : 0;
    var strategies = [
      { name: "KKP Expanded (6.5%)", rate: 0.065 - inflRate, color: "#20808D" },
      { name: "Pure S&P 500 (10%)", rate: 0.10 - inflRate, color: "#2d7ec7" },
      { name: "Pure Bonds (3%)", rate: 0.03 - inflRate, color: "#c49a2a" },
      { name: "Global 60/40 (7%)", rate: 0.07 - inflRate, color: "#7c5cbf" }
    ];
    var labels = [];
    for (var i = 0; i <= 20; i++) labels.push("Year " + i);

    var datasets = strategies.map(function (s) {
      var data = [];
      for (var y = 0; y <= 20; y++) data.push(Math.round(currentInvestment * Math.pow(1 + s.rate, y)));
      return { label: s.name, data: data, borderColor: s.color, borderWidth: 2, tension: 0.3, pointRadius: 0, fill: false };
    });

    var ctx = document.getElementById("chart-comparison").getContext("2d");
    if (charts.comparison) charts.comparison.destroy();
    charts.comparison = new Chart(ctx, {
      type: "line", data: { labels: labels, datasets: datasets },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" }, tooltip: { callbacks: { label: function (c) { return c.dataset.label + ": \u0E3F" + fmt(c.raw, 0); } } } }, scales: { x: { grid: { color: cc.grid } }, y: { ticks: { callback: function (v) { return v >= 1000000 ? "\u0E3F" + (v / 1000000).toFixed(0) + "M" : "\u0E3F" + fmt(v, 0); } }, grid: { color: cc.grid } } } }
    });
  }

  function renderCompoundingTable() {
    var inflAdj = document.getElementById("inflation-toggle") && document.getElementById("inflation-toggle").checked;
    var inflRate = inflAdj ? 0.03 : 0;
    var rate = BASE_RATE - inflRate;
    var tbody = document.getElementById("compounding-tbody");
    var rows = [];
    for (var i = 1; i <= 20; i++) {
      var begin = currentInvestment * Math.pow(1 + rate, i - 1);
      var end = currentInvestment * Math.pow(1 + rate, i);
      rows.push("<tr><td class=\"num\">" + i + "</td><td class=\"num\">\u0E3F" + fmt(begin, 0) + "</td><td class=\"num positive\">+" + fmt(end - begin, 0) + "</td><td class=\"num\">\u0E3F" + fmt(end, 0) + "</td></tr>");
    }
    tbody.innerHTML = rows.join("");
  }

  function initCompoundingInput() {
    var input = document.getElementById("investment-input");
    var toggle = document.getElementById("inflation-toggle");
    if (!input) return;
    function update() {
      var raw = input.value.replace(/[^0-9]/g, "");
      var num = parseInt(raw, 10) || 0;
      currentInvestment = num;
      input.value = num.toLocaleString("en-US");
      updateCompoundingDisplay();
      renderMonteCarloChart();
      renderComparisonChart();
      renderCompoundingTable();
    }
    input.addEventListener("input", function () {
      var pos = input.selectionStart;
      var oldLen = input.value.length;
      update();
      var newLen = input.value.length;
      input.setSelectionRange(pos + (newLen - oldLen), pos + (newLen - oldLen));
    });
    input.addEventListener("focus", function () { input.select(); });
    if (toggle) {
      toggle.addEventListener("change", function () { update(); });
    }
  }

  /* ------------------------------------------
     TAB 9: IRAN WAR THREAT (replaces Lost Decade)
  ------------------------------------------ */
  function renderIranWar() {
    var cc = getChartColors();

    // B. Impact Heatmap
    var heatmapData = [
      { name: "Gold Bullions", weight: "14.43%", st: "+15-25%", stCls: "positive", mt: "+30-50%", mtCls: "positive", lt: "+60-100%", ltCls: "positive" },
      { name: "Fixed Savings / Cash", weight: "27.20%", st: "Stable", stCls: "positive", mt: "Stable", mtCls: "positive", lt: "Eroded by inflation", ltCls: "mixed" },
      { name: "S&P 500 ETFs", weight: "~9.3%", st: "-3 to -7%", stCls: "negative", mt: "-5 to -12%", mtCls: "negative", lt: "-10 to -20%", ltCls: "negative" },
      { name: "Europe Equity", weight: "~5.7%", st: "-5 to -10%", stCls: "negative", mt: "-10 to -18%", mtCls: "negative", lt: "-15 to -25%", ltCls: "negative" },
      { name: "EM Equity", weight: "~1.5%", st: "-6 to -12%", stCls: "negative", mt: "-10 to -20%", mtCls: "negative", lt: "-15 to -30%", ltCls: "negative" },
      { name: "PTT", weight: "2.06%", st: "+5 to +15%", stCls: "positive", mt: "Mixed", mtCls: "mixed", lt: "-5 to -15%", ltCls: "negative" },
      { name: "Thai Equity / VAYU1", weight: "1.13%", st: "-5 to -10%", stCls: "negative", mt: "-8 to -15%", mtCls: "negative", lt: "-10 to -20%", ltCls: "negative" },
      { name: "India ETFs", weight: "~1.04%", st: "-8 to -12%", stCls: "negative", mt: "-10 to -18%", mtCls: "negative", lt: "-15 to -25%", ltCls: "negative" },
      { name: "Semiconductors (SOXX)", weight: "0.52%", st: "-5 to -10%", stCls: "negative", mt: "-8 to -15%", mtCls: "negative", lt: "-10 to -20%", ltCls: "negative" },
      { name: "Long Treasuries", weight: "~1.92%", st: "+3 to +5%", stCls: "positive", mt: "Mixed", mtCls: "mixed", lt: "-5 to -10%", ltCls: "negative" },
      { name: "Global/Corp Bonds", weight: "~12.4%", st: "-1 to -3%", stCls: "negative", mt: "-3 to -6%", mtCls: "negative", lt: "-5 to -10%", ltCls: "negative" },
      { name: "Private Equity", weight: "6.31%", st: "Neutral", stCls: "neutral", mt: "Neutral", mtCls: "neutral", lt: "-5 to -10%", ltCls: "mixed" },
      { name: "Infrastructure", weight: "~2.50%", st: "Mixed", stCls: "mixed", mt: "+2 to +5%", mtCls: "positive", lt: "Mixed", ltCls: "mixed" },
      { name: "GS Tactical / Alt Trend", weight: "~2.84%", st: "+3 to +8%", stCls: "positive", mt: "+5 to +12%", mtCls: "positive", lt: "+5 to +10%", ltCls: "positive" },
      { name: "Hedge Funds", weight: "2.58%", st: "+1 to +4%", stCls: "positive", mt: "+3 to +6%", mtCls: "positive", lt: "+2 to +5%", ltCls: "positive" }
    ];

    var hmTbody = document.getElementById("iw-heatmap-tbody");
    hmTbody.innerHTML = heatmapData.map(function (row) {
      function cellCls(c) { return "iw-cell-" + c; }
      return '<tr><td><strong>' + row.name + '</strong></td><td class="num">' + row.weight + '</td><td class="num ' + cellCls(row.stCls) + '">' + row.st + '</td><td class="num ' + cellCls(row.mtCls) + '">' + row.mt + '</td><td class="num ' + cellCls(row.ltCls) + '">' + row.lt + '</td></tr>';
    }).join("");

    // C. War Scenario Stress Test (10 years, indexed from 100)
    // Yearly returns for each scenario
    var noWarR   = [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5];
    var ceaseR   = [-2,  12,  10,   9,   8,  7.5,  7,   7,   7,   7];   // dip then snap back, CAGR ~7.5%
    var prolongR = [-5,   2,   3,   5,   5,  5.5,  6,   6,   6.5, 6.5]; // pain then slow recovery, CAGR ~4.5%
    var stage3R  = [-8,  -3,   1,   2,   3,   4,   4,   5,   5,   5];   // deep pain, slow grind, CAGR ~2.5%

    var noWarIdx = [100], ceaseIdx = [100], prolongIdx = [100], stage3Idx = [100];
    var stressLabels = ["Start"];
    for (var i = 0; i < 10; i++) {
      stressLabels.push("Year " + (i + 1));
      noWarIdx.push(noWarIdx[i] * (1 + noWarR[i] / 100));
      ceaseIdx.push(ceaseIdx[i] * (1 + ceaseR[i] / 100));
      prolongIdx.push(prolongIdx[i] * (1 + prolongR[i] / 100));
      stage3Idx.push(stage3Idx[i] * (1 + stage3R[i] / 100));
    }

    var ctx1 = document.getElementById("chart-iw-stress").getContext("2d");
    if (charts.iwStress) charts.iwStress.destroy();
    charts.iwStress = new Chart(ctx1, {
      type: "line",
      data: {
        labels: stressLabels,
        datasets: [
          { label: "No War (~6.5% CAGR)", data: noWarIdx.map(function (v) { return +v.toFixed(1); }), borderColor: "#20808D", borderWidth: 2.5, tension: 0.3, pointRadius: 2 },
          { label: "Ceasefire (~7.5% CAGR)", data: ceaseIdx.map(function (v) { return +v.toFixed(1); }), borderColor: "#437a22", borderWidth: 2, tension: 0.3, pointRadius: 2, borderDash: [5, 3] },
          { label: "Prolonged War (~4.5% CAGR)", data: prolongIdx.map(function (v) { return +v.toFixed(1); }), borderColor: "#c49a2a", borderWidth: 2, tension: 0.3, pointRadius: 2, borderDash: [5, 3] },
          { label: "Stage 3 Quagmire (~2.5% CAGR)", data: stage3Idx.map(function (v) { return +v.toFixed(1); }), borderColor: "#A84B2F", borderWidth: 2, tension: 0.3, pointRadius: 2, borderDash: [3, 3] }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } }, scales: { x: { grid: { color: cc.grid } }, y: { grid: { color: cc.grid } } } }
    });

    // Stress table
    var stressTbody = document.getElementById("iw-stress-tbody");
    stressTbody.innerHTML = "";
    for (var si = 0; si < 10; si++) {
      stressTbody.innerHTML += '<tr><td class="num">' + (si + 1) + '</td><td class="num">' + noWarIdx[si + 1].toFixed(1) + '</td><td class="num">' + ceaseIdx[si + 1].toFixed(1) + '</td><td class="num">' + prolongIdx[si + 1].toFixed(1) + '</td><td class="num">' + stage3Idx[si + 1].toFixed(1) + '</td></tr>';
    }

    // D. Warning Signs
    var warnings = [
      { name: "Oil Price >$110/barrel", status: "yellow", watch: "Brent at ~$92, rising. Thailand danger zone at $110.", action: "Trim Thai equity" },
      { name: "Strait of Hormuz closed >30 days", status: "red", watch: "Currently closed. 200+ tankers at anchor. 20% global oil blocked.", action: "Defensive posture" },
      { name: "Stage 3: US ground forces deployed", status: "yellow", watch: "75% probability per Pape. Watch troop deployments.", action: "Max defensive, add gold" },
      { name: "Nuclear escalation signals", status: "green", watch: "Iran's 400kg enriched uranium stockpile. Monitor IAEA.", action: "Emergency rebalance" },
      { name: "Terrorism spreading globally", status: "green", watch: "Iran's international networks. Tourism at risk.", action: "Exit satellite positions" },
      { name: "China military involvement", status: "green", watch: "China benefits from US quagmire. Watch Taiwan strait.", action: "Flight to gold/USD cash" },
      { name: "EM currency collapse", status: "yellow", watch: "MSCI EM -6% weekly. Capital outflows accelerating.", action: "Exit EM debt & equity" },
      { name: "US fiscal strain / debt spiral", status: "yellow", watch: "Defense spending surge. Debt ceiling pressures.", action: "USD weakness benefits gold" },
      { name: "Insurance market freeze (shipping)", status: "red", watch: "Tanker insurance rates surging. Trade disruption.", action: "Commodity spike hedge" },
      { name: "Thai baht past 35/USD", status: "yellow", watch: "Baht weakened past 32/USD. Oil imports in USD.", action: "Offshore USD gains" }
    ];

    var warnEl = document.getElementById("iw-warnings-list");
    warnEl.innerHTML = warnings.map(function (w) {
      return '<div class="iw-warning-item"><div class="iw-warning-dot iw-warning-dot--' + w.status + '"></div><div class="iw-warning-name">' + w.name + '</div><div class="iw-warning-status iw-warning-status--' + w.status + '">' + w.status.toUpperCase() + '</div><div class="iw-warning-watch">' + w.watch + '</div><div class="iw-warning-action">' + w.action + '</div></div>';
    }).join("");

    // E. Radar Chart — Iran War Resilience
    var radarScores = {
      "Oil Shock Protection": 6,
      "Safe Haven Coverage": 9,
      "Geographic Diversification": 7,
      "Liquidity Reserve": 9,
      "Currency Hedge": 6,
      "Tail Risk Preparedness": 7
    };
    var radarLabels = Object.keys(radarScores);
    var radarValues = radarLabels.map(function (l) { return radarScores[l]; });

    var ctx2 = document.getElementById("chart-iw-radar").getContext("2d");
    if (charts.iwRadar) charts.iwRadar.destroy();
    charts.iwRadar = new Chart(ctx2, {
      type: "radar",
      data: {
        labels: radarLabels,
        datasets: [{
          label: "KKP Expanded",
          data: radarValues,
          backgroundColor: "rgba(32,128,141,0.15)",
          borderColor: "#20808D",
          borderWidth: 2,
          pointBackgroundColor: "#20808D",
          pointRadius: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: { r: { beginAtZero: true, max: 10, ticks: { stepSize: 2, color: cc.text, backdropColor: "transparent" }, grid: { color: cc.grid }, pointLabels: { color: cc.text, font: { size: 11 } } } },
        plugins: { legend: { display: false } }
      }
    });

    // Resilience bars
    var resEl = document.getElementById("iw-resilience-list");
    resEl.innerHTML = radarLabels.map(function (label) {
      var score = radarScores[label];
      var c = score <= 4 ? "#A84B2F" : score <= 6 ? "#c49a2a" : "#437a22";
      return '<div class="ld-resilience-item"><span class="ld-resilience-label">' + label + '</span><div class="ld-resilience-bar"><div class="ld-resilience-fill" style="width:' + (score * 10) + '%;background:' + c + '"></div></div><span class="ld-resilience-score">' + score + '/10</span></div>';
    }).join("");

    // F. Recommendations
    var recos = [
      { icon: "good", text: '<strong>Gold position (14.43%) is your strongest shield</strong> \u2014 JPMorgan targets $6,300/oz by end-2026. Gold has already surged to $5,400 and benefits from every escalation scenario.' },
      { icon: "good", text: '<strong>Cash buffer (27.20%) provides optionality</strong> \u2014 Fully insulated from market volatility. Ready to deploy at ceasefire for bargain-hunting in beaten-down equities.' },
      { icon: "warn", text: '<strong>European equity (~5.7%) is most vulnerable</strong> \u2014 Europe is \"super dependent on Middle East energy\" per CNBC. Consider trimming 2-3% and rotating into energy/commodities.' },
      { icon: "warn", text: '<strong>Monitor PTT carefully</strong> \u2014 Benefits from elevated energy prices short-term, but Thai economy at risk if oil sustains above $110/barrel (NESDC danger zone).' },
      { icon: "idea", text: '<strong>Add direct energy/commodity exposure (2-3%)</strong> \u2014 XLE, DJP, or GSG would provide a direct hedge against oil spike risk the portfolio currently lacks.' },
      { icon: "idea", text: '<strong>Consider increasing gold to ~17%</strong> \u2014 Fund from European equity trim. Gold benefits in every war scenario and provides insurance against Stage 3 quagmire.' },
      { icon: "idea", text: '<strong>Keep cash deployed in USD</strong> \u2014 Baht has weakened past 32/USD. Offshore USD holdings gain purchasing power as Thailand\'s oil import bill rises.' },
      { icon: "warn", text: '<strong>EM debt holdings small but watch credit deterioration</strong> \u2014 Neuberger Berman EM Debt (0.33%) and SSGA EM Govt Bond (0.64%) could face widening spreads.' }
    ];

    document.getElementById("iw-recommendations").innerHTML = recos.map(function (r) {
      return '<div class="ld-reco-item"><div class="ld-reco-icon ld-reco-icon--' + r.icon + '">' + (r.icon === "warn" ? "!" : r.icon === "good" ? "\u2713" : "\u2606") + '</div><div>' + r.text + '</div></div>';
    }).join("");
  }

  /* ------------------------------------------
     TAB 10: CASH FLOW
  ------------------------------------------ */

  /* Contribution schedule: array of { fromYear, toYear, amount } */
  var cfSchedule = [];
  /* Per-year overrides: { 1: 500000, 5: 0, ... } */
  var cfOverrides = {};

  function getCashFlowInputs() {
    var pvEl = document.getElementById("cf-portfolio-input");
    var exEl = document.getElementById("cf-expense-input");
    var infEl = document.getElementById("cf-inflation-input");
    var retEl = document.getElementById("cf-return-input");
    function parseComma(el) { return parseInt((el ? el.value : "0").replace(/[^0-9]/g, ""), 10) || 0; }
    return {
      portfolio: parseComma(pvEl),
      expense: parseComma(exEl),
      inflation: parseFloat(infEl ? infEl.value : "3") / 100,
      returnRate: parseFloat(retEl ? retEl.value : "6.5") / 100
    };
  }

  /* Resolve contribution for a given year: override > schedule > 0 */
  function getContributionForYear(year) {
    if (cfOverrides.hasOwnProperty(year)) return cfOverrides[year];
    for (var i = 0; i < cfSchedule.length; i++) {
      var s = cfSchedule[i];
      if (year >= s.fromYear && year <= s.toYear) return s.amount;
    }
    return 0;
  }

  function computeCashFlow(p) {
    var rows = [];
    var balance = p.portfolio;
    var totalWithdrawals = 0;
    var totalContributions = 0;
    var depletionYear = null;
    for (var y = 1; y <= 30; y++) {
      var beginning = balance;
      var investReturn = beginning * p.returnRate;
      var expense = p.expense * Math.pow(1 + p.inflation, y - 1);
      var contribution = getContributionForYear(y);
      var ending = beginning + investReturn + contribution - expense;
      totalWithdrawals += expense;
      totalContributions += contribution;
      var isOverridden = cfOverrides.hasOwnProperty(y);
      if (ending < 0 && depletionYear === null) depletionYear = y;
      rows.push({ year: y, beginning: beginning, investReturn: investReturn, contribution: contribution, expense: expense, ending: ending, isOverridden: isOverridden });
      balance = ending;
    }
    return { rows: rows, depletionYear: depletionYear, finalBalance: balance, totalWithdrawals: totalWithdrawals, totalContributions: totalContributions };
  }

  /* --- Schedule Builder --- */
  function renderScheduleRows() {
    var container = document.getElementById("cf-schedule-rows");
    if (!container) return;
    if (cfSchedule.length === 0) {
      container.innerHTML = '<div class="cf-schedule-empty">No contribution periods defined. Click "Add Period" to start.</div>';
    } else {
      container.innerHTML = cfSchedule.map(function (s, idx) {
        return '<div class="cf-schedule-row" data-idx="' + idx + '">' +
          '<span class="cf-sched-label">Year</span>' +
          '<input type="number" class="cf-sched-input cf-sched-input--year cf-sched-from" value="' + s.fromYear + '" min="1" max="30">' +
          '<span class="cf-sched-dash">to</span>' +
          '<input type="number" class="cf-sched-input cf-sched-input--year cf-sched-to" value="' + s.toYear + '" min="1" max="30">' +
          '<span class="cf-sched-label">Amount</span>' +
          '<input type="text" class="cf-sched-input cf-sched-input--amount cf-sched-amount" value="' + s.amount.toLocaleString("en-US") + '" inputmode="numeric">' +
          '<span class="cf-sched-label" style="color:var(--text-muted);font-size:var(--text-xs)">THB/yr</span>' +
          '<button class="cf-sched-remove" data-idx="' + idx + '" title="Remove this period">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
          '</button></div>';
      }).join("");
    }
    renderScheduleSummary();
    bindScheduleEvents();
  }

  function renderScheduleSummary() {
    var summaryEl = document.getElementById("cf-schedule-summary");
    if (!summaryEl) return;
    if (cfSchedule.length === 0) {
      summaryEl.innerHTML = 'No contributions scheduled. All 30 years default to \u0E3F0 unless overridden in the table below.';
      return;
    }
    var parts = cfSchedule.map(function (s) {
      if (s.fromYear === s.toYear) return 'Year ' + s.fromYear + ': \u0E3F' + s.amount.toLocaleString("en-US");
      return 'Years ' + s.fromYear + '\u2013' + s.toYear + ': \u0E3F' + s.amount.toLocaleString("en-US") + '/yr';
    });
    var overrideCount = Object.keys(cfOverrides).length;
    var overrideNote = overrideCount > 0 ? ' <span style="color:var(--accent)">(' + overrideCount + ' manual override' + (overrideCount > 1 ? 's' : '') + ' in table)</span>' : '';
    summaryEl.innerHTML = parts.join(' &nbsp;|&nbsp; ') + overrideNote;
  }

  function bindScheduleEvents() {
    var container = document.getElementById("cf-schedule-rows");
    if (!container) return;

    container.querySelectorAll(".cf-sched-from").forEach(function (el) {
      el.addEventListener("change", function () {
        var idx = parseInt(el.closest(".cf-schedule-row").getAttribute("data-idx"), 10);
        cfSchedule[idx].fromYear = Math.max(1, Math.min(30, parseInt(el.value, 10) || 1));
        el.value = cfSchedule[idx].fromYear;
        renderScheduleSummary();
        renderCashFlow();
      });
    });

    container.querySelectorAll(".cf-sched-to").forEach(function (el) {
      el.addEventListener("change", function () {
        var idx = parseInt(el.closest(".cf-schedule-row").getAttribute("data-idx"), 10);
        cfSchedule[idx].toYear = Math.max(1, Math.min(30, parseInt(el.value, 10) || 1));
        el.value = cfSchedule[idx].toYear;
        renderScheduleSummary();
        renderCashFlow();
      });
    });

    container.querySelectorAll(".cf-sched-amount").forEach(function (el) {
      el.addEventListener("input", function () {
        var idx = parseInt(el.closest(".cf-schedule-row").getAttribute("data-idx"), 10);
        var raw = el.value.replace(/[^0-9]/g, "");
        var num = parseInt(raw, 10) || 0;
        cfSchedule[idx].amount = num;
        var pos = el.selectionStart;
        var oldLen = el.value.length;
        el.value = num.toLocaleString("en-US");
        var newLen = el.value.length;
        el.setSelectionRange(pos + (newLen - oldLen), pos + (newLen - oldLen));
        renderScheduleSummary();
        renderCashFlow();
      });
      el.addEventListener("focus", function () { el.select(); });
    });

    container.querySelectorAll(".cf-sched-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-idx"), 10);
        cfSchedule.splice(idx, 1);
        renderScheduleRows();
        renderCashFlow();
      });
    });
  }

  function addScheduleRow() {
    var lastTo = cfSchedule.length > 0 ? cfSchedule[cfSchedule.length - 1].toYear : 0;
    var from = Math.min(lastTo + 1, 30);
    var to = Math.min(from + 4, 30);
    cfSchedule.push({ fromYear: from, toYear: to, amount: 0 });
    renderScheduleRows();
  }

  /* --- Inline Editing for Contribution Column --- */
  function startInlineEdit(td, year) {
    if (td.querySelector(".cf-inline-input")) return;
    var current = getContributionForYear(year);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "cf-inline-input";
    input.value = current.toLocaleString("en-US");
    input.setAttribute("inputmode", "numeric");
    td.textContent = "";
    td.appendChild(input);
    input.focus();
    input.select();

    function commit() {
      var raw = input.value.replace(/[^0-9]/g, "");
      var num = parseInt(raw, 10) || 0;
      var scheduled = 0;
      for (var i = 0; i < cfSchedule.length; i++) {
        if (year >= cfSchedule[i].fromYear && year <= cfSchedule[i].toYear) { scheduled = cfSchedule[i].amount; break; }
      }
      if (num === scheduled) {
        delete cfOverrides[year];
      } else {
        cfOverrides[year] = num;
      }
      renderScheduleSummary();
      renderCashFlow();
    }

    input.addEventListener("blur", commit);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); input.blur(); }
      if (e.key === "Escape") {
        delete cfOverrides[year]; // revert
        renderScheduleSummary();
        renderCashFlow();
      }
    });
    input.addEventListener("input", function () {
      var pos = input.selectionStart;
      var oldLen = input.value.length;
      var raw = input.value.replace(/[^0-9]/g, "");
      var num = parseInt(raw, 10) || 0;
      input.value = num.toLocaleString("en-US");
      var newLen = input.value.length;
      input.setSelectionRange(pos + (newLen - oldLen), pos + (newLen - oldLen));
    });
  }

  function renderCashFlow() {
    var p = getCashFlowInputs();
    var cf = computeCashFlow(p);
    var cc = getChartColors();

    // KPI cards
    var kpiGrid = document.getElementById("cf-kpi-grid");
    var depLabel = cf.depletionYear ? ("Year " + cf.depletionYear) : "30+ years";
    var depCls = cf.depletionYear ? "negative" : "positive";
    var finalCls = cf.finalBalance >= 0 ? "positive" : "negative";
    kpiGrid.innerHTML = [
      { label: "Years Until Depletion", value: depLabel, cls: depCls },
      { label: "Final Balance (Yr 30)", value: "\u0E3F" + fmt(cf.finalBalance, 0), cls: finalCls },
      { label: "Total Withdrawals", value: "\u0E3F" + fmt(cf.totalWithdrawals, 0), cls: "negative" },
      { label: "Total Contributions", value: "\u0E3F" + fmt(cf.totalContributions, 0), cls: "accent" }
    ].map(function (k) { return '<div class="kpi-card"><span class="kpi-label">' + k.label + '</span><span class="kpi-value ' + k.cls + '">' + k.value + '</span></div>'; }).join("");

    // Chart 1: Portfolio Balance
    var balLabels = ["Year 0"];
    var balData = [p.portfolio];
    cf.rows.forEach(function (r) { balLabels.push("Year " + r.year); balData.push(Math.round(r.ending)); });

    var ctx1 = document.getElementById("chart-cf-balance").getContext("2d");
    if (charts.cfBalance) charts.cfBalance.destroy();

    charts.cfBalance = new Chart(ctx1, {
      type: "line",
      data: {
        labels: balLabels,
        datasets: [
          {
            label: "Portfolio Balance",
            data: balData,
            borderColor: "#20808D",
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 2,
            pointBackgroundColor: function(context) {
              return (context.raw || 0) < 0 ? "#A84B2F" : "#20808D";
            },
            segment: {
              borderColor: function(ctx) {
                return (ctx.p0.parsed.y < 0 || ctx.p1.parsed.y < 0) ? "#A84B2F" : "#20808D";
              }
            },
            fill: {
              target: "origin",
              above: "rgba(32,128,141,0.08)",
              below: "rgba(168,75,47,0.12)"
            }
          },
          {
            label: "Zero Line",
            data: balLabels.map(function() { return 0; }),
            borderColor: "#A84B2F",
            borderWidth: 1,
            borderDash: [4, 4],
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (c) { if (c.datasetIndex === 1) return null; return "Balance: \u0E3F" + fmt(c.raw, 0); } } }
        },
        scales: {
          x: { grid: { color: cc.grid } },
          y: { grid: { color: cc.grid }, ticks: { callback: function (v) { return v >= 1000000 ? "\u0E3F" + (v / 1000000).toFixed(0) + "M" : v <= -1000000 ? "-\u0E3F" + (Math.abs(v) / 1000000).toFixed(0) + "M" : "\u0E3F" + fmt(v, 0); } } }
        }
      }
    });

    // Chart 2: Annual Cash Flow Breakdown (stacked bar)
    var annLabels = cf.rows.map(function (r) { return "Yr " + r.year; });
    var returnData = cf.rows.map(function (r) { return Math.round(r.investReturn); });
    var contribData = cf.rows.map(function (r) { return Math.round(r.contribution); });
    var expenseData = cf.rows.map(function (r) { return -Math.round(r.expense); });

    var ctx2 = document.getElementById("chart-cf-annual").getContext("2d");
    if (charts.cfAnnual) charts.cfAnnual.destroy();
    charts.cfAnnual = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: annLabels,
        datasets: [
          { label: "Investment Return", data: returnData, backgroundColor: "#20808D", borderRadius: 2, borderSkipped: false },
          { label: "Contribution", data: contribData, backgroundColor: "#2d7ec7", borderRadius: 2, borderSkipped: false },
          { label: "Expense Withdrawal", data: expenseData, backgroundColor: "#A84B2F", borderRadius: 2, borderSkipped: false }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" },
          tooltip: { callbacks: { label: function (c) { return c.dataset.label + ": \u0E3F" + fmt(c.raw, 0); } } }
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, grid: { color: cc.grid }, ticks: { callback: function (v) { return v >= 1000000 ? "\u0E3F" + (v / 1000000).toFixed(0) + "M" : v <= -1000000 ? "-\u0E3F" + (Math.abs(v) / 1000000).toFixed(0) + "M" : "\u0E3F" + fmt(v, 0); } } }
        }
      }
    });

    // Table with editable contribution cells
    var tbody = document.getElementById("cf-detail-tbody");
    tbody.innerHTML = cf.rows.map(function (r) {
      var balCls = r.ending >= 0 ? "positive" : "negative";
      var contribDisplay = r.contribution > 0 ? '+\u0E3F' + fmt(r.contribution, 0) : '\u0E3F0';
      var overriddenCls = r.isOverridden ? ' cf-overridden' : '';
      return '<tr>' +
        '<td class="num">' + r.year + '</td>' +
        '<td class="num">\u0E3F' + fmt(r.beginning, 0) + '</td>' +
        '<td class="num positive">+\u0E3F' + fmt(r.investReturn, 0) + '</td>' +
        '<td class="num accent cf-contrib-cell' + overriddenCls + '" data-year="' + r.year + '">' + contribDisplay + '</td>' +
        '<td class="num negative">-\u0E3F' + fmt(r.expense, 0) + '</td>' +
        '<td class="num ' + balCls + '">\u0E3F' + fmt(r.ending, 0) + '</td>' +
        '</tr>';
    }).join("");

    // Bind click events on contribution cells
    tbody.querySelectorAll(".cf-contrib-cell").forEach(function (td) {
      td.addEventListener("click", function () {
        var year = parseInt(td.getAttribute("data-year"), 10);
        startInlineEdit(td, year);
      });
    });
  }

  function initCashFlowInputs() {
    var textInputs = ["cf-portfolio-input", "cf-expense-input"];
    var numberInputs = ["cf-inflation-input", "cf-return-input"];

    function updateAll() {
      textInputs.forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var raw = el.value.replace(/[^0-9]/g, "");
        var num = parseInt(raw, 10) || 0;
        el.value = num.toLocaleString("en-US");
      });
      renderCashFlow();
    }

    textInputs.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", function () {
        var pos = el.selectionStart;
        var oldLen = el.value.length;
        updateAll();
        var newLen = el.value.length;
        el.setSelectionRange(pos + (newLen - oldLen), pos + (newLen - oldLen));
      });
      el.addEventListener("focus", function () { el.select(); });
    });

    numberInputs.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", function () { renderCashFlow(); });
      el.addEventListener("change", function () { renderCashFlow(); });
    });

    // Add Period button
    var addBtn = document.getElementById("cf-add-schedule-row");
    if (addBtn) {
      addBtn.addEventListener("click", function () { addScheduleRow(); });
    }

    // Reset Overrides button
    var resetBtn = document.getElementById("cf-reset-overrides");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        cfOverrides = {};
        renderScheduleSummary();
        renderCashFlow();
      });
    }

    // Render initial schedule
    renderScheduleRows();
  }

  /* ------------------------------------------
     INIT
  ------------------------------------------ */
  function init() {
    initThemeToggle();
    initNavigation();
    renderKPIs();
    renderSleeveDonut();
    renderHoldingsBar();
    renderHoldingsTable();
    initTableSort();

    var hash = window.location.hash.replace("#", "");
    if (hash && tabInitialized.hasOwnProperty(hash)) {
      switchTab(hash);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
