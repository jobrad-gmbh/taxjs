var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "big.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lohnsteuer2015DezemberBig = void 0;
    var big_js_1 = __importDefault(require("big.js"));
    /**
    * Steuerberechnungsklasse.
    *
    * Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
    *
    */
    var Lohnsteuer2015DezemberBig = /** @class */ (function () {
        function Lohnsteuer2015DezemberBig() {
            this.Z_0 = new big_js_1.default(0);
            this.Z_1 = new big_js_1.default(1);
            this.Z_10 = new big_js_1.default(10);
            /**  Stand: 2015-11-16  */
            /**  ZIVIT Düsseldorf */
            /**   EINGABEPARAMETER   */
            /**  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)  */
            this.af = 1.0;
            /**  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent  */
            this.ENTSCH = this.Z_0;
            /**  eingetragener Faktor mit drei Nachkommastellen  */
            this.f = 1.0;
            /**  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
                 Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
                 als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
                 als Monatsbetrag anzugeben). */
            this.PKPV = this.Z_0;
            /**  Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
                 2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss  */
            this.PKV = 0;
            /**  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären, sonst 0.  */
            this.PVS = 0;
            /**  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat, sonst 0.  */
            this.PVZ = 0;
            /**  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent  */
            this.JRE4ENT = this.Z_0;
            /**  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent  */
            this.SONSTENT = this.Z_0;
            /**   AUSGABEPARAMETER   */
            /**  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents  */
            this.BK = this.Z_0;
            /**  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
                 fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents  */
            this.BKS = this.Z_0;
            this.BKV = this.Z_0;
            /**  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents  */
            this.LSTLZZ = this.Z_0;
            /**  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
                 in Cents  */
            this.SOLZLZZ = this.Z_0;
            /**  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
                 Taetigkeit) in Cents  */
            this.SOLZS = this.Z_0;
            /**  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
                 Cents  */
            this.SOLZV = this.Z_0;
            /**  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
                 Taetigkeit) in Cents  */
            this.STS = this.Z_0;
            /**  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents  */
            this.STV = this.Z_0;
            /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
                 privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
                 die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
                 steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
                 steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
                 VKVSONST  */
            this.VKVLZZ = this.Z_0;
            /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers
                 zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
                 auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
                 auch negativ sein. Für tarifermäßigt zu besteuernde Vergütungen für mehrjährige
                 Tätigkeiten enthält der PAP keinen entsprechenden Ausgabewert.  */
            this.VKVSONST = this.Z_0;
            /**   INTERNE FELDER   */
            /**  spezielles ZVE f. Einkommensteuer-Berechnung, dieses darf negativ werden.  */
            this.zveEkSt = this.Z_0;
            this.zveGemeinsam = this.Z_0;
            /**  Altersentlastungsbetrag nach Alterseinkünftegesetz in €,
                 Cent (2 Dezimalstellen)  */
            this.ALTE = this.Z_0;
            /**  Arbeitnehmer-Pauschbetrag in EURO  */
            this.ANP = this.Z_0;
            /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
                 auf ganze Cents abgerundet  */
            this.ANTEIL1 = this.Z_0;
            /**  Bemessungsgrundlage für Altersentlastungsbetrag in €, Cent
                 (2 Dezimalstellen)  */
            this.BMG = this.Z_0;
            /**  Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung
                und der sozialen Pflegeversicherung in Euro  */
            this.BBGKVPV = this.Z_0;
            /**  allgemeine Beitragsbemessungsgrenze in der allgemeinen Renten-versicherung in Euro  */
            this.BBGRV = this.Z_0;
            /**  Differenz zwischen ST1 und ST2 in EURO  */
            this.DIFF = this.Z_0;
            /**  Entlastungsbetrag fuer Alleinerziehende in EURO  */
            this.EFA = this.Z_0;
            /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen)  */
            this.FVB = this.Z_0;
            /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen) für die Berechnung
                 der Lohnsteuer für den sonstigen Bezug  */
            this.FVBSO = this.Z_0;
            /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
            this.FVBZ = this.Z_0;
            /**  Zuschlag zum Versorgungsfreibetrag in EURO fuer die Berechnung
                 der Lohnsteuer beim sonstigen Bezug  */
            this.FVBZSO = this.Z_0;
            /**  Maximaler Altersentlastungsbetrag in €  */
            this.HBALTE = this.Z_0;
            /**  Massgeblicher maximaler Versorgungsfreibetrag in €  */
            this.HFVB = this.Z_0;
            /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €,Cent
                 (2 Dezimalstellen)  */
            this.HFVBZ = this.Z_0;
            /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €, Cent
                 (2 Dezimalstellen) für die Berechnung der Lohnsteuer für den
                 sonstigen Bezug  */
            this.HFVBZSO = this.Z_0;
            /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
            this.J = 0;
            /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
                 Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
            this.JBMG = this.Z_0;
            /**  Auf einen Jahreslohn hochgerechneter LZZFREIB in €, Cent
                 (2 Dezimalstellen)  */
            this.JLFREIB = this.Z_0;
            /**  Auf einen Jahreslohn hochgerechnete LZZHINZU in €, Cent
                 (2 Dezimalstellen)  */
            this.JLHINZU = this.Z_0;
            /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
                 UPANTEIL errechnet werden soll in Cents  */
            this.JW = this.Z_0;
            /**  Jahreswert Lohnsteuer vor KiFBG in Cent  */
            this.JWLSTA = this.Z_0; /**  Neu 2015  */
            /**  Jahreswert Lohnsteuer unter Berücksichtigung des KiFBG in Cent */
            this.JWLSTN = this.Z_0; /**  Neu 2015  */
            /**  Jahreswert Solidaritätszuschlag vor KiFBG in Cent  */
            this.JWSOLZA = this.Z_0; /**  Neu 2015  */
            /**  Jahreswert Solidaritätszuschlag unter Berücksichtigung des KiFBG in Cent */
            this.JWSOLZN = this.Z_0; /**  Neu 2015  */
            /**  Jahreswert Bemessungsgrundlage Kirchensteuer vor KiFBG in Cent  */
            this.JWBKA = this.Z_0; /**  Neu 2015  */
            /** Jahreswert Bemessungsgrundlage Kirchensteuer unter Berücksich-tigung des KiFBG in Cent  */
            this.JWBKN = this.Z_0; /**  Neu 2015  */
            /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
            this.K = 0;
            /**  Merker für Berechnung Lohnsteuer für mehrjährige Tätigkeit.
                 0 = normale Steuerberechnung
                 1 = Steuerberechnung für mehrjährige Tätigkeit
                 2 = entfällt  */
            this.KENNVMT = 0;
            /**  Summe der Freibetraege fuer Kinder in EURO  */
            this.KFB = this.Z_0;
            /**  Beitragssatz des Arbeitgebers zur Krankenversicherung  */
            this.KVSATZAG = this.Z_0;
            /**  Beitragssatz des Arbeitnehmers zur Krankenversicherung  */
            this.KVSATZAN = this.Z_0;
            /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
                  1 = Grundtabelle
                  2 = Splittingtabelle  */
            this.KZTAB = 0;
            /**  Jahreslohnsteuer in EURO  */
            this.LSTJAHR = this.Z_0;
            /**  Zwischenfelder der Jahreslohnsteuer in Cent  */
            this.LST1 = this.Z_0;
            this.LST2 = this.Z_0;
            this.LST3 = this.Z_0;
            this.LSTOSO = this.Z_0;
            this.LSTSO = this.Z_0;
            /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
            this.MIST = this.Z_0;
            /**  Beitragssatz des Arbeitgebers zur Pflegeversicherung  */
            this.PVSATZAG = this.Z_0;
            /**  Beitragssatz des Arbeitnehmers zur Pflegeversicherung  */
            this.PVSATZAN = this.Z_0;
            /**  Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)   */
            this.RVSATZAN = this.Z_0;
            /**  Rechenwert in Gleitkommadarstellung  */
            this.RW = this.Z_0;
            /**  Sonderausgaben-Pauschbetrag in EURO  */
            this.SAP = this.Z_0;
            /**  Schleifenzähler für Differenzberechnung  */
            this.SCHLEIFZ = 0; /**  Neu 2015  */
            /**  Freigrenze fuer den Solidaritaetszuschlag in EURO  */
            this.SOLZFREI = this.Z_0;
            /**  Solidaritaetszuschlag auf die Jahreslohnsteuer in EURO, C (2 Dezimalstellen)  */
            this.SOLZJ = this.Z_0;
            /**  Zwischenwert fuer den Solidaritaetszuschlag auf die Jahreslohnsteuer
                 in EURO, C (2 Dezimalstellen)  */
            this.SOLZMIN = this.Z_0;
            /**  Tarifliche Einkommensteuer in EURO  */
            this.ST = this.Z_0;
            /**  Tarifliche Einkommensteuer auf das 1,25-fache ZX in EURO  */
            this.ST1 = this.Z_0;
            /**  Tarifliche Einkommensteuer auf das 0,75-fache ZX in EURO  */
            this.ST2 = this.Z_0;
            /**  Zwischenfeld zur Ermittlung der Steuer auf Vergütungen für mehrjährige Tätigkeit  */
            this.STOVMT = this.Z_0;
            /**  Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung (2 Dezimalstellen)  */
            this.TBSVORV = this.Z_0;
            /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cents  */
            this.VBEZB = this.Z_0;
            /**  Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für
                 den sonstigen Bezug  */
            this.VBEZBSO = this.Z_0;
            /**  Hoechstbetrag der Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
            this.VHB = this.Z_0;
            /**  Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
            this.VSP = this.Z_0;
            /**  Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
            this.VSPN = this.Z_0;
            /**  Zwischenwert 1 bei der Berechnung der Vorsorgepauschale nach
                 dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
            this.VSP1 = this.Z_0;
            /**  Zwischenwert 2 bei der Berechnung der Vorsorgepauschale nach
                 dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
            this.VSP2 = this.Z_0;
            /**  Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken- und
                 soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die
                 private Basiskrankenversicherung und private Pflege-Pflichtversicherung
                 in Euro, Cent (2 Dezimalstellen)  */
            this.VSP3 = this.Z_0;
            /**  Erster Grenzwert in Steuerklasse V/VI in Euro  */
            this.W1STKL5 = this.Z_0; /**  Neu 2015  */
            /**  Zweiter Grenzwert in Steuerklasse V/VI in Euro  */
            this.W2STKL5 = this.Z_0; /**  Neu 2015  */
            /**  Dritter Grenzwert in Steuerklasse V/VI in Euro  */
            this.W3STKL5 = this.Z_0; /**  Neu 2015  */
            /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 3 EStG in EURO  */
            this.VSPKURZ = this.Z_0;
            /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 2 EStG in EURO  */
            this.VSPMAX1 = this.Z_0;
            /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 3 EStG in EURO  */
            this.VSPMAX2 = this.Z_0;
            /**  Vorsorgepauschale nach § 10c Abs. 2 Satz 2 EStG vor der Hoechstbetragsberechnung
                 in EURO, C (2 Dezimalstellen)  */
            this.VSPO = this.Z_0;
            /**  Fuer den Abzug nach § 10c Abs. 2 Nrn. 2 und 3 EStG verbleibender
                 Rest von VSPO in EURO, C (2 Dezimalstellen)  */
            this.VSPREST = this.Z_0;
            /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 1 EStG
                 in EURO, C (2 Dezimalstellen)  */
            this.VSPVOR = this.Z_0;
            /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG €, C
                 (2 Dezimalstellen)  */
            this.X = this.Z_0;
            /**  gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
            this.Y = this.Z_0;
            /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
                 nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4.  */
            this.ZRE4 = this.Z_0;
            /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)  */
            this.ZRE4J = this.Z_0;
            /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
                 nach Abzug des Versorgungsfreibetrags und des Alterentlastungsbetrags
                 zur Berechnung der Vorsorgepauschale in €, Cent (2 Dezimalstellen)  */
            this.ZRE4VP = this.Z_0;
            /**  Merkfeld ZRE4VP für Schleifenberechnung Dezember 2015 in Euro, Cent (2 Dezimalstellen)  */
            this.ZRE4VPM = this.Z_0; /**  Neu 2015  */
            /**  Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in €, Cent
                 (2 Dezimalstellen)  */
            this.ZTABFB = this.Z_0;
            /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
                 EURO, C (2 Dezimalstellen)  */
            this.ZVBEZ = this.Z_0;
            /**  Auf einen Jahreslohn hochgerechnetes VBEZ in €, C (2 Dezimalstellen)  */
            this.ZVBEZJ = this.Z_0;
            /**  Zu versteuerndes Einkommen in €, C (2 Dezimalstellen)  */
            this.ZVE = this.Z_0;
            /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach § 39b
                 Abs. 2 Satz 7 EStG in €  */
            this.ZX = this.Z_0;
            this.ZZX = this.Z_0;
            this.HOCH = this.Z_0;
            this.VERGL = this.Z_0;
            /**  Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und
                 privaten Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale) in Cent.  */
            this.VKV = this.Z_0;
            /**  Tabelle fuer die Vomhundertsaetze des Versorgungsfreibetrags  */
            this.TAB1 = [new big_js_1.default(0.0), new big_js_1.default(0.4), new big_js_1.default(0.384), new big_js_1.default(0.368), new big_js_1.default(0.352), new big_js_1.default(0.336), new big_js_1.default(0.32), new big_js_1.default(0.304), new big_js_1.default(0.288), new big_js_1.default(0.272), new big_js_1.default(0.256), new big_js_1.default(0.24), new big_js_1.default(0.224), new big_js_1.default(0.208), new big_js_1.default(0.192), new big_js_1.default(0.176), new big_js_1.default(0.16), new big_js_1.default(0.152), new big_js_1.default(0.144), new big_js_1.default(0.136), new big_js_1.default(0.128), new big_js_1.default(0.12), new big_js_1.default(0.112), new big_js_1.default(0.104), new big_js_1.default(0.096), new big_js_1.default(0.088), new big_js_1.default(0.08), new big_js_1.default(0.072), new big_js_1.default(0.064), new big_js_1.default(0.056), new big_js_1.default(0.048), new big_js_1.default(0.04), new big_js_1.default(0.032), new big_js_1.default(0.024), new big_js_1.default(0.016), new big_js_1.default(0.008), new big_js_1.default(0.0)];
            /**  Tabelle fuer die Hoechstbetrage des Versorgungsfreibetrags  */
            this.TAB2 = [new big_js_1.default(0), new big_js_1.default(3000), new big_js_1.default(2880), new big_js_1.default(2760), new big_js_1.default(2640), new big_js_1.default(2520), new big_js_1.default(2400), new big_js_1.default(2280), new big_js_1.default(2160), new big_js_1.default(2040), new big_js_1.default(1920), new big_js_1.default(1800), new big_js_1.default(1680), new big_js_1.default(1560), new big_js_1.default(1440), new big_js_1.default(1320), new big_js_1.default(1200), new big_js_1.default(1140), new big_js_1.default(1080), new big_js_1.default(1020), new big_js_1.default(960), new big_js_1.default(900), new big_js_1.default(840), new big_js_1.default(780), new big_js_1.default(720), new big_js_1.default(660), new big_js_1.default(600), new big_js_1.default(540), new big_js_1.default(480), new big_js_1.default(420), new big_js_1.default(360), new big_js_1.default(300), new big_js_1.default(240), new big_js_1.default(180), new big_js_1.default(120), new big_js_1.default(60), new big_js_1.default(0)];
            /**  Tabelle fuer die Zuschlaege zum Versorgungsfreibetrag  */
            this.TAB3 = [new big_js_1.default(0), new big_js_1.default(900), new big_js_1.default(864), new big_js_1.default(828), new big_js_1.default(792), new big_js_1.default(756), new big_js_1.default(720), new big_js_1.default(684), new big_js_1.default(648), new big_js_1.default(612), new big_js_1.default(576), new big_js_1.default(540), new big_js_1.default(504), new big_js_1.default(468), new big_js_1.default(432), new big_js_1.default(396), new big_js_1.default(360), new big_js_1.default(342), new big_js_1.default(324), new big_js_1.default(306), new big_js_1.default(288), new big_js_1.default(270), new big_js_1.default(252), new big_js_1.default(234), new big_js_1.default(216), new big_js_1.default(198), new big_js_1.default(180), new big_js_1.default(162), new big_js_1.default(144), new big_js_1.default(126), new big_js_1.default(108), new big_js_1.default(90), new big_js_1.default(72), new big_js_1.default(54), new big_js_1.default(36), new big_js_1.default(18), new big_js_1.default(0)];
            /**  Tabelle fuer die Vomhundertsaetze des Altersentlastungsbetrags  */
            this.TAB4 = [new big_js_1.default(0.0), new big_js_1.default(0.4), new big_js_1.default(0.384), new big_js_1.default(0.368), new big_js_1.default(0.352), new big_js_1.default(0.336), new big_js_1.default(0.32), new big_js_1.default(0.304), new big_js_1.default(0.288), new big_js_1.default(0.272), new big_js_1.default(0.256), new big_js_1.default(0.24), new big_js_1.default(0.224), new big_js_1.default(0.208), new big_js_1.default(0.192), new big_js_1.default(0.176), new big_js_1.default(0.16), new big_js_1.default(0.152), new big_js_1.default(0.144), new big_js_1.default(0.136), new big_js_1.default(0.128), new big_js_1.default(0.12), new big_js_1.default(0.112), new big_js_1.default(0.104), new big_js_1.default(0.096), new big_js_1.default(0.088), new big_js_1.default(0.08), new big_js_1.default(0.072), new big_js_1.default(0.064), new big_js_1.default(0.056), new big_js_1.default(0.048), new big_js_1.default(0.04), new big_js_1.default(0.032), new big_js_1.default(0.024), new big_js_1.default(0.016), new big_js_1.default(0.008), new big_js_1.default(0.0)];
            /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
            this.TAB5 = [new big_js_1.default(0), new big_js_1.default(1900), new big_js_1.default(1824), new big_js_1.default(1748), new big_js_1.default(1672), new big_js_1.default(1596), new big_js_1.default(1520), new big_js_1.default(1444), new big_js_1.default(1368), new big_js_1.default(1292), new big_js_1.default(1216), new big_js_1.default(1140), new big_js_1.default(1064), new big_js_1.default(988), new big_js_1.default(912), new big_js_1.default(836), new big_js_1.default(760), new big_js_1.default(722), new big_js_1.default(684), new big_js_1.default(646), new big_js_1.default(608), new big_js_1.default(570), new big_js_1.default(532), new big_js_1.default(494), new big_js_1.default(456), new big_js_1.default(418), new big_js_1.default(380), new big_js_1.default(342), new big_js_1.default(304), new big_js_1.default(266), new big_js_1.default(228), new big_js_1.default(190), new big_js_1.default(152), new big_js_1.default(114), new big_js_1.default(76), new big_js_1.default(38), new big_js_1.default(0)];
            /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
            this.ZAHL0 = this.Z_0;
            this.ZAHL1 = this.Z_1;
            this.ZAHL2 = new big_js_1.default(2);
            this.ZAHL3 = new big_js_1.default(3);
            this.ZAHL4 = new big_js_1.default(4);
            this.ZAHL5 = new big_js_1.default(5);
            this.ZAHL6 = new big_js_1.default(6);
            this.ZAHL7 = new big_js_1.default(7);
            this.ZAHL8 = new big_js_1.default(8);
            this.ZAHL9 = new big_js_1.default(9);
            this.ZAHL10 = this.Z_10;
            this.ZAHL11 = new big_js_1.default(11);
            this.ZAHL12 = new big_js_1.default(12);
            this.ZAHL100 = new big_js_1.default(100);
            this.ZAHL360 = new big_js_1.default(360);
            this.ZAHL500 = new big_js_1.default(500);
            this.ZAHL700 = new big_js_1.default(700);
            this.ZAHL1000 = new big_js_1.default(1000);
        }
        /**  PROGRAMMABLAUFPLAN, PAP Seite 14  */
        Lohnsteuer2015DezemberBig.prototype.calculate = function () {
            this.MPARA();
            this.MRE4JL();
            this.VBEZBSO = this.Z_0;
            this.KENNVMT = 0;
            this.MRE4();
            this.MRE4ABZ();
            /**  Anfang Neu 2015  */
            this.ZRE4VPM = this.ZRE4VP;
            this.SCHLEIFZ = 1;
            this.MBERECH();
            this.SCHLEIFZ = 2;
            this.W1STKL5 = new big_js_1.default(9873);
            this.ZRE4VP = this.ZRE4VPM;
            this.MBERECH();
            this.MLST1215();
            /**  Ende Neu 2015   */
            /**
            <EXECUTE method="MZTABFB"/>
            <EXECUTE method="MLSTJAHR"/>
            <EVAL exec="LSTJAHR= ST.multiply(BigDecimal.valueOf(f)).setScale(0,BigDecimal.ROUND_DOWN)"/>
            <EVAL exec="JW= LSTJAHR.multiply(ZAHL100)"/>
            <EXECUTE method="UPLSTLZZ"/>
            <EXECUTE method="UPVKVLZZ"/>
        
            <IF expr="ZKF.compareTo (BigDecimal.ZERO) == 1">
              <THEN>
                    <EVAL exec="ZTABFB= (ZTABFB.add (KFB)).setScale (2, BigDecimal.ROUND_DOWN)"/>
                    <EXECUTE method="MRE4ABZ"/>
                    <EXECUTE method="MLSTJAHR"/>
                    <EVAL exec="JBMG= ST.multiply(BigDecimal.valueOf(f)).setScale(0, BigDecimal.ROUND_DOWN)"/>
              </THEN>
              <ELSE>
                    <EVAL exec="JBMG= LSTJAHR"/>
              </ELSE>
            </IF>
            <EXECUTE method="MSOLZ"/>
             */
            this.MSONST();
            this.MVMT();
        };
        /**  Zuweisung von Werten für bestimmte Sozialversicherungsparameter  PAP Seite 15  */
        Lohnsteuer2015DezemberBig.prototype.MPARA = function () {
            if (this.KRV < 2) { /**  &lt; = <  */
                if (this.KRV == 0) {
                    this.BBGRV = new big_js_1.default(72600);
                }
                else {
                    this.BBGRV = new big_js_1.default(62400);
                }
                this.RVSATZAN = new big_js_1.default(0.0935);
                this.TBSVORV = new big_js_1.default(0.60);
            }
            else {
                /**  Nichts zu tun  */
            }
            this.BBGKVPV = new big_js_1.default(49500);
            this.KVSATZAN = (this.KVZ.div(this.ZAHL100)).add(new big_js_1.default(0.07));
            this.KVSATZAG = new big_js_1.default(0.07);
            if (this.PVS == 1) {
                this.PVSATZAN = new big_js_1.default(0.01675);
                this.PVSATZAG = new big_js_1.default(0.00675);
            }
            else {
                this.PVSATZAN = new big_js_1.default(0.01175);
                this.PVSATZAG = new big_js_1.default(0.01175);
            }
            if (this.PVZ == 1) {
                this.PVSATZAN = this.PVSATZAN.add(new big_js_1.default(0.0025));
            }
            /**  Anfang Neu 2015  */
            this.W1STKL5 = new big_js_1.default(9763);
            this.W2STKL5 = new big_js_1.default(26441);
            this.W3STKL5 = new big_js_1.default(200584);
            /**  Ende Neu 2015  */
        };
        /**  Ermittlung des Jahresarbeitslohns nach § 39 b Abs. 2 Satz 2 EStG, PAP Seite 16  */
        Lohnsteuer2015DezemberBig.prototype.MRE4JL = function () {
            if (this.LZZ == 1) {
                this.ZRE4J = this.RE4.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                this.ZVBEZJ = this.VBEZ.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                this.JLFREIB = this.LZZFREIB.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                this.JLHINZU = this.LZZHINZU.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
            }
            else {
                if (this.LZZ == 2) {
                    this.ZRE4J = (this.RE4.mul(this.ZAHL12)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                    this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL12)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                    this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL12)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                    this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL12)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                }
                else {
                    if (this.LZZ == 3) {
                        this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL700).round(2, big_js_1.default.roundDown);
                        this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL700).round(2, big_js_1.default.roundDown);
                        this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL700).round(2, big_js_1.default.roundDown);
                        this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL700).round(2, big_js_1.default.roundDown);
                    }
                    else {
                        this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                        this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                        this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                        this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                    }
                }
            }
            if (this.af == 0) {
                this.f = 1;
            }
        };
        /**  Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 17  */
        Lohnsteuer2015DezemberBig.prototype.MRE4 = function () {
            if (this.ZVBEZJ.cmp(this.Z_0) == 0) {
                this.FVBZ = this.Z_0;
                this.FVB = this.Z_0;
                this.FVBZSO = this.Z_0;
                this.FVBSO = this.Z_0;
            }
            else {
                if (this.VJAHR < 2006) {
                    this.J = 1;
                }
                else {
                    if (this.VJAHR < 2040) {
                        this.J = this.VJAHR - 2004;
                    }
                    else {
                        this.J = 36;
                    }
                }
                if (this.LZZ == 1) {
                    this.VBEZB = (this.VBEZM.mul(new big_js_1.default(this.ZMVB))).add(this.VBEZS);
                    this.HFVB = this.TAB2[this.J].div(this.ZAHL12).mul(new big_js_1.default(this.ZMVB));
                    this.FVBZ = this.TAB3[this.J].div(this.ZAHL12).mul(new big_js_1.default(this.ZMVB)).round(0, big_js_1.default.roundUp);
                }
                else {
                    this.VBEZB = ((this.VBEZM.mul(this.ZAHL12)).add(this.VBEZS)).round(2, big_js_1.default.roundDown);
                    this.HFVB = this.TAB2[this.J];
                    this.FVBZ = this.TAB3[this.J];
                }
                this.FVB = ((this.VBEZB.mul(this.TAB1[this.J]))).div(this.ZAHL100).round(2, big_js_1.default.roundUp);
                if (this.FVB.cmp(this.HFVB) == 1) {
                    this.FVB = this.HFVB;
                }
                this.FVBSO = (this.FVB.add((this.VBEZBSO.mul(this.TAB1[this.J])).div(this.ZAHL100))).round(2, big_js_1.default.roundUp);
                if (this.FVBSO.cmp(this.TAB2[this.J]) == 1) {
                    this.FVBSO = this.TAB2[this.J];
                }
                this.HFVBZSO = (((this.VBEZB.add(this.VBEZBSO)).div(this.ZAHL100)).sub(this.FVBSO)).round(2, big_js_1.default.roundDown);
                this.FVBZSO = (this.FVBZ.add((this.VBEZBSO).div(this.ZAHL100))).round(0, big_js_1.default.roundUp);
                if (this.FVBZSO.cmp(this.HFVBZSO) == 1) {
                    this.FVBZSO = this.HFVBZSO.round(0, big_js_1.default.roundUp);
                }
                if (this.FVBZSO.cmp(this.TAB3[this.J]) == 1) {
                    this.FVBZSO = this.TAB3[this.J];
                }
                this.HFVBZ = ((this.VBEZB.div(this.ZAHL100)).sub(this.FVB)).round(2, big_js_1.default.roundDown);
                if (this.FVBZ.cmp(this.HFVBZ) == 1) {
                    this.FVBZ = this.HFVBZ.round(0, big_js_1.default.roundUp);
                }
            }
            this.MRE4ALTE();
        };
        /**  Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 18  */
        Lohnsteuer2015DezemberBig.prototype.MRE4ALTE = function () {
            if (this.ALTER1 == 0) {
                this.ALTE = this.Z_0;
            }
            else {
                if (this.AJAHR < 2006) {
                    this.K = 1;
                }
                else {
                    if (this.AJAHR < 2040) {
                        this.K = this.AJAHR - 2004;
                    }
                    else {
                        this.K = 36;
                    }
                }
                this.BMG = this.ZRE4J.sub(this.ZVBEZJ);
                /**  Lt. PAP muss hier auf ganze EUR gerundet werden  */
                this.ALTE = (this.BMG.mul(this.TAB4[this.K])).round(0, big_js_1.default.roundUp);
                this.HBALTE = this.TAB5[this.K];
                if (this.ALTE.cmp(this.HBALTE) == 1) {
                    this.ALTE = this.HBALTE;
                }
            }
        };
        /**  Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 20  */
        Lohnsteuer2015DezemberBig.prototype.MRE4ABZ = function () {
            this.ZRE4 = (this.ZRE4J.sub(this.FVB).sub(this.ALTE).sub(this.JLFREIB).add(this.JLHINZU)).round(2, big_js_1.default.roundDown);
            if (this.ZRE4.cmp(this.Z_0) == -1) {
                this.ZRE4 = this.Z_0;
            }
            this.ZRE4VP = this.ZRE4J;
            if (this.KENNVMT == 2) {
                this.ZRE4VP = this.ZRE4VP.sub(this.ENTSCH.div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
            }
            this.ZVBEZ = this.ZVBEZJ.sub(this.FVB).round(2, big_js_1.default.roundDown);
            if (this.ZVBEZ.cmp(this.Z_0) == -1) {
                this.ZVBEZ = this.Z_0;
            }
        };
        /**  Komplett Neu 2015  */
        /**  LohnzahlungszeitraumSchleife für Differenzrechnung Dezember 2015 Seite 21  */
        Lohnsteuer2015DezemberBig.prototype.MBERECH = function () {
            if (this.SCHLEIFZ == 1) {
                this.MZTABFBA();
            }
            else {
                this.MZTABFBN();
            }
            this.MLSTJAHR();
            this.LSTJAHR = (this.ST.mul(new big_js_1.default(this.f))).round(0, big_js_1.default.roundDown);
            this.UPLSTLZZ();
            this.UPVKVLZZ();
            if (this.ZKF.cmp(this.Z_0) == 1) { /**  ZKF > 0  */
                this.ZTABFB = this.ZTABFB.add(this.KFB);
                this.MRE4ABZ();
                this.MLSTJAHR();
                this.JBMG = (this.ST.mul(new big_js_1.default(this.f))).round(0, big_js_1.default.roundDown);
            }
            else {
                this.JBMG = this.LSTJAHR;
            }
            this.MSOLZ();
        };
        /**  Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 22  */
        Lohnsteuer2015DezemberBig.prototype.MZTABFBA = function () {
            this.ANP = this.Z_0;
            if (this.ZVBEZ.cmp(this.Z_0) >= 0 && this.ZVBEZ.cmp(this.FVBZ) == -1) {
                this.FVBZ = new big_js_1.default(this.ZVBEZ.toNumber());
            }
            if (this.STKL < 6) {
                if (this.ZVBEZ.cmp(this.Z_0) == 1) {
                    if ((this.ZVBEZ.sub(this.FVBZ)).cmp(new big_js_1.default(102)) == -1) {
                        this.ANP = (this.ZVBEZ.sub(this.FVBZ)).round(0, big_js_1.default.roundUp);
                    }
                    else {
                        this.ANP = new big_js_1.default(102);
                    }
                }
            }
            else {
                this.FVBZ = new big_js_1.default(0);
                this.FVBZSO = new big_js_1.default(0);
            }
            if (this.STKL < 6) {
                if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
                    if (this.ZRE4.sub(this.ZVBEZ).cmp(this.ZAHL1000) == -1) {
                        this.ANP = this.ANP.add(this.ZRE4).sub(this.ZVBEZ).round(0, big_js_1.default.roundUp);
                    }
                    else {
                        this.ANP = this.ANP.add(this.ZAHL1000);
                    }
                }
            }
            this.KZTAB = 1;
            if (this.STKL == 1) {
                this.SAP = new big_js_1.default(36);
                this.KFB = (this.ZKF.mul(new big_js_1.default(7008))).round(0, big_js_1.default.roundDown);
            }
            else {
                if (this.STKL == 2) {
                    this.EFA = new big_js_1.default(1308);
                    this.SAP = new big_js_1.default(36);
                    this.KFB = (this.ZKF.mul(new big_js_1.default(7008))).round(0, big_js_1.default.roundDown);
                }
                else {
                    if (this.STKL == 3) {
                        this.KZTAB = 2;
                        this.SAP = new big_js_1.default(36);
                        this.KFB = (this.ZKF.mul(new big_js_1.default(7008))).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        if (this.STKL == 4) {
                            this.SAP = new big_js_1.default(36);
                            this.KFB = (this.ZKF.mul(new big_js_1.default(3504))).round(0, big_js_1.default.roundDown);
                        }
                        else {
                            if (this.STKL == 5) {
                                this.SAP = new big_js_1.default(36);
                                this.KFB = this.Z_0;
                            }
                            else {
                                this.KFB = this.Z_0;
                            }
                        }
                    }
                }
            }
            this.ZTABFB = (this.EFA.add(this.ANP).add(this.SAP).add(this.FVBZ)).round(2, big_js_1.default.roundDown);
        };
        /**  Komplett Neu 2015  */
        /**  Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 23  */
        Lohnsteuer2015DezemberBig.prototype.MZTABFBN = function () {
            this.ANP = this.Z_0;
            if (this.ZVBEZ.cmp(this.Z_0) >= 0 && this.ZVBEZ.cmp(this.FVBZ) == -1) {
                this.FVBZ = new big_js_1.default(this.ZVBEZ.toNumber());
            }
            if (this.STKL < 6) {
                if (this.ZVBEZ.cmp(this.Z_0) == 1) {
                    if ((this.ZVBEZ.sub(this.FVBZ)).cmp(new big_js_1.default(102)) == -1) {
                        this.ANP = (this.ZVBEZ.sub(this.FVBZ)).round(0, big_js_1.default.roundUp);
                    }
                    else {
                        this.ANP = new big_js_1.default(102);
                    }
                }
            }
            else {
                this.FVBZ = new big_js_1.default(0);
                this.FVBZSO = new big_js_1.default(0);
            }
            if (this.STKL < 6) {
                if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
                    if (this.ZRE4.sub(this.ZVBEZ).cmp(this.ZAHL1000) == -1) {
                        this.ANP = this.ANP.add(this.ZRE4).sub(this.ZVBEZ).round(0, big_js_1.default.roundUp);
                    }
                    else {
                        this.ANP = this.ANP.add(this.ZAHL1000);
                    }
                }
            }
            this.KZTAB = 1;
            if (this.STKL == 1) {
                this.SAP = new big_js_1.default(36);
                this.KFB = (this.ZKF.mul(new big_js_1.default(7152))).round(0, big_js_1.default.roundDown);
            }
            else {
                if (this.STKL == 2) {
                    this.EFA = new big_js_1.default(1908);
                    this.SAP = new big_js_1.default(36);
                    this.KFB = (this.ZKF.mul(new big_js_1.default(7152))).round(0, big_js_1.default.roundDown);
                }
                else {
                    if (this.STKL == 3) {
                        this.KZTAB = 2;
                        this.SAP = new big_js_1.default(36);
                        this.KFB = (this.ZKF.mul(new big_js_1.default(7152))).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        if (this.STKL == 4) {
                            this.SAP = new big_js_1.default(36);
                            this.KFB = (this.ZKF.mul(new big_js_1.default(3576))).round(0, big_js_1.default.roundDown);
                        }
                        else {
                            if (this.STKL == 5) {
                                this.SAP = new big_js_1.default(36);
                                this.KFB = this.Z_0;
                            }
                            else {
                                this.KFB = this.Z_0;
                            }
                        }
                    }
                }
            }
            this.ZTABFB = (this.EFA.add(this.ANP).add(this.SAP).add(this.FVBZ)).round(2, big_js_1.default.roundDown);
        };
        /**  Ermittlung Jahreslohnsteuer, PAP Seite 24  */
        Lohnsteuer2015DezemberBig.prototype.MLSTJAHR = function () {
            this.UPEVP();
            if (this.KENNVMT != 1) {
                this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP)).round(2, big_js_1.default.roundDown);
                this.UPMLST();
            }
            else {
                this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP).sub((this.VMT).div(this.ZAHL100)).sub((this.VKAPA).div(this.ZAHL100))).round(2, big_js_1.default.roundDown);
                if (this.ZVE.cmp(this.Z_0) == -1) {
                    this.ZVE = this.ZVE.add(this.VMT.div(this.ZAHL100)).add(this.VKAPA.div(this.ZAHL100)).div(this.ZAHL5).round(2, big_js_1.default.roundDown);
                    this.UPMLST();
                    this.ST = (this.ST.mul(this.ZAHL5)).round(0, big_js_1.default.roundDown);
                }
                else {
                    this.UPMLST();
                    this.STOVMT = this.ST;
                    this.ZVE = (this.ZVE.add(((this.VMT.add(this.VKAPA)).div(this.ZAHL500)))).round(2, big_js_1.default.roundDown);
                    this.UPMLST();
                    this.ST = (((this.ST.sub(this.STOVMT)).mul(this.ZAHL5)).add(this.STOVMT)).round(0, big_js_1.default.roundDown);
                }
            }
        };
        /**  PAP Seite 25  */
        Lohnsteuer2015DezemberBig.prototype.UPVKVLZZ = function () {
            this.UPVKV();
            this.JW = this.VKV;
            this.UPANTEIL();
            this.VKVLZZ = this.ANTEIL1;
        };
        /**  PAP Seite 25  */
        Lohnsteuer2015DezemberBig.prototype.UPVKV = function () {
            if (this.PKV > 0) {
                if (this.VSP2.cmp(this.VSP3) == 1) {
                    this.VKV = this.VSP2.mul(this.ZAHL100);
                }
                else {
                    this.VKV = this.VSP3.mul(this.ZAHL100);
                }
            }
            else {
                this.VKV = this.Z_0;
            }
        };
        /**  PAP Seite 26  */
        Lohnsteuer2015DezemberBig.prototype.UPLSTLZZ = function () {
            this.JW = this.LSTJAHR.mul(this.ZAHL100);
            /**  Anfang Neu 2015  */
            if (this.SCHLEIFZ == 1) {
                this.JWLSTA = this.JW;
            }
            else {
                this.JWLSTN = this.JW;
            }
            /**  Ende Neu 2015  */
            this.UPANTEIL();
            this.LSTLZZ = this.ANTEIL1;
        };
        /**  Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif. PAP Seite 27  */
        Lohnsteuer2015DezemberBig.prototype.UPMLST = function () {
            if (this.ZVE.cmp(this.ZAHL1) == -1) {
                this.ZVE = this.Z_0;
                this.X = this.Z_0;
            }
            else {
                this.X = (this.ZVE.div(new big_js_1.default(this.KZTAB))).round(0, big_js_1.default.roundDown);
            }
            if (this.STKL < 5) {
                /**  Anfang Neu 2015  */
                if (this.SCHLEIFZ == 1) {
                    this.UPTAB14();
                }
                else {
                    this.UPTAB15();
                }
                /**  Ende Neu 2015  */
            }
            else {
                this.MST5_6();
            }
        };
        /**  	Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG)
                  Achtung: Es wird davon ausgegangen, dass
                      a) Es wird davon ausge-gangen, dassa) für die BBG (Ost) 60.000 Euro und für die BBG (West) 71.400 Euro festgelegt wird sowie
                      b) der Beitragssatz zur Rentenversicherung auf 18,9 % gesenkt wird.
                  
                  PAP Seite 28   */
        Lohnsteuer2015DezemberBig.prototype.UPEVP = function () {
            if (this.KRV > 1) { /**  &lt; = < &gt; = >  */
                this.VSP1 = this.Z_0;
            }
            else {
                /**  Neu 2015 Anfang  */
                if (this.ZRE4VP.cmp(this.BBGRV) == 1) {
                    this.ZRE4VP = this.BBGRV;
                }
                this.VSP1 = (this.TBSVORV.mul(this.ZRE4VP)).round(2, big_js_1.default.roundDown);
                this.VSP1 = (this.VSP1.mul(this.RVSATZAN)).round(2, big_js_1.default.roundDown);
                /**  Neu 2015 Ende  */
            }
            this.VSP2 = (this.ZRE4VP.mul(new big_js_1.default(0.12))).round(2, big_js_1.default.roundDown);
            if (this.STKL == 3) {
                this.VHB = new big_js_1.default(3000);
            }
            else {
                this.VHB = new big_js_1.default(1900);
            }
            if (this.VSP2.cmp(this.VHB) == 1) {
                this.VSP2 = this.VHB;
            }
            this.VSPN = (this.VSP1.add(this.VSP2)).round(0, big_js_1.default.roundUp);
            this.MVSP();
            if (this.VSPN.cmp(this.VSP) == 1) {
                this.VSP = this.VSPN.round(2, big_js_1.default.roundDown);
            }
        };
        /**  Vorsorgepauschale (§39b Abs. 2 Satz 5 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 29  */
        Lohnsteuer2015DezemberBig.prototype.MVSP = function () {
            if (this.ZRE4VP.cmp(this.BBGKVPV) == 1) {
                this.ZRE4VP = this.BBGKVPV;
            }
            if (this.PKV > 0) {
                if (this.STKL == 6) {
                    this.VSP3 = this.Z_0;
                }
                else {
                    this.VSP3 = this.PKPV.mul(this.ZAHL12).div(this.ZAHL100);
                    if (this.PKV == 2) {
                        this.VSP3 = this.VSP3.sub(this.ZRE4VP.mul(this.KVSATZAG.add(this.PVSATZAG))).round(2, big_js_1.default.roundDown);
                    }
                }
            }
            else {
                this.VSP3 = this.ZRE4VP.mul(this.KVSATZAN.add(this.PVSATZAN)).round(2, big_js_1.default.roundDown);
            }
            this.VSP = this.VSP3.add(this.VSP1).round(0, big_js_1.default.roundUp);
        };
        /**    */
        Lohnsteuer2015DezemberBig.prototype.UMVSP = function () {
            this.VSPVOR = (this.VSPVOR.sub(this.ZRE4VP.mul(new big_js_1.default(0.16)))).round(2, big_js_1.default.roundDown);
            if (this.VSPVOR.cmp(this.Z_0) == -1) {
                this.VSPVOR = this.Z_0;
            }
            if (this.VSPO.cmp(this.VSPVOR) == 1) {
                this.VSP = this.VSPVOR;
                this.VSPREST = this.VSPO.sub(this.VSPVOR);
                if (this.VSPREST.cmp(this.VSPMAX1) == 1) {
                    this.VSP = this.VSP.add(this.VSPMAX1);
                    this.VSPREST = (this.VSPREST.sub(this.VSPMAX1)).div(this.ZAHL2).round(2, big_js_1.default.roundUp);
                    if (this.VSPREST.cmp(this.VSPMAX2) == 1) {
                        this.VSP = (this.VSP.add(this.VSPMAX2)).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        this.VSP = (this.VSP.add(this.VSPREST)).round(0, big_js_1.default.roundDown);
                    }
                }
                else {
                    this.VSP = (this.VSP.add(this.VSPREST)).round(0, big_js_1.default.roundDown);
                }
            }
            else {
                this.VSP = this.VSPO.round(0, big_js_1.default.roundDown);
            }
        };
        /**  Neu 2015   */
        /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 30  */
        Lohnsteuer2015DezemberBig.prototype.MST5_6 = function () {
            this.ZZX = this.X;
            if (this.ZZX.cmp(this.W2STKL5) == 1) {
                this.ZX = this.W2STKL5;
                this.UP5_6();
                if (this.ZZX.cmp(this.W3STKL5) == 1) {
                    this.ST = (this.ST.add((this.W3STKL5.sub(this.W2STKL5)).mul(new big_js_1.default(0.42)))).round(0, big_js_1.default.roundDown);
                    this.ST = (this.ST.add((this.ZZX.sub(this.W3STKL5)).mul(new big_js_1.default(0.45)))).round(0, big_js_1.default.roundDown);
                }
                else {
                    this.ST = (this.ST.add((this.ZZX.sub(this.W2STKL5)).mul(new big_js_1.default(0.42)))).round(0, big_js_1.default.roundDown);
                }
            }
            else {
                this.ZX = this.ZZX;
                this.UP5_6();
                if (this.ZZX.cmp(this.W1STKL5) == 1) {
                    this.VERGL = this.ST;
                    this.ZX = this.W1STKL5;
                    this.UP5_6();
                    this.HOCH = (this.ST.add((this.ZZX.sub(this.W1STKL5)).mul(new big_js_1.default(0.42)))).round(0, big_js_1.default.roundDown); /**  Neuer Wert 2014  */
                    if (this.HOCH.cmp(this.VERGL) == -1) {
                        this.ST = this.HOCH;
                    }
                    else {
                        this.ST = this.VERGL;
                    }
                }
            }
        };
        /**  Unterprogramm zur Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 31  */
        Lohnsteuer2015DezemberBig.prototype.UP5_6 = function () {
            this.X = (this.ZX.mul(new big_js_1.default(1.25))).round(2, big_js_1.default.roundDown);
            /**  Anfang Neu 2015  */
            if (this.SCHLEIFZ == 1) {
                this.UPTAB14();
            }
            else {
                this.UPTAB15();
            }
            /**  Ende Neu 2015  */
            this.ST1 = this.ST;
            this.X = (this.ZX.mul(new big_js_1.default(0.75))).round(2, big_js_1.default.roundDown);
            /**  Anfang Neu 2015  */
            if (this.SCHLEIFZ == 1) {
                this.UPTAB14();
            }
            else {
                this.UPTAB15();
            }
            /**  Ende Neu 2015  */
            this.ST2 = this.ST;
            this.DIFF = (this.ST1.sub(this.ST2)).mul(this.ZAHL2);
            this.MIST = (this.ZX.mul(new big_js_1.default(0.14))).round(0, big_js_1.default.roundDown);
            if (this.MIST.cmp(this.DIFF) == 1) {
                this.ST = this.MIST;
            }
            else {
                this.ST = this.DIFF;
            }
        };
        /**  Solidaritaetszuschlag, PAP Seite 32  */
        Lohnsteuer2015DezemberBig.prototype.MSOLZ = function () {
            this.SOLZFREI = new big_js_1.default(972 * this.KZTAB);
            if (this.JBMG.cmp(this.SOLZFREI) == 1) {
                this.SOLZJ = (this.JBMG.mul(new big_js_1.default(5.5))).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                this.SOLZMIN = (this.JBMG.sub(this.SOLZFREI)).mul(new big_js_1.default(20)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                if (this.SOLZMIN.cmp(this.SOLZJ) == -1) {
                    this.SOLZJ = this.SOLZMIN;
                }
                this.JW = this.SOLZJ.mul(this.ZAHL100).round(0, big_js_1.default.roundDown);
                /**  Anfang Neu 2015  */
                if (this.SCHLEIFZ == 1) {
                    this.JWSOLZA = this.JW;
                }
                else {
                    this.JWSOLZN = this.JW;
                }
                /**  Ende Neu 2015  */
                this.UPANTEIL();
                this.SOLZLZZ = this.ANTEIL1;
            }
            else {
                this.SOLZLZZ = this.Z_0;
            }
            if (this.R > 0) {
                this.JW = this.JBMG.mul(this.ZAHL100);
                /**  Anfang Neu 2015  */
                if (this.SCHLEIFZ == 1) {
                    this.JWBKA = this.JW;
                }
                else {
                    this.JWBKN = this.JW;
                }
                /**  Ende Neu 2015  */
                this.UPANTEIL();
                this.BK = this.ANTEIL1;
            }
            else {
                this.BK = this.Z_0;
            }
        };
        /**  Komplett Neu 2015  */
        /**  Differenzrechnung Dezember 2015, PAP Seite 33  */
        Lohnsteuer2015DezemberBig.prototype.MLST1215 = function () {
            if (this.LZZ > 1) {
                this.JW = (this.JWLSTN.sub(new big_js_1.default(11).mul((this.JWLSTA.sub(this.JWLSTN))))).round(0, big_js_1.default.roundDown);
                if (this.JW.cmp(this.Z_0) == -1) { /**  JW < 0  */
                    this.ANTEIL1 = this.Z_0;
                }
                else {
                    this.UPANTEIL();
                }
                this.LSTLZZ = this.ANTEIL1;
                this.JW = (this.JWSOLZN.sub(new big_js_1.default(11).mul(this.JWSOLZA.sub(this.JWSOLZN)))).round(0, big_js_1.default.roundDown);
                if (this.JW.cmp(this.Z_0) == -1) { /**  JW < 0  */
                    this.ANTEIL1 = this.Z_0;
                }
                else {
                    this.UPANTEIL();
                }
                this.SOLZLZZ = this.ANTEIL1;
                this.JW = (this.JWBKN.sub(new big_js_1.default(11).mul(this.JWBKA.sub(this.JWBKN)))).round(0, big_js_1.default.roundDown);
                if (this.JW.cmp(this.Z_0) == -1) { /**  JW < 0  */
                    this.ANTEIL1 = this.Z_0;
                }
                else {
                    this.UPANTEIL();
                }
                this.BK = this.ANTEIL1;
            }
        };
        /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 9 EStG), PAP Seite 34  */
        Lohnsteuer2015DezemberBig.prototype.UPANTEIL = function () {
            if (this.LZZ == 1) {
                this.ANTEIL1 = this.JW;
            }
            else {
                if (this.LZZ == 2) {
                    this.ANTEIL1 = this.JW.div(this.ZAHL12).round(0, big_js_1.default.roundDown);
                }
                else {
                    if (this.LZZ == 3) {
                        this.ANTEIL1 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        this.ANTEIL1 = this.JW.div(this.ZAHL360).round(0, big_js_1.default.roundDown);
                    }
                }
            }
        };
        /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 8 EStG), PAP Seite 35  */
        Lohnsteuer2015DezemberBig.prototype.MSONST = function () {
            this.LZZ = 1;
            if (this.ZMVB == 0) {
                this.ZMVB = 12;
            }
            if (this.SONSTB.cmp(this.Z_0) == 0) {
                this.VKVSONST = this.Z_0;
                this.LSTSO = this.Z_0;
                this.STS = this.Z_0;
                this.SOLZS = this.Z_0;
                this.BKS = this.Z_0;
            }
            else {
                this.MOSONST();
                this.UPVKV();
                this.VKVSONST = this.VKV;
                this.ZRE4J = ((this.JRE4.add(this.SONSTB)).div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
                this.ZVBEZJ = ((this.JVBEZ.add(this.VBS)).div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
                this.VBEZBSO = this.STERBE;
                this.MRE4SONST();
                this.MLSTJAHR();
                this.UPVKV();
                this.VKVSONST = this.VKV.sub(this.VKVSONST);
                this.LSTSO = this.ST.mul(this.ZAHL100);
                /**  	lt. PAP muss hier auf ganze EUR aufgerundet werden,
                            allerdings muss der Wert in Cent vorgehalten werden,
                            deshalb nach dem Aufrunden auf ganze EUR durch 'divide(ZAHL100, 0, BigDecimal.ROUND_DOWN)'
                            wieder die Multiplikation mit 100  */
                this.STS = this.LSTSO.sub(this.LSTOSO).mul(new big_js_1.default(this.f)).div(this.ZAHL100).round(0, big_js_1.default.roundDown).mul(this.ZAHL100);
                if (this.STS.cmp(this.Z_0) == -1) {
                    this.STS = this.Z_0;
                }
                this.SOLZS = this.STS.mul(new big_js_1.default(5.5)).div(this.ZAHL100).round(0, big_js_1.default.roundDown);
                if (this.R > 0) {
                    this.BKS = this.STS;
                }
                else {
                    this.BKS = this.Z_0;
                }
            }
        };
        /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 und 10 EStG), PAP Seite 36  */
        Lohnsteuer2015DezemberBig.prototype.MVMT = function () {
            if (this.VKAPA.cmp(this.Z_0) == -1) {
                this.VKAPA = this.Z_0;
            }
            if ((this.VMT.add(this.VKAPA)).cmp(this.Z_0) == 1) {
                if (this.LSTSO.cmp(this.Z_0) == 0) {
                    this.MOSONST();
                    this.LST1 = this.LSTOSO;
                }
                else {
                    this.LST1 = this.LSTSO;
                }
                this.VBEZBSO = this.STERBE.add(this.VKAPA);
                this.ZRE4J = ((this.JRE4.add(this.SONSTB).add(this.VMT).add(this.VKAPA)).div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
                this.ZVBEZJ = ((this.JVBEZ.add(this.VBS).add(this.VKAPA)).div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
                this.KENNVMT = 2;
                this.MRE4SONST();
                this.MLSTJAHR();
                this.LST3 = this.ST.mul(this.ZAHL100);
                this.MRE4ABZ();
                this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100)).sub(this.SONSTENT.div(this.ZAHL100));
                this.KENNVMT = 1;
                this.MLSTJAHR();
                this.LST2 = this.ST.mul(this.ZAHL100);
                this.STV = this.LST2.sub(this.LST1);
                this.LST3 = this.LST3.sub(this.LST1);
                if (this.LST3.cmp(this.STV) == -1) {
                    this.STV = this.LST3;
                }
                if (this.STV.cmp(this.Z_0) == -1) {
                    this.STV = this.Z_0;
                }
                else {
                    /**
                        lt. PAP muss hier auf ganze EUR abgerundet werden.
                    Allerdings muss auch hier der Wert in Cent vorgehalten werden,
                        weshalb nach dem Aufrunden auf ganze EUR durch 'divide(ZAHL100, 0, BigDecimal.ROUND_DOWN)'
                        wieder die Multiplikation mit 100 erfolgt.
                     */
                    this.STV = this.STV.mul(new big_js_1.default(this.f)).div(this.ZAHL100).round(0, big_js_1.default.roundDown).mul(this.ZAHL100);
                }
                this.SOLZV = ((this.STV.mul(new big_js_1.default(5.5))).div(this.ZAHL100)).round(0, big_js_1.default.roundDown);
                if (this.R > 0) {
                    this.BKV = this.STV;
                }
                else {
                    this.BKV = this.Z_0;
                }
            }
            else {
                this.STV = this.Z_0;
                this.SOLZV = this.Z_0;
                this.BKV = this.Z_0;
            }
        };
        /**  Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 37  */
        Lohnsteuer2015DezemberBig.prototype.MOSONST = function () {
            this.ZRE4J = (this.JRE4.div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
            this.ZVBEZJ = (this.JVBEZ.div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
            this.JLFREIB = this.JFREIB.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
            this.JLHINZU = this.JHINZU.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
            this.MRE4();
            this.MRE4ABZ();
            this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100));
            this.MZTABFBN(); /**  Anpassung 2015  */
            this.MLSTJAHR();
            this.LSTOSO = this.ST.mul(this.ZAHL100);
        };
        /**  Sonderberechnung mit sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 38  */
        Lohnsteuer2015DezemberBig.prototype.MRE4SONST = function () {
            this.MRE4();
            this.FVB = this.FVBSO;
            this.MRE4ABZ();
            this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100)).sub(this.SONSTENT.div(this.ZAHL100));
            this.FVBZ = this.FVBZSO;
            this.MZTABFBN(); /**  Anpassung 2015  */
        };
        /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 32  */
        Lohnsteuer2015DezemberBig.prototype.UPTAB14 = function () {
            if (this.X.cmp(new big_js_1.default(8355)) == -1) {
                this.ST = this.Z_0;
            }
            else {
                if (this.X.cmp(new big_js_1.default(13470)) == -1) {
                    this.Y = (this.X.sub(new big_js_1.default(8354))).div(new big_js_1.default(10000)).round(6, big_js_1.default.roundDown);
                    this.RW = this.Y.mul(new big_js_1.default(974.58));
                    this.RW = this.RW.add(new big_js_1.default(1400));
                    this.ST = (this.RW.mul(this.Y)).round(0, big_js_1.default.roundDown);
                }
                else {
                    if (this.X.cmp(new big_js_1.default(52882)) == -1) {
                        this.Y = (this.X.sub(new big_js_1.default(13469))).div(new big_js_1.default(10000)).round(6, big_js_1.default.roundDown);
                        this.RW = this.Y.mul(new big_js_1.default(228.74));
                        this.RW = this.RW.add(new big_js_1.default(2397));
                        this.RW = this.RW.mul(this.Y);
                        this.ST = (this.RW.add(new big_js_1.default(971))).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        if (this.X.cmp(new big_js_1.default(250731)) == -1) {
                            this.ST = ((this.X.mul(new big_js_1.default(0.42))).sub(new big_js_1.default(8239))).round(0, big_js_1.default.roundDown);
                        }
                        else {
                            this.ST = ((this.X.mul(new big_js_1.default(0.45))).sub(new big_js_1.default(15761))).round(0, big_js_1.default.roundDown);
                        }
                    }
                }
            }
            this.ST = this.ST.mul(new big_js_1.default(this.KZTAB));
        };
        /**  Komplett Neu 2015  */
        /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 39  */
        Lohnsteuer2015DezemberBig.prototype.UPTAB15 = function () {
            if (this.X.cmp(new big_js_1.default(8473)) == -1) {
                this.ST = this.Z_0;
            }
            else {
                if (this.X.cmp(new big_js_1.default(13470)) == -1) {
                    this.Y = (this.X.sub(new big_js_1.default(8472))).div(new big_js_1.default(10000)).round(6, big_js_1.default.roundDown);
                    this.RW = this.Y.mul(new big_js_1.default(997.60));
                    this.RW = this.RW.add(new big_js_1.default(1400));
                    this.ST = (this.RW.mul(this.Y)).round(0, big_js_1.default.roundDown);
                }
                else {
                    if (this.X.cmp(new big_js_1.default(52882)) == -1) {
                        this.Y = (this.X.sub(new big_js_1.default(13469))).div(new big_js_1.default(10000)).round(6, big_js_1.default.roundDown);
                        this.RW = this.Y.mul(new big_js_1.default(228.74));
                        this.RW = this.RW.add(new big_js_1.default(2397));
                        this.RW = this.RW.mul(this.Y);
                        this.ST = (this.RW.add(new big_js_1.default(948.68))).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        if (this.X.cmp(new big_js_1.default(250731)) == -1) {
                            this.ST = ((this.X.mul(new big_js_1.default(0.42))).sub(new big_js_1.default(8261.29))).round(0, big_js_1.default.roundDown);
                        }
                        else {
                            this.ST = ((this.X.mul(new big_js_1.default(0.45))).sub(new big_js_1.default(15783.19))).round(0, big_js_1.default.roundDown);
                        }
                    }
                }
            }
            this.ST = this.ST.mul(new big_js_1.default(this.KZTAB));
        };
        /**
         * Getter for af.
         * <p>
         *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getAf = function () {
            return this.af;
        };
        /**
         * Setter for af.
         * <p>
         *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
         * <p>
         * @param {number} af input value
         */
        Lohnsteuer2015DezemberBig.prototype.setAf = function (af) {
            this.af = af;
        };
        /**
         * Getter for AJAHR.
         * <p>
         *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getAJAHR = function () {
            return this.AJAHR;
        };
        /**
         * Setter for AJAHR.
         * <p>
         *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
         * <p>
         * @param {number} AJAHR input value
         */
        Lohnsteuer2015DezemberBig.prototype.setAJAHR = function (AJAHR) {
            this.AJAHR = AJAHR;
        };
        /**
         * Getter for ALTER1.
         * <p>
         *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getALTER1 = function () {
            return this.ALTER1;
        };
        /**
         * Setter for ALTER1.
         * <p>
         *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
         * <p>
         * @param {number} ALTER1 input value
         */
        Lohnsteuer2015DezemberBig.prototype.setALTER1 = function (ALTER1) {
            this.ALTER1 = ALTER1;
        };
        /**
         * Getter for ENTSCH.
         * <p>
         *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getENTSCH = function () {
            return this.ENTSCH;
        };
        /**
         * Setter for ENTSCH.
         * <p>
         *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent
         * <p>
         * @param {Big} ENTSCH input value
         */
        Lohnsteuer2015DezemberBig.prototype.setENTSCH = function (ENTSCH) {
            this.ENTSCH = ENTSCH;
        };
        /**
         * Getter for f.
         * <p>
         *  eingetragener Faktor mit drei Nachkommastellen
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getF = function () {
            return this.f;
        };
        /**
         * Setter for f.
         * <p>
         *  eingetragener Faktor mit drei Nachkommastellen
         * <p>
         * @param {number} f input value
         */
        Lohnsteuer2015DezemberBig.prototype.setF = function (f) {
            this.f = f;
        };
        /**
         * Getter for JFREIB.
         * <p>
         *  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
                 Lohnsteuerkarte in Cents (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getJFREIB = function () {
            return this.JFREIB;
        };
        /**
         * Setter for JFREIB.
         * <p>
         *  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
                 Lohnsteuerkarte in Cents (ggf. 0)
         * <p>
         * @param {Big} JFREIB input value
         */
        Lohnsteuer2015DezemberBig.prototype.setJFREIB = function (JFREIB) {
            this.JFREIB = JFREIB;
        };
        /**
         * Getter for JHINZU.
         * <p>
         *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getJHINZU = function () {
            return this.JHINZU;
        };
        /**
         * Setter for JHINZU.
         * <p>
         *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
         * <p>
         * @param {Big} JHINZU input value
         */
        Lohnsteuer2015DezemberBig.prototype.setJHINZU = function (JHINZU) {
            this.JHINZU = JHINZU;
        };
        /**
         * Getter for JRE4.
         * <p>
         *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne Vergütung für mehrjährige Tätigkeit in Cent.
                 Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingabe „sonsti-ger Bezüge“ (Feld SONSTB)
                 oder bei Eingabe der „Vergütung für mehrjährige Tätigkeit“ (Feld VMT).
                 Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem
                 voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrere Jahres aus einem vorangegangenen
                 Abrechnungszeitraum sind in voller Höhe hinzuzurechnen.
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getJRE4 = function () {
            return this.JRE4;
        };
        /**
         * Setter for JRE4.
         * <p>
         *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne Vergütung für mehrjährige Tätigkeit in Cent.
                 Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingabe „sonsti-ger Bezüge“ (Feld SONSTB)
                 oder bei Eingabe der „Vergütung für mehrjährige Tätigkeit“ (Feld VMT).
                 Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem
                 voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrere Jahres aus einem vorangegangenen
                 Abrechnungszeitraum sind in voller Höhe hinzuzurechnen.
         * <p>
         * @param {Big} JRE4 input value
         */
        Lohnsteuer2015DezemberBig.prototype.setJRE4 = function (JRE4) {
            this.JRE4 = JRE4;
        };
        /**
         * Getter for JVBEZ.
         * <p>
         *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getJVBEZ = function () {
            return this.JVBEZ;
        };
        /**
         * Setter for JVBEZ.
         * <p>
         *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
         * <p>
         * @param {Big} JVBEZ input value
         */
        Lohnsteuer2015DezemberBig.prototype.setJVBEZ = function (JVBEZ) {
            this.JVBEZ = JVBEZ;
        };
        /**
         * Getter for KRV.
         * <p>
         * Merker für die Vorsorgepauschale
                2 = der Arbeitnehmer ist NICCHT in der gesetzlichen Rentenversicherung versichert.
                
                1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze OST.
                    
                0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze WEST.
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getKRV = function () {
            return this.KRV;
        };
        /**
         * Setter for KRV.
         * <p>
         * Merker für die Vorsorgepauschale
                2 = der Arbeitnehmer ist NICCHT in der gesetzlichen Rentenversicherung versichert.
                
                1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze OST.
                    
                0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze WEST.
         * <p>
         * @param {number} KRV input value
         */
        Lohnsteuer2015DezemberBig.prototype.setKRV = function (KRV) {
            this.KRV = KRV;
        };
        /**
         * Getter for KVZ.
         * <p>
         *  Einkommensbezogener Zusatzbeitragssatz eines gesetzlich krankenversicherten Arbeitnehmers,
             auf dessen Basis der an die Kran-kenkasse zu zahlende Zusatzbeitrag berechnet wird,
             in Prozent (bspw. 0,90 für 0,90 %) mit 2 Dezimalstellen.
             Der von der Kranken-kasse festgesetzte Zusatzbeitragssatz ist bei Abweichungen unmaßgeblich.
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getKVZ = function () {
            return this.KVZ;
        };
        /**
         * Setter for KVZ.
         * <p>
         *  Einkommensbezogener Zusatzbeitragssatz eines gesetzlich krankenversicherten Arbeitnehmers,
             auf dessen Basis der an die Kran-kenkasse zu zahlende Zusatzbeitrag berechnet wird,
             in Prozent (bspw. 0,90 für 0,90 %) mit 2 Dezimalstellen.
             Der von der Kranken-kasse festgesetzte Zusatzbeitragssatz ist bei Abweichungen unmaßgeblich.
         * <p>
         * @param {Big} KVZ input value
         */
        Lohnsteuer2015DezemberBig.prototype.setKVZ = function (KVZ) {
            this.KVZ = KVZ;
        };
        /**
         * Getter for LZZ.
         * <p>
         *  Lohnzahlungszeitraum:
                 1 = Jahr
                 2 = Monat
                 3 = Woche
                 4 = Tag
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getLZZ = function () {
            return this.LZZ;
        };
        /**
         * Setter for LZZ.
         * <p>
         *  Lohnzahlungszeitraum:
                 1 = Jahr
                 2 = Monat
                 3 = Woche
                 4 = Tag
         * <p>
         * @param {number} LZZ input value
         */
        Lohnsteuer2015DezemberBig.prototype.setLZZ = function (LZZ) {
            this.LZZ = LZZ;
        };
        /**
         * Getter for LZZFREIB.
         * <p>
         *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
                 den Lohnzahlungszeitraum in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getLZZFREIB = function () {
            return this.LZZFREIB;
        };
        /**
         * Setter for LZZFREIB.
         * <p>
         *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
                 den Lohnzahlungszeitraum in Cent
         * <p>
         * @param {Big} LZZFREIB input value
         */
        Lohnsteuer2015DezemberBig.prototype.setLZZFREIB = function (LZZFREIB) {
            this.LZZFREIB = LZZFREIB;
        };
        /**
         * Getter for LZZHINZU.
         * <p>
         *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
                 für den Lohnzahlungszeitraum in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getLZZHINZU = function () {
            return this.LZZHINZU;
        };
        /**
         * Setter for LZZHINZU.
         * <p>
         *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
                 für den Lohnzahlungszeitraum in Cent
         * <p>
         * @param {Big} LZZHINZU input value
         */
        Lohnsteuer2015DezemberBig.prototype.setLZZHINZU = function (LZZHINZU) {
            this.LZZHINZU = LZZHINZU;
        };
        /**
         * Getter for PKPV.
         * <p>
         *  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
                 Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
                 als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
                 als Monatsbetrag anzugeben).
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getPKPV = function () {
            return this.PKPV;
        };
        /**
         * Setter for PKPV.
         * <p>
         *  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
                 Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
                 als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
                 als Monatsbetrag anzugeben).
         * <p>
         * @param {Big} PKPV input value
         */
        Lohnsteuer2015DezemberBig.prototype.setPKPV = function (PKPV) {
            this.PKPV = PKPV;
        };
        /**
         * Getter for PKV.
         * <p>
         *  Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
                 2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getPKV = function () {
            return this.PKV;
        };
        /**
         * Setter for PKV.
         * <p>
         *  Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
                 2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss
         * <p>
         * @param {number} PKV input value
         */
        Lohnsteuer2015DezemberBig.prototype.setPKV = function (PKV) {
            this.PKV = PKV;
        };
        /**
         * Getter for PVS.
         * <p>
         *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären, sonst 0.
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getPVS = function () {
            return this.PVS;
        };
        /**
         * Setter for PVS.
         * <p>
         *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären, sonst 0.
         * <p>
         * @param {number} PVS input value
         */
        Lohnsteuer2015DezemberBig.prototype.setPVS = function (PVS) {
            this.PVS = PVS;
        };
        /**
         * Getter for PVZ.
         * <p>
         *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat, sonst 0.
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getPVZ = function () {
            return this.PVZ;
        };
        /**
         * Setter for PVZ.
         * <p>
         *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat, sonst 0.
         * <p>
         * @param {number} PVZ input value
         */
        Lohnsteuer2015DezemberBig.prototype.setPVZ = function (PVZ) {
            this.PVZ = PVZ;
        };
        /**
         * Getter for R.
         * <p>
         *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
                 keiner Religionszugehoerigkeit = 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getR = function () {
            return this.R;
        };
        /**
         * Setter for R.
         * <p>
         *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
                 keiner Religionszugehoerigkeit = 0)
         * <p>
         * @param {number} R input value
         */
        Lohnsteuer2015DezemberBig.prototype.setR = function (R) {
            this.R = R;
        };
        /**
         * Getter for RE4.
         * <p>
         *  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
                 fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
                 der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
                 Freibetrags in Cents.
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getRE4 = function () {
            return this.RE4;
        };
        /**
         * Setter for RE4.
         * <p>
         *  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
                 fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
                 der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
                 Freibetrags in Cents.
         * <p>
         * @param {Big} RE4 input value
         */
        Lohnsteuer2015DezemberBig.prototype.setRE4 = function (RE4) {
            this.RE4 = RE4;
        };
        /**
         * Getter for SONSTB.
         * <p>
         *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich
                 Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSONSTB = function () {
            return this.SONSTB;
        };
        /**
         * Setter for SONSTB.
         * <p>
         *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich
                 Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)
         * <p>
         * @param {Big} SONSTB input value
         */
        Lohnsteuer2015DezemberBig.prototype.setSONSTB = function (SONSTB) {
            this.SONSTB = SONSTB;
        };
        /**
         * Getter for STERBE.
         * <p>
         *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
                 (in SONSTB enthalten) in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSTERBE = function () {
            return this.STERBE;
        };
        /**
         * Setter for STERBE.
         * <p>
         *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
                 (in SONSTB enthalten) in Cents
         * <p>
         * @param {Big} STERBE input value
         */
        Lohnsteuer2015DezemberBig.prototype.setSTERBE = function (STERBE) {
            this.STERBE = STERBE;
        };
        /**
         * Getter for STKL.
         * <p>
         *  Steuerklasse:
                 1 = I
                 2 = II
                 3 = III
                 4 = IV
                 5 = V
                 6 = VI
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSTKL = function () {
            return this.STKL;
        };
        /**
         * Setter for STKL.
         * <p>
         *  Steuerklasse:
                 1 = I
                 2 = II
                 3 = III
                 4 = IV
                 5 = V
                 6 = VI
         * <p>
         * @param {number} STKL input value
         */
        Lohnsteuer2015DezemberBig.prototype.setSTKL = function (STKL) {
            this.STKL = STKL;
        };
        /**
         * Getter for VBEZ.
         * <p>
         *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVBEZ = function () {
            return this.VBEZ;
        };
        /**
         * Setter for VBEZ.
         * <p>
         *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
         * <p>
         * @param {Big} VBEZ input value
         */
        Lohnsteuer2015DezemberBig.prototype.setVBEZ = function (VBEZ) {
            this.VBEZ = VBEZ;
        };
        /**
         * Getter for VBEZM.
         * <p>
         *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
                 in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVBEZM = function () {
            return this.VBEZM;
        };
        /**
         * Setter for VBEZM.
         * <p>
         *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
                 in Cents
         * <p>
         * @param {Big} VBEZM input value
         */
        Lohnsteuer2015DezemberBig.prototype.setVBEZM = function (VBEZM) {
            this.VBEZM = VBEZM;
        };
        /**
         * Getter for VBEZS.
         * <p>
         *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
                 bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
                 bei Versorgungsbezuegen in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVBEZS = function () {
            return this.VBEZS;
        };
        /**
         * Setter for VBEZS.
         * <p>
         *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
                 bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
                 bei Versorgungsbezuegen in Cents
         * <p>
         * @param {Big} VBEZS input value
         */
        Lohnsteuer2015DezemberBig.prototype.setVBEZS = function (VBEZS) {
            this.VBEZS = VBEZS;
        };
        /**
         * Getter for VBS.
         * <p>
         *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVBS = function () {
            return this.VBS;
        };
        /**
         * Setter for VBS.
         * <p>
         *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
         * <p>
         * @param {Big} VBS input value
         */
        Lohnsteuer2015DezemberBig.prototype.setVBS = function (VBS) {
            this.VBS = VBS;
        };
        /**
         * Getter for VJAHR.
         * <p>
         *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
                 mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVJAHR = function () {
            return this.VJAHR;
        };
        /**
         * Setter for VJAHR.
         * <p>
         *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
                 mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
         * <p>
         * @param {number} VJAHR input value
         */
        Lohnsteuer2015DezemberBig.prototype.setVJAHR = function (VJAHR) {
            this.VJAHR = VJAHR;
        };
        /**
         * Getter for VKAPA.
         * <p>
         *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
                 für mehrere Jahre in Cent (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVKAPA = function () {
            return this.VKAPA;
        };
        /**
         * Setter for VKAPA.
         * <p>
         *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
                 für mehrere Jahre in Cent (ggf. 0)
         * <p>
         * @param {Big} VKAPA input value
         */
        Lohnsteuer2015DezemberBig.prototype.setVKAPA = function (VKAPA) {
            this.VKAPA = VKAPA;
        };
        /**
         * Getter for VMT.
         * <p>
         *  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen
                 bei Versorgungsbezügen in Cent (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVMT = function () {
            return this.VMT;
        };
        /**
         * Setter for VMT.
         * <p>
         *  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen
                 bei Versorgungsbezügen in Cent (ggf. 0)
         * <p>
         * @param {Big} VMT input value
         */
        Lohnsteuer2015DezemberBig.prototype.setVMT = function (VMT) {
            this.VMT = VMT;
        };
        /**
         * Getter for ZKF.
         * <p>
         *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getZKF = function () {
            return this.ZKF;
        };
        /**
         * Setter for ZKF.
         * <p>
         *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
         * <p>
         * @param {Big} ZKF input value
         */
        Lohnsteuer2015DezemberBig.prototype.setZKF = function (ZKF) {
            this.ZKF = ZKF;
        };
        /**
         * Getter for ZMVB.
         * <p>
         *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
                 erforderlich bei Jahresberechnung (LZZ = 1)
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getZMVB = function () {
            return this.ZMVB;
        };
        /**
         * Setter for ZMVB.
         * <p>
         *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
                 erforderlich bei Jahresberechnung (LZZ = 1)
         * <p>
         * @param {number} ZMVB input value
         */
        Lohnsteuer2015DezemberBig.prototype.setZMVB = function (ZMVB) {
            this.ZMVB = ZMVB;
        };
        /**
         * Getter for JRE4ENT.
         * <p>
         *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getJRE4ENT = function () {
            return this.JRE4ENT;
        };
        /**
         * Setter for JRE4ENT.
         * <p>
         *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent
         * <p>
         * @param {Big} JRE4ENT input value
         */
        Lohnsteuer2015DezemberBig.prototype.setJRE4ENT = function (JRE4ENT) {
            this.JRE4ENT = JRE4ENT;
        };
        /**
         * Getter for SONSTENT.
         * <p>
         *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSONSTENT = function () {
            return this.SONSTENT;
        };
        /**
         * Setter for SONSTENT.
         * <p>
         *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent
         * <p>
         * @param {Big} SONSTENT input value
         */
        Lohnsteuer2015DezemberBig.prototype.setSONSTENT = function (SONSTENT) {
            this.SONSTENT = SONSTENT;
        };
        /**
         * Getter for BK.
         * <p>
         *  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getBK = function () {
            return this.BK;
        };
        /**
         * Getter for BKS.
         * <p>
         *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
                 fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getBKS = function () {
            return this.BKS;
        };
        /**
         * Getter for BKV.
         * <p>
         *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
                 fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getBKV = function () {
            return this.BKV;
        };
        /**
         * Getter for LSTLZZ.
         * <p>
         *  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getLSTLZZ = function () {
            return this.LSTLZZ;
        };
        /**
         * Getter for SOLZLZZ.
         * <p>
         *  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
                 in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSOLZLZZ = function () {
            return this.SOLZLZZ;
        };
        /**
         * Getter for SOLZS.
         * <p>
         *  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
                 Taetigkeit) in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSOLZS = function () {
            return this.SOLZS;
        };
        /**
         * Getter for SOLZV.
         * <p>
         *  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
                 Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSOLZV = function () {
            return this.SOLZV;
        };
        /**
         * Getter for STS.
         * <p>
         *  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
                 Taetigkeit) in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSTS = function () {
            return this.STS;
        };
        /**
         * Getter for STV.
         * <p>
         *  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getSTV = function () {
            return this.STV;
        };
        /**
         * Getter for VKVLZZ.
         * <p>
         *  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
                 privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
                 die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
                 steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
                 steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
                 VKVSONST
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVKVLZZ = function () {
            return this.VKVLZZ;
        };
        /**
         * Getter for VKVSONST.
         * <p>
         *  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers
                 zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
                 auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
                 auch negativ sein. Für tarifermäßigt zu besteuernde Vergütungen für mehrjährige
                 Tätigkeiten enthält der PAP keinen entsprechenden Ausgabewert.
         * <p>
         * @return the value
         */
        Lohnsteuer2015DezemberBig.prototype.getVKVSONST = function () {
            return this.VKVSONST;
        };
        /**
         * Initialize all inputs values with zero.
         */
        Lohnsteuer2015DezemberBig.prototype.initInputs = function () {
            this.ENTSCH = this.JFREIB = this.JHINZU = this.JRE4 = this.JVBEZ = this.KVZ = this.LZZFREIB = this.LZZHINZU = this.PKPV = this.RE4 = this.SONSTB = this.STERBE = this.VBEZ = this.VBEZM = this.VBEZS = this.VBS = this.VKAPA = this.VMT = this.ZKF = this.JRE4ENT = this.SONSTENT = this.Z_0;
            this.af = this.AJAHR = this.ALTER1 = this.f = this.KRV = this.LZZ = this.PKV = this.PVS = this.PVZ = this.R = this.STKL = this.VJAHR = this.ZMVB = 0;
        };
        // not realy clean, but for ts compiler
        Lohnsteuer2015DezemberBig.prototype.isBigInput = function (name, value) {
            return value instanceof big_js_1.default;
        };
        /**
         * Setter for Big or number input parameters.
         *
         * @param {string} name Variable name to set.
         * @param {number} value Value to set.
         */
        Lohnsteuer2015DezemberBig.prototype.set = function (name, value) {
            if (!this.hasOwnProperty(name)) {
                throw new Error("Unknown parameter " + name);
            }
            if (this.isBigInput(name, value)) {
                if (value instanceof big_js_1.default) {
                    this[name] = value;
                }
            }
            else if (!(value instanceof big_js_1.default)) {
                this[name] = value;
            }
        };
        /**
         * Getter for all output parameters. You get a value of type "number or "Big".
         *
         * @param {string} name Variable name to get.
         */
        Lohnsteuer2015DezemberBig.prototype.get = function (name) {
            if (this.hasOwnProperty(name)) {
                return this[name];
            }
            throw new Error("Unknown parameter " + name);
        };
        /**
         * Get all fields with types.
         */
        Lohnsteuer2015DezemberBig.prototype.getDirectory = function () {
            return Lohnsteuer2015DezemberBig.typeDirectory;
        };
        /**
         * Converts a value (number or Big) in the correct type (number or Big).
         *
         * @param {string} name the name of the value
         * @param {TaxJsValueType} value the value to convert
         */
        Lohnsteuer2015DezemberBig.prototype.toType = function (name, value) {
            var info = Lohnsteuer2015DezemberBig.typeDirectory[name];
            if (!info) {
                throw new Error("Unknown parameter " + name);
            }
            if (typeof value == "number" && info.type != "number") {
                return new big_js_1.default(value);
            }
            if (typeof value == "object" && info.type == "number") {
                return value.toNumber();
            }
            return value;
        };
        Lohnsteuer2015DezemberBig._n = "number";
        Lohnsteuer2015DezemberBig._b = "Big";
        Lohnsteuer2015DezemberBig._i = "input";
        Lohnsteuer2015DezemberBig._o = "output";
        Lohnsteuer2015DezemberBig._s = "STANDARD";
        Lohnsteuer2015DezemberBig._d = "DBA";
        Lohnsteuer2015DezemberBig.typeDirectory = {
            "af": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "AJAHR": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "ALTER1": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "ENTSCH": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "f": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "JFREIB": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "JHINZU": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "JRE4": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "JVBEZ": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "KRV": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "KVZ": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "LZZ": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "LZZFREIB": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "LZZHINZU": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "PKPV": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "PKV": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "PVS": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "PVZ": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "R": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "RE4": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "SONSTB": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "STERBE": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "STKL": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "VBEZ": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "VBEZM": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "VBEZS": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "VBS": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "VJAHR": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "VKAPA": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "VMT": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "ZKF": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "ZMVB": { type: Lohnsteuer2015DezemberBig._n, direction: Lohnsteuer2015DezemberBig._i }, "JRE4ENT": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "SONSTENT": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._i }, "BK": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "BKS": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "BKV": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "LSTLZZ": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "SOLZLZZ": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "SOLZS": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "SOLZV": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "STS": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "STV": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "VKVLZZ": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s }, "VKVSONST": { type: Lohnsteuer2015DezemberBig._b, direction: Lohnsteuer2015DezemberBig._o, group: Lohnsteuer2015DezemberBig._s },
        };
        return Lohnsteuer2015DezemberBig;
    }());
    exports.Lohnsteuer2015DezemberBig = Lohnsteuer2015DezemberBig;
});
//# sourceMappingURL=Lohnsteuer2015DezemberBig.js.map