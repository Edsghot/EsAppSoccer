DELIMITER //

CREATE PROCEDURE GetAllField1()
BEGIN
    SELECT f.IdField1Entity,f.StartTime, f.EndTime, u.FirstName, u.LastName, a.NameArea, m.NameManagement,f.ListPlayer, f.DateDay FROM Field1 f INNER JOIN User u ON f.userIdUser = u.IdUser INNER JOIN Area a ON u.areaIdArea = a.IdArea INNER JOIN Management m ON a.managementIdManagement = m.IdManagement;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetAllField2()
BEGIN
    SELECT * FROM Field2 f INNER JOIN User u ON f.userIdUser = u.IdUser INNER JOIN Area a ON u.areaIdArea = a.IdArea INNER JOIN Management m ON a.managementIdManagement = m.IdManagement;
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


DELIMITER //

CREATE PROCEDURE GetFieldCountByDateAndArea (IN p_DateDay VARCHAR(255), IN p_Area VARCHAR(255),IN p_turno VARCHAR(255))
BEGIN
    SELECT COUNT(Field2.IdField2Entity) AS contador
    FROM Field2
    INNER JOIN User ON Field2.userIdUser = User.IdUser inner join Area on Area.IdArea = User.areaIdArea
    WHERE DateDay = p_DateDay AND  Area.NameArea = p_Area AND User.Shift = p_turno;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetFieldCountByWeekend (IN StartWeekend DATE, IN EndWeekend DATE, IN p_Area VARCHAR(255),IN P_turno Varchar(255))
BEGIN
    SELECT COUNT(Field2.IdField2Entity) AS contador
    FROM Field2
    INNER JOIN User ON Field2.userIdUser = User.IdUser
    WHERE User.Area = p_Area AND Field2.DateDay BETWEEN StartWeekend AND EndWeekend AND User.Shift = P_turno;

END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE reportGetByDay(IN dateParam VARCHAR(20))
BEGIN
    SELECT * FROM Report
    INNER JOIN Area ON Report.areaIdArea = Area.IdArea
    INNER JOIN Management ON Management.IdManagement = Area.managementIdManagement
    WHERE Report.Date = dateParam;
END //

DELIMITER ;
