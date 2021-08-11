const Service = require('../Service/service');
const messageForClient = require('../FetchAPI/messageClient');

const responseOK = 200;

const getAll = async (req, res) => {
  try {
    const clients = await Service.allClients();
    return res.status(responseOK).json(clients);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const transaction = async (req, res) => {
  const { value, payer, payee } = req.body;
  try {
    const transaction = await Service.validateTransaction(value, payer, payee);
    //VER COMO DIMINUIR ESSE TEMPO QUE ESTA ABSURDOOO
    const sucess = await messageForClient();
    console.log(sucess);
    return res.status(responseOK).json(transaction);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Service.allTransaction();
    return res.status(responseOK).json(transaction);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { 
  getAll,
  transaction,
  getTransaction
}