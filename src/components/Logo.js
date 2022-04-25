import React from 'react'
import { createStyles } from '@mantine/core';

import logo from "../images/SNNHS-Logo.png"

const useStyles = createStyles((theme) => ({
    main: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center"
    },
    img: {
        maxWidth: "40px",
        maxHeight: "40px",
    },
    title: {
        marginLeft: "15px",
        fontFamily: `Great Vibes, ${theme.fontFamily}`,
        color: theme.colorScheme === 'dark' ? theme.colors.red[0] : theme.colors.maroon[5],
    },
}));

export default function Logo() {
    const { classes } = useStyles();
    return (
        <div className={classes.main}>
            <img className={classes.img} src={logo} alt="logo" />
            <h1 className={classes.title}>SNNHS</h1>
        </div>
    )
}
