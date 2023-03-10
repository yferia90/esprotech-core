import { Request } from "express";
import SavingModel from "../models/saving.schema";
import SavingCalculatedModel from "../models/saving.calculated.schema";
import { SavingInterface } from "../types/saving.type";
import { SavingCalculatedInterface } from "../types/saving.calculated.type";
import TYPE_OPERATION from '../utils/enum.operation';

/**
 * Calculated saving
 * @param saving 
 * @returns 
 */
const calculatedSaving = async (monto: number, type_operation: string) => {
    try{
        const calculatedRegister = await SavingCalculatedModel.find({});
        if(calculatedRegister.length > 0){
            const currentMonto = calculatedRegister[0].monto;
            const _id = calculatedRegister[0]._id;
            let newMonto = currentMonto;
            if(type_operation===TYPE_OPERATION.add){
                newMonto = Number(newMonto) + monto;
            } else {
                newMonto = Number(newMonto) - monto;
            }
            await SavingCalculatedModel.updateOne({_id: _id}, { monto: newMonto });
            return newMonto;
        }
        const savingCalculated: SavingCalculatedInterface = new SavingCalculatedModel({
            monto: monto,
        });
        await SavingCalculatedModel.create(savingCalculated);
        return monto;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Paginate saving
 * @returns 
 */
const getSaving = async (limit: number, page: number) => {
    try{
        const findSaving = await SavingModel.paginate({}, {limit, page});
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
const insertSaving = async (req: Request, body: SavingInterface, type_operation: string) => {
    try{
        const saving: SavingInterface = new SavingModel({
            monto: body.monto,
            type_operation: type_operation,
            message: body.message
        });
        await SavingModel.create(saving);
        // Acutalizar el monto calculado del ahorro
        const calculated = await calculatedSaving(Number(body.monto), type_operation);
        return calculated;
    }catch(err){
        return "Internal server error";
    }
}

export {
    getSaving,
    insertSaving,
}