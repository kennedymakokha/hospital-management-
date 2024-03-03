import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Station from '../models/stationsModel.js'

const getStations = expressAsyncHandler(async (req, res) => {
    try {
        const stations = await Station.find({ deletedAt: null })
        res.status(200).json(stations)
    } catch (error) {
        
        res.status(400).json(error);
        // throw new Error("Fetching Failed ")
    }
})
const register = expressAsyncHandler(async (req, res) => {
    try {
        await Station.create(req.body)
        res.status(200).json({ message: ' Created' })
    } catch (error) {
        console.log(error)
    }
})
const getByID = expressAsyncHandler(async (req, res) => {

    const station = await Station.findById()
    res.status(200).json(station)
})

const updateStation = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Station.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        res.status(400).json({ message: 'Patient Updated failed ', updates })
    }
})
const deleteStation = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Station.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json({ message: 'Patient deleted successfully ', deleted })
    } catch (error) {
        res.status(404);
        console.log(error)
        throw new Error("deletion Failed ")
    }
})

export {
    getByID, getStations, deleteStation, updateStation, register
}