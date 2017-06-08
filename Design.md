Technisch design:

De calendarview visualisaties krijgen de data van specifiek gemaakte csv files. 
De individuele CSV files bestaan uit de kalenderdagen met de bijbehorende values.
Het is de bedoeling dat bij het aanklikken van de specifieke dag in de calendar er een gelinkte barchart ge-update wordt. 
De data voor de barchart komt in principe uit dezelfde CSV file. De chart laat dan de aantallen specifieke types auto's op dat punt op die specifieke dag.
Bij selectie moeten de 'oude'svg's worden verwijderd en nieuwe worden aangemaakt. Er wordt dus liever niet tussen HTML pages gewisseld maar de SVG's worden aangepast.

UI design:

Basis is een overzicht met heatmap-calendar view.
Bij doorklikken ziet de gebruiker een gelinkte barchart. Deze barchart heeft een vaste locatie op de HTML page. 
Heatmaps en barchart moeten een dashboard gaan vormen.
Er kan worden gekozen tussen verschillende calendar views: Overal Parc, Campsites en Entrances.
Afhankelijk van de keuze ziet de user dus locatie afhankelijk de drukte en de car-types.

Er moet nog een 3e visualisatie techniek bedacht worden om aditionele info te tonen van de cars/locatie. 

