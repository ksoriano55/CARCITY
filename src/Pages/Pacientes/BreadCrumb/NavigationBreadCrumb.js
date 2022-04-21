import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Breadcrumbs, Typography } from '@material-ui/core';
import styles from '../BreadCrumb/PacientesBreadCrumb.module.css';

const NavigationBreadcrumb = (props) => {
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {
                props.BreadcrumbItems.map((breadcrumbItem, index) => {
                    if ((index + 1) !== props.BreadcrumbItems.length) {
                        return (
                            <Typography className={styles.linkButton} key={index} color="inherit" onClick={breadcrumbItem.Click}>
                                {breadcrumbItem.Titulo}
                            </Typography>
                        )
                    } else {
                        return (
                            <Typography key={index} color="textPrimary">{breadcrumbItem.Titulo}</Typography>
                        )
                    }
                })
            }
        </Breadcrumbs>
    )
};

export default NavigationBreadcrumb;