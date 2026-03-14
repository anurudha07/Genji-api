import { AuthRequest } from "../type/v1.type";

export const getPagination = (
    req: AuthRequest
) : { page: number; limit: number } => {
  const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt((req.query.limit as string) || "20", 10)));
  
  return { page, limit };
};