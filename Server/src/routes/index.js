

const filter = (ctx) => {
    const url = ctx.url.split('?')[0].toLowerCase()
    const actions = url.split('/')
    const methodUrl = '../controllers/' + actions[1];
    const methodName = actions[1]
    return { methodUrl, methodName }
}
export default async (ctx, next) => {
    console.log(ctx)
    const { methodUrl, methodName } = filter(ctx)
    try {
        const obj = await require(methodUrl)
        console.log(methodName)
        await obj(ctx,next);
    } catch (error) {
        await next()
    }
}
