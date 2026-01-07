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
    exports.Lohnsteuer2026Big = void 0;
    var big_js_1 = __importDefault(require("big.js"));
    /**
    * Steuerberechnungsklasse.
    *
    * Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
    *
    */
    var Lohnsteuer2026Big = /** @class */ (function () {
        function Lohnsteuer2026Big() {
            this.Z_0 = new big_js_1.default(0);
            this.Z_1 = new big_js_1.default(1);
            this.Z_10 = new big_js_1.default(10);
            /**   Stand: 2025-10-23 12:40   */
            /**   ITZBund Berlin   */
            /**    EINGABEPARAMETER    */
            /**   1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)   */
            this.af = 1;
            /**   Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)   */
            this.AJAHR = 0;
            /**   1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0   */
            this.ALTER1 = 0;
            /**   Merker für die Vorsorgepauschale
                 0 = der Arbeitnehmer ist in der Arbeitslosenversicherung pflichtversichert; es gilt die allgemeine Beitragsbemessungsgrenze
                 1 = wenn nicht 0   */
            this.ALV = 0;
            /**   eingetragener Faktor mit drei Nachkommastellen   */
            this.f = 1.0;
            /**   Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                 auf der Bescheinigung für den Lohnsteuerabzug 2026 in Cent (ggf. 0)   */
            this.JFREIB = this.Z_0;
            /**   Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                 Bescheinigung für den Lohnsteuerabzug 2026 in Cent (ggf. 0)   */
            this.JHINZU = this.Z_0;
            /**   Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne
                 die zu besteuernden Vorteile bei Vermögensbeteiligungen,
                 § 19a Absatz 4 EStG) in Cent.
                 Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
                 Bezügen (Feld SONSTB).
                 Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
                 so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
                 besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG).   */
            this.JRE4 = this.Z_0;
            /**   In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                 Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG) in Cent    */
            this.JRE4ENT = this.Z_0;
            /**   In JRE4 enthaltene Versorgungsbezüge in Cent (ggf. 0)   */
            this.JVBEZ = this.Z_0;
            /**  Merker für die Vorsorgepauschale
                0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer
                berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der
                Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze
                
                1 = wenn nicht 0
                   */
            this.KRV = 0;
            /**   Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
             in Prozent (bspw. 2,50 für 2,50 %) mit 2 Dezimalstellen.
             Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
             anteil erfolgt im Programmablauf.   */
            this.KVZ = this.Z_0;
            /**   Lohnzahlungszeitraum:
                 1 = Jahr
                 2 = Monat
                 3 = Woche
                 4 = Tag   */
            this.LZZ = 1;
            /**   Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2026 eingetragene Freibetrag für den
                 Lohnzahlungszeitraum in Cent   */
            this.LZZFREIB = this.Z_0;
            /**   Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2026 eingetragene Hinzurechnungsbetrag für den
                 Lohnzahlungszeitraum in Cent   */
            this.LZZHINZU = this.Z_0;
            /**   Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) in Cent   */
            this.MBV = this.Z_0;
            /**   Dem Arbeitgeber mitgeteilte Beiträge des Arbeitnehmers für eine private
                 Basiskranken- bzw. Pflege-Pflichtversicherung im Sinne des
                 § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom Lohnzahlungszeitraum
                 immer als Monatsbetrag anzugeben   */
            this.PKPV = this.Z_0;
            /**   Arbeitgeberzuschuss für eine private Basiskranken- bzw. Pflege-Pflichtversicherung im
                 Sinne des § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom
                 Lohnzahlungszeitraum immer als Monatsbetrag anzugeben  */
            this.PKPVAGZ = this.Z_0;
            /**   Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer   */
            this.PKV = 0;
            /**   Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
                 bei mehr als einem Kind
                 0 = kein Abschlag
                 1 = Beitragsabschlag für das 2. Kind
                 2 = Beitragsabschläge für das 2. und 3. Kind
                 3 = Beitragsabschläge für 2. bis 4. Kinder
                 4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder     */
            this.PVA = this.Z_0;
            /**   1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären   */
            this.PVS = 0;
            /**   1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat   */
            this.PVZ = 0;
            /**   Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                 Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                 und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                 den Lohnsteuerabzug 2026 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                 Hinzurechnungsbetrags in Cent   */
            this.RE4 = this.Z_0;
            /**   Sonstige Bezüge einschließlich zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
                 Kapitalauszahlungen/Abfindungen, in Cent (ggf. 0)   */
            this.SONSTB = this.Z_0;
            /**   In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a
                 Absatz 4 EStG), in Cent   */
            this.SONSTENT = this.Z_0;
            /**   Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen
                  (in SONSTB enthalten), in Cent   */
            this.STERBE = this.Z_0;
            /**   Steuerklasse:
                 1 = I
                 2 = II
                 3 = III
                 4 = IV
                 5 = V
                 6 = VI   */
            this.STKL = 1;
            /**   In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter Berücksichtigung
                 einer geänderten Bemessungsgrundlage nach  § 19 Absatz 2 Satz 10 und 11 EStG   */
            this.VBEZ = this.Z_0;
            /**   Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der
                 Versorgungsbezug erstmalig nach Januar 2005 gewährt  wurde, in Cent   */
            this.VBEZM = this.Z_0;
            /**   Voraussichtliche Sonderzahlungen von Versorgungsbezügen im
                 Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern
                 ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
              */
            this.VBEZS = this.Z_0;
            /**   In SONSTB enthaltene Versorgungsbezüge einschließlich Sterbegeld in Cent (ggf. 0)   */
            this.VBS = this.Z_0;
            /**   Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)   */
            this.ZKF = this.Z_0;
            /**   Zahl der Monate, für die Versorgungsbezüge gezahlt werden [nur
                 erforderlich bei Jahresberechnung (LZZ = 1)]   */
            this.ZMVB = 0;
            /**    AUSGABEPARAMETER    */
            /**   Bemessungsgrundlage für die Kirchenlohnsteuer in Cent   */
            this.BK = this.Z_0;
            /**   Bemessungsgrundlage der sonstigen Bezüge  für die Kirchenlohnsteuer in Cent.
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
                 Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern BK
                 (maximal bis 0). Der Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen
                 im Rahmen der Veranlagung zur Einkommensteuer bleibt unberührt.   */
            this.BKS = this.Z_0;
            /**   Für den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cent   */
            this.LSTLZZ = this.Z_0;
            /**   Für den Lohnzahlungszeitraum einzubehaltender Solidaritätszuschlag
                 in Cent   */
            this.SOLZLZZ = this.Z_0;
            /**   Solidaritätszuschlag für sonstige Bezüge in Cent.
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
                 Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren,
                 mindern SOLZLZZ (maximal bis 0). Der Sonderausgabenabzug für
                 tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                 Veranlagung zur Einkommensteuer bleibt unberührt.   */
            this.SOLZS = this.Z_0;
            /**   Lohnsteuer für sonstige Bezüge in Cent
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern LSTLZZ (maximal bis 0). Der
                 Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                 Veranlagung zur Einkommensteuer bleibt unberührt.   */
            this.STS = this.Z_0;
            /**    AUSGABEPARAMETER DBA    */
            /**   Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent   */
            this.VFRB = this.Z_0;
            /**   Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent   */
            this.VFRBS1 = this.Z_0;
            /**   Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent   */
            this.VFRBS2 = this.Z_0;
            /**   Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
                dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent   */
            this.WVFRB = this.Z_0;
            /**   Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
                bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent   */
            this.WVFRBO = this.Z_0;
            /**   Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
                über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent   */
            this.WVFRBM = this.Z_0;
            /**    INTERNE FELDER    */
            /**   Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)   */
            this.ALTE = this.Z_0;
            /**   Arbeitnehmer-Pauschbetrag/Werbungskosten-Pauschbetrag in Euro   */
            this.ANP = this.Z_0;
            /**   Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
                     auf ganze Cent abgerundet   */
            this.ANTEIL1 = this.Z_0;
            /**   Beitragssatz des Arbeitnehmers zur Arbeitslosenversicherung (4 Dezimalstellen)   */
            this.AVSATZAN = this.Z_0;
            /**   Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung
                     und der sozialen Pflegeversicherung in Euro   */
            this.BBGKVPV = this.Z_0;
            /**   Allgemeine Beitragsbemessungsgrenze in der allgemeinen Rentenversicherung und Arbeitslosenversicherung in Euro   */
            this.BBGRVALV = this.Z_0;
            /**   Bemessungsgrundlage für Altersentlastungsbetrag in Euro, Cent
                     (2 Dezimalstellen)   */
            this.BMG = this.Z_0;
            /**   Differenz zwischen ST1 und ST2 in Euro   */
            this.DIFF = this.Z_0;
            /**   Entlastungsbetrag für Alleinerziehende in Euro   */
            this.EFA = this.Z_0;
            /**   Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)   */
            this.FVB = this.Z_0;
            /**   Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen) für die Berechnung
                     der Lohnsteuer beim sonstigen Bezug   */
            this.FVBSO = this.Z_0;
            /**   Zuschlag zum Versorgungsfreibetrag in Euro   */
            this.FVBZ = this.Z_0;
            /**   Zuschlag zum Versorgungsfreibetrag in Euro für die Berechnung
                     der Lohnsteuer beim sonstigen Bezug   */
            this.FVBZSO = this.Z_0;
            /**   Grundfreibetrag in Euro   */
            this.GFB = this.Z_0;
            /**   Maximaler Altersentlastungsbetrag in Euro   */
            this.HBALTE = this.Z_0;
            /**   Maßgeblicher maximaler Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)   */
            this.HFVB = this.Z_0;
            /**   Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent
                     (2 Dezimalstellen)   */
            this.HFVBZ = this.Z_0;
            /**   Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
                     für die Berechnung der Lohnsteuer für den sonstigen Bezug   */
            this.HFVBZSO = this.Z_0;
            /**   Zwischenfeld zu X für die Berechnung der Steuer nach § 39b
                     Absatz 2 Satz 7 EStG in Euro   */
            this.HOCH = this.Z_0;
            /**   Nummer der Tabellenwerte für Versorgungsparameter   */
            this.J = 0;
            /**   Jahressteuer nach § 51a EStG, aus der Solidaritätszuschlag und
                     Bemessungsgrundlage für die Kirchenlohnsteuer ermittelt werden in Euro   */
            this.JBMG = this.Z_0;
            /**   Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent
                     (2 Dezimalstellen)   */
            this.JLFREIB = this.Z_0;
            /**   Auf einen Jahreslohn hochgerechnete LZZHINZU in Euro, Cent
                     (2 Dezimalstellen)   */
            this.JLHINZU = this.Z_0;
            /**   Jahreswert, dessen Anteil für einen Lohnzahlungszeitraum in
                     UPANTEIL errechnet werden soll in Cent   */
            this.JW = this.Z_0;
            /**   Nummer der Tabellenwerte für Parameter bei Altersentlastungsbetrag   */
            this.K = 0;
            /**   Summe der Freibeträge für Kinder in Euro   */
            this.KFB = this.Z_0;
            /**   Beitragssatz des Arbeitnehmers zur Krankenversicherung
                     (5 Dezimalstellen)   */
            this.KVSATZAN = this.Z_0;
            /**   Kennzahl für die Einkommensteuer-Tabellenart:
                     1 = Grundtarif
                     2 = Splittingverfahren   */
            this.KZTAB = 0;
            /**   Jahreslohnsteuer in Euro   */
            this.LSTJAHR = this.Z_0;
            /**   Zwischenfelder der Jahreslohnsteuer in Cent   */
            this.LSTOSO = this.Z_0;
            this.LSTSO = this.Z_0;
            /**   Mindeststeuer für die Steuerklassen V und VI in Euro   */
            this.MIST = this.Z_0;
            /**   Auf einen Jahreswert hochgerechneter Arbeitgeberzuschuss für eine private Basiskranken-
                     bzw. Pflege-Pflichtversicherung im Sinne des § 10 Absatz 1 Nummer 3 EStG in Euro, Cent (2 Dezimalstellen)  */
            this.PKPVAGZJ = this.Z_0;
            /**   Beitragssatz des Arbeitnehmers zur Pflegeversicherung (6 Dezimalstellen)  */
            this.PVSATZAN = this.Z_0;
            /**   Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)    */
            this.RVSATZAN = this.Z_0;
            /**   Rechenwert in Gleitkommadarstellung   */
            this.RW = this.Z_0;
            /**   Sonderausgaben-Pauschbetrag in Euro   */
            this.SAP = this.Z_0;
            /**   Freigrenze für den Solidaritätszuschlag in Euro   */
            this.SOLZFREI = this.Z_0;
            /**   Solidaritätszuschlag auf die Jahreslohnsteuer in Euro, Cent (2 Dezimalstellen)   */
            this.SOLZJ = this.Z_0;
            /**   Zwischenwert für den Solidaritätszuschlag auf die Jahreslohnsteuer
                     in Euro, Cent (2 Dezimalstellen)   */
            this.SOLZMIN = this.Z_0;
            /**   Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge in Euro   */
            this.SOLZSBMG = this.Z_0;
            /**   Zu versteuerndes Einkommen für die Ermittlung der
                     Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der
                     Freigrenze beim Solidaritätszuschlag für sonstige Bezüge in Euro,
                     Cent (2 Dezimalstellen)   */
            this.SOLZSZVE = this.Z_0;
            /**   Tarifliche Einkommensteuer in Euro   */
            this.ST = this.Z_0;
            /**   Tarifliche Einkommensteuer auf das 1,25-fache ZX in Euro   */
            this.ST1 = this.Z_0;
            /**   Tarifliche Einkommensteuer auf das 0,75-fache ZX in Euro   */
            this.ST2 = this.Z_0;
            /**   Bemessungsgrundlage für den Versorgungsfreibetrag in Cent   */
            this.VBEZB = this.Z_0;
            /**   Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für
                     den sonstigen Bezug   */
            this.VBEZBSO = this.Z_0;
            /**   Zwischenfeld zu X für die Berechnung der Steuer nach § 39b
                     Absatz 2 Satz 7 EStG in Euro   */
            this.VERGL = this.Z_0;
            /**   Auf den Höchstbetrag begrenzte Beiträge zur Arbeitslosenversicherung
                     einschließlich Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)   */
            this.VSPHB = this.Z_0;
            /**   Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung
                     sowie die gesetzliche Kranken- und soziale Pflegeversicherung nach
                     fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung
                     und private Pflege-Pflichtversicherung in Euro, Cent (2 Dezimalstellen)   */
            this.VSP = this.Z_0;
            /**   Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung sowie auf den Höchstbetrag
                     begrenzten Teilbeträgen für die Arbeitslosen-, Kranken- und Pflegeversicherung in
                     Euro, Cent (2 Dezimalstellen)  */
            this.VSPN = this.Z_0;
            /**   Teilbetrag für die Arbeitslosenversicherung bei der Berechnung der
                     Vorsorgepauschale in Euro, Cent (2 Dezimalstellen)   */
            this.VSPALV = this.Z_0;
            /**   Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken- und soziale Pflegeversicherung
                     nach fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung und private
                     Pflege-Pflichtversicherung in Euro, Cent (2 Dezimalstellen)   */
            this.VSPKVPV = this.Z_0;
            /**   Teilbetrag für die Rentenversicherung bei der Berechnung der Vorsorgepauschale
                     in Euro, Cent (2 Dezimalstellen)   */
            this.VSPR = this.Z_0;
            /**   Erster Grenzwert in Steuerklasse V/VI in Euro   */
            this.W1STKL5 = this.Z_0;
            /**   Zweiter Grenzwert in Steuerklasse V/VI in Euro   */
            this.W2STKL5 = this.Z_0;
            /**   Dritter Grenzwert in Steuerklasse V/VI in Euro   */
            this.W3STKL5 = this.Z_0;
            /**   Zu versteuerndes Einkommen gem. § 32a Absatz 1 und 5 EStG in Euro, Cent
                     (2 Dezimalstellen)   */
            this.X = this.Z_0;
            /**   Gem. § 32a Absatz 1 EStG (6 Dezimalstellen)   */
            this.Y = this.Z_0;
            /**   Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
                     nach Abzug der Freibeträge nach § 39 b Absatz 2 Satz 3 und 4 EStG   */
            this.ZRE4 = this.Z_0;
            /**   Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)   */
            this.ZRE4J = this.Z_0;
            /**   Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der
                     Entschädigungen i.S.d. § 24 Nummer 1 EStG in Euro, Cent
                     (2 Dezimalstellen)   */
            this.ZRE4VP = this.Z_0;
            /**   Zwischenfeld zu ZRE4VP für die Begrenzung auf die jeweilige
                     Beitragsbemessungsgrenze in Euro, Cent (2 Dezimalstellen)"    */
            this.ZRE4VPR = this.Z_0;
            /**   Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in Euro, Cent
                     (2 Dezimalstellen)   */
            this.ZTABFB = this.Z_0;
            /**   Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in
                     Euro, Cent (2 Dezimalstellen)   */
            this.ZVBEZ = this.Z_0;
            /**   Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)   */
            this.ZVBEZJ = this.Z_0;
            /**   Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)   */
            this.ZVE = this.Z_0;
            /**   Zwischenfeld zu X für die Berechnung der Steuer nach § 39b
                     Absatz 2 Satz 7 EStG in Euro   */
            this.ZX = this.Z_0;
            /**   Zwischenfeld zu X für die Berechnung der Steuer nach § 39b
                     Absatz 2 Satz 7 EStG in Euro   */
            this.ZZX = this.Z_0;
            /**   Tabelle für die Prozentsätze des Versorgungsfreibetrags   */
            this.TAB1 = [this.Z_0, new big_js_1.default(0.4), new big_js_1.default(0.384), new big_js_1.default(0.368), new big_js_1.default(0.352), new big_js_1.default(0.336), new big_js_1.default(0.32), new big_js_1.default(0.304), new big_js_1.default(0.288), new big_js_1.default(0.272), new big_js_1.default(0.256), new big_js_1.default(0.24), new big_js_1.default(0.224), new big_js_1.default(0.208), new big_js_1.default(0.192), new big_js_1.default(0.176), new big_js_1.default(0.16), new big_js_1.default(0.152), new big_js_1.default(0.144), new big_js_1.default(0.14), new big_js_1.default(0.136), new big_js_1.default(0.132), new big_js_1.default(0.128), new big_js_1.default(0.124), new big_js_1.default(0.12), new big_js_1.default(0.116), new big_js_1.default(0.112), new big_js_1.default(0.108), new big_js_1.default(0.104), new big_js_1.default(0.1), new big_js_1.default(0.096), new big_js_1.default(0.092), new big_js_1.default(0.088), new big_js_1.default(0.084), new big_js_1.default(0.08), new big_js_1.default(0.076), new big_js_1.default(0.072), new big_js_1.default(0.068), new big_js_1.default(0.064), new big_js_1.default(0.06), new big_js_1.default(0.056), new big_js_1.default(0.052), new big_js_1.default(0.048), new big_js_1.default(0.044), new big_js_1.default(0.04), new big_js_1.default(0.036), new big_js_1.default(0.032), new big_js_1.default(0.028), new big_js_1.default(0.024), new big_js_1.default(0.02), new big_js_1.default(0.016), new big_js_1.default(0.012), new big_js_1.default(0.008), new big_js_1.default(0.004), new big_js_1.default(0)];
            /**   Tabelle für die Höchstbeträge des Versorgungsfreibetrags   */
            this.TAB2 = [this.Z_0, new big_js_1.default(3000), new big_js_1.default(2880), new big_js_1.default(2760), new big_js_1.default(2640), new big_js_1.default(2520), new big_js_1.default(2400), new big_js_1.default(2280), new big_js_1.default(2160), new big_js_1.default(2040), new big_js_1.default(1920), new big_js_1.default(1800), new big_js_1.default(1680), new big_js_1.default(1560), new big_js_1.default(1440), new big_js_1.default(1320), new big_js_1.default(1200), new big_js_1.default(1140), new big_js_1.default(1080), new big_js_1.default(1050), new big_js_1.default(1020), new big_js_1.default(990), new big_js_1.default(960), new big_js_1.default(930), new big_js_1.default(900), new big_js_1.default(870), new big_js_1.default(840), new big_js_1.default(810), new big_js_1.default(780), new big_js_1.default(750), new big_js_1.default(720), new big_js_1.default(690), new big_js_1.default(660), new big_js_1.default(630), new big_js_1.default(600), new big_js_1.default(570), new big_js_1.default(540), new big_js_1.default(510), new big_js_1.default(480), new big_js_1.default(450), new big_js_1.default(420), new big_js_1.default(390), new big_js_1.default(360), new big_js_1.default(330), new big_js_1.default(300), new big_js_1.default(270), new big_js_1.default(240), new big_js_1.default(210), new big_js_1.default(180), new big_js_1.default(150), new big_js_1.default(120), new big_js_1.default(90), new big_js_1.default(60), new big_js_1.default(30), new big_js_1.default(0)];
            /**   Tabelle für die Zuschläge zum Versorgungsfreibetrag   */
            this.TAB3 = [this.Z_0, new big_js_1.default(900), new big_js_1.default(864), new big_js_1.default(828), new big_js_1.default(792), new big_js_1.default(756), new big_js_1.default(720), new big_js_1.default(684), new big_js_1.default(648), new big_js_1.default(612), new big_js_1.default(576), new big_js_1.default(540), new big_js_1.default(504), new big_js_1.default(468), new big_js_1.default(432), new big_js_1.default(396), new big_js_1.default(360), new big_js_1.default(342), new big_js_1.default(324), new big_js_1.default(315), new big_js_1.default(306), new big_js_1.default(297), new big_js_1.default(288), new big_js_1.default(279), new big_js_1.default(270), new big_js_1.default(261), new big_js_1.default(252), new big_js_1.default(243), new big_js_1.default(234), new big_js_1.default(225), new big_js_1.default(216), new big_js_1.default(207), new big_js_1.default(198), new big_js_1.default(189), new big_js_1.default(180), new big_js_1.default(171), new big_js_1.default(162), new big_js_1.default(153), new big_js_1.default(144), new big_js_1.default(135), new big_js_1.default(126), new big_js_1.default(117), new big_js_1.default(108), new big_js_1.default(99), new big_js_1.default(90), new big_js_1.default(81), new big_js_1.default(72), new big_js_1.default(63), new big_js_1.default(54), new big_js_1.default(45), new big_js_1.default(36), new big_js_1.default(27), new big_js_1.default(18), new big_js_1.default(9), new big_js_1.default(0)];
            /**   Tabelle für die Höchstbeträge des Altersentlastungsbetrags   */
            this.TAB4 = [this.Z_0, new big_js_1.default(0.4), new big_js_1.default(0.384), new big_js_1.default(0.368), new big_js_1.default(0.352), new big_js_1.default(0.336), new big_js_1.default(0.32), new big_js_1.default(0.304), new big_js_1.default(0.288), new big_js_1.default(0.272), new big_js_1.default(0.256), new big_js_1.default(0.24), new big_js_1.default(0.224), new big_js_1.default(0.208), new big_js_1.default(0.192), new big_js_1.default(0.176), new big_js_1.default(0.16), new big_js_1.default(0.152), new big_js_1.default(0.144), new big_js_1.default(0.14), new big_js_1.default(0.136), new big_js_1.default(0.132), new big_js_1.default(0.128), new big_js_1.default(0.124), new big_js_1.default(0.12), new big_js_1.default(0.116), new big_js_1.default(0.112), new big_js_1.default(0.108), new big_js_1.default(0.104), new big_js_1.default(0.1), new big_js_1.default(0.096), new big_js_1.default(0.092), new big_js_1.default(0.088), new big_js_1.default(0.084), new big_js_1.default(0.08), new big_js_1.default(0.076), new big_js_1.default(0.072), new big_js_1.default(0.068), new big_js_1.default(0.064), new big_js_1.default(0.06), new big_js_1.default(0.056), new big_js_1.default(0.052), new big_js_1.default(0.048), new big_js_1.default(0.044), new big_js_1.default(0.04), new big_js_1.default(0.036), new big_js_1.default(0.032), new big_js_1.default(0.028), new big_js_1.default(0.024), new big_js_1.default(0.02), new big_js_1.default(0.016), new big_js_1.default(0.012), new big_js_1.default(0.008), new big_js_1.default(0.004), new big_js_1.default(0)];
            /**   Tabelle fuer die Hächstbeträge des Altersentlastungsbetrags   */
            this.TAB5 = [this.Z_0, new big_js_1.default(1900), new big_js_1.default(1824), new big_js_1.default(1748), new big_js_1.default(1672), new big_js_1.default(1596), new big_js_1.default(1520), new big_js_1.default(1444), new big_js_1.default(1368), new big_js_1.default(1292), new big_js_1.default(1216), new big_js_1.default(1140), new big_js_1.default(1064), new big_js_1.default(988), new big_js_1.default(912), new big_js_1.default(836), new big_js_1.default(760), new big_js_1.default(722), new big_js_1.default(684), new big_js_1.default(665), new big_js_1.default(646), new big_js_1.default(627), new big_js_1.default(608), new big_js_1.default(589), new big_js_1.default(570), new big_js_1.default(551), new big_js_1.default(532), new big_js_1.default(513), new big_js_1.default(494), new big_js_1.default(475), new big_js_1.default(456), new big_js_1.default(437), new big_js_1.default(418), new big_js_1.default(399), new big_js_1.default(380), new big_js_1.default(361), new big_js_1.default(342), new big_js_1.default(323), new big_js_1.default(304), new big_js_1.default(285), new big_js_1.default(266), new big_js_1.default(247), new big_js_1.default(228), new big_js_1.default(209), new big_js_1.default(190), new big_js_1.default(171), new big_js_1.default(152), new big_js_1.default(133), new big_js_1.default(114), new big_js_1.default(95), new big_js_1.default(76), new big_js_1.default(57), new big_js_1.default(38), new big_js_1.default(19), new big_js_1.default(0)];
            /**   Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte   */
            this.ZAHL1 = this.Z_1;
            this.ZAHL2 = new big_js_1.default(2);
            this.ZAHL5 = new big_js_1.default(5);
            this.ZAHL7 = new big_js_1.default(7);
            this.ZAHL12 = new big_js_1.default(12);
            this.ZAHL100 = new big_js_1.default(100);
            this.ZAHL360 = new big_js_1.default(360);
            this.ZAHL500 = new big_js_1.default(500);
            this.ZAHL700 = new big_js_1.default(700);
            this.ZAHL1000 = new big_js_1.default(1000);
            this.ZAHL10000 = new big_js_1.default(10000);
        }
        /**   PROGRAMMABLAUFPLAN 2026
       Steueruung, PAP Seite 13   */
        Lohnsteuer2026Big.prototype.calculate = function () {
            this.MPARA();
            this.MRE4JL();
            this.VBEZBSO = this.Z_0;
            this.MRE4();
            this.MRE4ABZ();
            this.MBERECH();
            this.MSONST();
        };
        /**   Zuweisung von Werten für bestimmte Steuer- und Sozialversicherungsparameter  PAP Seite 14   */
        Lohnsteuer2026Big.prototype.MPARA = function () {
            this.BBGRVALV = new big_js_1.default(101400);
            this.AVSATZAN = new big_js_1.default(0.013);
            this.RVSATZAN = new big_js_1.default(0.093);
            this.BBGKVPV = new big_js_1.default(69750);
            this.KVSATZAN = (this.KVZ.div(this.ZAHL2).div(this.ZAHL100)).add(new big_js_1.default(0.07));
            if (this.PVS == 1) {
                this.PVSATZAN = new big_js_1.default(0.023);
            }
            else {
                this.PVSATZAN = new big_js_1.default(0.018);
            }
            if (this.PVZ == 1) {
                this.PVSATZAN = this.PVSATZAN.add(new big_js_1.default(0.006));
            }
            else {
                this.PVSATZAN = this.PVSATZAN.sub(this.PVA.mul(new big_js_1.default(0.0025)));
            }
            this.W1STKL5 = new big_js_1.default(14071);
            this.W2STKL5 = new big_js_1.default(34939);
            this.W3STKL5 = new big_js_1.default(222260);
            this.GFB = new big_js_1.default(12348);
            this.SOLZFREI = new big_js_1.default(20350);
        };
        /**   Ermittlung des Jahresarbeitslohns nach § 39 b Absatz 2 Satz 2 EStG, PAP Seite 15   */
        Lohnsteuer2026Big.prototype.MRE4JL = function () {
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
        /**   Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag (§ 39b Absatz 2 Satz 3 EStG), PAP Seite 16   */
        Lohnsteuer2026Big.prototype.MRE4 = function () {
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
                    if (this.VJAHR < 2058) {
                        this.J = this.VJAHR - 2004;
                    }
                    else {
                        this.J = 54;
                    }
                }
                if (this.LZZ == 1) {
                    this.VBEZB = (this.VBEZM.mul(new big_js_1.default(this.ZMVB))).add(this.VBEZS);
                    this.HFVB = this.TAB2[this.J].div(this.ZAHL12).mul(new big_js_1.default(this.ZMVB)).round(0, big_js_1.default.roundUp);
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
                if (this.FVB.cmp(this.ZVBEZJ) == 1) {
                    this.FVB = this.ZVBEZJ;
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
        /**   Altersentlastungsbetrag (§ 39b Absatz 2 Satz 3 EStG), PAP Seite 17   */
        Lohnsteuer2026Big.prototype.MRE4ALTE = function () {
            if (this.ALTER1 == 0) {
                this.ALTE = this.Z_0;
            }
            else {
                if (this.AJAHR < 2006) {
                    this.K = 1;
                }
                else {
                    if (this.AJAHR < 2058) {
                        this.K = this.AJAHR - 2004;
                    }
                    else {
                        this.K = 54;
                    }
                }
                this.BMG = this.ZRE4J.sub(this.ZVBEZJ);
                this.ALTE = (this.BMG.mul(this.TAB4[this.K])).round(0, big_js_1.default.roundUp);
                this.HBALTE = this.TAB5[this.K];
                if (this.ALTE.cmp(this.HBALTE) == 1) {
                    this.ALTE = this.HBALTE;
                }
            }
        };
        /**   Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge nach § 39 b Absatz 2 Satz 3 und 4 EStG, PAP Seite 20   */
        Lohnsteuer2026Big.prototype.MRE4ABZ = function () {
            this.ZRE4 = (this.ZRE4J.sub(this.FVB).sub(this.ALTE).sub(this.JLFREIB).add(this.JLHINZU)).round(2, big_js_1.default.roundDown);
            if (this.ZRE4.cmp(this.Z_0) == -1) {
                this.ZRE4 = this.Z_0;
            }
            this.ZRE4VP = this.ZRE4J;
            this.ZVBEZ = this.ZVBEZJ.sub(this.FVB).round(2, big_js_1.default.roundDown);
            if (this.ZVBEZ.cmp(this.Z_0) == -1) {
                this.ZVBEZ = this.Z_0;
            }
        };
        /**   Berechnung fuer laufende Lohnzahlungszeitraueme Seite 21  */
        Lohnsteuer2026Big.prototype.MBERECH = function () {
            this.MZTABFB();
            this.VFRB = ((this.ANP.add(this.FVB.add(this.FVBZ))).mul(this.ZAHL100)).round(0, big_js_1.default.roundDown);
            this.MLSTJAHR();
            this.WVFRB = ((this.ZVE.sub(this.GFB)).mul(this.ZAHL100)).round(0, big_js_1.default.roundDown);
            if (this.WVFRB.cmp(this.Z_0) == -1) {
                this.WVFRB = this.Z_0;
            }
            this.LSTJAHR = (this.ST.mul(new big_js_1.default(this.f))).round(0, big_js_1.default.roundDown);
            this.UPLSTLZZ();
            if (this.ZKF.cmp(this.Z_0) == 1) {
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
        /**   Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 22   */
        Lohnsteuer2026Big.prototype.MZTABFB = function () {
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
                this.FVBZ = this.Z_0;
                this.FVBZSO = this.Z_0;
            }
            if (this.STKL < 6) {
                if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
                    if (this.ZRE4.sub(this.ZVBEZ).cmp(new big_js_1.default(1230)) == -1) {
                        this.ANP = this.ANP.add(this.ZRE4).sub(this.ZVBEZ).round(0, big_js_1.default.roundUp);
                    }
                    else {
                        this.ANP = this.ANP.add(new big_js_1.default(1230));
                    }
                }
            }
            this.KZTAB = 1;
            if (this.STKL == 1) {
                this.SAP = new big_js_1.default(36);
                this.KFB = (this.ZKF.mul(new big_js_1.default(9756))).round(0, big_js_1.default.roundDown);
            }
            else {
                if (this.STKL == 2) {
                    this.EFA = new big_js_1.default(4260);
                    this.SAP = new big_js_1.default(36);
                    this.KFB = (this.ZKF.mul(new big_js_1.default(9756))).round(0, big_js_1.default.roundDown);
                }
                else {
                    if (this.STKL == 3) {
                        this.KZTAB = 2;
                        this.SAP = new big_js_1.default(36);
                        this.KFB = (this.ZKF.mul(new big_js_1.default(9756))).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        if (this.STKL == 4) {
                            this.SAP = new big_js_1.default(36);
                            this.KFB = (this.ZKF.mul(new big_js_1.default(4878))).round(0, big_js_1.default.roundDown);
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
        /**   Ermittlung Jahreslohnsteuer, PAP Seite 23   */
        Lohnsteuer2026Big.prototype.MLSTJAHR = function () {
            this.UPEVP();
            this.ZVE = this.ZRE4.sub(this.ZTABFB).sub(this.VSP);
            this.UPMLST();
        };
        /**   PAP Seite 24   */
        Lohnsteuer2026Big.prototype.UPLSTLZZ = function () {
            this.JW = this.LSTJAHR.mul(this.ZAHL100);
            this.UPANTEIL();
            this.LSTLZZ = this.ANTEIL1;
        };
        /**   PAP Seite 25   */
        Lohnsteuer2026Big.prototype.UPMLST = function () {
            if (this.ZVE.cmp(this.ZAHL1) == -1) {
                this.ZVE = this.Z_0;
                this.X = this.Z_0;
            }
            else {
                this.X = (this.ZVE.div(new big_js_1.default(this.KZTAB))).round(0, big_js_1.default.roundDown);
            }
            if (this.STKL < 5) {
                this.UPTAB26();
            }
            else {
                this.MST5_6();
            }
        };
        /**   	Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 EStG) PAP Seite 26    */
        Lohnsteuer2026Big.prototype.UPEVP = function () {
            if (this.KRV == 1) {
                this.VSPR = this.Z_0;
            }
            else {
                if (this.ZRE4VP.cmp(this.BBGRVALV) == 1) {
                    this.ZRE4VPR = this.BBGRVALV;
                }
                else {
                    this.ZRE4VPR = this.ZRE4VP;
                }
                this.VSPR = (this.ZRE4VPR.mul(this.RVSATZAN)).round(2, big_js_1.default.roundDown);
            }
            this.MVSPKVPV();
            if (this.ALV == 1) {
                /**   NOP   */
            }
            else {
                if (this.STKL == 6) {
                    /**   NOP   */
                }
                else {
                    this.MVSPHB();
                }
            }
        };
        /**   Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 Buchstaben b bis d EStG), PAP Seite 27   */
        Lohnsteuer2026Big.prototype.MVSPKVPV = function () {
            if (this.ZRE4VP.cmp(this.BBGKVPV) == 1) {
                this.ZRE4VPR = this.BBGKVPV;
            }
            else {
                this.ZRE4VPR = this.ZRE4VP;
            }
            if (this.PKV > 0) {
                if (this.STKL == 6) {
                    this.VSPKVPV = this.Z_0;
                }
                else {
                    this.PKPVAGZJ = this.PKPVAGZ.mul(this.ZAHL12).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                    this.VSPKVPV = this.PKPV.mul(this.ZAHL12).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                    this.VSPKVPV = this.VSPKVPV.sub(this.PKPVAGZJ);
                    if (this.VSPKVPV.cmp(this.Z_0) == -1) {
                        this.VSPKVPV = this.Z_0;
                    }
                }
            }
            else {
                this.VSPKVPV = this.ZRE4VPR.mul(this.KVSATZAN.add(this.PVSATZAN)).round(2, big_js_1.default.roundDown);
            }
            this.VSP = this.VSPKVPV.add(this.VSPR).round(0, big_js_1.default.roundUp);
        };
        /**   Höchstbetragsberechnung zur Arbeitslosenversicherung (§ 39b Absatz 2 Satz 5 Nummer 3 Buchstabe e EStG), PAP Seite 28    */
        Lohnsteuer2026Big.prototype.MVSPHB = function () {
            if (this.ZRE4VP.cmp(this.BBGRVALV) == 1) {
                this.ZRE4VPR = this.BBGRVALV;
            }
            else {
                this.ZRE4VPR = this.ZRE4VP;
            }
            this.VSPALV = this.AVSATZAN.mul(this.ZRE4VPR).round(2, big_js_1.default.roundDown);
            this.VSPHB = this.VSPALV.add(this.VSPKVPV).round(2, big_js_1.default.roundDown);
            if (this.VSPHB.cmp(new big_js_1.default(1900)) == 1) {
                this.VSPHB = new big_js_1.default(1900);
            }
            this.VSPN = this.VSPR.add(this.VSPHB).round(0, big_js_1.default.roundUp);
            if (this.VSPN.cmp(this.VSP) == 1) {
                this.VSP = this.VSPN;
            }
        };
        /**   Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Absatz 2 Satz 7 EStG), PAP Seite 29   */
        Lohnsteuer2026Big.prototype.MST5_6 = function () {
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
                    this.HOCH = (this.ST.add((this.ZZX.sub(this.W1STKL5)).mul(new big_js_1.default(0.42)))).round(0, big_js_1.default.roundDown);
                    if (this.HOCH.cmp(this.VERGL) == -1) {
                        this.ST = this.HOCH;
                    }
                    else {
                        this.ST = this.VERGL;
                    }
                }
            }
        };
        /**   Unterprogramm zur Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Absatz 2 Satz 7 EStG), PAP Seite 30   */
        Lohnsteuer2026Big.prototype.UP5_6 = function () {
            this.X = (this.ZX.mul(new big_js_1.default(1.25))).round(0, big_js_1.default.roundDown);
            this.UPTAB26();
            this.ST1 = this.ST;
            this.X = (this.ZX.mul(new big_js_1.default(0.75))).round(0, big_js_1.default.roundDown);
            this.UPTAB26();
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
        /**   Solidaritätszuschlag, PAP Seite 31   */
        Lohnsteuer2026Big.prototype.MSOLZ = function () {
            this.SOLZFREI = (this.SOLZFREI.mul(new big_js_1.default(this.KZTAB)));
            if (this.JBMG.cmp(this.SOLZFREI) == 1) {
                this.SOLZJ = (this.JBMG.mul(new big_js_1.default(5.5))).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                this.SOLZMIN = (this.JBMG.sub(this.SOLZFREI)).mul(new big_js_1.default(11.9)).div(this.ZAHL100).round(2, big_js_1.default.roundDown);
                if (this.SOLZMIN.cmp(this.SOLZJ) == -1) {
                    this.SOLZJ = this.SOLZMIN;
                }
                this.JW = this.SOLZJ.mul(this.ZAHL100).round(0, big_js_1.default.roundDown);
                this.UPANTEIL();
                this.SOLZLZZ = this.ANTEIL1;
            }
            else {
                this.SOLZLZZ = this.Z_0;
            }
            if (this.R > 0) {
                this.JW = this.JBMG.mul(this.ZAHL100);
                this.UPANTEIL();
                this.BK = this.ANTEIL1;
            }
            else {
                this.BK = this.Z_0;
            }
        };
        /**   Anteil von Jahresbeträgen fuer einen LZZ (§ 39b Absatz 2 Satz 9 EStG), PAP Seite 32   */
        Lohnsteuer2026Big.prototype.UPANTEIL = function () {
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
        /**   Berechnung sonstiger Bezüge nach § 39b Absatz 3 Sätze 1 bis 8 EStG, PAP Seite 33   */
        Lohnsteuer2026Big.prototype.MSONST = function () {
            this.LZZ = 1;
            if (this.ZMVB == 0) {
                this.ZMVB = 12;
            }
            if (this.SONSTB.cmp(this.Z_0) == 0 && this.MBV.cmp(this.Z_0) == 0) {
                this.LSTSO = this.Z_0;
                this.STS = this.Z_0;
                this.SOLZS = this.Z_0;
                this.BKS = this.Z_0;
            }
            else {
                this.MOSONST();
                this.ZRE4J = ((this.JRE4.add(this.SONSTB)).div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
                this.ZVBEZJ = ((this.JVBEZ.add(this.VBS)).div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
                this.VBEZBSO = this.STERBE;
                this.MRE4SONST();
                this.MLSTJAHR();
                this.WVFRBM = (this.ZVE.sub(this.GFB)).mul(this.ZAHL100).round(2, big_js_1.default.roundDown);
                if (this.WVFRBM.cmp(this.Z_0) == -1) {
                    /**   WVFRBM < 0   */
                    this.WVFRBM = this.Z_0;
                }
                this.LSTSO = this.ST.mul(this.ZAHL100);
                /**   lt. PAP:  "Hinweis: negative Zahlen werden nach ihrem Betrag gerundet!"   */
                /**   Fallunterscheidung bzgl. negativer Zahlen nicht nötig, da die Java-Klasse BigDecimal.ROUND_DOWN    */
                /**   die Ziffer und nicht die Zahl abrundet, also aus -4.5 wird -4 und aus 4.5 wird 4   */
                this.STS = this.LSTSO.sub(this.LSTOSO).mul(new big_js_1.default(this.f)).div(this.ZAHL100).round(0, big_js_1.default.roundDown).mul(this.ZAHL100);
                this.STSMIN();
            }
        };
        /**   PAP Seite 34   */
        Lohnsteuer2026Big.prototype.STSMIN = function () {
            if (this.STS.cmp(this.Z_0) == -1) {
                if (this.MBV.cmp(this.Z_0) == 0) {
                    /**   NOP   */
                }
                else {
                    this.LSTLZZ = this.LSTLZZ.add(this.STS);
                    if (this.LSTLZZ.cmp(this.Z_0) == -1) {
                        this.LSTLZZ = this.Z_0;
                    }
                    this.SOLZLZZ = this.SOLZLZZ.add(this.STS.mul(new big_js_1.default(5.5).div(this.ZAHL100))).round(0, big_js_1.default.roundDown);
                    if (this.SOLZLZZ.cmp(this.Z_0) == -1) {
                        this.SOLZLZZ = this.Z_0;
                    }
                    this.BK = this.BK.add(this.STS);
                    if (this.BK.cmp(this.Z_0) == -1) {
                        this.BK = this.Z_0;
                    }
                }
                this.STS = this.Z_0;
                this.SOLZS = this.Z_0;
            }
            else {
                this.MSOLZSTS();
            }
            if (this.R > 0) {
                this.BKS = this.STS;
            }
            else {
                this.BKS = this.Z_0;
            }
        };
        /**   Berechnung des SolZ auf sonstige Bezüge, PAP Seite 35   */
        Lohnsteuer2026Big.prototype.MSOLZSTS = function () {
            if (this.ZKF.cmp(this.Z_0) == 1) {
                this.SOLZSZVE = this.ZVE.sub(this.KFB);
            }
            else {
                this.SOLZSZVE = this.ZVE;
            }
            if (this.SOLZSZVE.cmp(this.ZAHL1) == -1) {
                this.SOLZSZVE = this.Z_0;
                this.X = this.Z_0;
            }
            else {
                this.X = this.SOLZSZVE.div(new big_js_1.default(this.KZTAB)).round(0, big_js_1.default.roundDown);
            }
            if (this.STKL < 5) {
                this.UPTAB26();
            }
            else {
                this.MST5_6();
            }
            this.SOLZSBMG = this.ST.mul(new big_js_1.default(this.f)).round(0, big_js_1.default.roundDown);
            if (this.SOLZSBMG.cmp(this.SOLZFREI) == 1) {
                this.SOLZS = this.STS.mul(new big_js_1.default(5.5)).div(this.ZAHL100).round(0, big_js_1.default.roundDown);
            }
            else {
                this.SOLZS = this.Z_0;
            }
        };
        /**   Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen, PAP Seite 36   */
        Lohnsteuer2026Big.prototype.MOSONST = function () {
            this.ZRE4J = (this.JRE4.div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
            this.ZVBEZJ = (this.JVBEZ.div(this.ZAHL100)).round(2, big_js_1.default.roundDown);
            this.JLFREIB = this.JFREIB.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
            this.JLHINZU = this.JHINZU.div(this.ZAHL100).round(2, big_js_1.default.roundDown);
            this.MRE4();
            this.MRE4ABZ();
            this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100));
            this.MZTABFB();
            this.VFRBS1 = ((this.ANP.add(this.FVB.add(this.FVBZ))).mul(this.ZAHL100)).round(2, big_js_1.default.roundDown);
            this.MLSTJAHR();
            this.WVFRBO = ((this.ZVE.sub(this.GFB)).mul(this.ZAHL100)).round(2, big_js_1.default.roundDown);
            if (this.WVFRBO.cmp(this.Z_0) == -1) {
                this.WVFRBO = this.Z_0;
            }
            this.LSTOSO = this.ST.mul(this.ZAHL100);
        };
        /**   Sonderberechnung mit sonstigen Bezüge für Berechnung bei sonstigen Bezügen, PAP Seite 37   */
        Lohnsteuer2026Big.prototype.MRE4SONST = function () {
            this.MRE4();
            this.FVB = this.FVBSO;
            this.MRE4ABZ();
            this.ZRE4VP = this.ZRE4VP.add(this.MBV.div(this.ZAHL100)).sub(this.JRE4ENT.div(this.ZAHL100)).sub(this.SONSTENT.div(this.ZAHL100));
            this.FVBZ = this.FVBZSO;
            this.MZTABFB();
            this.VFRBS2 = ((((this.ANP.add(this.FVB).add(this.FVBZ))).mul(this.ZAHL100))).sub(this.VFRBS1);
        };
        /**   Tarifliche Einkommensteuer §32a EStG, PAP Seite 38   */
        Lohnsteuer2026Big.prototype.UPTAB26 = function () {
            if (this.X.cmp(this.GFB.add(this.ZAHL1)) == -1) {
                this.ST = this.Z_0;
            }
            else {
                if (this.X.cmp(new big_js_1.default(17800)) == -1) {
                    this.Y = (this.X.sub(this.GFB)).div(this.ZAHL10000).round(6, big_js_1.default.roundDown);
                    this.RW = this.Y.mul(new big_js_1.default(914.51));
                    this.RW = this.RW.add(new big_js_1.default(1400));
                    this.ST = (this.RW.mul(this.Y)).round(0, big_js_1.default.roundDown);
                }
                else {
                    if (this.X.cmp(new big_js_1.default(69879)) == -1) {
                        this.Y = (this.X.sub(new big_js_1.default(17799))).div(this.ZAHL10000).round(6, big_js_1.default.roundDown);
                        this.RW = this.Y.mul(new big_js_1.default(173.1));
                        this.RW = this.RW.add(new big_js_1.default(2397));
                        this.RW = this.RW.mul(this.Y);
                        this.ST = (this.RW.add(new big_js_1.default(1034.87))).round(0, big_js_1.default.roundDown);
                    }
                    else {
                        if (this.X.cmp(new big_js_1.default(277826)) == -1) {
                            this.ST = ((this.X.mul(new big_js_1.default(0.42))).sub(new big_js_1.default(11135.63))).round(0, big_js_1.default.roundDown);
                        }
                        else {
                            this.ST = ((this.X.mul(new big_js_1.default(0.45))).sub(new big_js_1.default(19470.38))).round(0, big_js_1.default.roundDown);
                        }
                    }
                }
            }
            this.ST = this.ST.mul(new big_js_1.default(this.KZTAB));
        };
        /**
         * Getter for af.
         * <p>
         *   1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getAf = function () {
            return this.af;
        };
        /**
         * Setter for af.
         * <p>
         *   1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
         * <p>
         * @param {number} af input value
         */
        Lohnsteuer2026Big.prototype.setAf = function (af) {
            this.af = af;
        };
        /**
         * Getter for AJAHR.
         * <p>
         *   Auf die Vollendung des 64. Lebensjahres folgende
                     Kalenderjahr (erforderlich, wenn ALTER1=1)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getAJAHR = function () {
            return this.AJAHR;
        };
        /**
         * Setter for AJAHR.
         * <p>
         *   Auf die Vollendung des 64. Lebensjahres folgende
                     Kalenderjahr (erforderlich, wenn ALTER1=1)
         * <p>
         * @param {number} AJAHR input value
         */
        Lohnsteuer2026Big.prototype.setAJAHR = function (AJAHR) {
            this.AJAHR = AJAHR;
        };
        /**
         * Getter for ALTER1.
         * <p>
         *   1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                     der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getALTER1 = function () {
            return this.ALTER1;
        };
        /**
         * Setter for ALTER1.
         * <p>
         *   1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                     der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
         * <p>
         * @param {number} ALTER1 input value
         */
        Lohnsteuer2026Big.prototype.setALTER1 = function (ALTER1) {
            this.ALTER1 = ALTER1;
        };
        /**
         * Getter for ALV.
         * <p>
         *   Merker für die Vorsorgepauschale
                     0 = der Arbeitnehmer ist in der Arbeitslosenversicherung pflichtversichert; es gilt die allgemeine Beitragsbemessungsgrenze
                     1 = wenn nicht 0
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getALV = function () {
            return this.ALV;
        };
        /**
         * Setter for ALV.
         * <p>
         *   Merker für die Vorsorgepauschale
                     0 = der Arbeitnehmer ist in der Arbeitslosenversicherung pflichtversichert; es gilt die allgemeine Beitragsbemessungsgrenze
                     1 = wenn nicht 0
         * <p>
         * @param {number} ALV input value
         */
        Lohnsteuer2026Big.prototype.setALV = function (ALV) {
            this.ALV = ALV;
        };
        /**
         * Getter for f.
         * <p>
         *   eingetragener Faktor mit drei Nachkommastellen
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getF = function () {
            return this.f;
        };
        /**
         * Setter for f.
         * <p>
         *   eingetragener Faktor mit drei Nachkommastellen
         * <p>
         * @param {number} f input value
         */
        Lohnsteuer2026Big.prototype.setF = function (f) {
            this.f = f;
        };
        /**
         * Getter for JFREIB.
         * <p>
         *   Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                     sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                     elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                     auf der Bescheinigung für den Lohnsteuerabzug 2026 in Cent (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getJFREIB = function () {
            return this.JFREIB;
        };
        /**
         * Setter for JFREIB.
         * <p>
         *   Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                     sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                     elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                     auf der Bescheinigung für den Lohnsteuerabzug 2026 in Cent (ggf. 0)
         * <p>
         * @param {Big} JFREIB input value
         */
        Lohnsteuer2026Big.prototype.setJFREIB = function (JFREIB) {
            this.JFREIB = JFREIB;
        };
        /**
         * Getter for JHINZU.
         * <p>
         *   Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                     sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                     elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                     Bescheinigung für den Lohnsteuerabzug 2026 in Cent (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getJHINZU = function () {
            return this.JHINZU;
        };
        /**
         * Setter for JHINZU.
         * <p>
         *   Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                     sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                     elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                     Bescheinigung für den Lohnsteuerabzug 2026 in Cent (ggf. 0)
         * <p>
         * @param {Big} JHINZU input value
         */
        Lohnsteuer2026Big.prototype.setJHINZU = function (JHINZU) {
            this.JHINZU = JHINZU;
        };
        /**
         * Getter for JRE4.
         * <p>
         *   Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne
                     die zu besteuernden Vorteile bei Vermögensbeteiligungen,
                     § 19a Absatz 4 EStG) in Cent.
                     Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
                     Bezügen (Feld SONSTB).
                     Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
                     so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
                     besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG).
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getJRE4 = function () {
            return this.JRE4;
        };
        /**
         * Setter for JRE4.
         * <p>
         *   Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne
                     die zu besteuernden Vorteile bei Vermögensbeteiligungen,
                     § 19a Absatz 4 EStG) in Cent.
                     Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
                     Bezügen (Feld SONSTB).
                     Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
                     so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
                     besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG).
         * <p>
         * @param {Big} JRE4 input value
         */
        Lohnsteuer2026Big.prototype.setJRE4 = function (JRE4) {
            this.JRE4 = JRE4;
        };
        /**
         * Getter for JRE4ENT.
         * <p>
         *   In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                     Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG) in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getJRE4ENT = function () {
            return this.JRE4ENT;
        };
        /**
         * Setter for JRE4ENT.
         * <p>
         *   In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                     Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG) in Cent
         * <p>
         * @param {Big} JRE4ENT input value
         */
        Lohnsteuer2026Big.prototype.setJRE4ENT = function (JRE4ENT) {
            this.JRE4ENT = JRE4ENT;
        };
        /**
         * Getter for JVBEZ.
         * <p>
         *   In JRE4 enthaltene Versorgungsbezüge in Cent (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getJVBEZ = function () {
            return this.JVBEZ;
        };
        /**
         * Setter for JVBEZ.
         * <p>
         *   In JRE4 enthaltene Versorgungsbezüge in Cent (ggf. 0)
         * <p>
         * @param {Big} JVBEZ input value
         */
        Lohnsteuer2026Big.prototype.setJVBEZ = function (JVBEZ) {
            this.JVBEZ = JVBEZ;
        };
        /**
         * Getter for KRV.
         * <p>
         *  Merker für die Vorsorgepauschale
                    0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer
                    berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der
                    Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze
                    
                    1 = wenn nicht 0
                      
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getKRV = function () {
            return this.KRV;
        };
        /**
         * Setter for KRV.
         * <p>
         *  Merker für die Vorsorgepauschale
                    0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer
                    berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der
                    Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze
                    
                    1 = wenn nicht 0
                      
         * <p>
         * @param {number} KRV input value
         */
        Lohnsteuer2026Big.prototype.setKRV = function (KRV) {
            this.KRV = KRV;
        };
        /**
         * Getter for KVZ.
         * <p>
         *   Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
                 in Prozent (bspw. 2,50 für 2,50 %) mit 2 Dezimalstellen.
                 Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
                 anteil erfolgt im Programmablauf.
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getKVZ = function () {
            return this.KVZ;
        };
        /**
         * Setter for KVZ.
         * <p>
         *   Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
                 in Prozent (bspw. 2,50 für 2,50 %) mit 2 Dezimalstellen.
                 Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
                 anteil erfolgt im Programmablauf.
         * <p>
         * @param {Big} KVZ input value
         */
        Lohnsteuer2026Big.prototype.setKVZ = function (KVZ) {
            this.KVZ = KVZ;
        };
        /**
         * Getter for LZZ.
         * <p>
         *   Lohnzahlungszeitraum:
                     1 = Jahr
                     2 = Monat
                     3 = Woche
                     4 = Tag
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getLZZ = function () {
            return this.LZZ;
        };
        /**
         * Setter for LZZ.
         * <p>
         *   Lohnzahlungszeitraum:
                     1 = Jahr
                     2 = Monat
                     3 = Woche
                     4 = Tag
         * <p>
         * @param {number} LZZ input value
         */
        Lohnsteuer2026Big.prototype.setLZZ = function (LZZ) {
            this.LZZ = LZZ;
        };
        /**
         * Getter for LZZFREIB.
         * <p>
         *   Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                     oder in der Bescheinigung für den Lohnsteuerabzug 2026 eingetragene Freibetrag für den
                     Lohnzahlungszeitraum in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getLZZFREIB = function () {
            return this.LZZFREIB;
        };
        /**
         * Setter for LZZFREIB.
         * <p>
         *   Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                     oder in der Bescheinigung für den Lohnsteuerabzug 2026 eingetragene Freibetrag für den
                     Lohnzahlungszeitraum in Cent
         * <p>
         * @param {Big} LZZFREIB input value
         */
        Lohnsteuer2026Big.prototype.setLZZFREIB = function (LZZFREIB) {
            this.LZZFREIB = LZZFREIB;
        };
        /**
         * Getter for LZZHINZU.
         * <p>
         *   Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                     oder in der Bescheinigung für den Lohnsteuerabzug 2026 eingetragene Hinzurechnungsbetrag für den
                     Lohnzahlungszeitraum in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getLZZHINZU = function () {
            return this.LZZHINZU;
        };
        /**
         * Setter for LZZHINZU.
         * <p>
         *   Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                     oder in der Bescheinigung für den Lohnsteuerabzug 2026 eingetragene Hinzurechnungsbetrag für den
                     Lohnzahlungszeitraum in Cent
         * <p>
         * @param {Big} LZZHINZU input value
         */
        Lohnsteuer2026Big.prototype.setLZZHINZU = function (LZZHINZU) {
            this.LZZHINZU = LZZHINZU;
        };
        /**
         * Getter for MBV.
         * <p>
         *   Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                     (§ 19a Absatz 1 Satz 4 EStG) in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getMBV = function () {
            return this.MBV;
        };
        /**
         * Setter for MBV.
         * <p>
         *   Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                     (§ 19a Absatz 1 Satz 4 EStG) in Cent
         * <p>
         * @param {Big} MBV input value
         */
        Lohnsteuer2026Big.prototype.setMBV = function (MBV) {
            this.MBV = MBV;
        };
        /**
         * Getter for PKPV.
         * <p>
         *   Dem Arbeitgeber mitgeteilte Beiträge des Arbeitnehmers für eine private
                     Basiskranken- bzw. Pflege-Pflichtversicherung im Sinne des
                     § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom Lohnzahlungszeitraum
                     immer als Monatsbetrag anzugeben
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getPKPV = function () {
            return this.PKPV;
        };
        /**
         * Setter for PKPV.
         * <p>
         *   Dem Arbeitgeber mitgeteilte Beiträge des Arbeitnehmers für eine private
                     Basiskranken- bzw. Pflege-Pflichtversicherung im Sinne des
                     § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom Lohnzahlungszeitraum
                     immer als Monatsbetrag anzugeben
         * <p>
         * @param {Big} PKPV input value
         */
        Lohnsteuer2026Big.prototype.setPKPV = function (PKPV) {
            this.PKPV = PKPV;
        };
        /**
         * Getter for PKPVAGZ.
         * <p>
         *   Arbeitgeberzuschuss für eine private Basiskranken- bzw. Pflege-Pflichtversicherung im
                     Sinne des § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom
                     Lohnzahlungszeitraum immer als Monatsbetrag anzugeben
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getPKPVAGZ = function () {
            return this.PKPVAGZ;
        };
        /**
         * Setter for PKPVAGZ.
         * <p>
         *   Arbeitgeberzuschuss für eine private Basiskranken- bzw. Pflege-Pflichtversicherung im
                     Sinne des § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom
                     Lohnzahlungszeitraum immer als Monatsbetrag anzugeben
         * <p>
         * @param {Big} PKPVAGZ input value
         */
        Lohnsteuer2026Big.prototype.setPKPVAGZ = function (PKPVAGZ) {
            this.PKPVAGZ = PKPVAGZ;
        };
        /**
         * Getter for PKV.
         * <p>
         *   Krankenversicherung:
                     0 = gesetzlich krankenversicherte Arbeitnehmer
                     1 = ausschließlich privat krankenversicherte Arbeitnehmer
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getPKV = function () {
            return this.PKV;
        };
        /**
         * Setter for PKV.
         * <p>
         *   Krankenversicherung:
                     0 = gesetzlich krankenversicherte Arbeitnehmer
                     1 = ausschließlich privat krankenversicherte Arbeitnehmer
         * <p>
         * @param {number} PKV input value
         */
        Lohnsteuer2026Big.prototype.setPKV = function (PKV) {
            this.PKV = PKV;
        };
        /**
         * Getter for PVA.
         * <p>
         *   Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
                     bei mehr als einem Kind
                     0 = kein Abschlag
                     1 = Beitragsabschlag für das 2. Kind
                     2 = Beitragsabschläge für das 2. und 3. Kind
                     3 = Beitragsabschläge für 2. bis 4. Kinder
                     4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getPVA = function () {
            return this.PVA;
        };
        /**
         * Setter for PVA.
         * <p>
         *   Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
                     bei mehr als einem Kind
                     0 = kein Abschlag
                     1 = Beitragsabschlag für das 2. Kind
                     2 = Beitragsabschläge für das 2. und 3. Kind
                     3 = Beitragsabschläge für 2. bis 4. Kinder
                     4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder
         * <p>
         * @param {Big} PVA input value
         */
        Lohnsteuer2026Big.prototype.setPVA = function (PVA) {
            this.PVA = PVA;
        };
        /**
         * Getter for PVS.
         * <p>
         *   1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                        zu berücksichtigen wären
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getPVS = function () {
            return this.PVS;
        };
        /**
         * Setter for PVS.
         * <p>
         *   1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                        zu berücksichtigen wären
         * <p>
         * @param {number} PVS input value
         */
        Lohnsteuer2026Big.prototype.setPVS = function (PVS) {
            this.PVS = PVS;
        };
        /**
         * Getter for PVZ.
         * <p>
         *   1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                        zu zahlen hat
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getPVZ = function () {
            return this.PVZ;
        };
        /**
         * Setter for PVZ.
         * <p>
         *   1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                        zu zahlen hat
         * <p>
         * @param {number} PVZ input value
         */
        Lohnsteuer2026Big.prototype.setPVZ = function (PVZ) {
            this.PVZ = PVZ;
        };
        /**
         * Getter for R.
         * <p>
         *   Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                     Bescheinigung für den Lohnsteuerabzug 2026 (bei keiner Religionszugehörigkeit = 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getR = function () {
            return this.R;
        };
        /**
         * Setter for R.
         * <p>
         *   Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                     Bescheinigung für den Lohnsteuerabzug 2026 (bei keiner Religionszugehörigkeit = 0)
         * <p>
         * @param {number} R input value
         */
        Lohnsteuer2026Big.prototype.setR = function (R) {
            this.R = R;
        };
        /**
         * Getter for RE4.
         * <p>
         *   Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                     Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                     und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                     den Lohnsteuerabzug 2026 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                     Hinzurechnungsbetrags in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getRE4 = function () {
            return this.RE4;
        };
        /**
         * Setter for RE4.
         * <p>
         *   Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                     Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                     und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                     den Lohnsteuerabzug 2026 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                     Hinzurechnungsbetrags in Cent
         * <p>
         * @param {Big} RE4 input value
         */
        Lohnsteuer2026Big.prototype.setRE4 = function (RE4) {
            this.RE4 = RE4;
        };
        /**
         * Getter for SONSTB.
         * <p>
         *   Sonstige Bezüge einschließlich zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
                     Kapitalauszahlungen/Abfindungen, in Cent (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getSONSTB = function () {
            return this.SONSTB;
        };
        /**
         * Setter for SONSTB.
         * <p>
         *   Sonstige Bezüge einschließlich zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
                     Kapitalauszahlungen/Abfindungen, in Cent (ggf. 0)
         * <p>
         * @param {Big} SONSTB input value
         */
        Lohnsteuer2026Big.prototype.setSONSTB = function (SONSTB) {
            this.SONSTB = SONSTB;
        };
        /**
         * Getter for SONSTENT.
         * <p>
         *   In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a
                     Absatz 4 EStG), in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getSONSTENT = function () {
            return this.SONSTENT;
        };
        /**
         * Setter for SONSTENT.
         * <p>
         *   In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a
                     Absatz 4 EStG), in Cent
         * <p>
         * @param {Big} SONSTENT input value
         */
        Lohnsteuer2026Big.prototype.setSONSTENT = function (SONSTENT) {
            this.SONSTENT = SONSTENT;
        };
        /**
         * Getter for STERBE.
         * <p>
         *   Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen
                      (in SONSTB enthalten), in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getSTERBE = function () {
            return this.STERBE;
        };
        /**
         * Setter for STERBE.
         * <p>
         *   Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen
                      (in SONSTB enthalten), in Cent
         * <p>
         * @param {Big} STERBE input value
         */
        Lohnsteuer2026Big.prototype.setSTERBE = function (STERBE) {
            this.STERBE = STERBE;
        };
        /**
         * Getter for STKL.
         * <p>
         *   Steuerklasse:
                     1 = I
                     2 = II
                     3 = III
                     4 = IV
                     5 = V
                     6 = VI
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getSTKL = function () {
            return this.STKL;
        };
        /**
         * Setter for STKL.
         * <p>
         *   Steuerklasse:
                     1 = I
                     2 = II
                     3 = III
                     4 = IV
                     5 = V
                     6 = VI
         * <p>
         * @param {number} STKL input value
         */
        Lohnsteuer2026Big.prototype.setSTKL = function (STKL) {
            this.STKL = STKL;
        };
        /**
         * Getter for VBEZ.
         * <p>
         *   In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter Berücksichtigung
                     einer geänderten Bemessungsgrundlage nach  § 19 Absatz 2 Satz 10 und 11 EStG
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVBEZ = function () {
            return this.VBEZ;
        };
        /**
         * Setter for VBEZ.
         * <p>
         *   In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter Berücksichtigung
                     einer geänderten Bemessungsgrundlage nach  § 19 Absatz 2 Satz 10 und 11 EStG
         * <p>
         * @param {Big} VBEZ input value
         */
        Lohnsteuer2026Big.prototype.setVBEZ = function (VBEZ) {
            this.VBEZ = VBEZ;
        };
        /**
         * Getter for VBEZM.
         * <p>
         *   Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der
                     Versorgungsbezug erstmalig nach Januar 2005 gewährt  wurde, in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVBEZM = function () {
            return this.VBEZM;
        };
        /**
         * Setter for VBEZM.
         * <p>
         *   Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der
                     Versorgungsbezug erstmalig nach Januar 2005 gewährt  wurde, in Cent
         * <p>
         * @param {Big} VBEZM input value
         */
        Lohnsteuer2026Big.prototype.setVBEZM = function (VBEZM) {
            this.VBEZM = VBEZM;
        };
        /**
         * Getter for VBEZS.
         * <p>
         *   Voraussichtliche Sonderzahlungen von Versorgungsbezügen im
                     Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern
                     ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
                 
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVBEZS = function () {
            return this.VBEZS;
        };
        /**
         * Setter for VBEZS.
         * <p>
         *   Voraussichtliche Sonderzahlungen von Versorgungsbezügen im
                     Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern
                     ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
                 
         * <p>
         * @param {Big} VBEZS input value
         */
        Lohnsteuer2026Big.prototype.setVBEZS = function (VBEZS) {
            this.VBEZS = VBEZS;
        };
        /**
         * Getter for VBS.
         * <p>
         *   In SONSTB enthaltene Versorgungsbezüge einschließlich Sterbegeld in Cent (ggf. 0)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVBS = function () {
            return this.VBS;
        };
        /**
         * Setter for VBS.
         * <p>
         *   In SONSTB enthaltene Versorgungsbezüge einschließlich Sterbegeld in Cent (ggf. 0)
         * <p>
         * @param {Big} VBS input value
         */
        Lohnsteuer2026Big.prototype.setVBS = function (VBS) {
            this.VBS = VBS;
        };
        /**
         * Getter for VJAHR.
         * <p>
         *   Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde;
                     werden mehrere Versorgungsbezüge gezahlt, wird aus
                     Vereinfachungsgründen für die Berechnung das Jahr des ältesten
                     erstmaligen Bezugs herangezogen; auf die Möglichkeit der
                     getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a
                     EStG) wird im Übrigen verwiesen
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVJAHR = function () {
            return this.VJAHR;
        };
        /**
         * Setter for VJAHR.
         * <p>
         *   Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde;
                     werden mehrere Versorgungsbezüge gezahlt, wird aus
                     Vereinfachungsgründen für die Berechnung das Jahr des ältesten
                     erstmaligen Bezugs herangezogen; auf die Möglichkeit der
                     getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a
                     EStG) wird im Übrigen verwiesen
         * <p>
         * @param {number} VJAHR input value
         */
        Lohnsteuer2026Big.prototype.setVJAHR = function (VJAHR) {
            this.VJAHR = VJAHR;
        };
        /**
         * Getter for ZKF.
         * <p>
         *   Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei Steuerklassen
                     I, II, III und IV)
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getZKF = function () {
            return this.ZKF;
        };
        /**
         * Setter for ZKF.
         * <p>
         *   Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei Steuerklassen
                     I, II, III und IV)
         * <p>
         * @param {Big} ZKF input value
         */
        Lohnsteuer2026Big.prototype.setZKF = function (ZKF) {
            this.ZKF = ZKF;
        };
        /**
         * Getter for ZMVB.
         * <p>
         *   Zahl der Monate, für die Versorgungsbezüge gezahlt werden [nur
                     erforderlich bei Jahresberechnung (LZZ = 1)]
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getZMVB = function () {
            return this.ZMVB;
        };
        /**
         * Setter for ZMVB.
         * <p>
         *   Zahl der Monate, für die Versorgungsbezüge gezahlt werden [nur
                     erforderlich bei Jahresberechnung (LZZ = 1)]
         * <p>
         * @param {number} ZMVB input value
         */
        Lohnsteuer2026Big.prototype.setZMVB = function (ZMVB) {
            this.ZMVB = ZMVB;
        };
        /**
         * Getter for BK.
         * <p>
         *   Bemessungsgrundlage für die Kirchenlohnsteuer in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getBK = function () {
            return this.BK;
        };
        /**
         * Getter for BKS.
         * <p>
         *   Bemessungsgrundlage der sonstigen Bezüge  für die Kirchenlohnsteuer in Cent.
                     Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
                     Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern BK
                     (maximal bis 0). Der Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen
                     im Rahmen der Veranlagung zur Einkommensteuer bleibt unberührt.
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getBKS = function () {
            return this.BKS;
        };
        /**
         * Getter for LSTLZZ.
         * <p>
         *   Für den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getLSTLZZ = function () {
            return this.LSTLZZ;
        };
        /**
         * Getter for SOLZLZZ.
         * <p>
         *   Für den Lohnzahlungszeitraum einzubehaltender Solidaritätszuschlag
                     in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getSOLZLZZ = function () {
            return this.SOLZLZZ;
        };
        /**
         * Getter for SOLZS.
         * <p>
         *   Solidaritätszuschlag für sonstige Bezüge in Cent.
                     Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
                     Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren,
                     mindern SOLZLZZ (maximal bis 0). Der Sonderausgabenabzug für
                     tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                     Veranlagung zur Einkommensteuer bleibt unberührt.
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getSOLZS = function () {
            return this.SOLZS;
        };
        /**
         * Getter for STS.
         * <p>
         *   Lohnsteuer für sonstige Bezüge in Cent
                     Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
                     (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern LSTLZZ (maximal bis 0). Der
                     Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                     Veranlagung zur Einkommensteuer bleibt unberührt.
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getSTS = function () {
            return this.STS;
        };
        /**
         * Getter for VFRB.
         * <p>
         *   Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVFRB = function () {
            return this.VFRB;
        };
        /**
         * Getter for VFRBS1.
         * <p>
         *   Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVFRBS1 = function () {
            return this.VFRBS1;
        };
        /**
         * Getter for VFRBS2.
         * <p>
         *   Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getVFRBS2 = function () {
            return this.VFRBS2;
        };
        /**
         * Getter for WVFRB.
         * <p>
         *   Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
                    dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getWVFRB = function () {
            return this.WVFRB;
        };
        /**
         * Getter for WVFRBO.
         * <p>
         *   Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
                    bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getWVFRBO = function () {
            return this.WVFRBO;
        };
        /**
         * Getter for WVFRBM.
         * <p>
         *   Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
                    über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent
         * <p>
         * @return the value
         */
        Lohnsteuer2026Big.prototype.getWVFRBM = function () {
            return this.WVFRBM;
        };
        /**
         * Initialize all inputs values with zero.
         */
        Lohnsteuer2026Big.prototype.initInputs = function () {
            this.JFREIB = this.JHINZU = this.JRE4 = this.JRE4ENT = this.JVBEZ = this.KVZ = this.LZZFREIB = this.LZZHINZU = this.MBV = this.PKPV = this.PKPVAGZ = this.PVA = this.RE4 = this.SONSTB = this.SONSTENT = this.STERBE = this.VBEZ = this.VBEZM = this.VBEZS = this.VBS = this.ZKF = this.Z_0;
            this.af = this.AJAHR = this.ALTER1 = this.ALV = this.f = this.KRV = this.LZZ = this.PKV = this.PVS = this.PVZ = this.R = this.STKL = this.VJAHR = this.ZMVB = 0;
        };
        // not realy clean, but for ts compiler
        Lohnsteuer2026Big.prototype.isBigInput = function (name, value) {
            return value instanceof big_js_1.default;
        };
        /**
         * Setter for Big or number input parameters.
         *
         * @param {string} name Variable name to set.
         * @param {number} value Value to set.
         */
        Lohnsteuer2026Big.prototype.set = function (name, value) {
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
        Lohnsteuer2026Big.prototype.get = function (name) {
            if (this.hasOwnProperty(name)) {
                return this[name];
            }
            throw new Error("Unknown parameter " + name);
        };
        /**
         * Get all fields with types.
         */
        Lohnsteuer2026Big.prototype.getDirectory = function () {
            return Lohnsteuer2026Big.typeDirectory;
        };
        /**
         * Converts a value (number or Big) in the correct type (number or Big).
         *
         * @param {string} name the name of the value
         * @param {TaxJsValueType} value the value to convert
         */
        Lohnsteuer2026Big.prototype.toType = function (name, value) {
            var info = Lohnsteuer2026Big.typeDirectory[name];
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
        Lohnsteuer2026Big._n = "number";
        Lohnsteuer2026Big._b = "Big";
        Lohnsteuer2026Big._i = "input";
        Lohnsteuer2026Big._o = "output";
        Lohnsteuer2026Big._s = "STANDARD";
        Lohnsteuer2026Big._d = "DBA";
        Lohnsteuer2026Big.typeDirectory = {
            "af": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "AJAHR": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "ALTER1": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "ALV": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "f": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "JFREIB": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "JHINZU": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "JRE4": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "JRE4ENT": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "JVBEZ": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "KRV": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "KVZ": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "LZZ": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "LZZFREIB": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "LZZHINZU": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "MBV": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "PKPV": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "PKPVAGZ": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "PKV": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "PVA": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "PVS": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "PVZ": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "R": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "RE4": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "SONSTB": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "SONSTENT": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "STERBE": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "STKL": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "VBEZ": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "VBEZM": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "VBEZS": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "VBS": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "VJAHR": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "ZKF": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._i }, "ZMVB": { type: Lohnsteuer2026Big._n, direction: Lohnsteuer2026Big._i }, "BK": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._s }, "BKS": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._s }, "LSTLZZ": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._s }, "SOLZLZZ": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._s }, "SOLZS": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._s }, "STS": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._s }, "VFRB": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._d }, "VFRBS1": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._d }, "VFRBS2": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._d }, "WVFRB": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._d }, "WVFRBO": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._d }, "WVFRBM": { type: Lohnsteuer2026Big._b, direction: Lohnsteuer2026Big._o, group: Lohnsteuer2026Big._d },
        };
        return Lohnsteuer2026Big;
    }());
    exports.Lohnsteuer2026Big = Lohnsteuer2026Big;
});
//# sourceMappingURL=Lohnsteuer2026Big.js.map