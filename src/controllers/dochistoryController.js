import expressAsyncHandler from "express-async-handler"
import History from '../models/jobHistoryModel.js'




const createHistory = expressAsyncHandler(async (req, res) => {
    let body = req.body
    try {
        const history = await History.create({
            user_id: req.user._id,
            facility: body.facility,
            start: body.start,
            end: body.end
        })
        return res.status(200).json(history)
    } catch (error) {
        return res.status(404);
        console.log(error)
        throw new Error("User Not Found")
    }
})
const getHistory = expressAsyncHandler(async (req, res) => {

    try {
        const history = await History.find({ deletedAt: null }).populate('user_id')
        return res.status(200).json(history)
    } catch (error) {
        return res.status(404);
        console.log(error)
        throw new Error("Fetching Failed ")
    }
})
const updateHistory = expressAsyncHandler(async (req, res) => {

    try {
        let updates = await History.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Hitory Updated successfully ', updates })
    } catch (error) {
        return res.status(404);
        console.log(error)
        throw new Error("Fetching Failed ")
    }
})
const deleteHistory = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await History.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Hitory deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);
        console.log(error)
        throw new Error("deletion Failed ")
    }
})

export {
    createHistory, getHistory, updateHistory, deleteHistory
}