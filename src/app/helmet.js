export default {
    contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false
}