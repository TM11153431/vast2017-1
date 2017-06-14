
PROGRESSBOOK

6 juni:
Idee is om calendar view te maken voor de Entrances en de Campings.
Doorklikken geeft de drukte op specifieke dag weer in aantallen en per type auto, in barchart. (Line chart is niet geschikt aangezien het om hele getallen gaat)
Derde visualisatie moet van ander soort, dus misschien pie chart of line chart. 
Aanname Calendar view: “drukte”= totaal aantal checks op dat punt in 24 uur, 0.00 tot 23.59
Vreemde situatie(s) ontdekt bij experimenten in Excel:
Zelfde ID: 46 x midden in de nacht 4 assen type auto in het park: 
ENTRANCE 3, Gate 6, Ranger Stop 6, Gate 5, General Gate 5, Gate 3, Ranger stop 3. Na 15 min weer vice versa. (NB: Ranger Stop 3 en Ranger Stop 6 zijn alleen toegankelijk voor Rangers.)
Ongeveer 1 uur in totaal. Opties: Illegaal afval dumpen?

7 juni:
Begin gemaakt met Calendar view. 
Data omgezet in verschillende CSV files (per ID, per locatie, per Type etc) Laura met python programmaatjes gedaan.
Eerste Calendar view met totaal aantal unieke ID’s in het park per dag gedurende een jaar is werkend! Is nu makkelijk te veranderen in overviews per type/ locatie.
Kleuren moeten wel worden aangepast op min/max values!
Vervolgstappen:
- meerdere svg’s op pagina
- calendar mooi maken met maanden en weekdagen erin.
- calendars maken voor type’s en voor campings.
- selectie button maken om te switchen tussen calendars

8 juni:
Calendar view voor gehele park aangevuld met calendars per car-type.
Nu selectie button creeren om campings en entrances te specificeren.
Vervolgstappen: 
- tooltip linken aan barchart met info per dag.

10/11 juni (weekend):
nieuwe manier bedacht om data uit csv te gebruiken. De Calendar view heeft ingebouwde functionaliteit om values per tijdseenheid op te tellen. Het is daarom beter om csv file te gaan gebruiken met de gedetailleerde time-points om straks beter een 24 uurs overzicht te kunnen maken.
Ook het inlezen van de csv verbetert: éénmaal inlezen ipv meerdere keren voor iedere visual. De bedoelinh=g is nu ook om een mooie transition te kunnen maken van de kleurverschillen in de calendar. Daarvoor wel nodig om de min/max values automatisch in te lezen ipv hardcodes zoals nu.

12 juni:
Doel: Dagen in calendar view 'clickable'maken. Mooie overzichtsvisuals maken van Parc, Entrance en Campings. Begin maken met Barchart/Linechart.
Daarvoor nieuwe datastructuur nodig voor csv files, maar nog onduidelijk wat de beste manier daarvoor is.
Uiteindelijk gelukt om calendardagen aanklikbaar te maken. Alle campings zijn in beeld, min/max kleuren ook automatisch aangepast.Nu nog wel de oude visuals van Types en Campings te laten verdwijnen /verschijnen zoals nu de Hoofdcalendars ook doen.
Entrances toegevoegd. Alleen lijken de csv files met de Totalen niet correct; er ontbreken dagen. 

13 juni:
CSV files nog niet correct. Clickable calendar geeft alleen nog maar de datum mee aan de funtie. Veel tijd aan exit().remove probleem besteedt en nog steeds niet opgelost. Begin met Linechart gemaakt; Parkoverzicht werkt bij opstarten, nog niet dynamisch. 24 uurs Dagoverzicht van de Locaties moet in barcharts waarschijnlijk, linechart geeft vreemde visuals. Voor iedere locatie is hiervoor een TSV file gemaakt met tijdsindicaties per minuut. 

14 juni:
Bij selectie verschijnt nu de bijbehordende total-linechart (per car-type) van het gehele jaar voor de geselecteerde locatie. 
De Calendar en bijbehorende subcalendars verversen nu correct en verschijnen correct bij de selectie.
Alle sub-calendars krijgen een eigen class-ID toegewezen om bij de onClick funtie een lin te kunnen leggen met de datum en de locatie (De locatie wordt dus straks bepaald door de class te lezen).
Nu een barchart maken die een 24 uurs overzicht maakt van de gekozen datum/locatie.

