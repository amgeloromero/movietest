import {showMessage} from "react-native-flash-message";


export const Notify = {
    error: function (msg) {
        showMessage({
            message: msg,
            type: "danger",
            position: 'top',
            icon: 'danger',
            statusBarHeight:"35",           
            duration:7000,
            titleStyle: {
                fontWeight:"bold"
            }            
        });
    },
   
    success: function (msg) {
        showMessage({
            message: msg,
            type: "success",
            position: 'top',
            icon: 'success',
            statusBarHeight:"35",           
            duration:4000,
            titleStyle: {
                fontWeight:"bold"
            }
        });
    },
    warning: function (msg) {
        showMessage({
            message: msg,
            type: "warning",
            position: 'top',
            icon: 'warning',
            statusBarHeight:"35",           
            duration:3000,
            titleStyle: {
                fontWeight:"bold"
            }
        });
    },
    info: function (msg) {
        showMessage({
            message: msg,
            type: "info",
            position: 'top',
            icon: 'info',
          //  statusBarHeight:"35",           
            duration:3000,
            titleStyle: {
                fontWeight:"bold"
            }
        });
    },
    default: function (msg) {
        showMessage({
            message: msg,
            position: 'top',
            type: "default",
           // statusBarHeight:"35",           
            duration:3000,          
            titleStyle: {
                fontWeight:"bold"
            }
        });
    }
};