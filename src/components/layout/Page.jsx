import React from 'react'
import { Content, Header } from 'rsuite'

const Page = ({ title, children }) => {

    return (
        <React.Fragment>
            <Header>
                <h3>{title}</h3>
            </Header>
            <Content>{children}</Content>
        </React.Fragment>
    )
}

export default Page