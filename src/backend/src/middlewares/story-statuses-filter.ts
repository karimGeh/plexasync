import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { StoryStatuses } from "../models/story";

export const storyStatusesFilter =
  (allowed_statuses: StoryStatuses[]) =>
  (req: Request, _: Response, next: NextFunction): void => {
    const story = req.story;

    if (allowed_statuses.includes(story.status)) {
      return next();
    }

    throw new NotAuthorizedError("Story can't be modified at this stage");
  };
