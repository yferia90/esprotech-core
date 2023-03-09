import InvestmentModel from "../models/investment.schema";
import InvestmentCalculatedModel from "../models/investment.calculated.schema";
import { InvestmentInterface } from "../types/investment.type";
import { InvestmentCalculatedInterface } from "../types/investment.calculated.type";
import TYPE_OPERATION from '../utils/enum.operation';

/**
 * Calculated saving
 * @param saving 
 * @returns 
 */
const calculatedRecord = async (monto: number, type_operation: string) => {
    try{
        const calculatedRegister = await InvestmentCalculatedModel.find({});
        if(calculatedRegister.length > 0){
            const currentMonto = calculatedRegister[0].monto;
            const _id = calculatedRegister[0]._id;
            let newMonto = currentMonto;
            if(type_operation===TYPE_OPERATION.add){
                newMonto = Number(newMonto) + monto;
            } else {
                newMonto = Number(newMonto) - monto;
            }
            await InvestmentCalculatedModel.updateOne({_id: _id}, { monto: newMonto });
            return newMonto;
        }
        const recordCalculated: InvestmentCalculatedInterface = new InvestmentCalculatedModel({
            monto: monto,
        });
        await InvestmentCalculatedModel.create(recordCalculated);
        return monto;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Paginate saving
 * @returns 
 */
const getAll = async (limit: number, page: number) => {
    try{
        const findSaving = await InvestmentModel.paginate({}, {limit, page});
        return findSaving;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Insertando saving
 * @param saving 
 * @returns 
 */
const insertRecord = async (body: InvestmentInterface, type_operation: string) => {
    try{
        const record: InvestmentInterface = new InvestmentModel({
            monto: body.monto,
            type_operation: type_operation,
            message: body.message,
        });
        await InvestmentModel.create(record);
        // Acutalizar el monto calculado
        const calculated = await calculatedRecord(Number(body.monto), type_operation);
        return calculated;
    }catch(err){
        return 0.0
    }
}

export {
    getAll,
    insertRecord,
}