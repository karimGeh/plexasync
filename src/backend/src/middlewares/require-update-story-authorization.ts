import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireUpdateStoryAuthorization = (
    req: Request,
    _: Response,
    next: NextFunction
): void => {
    const story = req.story;
    const user = req.auth_user;

    // TODO: add more checks
    // authorized to update the story if:
    // - you are the author

    if (user && user.id === story.author) {
        return next();
    }

    throw new NotAuthorizedError();
};