
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

9 juni:
standupmeeting gehad. Feedback mbt de indeling en de 24 uurs weergave per dag meegenomen in design idee. Begin gemaakt met selectie tussen verschillende weergaves. Toevoegen van maanden en weekdays geprobeerd maar nog niet functioneel gekregen. Veel tijd besteed aan het updaten van de calendars ipv dat de nieuwe svg's onder aan de pagina verschijnen.

10/11 juni (weekend):
nieuwe manier bedacht om data uit csv te gebruiken. De Calendar view heeft ingebouwde functionaliteit om values per tijdseenheid op te tellen. Het is daarom beter om csv file te gaan gebruiken met de gedetailleerde time-points om straks beter een 24 uurs overzicht te kunnen maken.
Ook het inlezen van de csv verbetert: éénmaal inlezen ipv meerdere keren voor iedere visual. De bedoeling is nu ook om een mooie transition te kunnen maken van de kleurverschillen in de calendar. Daarvoor wel nodig om de min/max values automatisch in te lezen ipv hardcodes zoals nu.

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

15 juni:
Het doorgeven van een datum + Locatie blijkt een probleem bij de calendarview. Datum is geen probleem, maar verder kan er niks worden meegegeven aan de onClick functie. Dit betekent dat de 24-uursbarcharts waarschijnlijk niet gemaakt kunnen worden via de onclick uit de calendar. De locatie wordt wel meegegeven bij het selecteren van de calendars, maar dit is de 'overal locatie'(Camps, Entrances of Park). De individuele locaties zijn dus niet(?) mee te geven. Nadenken dus nu over een andere mogelijkheid om de 24 uurs weergaves per locatie te laten zien.

16 juni:
Na de standup toch eindelijk gelukt om de locatie in de onclick functie te krijgen. De class van iedere svg heeft een unieke naam gebasseerd op de locatie en die wordt nu dus meegegeven.Het is nu helaas weer niet mogelijk om de datum EN de locatie mee te sturen... Begin gemaakt om een stacked barchart te maken voor de 24 uurs weergaves. De JSON indeling die we nu hebben is niet erg geschikt; het mist key en value labels. Daardoor veranderen de timepoints in een list met objecten ipv values.Dit weekend proberen om clickfunctie goed te krijgen en barchart met JSON files te maken.

17/18 juni (weekend):
Linegraph lijnen aangepast zodat het nu rechte stapjes zijn tussen de data ipv lineare lijn. Barchart met 24 uurs data van specifieke locatie gemaakt. Werkt gelinkt met de subcalendars van Campings en Entrances.Nog geen barcharts bedacht die interessant zijn voor de cartype subcalendars. Wellicht dat deze gewoon niet aanklikbaar blijven. 
Barchart x-as moet nog worden aangepast na 24H timescale. Barchart is u rechtsboven geplaatst maar verdwijnt uit beeld wanneer user naar beneden scrolt. Oplossing zou zijn om hem op vaste locatie in HTML vast te zetten.

19 juni:
Plan voor vandaag was om 24H scale te maken voor barchart, een datum line in de linegraph die gelinkt is met de calendar, en indien mogelijk selectie mogelijkheden in de linechart en barchart.
Uiteindelijk duurde het 24-uurs omzetten vd barchart veel langer dan gedacht. Nog geen gelinkte line kunnen maken op de linegraph. Barchart is nu wel 'fixed'zoad bij scrollen de chart zichtbaar blijft.

20 juni:
Naar Rotterdam naar lezingen van de Netherlands eScience center; Scientific Visualization: From Archaeology to Astronomy.

21 juni:
Vandaag proberen om begin te maken met het beantwoorden van de VAST2017 vragen. Zoeken naar patronen met behulp van onze gemaakte visualisaties. Code aangepast zodat alle locaties in het park nu aanklikbaar/selecteerbaar zijn, inclusief de 24-H barcharts. De Lay-out moet nog worden aangepast zoadt de TotalCalendar boven aan de HTML page blijft staan. Door vreemde bug met een d3.remove functie verdwijnt de calendar zodra de DIV wordt verplaatst. Lastig om uit te vinden waarom dit is..

22 juni:
De date-line in de linechart lukt nog steeds niet. De lay-out van de HTML page is nu wel mooi gemaakt, het plan is om alle groepsleden dezelfde template te laten gebruiken voor het eindproduct. Kleine aanpassing gemaakt zodat de barchart een titel+datum meekrijgt in de HTML.
Probleempje opgedoken: linker window kan niet helemaal door naar beneden scrollen. Dit moet wel worden gefixed. We zijn begonnen met het analyseren van de data om de vragen voor de challenge te kunnen beantwoorden. Clustering gaat vrijdag of maandag gebeuren.
Wanneer het Total Park geselcteerd wordt geven de subcalandars de drukte van de verschillende type auto's weer in het gehele park. Er zijn dus geen 24H barcharts van deze calendars. Dit zou op de een of andere manier nog weergegeven moeten worden in de HTML page. Er staat nu een beknopte aanwijzing bij de barchart.

