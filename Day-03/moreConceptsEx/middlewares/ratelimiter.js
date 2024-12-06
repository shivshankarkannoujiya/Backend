
const reteLimiter = (limit = 5, windowMs = 1000) => {

    let userRequestCount = {}

    setInterval(() => {
        userRequestCount = {}
    }, windowMs)

    return (req, res, next) => {
        const userId = req.headers["user-id"]

        if (!userId) {
            return res.status(400).json({ message: `usserId is required` })
        }

        userRequestCount[userId] = (userRequestCount[userId] || 0) + 1

        if (userRequestCount > limit) {
            return res.status(429).json({ message: `limit exceeded` })
        }

        next()
    }

}

export { reteLimiter }



