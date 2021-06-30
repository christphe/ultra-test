create database ultra;
use ultra;

CREATE TABLE PUBLISHER (
  id INTEGER NOT NULL auto_increment,
  name VARCHAR(45) NULL,
  siret INT NULL,
  phone VARCHAR(45) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB CHARACTER SET utf8;

CREATE TABLE GAME (
  id INT NOT NULL,
  title VARCHAR(45) NULL,
  price DECIMAL NULL,
  publisher INT NULL,
  tags VARCHAR(255) NULL,
  releaseDate DATE NULL,
  PRIMARY KEY (id),
  INDEX fk_GAM_2_PUB_idx (publisher ASC) VISIBLE,
  CONSTRAINT fk_GAM_2_PUB
    FOREIGN KEY (publisher)
    REFERENCES PUBLISHER (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB CHARACTER SET utf8;
