
--=========== Insert di 100 corsie ===========================================================
DECLARE @Counter INT = 1;

WHILE @Counter <= 100
BEGIN
    INSERT INTO aisles (aisleNumber)
    VALUES (@Counter);

    SET @Counter = @Counter + 1;
END;
--========= insert delle corsie "speciali"
			INSERT INTO aisles (aisleNumber)
			VALUES (110); -- Librarian

			INSERT INTO aisles (aisleNumber)
			VALUES (120); --Virtual

			INSERT INTO aisles (aisleNumber)
			VALUES (200); -- Warehouse

			-- cancello le corsie da 11 a 100 per avere solo 10 corsie ed un 
			-- pi� ampio spazio tra corsie della biblioteca e corsie del magazzino da riempire eventualmente dopo
			delete from Aisles where IdAisle > 10 and IdAisle < 101

--=================== insert per ogni corsia di: ===========================================================
--=================== 4 livelli di altezza ===========================================================
--=================== 100 baie ===========================================================

DECLARE @CounterIdAisle INT = 1;
WHILE @CounterIdAisle <= 10
BEGIN
    DECLARE @CounterShelfHeight INT = 0;

    WHILE @CounterShelfHeight <= 4
    BEGIN
        DECLARE @CounterShelfBay INT = 1;

        WHILE @CounterShelfBay <= 100
        BEGIN
            INSERT INTO Shelves (IdAisle, ShelfHeight, ShelfBay)
            VALUES (@CounterIdAisle, @CounterShelfHeight, @CounterShelfBay);

            SET @CounterShelfBay = @CounterShelfBay + 1;
        END;

        SET @CounterShelfHeight = @CounterShelfHeight + 1;
    END;

    SET @CounterIdAisle = @CounterIdAisle + 1;
END;

--================================== insert degli scaffali "speciali"========================
				insert into Shelves (IdAisle, ShelfHeight, ShelfBay)
				values
				( 101,0,1), -- Scaffale del banco del bibliotecario
				 (102,0,1), -- Scaffale virtuale per gestire gli spostamenti
				 (103,0,1);-- Scaffale del magazzino, dove vengono riposti tutti i libri in ricezione, in attesa di essere spostati

				-- insert utenti con password di test, possibilit� di cambiarla una volta eseguito il login
				INSERT INTO Users (FirstName, LastName, Email, Password, Role, UserImage)
				VALUES
					('admin', 'admin', 'admin', 'admin', 'admin',''), -- utente con permission admin
					('Barbara', 'Gordon', 'lib', 'lib', 'librarian','https://www.comicsbox.it/images/characters/gordonbarbara_01.jpg'), -- utente bibliotecario
					('Francesco', 'Lobbia', 'user', 'user', 'user','https://avatars.githubusercontent.com/u/142682839?v=4'); -- utente senza nessuna permission

-- Inserimento dei generi
INSERT INTO Genres (Name, Description)
VALUES ('Fantasy', 'Libri di genere fantasy'),
       ('Mystery', 'Libri di genere mistero'),
       -- Aggiungi altri generi qui...
       ('Science Fiction', 'Libri di genere fantascientifico');

-- Inserimento dei libri
INSERT INTO Books (Author, Title, Description, PublicationDate, ISBN, IdGenre,CoverImage)
VALUES (	
			'J.R.R. Tolkien',
			'Il Signore degli Anelli',
			'"Il Signore degli Anelli" � una trilogia epica fantasy scritta da J.R.R. Tolkien. Ambientata in un mondo immaginario chiamato Terra di Mezzo, la storia segue le avventure di vari personaggi, in particolare un hobbit di nome Frodo Baggins. La trama principale ruota intorno all('')Anello del Potere, forgiato da Sauron, il Signore Oscuro, per governare su tutti gli altri anelli magici. Frodo, accompagnato dai suoi amici hobbit e da una compagnia di diversi alleati, intraprende un pericoloso viaggio per distruggere l('')Anello gettandolo nel Monte Fato, il luogo dove pu� essere distrutto. Lungo il cammino, affrontano numerosi pericoli, incluso il malevolo Gollum che desidera l('')Anello per s�. Nel frattempo, altre fazioni lottano per il controllo dell('')Anello e per il destino della Terra di Mezzo. La trilogia � ricca di avventure, intrighi politici, lotte tra il bene e il male e la lotta dei personaggi contro la corruzione. Alla fine, Frodo e i suoi compagni affrontano Sauron e la sua armata in una grande battaglia per il destino della Terra di Mezzo.',
			'1954-07-29',
			'978-8804489213',
			1,
			'https://m.media-amazon.com/images/I/41s27vkTd-L._SY445_SX342_.jpg'
		), 

       (
		   'Arthur Conan Doyle',
		   'Sherlock Holmes',
		   '
			"Sherlock Holmes" � una serie di racconti e romanzi scritti da Sir Arthur Conan Doyle, che narra le avventure del leggendario detective Sherlock Holmes e del suo fedele amico e narratore, il dottor John Watson. Le storie sono ambientate principalmente nella Londra vittoriana e sono caratterizzate da misteri intricati, enigmi da risolvere e colpi di scena sorprendenti.',
		   '1887-10-14', '978-1979912528',
		   2,
		   'data:image/jpeg;base64,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'
	   ), 
       

       (
		   'Isaac Asimov',
		   'Fondazione',
		   '"Fondazione" � un romanzo di fantascienza scritto da Isaac Asimov e pubblicato nel 1951. � il primo libro di una celebre serie, conosciuta come la "Trilogia della Fondazione", che in seguito si � estesa a una serie di sette romanzi.

			La storia si svolge in un futuro distante, in un('')epoca in cui l('')Impero Galattico ha raggiunto il suo apice e sta per crollare. Un matematico geniale di nome Hari Seldon sviluppa la psicostoria, una scienza matematica che gli permette di prevedere l('')andamento futuro della storia umana su scala galattica. Prevede il collasso dell('')Impero e il seguente periodo di barbarie che ne deriver�, ma suggerisce anche una soluzione per minimizzare il periodo di oscurit�: la creazione di una Fondazione composta da scienziati e studiosi che possano preservare e diffondere la conoscenza scientifica.',
		   '1951-05-01',
		   '978-0553293357',
		   3,
		   'data:image/jpeg;base64,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'
	   ); 




