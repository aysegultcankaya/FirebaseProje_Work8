import React from 'react'
import { useTranslation } from 'react-i18next';
import Page from '../../components/layout/Page'

const Home = () => {
    const { t } = useTranslation();

    return (
        <Page title={t("pages.home.title")}>
        </Page>
    )
}

export default Home