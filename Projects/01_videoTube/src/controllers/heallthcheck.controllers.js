import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new APiResponse(
                200,
                "OK",
                "health check passed !"
            )
        )
})

export { healthcheck }