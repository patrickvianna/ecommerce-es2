const mysql = require(`mysql`);


var conn = mysql.createConnection({
    host: "35.198.21.170",
    user: "sampleuser",
    password: "125678",
    database : "escdb"
  });

conn.connect(function(err) {
    if (err) console.log(err) ;
    console.log("Connected!");
});  

let sql = ""/*"CREATE TABLE IF NOT EXISTS `TAB_PESSOA` ("+
            "`ID` INT NOT NULL AUTO_INCREMENT,"+
            "`NOME` VARCHAR(80) NULL,"+
            "`TELEFONE` VARCHAR(20) NULL,"+
            "PRIMARY KEY (`ID`))"+
        "ENGINE = InnoDB;";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log(`criou a tabela!`)
        });*/

sql = "CREATE TABLE IF NOT EXISTS `TAB_VENDEDOR` ( "
       "     `ID` INT NOT NULL AUTO_INCREMENT, "+
       "    `DATA_ADM` DATE NULL, " +
       "   `SALARIO` DOUBLE NULL, " +
       "   `PESSOA` INT NOT NULL, " +
       "   PRIMARY KEY (`ID`, `PESSOA`), " +
       "   INDEX `fk_Vendedor_Pessoa_idx` (`PESSOA` ASC), " +
       "   CONSTRAINT `fk_Vendedor_Pessoa` " +
       "       FOREIGN KEY (`PESSOA`) " +
       "       REFERENCES `TAB_PESSOA` (`ID`) " +
       "       ON DELETE NO ACTION " +
       "       ON UPDATE NO ACTION) " +
       "   ENGINE = InnoDB;"; 
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log(`criou a tabela!`)
        });          

sql = "CREATE TABLE IF NOT EXISTS `TAB_CLIENTE` ( "+
    "     `ID` INT NOT NULL AUTO_INCREMENT, "+
    "       `ENDERECO` VARCHAR(200) NULL, "+
    "       `PESSOA` INT NOT NULL, "+
    "       PRIMARY KEY (`ID`, `PESSOA`), "+
    "       INDEX `fk_Cliente_Pessoa1_idx` (`PESSOA` ASC), "+
    "       CONSTRAINT `fk_Cliente_Pessoa1` "+
    "       FOREIGN KEY (`PESSOA`) "+
    "       REFERENCES `TAB_PESSOA` (`ID`) "+
    "       ON DELETE NO ACTION "+
    "       ON UPDATE NO ACTION) "+
    "   ENGINE = InnoDB;";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log(`criou a tabela!`)
        });    

sql = "CREATE TABLE IF NOT EXISTS `TAB_VENDA` ( "+
    "     `ID` INT NOT NULL AUTO_INCREMENT, "+
    "       `DATA_VENDA` DATE NULL, "+
    "       `VALOR` DOUBLE NULL, "+
    "       `VENDEDOR` INT NOT NULL, "+
    "       `CLIENTE` INT NOT NULL, "+
    "       PRIMARY KEY (`ID`, `VENDEDOR`, `CLIENTE`), "+
    "       INDEX `fk_Venda_Vendedor1_idx` (`VENDEDOR` ASC), "+
    "       INDEX `fk_Venda_Cliente1_idx` (`CLIENTE` ASC), "+
    "       CONSTRAINT `fk_Venda_Vendedor1` "+
    "       FOREIGN KEY (`VENDEDOR`) "+
    "       REFERENCES `TAB_VENDEDOR` (`ID`) "+
    "       ON DELETE NO ACTION "+
    "       ON UPDATE NO ACTION, "+
    "       CONSTRAINT `fk_Venda_Cliente1` "+
    "       FOREIGN KEY (`CLIENTE`) "+
    "       REFERENCES `TAB_CLIENTE` (`ID`) "+
    "       ON DELETE NO ACTION "+
    "       ON UPDATE NO ACTION) "+
    "   ENGINE = InnoDB;";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log(`criou a tabela!`)
      });    

sql = "CREATE TABLE IF NOT EXISTS `TAB_PRODUTO` ( "+
    "     `ID` INT NOT NULL AUTO_INCREMENT, "+
    "       `NOME` VARCHAR(45) NULL, "+
    "       `VALOR` DOUBLE NULL, "+
    "       `ESTOQUE` INT NULL, "+
    "       PRIMARY KEY (`ID`)) "+
    "   ENGINE = InnoDB;";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log(`criou a tabela!`)
        }); 
       
         
