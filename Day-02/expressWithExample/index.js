import express from "express"
const app = express()
const PORT = 3000

app.use(express.json())

/**
 * TODO: You need to Create 4 routes (4 things that the hospital can do)
 * 1. GET: User can check how many kidneys they have and their health
 * 2. POST: User can add a new kidney
 * 3. PUT: User can replace a kidney make it healthy
 * 4. DELETE: User can remove a kidney
 */

const Users = [
    {
        name: "john",
        kidneys: [
            {
                healthy: false
            },
        ]
    }
]


//TODO: User can check how many kidneys they have and their health
app.get("/", (_, res) => {
    const johnKidneys = Users[0].kidneys
    const totalKidneys = johnKidneys.length
    const numberOfHealthyKidneys = johnKidneys.filter(kidney => kidney.healthy).length
    const numberOfUnhealthyKidneys = totalKidneys - numberOfHealthyKidneys

    return res
        .status(200)
        .json(
            {
                totalKidneys,
                numberOfHealthyKidneys,
                numberOfUnhealthyKidneys
            }
        )
})


// TODO: User can add a new kidney
app.post("/", (req, res) => {
    const { isHealthy } = req.body
    Users[0].kidneys.push({
        healthy: isHealthy
    })

    return res
        .status(200)
        .json({
            message: "Kidney added Successfully !"
        })
})


app.put("/", (_, res) => {
    for (let i = 0; i < Users[0].kidneys.length; i++) {
        if (!Users[0].kidneys[i].healthy) {
            Users[0].kidneys[i].healthy = true
        }
    }
    return res
        .status(200)
        .json({
            message: "Kidneys Updated Successfully"
        })
})


// TODO: User can remove all Unhealthy kidney
app.delete("/", (_, res) => {

    // Check if there are any unhealthy kidneys
    const unhealthyKindeys = Users[0].kidneys.filter(kidney => !kidney.healthy)
    if (unhealthyKindeys.length === 0) {
        return res
            .status(411)
            .json({
                message: "No Unhealthy Kidneys Exists !!"
            })
    }

    const newKidneys = Users[0].kidneys.filter(kidney => kidney.healthy)
    Users[0].kidneys = newKidneys
    return res
        .status(200)
        .json({
            message: "Kidney deleted Successfully !!"
        })
})

app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})