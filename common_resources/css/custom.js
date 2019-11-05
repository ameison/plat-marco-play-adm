import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "select": {
        "fontFamily": "'Montserrat'"
    },
    "caja-mensajes-sistema": {
        "position": "absolute",
        "textAlign": "center",
        "width": 440,
        "marginTop": 10,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "height": "30px !important",
        "right": 0,
        "left": 0,
        "top": 0,
        "display": "none",
        "paddingTop": 5,
        "borderRadius": 5,
        "background": "rgba(255, 235, 59, 0.41)"
    },
    "sidebar-wrapper": {
        "background": "#29435c !important"
    },
    "page-login": {
        "marginTop": 140
    },
    "mpointer": {
        "cursor": "pointer"
    },
    "ulsidebar li a": {
        "float": "none"
    },
    "ulsidebar sidebar-list": {
        "height": "auto"
    },
    "sub-menu": {
        "backgroundColor": "#30526B"
    },
    "msj-error": {
        "fontSize": 12,
        "textAlign": "right",
        "paddingTop": 4,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "color": "rgba(228, 40, 40, 0.77)"
    }
});