sql = "CREATE TABLE IF NOT EXISTS `TAB_ITEM_VENDA` ( "+
    "`ID` INT NOT NULL AUTO_INCREMENT, "+
    "`QUANTIDADE` INT NULL, "+
    "`VALOR` DOUBLE NULL, "+
    " `VENDA` INT NOT NULL, "+
    "`PRODUTO` INT NOT NULL, "+
    "PRIMARY KEY (`ID`, `VENDA`, `PRODUTO`), "+
    "INDEX `fk_ItemVenda_Venda1_idx` (`VENDA` ASC), "+
    "INDEX `fk_ItemVenda_Produto1_idx` (`PRODUTO` ASC), "+
    "CONSTRAINT `fk_ItemVenda_Venda1` "+
    "  FOREIGN KEY (`VENDA`) "+
    "  REFERENCES `TAB_VENDA` (`ID`) "+
    " ON DELETE NO ACTION "+
    " ON UPDATE NO ACTION, "+
    "CONSTRAINT `fk_ItemVenda_Produto1` "+
    "  FOREIGN KEY (`PRODUTO`) "+
    " REFERENCES `TAB_PRODUTO` (`ID`) "+
    " ON DELETE NO ACTION "+
    " ON UPDATE NO ACTION) "+
    "ENGINE = InnoDB;";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log(`criou a tabela!`)
        });    
          
sql = "CREATE TABLE IF NOT EXISTS `TAB_FORNECEDOR` ( "+
    "     `ID` INT NOT NULL AUTO_INCREMENT, "+
    "       `RAZAO_SOCIAL` VARCHAR(200) NULL, "+
    "       `CNPJ` VARCHAR(20) NULL, "+
    "       `TELEFONE` VARCHAR(20) NULL, "+
    "       `ENDERECO` VARCHAR(200) NULL, "+
    "       PRIMARY KEY (`ID`)) "+
    "   ENGINE = InnoDB;";
              
        conn.query(sql, function (error, results, fields){
            if(error) return console.log(error);
            console.log(`criou a tabela!`)
        });  
            
            
sql = "CREATE TABLE IF NOT EXISTS TAB_COMPRA` ( "+
    "     `ID` INT NOT NULL AUTO_INCREMENT, "+
    "       `DATA_COMPRA` DATETIME NULL, "+
    "       `VALOR` DOUBLE NULL, "+
    "       `FORNECEDOR` INT NOT NULL, "+
    "       PRIMARY KEY (`ID`, `FORNECEDOR`), "+
    "       INDEX `fk_TAB_COMPRA_TAB_FORNECEDOR1_idx` (`FORNECEDOR` ASC), "+
    "       CONSTRAINT `fk_TAB_COMPRA_TAB_FORNECEDOR1` "+
    "       FOREIGN KEY (`FORNECEDOR`) "+
    "       REFERENCES `TAB_FORNECEDOR` (`ID`) "+
    "       ON DELETE NO ACTION "+
    "       ON UPDATE NO ACTION) "+
    "   ENGINE = InnoDB;";
                
        conn.query(sql, function (error, results, fields){
            if(error) return console.log(error);
            console.log(`criou a tabela!`)
        });        
          
sql = "CREATE TABLE IF NOT EXISTS `TAB_ITEM_COMPRA` ( "+
    " `ID` INT NOT NULL AUTO_INCREMENT, "+
    "   `QUANTIDADE` INT NULL, "+
    "   `VALOR` DOUBLE NULL, "+
     "   `PRODUTO` INT NOT NULL, "+
     "  `COMPRA` INT NOT NULL, "+
     "   PRIMARY KEY (`ID`, `PRODUTO`, `COMPRA`), "+
     "  INDEX `fk_TAB_ITEM_COMPRA_TAB_PRODUTO1_idx` (`PRODUTO` ASC), "+
     "  INDEX `fk_TAB_ITEM_COMPRA_TAB_COMPRA1_idx` (`COMPRA` ASC), "+
     "  CONSTRAINT `fk_TAB_ITEM_COMPRA_TAB_PRODUTO1` "+
     "  FOREIGN KEY (`PRODUTO`) "+
     "  REFERENCES `TAB_PRODUTO` (`ID`) "+
     "  ON DELETE NO ACTION "+
     "  ON UPDATE NO ACTION, "+
     "  CONSTRAINT `fk_TAB_ITEM_COMPRA_TAB_COMPRA1` "+
     "  FOREIGN KEY (`COMPRA`) "+
     "  REFERENCES `TAB_COMPRA` (`ID`) "+
     "  ON DELETE NO ACTION "+
     "  ON UPDATE NO ACTION) "+
     "ENGINE = InnoDB;";
                
        conn.query(sql, function (error, results, fields){
            if(error) return console.log(error);
            console.log(`criou a tabela!`)
        });             

/*
TENTATIVA FRUSTRADA DE USAR SQL SERVER
const connStr = {
    user : `PATRICK-PC\Patrick`,
    password : ``,
    database : `mydb`,
    server : `localhost`
};
const sql = require("mssql");




sql.connect(connStr)
    .then(conn => console.log("conectou!"))
    .catch(err => console.log("erro! " + err));


*/
//module.exports = {getTeste}

