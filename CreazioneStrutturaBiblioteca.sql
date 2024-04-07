
----=========== Insert di 100 corsie ===========================================================
--DECLARE @Counter INT = 1;

--WHILE @Counter <= 100
--BEGIN
--    INSERT INTO aisles (aisleNumber)
--    VALUES (@Counter);

--    SET @Counter = @Counter + 1;
--END;
----========= insert delle corsie "speciali"
--			INSERT INTO aisles (aisleNumber)
--			VALUES (110); -- Librarian

--			INSERT INTO aisles (aisleNumber)
--			VALUES (120); --Virtual

			--INSERT INTO aisles (aisleNumber)
			--VALUES (200); -- Warehouse

----=================== insert per ogni corsia di: ===========================================================
----=================== 4 livelli di altezza ===========================================================
----=================== 100 baie ===========================================================

--DECLARE @CounterIdAisle INT = 1;
--WHILE @CounterIdAisle <= 100
--BEGIN
--    DECLARE @CounterShelfHeight INT = 0;

--    WHILE @CounterShelfHeight <= 4
--    BEGIN
--        DECLARE @CounterShelfBay INT = 1;

--        WHILE @CounterShelfBay <= 100
--        BEGIN
--            INSERT INTO Shelves (IdAisle, ShelfHeight, ShelfBay)
--            VALUES (@CounterIdAisle, @CounterShelfHeight, @CounterShelfBay);

--            SET @CounterShelfBay = @CounterShelfBay + 1;
--        END;

--        SET @CounterShelfHeight = @CounterShelfHeight + 1;
--    END;

--    SET @CounterIdAisle = @CounterIdAisle + 1;
--END;

----===== insert degli scaffali "speciali"
--insert into Shelves (IdAisle, ShelfHeight, ShelfBay)
--values( 101,0,1) -- librarian
--insert into Shelves (IdAisle, ShelfHeight, ShelfBay)
--values (102,0,1) -- virtual

---- insert utente admin !!!!! ricorda di cambiare la password
--insert into Users (FirstName,LastName,Email,Password,Role)
--values('admin','admin','admin','admin','admin')




