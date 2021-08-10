const {
  clients,
  transaction,
  transactionsAll,
  clientForDoc,
} = require('../Model/model');

const error = require('../error/index');

const allClients = async () => clients();

const allTransaction = async () => transactionsAll();

const getClientForDoc = async (doc) => {
  if (!doc) throw error.invalidEntries;
  const client = await clientForDoc(doc);
  return client;
};

const validateEntries = async (value, clientPayer, clientPayee) => {
  const balacePayer = parseInt(clientPayer[0].balance) - value;

  if (clientPayer[0].type === "PJ") throw error.invalidAction;
  if (clientPayer[0].balance < value) throw error.balanceInsufficient;
  if (balacePayer < 0) throw error.balanceInsufficient;
  if (clientPayer[0].doc === clientPayee[0].doc) throw error.transactionNotAllowed;
  if (value <= 0) throw error.indalidValue;

  return true;
};

const validateTransaction = async (value, payer, payee) => {

  const clientPayer = await getClientForDoc(payer);
  const clientPayee = await getClientForDoc(payee);

  if(await validateEntries(value, clientPayer, clientPayee)){
    return await transaction(value, clientPayer[0], clientPayee[0]);
  }
}

module.exports = {
  allClients,
  validateTransaction,
  allTransaction,
}