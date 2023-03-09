import SpendModel from "../models/spend.schema";
import SpendCalculatedModel from "../models/spend.calculated.schema";
import { SpendInterface } from "../types/spend.type";
import { SpendCalculatedInterface } from "../types/spend.calculated.type";
import TYPE_OPERATION from '../utils/enum.operation';

/**
 * Calculated
 * @param 
 * @returns 
 */
const calculatedRecord = async (monto: number, type_operation: string) => {
    try{
        const calculatedRegister = await SpendCalculatedModel.find({});
        if(calculatedRegister.length > 0){
            const currentMonto = calculatedRegister[0].monto;
            const _id = calculatedRegister[0]._id;
            let newMonto = currentMonto;
            if(type_operation===TYPE_OPERATION.add){
                newMonto = Number(newMonto) + monto;
            } else {
                newMonto = Number(newMonto) - monto;
            }
            await SpendCalculatedModel.updateOne({_id: _id}, { monto: newMonto });
            return newMonto;
        }
        const recordCalculated: SpendCalculatedInterface = new SpendCalculatedModel({
            monto: monto,
        });
        await SpendCalculatedModel.create(recordCalculated);
        return monto;
    }catch(err){
        return 0.0;
    }
}

/**
 * Paginate saving
 * @returns 
 */
const getAll = async (limit: number, page: number) => {
    try{
        const findSaving = await SpendModel.paginate({}, {limit, page});
        return findSaving;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Insertando saving
 * @param 
 * @returns 
 */
const insertRecord = async (body: SpendInterface, type_operation: string) => {
    try{
        const record: SpendInterface = new SpendModel({
            monto: body.monto,
            type_operation: type_operation,
            message: body.message,
        });
        await SpendModel.create(record);
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