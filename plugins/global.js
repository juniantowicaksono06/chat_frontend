export default ({ app }, inject) => {
    var wsInstance = null
    inject('createWs', () => {
        if (wsInstance == null) wsInstance = new WebSocket(process.env.WEBSOCKET_URL)
        return
    })
    inject('wsInstance', () => {
        return wsInstance
    })
    inject('destoryWs', () => {
        if(wsInstance != null) wsInstance = null
        return
    })
    inject('wsEvent', (event_type, fn) => {
        return wsInstance.onmessage = (event) => {
            let data = event.data ? event.data : null
            if(data == null) return
            data = JSON.parse(data)
            if(data.type == event_type) {
                fn(data)
            }
        }
    })
}