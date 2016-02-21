// fetch/verify existing JWT
export default async function info(req, res, next) {
  try {
    const { exp, iat, name, roles, session } = await req.app.validateToken(req.jwt);

    res.send({
      ok: true,
      userCtx: {
        name,
        roles
      },
      session,
      issued: new Date(iat * 1000),
      expires: new Date(exp * 1000)
    });
  } catch(err) {
    console.error(err);
    next();
  }
}
