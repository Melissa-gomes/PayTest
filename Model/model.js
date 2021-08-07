const { ObjectId } = require('mongodb');
const connect = require('../Connect/conn');
const approvedTransaction = require('../FetchAPI/transaction');
const error = require('../error/index');

const clients = async () => {
  return connect().then((db) => db.collection('clients').find().toArray());
};

const transactionsAll = async () => {
  return connect().then((db) => db.collection('transaction').find().toArray());
};

const clientForDoc = async (doc) => {
  return connect().then((db) => db.collection('clients').find({doc: doc}).toArray());
};

const attBalance = async ( value, clientPayer, clientPayee) => {
  const attWalletPayer = await connect().then((db) => db.collection('clients').updateOne(
    { _id: ObjectId(clientPayer._id) },
    { $inc: { balance: - value } }
  ));
  
  const attWalletPayee = await connect().then((db) => db.collection('clients').updateOne(
    { _id: ObjectId(clientPayee._id) },
    { $inc: { balance: value } }
  ));

  const keyPayer = attWalletPayer.result.nModified;
  const keyPayee = attWalletPayee.result.nModified;

  if(keyPayer !== 1 || keyPayee !== 1) throw error.falidUpdate;

  return true
};

const transaction = async (value, clientPayer, clientPayee) => {
  
  const approved = await approvedTransaction();
  
  const balanceAtt = await attBalance(value, clientPayer, clientPayee);

  if(balanceAtt !== true || approved !== 'Autorizado') throw error.falidTransaction;

  connect().then((db) => db.collection('transaction').insertOne({
    value,
    payer: clientPayer.doc,
    payee: clientPayee.doc,
    date: new Date()
  }));

  return { message: 'Transaction performed successfully.' };

};

module.exports = {
  clients,
  transaction,
  clientForDoc,
  transactionsAll,
}