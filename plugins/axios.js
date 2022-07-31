import Swal from 'sweetalert2'
export default function ({ $axios, redirect }) {
    // console.log(process.env.BACKEND_URL)
    $axios.onRequest((req) => {
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