import React from 'react';

export default function Alert(props) {
    return (
        <>
            {props.Alert && <div className={`alert alert-${props.Alert.type} alert-style`} role="alert">
                <strong>{props.Alert.Success}</strong>: {props.Alert.msg}
            </div>}
        </>
    )
}