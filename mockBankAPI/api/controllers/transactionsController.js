var mongoose = require("mongoose");
var Transaction = require("../models/transaction");
var Transactions = module.exports;

var tipos = ["Debito", "Credito"];

var moeda = ["EUR", "USD"];

var categoriasDebito = [
  "Casa",
  "Mobilidade",
  "Desporto",
  "Impostos e Taxas",
  "Cultura e Hobbies",
  "Restaurantes e Cafés",
  "Saúde",
  "Viagens",
  "Educação",
  "Sem Categoria",
  "Supermercados e Lojas",
  "Credito e Comissões",
  "Seguros",
  "Entretenimento",
  "Investimentos",
];

var categoriasCredito = ["Familia", "Investimentos", "Sem Categoria"];

var emissoresDebitoSemCategoria = [
  "Pagamento",
  "Transferencia",
  "Levantamento ATM",
];
var emissoresCreditoSemCategoria = ["Transferencia", "Depósito ATM"];

var emissoresDebitoCasa = [
  "EDP",
  "Vodafone",
  "MEO",
  "NOS",
  "Gás Natural",
  "Gold Energy",
  "Endesa",
  "Iberdrola",
];
var emissoresDebitoMobilidade = [
  "Uber",
  "STCP",
  "Metro Porto",
  "Metro Lisboa",
  "Rede Expressos",
  "CP",
  "Táxis Lisboa",
];
var emissoresDebitoImpostosETaxas = [
  "Finanças",
  "Segurança Social",
  "IRS",
  "IMI",
];
var emissoresDebitoSeguros = [
  "Seguro Social",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade Permanente",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade Permanente",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade Permanente",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade Permanente",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade Permanente",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade Permanente",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade Permanente",
  "Seguro de Acidentes de Trabalho",
  "Seguro de Acidentes Pessoais",
  "Seguro de Saúde",
  "Seguro de Vida",
  "Seguro de Incapacidade Temporária",
  "Seguro de Incapacidade",
];

var emissoresDebitoCulturaEHobbies = [
  "TNSJ",
  "Teatro Circo",
  "Nos Cinemas",
  "Rivoli",
  "Teatro Sá da Bandeira",
  "Politeama",
  "Museu Nacional",
  "Museu de Arte Contemporânea",
  "Museu do Fado",
];
var emissoresDebitoRestaurantesECafés = [
  "Tasca do Esteves",
  "McDonalds",
  "Burguer King",
  "Chimarrão",
  "Taco Bell",
  "Café do Luís",
  "Baroque",
  "Starbucks",
  "Costa Café",
  "Carpe Diem",
  "KFC",
  "Wok to Walk",
  "Poke House",
  "Italian Republic",
  "Pizza Hut",
  "H3",
  "Telepizza",
  "Dominos Pizza",
];
var emissoresDebitoSaúde = [
  "Hospital S.João",
  "Trofa Saúde",
  "Lusíadas",
  "Hospital da Luz",
  "Clínica do Esteves",
  "USF Braga Norte",
];
var emissoresDebitoViagens = [
  "Ryanair",
  "EasyJet",
  "Wiz Air",
  "Iberia",
  "Lufthansa",
  "Air France",
  "Air Emirates",
  "TAP Portugal",
  "Sata Internacional",
  "British Airways",
  "Delta Airlines",
];
var emissoresDebitoEducação = [
  "Universidade do Minho",
  "Universidade do Porto",
  "Porto Editora",
  "Areal Editores",
  "Texto Editores",
  "Livraria Lello",
  "Livraria Almedina",
  "Bertrand",
  "Fnac Portugal",
  "Universidade Nova de Lisboa",
  "Instituo Superior Técnico",
];
var emissoresDebitoSupermercadosELojas = [
  "Pingo Doce",
  "Continente",
  "Mercearia do Esteves",
  "Lidl",
  "E.leclerc",
  "Jumbo",
  "Auchan",
  "Mercadona",
  "Aldi",
  "Minipreço",
  "Mercearia da Tasquinha",
];
var emissoresDebitoCreditoEComissões = [
  "Cetelem",
  "BPI",
  "CGD",
  "Cofidis",
  "Wizink",
];
var emissoresDebitoEntretenimento = [
  "Netflix",
  "Spotify",
  "Apple Music",
  "Youtube Premium",
  "Google",
  "Apple",
  "Podcasts do Esteves",
];
var emissoresDebitoDesporto = [
  "Clube de Ténis",
  "Bpadel",
  "Clube de Hipismo",
  "Clube do Rio",
  "Clube de Golfe",
  "Aluguer campo futebol",
  "Ginásio Fitness",
];
var emissoresDebitoInvestimentos = [
  "XTB",
  "Binance",
  "MEXC",
  "Forex",
  "Rendas",
  "Etoro",
];

var emissoresCreditoFamilia = ["Herança", "Prenda"];
var emissoresCreditoSemCategoria = [
  "Transferência Bancária de João",
  "Transferência Bancária de Joana",
  "Transferência MBWAY de Miguel",
  "Transferência bancária de Alberto",
  "Reembolso",
];
var emissoresCreditoInvestimentos = [
  "Criptomoedas",
  "Forex",
  "PPRs",
  "Dividendos",
  "Rendas",
];

