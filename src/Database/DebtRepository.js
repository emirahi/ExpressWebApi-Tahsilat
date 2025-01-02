const { Sequelize } = require('sequelize');
const Debt = require('../models/Debts');

const sequelize = new Sequelize('postgres', 'postgres', '123456789', {
    host: 'localhost',
    dialect: 'postgres'
});


async function syncDebt(username, amount, Type = "", description = "") {
    try {
        console.log(`syncDebt called with: username=${username}, amount=${amount}, Type=${Type}, description=${description}`);
        const { success, debt } = await getDebtByUsername(username);
        console.log(success);
        console.log("\n\n\n");
        console.log(`Debt found: ${JSON.stringify(debt)}`);
        
        if (success) {
            console.log(`Debt found: ${JSON.stringify(debt)}`);
            newAmount = (parseInt(debt.amount) + parseInt(amount)).toString();
            if (debt.Type !== Type) {
                return await updateDebt(debt.id, { amount: newAmount, Type, description });
            } else {
                return await updateDebt(debt.id, { amount: newAmount, description });
            }
        } else {
            const newDebt = await createDebt(username, amount, Type, description);
            console.log(`New debt created: ${JSON.stringify(newDebt)}`);
            return newDebt;
        }
    } catch (error) {
        console.error(`Error in syncDebt: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function createDebt(username, amount, Type = "", description = "") {
    try {
        const newDebt = await Debt.create({ username, amount, Type, description });
        console.log(newDebt.toJSON());
        return { success: true, debt: newDebt.toJSON() };
    } catch (error) {
        console.log(error.message);
        return { success: false, error: error.message };
    }
}

async function getAllDebts() {
    try {
        const debts = await Debt.findAll();
        return { success: true, debts: debts.map(debt => debt.toJSON()) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getDebtById(Id) {
    try {
        const foundDebt = await Debt.findByPk(Id);
        console.log(`Found debt: ${JSON.stringify(foundDebt)}`);
        if (foundDebt) {
            return { success: true, debt: foundDebt.toJSON() };
        } else {
            return { success: false, message: 'Debt not found' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getDebtByUsername(username) {
    try {
        const foundDebt = await Debt.findOne({ where: { username } });
        console.log(`Found debt: ${JSON.stringify(foundDebt)}`);
        if (foundDebt) {
            return { success: true, debt: foundDebt.toJSON() };
        } else {
            return { success: false, message: 'Debt not found' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function updateDebt(debtId, newData) {
    try {
        const foundDebt = await Debt.findByPk(debtId);
        if (foundDebt) {
            await foundDebt.update(newData);
            return { success: true, debt: foundDebt.toJSON() };
        } else {
            return { success: false, message: 'Debt not found' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}


async function deleteDebt(debtId) {
    try {
        const foundDebt = await Debt.findByPk(debtId);
        if (foundDebt) {
            await foundDebt.destroy();
            return { success: true, debt: foundDebt.toJSON() };
        } else {
            return { success: false, message: 'Debt not found' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = {
    getAllDebts,
    getDebtByUsername,
    getDebtById,
    createDebt,
    updateDebt,
    deleteDebt,
    syncDebt
}