# FotoOpruimen

Foto's opruimen vanaf je telefoon. De webapp (`index.html`) draait op GitHub Pages:
**https://bruindav.github.io/FotoOpruimen/**

Hoe het werkt:
- Je laptop zet kleine voorbeeldkopieën (max 1024 px) van al je foto's in Google Drive. Originelen blijven op de laptop.
- Op je telefoon markeer je foto's als **Weg** of **Houden** en verplaats je foto's tussen albums.
- Op de laptop haal je die wijzigingen op. Er gaat **nooit** automatisch iets van je laptop: de "weg"-lijst controleer je eerst in de foto-app.

## Telefoon
1. Open de pagina hierboven en tik **Inloggen met Google** (bij "niet geverifieerd": Geavanceerd, dan Doorgaan).
2. Chrome-menu, dan "Toevoegen aan startscherm" voor een app-icoon.
3. Tab **Opschonen**: kies een jaar of map. Tik een foto om groot te bekijken; onderaan Weg / Houden / Wis, swipe om te bladeren. Met **Selecteren** doe je meerdere tegelijk.
4. Tab **Albums**: selecteer foto's, dan "Verplaats naar…", "Ook in…" of "Uit album". Nieuwe albums maak je in de foto-app op de laptop. Een foto die maar in één album staat kan niet "uit album"; verplaats of markeer hem.

## Laptop: eenmalig
Zet in dezelfde map als `beheer_web.py`: `sync_to_drive.py`, `sync_previews.py`, `pull_from_drive.py`, `client_secret.json` (Desktop-client uit het Google Cloud-project; bij eerste inlog ontstaat `token.json`).

Installeren (eenmalig): `python -m pip install google-auth-oauthlib google-api-python-client google-auth-httplib2 Pillow`

Start `beheer_web.py` en ga naar de tab **Cloud sync**.

### Stap 1: voorbeelden naar Drive
1. Vul eerst `100` in bij "Alleen de eerste … foto's" en klik **Voorbeelden naar Drive zetten**.
2. Controleer in Drive of de map **Foto Archief Voorbeelden** er staat, en of de foto's in de webapp verschijnen.
3. Laat het veld daarna leeg en start opnieuw voor alle foto's. Bij ~50.000 foto's duurt dit enkele uren; laptop aan en online laten. Onderbroken? Gewoon opnieuw starten, het gaat verder waar het bleef. Kost ca. 5-10 GB Drive-ruimte.

Zonder beheerscherm: `python sync_previews.py --db photos.db --limit 100` (weglaten van `--limit` = alles).

### Stap 2: na een opruimsessie op je telefoon
1. **Proefdraai: wat is er veranderd?** (er wordt niets gewijzigd; lees de uitvoer). Of: `python pull_from_drive.py --db photos.db`
2. **Wijzigingen doorvoeren**. Of: `python pull_from_drive.py --db photos.db --apply`. Albums worden bijgewerkt; "weg"-markeringen komen op een controlelijst.
3. Open de foto-app, klik **📱 Wijzigingen van telefoon**, vink aan wat echt weg mag en klik **Verwijder van laptop**. Of kies **Toch behouden**.
4. Draai daarna opnieuw **Voorbeelden naar Drive zetten** (verwijderde foto's verdwijnen uit Drive) en **Synchroniseer naar Google Drive** (albums).

## Handig om te weten
- Roteren/verbeteren op de laptop? Het voorbeeld wordt bij de volgende voorbeeld-sync vernieuwd.
- Foto verwijderd in de foto-app? Bij de volgende albumsync gaat de kopie ook uit je Drive-albums.
- Zolang de Google-app in "Testing" staat, moet je na ca. 7 dagen opnieuw inloggen.

## Google Cloud (al ingesteld)
Project `FotoOpruimen`: Drive API aan; Web-client met origin `https://bruindav.github.io`; scope `.../auth/drive`; test user = je Gmail. Het Client-ID zit in `index.html` (niet geheim).
