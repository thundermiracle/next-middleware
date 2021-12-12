// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const createBearerToken = () => {
  const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });

  return `Bearer ${token}`;
};

const redirectToApiServer = async (req: NextRequest) => {
  const { pathname, search } = req.nextUrl;
  const newPath = `${pathname.replace("/api/", "")}${search}`;

  // append Authorization header
  const headers = {
    ...req.headers,
    Authorization: createBearerToken(),
  };

  return await fetch(`${process.env.API_URL}/${newPath}`, {
    headers,
    body: req.body,
  });
};

export default redirectToApiServer;
