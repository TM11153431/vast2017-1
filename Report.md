De visualisatie bestaat uit vier verschillende gelinkte onderdelen.

De HTML pagina heeft vier onderdelen; De Linechart, de Main Calendar, de Sub-calendars en de Barchart.
![screenshot1](https://github.com/Pvtwuyver/vast2017/blob/master/doc/screenshot1.jpg)
![screenshot2](https://github.com/Pvtwuyver/vast2017/blob/master/doc/screenshot2.jpg)

De gebruiker kan door middel van een DropDown menu kiezen welke specifieke locatie in het park te zien is. Wanneer de selectie gemaakt wordt worden de volgende zaken ge-update via de GetOption functie.

getOption(): 

dmv document.getElementById("mySelect")functie wordt de value van de keuze aan 'var obj' meegegeven. Door middel van IF statements wordt het desbetreffende deel van de getOption functie aangeroepen dat overeenkomt met de gekozen Value.
Er zijn 7 verschillende opties in getOption die ieder een vaste opbouw hebben:
Ten eerste worden eventuele oude svg's removed met sub.selectAll("div").remove();.
De Map linksboven in de HTML wordt ge-update om de locaties te laten zien met document.getElementById('myImage').src = 'data/Lekagul_map_base.jpg'.

De drawLinechart() functie:

krijgt meegegeven vanuit getOption() welke tsv file gebruikt moet worden om het jaarlijkse overzicht (gespecificeerd op voertuig-type) van dat gebied weer te geven. Er zijn voor iedere locatie in het park tsv-files met daarin de totalen van de voertuigtypes per datum.
De drawLinechart() is een D3 functie die een linechart met 7 verschillende lijnen (Per voertuigtype) creeert vanuit een tsv file. De kleuren zijn uitgezocht zodat ze overeenkomen met de kleuren in de Barchart.

De drawCalendar():

krijgt zijn data vanuit getOption() meegegven via de showData() functie. Er wordt een csv file meegeven met de totalen pert type per dag en daarnaast wordt de Locatie als 2e argument meegegeven. (Deze Locatie is nodig voor als argument voor de Barchart die later in de code wordt aangeroepen). drawCalendar() creeert een D3 visualisatie. Eerst wordt een lege calendar gemaakt, gebasseert op de range van jaren. De calendar bestaat uit 365 lege rects per jaar. Vervolgens wordt de data vanuit de csv gelezen en de data vn iedere Day wordt genest aan het desbetreffende Rect svg. De kleuren worden bepaald door de kleurgradient die gebasseerd is op de min en max waarden.

4. De drawLocations functie (of drawTypes, afhankelijk van de selectie) krijgt de namen van de kolomen in de busyness-by-location-file mee. Voor iedere kolom wordt vervolgens een sub-calendar svg aangemaakt en onder elkaar geplakt op de linker HTML. De verschillende subcalendars hebben allemaal hun eigen min-max values. Deze staan boven de calendars en bepalen de kleuren van de datum-hokjes. 

De gebruiker kan nu op de subcalendar klikken op een specifieke dag. Hierbij wordt de locatie en de datum meegegeven aan de drawBarchart functie. De drawBarchart functie leest in het locatie-specifieke JSON bestand op welke tijdstippen er voertuigen geregistreert zijn (in tijd-window van 1 uur). Hij maakt een stack van de totalen per type per tijdseenheid. De lege 24-uurs dict wordt gevuld met de juiste totalen per tijdsslot en vervolgens wordt de stacked barchart gemaakt. 
Wanneer op een andere datum geklikt wordt update de barchart met de nieuwe 24H data.
Indien TotalPark is geselecteerd in de dropDown zijn er cartypes in de subcalendars te zien ipv locaties. Hier is geen 24H data van, dus verdwijnt de barchart en verschijnt een tekstje met uitleg ipv de barchart.

Bij klikken op een datum vakje in de Maincalendar of de Subcalendars wordt de datum meegegeven aan de functie drawDateline. Deze functie berekent het aantal dagen sinds 01-05-2015 en tekent een datum-lijn op de linechart, met de datum erboven. De locatie op de x-as wordt herberekent door de width van de svg te delen op het aantal dagen in de dataset. Deze datum-lijn update bij iedere klik in de calendars.

De radiobuttons zijn als laatste interactieve element ingebouwd en veranderen de achtergrondkleur dmv javascript functie.