//Gerar uma transação aleatória
Transactions.newTransaction = function (statementID) {
  //Random date and time between now and yesterday
  var tmpCategoria = "";
  var tmpEmissor = "";
  var tmpDescricao = "";
  var tmpValor = 0;
  var tmpMoeda = moeda[Math.floor(Math.random() * moeda.length)];
  var date = new Date();
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var randomDate = new Date(
    yesterday.getTime() + Math.random() * (date.getTime() - yesterday.getTime())
  );

  var tmpTipo = tipos[Math.floor(Math.random() * tipos.length)];
  if (tmpTipo == "Debito") {
    tmpCategoria =
      categoriasDebito[Math.floor(Math.random() * categoriasDebito.length)];
    switch (tmpCategoria) {
      case "Cultura e Hobbies":
        tmpEmissor =
          emissoresDebitoCulturaEHobbies[
            Math.floor(Math.random() * emissoresDebitoCulturaEHobbies.length)
          ];
        break;
      case "Restaurantes e Cafés":
        tmpEmissor =
          emissoresDebitoRestaurantesECafés[
            Math.floor(Math.random() * emissoresDebitoRestaurantesECafés.length)
          ];
        break;
      case "Saúde":
        tmpEmissor =
          emissoresDebitoSaúde[
            Math.floor(Math.random() * emissoresDebitoSaúde.length)
          ];
        break;
      case "Viagens":
        tmpEmissor =
          emissoresDebitoViagens[
            Math.floor(Math.random() * emissoresDebitoViagens.length)
          ];
        break;
      case "Educação":
        tmpEmissor =
          emissoresDebitoEducação[
            Math.floor(Math.random() * emissoresDebitoEducação.length)
          ];
        break;
      case "Supermercados e Lojas":
        tmpEmissor =
          emissoresDebitoSupermercadosELojas[
            Math.floor(
              Math.random() * emissoresDebitoSupermercadosELojas.length
            )
          ];
        break;
      case "Credito e Comissões":
        tmpEmissor =
          emissoresDebitoCreditoEComissões[
            Math.floor(Math.random() * emissoresDebitoCreditoEComissões.length)
          ];
        break;
      case "Entretenimento":
        tmpEmissor =
          emissoresDebitoEntretenimento[
            Math.floor(Math.random() * emissoresDebitoEntretenimento.length)
          ];
        break;
      case "Desporto":
        tmpEmissor =
          emissoresDebitoDesporto[
            Math.floor(Math.random() * emissoresDebitoDesporto.length)
          ];
        break;
      case "Investimentos":
        tmpEmissor =
          emissoresDebitoInvestimentos[
            Math.floor(Math.random() * emissoresDebitoInvestimentos.length)
          ];
        break;
      case "Sem Categoria":
        tmpEmissor =
          emissoresDebitoSemCategoria[
            Math.floor(Math.random() * emissoresDebitoSemCategoria.length)
          ];
        break;
      case "Seguros":
        tmpEmissor =
          emissoresDebitoSeguros[
            Math.floor(Math.random() * emissoresDebitoSeguros.length)
          ];
        break;
      case "Impostos e Taxas":
        tmpEmissor =
          emissoresDebitoImpostosETaxas[
            Math.floor(Math.random() * emissoresDebitoImpostosETaxas.length)
          ];
        break;
      case "Casa":
        tmpEmissor =
          emissoresDebitoCasa[
            Math.floor(Math.random() * emissoresDebitoCasa.length)
          ];
        break;
      case "Mobilidade":
        tmpEmissor =
          emissoresDebitoMobilidade[
            Math.floor(Math.random() * emissoresDebitoMobilidade.length)
          ];
        break;
    }
    tmpValor = Math.floor(Math.random() * 400) + 1;
  } else {
    tmpCategoria =
      categoriasCredito[Math.floor(Math.random() * categoriasCredito.length)];
    switch (tmpCategoria) {
      case "Familia":
        tmpEmissor =
          emissoresCreditoFamilia[
            Math.floor(Math.random() * emissoresCreditoFamilia.length)
          ];
        break;
      case "Sem Categoria":
        tmpEmissor =
          emissoresCreditoSemCategoria[
            Math.floor(Math.random() * emissoresCreditoSemCategoria.length)
          ];
        break;
      case "Investimentos":
        tmpEmissor =
          emissoresCreditoInvestimentos[
            Math.floor(Math.random() * emissoresCreditoInvestimentos.length)
          ];
        break;
    }
    tmpValor = Math.floor(Math.random() * 700) + 1;
  }

  tmpDescricao = tmpEmissor + " - " + tmpCategoria;

  var transaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    type: tmpTipo,
    date: randomDate,
    issuer: tmpEmissor,
    description: tmpDescricao,
    value: tmpValor,
    category: tmpCategoria,
    currency: tmpMoeda,
    statement: statementID,
  });
  return transaction;
};

//Create a single transaction
Transactions.create = async function (transaction, callback) {
  try {
    var trans = new Transaction(transaction);
    trans = await trans.save();
    console.log("Transaction created");
    callback(null, transaction);
  } catch (err) {
    console.log(err);
    callback(err, null);
  }
};
