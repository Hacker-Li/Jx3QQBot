/*
 Navicat Premium Data Transfer

 Source Server         : 机器人服务器
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : 124.248.66.25:3306
 Source Schema         : sqldata

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 10/01/2022 14:40:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for botserverlist
-- ----------------------------
DROP TABLE IF EXISTS `botserverlist`;
CREATE TABLE `botserverlist`  (
  `ID` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `ServerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '破阵子' COMMENT '默认服务器',
  `ServerID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'QQ群ID',
  `BotQQ` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '在此群的机器人',
  `Flag` int(0) DEFAULT NULL COMMENT '是否开启',
  `Config` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '{}' COMMENT '颗粒化设计可配置功能',
  `CreationTime` datetime(0) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 75 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for jx3love
-- ----------------------------
DROP TABLE IF EXISTS `jx3love`;
CREATE TABLE `jx3love`  (
  `ID` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `BindersName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '绑定的人名称',
  `BindersSect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '绑定的人门派',
  `BoundPersonName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '被绑定的人名称',
  `BoundPersonSect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '被绑定的人门派',
  `BindersTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '绑定时间',
  `BindersUserID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '绑定人的QQ号',
  `CreationTime` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for keysimages
-- ----------------------------
DROP TABLE IF EXISTS `keysimages`;
CREATE TABLE `keysimages`  (
  `ID` int(0) NOT NULL AUTO_INCREMENT,
  `KeyWord` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '关键字',
  `Url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Url连接',
  `CQImages` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '原始CQ码',
  `Flag` int(0) DEFAULT NULL COMMENT '是否开启',
  `CreationTime` datetime(0) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `KeyWord`(`KeyWord`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 700 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for knapsack
-- ----------------------------
DROP TABLE IF EXISTS `knapsack`;
CREATE TABLE `knapsack`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `PetsQQ` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `propName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `propId` int(0) DEFAULT NULL,
  `propIntroduce` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `propNum` int(0) DEFAULT NULL,
  `propSpecial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of knapsack
-- ----------------------------
INSERT INTO `knapsack` VALUES (1, '7449324', '九华玉露散', 1, '使用后增加100经验！', 0, '{}', '2022-01-05 03:40:15', '2022-01-05 10:46:44');
INSERT INTO `knapsack` VALUES (3, '744903888', '九华玉露散', 1, '使用后增加100经验！', 1, '{}', '2022-01-05 08:57:51', '2022-01-05 08:57:51');
INSERT INTO `knapsack` VALUES (4, '3497628268', '九华玉露散', 1, '使用后增加100经验！', 1, '{}', '2022-01-05 09:04:51', '2022-01-05 09:04:51');
INSERT INTO `knapsack` VALUES (5, '1071649588', '九华玉露散', 1, '使用后增加100经验！', 1, '{}', '2022-01-05 09:05:04', '2022-01-05 09:05:04');
INSERT INTO `knapsack` VALUES (6, '1020980578', '九华玉露散', 1, '使用后增加100经验！', 1, '{}', '2022-01-05 09:08:28', '2022-01-05 09:08:28');
INSERT INTO `knapsack` VALUES (7, '7449324', '测试物品', 2, '不太清楚测试用的123123123124124124124124124', 1, '{}', '2022-01-05 18:40:23', '2022-01-05 18:40:26');

-- ----------------------------
-- Table structure for luck_d
-- ----------------------------
DROP TABLE IF EXISTS `luck_d`;
CREATE TABLE `luck_d`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `ServerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `LuckType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Prize` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `quantity` int(0) DEFAULT NULL,
  `probability` int(0) DEFAULT NULL,
  `EndTime` datetime(0) DEFAULT NULL,
  `creationDate` datetime(0) NOT NULL,
  `updatedOn` datetime(0) NOT NULL,
  `StartTime` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of luck_d
-- ----------------------------
INSERT INTO `luck_d` VALUES (1, '875795057', '特等奖', '1000金', 9, 30, '2022-02-28 14:28:28', '2021-12-29 14:28:39', '2022-01-03 14:18:00', '2021-12-29 14:33:47');

-- ----------------------------
-- Table structure for pets_list
-- ----------------------------
DROP TABLE IF EXISTS `pets_list`;
CREATE TABLE `pets_list`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `PetsName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PetsType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PetsQQ` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `brief_introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PetsAttribute` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `creationDate` datetime(0) NOT NULL,
  `updatedOn` datetime(0) NOT NULL,
  `Experience` int(0) DEFAULT NULL,
  `aggressivity` int(0) DEFAULT NULL,
  `Defensivepower` int(0) DEFAULT NULL,
  `Knowing` int(0) DEFAULT NULL,
  `Lucky` int(0) DEFAULT NULL,
  `probability` int(0) DEFAULT NULL,
  `energy` int(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pets_list
-- ----------------------------
INSERT INTO `pets_list` VALUES (12, '扬州金龙鱼', 'SSR', '7449324', '七秀', '{\"name\":\"扬州金龙鱼\",\"type\":\"SSR\",\"aggressivity\":1000,\"Defensivepower\":500,\"Knowing\":0.1,\"Lucky\":0.1,\"introduce\":\"七秀\",\"skill\":\"空\",\"skillinfo\":\"空\",\"probability\":10}', '2022-01-04 11:53:13', '2022-01-05 10:46:45', 900, 1000, 500, 10, 10, 10, 1000);
INSERT INTO `pets_list` VALUES (13, '苗疆雅蠛蝶', 'SSR', '744903888', '五毒', '{\"name\":\"苗疆雅蠛蝶\",\"type\":\"SSR\",\"aggressivity\":1000,\"Defensivepower\":500,\"Knowing\":0.1,\"Lucky\":0.1,\"introduce\":\"五毒\",\"skill\":\"空\",\"skillinfo\":\"空\",\"probability\":10}', '2022-01-05 08:57:31', '2022-01-05 08:57:44', 100, 1000, 500, 10, 10, 10, 1000);
INSERT INTO `pets_list` VALUES (14, '扬州金龙鱼', 'SSR', '3497628268', '七秀', '{\"name\":\"东都哈士奇\",\"type\":\"SSR\",\"aggressivity\":1000,\"Defensivepower\":500,\"Knowing\":0.1,\"Lucky\":0.1,\"introduce\":\"天策\",\"skill\":\"空\",\"skillinfo\":\"空\",\"probability\":10}', '2022-01-05 09:04:25', '2022-01-05 09:11:36', 100, 1000, 500, 10, 10, 10, 1000);
INSERT INTO `pets_list` VALUES (15, '四川大熊猫', 'SSR', '1071649588', '唐门', '{\"name\":\"四川大熊猫\",\"type\":\"SSR\",\"aggressivity\":1000,\"Defensivepower\":500,\"Knowing\":0.1,\"Lucky\":0.1,\"introduce\":\"唐门\",\"skill\":\"空\",\"skillinfo\":\"空\",\"probability\":10}', '2022-01-05 09:04:31', '2022-01-05 09:04:31', 0, 1000, 500, 10, 10, 10, 1000);
INSERT INTO `pets_list` VALUES (16, '青岩妙蛙花', 'SSR', '1020980578', '万花', '{\"name\":\"青岩妙蛙花\",\"type\":\"SSR\",\"aggressivity\":1000,\"Defensivepower\":500,\"Knowing\":0.1,\"Lucky\":0.1,\"introduce\":\"万花\",\"skill\":\"空\",\"skillinfo\":\"空\",\"probability\":10}', '2022-01-05 09:05:19', '2022-01-05 09:13:52', 100, 1000, 500, 10, 10, 10, 1000);
INSERT INTO `pets_list` VALUES (17, '华山喜羊羊', 'SSR', '210225372', '纯阳', '{\"name\":\"华山喜羊羊\",\"type\":\"SSR\",\"aggressivity\":1000,\"Defensivepower\":500,\"Knowing\":0.1,\"Lucky\":0.1,\"introduce\":\"纯阳\",\"skill\":\"空\",\"skillinfo\":\"空\",\"probability\":10}', '2022-01-05 09:06:49', '2022-01-05 09:06:49', 0, 1000, 500, 10, 10, 10, 1000);

-- ----------------------------
-- Table structure for signin
-- ----------------------------
DROP TABLE IF EXISTS `signin`;
CREATE TABLE `signin`  (
  `ID` int(0) NOT NULL AUTO_INCREMENT,
  `ServerId` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '群ID',
  `UserId` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户ID',
  `Ranking` int(0) DEFAULT NULL COMMENT '排名',
  `Fortune` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '运势',
  `Qualifications` int(0) DEFAULT NULL COMMENT '资历',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for userlist
-- ----------------------------
DROP TABLE IF EXISTS `userlist`;
CREATE TABLE `userlist`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `qqid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Gold` int(0) DEFAULT NULL,
  `SignInNum` int(0) DEFAULT NULL,
  `creationDate` datetime(0) NOT NULL,
  `updatedOn` datetime(0) NOT NULL,
  `SignInDate` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for zhongjiang
-- ----------------------------
DROP TABLE IF EXISTS `zhongjiang`;
CREATE TABLE `zhongjiang`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `Serverid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userid` int(0) DEFAULT NULL,
  `zjId` int(0) DEFAULT NULL,
  `zjName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `creationDate` datetime(0) NOT NULL,
  `updatedOn` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
