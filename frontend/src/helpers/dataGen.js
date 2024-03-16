export let systolicData = []
export let DiastolicData = []
export let tempData = []
export let BloodSugerData = []
export const bloodPressure = patientTries => {
    patientTries?.forEach(element => {
        systolicData.push({ x: new Date(element.createdAt), y: parseInt(element?.bloodPressure?.upperValue) },)
        DiastolicData.push({ x: new Date(element.createdAt), y: parseInt(element?.bloodPressure?.lowerValue) },)
        tempData.push({ x: new Date(element.createdAt), y: parseInt(element?.temp) },)
        BloodSugerData.push({ x: new Date(element.createdAt), y: parseInt(element?.temp) },)

    });
}


