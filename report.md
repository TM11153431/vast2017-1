De visualisatie bestaat uit vier verschillende gelinkte onderdelen.
De basis van de visualisaties is de dataset van de timepoints van de voertuigen in het National Park. Ieder voertuig heeft een chip en wanneer een voertuig een checkpoint in het park passeert wordt de ID van de auto en het tijdstip vastgelegd.

De HTML pagina heeft vier onderdelen; De Linechart, de Main Calendar, de Sub-calendars en de Barchart.
![screenshot1](https://github.com/Pvtwuyver/vast2017/blob/master/doc/screenshot1.jpg)
![screenshot2](https://github.com/Pvtwuyver/vast2017/blob/master/doc/screenshot2.jpg)
De gebruiker kan door middel van een DropDown menu kiezen welke specifieke locatie in het park te zien is. Wanneer de selectie gemaakt wordt worden de volgende zaken ge-update via de GetOption functie.:

0. oude svg's worden removed.
1. De Map linksboven in de HTML wordt ge-update om de locaties te laten zien.
De Linechart laat de hoeveelheid unieke voertuig-IDs zien in het park. Hiervoor wordt een map.jpg via een getElementById functie geupdate.
2. De Linechart functie krijgt meegegeven welke tsv file gebruikt moet worden om het jaarlijkse overzicht (gespecificeerd op voertuig-type) van dat gebied weer te geven.
3. De Maincalendar krijgt zijn data meegegven via de showData functie. Het csv file van de desbetreffende locatie laat in de maincalendar zien hoeveel unieke voertuigen er in totaal op de verschillende dagen in het park getracked zijn. showData geeft de dagen met de totalen mee aan drawCalendar() en deze maakt de maincalendar svg. 
4. De drawLocations functie (of drawTypes, afhankelijk van de selectie) krijgt de namen van de kolomen in de busyness-by-location-file mee. Voor iedere kolom wordt vervolgens een sub-calendar svg aangemaakt en onder elkaar geplakt op de linker HTML. De verschillende subcalendars hebben allemaal hun eigen min-max values. Deze staan boven de calendars en bepalen de kleuren van de datum-hokjes. 

De gebruiker kan nu op de subcalendar klikken op een specifieke dag. Hierbij wordt de locatie en de datum meegegeven aan de drawBarchart functie. De drawBarchart functie leest in het locatie-specifieke JSON bestand op welke tijdstippen er voertuigen geregistreert zijn (in tijd-window van 1 uur). Hij maakt een stack van de totalen per type per tijdseenheid. De lege 24-uurs dict wordt gevuld met de juiste totalen per tijdsslot en vervolgens wordt de stacked barchart gemaakt. 
Wanneer op een andere datum geklikt wordt update de barchart met de nieuwe 24H data.
Indien TotalPark is geselecteerd in de dropDown zijn er cartypes in de subcalendars te zien ipv locaties. Hier is geen 24H data van, dus verdwijnt de barchart en verschijnt een tekstje met uitleg ipv de barchart.

Bij klikken op een datum vakje in de Maincalendar of de Subcalendars wordt de datum meegegeven aan de functie drawDateline. Deze functie berekent het aantal dagen sinds 01-05-2015 en tekent een datum-lijn op de linechart, met de datum erboven. De locatie op de x-as wordt herberekent door de width van de svg te delen op het aantal dagen in de dataset. Deze datum-lijn update bij iedere klik in de calendars.

De radiobuttons zijn als laatste interactieve element ingebouwd en veranderen de achtergrondkleur dmv javascript functie.
