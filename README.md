MVC: jaoin sovelluksen kansioihin routes/, controllers/ ja models/. Reitit on tehty express.Router-luokalla (/api/media, /api/users).
Tietokanta: mysql2-yhteyspooli (utils/database.js), tunnukset .env-tiedostossa. Kyselyt tehdään valmisteltuina lauseina (execute + ?). Käytössä kurssin MediaSharingApp-tietokanta.
Endpointit:
Media: GET /api/media, GET /api/media/:id, PUT /api/media/:id, DELETE /api/media/:id
Käyttäjät: GET /api/users, GET /api/users/:id, POST /api/users, PUT /api/users/:id, DELETE /api/users/:id

Toteutuksen huomioita
Käyttäjien haut eivät palauta salasanaa.
Poistot tehdään transaktiossa: viittaavat rivit (kommentit, tykkäykset, arvostelut, tagit) poistetaan ensin, koska tietokannassa ei ole ON DELETE CASCADE.
Virhekoodit: 400 (puuttuva kenttä), 404 (ei löydy), 409 (käyttäjänimi/sähköposti jo käytössä), 500 (palvelinvirhe).
Salasanat tallennetaan toistaiseksi selkotekstinä, koska hashausta ei vaadittu.