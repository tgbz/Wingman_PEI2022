-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema wingman
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wingman
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wingman` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Wallet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Wallet` (
  `idWallet` INT NOT NULL,
  `rendimento` VARCHAR(45) NULL,
  `euro` VARCHAR(45) NULL,
  PRIMARY KEY (`idWallet`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wingman`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wingman`.`user` (
  `idUser` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `Politica_idPolitica` INT NOT NULL,
  `birthDate` DATE NOT NULL,
  `gender` INT NOT NULL,
  `savings` FLOAT NULL,
  PRIMARY KEY (`idUser`, `Politica_idPolitica`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wingman`.`subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wingman`.`subcategoria` (
  `idCategory` INT NOT NULL,
  `plafond` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `total_spent` FLOAT NULL,
  PRIMARY KEY (`idCategory`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `idcategoria` INT NOT NULL,
  `idUser` INT NOT NULL,
  `idCategory` INT NOT NULL,
  PRIMARY KEY (`idcategoria`),
  INDEX `fk_categoria_user_idx` (`idUser` ASC) VISIBLE,
  INDEX `fk_categoria_subcategoria1_idx` (`idCategory` ASC) VISIBLE,
  CONSTRAINT `fk_categoria_user`
    FOREIGN KEY (`idUser`)
    REFERENCES `wingman`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categoria_subcategoria1`
    FOREIGN KEY (`idCategory`)
    REFERENCES `wingman`.`subcategoria` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `wingman` ;

-- -----------------------------------------------------
-- Table `wingman`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wingman`.`product` (
  `idProduct` INT NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProduct`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wingman`.`product_has_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wingman`.`product_has_category` (
  `idProduct` INT NOT NULL,
  `idCategory` INT NOT NULL,
  `updated_at` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idProduct`, `idCategory`),
  INDEX `fk_Product_has_Category_Category1_idx` (`idCategory` ASC) VISIBLE,
  INDEX `fk_Product_has_Category_Product1_idx` (`idProduct` ASC) VISIBLE,
  CONSTRAINT `fk_Product_has_Category_Category1`
    FOREIGN KEY (`idCategory`)
    REFERENCES `wingman`.`subcategoria` (`idCategory`),
  CONSTRAINT `fk_Product_has_Category_Product1`
    FOREIGN KEY (`idProduct`)
    REFERENCES `wingman`.`product` (`idProduct`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wingman`.`purchase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wingman`.`purchase` (
  `idPurchase` INT NOT NULL,
  `is_recurring` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `idUser` INT NOT NULL,
  `tittle` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPurchase`),
  INDEX `fk_Purchase_User_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Purchase_User`
    FOREIGN KEY (`idUser`)
    REFERENCES `wingman`.`user` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `wingman`.`purchase_has_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wingman`.`purchase_has_product` (
  `Purchase_idPurchase` INT NOT NULL,
  `Product_idProduct` INT NOT NULL,
  `Value` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Purchase_idPurchase`, `Product_idProduct`),
  INDEX `fk_Purchase_has_Product_Product1_idx` (`Product_idProduct` ASC) VISIBLE,
  INDEX `fk_Purchase_has_Product_Purchase1_idx` (`Purchase_idPurchase` ASC) VISIBLE,
  CONSTRAINT `fk_Purchase_has_Product_Product1`
    FOREIGN KEY (`Product_idProduct`)
    REFERENCES `wingman`.`product` (`idProduct`),
  CONSTRAINT `fk_Purchase_has_Product_Purchase1`
    FOREIGN KEY (`Purchase_idPurchase`)
    REFERENCES `wingman`.`purchase` (`idPurchase`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `mydb` ;

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`view1` (`id` INT);

-- -----------------------------------------------------
-- View `mydb`.`view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`view1`;
USE `mydb`;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
