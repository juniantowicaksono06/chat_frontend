import Swal from 'sweetalert2'
import CryptoJS from 'crypto-js'
export default function ({ $axios, redirect, app }) {
    // console.log(process.env.BACKEND_URL)
    $axios.onRequest((req) => {
        const credentials = app.$cookies.get('credentials')
        if (credentials) {
            const decrypt = CryptoJS.AES.decrypt(credentials, process.env.SALT_KEY).toString(CryptoJS.enc.Utf8)
            req.headers.common['Authorization'] = `Bearer ${decrypt}`
        }
    })

    $axios.onError((error) => {
        if (error.response) {
            const { data, status } = error.response
            if (status == 400) {
                Swal.fire(
                    {
                        icon: 'warning',
                        text: data.message.split("\\").join(''),
                        target: document.getElementById('swal2_container')
                    }
                )
            }
        }
    })
}