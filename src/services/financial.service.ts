import SavingCalculatedModel from "../models/saving.calculated.schema";
import InvestmentCalculatedModel from "../models/investment.calculated.schema";
import SpendCalculatedModel from "../models/spend.calculated.schema";
import DebtCalculatedModel from "../models/debt.calculated.schema";

/**
 * Calculated saving
 * @param saving 
 * @returns 
 */
const listFinancialService = async () => {
    try{
        const calculatedRegisterOne = await SavingCalculatedModel.find({});
        const calculatedRegisterTwo = await InvestmentCalculatedModel.find({});
        const calculatedRegisterThree = await SpendCalculatedModel.find({});
        const calculatedRegisterFour = await DebtCalculatedModel.find({});
        const montoRecordOne = calculatedRegisterOne[0]?.monto || 0.0;
        const montoRecordTwo = calculatedRegisterTwo[0]?.monto || 0.0;
        const montoRecordThree = calculatedRegisterThree[0]?.monto || 0.0;
        const montoRecordFour = calculatedRegisterFour[0]?.monto || 0.0;
        return [montoRecordOne, montoRecordTwo, montoRecordThree, montoRecordFour];
    }catch(err){
        return [];
    }
}

export {
    listFinancialService,
}