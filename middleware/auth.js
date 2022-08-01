const CryptoJS = require("crypto-js");


export default function ({ redirect, store, app, route }) {
        if (app.$cookies.get('credentials')) {
            try {
                const bytes  = CryptoJS.AES.decrypt(app.$cookies.get('credentials'), process.env.SALT_KEY);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                if (!originalText) {
                    return redirect('/login/')
                }
                
                if ((route.path.startsWith('/login') || route.path.startsWith('/register')) && originalText) {
                    return redirect('/')
                }
                
            } catch (error) {
                return redirect('/login/')
            }
        } else {
            // Redirect it Back to login
            if (!route.path.startsWith('/login') && !route.path.startsWith('/register')) {
                return redirect('/login/')
            } 
        }   
}