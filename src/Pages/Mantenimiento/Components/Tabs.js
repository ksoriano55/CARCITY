import React from 'react';
import Tabs from 'react-responsive-tabs';
import {Usuarios} from './Usuarios';

const tabsContent = [
    {
        title: 'Usuarios',
        content: <Usuarios/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export const TabsMantenimiento = () => {
    return (
        <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()}/>
    );
}