-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: archi_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin1@example.com','$2a$10$3Nd5rqhr7a8RuSc.PjgZ8ePVTo3/VdCeR4DWHEnA9ULJNZRLjYimS','2025-06-07 13:03:00','2025-06-07 13:03:00'),(2,'admin2@example.com','$2a$10$88d8Sv6soxrm4M2dsewoMO2.yoYcfZgMTPfnDGFEE2T5zKq1COVAK','2025-06-07 13:03:00','2025-06-07 13:03:00'),(3,'admin3@example.com','$2a$10$QVd4AfIXVuL/WuwJ8UBxTuLIT5mOzolgyaMs05loYR.0CyC2POthO','2025-06-07 13:03:00','2025-06-07 13:03:00'),(4,'admin4@example.com','$2a$10$JkSEa3vc50Hdmj637/OYqOO318i3UpROq.SmEE3flOh9hX6srh81C','2025-06-07 13:03:00','2025-06-07 13:03:00'),(5,'admin5@example.com','$2a$10$IAVcrRns7ydEYBRMTVWppu5IYQbi45IBCiE/Es1daUyKzMAf6PDHe','2025-06-07 13:03:00','2025-06-07 13:03:00');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `chat_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sender` varchar(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `message_type` varchar(20) NOT NULL DEFAULT 'TEXT',
  PRIMARY KEY (`chat_id`),
  KEY `FKmolqi1xj49bg3jjr33674limy` (`user_id`),
  CONSTRAINT `FKmolqi1xj49bg3jjr33674limy` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_code`
--

DROP TABLE IF EXISTS `common_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_code` (
  `common_code` varchar(3) NOT NULL,
  `group_code` varchar(3) NOT NULL,
  `common_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`common_code`,`group_code`),
  KEY `FK_group_code_TO_common_code_1` (`group_code`),
  CONSTRAINT `FK_group_code_TO_common_code_1` FOREIGN KEY (`group_code`) REFERENCES `group_code` (`group_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_code`
--

LOCK TABLES `common_code` WRITE;
/*!40000 ALTER TABLE `common_code` DISABLE KEYS */;
INSERT INTO `common_code` VALUES ('001','G01','청년'),('001','G02','5G'),('001','G03','E북'),('001','G04','카페'),('002','G01','연장자'),('002','G02','LTE'),('002','G03','IT'),('002','G04','디저트'),('003','G01','키즈'),('003','G03','K-POP'),('003','G04','배달'),('004','G01','전체'),('004','G03','OTT'),('004','G04','편의점'),('005','G03','가족'),('005','G04','쇼핑'),('006','G03','게임'),('006','G04','전자책'),('007','G03','경제'),('007','G04','도서'),('008','G03','교육'),('008','G04','웹툰'),('009','G03','넷플릭스'),('009','G04','영상'),('010','G03','뉴스'),('010','G04','뉴스'),('011','G03','데이트'),('011','G04','생활'),('012','G03','도서'),('012','G04','사진'),('013','G03','디즈니'),('014','G03','마블'),('015','G03','미드'),('016','G03','반려동물'),('017','G03','배달'),('018','G03','사진'),('019','G03','생활'),('020','G03','쇼핑'),('021','G03','식품'),('022','G03','야구'),('023','G03','여행'),('024','G03','영어'),('025','G03','영화'),('026','G03','온라인 클래스'),('027','G03','외식'),('028','G03','웹소설'),('029','G03','웹툰'),('030','G03','유튜브'),('031','G03','음악'),('032','G03','자기개발'),('033','G03','자취'),('034','G03','주식'),('035','G03','중국어'),('036','G03','차량'),('037','G03','축구'),('038','G03','취미'),('039','G03','친구'),('040','G03','카페'),('041','G03','커피'),('042','G03','키즈'),('043','G03','티빙'),('044','G03','디저트'),('045','G03','빵'),('046','G03','편의점'),('047','G03','오디오북'),('048','G03','의류'),('049','G03','카카오톡'),('050','G03','SNS');
/*!40000 ALTER TABLE `common_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contexts`
--

DROP TABLE IF EXISTS `contexts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contexts` (
  `user_id` bigint NOT NULL,
  `context` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contexts`
--

LOCK TABLES `contexts` WRITE;
/*!40000 ALTER TABLE `contexts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contexts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `contract_id` bigint NOT NULL AUTO_INCREMENT,
  `product_bundle_id` bigint NOT NULL,
  `user_id` bigint NOT NULL COMMENT 'Auto Increment',
  `payment_method` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`contract_id`),
  KEY `FK_users_TO_contracts_1` (`user_id`),
  CONSTRAINT `FK_users_TO_contracts_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,1,1,'계좌이체',87850,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(2,2,2,'휴대폰결제',79470,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(3,3,3,'신용카드',82900,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(4,4,4,'계좌이체',68000,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(5,5,5,'휴대폰결제',104405,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(6,6,6,'신용카드',66900,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(7,7,7,'계좌이체',69135,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(8,8,8,'휴대폰결제',75500,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(9,9,9,'신용카드',58920,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(10,10,10,'계좌이체',46900,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(11,11,11,'휴대폰결제',64000,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(12,12,12,'신용카드',56828,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(13,13,13,'계좌이체',108300,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(14,14,14,'휴대폰결제',62920,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(15,15,15,'신용카드',42975,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(16,16,16,'계좌이체',63400,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(17,17,17,'휴대폰결제',63762,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(18,18,18,'신용카드',69650,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(19,19,19,'계좌이체',51525,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(20,20,20,'휴대폰결제',43000,'2025-06-07 00:00:00','2026-06-07 00:00:00'),(21,1,1,'휴대폰결제',46234,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(22,2,2,'신용카드',47468,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(23,3,3,'계좌이체',48702,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(24,4,4,'휴대폰결제',49936,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(25,5,5,'신용카드',51170,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(26,6,6,'계좌이체',52404,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(27,7,7,'휴대폰결제',53638,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(28,8,8,'신용카드',54872,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(29,9,9,'계좌이체',56106,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(30,10,10,'휴대폰결제',57340,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(31,11,11,'신용카드',58574,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(32,12,12,'계좌이체',59808,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(33,13,13,'휴대폰결제',61042,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(34,14,14,'신용카드',62276,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(35,15,15,'계좌이체',63510,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(36,16,16,'휴대폰결제',64744,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(37,17,17,'신용카드',65978,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(38,18,18,'계좌이체',67212,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(39,19,19,'휴대폰결제',68446,'2025-07-07 00:00:00','2026-07-07 00:00:00'),(40,20,20,'신용카드',69680,'2025-07-07 00:00:00','2026-07-07 00:00:00');
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_reviews`
--

DROP TABLE IF EXISTS `coupon_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_reviews` (
  `coupon_review_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT 'Auto Increment',
  `coupon_id` bigint NOT NULL,
  `score` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`coupon_review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_reviews`
--

LOCK TABLES `coupon_reviews` WRITE;
/*!40000 ALTER TABLE `coupon_reviews` DISABLE KEYS */;
INSERT INTO `coupon_reviews` VALUES (1,20,1,5,'아메리카노가 진하고 맛있어서 만족합니다. 친구와 함께 즐기기 좋아요.','2025-06-01 09:00:00','2025-06-01 09:00:00'),(2,11,2,5,'배스킨라빈스 아이스크림이 신선하고 가족 모두 좋아해요.','2025-06-01 11:00:00','2025-06-01 11:00:00'),(3,4,3,3,'파리바게뜨 빵 종류가 많아 골라먹는 재미가 있습니다.','2025-06-01 13:00:00','2025-06-01 13:00:00'),(4,11,4,5,'리디셀렉트로 다양한 전자책을 마음껏 읽을 수 있어 좋아요.','2025-06-01 15:00:00','2025-06-01 15:00:00'),(5,2,5,4,'카카오페이지 캐시로 웹툰과 소설을 편하게 즐길 수 있습니다.','2025-06-01 17:00:00','2025-06-01 17:00:00'),(6,4,6,3,'재담쇼츠에서 새로운 웹툰을 발견하는 재미가 있네요.','2025-06-01 19:00:00','2025-06-01 19:00:00'),(7,10,7,2,'CU 도시락이 가성비는 좋지만 메뉴가 자주 바뀌어서 아쉬워요.','2025-06-01 21:00:00','2025-06-01 21:00:00'),(8,14,8,4,'다이소 모바일 금액권으로 생활용품을 저렴하게 살 수 있어 만족합니다.','2025-06-01 23:00:00','2025-06-01 23:00:00'),(9,12,9,4,'탑툰 코인으로 좋아하는 웹툰을 편하게 볼 수 있어요.','2025-06-02 01:00:00','2025-06-02 01:00:00'),(10,20,10,1,'스토리텔 오디오북은 기대만큼 콘텐츠가 다양하지 않아 아쉬웠어요.','2025-06-02 03:00:00','2025-06-02 03:00:00'),(11,8,11,5,'요기요 할인쿠폰 덕분에 배달음식을 저렴하게 먹었습니다.','2025-06-02 05:00:00','2025-06-02 05:00:00'),(12,13,12,2,'스노우 VIP이용권, 필터는 다양하지만 가끔 앱이 느려집니다.','2025-06-02 07:00:00','2025-06-02 07:00:00'),(13,11,13,5,'CJ더마켓 적립금으로 신선한 식재료를 구매할 수 있어 좋아요.','2025-06-02 09:00:00','2025-06-02 09:00:00'),(14,10,14,5,'블라이스 웹툰&웹소설 구독권으로 다양한 작품을 즐길 수 있습니다.','2025-06-02 11:00:00','2025-06-02 11:00:00'),(15,4,15,4,'카카오웹툰 캐시로 웹툰 결제가 편리해졌어요.','2025-06-02 13:00:00','2025-06-02 13:00:00'),(16,18,16,1,'더중앙플러스 구독권은 기대했던 콘텐츠가 적어 아쉬웠습니다.','2025-06-02 15:00:00','2025-06-02 15:00:00'),(17,8,17,5,'파파존스 피자 할인으로 가족과 맛있게 먹었습니다.','2025-06-02 17:00:00','2025-06-02 17:00:00'),(18,10,18,4,'GS 할인쿠폰으로 주유할 때마다 유용하게 씁니다.','2025-06-02 19:00:00','2025-06-02 19:00:00'),(19,2,19,3,'스파오 할인쿠폰으로 옷을 저렴하게 살 수 있어 좋아요.','2025-06-02 21:00:00','2025-06-02 21:00:00'),(20,5,20,5,'cgv 팝콘+음료 세트로 영화관람이 더 즐거웠어요.','2025-06-02 23:00:00','2025-06-02 23:00:00'),(21,1,21,4,'예스24 크레마클럽 구독팩으로 전자책을 많이 읽게 되었습니다.','2025-06-03 09:00:00','2025-06-03 09:00:00'),(22,3,22,3,'배민 할인쿠폰으로 배달음식 주문이 조금 더 저렴해졌어요.','2025-06-03 11:00:00','2025-06-03 11:00:00'),(23,4,23,2,'이모티콘플러스 구독권, 이모티콘은 다양하지만 가격이 부담됩니다.','2025-06-03 13:00:00','2025-06-03 13:00:00'),(24,5,24,5,'스타벅스 아이스 아메리카노가 시원하고 맛있어서 자주 이용합니다.','2025-06-03 15:00:00','2025-06-03 15:00:00');
/*!40000 ALTER TABLE `coupon_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `coupon_id` bigint NOT NULL AUTO_INCREMENT,
  `coupon_name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `tag_code` bigint DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_code` varchar(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`coupon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (1,'메가MGC커피 아메리카노(HOT) 2잔',NULL,5348024557502464,NULL,'001','2025-06-07 02:23:00','2025-06-07 02:23:00'),(2,'배스킨라빈스 파인트 4천원 할인쿠폰',NULL,4644337116250112,NULL,'002','2025-06-07 02:23:00','2025-06-07 02:23:00'),(3,'파리바게뜨 2,500원 할인쿠폰 2매',NULL,13073748835532800,NULL,'002','2025-06-07 02:23:00','2025-06-07 02:23:00'),(4,'리디셀렉트 전자책 무제한구독권',NULL,206159479296,NULL,'008','2025-06-07 02:23:00','2025-06-07 02:23:00'),(5,'카카오페이지 페이지 3천 캐시',NULL,206159479296,NULL,'008','2025-06-07 02:23:00','2025-06-07 02:23:00'),(6,'재담쇼츠 웹툰 3일 무제한 이용권',NULL,137574219776,NULL,'008','2025-06-07 02:23:00','2025-06-07 02:23:00'),(7,'CU 실속한끼 도시락&샐러드 20% 할인',NULL,18016597935390720,NULL,'004','2025-06-07 02:23:00','2025-06-07 02:23:00'),(8,'다이소 모바일 금액권 2천원',NULL,2199425908736,NULL,'011','2025-06-07 02:23:00','2025-06-07 02:23:00'),(9,'탑툰 웹툰 15코인 충전권',NULL,206159479296,NULL,'008','2025-06-07 02:23:00','2025-06-07 02:23:00'),(10,'스토리텔 오디오북 무제한구독권',NULL,37134696926855170,NULL,'007','2025-06-07 02:23:00','2025-06-07 02:23:00'),(11,'요기요 2천원 할인쿠폰 2매',NULL,2233416548352,NULL,'003','2025-06-07 02:23:00','2025-06-07 02:23:00'),(12,'스노우 VIP이용권',NULL,288371113841393660,NULL,'011','2025-06-07 02:23:00','2025-06-07 02:23:00'),(13,'CJ더마켓 4천원 적립금',NULL,2199560134656,NULL,'011','2025-06-07 02:23:00','2025-06-07 02:23:00'),(14,'블라이스 웹툰&웹소설 무제한 구독권',NULL,206159478784,NULL,'008','2025-06-07 02:23:00','2025-06-07 02:23:00'),(15,'카카오웹툰 웹툰 3천 캐시',NULL,137573171200,NULL,'008','2025-06-07 02:23:00','2025-06-07 02:23:00'),(16,'더중앙플러스 프리미엄콘텐트 무제한 구독권',NULL,4398046806016,NULL,'010','2025-06-07 02:23:00','2025-06-07 02:23:00'),(17,'파파존스 라지피자 30% 할인',NULL,34393300992,NULL,'003','2025-06-07 02:23:00','2025-06-07 02:23:00'),(18,'GS 5천원 할인쿠폰',NULL,18016597935390720,NULL,'004','2025-06-07 02:23:00','2025-06-07 02:23:00'),(19,'스파오 5천원 할인쿠폰',NULL,72057594440581124,NULL,'005','2025-06-07 02:23:00','2025-06-07 02:23:00'),(20,'cgv 팝콘+음료',NULL,140746078822400,NULL,'011','2025-06-07 02:23:00','2025-06-07 02:23:00'),(21,'예스24크레마클럽 구독팩',NULL,1099512676864,NULL,'006','2025-06-07 02:23:00','2025-06-07 02:23:00'),(22,'배민 3천원 할인쿠폰 2매',NULL,2233416548352,NULL,'003','2025-06-07 02:23:00','2025-06-07 02:23:00'),(23,'이모티콘플러스 월 구독권',NULL,432345564227567610,NULL,'011','2025-06-07 02:23:00','2025-06-07 02:23:00'),(24,'스타벅스 아이스 아메리카노(Tall) 2잔',NULL,5348024557502464,NULL,'001','2025-06-07 02:23:00','2025-06-07 02:23:00');
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_code`
--

DROP TABLE IF EXISTS `group_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_code` (
  `group_code` varchar(3) NOT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`group_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_code`
--

LOCK TABLES `group_code` WRITE;
/*!40000 ALTER TABLE `group_code` DISABLE KEYS */;
INSERT INTO `group_code` VALUES ('G01','연령'),('G02','통신 분류'),('G03','부가 서비스'),('G04','라이프 쿠폰');
/*!40000 ALTER TABLE `group_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_reviews`
--

DROP TABLE IF EXISTS `plan_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_reviews` (
  `plan_review_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT 'Auto Increment',
  `plan_id` bigint NOT NULL,
  `score` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`plan_review_id`),
  KEY `FKbuq5l50hl2euid68cgbdt53fs` (`plan_id`),
  KEY `FKbts6dr0gupynxh4ostepouoa0` (`user_id`),
  CONSTRAINT `FKbts6dr0gupynxh4ostepouoa0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKbuq5l50hl2euid68cgbdt53fs` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_reviews`
--

LOCK TABLES `plan_reviews` WRITE;
/*!40000 ALTER TABLE `plan_reviews` DISABLE KEYS */;
INSERT INTO `plan_reviews` VALUES (1,1,1,5,'데이터도 넉넉하고 속도도 빨라서 매우 만족합니다.','2025-06-01 09:00:00','2025-06-01 09:00:00'),(2,2,2,4,'대체로 만족하지만 가격이 조금 비싼 것 같아요.','2025-06-01 10:00:00','2025-06-01 10:00:00'),(3,3,3,2,'데이터가 생각보다 빨리 소진돼서 불편합니다.','2025-06-01 11:00:00','2025-06-01 11:00:00'),(4,4,4,1,'속도가 자주 느려지고 고객센터 응대도 아쉬웠어요.','2025-06-01 12:00:00','2025-06-01 12:00:00'),(5,5,5,5,'문자와 통화가 무제한이라 가족 모두 만족해요.','2025-06-01 13:00:00','2025-06-01 13:00:00'),(6,6,6,3,'가격 대비 혜택이 평범한 편입니다.','2025-06-01 14:00:00','2025-06-01 14:00:00'),(7,7,7,4,'데이터 용량이 넉넉해서 동영상 시청에 좋아요.','2025-06-01 15:00:00','2025-06-01 15:00:00'),(8,8,8,2,'추가요금이 자주 발생해서 부담스럽습니다.','2025-06-01 16:00:00','2025-06-01 16:00:00'),(9,9,9,1,'통화 품질이 좋지 않고 데이터도 부족합니다.','2025-06-01 17:00:00','2025-06-01 17:00:00'),(10,10,10,5,'혜택이 많고 앱 사용도 편리해서 추천합니다.','2025-06-01 18:00:00','2025-06-01 18:00:00'),(11,11,11,4,'문자 제공량이 많아 학생에게 유용해요.','2025-06-01 19:00:00','2025-06-01 19:00:00'),(12,12,12,3,'무난하게 사용할 수 있는 요금제입니다.','2025-06-01 20:00:00','2025-06-01 20:00:00'),(13,13,13,2,'데이터 속도가 자주 느려져서 아쉽네요.','2025-06-01 21:00:00','2025-06-01 21:00:00'),(14,14,14,1,'가격 대비 제공되는 혜택이 부족합니다.','2025-06-01 22:00:00','2025-06-01 22:00:00'),(15,15,15,5,'통화 품질이 좋아서 자주 이용합니다.','2025-06-01 23:00:00','2025-06-01 23:00:00'),(16,16,16,4,'데이터 제공량이 많아 마음에 들어요.','2025-06-02 09:00:00','2025-06-02 09:00:00'),(17,17,17,2,'문자 제공량이 적어서 불편합니다.','2025-06-02 10:00:00','2025-06-02 10:00:00'),(18,18,18,1,'고객센터 연결이 어려워 불만족합니다.','2025-06-02 11:00:00','2025-06-02 11:00:00'),(19,19,19,5,'가격도 합리적이고 서비스도 좋아요.','2025-06-02 12:00:00','2025-06-02 12:00:00'),(20,20,20,4,'앱 사용이 편리하고 데이터도 넉넉합니다.','2025-06-02 13:00:00','2025-06-02 13:00:00'),(21,1,21,3,'혜택이 특별하지는 않지만 무난합니다.','2025-06-02 14:00:00','2025-06-02 14:00:00'),(22,2,22,2,'데이터가 부족해서 불편해요.','2025-06-02 15:00:00','2025-06-02 15:00:00'),(23,3,23,1,'통화 품질도 별로고 가격도 비쌉니다.','2025-06-02 16:00:00','2025-06-02 16:00:00'),(24,4,24,5,'무제한 데이터라서 마음 놓고 쓸 수 있어요.','2025-06-02 17:00:00','2025-06-02 17:00:00'),(25,5,25,4,'가족 할인 혜택이 유용합니다.','2025-06-02 18:00:00','2025-06-02 18:00:00'),(26,6,26,3,'앱 UI가 조금 불편하지만 쓸 만합니다.','2025-06-02 19:00:00','2025-06-02 19:00:00'),(27,7,27,2,'추가요금 걱정이 많아 신경 쓰여요.','2025-06-02 20:00:00','2025-06-02 20:00:00'),(28,8,28,1,'데이터가 너무 빨리 닳아서 실망입니다.','2025-06-02 21:00:00','2025-06-02 21:00:00'),(29,9,29,5,'친구들에게도 추천할 만큼 만족합니다.','2025-06-02 22:00:00','2025-06-02 22:00:00'),(30,10,30,4,'통화와 데이터 모두 넉넉해서 좋아요.','2025-06-02 23:00:00','2025-06-02 23:00:00');
/*!40000 ALTER TABLE `plan_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `plan_id` bigint NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `month_data` int DEFAULT NULL,
  `call_usage` varchar(255) DEFAULT NULL,
  `message_usage` varchar(255) DEFAULT NULL,
  `benefit` varchar(255) DEFAULT NULL,
  `tag_code` bigint DEFAULT NULL,
  `age_code` varchar(3) DEFAULT NULL,
  `category_code` varchar(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,'5G 프리미어 에센셜',85000,-1,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',33,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(2,'5G 스탠다드',75000,150,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',32,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(3,'5G 심플+',61000,31,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',32,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(4,'5G 프리미어 레귤러',95000,-1,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',33,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(5,'유쓰 5G 스탠다드',75000,210,'무제한','기본제공','U⁺모바일tv 무료',32,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(6,'5G 데이터 레귤러',63000,50,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(7,'5G 데이터 플러스',66000,80,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(8,'5G 라이트+',66000,14,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(9,'유쓰 5G 데이터 플러스',55000,110,'무제한','기본제공','U⁺모바일tv 무료',37,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(10,'5G 미니',37000,5,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(11,'유쓰 5G 라이트+',55000,26,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(12,'5G 슬림+',47000,9,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(13,'5G 프리미어 플러스',105000,-1,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(14,'5G 시니어 B형',43000,10,'무제한','기본제공','U⁺ 모바일tv라이트 무료',38,'002','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(15,'(LTE) 데이터 시니어 33',33000,2,'무제한','기본제공','실버지킴이',70,'002','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(16,'유쓰 5G 슬림+',47000,15,'무제한','기본제공','U⁺ 모바일tv라이트 무료',38,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(17,'5G 시니어 A형',45000,10,'무제한','기본제공','U⁺ 모바일tv라이트 무료',38,'002','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(18,'유쓰 5G 데이터 레귤러',63000,70,'무제한','기본제공','U⁺모바일tv 무료',37,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(19,'(LTE) 데이터 33',33000,2,'무제한','기본제공','U⁺ 모바일tv라이트 무료',70,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(20,'유쓰 5G 미니',37000,9,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(21,'유쓰 5G 심플+',61000,41,'무제한','기본제공','U⁺모바일tv 무료',38,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(22,'5G 베이직+',59000,24,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(23,'5G 시니어 C형',39000,10,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'002','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(24,'5G 스탠다드 에센셜',70000,125,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(25,'시니어16.5',16500,0,'70분','100건','실버지킴이',90,'002','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(26,'(LTE) 추가 요금 걱정 없는 데이터 69',69000,5,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',70,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(27,'5G 데이터 슈퍼',68000,95,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(28,'유쓰 5G 스탠다드 에센셜',70000,185,'무제한','기본제공','U⁺모바일tv 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(29,'5G 시그니처',130000,-1,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(30,'유쓰 5G 데이터 슈퍼',68000,135,'무제한','기본제공','U⁺모바일tv 무료',37,'001','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(31,'유쓰 5G 베이직+',59000,36,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(33,'5G 라이트 청소년',45000,8,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(34,'5G 프리미어 슈퍼',115000,-1,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(35,'(LTE) 추가 요금 걱정 없는 데이터 청소년 33',33000,2,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',70,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(36,'(LTE) 복지 33',33000,2,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',70,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(37,'(LTE) 복지 49',49000,6,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',70,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(38,'5G 복지 55',55000,14,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(39,'LTE청소년19',20900,0,'133분','1,000건','U⁺ 모바일tv 라이트 무료',90,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(40,'(LTE) 추가 요금 걱정 없는 데이터 청소년 59',59000,9,'무제한','기본제공','U⁺ 모바일tv 기본 월정액 무료',70,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(41,'5G 복지 75',75000,150,'무제한','기본제공','U⁺모바일tv 무료',37,'004','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(42,'5G 키즈 29',29000,3,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'003','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(43,'5G 키즈 39',39000,6,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'003','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(44,'5G 키즈 45',45000,9,'무제한','기본제공','U⁺ 모바일tv 라이트 무료',38,'003','001','2025-06-07 01:39:50','2025-06-07 01:39:50'),(45,'LTE 키즈 22(만 12세 이하)',22000,1,'60분','기본제공','U⁺ 모바일tv 라이트 무료',64,'003','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(46,'로밍패스',55000,9,'120분','기본제공','자유롭게 기간 선택(최대 7일)',128,'004','002','2025-06-07 01:39:50','2025-06-07 01:39:50'),(47,'빅 로밍패스',67000,15,'120분','기본제공','자유롭게 기간 선택(최대 7일)',128,'004','002','2025-06-10 00:00:00','2025-06-10 00:00:00'),(48,'프리미엄 로밍패스',99000,-1,'무제한','기본제공','자유롭게 기간 선택(최대 7일)',128,'004','002','2025-06-10 00:00:00','2025-06-10 00:00:00'),(49,'데일리 로밍패스',25000,1,'50분','30건','자유롭게 기간 선택(최대 2일)',128,'003','002','2025-06-10 00:00:00','2025-06-10 00:00:00');
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_bundles`
--

DROP TABLE IF EXISTS `product_bundles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_bundles` (
  `product_bundle_id` bigint NOT NULL AUTO_INCREMENT,
  `plan_id` bigint NOT NULL,
  `service_id` bigint NOT NULL,
  `coupon_id` bigint NOT NULL,
  `like_count` bigint DEFAULT NULL,
  `dislike_count` bigint DEFAULT NULL,
  `tag_code` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`product_bundle_id`,`plan_id`,`service_id`,`coupon_id`),
  KEY `FK_plans_TO_product_bundles_1` (`plan_id`),
  KEY `FK_services_TO_product_bundles_1` (`service_id`),
  KEY `FK_coupons_TO_product_bundles_1` (`coupon_id`),
  CONSTRAINT `FK_coupons_TO_product_bundles_1` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`),
  CONSTRAINT `FK_plans_TO_product_bundles_1` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`plan_id`),
  CONSTRAINT `FK_services_TO_product_bundles_1` FOREIGN KEY (`service_id`) REFERENCES `vass` (`vas_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_bundles`
--

LOCK TABLES `product_bundles` WRITE;
/*!40000 ALTER TABLE `product_bundles` DISABLE KEYS */;
INSERT INTO `product_bundles` VALUES (1,1,1,1,15,2,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(2,2,4,11,8,1,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(3,5,2,2,20,3,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(4,3,7,7,12,0,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(5,4,6,20,25,5,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(6,6,3,5,18,2,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(7,7,5,17,30,4,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(8,8,8,9,9,1,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(9,9,10,4,22,3,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(10,10,12,15,14,0,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(11,11,14,14,17,2,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(12,12,16,16,10,1,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(13,13,18,18,28,4,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(14,14,20,24,19,3,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(15,15,22,22,13,1,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(16,16,24,23,21,2,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(17,17,26,20,16,0,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(18,18,28,18,24,3,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(19,19,30,20,11,1,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(20,20,32,24,27,5,NULL,'2025-06-07 14:00:00','2025-06-07 14:00:00'),(21,21,3,4,5,5,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(22,22,5,7,9,4,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(23,23,7,10,13,3,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(24,24,9,13,17,2,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(25,25,11,16,21,1,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(26,26,13,19,25,0,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(27,27,15,22,29,5,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(28,28,17,25,33,4,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(29,29,19,3,2,3,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(30,30,21,6,6,2,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(31,31,23,9,10,1,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(32,32,25,12,14,0,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(33,3,27,15,18,5,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(34,34,29,18,22,4,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(35,35,31,21,26,3,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(36,36,33,24,30,2,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(37,37,2,2,34,1,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(38,38,4,5,3,0,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(39,39,6,8,7,5,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00'),(40,40,8,11,11,4,NULL,'2025-07-07 14:00:00','2025-07-07 14:00:00');
/*!40000 ALTER TABLE `product_bundles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_options`
--

DROP TABLE IF EXISTS `survey_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_options` (
  `survey_option_id` bigint NOT NULL,
  `survey_question_id` bigint NOT NULL,
  `option_text` varchar(100) DEFAULT NULL,
  `tag_code` bigint DEFAULT NULL,
  `next_question_id` int DEFAULT NULL,
  PRIMARY KEY (`survey_option_id`,`survey_question_id`),
  KEY `FK_survey_questions_TO_survey_options_1` (`survey_question_id`),
  CONSTRAINT `FK_survey_questions_TO_survey_options_1` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_questions` (`survey_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_options`
--

LOCK TABLES `survey_options` WRITE;
/*!40000 ALTER TABLE `survey_options` DISABLE KEYS */;
INSERT INTO `survey_options` VALUES (1,1,'데이터 사용량이 많음',1,2),(2,1,'데이터 사용량이 적음',2,2),(3,2,'전화를 많이 사용',4,3),(4,2,'문자를 많이 사용',16,3),(5,2,'많이 사용하지 않음',8,3),(6,3,'5G 선호',32,4),(7,3,'로밍 요금제 자주 사용',128,4),(8,3,'요금제 변경이 잦음',256,4),(9,3,'상관 없음',64,4),(10,4,'영상',NULL,5),(11,4,'도서',NULL,6),(12,4,'음악',549755813888,7),(13,5,'넷플릭스',131072,7),(14,5,'디즈니 플러스',2097152,7),(15,5,'티빙',2251799813685248,7),(16,5,'유튜브',274877906944,7),(17,5,'기타',4096,7),(18,6,'웹툰',137438953472,7),(19,6,'웹소설',68719476736,7),(20,6,'전자서적',512,7),(21,6,'오디오북',36028797018963968,7),(22,6,'기타',1048576,7),(23,7,'혼자 생활',134217728,9),(24,7,'사람들과 교류',NULL,8),(25,8,'가족',8192,9),(26,8,'친구들',140737488355328,9),(27,8,'연인',524288,9),(28,8,'자녀',1125899906842624,9),(29,8,'반려동물',16777216,9),(30,8,'1인 가구',2199023255552,9),(31,9,'외국어',NULL,10),(32,9,'시사 이슈',NULL,11),(33,9,'기타 자기개발',1099511627776,12),(34,10,'영어',4294967296,12),(35,10,'중국어',8796093022208,12),(36,10,'기타',65536,12),(37,11,'IT 트렌드',1024,12),(38,11,'정치, 뉴스',262144,12),(39,11,'투자, 주식',4398046511104,12),(40,12,'활동적인 취미',NULL,13),(41,12,'정적인 취미',NULL,14),(42,12,'커뮤니케이션',NULL,15),(43,13,'축구',35184372088832,16),(44,13,'야구',1073741824,16),(45,13,'드라이빙',17592186044416,16),(46,14,'영화',8589934592,16),(47,14,'게임',16384,16),(48,14,'기타',70368744177664,16),(49,15,'SNS',288230376151711744,16),(50,15,'카카오톡',144115188075855872,16),(51,15,'사진촬영',67108864,16),(52,16,'식품',NULL,17),(53,16,'쇼핑',268435456,NULL),(54,16,'여행',2147483648,NULL),(55,16,'패션, 의류',72057594037927936,NULL),(56,17,'식사',NULL,18),(57,17,'디저트',NULL,19),(58,17,'간편식',18014398509481984,NULL),(59,18,'외식',34359738368,NULL),(60,18,'배달',33554432,NULL),(61,18,'기타',536870912,NULL),(62,19,'카페 탐방',281474976710656,NULL),(63,19,'커피',562949953421312,NULL),(64,19,'제빵류',9007199254740992,NULL),(65,19,'기타',4503599627370496,NULL);
/*!40000 ALTER TABLE `survey_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_questions`
--

DROP TABLE IF EXISTS `survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_questions` (
  `survey_question_id` bigint NOT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  `question_order` int DEFAULT NULL,
  PRIMARY KEY (`survey_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_questions`
--

LOCK TABLES `survey_questions` WRITE;
/*!40000 ALTER TABLE `survey_questions` DISABLE KEYS */;
INSERT INTO `survey_questions` VALUES (1,'데이터 사용량이 많으신가요?',1),(2,'전화나 문자를 많이 사용하시나요?',2),(3,'데이터 사용 스타일이 어떻게 되시나요?',3),(4,'자주 이용하는 콘텐츠는 무엇인가요?',4),(5,'어떤 영상 플랫폼을 선호하시나요?',5),(6,'어떤 종류의 도서를 선호하시나요?',6),(7,'평소 어떤 생활을 선호하시나요?',7),(8,'누구와 있는 시간이 가장 긴가요?',8),(9,'만약 자기개발을 시작한다면 어떤 분야를 선호하시나요?',9),(10,'배우고 싶은 외국어는 무엇인가요?',10),(11,'관심있는 시사 항목은 무엇인가요?',11),(12,'어떤 활동을 선호하시나요?',12),(13,'아래 활동 중 가장 선호하는 것은 무엇인가요?',13),(14,'아래 활동 중 가장 선호하는 것은 무엇인가요?',14),(15,'아래 활동 중 가장 선호하는 것은 무엇인가요?',15),(16,'가장 많이 소비하는 항목은 무엇인가요?',16),(17,'어떤 종류의 식품을 많이 구매하나요?',17),(18,'어떤 방식의 식사를 선호하시나요?',18),(19,'아래 항목 중 가장 선호하는 것은 무엇인가요?',19);
/*!40000 ALTER TABLE `survey_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_meta`
--

DROP TABLE IF EXISTS `tag_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_meta` (
  `tag_type` varchar(20) NOT NULL,
  `tag_key` varchar(50) NOT NULL,
  `tag_description` varchar(50) DEFAULT NULL,
  `bit_position` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`tag_type`,`tag_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_meta`
--

LOCK TABLES `tag_meta` WRITE;
/*!40000 ALTER TABLE `tag_meta` DISABLE KEYS */;
INSERT INTO `tag_meta` VALUES ('관심사 성향','audiobook','오디오북',55,NULL,NULL),('관심사 성향','baseball','야구',30,NULL,NULL),('관심사 성향','book','도서',20,NULL,NULL),('관심사 성향','bread','빵',53,NULL,NULL),('관심사 성향','cafe','카페',48,NULL,NULL),('관심사 성향','car','차량',44,NULL,NULL),('관심사 성향','chinese','중국어',43,NULL,NULL),('관심사 성향','clothes','의류',56,NULL,NULL),('관심사 성향','coffee','커피',49,NULL,NULL),('관심사 성향','conveniencestore','편의점',54,NULL,NULL),('관심사 성향','date','데이트',19,NULL,NULL),('관심사 성향','delivery','배달',25,NULL,NULL),('관심사 성향','desert','디저트',52,NULL,NULL),('관심사 성향','disney','디즈니',21,NULL,NULL),('관심사 성향','drama','미드',23,NULL,NULL),('관심사 성향','eating out','외식',35,NULL,NULL),('관심사 성향','ebook','E북',9,NULL,NULL),('관심사 성향','economy','경제',15,NULL,NULL),('관심사 성향','edu','교육',16,NULL,NULL),('관심사 성향','english','영어',32,NULL,NULL),('관심사 성향','family','가족',13,NULL,NULL),('관심사 성향','food','식품',29,NULL,NULL),('관심사 성향','friend','친구',47,NULL,NULL),('관심사 성향','game','게임',14,NULL,NULL),('관심사 성향','hobby','취미',46,NULL,NULL),('관심사 성향','it','IT',10,NULL,NULL),('관심사 성향','kakaotalk','카카오톡',57,NULL,NULL),('관심사 성향','kids','키즈',50,NULL,NULL),('관심사 성향','kpop','K-POP',11,NULL,NULL),('관심사 성향','life','생활',27,NULL,NULL),('관심사 성향','living alone','자취',41,NULL,NULL),('관심사 성향','marvel','마블',22,NULL,NULL),('관심사 성향','movie','영화',33,NULL,NULL),('관심사 성향','music','음악',39,NULL,NULL),('관심사 성향','netflix','넷플릭스',17,NULL,NULL),('관심사 성향','news','뉴스',18,NULL,NULL),('관심사 성향','online-class','온라인 클래스',34,NULL,NULL),('관심사 성향','ott','OTT',12,NULL,NULL),('관심사 성향','pet','반려동물',24,NULL,NULL),('관심사 성향','photo','사진',26,NULL,NULL),('관심사 성향','self-Improvement','자기개발',40,NULL,NULL),('관심사 성향','shop','쇼핑',28,NULL,NULL),('관심사 성향','sns','SNS',58,NULL,NULL),('관심사 성향','soccer','축구',45,NULL,NULL),('관심사 성향','stock','주식',42,NULL,NULL),('관심사 성향','tiving','티빙',51,NULL,NULL),('관심사 성향','travel','여행',31,NULL,NULL),('관심사 성향','webnovel','웹소설',36,NULL,NULL),('관심사 성향','webtoon','웹툰',37,NULL,NULL),('관심사 성향','youtube','유튜브',38,NULL,NULL),('통신 성향','call_heavy','통화 사용량이 많은 사용자',2,NULL,NULL),('통신 성향','call_light','통화 사용량이 적은 사용자',3,NULL,NULL),('통신 성향','data_heavy','데이터 사용량이 많은 사용자',0,NULL,NULL),('통신 성향','data_light','데이터 사용량이 적은 사용자',1,NULL,NULL),('통신 성향','plan_changer','요금제를 자주 바꾸는 사용자',8,NULL,NULL),('통신 성향','roaming','해외 로밍 사용 경험이 많은 사용자',7,NULL,NULL),('통신 성향','sms_heavy','문자(SMS) 사용량이 많은 사용자',4,NULL,NULL),('통신 성향','use_5g','5G 사용자',5,NULL,NULL),('통신 성향','use_lte','LTE 사용자',6,NULL,NULL);
/*!40000 ALTER TABLE `tag_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_usage_histories`
--

DROP TABLE IF EXISTS `user_usage_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_usage_histories` (
  `usage_history_id` bigint NOT NULL,
  `user_id` bigint NOT NULL COMMENT 'Auto Increment',
  `current_usage` varchar(255) DEFAULT NULL,
  `message_usage` varchar(255) DEFAULT NULL,
  `call_usage` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`usage_history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_usage_histories`
--

LOCK TABLES `user_usage_histories` WRITE;
/*!40000 ALTER TABLE `user_usage_histories` DISABLE KEYS */;
INSERT INTO `user_usage_histories` VALUES (1,1,'2.7','45','120','2025-06-07 09:10:00'),(2,2,'8.3','12','300','2025-06-07 10:25:00'),(3,3,'1.1','85','70','2025-06-07 11:40:00'),(4,4,'12.5','5','520','2025-06-07 13:00:00'),(5,5,'3.9','130','210','2025-06-07 14:15:00'),(6,6,'0.6','200','40','2025-06-07 15:30:00'),(7,7,'7.4','60','180','2025-06-07 16:45:00'),(8,8,'5.2','25','90','2025-06-07 18:00:00'),(9,9,'4.8','110','160','2025-06-07 19:15:00'),(10,10,'10.1','8','400','2025-06-07 20:30:00'),(11,11,'6.5','55','140','2025-06-07 08:20:00'),(12,12,'3.3','95','60','2025-06-07 09:35:00'),(13,13,'9.7','20','350','2025-06-07 10:50:00'),(14,14,'2.1','160','80','2025-06-07 12:05:00'),(15,15,'11.2','10','480','2025-06-07 13:20:00'),(16,16,'4.2','75','200','2025-06-07 14:35:00'),(17,17,'7.9','33','150','2025-06-07 15:50:00'),(18,18,'1.8','120','55','2025-06-07 17:05:00'),(19,19,'5.7','50','170','2025-06-07 18:20:00'),(20,20,'13.6','6','540','2025-06-07 19:35:00');
/*!40000 ALTER TABLE `user_usage_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL COMMENT 'Auto Increment',
  `username` varchar(255) NOT NULL COMMENT 'unique',
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL COMMENT 'unique',
  `created_at` datetime NOT NULL COMMENT '생성시간',
  `updated_at` datetime NOT NULL,
  `age_code` varchar(255) DEFAULT NULL,
  `tag_code` bigint DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `birth` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','$2a$10$UOg9Y/WOYuFpLSqAAXUHKukkCGsMUVT3BQ4hEBKNT9jZMml4Jv1O.','user1@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','004',2561,'010-1234-0001','1990.03.15','M'),(2,'user2','$2a$10$uAQVeQsY16JA.LKz9oTb3OLtTA9ak6MRFtKkHe1xBIPKES6XphAhu','user2@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','004',135176,'010-1234-0002','1985.07.22','F'),(3,'user3','$2a$10$6dPQZopNASlFtO8bLhzmUeWpIh.z7MQ7AfQ7x51lMwIgKU9VSocuW','user3@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','004',8590065696,'010-1234-0003','1992.11.08','M'),(4,'user4','$2a$10$6dPQZopNASlFtO8bLhzmUeWpIh.z7MQ7AfQ7x51lMwIgKU9VSocuW','user4@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','004',10737418496,'010-1234-0004','1988.01.30','F'),(5,'user5','$2a$10$ht215jcDdzD9IOY/QjWQHeBSPpN56iPsO6Cl14nRBsFGQEF1/FMmS','user5@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','004',824633720832,'010-1234-0005','1995.05.14','M'),(6,'user6','$2a$10$IwbGCRDbJhIWXTPGP7VDpO4V1jw/hDeXaarpiv6cNcxBKZRmbbi4S','user6@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','004',2098192,'010-1234-0006','1987.09.03','F'),(7,'user7','$2a$10$YLaAkPw.a.VEc9hZAOqjL.gz9kb25dLTw2Fgxe0pF.H0Yr6fxE6/e','user7@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','004',25165952,'010-1234-0007','1993.12.25','M'),(8,'user8','$2a$10$nhf50Vmj3p68YyB3V9yBhujewR7BYCrcHz7iCfK7s6i/9SX8WJDO.','user8@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','001',40964,'010-1234-0008','1991.04.18','F'),(9,'user9','$2a$10$sdqV0i6VA/JpVL7O5eg0EOzFga0DeifC6XVwHpWA7e0JK7rqwQnma','user9@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','001',327744,'010-1234-0009','1989.08.07','M'),(10,'user10','$2a$10$Ay5uCSW55T5NNjLlus95iObZA2RdBr2EJqouPnj9z65gALw5JuBGi','user10@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','001',3145736,'010-1234-0010','1994.02.11','F'),(11,'user11','$2a$10$ZDfFaM0W6cS8GOppd1QSoOb4a/fCQBd11IB6dGO8C8q7h/b0EO2UC','user11@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','001',12582928,'010-1234-0011','1986.06.29','M'),(12,'user12','$2a$10$VUQlnpn0EUdTMr4mq3rCuua19T.80tajHJcOutVmCfMpmVxFu0OBq','user12@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','002',100663328,'010-1234-0012','1996.10.16','F'),(13,'user13','$2a$10$AqfZaMXPtgB791K3DB6r3.z8pE26WTNoAs.8CLPfU6FyOiyqMhAJS','user13@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','002',402653186,'010-1234-0013','1984.03.05','M'),(14,'user14','$2a$10$HN.8PTsXrSmQTQvHOXZNL.cnuMsBpStlCfkScCPO72EmreSdRnrxq','user14@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','003',1610612740,'010-1234-0014','1997.07.13','F'),(15,'user15','$2a$10$jj7d0Ts.23LQkyHZ9OyKxO7FZtN4wQLIBNYm7q1EwJsuGOGDUU./a','user15@test.com','2025-06-07 13:30:00','2025-06-07 13:30:00','003',6442451200,'010-1234-0015','1983.11.27','M'),(16,'user16','$2a$10$cRNSyBv9jpDfdIpWtqfRTuAoLEhuCPjH/nUQyUdF4cO3E7ySzU5q6','user16@test.com','2025-06-07 14:00:00','2025-06-07 14:00:00','004',51539607680,'010-1234-0016','1998.01.09','F'),(17,'user17','$2a$10$E1wIssMjV4enNq7b2tIp/OaST2sYtzhw1e07Tf0aNtdmbP8KIaLdy','user17@test.com','2025-06-07 14:00:00','2025-06-07 14:00:00','001',206158430464,'010-1234-0017','1982.05.21','M'),(18,'user18','$2a$10$tf7BIcn6yhhPT6VzxYr5W.mzxpqrYIl7WP/S9.EyfThq6ZlHG0tRy','user18@test.com','2025-06-07 14:00:00','2025-06-07 14:00:00','002',288230651029618686,'010-1234-0018','1999.09.04','F'),(19,'user19','$2a$10$4FbZdCmDQb.cg/DfVUKEhOXBsXaEFPeebasMrglT8v9ndIHxantle','user19@test.com','2025-06-07 14:00:00','2025-06-07 14:00:00','003',72058143793741892,'010-1234-0019','1981.12.17','M'),(20,'user20','$2a$10$x0879Ik.Rh.xS7fijRra/OOH2Q7lzjR6bPvc7GDaymxlstv3G0zYq','user20@test.com','2025-06-07 14:00:00','2025-06-07 14:00:00','004',144396663052566654,'010-1234-0020','2000.04.02','F');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vas_reviews`
--

DROP TABLE IF EXISTS `vas_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vas_reviews` (
  `vas_review_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT 'Auto Increment',
  `vas_id` bigint NOT NULL,
  `score` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`vas_review_id`),
  KEY `FK2v4pwkwfci57k5dtunto1s6vc` (`user_id`),
  KEY `FKgfmx3i68iklox5gn0n33qn5l2` (`vas_id`),
  CONSTRAINT `FK2v4pwkwfci57k5dtunto1s6vc` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKgfmx3i68iklox5gn0n33qn5l2` FOREIGN KEY (`vas_id`) REFERENCES `vass` (`vas_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vas_reviews`
--

LOCK TABLES `vas_reviews` WRITE;
/*!40000 ALTER TABLE `vas_reviews` DISABLE KEYS */;
INSERT INTO `vas_reviews` VALUES (1,1,1,5,'다양한 오리지널 콘텐츠를 끊김 없이 즐길 수 있어 정말 만족합니다.','2025-06-08 10:10:00','2025-06-08 10:10:00'),(2,2,2,4,'음악 감상은 편리하지만 가끔 곡이 부족하게 느껴져요.','2025-06-08 11:15:00','2025-06-08 11:15:00'),(3,3,3,3,'100곡 제한이 아쉽지만 가격은 합리적입니다.','2025-06-08 12:20:00','2025-06-08 12:20:00'),(4,4,4,2,'광고 없는 서비스라 기대했는데 가끔 버퍼링이 심해요.','2025-06-08 13:25:00','2025-06-08 13:25:00'),(5,5,5,1,'통화연결음 변경이 자주 실패해서 실망입니다.','2025-06-08 14:30:00','2025-06-08 14:30:00'),(6,6,6,5,'디즈니+ 덕분에 가족과 영화 보는 시간이 늘었어요.','2025-06-08 15:35:00','2025-06-08 15:35:00'),(7,7,7,4,'넷플릭스 시리즈가 다양해서 만족하지만 가격이 조금 아쉽네요.','2025-06-08 16:40:00','2025-06-08 16:40:00'),(8,8,8,3,'웹툰 코인 충전은 편리하지만 사용처가 제한적입니다.','2025-06-08 17:45:00','2025-06-08 17:45:00'),(9,9,9,2,'웹툰팩 이용 중 오류가 잦아 불편했습니다.','2025-06-08 18:50:00','2025-06-08 18:50:00'),(10,10,10,1,'도서멤버쉽 결제 후 이용이 어려워서 실망이에요.','2025-06-08 19:55:00','2025-06-08 19:55:00'),(11,11,11,5,'전자책 종류가 다양해서 독서가 즐거워졌습니다.','2025-06-09 10:10:00','2025-06-09 10:10:00'),(12,12,12,4,'밀리의 서재는 좋은데 가끔 동기화가 느려요.','2025-06-09 11:15:00','2025-06-09 11:15:00'),(13,13,13,3,'쇼츠 콘텐츠가 신선하지만 가격이 비싼 편입니다.','2025-06-09 12:20:00','2025-06-09 12:20:00'),(14,14,14,2,'캐시 사용처가 제한적이라 불편함을 느꼈습니다.','2025-06-09 13:25:00','2025-06-09 13:25:00'),(15,15,15,1,'구독권 해지가 번거로워서 불만족입니다.','2025-06-09 14:30:00','2025-06-09 14:30:00'),(16,16,16,5,'비즈니스 리뷰 덕분에 트렌드 파악이 쉬워졌어요.','2025-06-09 15:35:00','2025-06-09 15:35:00'),(17,17,17,4,'아티클 내용은 훌륭하지만 가격이 조금 부담됩니다.','2025-06-09 16:40:00','2025-06-09 16:40:00'),(18,18,18,3,'경제 정보가 유익하지만 UI가 불편해요.','2025-06-09 17:45:00','2025-06-09 17:45:00'),(19,19,19,2,'뉴스 업데이트가 느려 개선이 필요합니다.','2025-06-09 18:50:00','2025-06-09 18:50:00'),(20,20,20,1,'클래스101+ 강의가 기대보다 적어서 아쉬워요.','2025-06-09 19:55:00','2025-06-09 19:55:00'),(21,1,2,5,'티빙 덕분에 주말마다 가족과 영화관람을 즐깁니다.','2025-06-10 10:10:00','2025-06-10 10:10:00'),(22,2,3,4,'지니뮤직 음질은 좋은데 가끔 끊김이 있어요.','2025-06-10 11:15:00','2025-06-10 11:15:00'),(23,3,4,3,'100곡 제한이 아쉬워요. 무제한 옵션이 있으면 좋겠습니다.','2025-06-10 12:20:00','2025-06-10 12:20:00'),(24,4,5,2,'유튜브 프리미엄 결제 오류가 자주 발생합니다.','2025-06-10 13:25:00','2025-06-10 13:25:00'),(25,5,6,1,'V컬러링 설정이 복잡해서 사용이 어렵습니다.','2025-06-10 14:30:00','2025-06-10 14:30:00'),(26,6,7,5,'디즈니+ 덕분에 아이가 좋아하는 애니를 마음껏 봅니다.','2025-06-10 15:35:00','2025-06-10 15:35:00'),(27,7,8,4,'넷플릭스 콘텐츠는 좋은데 가격이 조금 비싸요.','2025-06-10 16:40:00','2025-06-10 16:40:00'),(28,8,9,3,'탑툰 코인 충전은 편리하지만 이벤트가 적어요.','2025-06-10 17:45:00','2025-06-10 17:45:00'),(29,9,10,2,'카카오페이지 사용 중 자주 로그아웃되어 불편합니다.','2025-06-10 18:50:00','2025-06-10 18:50:00'),(30,10,11,1,'리디셀렉트 멤버쉽 해지 절차가 복잡해서 불만입니다.','2025-06-10 19:55:00','2025-06-10 19:55:00');
/*!40000 ALTER TABLE `vas_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vass`
--

DROP TABLE IF EXISTS `vass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vass` (
  `vas_id` bigint NOT NULL AUTO_INCREMENT,
  `vas_name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `vas_description` varchar(255) DEFAULT NULL,
  `sale_rate` int DEFAULT NULL,
  `tag_code` bigint DEFAULT NULL,
  `category_code` varchar(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`vas_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vass`
--

LOCK TABLES `vass` WRITE;
/*!40000 ALTER TABLE `vass` DISABLE KEYS */;
INSERT INTO `vass` VALUES (1,'티빙 월정액 (U+요금제 전용)',9500,NULL,'티빙 오리지널 콘텐츠, 방송, 영화, 해외시리즈까지!',70,2251800887431168,'004','2025-06-07 01:10:00','2025-06-07 01:10:00'),(2,'지니뮤직 마음껏듣기 월정액',7900,NULL,'데이터 걱정없는 무제한 나만의 음악 요정 지니',0,549755820032,'031','2025-06-07 01:10:00','2025-06-07 01:10:00'),(3,'지니뮤직 100곡 듣기',3900,NULL,'100곡으로 부담없이 듣는 나만의 음악 요정 지니',0,549755820032,'031','2025-06-07 01:10:00','2025-06-07 01:10:00'),(4,'유튜브 프리미엄 (U+요금제 전용)',14900,NULL,'YouTube와 YouTube Music에서 광고 없는 서비스 이용',70,2474035380224,'030','2025-06-07 01:10:00','2025-06-07 01:10:00'),(5,'V컬러링 할인구독권',3300,NULL,'보이는 통화연결음으로 나를 표현해보세요',5,141287378386944,'031','2025-06-07 01:10:00','2025-06-07 01:10:00'),(6,'디즈니+',9900,NULL,'드라마, 애니메이션, 영화를 다양하게 시청하세요.',5,2199163768832,'004','2025-06-07 01:10:00','2025-06-07 01:10:00'),(7,'넷플릭스 월정액',7000,NULL,'넷플릭스에서 영화와 시리즈를 무제한으로 즐겨보세요!',0,2199165997056,'004','2025-06-07 01:10:00','2025-06-07 01:10:00'),(8,'탑툰 50코인 충전권',9500,NULL,'매일 업데이트 되는 탑툰 50코인 충전권',0,206159479296,'029','2025-06-07 01:10:00','2025-06-07 01:10:00'),(9,'카카오페이지 + 블라이스 웹툰팩',9500,NULL,'세상의 모든 이야기 카카오페이지를 즐겨보세요!',0,206159479296,'029','2025-06-07 01:10:00','2025-06-07 01:10:00'),(10,'리디셀렉트 도서멤버쉽 월정액',4900,NULL,'소설, 웹툰, 전문서적까지 이 모든걸 3,900원으로',20,206159479296,'012','2025-06-07 01:10:00','2025-06-07 01:10:00'),(11,'예스24 크레마 클럽 1개월 이용권',5500,NULL,'제한 없는 전자책 백화점 지식클럽 크레마 클럽',18,1099512676864,'012','2025-06-07 01:10:00','2025-06-07 01:10:00'),(12,'밀리의 서재 1개월 구독권',9900,NULL,'독서하기 좋은 계절 나만의 서재 밀리의서재',0,1099512676864,'012','2025-06-07 01:10:00','2025-06-07 01:10:00'),(13,'재담쇼츠 월구독권',8900,NULL,'각별한 작가들이 담아낸 독특한 일상의 재현과 환상 서사가 당신의 한때를 재미와 의미로 채워줘요',0,137574219776,'012','2025-06-07 01:10:00','2025-06-07 01:10:00'),(14,'리디 캐시 10,000원권',10000,NULL,'리디북스 금액권을 할인된 가격에 받아보세요.',10,206159479296,'012','2025-06-07 01:10:00','2025-06-07 01:10:00'),(15,'롱블랙 월 구독권',4900,NULL,'매일아침 10분, 트렌드 따라잡기',10,1099511889920,'010','2025-06-07 01:10:00','2025-06-07 01:10:00'),(16,'동아 비즈니스 리뷰 디지털 월 구독권',18900,NULL,'직장인이라면 트렌드 파악은 필수! 동아비즈니스리뷰 구독으로 최신 트렌드 놓치지 마세요!',48,4398046806016,'007','2025-06-07 01:10:00','2025-06-07 01:10:00'),(17,'하버드 비즈니스 리뷰 디지털 월 구독권',16000,NULL,'100년 내공의 프리미엄 비즈니스 아티클 HBR',42,4398046806016,'007','2025-06-07 01:10:00','2025-06-07 01:10:00'),(18,'모바일한경 월 구독권',15000,NULL,'6개월만 꾸준히 구독하시면 돈의 흐름이 보입니다.',78,4398046806016,'010','2025-06-07 01:10:00','2025-06-07 01:10:00'),(19,'아웃스탠딩 IT뉴스 멤버십',9900,NULL,'앞서는 트렌드는 여기서 IT 매거진 아웃스탠딩',15,134480896,'010','2025-06-07 01:10:00','2025-06-07 01:10:00'),(20,'클래스101+ 월 구독권',24900,NULL,'세상의 모든 클래스를 오로지 하나의 구독으로!',20,71485435674624,'026','2025-06-07 01:10:00','2025-06-07 01:10:00'),(21,'시원스쿨 여행영어 월 수강권',99000,NULL,'만능패턴 22가지로 여행영어부터 일상 회화까지 한 번에 마스터할 수 있는 이시원 강사의 여행 영어',97,1120986464256,'026','2025-06-07 01:10:00','2025-06-07 01:10:00'),(22,'야나두 클래스 월 구독권',33250,NULL,'하루 10분이면 야, 너두 할 수 있어!',70,1120986464256,'026','2025-06-07 01:10:00','2025-06-07 01:10:00'),(23,'케이크 플러스 월 구독권',16000,NULL,'전 세계 1억 명이 선택한 영어회화 앱',38,71485435674624,'026','2025-06-07 01:10:00','2025-06-07 01:10:00'),(24,'문정아중국어 회화 전 과정 월 구독권',40000,NULL,'왕초보, 발음, 기초회화 중국어 전과정 수강하자',59,9912784519168,'026','2025-06-07 01:10:00','2025-06-07 01:10:00'),(25,'문정아중국어 HSK 전 과정 월 구독권',60000,NULL,'HSK 2~6급 대비강의 전 과정 수강 가능!',69,9912784519168,'026','2025-06-07 01:10:00','2025-06-07 01:10:00'),(26,'시원스쿨 종합코스 1개월 이용권',19750,NULL,'만능패턴 22가지로 여행영어부터 일상 회화까지 한 번에 마스터할 수 있는 이시원 강사의 여행 영어',5,1120986464256,'026','2025-06-07 01:10:00','2025-06-07 01:10:00'),(27,'폴 바셋 기프트카드 1만원',10000,NULL,'맛있는 라떼, 아이스크림 프리미엄 스페셜 티 폴 바셋',5,844425064349696,'021','2025-06-07 01:10:00','2025-06-07 01:10:00'),(28,'CJ더마켓 적립급 (7천원) + 쿠폰 2종',7000,NULL,'비비고 고메 햇반까지! 냉장고 꽉 채워 힐링해요',5,2199560134656,'021','2025-06-07 01:10:00','2025-06-07 01:10:00'),(29,'일리 커피머신&커피캡슐 1팩',27792,NULL,'일리의 고급 커피머신과 커피캡슐 마음껏 즐기세요',33,844425064349696,'041','2025-06-07 01:10:00','2025-06-07 01:10:00'),(30,'일리 커피캡슐 1팩',19500,NULL,'커피명가 일리 커피캡슐 집에서 마음껏 즐겨봐요',5,844425064349696,'041','2025-06-07 01:10:00','2025-06-07 01:10:00'),(31,'와우회원 혜택',7890,NULL,'오늘 주문하면 내일 도착하는 빠른 배송과 무료 반품도 가능해요.',5,37383563128832,'017','2025-06-07 01:10:00','2025-06-07 01:10:00'),(32,'요기요 할인쿠폰 정기구독권',12000,NULL,'우리 동네 맛집을 빠르게 즐겨요, 요기요',50,2233416548352,'017','2025-06-07 01:10:00','2025-06-07 01:10:00'),(33,'스노우 VIP 월 구독권',4500,NULL,'스노우 필터로 앱 / 웹에서 BEFORE & AFTER 이미지를 효과적으로 제공해보세요',11,140737689681920,'018','2025-06-07 01:10:00','2025-06-07 01:10:00'),(34,'맥아피 시큐리티 구독권',6250,NULL,'강력한 바이러스 백신 및 안전한 브라우저로 24시간 연중무휴로 보호를 받으세요.',38,402654208,'002','2025-06-07 01:10:00','2025-06-07 01:10:00'),(35,'쏘카 크레딧 1만원',10000,NULL,'스마트폰으로 시간에 구애받지 않고 쏘카와 함께 이동하세요!',5,17594467745792,'023','2025-06-07 01:10:00','2025-06-07 01:10:00'),(36,'GS칼텍스 주유세차권 & 차량 정비 서비스',29000,NULL,'주유부터 세차까지 내 차를 관리 해주는 혜택',80,17594467745792,'036','2025-06-07 01:10:00','2025-06-07 01:10:00'),(37,'쿠키즈 월 구독권',6900,NULL,'아이를 위한 재밌고 신나는 교육 콘텐츠를 제공하는 프리미엄 키즈 전용 플랫폼',41,1125899906916352,'042','2025-06-07 01:10:00','2025-06-07 01:10:00'),(38,'쿠키즈 월 이용권',16900,NULL,'아이를 위한 재밌고 신나는 교육 콘텐츠를 제공하는 프리미엄 키즈 전용 플랫폼',47,1125899906916352,'042','2025-06-07 01:10:00','2025-06-07 01:10:00'),(39,'해피독TV 월정액',8800,NULL,'수의학과 전문가의 의견을 바탕으로 제공되는 해피독TV를 이용해보세요!',5,151003136,'016','2025-06-07 01:10:00','2025-06-07 01:10:00'),(40,'예스24 온라인 상품권 15,000원',15000,NULL,'제한 없는 전자책 백화점 지식클럽 크레마 클럽',0,1099512676864,'012','2025-06-07 01:10:00','2025-06-07 01:10:00'),(41,'컬쳐랜드 모바일 문화상품권 1만원',10000,NULL,'도서, 문구, 편의점, 쇼핑 편리하게 문화생활을 선물하세요',2,403718144,'019','2025-06-07 01:10:00','2025-06-07 01:10:00'),(42,'CGV 2D 영화관람권 2매 + CGV콤보',37000,NULL,'최신 영화를 최대 혜택으로 즐기세요!',23,140746078822400,'025','2025-06-07 01:10:00','2025-06-07 01:10:00'),(43,'다이소 금액권 1만원',10000,NULL,'일상이 다이소가 되다. 온라인 국민가게, 다이소.',0,2199425908736,'019','2025-06-07 01:10:00','2025-06-07 01:10:00'),(44,'CGV 2D 영화관람권 1매 + 스몰세트',20000,NULL,'최신 영화를 최대 혜택으로 즐겨보세요!',22,140746078822400,'025','2025-06-07 01:10:00','2025-06-07 01:10:00'),(45,'컬쳐랜드 모바일 문화상품권 5천원',5000,NULL,'도서, 문구, 편의점, 쇼핑 편리하게 문화생활을 선물하세요',0,403718144,'019','2025-06-07 01:10:00','2025-06-07 01:10:00'),(46,'CGV 2D 영화관람권 3매',39000,NULL,'전국 모든 CGV에서 2D 영화를 더욱 저렴한 가격으로 볼 수 있어요',24,140746078822400,'025','2025-06-07 01:10:00','2025-06-07 01:10:00'),(47,'CGV 2D 영화관람권 4매',52000,NULL,'전국 모든 CGV에서 2D 영화를 더욱 저렴한 가격으로 볼 수 있어요',24,140746078822400,'025','2025-06-07 01:10:00','2025-06-07 01:10:00'),(48,'CGV 2D 영화관람권 1매',13000,NULL,'전국 모든 CGV에서 2D 영화를 더욱 저렴한 가격으로 볼 수 있어요',24,140746078822400,'025','2025-06-07 01:10:00','2025-06-07 01:10:00'),(49,'CGV 2D 영화관람권 2매',26000,NULL,'전국 모든 CGV에서 2D 영화를 더욱 저렴한 가격으로 볼 수 있어요',24,140746078822400,'025','2025-06-07 01:10:00','2025-06-07 01:10:00');
/*!40000 ALTER TABLE `vass` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 11:30:43
