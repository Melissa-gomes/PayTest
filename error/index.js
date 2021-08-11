const invalidAction = { code: 402, message: 'Action invalid. A corporate client cannot make transactions.' };

const balanceInsufficient = { code: 402, message: 'Your balance is insufficient to perform this transaction.' };

const transactionNotAllowed = { code: 402, message: 'Transaction not allowed. You cannot make a transaction for yourself' };

const invalidEntries = { code: 402, message: 'Invalid entries' };

const indalidValue = { code: 402, message: 'Indalid value. The value to be transferred must be greater than 0 (zero).' };

const falidUpdate = { code: 402, message: 'Failed to update client balance' };

const notAuthorized = { code: 402, message: 'Not authorized. You are not authorized to do this transaction.' }

const falidTransaction = { code: 402, message: 'Fail in transaction. Your transaction failed.' };
module.exports = {
  invalidAction,
  balanceInsufficient,
  transactionNotAllowed,
  invalidEntries,
  indalidValue,
  falidUpdate,
  notAuthorized,
  falidTransaction,
}