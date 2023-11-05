import patientsData from "~/data/patients";
import type {TableRow} from "~/interfaces/TableRow";

export const getPatients = (): Promise<TableRow[]> => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(patientsData);
    }, 1000);
});
