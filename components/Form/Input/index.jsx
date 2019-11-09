import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import "./style.scss"

function TextBox(props) {
    const classes = useStyles();
    return <TextField
        InputProps={{ classes, disableUnderline: true }}
        {...props}
    />
}

export default function Input(props) {
    return (
        <TextBox
            className={`${props.class} textbox`}
            value={props.value}
            disabled={props.disabled}
            error={props.error}
            name={props.name}
            type={props.type}
            label={props.label}
            htmlFor={props.htmlFor}
            variant="filled"
            helperText={props.helperText}
            autoComplete={props.autoComplete}
            fullWidth={true}
            onChange={props.onChange}
        />
    );
}