DELIMITER //

CREATE PROCEDURE GetAllField1()
BEGIN
    SELECT f.StartTime, f.EndTime, u.FirstName, u.LastName, u.Area, u.Laboratory, f.DateDay
    FROM Field1 f
    INNER JOIN User u ON f.userIdUser = u.IdUser;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetAllField2()
BEGIN
    SELECT f.StartTime, f.EndTime, u.FirstName, u.LastName, u.Area, u.Laboratory, f.DateDay
    FROM Field2 f
    INNER JOIN User u ON f.userIdUser = u.IdUser;
END//

DELIMITER ;


DELIMITER //

CREATE PROCEDURE getAllWeekly(IN Inicio DATE, IN Fin DATE)
BEGIN
    SELECT f.StartTime, f.EndTime, u.FirstName, u.LastName, u.Area, u.Laboratory, f.DateDay
    FROM Field1 f
    INNER JOIN User u ON f.userIdUser = u.IdUser
    WHERE f.DateDay >= Inicio AND f.DateDay <= Fin;
END//

DELIMITER ;


DELIMITER //

CREATE PROCEDURE getAllWeekly2(IN Inicio DATE, IN Fin DATE)
BEGIN
    SELECT f.StartTime, f.EndTime, u.FirstName, u.LastName, u.Area, u.Laboratory, f.DateDay
    FROM Field2 f
    INNER JOIN User u ON f.userIdUser = u.IdUser
    WHERE f.DateDay >= Inicio AND f.DateDay <= Fin;
END//

DELIMITER ;