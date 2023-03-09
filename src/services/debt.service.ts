import DebtModel from "../models/debt.schema";
import DebtCalculatedModel from "../models/debt.calculated.schema";
import { DebtInterface } from "../types/debt.type";
import { DebtCalculatedInterface } from "../types/debt.calculated.type";
import TYPE_OPERATION from '../utils/enum.operation';

/**
 * Calculated
 * @param 
 * @returns 
 */
const calculatedRecord = async (monto: number, type_operation: string) => {
    try{
        const calculatedRegister = await DebtCalculatedModel.find({});
        if(calculatedRegister.length > 0){
            const currentMonto = calculatedRegister[0].monto;
            const _id = calculatedRegister[0]._id;
            let newMonto = currentMonto;
            if(type_operation===TYPE_OPERATION.add){
                newMonto = Number(newMonto) + monto;
            } else {
                newMonto = Number(newMonto) - monto;
            }
            await DebtCalculatedModel.updateOne({_id: _id}, { monto: newMonto });
            return newMonto;
        }
        const recordCalculated: DebtCalculatedInterface = new DebtCalculatedModel({
            monto: monto,
        });
        await DebtCalculatedModel.create(recordCalculated);
        return monto;
    }catch(err){
        return 0.0;
    }
}

/**
 * Paginate
 * @returns 
 */
const getAll = async (limit: number, page: number) => {
    try{
        const find = await DebtModel.paginate({}, {limit, page});
        return find;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Insertando saving
 * @param 
 * @returns 
 */
const insertRecord = async (body: DebtInterface, type_operation: string) => {
    try{
        const record: DebtInterface = new DebtModel({
            monto: body.monto,
            type_operation: type_operation,
            message: body.message,
        });
        await DebtModel.create(record);
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