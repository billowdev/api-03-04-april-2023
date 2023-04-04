-- Data for fac table
DELETE FROM `fac`;
INSERT INTO `fac` (`FAC_ID`, `FAC_NAME`) VALUES
	(1, 'คณะวิทยาศาสตร์และเทคโนโลยี'),
	(2, 'คณะวิทยาการจัดการ'),
	(3, 'คณะครุศาสตร์');
	(4, 'คณะเทคโนโลยีการเกษตร');
	(5, 'คณะเทคโนโลยีอุตสาหกรรม');
	(6, 'คณะมนุษยศาสตร์และสังคมศาสตร์');

-- Data for student table
DELETE FROM `student`;
INSERT INTO `student` (`STD_ID`, `STD_PASS`, `STD_NAME`, `FAC_ID`) VALUES
		('01', '1234', 'Akkarapon Phikulsri', 1),
	('02', '1234', 'BillowDev', 2),
	('03', '1234', 'Charlie Brown', 3),
	('04', '1234', 'David Smith', 1),
	('05', '1234', 'Emily Jones', 2),
	('06', '1234', 'Frank Johnson', 3),
	('07', '1234', 'Grace Davis', 6),
	('08', '1234', 'Henry Wilson', 2),
	('09', '1234', 'Isabella Thompson', 3),
	('10', '1234', 'Jake Lee', 1),
	('11', '1234', 'Katherine Lee', 2),
	('12', '1234', 'Liam Jackson', 6),
	('13', '1234', 'Mia Rodriguez', 3),
	('14', '1234', 'Noah Martin', 2),
	('15', '1234', 'Olivia Kim', 6),
	('16', '1234', 'Penelope Lee', 3),
	('17', '1234', 'Quinn Lee', 2),
	('18', '1234', 'Ryan Kim', 6),
	('19', '1234', 'Samantha Lee', 3),
	('20', '1234', 'Tristan Johnson', 2),
	('21', '1234', 'Violet Lee', 6),
	('22', '1234', 'Wyatt Lee', 3),
	('23', '1234', 'Xander Lee', 2),
	('24', '1234', 'Yara Lee', 1),
	('25', '1234', 'Zoe Lee', 3),
	('26', '1234', 'Adam Kim', 2),
	('27', '1234', 'Brianna Lee', 1),
	('28', '1234', 'Caleb Lee', 3),
	('29', '1234', 'Danielle Lee', 2),
	('30', '1234', 'Ethan Lee', 1),
	('31', '1234', 'Fiona Lee', 3),
	('32', '1234', 'Gavin Lee', 2),
	('33', '1234', 'Haley Lee', 1),
	('34', '1234', 'Ian Lee', 3),
	('35', '1234', 'Jessica Lee', 2),
	('36', '1234', 'Kyle Lee', 1),
	('37', '1234', 'Landon Lee', 3),
	('38', '1234', 'Maggie Lee', 2),
	('39', '1234', 'Nathan Lee', 1),
	('40', '1234', 'Oliver Lee', 4),
	('41', '1234', 'Paige Lee', 2),
	('42', '1234', 'Quincy Lee', 1),
	('43', '1234', 'Ryder Lee', 4)